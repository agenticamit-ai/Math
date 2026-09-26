import type { Topic } from "@/content/types";

/** Original contest-style problems written for Math Quest. */
const topic: Topic = {
  slug: "geometry",
  title: "Geometry basics",
  emoji: "📐",
  tagline: "Perimeters, areas, angles, and shapes on a grid.",
  concept: {
    intro:
      "Geometry contests at this level mostly ask you to pick the right measure: around the outside, the flat inside, a turn, or the space a box holds.",
    ideas: [
      {
        heading: "Perimeter vs area",
        body: "Perimeter is a length around the rim. Area is the flat space inside, in square units. A taller fence does not change the garden’s area.",
      },
      {
        heading: "Angles that add up",
        body: "A triangle’s angles add to 180°. Complementary angles add to 90°. Supplementary angles add to 180°.",
      },
      {
        heading: "Grid shapes",
        body: "On a coordinate grid, subtract the x-coordinates for width and the y-coordinates for height. Then use the rectangle or triangle formula.",
      },
    ],
    example: {
      problem: "A rectangle is 8 cm long and 3 cm wide. What is its perimeter?",
      steps: [
        "Opposite sides match, so the outline is 8 + 3 + 8 + 3.",
        "That is 2 × (8 + 3).",
        "2 × 11 = 22 cm.",
      ],
    },
  },
  tricks: [
    {
      title: "Say the units first",
      detail: "If the answer is an area, the unit is square. If it is a volume, the unit is cubic. Write that before you calculate.",
    },
    {
      title: "Triangle area is half a rectangle",
      detail: "Area = base × height ÷ 2. The height is perpendicular to the base, not always a side you can see leaning.",
    },
    {
      title: "Square from the rim",
      detail: "If you know a square’s perimeter, divide by 4 to get the side, then square that side for the area.",
    },
    {
      title: "One missing angle",
      detail: "Add the angles you know. Subtract from 180° in a triangle, or from 90° if they are complementary.",
    },
  ],
  questions: [
    {
      id: "geometry-1",
      prompt: "A rectangle is 9 cm long and 4 cm wide. What is its perimeter in centimeters?",
      answerLabel: "Centimeters",
      answer: "26",
      difficulty: "warm-up",
      hints: [
        "Perimeter walks around all four sides.",
        "The sides are 9, 4, 9, and 4.",
        "Or use 2 × (9 + 4).",
      ],
      steps: [
        "9 + 4 = 13, the sum of length and width.",
        "Perimeter = 2 × 13.",
        "2 × 13 = 26 cm.",
      ],
      takeaway: "A rectangle’s perimeter is twice the sum of length and width.",
    },
    {
      id: "geometry-2",
      prompt: "A triangle has a base of 10 cm and a height of 7 cm. What is its area in square centimeters?",
      answerLabel: "Square centimeters",
      answer: "35",
      difficulty: "practice",
      hints: [
        "Triangle area = base × height ÷ 2.",
        "10 × 7 is the rectangle you would get before cutting it in half.",
        "Half of that product is the area.",
      ],
      steps: [
        "10 × 7 = 70.",
        "70 ÷ 2 = 35.",
        "The area is 35 square centimeters.",
      ],
      takeaway: "Multiply base and height, then take half. The order can swap, the half cannot.",
    },
    {
      id: "geometry-3",
      prompt: "A triangle has angles of 35° and 65°. What is the third angle, in degrees?",
      answerLabel: "Degrees",
      answer: "80",
      difficulty: "warm-up",
      hints: [
        "All three angles in a triangle add to 180°.",
        "Add 35 and 65 first.",
        "Subtract that sum from 180.",
      ],
      steps: [
        "35 + 65 = 100.",
        "180 − 100 = 80.",
        "The third angle is 80°.",
      ],
      takeaway: "Two angles name the third one, because the total is fixed.",
    },
    {
      id: "geometry-4",
      prompt: "Two angles are complementary. One measures 28°. What is the other angle, in degrees?",
      answerLabel: "Degrees",
      answer: "62",
      difficulty: "warm-up",
      hints: [
        "Complementary angles add to 90°, not 180°.",
        "The unknown angle is 90 minus 28.",
        "You can compute 90 − 30 and then adjust by 2.",
      ],
      steps: [
        "Complementary means the sum is 90°.",
        "90 − 28 = 62.",
        "28 + 62 = 90, so the other angle is 62°.",
      ],
      takeaway: "Complementary is a corner (90°). Supplementary is a straight line (180°).",
    },
    {
      id: "geometry-5",
      prompt: "A right triangle has legs of 6 cm and 8 cm. What is its area in square centimeters?",
      answerLabel: "Square centimeters",
      answer: "24",
      difficulty: "practice",
      hints: [
        "The two legs meet at the right angle, so they can be the base and the height.",
        "Area = 6 × 8 ÷ 2.",
        "You do not need the hypotenuse for the area.",
      ],
      steps: [
        "Base × height = 6 × 8 = 48.",
        "Half of 48 is 24.",
        "The area is 24 square centimeters.",
      ],
      takeaway: "In a right triangle, the legs are a ready-made base and height.",
    },
    {
      id: "geometry-6",
      prompt:
        "A rectangular prism is 5 cm long, 3 cm wide, and 2 cm tall. What is its volume in cubic centimeters?",
      answerLabel: "Cubic centimeters",
      answer: "30",
      difficulty: "practice",
      hints: [
        "Volume of a box is length × width × height.",
        "5 × 3 is the area of the bottom.",
        "Multiply that floor area by the height, 2.",
      ],
      steps: [
        "5 × 3 = 15.",
        "15 × 2 = 30.",
        "The volume is 30 cubic centimeters.",
      ],
      takeaway: "Three dimensions multiply. The unit becomes cubic.",
    },
    {
      id: "geometry-7",
      prompt:
        "A rectangle has corners at (1, 1), (6, 1), (1, 4), and (6, 4). What is its area in square units?",
      answerLabel: "Square units",
      answer: "15",
      difficulty: "stretch",
      hints: [
        "The width is the difference of the x-coordinates: 6 and 1.",
        "The height is the difference of the y-coordinates: 4 and 1.",
        "Area = width × height. Do not add 1 back in.",
      ],
      steps: [
        "Width = 6 − 1 = 5.",
        "Height = 4 − 1 = 3.",
        "Area = 5 × 3 = 15.",
      ],
      takeaway: "Distance on a grid is a difference, not the larger coordinate by itself.",
    },
    {
      id: "geometry-8",
      prompt: "A square has a perimeter of 36 cm. What is its area in square centimeters?",
      answerLabel: "Square centimeters",
      answer: "81",
      difficulty: "practice",
      hints: [
        "A square has 4 equal sides. Find one side first.",
        "36 ÷ 4 is the side length.",
        "Area is that side times itself, not another 36.",
      ],
      steps: [
        "Side = 36 ÷ 4 = 9 cm.",
        "Area = 9 × 9.",
        "9 × 9 = 81 square centimeters.",
      ],
      takeaway: "Perimeter gives a side. Area needs that side squared.",
    },
  ],
};

export default topic;
