import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MathText } from "../components/MathText";
import { AnswerInput, Solution, Stars } from "../components/QuestionCard";
import { topicById } from "../data";
import { isCorrect } from "../lib/answers";
import { progress, useProgress } from "../lib/progress";
import { buildTest, TEST_FORMATS } from "../lib/select";
import type { Question } from "../types";

type Format = keyof typeof TEST_FORMATS;

interface Running {
  format: Format;
  qs: Question[];
  answers: string[];
  flagged: boolean[];
  startedAt: number;
  endsAt: number;
}

function fmt(ms: number) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function Test() {
  const data = useProgress();
  const [run, setRun] = useState<Running | null>(null);
  const [idx, setIdx] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [confirmBlank, setConfirmBlank] = useState(false);
  const [result, setResult] = useState<{ run: Running; correct: boolean[]; durationMs: number } | null>(null);
  const submitted = useRef(false);

  const submit = (r: Running) => {
    if (submitted.current) return;
    submitted.current = true;
    const correct = r.qs.map((q, i) => isCorrect(r.answers[i], q));
    const durationMs = Math.min(Date.now(), r.endsAt) - r.startedAt;
    progress.recordTest(
      { format: r.format, qids: r.qs.map((q) => q.id), answers: r.answers, correct, durationMs },
      r.qs.map((q, i) => ({
        qid: q.id,
        correct: correct[i],
        given: r.answers[i],
        ms: Math.round(durationMs / r.qs.length),
        hintsUsed: 0,
        mode: "test" as const,
      })),
    );
    setResult({ run: r, correct, durationMs });
    setRun(null);
  };

  useEffect(() => {
    if (!run) return;
    const t = setInterval(() => setNow(Date.now()), 250);
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => {
      clearInterval(t);
      window.removeEventListener("beforeunload", warn);
    };
  }, [run]);

  useEffect(() => {
    if (run && now >= run.endsAt) submit(run);
  });

  const start = (format: Format) => {
    const qs = buildTest(format);
    const t = Date.now();
    submitted.current = false;
    setConfirmBlank(false);
    setResult(null);
    setIdx(0);
    setNow(t);
    setRun({
      format,
      qs,
      answers: qs.map(() => ""),
      flagged: qs.map(() => false),
      startedAt: t,
      endsAt: t + TEST_FORMATS[format].minutes * 60_000,
    });
  };

  if (run) {
    const q = run.qs[idx];
    const left = run.endsAt - now;
    const update = (patch: Partial<Running>) => setRun({ ...run, ...patch });
    return (
      <div className="stack">
        <div className="test-bar">
          <strong>{TEST_FORMATS[run.format].name}</strong>
          <span className={`timer ${left < 5 * 60_000 ? "low" : ""}`} role="timer">
            ⏱ {fmt(left)}
          </span>
        </div>
        <div className="test-nav">
          {run.qs.map((_, i) => (
            <button
              key={i}
              className={`qnum ${i === idx ? "current" : ""} ${run.answers[i].trim() ? "answered" : ""} ${run.flagged[i] ? "flagged" : ""}`}
              onClick={() => setIdx(i)}
            >
              {i + 1}
              {run.flagged[i] && "🚩"}
            </button>
          ))}
        </div>
        <div className="card question-card">
          <div className="question-meta">
            <span className="pill">Problem {idx + 1}</span>
          </div>
          <div className="prompt">
            <MathText text={q.prompt} />
          </div>
          <AnswerInput
            q={q}
            value={run.answers[idx]}
            autoFocus
            onChange={(v) => update({ answers: run.answers.map((a, i) => (i === idx ? v : a)) })}
            onEnter={() => idx < run.qs.length - 1 && setIdx(idx + 1)}
          />
          <div className="actions">
            <button className="btn" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>
              ← Back
            </button>
            <button
              className="btn ghost"
              onClick={() => update({ flagged: run.flagged.map((f, i) => (i === idx ? !f : f)) })}
            >
              {run.flagged[idx] ? "Unflag" : "🚩 Flag to come back"}
            </button>
            {idx < run.qs.length - 1 ? (
              <button className="btn primary" onClick={() => setIdx(idx + 1)}>
                Next →
              </button>
            ) : (
              <button
                className="btn primary"
                onClick={() => {
                  const blank = run.answers.filter((a) => !a.trim()).length;
                  if (!blank || confirmBlank) submit(run);
                  else setConfirmBlank(true);
                }}
              >
                {confirmBlank ? "Yes, submit anyway" : "Submit test"}
              </button>
            )}
          </div>
          {confirmBlank && (
            <p className="feedback bad">
              {(() => {
                const blank = run.answers.filter((a) => !a.trim()).length;
                return `${blank} problem${blank > 1 ? "s are" : " is"} still blank. Click the numbers above to go back, or submit anyway.`;
              })()}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (result) {
    const { run: r, correct, durationMs } = result;
    const score = correct.filter(Boolean).length;
    return (
      <div className="stack">
        <h1>{TEST_FORMATS[r.format].name}: results</h1>
        <div className="card summary">
          <p className="big-score">
            {score} / {r.qs.length}
          </p>
          <p className="muted">Finished in {fmt(durationMs)}</p>
        </div>
        {r.qs.map((q, i) => (
          <div key={q.id} className={`card result-card ${correct[i] ? "good" : "bad"}`}>
            <div className="question-meta">
              <span className="pill">
                {correct[i] ? "✅" : "❌"} Problem {i + 1} · {topicById.get(q.topic)?.name}
              </span>
              <Stars n={q.difficulty} />
            </div>
            <MathText text={q.prompt} />
            <p>
              Your answer: <strong>{r.answers[i].trim() || "(blank)"}</strong>
            </p>
            <details open={!correct[i]}>
              <summary>Solution</summary>
              <Solution q={q} />
            </details>
          </div>
        ))}
        <div className="actions">
          <button className="btn primary" onClick={() => start(r.format)}>
            Take another
          </button>
          <Link to="/progress" className="btn">
            See progress
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="stack">
      <h1>Mock tests</h1>
      <p className="muted">Timed and contest-style, with no hints. Find a quiet spot with pencil and scratch paper!</p>
      <div className="grid-2">
        {(Object.keys(TEST_FORMATS) as Format[]).map((f) => (
          <div key={f} className="card action-card">
            <h3>{TEST_FORMATS[f].name}</h3>
            <p>{TEST_FORMATS[f].blurb}</p>
            <button className="btn primary" onClick={() => start(f)}>
              Start ({TEST_FORMATS[f].minutes} min)
            </button>
          </div>
        ))}
      </div>
      {data.tests.length > 0 && (
        <div className="card">
          <h3>Past tests</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Test</th>
                <th>Score</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {[...data.tests].reverse().map((t) => (
                <tr key={t.id}>
                  <td>{new Date(t.at).toLocaleDateString()}</td>
                  <td>{TEST_FORMATS[t.format].name}</td>
                  <td>
                    {t.correct.filter(Boolean).length} / {t.correct.length}
                  </td>
                  <td>{fmt(t.durationMs)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
