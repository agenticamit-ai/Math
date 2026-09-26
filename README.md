# Math Quest

Math Quest is a kid-friendly competitive math tutor for Kiaan (6th grade). It follows a MOEMS- and CML-style path: understand the idea, learn a contest trick, then practice.

The problems in this app are **original contest-style questions written for Math Quest**. They are not copied from MOEMS, CML, or any other contest. This project does not scrape copyrighted PDFs.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production, including on Vercel:

```bash
npm run build
npm start
```

`npm run build` runs `next build`. `npm start` runs `next start`. No extra Vercel config is required.

## How a lesson works

Each topic has the same three steps:

1. **Concept** — the idea in plain language, plus one worked example.
2. **Contest tricks** — short habits that help on a timed meet.
3. **Practice** — original questions. Hints open one at a time and explain the next step without dumping the whole solution. After an answer (or when Kiaan asks), a step-by-step explanation appears.

## Scores

Progress is stored in this browser for the learner **Kiaan** (`localStorage` key `math-quest-kiaan-v1`):

- XP and a rank for each topic
- An overall rank
- A day streak
- Contest scores

Ranks run from Seedling up to Math Master. A correct answer on the first try is worth more than one that needed every hint.

## Contest mode

Contest mode draws 5 questions from five different topics and gives about 12 minutes. Hints stay hidden. Explanations show up after you finish or when time runs out.

## Parent Notes

On **Parent Notes**, paste text or upload a `.txt` or `.md` file, then choose **Explain this**. The page organizes the note into a concept, contest tricks, and practice prompts in the browser. Nothing is sent to an API, and no API key is required.

Use notes you wrote or have permission to use.

## Edit the questions

Topic content lives in [`src/content/topics/`](src/content/topics/). Each file exports one topic. Register new topics in [`src/content/topics/index.ts`](src/content/topics/index.ts).

A question needs:

- `prompt` and `answer`
- optional `acceptableAnswers`, `choices`, and `acceptEquivalent`
- `hints` — three rungs, shown one at a time
- `steps` — the explanation after the answer
- `takeaway` — one line to remember

Check the content shape with:

```bash
npm run validate
```

## Topics

1. Number sense & arithmetic
2. Ratio, proportion, and percent
3. Algebra readiness
4. Geometry basics
5. Counting & probability
6. Word problems & contest strategy
