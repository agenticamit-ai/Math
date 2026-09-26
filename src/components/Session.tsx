import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { lastAttemptCorrect, progress, type Mode } from "../lib/progress";
import { nextAdaptive } from "../lib/select";
import type { Question } from "../types";
import { MathText } from "./MathText";
import { QuestionCard, Stars, type CardResult } from "./QuestionCard";

interface Done {
  q: Question;
  r: CardResult;
}

/**
 * Runs a set of questions one at a time. With `adaptive`, the next question is
 * chosen from `pool` based on how the last one went; otherwise `pool` is used
 * in order.
 */
export function Session({
  pool,
  mode,
  length,
  adaptive = false,
  startDifficulty = 2,
  showTopic = true,
  onRestart,
}: {
  pool: Question[];
  mode: Mode;
  length: number;
  adaptive?: boolean;
  startDifficulty?: number;
  showTopic?: boolean;
  onRestart?: () => void;
}) {
  const total = Math.min(length, pool.length);
  const lastCorrect = useRef(lastAttemptCorrect(progress.get())).current;
  const [done, setDone] = useState<Done[]>([]);
  const [target, setTarget] = useState(startDifficulty);

  const current = useMemo(() => {
    if (done.length >= total) return undefined;
    if (!adaptive) return pool[done.length];
    return nextAdaptive(pool, new Set(done.map((d) => d.q.id)), target, lastCorrect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done.length]);

  const onDone = (r: CardResult) => {
    if (!current) return;
    progress.record({ qid: current.id, mode, ...r });
    setDone([...done, { q: current, r }]);
    setTarget((t) => Math.max(1, Math.min(5, t + (r.correct ? 1 : -1))));
  };

  if (!current) {
    const right = done.filter((d) => d.r.correct).length;
    return (
      <div className="card summary">
        <h2>
          {right === done.length ? "🏆 Perfect!" : right >= done.length * 0.7 ? "🎉 Great work!" : "💪 Good practice!"}
        </h2>
        <p className="big-score">
          {right} / {done.length} correct on the first try
        </p>
        <ul className="summary-list">
          {done.map(({ q, r }) => (
            <li key={q.id} className={r.correct ? "good" : "bad"}>
              <span>{r.correct ? "✅" : "❌"}</span>
              <span className="summary-prompt">
                <MathText text={q.prompt.split("\n")[0]} inline />
              </span>
              <Stars n={q.difficulty} />
            </li>
          ))}
        </ul>
        <div className="actions">
          {onRestart && (
            <button className="btn primary" onClick={onRestart}>
              Go again
            </button>
          )}
          <Link className="btn" to="/review">
            Retry mistakes
          </Link>
          <Link className="btn ghost" to="/">
            Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="session-bar">
        <span>
          Question {done.length + 1} of {total}
        </span>
        <div className="dots" aria-hidden>
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className={`dot ${i < done.length ? (done[i].r.correct ? "good" : "bad") : i === done.length ? "now" : ""}`}
            />
          ))}
        </div>
      </div>
      <QuestionCard key={current.id} q={current} onDone={onDone} showTopic={showTopic} />
    </div>
  );
}
