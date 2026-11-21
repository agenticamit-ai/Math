"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_EXPECTED_WPM, minReadMs, stillReadingPromptMs } from "@/lib/metrics";
import { PassageText } from "./PassageText";

export type FlowQuestion = {
  id: string;
  format: "mcq" | "multi_select" | "evidence_pair" | "order_events" | "short_answer";
  phase: "closed_book" | "open_book";
  stem: string;
  options: { id: string; text: string }[];
};

type Props = {
  sessionId: string;
  passage: { id: string; title: string; genreLabel: string; body: string; wordCount: number; purposeQuestion: string };
  questions: FlowQuestion[];
  answered: string[];
  initialStage: "preread" | "questions" | "summary";
  expectedWpm?: number;
};

type Stage = "preread" | "reading" | "questions" | "summary" | "feedback";
type TimerState = "idle" | "running" | "hidden" | "paused";

async function post(url: string, body: unknown) {
  const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error ?? "Something went wrong. Try again."), { status: res.status });
  return data;
}

export function SessionFlow({ sessionId, passage, questions, answered, initialStage, expectedWpm = DEFAULT_EXPECTED_WPM }: Props) {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>(initialStage);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // ---------- Reading timer (active time only) ----------
  const timer = useRef({ active: 0, blur: 0, pauses: 0, last: 0, state: "idle" as TimerState, nextPromptAt: 0 });
  const [canFinish, setCanFinish] = useState(false);
  const [prompt, setPrompt] = useState<{ shownAt: number } | null>(null);
  const promptShownAt = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);
  const minMs = minReadMs(passage.wordCount);
  const promptMs = stillReadingPromptMs(passage.wordCount, expectedWpm);

  const activeElapsed = useCallback(() => {
    const t = timer.current;
    return t.active + (t.state === "running" ? performance.now() - t.last : 0);
  }, []);

  useEffect(() => {
    if (stage !== "reading") return;
    const onVisibility = () => {
      const t = timer.current;
      const now = performance.now();
      if (document.visibilityState === "hidden" && t.state === "running") {
        t.active += now - t.last;
        t.state = "hidden";
        t.last = now;
        t.pauses++;
      } else if (document.visibilityState === "visible" && t.state === "hidden") {
        t.blur += now - t.last;
        t.state = "running";
        t.last = now;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    const tick = setInterval(() => {
      const t = timer.current;
      const elapsed = activeElapsed();
      if (elapsed >= minMs) setCanFinish(true);
      if (t.state !== "running") return;
      const now = performance.now();
      if (promptShownAt.current === null && elapsed >= t.nextPromptAt) {
        promptShownAt.current = now;
        setPrompt({ shownAt: now });
      } else if (promptShownAt.current !== null && now - promptShownAt.current >= 60_000) {
        // No answer for 60 s: auto-pause and don't count that minute as reading.
        t.active = Math.max(0, t.active + (now - t.last) - 60_000);
        t.last = now;
        t.state = "paused";
        t.pauses++;
        promptShownAt.current = null;
        setPrompt(null);
        setPaused(true);
      }
    }, 1000);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      clearInterval(tick);
    };
  }, [stage, activeElapsed, minMs]);

  const startReading = async () => {
    setBusy(true);
    setError(null);
    try {
      await post(`/api/sessions/${sessionId}/start`, {});
      timer.current = { active: 0, blur: 0, pauses: 0, last: performance.now(), state: "running", nextPromptAt: promptMs };
      setCanFinish(minMs <= 0);
      setStage("reading");
      window.scrollTo({ top: 0 });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const stillReading = () => {
    timer.current.nextPromptAt = activeElapsed() + Math.max(60_000, promptMs / 3);
    promptShownAt.current = null;
    setPrompt(null);
  };

  const resume = () => {
    const t = timer.current;
    t.state = "running";
    t.last = performance.now();
    t.nextPromptAt = t.active + Math.max(60_000, promptMs / 3);
    setPaused(false);
  };

  const finishReading = async () => {
    const t = timer.current;
    if (t.state === "running") {
      t.active += performance.now() - t.last;
      t.last = performance.now();
    }
    t.state = "idle";
    setBusy(true);
    setError(null);
    try {
      await post(`/api/sessions/${sessionId}/done`, {
        activeReadMs: Math.round(t.active),
        blurMs: Math.round(t.blur),
        pauseCount: t.pauses,
      });
      setStage(remaining.length ? "questions" : "summary");
      window.scrollTo({ top: 0 });
    } catch (e) {
      t.state = "running";
      t.last = performance.now();
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  // ---------- Word lookup ----------
  const [lookup, setLookup] = useState<{ word: string; definition: string | null } | null>(null);
  const onWord = useCallback(
    async (word: string, sentence: string) => {
      setLookup({ word, definition: null });
      try {
        const data = await post("/api/vocab", { word, passageId: passage.id, sentence });
        setLookup((l) => (l?.word === word ? { word, definition: data.definition ?? "" } : l));
      } catch {
        setLookup((l) => (l?.word === word ? { word, definition: "" } : l));
      }
    },
    [passage.id],
  );

  // ---------- Questions ----------
  const remaining = useMemo(() => questions.filter((q) => !answered.includes(q.id)), [questions, answered]);
  const [qIndex, setQIndex] = useState(0);
  const q = remaining[qIndex];
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<string[]>([]);
  const [part, setPart] = useState<"A" | "B">("A");
  const [evidence, setEvidence] = useState<number | null>(null);
  const [highlights, setHighlights] = useState<Set<number>>(new Set());
  const [showPassage, setShowPassage] = useState(false);
  const qStart = useRef(0);

  useEffect(() => {
    if (!q) return;
    setSelected([]);
    setOrder(q.options.map((o) => o.id));
    setPart("A");
    setEvidence(null);
    setShowPassage(false);
    qStart.current = performance.now();
  }, [q]);

  const toggleHighlight = useCallback((i: number) => {
    setHighlights((h) => {
      const n = new Set(h);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });
  }, []);

  const canSubmit =
    !!q &&
    (q.format === "mcq"
      ? selected.length === 1
      : q.format === "multi_select"
        ? selected.length === 2
        : q.format === "order_events"
          ? true
          : q.format === "evidence_pair"
            ? part === "B" && selected.length === 1 && evidence !== null
            : false);

  const submitAnswer = async () => {
    if (!q) return;
    setBusy(true);
    setError(null);
    try {
      await post(`/api/sessions/${sessionId}/answer`, {
        questionId: q.id,
        selected: q.format === "order_events" ? order : selected,
        evidenceSentence: q.format === "evidence_pair" ? (evidence ?? undefined) : undefined,
        timeMs: Math.round(performance.now() - qStart.current),
      });
      if (qIndex + 1 < remaining.length) setQIndex(qIndex + 1);
      else setStage("summary");
      window.scrollTo({ top: 0 });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  // ---------- Summary ----------
  const [summary, setSummary] = useState("");
  const [feedback, setFeedback] = useState<{ score: number; feedback: string } | null>(null);
  const [listening, setListening] = useState(false);
  const recognizer = useRef<{ stop: () => void } | null>(null);
  const [canDictate, setCanDictate] = useState(false);
  useEffect(() => {
    const w = window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown };
    setCanDictate(Boolean(w.SpeechRecognition || w.webkitSpeechRecognition));
  }, []);

  const dictate = () => {
    if (listening) {
      recognizer.current?.stop();
      return;
    }
    const w = window as unknown as Record<string, new () => SpeechRecognitionLike>;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.lang = "en-US";
    r.interimResults = false;
    r.continuous = true;
    r.onresult = (ev) => {
      let text = "";
      for (let i = ev.resultIndex; i < ev.results.length; i++) text += ev.results[i][0].transcript;
      setSummary((s) => (s ? `${s.trimEnd()} ${text.trim()}` : text.trim()));
    };
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    recognizer.current = r;
    setListening(true);
    r.start();
  };

  const submitSummary = async () => {
    recognizer.current?.stop();
    setBusy(true);
    setError(null);
    try {
      const data = await post(`/api/sessions/${sessionId}/summary`, { text: summary });
      setFeedback(data);
      setStage("feedback");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const totalQ = questions.length;
  const doneQ = answered.length + qIndex;

  // ---------- Render ----------
  if (stage === "preread") {
    return (
      <div className="mx-auto max-w-xl py-6 text-center sm:py-12">
        <p className="chip">{passage.genreLabel}</p>
        <h1 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl">{passage.title}</h1>
        <div className="card mt-8 text-left">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">Read with a purpose</p>
          <p className="mt-2 text-lg">{passage.purposeQuestion}</p>
        </div>
        <p className="mt-6 text-sm text-muted">
          Read at your normal pace, the way you would for school. There&apos;s no visible timer. After you read, you&apos;ll answer a few
          questions without looking back, then a few with the passage open.
        </p>
        {error && <p className="mt-4 font-semibold text-bad">{error}</p>}
        <button className="btn-primary mt-8 h-16 w-full max-w-xs text-xl" onClick={startReading} disabled={busy}>
          Start reading
        </button>
      </div>
    );
  }

  if (stage === "reading") {
    return (
      <div className="pb-28">
        <article className="mx-auto max-w-[34em]">
          <h1 className="mb-6 font-serif text-3xl font-bold leading-tight">{passage.title}</h1>
          <PassageText body={passage.body} mode="read" onWord={onWord} />
          <p className="mt-8 text-sm text-muted">Tip: tap any word to see what it means. It goes into your word list.</p>
        </article>

        <div className="fixed inset-x-0 bottom-0 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur">
          <div className="mx-auto flex max-w-[34em] items-center justify-between gap-3">
            {error ? <p className="text-sm font-semibold text-bad">{error}</p> : <span className="text-sm text-muted">Tap Done when you finish.</span>}
            <button className="btn-primary h-14 min-w-[9rem] text-lg" onClick={finishReading} disabled={!canFinish || busy}>
              Done
            </button>
          </div>
        </div>

        {lookup && (
          <div className="fixed inset-x-0 bottom-20 z-20 px-4">
            <div className="card mx-auto max-w-[34em] shadow-lg">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-xl font-bold">{lookup.word}</p>
                  <p className="mt-1 text-ink">
                    {lookup.definition === null ? "Looking it up…" : lookup.definition || "No definition found, but it's saved to your words."}
                  </p>
                  {lookup.definition && <p className="mt-1 text-xs text-muted">Saved to your words.</p>}
                </div>
                <button className="btn-ghost px-3 py-1.5 text-sm" onClick={() => setLookup(null)} aria-label="Close definition">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {(prompt || paused) && (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-ink/40 px-4">
            <div className="card max-w-sm text-center">
              {paused ? (
                <>
                  <p className="font-serif text-2xl font-bold">Paused</p>
                  <p className="mt-2 text-muted">Take your time. Tap below when you&apos;re ready to keep reading.</p>
                  <button className="btn-primary mt-5 w-full" onClick={resume}>Keep reading</button>
                </>
              ) : (
                <>
                  <p className="font-serif text-2xl font-bold">Still reading?</p>
                  <p className="mt-2 text-muted">No rush. Just checking you&apos;re still here.</p>
                  <button className="btn-primary mt-5 w-full" onClick={stillReading}>Yes, still reading</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (stage === "questions" && q) {
    const open = q.phase === "open_book";
    const passageMode = q.format === "evidence_pair" && part === "B" ? "select" : open ? "select" : "view";
    const onSentence = q.format === "evidence_pair" && part === "B" ? (i: number) => setEvidence(i) : toggleHighlight;
    const passagePanel = open && (
      <div className="card max-h-[55vh] overflow-y-auto md:max-h-[calc(100vh-10rem)]">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
          {q.format === "evidence_pair" && part === "B" ? "Tap the supporting sentence" : "Tap sentences to highlight them"}
        </p>
        <PassageText
          body={passage.body}
          mode={passageMode}
          highlighted={highlights}
          selected={q.format === "evidence_pair" && part === "B" ? evidence : null}
          onSentence={onSentence}
        />
      </div>
    );
    return (
      <div className="pb-10">
        <div className="mb-5 flex items-center gap-1.5" aria-label={`Question ${doneQ + 1} of ${totalQ}`}>
          {Array.from({ length: totalQ }).map((_, i) => (
            <span key={i} className={`h-2 flex-1 rounded-full ${i < doneQ ? "bg-brand" : i === doneQ ? "bg-sun" : "bg-line"}`} />
          ))}
        </div>
        <div className={open ? "grid gap-5 md:grid-cols-2" : "mx-auto max-w-2xl"}>
          {open && (
            <div className={`${showPassage || (q.format === "evidence_pair" && part === "B") ? "block" : "hidden"} md:sticky md:top-4 md:block md:self-start`}>
              {passagePanel}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-muted">
              Question {doneQ + 1} of {totalQ} · {open ? "Passage open" : "From memory (passage hidden)"}
            </p>
            {open && !(q.format === "evidence_pair" && part === "B") && (
              <button className="btn-ghost mt-3 w-full py-2 text-sm md:hidden" onClick={() => setShowPassage((v) => !v)}>
                {showPassage ? "Hide passage" : "Show passage"}
              </button>
            )}
            <h2 className="mt-3 text-xl font-bold leading-snug">
              {q.format === "evidence_pair" && <span className="mr-1 text-brand-dark">Part {part}.</span>}
              {q.format === "evidence_pair" && part === "B" ? "Which sentence in the passage best supports your answer to Part A? Tap it." : q.stem}
            </h2>
            {q.format === "multi_select" && <p className="mt-1 text-sm text-muted">Select two.</p>}

            {q.format === "order_events" ? (
              <ol className="mt-4 space-y-2">
                {order.map((id, i) => {
                  const opt = q.options.find((o) => o.id === id)!;
                  return (
                    <li key={id} className="card flex items-center gap-3 p-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft font-bold text-brand-dark">{i + 1}</span>
                      <span className="flex-1">{opt.text}</span>
                      <span className="flex flex-col gap-1">
                        <button
                          className="btn-ghost px-2 py-1 text-xs"
                          aria-label="Move up"
                          disabled={i === 0}
                          onClick={() => setOrder((o) => { const n = [...o]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; return n; })}
                        >
                          ▲
                        </button>
                        <button
                          className="btn-ghost px-2 py-1 text-xs"
                          aria-label="Move down"
                          disabled={i === order.length - 1}
                          onClick={() => setOrder((o) => { const n = [...o]; [n[i + 1], n[i]] = [n[i], n[i + 1]]; return n; })}
                        >
                          ▼
                        </button>
                      </span>
                    </li>
                  );
                })}
              </ol>
            ) : q.format === "evidence_pair" && part === "B" ? (
              <div className="mt-4 rounded-xl bg-paper p-4 text-sm">
                <p className="text-muted">Your Part A answer:</p>
                <p className="mt-1 font-semibold">{q.options.find((o) => o.id === selected[0])?.text}</p>
                <p className="mt-3 text-muted">{evidence === null ? "Now tap a sentence in the passage." : "Sentence selected. You can tap a different one."}</p>
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                {q.options.map((o, i) => {
                  const on = selected.includes(o.id);
                  return (
                    <button
                      key={o.id}
                      aria-pressed={on}
                      onClick={() =>
                        setSelected((sel) =>
                          q.format === "multi_select" ? (on ? sel.filter((x) => x !== o.id) : sel.length < 2 ? [...sel, o.id] : sel) : [o.id],
                        )
                      }
                      className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition ${on ? "border-brand bg-brand-soft" : "border-line bg-card hover:border-brand/40"}`}
                    >
                      <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${on ? "border-brand bg-brand text-white" : "border-line text-muted"}`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{o.text}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {error && <p className="mt-4 font-semibold text-bad">{error}</p>}
            <div className="mt-6 flex gap-3">
              {q.format === "evidence_pair" && part === "B" && (
                <button className="btn-ghost" onClick={() => setPart("A")} disabled={busy}>Back to Part A</button>
              )}
              {q.format === "evidence_pair" && part === "A" ? (
                <button className="btn-primary flex-1" disabled={selected.length !== 1} onClick={() => setPart("B")}>
                  Next: find the evidence
                </button>
              ) : (
                <button className="btn-primary flex-1" disabled={!canSubmit || busy} onClick={submitAnswer}>
                  {qIndex + 1 < remaining.length ? "Next question" : "Finish questions"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "summary" || (stage === "questions" && !q)) {
    const words = summary.trim().split(/\s+/).filter(Boolean).length;
    return (
      <div className="mx-auto max-w-2xl py-4">
        <h1 className="font-serif text-2xl font-bold">Sum it up</h1>
        <p className="mt-2 text-muted">In 1–2 sentences, what was &ldquo;{passage.title}&rdquo; mostly about? Use your own words.</p>
        <textarea
          className="input mt-4 min-h-[9rem] font-serif text-lg"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          maxLength={1500}
          placeholder="This passage is mostly about…"
        />
        <div className="mt-2 flex items-center justify-between text-sm text-muted">
          <span>{words} words</span>
          {canDictate && (
            <button className="btn-ghost px-3 py-1.5 text-sm" onClick={dictate} type="button">
              {listening ? "⏹ Stop dictation" : "🎤 Dictate"}
            </button>
          )}
        </div>
        {error && <p className="mt-4 font-semibold text-bad">{error}</p>}
        <button className="btn-primary mt-6 w-full" onClick={submitSummary} disabled={busy || words < 3}>
          {busy ? "Checking your summary…" : "Submit summary"}
        </button>
      </div>
    );
  }

  if (stage === "feedback" && feedback) {
    return (
      <div className="mx-auto max-w-xl py-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted">Summary feedback</p>
        <p className="mt-3 text-3xl" aria-label={`${feedback.score} out of 4`}>
          {"★".repeat(feedback.score)}
          <span className="text-line">{"★".repeat(4 - feedback.score)}</span>
        </p>
        <p className="card mt-5 text-lg">{feedback.feedback}</p>
        <button className="btn-primary mt-8 w-full" onClick={() => router.refresh()}>
          See my results
        </button>
      </div>
    );
  }

  return null;
}

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: (ev: { resultIndex: number; results: { [i: number]: { [j: number]: { transcript: string } }; length: number } }) => void;
  onend: () => void;
  onerror: () => void;
  start: () => void;
  stop: () => void;
};
