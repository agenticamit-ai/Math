import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb, schema } from "@/db";
import { jsonError, readerFromRequest } from "@/lib/api";
import { define } from "@/lib/definitions";

const Body = z.object({
  word: z.string().trim().min(1).max(40).regex(/^[A-Za-z'’-]+$/),
  passageId: z.string().uuid(),
  sentence: z.string().max(600).default(""),
});

export async function POST(req: Request) {
  const auth = await readerFromRequest();
  if (!auth) return jsonError(401, "Sign in as a reader first.");
  const body = Body.safeParse(await req.json().catch(() => null));
  if (!body.success) return jsonError(400, "Pick a single word.");
  const db = getDb();
  const [passage] = await db.select({ glossary: schema.passage.glossary }).from(schema.passage).where(eq(schema.passage.id, body.data.passageId));
  if (!passage) return jsonError(404, "Passage not found.");

  const word = body.data.word.toLowerCase().replace(/’/g, "'");
  const definition = await define(word, passage.glossary);
  const existing = await db
    .select({ id: schema.vocabItem.id })
    .from(schema.vocabItem)
    .where(and(eq(schema.vocabItem.readerId, auth.rid), eq(schema.vocabItem.word, word)));
  if (!existing.length) {
    await db
      .insert(schema.vocabItem)
      .values({ readerId: auth.rid, word, passageId: body.data.passageId, contextSentence: body.data.sentence, definition })
      .onConflictDoNothing();
  } else if (definition) {
    await db.update(schema.vocabItem).set({ definition }).where(eq(schema.vocabItem.id, existing[0].id));
  }
  return NextResponse.json({ word, definition });
}
