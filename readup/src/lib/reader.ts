import "server-only";
import { and, desc, eq, inArray, isNotNull, sql } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { SKILLS, type Skill } from "@/db/schema";
import { mean } from "./metrics";

const db = () => getDb();

export const PLACEMENT_BANDS = [4, 5, 6];

/** YYYY-MM-DD in the parent's time zone. */
export function dayKey(d: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
}

function addDays(key: string, n: number): string {
  const d = new Date(`${key}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function isoWeek(key: string): string {
  const d = new Date(`${key}T12:00:00Z`);
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day + 3);
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((d.getTime() - firstThursday.getTime()) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  return `${d.getUTCFullYear()}-W${week}`;
}

/**
 * Consecutive days with a finished session, counting back from today (or yesterday, if today has none yet).
 * One missed day per calendar week is covered by a free "freeze".
 */
export function computeStreak(activeDays: Set<string>, today: string): { streak: number; freezeUsedThisWeek: boolean } {
  let cursor = activeDays.has(today) ? today : addDays(today, -1);
  let streak = 0;
  const freezes = new Set<string>();
  for (let i = 0; i < 400; i++) {
    if (activeDays.has(cursor)) {
      streak++;
    } else {
      const week = isoWeek(cursor);
      // A freeze only bridges a gap; the day before it must have a session.
      if (!freezes.has(week) && activeDays.has(addDays(cursor, -1)) && streak > 0) {
        freezes.add(week);
      } else break;
    }
    cursor = addDays(cursor, -1);
  }
  return { streak, freezeUsedThisWeek: freezes.has(isoWeek(today)) };
}

export async function readerWithParent(readerId: string) {
  const rows = await db()
    .select({ reader: schema.reader, timezone: schema.parent.timezone })
    .from(schema.reader)
    .innerJoin(schema.parent, eq(schema.parent.id, schema.reader.parentId))
    .where(eq(schema.reader.id, readerId));
  return rows[0] ?? null;
}

export async function completedSessions(readerId: string) {
  return db()
    .select({
      id: schema.readingSession.id,
      passageId: schema.readingSession.passageId,
      completedAt: schema.readingSession.completedAt,
      startedAt: schema.readingSession.startedAt,
      wpm: schema.readingSession.wordsPerMinute,
      accuracy: schema.readingSession.accuracy,
      err: schema.readingSession.effectiveRate,
      isValid: schema.readingSession.isValid,
      invalidReason: schema.readingSession.invalidReason,
      attemptNumber: schema.readingSession.attemptNumber,
      isPlacement: schema.readingSession.isPlacement,
      bandBefore: schema.readingSession.bandBefore,
      bandAfter: schema.readingSession.bandAfter,
      activeReadMs: schema.readingSession.activeReadMs,
      xp: schema.readingSession.xpEarned,
      title: schema.passage.title,
      genre: schema.passage.genre,
      difficulty: schema.passage.difficultyScore,
      wordCount: schema.passage.wordCount,
    })
    .from(schema.readingSession)
    .innerJoin(schema.passage, eq(schema.passage.id, schema.readingSession.passageId))
    .where(and(eq(schema.readingSession.readerId, readerId), isNotNull(schema.readingSession.completedAt)))
    .orderBy(desc(schema.readingSession.completedAt));
}

export type CompletedSession = Awaited<ReturnType<typeof completedSessions>>[number];

/** Valid first reads only: the data used for speed trends. */
export const isColdValid = (s: CompletedSession) => s.isValid === true && s.attemptNumber === 1;

export async function readerOverview(readerId: string) {
  const info = await readerWithParent(readerId);
  if (!info) return null;
  const sessions = await completedSessions(readerId);
  const today = dayKey(new Date(), info.timezone);
  const days = new Set(sessions.map((s) => dayKey(s.completedAt!, info.timezone)));
  const { streak } = computeStreak(days, today);
  const minutesToday = sessions
    .filter((s) => dayKey(s.completedAt!, info.timezone) === today)
    .reduce((n, s) => n + (s.completedAt!.getTime() - (s.startedAt ?? s.completedAt!).getTime()) / 60000, 0);
  return { reader: info.reader, timezone: info.timezone, sessions, streak, minutesToday };
}

/** EMA mastery update. Hard items count more when right; easy items count more when wrong. */
export async function updateMastery(readerId: string, skill: Skill, score: number, difficulty: number) {
  const d = Math.min(5, Math.max(1, difficulty));
  const alpha = 0.15 * (score >= 0.5 ? 0.6 + 0.2 * (d - 1) : 0.6 + 0.2 * (5 - d));
  await db()
    .insert(schema.skillMastery)
    .values({ readerId, skill, mastery: 0.5 * (1 - alpha) + alpha * score, attempts: 1 })
    .onConflictDoUpdate({
      target: [schema.skillMastery.readerId, schema.skillMastery.skill],
      set: {
        mastery: sql`${1 - alpha} * ${schema.skillMastery.mastery} + ${alpha * score}`,
        attempts: sql`${schema.skillMastery.attempts} + 1`,
        lastUpdated: new Date(),
        updatedAt: new Date(),
      },
    });
}

export async function masteryMap(readerId: string): Promise<Record<Skill, { mastery: number; attempts: number }>> {
  const rows = await db().select().from(schema.skillMastery).where(eq(schema.skillMastery.readerId, readerId));
  const out = {} as Record<Skill, { mastery: number; attempts: number }>;
  for (const s of SKILLS) out[s] = { mastery: 0.5, attempts: 0 };
  for (const r of rows) out[r.skill] = { mastery: r.mastery, attempts: r.attempts };
  return out;
}

const clampBand = (b: number) => Math.min(10, Math.max(1, Math.round(b * 2) / 2));

/**
 * Band after a finished session.
 * Placement (first 3 sessions at bands 4, 5, 6): start at the highest band read at >= 75%.
 * After that: rolling accuracy over the last 5 valid sessions >= 85% -> +0.5, < 65% -> -0.5,
 * never moving more than 1.0 within 7 days. (The SpeedIndex >= 0.95 condition joins once a baseline exists.)
 */
export function nextBand(current: number, history: CompletedSession[]): number {
  const placements = history.filter((s) => s.isPlacement);
  const nonPlacement = history.filter((s) => !s.isPlacement);
  if (nonPlacement.length === 0) {
    if (placements.length < PLACEMENT_BANDS.length) return current;
    const passed = placements.filter((p) => (p.accuracy ?? 0) >= 0.75);
    if (passed.length) return clampBand(Math.max(...passed.map((p) => p.difficulty)));
    return clampBand(Math.min(...placements.map((p) => p.difficulty)) - 0.5);
  }
  const lastFive = history.filter((s) => s.isValid && !s.isPlacement).slice(0, 5);
  if (lastFive.length < 5) return current;
  const acc = mean(lastFive.map((s) => s.accuracy ?? 0))!;
  let proposed = current;
  if (acc >= 0.85) proposed = current + 0.5;
  else if (acc < 0.65) proposed = current - 0.5;
  if (proposed === current) return current;
  const weekAgo = Date.now() - 7 * 86400000;
  const inWeek = history.filter((s) => s.completedAt!.getTime() >= weekAgo && s.bandBefore !== null);
  const weekStart = inWeek.length ? inWeek[inWeek.length - 1].bandBefore! : current;
  if (Math.abs(proposed - weekStart) > 1.0) return current;
  return clampBand(proposed);
}

type Card = {
  kind: "placement" | "level" | "stretch" | "skill";
  label: string;
  reason: string;
  passage: { id: string; title: string; genre: string; difficultyScore: number; wordCount: number; topicTags: string[] };
  skill?: Skill;
  repeat?: boolean;
};

export async function recommendations(readerId: string): Promise<Card[]> {
  const info = await readerWithParent(readerId);
  if (!info) return [];
  const { reader } = info;
  const history = await completedSessions(readerId);
  const read = new Set(history.map((s) => s.passageId));
  const parent = await db().select({ settings: schema.parent.settings }).from(schema.parent).where(eq(schema.parent.id, reader.parentId));
  const blocked = new Set((parent[0]?.settings.blockedTopics ?? []).map((t) => t.toLowerCase()));

  const all = (
    await db()
      .select({
        id: schema.passage.id,
        title: schema.passage.title,
        genre: schema.passage.genre,
        difficultyScore: schema.passage.difficultyScore,
        wordCount: schema.passage.wordCount,
        topicTags: schema.passage.topicTags,
      })
      .from(schema.passage)
      .where(eq(schema.passage.status, "published"))
  ).filter((p) => !p.topicTags.some((t) => blocked.has(t.toLowerCase())));

  const unread = all.filter((p) => !read.has(p.id));
  const pool = unread.length >= 3 ? unread : all;
  const interests = new Set(reader.interests.map((i) => i.toLowerCase()));
  const interestScore = (p: (typeof all)[number]) => p.topicTags.filter((t) => interests.has(t)).length;
  const used = new Set<string>();
  const pick = (cands: typeof all, score: (p: (typeof all)[number]) => number) => {
    const best = cands.filter((p) => !used.has(p.id)).sort((a, b) => score(a) - score(b))[0];
    if (best) used.add(best.id);
    return best;
  };
  const cards: Card[] = [];

  const placementsDone = history.filter((s) => s.isPlacement).length;
  if (placementsDone < PLACEMENT_BANDS.length && history.length === placementsDone) {
    const band = PLACEMENT_BANDS[placementsDone];
    const genres = new Set<string>();
    for (let i = 0; i < 3; i++) {
      const p = pick(pool, (x) => Math.abs(x.difficultyScore - band) * 4 - interestScore(x) + (genres.has(x.genre) ? 3 : 0));
      if (!p) break;
      genres.add(p.genre);
      cards.push({
        kind: "placement",
        label: `Placement read ${placementsDone + 1} of 3`,
        reason: "Your first three reads help ReadUp find your level. Pick whichever looks most interesting.",
        passage: p,
        repeat: read.has(p.id),
      });
    }
    return cards;
  }

  const band = reader.currentBand;
  const recentGenres = history.slice(0, 4).map((s) => s.genre);
  const needsGenreSwap = history.length % 5 === 4;
  const genrePenalty = (g: string) => (needsGenreSwap && recentGenres.includes(g as never) ? 6 : 0);

  const level = pick(pool, (p) => Math.max(0, Math.abs(p.difficultyScore - band) - 0.5) * 4 - interestScore(p) * 1.5 + genrePenalty(p.genre));
  if (level)
    cards.push({
      kind: "level",
      label: "Just right",
      reason: needsGenreSwap ? "At your level, in a different genre than your last few reads." : "At your level, on a topic you like.",
      passage: level,
      repeat: read.has(level.id),
    });

  const stretch = pick(pool, (p) => Math.abs(p.difficultyScore - (band + 1)) * 4 - interestScore(p) * 0.5);
  if (stretch)
    cards.push({ kind: "stretch", label: "Stretch", reason: "A little harder than usual. Take your time.", passage: stretch, repeat: read.has(stretch.id) });

  const mastery = await masteryMap(readerId);
  const weakest = SKILLS.filter((s) => s !== "compare_texts").sort((a, b) => mastery[a].mastery - mastery[b].mastery)[0];
  const skillCounts = await db()
    .select({ passageId: schema.question.passageId, n: sql<number>`count(*)::int` })
    .from(schema.question)
    .where(
      and(
        eq(schema.question.skill, weakest),
        eq(schema.question.status, "published"),
        inArray(
          schema.question.passageId,
          pool.map((p) => p.id),
        ),
      ),
    )
    .groupBy(schema.question.passageId);
  const countFor = new Map(skillCounts.map((r) => [r.passageId, r.n]));
  const skillPick = pick(pool, (p) => Math.abs(p.difficultyScore - band) * 2 - (countFor.get(p.id) ?? 0) * 3);
  if (skillPick)
    cards.push({
      kind: "skill",
      label: "Skill focus",
      reason: `Extra practice on one of your skills to grow.`,
      passage: skillPick,
      skill: weakest,
      repeat: read.has(skillPick.id),
    });

  return cards;
}
