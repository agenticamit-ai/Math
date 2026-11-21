// Offline stand-ins for the news feeds and Claude, used by `npm run news -- --fake` and tests.
import { difficulty } from "../src/lib/text";
import type { FeedConfig } from "../src/pipeline/feeds";
import type { Classification, Explainer, PipelineLLM, Validation, WriteArgs } from "../src/pipeline/llm";

export const FAKE_FEEDS: FeedConfig[] = [
  { category: "space", name: "Fake Space News", url: "https://fake.test/space.xml" },
  { category: "science", name: "Fake Science Atom", url: "https://fake.test/science.atom" },
];

const RSS = `<?xml version="1.0"?><rss version="2.0"><channel><title>Fake Space</title>
<item><title>Telescope spots water vapor around a distant planet</title><link>https://fake.test/a/water-planet</link><description>Astronomers detected water vapor in the atmosphere of a planet 120 light-years away.</description><pubDate>Fri, 20 Nov 2026 10:00:00 GMT</pubDate></item>
<item><title>Police arrest suspect after museum theft</title><link>https://fake.test/a/theft</link><description>A suspect was charged.</description><pubDate>Fri, 20 Nov 2026 09:00:00 GMT</pubDate></item>
<item><title>Celebrity couple announces surprise news</title><link>https://fake.test/a/celebrity</link><description>Fans react online.</description><pubDate>Fri, 20 Nov 2026 08:00:00 GMT</pubDate></item>
</channel></rss>`;

const ATOM = `<?xml version="1.0" encoding="utf-8"?><feed xmlns="http://www.w3.org/2005/Atom"><title>Fake Science</title>
<entry><title>Students build a robot that sorts recycling</title><link href="https://fake.test/a/recycling-robot"/><summary>A middle school team designed a robot that sorts plastic from paper.</summary><updated>2026-11-20T07:00:00Z</updated></entry>
<entry><title>Scientists find a new species of glowing mushroom</title><link rel="alternate" href="https://fake.test/a/glowing-mushroom"/><summary>The mushroom glows green at night in a rainforest.</summary><updated>2026-11-19T07:00:00Z</updated></entry>
</feed>`;

const article = (topic: string) =>
  `<html><head><script>var x=1;</script></head><body><nav><p>Menu link one two three four five six seven eight</p></nav>` +
  Array.from({ length: 6 }, (_, i) => `<p>Reporters described how the ${topic} story unfolded during week ${i + 1}, and researchers shared careful measurements with the public about it.</p>`).join("") +
  `</body></html>`;

export const fakeFetch = async (url: string) => {
  const body = url.endsWith(".xml") ? RSS : url.endsWith(".atom") ? ATOM : url.includes("/a/") ? article(url.split("/").pop()!) : "";
  return { ok: Boolean(body), status: body ? 200 : 404, text: async () => body };
};

/** Deterministic fake model: writes a templated passage whose questions quote it exactly. */
export class FakeLLM implements PipelineLLM {
  calls = 0;
  versions = { write_explainer: "fake-v1", validate: "fake-v1", safety_filter: "fake-v1" };
  /** When set, the first draft quotes evidence that is not in the passage, to exercise the retry path. */
  failFirstWrite = false;
  private lastBand = 5;
  private writes = 0;

  async classify(items: { id: number; title: string; category: string }[]): Promise<Classification[]> {
    this.calls++;
    return items.map((i) => ({
      id: i.id,
      allow: !/celebrity/i.test(i.title),
      category: i.category as Classification["category"],
      reason: /celebrity/i.test(i.title) ? "celebrity gossip" : "discovery a child can learn from",
      explainability: 4,
      kid_interest: 4,
    }));
  }

