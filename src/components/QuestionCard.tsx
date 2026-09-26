import { useEffect, useRef, useState } from "react";
import { topicById } from "../data";
import { isCorrect } from "../lib/answers";
import type { Question } from "../types";
import { MathText } from "./MathText";

export const LETTERS = ["A", "B", "C", "D", "E"];

export function Stars({ n }: { n: number }) {
  return (
    <span className="stars" title={`Difficulty ${n} of 5`} aria-label={`Difficulty ${n} of 5`}>
      {"★".repeat(n)}
      <span className="stars-off">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export function AnswerInput({
  q,
  value,
  onChange,
  onEnter,
  disabled,
  autoFocus,
}: {
  q: Question;
  value: string;
  onChange: (v: string) => void;
  onEnter?: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus, q.id]);

  if (q.style === "mc" && q.choices) {
    return (
      <div className="choices" role="radiogroup">
        {q.choices.map((c, i) => (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={value === LETTERS[i]}
            className={`choice ${value === LETTERS[i] ? "selected" : ""}`}
            onClick={() => onChange(LETTERS[i])}
            disabled={disabled}
          >
            <span className="choice-letter">{LETTERS[i]}</span>
            <MathText text={c} inline />
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="answer-row">
      <input
        ref={ref}
        className="answer-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
        disabled={disabled}
        placeholder="Your answer"
        aria-label="Your answer"
        autoComplete="off"
        spellCheck={false}
      />
      {q.unit && <span className="unit">{q.unit}</span>}
    </div>
  );
}

export function Solution({ q }: { q: Question }) {
  const answer =
    q.style === "mc" && q.choices ? `${q.answer}) ${q.choices[LETTERS.indexOf(q.answer)]}` : q.answer;
  return (
    <div className="solution">
      <div className="solution-answer">
        Answer: <MathText text={answer} inline /> {q.style === "short" && q.unit}
      </div>
      <MathText text={q.solution} />
    </div>
  );
}

export interface CardResult {
  correct: boolean;
  given: string;
  hintsUsed: number;
  ms: number;
}

/** Interactive question with hints, answer checking and a worked solution. */
export function QuestionCard({
  q,
  onDone,
  showTopic = true,
  allowHints = true,
}: {
  q: Question;
  onDone: (r: CardResult) => void;
  showTopic?: boolean;
  allowHints?: boolean;
}) {
  const [value, setValue] = useState("");
  const [hints, setHints] = useState(0);
  const [result, setResult] = useState<null | boolean>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [firstTry, setFirstTry] = useState<null | boolean>(null);
  const started = useRef(Date.now());
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (result === true || showSolution) nextRef.current?.focus();
  }, [result, showSolution]);

  const check = () => {
    if (!value.trim() || result !== null) return;
    const ok = isCorrect(value, q);
    setResult(ok);
    if (firstTry === null) setFirstTry(ok);
  };

  const retry = () => {
    setResult(null);
    setValue("");
  };

  const finish = () =>
    // Only a correct first try counts as correct for progress tracking.
    onDone({ correct: firstTry === true, given: value, hintsUsed: hints, ms: Date.now() - started.current });

  const giveUp = () => {
    setResult(false);
    if (firstTry === null) setFirstTry(false);
    setShowSolution(true);
  };

  return (
    <div className="card question-card">
      <div className="question-meta">
        {showTopic && <span className="pill">{topicById.get(q.topic)?.name}</span>}
        <Stars n={q.difficulty} />
      </div>
      <div className="prompt">
        <MathText text={q.prompt} />
      </div>

      <AnswerInput q={q} value={value} onChange={setValue} onEnter={check} disabled={result !== null} autoFocus />

      {allowHints && hints > 0 && (
        <ol className="hints">
          {q.hints.slice(0, hints).map((h, i) => (
            <li key={i}>
              <MathText text={h} inline />
            </li>
          ))}
        </ol>
      )}

      {result === null ? (
        <div className="actions">
          <button className="btn primary" onClick={check} disabled={!value.trim()}>
            Check
          </button>
          {allowHints && hints < q.hints.length && (
            <button className="btn" onClick={() => setHints(hints + 1)}>
              💡 Hint {q.hints.length > 1 ? `(${hints + 1}/${q.hints.length})` : ""}
            </button>
          )}
          <button className="btn ghost" onClick={giveUp}>
            Show solution
          </button>
        </div>
      ) : (
        <>
          <div className={`feedback ${result ? "good" : "bad"}`} role="status">
            {result
              ? firstTry
                ? "✅ Correct!"
                : "✅ Got it on a retry! (Counts as a miss, so it'll come back for review.)"
              : value.trim() && !showSolution
                ? "❌ Not quite. Try again, take a hint, or look at the solution."
                : "Here's how to solve it."}
          </div>
          {(showSolution || result) && <Solution q={q} />}
          <div className="actions">
            {!result && !showSolution && (
              <>
                <button className="btn" onClick={retry}>
                  Try again
                </button>
                {allowHints && hints < q.hints.length && (
                  <button className="btn" onClick={() => { setHints(hints + 1); retry(); }}>
                    💡 Hint
                  </button>
                )}
                <button className="btn ghost" onClick={() => setShowSolution(true)}>
                  Show solution
                </button>
              </>
            )}
            <button ref={nextRef} className="btn primary" onClick={finish}>
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
