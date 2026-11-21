"use client";

import { useActionState } from "react";
import { updateParentSettings } from "@/app/actions";
import { FormMessage, SubmitButton } from "./forms";

export function ParentSettingsForm({ blockedTopics }: { blockedTopics: string[] }) {
  const [state, action] = useActionState(updateParentSettings, undefined);
  return (
    <form action={action} className="space-y-3">
      <div>
        <label className="label" htmlFor="blockedTopics">Blocked topics</label>
        <input className="input" id="blockedTopics" name="blockedTopics" defaultValue={blockedTopics.join(", ")} placeholder="e.g. movies, sports" />
        <p className="mt-1 text-xs text-muted">Comma-separated topic tags. Passages with these tags are never recommended.</p>
      </div>
      <FormMessage state={state} />
      <SubmitButton>Save</SubmitButton>
    </form>
  );
}
