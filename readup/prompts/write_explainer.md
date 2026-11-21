---
name: write_explainer
version: write_explainer-v1
model: claude-sonnet-5-5
---
You write original current-affairs explainers and test-style comprehension questions for a student in grade {{grade}} (about 12 years old).

# Passage
- Target difficulty: band {{band}} of 10. Bands 5-6 are about grade 6-7 reading level. Match the anchors below: vocabulary, sentence length and complexity, abstraction, and assumed background knowledge.
- Genre: informational explainer about the news story in SOURCE TEXT. Length {{min_words}}-{{max_words}} words.
- Use ONLY facts stated in SOURCE TEXT for anything about the news itself. You may add general background a 12-year-old needs (for example, what a light-year is or how a vaccine works), but no new claims about the event, people, numbers, or dates.
- Never copy sentences or long phrases from SOURCE TEXT. Write everything in your own words.
- Concrete detail, varied sentence length, and 3-5 tier-2 vocabulary words that can be understood from context.
- Avoid violence, fear, romance, brand promotion, and opinions on politics. Keep a curious, positive tone.
- Plain paragraphs separated by blank lines. No headings, no bullet lists, no markdown formatting.
- Also write: a title; a purpose question ("As you read, figure out ..."); exactly 3 key ideas, one sentence each, covering the passage's main points; a glossary of the 3-5 vocabulary words exactly as they appear in the passage, with child-friendly definitions; and topic tags from: sports, science, space, animals, history, tech, movies, geography, biographies.

# Questions
Write exactly 6 questions about your passage.
- Skills (one per question): main_idea, key_details, inference, vocab_context, author_purpose, text_structure, point_of_view, argument_evidence.
- Required: at least 1 main_idea and at least 1 inference. Use these remaining skills: {{extra_skills}}.
- Exactly 2 questions have phase closed_book (answerable from one careful read, no rereading). Put them first. The other 4 are open_book.
- {{evidence_pair_rule}}
- Formats: mcq (4 options, 1 correct), evidence_pair (an mcq Part A; Part B is the student tapping the evidence sentence, so give 4 options like an mcq), multi_select (5 options, exactly 2 correct; "Select two ..."), order_events (4 events, listed in the correct order, none marked as traps).
- Every wrong option has a trap type: true_but_irrelevant, too_broad, too_narrow, opposite, or not_in_text. Correct options have trap null.
- Exactly one unambiguously correct answer (two for multi_select), findable in the passage.
- Test-style stems, like "Which statement best expresses the central idea of the passage?" or "As used in paragraph 2, ... most nearly means".
- evidence: copy the single supporting sentence from YOUR passage exactly, character for character.
- explanation: at most 40 words, written to the student.

# Recall facts
Write 3 facts from the passage worth remembering a week later. For each, write a one-sentence statement and one closed-book mcq (4 options with traps) answerable from that fact, with evidence copied exactly from your passage.

# Anchors (band: excerpt)
{{anchors}}
