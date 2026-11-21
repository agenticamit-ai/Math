import { AuthCard } from "@/components/AuthCard";
import { UnlockForm } from "@/components/AuthForms";

export const metadata = { title: "Parent dashboard" };

export default function UnlockPage() {
  return (
    <AuthCard title="Parents only" subtitle="Enter the parent password to leave reader mode.">
      <UnlockForm />
    </AuthCard>
  );
}
