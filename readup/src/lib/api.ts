import "server-only";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb, schema } from "@/db";
import { getSession } from "./auth";

export const jsonError = (status: number, error: string) => NextResponse.json({ error }, { status });

export async function readerFromRequest() {
  const s = await getSession();
  if (!s || s.mode !== "reader" || !s.rid) return null;
  return s as typeof s & { rid: string };
}

/** Loads a reading session that belongs to the signed-in reader, with its passage. */
export async function ownedSession(sessionId: string, readerId: string) {
  if (!/^[0-9a-f-]{36}$/i.test(sessionId)) return null;
  const rows = await getDb()
    .select({ session: schema.readingSession, passage: schema.passage })
    .from(schema.readingSession)
    .innerJoin(schema.passage, eq(schema.passage.id, schema.readingSession.passageId))
    .where(and(eq(schema.readingSession.id, sessionId), eq(schema.readingSession.readerId, readerId)));
  return rows[0] ?? null;
}
