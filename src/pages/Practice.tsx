import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Session } from "../components/Session";
import { questions, topicById } from "../data";
import { mistakes, progress, topicStats, useProgress } from "../lib/progress";

export function Practice() {
  const { id = "" } = useParams();
  const topic = topicById.get(id);
  const [run, setRun] = useState(0);
  if (!topic) return <p>Topic not found.</p>;
  const pool = questions.filter((q) => q.topic === id);
  const st = topicStats(progress.get()).get(id)!;
  // Start harder for kids who are already doing well on this topic.
  const start = st.level === "mastered" ? 4 : st.level === "practicing" ? 3 : 2;
  return (
    <div className="stack">
      <Link to={`/topic/${id}`} className="muted">
        ← {topic.name} lesson
      </Link>
      <h1>{topic.name}</h1>
      <Session
        key={run}
        pool={pool}
        mode="practice"
        length={8}
        adaptive
        startDifficulty={start}
        showTopic={false}
        onRestart={() => setRun(run + 1)}
      />
    </div>
  );
}

export function Review() {
  const data = useProgress();
  const [snapshot, setSnapshot] = useState(() => mistakes(data));
  const [run, setRun] = useState(0);
  const pool = snapshot.map((id) => questions.find((q) => q.id === id)!).filter(Boolean);
  return (
    <div className="stack">
      <h1>Retry mistakes</h1>
      {pool.length === 0 ? (
        <div className="card">
          <p>🎉 No mistakes to review. Every problem you've tried, you got right on your last try!</p>
          <Link to="/topics" className="btn primary">
            Practice a topic
          </Link>
        </div>
      ) : (
        <>
          <p className="muted">Problems you missed last time. Get one right and it leaves this list.</p>
          <Session
            key={run}
            pool={pool}
            mode="review"
            length={10}
            onRestart={() => {
              setSnapshot(mistakes(progress.get()));
              setRun(run + 1);
            }}
          />
        </>
      )}
    </div>
  );
}
