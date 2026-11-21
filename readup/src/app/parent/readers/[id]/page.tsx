import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteReader } from "@/app/actions";
import { ReaderForm } from "@/components/ReaderForm";
import { PARENT_NAV, Shell } from "@/components/Shell";
import { Stat } from "@/components/Stat";
import { TrendChart } from "@/components/TrendChart";
import { getDb, schema } from "@/db";
import { SKILLS, type Trap } from "@/db/schema";
import { requireParent } from "@/lib/auth";
import { GENRE_LABELS } from "@/lib/constants";
import { bandLabel, dateTime, num, pct, shortDate } from "@/lib/format";
import { APPROX_GRADE_BENCHMARK, mean } from "@/lib/metrics";
import { isColdValid, masteryMap, readerOverview } from "@/lib/reader";
import { SKILL_LABELS, TRAP_LABELS, trapsChosen } from "@/lib/scoring";

export const metadata = { title: "Reader progress" };

export default async function ReaderDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ log?: string; deleteError?: string }>;
}) {
  const s = await requireParent();
  const { id } = await params;
  const { log = "all", deleteError } = await searchParams;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const db = getDb();
  const [owned] = await db.select({ id: schema.reader.id }).from(schema.reader).where(and(eq(schema.reader.id, id), eq(schema.reader.parentId, s.pid)));
  if (!owned) notFound();
  const ov = (await readerOverview(id))!;
  const { reader, sessions, timezone, streak } = ov;

  const cold = sessions.filter(isColdValid);
  const chronological = [...cold].reverse();
  const chartData = chronological.map((x) => ({
    label: shortDate(x.completedAt!, timezone),
    wpm: x.wpm ?? 0,
    err: x.err ?? 0,
    title: x.title,
  }));
  const weekAgo = Date.now() - 7 * 86400000;
  const monthAgo = Date.now() - 30 * 86400000;
  const recentAcc = mean(sessions.filter((x) => x.isValid && x.completedAt!.getTime() >= monthAgo).map((x) => x.accuracy ?? 0));
  const firstFive = mean(chronological.slice(0, 5).map((x) => x.err ?? 0));
  const lastFive = mean(cold.slice(0, 5).map((x) => x.err ?? 0));
  const errChange = firstFive && lastFive && chronological.length >= 10 ? lastFive / firstFive - 1 : null;
  const placementsLeft = Math.max(0, 3 - sessions.filter((x) => x.isPlacement).length);

  // Skill table: mastery, attempts, and the trap type picked most often.
  const mastery = await masteryMap(id);
  const answered = await db
    .select({ skill: schema.question.skill, options: schema.question.options, correct: schema.question.correct, format: schema.question.format, evidenceStart: schema.question.evidenceStart, evidenceEnd: schema.question.evidenceEnd, response: schema.answer.response })
    .from(schema.answer)
    .innerJoin(schema.readingSession, eq(schema.readingSession.id, schema.answer.sessionId))
    .innerJoin(schema.question, eq(schema.question.id, schema.answer.questionId))
    .where(eq(schema.readingSession.readerId, id));
  const trapCounts: Record<string, Partial<Record<Trap, number>>> = {};
  for (const a of answered) {
    for (const t of trapsChosen(a, a.response)) {
      trapCounts[a.skill] ??= {};
      trapCounts[a.skill][t] = (trapCounts[a.skill][t] ?? 0) + 1;
    }
  }
  const topTrap = (skill: string) => {
    const entries = Object.entries(trapCounts[skill] ?? {}) as [Trap, number][];
    if (!entries.length) return "–";
    entries.sort((a, b) => b[1] - a[1]);
    return `${TRAP_LABELS[entries[0][0]].name} (${entries[0][1]})`;
  };

  const filtered = sessions.filter((x) => (log === "valid" ? x.isValid : log === "invalid" ? !x.isValid : true));

  return (
    <Shell nav={PARENT_NAV}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link href="/parent" className="text-sm font-semibold text-muted underline">← Dashboard</Link>
          <h1 className="mt-2 font-serif text-3xl font-bold">{reader.nickname}</h1>
          <p className="text-muted">
            Grade {reader.grade} · {bandLabel(reader.currentBand)} · {streak}-day streak · {reader.xp} XP
          </p>
        </div>
        <Link href={`/switch?reader=${reader.id}`} className="btn-primary">Start reading</Link>
      </div>

      {placementsLeft > 0 && (
        <p className="mt-4 rounded-xl bg-sun-soft px-4 py-3 text-sm">
          <strong>Placement:</strong> {placementsLeft} of 3 placement reads left. These are at bands 4, 5, and 6 and set the starting band.
        </p>
      )}

      <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Effective rate change" value={errChange === null ? "–" : `${errChange >= 0 ? "+" : ""}${Math.round(errChange * 100)}%`} note="Last 5 vs first 5 valid reads (needs 10)" />
        <Stat label="Accuracy, 30 days" value={pct(recentAcc)} note="Closed-book items count 1.5×" />
        <Stat label="Current level" value={bandLabel(reader.currentBand)} note="Bands 5–6 ≈ grade 6–7" />
        <Stat label="Sessions this week" value={sessions.filter((x) => x.completedAt!.getTime() >= weekAgo).length} note="Target: 4+" />
      </section>

      <section className="card mt-6">
        <h2 className="text-lg font-bold">Speed and effective rate over time</h2>
        <p className="mt-1 text-sm text-muted">
          Valid first reads only. Effective rate = WPM × accuracy, so speed counts only with understanding. The shaded band is a rough{" "}
          {APPROX_GRADE_BENCHMARK.label.toLowerCase()} range of {APPROX_GRADE_BENCHMARK.low}–{APPROX_GRADE_BENCHMARK.high} WPM, shown for
          context only. Passages differ in difficulty, so single points jump around; difficulty-adjusted SpeedIndex comes once a baseline
          of 8 sessions exists.
        </p>
        <div className="mt-4">
          <TrendChart data={chartData} benchmark={APPROX_GRADE_BENCHMARK} />
        </div>
      </section>

      <section className="card mt-6 overflow-x-auto">
        <h2 className="text-lg font-bold">Skills</h2>
        <table className="mt-3 w-full min-w-[560px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="py-2 pr-3">Skill</th>
              <th className="py-2 pr-3">Mastery</th>
              <th className="py-2 pr-3">Answers</th>
              <th className="py-2">Most common trap</th>
            </tr>
          </thead>
          <tbody>
            {SKILLS.filter((sk) => sk !== "compare_texts").map((sk) => (
              <tr key={sk} className="border-t border-line">
                <td className="py-2 pr-3 font-semibold">{SKILL_LABELS[sk]}</td>
                <td className="py-2 pr-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-28 overflow-hidden rounded-full bg-paper">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${mastery[sk].attempts ? Math.round(mastery[sk].mastery * 100) : 0}%` }} />
                    </div>
                    <span className="tabular-nums text-muted">{mastery[sk].attempts ? pct(mastery[sk].mastery) : "–"}</span>
                  </div>
                </td>
                <td className="py-2 pr-3 tabular-nums">{mastery[sk].attempts}</td>
                <td className="py-2 text-muted">{topTrap(sk)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card mt-6 overflow-x-auto">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold">Session log</h2>
          <div className="flex gap-1 text-sm font-semibold">
            {["all", "valid", "invalid"].map((f) => (
              <Link key={f} href={`?log=${f}`} className={`rounded-lg px-3 py-1.5 capitalize ${log === f ? "bg-brand-soft text-brand-dark" : "text-muted hover:bg-paper"}`}>
                {f}
              </Link>
            ))}
          </div>
        </div>
        {filtered.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No sessions yet.</p>
        ) : (
          <table className="mt-3 w-full min-w-[720px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="py-2 pr-3">When</th>
                <th className="py-2 pr-3">Passage</th>
                <th className="py-2 pr-3">Difficulty</th>
                <th className="py-2 pr-3">WPM</th>
                <th className="py-2 pr-3">Accuracy</th>
                <th className="py-2 pr-3">Eff. rate</th>
                <th className="py-2">Flags</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((x) => (
                <tr key={x.id} className="border-t border-line align-top">
                  <td className="whitespace-nowrap py-2 pr-3 text-muted">{dateTime(x.completedAt!, timezone)}</td>
                  <td className="py-2 pr-3">
                    <span className="font-semibold">{x.title}</span>
                    <span className="block text-xs text-muted">{GENRE_LABELS[x.genre]} · {x.wordCount} words</span>
                  </td>
                  <td className="py-2 pr-3 tabular-nums">{x.difficulty.toFixed(1)}</td>
                  <td className="py-2 pr-3 tabular-nums">{num(x.wpm)}</td>
                  <td className="py-2 pr-3 tabular-nums">{pct(x.accuracy)}</td>
                  <td className="py-2 pr-3 tabular-nums">{num(x.err)}</td>
                  <td className="py-2 text-xs">
                    {!x.isValid && <span className="mr-1 inline-block rounded bg-bad/10 px-1.5 py-0.5 font-semibold text-bad">Invalid: {x.invalidReason}</span>}
                    {x.attemptNumber > 1 && <span className="mr-1 inline-block rounded bg-sun-soft px-1.5 py-0.5 font-semibold">Re-read #{x.attemptNumber}</span>}
                    {x.isPlacement && <span className="inline-block rounded bg-brand-soft px-1.5 py-0.5 font-semibold text-brand-dark">Placement</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="card mt-6">
        <h2 className="text-lg font-bold">Profile settings</h2>
        <div className="mt-4">
          <ReaderForm existing={{ id: reader.id, nickname: reader.nickname, grade: reader.grade, dailyGoalMinutes: reader.dailyGoalMinutes, interests: reader.interests }} />
        </div>
      </section>

      <section className="card mt-6 border-bad/30">
        <h2 className="text-lg font-bold text-bad">Delete this reader</h2>
        <p className="mt-1 text-sm text-muted">Permanently deletes {reader.nickname}&apos;s profile, sessions, answers, summaries, and words. This can&apos;t be undone.</p>
        <form action={deleteReader} className="mt-3 flex flex-wrap items-center gap-2">
          <input type="hidden" name="readerId" value={reader.id} />
          <input name="confirm" className="input max-w-xs" placeholder='Type "delete" to confirm' />
          <button className="btn border border-bad text-bad hover:bg-bad/5">Delete reader</button>
        </form>
        {deleteError && <p className="mt-2 text-sm font-semibold text-bad">Type &quot;delete&quot; to confirm.</p>}
      </section>
    </Shell>
  );
}
