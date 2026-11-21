CREATE TYPE "public"."content_status" AS ENUM('draft', 'review', 'published', 'retired');--> statement-breakpoint
CREATE TYPE "public"."experiment_phase" AS ENUM('A_baseline', 'B_technique', 'A2_washout');--> statement-breakpoint
CREATE TYPE "public"."question_format" AS ENUM('mcq', 'multi_select', 'evidence_pair', 'short_answer', 'order_events');--> statement-breakpoint
CREATE TYPE "public"."genre" AS ENUM('fiction', 'informational', 'argument', 'poetry', 'paired');--> statement-breakpoint
CREATE TYPE "public"."question_phase" AS ENUM('closed_book', 'open_book');--> statement-breakpoint
CREATE TYPE "public"."read_mode" AS ENUM('silent', 'aloud', 'repeated');--> statement-breakpoint
CREATE TYPE "public"."skill" AS ENUM('main_idea', 'key_details', 'inference', 'vocab_context', 'author_purpose', 'text_structure', 'point_of_view', 'argument_evidence', 'compare_texts');--> statement-breakpoint
CREATE TYPE "public"."source_type" AS ENUM('public_domain', 'ai_original', 'current_affairs');--> statement-breakpoint
CREATE TYPE "public"."ui_mode" AS ENUM('normal', 'phrase_cued', 'preview_first', 'pacer');--> statement-breakpoint
CREATE TABLE "answer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"question_id" uuid NOT NULL,
	"response" jsonb NOT NULL,
	"is_correct" boolean NOT NULL,
	"score" real NOT NULL,
	"time_ms" integer DEFAULT 0 NOT NULL,
	"hint_used" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_job_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"run_date" timestamp with time zone NOT NULL,
	"fetched" integer DEFAULT 0 NOT NULL,
	"rejected_safety" integer DEFAULT 0 NOT NULL,
	"generated" integer DEFAULT 0 NOT NULL,
	"published" integer DEFAULT 0 NOT NULL,
	"errors" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "definition_cache" (
	"word" text PRIMARY KEY NOT NULL,
	"definition" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experiment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reader_id" uuid NOT NULL,
	"technique_id" uuid NOT NULL,
	"phase" "experiment_phase" NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone,
	"result" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fact" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"passage_id" uuid NOT NULL,
	"statement" text NOT NULL,
	"recall_question_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lesson" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"skill" "skill" NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"worked_example" text NOT NULL,
	"practice_question_ids" uuid[] DEFAULT '{}'::uuid[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "parent" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"password_hash" text NOT NULL,
	"timezone" text DEFAULT 'America/Los_Angeles' NOT NULL,
	"settings" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "parent_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "passage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"word_count" integer NOT NULL,
	"genre" "genre" NOT NULL,
	"topic_tags" text[] DEFAULT '{}'::text[] NOT NULL,
	"source_type" "source_type" NOT NULL,
	"source_urls" text[] DEFAULT '{}'::text[] NOT NULL,
	"license" text NOT NULL,
	"purpose_question" text NOT NULL,
	"key_ideas" text[] DEFAULT '{}'::text[] NOT NULL,
	"glossary" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"difficulty_score" real NOT NULL,
	"fk_grade" real NOT NULL,
	"dale_chall" real NOT NULL,
	"lexile_estimate" integer,
	"llm_difficulty" real NOT NULL,
	"knowledge_demand" integer DEFAULT 2 NOT NULL,
	"status" "content_status" DEFAULT 'review' NOT NULL,
	"prompt_version" text,
	"published_at" timestamp with time zone,
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "passage_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "passage_pair" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"passage_a_id" uuid NOT NULL,
	"passage_b_id" uuid NOT NULL,
	"theme" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "question" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"passage_id" uuid NOT NULL,
	"ordinal" integer NOT NULL,
	"skill" "skill" NOT NULL,
	"format" "question_format" NOT NULL,
	"stem" text NOT NULL,
	"options" jsonb NOT NULL,
	"correct" text[] NOT NULL,
	"explanation" text NOT NULL,
	"evidence_text" text NOT NULL,
	"evidence_start" integer NOT NULL,
	"evidence_end" integer NOT NULL,
	"difficulty" integer DEFAULT 3 NOT NULL,
	"irt_b" real,
	"phase" "question_phase" NOT NULL,
	"status" "content_status" DEFAULT 'review' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rate_model" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reader_id" uuid NOT NULL,
	"intercept" real NOT NULL,
	"slope_difficulty" real NOT NULL,
	"residual_sd" real NOT NULL,
	"fitted_at" timestamp with time zone NOT NULL,
	"n_sessions" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "rate_model_reader_id_unique" UNIQUE("reader_id")
);
--> statement-breakpoint
CREATE TABLE "reader" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parent_id" uuid NOT NULL,
	"nickname" text NOT NULL,
	"grade" integer NOT NULL,
	"birth_year" integer,
	"pin_hash" text NOT NULL,
	"interests" text[] DEFAULT '{}'::text[] NOT NULL,
	"current_band" real DEFAULT 5 NOT NULL,
	"daily_goal_minutes" integer DEFAULT 15 NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reading_session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reader_id" uuid NOT NULL,
	"passage_id" uuid NOT NULL,
	"technique_id" uuid,
	"started_at" timestamp with time zone,
	"ended_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"active_read_ms" integer,
	"pause_count" integer DEFAULT 0 NOT NULL,
	"blur_ms" integer DEFAULT 0 NOT NULL,
	"words_per_minute" real,
	"accuracy" real,
	"effective_rate" real,
	"is_valid" boolean,
	"invalid_reason" text,
	"mode" "read_mode" DEFAULT 'silent' NOT NULL,
	"attempt_number" integer DEFAULT 1 NOT NULL,
	"question_ids" uuid[] DEFAULT '{}'::uuid[] NOT NULL,
	"xp_earned" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skill_mastery" (
	"reader_id" uuid NOT NULL,
	"skill" "skill" NOT NULL,
	"mastery" real DEFAULT 0.5 NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"last_updated" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "skill_mastery_reader_id_skill_pk" PRIMARY KEY("reader_id","skill")
);
--> statement-breakpoint
CREATE TABLE "summary" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"text" text NOT NULL,
	"ai_score" integer,
	"ai_feedback" text,
	"key_ideas_hit" text[] DEFAULT '{}'::text[] NOT NULL,
	"graded_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "summary_session_id_unique" UNIQUE("session_id")
);
--> statement-breakpoint
CREATE TABLE "technique" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"instructions" text NOT NULL,
	"ui_mode" "ui_mode" DEFAULT 'normal' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "technique_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "vocab_item" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reader_id" uuid NOT NULL,
	"word" text NOT NULL,
	"passage_id" uuid,
	"context_sentence" text DEFAULT '' NOT NULL,
	"definition" text DEFAULT '' NOT NULL,
	"sr_box" integer DEFAULT 1 NOT NULL,
	"next_due_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "answer" ADD CONSTRAINT "answer_session_id_reading_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."reading_session"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answer" ADD CONSTRAINT "answer_question_id_question_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiment" ADD CONSTRAINT "experiment_reader_id_reader_id_fk" FOREIGN KEY ("reader_id") REFERENCES "public"."reader"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiment" ADD CONSTRAINT "experiment_technique_id_technique_id_fk" FOREIGN KEY ("technique_id") REFERENCES "public"."technique"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fact" ADD CONSTRAINT "fact_passage_id_passage_id_fk" FOREIGN KEY ("passage_id") REFERENCES "public"."passage"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fact" ADD CONSTRAINT "fact_recall_question_id_question_id_fk" FOREIGN KEY ("recall_question_id") REFERENCES "public"."question"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "passage_pair" ADD CONSTRAINT "passage_pair_passage_a_id_passage_id_fk" FOREIGN KEY ("passage_a_id") REFERENCES "public"."passage"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "passage_pair" ADD CONSTRAINT "passage_pair_passage_b_id_passage_id_fk" FOREIGN KEY ("passage_b_id") REFERENCES "public"."passage"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question" ADD CONSTRAINT "question_passage_id_passage_id_fk" FOREIGN KEY ("passage_id") REFERENCES "public"."passage"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rate_model" ADD CONSTRAINT "rate_model_reader_id_reader_id_fk" FOREIGN KEY ("reader_id") REFERENCES "public"."reader"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reader" ADD CONSTRAINT "reader_parent_id_parent_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."parent"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_session" ADD CONSTRAINT "reading_session_reader_id_reader_id_fk" FOREIGN KEY ("reader_id") REFERENCES "public"."reader"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_session" ADD CONSTRAINT "reading_session_passage_id_passage_id_fk" FOREIGN KEY ("passage_id") REFERENCES "public"."passage"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_session" ADD CONSTRAINT "reading_session_technique_id_technique_id_fk" FOREIGN KEY ("technique_id") REFERENCES "public"."technique"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skill_mastery" ADD CONSTRAINT "skill_mastery_reader_id_reader_id_fk" FOREIGN KEY ("reader_id") REFERENCES "public"."reader"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "summary" ADD CONSTRAINT "summary_session_id_reading_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."reading_session"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vocab_item" ADD CONSTRAINT "vocab_item_reader_id_reader_id_fk" FOREIGN KEY ("reader_id") REFERENCES "public"."reader"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vocab_item" ADD CONSTRAINT "vocab_item_passage_id_passage_id_fk" FOREIGN KEY ("passage_id") REFERENCES "public"."passage"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "answer_session_question" ON "answer" USING btree ("session_id","question_id");--> statement-breakpoint
CREATE UNIQUE INDEX "question_passage_ordinal" ON "question" USING btree ("passage_id","ordinal");--> statement-breakpoint
CREATE UNIQUE INDEX "vocab_reader_word" ON "vocab_item" USING btree ("reader_id","word");