import { describe, expect, it } from "vitest";
import { strands } from "./index";
import { normalizeAnswer } from "../lib/answers";

const allIds = new Set<string>();

describe.each(strands.map((s) => [s.strand, s] as const))("strand %s", (_id, s) => {
  const topicIds = new Set(s.topics.map((t) => t.id));

  it("has topics with complete lessons", () => {
    expect(s.topics.length).toBeGreaterThan(0);
    for (const t of s.topics) {
      expect(t.id, "topic id must be prefixed with strand").toMatch(new RegExp(`^${s.strand}-`));
      expect(t.lesson.intro.length).toBeGreaterThan(0);
      expect(t.lesson.keyIdeas.length).toBeGreaterThan(0);
      expect(t.lesson.examples.length).toBeGreaterThan(0);
      expect(t.lesson.tip.length).toBeGreaterThan(0);
    }
  });

  it("has well-formed questions", () => {
    for (const q of s.questions) {
      const where = `question ${q.id}`;
      expect(allIds.has(q.id), `${where}: duplicate id`).toBe(false);
      allIds.add(q.id);
      expect(topicIds.has(q.topic), `${where}: unknown topic ${q.topic}`).toBe(true);
      expect([1, 2, 3, 4, 5], where).toContain(q.difficulty);
      expect(q.prompt.trim().length, where).toBeGreaterThan(0);
      expect(q.solution.trim().length, where).toBeGreaterThan(0);
      expect(q.hints.length, `${where}: needs at least one hint`).toBeGreaterThan(0);
      if (q.style === "mc") {
        expect(q.choices?.length, `${where}: mc needs 5 choices`).toBe(5);
        expect(["A", "B", "C", "D", "E"], where).toContain(q.answer);
        expect(new Set(q.choices).size, `${where}: duplicate choices`).toBe(5);
      } else {
        expect(q.style, where).toBe("short");
        expect(q.choices, `${where}: short answer must not have choices`).toBeUndefined();
        expect(normalizeAnswer(q.answer), `${where}: answer "${q.answer}" does not parse`).not.toBeNull();
      }
      // Balanced $...$ math delimiters so KaTeX rendering doesn't break.
      for (const text of [q.prompt, q.solution, ...q.hints, ...(q.choices ?? [])]) {
        expect((text.match(/(?<!\\)\$/g) ?? []).length % 2, `${where}: unbalanced $ in "${text}"`).toBe(0);
      }
    }
  });

  it("covers every topic with questions", () => {
    for (const t of s.topics) {
      expect(s.questions.some((q) => q.topic === t.id), `topic ${t.id} has no questions`).toBe(true);
    }
  });
});
