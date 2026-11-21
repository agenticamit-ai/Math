import Link from "next/link";
import { redirect } from "next/navigation";
import { Shell } from "@/components/Shell";
import { getSession } from "@/lib/auth";

export default async function Landing() {
  const s = await getSession();
  if (s?.mode === "reader") redirect("/home");
  if (s?.mode === "parent") redirect("/parent");
  return (
    <Shell right={<Link href="/login" className="btn-ghost py-2">Sign in</Link>}>
      <section className="mx-auto max-w-2xl py-8 text-center sm:py-16">
        <p className="chip mb-4">Reading practice for grades 5–8</p>
        <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl">Read faster. Understand more.</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
          Short timed passages, test-style questions, and a one-line summary. ReadUp tracks speed and understanding together, so
          speed only counts when comprehension comes with it.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/signup" className="btn-primary">Create a parent account</Link>
          <Link href="/login" className="btn-ghost">I already have one</Link>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ["Timed honestly", "The timer pauses when the tab is hidden and never shows while reading, so there's no racing."],
          ["Test-style questions", "Closed-book and open-book questions across 9 reading skills, with evidence you tap in the text."],
          ["Built for parents", "See speed, accuracy, and effective reading rate over time. Export or delete data any time."],
        ].map(([t, d]) => (
          <div key={t} className="card">
            <h2 className="font-semibold">{t}</h2>
            <p className="mt-1 text-sm text-muted">{d}</p>
          </div>
        ))}
      </section>
    </Shell>
  );
}
