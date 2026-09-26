import { topics } from "../src/content/topics";
import { answersMatch } from "../src/lib/answers";
import { explainNotes } from "../src/lib/explain-notes";
import { freshState, markConcept, recordAttempt } from "../src/lib/progress";

const slugs = new Set<string>();
const ids = new Set<string>();

if (topics.length !== 6) {
  throw new Error(`Expected 6 topics, found ${topics.length}`);
}

for (const topic of topics) {
  if (slugs.has(topic.slug)) throw new Error(`Duplicate slug ${topic.slug}`);
  slugs.add(topic.slug);
  if (topic.questions.length < 5 || topic.questions.length > 8) {
    throw new Error(`${topic.slug} has ${topic.questions.length} questions`);
  }
  if (topic.tricks.length < 3) throw new Error(`${topic.slug} needs tricks`);
  if (topic.concept.ideas.length < 2) throw new Error(`${topic.slug} needs concept ideas`);
  for (const question of topic.questions) {
    if (ids.has(question.id)) throw new Error(`Duplicate question id ${question.id}`);
    ids.add(question.id);
    if (question.hints.length !== 3) throw new Error(`${question.id} needs 3 hints`);
    if (question.steps.length < 3) throw new Error(`${question.id} needs 3 steps`);
    if (!question.answer.trim() || !question.prompt.trim() || !question.takeaway.trim()) {
      throw new Error(`${question.id} is missing copy`);
    }
    if (question.choices && !question.choices.includes(question.answer)) {
      throw new Error(`${question.id} answer is not one of the choices`);
    }
    if (!answersMatch(question.answer, question)) {
      throw new Error(`${question.id} does not match its own answer`);
    }
  }
}

const fraction = topics
  .flatMap((topic) => topic.questions)
  .find((question) => question.answer === "3/10");
if (!fraction) throw new Error("Missing fraction sample");
if (!answersMatch("0.3", fraction)) throw new Error("0.3 should match the listed decimal");
if (answersMatch("6/20", fraction)) throw new Error("Unsimplified fraction should not match an exact question");
if (!answersMatch("  400 ", topics[0].questions[0])) throw new Error("Spacing should still match 400");
if (!answersMatch("400", topics[0].questions[0])) throw new Error("400 should match");
if (answersMatch("", topics[0].questions[0])) throw new Error("Blank answers must fail");

const explained = explainNotes(`Ratios

A ratio compares two amounts.

Tricks
- Draw a tape diagram before you divide.

Practice
What is 20% of 50?
`);

if (explained.title !== "Ratios") throw new Error(`Title parsed as ${explained.title}`);
if (!explained.concept.some((line) => line.includes("compares"))) throw new Error("Concept missing");
if (!explained.tricks.some((trick) => /tape diagram/i.test(trick.body))) throw new Error("Trick missing");
if (!explained.practice.some((item) => item.prompt.includes("20%"))) throw new Error("Practice prompt missing");

let progress = markConcept(freshState(), "algebra");
if (progress.streakDays !== 1) throw new Error("First practice day should start a streak");
if (progress.topics.algebra?.xp !== 5) throw new Error("Concept check should award 5 XP once");
progress = markConcept(progress, "algebra");
if (progress.topics.algebra?.xp !== 5) throw new Error("Concept XP was awarded twice");
const firstTry = recordAttempt(progress, {
  topicSlug: "algebra",
  questionId: "algebra-1",
  correct: true,
  hintsUsed: 0,
  revealed: false,
});
if (firstTry.xp !== 10) throw new Error(`Expected 10 XP, got ${firstTry.xp}`);
const replay = recordAttempt(firstTry.state, {
  topicSlug: "algebra",
  questionId: "algebra-1",
  correct: true,
  hintsUsed: 0,
  revealed: false,
});
if (replay.xp !== 5) throw new Error(`Replay should be worth 5 XP, got ${replay.xp}`);

console.log(`Validated ${topics.length} topics and ${ids.size} questions.`);
