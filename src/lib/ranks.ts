export type Rank = {
  level: number;
  name: string;
  emoji: string;
  min: number;
  next: number | null;
  current: number;
  intoNext: number;
};

const OVERALL = [
  { min: 0, name: "Seedling", emoji: "🌱" },
  { min: 40, name: "Explorer", emoji: "🧭" },
  { min: 100, name: "Pathfinder", emoji: "🗺️" },
  { min: 180, name: "Solver", emoji: "🧩" },
  { min: 280, name: "Strategist", emoji: "🎯" },
  { min: 420, name: "Champion", emoji: "🏆" },
  { min: 600, name: "Math Master", emoji: "🌟" },
];

const TOPIC = [
  { min: 0, name: "Seedling", emoji: "🌱" },
  { min: 15, name: "Explorer", emoji: "🧭" },
  { min: 40, name: "Pathfinder", emoji: "🗺️" },
  { min: 70, name: "Solver", emoji: "🧩" },
  { min: 110, name: "Strategist", emoji: "🎯" },
  { min: 160, name: "Champion", emoji: "🏆" },
  { min: 220, name: "Math Master", emoji: "🌟" },
];

export function rankFor(xp: number, scale: "overall" | "topic"): Rank {
  const table = scale === "overall" ? OVERALL : TOPIC;
  let index = 0;
  for (let i = 0; i < table.length; i += 1) {
    if (xp >= table[i].min) index = i;
  }
  const current = table[index];
  const upcoming = table[index + 1];
  const next = upcoming ? upcoming.min : null;
  const span = next === null ? 1 : next - current.min;
  const intoNext = next === null ? 1 : Math.min(1, (xp - current.min) / span);
  return {
    level: index + 1,
    name: current.name,
    emoji: current.emoji,
    min: current.min,
    next,
    current: xp,
    intoNext,
  };
}
