import Link from "next/link";

export default function NotFound() {
  return (
    <section className="card">
      <h1 className="font-display text-4xl text-ink">That page wandered off the map.</h1>
      <p className="mt-3 text-xl text-cocoa">The topic or path you asked for is not in Math Quest.</p>
      <Link href="/" className="btn-primary mt-5">
        Back home
      </Link>
    </section>
  );
}
