import { Link } from "react-router-dom";
import { questions, strands, topics } from "../data";
import { dayKey, mistakes, progress, streak, topicStats, useProgress } from "../lib/progress";
import { useState } from "react";

export function Home() {
  const data = useProgress();
  const [name, setName] = useState("");
  const stats = topicStats(data);
  const today = data.attempts.filter((a) => dayKey(new Date(a.at)) === dayKey(new Date()));
  const miss = mistakes(data);

  // Suggest the weakest topic that has been started, else the first new one.
  const started = topics.filter((t) => (stats.get(t.id)?.attempts ?? 0) > 0);
  const suggestion =
    started.filter((t) => stats.get(t.id)!.level !== "mastered").sort((a, b) => stats.get(a.id)!.recent - stats.get(b.id)!.recent)[0] ??
    topics.find((t) => stats.get(t.id)?.level === "new") ??
    topics[0];

  if (!data.name) {
    return (
      <div className="card welcome">
        <h1>👋 Welcome to Math Olympiad Prep!</h1>
        <p>Practice for MOEMS and CML with lessons, hints, quizzes and timed mock tests.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim()) progress.setName(name.trim());
          }}
        >
          <label>
            What's your name?{" "}
            <input className="answer-input" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          </label>{" "}
          <button className="btn primary" disabled={!name.trim()}>
            Let's go
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="stack">
      <h1>Hi {data.name}! 👋</h1>
      <div className="tiles">
        <div className="tile">
          <div className="tile-value">🔥 {streak(data)}</div>
          <div className="tile-label">day streak</div>
        </div>
        <div className="tile">
          <div className="tile-value">{today.length}</div>
          <div className="tile-label">problems today</div>
        </div>
        <div className="tile">
          <div className="tile-value">
            {[...stats.values()].filter((s) => s.level === "mastered").length} / {topics.length}
          </div>
          <div className="tile-label">topics mastered</div>
        </div>
      </div>

      <div className="grid-2">
        {suggestion && (
          <Link to={`/practice/${suggestion.id}`} className="card action-card">
            <div className="action-emoji">🎯</div>
            <h3>Practice: {suggestion.name}</h3>
            <p>{started.length ? "Your suggested topic to work on next." : "A good place to start!"}</p>
          </Link>
        )}
        <Link to="/quiz" className="card action-card">
          <div className="action-emoji">⚡</div>
          <h3>Quick quiz</h3>
          <p>Mixed problems from any topics you choose.</p>
        </Link>
        <Link to="/test" className="card action-card">
          <div className="action-emoji">⏱️</div>
          <h3>Mock test</h3>
          <p>A timed MOEMS or CML-style contest.</p>
        </Link>
        <Link to="/review" className="card action-card">
          <div className="action-emoji">🔁</div>
          <h3>Retry mistakes</h3>
          <p>{miss.length ? `${miss.length} problem${miss.length === 1 ? "" : "s"} to try again.` : "No mistakes waiting. Nice!"}</p>
        </Link>
      </div>

      <h2>Topics</h2>
      <div className="strand-grid">
        {strands.map((s) => {
          const ts = s.topics.map((t) => stats.get(t.id)!);
          const mastered = ts.filter((t) => t.level === "mastered").length;
          return (
            <Link key={s.strand} to={`/topics#${s.strand}`} className="card strand-card">
              <h3>{s.name}</h3>
              <div className="meter" aria-label={`${mastered} of ${s.topics.length} mastered`}>
                <div style={{ width: `${(mastered / s.topics.length) * 100}%` }} />
              </div>
              <p className="muted">
                {mastered} / {s.topics.length} mastered · {questions.filter((q) => q.topic.startsWith(s.strand + "-")).length} problems
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
