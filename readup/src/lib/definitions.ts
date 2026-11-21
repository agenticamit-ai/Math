import "server-only";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import type { GlossaryEntry } from "@/db/schema";

function baseForms(word: string): string[] {
  const w = word.toLowerCase();
  const forms = [w];
  if (w.endsWith("ies")) forms.push(w.slice(0, -3) + "y");
  if (w.endsWith("es")) forms.push(w.slice(0, -2));
  if (w.endsWith("s")) forms.push(w.slice(0, -1));
  if (w.endsWith("ed")) forms.push(w.slice(0, -2), w.slice(0, -1));
  if (w.endsWith("ing")) forms.push(w.slice(0, -3), w.slice(0, -3) + "e");
  if (w.endsWith("ly")) forms.push(w.slice(0, -2));
  return [...new Set(forms)];
}

/** Glossary first, then a shared cache, then the free dictionaryapi.dev lookup (only the word is sent). */
export async function define(word: string, glossary: GlossaryEntry[]): Promise<string> {
  const forms = baseForms(word);
  const g = glossary.find((e) => forms.includes(e.word.toLowerCase()) || baseForms(e.word).includes(forms[0]));
  if (g) return g.definition;

  const db = getDb();
  for (const f of forms) {
    const [hit] = await db.select().from(schema.definitionCache).where(eq(schema.definitionCache.word, f));
    if (hit) return hit.definition;
  }
  for (const f of forms) {
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(f)}`, {
        signal: AbortSignal.timeout(3500),
      });
      if (!res.ok) continue;
      const data = (await res.json()) as { meanings?: { partOfSpeech?: string; definitions?: { definition?: string }[] }[] }[];
      const m = data[0]?.meanings?.find((x) => x.definitions?.[0]?.definition);
      const def = m?.definitions?.[0]?.definition;
      if (def) {
        const text = m?.partOfSpeech ? `(${m.partOfSpeech}) ${def}` : def;
        await db.insert(schema.definitionCache).values({ word: f, definition: text }).onConflictDoNothing();
        return text;
      }
    } catch {
      // Network or timeout: fall through to the next form.
    }
  }
  return "";
}
