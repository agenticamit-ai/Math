"use client";

import { useEffect, useRef, useState } from "react";
import type { Question, Topic } from "@/content/types";
import { topics } from "@/content/topics";
import { useProgress } from "@/components/Providers";
import { answersMatch } from "@/lib/answers";

const QUESTION_COUNT = 5;
const DURATION_MS = 12 * 60 * 1000;

type Draw = { topic: Topic; question: Question };

function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

function deal(): Draw[] {
  return shuffle(topics)
    .slice(0, QUESTION_COUNT)
    .map((topic) => ({
      topic,
      question: topic.questions[Math.floor(Math.random() * topic.questions.length)],
    }));
}

function clock(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function ContestMode() {
  const { recordContest } = useProgress();
  const [status, setStatus] = useState<"ready" | "live" | "review">("ready");
  const [draws, setDraws] = useState<Draw[]>([]);
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [endsAt, setEndsAt] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [contestId, setContestId] = useState("");
  const answersRef = useRef<string[]>([]);
  const draftRef = useRef("");
  const indexRef = useRef(0);
  const statusRef = useRef(status);
  statusRef.current = status;

  useEffect(() => {
    if (status !== "live") return;
    const timer = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, [status]);

  function updateDraft(value: string) {
    draftRef.current = value;
    setDraft(value);
  }

  function snapshot(): string[] {
    const next = [...answersRef.current];
    next[indexRef.current] = draftRef.current;
    answersRef.current = next;
    setAnswers(next);
    return next;
  }

  function finish() {
    if (statusRef.current !== "live") return;
    statusRef.current = "review";
    snapshot();
    setStatus("review");
  }

  useEffect(() => {
    if (status !== "live" || endsAt === 0) return;
    if (now >= endsAt) finish();
  }, [endsAt, now, status]);

  useEffect(() => {
    if (status !== "review" || !contestId) return;
    const graded = draws.map((draw, drawIndex) => answersMatch(answers[drawIndex] ?? "", draw.question));
    recordContest({
      id: contestId,
      score: graded.filter(Boolean).length,
      total: draws.length,
      topicSlugs: draws.map((draw) => draw.topic.slug),
      correctTopicSlugs: draws.filter((_, drawIndex) => graded[drawIndex]).map((draw) => draw.topic.slug),
    });
  }, [answers, contestId, draws, recordContest, status]);

  function start() {
    const nextDraws = deal();
    const blanks = nextDraws.map(() => "");
    const id = crypto.randomUUID();
    answersRef.current = blanks;
    draftRef.current = "";
    indexRef.current = 0;
    statusRef.current = "live";
    setDraws(nextDraws);
    setAnswers(blanks);
    setDraft("");
    setIndex(0);
    setContestId(id);
    const startTime = Date.now();
    setEndsAt(startTime + DURATION_MS);
    setNow(startTime);
    setStatus("live");
  }

  function jump(nextIndex: number) {
    const saved = snapshot();
    indexRef.current = nextIndex;
    const nextDraft = saved[nextIndex] ?? "";
    draftRef.current = nextDraft;
    setIndex(nextIndex);
    setDraft(nextDraft);
  }

  if (status === "ready") {
    return (
      <section className="card">
        <p className="eyebrow">Contest mode</p>
        <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Five questions. About twelve minutes.</h1>
        <ul className="mt-5 space-y-2 text-xl text-cocoa">
          <li>One question from five different topics.</li>
          <li>Hints stay hidden, like a real meet.</li>
          <li>Explanations open when you finish or when time runs out.</li>
          <li>Each correct answer is worth 12 XP for that topic.</li>
        </ul>
        <button type="button" className="btn-primary mt-6" onClick={start}>
          Start the clock
        </button>
      </section>
    );
  }

  if (status === "review") {
    const graded = draws.map((draw, drawIndex) => answersMatch(answers[drawIndex] ?? "", draw.question));
    const score = graded.filter(Boolean).length;
    return (
      <section className="space-y-4">
        <header className="card bg-[#fff6d8]">
          <p className="eyebrow">Contest results</p>
          <h1 className="mt-2 font-display text-4xl text-ink">
            {score} / {draws.length} correct
          </h1>
          <p className="mt-2 text-xl text-cocoa">
            {score === draws.length
              ? "A clean paper, Kiaan."
              : score >= 3
                ? "Solid meet. Read the steps for the ones that slipped."
                : "Every miss is a map. The steps below show the path."}
          </p>
          <button type="button" className="btn-primary mt-5" onClick={start}>
            Try a new contest
          </button>
        </header>
        {draws.map((draw, drawIndex) => {
          const given = answers[drawIndex]?.trim() ? answers[drawIndex] : "No answer";
          const correct = graded[drawIndex];
          return (
            <article key={draw.question.id} className="card">
              <p className="eyebrow">
                {draw.topic.emoji} {draw.topic.title}
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-ink">{draw.question.prompt}</h2>
              <p className={`mt-3 text-lg font-extrabold ${correct ? "text-leaf" : "text-berry"}`}>
                Your answer: {given}
              </p>
              <p className="text-lg font-extrabold text-ink">Contest answer: {draw.question.answer}</p>
              <ol className="mt-3 list-decimal space-y-2 pl-6 text-lg">
                {draw.question.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p className="mt-3 text-lg">{draw.question.takeaway}</p>
            </article>
          );
        })}
      </section>
    );
  }

  const current = draws[index];
  const remaining = Math.max(0, endsAt - now);
  const urgent = remaining <= 60_000;

  return (
    <section className="space-y-4">
      <div className="card flex flex-wrap items-center justify-between gap-3 py-4">
        <p className="font-display text-2xl text-ink">
          Question {index + 1} of {draws.length}
        </p>
        <p className={`font-display text-3xl ${urgent ? "text-berry" : "text-ink"}`} aria-live="polite">
          {clock(remaining)}
        </p>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-[#f3e2d2]" aria-hidden>
        <div
          className={`h-full ${urgent ? "bg-berry" : "bg-sunflower"}`}
          style={{ width: `${Math.max(0, Math.min(100, (remaining / DURATION_MS) * 100))}%` }}
        />
      </div>
      {current ? (
        <article className="card">
          <p className="eyebrow">
            {current.topic.emoji} {current.topic.title}
          </p>
          <h1 className="mt-3 text-2xl font-extrabold leading-snug text-ink sm:text-3xl">{current.question.prompt}</h1>
          {current.question.choices ? (
            <fieldset className="mt-5 space-y-3">
              <legend className="sr-only">Answer choices</legend>
              {current.question.choices.map((choice) => (
                <label
                  key={choice}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-xl ring-2 ${
                    draft === choice ? "bg-peach ring-coral" : "bg-[#fff8f1] ring-transparent"
                  }`}
                >
                  <input
                    type="radio"
                    name="contest-choice"
                    value={choice}
                    checked={draft === choice}
                    onChange={() => updateDraft(choice)}
                    className="h-5 w-5 accent-coral"
                  />
                  {choice}
                </label>
              ))}
            </fieldset>
          ) : (
            <label className="mt-5 block">
              <span className="font-extrabold text-cocoa">{current.question.answerLabel ?? "Your answer"}</span>
              <input
                value={draft}
                onChange={(event) => updateDraft(event.target.value)}
                className="mt-2 w-full rounded-2xl border-2 border-[#eadccb] bg-[#fffaf4] px-4 py-4 text-2xl outline-none focus:border-coral focus:ring-2 focus:ring-coral"
              />
            </label>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" className="btn-secondary" onClick={() => jump(index - 1)} disabled={index === 0}>
              Back
            </button>
            {index < draws.length - 1 ? (
              <button type="button" className="btn-primary" onClick={() => jump(index + 1)}>
                Next
              </button>
            ) : (
              <button type="button" className="btn-primary" onClick={finish}>
                Finish and see explanations
              </button>
            )}
          </div>
          <p className="mt-4 text-lg text-cocoa">You can go back and change an answer until you finish.</p>
        </article>
      ) : null}
    </section>
  );
}
