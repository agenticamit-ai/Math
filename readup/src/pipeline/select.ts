import type { Headline } from "./feeds";

/** Rule-based reject list from the spec. The LLM filter runs after this on whatever passes. */
const REJECT_RULES: [string, RegExp][] = [
  ["violence", /\b(kill(s|ed|ing)?|murder\w*|shoot(ing|er)s?|shot dead|stabb\w*|gun(man|men|fire)?|bomb\w*|terror\w*|massacre|assault\w*|hostage\w*|war(s|time)?|airstrikes?|missiles?|invasion|militants?|riot\w*)\b/i],
  ["crime", /\b(arrest\w*|charged with|police|prison\w*|jail\w*|convict\w*|sentenced|trial|lawsuit|sued|fraud|stolen|robber\w*|theft|smuggl\w*|criminal)\b/i],
  ["death or tragedy", /\b(dies|died|dead|death\w*|deadly|funeral|victims?|tragedy|tragic|fatal\w*|mourn\w*|obituary|killed|drown\w*|suicide|abuse\w*)\b/i],
  ["sexual content", /\b(sex\w*|porn\w*|nude|naked|explicit)\b/i],
  ["drugs or alcohol", /\b(drugs?|cocaine|heroin|opioid\w*|fentanyl|overdose\w*|cannabis|marijuana|alcohol|drunk|vap(e|ing)|cigarettes?|gambling|betting)\b/i],
  ["partisan politics", /\b(democrats?|republicans?|gop|trump|biden|harris|vance|election\w*|senat(e|or)s?|congress\w*|parliament\w*|prime minister|campaign\w*|ballots?|votes?|voting|tariffs?|impeach\w*|immigration|deport\w*|protest\w*|minister)\b/i],
  ["celebrity gossip", /\b(divorc\w*|dating|affair|split up|feud\w*|scandal\w*|rumou?r\w*|engaged|pregnan\w*|romance|breakup|cheat\w*)\b/i],
];

export function ruleSafety(text: string): string | null {
  for (const [reason, re] of REJECT_RULES) if (re.test(text)) return reason;
  return null;
}

const STOP = new Set("a an the of to in on for and or but with from by at as is are was were be new says after over into about how why what its it this that their".split(" "));
export function titleWords(s: string): Set<string> {
  return new Set((s.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter((w) => w.length > 2 && !STOP.has(w)));
}

export function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const w of a) if (b.has(w)) inter++;
  return inter / (a.size + b.size - inter);
}

/** 1 = nothing similar recently, 0 = same story as something already published. */
export function novelty(title: string, recentTitles: string[]): number {
  const w = titleWords(title);
  const max = recentTitles.reduce((m, t) => Math.max(m, jaccard(w, titleWords(t))), 0);
  return Math.max(0, 1 - max * 1.5);
}

export type Candidate = Headline & { explainability: number; kidInterest: number; llmReason: string };

/** Rank by interest match × novelty × explainability, keeping at most one story per near-duplicate group. */
export function rankCandidates(cands: Candidate[], opts: { interestWeight: (c: Candidate) => number; recentTitles: string[]; take: number }) {
  const scored = cands
    .map((c) => ({
      c,
      score: opts.interestWeight(c) * novelty(c.title, opts.recentTitles) * (c.explainability / 5) * (0.5 + c.kidInterest / 10),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  const picked: Candidate[] = [];
  for (const { c } of scored) {
    if (picked.length >= opts.take) break;
    if (picked.some((p) => jaccard(titleWords(p.title), titleWords(c.title)) > 0.4)) continue;
    // Prefer variety: at most two stories from one category per day.
    if (picked.filter((p) => p.category === c.category).length >= 2) continue;
    picked.push(c);
  }
  return picked;
}

/** Longest run of consecutive words shared by the passage and the source. Used to block copying. */
export function longestSharedRun(passage: string, source: string, minCheck = 8): number {
  const norm = (s: string) => (s.toLowerCase().match(/[a-z0-9']+/g) ?? []);
  const a = norm(passage);
  const b = norm(source);
  if (a.length < minCheck || b.length < minCheck) return 0;
  const grams = new Set<string>();
  for (let i = 0; i + minCheck <= b.length; i++) grams.add(b.slice(i, i + minCheck).join(" "));
  let best = 0;
  let run = 0;
  for (let i = 0; i + minCheck <= a.length; i++) {
    if (grams.has(a.slice(i, i + minCheck).join(" "))) {
      run = run ? run + 1 : minCheck;
      best = Math.max(best, run);
    } else run = 0;
  }
  return best;
}
