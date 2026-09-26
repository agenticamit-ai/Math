export type StructuredNote = {
  title: string;
  concept: string[];
  tricks: { title: string; body: string }[];
  practice: { prompt: string; hint: string }[];
  vocabulary: string[];
};

function bucketFor(heading: string): "concept" | "tricks" | "practice" | null {
  const text = heading
    .toLowerCase()
    .replace(/[:#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (/^(tricks?|tips?|strategies|strategy|remember|shortcuts?|watch outs?|contest habits?|contest tricks?)$/.test(text)) {
    return "tricks";
  }
  if (/^(practice|problems?|questions?|exercises?|prompts?|try these|try this)$/.test(text)) return "practice";
  if (/^(concepts?|ideas?|definitions?|overview|lesson|notes?|vocabulary|vocab|main idea|big idea)$/.test(text)) {
    return "concept";
  }
  if (text.split(" ").length <= 4 && /trick|shortcut|strateg/.test(text)) return "tricks";
  if (text.split(" ").length <= 4 && /practice|problem|question/.test(text)) return "practice";
  return null;
}

function cleanInline(line: string): string {
  return line
    .replace(/^#{1,3}\s+/, "")
    .replace(/^([-*•]|\d+[.)])\s+/, "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .trim();
}

function pushTrick(tricks: StructuredNote["tricks"], line: string) {
  const body = cleanInline(line);
  if (!body) return;
  const split = body.split(/:\s+/);
  if (split.length > 1 && split[0].length <= 48) {
    tricks.push({ title: split[0], body: split.slice(1).join(": ") });
    return;
  }
  tricks.push({ title: "Try this", body });
}

function labelBucket(line: string): "concept" | "tricks" | "practice" | null {
  if (/\?\s*$/.test(line) || line.length > 48) return null;
  return bucketFor(line);
}

export function explainNotes(raw: string): StructuredNote {
  const text = raw.replace(/\r\n/g, "\n").trim();
  if (!text) {
    return {
      title: "Empty note",
      concept: ["Paste a note or upload a .txt or .md file, then tap Explain this."],
      tricks: [],
      practice: [],
      vocabulary: [],
    };
  }

  const lines = text.split("\n");
  let title = "Parent note";
  let start = 0;
  const markdownTitle = lines.find((line) => /^#\s+/.test(line.trim()));
  if (markdownTitle) {
    title = markdownTitle.replace(/^#\s+/, "").trim();
    start = lines.indexOf(markdownTitle) + 1;
  } else if (
    lines[0] &&
    lines[0].trim().length > 0 &&
    lines[0].trim().length < 80 &&
    !/[.?!]$/.test(lines[0].trim())
  ) {
    title = lines[0].trim().replace(/^#+\s*/, "");
    start = 1;
  }

  let bucket: "concept" | "tricks" | "practice" | "unknown" = "unknown";
  const concept: string[] = [];
  const tricks: StructuredNote["tricks"] = [];
  const practice: StructuredNote["practice"] = [];
  const vocabulary = new Set<string>();

  for (const rawLine of lines.slice(start)) {
    const line = rawLine.trim();
    if (!line) continue;
    for (const match of line.matchAll(/\*\*([^*]+)\*\*/g)) {
      const word = match[1].trim();
      if (word) vocabulary.add(word);
    }

    const markdown = line.match(/^#{1,3}\s+(.+)/);
    const labeled = labelBucket(line);
    if (markdown || labeled) {
      const heading = (markdown?.[1] ?? line).replace(/:$/, "").trim();
      const next = bucketFor(heading);
      if (next) bucket = next;
      else if (markdown) concept.push(cleanInline(heading));
      continue;
    }

    const isBullet = /^([-*•]|\d+[.)])\s+/.test(line);
    const isQuestion = /\?\s*$/.test(line);
    const cleaned = cleanInline(line);

    if (bucket === "practice" || (bucket !== "tricks" && isQuestion)) {
      practice.push({
        prompt: cleaned,
        hint: "Read it once and underline the quantity the question actually asks for.",
      });
      continue;
    }

    if (bucket === "tricks" || (isBullet && /trick|tip|remember|always|never|try|draw|check|estimate|undo/i.test(line))) {
      pushTrick(tricks, line);
      continue;
    }

    if (isBullet && bucket === "unknown" && /^(draw|try|check|remember|look|count|write|use|avoid|estimate)\b/i.test(cleaned)) {
      pushTrick(tricks, line);
      continue;
    }

    concept.push(cleaned);
  }

  if (tricks.length === 0) {
    for (const sentence of concept.join(" ").split(/(?<=[.!])\s+/)) {
      if (/trick|shortcut|remember|strategy|easier|instead|watch out|common mistake/i.test(sentence)) {
        tricks.push({ title: "From the notes", body: sentence.trim() });
      }
    }
  }

  if (practice.length < 2) {
    const [firstWord] = [...vocabulary];
    if (firstWord) {
      practice.push({
        prompt: `Explain “${firstWord}” in a way a 6th grader could teach a friend.`,
        hint: "Start with a tiny example that uses whole numbers smaller than 20.",
      });
    }
    if (concept[0]) {
      const snippet = concept[0].length > 140 ? `${concept[0].slice(0, 137)}…` : concept[0];
      practice.push({
        prompt: `Invent one contest-style question that uses this idea: “${snippet}”`,
        hint: "Keep the math, change the story, then solve the question you wrote.",
      });
    }
    practice.push({
      prompt: "Work one example with small numbers, then a second example with bigger numbers.",
      hint: "If the two answers feel unrelated, check the units and what was asked.",
    });
  }

  if (concept.length === 0) {
    concept.push("These notes did not separate into a concept yet. Read them aloud and highlight the sentence that states the main idea.");
  }

  if (tricks.length === 0) {
    tricks.push(
      {
        title: "Name the target",
        body: "Before calculating, write what the question is asking for and the unit it should use.",
      },
      {
        title: "Estimate first",
        body: "Round the numbers and predict a neighborhood. If the exact answer is far away, look for a slip.",
      },
    );
  }

  return {
    title,
    concept: concept.slice(0, 8),
    tricks: tricks.slice(0, 6),
    practice: practice.slice(0, 6),
    vocabulary: [...vocabulary].slice(0, 12),
  };
}
