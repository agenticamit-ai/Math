import { eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb, schema } from "@/db";
import { getSession } from "@/lib/auth";

/** Everything stored about this family, as JSON. */
export async function GET() {
  const s = await getSession();
  if (!s || s.mode !== "parent") return NextResponse.json({ error: "Parent sign-in required." }, { status: 401 });
  const db = getDb();
  const [parent] = await db
    .select({ email: schema.parent.email, name: schema.parent.name, timezone: schema.parent.timezone, settings: schema.parent.settings, createdAt: schema.parent.createdAt })
    .from(schema.parent)
    .where(eq(schema.parent.id, s.pid));
  const readers = await db.select().from(schema.reader).where(eq(schema.reader.parentId, s.pid));
  const ids = readers.map((r) => r.id);
  const sessions = ids.length ? await db.select().from(schema.readingSession).where(inArray(schema.readingSession.readerId, ids)) : [];
  const sids = sessions.map((x) => x.id);
  const answers = sids.length ? await db.select().from(schema.answer).where(inArray(schema.answer.sessionId, sids)) : [];
  const summaries = sids.length ? await db.select().from(schema.summary).where(inArray(schema.summary.sessionId, sids)) : [];
  const vocab = ids.length ? await db.select().from(schema.vocabItem).where(inArray(schema.vocabItem.readerId, ids)) : [];
  const mastery = ids.length ? await db.select().from(schema.skillMastery).where(inArray(schema.skillMastery.readerId, ids)) : [];
  const body = {
    exportedAt: new Date().toISOString(),
    parent,
    readers: readers.map(({ pinHash: _pin, ...r }) => r),
    sessions,
    answers,
    summaries,
    vocab,
    skillMastery: mastery,
  };
  return new NextResponse(JSON.stringify(body, null, 2), {
    headers: {
      "content-type": "application/json",
      "content-disposition": `attachment; filename="readup-export-${new Date().toISOString().slice(0, 10)}.json"`,
    },
  });
}
