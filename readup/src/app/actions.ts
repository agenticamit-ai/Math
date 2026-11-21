"use server";

import bcrypt from "bcryptjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getDb, schema } from "@/db";
import { clearSession, getSession, requireParent, setSession } from "@/lib/auth";
import { INTEREST_OPTIONS, NEWS_CATEGORY_OPTIONS } from "@/lib/constants";

export type FormState = { error?: string; ok?: string } | undefined;

const allowedEmails = () =>
  (process.env.ALLOWED_PARENT_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

const SignupSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email."),
  password: z.string().min(8, "Use at least 8 characters for your password.").max(200),
  timezone: z.string().max(64).default("America/Los_Angeles"),
});

export async function signup(_: FormState, form: FormData): Promise<FormState> {
  const parsed = SignupSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { name, email, password, timezone } = parsed.data;
  const allow = allowedEmails();
  if (allow.length && !allow.includes(email)) return { error: "Sign-ups are closed for this ReadUp site." };
  const db = getDb();
  const existing = await db.select({ id: schema.parent.id }).from(schema.parent).where(eq(schema.parent.email, email));
  if (existing.length) return { error: "An account with that email already exists. Try signing in." };
  let tz = "America/Los_Angeles";
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: timezone });
    tz = timezone;
  } catch {}
  const [p] = await db
    .insert(schema.parent)
    .values({ name, email, timezone: tz, passwordHash: await bcrypt.hash(password, 10) })
    .returning({ id: schema.parent.id });
  await setSession({ pid: p.id, mode: "parent" });
  redirect("/parent/readers/new");
}

export async function login(_: FormState, form: FormData): Promise<FormState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const [p] = await getDb().select().from(schema.parent).where(eq(schema.parent.email, email));
  if (!p || !(await bcrypt.compare(password, p.passwordHash))) return { error: "That email and password don't match." };
  await setSession({ pid: p.id, mode: "parent" });
  redirect("/parent");
}

export async function logout() {
  await clearSession();
  redirect("/");
}

/** From reader mode back to the parent dashboard: requires the parent password. */
export async function unlockParent(_: FormState, form: FormData): Promise<FormState> {
  const s = await getSession();
  if (!s) redirect("/login");
  const [p] = await getDb().select().from(schema.parent).where(eq(schema.parent.id, s.pid));
  if (!p || !(await bcrypt.compare(String(form.get("password") ?? ""), p.passwordHash))) return { error: "Wrong password." };
  await setSession({ pid: p.id, mode: "parent" });
  redirect("/parent");
}

const ReaderSchema = z.object({
  nickname: z.string().trim().min(1, "Enter a first name or nickname.").max(30),
  grade: z.coerce.number().int().min(3).max(12),
  birthYear: z.union([z.literal(""), z.coerce.number().int().min(2005).max(2025)]).optional(),
  pin: z.string().regex(/^\d{4}$/, "The PIN must be exactly 4 digits."),
  dailyGoalMinutes: z.coerce.number().int().min(5).max(90).default(15),
});

export async function createReader(_: FormState, form: FormData): Promise<FormState> {
  const s = await requireParent();
  const parsed = ReaderSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const interests = form.getAll("interests").map(String).filter((i) => INTEREST_OPTIONS.includes(i));
  const { nickname, grade, birthYear, pin, dailyGoalMinutes } = parsed.data;
  await getDb()
    .insert(schema.reader)
    .values({
      parentId: s.pid,
      nickname,
      grade,
      birthYear: typeof birthYear === "number" ? birthYear : null,
      pinHash: await bcrypt.hash(pin, 10),
      interests,
      dailyGoalMinutes,
    });
  revalidatePath("/parent");
  redirect("/parent");
}

const UpdateReaderSchema = z.object({
  readerId: z.string().uuid(),
  nickname: z.string().trim().min(1).max(30),
  grade: z.coerce.number().int().min(3).max(12),
  dailyGoalMinutes: z.coerce.number().int().min(5).max(90),
  pin: z.union([z.literal(""), z.string().regex(/^\d{4}$/, "The PIN must be exactly 4 digits.")]),
});

