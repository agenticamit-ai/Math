import type { AnswerResponse, QuestionFormat, QuestionOption, Trap } from "@/db/schema";
import { sentencesInRange } from "./text";

export type ScorableQuestion = {
  format: QuestionFormat;
  correct: string[];
  options: QuestionOption[];
  evidenceStart: number;
  evidenceEnd: number;
};

export type Scored = { score: number; isCorrect: boolean; partA?: boolean; partB?: boolean };

export function scoreAnswer(q: ScorableQuestion, response: AnswerResponse, passageBody: string): Scored {
  const selected = response.selected ?? [];
  switch (q.format) {
    case "mcq": {
      const ok = selected.length === 1 && selected[0] === q.correct[0];
      return { score: ok ? 1 : 0, isCorrect: ok };
    }
    case "multi_select": {
      const ok = selected.length === q.correct.length && q.correct.every((c) => selected.includes(c));
      return { score: ok ? 1 : 0, isCorrect: ok };
    }
    case "order_events": {
      const ok = selected.length === q.correct.length && q.correct.every((c, i) => selected[i] === c);
      return { score: ok ? 1 : 0, isCorrect: ok };
    }
    case "evidence_pair": {
      const partA = selected.length === 1 && selected[0] === q.correct[0];
      const evidence = sentencesInRange(passageBody, q.evidenceStart, q.evidenceEnd);
      const partB = response.evidenceSentence !== undefined && evidence.includes(response.evidenceSentence);
      // 1 point for both parts, 0.5 for Part A only.
      const score = partA && partB ? 1 : partA ? 0.5 : 0;
      return { score, isCorrect: partA && partB, partA, partB };
    }
    case "short_answer":
      return { score: 0, isCorrect: false };
  }
}

/** The trap types of the wrong options the reader picked. */
export function trapsChosen(q: ScorableQuestion, response: AnswerResponse): Trap[] {
  const wrong = (response.selected ?? []).filter((id) => !q.correct.includes(id));
  return wrong
    .map((id) => q.options.find((o) => o.id === id)?.trap)
    .filter((t): t is Trap => Boolean(t));
}

export const TRAP_LABELS: Record<Trap, { name: string; tip: string }> = {
  true_but_irrelevant: {
    name: "True but irrelevant",
    tip: "It's accurate, but it doesn't answer this question.",
  },
  too_broad: { name: "Too broad", tip: "It claims more than the passage supports." },
  too_narrow: { name: "Too narrow", tip: "It's one small detail, not the whole idea." },
  opposite: { name: "Opposite", tip: "It says the reverse of what the passage says." },
  not_in_text: { name: "Not in the text", tip: "It sounds reasonable, but the passage never says it." },
};

export const SKILL_LABELS: Record<string, string> = {
  main_idea: "Main idea",
  key_details: "Key details",
  inference: "Inference",
  vocab_context: "Vocabulary in context",
  author_purpose: "Author's purpose",
  text_structure: "Text structure",
  point_of_view: "Point of view",
  argument_evidence: "Argument & evidence",
  compare_texts: "Compare texts",
};
