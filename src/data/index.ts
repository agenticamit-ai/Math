import type { Question, StrandFile, Topic } from "../types";

const modules = import.meta.glob<StrandFile>("./strands/*.json", { eager: true, import: "default" });

const ORDER = ["arith", "nt", "alg", "geo", "cp", "logic"];

export const strands: StrandFile[] = Object.values(modules).sort(
  (a, b) => ORDER.indexOf(a.strand) - ORDER.indexOf(b.strand),
);

export const topics: (Topic & { strand: StrandFile })[] = strands.flatMap((s) =>
  s.topics.map((t) => ({ ...t, strand: s })),
);

export const questions: Question[] = strands.flatMap((s) => s.questions);

export const questionById = new Map(questions.map((q) => [q.id, q]));
export const topicById = new Map(topics.map((t) => [t.id, t]));
