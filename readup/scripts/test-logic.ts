// Quick checks of the pure scoring and timing rules. Run: npx tsx scripts/test-logic.ts
import assert from "node:assert/strict";
import { minReadMs, sessionValidity, weightedAccuracy, wpm } from "../src/lib/metrics";
import { scoreAnswer } from "../src/lib/scoring";
import { allSentences, difficulty } from "../src/lib/text";

assert.equal(Math.round(wpm(300, 120_000)), 150);
assert.equal(minReadMs(600), 60_000);
assert.equal(sessionValidity({ wordCount: 300, activeReadMs: 30_000, blurMs: 0 }).isValid, false); // 600 WPM
assert.equal(sessionValidity({ wordCount: 300, activeReadMs: 600_000, blurMs: 0 }).isValid, false); // 30 WPM
assert.equal(sessionValidity({ wordCount: 100, activeReadMs: 600_000, blurMs: 0 }).isValid, true); // short passage: low-WPM rule off
assert.equal(sessionValidity({ wordCount: 300, activeReadMs: 120_000, blurMs: 130_000 }).isValid, false); // >50% away
assert.equal(sessionValidity({ wordCount: 300, activeReadMs: 120_000, blurMs: 10_000 }).isValid, true);
// Closed-book weighted 1.5x: (1*1.5 + 0*1) / 2.5 = 0.6
assert.equal(weightedAccuracy([{ score: 1, phase: "closed_book" }, { score: 0, phase: "open_book" }]), 0.6);

const body = "Mr. Smith ran. He was fast! Was he tired?\n\nYes.";
const s = allSentences(body);
assert.deepEqual(s.map((x) => x.text), ["Mr. Smith ran.", "He was fast!", "Was he tired?", "Yes."]);
const ev = body.indexOf("He was fast!");
const q = { format: "evidence_pair" as const, correct: ["o1"], options: [], evidenceStart: ev, evidenceEnd: ev + 12 };
assert.equal(scoreAnswer(q, { selected: ["o1"], evidenceSentence: 1 }, body).score, 1);
assert.equal(scoreAnswer(q, { selected: ["o1"], evidenceSentence: 0 }, body).score, 0.5);
assert.equal(scoreAnswer(q, { selected: ["o2"], evidenceSentence: 1 }, body).score, 0);
assert.equal(scoreAnswer({ ...q, format: "order_events", correct: ["a", "b"] }, { selected: ["a", "b"] }, body).score, 1);
assert.equal(scoreAnswer({ ...q, format: "multi_select", correct: ["a", "b"] }, { selected: ["b", "a"] }, body).score, 1);
assert.ok(difficulty("The cat sat. The dog ran.", 1).score < difficulty("Photosynthesis transforms electromagnetic radiation into chemical potential energy through complicated biochemical mechanisms.", 9).score);
console.log("All logic checks passed.");
