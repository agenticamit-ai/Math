ALTER TABLE "reading_session" ADD COLUMN "band_before" real;--> statement-breakpoint
ALTER TABLE "reading_session" ADD COLUMN "band_after" real;--> statement-breakpoint
ALTER TABLE "reading_session" ADD COLUMN "is_placement" boolean DEFAULT false NOT NULL;