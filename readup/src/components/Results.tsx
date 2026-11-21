import Link from "next/link";
import type { AnswerResponse, QuestionOption, Trap } from "@/db/schema";
import { mean } from "@/lib/metrics";
import { num, pct } from "@/lib/format";
import { SKILL_LABELS, TRAP_LABELS } from "@/lib/scoring";
import { allSentences, segment } from "@/lib/text";

type ResultQuestion = {
  id: string;
  skill: string;
  format: string;
  phase: "closed_book" | "open_book";
  stem: string;
  options: QuestionOption[];
  correct: string[];
  explanation: string;
  evidenceStart: number;
  evidenceEnd: number;
};

type Props = {
  title: string;
  body: string;
  wpm: number | null;
  accuracy: number | null;
  err: number | null;
  isValid: boolean | null;
  invalidReason: string | null;
  attemptNumber: number;
  isPlacement: boolean;
  xp: number;
  streak: number;
  previous: { wpm: number | null; accuracy: number | null; err: number | null }[];
  questions: ResultQuestion[];
  answers: Map<string, { response: AnswerResponse; score: number; isCorrect: boolean }>;
  summary: { text: string; aiScore: number | null; aiFeedback: string | null } | null;
};

/** The paragraph(s) holding the evidence, with the evidence itself marked. */
function EvidenceQuote({ body, start, end }: { body: string; start: number; end: number }) {
  const blocks = segment(body).filter((b) => b.start < end && b.end > start);
  return (
    <blockquote className="mt-3 border-l-4 border-sun bg-paper px-4 py-3 font-serif text-[17px] leading-relaxed">
      {blocks.map((b) => (
        <p key={b.start} className="whitespace-pre-line">
          {body.slice(b.start, Math.max(b.start, start))}
          <mark className="rounded bg-mark px-0.5">{body.slice(Math.max(b.start, start), Math.min(b.end, end))}</mark>
          {body.slice(Math.min(b.end, end), b.end)}
        </p>
      ))}
    </blockquote>
  );
}

function Delta({ now, before, asPct }: { now: number | null; before: number | null; asPct?: boolean }) {
  if (now === null || before === null) return <span className="text-muted">first read</span>;
  const d = asPct ? Math.round((now - before) * 100) : Math.round(now - before);
  const sign = d > 0 ? "+" : "";
  return (
    <span className={d >= 0 ? "text-good" : "text-bad"}>
      {sign}
      {d}
      {asPct ? " pts" : ""} vs your last {""}
    </span>
  );
}

