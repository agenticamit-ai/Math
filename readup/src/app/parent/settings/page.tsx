import { eq } from "drizzle-orm";
import { deleteAccount, logout } from "@/app/actions";
import { ParentSettingsForm } from "@/components/ParentSettingsForm";
import { PARENT_NAV, Shell } from "@/components/Shell";
import { getDb, schema } from "@/db";
import { requireParent } from "@/lib/auth";
import { INTEREST_OPTIONS } from "@/lib/constants";

export const metadata = { title: "Settings" };

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ deleteError?: string }> }) {
  const s = await requireParent();
  const { deleteError } = await searchParams;
  const [parent] = await getDb().select().from(schema.parent).where(eq(schema.parent.id, s.pid));
  return (
    <Shell nav={PARENT_NAV} width="max-w-2xl">
      <h1 className="font-serif text-3xl font-bold">Settings</h1>
      <p className="mt-1 text-muted">Signed in as {parent.email} · Time zone {parent.timezone}</p>

      <section className="card mt-6">
        <h2 className="text-lg font-bold">Content</h2>
        <p className="mt-1 mb-4 text-sm text-muted">Topic tags in the library: {INTEREST_OPTIONS.join(", ")}. Interests and daily goals are set on each reader&apos;s page.</p>
        <ParentSettingsForm blockedTopics={parent.settings.blockedTopics ?? []} />
      </section>

      <section className="card mt-6">
        <h2 className="text-lg font-bold">Your data</h2>
        <p className="mt-1 text-sm text-muted">
          ReadUp stores each reader&apos;s nickname, grade, optional birth year, interests, reading sessions, answers, summaries, and tapped
          words. There are no ads or trackers. When AI grading is on, only the passage text and the summary your child writes are sent to
          Claude for grading.
        </p>
        <a href="/api/parent/export" className="btn-ghost mt-4">Download all data (JSON)</a>
      </section>

      <section className="card mt-6">
        <form action={logout}>
          <button className="btn-ghost">Sign out</button>
        </form>
      </section>

      <section className="card mt-6 border-bad/30">
        <h2 className="text-lg font-bold text-bad">Delete account</h2>
        <p className="mt-1 text-sm text-muted">Permanently deletes your account and every reader&apos;s data. This can&apos;t be undone.</p>
        <form action={deleteAccount} className="mt-3 flex flex-wrap items-center gap-2">
          <input name="confirm" className="input max-w-xs" placeholder='Type "delete my account"' />
          <button className="btn border border-bad text-bad hover:bg-bad/5">Delete everything</button>
        </form>
        {deleteError && <p className="mt-2 text-sm font-semibold text-bad">Type &quot;delete my account&quot; to confirm.</p>}
      </section>
    </Shell>
  );
}
