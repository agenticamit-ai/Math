import { TRAPS } from "@/db/schema";
import { buildPassage } from "./build";
import type { SeedPassage } from "./types";

/** Quality rules every passage must pass, hand-written or generated. Returns a list of problems. */
export function checkPassage(p: SeedPassage): { problems: string[]; built: ReturnType<typeof buildPassage> | null } {
  const problems: string[] = [];
  let built: ReturnType<typeof buildPassage>;
  try {
    built = buildPassage(p);
  } catch (e) {
    return { problems: [(e as Error).message], built: null };
  }
  const { questions, difficulty: d } = built;
  if (questions.length < 6) problems.push(`needs 6+ questions, has ${questions.length}`);
  const closed = questions.filter((q) => q.phase === "closed_book").length;
  if (closed < 2 || closed > 3) problems.push(`needs 2–3 closed-book questions, has ${closed}`);
  if (!questions.some((q) => q.skill === "main_idea")) problems.push("no main_idea question");
  if (!questions.some((q) => q.skill === "inference")) problems.push("no inference question");
  if (d.band >= 4 && !questions.some((q) => q.format === "evidence_pair")) problems.push(`band ${d.band} needs an evidence pair`);
  if (p.keyIdeas.length !== 3) problems.push("needs 3 key ideas");
  for (const q of questions) {
    if (q.format === "evidence_pair" && q.phase !== "open_book") problems.push(`#${q.ordinal}: evidence pairs must be open-book`);
    if (q.format === "mcq" || q.format === "evidence_pair") {
      if (q.options.length !== 4) problems.push(`#${q.ordinal}: mcq needs 4 options`);
      if (q.correct.length !== 1) problems.push(`#${q.ordinal}: mcq needs exactly 1 correct answer`);
    }
    if (q.format === "multi_select" && q.correct.length !== 2) problems.push(`#${q.ordinal}: select-two needs exactly 2 correct answers`);
    if (q.format === "order_events" && q.options.length !== 4) problems.push(`#${q.ordinal}: ordering needs 4 events`);
    if (q.format !== "order_events") {
      for (const o of q.options) {
        if (!q.correct.includes(o.id) && !(o.trap && TRAPS.includes(o.trap))) problems.push(`#${q.ordinal}: distractor without trap type`);
      }
    }
    if (q.explanation.split(/\s+/).length > 40) problems.push(`#${q.ordinal}: explanation over 40 words`);
  }
  for (const [word] of p.glossary) {
    if (!new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i").test(p.body)) problems.push(`glossary word "${word}" not in body`);
  }
  return { problems, built };
}
