CREATE TABLE "recall_attempt" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reader_id" uuid NOT NULL,
	"passage_id" uuid NOT NULL,
	"delay_days" integer NOT NULL,
	"correct" integer NOT NULL,
	"total" integer NOT NULL,
	"answers" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "recall_attempt" ADD CONSTRAINT "recall_attempt_reader_id_reader_id_fk" FOREIGN KEY ("reader_id") REFERENCES "public"."reader"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recall_attempt" ADD CONSTRAINT "recall_attempt_passage_id_passage_id_fk" FOREIGN KEY ("passage_id") REFERENCES "public"."passage"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "recall_reader_passage" ON "recall_attempt" USING btree ("reader_id","passage_id");