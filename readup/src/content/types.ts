import type { Genre, QuestionFormat, Skill, Trap } from "@/db/schema";

export type SeedOption = { text: string; trap?: Trap };

export type SeedQuestion = {
  skill: Skill;
  format: QuestionFormat;
  phase: "closed_book" | "open_book";
  stem: string;
  /** In authoring order. For order_events this is the correct order. */
  options: SeedOption[];
  /** Indexes into options that are correct (in order, for order_events). */
  correct: number[];
  explanation: string;
  /** Exact text copied from the passage body that supports the answer. */
  evidence: string;
  difficulty: number;
};

export type SeedPassage = {
  slug: string;
  title: string;
  genre: Genre;
  tags: string[];
  /** Author's 1–10 rating on the rate_difficulty rubric (stands in for the LLM rating in the seed set). */
  rating: number;
  knowledgeDemand: number;
  purpose: string;
  keyIdeas: [string, string, string];
  glossary: [string, string][];
  body: string;
  questions: SeedQuestion[];
};

type Distractor = [string, Trap];
const opts = (correct: string[], distractors: Distractor[]): SeedOption[] => [
  ...correct.map((text) => ({ text })),
  ...distractors.map(([text, trap]) => ({ text, trap })),
];

/** Multiple choice: one correct answer and three labeled distractors. */
export function mc(
  skill: Skill,
  phase: "closed" | "open",
  stem: string,
  correct: string,
  distractors: Distractor[],
  explanation: string,
  evidence: string,
  difficulty = 3,
): SeedQuestion {
  return {
    skill,
    format: "mcq",
    phase: phase === "closed" ? "closed_book" : "open_book",
    stem,
    options: opts([correct], distractors),
    correct: [0],
    explanation,
    evidence,
    difficulty,
  };
}

/** Evidence pair: Part A is multiple choice; Part B is tapping the evidence sentence in the passage. */
export function ep(
  skill: Skill,
  stem: string,
  correct: string,
  distractors: Distractor[],
  explanation: string,
  evidence: string,
  difficulty = 3,
): SeedQuestion {
  return { ...mc(skill, "open", stem, correct, distractors, explanation, evidence, difficulty), format: "evidence_pair" };
}

/** "Select two": two correct answers and labeled distractors. */
export function ms(
  skill: Skill,
  phase: "closed" | "open",
  stem: string,
  correct: [string, string],
  distractors: Distractor[],
  explanation: string,
  evidence: string,
  difficulty = 3,
): SeedQuestion {
  return {
    skill,
    format: "multi_select",
    phase: phase === "closed" ? "closed_book" : "open_book",
    stem,
    options: opts(correct, distractors),
    correct: [0, 1],
    explanation,
    evidence,
    difficulty,
  };
}

/** Put four events in order. Pass them in the correct order. */
export function oe(
  skill: Skill,
  phase: "closed" | "open",
  stem: string,
  events: [string, string, string, string],
  explanation: string,
  evidence: string,
  difficulty = 3,
): SeedQuestion {
  return {
    skill,
    format: "order_events",
    phase: phase === "closed" ? "closed_book" : "open_book",
    stem,
    options: events.map((text) => ({ text })),
    correct: [0, 1, 2, 3],
    explanation,
    evidence,
    difficulty,
  };
}
