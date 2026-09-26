import { Link } from "react-router-dom";
import { questions, strands } from "../data";
import { topicStats, useProgress, type MasteryLevel } from "../lib/progress";

export const LEVEL_LABEL: Record<MasteryLevel, string> = {
  new: "Not started",
  learning: "Learning",
  practicing: "Practicing",
  mastered: "Mastered ⭐",
};

export function Topics() {
  const stats = topicStats(useProgress());
  return (
    <div className="stack">
      <h1>Topics</h1>
      {strands.map((s) => (
        <section key={s.strand} id={s.strand}>
          <h2>{s.name}</h2>
          <p className="muted">{s.description}</p>
          <div className="topic-grid">
            {s.topics.map((t) => {
              const st = stats.get(t.id)!;
              return (
                <Link key={t.id} to={`/topic/${t.id}`} className="card topic-card">
                  <h3>{t.name}</h3>
                  <span className={`level level-${st.level}`}>{LEVEL_LABEL[st.level]}</span>
                  <p className="muted small">
                    {questions.filter((q) => q.topic === t.id).length} problems
                    {st.attempts > 0 && ` · ${Math.round(st.recent * 100)}% recently`}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
