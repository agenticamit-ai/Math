import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MathText } from "../components/MathText";
import { questions, topicById } from "../data";
import { topicStats, useProgress } from "../lib/progress";
import { LEVEL_LABEL } from "./Topics";

export function TopicPage() {
  const { id = "" } = useParams();
  const topic = topicById.get(id);
  const st = topicStats(useProgress()).get(id);
  const [open, setOpen] = useState<Set<number>>(new Set());
  if (!topic || !st) return <p>Topic not found. <Link to="/topics">Back to topics</Link></p>;
  const count = questions.filter((q) => q.topic === id).length;

  return (
    <div className="stack">
      <Link to={`/topics#${topic.strand.strand}`} className="muted">
        ← {topic.strand.name}
      </Link>
      <h1>{topic.name}</h1>
      <span className={`level level-${st.level}`}>{LEVEL_LABEL[st.level]}</span>

      <div className="card lesson">
        <MathText text={topic.lesson.intro} />
        <h3>Key ideas</h3>
        <ul>
          {topic.lesson.keyIdeas.map((k, i) => (
            <li key={i}>
              <MathText text={k} inline />
            </li>
          ))}
        </ul>
        <h3>Worked examples</h3>
        {topic.lesson.examples.map((ex, i) => (
          <div key={i} className="example">
            <div className="example-label">Example {i + 1}</div>
            <MathText text={ex.problem} />
            {open.has(i) ? (
              <div className="solution">
                <MathText text={ex.solution} />
              </div>
            ) : (
              <button className="btn ghost" onClick={() => setOpen(new Set(open).add(i))}>
                Try it yourself first, then show the solution
              </button>
            )}
          </div>
        ))}
        <div className="tip">
          <strong>🏅 Contest tip:</strong> <MathText text={topic.lesson.tip} inline />
        </div>
      </div>

      <div className="actions">
        <Link to={`/practice/${id}`} className="btn primary big">
          Practice {count} problems →
        </Link>
      </div>
    </div>
  );
}
