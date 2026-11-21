import { ep, mc, ms, oe, type SeedPassage } from "../types";

export const band8: SeedPassage[] = [
  {
    slug: "antibiotics-under-threat",
    title: "Antibiotics: A Medical Miracle Under Threat",
    genre: "informational",
    tags: ["science", "history"],
    rating: 8,
    knowledgeDemand: 4,
    purpose: "As you read, figure out how bacteria become resistant to antibiotics.",
    keyIdeas: [
      "Alexander Fleming's 1928 discovery of penicillin led to antibiotics that transformed medicine.",
      "Bacteria can evolve resistance because surviving bacteria pass on their traits, and overuse speeds this process.",
      "Using antibiotics only when needed and developing new drugs can help preserve their effectiveness.",
    ],
    glossary: [
      ["antibiotic", "a medicine that kills bacteria or stops them from growing"],
      ["resistant", "able to survive something meant to harm or stop it"],
      ["mutation", "a change in a living thing's genetic code"],
      ["prescribe", "for a doctor, to order a medicine for a patient"],
    ],
    body: `In September 1928, the Scottish scientist Alexander Fleming returned from vacation to his cluttered London laboratory and noticed something unusual. On one of the glass dishes in which he had been growing bacteria, a patch of mold had appeared, and the bacteria surrounding it had died. Fleming realized that the mold was producing a substance that killed bacteria. He named it penicillin.

More than a decade passed before other scientists, including Howard Florey and Ernst Chain, found ways to purify penicillin and produce it in large quantities. By the mid-1940s, it was saving countless lives. Before antibiotics, a scraped knee or a sore throat could occasionally lead to an infection that no doctor could cure. Antibiotics made such infections easily treatable and allowed surgeons to perform operations with far less danger of infection afterward. Few discoveries have done more to extend human life.

Fleming himself, however, issued a warning. In a speech in 1945, he cautioned that bacteria exposed to too little of the drug could learn to survive it. He was describing a process now called antibiotic resistance, and it has become one of the most serious challenges in modern medicine.

Resistance arises through evolution. In any large population of bacteria, a few individuals may carry a random mutation that helps them survive a particular antibiotic. When the drug is used, it kills the vulnerable bacteria but leaves the resistant ones behind. Those survivors multiply rapidly, sometimes doubling in number in less than an hour, and pass their resistance on. Over time, a population that was once easily killed by the drug can become dominated by bacteria that shrug it off. Bacteria can even share resistance genes with one another.

Human behavior speeds up this process. Antibiotics do nothing against viruses, which cause colds and the flu, yet they have often been requested and taken for these illnesses anyway. Every unnecessary use gives resistant bacteria another opportunity to outcompete their neighbors. Stopping a prescribed course of treatment early can also leave the toughest bacteria alive. Large amounts of antibiotics have also been used in raising livestock.

The World Health Organization considers antibiotic resistance one of the top threats to global health. Yet the situation is not hopeless. Doctors are learning to prescribe antibiotics more carefully, researchers are searching for new drugs in unexpected places such as soil and the ocean, and public health campaigns are teaching people when antibiotics help and when they do not. Protecting Fleming's miracle will require all of these efforts.`,
    questions: [
      mc("main_idea", "closed", "Which statement best expresses the central idea of the passage?",
        "Antibiotics transformed medicine, but bacterial resistance, accelerated by overuse, now threatens them.",
        [["Penicillin was discovered by accident in 1928.", "too_narrow"], ["Antibiotics can cure colds and the flu.", "opposite"], ["All bacteria are now resistant to every drug.", "too_broad"]],
        "The passage traces antibiotics' benefits and the growing danger of resistance.",
        "He was describing a process now called antibiotic resistance, and it has become one of the most serious challenges in modern medicine.", 2),
      mc("key_details", "closed", "What warning did Fleming give in 1945?",
        "That bacteria exposed to too little of the drug could learn to survive it",
        [["That penicillin was too expensive to produce", "not_in_text"], ["That mold was dangerous to humans", "not_in_text"], ["That antibiotics would replace surgery", "not_in_text"]],
        "Fleming foresaw the problem of resistance.",
        "In a speech in 1945, he cautioned that bacteria exposed to too little of the drug could learn to survive it.", 2),
      ep("inference", "Why can stopping antibiotic treatment early contribute to resistance?",
        "The toughest bacteria may survive and multiply, passing on their resistance.",
        [["The medicine becomes poisonous when stopped.", "not_in_text"], ["Viruses grow stronger without antibiotics.", "not_in_text"], ["Doctors stop prescribing antibiotics.", "not_in_text"]],
        "Survivors of a partial course are the most resistant, and they reproduce rapidly.",
        "Stopping a prescribed course of treatment early can also leave the toughest bacteria alive.", 3),
      mc("vocab_context", "open", 'As used in the passage, "shrug it off" most nearly means',
        "survive it without being harmed",
        [["become weaker because of it", "opposite"], ["move away from it", "not_in_text"], ["produce more of it", "not_in_text"]],
        "Resistant bacteria are not killed by the drug.",
        "Over time, a population that was once easily killed by the drug can become dominated by bacteria that shrug it off.", 3),
      oe("text_structure", "open", "Put these steps of how resistance develops in order.",
        ["A few bacteria carry a mutation that helps them survive.", "The antibiotic kills the vulnerable bacteria.", "The resistant survivors multiply rapidly.", "The population becomes dominated by resistant bacteria."],
        "Mutation, selection by the drug, reproduction, and then a resistant population.",
        "When the drug is used, it kills the vulnerable bacteria but leaves the resistant ones behind.", 3),
      mc("author_purpose", "open", "Why does the author end with efforts by doctors, researchers, and public health campaigns?",
        "To show that the problem is serious but can still be addressed",
        [["To argue that antibiotics should be banned", "opposite"], ["To describe Fleming's laboratory", "not_in_text"], ["To prove resistance has been solved", "opposite"]],
        "The ending balances the warning with reasons for hope.",
        "Yet the situation is not hopeless.", 3),
    ],
  },
  {
    slug: "shackleton-endurance",
    title: "The Endurance Expedition",
    genre: "informational",
    tags: ["history", "geography", "biographies"],
    rating: 7.5,
    knowledgeDemand: 3,
    purpose: "As you read, figure out how Shackleton's leadership helped all of his crew survive.",
    keyIdeas: [
      "In 1915, Ernest Shackleton's ship Endurance was trapped and crushed by Antarctic sea ice.",
      "Shackleton led his 28 men across the ice to Elephant Island, then sailed a small boat 1,300 kilometers to South Georgia for help.",
      "Through determination and careful leadership, every member of the crew survived.",
    ],
    glossary: [
      ["expedition", "a long journey made for a special purpose, such as exploration"],
      ["floe", "a large sheet of floating ice"],
      ["morale", "the confidence and spirit of a group"],
      ["perilous", "full of danger"],
    ],
    body: `In August 1914, the British explorer Ernest Shackleton set sail on one of the most ambitious expeditions of his era. His goal was to become the first person to cross the entire continent of Antarctica on foot. He would never set foot on the continent. Instead, his expedition became one of the most remarkable survival stories in history.

In January 1915, Shackleton's ship, the Endurance, became trapped in the thick sea ice of the Weddell Sea. For months, the ice drifted slowly with the currents, carrying the frozen ship along with it. The crew of twenty-eight men waited, hoping the ice would release them in the spring. Instead, the pressure of the shifting ice gradually crushed the ship's wooden hull. In November 1915, the Endurance sank, leaving the men stranded on the floating ice with three small lifeboats, their dogs, and whatever supplies they had saved.

Shackleton understood that keeping up the crew's morale was as important as food and shelter. He maintained regular routines, organized games and songs, and kept a close eye on any man who seemed discouraged. He also made a point of sharing hardships equally; on one occasion, he gave away his own warm mittens to a crew member.

For five months, the men camped on drifting ice floes. When the ice finally began to break apart in April 1916, they launched the lifeboats and, after a perilous week at sea, reached Elephant Island, a barren, rocky outpost where no ship was likely to find them. Shackleton realized that rescue would come only if someone went for help.

He chose five men and set out in the largest lifeboat, the James Caird, which was less than seven meters long. Their destination was the island of South Georgia, where a whaling station operated, roughly 1,300 kilometers away across some of the stormiest ocean on Earth. For sixteen days, they battled towering waves and freezing spray, navigating by the sun when it appeared through the clouds. Astonishingly, they reached South Georgia, but they had landed on the wrong side of the island. Shackleton and two companions then crossed its unmapped, glacier-covered mountains on foot, a journey of about thirty-six hours, before stumbling into the whaling station.

It took four attempts to reach Elephant Island through the ice, but on August 30, 1916, a ship finally arrived. Every one of the men left behind was alive. Despite nearly two years of hardship, not a single member of the Endurance crew had died. In 2022, explorers located the wreck of the Endurance on the floor of the Weddell Sea, about three thousand meters below the surface.`,
    questions: [
      mc("main_idea", "closed", "Which statement best expresses the central idea of the passage?",
        "Although the expedition failed in its goal, Shackleton's leadership helped every crew member survive.",
        [["Shackleton was the first person to cross Antarctica.", "opposite"], ["The James Caird was less than seven meters long.", "too_narrow"], ["All polar expeditions end in disaster.", "too_broad"]],
        "The passage tells how a failed expedition became a story of survival due to leadership.",
        "Despite nearly two years of hardship, not a single member of the Endurance crew had died.", 2),
      oe("key_details", "closed", "Put these events in the order they happened.",
        ["The Endurance is crushed by ice and sinks.", "The men reach Elephant Island in lifeboats.", "Shackleton sails the James Caird to South Georgia.", "A ship rescues the men on Elephant Island."],
        "The ship sank, the men reached Elephant Island, Shackleton sailed for help, and rescue followed.",
        "It took four attempts to reach Elephant Island through the ice, but on August 30, 1916, a ship finally arrived.", 2),
      ep("inference", "Why did Shackleton pay so much attention to the crew's morale?",
        "He understood that discouragement could be as dangerous to survival as cold or hunger.",
        [["He wanted to win a prize for the happiest crew.", "not_in_text"], ["He had too much free time on the ice.", "not_in_text"], ["He planned to leave the crew behind.", "opposite"]],
        "The passage says morale was as important to him as food and shelter.",
        "Shackleton understood that keeping up the crew's morale was as important as food and shelter.", 3),
      mc("vocab_context", "open", 'As used in the passage, "perilous" most nearly means',
        "dangerous",
        [["peaceful", "opposite"], ["very long", "true_but_irrelevant"], ["well planned", "not_in_text"]],
        "A week at sea in small boats among breaking ice was full of danger.",
        "When the ice finally began to break apart in April 1916, they launched the lifeboats and, after a perilous week at sea, reached Elephant Island, a barren, rocky outpost where no ship was likely to find them.", 2),
      mc("author_purpose", "open", "Why does the author mention that Shackleton gave away his own mittens?",
        "To illustrate his practice of sharing hardships equally with his crew",
        [["To show that he was careless with his gear", "opposite"], ["To explain how cold Antarctica is", "true_but_irrelevant"], ["To suggest he did not need mittens", "not_in_text"]],
        "The example supports the point that he shared hardships to keep morale up.",
        "He also made a point of sharing hardships equally; on one occasion, he gave away his own warm mittens to a crew member.", 3),
      mc("text_structure", "open", "How does the first paragraph set up the rest of the passage?",
        "It reveals that the expedition's original goal failed and hints that survival became the real story.",
        [["It describes the rescue in detail.", "not_in_text"], ["It explains how the wreck was found.", "not_in_text"], ["It compares Shackleton with other explorers.", "not_in_text"]],
        "The opening tells us the goal was never reached and that it became a survival story.",
        "Instead, his expedition became one of the most remarkable survival stories in history.", 3),
    ],
  },
  {
    slug: "the-algorithm-picks-your-song",
    title: "How the Algorithm Picks Your Song",
    genre: "informational",
    tags: ["tech", "movies"],
    rating: 8,
    knowledgeDemand: 3,
    purpose: "As you read, figure out how recommendation systems decide what to suggest, and what trade-offs they create.",
    keyIdeas: [
      "Recommendation algorithms suggest songs, videos, and shows by analyzing patterns in users' behavior.",
      "Collaborative filtering recommends what similar users enjoyed, while content-based filtering matches item features.",
      "These systems are convenient but can create 'filter bubbles' that narrow what people encounter.",
    ],
    glossary: [
      ["algorithm", "a set of step-by-step rules a computer follows"],
      ["collaborative", "involving the combined actions of many people"],
      ["engagement", "how much attention and time people give to something"],
      ["diverse", "showing a lot of variety"],
    ],
    body: `Open almost any music or video app, and within seconds it offers a list of suggestions that seem to know your tastes surprisingly well. These suggestions are not chosen by a person. They are generated by recommendation algorithms, sets of rules that analyze enormous amounts of data to predict what you are most likely to enjoy next.

One common approach is called collaborative filtering. The idea is that people who have agreed in the past will probably agree in the future. If you and thousands of other listeners have played many of the same songs, the system assumes your tastes are similar. When those listeners discover a song you have never heard, the algorithm predicts that you may like it too. Collaborative filtering does not need to understand anything about the music itself; it relies entirely on patterns in the collective behavior of users.

A second approach, called content-based filtering, focuses on the characteristics of the items. A music service might analyze each song's tempo, instruments, energy, and mood, while a movie service might use genre, actors, and themes. If you repeatedly watch fast-paced science fiction films, the system will recommend other films with similar features. Most modern services combine both methods and add many other signals, such as the time of day, how long you watch before skipping, and what you search for.

These systems offer real benefits. With millions of songs and videos available, no one could sort through everything alone. Recommendations help listeners discover new artists and help lesser-known creators find audiences they might never have reached otherwise.

They also create trade-offs worth understanding. Many platforms design their algorithms to maximize engagement, the amount of time users spend on the app. Content that keeps people watching or listening tends to be recommended more often, which is not always the same as content that is most valuable or accurate. In addition, because algorithms suggest things similar to what you already like, they can gradually narrow the range of what you encounter. Some researchers call this effect a "filter bubble." A listener who only ever follows recommendations may hear an increasingly similar set of songs, while a news reader may see mostly stories that confirm views they already hold.

Recommendation algorithms are powerful tools, but they work best when people use them thoughtfully. Occasionally searching for something new, exploring a different genre, or seeking out diverse sources can help ensure that the algorithm widens your world rather than shrinking it.`,
    questions: [
      mc("main_idea", "closed", "Which statement best expresses the central idea of the passage?",
        "Recommendation algorithms use patterns in data to predict what people will like, which brings both benefits and trade-offs.",
        [["Collaborative filtering does not analyze music itself.", "too_narrow"], ["Algorithms should be banned from all apps.", "opposite"], ["People always choose their own music without help.", "opposite"]],
        "The passage explains how the systems work and weighs their benefits and drawbacks.",
        "Recommendation algorithms are powerful tools, but they work best when people use them thoughtfully.", 2),
      mc("key_details", "closed", "How does collaborative filtering decide what to recommend?",
        "By suggesting what users with similar past behavior have enjoyed",
        [["By analyzing a song's tempo and instruments", "true_but_irrelevant"], ["By asking a music expert", "opposite"], ["By choosing songs at random", "not_in_text"]],
        "It relies on patterns in the behavior of similar users, not features of the music.",
        "The idea is that people who have agreed in the past will probably agree in the future.", 2),
      ep("inference", "Why might an algorithm designed to maximize engagement not always recommend the best content?",
        "Content that keeps people watching is not necessarily the most valuable or accurate.",
        [["Engagement algorithms only recommend old content.", "not_in_text"], ["Users never watch recommended content.", "opposite"], ["Engagement makes apps run slower.", "not_in_text"]],
        "The passage notes the difference between attention-holding content and valuable content.",
        "Content that keeps people watching or listening tends to be recommended more often, which is not always the same as content that is most valuable or accurate.", 4),
      mc("vocab_context", "open", 'As used in the passage, "engagement" most nearly means',
        "the amount of time and attention users give",
        [["a promise to marry", "true_but_irrelevant"], ["a battle between armies", "not_in_text"], ["the cost of a subscription", "not_in_text"]],
        "The passage defines engagement as the time users spend on the app.",
        "Many platforms design their algorithms to maximize engagement, the amount of time users spend on the app.", 2),
      mc("text_structure", "open", "How does the fourth paragraph relate to the fifth?",
        "The fourth presents benefits, and the fifth presents drawbacks.",
        [["Both describe how collaborative filtering works.", "not_in_text"], ["The fifth paragraph repeats the fourth.", "not_in_text"], ["The fourth gives a solution to a problem in the fifth.", "opposite"]],
        "'These systems offer real benefits' is followed by 'They also create trade-offs.'",
        "They also create trade-offs worth understanding.", 3),
      mc("author_purpose", "open", "What is the author's main purpose in the final paragraph?",
        "To encourage readers to use recommendations thoughtfully and seek variety",
        [["To explain content-based filtering", "not_in_text"], ["To argue that algorithms are harmless", "opposite"], ["To list the most popular music apps", "not_in_text"]],
        "The author suggests specific habits to keep algorithms from narrowing your world.",
        "Occasionally searching for something new, exploring a different genre, or seeking out diverse sources can help ensure that the algorithm widens your world rather than shrinking it.", 3),
    ],
  },
  {
    slug: "the-four-minute-mile",
    title: "Breaking the Four-Minute Barrier",
    genre: "informational",
    tags: ["sports", "history", "biographies"],
    rating: 7,
    knowledgeDemand: 3,
    purpose: "As you read, figure out why breaking the four-minute mile mattered beyond the race itself.",
    keyIdeas: [
      "On May 6, 1954, Roger Bannister became the first person to run a mile in under four minutes.",
      "He used scientific training and help from pacemakers to achieve the record.",
      "After Bannister's run, others quickly broke the barrier, suggesting that belief in limits can hold people back.",
    ],
    glossary: [
      ["barrier", "something that blocks progress"],
      ["pacemaker", "in racing, a runner who sets a fast pace to help another"],
      ["psychological", "having to do with the mind and emotions"],
      ["meticulous", "extremely careful and precise"],
    ],
    body: `For decades, the four-minute mile was one of the most famous goals in sports. Top runners had come tantalizingly close; the Swedish runners Gunder Hägg and Arne Andersson had lowered the record to 4 minutes and 1.4 seconds in 1945. Then the record stood still for nine years. Some people began to wonder whether the human body was simply incapable of going faster, and the four-minute mark came to seem like a barrier that could not be crossed.

Roger Bannister did not fit the image of a full-time athlete. He was a medical student in London who squeezed his training into breaks between hospital work, often running for less than an hour a day. Yet he approached running with the meticulous mind of a scientist. He studied how the body uses oxygen, experimented with interval training, in which runners alternate fast laps with short recovery periods, and analyzed exactly how fast he needed to run each lap.

He also understood that he could not do it alone. Bannister calculated that he needed to run four laps averaging just under sixty seconds each. Running at an even pace is far more efficient than speeding up and slowing down, but it is difficult to judge speed precisely while exhausted. So he recruited two friends and fellow runners, Chris Brasher and Chris Chataway, to act as pacemakers, running in front of him to set the pace for the first three laps.

On May 6, 1954, at a track in Oxford, the weather was cold and gusty, and Bannister nearly decided not to race. Shortly before the start, the wind eased. Brasher led for the first two laps, then Chataway took over. With about 300 yards to go, Bannister surged past and sprinted for the finish, collapsing as he crossed the line. When the announcer began, "The time was three..." the rest of his words were drowned out by the roar of the crowd. Bannister had run the mile in 3 minutes and 59.4 seconds.

What happened next is perhaps even more remarkable. Just forty-six days later, the Australian runner John Landy broke Bannister's record. Within a few years, many more runners had run a mile in under four minutes. The human body had not suddenly changed. Many observers concluded that the barrier had been partly psychological: once runners knew it could be done, they believed they could do it too.

Today, more than a thousand runners have broken four minutes, and the world record stands at 3 minutes and 43.13 seconds. Bannister went on to become a respected neurologist, but he is still remembered for the day he proved that a limit is sometimes only a belief.`,
    questions: [
      mc("main_idea", "closed", "Which statement best expresses the central idea of the passage?",
        "Bannister's careful preparation broke the four-minute mile and showed that some limits are partly mental.",
        [["John Landy was the fastest runner in history.", "too_narrow"], ["The human body cannot run a mile in under four minutes.", "opposite"], ["Medical students make the best athletes.", "too_broad"]],
        "The passage describes how Bannister broke the barrier and what it revealed about limits.",
        "Many observers concluded that the barrier had been partly psychological: once runners knew it could be done, they believed they could do it too.", 2),
      mc("key_details", "closed", "What role did Chris Brasher and Chris Chataway play?",
        "They ran in front of Bannister to set an even pace.",
        [["They timed the race with stopwatches.", "not_in_text"], ["They tried to beat Bannister to the finish.", "opposite"], ["They coached him at the hospital.", "not_in_text"]],
        "They were pacemakers for the first three laps.",
        "So he recruited two friends and fellow runners, Chris Brasher and Chris Chataway, to act as pacemakers, running in front of him to set the pace for the first three laps.", 2),
      ep("inference", "Why is it significant that John Landy broke the record only forty-six days later?",
        "It suggests the barrier had been partly about belief rather than physical ability.",
        [["It proves Bannister's record was measured incorrectly.", "not_in_text"], ["It shows that Landy trained with Bannister.", "not_in_text"], ["It means the track in Oxford was too slow.", "not_in_text"]],
        "Bodies didn't change in 46 days, so belief must have played a role.",
        "The human body had not suddenly changed.", 4),
      mc("vocab_context", "open", 'As used in the passage, "meticulous" most nearly means',
        "very careful and precise",
        [["fast and careless", "opposite"], ["tired", "not_in_text"], ["lucky", "not_in_text"]],
        "Bannister studied oxygen use and calculated lap times exactly.",
        "Yet he approached running with the meticulous mind of a scientist.", 2),
      mc("author_purpose", "open", "Why does the author describe the announcer's words being drowned out by the crowd?",
        "To capture the excitement of the moment the record was broken",
        [["To show the announcer made a mistake", "not_in_text"], ["To explain how races are timed", "not_in_text"], ["To suggest the crowd was angry", "opposite"]],
        "The crowd roared as soon as they heard 'three,' knowing the barrier was broken.",
        "When the announcer began, \"The time was three...\" the rest of his words were drowned out by the roar of the crowd.", 3),
      mc("text_structure", "open", "How does the first paragraph prepare the reader for Bannister's achievement?",
        "It shows how long the record had stood and how impossible the goal had come to seem.",
        [["It describes Bannister's medical career.", "not_in_text"], ["It explains interval training.", "not_in_text"], ["It tells the outcome of the 1954 race.", "not_in_text"]],
        "Establishing the barrier first makes breaking it more dramatic.",
        "Some people began to wonder whether the human body was simply incapable of going faster, and the four-minute mark came to seem like a barrier that could not be crossed.", 3),
    ],
  },
  {
    slug: "should-homework-be-optional",
    title: "Rethinking Homework",
    genre: "argument",
    tags: ["science"],
    rating: 7.5,
    knowledgeDemand: 3,
    purpose: "As you read, figure out whether the writer wants to eliminate homework or change it, and why.",
    keyIdeas: [
      "The writer argues that middle schools should limit homework and make it purposeful rather than eliminate it.",
      "Research suggests that large amounts of homework have limited benefits for younger students and can crowd out sleep and other activities.",
      "Short, meaningful assignments such as reading and practice can still be valuable.",
    ],
    glossary: [
      ["correlation", "a connection between two things that tend to change together"],
      ["diminishing returns", "a point after which more effort brings smaller benefits"],
      ["purposeful", "having a clear and useful aim"],
      ["advocate", "to publicly support an idea"],
    ],
    body: `Few school traditions are as widely accepted, or as widely complained about, as homework. Many middle school students spend hours each evening on worksheets, projects, and study guides after a full day of classes. Some critics argue that homework should be abolished entirely. I do not advocate eliminating it. Instead, I believe middle schools should limit homework to short, purposeful assignments, because the evidence suggests that more homework is not always better.

Research on homework is more complicated than many people assume. Studies of high school students have generally found a positive correlation between homework and achievement, though the benefits level off after a certain amount of time each night. For younger students, the relationship is weaker. Several reviews of the research have found that homework in elementary and early middle school shows only a small connection to test scores. In other words, homework seems to follow a pattern of diminishing returns: a modest amount may help, but piling on more brings smaller and smaller benefits.

Meanwhile, excessive homework has real costs. Time spent on assignments late into the evening is time not spent sleeping, and many adolescents already sleep far less than doctors recommend. It also crowds out activities that matter for healthy development, such as exercise, family time, creative hobbies, and simply reading for pleasure. When homework becomes a source of nightly stress and conflict, it can make students resent learning instead of enjoying it.

Some teachers worry that limiting homework will leave students unprepared or unable to practice new skills. This concern is valid, which is why the goal should be better homework, not no homework. A short set of math problems that reinforces the day's lesson, twenty minutes of independent reading, or reviewing vocabulary can be valuable. What students do not need is busywork, long assignments that repeat what they already know or that require help from parents to complete.

Schools could adopt clear guidelines, such as a maximum amount of nightly homework that increases gradually with each grade, and teachers could coordinate so that big projects do not all fall due in the same week. Every assignment should have a clear answer to a simple question: what will students learn from doing this?

Homework should be a tool for learning, not a measure of how busy students can be kept. By assigning less but making it count, schools could protect students' time and well-being while keeping the practice that truly helps.`,
    questions: [
      mc("main_idea", "closed", "What is the writer's central claim?",
        "Middle schools should limit homework to short, purposeful assignments.",
        [["Homework should be completely abolished.", "opposite"], ["Students should do more homework every night.", "opposite"], ["High school homework improves achievement.", "too_narrow"]],
        "The writer explicitly rejects abolishing homework and argues for limiting it.",
        "Instead, I believe middle schools should limit homework to short, purposeful assignments, because the evidence suggests that more homework is not always better.", 2),
      mc("key_details", "closed", "What does research suggest about homework for younger students?",
        "It shows only a small connection to test scores.",
        [["It strongly improves test scores.", "opposite"], ["It always lowers test scores.", "opposite"], ["It has never been studied.", "not_in_text"]],
        "Reviews found a weaker relationship for elementary and early middle school students.",
        "Several reviews of the research have found that homework in elementary and early middle school shows only a small connection to test scores.", 3),
      ep("argument_evidence", "How does the writer respond to teachers who worry that students will be unprepared?",
        "By agreeing practice matters and recommending better, shorter assignments rather than none",
        [["By saying practice is never useful", "opposite"], ["By suggesting parents teach the lessons instead", "opposite"], ["By claiming test scores do not matter", "not_in_text"]],
        "The writer calls the concern valid and argues for better homework, not no homework.",
        "This concern is valid, which is why the goal should be better homework, not no homework.", 3),
      mc("vocab_context", "open", 'As used in the passage, "diminishing returns" most nearly means',
        "smaller benefits from each additional amount of effort",
        [["increasing rewards for more work", "opposite"], ["returning homework late", "not_in_text"], ["losing homework completely", "not_in_text"]],
        "The writer explains that more homework brings smaller and smaller benefits.",
        "In other words, homework seems to follow a pattern of diminishing returns: a modest amount may help, but piling on more brings smaller and smaller benefits.", 3),
      ms("argument_evidence", "open", "Select the two costs of excessive homework that the writer describes.",
        ["It reduces the time students have for sleep.", "It crowds out activities like exercise and hobbies."],
        [["It makes school buildings more crowded.", "not_in_text"], ["It requires schools to buy more textbooks.", "not_in_text"]],
        "The third paragraph names lost sleep and lost time for other healthy activities.",
        "Time spent on assignments late into the evening is time not spent sleeping, and many adolescents already sleep far less than doctors recommend.", 2),
      mc("inference", "open", 'What does the writer suggest by posing the question "what will students learn from doing this?"',
        "That any assignment without a clear learning purpose should not be given",
        [["To argue that students learn nothing from homework", "opposite"], ["To quiz the reader on the passage", "not_in_text"], ["To show that teachers do not plan lessons", "not_in_text"]],
        "The question is a standard for judging if homework has a clear purpose.",
        "Every assignment should have a clear answer to a simple question: what will students learn from doing this?", 3),
    ],
  },
  {
    slug: "the-tortoise-census",
    title: "The Tortoise Census",
    genre: "fiction",
    tags: ["animals", "science"],
    rating: 6.5,
    knowledgeDemand: 2,
    purpose: "As you read, figure out why Theo changes his mind about the importance of counting tortoises.",
    keyIdeas: [
      "Theo reluctantly joins his mother, a biologist, on a desert survey to count endangered tortoises.",
      "The work is slow and hot, and at first Theo thinks it is pointless.",
      "Finding a tiny young tortoise shows him that the population is reproducing, and he understands why careful data matters.",
    ],
    glossary: [
      ["census", "an official count of a population"],
      ["burrow", "a hole or tunnel dug by an animal as a home"],
      ["juvenile", "young; not yet fully grown"],
      ["transect", "a straight line across an area along which scientists count or measure things"],
    ],
    body: `By ten in the morning, the desert was already shimmering with heat, and Theo had decided that counting tortoises was the most boring job on the planet.

His mother, a wildlife biologist, had brought him along on her annual census of desert tortoises in the scrubland east of the mountains. He had imagined something exciting, maybe radio collars and helicopters. Instead, the team walked in slow, straight lines called transects, ten meters apart, scanning the ground beneath every creosote bush for burrows or the domed shell of a tortoise. Every few minutes, someone stopped to record a GPS location, a burrow measurement, or the faint scrape of a track in the sand.

"We've walked three kilometers," Theo complained during a water break, "and we've found two tortoises. Two. Is this really science?"

His mother wiped her forehead with her sleeve. "Two is information," she said. "Twenty years ago, we'd have found eight on this same stretch. Ten years ago, five. If we stop counting, we won't know whether they're recovering or disappearing until it's too late to help."

Theo shrugged and kept walking, but he started looking a little more carefully.

Just after noon, near a clump of dry grass, he saw something that looked like a pebble. Then it moved. Theo crouched down. It was a tortoise no bigger than the palm of his hand, its shell still soft-looking and patterned in neat brown and gold squares.

"Mom!" he called, more loudly than he intended.

The whole team gathered. His mother knelt beside him and let out a long breath, almost a laugh. "A juvenile," she said softly. "Maybe a year old, maybe two. We haven't recorded a hatchling on this transect in six years."

"Is that good?" Theo asked.

"It means adults here are still breeding, and at least one of their babies has survived," she said. "Young tortoises are easy prey for ravens. Most never make it this far. This little one tells us the population still has a future." She handed him the clipboard. "Your find. You record it."

Theo wrote down the time, the location, and the shell length, which was just forty-three millimeters. He checked each number twice. Somehow, writing it down made the tiny tortoise feel even more important, as though it would now be remembered.

When they finished the transect late that afternoon, the final count was three tortoises. Theo no longer thought it was a small number. It was a number that meant something.`,
    questions: [
      mc("main_idea", "closed", "Which statement best expresses the theme of the story?",
        "Careful, patient observation can reveal things that matter, even when results seem small.",
        [["Scientists should always use helicopters.", "not_in_text"], ["Deserts are too hot for children.", "too_narrow"], ["Counting animals is a waste of time.", "opposite"]],
        "Theo learns that even small numbers carry important meaning.",
        "It was a number that meant something.", 2),
      mc("key_details", "closed", "How many tortoises had the team found on the same stretch twenty years earlier?",
        "Eight",
        [["Five", "true_but_irrelevant"], ["Two", "true_but_irrelevant"], ["Three", "true_but_irrelevant"]],
        "Theo's mother compares today's two with eight twenty years ago and five ten years ago.",
        "Twenty years ago, we'd have found eight on this same stretch.", 2),
      ep("inference", "Why is Theo's mother so moved by the juvenile tortoise?",
        "It shows that the tortoises are still successfully breeding.",
        [["It is the largest tortoise they have found.", "opposite"], ["It is a new species no one has seen.", "not_in_text"], ["It means the census is over.", "not_in_text"]],
        "A young survivor shows adults are breeding and the population has a future.",
        "\"It means adults here are still breeding, and at least one of their babies has survived,\" she said.", 3),
      mc("vocab_context", "open", 'As used in the story, "juvenile" most nearly means',
        "young",
        [["dangerous", "not_in_text"], ["very old", "opposite"], ["sick", "not_in_text"]],
        "The tortoise is 'maybe a year old, maybe two.'",
        "\"A juvenile,\" she said softly.", 1),
      mc("point_of_view", "open", "How does Theo's view of the census change over the story?",
        "He goes from thinking it is pointless to seeing why each count matters.",
        [["He becomes more bored as the day goes on.", "opposite"], ["He decides he wants to collect tortoises as pets.", "not_in_text"], ["He thinks it is exciting from the very start.", "opposite"]],
        "He starts out complaining but ends seeing the count as meaningful.",
        "Theo no longer thought it was a small number.", 2),
      mc("author_purpose", "open", "Why does the mother hand Theo the clipboard to record his find?",
        "To give him responsibility and help him feel part of the scientific work",
        [["Because she is too tired to write", "not_in_text"], ["Because she does not believe the tortoise is real", "opposite"], ["To punish him for complaining", "not_in_text"]],
        "Recording the data makes Theo feel the tortoise matters and that he contributed.",
        "\"Your find. You record it.\"", 3),
    ],
  },
  {
    slug: "the-debate-coach",
    title: "The Other Side",
    genre: "fiction",
    tags: ["history"],
    rating: 6.5,
    knowledgeDemand: 2,
    purpose: "As you read, figure out what Maya learns from having to argue a side she disagrees with.",
    keyIdeas: [
      "Maya, a confident debater, is assigned to argue against a position she strongly supports.",
      "Researching the other side forces her to understand reasonable arguments she had dismissed.",
      "She learns that understanding opposing views makes her own thinking stronger, even though she keeps her original opinion.",
    ],
    glossary: [
      ["rebuttal", "a response that argues against what someone else has said"],
      ["concede", "to admit that something is true, often reluctantly"],
      ["dismissive", "showing that you think something is not worth considering"],
      ["resolution", "the statement that a debate is about"],
    ],
    body: `Maya Chen had won four debate tournaments in a row, and she had a reputation for being impossible to rattle. So when Coach Delgado announced the topics for the regional finals, she leaned back in her chair, already confident.

The resolution was whether their city should replace its oldest park with a new housing development. Maya had strong opinions about the park. She had learned to ride a bike on its paths, and she had signed a petition to protect it.

"Maya," Coach Delgado said, reading from his list, "you'll argue in favor of the development."

Her confidence vanished. "But I'm against it."

"I know," he said calmly. "That's why I chose you."

For the next week, Maya researched with the reluctance of someone eating vegetables she hated. At first, she skimmed the articles only to find weaknesses she could attack later. But the more she read, the harder it became to remain dismissive. She learned that rents in the city had nearly doubled in ten years and that many families, including some of her classmates', had moved away because they could no longer afford to live there. She read an interview with a nurse who commuted ninety minutes each way because she could not find an apartment near the hospital. The development would include hundreds of apartments, many of them set aside for lower-income families.

None of that made Maya love the idea of losing the park. But it made her realize the question was more complicated than she had believed. The people on the other side were not careless or greedy. They were trying to solve a real problem.

At the finals, Maya argued for the development with a precision that surprised even her. When her opponent claimed that no one in the city needed more housing, Maya's rebuttal was immediate and specific, filled with the statistics she had once intended to ignore. She was willing to concede that the park mattered to many people, which made her argument sound fair rather than one-sided. The judges awarded her team the victory.

Afterward, Coach Delgado found her packing up her notes. "So," he asked, "did you change your mind?"

Maya thought for a long moment. "No," she said. "I still want to save the park. But now I know what I'd have to answer. If I want to convince anyone, I need a plan that helps those families too."

Coach Delgado smiled. "That," he said, "is the difference between having an opinion and understanding an issue."`,
    questions: [
      mc("main_idea", "closed", "Which statement best expresses the theme of the story?",
        "Understanding opposing views can strengthen your own thinking, even if your opinion stays the same.",
        [["Debaters should always argue for what they believe.", "opposite"], ["Parks are more important than housing.", "not_in_text"], ["Winning tournaments is what matters most.", "not_in_text"]],
        "Maya keeps her opinion but understands the issue much better.",
        "\"That,\" he said, \"is the difference between having an opinion and understanding an issue.\"", 2),
      mc("key_details", "closed", "Why had many families moved away from the city?",
        "Rents had risen so much that they could no longer afford to live there.",
        [["The park had been closed.", "not_in_text"], ["The schools had too many debaters.", "not_in_text"], ["The hospital had moved.", "not_in_text"]],
        "Maya learned that rents nearly doubled, forcing families out.",
        "She learned that rents in the city had nearly doubled in ten years and that many families, including some of her classmates', had moved away because they could no longer afford to live there.", 2),
      ep("inference", "Why did Coach Delgado choose Maya specifically to argue for the development?",
        "He wanted her to understand a side she had dismissed.",
        [["He thought she supported the development.", "opposite"], ["He wanted her team to lose.", "not_in_text"], ["She asked to argue that side.", "opposite"]],
        "He says he chose her because she was against it, pushing her to engage with the other view.",
        "\"I know,\" he said calmly. \"That's why I chose you.\"", 3),
      mc("vocab_context", "open", 'As used in the story, "dismissive" most nearly means',
        "treating something as not worth considering",
        [["deeply respectful", "opposite"], ["extremely tired", "not_in_text"], ["very loud", "not_in_text"]],
        "At first Maya read only to find weaknesses, not to understand.",
        "But the more she read, the harder it became to remain dismissive.", 2),
      mc("point_of_view", "open", "How does Maya's view of the people who support the development change?",
        "She stops seeing them as careless and recognizes they are trying to solve a real problem.",
        [["She decides they are greedy.", "opposite"], ["She thinks they want to destroy every park.", "too_broad"], ["Her view of them does not change.", "opposite"]],
        "Her research shows her their concerns are reasonable.",
        "The people on the other side were not careless or greedy.", 3),
      mc("author_purpose", "open", "Why does the author include the detail about the nurse with a ninety-minute commute?",
        "To give a concrete human example of the housing problem",
        [["To show that nurses work too much", "not_in_text"], ["To explain how debates are judged", "not_in_text"], ["To argue that the hospital should move", "not_in_text"]],
        "A specific person's struggle makes the problem real for Maya and the reader.",
        "She read an interview with a nurse who commuted ninety minutes each way because she could not find an apartment near the hospital.", 3),
    ],
  },
  {
    slug: "the-translator",
    title: "The Translator",
    genre: "fiction",
    tags: ["biographies"],
    rating: 6,
    knowledgeDemand: 2,
    purpose: "As you read, figure out how Ines feels about translating for her grandmother and why.",
    keyIdeas: [
      "Ines translates between English and Portuguese for her grandmother at a doctor's appointment.",
      "She feels pressure and embarrassment, and struggles with medical words she does not know.",
      "Her grandmother's pride and a helpful doctor show Ines that her bilingual skill is a gift and a responsibility.",
    ],
    glossary: [
      ["moderation", "not too much; within sensible limits"],
      ["interpret", "to translate spoken words from one language to another"],
      ["prescription", "a doctor's written order for medicine"],
      ["flustered", "nervous and confused"],
    ],
    body: `Ines was twelve the first time she had to interpret at the doctor's office, and she felt as if she were taking a test she had not studied for.

Her grandmother, Avó Lúcia, had moved from Portugal to live with them the year before. She cooked extraordinary soup, told stories about the fishing village where she had grown up, and spoke almost no English. Usually Ines's father went with her to appointments, but he was working late, so Ines sat beside her grandmother in the clinic's small examination room, her hands sweaty in her lap.

At first it went smoothly. The doctor, a young woman with a calm voice, asked how Avó Lúcia was sleeping, and Ines translated the question into Portuguese and the answer back into English. Then the doctor began explaining blood pressure medication, and the words grew longer and stranger. "It's important to monitor for dizziness," the doctor said, "especially when she stands up quickly. This prescription should be taken once daily with food."

Ines froze. She knew the Portuguese word for dizzy, but what was "monitor"? She tried to remember and felt her face burning. She was suddenly aware of how she must sound, stumbling over words in both languages, and she wished she could disappear.

The doctor noticed. Instead of hurrying, she pulled her chair closer and spoke more slowly. "Let's try it a simpler way," she said. "She should watch for feeling dizzy when she stands up. One pill every morning, with breakfast."

That, Ines could translate. She explained it carefully, and Avó Lúcia nodded, then asked a question of her own about whether she could still drink her strong morning coffee. The doctor laughed and said yes, in moderation, and Ines translated that too.

On the bus ride home, Ines stared out the window, still flustered. "I'm sorry, Avó," she said in Portuguese. "I didn't know all the words."

Her grandmother took her hand. "Do you know what I saw today?" she said. "I saw a girl who carried two languages at once, like two full buckets of water, and did not spill. When I was your age, I could not read. You opened a door for me today."

Ines did not answer right away. She had always thought of speaking Portuguese at home as something ordinary, sometimes even something to hide at school. Now it felt different, like a key that only she held.

That night, she wrote the new medical words in a notebook, in both languages, so that next time she would be ready.`,
    questions: [
      mc("main_idea", "closed", "Which statement best expresses the theme of the story?",
        "Being able to speak two languages is a valuable gift that can help the people you love.",
        [["Doctors should always speak Portuguese.", "not_in_text"], ["Translating is too difficult for children.", "opposite"], ["Coffee is bad for blood pressure.", "not_in_text"]],
        "Ines comes to see her bilingual ability as a key that helps her grandmother.",
        "Now it felt different, like a key that only she held.", 2),
      mc("key_details", "closed", "What did the doctor do when she noticed Ines was struggling?",
        "She spoke more slowly and explained the instructions in simpler words.",
        [["She called Ines's father.", "not_in_text"], ["She ended the appointment early.", "not_in_text"], ["She asked another nurse to translate.", "not_in_text"]],
        "The doctor pulled her chair closer and simplified her language.",
        "Instead of hurrying, she pulled her chair closer and spoke more slowly.", 2),
      ep("inference", "Why does Avó Lúcia compare Ines to someone carrying two full buckets of water?",
        "To praise Ines for managing a difficult task carefully without failing",
        [["To ask Ines to help carry water at home", "not_in_text"], ["To suggest Ines made too many mistakes", "opposite"], ["To describe her fishing village", "true_but_irrelevant"]],
        "The image shows how hard it is to balance two languages, and Ines did not 'spill.'",
        "\"I saw a girl who carried two languages at once, like two full buckets of water, and did not spill.", 4),
      mc("vocab_context", "open", 'As used in the story, "flustered" most nearly means',
        "nervous and unsettled",
        [["calm and relaxed", "opposite"], ["angry at her grandmother", "not_in_text"], ["sleepy", "not_in_text"]],
        "Ines is still upset and embarrassed about stumbling over words.",
        "On the bus ride home, Ines stared out the window, still flustered.", 2),
      mc("point_of_view", "open", "How does Ines's attitude toward speaking Portuguese change?",
        "She goes from seeing it as ordinary or something to hide to seeing it as valuable.",
        [["She decides to stop speaking Portuguese.", "opposite"], ["She always thought it was her greatest skill.", "opposite"], ["She becomes embarrassed of her grandmother.", "not_in_text"]],
        "Her grandmother's words help her see her language skill differently.",
        "She had always thought of speaking Portuguese at home as something ordinary, sometimes even something to hide at school.", 3),
      mc("author_purpose", "open", "Why does the story end with Ines writing medical words in a notebook?",
        "To show she has accepted the responsibility and wants to do better next time",
        [["To show she is doing homework for school", "not_in_text"], ["To suggest she plans to become a doctor", "too_broad"], ["To show she gave up on translating", "opposite"]],
        "Preparing for next time shows she has embraced her role.",
        "That night, she wrote the new medical words in a notebook, in both languages, so that next time she would be ready.", 3),
    ],
  },
  {
    slug: "end-the-clock-change",
    title: "Stop Changing the Clocks",
    genre: "argument",
    tags: ["science", "geography"],
    rating: 7.5,
    knowledgeDemand: 3,
    purpose: "As you read, figure out the writer's claim and evaluate the evidence about health and safety.",
    keyIdeas: [
      "The writer argues that the United States should stop switching clocks twice a year and choose one permanent time.",
      "Studies suggest the spring time change disrupts sleep and is linked to short-term increases in accidents and health problems.",
      "The writer acknowledges disagreement over which time to keep but argues ending the switch is the first step.",
    ],
    glossary: [
      ["daylight saving time", "the practice of setting clocks forward one hour in spring and back in fall"],
      ["disrupt", "to interrupt or throw into disorder"],
      ["permanent", "lasting without change"],
      ["consensus", "general agreement among a group"],
    ],
    body: `Twice a year, most Americans perform a strange ritual. In March, we move our clocks forward one hour and lose an hour of sleep. In November, we move them back. This practice, known as daylight saving time, has been standard in most of the United States since the Uniform Time Act of 1966. I believe it is time to end the twice-yearly switch and adopt a single, permanent time all year round.

The strongest reason is health. Our bodies run on internal clocks that are closely tied to sunlight. When the clocks suddenly jump forward in spring, many people lose sleep and spend days feeling groggy as their bodies adjust. Several studies have found that the days immediately following the spring change are associated with small but measurable increases in heart attacks and in traffic accidents, likely because tired people are less alert. Sleep scientists have also expressed concern about the effects of the change on teenagers, who already struggle to get enough sleep.

A second reason is that the original justification for the practice no longer holds up well. Daylight saving time was widely adopted during the First World War, when Germany introduced it in 1916 to save fuel, and other countries soon followed. The idea was that shifting daylight into the evening would reduce the need for artificial lighting. Today, however, lighting accounts for a far smaller share of energy use, and studies of whether daylight saving time saves energy have produced mixed results.

Finally, the switch is simply inconvenient. Schedules shift, meetings across time zones are confused, and people miss appointments. Some places have already opted out; Hawaii and most of Arizona do not change their clocks, and residents there seem to manage perfectly well.

Opponents of my position point out that there is no consensus about which time to keep. Some people prefer permanent standard time, which sleep experts often favor because it keeps clock time closer to the sun's natural cycle. Others prefer permanent daylight saving time for its brighter evenings. This disagreement is real, and it deserves careful debate. But it is not a reason to continue a system that disrupts millions of people's sleep twice a year.

Choosing between the two options will require compromise. The first step, though, should be one that most people already seem to want: stop changing the clocks.`,
    questions: [
      mc("main_idea", "closed", "What is the writer's central claim?",
        "The United States should stop switching clocks and choose a single permanent time.",
        [["Daylight saving time should be extended to six months.", "not_in_text"], ["Hawaii should change its clocks.", "opposite"], ["Everyone should sleep an extra hour in March.", "not_in_text"]],
        "The claim is stated at the end of the first paragraph.",
        "I believe it is time to end the twice-yearly switch and adopt a single, permanent time all year round.", 1),
      mc("key_details", "closed", "Why was daylight saving time first widely adopted?",
        "To save fuel during the First World War",
        [["To give children more time to play", "not_in_text"], ["To help farmers harvest crops", "not_in_text"], ["To reduce traffic accidents", "opposite"]],
        "Germany introduced it in 1916 to save fuel, and others followed.",
        "Daylight saving time was widely adopted during the First World War, when Germany introduced it in 1916 to save fuel, and other countries soon followed.", 2),
      ep("argument_evidence", "Which evidence best supports the writer's claim that the spring time change affects health and safety?",
        "Studies linking the days after the spring change to increases in heart attacks and traffic accidents",
        [["The fact that Hawaii does not change its clocks", "true_but_irrelevant"], ["The history of the Uniform Time Act", "true_but_irrelevant"], ["Disagreement about which time to keep", "true_but_irrelevant"]],
        "These studies directly connect the time change to health and safety effects.",
        "Several studies have found that the days immediately following the spring change are associated with small but measurable increases in heart attacks and in traffic accidents, likely because tired people are less alert.", 3),
      mc("vocab_context", "open", 'As used in the passage, "consensus" most nearly means',
        "general agreement",
        [["strong disagreement", "opposite"], ["a government law", "not_in_text"], ["a type of clock", "not_in_text"]],
        "The writer notes people disagree about which time to keep, so there is no agreement.",
        "Opponents of my position point out that there is no consensus about which time to keep.", 2),
      mc("inference", "open", "Why does the writer mention Hawaii and Arizona?",
        "To show that places without the switch function well, supporting the idea of ending it",
        [["To argue that everyone should move to Hawaii", "not_in_text"], ["To prove that those states save the most energy", "not_in_text"], ["To show that the switch is required by law everywhere", "opposite"]],
        "Their residents 'manage perfectly well' without changing clocks.",
        "Some places have already opted out; Hawaii and most of Arizona do not change their clocks, and residents there seem to manage perfectly well.", 3),
      mc("text_structure", "open", "How does the writer handle the disagreement over which permanent time to choose?",
        "The writer acknowledges it as a real debate but argues it should not prevent ending the switch.",
        [["The writer ignores it entirely.", "opposite"], ["The writer says it proves the switch should continue.", "opposite"], ["The writer insists that standard time is the only option.", "not_in_text"]],
        "The writer grants the disagreement but separates it from the main claim.",
        "But it is not a reason to continue a system that disrupts millions of people's sleep twice a year.", 3),
    ],
  },
  {
    slug: "tide-pool",
    title: "Tide Pool",
    genre: "poetry",
    tags: ["animals", "science"],
    rating: 8,
    knowledgeDemand: 2,
    purpose: "As you read, figure out how the poet makes a small tide pool seem like a whole world.",
    keyIdeas: [
      "The speaker kneels by a tide pool left behind when the ocean pulls back.",
      "The pool is described as a miniature world full of creatures, color, and drama.",
      "The poem suggests that paying close attention reveals wonder in small, overlooked places.",
    ],
    glossary: [
      ["sculpin", "a small fish with a large head that lives near the sea floor"],
      ["anemone", "a soft sea animal with tentacles that looks like a flower"],
      ["kingdom", "a country or world ruled over by someone"],
      ["intricate", "having many small, detailed parts"],
    ],
    body: `When the ocean draws its long breath back
and leaves the black rocks gleaming in the sun,
a hollow brimming with the sea remains,
a kingdom small enough to hold in one

cupped hand, if hands could hold a world like this:
green anemones unfurling, petal-soft,
that close like fists around a passing shrimp;
a hermit crab who wears his house aloft

and trades it for a larger shell in spring;
a sea star, orange as a harvest moon,
who moves so slowly that a careless eye
would swear it hadn't moved since afternoon.

I kneel until my knees forget the stone.
A sculpin flickers, hides beneath the weed.
The barnacles, all shut like tiny doors,
are waiting for the water that they need.

How intricate, how busy and how still,
this world that no one put here on display,
that most will step across without a glance
on their way to the wide and famous bay.

Then, in a rush of foam, the tide returns.
The kingdom vanishes beneath the gray,
but I will carry it, the way you keep
a secret someone told you yesterday.`,
    questions: [
      mc("main_idea", "closed", "Which statement best expresses the theme of the poem?",
        "Paying close attention can reveal wonder in small places that others overlook.",
        [["Tide pools are dangerous places to visit.", "not_in_text"], ["The ocean is larger than a tide pool.", "too_narrow"], ["Hermit crabs change shells in spring.", "too_narrow"]],
        "The speaker discovers an intricate world that most people 'step across without a glance.'",
        "that most will step across without a glance", 3),
      mc("key_details", "closed", "What happens at the end of the poem?",
        "The tide returns and covers the pool.",
        [["The speaker takes the sea star home.", "not_in_text"], ["The anemones swim away.", "not_in_text"], ["The sun sets over the bay.", "not_in_text"]],
        "A rush of foam brings the tide back and the kingdom vanishes.",
        "Then, in a rush of foam, the tide returns.", 2),
      ep("inference", "What does the speaker mean by saying \"I will carry it\" at the end?",
        "The speaker will remember the tide pool and treasure the experience.",
        [["The speaker will carry seawater home in a bucket.", "not_in_text"], ["The speaker will bring the animals to a museum.", "not_in_text"], ["The speaker will forget the pool quickly.", "opposite"]],
        "Comparing it to keeping a secret shows the memory is precious and personal.",
        "but I will carry it, the way you keep\na secret someone told you yesterday.", 4),
      mc("vocab_context", "open", 'As used in the poem, "intricate" most nearly means',
        "detailed and complex",
        [["empty and plain", "opposite"], ["loud and crowded", "not_in_text"], ["dangerous", "not_in_text"]],
        "The pool is full of many small, detailed living things.",
        "How intricate, how busy and how still,", 3),
      mc("author_purpose", "open", 'Why does the poet call the tide pool "a kingdom"?',
        "To suggest that this small pool is a complete world of its own",
        [["To show that a king owns the beach", "not_in_text"], ["To describe the size of the bay", "true_but_irrelevant"], ["To suggest the pool is empty", "opposite"]],
        "Calling it a kingdom makes the tiny pool feel like a full world with its own residents.",
        "a kingdom small enough to hold in one", 3),
      mc("point_of_view", "open", "How does the speaker's attitude differ from that of the people heading to the bay?",
        "The speaker slows down to notice the pool, while others pass it by without looking.",
        [["The speaker is in a hurry to reach the bay.", "opposite"], ["The others study the pool more closely.", "opposite"], ["Both ignore the tide pool.", "opposite"]],
        "Others step across 'without a glance'; the speaker kneels and watches closely.",
        "I kneel until my knees forget the stone.", 3),
    ],
  },
];
