import { eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PinPad } from "@/components/PinPad";
import { Shell } from "@/components/Shell";
import { getDb, schema } from "@/db";
import { getSession } from "@/lib/auth";

export const metadata = { title: "Who's reading?" };

export default async function SwitchPage({ searchParams }: { searchParams: Promise<{ reader?: string }> }) {
  const s = await getSession();
  if (!s) redirect("/login");
  const readers = await getDb()
    .select({ id: schema.reader.id, nickname: schema.reader.nickname })
    .from(schema.reader)
    .where(eq(schema.reader.parentId, s.pid))
    .orderBy(schema.reader.createdAt);
  if (!readers.length) redirect(s.mode === "parent" ? "/parent/readers/new" : "/parent/unlock");
  const { reader } = await searchParams;
  const chosen = readers.find((r) => r.id === reader) ?? (readers.length === 1 ? readers[0] : undefined);

  return (
    <Shell width="max-w-xl" right={<Link href="/parent" className="text-sm font-semibold text-muted underline">Parent</Link>}>
      <div className="card p-6 sm:p-8">
        {chosen ? (
          <>
            <PinPad readerId={chosen.id} nickname={chosen.nickname} />
            {readers.length > 1 && (
              <p className="mt-6 text-center text-sm">
                <Link href="/switch" className="font-semibold text-muted underline">Not {chosen.nickname}?</Link>
              </p>
            )}
          </>
        ) : (
          <>
            <h1 className="text-center font-serif text-2xl font-bold">Who&apos;s reading?</h1>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {readers.map((r) => (
                <Link key={r.id} href={`/switch?reader=${r.id}`} className="btn-ghost h-20 text-xl">
                  {r.nickname}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </Shell>
  );
}
