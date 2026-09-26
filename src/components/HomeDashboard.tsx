"use client";

import Link from "next/link";
import { topics, getTopic } from "@/content/topics";
import { RankBadge } from "@/components/RankBadge";
import { useProgress } from "@/components/Providers";
import { dateKey, topicProgress, totalXp } from "@/lib/progress";

const CARD_TINTS = ["bg-[#FFF1E4]", "bg-[#E7F7F4]", "bg-[#FFF6D8]", "bg-[#EEF1FF]", "bg-[#FDE8EF]", "bg-[#F3F8E4]"];

function weekKeys(): string[] {
  const days: string[] = [];
  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    days.push(dateKey(date));
  }
  return days;
}

export function HomeDashboard() {
  const { ready, state } = useProgress();
  const xp = totalXp(state);
  const solved = Object.values(state.topics).reduce((sum, topic) => sum + topic.correctIds.length, 0);
  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const continueTopic = state.lastLesson ? getTopic(state.lastLesson.topicSlug) : undefined;
  const continueHref = !continueTopic
    ? `/topics/${topics[0].slug}`
    : state.lastLesson?.stage === "practice"
      ? `/topics/${continueTopic.slug}/practice`
      : `/topics/${continueTopic.slug}`;
  const continueLabel = !continueTopic
    ? `Start with ${topics[0].title}`
    : state.lastLesson?.stage === "practice"
      ? `Continue practice: ${continueTopic.title}`
      : state.lastLesson?.stage === "tricks"
        ? `Continue tricks: ${continueTopic.title}`
        : `Continue concept: ${continueTopic.title}`;

  if (!ready) {
    return (
      <section className="card">
        <p className="font-display text-3xl text-ink">Opening Kiaan’s notebook…</p>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <section className="card relative overflow-hidden">
        <div className="absolute -right-6 -top-8 h-32 w-32 rounded-full bg-sunflower/80" aria-hidden />
        <p className="eyebrow">Welcome back</p>
        <h1 className="mt-2 max-w-xl font-display text-4xl leading-tight text-ink sm:text-5xl">
          Hi Kiaan. Ready for a math adventure?
        </h1>
        <p className="mt-3 max-w-2xl text-xl text-cocoa">
          Concept, contest tricks, then practice. Hints nudge you. The full path shows up after you answer.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <RankBadge xp={xp} scale="overall" />
          <p className="text-lg font-extrabold text-ink">
            {solved} / {totalQuestions} questions solved
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <article className="card bg-[#FFF6D8]">
          <p className="eyebrow">Day streak</p>
          <p className="mt-2 font-display text-4xl text-ink">{state.streakDays}</p>
          <p className="text-lg text-cocoa">{state.streakDays === 1 ? "day in a row" : "days in a row"}</p>
          <div className="mt-4 flex gap-2" aria-label="This week">
            {weekKeys().map((day) => {
              const on = state.activeDates.includes(day);
              const label = new Date(`${day}T12:00:00`).toLocaleDateString(undefined, { weekday: "narrow" });
              return (
                <span key={day} className="flex flex-col items-center gap-1 text-sm font-bold text-cocoa">
                  {label}
                  <span className={`h-4 w-4 rounded-full ${on ? "bg-coral" : "bg-white ring-2 ring-[#eadccb]"}`} />
                </span>
              );
            })}
          </div>
        </article>
        <article className="card sm:col-span-2">
          <p className="eyebrow">Keep going</p>
          <h2 className="mt-2 font-display text-3xl text-ink">{continueLabel}</h2>
          <p className="mt-2 text-lg text-cocoa">
            {continueTopic
              ? "Your place is saved in this browser."
              : "Pick a topic below, or jump into the first lesson."}
          </p>
          <Link href={continueHref} className="btn-primary mt-5">
            Continue
          </Link>
        </article>
      </section>

      <section className="card flex flex-col gap-4 bg-ink text-cream sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-sunflower">Contest mode</p>
          <h2 className="mt-1 font-display text-3xl">5 questions · about 12 minutes</h2>
          <p className="mt-2 max-w-xl text-lg text-[#f6e7da]">
            Mixed topics, no hints, explanations after the timer. A small meet, just for you.
          </p>
        </div>
        <Link href="/contest" className="btn bg-sunflower text-ink">
          Start a contest
        </Link>
      </section>

      <section>
        <h2 className="font-display text-3xl text-ink">Pick a topic</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {topics.map((topic, index) => {
            const progress = topicProgress(state, topic.slug);
            return (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className={`card block ${CARD_TINTS[index % CARD_TINTS.length]} transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral`}
              >
                <p className="text-3xl" aria-hidden>
                  {topic.emoji}
                </p>
                <h3 className="mt-2 font-display text-2xl text-ink">{topic.title}</h3>
                <p className="mt-1 text-lg text-cocoa">{topic.tagline}</p>
                <p className="mt-4 font-extrabold text-ink">
                  {progress.correctIds.length}/{topic.questions.length} solved · {progress.xp} XP
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
