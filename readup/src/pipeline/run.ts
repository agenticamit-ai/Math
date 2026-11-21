// Daily current-affairs pipeline: fetch → filter → rank → write → check → validate → publish → log.
import { and, eq, gte } from "drizzle-orm";
import { SEED_PASSAGES } from "@/content";
import { buildPassage, buildQuestion } from "@/content/build";
import { checkPassage } from "@/content/checks";
import type { SeedPassage, SeedQuestion } from "@/content/types";
import { getDb, schema } from "@/db";
import { countWords } from "@/lib/text";
import { CATEGORY_TOPIC, fetchArticleText, fetchHeadlines, NEWS_CATEGORIES, type FeedConfig, type Fetch, type NewsCategory } from "./feeds";
import { BudgetExceeded, type Explainer, type PipelineLLM } from "./llm";
import { longestSharedRun, rankCandidates, ruleSafety, type Candidate } from "./select";

export type RunOptions = {
  llm: PipelineLLM;
  feeds: FeedConfig[];
  fetchImpl?: Fetch;
  stories?: number;
  versions?: number;
  now?: Date;
  log?: (msg: string) => void;
};

export type RunSummary = {
  fetched: number;
  rejectedSafety: number;
  generated: number;
  published: number;
  queued: number;
  llmCalls: number;
  errors: string[];
  titles: string[];
};

const MAX_COPIED_RUN = 12;
const SOURCE_MIN_WORDS = 80;
const EXPIRES_DAYS = 30;

const median = (xs: number[], fallback: number) => {
  if (!xs.length) return fallback;
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);

/** Five seed excerpts spread across the difficulty range, for the writer's and validator's prompts. */
export function buildAnchors(): string {
  const scored = SEED_PASSAGES.filter((p) => p.genre === "informational").map((p) => ({ p, d: buildPassage(p).difficulty.score }));
  const picks = [2.5, 4, 5.5, 7, 8.5].map((target) => scored.reduce((best, x) => (Math.abs(x.d - target) < Math.abs(best.d - target) ? x : best)));
  return picks
    .map(({ p, d }) => {
      const excerpt = p.body.split(/\n\s*\n/).slice(0, 2).join(" ").split(/\s+/).slice(0, 90).join(" ");
      return `Band ${d.toFixed(1)}: ${excerpt}…`;
    })
    .join("\n\n");
}

