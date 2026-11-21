import { eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb, schema } from "@/db";
import { jsonError, ownedSession, readerFromRequest } from "@/lib/api";
import { gradeSummary } from "@/lib/grade-summary";
import { effectiveRate, weightedAccuracy, xpFor } from "@/lib/metrics";
import { completedSessions, nextBand } from "@/lib/reader";

const Body = z.object({ text: z.string().trim().min(1).max(1500) });

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
  if (!body.success) return jsonError(400, "Write a sentence or two first.");

  const db = getDb();
  const grade = await gradeSummary({ passage: passage.body, keyIdeas: passage.keyIdeas, summary: body.data.text });
  await db
    .insert(schema.summary)
    .values({
      sessionId: id,
      text: body.data.text,
      aiScore: grade.score,
      aiFeedback: grade.feedback,
      keyIdeasHit: grade.keyIdeasHit,
      gradedBy: grade.gradedBy,
    })
    .onConflictDoNothing();

  // Finalize: accuracy (closed-book weighted 1.5x; unanswered questions count as 0), ERR, XP, band.
  const qs = session.questionIds.length
    ? await db.select({ id: schema.question.id, phase: schema.question.phase }).from(schema.question).where(inArray(schema.question.id, session.questionIds))
    : [];
  const answers = await db.select().from(schema.answer).where(eq(schema.answer.sessionId, id));
  const byQ = new Map(answers.map((a) => [a.questionId, a]));
  const accuracy = weightedAccuracy(qs.map((q) => ({ phase: q.phase, score: byQ.get(q.id)?.score ?? 0 })));
  const err = effectiveRate(session.wordsPerMinute ?? 0, accuracy);
  const xp = xpFor({ correctItems: answers.filter((a) => a.isCorrect).length, wroteSummary: true });
  const completedAt = new Date();

  const [reader] = await db.select().from(schema.reader).where(eq(schema.reader.id, auth.rid));
  await db
    .update(schema.readingSession)
    .set({ accuracy, effectiveRate: Math.round(err * 10) / 10, xpEarned: xp, completedAt })
    .where(eq(schema.readingSession.id, id));
  const history = await completedSessions(auth.rid);
  const band = nextBand(reader.currentBand, history);
  await db.update(schema.readingSession).set({ bandAfter: band }).where(eq(schema.readingSession.id, id));
  await db
    .update(schema.reader)
    .set({ currentBand: band, xp: reader.xp + xp })
    .where(eq(schema.reader.id, auth.rid));

  return NextResponse.json({ score: grade.score, feedback: grade.feedback });
}
