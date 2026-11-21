import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb, schema } from "@/db";
import { jsonError, readerFromRequest } from "@/lib/api";
import { dueRecalls, recallQuestions } from "@/lib/recall";

const Body = z.object({
  passageId: z.string().uuid(),
  answers: z.array(z.object({ questionId: z.string().uuid(), selected: z.string().max(8) })).max(10),
});

const RECALL_XP = 5;

export async function POST(req: Request) {
  const auth = await readerFromRequest();
  if (!auth) return jsonError(401, "Sign in as a reader first.");
  const body = Body.safeParse(await req.json().catch(() => null));
  if (!body.success) return jsonError(400, "Bad quiz answers.");
  const due = (await dueRecalls(auth.rid)).find((d) => d.passageId === body.data.passageId);
  if (!due) return jsonError(409, "This quiz isn't available.");
  const qs = await recallQuestions(body.data.passageId);
  const picked = new Map(body.data.answers.map((a) => [a.questionId, a.selected]));
  const answers = qs.map((q) => ({ questionId: q.id, selected: picked.get(q.id) ?? "", isCorrect: picked.get(q.id) === q.correct[0] }));
  const correct = answers.filter((a) => a.isCorrect).length;
  const db = getDb();
  const inserted = await db
    .insert(schema.recallAttempt)
    .values({
      readerId: auth.rid,
      passageId: body.data.passageId,
      delayDays: Math.floor((Date.now() - due.completedAt!.getTime()) / 86400000),
      correct,
      total: qs.length,
      answers,
    })
    .onConflictDoNothing()
    .returning({ id: schema.recallAttempt.id });
  if (inserted.length) await db.update(schema.reader).set({ xp: sql`${schema.reader.xp} + ${RECALL_XP}` }).where(eq(schema.reader.id, auth.rid));
  // The answer key is revealed only after the quiz is submitted.
  return NextResponse.json({
    correct,
    total: qs.length,
    xp: inserted.length ? RECALL_XP : 0,
    review: qs.map((q) => ({
      questionId: q.id,
      correct: q.correct[0],
      isCorrect: answers.find((a) => a.questionId === q.id)!.isCorrect,
      explanation: q.explanation,
      evidence: q.evidenceText,
    })),
  });
}
