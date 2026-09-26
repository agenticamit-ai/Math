import type { Question } from "@/content/types";

export function normalizeAnswer(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[$,]/g, "")
    .replace(/\s+/g, "")
    .replace(/%$/, "");
}

export function parseNumber(raw: string): number | null {
  const text = normalizeAnswer(raw);
  if (!text) return null;
  const fraction = text.match(/^(-?\d+)\/(-?\d+)$/);
  if (fraction) {
    const denominator = Number(fraction[2]);
    if (denominator === 0) return null;
    return Number(fraction[1]) / denominator;
  }
  if (/^-?\d+(\.\d+)?$/.test(text)) return Number(text);
  return null;
}

export function answersMatch(
  input: string,
  question: Pick<Question, "answer" | "acceptableAnswers" | "acceptEquivalent">,
): boolean {
  const normalizedInput = normalizeAnswer(input);
  if (!normalizedInput) return false;
  const accepted = [question.answer, ...(question.acceptableAnswers ?? [])].map(normalizeAnswer);
  if (accepted.includes(normalizedInput)) return true;
  if (question.acceptEquivalent === false) return false;
  const inputValue = parseNumber(input);
  if (inputValue === null) return false;
  return accepted.some((candidate) => {
    const value = parseNumber(candidate);
    return value !== null && Math.abs(value - inputValue) < 1e-6;
  });
}

export function equivalentFormNote(input: string, answer: string): string | null {
  const normalizedInput = normalizeAnswer(input);
  const normalizedAnswer = normalizeAnswer(answer);
  if (!normalizedInput || normalizedInput === normalizedAnswer) return null;
  const inputValue = parseNumber(input);
  const answerValue = parseNumber(answer);
  if (inputValue === null || answerValue === null) return null;
  if (Math.abs(inputValue - answerValue) >= 1e-6) return null;
  return `That value matches. A tidy contest form is ${answer}.`;
}
