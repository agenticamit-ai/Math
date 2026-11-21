import { inArray } from "drizzle-orm";
import Link from "next/link";
import { READER_NAV, Shell } from "@/components/Shell";
import { Stat } from "@/components/Stat";
import { TrendChart } from "@/components/TrendChart";
import { getDb, schema } from "@/db";
import { requireReader } from "@/lib/auth";
import { INTEREST_OPTIONS } from "@/lib/constants";
import { bandLabel, num, pct, shortDate } from "@/lib/format";
import { mean } from "@/lib/metrics";
import { isColdValid, masteryMap, readerOverview } from "@/lib/reader";
import { retention } from "@/lib/recall";
import { SKILL_LABELS } from "@/lib/scoring";
import { SKILLS } from "@/db/schema";

export const metadata = { title: "My progress" };
export const dynamic = "force-dynamic";

export default async function ProgressPage() {
  const s = await requireReader();
  const ov = (await readerOverview(s.rid))!;
  const cold = ov.sessions.filter(isColdValid);
  const chart = [...cold].reverse().map((x) => ({ label: shortDate(x.completedAt!, ov.timezone), wpm: x.wpm ?? 0, err: x.err ?? 0, title: x.title }));
  const mastery = await masteryMap(s.rid);
  const recall = await retention(s.rid);

  const ids = [...new Set(ov.sessions.map((x) => x.passageId))];
  const tagsRows = ids.length ? await getDb().select({ tags: schema.passage.topicTags }).from(schema.passage).where(inArray(schema.passage.id, ids)) : [];
  const topicCounts = new Map<string, number>();
  for (const r of tagsRows) for (const t of r.tags) topicCounts.set(t, (topicCounts.get(t) ?? 0) + 1);

  return (
    <Shell nav={READER_NAV}>
      <h1 className="font-serif text-3xl font-bold">My progress</h1>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Level" value={bandLabel(ov.reader.currentBand)} />
        <Stat label="Reads" value={ov.sessions.length} />
        <Stat label="Avg speed (last 5)" value={`${num(mean(cold.slice(0, 5).map((x) => x.wpm ?? 0)))} WPM`} />
        <Stat label="Accuracy (last 5)" value={pct(mean(ov.sessions.filter((x) => x.isValid).slice(0, 5).map((x) => x.accuracy ?? 0)))} />
      </div>
      {recall.quizzes > 0 && (
        <p className="mt-3 text-sm text-muted">
          <strong className="text-ink">{pct(recall.rate)}</strong> remembered on {recall.quizzes} &ldquo;Remember this?&rdquo; quiz{recall.quizzes > 1 ? "zes" : ""}, a week after reading.
        </p>
      )}

      <section className="card mt-6">
        <h2 className="font-bold">Speed and effective rate</h2>
        <p className="mt-1 text-sm text-muted">Each dot is one first read. Harder passages are naturally slower, so look at the overall direction.</p>
        <div className="mt-4">
          <TrendChart data={chart} />
        </div>
      </section>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="card">
          <h2 className="font-bold">Reading skills</h2>
          <ul className="mt-3 space-y-3">
            {SKILLS.filter((k) => k !== "compare_texts").map((k) => (
              <li key={k}>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{SKILL_LABELS[k]}</span>
                  <span className="text-muted">{mastery[k].attempts ? pct(mastery[k].mastery) : "not tried yet"}</span>
                </div>
                <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-paper">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${mastery[k].attempts ? Math.round(mastery[k].mastery * 100) : 0}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="card">
          <h2 className="font-bold">Topics I&apos;ve explored</h2>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {INTEREST_OPTIONS.map((t) => {
              const c = topicCounts.get(t) ?? 0;
              return (
                <div key={t} className={`rounded-xl p-3 text-center text-sm capitalize ${c ? "bg-brand-soft font-semibold text-brand-dark" : "bg-paper text-muted"}`}>
                  {t}
                  <span className="block text-xs font-normal">{c ? `${c} read${c > 1 ? "s" : ""}` : "–"}</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {ov.sessions.length > 0 && (
        <section className="card mt-6">
          <h2 className="font-bold">Recent reads</h2>
          <ul className="mt-2 divide-y divide-line">
            {ov.sessions.slice(0, 10).map((x) => (
              <li key={x.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                <Link href={`/session/${x.id}`} className="font-semibold underline-offset-2 hover:underline">{x.title}</Link>
                <span className="whitespace-nowrap text-muted">{num(x.wpm)} WPM · {pct(x.accuracy)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Shell>
  );
}
