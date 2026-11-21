import { and, eq, inArray, isNotNull, ne } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Results } from "@/components/Results";
import { SessionFlow, type FlowQuestion } from "@/components/SessionFlow";
import { READER_NAV, Shell } from "@/components/Shell";
import { getDb, schema } from "@/db";
import { ownedSession } from "@/lib/api";
import { requireReader } from "@/lib/auth";
import { GENRE_LABELS } from "@/lib/constants";
import { readerOverview } from "@/lib/reader";

export const metadata = { title: "Reading" };
export const dynamic = "force-dynamic";

export default async function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const s = await requireReader();
  const { id } = await params;
  const row = await ownedSession(id, s.rid);
  if (!row) notFound();
  const { session, passage } = row;
  const db = getDb();

  const qRows = session.questionIds.length ? await db.select().from(schema.question).where(inArray(schema.question.id, session.questionIds)) : [];
  const ordered = session.questionIds.map((qid) => qRows.find((q) => q.id === qid)!).filter(Boolean);
  const answers = await db.select().from(schema.answer).where(eq(schema.answer.sessionId, id));

  if (session.completedAt) {
    const [summary] = await db.select().from(schema.summary).where(eq(schema.summary.sessionId, id));
    const previous = await db
      .select({ wpm: schema.readingSession.wordsPerMinute, accuracy: schema.readingSession.accuracy, err: schema.readingSession.effectiveRate, completedAt: schema.readingSession.completedAt })
      .from(schema.readingSession)
      .where(
        and(
          eq(schema.readingSession.readerId, s.rid),
          ne(schema.readingSession.id, id),
          isNotNull(schema.readingSession.completedAt),
          eq(schema.readingSession.isValid, true),
          eq(schema.readingSession.attemptNumber, 1),
        ),
      );
    const before = previous
      .filter((x) => x.completedAt! < session.completedAt!)
      .sort((a, b) => b.completedAt!.getTime() - a.completedAt!.getTime())
      .slice(0, 5);
    const ov = await readerOverview(s.rid);
    return (
      <Shell nav={READER_NAV}>
        <Results
          title={passage.title}
          body={passage.body}
          wpm={session.wordsPerMinute}
          accuracy={session.accuracy}
          err={session.effectiveRate}
          isValid={session.isValid}
          invalidReason={session.invalidReason}
          attemptNumber={session.attemptNumber}
          isPlacement={session.isPlacement}
          xp={session.xpEarned}
          streak={ov?.streak ?? 0}
          previous={before}
          questions={ordered}
          answers={new Map(answers.map((a) => [a.questionId, a]))}
          summary={summary ?? null}
          sourceUrls={passage.sourceType === "current_affairs" ? passage.sourceUrls : []}
        />
      </Shell>
    );
  }

  const answered = answers.map((a) => a.questionId);
  const initialStage = !session.endedAt ? "preread" : answered.length >= ordered.length ? "summary" : "questions";
  // Never send answer keys, explanations, or trap labels to the browser before results.
  const questions: FlowQuestion[] = ordered.map((q) => ({
    id: q.id,
    format: q.format,
    phase: q.phase,
    stem: q.stem,
    options: q.options.map((o) => ({ id: o.id, text: o.text })),
  }));
  return (
    <Shell width="max-w-6xl">
      <SessionFlow
        sessionId={session.id}
        passage={{
          id: passage.id,
          title: passage.title,
          genreLabel: GENRE_LABELS[passage.genre],
          body: passage.body,
          wordCount: passage.wordCount,
          purposeQuestion: passage.purposeQuestion,
        }}
        questions={questions}
        answered={answered}
        initialStage={initialStage}
      />
    </Shell>
  );
}
