import { AuthCard } from "@/components/AuthCard";
import { SignupForm } from "@/components/AuthForms";

export const metadata = { title: "Create account" };

export default function SignupPage() {
  return (
    <AuthCard title="Create a parent account" subtitle="Parents manage profiles and see progress. Kids sign in with a PIN; no child email needed.">
      <SignupForm />
    </AuthCard>
  );
}