export async function updateReader(_: FormState, form: FormData): Promise<FormState> {
  const s = await requireParent();
  const parsed = UpdateReaderSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { readerId, nickname, grade, dailyGoalMinutes, pin } = parsed.data;
  const interests = form.getAll("interests").map(String).filter((i) => INTEREST_OPTIONS.includes(i));
  const res = await getDb()
    .update(schema.reader)
    .set({ nickname, grade, dailyGoalMinutes, interests, ...(pin ? { pinHash: await bcrypt.hash(pin, 10) } : {}) })
    .where(and(eq(schema.reader.id, readerId), eq(schema.reader.parentId, s.pid)))
    .returning({ id: schema.reader.id });
  if (!res.length) return { error: "Reader not found." };
  revalidatePath(`/parent/readers/${readerId}`);
  return { ok: "Saved." };
}

export async function deleteReader(form: FormData) {
  const s = await requireParent();
  const readerId = String(form.get("readerId") ?? "");
  if (String(form.get("confirm") ?? "").trim().toLowerCase() !== "delete") redirect(`/parent/readers/${readerId}?deleteError=1`);
  await getDb()
    .delete(schema.reader)
    .where(and(eq(schema.reader.id, readerId), eq(schema.reader.parentId, s.pid)));
  revalidatePath("/parent");
  redirect("/parent");
}

export async function deleteAccount(form: FormData) {
  const s = await requireParent();
  if (String(form.get("confirm") ?? "").trim().toLowerCase() !== "delete my account") redirect("/parent/settings?deleteError=1");
  await getDb().delete(schema.parent).where(eq(schema.parent.id, s.pid));
  await clearSession();
  redirect("/");
}

export async function updateParentSettings(_: FormState, form: FormData): Promise<FormState> {
  const s = await requireParent();
  const blockedTopics = String(form.get("blockedTopics") ?? "")
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 50);
  const newsCategories = form.getAll("newsCategories").map(String).filter((c) => (NEWS_CATEGORY_OPTIONS as readonly string[]).includes(c));
  const reviewBeforePublish = form.get("reviewBeforePublish") === "on";
  const db = getDb();
  const [p] = await db.select({ settings: schema.parent.settings }).from(schema.parent).where(eq(schema.parent.id, s.pid));
  await db
    .update(schema.parent)
    .set({ settings: { ...p.settings, blockedTopics, newsCategories, reviewBeforePublish } })
    .where(eq(schema.parent.id, s.pid));
  revalidatePath("/parent/settings");
  return { ok: "Saved." };
}

/** Enter reader mode for one profile after checking the PIN. */
export async function enterReader(_: FormState, form: FormData): Promise<FormState> {
  const s = await getSession();
  if (!s) redirect("/login");
  const readerId = String(form.get("readerId") ?? "");
  const pin = String(form.get("pin") ?? "");
  const [r] = await getDb()
    .select()
    .from(schema.reader)
    .where(and(eq(schema.reader.id, readerId), eq(schema.reader.parentId, s.pid)));
  if (!r || !(await bcrypt.compare(pin, r.pinHash))) return { error: "That PIN isn't right. Try again." };
  await setSession({ pid: s.pid, mode: "reader", rid: r.id });
  redirect("/home");
}

/** Content queue: approve or reject a current-affairs passage waiting for review. */
export async function reviewPassage(form: FormData) {
  await requireParent();
  const id = String(form.get("passageId") ?? "");
  const decision = String(form.get("decision") ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(id) || !["approve", "reject"].includes(decision)) return;
  const now = new Date();
  await getDb()
    .update(schema.passage)
    .set(decision === "approve" ? { status: "published", publishedAt: now, expiresAt: new Date(now.getTime() + 30 * 86400000) } : { status: "retired" })
    .where(and(eq(schema.passage.id, id), eq(schema.passage.status, "review")));
  revalidatePath("/parent/news");
}
