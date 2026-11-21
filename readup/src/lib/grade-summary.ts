import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { loadPrompt } from "./prompts";

export type SummaryGrade = {
  score: number;
  keyIdeasHit: string[];
  feedback: string;
  gradedBy: string;
};

const GradeSchema = z.object({
  score_0_4: z.number().int(),
  key_ideas_hit: z.array(z.number().int()),
  feedback_one_line: z.string(),
});

const STOP = new Set(
  "the a an and or but of to in on at for with from by as is are was were be been being it its this that these those he she they them his her their we our you your i my me not no so than then there here into out up down over under about after before when while which who what how why can could would should will just also very more most some any each".split(
    " ",
  ),
);

function contentWords(text: string): string[] {
  return (text.toLowerCase().match(/[a-z][a-z'-]+/g) ?? []).filter((w) => w.length >= 4 && !STOP.has(w));
}

/** No-API fallback: counts key ideas whose content words show up in the summary. */
export function keywordGrade(summary: string, keyIdeas: string[]): SummaryGrade {
  const said = new Set(contentWords(summary).map((w) => w.slice(0, 5)));
  const hits = keyIdeas.filter((idea) => {
    const ws = [...new Set(contentWords(idea).map((w) => w.slice(0, 5)))];
    if (ws.length === 0) return false;
    return ws.filter((w) => said.has(w)).length / ws.length >= 0.4;
  });
  const wordCount = summary.trim().split(/\s+/).filter(Boolean).length;
  let score = hits.length;
  if (hits.length > 0 && wordCount >= 8 && wordCount <= 70) score += 1;
  score = Math.min(4, score);
  const missing = keyIdeas.find((k) => !hits.includes(k));
  const feedback =
    wordCount < 5
      ? "Try writing a full sentence or two about what the passage was mostly about."
      : missing
        ? `Good start! Next time, also mention this idea: "${missing.replace(/\.$/, "")}."`
        : "Nice work. You covered the most important ideas in your own words.";
  return { score, keyIdeasHit: hits, feedback, gradedBy: "keyword-v1" };
}

/**
 * Grades a summary with Claude Haiku when ANTHROPIC_API_KEY is set; otherwise uses the keyword check.
 * Sends only the passage text, its key ideas, and the student's summary.
 */
export async function gradeSummary(args: { passage: string; keyIdeas: string[]; summary: string }): Promise<SummaryGrade> {
  if (!process.env.ANTHROPIC_API_KEY) return keywordGrade(args.summary, args.keyIdeas);
  const prompt = loadPrompt("grade_summary");
  try {
    const client = new Anthropic({ timeout: 20_000, maxRetries: 1 });
    const res = await client.messages.parse({
      model: prompt.model,
      max_tokens: 2000,
      system: prompt.body,
      output_config: { effort: "low", format: zodOutputFormat(GradeSchema) },
      messages: [
        {
          role: "user",
          content: `PASSAGE:\n${args.passage}\n\nKEY IDEAS:\n${args.keyIdeas.map((k, i) => `${i + 1}. ${k}`).join("\n")}\n\nSTUDENT SUMMARY:\n<summary>\n${args.summary}\n</summary>`,
        },
      ],
    });
    const out = res.stop_reason === "refusal" ? null : res.parsed_output;
    if (!out) return keywordGrade(args.summary, args.keyIdeas);
    return {
      score: Math.max(0, Math.min(4, Math.round(out.score_0_4))),
      keyIdeasHit: [...new Set(out.key_ideas_hit)].filter((n) => n >= 1 && n <= args.keyIdeas.length).map((n) => args.keyIdeas[n - 1]),
      feedback: out.feedback_one_line.trim().slice(0, 300),
      gradedBy: prompt.version,
    };
  } catch (err) {
    if (err instanceof Anthropic.APIError) console.error(`Summary grading failed (${err.status}): ${err.message}`);
    else console.error("Summary grading failed:", err);
    return keywordGrade(args.summary, args.keyIdeas);
  }
}
