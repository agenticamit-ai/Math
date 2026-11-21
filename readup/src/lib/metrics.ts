// Reading-speed and comprehension metrics from the spec's "Timer rules" and "Formulas".

/** Default expected silent-reading rate before a reader has their own rate model. Approximate. */
export const DEFAULT_EXPECTED_WPM = 150;

/** Rough grade 6–7 silent-reading range. Approximate; replace with a sourced norms table before launch. */
export const APPROX_GRADE_BENCHMARK = { low: 150, high: 200, label: "Grade 6–7 silent reading (approximate)" };

export const MAX_VALID_WPM = 450;
export const MIN_VALID_WPM = 40;
export const MIN_WPM_RULE_WORDS = 150;
export const MAX_BLUR_SHARE = 0.5;
export const CLOSED_BOOK_WEIGHT = 1.5;

export function wpm(wordCount: number, activeReadMs: number): number {
  if (activeReadMs <= 0) return 0;
  return wordCount / (activeReadMs / 60_000);
}

/** Done stays disabled until word_count / 600 minutes have passed. */
export function minReadMs(wordCount: number): number {
  return Math.round((wordCount / 600) * 60_000);
}

export function expectedReadMs(wordCount: number, expectedWpm = DEFAULT_EXPECTED_WPM): number {
  return Math.round((wordCount / expectedWpm) * 60_000);
}

/** "Still reading?" appears after 3× the expected time. */
export function stillReadingPromptMs(wordCount: number, expectedWpm = DEFAULT_EXPECTED_WPM): number {
  return 3 * expectedReadMs(wordCount, expectedWpm);
}

export type Validity = { isValid: boolean; reason: string | null };

export function sessionValidity(args: { wordCount: number; activeReadMs: number; blurMs: number }): Validity {
  const rate = wpm(args.wordCount, args.activeReadMs);
  const reasons: string[] = [];
  if (rate > MAX_VALID_WPM) reasons.push(`WPM over ${MAX_VALID_WPM}`);
  if (rate < MIN_VALID_WPM && args.wordCount > MIN_WPM_RULE_WORDS) reasons.push(`WPM under ${MIN_VALID_WPM}`);
  const total = args.activeReadMs + args.blurMs;
  if (total > 0 && args.blurMs / total > MAX_BLUR_SHARE) reasons.push("away from the page more than half the time");
  return { isValid: reasons.length === 0, reason: reasons.length ? reasons.join("; ") : null };
}

/** Accuracy = weighted correct ÷ weighted total, closed-book items weighted 1.5×. Scores are 0–1 (evidence pairs can be 0.5). */
export function weightedAccuracy(items: { score: number; phase: "closed_book" | "open_book" }[]): number {
  let earned = 0;
  let possible = 0;
  for (const it of items) {
    const w = it.phase === "closed_book" ? CLOSED_BOOK_WEIGHT : 1;
    earned += it.score * w;
    possible += w;
  }
  return possible === 0 ? 0 : earned / possible;
}

/** ERR = WPM × Accuracy. */
export function effectiveRate(rate: number, accuracy: number): number {
  return rate * accuracy;
}

export function mean(xs: number[]): number | null {
  return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;
}

/** XP rewards finishing and effort, never speed. */
export function xpFor(args: { correctItems: number; wroteSummary: boolean }): number {
  return 20 + 2 * args.correctItems + (args.wroteSummary ? 5 : 0);
}
