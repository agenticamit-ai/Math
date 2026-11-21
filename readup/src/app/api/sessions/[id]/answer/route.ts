import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb, schema } from "@/db";
import { jsonError, ownedSession, readerFromRequest } from "@/lib/api";
import { updateMastery } from "@/lib/reader";
import { scoreAnswer } from "@/lib/scoring";

const Body = z.object({
  questionId: z.string().uuid(),
  selected: z.array(z.string().max(8)).max(8),
  evidenceSentence: z.number().int().nonnegative().optional(),
  timeMs: z.number().int().nonnegative().max(3_600_000).default(0),
});

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = await readerFromRequest();
  if (!auth) return jsonError(401, "Sign in as a reader first.");
  const { id } = await ctx.params;
  const row = await ownedSession(id, auth.rid);
  if (!row) return jsonError(404, "Session not found.");
  const { session, passage } = row;
  if (!session.endedAt) return jsonError(409, "Finish reading first.");
  if (session.completedAt) return jsonError(409, "This session is already finished.");
  const body = Body.safeParse(await req.json().catch(() => null));
  if (!body.success) return jsonError(400, "Bad answer.");
  if (!session.questionIds.includes(body.data.questionId)) return jsonError(400, "That question is not part of this session.");

  const db = getDb();
  const [q] = await db
    .select()
    .from(schema.question)
    .where(and(eq(schema.question.id, body.data.questionId), eq(schema.question.passageId, passage.id)));
  if (!q) return jsonError(404, "Question not found.");

  const response = { selected: body.data.selected, evidenceSentence: body.data.evidenceSentence };
  const scored = scoreAnswer(q, response, passage.body);
  // First answer counts. Re-sending the same question (for example after a network retry) is a no-op.
  const inserted = await db
    .insert(schema.answer)
    .values({ sessionId: id, questionId: q.id, response, isCorrect: scored.isCorrect, score: scored.score, timeMs: body.data.timeMs })
    .onConflictDoNothing()
    .returning({ id: schema.answer.id });
  if (inserted.length && session.isValid !== false) await updateMastery(auth.rid, q.skill, scored.score, q.difficulty);
  return NextResponse.json({ ok: true });
}