export function Results(p: Props) {
  const prevWpm = mean(p.previous.map((x) => x.wpm ?? 0));
  const prevAcc = mean(p.previous.map((x) => x.accuracy ?? 0));
  const prevErr = mean(p.previous.map((x) => x.err ?? 0));
  const n = p.previous.length;
  const sentences = allSentences(p.body);
  const optText = (q: ResultQuestion, id: string) => q.options.find((o) => o.id === id)?.text ?? "";

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted">Results</p>
      <h1 className="mt-1 font-serif text-3xl font-bold">{p.title}</h1>
      <p className="mt-2 text-muted">
        +{p.xp} XP · {p.streak}-day streak{p.isPlacement ? " · Placement read" : ""}
        {p.attemptNumber > 1 ? ` · Re-read #${p.attemptNumber}` : ""}
      </p>

      {p.isValid === false && (
        <p className="mt-4 rounded-xl bg-sun-soft px-4 py-3 text-sm">
          This read won&apos;t count toward your speed chart ({p.invalidReason}). Your answers still count for skills.
        </p>
      )}

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Speed</p>
          <p className="mt-1 text-3xl font-bold tabular-nums">{num(p.wpm)} <span className="text-base font-semibold text-muted">WPM</span></p>
          <p className="mt-1 text-xs">{n ? <><Delta now={p.wpm} before={prevWpm} />{n} reads</> : <span className="text-muted">Your first read</span>}</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Accuracy</p>
          <p className="mt-1 text-3xl font-bold tabular-nums">{pct(p.accuracy)}</p>
          <p className="mt-1 text-xs">{n ? <><Delta now={p.accuracy} before={prevAcc} asPct />{n} reads</> : <span className="text-muted">From-memory questions count 1.5×</span>}</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Effective rate</p>
          <p className="mt-1 text-3xl font-bold tabular-nums">{num(p.err)}</p>
          <p className="mt-1 text-xs">{n ? <><Delta now={p.err} before={prevErr} />{n} reads</> : <span className="text-muted">Speed × accuracy</span>}</p>
        </div>
      </section>
      <p className="mt-2 text-xs text-muted">Effective rate rewards speed only when you understand what you read. Harder passages are naturally slower.</p>

      {p.summary && (
        <section className="card mt-6">
          <h2 className="font-bold">Your summary <span className="ml-1 text-sun">{"★".repeat(p.summary.aiScore ?? 0)}</span><span className="text-line">{"★".repeat(4 - (p.summary.aiScore ?? 0))}</span></h2>
          <p className="mt-2 font-serif text-lg">&ldquo;{p.summary.text}&rdquo;</p>
          {p.summary.aiFeedback && <p className="mt-2 text-sm text-muted">{p.summary.aiFeedback}</p>}
        </section>
      )}

      <h2 className="mt-8 text-lg font-bold">Question review</h2>
      <ol className="mt-3 space-y-4">
        {p.questions.map((q, i) => {
          const a = p.answers.get(q.id);
          const sel = a?.response.selected ?? [];
          const score = a?.score ?? 0;
          const traps = sel.filter((id) => !q.correct.includes(id)).map((id) => q.options.find((o) => o.id === id)?.trap).filter(Boolean) as Trap[];
          const status = score === 1 ? "Correct" : score > 0 ? "Half credit" : a ? "Not quite" : "Skipped";
          const color = score === 1 ? "text-good" : score > 0 ? "text-sun" : "text-bad";
          return (
            <li key={q.id} className="card">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className={color}>{status}</span>
                <span className="text-muted">· {SKILL_LABELS[q.skill]} · {q.phase === "closed_book" ? "From memory" : "Passage open"}</span>
              </div>
              <p className="mt-2 font-semibold">{i + 1}. {q.stem}</p>
              {q.format === "order_events" ? (
                <div className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-muted">Your order</p>
                    <ol className="ml-5 list-decimal">{sel.map((id) => <li key={id}>{optText(q, id)}</li>)}</ol>
                  </div>
                  <div>
                    <p className="text-muted">Correct order</p>
                    <ol className="ml-5 list-decimal">{q.correct.map((id) => <li key={id}>{optText(q, id)}</li>)}</ol>
                  </div>
                </div>
              ) : (
                <div className="mt-2 space-y-1 text-sm">
                  {sel.length > 0 && score < 1 && <p><span className="text-muted">You chose:</span> {sel.map((id) => optText(q, id)).join(" / ")}</p>}
                  <p><span className="text-muted">{score === 1 ? "Your answer:" : "Best answer:"}</span> <strong>{q.correct.map((id) => optText(q, id)).join(" / ")}</strong></p>
                  {q.format === "evidence_pair" && a?.response.evidenceSentence !== undefined && (
                    <p>
                      <span className="text-muted">Part B, your evidence:</span> &ldquo;{sentences[a.response.evidenceSentence]?.text}&rdquo;{" "}
                      {score === 1 ? <span className="text-good">✓</span> : <span className="text-bad">(see the highlighted sentence below)</span>}
                    </p>
                  )}
                </div>
              )}
              {traps.length > 0 && (
                <p className="mt-3 rounded-lg bg-bad/5 px-3 py-2 text-sm">
                  <strong>Trap: {TRAP_LABELS[traps[0]].name}.</strong> {TRAP_LABELS[traps[0]].tip}
                </p>
              )}
              <p className="mt-3 text-sm">{q.explanation}</p>
              <EvidenceQuote body={p.body} start={q.evidenceStart} end={q.evidenceEnd} />
            </li>
          );
        })}
      </ol>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/home" className="btn-primary flex-1">Back to home</Link>
        <Link href="/progress" className="btn-ghost flex-1">See my progress</Link>
      </div>
    </div>
  );
}
