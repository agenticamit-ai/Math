"use client";

import { useActionState } from "react";
import { createReader, updateReader } from "@/app/actions";
import { INTEREST_OPTIONS } from "@/lib/constants";
import { FormMessage, SubmitButton } from "./forms";

type Existing = { id: string; nickname: string; grade: number; dailyGoalMinutes: number; interests: string[] };

export function ReaderForm({ existing }: { existing?: Existing }) {
  const [state, action] = useActionState(existing ? updateReader : createReader, undefined);
  return (
    <form action={action} className="space-y-5">
      {existing && <input type="hidden" name="readerId" value={existing.id} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="nickname">First name or nickname</label>
          <input className="input" id="nickname" name="nickname" defaultValue={existing?.nickname} maxLength={30} required />
        </div>
        <div>
          <label className="label" htmlFor="grade">Grade</label>
          <select className="input" id="grade" name="grade" defaultValue={existing?.grade ?? 6}>
            {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
              <option key={g} value={g}>Grade {g}</option>
            ))}
          </select>
        </div>
        {!existing && (
          <div>
            <label className="label" htmlFor="birthYear">Birth year <span className="font-normal text-muted">(optional)</span></label>
            <input className="input" id="birthYear" name="birthYear" inputMode="numeric" pattern="\d{4}" placeholder="2014" />
          </div>
        )}
        <div>
          <label className="label" htmlFor="dailyGoalMinutes">Daily goal (minutes)</label>
          <input className="input" id="dailyGoalMinutes" name="dailyGoalMinutes" type="number" min={5} max={90} defaultValue={existing?.dailyGoalMinutes ?? 15} />
        </div>
        <div>
          <label className="label" htmlFor="pin">{existing ? "New 4-digit PIN" : "4-digit PIN"}{existing && <span className="font-normal text-muted"> (leave blank to keep)</span>}</label>
          <input className="input" id="pin" name="pin" inputMode="numeric" pattern="\d{4}" maxLength={4} autoComplete="off" required={!existing} />
        </div>
      </div>
      <fieldset>
        <legend className="label">Interests</legend>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((i) => (
            <label key={i} className="cursor-pointer">
              <input type="checkbox" name="interests" value={i} defaultChecked={existing?.interests.includes(i)} className="peer sr-only" />
              <span className="inline-block rounded-full border border-line bg-card px-3 py-1.5 text-sm font-semibold capitalize text-muted peer-checked:border-brand peer-checked:bg-brand-soft peer-checked:text-brand-dark peer-focus-visible:ring-4 peer-focus-visible:ring-brand/30">
                {i}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <FormMessage state={state} />
      <SubmitButton>{existing ? "Save changes" : "Create reader"}</SubmitButton>
    </form>
  );
}
