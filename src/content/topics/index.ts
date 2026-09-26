import type { Topic } from "@/content/types";
import algebra from "@/content/topics/algebra";
import counting from "@/content/topics/counting";
import geometry from "@/content/topics/geometry";
import numberSense from "@/content/topics/number-sense";
import ratioPercent from "@/content/topics/ratio-percent";
import wordProblems from "@/content/topics/word-problems";

export const topics: Topic[] = [
  numberSense,
  ratioPercent,
  algebra,
  geometry,
  counting,
  wordProblems,
];

export function getTopic(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug);
}

export function getAllQuestions(): { topic: Topic; question: Topic["questions"][number] }[] {
  return topics.flatMap((topic) => topic.questions.map((question) => ({ topic, question })));
}
