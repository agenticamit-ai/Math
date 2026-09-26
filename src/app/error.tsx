"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="card">
      <h1 className="font-display text-4xl text-ink">Something bumped the table.</h1>
      <p className="mt-3 text-xl text-cocoa">The page hit a snag. Your saved progress is still in this browser.</p>
      <button type="button" className="btn-primary mt-5" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
