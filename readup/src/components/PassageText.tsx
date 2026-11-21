"use client";

import { memo, useMemo } from "react";
import { segment } from "@/lib/text";

type Props = {
  body: string;
  /** read: words are tappable. select: sentences are tappable. view: static. */
  mode: "read" | "select" | "view";
  highlighted?: Set<number>;
  selected?: number | null;
  evidence?: number[];
  onWord?: (word: string, sentence: string) => void;
  onSentence?: (index: number) => void;
};

const WORD_SPLIT = /([A-Za-z0-9]+(?:['’\-][A-Za-z0-9]+)*)/;

function PassageTextImpl({ body, mode, highlighted, selected, evidence, onWord, onSentence }: Props) {
  const blocks = useMemo(() => segment(body), [body]);
  const evidenceSet = useMemo(() => new Set(evidence ?? []), [evidence]);

  return (
    <div className="reading space-y-5">
      {blocks.map((b) => {
        if (b.kind === "h") {
          return (
            <h3 key={b.start} className="font-sans text-lg font-bold">
              {b.sentences[0]?.text}
            </h3>
          );
        }
        const parts: React.ReactNode[] = [];
        let cursor = b.start;
        for (const s of b.sentences) {
          if (s.start > cursor) parts.push(body.slice(cursor, s.start));
          const text = body.slice(s.start, s.end);
          const isSel = selected === s.index;
          const isHi = highlighted?.has(s.index);
          const isEv = evidenceSet.has(s.index);
          const cls = [
            "rounded-sm transition-colors",
            isEv ? "bg-mark underline decoration-sun decoration-2 underline-offset-4" : "",
            isHi && !isEv ? "bg-mark" : "",
            isSel ? "bg-brand-soft outline outline-2 outline-brand" : "",
            mode === "select" ? "cursor-pointer hover:bg-brand-soft/70" : "",
          ].join(" ");
          if (mode === "select") {
            parts.push(
              <span
                key={s.index}
                role="button"
                tabIndex={0}
                aria-pressed={isSel || isHi}
                className={cls}
                onClick={() => onSentence?.(s.index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSentence?.(s.index);
                  }
                }}
              >
                {text}
              </span>,
            );
          } else if (mode === "read") {
            parts.push(
              <span key={s.index} className={cls}>
                {text.split(WORD_SPLIT).map((tok, i) =>
                  i % 2 === 1 ? (
                    <span key={i} className="cursor-pointer rounded hover:bg-brand-soft" onClick={() => onWord?.(tok, s.text)}>
                      {tok}
                    </span>
                  ) : (
                    tok
                  ),
                )}
              </span>,
            );
          } else {
            parts.push(
              <span key={s.index} className={cls}>
                {text}
              </span>,
            );
          }
          cursor = s.end;
        }
        if (cursor < b.end) parts.push(body.slice(cursor, b.end));
        return (
          <p key={b.start} className="whitespace-pre-line">
            {parts}
          </p>
        );
      })}
    </div>
  );
}

export const PassageText = memo(PassageTextImpl);
