import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

const id = () => uuid("id").primaryKey().defaultRandom();
const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const SKILLS = [
  "main_idea",
  "key_details",
  "inference",
  "vocab_context",
  "author_purpose",
  "text_structure",
  "point_of_view",
  "argument_evidence",
  "compare_texts",
] as const;
export type Skill = (typeof SKILLS)[number];

export const GENRES = ["fiction", "informational", "argument", "poetry", "paired"] as const;
export type Genre = (typeof GENRES)[number];

export const FORMATS = ["mcq", "multi_select", "evidence_pair", "short_answer", "order_events"] as const;
export type QuestionFormat = (typeof FORMATS)[number];

export const TRAPS = ["true_but_irrelevant", "too_broad", "too_narrow", "opposite", "not_in_text"] as const;
export type Trap = (typeof TRAPS)[number];

export const skillEnum = pgEnum("skill", SKILLS);
export const genreEnum = pgEnum("genre", GENRES);
export const formatEnum = pgEnum("question_format", FORMATS);
export const sourceTypeEnum = pgEnum("source_type", ["public_domain", "ai_original", "current_affairs"]);
export const contentStatusEnum = pgEnum("content_status", ["draft", "review", "published", "retired"]);
export const phaseEnum = pgEnum("question_phase", ["closed_book", "open_book"]);
export const readModeEnum = pgEnum("read_mode", ["silent", "aloud", "repeated"]);
export const uiModeEnum = pgEnum("ui_mode", ["normal", "phrase_cued", "preview_first", "pacer"]);
export const experimentPhaseEnum = pgEnum("experiment_phase", ["A_baseline", "B_technique", "A2_washout"]);

export type QuestionOption = { id: string; text: string; trap?: Trap };
export type GlossaryEntry = { word: string; definition: string };

