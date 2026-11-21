# ReadUp

ReadUp measures and builds a middle-school reader's speed and comprehension. Each session is one passage: pre-read with a purpose question, timed silent reading, closed-book questions, open-book questions with tap-the-evidence items, a one-to-two sentence summary, and a results screen.

This folder holds **Phase 1 (MVP)** of the ReadUp build spec plus the first part of Phase 2, the daily current-affairs pipeline. It is a separate app from Math Quest, which lives at the repository root.

## What's in Phase 1

- Parent account (email + password) with any number of reader profiles. Each reader signs in with a 4-digit PIN. No child email is collected.
- The full session flow: pre-read → Start → Done → closed-book → open-book → summary → results.
- Honest timing: active reading time only (the timer pauses while the tab is hidden), no visible timer, a "Still reading?" prompt at 3× expected time with auto-pause after 60 s, Done disabled until `word_count / 600` minutes, and invalid-session flags (WPM > 450, WPM < 40 on 150+ words, or more than 50% time away).
- Accuracy with closed-book items weighted 1.5×, evidence pairs scored 1 / 0.5 / 0, and effective reading rate (ERR = WPM × accuracy).
- Results with per-question explanations, the evidence sentence highlighted, and the trap type named for wrong answers.
- 56 original passages (50 in bands 3–8) with 336 skill-tagged questions, each with a difficulty score D.
- Placement (first three reads at bands 4, 5, 6), then band adjustment after each session, skill mastery updates after each answer, and three recommendation cards on Home.
- Tap-a-word definitions saved to a word list.
- Parent dashboard: headline stats, WPM/ERR chart, skill table with most common trap, session log with valid/invalid filter, profile settings, blocked topics, JSON export, and delete.

Not built yet (rest of Phases 2–3): SpeedIndex against a frozen 8-session baseline, skill lessons, spaced-repetition flashcards, the 7-day recall quiz screen (the pipeline already writes its facts and questions), A/B/A technique experiments, read-aloud mode, and the weekly parent summary.

## Run it locally

