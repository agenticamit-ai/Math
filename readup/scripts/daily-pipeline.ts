// Daily current-affairs job. Runs from GitHub Actions at about 5 AM Pacific.
//   npm run news            real run (needs DATABASE_URL and ANTHROPIC_API_KEY)
//   npm run news -- --fake  offline run with sample feeds and a fake model
import "./env";
import { ClaudePipelineLLM } from "../src/pipeline/llm";
import { loadFeeds } from "../src/pipeline/feeds";
import { runPipeline } from "../src/pipeline/run";
import { FAKE_FEEDS, FakeLLM, fakeFetch } from "./pipeline-fake";

async function main() {
  const fake = process.argv.includes("--fake");
  if (!fake && !process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY is not set (use --fake for an offline test run).");
  const stories = Number(process.env.PIPELINE_STORIES ?? 3);
  const versions = Number(process.env.PIPELINE_VERSIONS ?? 2);
  const maxCalls = Number(process.env.PIPELINE_MAX_CALLS ?? 40);
  const summary = await runPipeline({
    llm: fake ? new FakeLLM() : new ClaudePipelineLLM(maxCalls),
    feeds: fake ? FAKE_FEEDS : loadFeeds(),
    fetchImpl: fake ? fakeFetch : undefined,
    stories,
    versions,
    log: (m) => console.log(m),
  });
  console.log("\nSummary:", JSON.stringify(summary, null, 2));
  // Fewer than 2 new items: fail the job so GitHub emails the repository owner.
  if (summary.published + summary.queued < 2) {
    console.error(`Only ${summary.published + summary.queued} item(s) were produced today.`);
    process.exit(1);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
