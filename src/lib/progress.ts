import { useSyncExternalStore } from "react";
import { questionById, topics } from "../data";

export type Mode = "practice" | "quiz" | "test" | "review";

export interface Attempt {
  qid: string;
  correct: boolean;
  given: string;
  /** Time spent on the question in milliseconds. */
  ms: number;
  hintsUsed: number;
  mode: Mode;
  at: string;
}

export interface TestResult {
  id: string;
  format: "moems" | "cml";
  at: string;
  qids: string[];
  answers: string[];
  correct: boolean[];
  durationMs: number;
}

export interface ProgressData {
  version: 1;
  name: string;
  attempts: Attempt[];
  tests: TestResult[];
}

const KEY = "mathprep.progress.v1";
const empty = (): ProgressData => ({ version: 1, name: "", attempts: [], tests: [] });

function load(): ProgressData {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...empty(), ...JSON.parse(raw) };
  } catch {
    /* fall through to empty */
  }
  return empty();
}

let state = load();
const listeners = new Set<() => void>();

function save(next: ProgressData) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked: keep in memory */
  }
  listeners.forEach((l) => l());
}

export const progress = {
  get: () => state,
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  setName: (name: string) => save({ ...state, name }),
  record: (a: Omit<Attempt, "at">) =>
    save({ ...state, attempts: [...state.attempts, { ...a, at: new Date().toISOString() }] }),
  recordTest: (t: Omit<TestResult, "id" | "at">, attempts: Omit<Attempt, "at">[]) => {
    const at = new Date().toISOString();
    save({
      ...state,
      tests: [...state.tests, { ...t, id: crypto.randomUUID(), at }],
      attempts: [...state.attempts, ...attempts.map((a) => ({ ...a, at }))],
    });
  },
  exportJson: () => JSON.stringify(state, null, 2),
  importJson(json: string) {
    const data = JSON.parse(json) as ProgressData;
    if (data.version !== 1 || !Array.isArray(data.attempts) || !Array.isArray(data.tests)) {
      throw new Error("This doesn't look like a progress backup file.");
    }
    save({ ...empty(), ...data });
  },
  reset: () => save(empty()),
};

// Re-subscribing on every storage event keeps two open tabs in sync.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      state = load();
      listeners.forEach((l) => l());
    }
  });
}

export function useProgress(): ProgressData {
  return useSyncExternalStore(progress.subscribe, progress.get);
}

// ---------- derived stats ----------

export type MasteryLevel = "new" | "learning" | "practicing" | "mastered";

export interface TopicStats {
  attempts: number;
  correct: number;
  /** Accuracy over the most recent 10 attempts, 0–1. */
  recent: number;
  level: MasteryLevel;
}

export function topicStats(data: ProgressData): Map<string, TopicStats> {
  const byTopic = new Map<string, Attempt[]>();
  for (const a of data.attempts) {
    const q = questionById.get(a.qid);
    if (!q) continue;
    const list = byTopic.get(q.topic) ?? [];
    list.push(a);
    byTopic.set(q.topic, list);
  }
  const out = new Map<string, TopicStats>();
  for (const t of topics) {
    const list = byTopic.get(t.id) ?? [];
    const last = list.slice(-10);
    const recent = last.length ? last.filter((a) => a.correct).length / last.length : 0;
    let level: MasteryLevel = "new";
    if (list.length > 0) level = "learning";
    if (list.length >= 3 && recent >= 0.5) level = "practicing";
    if (list.length >= 6 && recent >= 0.8) level = "mastered";
    out.set(t.id, { attempts: list.length, correct: list.filter((a) => a.correct).length, recent, level });
  }
  return out;
}

/** Question ids whose most recent attempt was wrong, most recent first. */
export function mistakes(data: ProgressData): string[] {
  const last = new Map<string, Attempt>();
  for (const a of data.attempts) last.set(a.qid, a);
  return [...last.values()]
    .filter((a) => !a.correct && questionById.has(a.qid))
    .sort((a, b) => b.at.localeCompare(a.at))
    .map((a) => a.qid);
}

export function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Consecutive days with practice, counting today or (if nothing yet today) yesterday. */
export function streak(data: ProgressData): number {
  const days = new Set(data.attempts.map((a) => dayKey(new Date(a.at))));
  const d = new Date();
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (days.has(dayKey(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export function lastAttemptCorrect(data: ProgressData): Map<string, boolean> {
  const m = new Map<string, boolean>();
  for (const a of data.attempts) m.set(a.qid, a.correct);
  return m;
}
