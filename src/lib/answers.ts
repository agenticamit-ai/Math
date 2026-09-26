export type NormalizedAnswer =
  | { kind: "num"; n: bigint; d: bigint }
  | { kind: "text"; s: string };

function gcd(a: bigint, b: bigint): bigint {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b) [a, b] = [b, a % b];
  return a;
}

function frac(n: bigint, d: bigint): NormalizedAnswer | null {
  if (d === 0n) return null;
  if (d < 0n) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1n;
  return { kind: "num", n: n / g, d: d / g };
}

function parseDecimal(s: string): NormalizedAnswer | null {
  const m = /^(-?)(\d*)(?:\.(\d+))?$/.exec(s);
  if (!m || (m[2] === "" && m[3] === undefined)) return null;
  const frac_ = m[3] ?? "";
  const n = BigInt((m[2] || "0") + frac_) * (m[1] ? -1n : 1n);
  return frac(n, 10n ** BigInt(frac_.length));
}

/**
 * Turn a typed answer into a comparable form. Numbers (integers, decimals,
 * fractions, mixed numbers, with optional commas, $, % or trailing units) become
 * exact fractions so "0.75", "3/4" and "6/8" all match. Anything else is
 * compared as lower-cased text with extra spaces removed.
 */
export function normalizeAnswer(raw: string): NormalizedAnswer | null {
  let s = raw.trim().toLowerCase().replace(/\s+/g, " ");
  if (!s) return null;
  const numeric = s
    .replace(/^\$\s*/, "")
    .replace(/(\d),(?=\d{3}\b)/g, "$1")
    .replace(/\s*%$/, "")
    .replace(/−/g, "-");

  // Mixed number: "2 1/2" or "-2 1/2"
  let m = /^(-?)(\d+) (\d+)\/(\d+)$/.exec(numeric);
  if (m) {
    const whole = BigInt(m[2]), n = BigInt(m[3]), d = BigInt(m[4]);
    const r = frac(whole * d + n, d);
    return r && m[1] && r.kind === "num" ? { ...r, n: -r.n } : r;
  }
  // Fraction: "3/4", "-3/4", "1.5/2"
  m = /^(-?[\d.]+)\/(-?[\d.]+)$/.exec(numeric);
  if (m) {
    const a = parseDecimal(m[1]), b = parseDecimal(m[2]);
    if (a?.kind === "num" && b?.kind === "num") return frac(a.n * b.d, a.d * b.n);
  }
  const dec = parseDecimal(numeric);
  if (dec) return dec;

  // Number followed by a unit word, e.g. "12 cm" or "45 degrees": use the number.
  m = /^(-?[\d.]+(?:\/\d+)?) ?[a-z°²³ ]+$/.exec(numeric);
  if (m) return normalizeAnswer(m[1]);

  s = s.replace(/[.!]$/, "").replace(/^(the|an?) /, "");
  return { kind: "text", s };
}

export function answersMatch(given: string, expected: string): boolean {
  const a = normalizeAnswer(given);
  const b = normalizeAnswer(expected);
  if (!a || !b) return false;
  if (a.kind === "num" && b.kind === "num") return a.n === b.n && a.d === b.d;
  if (a.kind === "text" && b.kind === "text") return a.s === b.s;
  return false;
}

export function isCorrect(
  given: string,
  q: { style: "short" | "mc"; answer: string; acceptable?: string[] },
): boolean {
  if (q.style === "mc") return given.trim().toUpperCase() === q.answer;
  return [q.answer, ...(q.acceptable ?? [])].some((e) => answersMatch(given, e));
}