You need Node 20+ and a Postgres database. A free [Neon](https://neon.tech) database works for local development too.

```bash
cd readup
npm install
cp .env.example .env   # then fill in DATABASE_URL and SESSION_SECRET
npm run db:migrate
npm run seed
npm run dev
```

Open <http://localhost:3000>, create a parent account, add a reader, and choose **Start reading**.

## Deploy for free (Vercel + Neon)

Both free tiers are enough for a family. The only possible cost is the Claude API for summary grading, which is optional (see below).

1. **Database.** Create a free project at [neon.tech](https://neon.tech) and copy its connection string (the pooled one is fine).
2. **App.** At [vercel.com](https://vercel.com), sign in with GitHub, choose **Add New → Project**, and import this repository.
   - Set **Root Directory** to `readup`.
   - Add environment variables:
     - `DATABASE_URL`: the Neon connection string
     - `SESSION_SECRET`: a long random string (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
     - `ALLOWED_PARENT_EMAILS`: your email, so strangers who find the URL can't sign up
     - `ANTHROPIC_API_KEY`: optional; see below
3. Choose **Deploy**. Vercel runs `npm run vercel-build`, which applies database migrations, loads the passage library, and builds the app. Later deploys do the same and keep all reader data.

## Daily news pipeline

Every morning a GitHub Actions job ([`.github/workflows/readup-daily-news.yml`](../.github/workflows/readup-daily-news.yml)) runs `npm run news`, which:

1. **Fetches** about 50 headlines from the feeds in [`news-feeds.json`](news-feeds.json), spread across sports, science, space, tech, movies, and world news. Edit that file to change sources.
2. **Filters for safety**: a keyword rule list first, then Claude Haiku. It rejects violence, crime, death or tragedy, sexual content, drugs, partisan politics, and celebrity gossip, and logs every rejection with its reason.
3. **Ranks** what's left by reader interest × novelty (stories similar to the last 45 days are skipped) × how well the story can teach something, and picks the top 3, at most 2 per category.
4. **Writes** an original explainer of 400–700 words with Claude Sonnet, at the readers' band and band + 1, with 6 questions (following the skill-mix rules), a purpose question, key ideas, a glossary, and 3 facts with recall questions for the 7-day quiz.
5. **Checks** each draft with the same rules as the hand-written library (exact evidence quotes, skill mix, trap labels), plus word count and a copy check that rejects 12+ words in a row taken from the source.
6. **Validates** with a second Claude pass that checks facts against the source text, answer keys, ambiguity, safety, and difficulty. A failed draft is rewritten once with the problems listed, then dropped.
7. **Publishes**, or with review mode on, queues the item in the parent's **News queue** to approve or reject. News explainers show on Home for 30 days, one reading level per story, and then join the regular library.
8. **Logs** each run's counts, rejections, and errors, shown on the News queue page. If fewer than 2 items come out, the job fails, GitHub emails you, and the dashboard shows a banner.

**Defaults** (change in Settings): review before publish is **on**, and all news categories are enabled. The run is capped at 40 AI calls; a normal day uses about 15–25.

### Turn it on

1. Get an API key at [console.anthropic.com](https://console.anthropic.com).
2. In the GitHub repository, open **Settings → Secrets and variables → Actions** and add two repository secrets:
   - `READUP_DATABASE_URL`: the same Neon connection string Vercel uses
   - `ANTHROPIC_API_KEY`: the API key
3. Open the **Actions** tab, choose **ReadUp daily news**, and click **Run workflow** to try it once. After that it runs daily at 13:00 UTC (5 AM Pacific in winter, 6 AM in summer).

GitHub pauses scheduled workflows in repositories with no commits for 60 days; re-enable it from the Actions tab if that happens.

**Cost.** Each reading-level version takes one writing call and one validation call to Claude Sonnet. At the default of 3 stories × 2 levels, expect very roughly $10–20 a month. This is an estimate that hasn't been measured, so check your usage in the Anthropic console after the first week. To spend less, add a repository *variable* `READUP_STORIES_PER_DAY` set to `1` or `2`.

**Testing without network or an API key:** `npm run news -- --fake` runs the full pipeline with sample feeds and a fake model, and `npm run test:pipeline` checks the results.

## AI summary grading (optional)

Without `ANTHROPIC_API_KEY`, summaries are scored 0–4 by a keyword check against each passage's three key ideas. With a key, ReadUp asks Claude Haiku 5.5 to score the summary and write one line of feedback, using the versioned prompt in [`prompts/grade_summary.md`](prompts/grade_summary.md). Each grading call is roughly a fraction of a cent. Only the passage text, its key ideas, and the summary are sent. If the API call fails, grading falls back to the keyword check.

## Word definitions

Tapping a word first checks the passage's glossary, then a shared cache, then the free [dictionaryapi.dev](https://dictionaryapi.dev) service. Only the word itself is sent to that service.

## Content

Passages live in [`src/content/passages/`](src/content/passages/), one file per target band. Each passage has a purpose question, three key ideas (used for summary grading), a glossary, and 6 questions. Every multiple-choice distractor is labeled with a trap type, and each question quotes its evidence exactly from the passage.

```bash
npm run validate   # checks evidence quotes, skill mix, trap labels, glossary words, and prints difficulty
npm run seed       # loads or updates the library; safe to re-run
```

Difficulty is `D = 0.35·FK + 0.25·DC + 0.40·Rating`, each on a 1–10 scale. FK is the Flesch-Kincaid grade, normalized so that grade 3 is 1 and grade 13+ is 10. DC approximates vocabulary load as the share of 3+ syllable words that are not everyday words; this stands in for the Dale-Chall list. Rating is the author's 1–10 rubric score; in Phase 2 it comes from the LLM difficulty rater. Flesch-Kincaid underrates poetry and dialogue-heavy fiction, so those land in lower bands than their rating suggests.

The grade benchmark shaded on charts (150–200 WPM for grades 6–7) is approximate. Replace it with a sourced norms table before relying on it.

## Checks

```bash
npm run typecheck
npm test   # timing rules, accuracy weighting, scoring, sentence splitting
npm run validate
npm run test:pipeline   # news pipeline end to end, with fake feeds and model (uses your local database)
```
