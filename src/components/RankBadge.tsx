import { rankFor } from "@/lib/ranks";

export function RankBadge({
  xp,
  scale,
  compact = false,
}: {
  xp: number;
  scale: "overall" | "topic";
  compact?: boolean;
}) {
  const rank = rankFor(xp, scale);
  const percent = Math.round(rank.intoNext * 100);

  return (
    <div className={compact ? "min-w-0" : "min-w-[220px]"}>
      <p className="font-display text-xl text-ink sm:text-2xl">
        <span aria-hidden>{rank.emoji} </span>
        Level {rank.level} · {rank.name}
      </p>
      <div
        className="mt-2 h-3 overflow-hidden rounded-full bg-[#f3e2d2]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={`${rank.name} progress`}
      >
        <div className="h-full rounded-full bg-coral" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-1 text-base text-cocoa">
        {rank.next === null ? "Top rank on this path." : `${rank.next - xp} XP to the next rank`}
        <span className="sr-only">. {xp} XP so far.</span>
      </p>
    </div>
  );
}
