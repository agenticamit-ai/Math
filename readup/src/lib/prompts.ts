import { readFileSync } from "node:fs";
import path from "node:path";

type Prompt = { name: string; version: string; model: string; body: string };
const cache = new Map<string, Prompt>();

/** Loads a versioned prompt from /prompts/<name>.md (front matter + body). */
export function loadPrompt(name: string): Prompt {
  const hit = cache.get(name);
  if (hit) return hit;
  const raw = readFileSync(path.join(process.cwd(), "prompts", `${name}.md`), "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`Prompt ${name} is missing front matter`);
  const meta = Object.fromEntries(
    m[1].split("\n").map((line) => {
      const i = line.indexOf(":");
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    }),
  );
  const prompt = { name: meta.name, version: meta.version, model: meta.model, body: m[2].trim() };
  cache.set(name, prompt);
  return prompt;
}
