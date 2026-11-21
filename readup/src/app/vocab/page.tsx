import { desc, eq } from "drizzle-orm";
import { READER_NAV, Shell } from "@/components/Shell";
import { getDb, schema } from "@/db";
import { requireReader } from "@/lib/auth";

export const metadata = { title: "My words" };
export const dynamic = "force-dynamic";

export default async function VocabPage() {
  const s = await requireReader();
  const words = await getDb()
    .select({ id: schema.vocabItem.id, word: schema.vocabItem.word, definition: schema.vocabItem.definition, sentence: schema.vocabItem.contextSentence, title: schema.passage.title })
    .from(schema.vocabItem)
    .leftJoin(schema.passage, eq(schema.passage.id, schema.vocabItem.passageId))
    .where(eq(schema.vocabItem.readerId, s.rid))
    .orderBy(desc(schema.vocabItem.createdAt));
  return (
    <Shell nav={READER_NAV} width="max-w-3xl">
      <h1 className="font-serif text-3xl font-bold">My words</h1>
      <p className="mt-1 text-muted">Words you tapped while reading. Flashcard review is coming next.</p>
      {words.length === 0 ? (
        <p className="card mt-6 text-center text-muted">No words yet. While you read, tap any word you&apos;re not sure about.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {words.map((w) => (
            <li key={w.id} className="card">
              <p className="font-serif text-xl font-bold">{w.word}</p>
              <p className="mt-1">{w.definition || <span className="text-muted">No definition found.</span>}</p>
              {w.sentence && <p className="mt-2 border-l-4 border-line pl-3 font-serif text-sm italic text-muted">{w.sentence}</p>}
              {w.title && <p className="mt-1 text-xs text-muted">From &ldquo;{w.title}&rdquo;</p>}
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}
