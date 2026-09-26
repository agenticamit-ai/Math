import type { Topic } from "@/content/types";

/** Original contest-style problems written for Math Quest. */
const topic: Topic = {
  slug: "number-sense",
  title: "Number sense & arithmetic",
  emoji: "🔢",
  tagline: "Friendly numbers, leftovers, and shortcuts that save time.",
  concept: {
    intro:
      "Number sense means you can see how a number is built before you start crunching. Contests reward the kid who rewrites a problem into a friendlier one.",
    ideas: [
      {
        heading: "Break numbers apart",
        body: "16 is 4 × 4. 99 is 100 − 1. If a factor or a neighbor is friendly, use it.",
      },
      {
        heading: "Multiply and divide before you add",
        body: "In 6 + 18 ÷ 3 × 2, division and multiplication run left to right. Addition waits.",
      },
      {
        heading: "Factors, multiples, and remainders",
        body: "A factor divides evenly. A multiple is what you land on when you skip-count. A remainder is what is left when it does not fit.",
      },
    ],
    example: {
      problem: "What is 25 × 24?",
      steps: [
        "Rewrite 24 as 4 × 6.",
        "25 × 4 = 100, so the product is 100 × 6.",
        "100 × 6 = 600.",
      ],
    },
  },
  tricks: [
    {
      title: "Make a hundred",
      detail: "25 × 4, 20 × 5, and 50 × 2 are all 100. Slide the problem until one of those appears.",
    },
    {
      title: "Remainder check",
      detail: "Dividend = divisor × quotient + remainder, and the remainder is smaller than the divisor.",
    },
    {
      title: "Consecutive sums",
      detail: "Three consecutive numbers add to 3 times the middle one. The middle is the total divided by 3.",
    },
    {
      title: "Estimate, then commit",
      detail: "Round first. If your exact answer is in a different neighborhood, hunt for a slip.",
    },
  ],
  questions: [
    {
      id: "number-sense-1",
      prompt: "What is the value of 25 × 16?",
      answerLabel: "A whole number",
      answer: "400",
      difficulty: "warm-up",
      hints: [
        "16 = 4 × 4, and 25 × 4 is a friendly hundred.",
        "So 25 × 16 = 100 × 4.",
        "Four hundreds is the product.",
      ],
      steps: [
        "16 = 4 × 4.",
        "25 × 4 = 100, so 25 × 16 = 100 × 4.",
        "100 × 4 = 400.",
      ],
      takeaway: "Pair 25 with a 4 whenever you can.",
    },
    {
      id: "number-sense-2",
      prompt: "When 83 is divided by 6, what is the remainder?",
      answerLabel: "A whole number smaller than 6",
      answer: "5",
      difficulty: "warm-up",
      hints: [
        "Find the greatest multiple of 6 that is still at most 83.",
        "6 × 13 = 78, and 83 − 78 is the leftover.",
        "The leftover has to be smaller than 6. Check that it is.",
      ],
      steps: [
        "6 × 13 = 78.",
        "83 − 78 = 5.",
        "5 is smaller than 6, so the remainder is 5.",
      ],
      takeaway: "Remainder = original − the biggest multiple that still fits.",
    },
    {
      id: "number-sense-3",
      prompt: "What is the least common multiple of 6 and 8?",
      answerLabel: "A whole number",
      answer: "24",
      difficulty: "practice",
      hints: [
        "List a few multiples of the larger number, 8.",
        "8, 16, 24… which of those is also a multiple of 6?",
        "24 ÷ 6 = 4, so 24 is on both lists. Check that nothing smaller works.",
      ],
      steps: [
        "Multiples of 8: 8, 16, 24, 32.",
        "24 ÷ 6 = 4, so 24 is a multiple of 6 too.",
        "8 and 16 are not multiples of 6, so 24 is the least common multiple.",
      ],
      takeaway: "Start with the larger number. You usually reach the LCM sooner.",
    },
    {
      id: "number-sense-4",
      prompt:
        "The sum of the digits of a two-digit number is 9. The number itself is 3 times that digit sum. What is the number?",
      answerLabel: "A two-digit number",
      answer: "27",
      difficulty: "practice",
      hints: [
        "You are told the digit sum first. It is 9.",
        "The number is 3 times that sum, so start with 3 × 9.",
        "Check the digits of your result. Do they add to 9?",
      ],
      steps: [
        "The digit sum is 9.",
        "The number is 3 × 9 = 27.",
        "2 + 7 = 9, so 27 matches both clues.",
      ],
      takeaway: "When a clue names the digit sum, use that number before you guess digits.",
    },
    {
      id: "number-sense-5",
      prompt: "What is the value of 6 + 18 ÷ 3 × 2?",
      answerLabel: "A whole number",
      answer: "18",
      difficulty: "practice",
      hints: [
        "Division and multiplication happen before addition, and they go left to right.",
        "Start with 18 ÷ 3. Then multiply that result by 2.",
        "Only after that product is ready should you add 6.",
      ],
      steps: [
        "18 ÷ 3 = 6.",
        "6 × 2 = 12, working left to right.",
        "6 + 12 = 18.",
      ],
      takeaway: "Do not add first, and do not do all multiplication before division. Left to right.",
    },
    {
      id: "number-sense-6",
      prompt: "Which number is closest to 498 × 21?",
      answerLabel: "Choose one",
      choices: ["1,000", "10,000", "50,000", "100,000"],
      answer: "10,000",
      acceptableAnswers: ["10000", "10,000"],
      acceptEquivalent: false,
      difficulty: "practice",
      hints: [
        "Round 498 to 500 and 21 to 20.",
        "500 × 20 is 500 × 2 × 10.",
        "500 × 2 = 1,000, and 1,000 × 10 tells you the neighborhood.",
      ],
      steps: [
        "498 is about 500, and 21 is about 20.",
        "500 × 20 = 10,000.",
        "The exact product is near 10,000, not 1,000 or 50,000.",
      ],
      takeaway: "A one-digit estimate can knock out three wrong choices.",
    },
    {
      id: "number-sense-7",
      prompt: "What is the greatest common factor of 36 and 48?",
      answerLabel: "A whole number",
      answer: "12",
      difficulty: "practice",
      hints: [
        "Both numbers are even, so 2 is a common factor. You can keep going.",
        "36 = 12 × 3 and 48 = 12 × 4.",
        "3 and 4 share no factor greater than 1, so the common factor you pulled out is the greatest.",
      ],
      steps: [
        "36 = 12 × 3.",
        "48 = 12 × 4.",
        "3 and 4 have no common factor greater than 1, so the GCF is 12.",
      ],
      takeaway: "Factor out the shared piece, then stop when the leftovers share nothing.",
    },
    {
      id: "number-sense-8",
      prompt: "The sum of three consecutive whole numbers is 72. What is the largest of the three?",
      answerLabel: "A whole number",
      answer: "25",
      difficulty: "stretch",
      hints: [
        "Three consecutive numbers sit evenly around their middle.",
        "The middle number is 72 ÷ 3.",
        "The largest is one more than that middle number.",
      ],
      steps: [
        "The middle number is 72 ÷ 3 = 24.",
        "The three numbers are 23, 24, and 25.",
        "23 + 24 + 25 = 72, so the largest is 25.",
      ],
      takeaway: "For three in a row, divide the sum by 3 to land on the middle.",
    },
  ],
};

export default topic;
