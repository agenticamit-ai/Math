import type { Topic } from "@/content/types";

/** Original contest-style problems written for Math Quest. */
const topic: Topic = {
  slug: "ratio-percent",
  title: "Ratio, proportion, and percent",
  emoji: "⚖️",
  tagline: "Same comparison, three costumes: ratio, fraction, and percent.",
  concept: {
    intro:
      "A ratio says how two amounts compare. A proportion says two ratios match. A percent is a ratio out of 100. Most contest items are the same idea with a new story.",
    ideas: [
      {
        heading: "Parts of a whole",
        body: "In a 3:5 ratio there are 3 + 5 = 8 equal parts. Find one part, then build the piece the question wants.",
      },
      {
        heading: "Scale both sides",
        body: "If 2 cups match 3 cups, then 8 cups match whatever you get by multiplying the other side by the same factor.",
      },
      {
        heading: "Percent as a fraction",
        body: "25% is 1/4, 20% is 1/5, and 10% is 1/10. Convert before you multiply when the percent is friendly.",
      },
    ],
    example: {
      problem: "The ratio of cats to dogs is 2:3. There are 10 cats. How many dogs are there?",
      steps: [
        "2 parts of cats match 10 animals, so 1 part is 10 ÷ 2 = 5.",
        "Dogs are 3 parts: 3 × 5 = 15.",
        "Check: 10:15 simplifies to 2:3.",
      ],
    },
  },
  tricks: [
    {
      title: "Add the parts first",
      detail: "If the question gives a total, add the ratio numbers before you divide.",
    },
    {
      title: "Percent of vs percent off",
      detail: "25% of 40 is 10. A 25% discount means you pay 75%, which is 30, not 10.",
    },
    {
      title: "Undo a percent change",
      detail: "After a 20% increase, the new amount is 120% of the old one. Divide by 1.2, or by 6/5.",
    },
    {
      title: "Unit then scale",
      detail: "Find the amount for 1 hour, 1 inch, or 1 part. Multiply only after that unit is solid.",
    },
  ],
  questions: [
    {
      id: "ratio-percent-1",
      prompt:
        "A recipe uses 2 cups of flour for every 3 cups of oats. Kiaan uses 8 cups of flour. How many cups of oats does he need?",
      answerLabel: "Cups of oats",
      answer: "12",
      difficulty: "warm-up",
      hints: [
        "8 cups of flour is how many times 2 cups?",
        "Multiply the oats by that same factor.",
        "The factor is 4. Use it on the 3 cups of oats.",
      ],
      steps: [
        "8 ÷ 2 = 4, so the recipe is scaled by 4.",
        "Oats: 3 × 4 = 12.",
        "The flour-to-oats ratio 8:12 still simplifies to 2:3.",
      ],
      takeaway: "Scale both parts of a ratio by the same number.",
    },
    {
      id: "ratio-percent-2",
      prompt: "A shirt costs 40 dollars. It is on sale for 25% off. What is the sale price in dollars?",
      answerLabel: "Dollars",
      answer: "30",
      difficulty: "warm-up",
      hints: [
        "25% is the same as 1/4.",
        "Find 1/4 of 40. That is the discount, not the price.",
        "Subtract the discount from 40.",
      ],
      steps: [
        "25% of 40 = 10, the amount off.",
        "40 − 10 = 30.",
        "The sale price is 30 dollars.",
      ],
      takeaway: "Percent off is a subtraction. The percent itself is not the price.",
    },
    {
      id: "ratio-percent-3",
      prompt:
        "The ratio of red marbles to blue marbles is 3:5. There are 24 marbles in all. How many are blue?",
      answerLabel: "Blue marbles",
      answer: "15",
      difficulty: "practice",
      hints: [
        "The parts are 3 + 5. That total has to match 24 marbles.",
        "Find the value of one part.",
        "Blue gets 5 of those parts.",
      ],
      steps: [
        "3 + 5 = 8 parts.",
        "24 ÷ 8 = 3 marbles per part.",
        "Blue: 5 × 3 = 15.",
      ],
      takeaway: "When you know the whole, add the ratio parts before you split.",
    },
    {
      id: "ratio-percent-4",
      prompt:
        "A car travels 150 miles in 3 hours at a steady speed. At that same speed, how many miles does it travel in 5 hours?",
      answerLabel: "Miles",
      answer: "250",
      difficulty: "practice",
      hints: [
        "Find the miles for 1 hour first.",
        "150 ÷ 3 is the unit rate.",
        "Multiply that hourly distance by 5.",
      ],
      steps: [
        "150 ÷ 3 = 50 miles each hour.",
        "In 5 hours: 50 × 5 = 250.",
        "The rate stayed the same, so the proportion 150/3 = 250/5 holds.",
      ],
      takeaway: "Unit rate, then multiply. Do not add 2 hours onto 150.",
    },
    {
      id: "ratio-percent-5",
      prompt: "15 is what percent of 60?",
      answerLabel: "The percent, without a percent sign",
      answer: "25",
      acceptableAnswers: ["25%"],
      difficulty: "practice",
      hints: [
        "Write the fraction 15/60 and simplify it.",
        "15/60 = 1/4.",
        "1/4 of 100% is the percent you want.",
      ],
      steps: [
        "15/60 = 1/4.",
        "1/4 = 25/100.",
        "So 15 is 25% of 60.",
      ],
      takeaway: "Part ÷ whole, then convert the fraction to a percent.",
    },
    {
      id: "ratio-percent-6",
      prompt:
        "A map uses 1 inch for every 8 miles. Two towns are 3 and 1/2 inches apart on the map. How many miles apart are the towns?",
      answerLabel: "Miles",
      answer: "28",
      difficulty: "practice",
      hints: [
        "3 and 1/2 is 3.5, or 7/2.",
        "Each inch stands for 8 miles, so multiply the inches by 8.",
        "3 × 8 is 24. Half an inch is another 4 miles.",
      ],
      steps: [
        "3 inches stand for 3 × 8 = 24 miles.",
        "1/2 inch stands for 4 miles.",
        "24 + 4 = 28 miles.",
      ],
      takeaway: "Split a mixed number into the whole part and the fraction part.",
    },
    {
      id: "ratio-percent-7",
      prompt:
        "After a 20% increase, a plant is 18 cm tall. How many centimeters tall was it before the increase?",
      answerLabel: "Centimeters",
      answer: "15",
      difficulty: "stretch",
      hints: [
        "A 20% increase means the new height is 120% of the old height.",
        "120% is the same as 6/5. So 6/5 of the old height is 18.",
        "If 6 parts equal 18, one part is 3. The old height is 5 of those parts.",
      ],
      steps: [
        "New height = 1.2 × old height = 18.",
        "Old height = 18 ÷ 1.2.",
        "18 ÷ 1.2 = 15, and 15 × 1.2 = 18.",
      ],
      takeaway: "To undo a 20% increase, divide by 1.2. Do not subtract 20% of 18.",
    },
    {
      id: "ratio-percent-8",
      prompt: "A class has 30 students. 40% of them are in band. How many students are in band?",
      answerLabel: "Students",
      answer: "12",
      difficulty: "warm-up",
      hints: [
        "40% is 4/10, which simplifies to 2/5.",
        "Find 1/5 of 30 first.",
        "Band is 2 of those fifths.",
      ],
      steps: [
        "10% of 30 is 3.",
        "40% is 4 × 3 = 12.",
        "12 students are in band.",
      ],
      takeaway: "10% is a handy stepping stone to 20%, 30%, and 40%.",
    },
  ],
};

export default topic;
