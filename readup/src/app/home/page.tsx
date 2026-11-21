import { and, count, eq, isNull } from "drizzle-orm";
import Link from "next/link";
import { GoalRing } from "@/components/GoalRing";
import { READER_NAV, Shell } from "@/components/Shell";
import { StartButton } from "@/components/StartButton";
import { getDb, schema } from "@/db";
import { requireReader } from "@/lib/auth";
import { GENRE_LABELS } from "@/lib/constants";
import { bandLabel } from "@/lib/format";
import { readerOverview, recommendations } from "@/lib/reader";
import { SKILL_LABELS } from "@/lib/scoring";

export const metadata = { title: "Home" };
export const dynamic = "force-dynamic";

const KIND_STYLE: Record<string, string> = {
  placement: "bg-brand-soft text-brand-dark",
  level: "bg-brand-soft text-brand-dark",
  stretch: "bg-sun-soft text-ink",
  skill: "bg-[#EEE8F7] text-[#4B3B78]",
};

export default async function ReaderHome() {
  const s = await requireReader();
  const ov = (await readerOverview(s.rid))!;
  const cards = await recommendations(s.rid);
  const db = getDb();
  const [unfinished] = await db
    .select({ id: schema.readingSession.id, title: schema.passage.title })
    .from(schema.readingSession)
    .innerJoin(schema.passage, eq(schema.passage.id, schema.readingSession.passageId))
    .where(and(eq(schema.readingSession.readerId, s.rid), isNull(schema.readingSession.completedAt)))
    .orderBy(schema.readingSession.createdAt)
    .limit(1);
  const [{ words }] = await db.select({ words: count() }).from(schema.vocabItem).where(eq(schema.vocabItem.readerId, s.rid));
  const { reader } = ov;

  return (
    <Shell nav={READER_NAV} right={<Link href="/switch" className="text-sm font-semibold text-muted underline">Switch</Link>}>
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold">Hi, {reader.nickname}!</h1>
          <p className="mt-1 text-muted">
            {ov.streak > 0 ? `🔥 ${ov.streak}-day streak` : "Start a streak today"} · {bandLabel(reader.currentBand)} · {reader.xp} XP
          </p>
        </div>
        <div className="card py-3">
          <GoalRing minutes={ov.minutesToday} goal={reader.dailyGoalMinutes} />
        </div>
      </div>

      {unfinished && (
        <div className="card mt-6 flex flex-wrap items-center justify-between gap-3 border-brand/40">
          <p>
            <span className="font-semibold">Unfinished:</span> {unfinished.title}
          </p>
          <Link href={`/session/${unfinished.id}`} className="btn-primary px-4 py-2">Continue</Link>
        </div>
      )}

      <h2 className="mt-8 text-lg font-bold">Pick your next read</h2>
      {cards[0]?.kind === "placement" && <p className="mt-1 text-sm text-muted">{cards[0].reason}</p>}
      <div className="mt-3 grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <article key={c.passage.id} className="card flex flex-col">
            <span className={`self-start rounded-full px-2.5 py-0.5 text-xs font-bold ${KIND_STYLE[c.kind]}`}>{c.label}</span>
            <h3 className="mt-3 font-serif text-xl font-bold leading-snug">{c.passage.title}</h3>
            <p className="mt-1 text-sm text-muted">
              {GENRE_LABELS[c.passage.genre]} · {c.passage.wordCount} words · about {Math.max(1, Math.round(c.passage.wordCount / 150))} min
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {c.passage.topicTags.map((t) => (
                <span key={t} className="chip capitalize">{t}</span>
              ))}
            </div>
            {c.kind !== "placement" && (
              <p className="mt-3 text-sm text-muted">{c.skill ? `Practice: ${SKILL_LABELS[c.skill]}.` : c.reason}{c.repeat ? " (You've read this one before.)" : ""}</p>
            )}
            <div className="mt-auto pt-4">
              <StartButton passageId={c.passage.id}>Read this</StartButton>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/vocab" className="card hover:border-brand/40">
          <p className="text-sm font-semibold text-muted">My words</p>
          <p className="mt-1 text-2xl font-bold">{words} saved</p>
          <p className="text-sm text-muted">Tap any word while reading to look it up and save it.</p>
        </Link>
        <Link href="/progress" className="card hover:border-brand/40">
          <p className="text-sm font-semibold text-muted">My progress</p>
          <p className="mt-1 text-2xl font-bold">{ov.sessions.length} reads</p>
          <p className="text-sm text-muted">See your speed and accuracy over time.</p>
        </Link>
      </div>
    </Shell>
  );
}
