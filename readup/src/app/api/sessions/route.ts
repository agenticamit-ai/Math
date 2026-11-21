import { and, asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb, schema } from "@/db";
import { jsonError, readerFromRequest } from "@/lib/api";
import { completedSessions, masteryMap, PLACEMENT_BANDS, readerWithParent } from "@/lib/reader";

const Body = z.object({ passageId: z.string().uuid() });

const MAX_CLOSED = 3;
const MAX_OPEN = 5;

export async function POST(req: Request) {
  const auth = await readerFromRequest();
  if (!auth) return jsonError(401, "Sign in as a reader first.");
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return jsonError(400, "Missing passage.");
  const db = getDb();

  const [passage] = await db
    .select()
    .from(schema.passage)
    .where(and(eq(schema.passage.id, parsed.data.passageId), eq(schema.passage.status, "published")));
  if (!passage) return jsonError(404, "That passage is not available.");

  const info = await readerWithParent(auth.rid);
  if (!info) return jsonError(404, "Reader not found.");

  // Resume an unfinished session on the same passage instead of starting a duplicate.
  const open = await db
    .select({ id: schema.readingSession.id, completedAt: schema.readingSession.completedAt })
    .from(schema.readingSession)
    .where(and(eq(schema.readingSession.readerId, auth.rid), eq(schema.readingSession.passageId, passage.id)));
  const unfinished = open.find((s) => !s.completedAt);
  if (unfinished) return NextResponse.json({ id: unfinished.id });

  const history = await completedSessions(auth.rid);
  const placementsDone = history.filter((s) => s.isPlacement).length;
  const isPlacement = placementsDone < PLACEMENT_BANDS.length && history.length === placementsDone;

  const qs = await db
    .select({ id: schema.question.id, skill: schema.question.skill, phase: schema.question.phase })
    .from(schema.question)
    .where(and(eq(schema.question.passageId, passage.id), eq(schema.question.status, "published"), eq(schema.question.isRecall, false)))
    .orderBy(asc(schema.question.ordinal));

  // Required skills first (main_idea, inference), then weakest skills: weight (1 - mastery).
  const mastery = await masteryMap(auth.rid);
  const choose = (phase: "closed_book" | "open_book", max: number) => {
    const cands = qs.filter((q) => q.phase === phase);
    if (cands.length <= max) return cands;
    const required = cands.filter((q) => q.skill === "main_idea" || q.skill === "inference").slice(0, 2);
    const rest = cands.filter((q) => !required.includes(q));
    const picked = [...required];
    while (picked.length < max && rest.length) {
      const weights = rest.map((q) => 1 - mastery[q.skill].mastery + 0.05);
      let r = Math.random() * weights.reduce((a, b) => a + b, 0);
      let i = 0;
      while (r > weights[i]) r -= weights[i++];
      picked.push(rest.splice(Math.min(i, rest.length - 1), 1)[0]);
    }
    return cands.filter((q) => picked.includes(q));
  };
  const questionIds = [...choose("closed_book", MAX_CLOSED), ...choose("open_book", MAX_OPEN)].map((q) => q.id);

  const [created] = await db
    .insert(schema.readingSession)
    .values({
      readerId: auth.rid,
      passageId: passage.id,
      attemptNumber: open.length + 1,
      mode: open.length > 0 ? "repeated" : "silent",
      questionIds,
      isPlacement,
      bandBefore: info.reader.currentBand,
    })
    .returning({ id: schema.readingSession.id });
  return NextResponse.json({ id: created.id });
}

