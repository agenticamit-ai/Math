// Text analysis shared by the seed script, the API, and the reading view.
// Pure functions only, so it runs in the browser and in Node.

export type SentenceSeg = { index: number; start: number; end: number; text: string };
export type Block = { kind: "p" | "h"; start: number; end: number; sentences: SentenceSeg[] };

const WORD_RE = /[A-Za-z0-9]+(?:['’\-][A-Za-z0-9]+)*/g;

export function words(text: string): string[] {
  return text.replace(/^#+\s*/gm, "").match(WORD_RE) ?? [];
}

export function countWords(text: string): number {
  return words(text).length;
}

const ABBREVIATIONS = /(?:\b(?:Mr|Mrs|Ms|Dr|St|Jr|Sr|vs|etc|Mt|No)\.|\b[A-Z]\.)$/;

/** Split a passage body into blocks (paragraphs and "## " headings) and sentences with char offsets. */
export function segment(body: string): Block[] {
  const blocks: Block[] = [];
  let index = 0;
  const paraRe = /[^\n]+(?:\n(?!\s*\n)[^\n]+)*/g;
  for (const m of body.matchAll(paraRe)) {
    const raw = m[0];
    const blockStart = m.index ?? 0;
    const isHeading = /^#{1,6}\s/.test(raw);
    const sentences: SentenceSeg[] = [];
    if (isHeading) {
      const offset = raw.match(/^#{1,6}\s+/)![0].length;
      sentences.push({ index: index++, start: blockStart + offset, end: blockStart + raw.length, text: raw.slice(offset) });
    } else {
      let cursor = 0;
      const endRe = /[.!?]+["”’)\]]*(?=\s+|$)/g;
      for (const e of raw.matchAll(endRe)) {
        const stop = (e.index ?? 0) + e[0].length;
        const candidate = raw.slice(cursor, stop);
        if (ABBREVIATIONS.test(candidate.trimEnd()) && stop < raw.length) continue;
        const lead = candidate.length - candidate.trimStart().length;
        sentences.push({
          index: index++,
          start: blockStart + cursor + lead,
          end: blockStart + stop,
          text: candidate.trim(),
        });
        cursor = stop;
      }
      if (raw.slice(cursor).trim()) {
        const rest = raw.slice(cursor);
        const lead = rest.length - rest.trimStart().length;
        sentences.push({ index: index++, start: blockStart + cursor + lead, end: blockStart + raw.length, text: rest.trim() });
      }
    }
    blocks.push({ kind: isHeading ? "h" : "p", start: blockStart, end: blockStart + raw.length, sentences });
  }
  return blocks;
}

export function allSentences(body: string): SentenceSeg[] {
  return segment(body).flatMap((b) => b.sentences);
}

/** Indexes of sentences that overlap a char range. */
export function sentencesInRange(body: string, start: number, end: number): number[] {
  return allSentences(body)
    .filter((s) => s.start < end && s.end > start)
    .map((s) => s.index);
}

export function syllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const trimmed = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  const groups = trimmed.match(/[aeiouy]{1,2}/g);
  return Math.max(1, groups ? groups.length : 1);
}

export function fleschKincaidGrade(text: string): number {
  const ws = words(text);
  const sentenceCount = Math.max(1, segment(text).filter((b) => b.kind === "p").flatMap((b) => b.sentences).length);
  if (ws.length === 0) return 0;
  const syl = ws.reduce((n, w) => n + syllables(w), 0);
  return 0.39 * (ws.length / sentenceCount) + 11.8 * (syl / ws.length) - 15.59;
}

// Everyday words of 3+ syllables that a grade-3 reader already knows. Not counted as "hard".
const FAMILIAR = new Set(
  "another animal animals anything anyone anybody banana beautiful bicycle buffalo camera chocolate computer computers dinosaur dinosaurs elephant elephants everybody everyone everything family families favorite grandmother grandfather hamburger important library potato potatoes president remember radio really scientist scientists something somebody somewhere television together tomato tomatoes tomorrow usually video videos yesterday energy different difference however already basketball baseball volleyball afternoon understand underground whatever whenever wonderful company several holiday holidays kangaroo octopus umbrella vacation america american americans africa asia europe australia".split(
    " ",
  ),
);

/**
 * Vocabulary load. The spec calls for the Dale-Chall common-word list; this approximation
 * counts the share of words that are 3+ syllables and not on a short familiar-word list,
 * skipping capitalized names that are not sentence-initial.
 */
export function hardWordShare(text: string): number {
  const ws = words(text);
  if (ws.length === 0) return 0;
  let hard = 0;
  for (const w of ws) {
    const lower = w.toLowerCase();
    if (FAMILIAR.has(lower)) continue;
    if (/^[A-Z]/.test(w) && w !== w.toUpperCase()) continue; // proper nouns and sentence starts
    if (syllables(lower.replace(/(?:ing|ed|es|s|ly)$/, "")) >= 3) hard++;
  }
  return hard / ws.length;
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const round1 = (n: number) => Math.round(n * 10) / 10;

/** Grade 3 -> 1, grade 13+ -> 10. */
export function normalizeFk(grade: number): number {
  return round1(clamp(1 + ((grade - 3) * 9) / 10, 1, 10));
}

/** 0% hard words -> 1, 15%+ -> 10 (calibrated so grade 6–7 text lands near the middle). */
export function normalizeHardWords(share: number): number {
  return round1(clamp(1 + share * 60, 1, 10));
}

export type DifficultyParts = { fkGrade: number; fk: number; dc: number; llm: number; score: number; band: number };

/** D = 0.35·FK + 0.25·DC + 0.40·LLM, each component on a 1–10 scale. */
export function difficulty(text: string, llmRating: number): DifficultyParts {
  const fkGrade = round1(fleschKincaidGrade(text));
  const fk = normalizeFk(fkGrade);
  const dc = normalizeHardWords(hardWordShare(text));
  const llm = clamp(llmRating, 1, 10);
  const score = round1(0.35 * fk + 0.25 * dc + 0.4 * llm);
  return { fkGrade, fk, dc, llm, score, band: bandFor(score) };
}

export function bandFor(score: number): number {
  return clamp(Math.round(score), 1, 10);
}

/** Rough Lexile-style estimate from FK grade, for display only. */
export function lexileEstimate(fkGrade: number): number {
  return Math.round(clamp(150 + fkGrade * 105, 100, 1500) / 10) * 10;
}
