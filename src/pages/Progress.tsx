import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { strands } from "../data";
import { dayKey, mistakes, progress, streak, topicStats, useProgress, type ProgressData } from "../lib/progress";
import { LEVEL_LABEL } from "./Topics";

function ActivityChart({ data }: { data: ProgressData }) {
  const [hover, setHover] = useState<number | null>(null);
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const key = dayKey(d);
    const list = data.attempts.filter((a) => dayKey(new Date(a.at)) === key);
    return { d, total: list.length, correct: list.filter((a) => a.correct).length };
  });
  const max = Math.max(5, ...days.map((d) => d.total));
  const W = 560, H = 160, pad = 24, slot = (W - pad) / days.length, bw = Math.min(24, slot * 0.6);
  const y = (v: number) => H - pad - (v / max) * (H - pad * 2);

  return (
    <div className="chart" onMouseLeave={() => setHover(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Problems solved per day, last 14 days">
        {[0, Math.round(max / 2), max].map((v) => (
          <g key={v}>
            <line x1={pad} x2={W} y1={y(v)} y2={y(v)} className="grid" />
            <text x={pad - 6} y={y(v) + 4} className="axis" textAnchor="end">
              {v}
            </text>
          </g>
        ))}
        {days.map((d, i) => {
          const x = pad + i * slot + (slot - bw) / 2;
          const h = H - pad - y(d.total);
          const r = Math.min(4, h);
          return (
            <g key={i} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} tabIndex={0}>
              <rect x={pad + i * slot} y={0} width={slot} height={H} fill="transparent" />
              {d.total > 0 && (
                <path
                  className={`bar ${hover === i ? "hot" : ""}`}
                  d={`M${x},${H - pad} V${y(d.total) + r} q0,-${r} ${r},-${r} H${x + bw - r} q${r},0 ${r},${r} V${H - pad} Z`}
                />
              )}
              {(i % 2 === 1 || i === 13) && (
                <text x={x + bw / 2} y={H - 6} className="axis" textAnchor="middle">
                  {i === 13 ? "Today" : d.d.toLocaleDateString(undefined, { month: "numeric", day: "numeric" })}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {hover !== null && (
        <div
          className="tooltip"
          style={{
            left: `${Math.min(88, Math.max(12, ((pad + hover * slot + slot / 2) / W) * 100))}%`,
            top: `${(y(days[hover].total) / H) * 100}%`,
          }}
        >
          <strong>{days[hover].d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</strong>
          <br />
          {days[hover].total} problems · {days[hover].correct} correct
        </div>
      )}
    </div>
  );
}

export function Progress() {
  const data = useProgress();
  const stats = topicStats(data);
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [message, setMessage] = useState("");
  const correct = data.attempts.filter((a) => a.correct).length;
  const weakest = strands
    .flatMap((s) => s.topics)
    .filter((t) => stats.get(t.id)!.attempts >= 3 && stats.get(t.id)!.level !== "mastered")
    .sort((a, b) => stats.get(a.id)!.recent - stats.get(b.id)!.recent)
    .slice(0, 3);

  const download = () => {
    const blob = new Blob([progress.exportJson()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `math-progress-${dayKey(new Date())}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const upload = async (f: File) => {
    try {
      progress.importJson(await f.text());
      setMessage("Progress restored from backup.");
    } catch (e) {
      setMessage(`Couldn't restore: ${(e as Error).message}`);
    }
  };

  return (
    <div className="stack">
      <h1>{data.name ? `${data.name}'s progress` : "Progress"}</h1>
      <div className="tiles">
        <div className="tile">
          <div className="tile-value">{data.attempts.length}</div>
          <div className="tile-label">problems tried</div>
        </div>
        <div className="tile">
          <div className="tile-value">{data.attempts.length ? Math.round((correct / data.attempts.length) * 100) : 0}%</div>
          <div className="tile-label">first-try accuracy</div>
        </div>
        <div className="tile">
          <div className="tile-value">🔥 {streak(data)}</div>
          <div className="tile-label">day streak</div>
        </div>
        <div className="tile">
          <div className="tile-value">{data.tests.length}</div>
          <div className="tile-label">mock tests</div>
        </div>
      </div>

      <div className="card">
        <h3>Problems per day</h3>
        <ActivityChart data={data} />
      </div>

      {weakest.length > 0 && (
        <div className="card">
          <h3>Focus next on</h3>
          <div className="actions">
            {weakest.map((t) => (
              <Link key={t.id} to={`/practice/${t.id}`} className="btn">
                {t.name} ({Math.round(stats.get(t.id)!.recent * 100)}%)
              </Link>
            ))}
            {mistakes(data).length > 0 && (
              <Link to="/review" className="btn primary">
                Retry {mistakes(data).length} mistakes
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="card">
        <h3>Topic mastery</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Status</th>
              <th className="num">Tried</th>
              <th>Recent accuracy</th>
            </tr>
          </thead>
          {strands.map((s) => (
            <tbody key={s.strand}>
              <tr className="group">
                <th colSpan={4}>{s.name}</th>
              </tr>
              {s.topics.map((t) => {
                const st = stats.get(t.id)!;
                return (
                  <tr key={t.id}>
                    <td>
                      <Link to={`/topic/${t.id}`}>{t.name}</Link>
                    </td>
                    <td>
                      <span className={`level level-${st.level}`}>{LEVEL_LABEL[st.level]}</span>
                    </td>
                    <td className="num">{st.attempts}</td>
                    <td>
                      {st.attempts > 0 && (
                        <div className="acc">
                          <div className="meter">
                            <div style={{ width: `${st.recent * 100}%` }} />
                          </div>
                          <span>{Math.round(st.recent * 100)}%</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ))}
        </table>
        <p className="muted small">
          Mastered = at least 6 tries with 80%+ right on the last 10. Only first tries count.
        </p>
      </div>

      <div className="card">
        <h3>Backup</h3>
        <p className="muted">
          Progress is saved in this browser. Download a backup now and then, or to move to another computer.
        </p>
        <div className="actions">
          <button className="btn" onClick={download}>
            ⬇ Download backup
          </button>
          <button className="btn" onClick={() => fileRef.current?.click()}>
            ⬆ Restore from backup
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => {
              if (e.target.files?.[0]) upload(e.target.files[0]);
              e.target.value = "";
            }}
          />
          {confirmReset ? (
            <>
              <span className="danger-text">Erase all progress? This can't be undone.</span>
              <button
                className="btn danger"
                onClick={() => {
                  progress.reset();
                  setConfirmReset(false);
                  setMessage("All progress erased.");
                }}
              >
                Yes, erase
              </button>
              <button className="btn ghost" onClick={() => setConfirmReset(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button className="btn ghost danger" onClick={() => setConfirmReset(true)}>
              Reset everything
            </button>
          )}
        </div>
        {message && (
          <p className="muted" role="status">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
