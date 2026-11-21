import { notFound } from "next/navigation";
import { RecallQuiz } from "@/components/RecallQuiz";
import { READER_NAV, Shell } from "@/components/Shell";
import { requireReader } from "@/lib/auth";
import { dueRecalls, recallQuestions } from "@/lib/recall";

export const metadata = { title: "Remember this?" };
export const dynamic = "force-dynamic";

export default async function RecallPage({ params }: { params: Promise<{ passageId: string }> }) {
  const s = await requireReader();
  const { passageId } = await params;
  const due = (await dueRecalls(s.rid)).find((d) => d.passageId === passageId);
  if (!due) notFound();
  const qs = await recallQuestions(passageId);
  return (
    <Shell nav={READER_NAV}>
      <RecallQuiz
        passageId={passageId}
        title={due.title}
        daysAgo={Math.floor((Date.now() - due.completedAt!.getTime()) / 86400000)}
        // No answer keys, explanations, or trap labels before submitting.
        questions={qs.map((q) => ({ id: q.id, stem: q.stem, options: q.options.map((o) => ({ id: o.id, text: o.text })) }))}
      />
    </Shell>
  );
}
