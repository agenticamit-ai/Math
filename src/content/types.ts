export type Question = {
  id: string;
  prompt: string;
  answerLabel?: string;
  choices?: string[];
  answer: string;
  acceptableAnswers?: string[];
  /** When false, only the listed forms count. */
  acceptEquivalent?: boolean;
  hints: [string, string, string];
  steps: string[];
  takeaway: string;
  difficulty: "warm-up" | "practice" | "stretch";
};

export type Topic = {
  slug: string;
  title: string;
  emoji: string;
  tagline: string;
  concept: {
    intro: string;
    ideas: { heading: string; body: string }[];
    example: { problem: string; steps: string[] };
  };
  tricks: { title: string; detail: string }[];
  questions: Question[];
};
