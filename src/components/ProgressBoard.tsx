"use client";

import Link from "next/link";
import { useState } from "react";
import { topics } from "@/content/topics";
import { RankBadge } from "@/components/RankBadge";
import { useProgress } from "@/components/Providers";
import { dateKey, topicProgress, totalXp } from "@/lib/progress";

export function ProgressBoard() {
  const { ready, state, reset } = useProgress();
  const [confirming, setConfirming] = useState(false);
  const xp = totalXp(state);
  const solved = Object.values(state.topics).reduce((sum, topic) => sum + topic.correctIds.length, 0);
  const tried = Object.values(state.topics).reduce((sum, topic) => sum + topic.attemptedIds.length, 0);

  if (!ready) {
    return (
      <section className="card">
        <p className="font-display text-3xl">Loading Kiaan’s scores…</p>
      </section>
    );
  }

  const days: { key: string; label: string }[] = [];
  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    days.push({
      key: dateKey(date),
      label: date.toLocaleDateString(undefined, { weekday: "short" }),
    });
  }

  return (
    <div className="space-y-6">
      <header className="card">
        <p className="eyebrow">Learner</p>
        <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">{state.learner}’s ranks</h1>
        <p className="mt-3 text-xl text-cocoa">
          Scores, streaks, and ranks stay in this browser. {solved} questions solved · {tried} tried.
        </p>
        <div className="mt-5">
          <RankBadge xp={xp} scale="overall" />
        </div>
        <p className="mt-4 font-display text-3xl text-ink">
          {state.streakDays} day streak
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {days.map((day) => (
            <div key={day.key} className="text-center">
              <div
                className={`mx-auto h-8 w-8 rounded-full ${state.activeDates.includes(day.key) ? "bg-coral" : "bg-[#f3e2d2]"}`}
                aria-label={`${day.label} ${state.activeDates.includes(day.key) ? "practiced" : "not yet"}`}
              />
              <p className="mt-1 text-sm font-bold text-cocoa">{day.label}</p>
            </div>
          ))}
        </div>
      </header>

      <section className="grid gap-4">
        {topics.map((topic) => {
          const progress = topicProgress(state, topic.slug);
          return (
            <article key={topic.slug} className="card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl text-ink">
                    {topic.emoji} {topic.title}
                  </h2>
                  <p className="text-lg text-cocoa">
                    {progress.correctIds.length}/{topic.questions.length} solved · concept {progress.conceptChecked ? "saved" : "open"} · tricks {progress.tricksChecked ? "saved" : "open"}
                  </p>
                </div>
                <Link href={`/topics/${topic.slug}`} className="btn-secondary">
                  Open
                </Link>
              </div>
              <div className="mt-4">
                <RankBadge xp={progress.xp} scale="topic" compact />
              </div>
            </article>
          );
        })}
      </section>

      <section className="card">
        <h2 className="font-display text-3xl text-ink">Contest scores</h2>
        {state.contests.length === 0 ? (
          <p className="mt-2 text-lg text-cocoa">No contests yet. A five-question meet lives on the Contest page.</p>
        ) : (
          <ul className="mt-4 space-y-2 text-lg">
            {state.contests.map((contest) => (
              <li key={contest.id} className="flex flex-wrap justify-between gap-2 rounded-2xl bg-[#fff8f1] px-4 py-3">
                <span>{contest.date}</span>
                <span className="font-extrabold">
                  {contest.score}/{contest.total} · {contest.xp} XP
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card">
        <h2 className="font-display text-2xl text-ink">Reset this browser</h2>
        <p className="mt-2 text-lg text-cocoa">This clears Kiaan’s scores, streak, contest history, and saved parent notes on this device.</p>
        {confirming ? (
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                reset();
                setConfirming(false);
              }}
            >
              Yes, reset
            </button>
            <button type="button" className="btn-secondary" onClick={() => setConfirming(false)}>
              Keep my progress
            </button>
          </div>
        ) : (
          <button type="button" className="btn-secondary mt-4" onClick={() => setConfirming(true)}>
            Reset progress
          </button>
        )}
      </section>
    </div>
  );
}
