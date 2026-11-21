import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { reviewPassage } from "@/app/actions";
import { PARENT_NAV, Shell } from "@/components/Shell";
import { getDb, schema } from "@/db";
import { requireParent } from "@/lib/auth";
import { dateTime } from "@/lib/format";
import { SKILL_LABELS, TRAP_LABELS } from "@/lib/scoring";

export const metadata = { title: "News queue" };
export const dynamic = "force-dynamic";

export default async function NewsQueuePage() {
  const s = await requireParent();
  const db = getDb();
  const [parent] = await db.select({ timezone: schema.parent.timezone, settings: schema.parent.settings }).from(schema.parent).where(eq(schema.parent.id, s.pid));
  const tz = parent.timezone;
  const queued = await db
    .select()
    .from(schema.passage)
    .where(and(eq(schema.passage.sourceType, "current_affairs"), eq(schema.passage.status, "review")))
    .orderBy(desc(schema.passage.createdAt), asc(schema.passage.difficultyScore));
  const qs = queued.length
    ? await db.select().from(schema.question).where(inArray(schema.question.passageId, queued.map((p) => p.id))).orderBy(asc(schema.question.ordinal))
    : [];
  const runs = await db.select().from(schema.contentJobLog).orderBy(desc(schema.contentJobLog.runDate)).limit(10);
  const live = await db
    .select({ id: schema.passage.id, title: schema.passage.title, publishedAt: schema.passage.publishedAt, expiresAt: schema.passage.expiresAt, d: schema.passage.difficultyScore })
    .from(schema.passage)
    .where(and(eq(schema.passage.sourceType, "current_affairs"), eq(schema.passage.status, "published")))
    .orderBy(desc(schema.passage.publishedAt))
    .limit(20);

  const stories = new Map<string, typeof queued>();
  for (const p of queued) stories.set(p.storyKey ?? p.id, [...(stories.get(p.storyKey ?? p.id) ?? []), p]);

  return (
    <Shell nav={PARENT_NAV}>
      <h1 className="font-serif text-3xl font-bold">News queue</h1>
      <p className="mt-1 text-muted">
        Each morning ReadUp turns a few kid-safe news stories into original explainers at two reading levels.{" "}
        {parent.settings.reviewBeforePublish !== false
          ? "Review mode is on: nothing reaches your reader until you approve it."
          : "Review mode is off: explainers publish automatically. You can turn review back on in Settings."}
      </p>

      <section className="mt-6">
        <h2 className="text-lg font-bold">Waiting for review ({queued.length})</h2>
        {queued.length === 0 && <p className="card mt-3 text-sm text-muted">Nothing waiting right now.</p>}
        <div className="mt-3 space-y-4">
          {[...stories.values()].map((versions) => (
            <div key={versions[0].id} className="card">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                {dateTime(versions[0].createdAt, tz)} · Source:{" "}
                {versions[0].sourceUrls.map((u) => (
                  <a key={u} href={u} target="_blank" rel="noopener noreferrer" className="normal-case text-brand-dark underline">
                    {new URL(u).hostname.replace(/^www\./, "")}
                  </a>
                ))}
              </p>
              <div className="mt-3 space-y-4">
                {versions.map((p) => (
                  <div key={p.id} className="rounded-xl border border-line p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-xl font-bold">{p.title}</h3>
                        <p className="text-sm text-muted">
                          Difficulty {p.difficultyScore.toFixed(1)} · {p.wordCount} words · FK grade {p.fkGrade.toFixed(1)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <form action={reviewPassage}>
                          <input type="hidden" name="passageId" value={p.id} />
                          <input type="hidden" name="decision" value="approve" />
                          <button className="btn-primary px-4 py-2 text-sm">Approve</button>
                        </form>
                        <form action={reviewPassage}>
                          <input type="hidden" name="passageId" value={p.id} />
                          <input type="hidden" name="decision" value="reject" />
                          <button className="btn border border-bad px-4 py-2 text-sm text-bad hover:bg-bad/5">Reject</button>
                        </form>
                      </div>
                    </div>
                    <details className="mt-3">
                      <summary className="cursor-pointer text-sm font-semibold text-brand-dark">Read the passage and questions</summary>
                      <p className="mt-3 text-sm"><span className="font-semibold">Purpose question:</span> {p.purposeQuestion}</p>
                      <div className="mt-3 space-y-3 whitespace-pre-line font-serif text-[17px] leading-relaxed">{p.body}</div>
                      <ol className="mt-4 space-y-3 text-sm">
                        {qs
                          .filter((q) => q.passageId === p.id)
                          .map((q) => (
                            <li key={q.id} className="rounded-lg bg-paper p-3">
                              <p className="text-xs font-semibold text-muted">
                                {q.isRecall ? "7-day recall" : `${SKILL_LABELS[q.skill]} · ${q.phase === "closed_book" ? "from memory" : "passage open"} · ${q.format}`}
                              </p>
                              <p className="mt-1 font-semibold">{q.stem}</p>
                              <ul className="mt-1 space-y-0.5">
                                {q.options.map((o) => (
                                  <li key={o.id} className={q.correct.includes(o.id) ? "font-semibold text-good" : "text-muted"}>
                                    {q.correct.includes(o.id) ? "✓ " : "· "}
                                    {o.text}
                                    {o.trap && <span className="text-xs"> ({TRAP_LABELS[o.trap].name})</span>}
                                  </li>
                                ))}
                              </ul>
                              <p className="mt-1 text-xs text-muted">Evidence: &ldquo;{q.evidenceText}&rdquo;</p>
                            </li>
                          ))}
                      </ol>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card mt-8 overflow-x-auto">
        <h2 className="text-lg font-bold">Recent runs</h2>
        {runs.length === 0 ? (
          <p className="mt-2 text-sm text-muted">The daily job hasn&apos;t run yet.</p>
        ) : (
          <table className="mt-3 w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="py-2 pr-3">When</th>
                <th className="py-2 pr-3">Headlines</th>
                <th className="py-2 pr-3">Rejected</th>
                <th className="py-2 pr-3">Drafts</th>
                <th className="py-2 pr-3">Published</th>
                <th className="py-2 pr-3">Queued</th>
                <th className="py-2">AI calls</th>
              </tr>
            </thead>
            <tbody>
              {runs.map((r) => {
                const errors = r.errors as string[];
                return (
                  <tr key={r.id} className="border-t border-line align-top">
                    <td className="whitespace-nowrap py-2 pr-3">{dateTime(r.runDate, tz)}</td>
                    <td className="py-2 pr-3 tabular-nums">{r.fetched}</td>
                    <td className="py-2 pr-3">
                      <details>
                        <summary className="cursor-pointer tabular-nums">{r.rejectedSafety}</summary>
                        <ul className="mt-1 space-y-1 text-xs text-muted">
                          {r.rejections.map((x, i) => (
                            <li key={i}>
                              <a href={x.url} target="_blank" rel="noopener noreferrer" className="underline">{x.title}</a>: {x.reason}
                            </li>
                          ))}
                        </ul>
                      </details>
                    </td>
                    <td className="py-2 pr-3 tabular-nums">{r.generated}</td>
                    <td className="py-2 pr-3 tabular-nums">{r.published}</td>
                    <td className="py-2 pr-3 tabular-nums">{r.queued}</td>
                    <td className="py-2 tabular-nums">
                      {r.llmCalls}
                      {errors.length > 0 && (
                        <details className="mt-1">
                          <summary className="cursor-pointer text-xs font-semibold text-bad">{errors.length} issue(s)</summary>
                          <ul className="mt-1 space-y-1 text-xs text-muted">{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
                        </details>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>

      {live.length > 0 && (
        <section className="card mt-6">
          <h2 className="text-lg font-bold">Live news explainers</h2>
          <ul className="mt-2 divide-y divide-line text-sm">
            {live.map((p) => (
              <li key={p.id} className="flex justify-between gap-3 py-2">
                <span className="font-semibold">{p.title}</span>
                <span className="whitespace-nowrap text-muted">
                  D {p.d.toFixed(1)} · until {p.expiresAt ? dateTime(p.expiresAt, tz) : "–"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Shell>
  );
}
