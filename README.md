# Math Olympiad Prep

A personal practice site for middle-school math contests — **MOEMS** and **CML** — with
lessons, hints, adaptive practice, quizzes, timed mock tests, and progress tracking.

## Run it on a Mac

Requires [Node.js](https://nodejs.org) 20+.

```sh
npm install
npm run dev        # then open http://localhost:5173
```

To make a static copy you can open without a dev server:

```sh
npm run build      # outputs to dist/
npx vite preview   # serves dist/ at http://localhost:4173
```

`dist/` is plain static files, so it can also be hosted on GitHub Pages, Netlify, or Vercel.

## What's inside

| Page | What it does |
|---|---|
| **Home** | Streak, today's count, suggested next topic, shortcuts |
| **Topics** | 6 strands, ~28 topics, each with a lesson, worked examples and a contest tip |
| **Practice** | 8 adaptive problems per round — gets harder after a correct answer, easier after a miss. Hints, retries, full solutions |
| **Quiz** | Pick topics, length and difficulty for a mixed quiz |
| **Mock Test** | Timed MOEMS (5 problems / 30 min, increasing difficulty) or CML (6 problems / 30 min) with no hints; results with solutions |
| **Mistakes** | Every problem whose last attempt was wrong, until it's solved |
| **Progress** | Accuracy, streak, 14-day activity, per-topic mastery, test history, backup/restore |

Progress is stored in the browser (`localStorage`). Use **Progress → Download backup**
occasionally, or to move to another computer.

**Mastery:** a topic is *Mastered* after at least 6 tries with 80%+ right on the last 10.
Only first tries count — a correct answer after a retry still counts as a miss so it comes
back in **Mistakes**.

## The question bank

Questions live in `src/data/strands/*.json`, one file per strand
(`arith`, `nt`, `alg`, `geo`, `cp`, `logic`). The format is the `StrandFile` type in
`src/types.ts`. Highlights:

- `style: "short"` for typed answers, `"mc"` for multiple choice (5 choices, `answer` is `A`–`E`).
- Answers are checked flexibly: `3/4`, `0.75`, `.75` and `6/8` all match; units, `%`, and commas are ignored.
- Text supports inline math between `$…$` (KaTeX), `**bold**`, and blank-line paragraphs.
  Write money as "12 dollars" since `$` is the math delimiter.

All starter problems are original and every answer was verified by a computer
calculation or brute-force search.

`npm test` checks every question is well-formed (valid ids, topics, answers, choices, balanced math).

### Adding more problems (with Claude)

Ask Claude Code in this repo things like:

- *"Add 10 more level-3/4 problems on remainders."*
- *"Here's a PDF of last year's MOEMS test — add the problems to the bank (private use)."*
- *"She keeps missing Venn diagram problems — write 5 more like `cp-venn-03`."*

and ask it to verify each answer by computation before adding it, then run `npm test`.
Keep the repository private if you add problems from real past contests.
