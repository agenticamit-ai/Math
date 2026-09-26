import type { StructuredNote } from "@/lib/explain-notes";

export const LEARNER_NAME = "Kiaan";
export const STORAGE_KEY = "math-quest-kiaan-v1";

export type TopicProgress = {
  xp: number;
  correctIds: string[];
  attemptedIds: string[];
  conceptChecked: boolean;
  tricksChecked: boolean;
};

export type LastLesson = {
  topicSlug: string;
  stage: "concept" | "tricks" | "practice";
};

export type ContestRecord = {
  id: string;
  date: string;
  score: number;
  total: number;
  xp: number;
};

export type SavedNote = {
  id: string;
  title: string;
  raw: string;
  structured: StructuredNote;
  createdAt: string;
};

export type LearnerState = {
  learner: typeof LEARNER_NAME;
  streakDays: number;
  lastActiveDate: string | null;
  activeDates: string[];
  topics: Record<string, TopicProgress>;
  lastLesson: LastLesson | null;
  contests: ContestRecord[];
  notes: SavedNote[];
};

export function emptyTopicProgress(): TopicProgress {
  return {
    xp: 0,
    correctIds: [],
    attemptedIds: [],
    conceptChecked: false,
    tricksChecked: false,
  };
}

export function freshState(): LearnerState {
  return {
    learner: LEARNER_NAME,
    streakDays: 0,
    lastActiveDate: null,
    activeDates: [],
    topics: {},
    lastLesson: null,
    contests: [],
    notes: [],
  };
}

export function dateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function yesterdayKey(today = new Date()): string {
  const copy = new Date(today);
  copy.setDate(copy.getDate() - 1);
  return dateKey(copy);
}

export function totalXp(state: LearnerState): number {
  return Object.values(state.topics).reduce((sum, topic) => sum + topic.xp, 0);
}

export function topicProgress(state: LearnerState, slug: string): TopicProgress {
  return state.topics[slug] ?? emptyTopicProgress();
}

function touchStreak(state: LearnerState, today = dateKey()): LearnerState {
  if (state.lastActiveDate === today) {
    return state.activeDates.includes(today) ? state : { ...state, activeDates: [...state.activeDates, today].slice(-60) };
  }
  const streak = state.lastActiveDate === yesterdayKey() ? state.streakDays + 1 : 1;
  return {
    ...state,
    streakDays: streak,
    lastActiveDate: today,
    activeDates: [...state.activeDates.filter((day) => day !== today), today].slice(-60),
  };
}

function withTopic(state: LearnerState, slug: string, update: (topic: TopicProgress) => TopicProgress): LearnerState {
  const current = topicProgress(state, slug);
  return {
    ...state,
    topics: {
      ...state.topics,
      [slug]: update(current),
    },
  };
}

export function xpForPractice(hintsUsed: number, firstTime: boolean): number {
  const table = [10, 8, 6, 4];
  const base = table[Math.min(Math.max(hintsUsed, 0), 3)];
  return firstTime ? base : Math.max(2, Math.ceil(base / 2));
}

function placeLesson(state: LearnerState, slug: string, stage: LastLesson["stage"]): LastLesson {
  const order: Record<LastLesson["stage"], number> = { concept: 0, tricks: 1, practice: 2 };
  if (state.lastLesson?.topicSlug === slug && order[state.lastLesson.stage] > order[stage]) {
    return state.lastLesson;
  }
  return { topicSlug: slug, stage };
}

export function markConcept(state: LearnerState, slug: string): LearnerState {
  const current = topicProgress(state, slug);
  const next = touchStreak({ ...state, lastLesson: placeLesson(state, slug, "concept") });
  if (current.conceptChecked) return next;
  return withTopic(next, slug, (topic) => ({ ...topic, conceptChecked: true, xp: topic.xp + 5 }));
}

export function markTricks(state: LearnerState, slug: string): LearnerState {
  const current = topicProgress(state, slug);
  const next = touchStreak({ ...state, lastLesson: placeLesson(state, slug, "tricks") });
  if (current.tricksChecked) return next;
  return withTopic(next, slug, (topic) => ({ ...topic, tricksChecked: true, xp: topic.xp + 5 }));
}

export function noteVisit(state: LearnerState, slug: string, stage: LastLesson["stage"]): LearnerState {
  if (state.lastLesson?.topicSlug === slug && state.lastLesson.stage === "practice" && stage !== "practice") {
    return state;
  }
  if (state.lastLesson?.topicSlug === slug && state.lastLesson.stage === "tricks" && stage === "concept") {
    return state;
  }
  return { ...state, lastLesson: { topicSlug: slug, stage } };
}

export type AttemptInput = {
  topicSlug: string;
  questionId: string;
  correct: boolean;
  hintsUsed: number;
  revealed: boolean;
};

export function recordAttempt(state: LearnerState, attempt: AttemptInput): { state: LearnerState; xp: number } {
  const current = topicProgress(state, attempt.topicSlug);
  const firstTime = !current.correctIds.includes(attempt.questionId);
  let xp = 0;
  if (attempt.correct) xp = xpForPractice(attempt.hintsUsed, firstTime);
  else if (attempt.revealed && firstTime) xp = 1;

  const attempted = current.attemptedIds.includes(attempt.questionId)
    ? current.attemptedIds
    : [...current.attemptedIds, attempt.questionId];
  const correctIds =
    attempt.correct && firstTime ? [...current.correctIds, attempt.questionId] : current.correctIds;

  const next = withTopic(touchStreak(state), attempt.topicSlug, (topic) => ({
    ...topic,
    xp: topic.xp + xp,
    attemptedIds: attempted,
    correctIds,
  }));

  return {
    xp,
    state: {
      ...next,
      lastLesson: { topicSlug: attempt.topicSlug, stage: "practice" },
    },
  };
}

export type ContestAward = {
  id: string;
  score: number;
  total: number;
  topicSlugs: string[];
  correctTopicSlugs: string[];
};

export function recordContest(state: LearnerState, contest: ContestAward): LearnerState {
  if (state.contests.some((item) => item.id === contest.id)) return state;
  let next = touchStreak(state);
  const perCorrect = 12;
  for (const slug of contest.correctTopicSlugs) {
    next = withTopic(next, slug, (topic) => ({ ...topic, xp: topic.xp + perCorrect }));
  }
  const xp = contest.correctTopicSlugs.length * perCorrect;
  return {
    ...next,
    contests: [
      { id: contest.id, date: dateKey(), score: contest.score, total: contest.total, xp },
      ...next.contests,
    ].slice(0, 12),
  };
}

export function saveNote(state: LearnerState, note: SavedNote): LearnerState {
  return touchStreak({
    ...state,
    notes: [note, ...state.notes.filter((item) => item.id !== note.id)].slice(0, 20),
  });
}

export function deleteNote(state: LearnerState, id: string): LearnerState {
  return { ...state, notes: state.notes.filter((note) => note.id !== id) };
}

export function loadState(raw: string | null): LearnerState {
  if (!raw) return freshState();
  try {
    const parsed = JSON.parse(raw) as Partial<LearnerState>;
    if (parsed.learner !== LEARNER_NAME || !parsed.topics) return freshState();
    return {
      ...freshState(),
      ...parsed,
      learner: LEARNER_NAME,
      topics: parsed.topics ?? {},
      activeDates: parsed.activeDates ?? [],
      contests: parsed.contests ?? [],
      notes: parsed.notes ?? [],
      lastLesson: parsed.lastLesson ?? null,
    };
  } catch {
    return freshState();
  }
}
