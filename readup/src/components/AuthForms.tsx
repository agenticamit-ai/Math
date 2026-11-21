"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { login, signup, unlockParent } from "@/app/actions";
import { FormMessage, SubmitButton } from "./forms";

export function LoginForm() {
  const [state, action] = useActionState(login, undefined);
  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="label" htmlFor="email">Email</label>
        <input className="input" id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div>
        <label className="label" htmlFor="password">Password</label>
        <input className="input" id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      <FormMessage state={state} />
      <SubmitButton className="btn-primary w-full" pendingText="Signing in…">Sign in</SubmitButton>
      <p className="text-center text-sm text-muted">
        New here? <Link href="/signup" className="font-semibold text-brand-dark underline">Create a parent account</Link>
      </p>
    </form>
  );
}

export function SignupForm() {
  const [state, action] = useActionState(signup, undefined);
  const [tz, setTz] = useState("America/Los_Angeles");
  useEffect(() => {
    try {
      setTz(Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Los_Angeles");
    } catch {}
  }, []);
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="timezone" value={tz} />
      <div>
        <label className="label" htmlFor="name">Your name</label>
        <input className="input" id="name" name="name" autoComplete="name" required />
      </div>
      <div>
        <label className="label" htmlFor="email">Email</label>
        <input className="input" id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div>
        <label className="label" htmlFor="password">Password</label>
        <input className="input" id="password" name="password" type="password" autoComplete="new-password" minLength={8} required />
        <p className="mt-1 text-xs text-muted">At least 8 characters. Your child will use a 4-digit PIN instead.</p>
      </div>
      <FormMessage state={state} />
      <SubmitButton className="btn-primary w-full" pendingText="Creating account…">Create account</SubmitButton>
      <p className="text-center text-sm text-muted">
        Already have an account? <Link href="/login" className="font-semibold text-brand-dark underline">Sign in</Link>
      </p>
    </form>
  );
}

export function UnlockForm() {
  const [state, action] = useActionState(unlockParent, undefined);
  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="label" htmlFor="password">Parent password</label>
        <input className="input" id="password" name="password" type="password" autoComplete="current-password" required autoFocus />
      </div>
      <FormMessage state={state} />
      <SubmitButton className="btn-primary w-full">Open parent dashboard</SubmitButton>
    </form>
  );
}
