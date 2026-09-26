import type { Topic } from "@/content/types";

/** Original contest-style problems written for Math Quest. */
const topic: Topic = {
  slug: "algebra",
  title: "Algebra readiness",
  emoji: "🔤",
  tagline: "Unknowns, balance, and patterns that follow a rule.",
  concept: {
    intro:
      "Algebra is arithmetic with a covered number. Whatever you do to uncover it, you do to both sides so the balance stays fair.",
    ideas: [
      {
        heading: "Undo from the outside",
        body: "In 3n + 4 = 19, the 4 was added last, so subtract 4 first. Then undo the multiplication.",
      },
      {
        heading: "A pattern has a position",
        body: "The 1st term, 2nd term, and 10th term follow one rule. Find how the term changes, then jump to the position you need.",
      },
      {
        heading: "Words to symbols",
        body: "“Five more than twice a number” is 2n + 5. “Twice the sum” would use parentheses: 2(n + 5).",
      },
    ],
    example: {
      problem: "If 2n − 5 = 11, what is n?",
      steps: [
        "Add 5 to both sides: 2n = 16.",
        "Divide both sides by 2: n = 8.",
        "Check: 2 × 8 − 5 = 11.",
      ],
    },
  },
  tricks: [
    {
      title: "Check by putting it back",
      detail: "A contest answer is not done until the original equation likes it.",
    },
    {
      title: "Middle of a pattern",
      detail: "For a list that grows by the same amount, term n = first + (n − 1) × the jump.",
    },
    {
      title: "Bags on a balance",
      detail: "Identical bags are the same unknown. A loose weight is a plain number.",
    },
    {
      title: "Count the whole numbers that fit",
      detail: "Between 3 and 7, not including the ends, the whole numbers are 4, 5, and 6. Say the list before you count.",
    },
  ],
  questions: [
    {
      id: "algebra-1",
      prompt: "If 3n + 4 = 19, what is n?",
      answerLabel: "The value of n",
      answer: "5",
      difficulty: "warm-up",
      hints: [
        "Subtract 4 from both sides so the 3n is alone.",
        "3n = 15.",
        "Divide by 3.",
      ],
      steps: [
        "3n + 4 − 4 = 19 − 4.",
        "3n = 15.",
        "n = 5. Check: 3 × 5 + 4 = 19.",
      ],
      takeaway: "Undo adding before you undo multiplying.",
    },
    {
      id: "algebra-2",
      prompt:
        "A number is multiplied by 4, then 7 is subtracted, and the result is 21. What is the number?",
      answerLabel: "The starting number",
      answer: "7",
      difficulty: "practice",
      hints: [
        "Call the number x. The sentence says 4x − 7 = 21.",
        "Add 7 first, because subtracting happened last.",
        "Then divide by 4.",
      ],
      steps: [
        "4x − 7 = 21.",
        "4x = 28.",
        "x = 7. Check: 4 × 7 − 7 = 21.",
      ],
      takeaway: "Translate the story in the order it happened, then undo backward.",
    },
    {
      id: "algebra-3",
      prompt:
        "A table uses the rule “output = 2 × input + 1.” The inputs 1, 3, and 5 give outputs 3, 7, and 11. What is the output when the input is 8?",
      answerLabel: "The output",
      answer: "17",
      difficulty: "warm-up",
      hints: [
        "You do not need a new rule. Use output = 2 × input + 1.",
        "Start with 2 × 8.",
        "Then add 1.",
      ],
      steps: [
        "2 × 8 = 16.",
        "16 + 1 = 17.",
        "The pairs in the table follow the same rule, so 17 fits.",
      ],
      takeaway: "When the rule is given, plug in. The table is a check, not a new puzzle.",
    },
    {
      id: "algebra-4",
      prompt: "Five more than twice a number is 19. What is the number?",
      answerLabel: "The number",
      answer: "7",
      difficulty: "practice",
      hints: [
        "“Twice a number” is 2n. “Five more than” that is 2n + 5.",
        "So 2n + 5 = 19.",
        "Subtract 5, then divide by 2.",
      ],
      steps: [
        "2n + 5 = 19.",
        "2n = 14.",
        "n = 7. Check: 2 × 7 + 5 = 19.",
      ],
      takeaway: "“More than” usually adds after the other operation.",
    },
    {
      id: "algebra-5",
      prompt: "What is the value of 4 × (7 − 3)²?",
      answerLabel: "A whole number",
      answer: "64",
      acceptableAnswers: ["64"],
      difficulty: "practice",
      hints: [
        "Parentheses first: 7 − 3.",
        "The exponent is next. Square that difference.",
        "Multiply by 4 only after the square is done.",
      ],
      steps: [
        "7 − 3 = 4.",
        "4² = 16.",
        "4 × 16 = 64.",
      ],
      takeaway: "The exponent applies to the parentheses, not to the 4 out front.",
    },
    {
      id: "algebra-6",
      prompt:
        "On a balance scale, 2 identical bags plus a 3-gram weight match 11 grams. How many grams are in one bag?",
      answerLabel: "Grams in one bag",
      answer: "4",
      difficulty: "practice",
      hints: [
        "Let one bag weigh b grams. Then 2b + 3 = 11.",
        "Take the 3-gram weight off both sides in your head.",
        "Two bags match 8 grams. Split that evenly.",
      ],
      steps: [
        "2b + 3 = 11.",
        "2b = 8.",
        "b = 4. Two 4-gram bags plus 3 grams make 11.",
      ],
      takeaway: "Identical bags are the same unknown. Divide only after they are alone.",
    },
    {
      id: "algebra-7",
      prompt: "A pattern starts 4, 7, 10, 13, and keeps growing the same way. What is the 10th term?",
      answerLabel: "The 10th term",
      answer: "31",
      difficulty: "stretch",
      hints: [
        "Each term is 3 more than the one before it.",
        "To reach the 10th term you make 9 jumps, not 10.",
        "Start at 4 and add 3 nine times. 9 × 3 is a useful chunk.",
      ],
      steps: [
        "The jump is 3.",
        "10th term = 4 + 9 × 3.",
        "4 + 27 = 31.",
      ],
      takeaway: "The number of jumps is one less than the term number.",
    },
    {
      id: "algebra-8",
      prompt:
        "x is a whole number greater than 3 and less than 7. How many possible values of x are there?",
      answerLabel: "How many values",
      answer: "3",
      difficulty: "warm-up",
      hints: [
        "List the whole numbers that could be x. Do not include 3 or 7.",
        "The list starts at 4.",
        "Count the numbers you listed.",
      ],
      steps: [
        "Whole numbers with 3 < x < 7 are 4, 5, and 6.",
        "That is three numbers.",
        "3 and 7 are the fences, not the answers.",
      ],
      takeaway: "Write the list, then count. “Greater than” leaves the endpoint out.",
    },
  ],
};

export default topic;
