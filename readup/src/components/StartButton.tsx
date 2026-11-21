"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function StartButton({ passageId, children, className = "btn-primary w-full" }: { passageId: string; children: React.ReactNode; className?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <>
      <button
        className={className}
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setError(null);
          try {
            const res = await fetch("/api/sessions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ passageId }) });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
            router.push(`/session/${data.id}`);
          } catch (e) {
            setError((e as Error).message);
            setBusy(false);
          }
        }}
      >
        {busy ? "Opening…" : children}
      </button>
      {error && <p className="mt-2 text-sm font-semibold text-bad">{error}</p>}
    </>
  );
}
