import { Shell } from "./Shell";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <Shell width="max-w-md">
      <div className="card mt-4 p-6 sm:p-8">
        <h1 className="font-serif text-2xl font-bold">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </Shell>
  );
}
