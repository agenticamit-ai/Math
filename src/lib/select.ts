import { questions } from "../data";
import type { Question } from "../types";

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Pick the next practice question: the unseen-this-session question whose
 * difficulty is closest to the target, preferring ones never solved correctly.
 */
export function nextAdaptive(
  pool: Question[],
  seen: Set<string>,
  target: number,
  lastCorrect: Map<string, boolean>,
): Question | undefined {
  const candidates = shuffle(pool.filter((q) => !seen.has(q.id)));
  const score = (q: Question) =>
    Math.abs(q.difficulty - target) * 10 + (lastCorrect.get(q.id) === true ? 5 : 0);
  return candidates.sort((a, b) => score(a) - score(b))[0];
}

export interface QuizOptions {
  topicIds: string[];
  count: number;
  minDifficulty: number;
  maxDifficulty: number;
}

export function buildQuiz(opts: QuizOptions): Question[] {
  const pool = questions.filter(
    (q) =>
      opts.topicIds.includes(q.topic) &&
      q.difficulty >= opts.minDifficulty &&
      q.difficulty <= opts.maxDifficulty,
  );
  return shuffle(pool).slice(0, opts.count).sort((a, b) => a.difficulty - b.difficulty);
}

export const TEST_FORMATS = {
  moems: {
    name: "MOEMS Olympiad",
    blurb: "5 problems, 30 minutes, getting harder as you go. Show-your-work style: type the final answer.",
    minutes: 30,
    difficulties: [1, 2, 3, 4, 5],
  },
  cml: {
    name: "CML Meet",
    blurb: "6 problems, 30 minutes, mixed topics. No calculators!",
    minutes: 30,
    difficulties: [1, 2, 2, 3, 3, 4],
  },
} as const;

/**
 * Build a mock test with one problem per difficulty slot, each from a different
 * strand where possible so the test covers a spread of topics.
 */
export function buildTest(format: keyof typeof TEST_FORMATS): Question[] {
  const used = new Set<string>();
  const usedStrands = new Set<string>();
  const out: Question[] = [];
  for (const d of TEST_FORMATS[format].difficulties) {
    const atLevel = shuffle(questions.filter((q) => q.difficulty === d && !used.has(q.id)));
    const pick =
      atLevel.find((q) => q.style === "short" && !usedStrands.has(q.topic.split("-")[0])) ??
      atLevel.find((q) => q.style === "short") ??
      atLevel[0];
    if (!pick) continue;
    used.add(pick.id);
    usedStrands.add(pick.topic.split("-")[0]);
    out.push(pick);
  }
  return out;
}
