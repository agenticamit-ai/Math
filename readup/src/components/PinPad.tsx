"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { enterReader } from "@/app/actions";

export function PinPad({ readerId, nickname }: { readerId: string; nickname: string }) {
  const [state, action, pending] = useActionState(enterReader, undefined);
  const [pin, setPin] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (pin.length === 4) formRef.current?.requestSubmit();
  }, [pin]);
  useEffect(() => {
    if (state?.error) setPin("");
  }, [state]);

  const press = (d: string) => setPin((p) => (p.length < 4 ? p + d : p));
  return (
    <form ref={formRef} action={action} className="mx-auto w-full max-w-xs text-center">
      <input type="hidden" name="readerId" value={readerId} />
      <input type="hidden" name="pin" value={pin} />
      <p className="font-serif text-2xl font-bold">Hi, {nickname}!</p>
      <p className="mt-1 text-sm text-muted">Enter your 4-digit PIN</p>
      <div className="my-5 flex justify-center gap-3" aria-label={`${pin.length} of 4 digits entered`}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`h-4 w-4 rounded-full border-2 border-brand ${i < pin.length ? "bg-brand" : ""}`} />
        ))}
      </div>
      {state?.error && (
        <p role="alert" className="mb-3 text-sm font-semibold text-bad">
          {state.error}
        </p>
      )}
      <div className="grid grid-cols-3 gap-3">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
          <button key={d} type="button" onClick={() => press(d)} disabled={pending} className="btn-ghost h-16 text-2xl">
            {d}
          </button>
        ))}
        <span />
        <button type="button" onClick={() => press("0")} disabled={pending} className="btn-ghost h-16 text-2xl">
          0
        </button>
        <button type="button" onClick={() => setPin((p) => p.slice(0, -1))} disabled={pending} className="btn-ghost h-16 text-base" aria-label="Delete last digit">
          ⌫
        </button>
      </div>
    </form>
  );
}
