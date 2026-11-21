import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb, schema } from "@/db";
import { jsonError, ownedSession, readerFromRequest } from "@/lib/api";

export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = await readerFromRequest();
  if (!auth) return jsonError(401, "Sign in as a reader first.");
  const { id } = await ctx.params;
  const row = await ownedSession(id, auth.rid);
  if (!row) return jsonError(404, "Session not found.");
  if (row.session.endedAt) return jsonError(409, "Reading already finished.");
  // Restarting (for example after a reload) resets the clock so time spent away is not counted.
  const startedAt = new Date();
  await getDb().update(schema.readingSession).set({ startedAt }).where(eq(schema.readingSession.id, id));
  return NextResponse.json({ startedAt: startedAt.toISOString() });
}
