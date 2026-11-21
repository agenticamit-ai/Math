import { ReaderForm } from "@/components/ReaderForm";
import { PARENT_NAV, Shell } from "@/components/Shell";
import { requireParent } from "@/lib/auth";

export const metadata = { title: "Add a reader" };

export default async function NewReaderPage() {
  await requireParent();
  return (
    <Shell nav={PARENT_NAV} width="max-w-2xl">
      <h1 className="font-serif text-3xl font-bold">Add a reader</h1>
      <p className="mt-2 text-muted">ReadUp stores only a nickname, grade, optional birth year, and interests.</p>
      <div className="card mt-6">
        <ReaderForm />
      </div>
    </Shell>
  );
}