/** Converts the writer's JSON into the seed format so it goes through the same checks as the library. */
export function toSeed(ex: Explainer, meta: { slug: string; band: number; rating: number; category: NewsCategory }): { seed: SeedPassage; recall: SeedQuestion[]; facts: string[]; problems: string[] } {
  const problems: string[] = [];
  const body = ex.body.replace(/^#+\s.*$/gm, "").replace(/\*\*?([^*]+)\*\*?/g, "$1").replace(/\n{3,}/g, "\n\n").trim();
  const questions: SeedQuestion[] = ex.questions.map((q, i) => {
    const correct = q.format === "order_events" ? [0, 1, 2, 3] : q.correct;
    if (correct.some((c) => c < 0 || c >= q.options.length)) problems.push(`#${i + 1}: answer key points to a missing option`);
    return {
      skill: q.skill,
      format: q.format,
      phase: q.phase,
      stem: q.stem,
      options: q.options.map((o, j) => ({ text: o.text, ...(o.trap && !correct.includes(j) && q.format !== "order_events" ? { trap: o.trap } : {}) })),
      correct,
      explanation: q.explanation,
      evidence: q.evidence.trim(),
      difficulty: 3,
    };
  });
  const recall: SeedQuestion[] = ex.facts.slice(0, 3).map((f) => ({
    skill: "key_details",
    format: "mcq",
    phase: "closed_book",
    stem: f.stem,
    options: f.options.map((o, j) => ({ text: o.text, ...(o.trap && j !== f.correct ? { trap: o.trap } : {}) })),
    correct: [f.correct],
    explanation: f.explanation,
    evidence: f.evidence.trim(),
    difficulty: 2,
  }));
  if (ex.key_ideas.length !== 3) problems.push("needs exactly 3 key ideas");
  if (ex.facts.length < 3) problems.push("needs 3 recall facts");
  const tags = [...new Set([CATEGORY_TOPIC[meta.category], ...ex.topic_tags.map((t) => t.toLowerCase())])]
    .filter((t) => ["sports", "science", "space", "animals", "history", "tech", "movies", "geography", "biographies"].includes(t))
    .concat("news");
  const seed: SeedPassage = {
    slug: meta.slug,
    title: ex.title.trim(),
    genre: "informational",
    tags,
    rating: meta.rating,
    knowledgeDemand: 3,
    purpose: ex.purpose_question.trim(),
    keyIdeas: [ex.key_ideas[0] ?? "", ex.key_ideas[1] ?? "", ex.key_ideas[2] ?? ""],
    // Glossary words the writer did not actually use are dropped rather than failing the passage.
    glossary: ex.glossary.filter((g) => new RegExp(`\\b${g.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i").test(body)).map((g) => [g.word, g.definition]),
    body,
    questions,
  };
  return { seed, recall, facts: ex.facts.slice(0, 3).map((f) => f.statement), problems };
}

function questionsForValidator(seed: SeedPassage, recall: SeedQuestion[]): string {
  return [...seed.questions, ...recall]
    .map((q, i) => {
      const opts = q.options.map((o, j) => `   ${String.fromCharCode(65 + j)}. ${o.text}${q.correct.includes(j) ? "  [KEY]" : ""}`).join("\n");
      return `${i + 1}. (${q.format}${i >= seed.questions.length ? ", recall" : ""}) ${q.stem}\n${opts}\n   Evidence: "${q.evidence}"`;
    })
    .join("\n\n");
}

export async function runPipeline(opts: RunOptions): Promise<RunSummary> {
  const log = opts.log ?? (() => {});
  const now = opts.now ?? new Date();
  const db = getDb();
  const summary: RunSummary = { fetched: 0, rejectedSafety: 0, generated: 0, published: 0, queued: 0, llmCalls: 0, errors: [], titles: [] };
  const rejections: { title: string; url: string; reason: string }[] = [];

  // Family settings: review mode is on unless every parent turned it off; categories are the union of choices.
  const parents = await db.select({ settings: schema.parent.settings }).from(schema.parent);
  const reviewMode = parents.length === 0 || parents.some((p) => p.settings.reviewBeforePublish !== false);
  const enabled = new Set<NewsCategory>(parents.length ? parents.flatMap((p) => p.settings.newsCategories ?? [...NEWS_CATEGORIES]) as NewsCategory[] : NEWS_CATEGORIES);
  const blocked = new Set(parents.flatMap((p) => p.settings.blockedTopics ?? []).map((t) => t.toLowerCase()));
  const readers = await db.select({ band: schema.reader.currentBand, grade: schema.reader.grade, interests: schema.reader.interests }).from(schema.reader);
  const band = Math.min(9, Math.max(2, Math.round(median(readers.map((r) => r.band), 5))));
  const grade = median(readers.map((r) => r.grade), 6);
  const bands = [band, band + 1].slice(0, opts.versions ?? 2);
  const interestCount = new Map<string, number>();
  for (const r of readers) for (const i of r.interests) interestCount.set(i, (interestCount.get(i) ?? 0) + 1);
  log(`Target bands ${bands.join(", ")}, grade ${grade}, review mode ${reviewMode ? "on" : "off"}, categories ${[...enabled].join(", ")}`);

  try {
    // 1. Fetch
    const { headlines, errors: feedErrors } = await fetchHeadlines(
      opts.feeds.filter((f) => enabled.has(f.category)),
      { fetchImpl: opts.fetchImpl },
    );
    summary.errors.push(...feedErrors.map((e) => `feed: ${e}`));
    summary.fetched = headlines.length;
    log(`Fetched ${headlines.length} headlines (${feedErrors.length} feed errors)`);

    // Skip anything already used.
    const recent = await db
      .select({ title: schema.passage.title, urls: schema.passage.sourceUrls })
      .from(schema.passage)
      .where(and(eq(schema.passage.sourceType, "current_affairs"), gte(schema.passage.createdAt, new Date(now.getTime() - 45 * 86400000))));
    const usedUrls = new Set(recent.flatMap((r) => r.urls));
    const fresh = headlines.filter((h) => !usedUrls.has(h.url));

    // 2. Safety filter: rules first, then the LLM on what is left.
    const passedRules = fresh.filter((h) => {
      const reason = ruleSafety(`${h.title} ${h.summary}`) ?? (blocked.has(CATEGORY_TOPIC[h.category]) ? "blocked topic" : null);
      if (reason) rejections.push({ title: h.title, url: h.url, reason: `rule: ${reason}` });
      return !reason;
    });
    const candidates: Candidate[] = [];
    for (let i = 0; i < passedRules.length; i += 25) {
      const batch = passedRules.slice(i, i + 25);
      const verdicts = await opts.llm.classify(batch.map((h, j) => ({ id: j + 1, title: h.title, category: h.category, summary: h.summary })));
      batch.forEach((h, j) => {
        const v = verdicts.find((x) => x.id === j + 1);
        if (!v) rejections.push({ title: h.title, url: h.url, reason: "not classified" });
        else if (!v.allow) rejections.push({ title: h.title, url: h.url, reason: `llm: ${v.reason}` });
        else candidates.push({ ...h, category: v.category, explainability: Math.min(5, Math.max(1, v.explainability)), kidInterest: Math.min(5, Math.max(1, v.kid_interest)), llmReason: v.reason });
      });
    }
    summary.rejectedSafety = rejections.length;
    log(`Safety: ${candidates.length} kept, ${rejections.length} rejected`);

    // 3. Rank
    const n = readers.length || 1;
    const picked = rankCandidates(candidates, {
      take: opts.stories ?? 3,
      recentTitles: recent.map((r) => r.title),
      interestWeight: (c) => 1 + (interestCount.get(CATEGORY_TOPIC[c.category]) ?? 0) / n,
    });
    log(`Picked: ${picked.map((p) => p.title).join(" | ")}`);

    // 4–6. Write, check, validate (one retry), then 7. publish.
    const anchors = buildAnchors();
    const day = now.toISOString().slice(0, 10);
    for (const story of picked) {
      let sourceText = await fetchArticleText(story.url, opts.fetchImpl);
      if (countWords(sourceText) < SOURCE_MIN_WORDS) sourceText = [sourceText, story.summary].filter(Boolean).join("\n\n");
      if (countWords(sourceText) < SOURCE_MIN_WORDS) {
        summary.errors.push(`${story.title}: source text too short to fact-check`);
        continue;
      }
      const storyKey = `${day}-${slugify(story.title)}`;
      for (const target of bands) {
        let feedback: string | undefined;
        for (let attempt = 1; attempt <= 2; attempt++) {
          let problems: string[] = [];
          try {
            const ex = await opts.llm.write({ grade, band: target, headline: story.title, sourceText, anchors, feedback });
            summary.generated++;
            const slug = `news-${storyKey}-b${target}`.slice(0, 90);
            const draft = toSeed(ex, { slug, band: target, rating: target, category: story.category });
            problems = [...draft.problems];
            const words = countWords(draft.seed.body);
            if (words < 350 || words > 760) problems.push(`passage is ${words} words; target 400–700`);
            const copied = longestSharedRun(draft.seed.body, sourceText);
            if (copied >= MAX_COPIED_RUN) problems.push(`passage copies ${copied} words in a row from the source; rewrite in original words`);
            const check = checkPassage(draft.seed);
            problems.push(...check.problems);
            for (const [k, q] of draft.recall.entries()) {
              if (!draft.seed.body.includes(q.evidence)) problems.push(`recall fact ${k + 1}: evidence not found in passage`);
            }
            if (problems.length) throw new Error("rule checks failed");

            const v = await opts.llm.validate({ sourceText, passage: draft.seed.body, questions: questionsForValidator(draft.seed, draft.recall), anchors });
            problems.push(
              ...v.fact_errors.map((e) => `fact error: ${e}`),
              ...v.answer_key_errors.map((e) => `answer key: ${e}`),
              ...v.ambiguous_items.map((e) => `ambiguous: ${e}`),
              ...v.safety_flags.map((e) => `safety: ${e}`),
            );
            if (!v.pass && !problems.length) problems.push("validator did not pass the item");
            const rated = { ...draft.seed, rating: Math.min(10, Math.max(1, v.estimated_band)) };
            const built = buildPassage(rated);
            if (Math.abs(built.difficulty.band - target) > 1) problems.push(`reads at band ${built.difficulty.band}; target is band ${target}`);
            if (problems.length) throw new Error("validation failed");

            // Publish (or queue for parent review).
            const status = reviewMode ? ("review" as const) : ("published" as const);
            await db.transaction(async (tx) => {
              const [row] = await tx
                .insert(schema.passage)
                .values({
                  ...built.row,
                  sourceType: "current_affairs",
                  sourceUrls: [story.url],
                  license: `Original explainer written for ReadUp from reporting by ${story.feed}`,
                  promptVersion: Object.values(opts.llm.versions).join(", ") || "unknown",
                  storyKey,
                  status,
                  publishedAt: status === "published" ? now : null,
                  expiresAt: new Date(now.getTime() + EXPIRES_DAYS * 86400000),
                })
                .onConflictDoNothing({ target: schema.passage.slug })
                .returning({ id: schema.passage.id });
              if (!row) return;
              for (const q of built.questions) await tx.insert(schema.question).values({ ...q, passageId: row.id, status: "published" });
              for (const [k, rq] of draft.recall.entries()) {
                const bq = buildQuestion(rated, rq, 101 + k);
                const [qrow] = await tx.insert(schema.question).values({ ...bq, passageId: row.id, isRecall: true, status: "published" }).returning({ id: schema.question.id });
                await tx.insert(schema.fact).values({ passageId: row.id, statement: draft.facts[k], recallQuestionId: qrow.id });
              }
            });
            if (status === "published") summary.published++;
            else summary.queued++;
            summary.titles.push(`${built.row.title} (band ${built.difficulty.band})`);
            log(`${status === "published" ? "Published" : "Queued for review"}: ${built.row.title} (D ${built.difficulty.score})`);
            break;
          } catch (e) {
            if (e instanceof BudgetExceeded) throw e;
            const reason = problems.length ? problems.join("; ") : (e as Error).message;
            if (attempt === 1) {
              feedback = problems.length ? problems.map((p) => `- ${p}`).join("\n") : undefined;
              log(`Retrying "${story.title}" at band ${target}: ${reason}`);
            } else {
              summary.errors.push(`${story.title} (band ${target}) dropped: ${reason}`);
              log(`Dropped "${story.title}" at band ${target}`);
            }
          }
        }
      }
    }
  } catch (e) {
    summary.errors.push(e instanceof BudgetExceeded ? e.message : `pipeline: ${(e as Error).message}`);
  } finally {
    summary.llmCalls = opts.llm.calls;
    await db.insert(schema.contentJobLog).values({
      runDate: now,
      fetched: summary.fetched,
      rejectedSafety: summary.rejectedSafety,
      generated: summary.generated,
      published: summary.published,
      queued: summary.queued,
      llmCalls: summary.llmCalls,
      errors: summary.errors,
      rejections,
    });
  }
  return summary;
}
