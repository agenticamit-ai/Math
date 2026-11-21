import { AuthCard } from "@/components/AuthCard";
import { LoginForm } from "@/components/AuthForms";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <AuthCard title="Parent sign in">
      <LoginForm />
    </AuthCard>
  );
}
