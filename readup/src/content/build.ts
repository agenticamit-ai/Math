// Turns authored seed passages into database rows: difficulty scores, option ids, evidence offsets.
import type { QuestionOption } from "@/db/schema";
import { countWords, difficulty, lexileEstimate } from "@/lib/text";
import type { SeedPassage, SeedQuestion } from "./types";

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic shuffle so re-seeding never reorders a passage's options. */
function shuffle<T>(items: T[], seed: string): T[] {
  const out = [...items];
  let h = hash(seed);
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export type BuiltQuestion = {
  ordinal: number;
  skill: SeedQuestion["skill"];
  format: SeedQuestion["format"];
  phase: SeedQuestion["phase"];
  stem: string;
  options: QuestionOption[];
  correct: string[];
  explanation: string;
  evidenceText: string;
  evidenceStart: number;
  evidenceEnd: number;
  difficulty: number;
};

export function buildQuestion(p: SeedPassage, q: SeedQuestion, ordinal: number): BuiltQuestion {
  const withIds: QuestionOption[] = q.options.map((o, i) => ({ id: `o${i + 1}`, text: o.text, ...(o.trap ? { trap: o.trap } : {}) }));
  const correct = q.correct.map((i) => withIds[i].id);
  const start = p.body.indexOf(q.evidence);
  if (start < 0) throw new Error(`[${p.slug} #${ordinal}] evidence not found in body: ${q.evidence}`);
  return {
    ordinal,
    skill: q.skill,
    format: q.format,
    phase: q.phase,
    stem: q.stem,
    options: shuffle(withIds, `${p.slug}:${ordinal}`),
    correct,
    explanation: q.explanation,
    evidenceText: q.evidence,
    evidenceStart: start,
    evidenceEnd: start + q.evidence.length,
    difficulty: q.difficulty,
  };
}

export function buildPassage(p: SeedPassage) {
  const d = difficulty(p.body, p.rating);
  return {
    row: {
      slug: p.slug,
      title: p.title,
      body: p.body,
      wordCount: countWords(p.body),
      genre: p.genre,
      topicTags: p.tags,
      sourceType: "ai_original" as const,
      sourceUrls: [],
      license: "Original work written for ReadUp",
      purposeQuestion: p.purpose,
      keyIdeas: [...p.keyIdeas],
      glossary: p.glossary.map(([word, definition]) => ({ word, definition })),
      difficultyScore: d.score,
      fkGrade: d.fkGrade,
      daleChall: d.dc,
      lexileEstimate: lexileEstimate(d.fkGrade),
      llmDifficulty: d.llm,
      knowledgeDemand: p.knowledgeDemand,
      promptVersion: "seed-v1",
    },
    questions: p.questions.map((q, i) => buildQuestion(p, q, i + 1)),
    difficulty: d,
  };
}
