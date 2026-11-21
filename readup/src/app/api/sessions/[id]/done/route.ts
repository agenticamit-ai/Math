import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb, schema } from "@/db";
import { jsonError, ownedSession, readerFromRequest } from "@/lib/api";
import { minReadMs, sessionValidity, wpm } from "@/lib/metrics";

const Body = z.object({
  activeReadMs: z.number().int().nonnegative(),
  blurMs: z.number().int().nonnegative(),
  pauseCount: z.number().int().nonnegative().max(1000),
});

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = await readerFromRequest();
  if (!auth) return jsonError(401, "Sign in as a reader first.");
  const { id } = await ctx.params;
  const row = await ownedSession(id, auth.rid);
  if (!row) return jsonError(404, "Session not found.");
  const { session, passage } = row;
  if (!session.startedAt) return jsonError(409, "Reading has not started.");
  if (session.endedAt) return NextResponse.json({ ok: true });
  const body = Body.safeParse(await req.json().catch(() => null));
  if (!body.success) return jsonError(400, "Bad timing data.");

  const now = new Date();
  const elapsed = now.getTime() - session.startedAt.getTime();
  // The browser measures active time; the server caps it at real elapsed time.
  const activeReadMs = Math.min(body.data.activeReadMs, elapsed + 1000);
  const blurMs = Math.min(body.data.blurMs, Math.max(0, elapsed - activeReadMs + 1000));
  if (activeReadMs + 500 < minReadMs(passage.wordCount)) return jsonError(400, "Keep reading a little longer.");

  const rate = wpm(passage.wordCount, activeReadMs);
  const validity = sessionValidity({ wordCount: passage.wordCount, activeReadMs, blurMs });
  await getDb()
    .update(schema.readingSession)
    .set({
      endedAt: now,
      activeReadMs,
      blurMs,
      pauseCount: body.data.pauseCount,
      wordsPerMinute: Math.round(rate * 10) / 10,
      isValid: validity.isValid,
      invalidReason: validity.reason,
    })
    .where(eq(schema.readingSession.id, id));
  return NextResponse.json({ ok: true });
}
