import { useState } from "react";
import { Session } from "../components/Session";
import { questions, strands } from "../data";
import { buildQuiz } from "../lib/select";
import type { Question } from "../types";

export function Quiz() {
  const [picked, setPicked] = useState<Set<string>>(() => new Set(strands.flatMap((s) => s.topics.map((t) => t.id))));
  const [count, setCount] = useState(10);
  const [range, setRange] = useState<[number, number]>([1, 5]);
  const [quiz, setQuiz] = useState<Question[] | null>(null);
  const [run, setRun] = useState(0);

  const available = questions.filter(
    (q) => picked.has(q.topic) && q.difficulty >= range[0] && q.difficulty <= range[1],
  ).length;

  const start = () => {
    setQuiz(buildQuiz({ topicIds: [...picked], count, minDifficulty: range[0], maxDifficulty: range[1] }));
    setRun(run + 1);
  };

  if (quiz) {
    return (
      <div className="stack">
        <h1>Quick quiz</h1>
        <Session key={run} pool={quiz} mode="quiz" length={quiz.length} onRestart={start} />
        <button className="btn ghost" onClick={() => setQuiz(null)}>
          ← Change quiz settings
        </button>
      </div>
    );
  }

  const toggle = (ids: string[], on: boolean) => {
    const next = new Set(picked);
    ids.forEach((id) => (on ? next.add(id) : next.delete(id)));
    setPicked(next);
  };

  return (
    <div className="stack">
      <h1>Quick quiz</h1>
      <div className="card">
        <h3>Topics</h3>
        <div className="actions">
          <button className="btn small" onClick={() => toggle(strands.flatMap((s) => s.topics.map((t) => t.id)), true)}>
            All
          </button>
          <button className="btn small" onClick={() => setPicked(new Set())}>
            None
          </button>
        </div>
        <div className="topic-picker">
          {strands.map((s) => {
            const ids = s.topics.map((t) => t.id);
            const all = ids.every((id) => picked.has(id));
            return (
              <fieldset key={s.strand}>
                <legend>
                  <label>
                    <input type="checkbox" checked={all} onChange={(e) => toggle(ids, e.target.checked)} /> {s.name}
                  </label>
                </legend>
                {s.topics.map((t) => (
                  <label key={t.id} className="check">
                    <input type="checkbox" checked={picked.has(t.id)} onChange={(e) => toggle([t.id], e.target.checked)} />{" "}
                    {t.name}
                  </label>
                ))}
              </fieldset>
            );
          })}
        </div>

        <h3>Settings</h3>
        <div className="settings-row">
          <label>
            Questions{" "}
            <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
              {[5, 10, 15, 20].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </label>
          <label>
            Difficulty{" "}
            <select
              value={range.join("-")}
              onChange={(e) => setRange(e.target.value.split("-").map(Number) as [number, number])}
            >
              <option value="1-5">All levels</option>
              <option value="1-2">★–★★ Warm-up</option>
              <option value="2-3">★★–★★★ Contest level</option>
              <option value="3-4">★★★–★★★★ Challenging</option>
              <option value="4-5">★★★★–★★★★★ Hardest</option>
            </select>
          </label>
        </div>
        <p className="muted">{available} problems match.</p>
        <button className="btn primary big" disabled={available === 0} onClick={start}>
          Start quiz
        </button>
      </div>
    </div>
  );
}