  async write(a: WriteArgs): Promise<Explainer> {
    this.calls++;
    this.writes++;
    this.lastBand = a.band;
    const broken = this.failFirstWrite && this.writes === 1 && !a.feedback;
    const t = a.headline.replace(/[.?!]$/, "");
    const s = {
      main: `This explainer tells the story behind a recent headline: ${t.toLowerCase()}.`,
      detail: `The team worked for many months before they were ready to share what they had learned.`,
      infer: `Because the work required patience, the researchers checked every result more than once before announcing it.`,
      vocab: `Their meticulous notes, which recorded every small change, helped other experts trust the findings.`,
      purpose: `Stories like this one show how curiosity and careful testing lead to new knowledge.`,
    };
    const filler = (n: number) =>
      Array.from({ length: n }, (_, i) =>
        [
          "Scientists often begin with a simple question and then design a test to answer it.",
          "They collect evidence, compare it with what they expected, and look for patterns that repeat.",
          "When a result surprises them, they try the test again to be sure it was not an accident.",
          "Sharing results lets other people repeat the work and build on it in new directions.",
          "Every discovery adds a small piece to a much larger puzzle about how the world works.",
        ][i % 5],
      ).join(" ");
    const body = [
      `${s.main} ${filler(4)}`,
      `${s.detail} ${filler(5)}`,
      `${s.infer} ${filler(5)}`,
      `${s.vocab} ${filler(5)}`,
      `${filler(5)} ${s.purpose}`,
      `${filler(5)}`,
    ].join("\n\n");
    const traps = ["too_narrow", "opposite", "not_in_text"] as const;
    const mcq = (skill: Explainer["questions"][number]["skill"], phase: "closed_book" | "open_book", stem: string, ev: string, format: "mcq" | "evidence_pair" = "mcq") => ({
      skill,
      format,
      phase,
      stem,
      options: [{ text: "The correct answer", trap: null }, ...traps.map((tr, i) => ({ text: `Distractor ${i + 1}`, trap: tr }))],
      correct: [0],
      explanation: "The highlighted sentence gives the answer.",
      evidence: ev,
    });
    return {
      title: `${t}: What Happened?`,
      body,
      purpose_question: "As you read, figure out how the team made its discovery.",
      key_ideas: ["A team made a discovery.", "They tested their results carefully.", "Careful testing builds knowledge."],
      glossary: [{ word: "meticulous", definition: "very careful and precise" }, { word: "notawordhere", definition: "dropped" }],
      topic_tags: ["science"],
      questions: [
        mcq("main_idea", "closed_book", "What is the passage mostly about?", broken ? "A sentence that is not in the passage." : s.main),
        mcq("key_details", "closed_book", "How long did the team work?", s.detail),
        mcq("inference", "open_book", "Why did they check results twice?", s.infer, a.band >= 4 ? "evidence_pair" : "mcq"),
        mcq("vocab_context", "open_book", 'What does "meticulous" mean?', s.vocab),
        mcq("author_purpose", "open_book", "Why does the author end this way?", s.purpose),
        mcq("text_structure", "open_book", "How is the passage organized?", s.main),
      ],
      facts: [s.detail, s.infer, s.vocab].map((ev, i) => ({
        statement: `Fact ${i + 1}`,
        stem: `Recall question ${i + 1}?`,
        options: [{ text: "Right", trap: null }, ...traps.map((tr, j) => ({ text: `Wrong ${j}`, trap: tr }))],
        correct: 0,
        explanation: "From the passage.",
        evidence: ev,
      })),
    };
  }

  async validate(a: { passage: string }): Promise<Validation> {
    this.calls++;
    // Pick the rating that makes the blended score land on the target band.
    const d = difficulty(a.passage, 5);
    const target = this.lastBand;
    const rating = Math.min(10, Math.max(1, (target - 0.35 * d.fk - 0.25 * d.dc) / 0.4));
    return { fact_errors: [], answer_key_errors: [], ambiguous_items: [], safety_flags: [], estimated_band: Math.round(rating * 10) / 10, pass: true };
  }
}
