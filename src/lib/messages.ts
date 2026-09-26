const CORRECT = [
  "Yes! You found it.",
  "That's the one.",
  "Contest brain: activated.",
  "Clean work, Kiaan.",
  "You stayed with it. Nice.",
];

const WRONG = [
  "Not yet — edit it and try again.",
  "Good attempt. Check what the question is asking for.",
  "Close enough to learn from. Peek at the next hint if you want.",
  "The path is still open. Adjust one step.",
];

export function correctMessage(seed: number): string {
  return CORRECT[Math.abs(seed) % CORRECT.length];
}

export function wrongMessage(seed: number): string {
  return WRONG[Math.abs(seed) % WRONG.length];
}

export function difficultyLabel(difficulty: "warm-up" | "practice" | "stretch"): string {
  if (difficulty === "warm-up") return "Warm-up";
  if (difficulty === "stretch") return "Stretch";
  return "Practice";
}
