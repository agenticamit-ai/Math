"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Topic } from "@/content/types";
import { useProgress } from "@/components/Providers";
import { answersMatch, equivalentFormNote } from "@/lib/answers";
import { correctMessage, difficultyLabel, wrongMessage } from "@/lib/messages";
import { topicProgress } from "@/lib/progress";

export function PracticeSession({ topic }: { topic: Topic }) {
  const { ready, state, recordAttempt, noteVisit } = useProgress();
  const [index, setIndex] = useState(0);
  const [booted, setBooted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [hintsOpen, setHintsOpen] = useState(0);
  const [status, setStatus] = useState<"open" | "correct" | "revealed">("open");
  const [feedback, setFeedback] = useState("");
  const [formNote, setFormNote] = useState<string | null>(null);
  const [earned, setEarned] = useState(0);
  const [tries, setTries] = useState(0);
  const [session, setSession] = useState({ correct: 0, xp: 0 });
  const settled = useRef(false);

  useEffect(() => {
    if (!ready || booted) return;
    const progress = topicProgress(state, topic.slug);
    const firstOpen = topic.questions.findIndex((question) => !progress.correctIds.includes(question.id));
    setIndex(firstOpen === -1 ? 0 : firstOpen);
    setBooted(true);
    noteVisit(topic.slug, "practice");
  }, [booted, noteVisit, ready, state, topic]);

  const finished = booted && index >= topic.questions.length;
  const question = topic.questions[index];
  const solvedIds = topicProgress(state, topic.slug).correctIds;

  function resetCard() {
    setAnswer("");
    setHintsOpen(0);
    setStatus("open");
    setFeedback("");
    setFormNote(null);
    setEarned(0);
    setTries(0);
    settled.current = false;
  }

  function settle(correct: boolean, revealed: boolean) {
    if (!question || settled.current) return;
    settled.current = true;
    const xp = recordAttempt({
      topicSlug: topic.slug,
      questionId: question.id,
      correct,
      hintsUsed: hintsOpen,
      revealed,
    });
    setEarned(xp);
    setSession((prev) => ({ correct: prev.correct + (correct ? 1 : 0), xp: prev.xp + xp }));
  }

  function checkAnswer() {
    if (!question || status !== "open") return;
    if (answersMatch(answer, question)) {
      setStatus("correct");
      setFeedback(correctMessage(index + tries));
      setFormNote(equivalentFormNote(answer, question.answer));
      settle(true, false);
      return;
    }
    setTries((count) => count + 1);
    setFeedback(wrongMessage(index + tries));
  }

  function showSteps() {
    if (!question || status !== "open") return;
    setStatus("revealed");
    setFeedback("Here is the whole path. The next one is a fresh start.");
    settle(false, true);
  }

  function goNext() {
    resetCard();
    setIndex((current) => current + 1);
  }

  if (!ready || !booted) {
    return (
      <section className="card">
        <p className="font-display text-3xl">Finding your next question…</p>
      </section>
    );
  }

  if (finished || !question) {
    return (
      <section className="card">
        <p className="eyebrow">{topic.title}</p>
        <h1 className="mt-2 font-display text-4xl text-ink">Practice set complete</h1>
        <p className="mt-3 text-xl text-cocoa">
          This round: {session.correct} correct · {session.xp} XP. Your stars stay saved for Kiaan.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setSession({ correct: 0, xp: 0 });
              resetCard();
              setIndex(0);
            }}
          >
            Practice from the start
          </button>
          <Link href={`/topics/${topic.slug}`} className="btn-secondary">
            Back to the lesson
          </Link>
        </div>
      </section>
    );
  }

  const showExplanation = status === "correct" || status === "revealed";

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">{topic.emoji} {topic.title}</p>
          <h1 className="font-display text-3xl text-ink">
            Question {index + 1} of {topic.questions.length}
          </h1>
        </div>
        <p className="font-extrabold text-cocoa">This round {session.xp} XP</p>
      </div>
      <div className="flex flex-wrap gap-2" aria-hidden>
        {topic.questions.map((item, dot) => (
          <span
            key={item.id}
            className={`h-3 w-8 rounded-full ${
              dot === index ? "bg-coral" : solvedIds.includes(item.id) ? "bg-leaf" : "bg-[#f0dccb]"
            }`}
          />
        ))}
      </div>

      <article className="card">
        <p className="eyebrow">{difficultyLabel(question.difficulty)}</p>
        <h2 className="mt-3 text-2xl font-extrabold leading-snug text-ink sm:text-3xl">{question.prompt}</h2>

        {question.choices ? (
          <fieldset className="mt-5 space-y-3">
            <legend className="sr-only">Answer choices</legend>
            {question.choices.map((choice) => (
              <label
                key={choice}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-xl ring-2 ${
                  answer === choice ? "bg-peach ring-coral" : "bg-[#fff8f1] ring-transparent"
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={choice}
                  checked={answer === choice}
                  onChange={() => setAnswer(choice)}
                  disabled={status !== "open"}
                  className="h-5 w-5 accent-coral"
                />
                {choice}
              </label>
            ))}
          </fieldset>
        ) : (
          <label className="mt-5 block">
            <span className="font-extrabold text-cocoa">{question.answerLabel ?? "Your answer"}</span>
            <input
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") checkAnswer();
              }}
              disabled={status !== "open"}
              inputMode="text"
              className="mt-2 w-full rounded-2xl border-2 border-[#eadccb] bg-[#fffaf4] px-4 py-4 text-2xl text-ink outline-none ring-coral focus:border-coral focus:ring-2"
            />
          </label>
        )}

        {status === "open" ? (
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" className="btn-primary" onClick={checkAnswer}>
              Check answer
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setHintsOpen((count) => Math.min(3, count + 1))}
              disabled={hintsOpen >= 3}
            >
              {hintsOpen === 0 ? "Need a hint?" : hintsOpen < 3 ? "Another hint" : "All hints open"}
            </button>
            {tries > 0 || hintsOpen === 3 ? (
              <button type="button" className="btn-secondary" onClick={showSteps}>
                Show the steps
              </button>
            ) : null}
          </div>
        ) : null}

        {feedback ? (
          <p className={`mt-5 text-xl font-extrabold ${status === "correct" ? "text-leaf" : "text-berry"}`} role="status">
            {feedback}
            {status !== "open" && earned > 0 ? ` +${earned} XP` : ""}
          </p>
        ) : null}
        {formNote ? <p className="mt-2 text-lg text-cocoa">{formNote}</p> : null}

        {hintsOpen > 0 ? (
          <ol className="mt-5 space-y-3">
            {question.hints.slice(0, hintsOpen).map((hint, hintIndex) => (
              <li key={hint} className="rounded-2xl bg-[#fff6d8] px-4 py-3 text-lg">
                <span className="font-display text-coral">Hint {hintIndex + 1}. </span>
                {hint}
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-5 text-lg text-cocoa">Hints stay folded until you ask. Each one explains a little more.</p>
        )}

        {showExplanation ? (
          <div className="mt-6 rounded-2xl bg-mist p-5">
            <h3 className="font-display text-2xl text-leaf">Step by step</h3>
            <p className="mt-2 text-lg font-extrabold text-ink">Answer: {question.answer}</p>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-lg">
              {question.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-4 text-lg font-extrabold text-ink">{question.takeaway}</p>
            <button type="button" className="btn-primary mt-5" onClick={goNext}>
              {index === topic.questions.length - 1 ? "See how I did" : "Next question"}
            </button>
          </div>
        ) : null}
      </article>
    </section>
  );
}
