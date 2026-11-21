"use client";

import { useActionState } from "react";
import { updateParentSettings } from "@/app/actions";
import { NEWS_CATEGORY_LABELS, NEWS_CATEGORY_OPTIONS } from "@/lib/constants";
import { FormMessage, SubmitButton } from "./forms";

export function ParentSettingsForm({
  blockedTopics,
  newsCategories,
  reviewBeforePublish,
}: {
  blockedTopics: string[];
  newsCategories: string[];
  reviewBeforePublish: boolean;
}) {
  const [state, action] = useActionState(updateParentSettings, undefined);
  return (
    <form action={action} className="space-y-5">
      <div>
        <label className="label" htmlFor="blockedTopics">Blocked topics</label>
        <input className="input" id="blockedTopics" name="blockedTopics" defaultValue={blockedTopics.join(", ")} placeholder="e.g. movies, sports" />
        <p className="mt-1 text-xs text-muted">Comma-separated topic tags. Passages with these tags are never recommended.</p>
      </div>
      <fieldset>
        <legend className="label">Daily news categories</legend>
        <div className="flex flex-wrap gap-2">
          {NEWS_CATEGORY_OPTIONS.map((c) => (
            <label key={c} className="cursor-pointer">
              <input type="checkbox" name="newsCategories" value={c} defaultChecked={newsCategories.includes(c)} className="peer sr-only" />
              <span className="inline-block rounded-full border border-line bg-card px-3 py-1.5 text-sm font-semibold text-muted peer-checked:border-brand peer-checked:bg-brand-soft peer-checked:text-brand-dark peer-focus-visible:ring-4 peer-focus-visible:ring-brand/30">
                {NEWS_CATEGORY_LABELS[c]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="flex items-start gap-3">
        <input type="checkbox" name="reviewBeforePublish" defaultChecked={reviewBeforePublish} className="mt-1 h-5 w-5 accent-[#2F6F6A]" />
        <span>
          <span className="font-semibold">Review news before it&apos;s published</span>
          <span className="block text-sm text-muted">New explainers wait in the News queue until you approve them.</span>
        </span>
      </label>
      <FormMessage state={state} />
      <SubmitButton>Save</SubmitButton>
    </form>
  );
}
