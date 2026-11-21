// Checks the seed library: evidence matches the text, skill mix rules, option counts, and difficulty bands.
import { SEED_PASSAGES } from "../src/content";
import { checkPassage } from "../src/content/checks";

let errors = 0;
const slugs = new Set<string>();
const bands: Record<number, number> = {};
const genres: Record<string, number> = {};

for (const p of SEED_PASSAGES) {
  if (slugs.has(p.slug)) {
    errors++;
    console.error(`  ✗ duplicate slug ${p.slug}`);
  }
  slugs.add(p.slug);
  const { problems, built } = checkPassage(p);
  if (built) {
    const d = built.difficulty;
    bands[d.band] = (bands[d.band] ?? 0) + 1;
    genres[p.genre] = (genres[p.genre] ?? 0) + 1;
    console.log(
      `${p.slug.padEnd(42)} words=${String(built.row.wordCount).padStart(3)} FKgr=${d.fkGrade.toFixed(1).padStart(4)} FK=${d.fk} DC=${d.dc} R=${d.llm} D=${d.score} band=${d.band}`,
    );
  }
  for (const msg of problems) {
    errors++;
    console.error(`  ✗ ${p.slug}: ${msg}`);
  }
}

console.log("\nPassages:", SEED_PASSAGES.length, "Bands:", bands, "Genres:", genres);
if (errors) {
  console.error(`\n${errors} problem(s) found.`);
  process.exit(1);
}
console.log("All content checks passed.");
