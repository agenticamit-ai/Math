import "server-only";
import { and, asc, eq, inArray, isNotNull, lte } from "drizzle-orm";
import { getDb, schema } from "@/db";

export const RECALL_DELAY_DAYS = 7;
const DAY = 86400000;

/** News passages this reader finished 7+ days ago and hasn't been quizzed on, oldest first. */
export async function dueRecalls(readerId: string, now = new Date()) {
  const db = getDb();
  const finished = await db
    .select({ passageId: schema.readingSession.passageId, completedAt: schema.readingSession.completedAt, title: schema.passage.title })
    .from(schema.readingSession)
    .innerJoin(schema.passage, eq(schema.passage.id, schema.readingSession.passageId))
    .where(
      and(
        eq(schema.readingSession.readerId, readerId),
        eq(schema.passage.sourceType, "current_affairs"),
        isNotNull(schema.readingSession.completedAt),
        lte(schema.readingSession.completedAt, new Date(now.getTime() - RECALL_DELAY_DAYS * DAY)),
      ),
    )
    .orderBy(asc(schema.readingSession.completedAt));
  if (!finished.length) return [];
  const ids = [...new Set(finished.map((f) => f.passageId))];
  const done = await db
    .select({ passageId: schema.recallAttempt.passageId })
    .from(schema.recallAttempt)
    .where(and(eq(schema.recallAttempt.readerId, readerId), inArray(schema.recallAttempt.passageId, ids)));
  const withQuestions = await db
    .selectDistinct({ passageId: schema.question.passageId })
    .from(schema.question)
    .where(and(inArray(schema.question.passageId, ids), eq(schema.question.isRecall, true), eq(schema.question.status, "published")));
  const doneSet = new Set(done.map((d) => d.passageId));
  const hasQ = new Set(withQuestions.map((q) => q.passageId));
  const seen = new Set<string>();
  return finished.filter((f) => {
    if (seen.has(f.passageId) || doneSet.has(f.passageId) || !hasQ.has(f.passageId)) return false;
    seen.add(f.passageId);
    return true;
  });
}

export async function recallQuestions(passageId: string) {
  return getDb()
    .select()
    .from(schema.question)
    .where(and(eq(schema.question.passageId, passageId), eq(schema.question.isRecall, true), eq(schema.question.status, "published")))
    .orderBy(asc(schema.question.ordinal));
}

/** Knowledge retention: share of 7-day recall questions answered correctly. */
export async function retention(readerId: string) {
  const rows = await getDb().select({ correct: schema.recallAttempt.correct, total: schema.recallAttempt.total }).from(schema.recallAttempt).where(eq(schema.recallAttempt.readerId, readerId));
  const total = rows.reduce((n, r) => n + r.total, 0);
  return { quizzes: rows.length, rate: total ? rows.reduce((n, r) => n + r.correct, 0) / total : null };
}
