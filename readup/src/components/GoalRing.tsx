export function GoalRing({ minutes, goal }: { minutes: number; goal: number }) {
  const frac = Math.min(1, goal > 0 ? minutes / goal : 0);
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90" role="img" aria-label={`${Math.round(minutes)} of ${goal} minutes today`}>
        <circle cx="40" cy="40" r={r} fill="none" stroke="#E6E0D4" strokeWidth="8" />
        <circle cx="40" cy="40" r={r} fill="none" stroke={frac >= 1 ? "#2E7D4F" : "#2F6F6A"} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${c * frac} ${c}`} />
      </svg>
      <div>
        <p className="text-2xl font-bold tabular-nums">
          {Math.round(minutes)}<span className="text-base font-semibold text-muted">/{goal} min</span>
        </p>
        <p className="text-sm text-muted">{frac >= 1 ? "Goal reached today!" : "Today's goal"}</p>
      </div>
    </div>
  );
}
