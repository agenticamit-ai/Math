"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { Topic } from "@/content/types";
import { RankBadge } from "@/components/RankBadge";
import { useProgress } from "@/components/Providers";
import { topicProgress } from "@/lib/progress";

export function TopicLesson({ topic }: { topic: Topic }) {
  const { ready, state, markConcept, markTricks, noteVisit } = useProgress();
  const progress = topicProgress(state, topic.slug);

  useEffect(() => {
    if (!ready) return;
    noteVisit(topic.slug, "concept");
  }, [ready, noteVisit, topic.slug]);

  return (
    <article className="space-y-6">
      <header className="card">
        <p className="text-4xl" aria-hidden>
          {topic.emoji}
        </p>
        <p className="eyebrow mt-3">Topic path</p>
        <h1 className="mt-1 font-display text-4xl text-ink sm:text-5xl">{topic.title}</h1>
        <p className="mt-3 max-w-2xl text-xl text-cocoa">{topic.tagline}</p>
        <div className="mt-5">
          {ready ? <RankBadge xp={progress.xp} scale="topic" /> : <p className="text-lg">Loading your rank…</p>}
        </div>
        <ol className="mt-6 grid gap-3 sm:grid-cols-3">
          {["Concept", "Contest tricks", "Practice"].map((step, index) => (
            <li key={step} className="rounded-2xl bg-peach px-4 py-3 font-display text-xl text-ink">
              <span className="mr-2 text-coral">{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </header>

      <section className="card" id="concept">
        <p className="eyebrow">1 · Concept</p>
        <h2 className="mt-1 font-display text-3xl text-ink">The idea</h2>
        <p className="mt-3 text-xl leading-relaxed">{topic.concept.intro}</p>
        <div className="mt-5 space-y-4">
          {topic.concept.ideas.map((idea) => (
            <div key={idea.heading} className="rounded-2xl bg-[#fff8f1] p-4">
              <h3 className="font-display text-2xl text-ink">{idea.heading}</h3>
              <p className="mt-1 text-lg leading-relaxed text-cocoa">{idea.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl bg-mist p-5">
          <h3 className="font-display text-2xl text-leaf">Watch one example</h3>
          <p className="mt-2 text-xl font-extrabold text-ink">{topic.concept.example.problem}</p>
          <ol className="mt-3 list-decimal space-y-2 pl-6 text-lg">
            {topic.concept.example.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <button type="button" className="btn-leaf mt-5" onClick={() => markConcept(topic.slug)}>
          {progress.conceptChecked ? "Concept saved" : "I get this concept · +5 XP"}
        </button>
      </section>

      <section className="card" id="tricks">
        <p className="eyebrow">2 · Contest tricks</p>
        <h2 className="mt-1 font-display text-3xl text-ink">Habits that save time</h2>
        <ol className="mt-5 space-y-4">
          {topic.tricks.map((trick, index) => (
            <li key={trick.title} className="rounded-2xl bg-[#fff6d8] p-4">
              <h3 className="font-display text-2xl text-ink">
                {index + 1}. {trick.title}
              </h3>
              <p className="mt-1 text-lg leading-relaxed">{trick.detail}</p>
            </li>
          ))}
        </ol>
        <button type="button" className="btn-secondary mt-5" onClick={() => markTricks(topic.slug)}>
          {progress.tricksChecked ? "Tricks saved" : "Tricks are ready · +5 XP"}
        </button>
      </section>

      <section className="card bg-peach">
        <p className="eyebrow">3 · Practice</p>
        <h2 className="mt-1 font-display text-3xl text-ink">
          {progress.correctIds.length}/{topic.questions.length} questions solved
        </h2>
        <p className="mt-2 text-lg text-cocoa">
          Hints open one at a time. The step-by-step explanation waits until you answer, or until you ask for it.
        </p>
        <Link href={`/topics/${topic.slug}/practice`} className="btn-primary mt-5">
          Start practice
        </Link>
      </section>
    </article>
  );
}
