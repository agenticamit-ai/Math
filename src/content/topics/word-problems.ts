import type { Topic } from "@/content/types";

/** Original contest-style problems written for Math Quest. */
const topic: Topic = {
  slug: "word-problems",
  title: "Word problems & contest strategy",
  emoji: "🗺️",
  tagline: "Read for the question mark, then pick a path.",
  concept: {
    intro:
      "Contest word problems hide a small piece of arithmetic inside a story. The winning move is often to decide what is extra, what to do backward, and what the answer unit should be.",
    ideas: [
      {
        heading: "Name the target",
        body: "Before any calculation, write what you are finding: pages left, boys, minutes, cents. If your answer is a different kind of thing, it is not done.",
      },
      {
        heading: "Work backward",
        body: "If someone added and then divided, you undo in reverse: multiply, then subtract.",
      },
      {
        heading: "Ignore decorations",
        body: "A fence’s height does not change a garden’s area. Cross out numbers the question never uses.",
      },
    ],
    example: {
      problem: "Kiaan doubled a number and then subtracted 3. He got 11. What was the number?",
      steps: [
        "Undo the last step: 11 + 3 = 14.",
        "Undo the doubling: 14 ÷ 2 = 7.",
        "Check forward: 7 × 2 − 3 = 11.",
      ],
    },
  },
  tricks: [
    {
      title: "Underline the ask",
      detail: "Circle the last sentence. That is the only thing your answer has to be.",
    },
    {
      title: "Draw a bar",
      detail: "“3 times as many” is three bars against one bar. Together, four bars equal the total.",
    },
    {
      title: "Clock chunks",
      detail: "Jump to the next hour, then add the extra minutes. 2:40 to 4:00 is 80 minutes.",
    },
    {
      title: "One friendly rewrite",
      detail: "19 × 21 is (20 − 1)(20 + 1) = 400 − 1. Look for a neighbor of a round number.",
    },
  ],
  questions: [
    {
      id: "word-problems-1",
      prompt:
        "Kiaan thought of a number, added 9, then divided by 2, and got 8. What was the number?",
      answerLabel: "The starting number",
      answer: "7",
      difficulty: "warm-up",
      hints: [
        "The last step was “divided by 2.” Undo that first.",
        "8 × 2 is the number he had after adding 9.",
        "Subtract 9 to get back to the start.",
      ],
      steps: [
        "Before dividing, the number was 8 × 2 = 16.",
        "Before adding 9, the number was 16 − 9 = 7.",
        "Check: 7 + 9 = 16, and 16 ÷ 2 = 8.",
      ],
      takeaway: "Undo a story from the end back to the beginning.",
    },
    {
      id: "word-problems-2",
      prompt:
        "A book has 120 pages. Kiaan read 1/4 of the book on Monday and 30 pages on Tuesday. How many pages are left?",
      answerLabel: "Pages left",
      answer: "60",
      difficulty: "practice",
      hints: [
        "1/4 of 120 is Monday’s reading. Find that first.",
        "Add Tuesday’s 30 pages to Monday’s pages.",
        "Subtract the total read from 120.",
      ],
      steps: [
        "Monday: 120 ÷ 4 = 30 pages.",
        "Monday and Tuesday: 30 + 30 = 60 pages read.",
        "120 − 60 = 60 pages left.",
      ],
      takeaway: "Find each piece that was used, add those, then subtract from the start.",
    },
    {
      id: "word-problems-3",
      prompt:
        "Pencils cost 35 cents each. Markers cost 90 cents each. Kiaan buys 4 pencils and 2 markers. How many cents does he spend?",
      answerLabel: "Cents",
      answer: "320",
      difficulty: "practice",
      hints: [
        "Find the pencil total and the marker total separately.",
        "4 × 35 can be 4 × 30 plus 4 × 5.",
        "Add the two totals. Stay in cents.",
      ],
      steps: [
        "Pencils: 4 × 35 = 140 cents.",
        "Markers: 2 × 90 = 180 cents.",
        "140 + 180 = 320 cents.",
      ],
      takeaway: "Same-unit totals can be added. Do not add 35 and 90 before you know how many of each.",
    },
    {
      id: "word-problems-4",
      prompt: "There are 28 students. There are 4 more girls than boys. How many boys are there?",
      answerLabel: "Boys",
      answer: "12",
      difficulty: "stretch",
      hints: [
        "If you remove the “4 extra” girls, the two groups match.",
        "28 − 4 = 24 students split evenly between boys and the rest of the girls.",
        "Half of 24 is the number of boys. The girls are that number plus 4.",
      ],
      steps: [
        "Let the number of boys be b. Girls = b + 4.",
        "b + (b + 4) = 28, so 2b + 4 = 28.",
        "2b = 24, so b = 12. Girls = 16, and 16 − 12 = 4.",
      ],
      takeaway: "Peel off the extra, then split the rest in half.",
    },
    {
      id: "word-problems-5",
      prompt: "A train leaves at 2:40 pm and arrives at 4:05 pm. How many minutes long is the trip?",
      answerLabel: "Minutes",
      answer: "85",
      difficulty: "practice",
      hints: [
        "First count from 2:40 to 4:00.",
        "That chunk is 1 hour and 20 minutes, which is 80 minutes.",
        "Then add the 5 minutes from 4:00 to 4:05.",
      ],
      steps: [
        "2:40 to 4:00 is 80 minutes.",
        "4:00 to 4:05 is 5 minutes.",
        "80 + 5 = 85 minutes.",
      ],
      takeaway: "Land on the hour, then add the leftover minutes.",
    },
    {
      id: "word-problems-6",
      prompt: "What is 19 × 21?",
      answerLabel: "A whole number",
      answer: "399",
      difficulty: "practice",
      hints: [
        "19 and 21 are both neighbors of 20.",
        "19 × 21 = (20 − 1)(20 + 1).",
        "That pattern equals 20² − 1².",
      ],
      steps: [
        "(20 − 1)(20 + 1) = 20² − 1².",
        "400 − 1 = 399.",
        "So 19 × 21 = 399.",
      ],
      takeaway: "Numbers one step on either side of a round number multiply to one less than that square.",
    },
    {
      id: "word-problems-7",
      prompt:
        "A garden is 12 feet long and 5 feet wide. A fence around it is 3 feet tall. What is the area of the garden in square feet?",
      answerLabel: "Square feet",
      answer: "60",
      difficulty: "warm-up",
      hints: [
        "The question asks for area, not the fence.",
        "Area of a rectangle is length × width.",
        "The 3-foot height is extra information.",
      ],
      steps: [
        "The garden is a 12 by 5 rectangle.",
        "12 × 5 = 60.",
        "The fence height is not used. The area is 60 square feet.",
      ],
      takeaway: "Cross out numbers that do not belong to the quantity you were asked for.",
    },
    {
      id: "word-problems-8",
      prompt:
        "Kiaan has 3 times as many stickers as his sister. Together they have 48 stickers. How many stickers does Kiaan have?",
      answerLabel: "Kiaan's stickers",
      answer: "36",
      difficulty: "stretch",
      hints: [
        "Draw 1 bar for his sister and 3 bars for Kiaan.",
        "Together that is 4 equal bars, and they total 48.",
        "One bar is the sister’s amount. Kiaan has 3 bars.",
      ],
      steps: [
        "4 equal parts total 48, so one part is 12.",
        "The sister has 12 stickers.",
        "Kiaan has 3 × 12 = 36. Check: 36 + 12 = 48.",
      ],
      takeaway: "“3 times as many, together” is 4 parts, and the larger share is 3 of them.",
    },
  ],
};

export default topic;
