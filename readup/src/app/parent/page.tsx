import { and, count, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { logout } from "@/app/actions";
import { PARENT_NAV, Shell } from "@/components/Shell";
import { getDb, schema } from "@/db";
import { requireParent } from "@/lib/auth";
import { bandLabel, num, pct } from "@/lib/format";
import { mean } from "@/lib/metrics";
import { isColdValid, readerOverview } from "@/lib/reader";

export const metadata = { title: "Parent dashboard" };

export default async function ParentDashboard() {
  const s = await requireParent();
  const db = getDb();
  const [parent] = await db.select().from(schema.parent).where(eq(schema.parent.id, s.pid));
  const readers = await db.select({ id: schema.reader.id }).from(schema.reader).where(eq(schema.reader.parentId, s.pid)).orderBy(schema.reader.createdAt);
  const overviews = (await Promise.all(readers.map((r) => readerOverview(r.id)))).filter((o) => o !== null);
  const weekAgo = Date.now() - 7 * 86400000;
  const [waiting] = await db
    .select({ n: count() })
    .from(schema.passage)
    .where(and(eq(schema.passage.sourceType, "current_affairs"), eq(schema.passage.status, "review")));
  const [lastRun] = await db.select().from(schema.contentJobLog).orderBy(desc(schema.contentJobLog.runDate)).limit(1);
  const lowRun = lastRun && Date.now() - lastRun.runDate.getTime() < 2 * 86400000 && lastRun.published + lastRun.queued < 2;

  return (
    <Shell
      nav={PARENT_NAV}
      right={
        <form action={logout}>
          <button className="text-sm font-semibold text-muted underline">Sign out</button>
        </form>
      }
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold">Hi, {parent.name.split(" ")[0]}</h1>
          <p className="mt-1 text-muted">Here&apos;s how your readers are doing.</p>
        </div>
        <Link href="/parent/readers/new" className="btn-ghost">+ Add reader</Link>
      </div>

      {waiting.n > 0 && (
        <Link href="/parent/news" className="mt-4 block rounded-xl bg-sun-soft px-4 py-3 text-sm hover:underline">
          <strong>{waiting.n} news explainer{waiting.n > 1 ? "s" : ""}</strong> waiting for your review →
        </Link>
      )}
      {lowRun && (
        <Link href="/parent/news" className="mt-4 block rounded-xl bg-bad/10 px-4 py-3 text-sm text-bad hover:underline">
          The latest daily news run produced only {lastRun.published + lastRun.queued} item(s). See what happened →
        </Link>
      )}

      {overviews.length === 0 && (
        <div className="card mt-6 text-center">
          <p className="text-muted">No reader profiles yet.</p>
          <Link href="/parent/readers/new" className="btn-primary mt-4">Add your first reader</Link>
        </div>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {overviews.map(({ reader, sessions, streak }) => {
          const cold = sessions.filter(isColdValid);
          const thisWeek = sessions.filter((x) => x.completedAt!.getTime() >= weekAgo).length;
          return (
            <div key={reader.id} className="card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">{reader.nickname}</h2>
                  <p className="text-sm text-muted">Grade {reader.grade} · {bandLabel(reader.currentBand)} · {streak}-day streak</p>
                </div>
                <Link href={`/switch?reader=${reader.id}`} className="btn-primary px-4 py-2 text-sm">Start reading</Link>
              </div>
              <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-paper p-3">
                  <dt className="text-xs text-muted">This week</dt>
                  <dd className="text-lg font-bold">{thisWeek}</dd>
                </div>
                <div className="rounded-xl bg-paper p-3">
                  <dt className="text-xs text-muted">Avg WPM (last 5)</dt>
                  <dd className="text-lg font-bold">{num(mean(cold.slice(0, 5).map((x) => x.wpm ?? 0)))}</dd>
                </div>
                <div className="rounded-xl bg-paper p-3">
                  <dt className="text-xs text-muted">Accuracy (last 5)</dt>
                  <dd className="text-lg font-bold">{pct(mean(sessions.filter((x) => x.isValid).slice(0, 5).map((x) => x.accuracy ?? 0)))}</dd>
                </div>
              </dl>
              <Link href={`/parent/readers/${reader.id}`} className="mt-4 inline-block text-sm font-semibold text-brand-dark underline">
                Charts, session log, and settings →
              </Link>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}
