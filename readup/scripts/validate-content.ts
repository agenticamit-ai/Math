// Checks the seed library: evidence matches the text, skill mix rules, option counts, and difficulty bands.
import { SEED_PASSAGES } from "../src/content";
import { buildPassage } from "../src/content/build";
import { TRAPS } from "../src/db/schema";

let errors = 0;
const fail = (msg: string) => {
  errors++;
  console.error("  ✗ " + msg);
};

const slugs = new Set<string>();
const bands: Record<number, number> = {};
const genres: Record<string, number> = {};

for (const p of SEED_PASSAGES) {
  if (slugs.has(p.slug)) fail(`duplicate slug ${p.slug}`);
  slugs.add(p.slug);
  let built;
  try {
    built = buildPassage(p);
  } catch (e) {
    fail((e as Error).message);
    continue;
  }
  const { row, questions, difficulty: d } = built;
  bands[d.band] = (bands[d.band] ?? 0) + 1;
  genres[p.genre] = (genres[p.genre] ?? 0) + 1;
  console.log(
    `${p.slug.padEnd(42)} words=${String(row.wordCount).padStart(3)} FKgr=${d.fkGrade.toFixed(1).padStart(4)} FK=${d.fk} DC=${d.dc} R=${d.llm} D=${d.score} band=${d.band}`,
  );
  if (questions.length < 6) fail(`${p.slug}: needs 6+ questions, has ${questions.length}`);
  const closed = questions.filter((q) => q.phase === "closed_book").length;
  if (closed < 2 || closed > 3) fail(`${p.slug}: needs 2–3 closed-book questions, has ${closed}`);
  if (!questions.some((q) => q.skill === "main_idea")) fail(`${p.slug}: no main_idea question`);
  if (!questions.some((q) => q.skill === "inference")) fail(`${p.slug}: no inference question`);
  if (d.band >= 4 && !questions.some((q) => q.format === "evidence_pair")) fail(`${p.slug}: band ${d.band} needs an evidence pair`);
  if (p.keyIdeas.length !== 3) fail(`${p.slug}: needs 3 key ideas`);
  for (const q of questions) {
    if (q.format === "evidence_pair" && q.phase !== "open_book") fail(`${p.slug} #${q.ordinal}: evidence pairs must be open-book`);
    if (q.format === "mcq" || q.format === "evidence_pair") {
      if (q.options.length !== 4) fail(`${p.slug} #${q.ordinal}: mcq needs 4 options`);
      for (const o of q.options) {
        if (!q.correct.includes(o.id) && !(o.trap && TRAPS.includes(o.trap))) fail(`${p.slug} #${q.ordinal}: distractor without trap type`);
      }
    }
    if (q.explanation.split(/\s+/).length > 40) fail(`${p.slug} #${q.ordinal}: explanation over 40 words`);
  }
  for (const [word] of p.glossary) {
    if (!new RegExp(`\\b${word}`, "i").test(p.body)) fail(`${p.slug}: glossary word "${word}" not in body`);
  }
}

console.log("\nPassages:", SEED_PASSAGES.length, "Bands:", bands, "Genres:", genres);
if (errors) {
  console.error(`\n${errors} problem(s) found.`);
  process.exit(1);
}
console.log("All content checks passed.");
