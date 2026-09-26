import type { Topic } from "@/content/types";

/** Original contest-style problems written for Math Quest. */
const topic: Topic = {
  slug: "counting-probability",
  title: "Counting & probability",
  emoji: "🎲",
  tagline: "Count the outcomes first. Probability is a fraction of that list.",
  concept: {
    intro:
      "If you can count the things that can happen, you can answer most elementary contest probability. Make the list, or multiply the choices, before you write a fraction.",
    ideas: [
      {
        heading: "Multiply when order is a sequence",
        body: "Sandwich then drink, or first digit then second digit: multiply the number of choices at each step.",
      },
      {
        heading: "Combinations when order does not matter",
        body: "Choosing 2 friends out of 5 for a team: A with B is the same team as B with A. List them, or take 5 × 4 ÷ 2.",
      },
      {
        heading: "Probability",
        body: "Probability = favorable outcomes ÷ all equally likely outcomes. Simplify the fraction.",
      },
    ],
    example: {
      problem: "A menu has 2 soups and 5 sandwiches. How many soup-sandwich meals are there?",
      steps: [
        "Each soup can pair with each sandwich.",
        "2 × 5 = 10.",
        "There are 10 meals.",
      ],
    },
  },
  tricks: [
    {
      title: "Write a couple of outcomes",
      detail: "If the list is short, write it. HH, HT, TH, TT is safer than a formula you half-remember.",
    },
    {
      title: "“Not” is the complement",
      detail: "P(not a star) = 1 − P(star). In fractions, that is the whole minus the favorable pieces.",
    },
    {
      title: "No repeats means the next choice shrinks",
      detail: "If you already used a digit, the next spot has one fewer option.",
    },
    {
      title: "Dice sums love a list",
      detail: "For a sum of 7 with two dice, pair 1 with 6, 2 with 5, and so on, then remember that (1, 6) and (6, 1) are different.",
    },
  ],
  questions: [
    {
      id: "counting-probability-1",
      prompt: "A lunch offers 3 sandwiches and 4 drinks. How many different sandwich-drink pairs are there?",
      answerLabel: "Number of pairs",
      answer: "12",
      difficulty: "warm-up",
      hints: [
        "Each sandwich can go with every drink.",
        "Multiply the number of sandwiches by the number of drinks.",
        "3 groups of 4.",
      ],
      steps: [
        "There are 3 choices for the sandwich.",
        "For each sandwich there are 4 drinks.",
        "3 × 4 = 12 pairs.",
      ],
      takeaway: "Independent choices multiply.",
    },
    {
      id: "counting-probability-2",
      prompt:
        "A bag has 2 red, 3 blue, and 5 green marbles. One marble is drawn at random. What is the probability it is blue? Write a fraction in lowest terms.",
      answerLabel: "A fraction",
      answer: "3/10",
      acceptableAnswers: ["0.3", ".3"],
      acceptEquivalent: false,
      difficulty: "practice",
      hints: [
        "Find the total number of marbles first.",
        "Blue marbles go in the numerator. The total goes in the denominator.",
        "2 + 3 + 5 = 10. Check whether 3/10 still simplifies.",
      ],
      steps: [
        "Total marbles = 2 + 3 + 5 = 10.",
        "Blue marbles = 3.",
        "The probability is 3/10, already in lowest terms.",
      ],
      takeaway: "The denominator is every marble, not just the ones that are not blue.",
    },
    {
      id: "counting-probability-3",
      prompt:
        "How many different 2-digit numbers can you make from the digits 1, 2, and 3 if you do not repeat a digit?",
      answerLabel: "How many numbers",
      answer: "6",
      difficulty: "practice",
      hints: [
        "The tens digit has 3 choices.",
        "After you pick it, the ones digit has 2 choices left.",
        "Multiply those choices. You can also list 12, 13, 21, 23, 31, 32.",
      ],
      steps: [
        "3 choices for the first digit.",
        "2 remaining choices for the second digit.",
        "3 × 2 = 6 numbers.",
      ],
      takeaway: "Without replacement, the next spot has fewer options.",
    },
    {
      id: "counting-probability-4",
      prompt: "A fair coin is flipped twice. How many outcomes are in the sample space?",
      answerLabel: "Number of outcomes",
      answer: "4",
      difficulty: "warm-up",
      hints: [
        "Each flip has 2 results, and the flips are a sequence.",
        "List them if you want: HH, HT, TH, TT.",
        "HT and TH are different outcomes.",
      ],
      steps: [
        "First flip: H or T.",
        "Second flip: H or T again.",
        "2 × 2 = 4 outcomes.",
      ],
      takeaway: "Order matters for coin sequences. Heads-then-tails is not the same as tails-then-heads.",
    },
    {
      id: "counting-probability-5",
      prompt:
        "From 5 friends, 2 are chosen for a team. Order does not matter. How many different teams are there?",
      answerLabel: "Number of teams",
      answer: "10",
      difficulty: "stretch",
      hints: [
        "If order mattered, there would be 5 × 4 ways to pick a first and second friend.",
        "Each team was counted twice in that list, once for each way to order the pair.",
        "Divide 5 × 4 by 2.",
      ],
      steps: [
        "5 × 4 = 20 ordered pairs.",
        "Each unordered team matches 2 orders.",
        "20 ÷ 2 = 10 teams.",
      ],
      takeaway: "When order does not matter, divide out the repeated arrangements.",
    },
    {
      id: "counting-probability-6",
      prompt:
        "A spinner has 8 equal sections, and 3 of them are labeled star. What is the probability of not landing on a star? Write a fraction in lowest terms.",
      answerLabel: "A fraction",
      answer: "5/8",
      acceptEquivalent: false,
      difficulty: "practice",
      hints: [
        "Sections that are not stars: 8 − 3.",
        "The spinner is fair, so the denominator is 8.",
        "Does your fraction simplify?",
      ],
      steps: [
        "Not-star sections = 5.",
        "Total sections = 8.",
        "The probability is 5/8.",
      ],
      takeaway: "Subtract from the whole when the question says “not.”",
    },
    {
      id: "counting-probability-7",
      prompt: "How many different ways can the letters of MATH be arranged?",
      answerLabel: "Number of arrangements",
      answer: "24",
      difficulty: "practice",
      hints: [
        "All four letters are different.",
        "4 choices for the first spot, then 3, then 2, then 1.",
        "Multiply 4 × 3 × 2 × 1.",
      ],
      steps: [
        "First letter: 4 choices.",
        "Then 3, then 2, then 1.",
        "4 × 3 × 2 × 1 = 24.",
      ],
      takeaway: "Distinct objects in a line: multiply downward to 1.",
    },
    {
      id: "counting-probability-8",
      prompt: "Two fair six-sided dice are rolled. How many outcomes give a sum of 7?",
      answerLabel: "Number of outcomes",
      answer: "6",
      difficulty: "stretch",
      hints: [
        "List the first die from 1 to 6 and ask what the second die must be.",
        "(1, 6) and (6, 1) are both sums of 7, and they are different outcomes.",
        "The pairs are 1+6, 2+5, 3+4, 4+3, 5+2, and 6+1.",
      ],
      steps: [
        "Possible pairs: (1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1).",
        "That is 6 outcomes.",
        "No other pair of dice from 1 to 6 adds to 7.",
      ],
      takeaway: "For two dice, list the pairs. There are 36 outcomes in the full sample space, but you only need the favorable list here.",
    },
  ],
};

export default topic;