export const parent = pgTable("parent", {
  id: id(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  timezone: text("timezone").notNull().default("America/Los_Angeles"),
  settings: jsonb("settings").$type<ParentSettings>().notNull().default(sql`'{}'::jsonb`),
  ...timestamps,
});

export type ParentSettings = {
  blockedTopics?: string[];
  /** Defaults to true: new current-affairs passages wait for parent approval. */
  reviewBeforePublish?: boolean;
  /** News categories to fetch; all when unset. */
  newsCategories?: string[];
  targets?: Record<string, number>;
};

export const reader = pgTable("reader", {
  id: id(),
  parentId: uuid("parent_id")
    .notNull()
    .references(() => parent.id, { onDelete: "cascade" }),
  nickname: text("nickname").notNull(),
  grade: integer("grade").notNull(),
  birthYear: integer("birth_year"),
  pinHash: text("pin_hash").notNull(),
  interests: text("interests").array().notNull().default(sql`'{}'::text[]`),
  currentBand: real("current_band").notNull().default(5),
  dailyGoalMinutes: integer("daily_goal_minutes").notNull().default(15),
  xp: integer("xp").notNull().default(0),
  ...timestamps,
});

export const passage = pgTable("passage", {
  id: id(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  wordCount: integer("word_count").notNull(),
  genre: genreEnum("genre").notNull(),
  topicTags: text("topic_tags").array().notNull().default(sql`'{}'::text[]`),
  sourceType: sourceTypeEnum("source_type").notNull(),
  sourceUrls: text("source_urls").array().notNull().default(sql`'{}'::text[]`),
  license: text("license").notNull(),
  purposeQuestion: text("purpose_question").notNull(),
  keyIdeas: text("key_ideas").array().notNull().default(sql`'{}'::text[]`),
  glossary: jsonb("glossary").$type<GlossaryEntry[]>().notNull().default(sql`'[]'::jsonb`),
  difficultyScore: real("difficulty_score").notNull(),
  fkGrade: real("fk_grade").notNull(),
  daleChall: real("dale_chall").notNull(),
  lexileEstimate: integer("lexile_estimate"),
  llmDifficulty: real("llm_difficulty").notNull(),
  knowledgeDemand: integer("knowledge_demand").notNull().default(2),
  status: contentStatusEnum("status").notNull().default("review"),
  promptVersion: text("prompt_version"),
  /** Groups the reading-level versions of one current-affairs story, so a reader gets only one. */
  storyKey: text("story_key"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  ...timestamps,
});

export const passagePair = pgTable("passage_pair", {
  id: id(),
  passageAId: uuid("passage_a_id")
    .notNull()
    .references(() => passage.id, { onDelete: "cascade" }),
  passageBId: uuid("passage_b_id")
    .notNull()
    .references(() => passage.id, { onDelete: "cascade" }),
  theme: text("theme").notNull(),
  ...timestamps,
});

export const question = pgTable(
  "question",
  {
    id: id(),
    passageId: uuid("passage_id")
      .notNull()
      .references(() => passage.id, { onDelete: "cascade" }),
    ordinal: integer("ordinal").notNull(),
    skill: skillEnum("skill").notNull(),
    format: formatEnum("format").notNull(),
    stem: text("stem").notNull(),
    options: jsonb("options").$type<QuestionOption[]>().notNull(),
    correct: text("correct").array().notNull(),
    explanation: text("explanation").notNull(),
    evidenceText: text("evidence_text").notNull(),
    evidenceStart: integer("evidence_start").notNull(),
    evidenceEnd: integer("evidence_end").notNull(),
    difficulty: integer("difficulty").notNull().default(3),
    irtB: real("irt_b"),
    phase: phaseEnum("phase").notNull(),
    /** Recall questions back the 7-day "Remember this?" quiz and are never asked during a session. */
    isRecall: boolean("is_recall").notNull().default(false),
    status: contentStatusEnum("status").notNull().default("review"),
    ...timestamps,
  },
  (t) => [uniqueIndex("question_passage_ordinal").on(t.passageId, t.ordinal)],
);

export const fact = pgTable("fact", {
  id: id(),
  passageId: uuid("passage_id")
    .notNull()
    .references(() => passage.id, { onDelete: "cascade" }),
  statement: text("statement").notNull(),
  recallQuestionId: uuid("recall_question_id").references(() => question.id, { onDelete: "set null" }),
  ...timestamps,
});

export const technique = pgTable("technique", {
  id: id(),
  name: text("name").notNull().unique(),
  instructions: text("instructions").notNull(),
  uiMode: uiModeEnum("ui_mode").notNull().default("normal"),
  ...timestamps,
});

// "session" in the spec. Named reading_session so it is never confused with a login session.
export const readingSession = pgTable("reading_session", {
  id: id(),
  readerId: uuid("reader_id")
    .notNull()
    .references(() => reader.id, { onDelete: "cascade" }),
  passageId: uuid("passage_id")
    .notNull()
    .references(() => passage.id, { onDelete: "cascade" }),
  techniqueId: uuid("technique_id").references(() => technique.id, { onDelete: "set null" }),
  startedAt: timestamp("started_at", { withTimezone: true }),
  endedAt: timestamp("ended_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  activeReadMs: integer("active_read_ms"),
  pauseCount: integer("pause_count").notNull().default(0),
  blurMs: integer("blur_ms").notNull().default(0),
  wordsPerMinute: real("words_per_minute"),
  accuracy: real("accuracy"),
  effectiveRate: real("effective_rate"),
  isValid: boolean("is_valid"),
  invalidReason: text("invalid_reason"),
  mode: readModeEnum("mode").notNull().default("silent"),
  attemptNumber: integer("attempt_number").notNull().default(1),
  questionIds: uuid("question_ids").array().notNull().default(sql`'{}'::uuid[]`),
  xpEarned: integer("xp_earned").notNull().default(0),
  /** Reader band when the session started and after the post-session adjustment. */
  bandBefore: real("band_before"),
  bandAfter: real("band_after"),
  isPlacement: boolean("is_placement").notNull().default(false),
  ...timestamps,
});

export const answer = pgTable(
  "answer",
  {
    id: id(),
    sessionId: uuid("session_id")
      .notNull()
      .references(() => readingSession.id, { onDelete: "cascade" }),
    questionId: uuid("question_id")
      .notNull()
      .references(() => question.id, { onDelete: "cascade" }),
    response: jsonb("response").$type<AnswerResponse>().notNull(),
    isCorrect: boolean("is_correct").notNull(),
    score: real("score").notNull(),
    timeMs: integer("time_ms").notNull().default(0),
    hintUsed: boolean("hint_used").notNull().default(false),
    ...timestamps,
  },
  (t) => [uniqueIndex("answer_session_question").on(t.sessionId, t.questionId)],
);

export type AnswerResponse = { selected: string[]; evidenceSentence?: number };

export const summary = pgTable("summary", {
  id: id(),
  sessionId: uuid("session_id")
    .notNull()
    .unique()
    .references(() => readingSession.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  aiScore: integer("ai_score"),
  aiFeedback: text("ai_feedback"),
  keyIdeasHit: text("key_ideas_hit").array().notNull().default(sql`'{}'::text[]`),
  gradedBy: text("graded_by"),
  ...timestamps,
});

export const vocabItem = pgTable(
  "vocab_item",
  {
    id: id(),
    readerId: uuid("reader_id")
      .notNull()
      .references(() => reader.id, { onDelete: "cascade" }),
    word: text("word").notNull(),
    passageId: uuid("passage_id").references(() => passage.id, { onDelete: "set null" }),
    contextSentence: text("context_sentence").notNull().default(""),
    definition: text("definition").notNull().default(""),
    srBox: integer("sr_box").notNull().default(1),
    nextDueAt: timestamp("next_due_at", { withTimezone: true }).notNull().defaultNow(),
    ...timestamps,
  },
  (t) => [uniqueIndex("vocab_reader_word").on(t.readerId, t.word)],
);

// Cached dictionary lookups, shared by all readers. Holds only words, never reader data.
export const definitionCache = pgTable("definition_cache", {
  word: text("word").primaryKey(),
  definition: text("definition").notNull(),
  ...timestamps,
});

export const skillMastery = pgTable(
  "skill_mastery",
  {
    readerId: uuid("reader_id")
      .notNull()
      .references(() => reader.id, { onDelete: "cascade" }),
    skill: skillEnum("skill").notNull(),
    mastery: real("mastery").notNull().default(0.5),
    attempts: integer("attempts").notNull().default(0),
    lastUpdated: timestamp("last_updated", { withTimezone: true }).notNull().defaultNow(),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.readerId, t.skill] })],
);

export const rateModel = pgTable("rate_model", {
  id: id(),
  readerId: uuid("reader_id")
    .notNull()
    .unique()
    .references(() => reader.id, { onDelete: "cascade" }),
  intercept: real("intercept").notNull(),
  slopeDifficulty: real("slope_difficulty").notNull(),
  residualSd: real("residual_sd").notNull(),
  fittedAt: timestamp("fitted_at", { withTimezone: true }).notNull(),
  nSessions: integer("n_sessions").notNull(),
  ...timestamps,
});

export const experiment = pgTable("experiment", {
  id: id(),
  readerId: uuid("reader_id")
    .notNull()
    .references(() => reader.id, { onDelete: "cascade" }),
  techniqueId: uuid("technique_id")
    .notNull()
    .references(() => technique.id, { onDelete: "cascade" }),
  phase: experimentPhaseEnum("phase").notNull(),
  startDate: timestamp("start_date", { withTimezone: true }).notNull(),
  endDate: timestamp("end_date", { withTimezone: true }),
  result: jsonb("result"),
  ...timestamps,
});

export const lesson = pgTable("lesson", {
  id: id(),
  skill: skillEnum("skill").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  workedExample: text("worked_example").notNull(),
  practiceQuestionIds: uuid("practice_question_ids").array().notNull().default(sql`'{}'::uuid[]`),
  ...timestamps,
});

export const contentJobLog = pgTable("content_job_log", {
  id: id(),
  runDate: timestamp("run_date", { withTimezone: true }).notNull(),
  fetched: integer("fetched").notNull().default(0),
  rejectedSafety: integer("rejected_safety").notNull().default(0),
  generated: integer("generated").notNull().default(0),
  published: integer("published").notNull().default(0),
  errors: jsonb("errors").notNull().default(sql`'[]'::jsonb`),
  /** Every rejected headline with its reason, for the parent to audit. */
  rejections: jsonb("rejections").$type<{ title: string; url: string; reason: string }[]>().notNull().default(sql`'[]'::jsonb`),
  llmCalls: integer("llm_calls").notNull().default(0),
  queued: integer("queued").notNull().default(0),
  ...timestamps,
});

/** A finished 7-day "Remember this?" quiz for one news passage. */
export const recallAttempt = pgTable(
  "recall_attempt",
  {
    id: id(),
    readerId: uuid("reader_id")
      .notNull()
      .references(() => reader.id, { onDelete: "cascade" }),
    passageId: uuid("passage_id")
      .notNull()
      .references(() => passage.id, { onDelete: "cascade" }),
    /** Days between finishing the passage and taking the quiz. */
    delayDays: integer("delay_days").notNull(),
    correct: integer("correct").notNull(),
    total: integer("total").notNull(),
    answers: jsonb("answers").$type<{ questionId: string; selected: string; isCorrect: boolean }[]>().notNull(),
    ...timestamps,
  },
  (t) => [uniqueIndex("recall_reader_passage").on(t.readerId, t.passageId)],
);
