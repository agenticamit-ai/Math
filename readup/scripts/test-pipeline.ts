// End-to-end test of the news pipeline against the local database, with fake feeds and model.
// Run: npx tsx scripts/test-pipeline.ts
import "./env";
import assert from "node:assert/strict";
import { inArray, like } from "drizzle-orm";
import { getDb, schema } from "../src/db";
import { parseFeed } from "../src/pipeline/feeds";
import { runPipeline } from "../src/pipeline/run";
import { longestSharedRun, ruleSafety } from "../src/pipeline/select";
import { FAKE_FEEDS, FakeLLM, fakeFetch } from "./pipeline-fake";

async function cleanNews() {
  const db = getDb();
  await db.delete(schema.passage).where(like(schema.passage.slug, "news-%"));
  await db.delete(schema.contentJobLog);
}

async function main() {
  // This test deletes news passages and run logs, so it only runs against a local database.
  const host = new URL(process.env.DATABASE_URL ?? "postgres://x@localhost/x").hostname;
  if (!["localhost", "127.0.0.1"].includes(host) && process.env.ALLOW_PIPELINE_TEST !== "1") {
    throw new Error(`Refusing to run against ${host}. Point DATABASE_URL at a local database.`);
  }
  // Unit checks
  assert.equal(ruleSafety("Police arrest suspect"), "crime");
  assert.equal(ruleSafety("Rover finds ancient lake on Mars"), null);
  assert.equal(longestSharedRun("one two three four five six seven eight nine ten", "x one two three four five six seven eight nine y"), 9);
  assert.equal(longestSharedRun("a totally different sentence about whales and their songs", "the rover drove across the dusty plain today"), 0);
  const atom = parseFeed(`<feed><entry><title>A &amp; B</title><link href="https://x.test/1"/><summary><![CDATA[<p>Hi</p>]]></summary></entry></feed>`, FAKE_FEEDS[1]);
  assert.deepEqual([atom[0].title, atom[0].url, atom[0].summary], ["A & B", "https://x.test/1", "Hi"]);

  const db = getDb();
  await cleanNews();

  // Run 1: everything new
  const r1 = await runPipeline({ llm: new FakeLLM(), feeds: FAKE_FEEDS, fetchImpl: fakeFetch, stories: 3, versions: 2 });
  assert.equal(r1.fetched, 5);
  assert.equal(r1.rejectedSafety, 2, "theft (rule) and celebrity (LLM) rejected");
  assert.equal(r1.queued + r1.published, 6, "3 stories × 2 versions");
  const news = await db.select().from(schema.passage).where(like(schema.passage.slug, "news-%"));
  assert.equal(news.length, 6);
  assert.ok(news.every((p) => p.sourceType === "current_affairs" && p.storyKey && p.expiresAt && p.sourceUrls.length === 1));
  const parents = await db.select({ s: schema.parent.settings }).from(schema.parent);
  const review = parents.length === 0 || parents.some((p) => p.s.reviewBeforePublish !== false);
  assert.ok(news.every((p) => p.status === (review ? "review" : "published")));
  assert.equal(new Set(news.map((p) => p.storyKey)).size, 3, "two versions share a story key");
  const bands = news.map((p) => Math.round(p.difficultyScore)).sort();
  assert.deepEqual([...new Set(bands)].length, 2, "versions land on two different bands");
  const qs = await db.select().from(schema.question).where(inArray(schema.question.passageId, news.map((p) => p.id)));
  assert.equal(qs.filter((q) => !q.isRecall).length, 36);
  assert.equal(qs.filter((q) => q.isRecall).length, 18);
  const facts = await db.select().from(schema.fact).where(inArray(schema.fact.passageId, news.map((p) => p.id)));
  assert.equal(facts.length, 18);
  assert.ok(facts.every((f) => f.recallQuestionId));
  const [log1] = await db.select().from(schema.contentJobLog);
  assert.equal(log1.rejections.length, 2);
  assert.ok(log1.rejections.some((r) => r.reason.includes("crime")));

  // Run 2: same feeds, nothing new
  const r2 = await runPipeline({ llm: new FakeLLM(), feeds: FAKE_FEEDS, fetchImpl: fakeFetch });
  assert.equal(r2.queued + r2.published, 0, "already-used URLs are skipped");

  // Run 3: first draft has bad evidence; retry fixes it
  await cleanNews();
  const llm = new FakeLLM();
  llm.failFirstWrite = true;
  const r3 = await runPipeline({ llm, feeds: FAKE_FEEDS, fetchImpl: fakeFetch, stories: 1, versions: 1 });
  assert.equal(r3.queued + r3.published, 1);
  assert.equal(r3.generated, 2, "one failed draft plus one retry");

  // Run 4: feeds unreachable -> logged errors, no crash
  await cleanNews();
  const r4 = await runPipeline({ llm: new FakeLLM(), feeds: FAKE_FEEDS, fetchImpl: async () => ({ ok: false, status: 503, text: async () => "" }) });
  assert.equal(r4.fetched, 0);
  assert.equal(r4.errors.filter((e) => e.startsWith("feed:")).length, 2);

  await cleanNews();
  console.log("All pipeline checks passed.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
