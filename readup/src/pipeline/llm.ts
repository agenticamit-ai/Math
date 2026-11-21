import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { loadPrompt } from "@/lib/prompts";

const Trap = z.enum(["true_but_irrelevant", "too_broad", "too_narrow", "opposite", "not_in_text"]);
const Option = z.object({ text: z.string(), trap: Trap.nullable() });

export const ClassifySchema = z.object({
  items: z.array(
    z.object({
      id: z.number().int(),
      allow: z.boolean(),
      category: z.enum(["sports", "science", "space", "tech", "movies", "world"]),
      reason: z.string(),
      explainability: z.number().int(),
      kid_interest: z.number().int(),
    }),
  ),
});
export type Classification = z.infer<typeof ClassifySchema>["items"][number];

export const ExplainerSchema = z.object({
  title: z.string(),
  body: z.string(),
  purpose_question: z.string(),
  key_ideas: z.array(z.string()),
  glossary: z.array(z.object({ word: z.string(), definition: z.string() })),
  topic_tags: z.array(z.string()),
  questions: z.array(
    z.object({
      skill: z.enum(["main_idea", "key_details", "inference", "vocab_context", "author_purpose", "text_structure", "point_of_view", "argument_evidence"]),
      format: z.enum(["mcq", "evidence_pair", "multi_select", "order_events"]),
      phase: z.enum(["closed_book", "open_book"]),
      stem: z.string(),
      options: z.array(Option),
      correct: z.array(z.number().int()),
      explanation: z.string(),
      evidence: z.string(),
    }),
  ),
  facts: z.array(
    z.object({
      statement: z.string(),
      stem: z.string(),
      options: z.array(Option),
      correct: z.number().int(),
      explanation: z.string(),
      evidence: z.string(),
    }),
  ),
});
export type Explainer = z.infer<typeof ExplainerSchema>;

export const ValidationSchema = z.object({
  fact_errors: z.array(z.string()),
  answer_key_errors: z.array(z.string()),
  ambiguous_items: z.array(z.string()),
  safety_flags: z.array(z.string()),
  estimated_band: z.number(),
  pass: z.boolean(),
});
export type Validation = z.infer<typeof ValidationSchema>;

export type WriteArgs = {
  grade: number;
  band: number;
  headline: string;
  sourceText: string;
  anchors: string;
  feedback?: string;
};

export interface PipelineLLM {
  readonly calls: number;
  readonly versions: Record<string, string>;
  classify(items: { id: number; title: string; category: string; summary: string }[]): Promise<Classification[]>;
  write(args: WriteArgs): Promise<Explainer>;
  validate(args: { sourceText: string; passage: string; questions: string; anchors: string }): Promise<Validation>;
}

export class BudgetExceeded extends Error {}

const fill = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in vars ? String(vars[k]) : `{{${k}}}`));

const EXTRA_SKILLS = ["key_details", "vocab_context", "author_purpose", "text_structure", "point_of_view", "argument_evidence"];

/** Claude-backed implementation. Every call counts toward a hard daily cap. */
export class ClaudePipelineLLM implements PipelineLLM {
  calls = 0;
  versions: Record<string, string> = {};
  private client = new Anthropic({ timeout: 180_000, maxRetries: 2 });
  constructor(private maxCalls: number) {}

  private async call<T extends z.ZodType>(
    schema: T,
    promptName: string,
    vars: Record<string, string | number>,
    user: string,
    opts: { maxTokens: number; effort: "low" | "medium" | "high" },
  ): Promise<z.infer<T>> {
    if (this.calls >= this.maxCalls) throw new BudgetExceeded(`LLM call cap of ${this.maxCalls} reached`);
    this.calls++;
    const prompt = loadPrompt(promptName);
    this.versions[promptName] = prompt.version;
    // Sonnet gets server-side refusal fallbacks; Haiku has none.
    const fallback = prompt.model.startsWith("claude-sonnet")
      ? { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" as const }
      : {};
    const res = await this.client.beta.messages.parse({
      model: prompt.model,
      max_tokens: opts.maxTokens,
      system: fill(prompt.body, vars),
      messages: [{ role: "user", content: user }],
      output_config: { effort: opts.effort, format: betaZodOutputFormat(schema) },
      ...fallback,
    });
    if (res.stop_reason === "refusal") throw new Error(`${promptName}: model declined`);
    if (res.stop_reason === "max_tokens") throw new Error(`${promptName}: output was cut off`);
    if (!res.parsed_output) throw new Error(`${promptName}: no parseable output`);
    return res.parsed_output as z.infer<T>;
  }

  async classify(items: { id: number; title: string; category: string; summary: string }[]) {
    const user = items.map((i) => `${i.id}. [${i.category}] ${i.title}\n   ${i.summary.slice(0, 300)}`).join("\n");
    const out = await this.call(ClassifySchema, "safety_filter", {}, `ITEMS:\n${user}`, { maxTokens: 8000, effort: "low" });
    return out.items;
  }

  async write(a: WriteArgs) {
    const extra = [...EXTRA_SKILLS].sort(() => Math.random() - 0.5).slice(0, 4).join(", ");
    const vars = {
      grade: a.grade,
      band: a.band,
      min_words: 400,
      max_words: 700,
      extra_skills: extra,
      evidence_pair_rule:
        a.band >= 4 ? "Exactly 1 question uses format evidence_pair, and it is open_book." : "Do not use the evidence_pair format.",
      anchors: a.anchors,
    };
    const user = `HEADLINE: ${a.headline}\n\nSOURCE TEXT:\n<source>\n${a.sourceText}\n</source>${a.feedback ? `\n\nA previous draft was rejected. Fix these problems:\n${a.feedback}` : ""}`;
    return this.call(ExplainerSchema, "write_explainer", vars, user, { maxTokens: 16000, effort: "medium" });
  }

  async validate(a: { sourceText: string; passage: string; questions: string; anchors: string }) {
    const user = `SOURCE TEXT:\n<source>\n${a.sourceText}\n</source>\n\nPASSAGE:\n<passage>\n${a.passage}\n</passage>\n\nQUESTIONS:\n${a.questions}`;
    return this.call(ValidationSchema, "validate", { anchors: a.anchors }, user, { maxTokens: 8000, effort: "medium" });
  }
}
