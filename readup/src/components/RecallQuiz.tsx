"use client";

import Link from "next/link";
import { useState } from "react";

type Q = { id: string; stem: string; options: { id: string; text: string }[] };
type Review = { questionId: string; correct: string; isCorrect: boolean; explanation: string; evidence: string };

export function RecallQuiz({ passageId, title, daysAgo, questions }: { passageId: string; title: string; daysAgo: number; questions: Q[] }) {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ correct: number; total: number; xp: number; review: Review[] } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const q = questions[i];

  const submit = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/recall", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ passageId, answers: questions.map((x) => ({ questionId: x.id, selected: answers[x.id] ?? "" })) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setResult(data);
      window.scrollTo({ top: 0 });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (result) {
    return (
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted">Remember this?</p>
        <h1 className="mt-1 font-serif text-3xl font-bold">
          {result.correct} of {result.total} remembered
        </h1>
        <p className="mt-2 text-muted">
          {result.correct === result.total ? "Your memory is sharp!" : "Nice effort. Remembering facts a week later is hard, and every try helps."}
          {result.xp ? ` +${result.xp} XP` : ""}
        </p>
        <ol className="mt-6 space-y-4">
          {questions.map((x, n) => {
            const r = result.review.find((v) => v.questionId === x.id)!;
            const mine = x.options.find((o) => o.id === answers[x.id])?.text;
            return (
              <li key={x.id} className="card">
                <p className={`text-xs font-semibold ${r.isCorrect ? "text-good" : "text-bad"}`}>{r.isCorrect ? "Remembered" : "Not quite"}</p>
                <p className="mt-1 font-semibold">{n + 1}. {x.stem}</p>
                {!r.isCorrect && mine && <p className="mt-1 text-sm"><span className="text-muted">You chose:</span> {mine}</p>}
                <p className="mt-1 text-sm"><span className="text-muted">Answer:</span> <strong>{x.options.find((o) => o.id === r.correct)?.text}</strong></p>
                <p className="mt-2 text-sm">{r.explanation}</p>
                <blockquote className="mt-2 border-l-4 border-sun bg-paper px-3 py-2 font-serif text-[16px]">
                  <mark className="rounded bg-mark px-0.5">{r.evidence}</mark>
                </blockquote>
              </li>
            );
          })}
        </ol>
        <Link href="/home" className="btn-primary mt-8 w-full">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted">Remember this?</p>
      <h1 className="mt-1 font-serif text-2xl font-bold">{title}</h1>
      <p className="mt-1 text-sm text-muted">You read this {daysAgo} days ago. Answer from memory; no peeking at the passage.</p>
      <div className="mt-5 flex items-center gap-1.5" aria-label={`Question ${i + 1} of ${questions.length}`}>
        {questions.map((_, n) => (
          <span key={n} className={`h-2 flex-1 rounded-full ${n < i ? "bg-brand" : n === i ? "bg-sun" : "bg-line"}`} />
        ))}
      </div>
      <h2 className="mt-6 text-xl font-bold leading-snug">{q.stem}</h2>
      <div className="mt-4 space-y-2">
        {q.options.map((o, n) => {
          const on = answers[q.id] === o.id;
          return (
            <button
              key={o.id}
              aria-pressed={on}
              onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))}
              className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition ${on ? "border-brand bg-brand-soft" : "border-line bg-card hover:border-brand/40"}`}
            >
              <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${on ? "border-brand bg-brand text-white" : "border-line text-muted"}`}>
                {String.fromCharCode(65 + n)}
              </span>
              <span>{o.text}</span>
            </button>
          );
        })}
      </div>
      {error && <p className="mt-4 font-semibold text-bad">{error}</p>}
      <div className="mt-6 flex gap-3">
        {i > 0 && <button className="btn-ghost" onClick={() => setI(i - 1)}>Back</button>}
        {i + 1 < questions.length ? (
          <button className="btn-primary flex-1" disabled={!answers[q.id]} onClick={() => setI(i + 1)}>Next question</button>
        ) : (
          <button className="btn-primary flex-1" disabled={!answers[q.id] || busy} onClick={submit}>{busy ? "Checking…" : "See how I did"}</button>
        )}
      </div>
    </div>
  );
}
