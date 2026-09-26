export type StrandId = "arith" | "nt" | "alg" | "geo" | "cp" | "logic";

export interface WorkedExample {
  problem: string;
  solution: string;
}

export interface Lesson {
  intro: string;
  keyIdeas: string[];
  examples: WorkedExample[];
  tip: string;
}

export interface Topic {
  id: string;
  name: string;
  lesson: Lesson;
}

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export interface Question {
  id: string;
  topic: string;
  difficulty: Difficulty;
  /** "short" = type an answer (MOEMS / CML style); "mc" = pick one of the choices. */
  style: "short" | "mc";
  prompt: string;
  /** Multiple choice only: exactly 5 options, shown as A–E. */
  choices?: string[];
  /** Short answer: canonical value such as "12", "3/4", "2 1/2", "0.75". MC: the letter "A"–"E". */
  answer: string;
  /** Other answers that should also be marked correct (e.g. "one fourth" forms, words). */
  acceptable?: string[];
  /** Unit shown after the answer box, e.g. "cm²". */
  unit?: string;
  hints: string[];
  solution: string;
}

export interface StrandFile {
  strand: StrandId;
  name: string;
  description: string;
  topics: Topic[];
  questions: Question[];
}
