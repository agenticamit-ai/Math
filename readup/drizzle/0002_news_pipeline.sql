ALTER TABLE "content_job_log" ADD COLUMN "rejections" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "content_job_log" ADD COLUMN "llm_calls" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "content_job_log" ADD COLUMN "queued" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "passage" ADD COLUMN "story_key" text;--> statement-breakpoint
ALTER TABLE "question" ADD COLUMN "is_recall" boolean DEFAULT false NOT NULL;