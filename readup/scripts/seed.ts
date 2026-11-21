// Loads the seed library into the database. Safe to run repeatedly: rows are matched by
// passage slug and question ordinal, so re-running updates text without touching reader data.
import "./env";
import { and, eq, notInArray, sql } from "drizzle-orm";
import { SEED_PASSAGES } from "../src/content";
import { buildPassage } from "../src/content/build";
import { getDb, schema } from "../src/db";

const TECHNIQUES = [
  { name: "Previewing", uiMode: "preview_first" as const, instructions: "Look at the title, headings, and the first and last paragraphs before you start." },
  { name: "Phrase reading", uiMode: "phrase_cued" as const, instructions: "Read in small groups of words that go together, not one word at a time." },
  { name: "Repeated reading", uiMode: "normal" as const, instructions: "Re-read a passage you've read before and notice how much smoother it feels." },
  { name: "Purpose questions", uiMode: "normal" as const, instructions: "Keep the purpose question in mind while you read." },
  { name: "Pacer", uiMode: "pacer" as const, instructions: "Follow the soft highlight as it moves down the page." },
  { name: "Vocabulary review", uiMode: "normal" as const, instructions: "Review your word cards for five minutes before reading." },
];

async function main() {
  const db = getDb();
  const now = new Date();
  let passages = 0;
  let questions = 0;

  for (const seed of SEED_PASSAGES) {
    const built = buildPassage(seed);
    const [row] = await db
      .insert(schema.passage)
      .values({ ...built.row, status: "published", publishedAt: now })
      .onConflictDoUpdate({
        target: schema.passage.slug,
        // Re-seeding refreshes the text and scores but keeps a parent's publish/retire choice.
        set: { ...built.row, updatedAt: now },
      })
      .returning({ id: schema.passage.id });
    passages++;

    for (const q of built.questions) {
      const values = { ...q, passageId: row.id, status: "published" as const };
      await db
        .insert(schema.question)
        .values(values)
        .onConflictDoUpdate({
          target: [schema.question.passageId, schema.question.ordinal],
          set: { ...q, updatedAt: now },
        });
      questions++;
    }
    // Retire questions that were removed from the seed file (keep rows so old answers still resolve).
    await db
      .update(schema.question)
      .set({ status: "retired" })
      .where(
        and(
          eq(schema.question.passageId, row.id),
          notInArray(
            schema.question.ordinal,
            built.questions.map((q) => q.ordinal),
          ),
        ),
      );
  }

  for (const t of TECHNIQUES) {
    await db
      .insert(schema.technique)
      .values(t)
      .onConflictDoUpdate({ target: schema.technique.name, set: { instructions: t.instructions, uiMode: t.uiMode } });
  }

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(schema.passage)
    .where(eq(schema.passage.status, "published"));
  console.log(`Seeded ${passages} passages and ${questions} questions. Published passages in library: ${count}.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
