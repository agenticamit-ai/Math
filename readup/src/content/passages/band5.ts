import { ep, mc, ms, oe, type SeedPassage } from "../types";

export const band5: SeedPassage[] = [
  {
    slug: "the-comet-watcher",
    title: "The Comet Watcher",
    genre: "fiction",
    tags: ["space", "science"],
    rating: 5.5,
    knowledgeDemand: 2,
    purpose: "As you read, figure out why Jonah keeps going out to the field even when the comet is hard to see.",
    keyIdeas: [
      "Jonah wants to see a comet that only returns about every seventy years.",
      "Clouds and city lights block his view, and his sister thinks he is wasting his time.",
      "His patience pays off when he finally sees the comet and shares the moment with his sister.",
    ],
    glossary: [
      ["persistence", "continuing to try even when something is difficult"],
      ["faint", "hard to see or hear; not bright"],
      ["skeptical", "doubting that something is true or worthwhile"],
      ["binoculars", "a device with two lenses for seeing faraway things"],
    ],
    body: `According to the astronomy website Jonah checked every morning, the comet would be visible for only about two weeks, low in the western sky just after sunset, and it would not return for roughly seventy years. Jonah did the math in his head. The next time it came back, he would be over eighty years old.

So on the first evening, he carried his grandfather's old binoculars to the empty field behind the library and waited. A thick blanket of clouds rolled in before the sky was even dark. On the second evening, the clouds cleared, but the glow from the shopping center turned the horizon a dull orange, and he could not find anything that looked like the pictures online.

His older sister, Rachel, was skeptical. "You've spent four nights staring at a parking-lot glow," she said, leaning in his doorway. "Maybe it's just not bright enough to see from here."

"Maybe," Jonah admitted. "But maybe tonight the air will be clearer."

On the fifth evening, a cold wind had swept the haze away, and the sky deepened from gold to violet to a blue so dark it was nearly black. Jonah raised the binoculars and slowly scanned just above the tree line. At first he saw only the first few stars. Then he stopped. There, slightly to the left of a bright planet, hung a faint smudge of light with a pale tail fanning out behind it, like a brushstroke someone had forgotten to finish.

He was so startled that he almost dropped the binoculars. With trembling hands, he called home. Twenty minutes later, Rachel was standing beside him in the field, her breath clouding in the cold air.

She looked through the binoculars for a long time without speaking. Finally she lowered them. "Okay," she said quietly. "That was worth four nights of parking-lot glow."

Jonah grinned. He decided persistence, not luck, was what had brought the comet into view.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the theme of the story?",
        "Patience and persistence can lead to rare and rewarding experiences.",
        [
          ["City lights make it impossible to see anything in the sky.", "too_broad"],
          ["Older siblings are always right.", "opposite"],
          ["Binoculars are better than telescopes.", "not_in_text"],
        ],
        "Jonah keeps trying night after night, and his persistence finally lets him see the comet.",
        "He decided persistence, not luck, was what had brought the comet into view.",
        2,
      ),
      oe(
        "key_details",
        "closed",
        "Put these events in the order they happened.",
        [
          "Clouds roll in before the sky gets dark.",
          "Rachel says Jonah has spent four nights staring at a glow.",
          "Jonah spots a faint smudge with a pale tail.",
          "Rachel looks through the binoculars and agrees it was worth it.",
        ],
        "Jonah faces clouds, then city glow and doubt, then sees the comet and shares it.",
        "On the fifth evening, a cold wind had swept the haze away, and the sky deepened from gold to violet to a blue so dark it was nearly black.",
        3,
      ),
      ep(
        "inference",
        "Why does Jonah feel such urgency to see the comet?",
        "If he misses it, he may not have another chance until he is very old.",
        [
          ["His teacher assigned it as homework.", "not_in_text"],
          ["He wants to prove his sister wrong.", "too_narrow"],
          ["The comet is about to crash into Earth.", "not_in_text"],
        ],
        "The comet returns only about every seventy years, so this might be Jonah's only chance as a young person.",
        "The next time it came back, he would be over eighty years old.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the story, "skeptical" most nearly means',
        "doubtful",
        [
          ["excited", "opposite"],
          ["angry", "not_in_text"],
          ["sleepy", "not_in_text"],
        ],
        "Rachel doubts that Jonah will be able to see the comet from town.",
        "His older sister, Rachel, was skeptical.",
        2,
      ),
      mc(
        "point_of_view",
        "open",
        "How does Rachel's attitude change by the end of the story?",
        "She goes from doubting Jonah's effort to appreciating it.",
        [
          ["She becomes more annoyed with Jonah.", "opposite"],
          ["She decides astronomy is boring.", "opposite"],
          ["She stays exactly the same.", "not_in_text"],
        ],
        "At first she teases him; at the end she says the comet was worth the effort.",
        "\"Okay,\" she said quietly. \"That was worth four nights of parking-lot glow.\"",
        2,
      ),
      mc(
        "author_purpose",
        "open",
        'Why does the author describe the comet as "like a brushstroke someone had forgotten to finish"?',
        "To help the reader picture the comet's faint, trailing tail",
        [
          ["To show that the comet was painted on the sky", "not_in_text"],
          ["To suggest the comet was very bright", "opposite"],
          ["To explain why comets have tails", "not_in_text"],
        ],
        "An unfinished brushstroke fades out at one end, like the comet's pale tail.",
        "There, slightly to the left of a bright planet, hung a faint smudge of light with a pale tail fanning out behind it, like a brushstroke someone had forgotten to finish.",
        3,
      ),
    ],
  },
  {
    slug: "how-volcanoes-build-islands",
    title: "How Volcanoes Build Islands",
    genre: "informational",
    tags: ["geography", "science"],
    rating: 5.5,
    knowledgeDemand: 3,
    purpose: "As you read, figure out why the Hawaiian Islands form a line from oldest to youngest.",
    keyIdeas: [
      "The Hawaiian Islands formed over a hot spot, where melted rock rises from deep inside Earth.",
      "The Pacific Plate slowly moves over the hot spot, carrying older islands away while new ones form.",
      "As a result, the islands get older and more worn down toward the northwest, and a new volcano is growing underwater.",
    ],
    glossary: [
      ["magma", "melted rock beneath Earth's surface"],
      ["tectonic plate", "a huge, slowly moving slab of Earth's outer shell"],
      ["erosion", "the gradual wearing away of rock or soil by wind, water, or ice"],
      ["seamount", "an underwater mountain"],
    ],
    body: `Most islands are pieces of land that rise above the sea, but the Hawaiian Islands were built entirely by volcanoes, layer upon layer of cooled lava piling up from the ocean floor. Understanding how this happened requires looking far beneath the surface, at a place geologists call a hot spot.

A hot spot is an area where unusually hot material rises from deep within Earth's mantle. As it nears the surface, some of the rock melts into magma. The magma pushes upward through cracks in the crust and erupts onto the sea floor as lava. Over hundreds of thousands of years, eruption after eruption builds an enormous underwater mountain. Eventually, the mountain breaks the surface of the ocean and becomes an island.

Here is the surprising part: the hot spot stays in roughly the same place, but the ground above it does not. Earth's outer shell is broken into giant slabs called tectonic plates, which move very slowly. The Pacific Plate, which carries the Hawaiian Islands, creeps toward the northwest at about seven centimeters per year, or roughly as fast as your fingernails grow. As the plate moves, it carries each volcano away from the hot spot, cutting it off from its supply of magma. The volcano goes quiet, and a new one begins forming over the hot spot.

This process explains why the islands form a long chain. The Big Island of Hawaii, which sits over the hot spot today, is the youngest and still has active volcanoes. Islands farther to the northwest, such as Kauai, are millions of years older. Without fresh lava, they have been shaped by erosion from rain, waves, and wind into steep cliffs and deep valleys.

The story is not over. About thirty kilometers off the southeast coast of the Big Island, a new volcano called Kamaʻehuakanaloa is growing on the sea floor. Right now it is a seamount, still almost a kilometer below the waves. In tens of thousands of years, it may become the next Hawaiian island.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the central idea of the passage?",
        "The Hawaiian Islands formed as a moving plate carried volcanoes away from a fixed hot spot.",
        [
          ["Kauai has steep cliffs and deep valleys.", "too_narrow"],
          ["All islands on Earth were formed by volcanoes.", "too_broad"],
          ["The hot spot moves while the plate stays still.", "opposite"],
        ],
        "The passage explains how the hot spot and the moving Pacific Plate together created a chain of islands.",
        "This process explains why the islands form a long chain.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "How fast does the Pacific Plate move, according to the passage?",
        "About seven centimeters per year",
        [
          ["About thirty kilometers per year", "true_but_irrelevant"],
          ["About one kilometer per century", "not_in_text"],
          ["It does not move at all", "opposite"],
        ],
        "The plate creeps about seven centimeters a year, roughly as fast as fingernails grow.",
        "The Pacific Plate, which carries the Hawaiian Islands, creeps toward the northwest at about seven centimeters per year, or roughly as fast as your fingernails grow.",
        2,
      ),
      ep(
        "inference",
        "Why does a Hawaiian volcano eventually stop erupting?",
        "The moving plate carries it away from the hot spot and its supply of magma.",
        [
          ["It runs out of ocean water.", "not_in_text"],
          ["Erosion fills in its crater.", "true_but_irrelevant"],
          ["The hot spot cools down completely.", "opposite"],
        ],
        "Once the plate moves a volcano off the hot spot, it no longer gets magma.",
        "As the plate moves, it carries each volcano away from the hot spot, cutting it off from its supply of magma.",
        4,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, "erosion" most nearly means',
        "the slow wearing away of rock",
        [
          ["the eruption of new lava", "opposite"],
          ["the movement of tectonic plates", "true_but_irrelevant"],
          ["the melting of rock into magma", "not_in_text"],
        ],
        "Rain, waves, and wind wear the old islands into cliffs and valleys.",
        "Without fresh lava, they have been shaped by erosion from rain, waves, and wind into steep cliffs and deep valleys.",
        2,
      ),
      mc(
        "text_structure",
        "open",
        'How does the paragraph beginning "Here is the surprising part" relate to the paragraph before it?',
        "It adds a key piece of the explanation: the plate moves over the fixed hot spot.",
        [
          ["It disagrees with the previous paragraph.", "opposite"],
          ["It tells a story about a scientist.", "not_in_text"],
          ["It repeats the same information in different words.", "not_in_text"],
        ],
        "The earlier paragraph explains how one volcano forms; this one explains why a chain forms.",
        "Here is the surprising part: the hot spot stays in roughly the same place, but the ground above it does not.",
        3,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the author compare the plate's speed to the growth of fingernails?",
        "To help readers understand how slowly the plate moves",
        [
          ["To show that plates are made of the same material as nails", "not_in_text"],
          ["To suggest the plate moves quickly", "opposite"],
          ["To explain how islands are measured", "not_in_text"],
        ],
        "Fingernail growth is a familiar example of very slow movement.",
        "The Pacific Plate, which carries the Hawaiian Islands, creeps toward the northwest at about seven centimeters per year, or roughly as fast as your fingernails grow.",
        2,
      ),
    ],
  },
  {
    slug: "phones-in-lockers",
    title: "Phones in Lockers, Minds in Class",
    genre: "argument",
    tags: ["tech"],
    rating: 5.5,
    knowledgeDemand: 2,
    purpose: "As you read, figure out the writer's claim and decide whether the evidence is convincing.",
    keyIdeas: [
      "The writer argues that students should keep phones in lockers during the school day.",
      "Phones distract students from learning and reduce face-to-face conversation at lunch.",
      "The writer addresses the safety concern by pointing out that the office phone and teacher phones remain available.",
    ],
    glossary: [
      ["notification", "an alert from a phone app, like a buzz or a pop-up message"],
      ["distraction", "something that pulls your attention away"],
      ["emergency", "a serious, unexpected situation that needs quick action"],
      ["policy", "a rule or plan that an organization follows"],
    ],
    body: `Every few minutes during class, a phone somewhere in the room buzzes. Heads turn, a student glances down, and for a moment the lesson disappears. Our school currently allows students to keep phones in their pockets as long as they are silent, but silent is not the same as invisible. I believe our school should adopt a policy requiring students to keep phones in their lockers from the first bell to the last.

The most important reason is attention. Learning requires sustained focus, and phones are designed to interrupt it. Each notification, whether it is a message, a game reminder, or a video recommendation, invites us to look away. Even when a student resists checking, part of the mind keeps wondering what the message said. Several researchers have reported that students simply having a phone nearby can perform worse on tests of memory and attention than students whose phones are in another room. If the goal of school is learning, removing a constant distraction makes sense.

A second reason is conversation. Walk through our cafeteria at lunch and you will see tables of students scrolling silently, side by side. Lunch is one of the only parts of the day when we can talk freely with friends, tell stories, and meet new people. Without phones, those tables would become louder in the best possible way.

Some parents worry that students need phones for safety, especially in an emergency. This concern deserves a serious answer. In an emergency, students would still be able to reach their families through the front office, and every teacher carries a phone. Parents with urgent messages could call the office, as families did for decades before smartphones. A locker policy does not cut students off from help; it simply moves the phone a short walk away.

Our phones are powerful tools, but tools belong in a toolbox when we are not using them. For seven hours a day, the locker is the right toolbox.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "What is the writer's central claim?",
        "Students should keep their phones in lockers during the school day.",
        [
          ["Phones should be banned from all homes.", "too_broad"],
          ["Students talk too much at lunch.", "opposite"],
          ["Phones are useful tools.", "true_but_irrelevant"],
        ],
        "The claim appears at the end of the first paragraph: phones in lockers from first bell to last.",
        "I believe our school should adopt a policy requiring students to keep phones in their lockers from the first bell to the last.",
        1,
      ),
      ms(
        "argument_evidence",
        "closed",
        "Select the two reasons the writer gives to support the policy.",
        ["Phones interrupt students' focus in class.", "Phones reduce conversation at lunch."],
        [
          ["Phones are too expensive for students.", "not_in_text"],
          ["Phones break easily at school.", "not_in_text"],
        ],
        "The writer's 'most important reason' is attention, and the 'second reason' is conversation.",
        "The most important reason is attention.",
        2,
      ),
      ep(
        "argument_evidence",
        "Which evidence does the writer use to support the claim that phones hurt attention?",
        "Research reporting that having a phone nearby can lower memory and attention scores",
        [
          ["Stories about students scrolling at lunch", "true_but_irrelevant"],
          ["The fact that teachers carry phones", "true_but_irrelevant"],
          ["A survey showing students dislike phones", "not_in_text"],
        ],
        "The writer cites researchers who found that a nearby phone can lower test performance.",
        "Several researchers have reported that students simply having a phone nearby can perform worse on tests of memory and attention than students whose phones are in another room.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the first paragraph, the phrase "silent is not the same as invisible" means that',
        "a phone can still distract students even when it makes no sound",
        [
          ["silent phones cannot be seen", "opposite"],
          ["students should turn their volume up", "not_in_text"],
          ["phones should be hidden in pockets", "not_in_text"],
        ],
        "The writer's point is that a quiet phone can still draw attention when it buzzes or lights up.",
        "Our school currently allows students to keep phones in their pockets as long as they are silent, but silent is not the same as invisible.",
        3,
      ),
      mc(
        "text_structure",
        "open",
        "What is the purpose of the fourth paragraph?",
        "To respond to a concern that opponents of the policy might raise",
        [
          ["To add a third reason for the policy", "not_in_text"],
          ["To admit the policy is a mistake", "opposite"],
          ["To describe the cafeteria at lunch", "true_but_irrelevant"],
        ],
        "The writer names the safety worry and explains how students could still reach help.",
        "Some parents worry that students need phones for safety, especially in an emergency.",
        3,
      ),
      mc(
        "inference",
        "open",
        'What does the writer suggest by saying tables at lunch "would become louder in the best possible way"?',
        "Students would talk and laugh with each other more.",
        [
          ["The cafeteria would become too noisy to use.", "opposite"],
          ["Students would play music from their phones.", "not_in_text"],
          ["Teachers would need to make more announcements.", "not_in_text"],
        ],
        "Without phones, the silent scrolling would turn into conversation.",
        "Without phones, those tables would become louder in the best possible way.",
        3,
      ),
    ],
  },
  {
    slug: "mary-anning-fossil-hunter",
    title: "Mary Anning, Fossil Hunter",
    genre: "informational",
    tags: ["history", "science", "biographies"],
    rating: 5.5,
    knowledgeDemand: 3,
    purpose: "As you read, figure out why Mary Anning's discoveries mattered and why she was not always given credit.",
    keyIdeas: [
      "Mary Anning grew up poor in Lyme Regis, England, and collected fossils from the seaside cliffs.",
      "She made major discoveries, including an ichthyosaur and the first complete plesiosaur.",
      "Although scientists relied on her knowledge, she was often denied credit because she was a woman and not wealthy.",
    ],
    glossary: [
      ["fossil", "the preserved remains or traces of an ancient living thing"],
      ["extinct", "no longer existing anywhere"],
      ["specimen", "an example of something used for study"],
      ["recognition", "credit or praise for something you have done"],
    ],
    body: `In the early 1800s, the cliffs along the coast of Lyme Regis, in southern England, were crumbling, dangerous, and full of secrets. Every winter storm pulled down chunks of rock and exposed the bones of creatures that had lived there long before. A young woman named Mary Anning became one of the greatest experts at finding them.

Mary was born in 1799 into a poor family. Her father, a cabinetmaker, sometimes sold "curiosities" from the cliffs to tourists, and he taught his children how to search for them. After he died, the family badly needed money, so Mary and her brother Joseph kept collecting. Around 1811, Joseph found a strange skull, and over the following months, Mary, who was only about twelve, carefully uncovered the rest of the skeleton. The creature had a long snout and a body like a dolphin's. Scientists eventually named it an ichthyosaur, which means "fish lizard."

Mary's discoveries kept coming. In 1823, she found the first complete skeleton of a plesiosaur, a sea reptile with a tiny head, a long neck, and four flippers. Some experts were so astonished that they suspected it was a fake, until careful study proved it was real. A few years later, she found one of the first flying reptiles discovered in Britain.

These specimens helped change how people understood the history of life. In Mary's time, many people believed that animals could not become extinct. Her fossils were strong evidence that whole groups of creatures had lived and vanished long before humans existed.

Yet Mary received little recognition while she was alive. Scientists visited her shop to learn from her and bought her fossils, but they often published papers about her discoveries without mentioning her name. As a woman, she was not allowed to join the Geological Society of London. Today, however, she is celebrated as a pioneer whose sharp eyes and patient work helped build the science of paleontology.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the central idea of the passage?",
        "Mary Anning made important fossil discoveries but was not fully credited in her lifetime.",
        [
          ["The cliffs at Lyme Regis are dangerous.", "too_narrow"],
          ["All early scientists were wealthy women.", "opposite"],
          ["Plesiosaurs had small heads and long necks.", "too_narrow"],
        ],
        "The passage describes her discoveries and the lack of recognition she received.",
        "Yet Mary received little recognition while she was alive.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "What did Mary find in 1823?",
        "The first complete skeleton of a plesiosaur",
        [
          ["The skull of an ichthyosaur", "true_but_irrelevant"],
          ["A dinosaur egg", "not_in_text"],
          ["A cabinet her father made", "not_in_text"],
        ],
        "Joseph found the ichthyosaur skull earlier; Mary found the plesiosaur in 1823.",
        "In 1823, she found the first complete skeleton of a plesiosaur, a sea reptile with a tiny head, a long neck, and four flippers.",
        2,
      ),
      ep(
        "inference",
        "Why were Mary's fossils important to ideas about extinction?",
        "They showed that whole groups of animals had disappeared long ago.",
        [
          ["They proved that ichthyosaurs still lived in the sea.", "opposite"],
          ["They showed that fossils could be faked.", "not_in_text"],
          ["They helped her family earn money.", "true_but_irrelevant"],
        ],
        "Many people believed animals could not become extinct, and her fossils were evidence against that.",
        "Her fossils were strong evidence that whole groups of creatures had lived and vanished long before humans existed.",
        4,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, "recognition" most nearly means',
        "credit for one's work",
        [
          ["the ability to remember faces", "true_but_irrelevant"],
          ["a fossil specimen", "not_in_text"],
          ["a membership fee", "not_in_text"],
        ],
        "The paragraph explains that scientists used her discoveries without crediting her.",
        "Yet Mary received little recognition while she was alive.",
        2,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the author mention that some experts thought the plesiosaur was a fake?",
        "To show how surprising and unusual the discovery was",
        [
          ["To suggest that Mary was dishonest", "opposite"],
          ["To explain how fossils are cleaned", "not_in_text"],
          ["To describe the shape of the plesiosaur", "true_but_irrelevant"],
        ],
        "Experts were so astonished they doubted it, which shows how remarkable it was.",
        "Some experts were so astonished that they suspected it was a fake, until careful study proved it was real.",
        3,
      ),
      mc(
        "point_of_view",
        "open",
        "Which phrase best shows the author's attitude toward Mary Anning?",
        "\"a pioneer whose sharp eyes and patient work helped build the science\"",
        [
          ["\"the family badly needed money\"", "true_but_irrelevant"],
          ["\"crumbling, dangerous, and full of secrets\"", "true_but_irrelevant"],
          ["\"not allowed to join the Geological Society\"", "true_but_irrelevant"],
        ],
        "The author's admiring words show respect for Mary's work.",
        "Today, however, she is celebrated as a pioneer whose sharp eyes and patient work helped build the science of paleontology.",
        3,
      ),
    ],
  },
  {
    slug: "the-relay",
    title: "The Relay",
    genre: "fiction",
    tags: ["sports"],
    rating: 5.5,
    knowledgeDemand: 1,
    purpose: "As you read, figure out why Devon makes the choice he does at the end of the race.",
    keyIdeas: [
      "Devon is the anchor of his relay team and wants to win the championship.",
      "Practice handoffs have been messy, and the team argues about who is to blame.",
      "Devon decides the team matters more than individual credit and chooses a safe handoff, helping the team finish together.",
    ],
    glossary: [
      ["baton", "the stick passed between runners in a relay race"],
      ["anchor", "the last runner in a relay race"],
      ["exchange zone", "the marked area where relay runners must pass the baton"],
      ["deliberately", "on purpose"],
    ],
    body: `Devon had been chosen as the anchor of the four-by-one-hundred relay, the runner who would carry the baton across the finish line at the district championship. For weeks, he had pictured the moment: the crowd on its feet, his legs blurring, his teammates shouting his name.

The problem was the handoffs. In practice, the team had dropped the baton three times, and every drop had turned into an argument. Marcus, who ran the third leg, insisted that Devon took off too early. Devon insisted that Marcus slowed down too much at the end of his leg. Coach Bell finally stopped them both. "A relay isn't four races," she said. "It's one race run by four people. You win the handoffs, or you lose the race."

On the day of the championship, the starting gun cracked, and the first two runners ran nearly perfect legs. When Marcus rounded the curve, the team was in second place, only a stride behind the leader. Devon crouched at the start of the exchange zone, watching Marcus come closer. Every instinct told him to take off early and grab the baton at full speed, the way the fastest teams did. If it worked, he might pass the leader before the finish.

But Devon could see that Marcus was tiring. His arms were swinging wider, and his face was tight with effort. If Devon left too soon, Marcus might not be able to catch him, and the baton could hit the track again.

So Devon deliberately waited half a beat longer. He started running, reached back, and felt the baton slap firmly into his palm. Then he ran harder than he had ever run.

He did not catch the leader. The team finished second, three-tenths of a second behind. But when Devon turned around, Marcus was already jogging toward him with his hand raised for a high five. "Cleanest handoff all season," Marcus gasped.

Coach Bell smiled. "That," she said, "was a team race."`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the theme of the story?",
        "Working together as a team can matter more than individual glory.",
        [
          ["The fastest runner should always be the anchor.", "not_in_text"],
          ["Winning first place is the only thing that matters.", "opposite"],
          ["Relay batons are easy to drop.", "too_narrow"],
        ],
        "Devon gives up a chance at glory to make a safe handoff, and the team celebrates together.",
        "\"A relay isn't four races,\" she said. \"It's one race run by four people.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "Where did Devon's team finish in the championship?",
        "Second place",
        [
          ["First place", "opposite"],
          ["Last place", "not_in_text"],
          ["They were disqualified", "not_in_text"],
        ],
        "The team finished second, three-tenths of a second behind the leader.",
        "The team finished second, three-tenths of a second behind.",
        1,
      ),
      ep(
        "inference",
        "Why does Devon wait \"half a beat longer\" before he starts running?",
        "He sees that Marcus is tired and wants to make sure the handoff is safe.",
        [
          ["He is too tired to run.", "not_in_text"],
          ["Coach Bell signals him to wait.", "not_in_text"],
          ["He wants to let the other team win.", "opposite"],
        ],
        "Devon notices Marcus tiring and worries that leaving early would cause a drop.",
        "If Devon left too soon, Marcus might not be able to catch him, and the baton could hit the track again.",
        4,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the story, "deliberately" most nearly means',
        "on purpose",
        [
          ["by accident", "opposite"],
          ["very quickly", "not_in_text"],
          ["nervously", "not_in_text"],
        ],
        "Devon chooses to wait; it is a planned decision.",
        "So Devon deliberately waited half a beat longer.",
        2,
      ),
      mc(
        "point_of_view",
        "open",
        "How does Devon's relationship with Marcus change from the beginning to the end?",
        "They go from blaming each other to celebrating together.",
        [
          ["They become rivals for the anchor position.", "not_in_text"],
          ["They stop speaking to each other.", "opposite"],
          ["They were always close friends and nothing changes.", "opposite"],
        ],
        "Early on they argue about the drops; at the end Marcus runs over for a high five.",
        "But when Devon turned around, Marcus was already jogging toward him with his hand raised for a high five.",
        3,
      ),
      mc(
        "text_structure",
        "open",
        "How does the first paragraph help set up the ending?",
        "It shows Devon's dream of personal glory, which makes his later choice more meaningful.",
        [
          ["It explains the rules of the relay.", "not_in_text"],
          ["It describes Marcus's leg of the race.", "not_in_text"],
          ["It reveals that the team will win first place.", "opposite"],
        ],
        "Devon pictured winning alone, so choosing the safe handoff shows growth.",
        "For weeks, he had pictured the moment: the crowd on its feet, his legs blurring, his teammates shouting his name.",
        4,
      ),
    ],
  },
  {
    slug: "monarch-migration",
    title: "The Long Flight of the Monarchs",
    genre: "informational",
    tags: ["animals", "science", "geography"],
    rating: 5.5,
    knowledgeDemand: 3,
    purpose: "As you read, figure out what makes the monarch migration so unusual.",
    keyIdeas: [
      "Eastern monarch butterflies migrate up to about 4,800 kilometers to forests in central Mexico.",
      "The migrating generation lives much longer than summer monarchs and finds its way using the sun.",
      "Monarch numbers have dropped, and planting milkweed helps protect them.",
    ],
    glossary: [
      ["migration", "a long journey animals make from one region to another, often with the seasons"],
      ["generation", "all the living things born around the same time"],
      ["navigate", "to find one's way from one place to another"],
      ["habitat", "the natural home of a plant or animal"],
    ],
    body: `Every autumn, millions of orange-and-black monarch butterflies in eastern North America begin one of the most remarkable journeys in the animal kingdom. Leaving fields and gardens in Canada and the northern United States, they fly south, sometimes as far as 4,800 kilometers, to a small area of mountain forests in central Mexico. There, they cluster on fir trees by the thousands, so densely that branches can sag under their weight, and wait out the winter.

What makes this migration especially puzzling is that no single butterfly ever makes the round trip. Monarchs born in early summer live only two to six weeks. The butterflies that hatch at the end of summer, however, are different. This special "super generation" can live for up to eight or nine months. Instead of laying eggs right away, they store energy and begin the long flight south.

How do they navigate to a place they have never seen? Scientists have discovered that monarchs use the sun as a compass. Because the sun's position changes during the day, the butterflies also rely on an internal clock in their antennae to adjust their direction. Some evidence suggests they may also sense Earth's magnetic field, which could help on cloudy days.

In spring, the super generation flies north and lays eggs on milkweed, the only plant monarch caterpillars can eat. Their children and grandchildren continue the journey north, generation by generation, until a new super generation is born at summer's end and the cycle begins again.

Unfortunately, the number of monarchs spending the winter in Mexico has dropped sharply over the past few decades. Scientists point to several causes, including the loss of milkweed and of habitat along the migration route. Many families, schools, and communities are helping by planting milkweed and nectar flowers, creating small rest stops for a traveler that weighs less than a paper clip.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the central idea of the passage?",
        "Monarch butterflies make an extraordinary migration that depends on a long-lived generation and healthy habitat.",
        [
          ["Monarchs weigh less than a paper clip.", "too_narrow"],
          ["All butterflies migrate to Mexico.", "too_broad"],
          ["Monarch numbers are growing quickly.", "opposite"],
        ],
        "The passage explains the journey, how it works across generations, and the threats it faces.",
        "Every autumn, millions of orange-and-black monarch butterflies in eastern North America begin one of the most remarkable journeys in the animal kingdom.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "How long can the \"super generation\" of monarchs live?",
        "Up to eight or nine months",
        [
          ["Two to six weeks", "true_but_irrelevant"],
          ["About ten years", "not_in_text"],
          ["Only one day", "not_in_text"],
        ],
        "Summer monarchs live two to six weeks, but the super generation can live eight or nine months.",
        "This special \"super generation\" can live for up to eight or nine months.",
        2,
      ),
      ep(
        "inference",
        "Why would losing milkweed harm the monarch population?",
        "Monarch caterpillars can eat only milkweed, so fewer plants means fewer caterpillars survive.",
        [
          ["Adult monarchs use milkweed to navigate.", "not_in_text"],
          ["Milkweed keeps the fir trees in Mexico healthy.", "not_in_text"],
          ["Monarchs sleep inside milkweed flowers.", "not_in_text"],
        ],
        "Milkweed is the only food for monarch caterpillars.",
        "In spring, the super generation flies north and lays eggs on milkweed, the only plant monarch caterpillars can eat.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, "navigate" most nearly means',
        "find their way",
        [
          ["lay eggs", "true_but_irrelevant"],
          ["stay in one place", "opposite"],
          ["change color", "not_in_text"],
        ],
        "The paragraph explains how monarchs use the sun to find their route.",
        "How do they navigate to a place they have never seen?",
        2,
      ),
      mc(
        "text_structure",
        "open",
        "How does the third paragraph mainly connect to the rest of the passage?",
        "It answers a question about how monarchs find their way to Mexico.",
        [
          ["It describes why monarch numbers are falling.", "not_in_text"],
          ["It lists the countries monarchs fly through.", "not_in_text"],
          ["It explains what caterpillars eat.", "not_in_text"],
        ],
        "The paragraph opens with a question about navigation and then explains the sun compass.",
        "Scientists have discovered that monarchs use the sun as a compass.",
        3,
      ),
      mc(
        "author_purpose",
        "open",
        'Why does the author describe the monarch as "a traveler that weighs less than a paper clip"?',
        "To emphasize how impressive such a long journey is for such a tiny animal",
        [
          ["To explain how to weigh a butterfly", "not_in_text"],
          ["To show that monarchs are too weak to migrate", "opposite"],
          ["To compare monarchs with office supplies", "true_but_irrelevant"],
        ],
        "Pointing out the butterfly's tiny weight makes its 4,800-kilometer flight seem even more amazing.",
        "Many families, schools, and communities are helping by planting milkweed and nectar flowers, creating small rest stops for a traveler that weighs less than a paper clip.",
        3,
      ),
    ],
  },
  {
    slug: "ada-lovelace-first-programmer",
    title: "Ada Lovelace and the Machine That Could Think in Numbers",
    genre: "informational",
    tags: ["tech", "history", "biographies"],
    rating: 6,
    knowledgeDemand: 3,
    purpose: "As you read, figure out why some people call Ada Lovelace the first computer programmer.",
    keyIdeas: [
      "Ada Lovelace studied mathematics and worked with Charles Babbage on his design for the Analytical Engine.",
      "Her published notes included step-by-step instructions for the machine to calculate a series of numbers.",
      "She imagined that such machines could work with music and symbols, not just numbers, predicting modern computing.",
    ],
    glossary: [
      ["algorithm", "a step-by-step set of instructions for solving a problem"],
      ["analytical", "using careful, logical thinking to examine something"],
      ["vision", "an idea or picture of what the future could be like"],
      ["translate", "to change words from one language into another"],
    ],
    body: `Two hundred years ago, long before laptops or smartphones, a young English mathematician named Ada Lovelace imagined what computers might someday do. Many historians now call her the world's first computer programmer, even though the machine she wrote for was never actually built.

Ada was born in 1815. Her mother, who loved mathematics, made sure Ada received an unusually strong education in science and numbers at a time when most girls were not taught those subjects. When Ada was seventeen, she met Charles Babbage, an inventor who was designing enormous mechanical calculating machines made of gears, wheels, and levers. Ada was fascinated, and the two began a long friendship built on ideas.

Babbage's most ambitious design was called the Analytical Engine. Unlike simple calculators, it was meant to follow a series of instructions punched into cards, so that it could perform different calculations depending on the cards it was given. In other words, it could be programmed.

In 1843, Ada was asked to translate an article about the Analytical Engine from French into English. She did far more than translate it. She added her own notes, which ended up nearly three times longer than the original article. In one of them, she described, step by step, how the engine could calculate a complicated sequence of numbers known as Bernoulli numbers. This detailed plan is often considered the first published algorithm written for a machine.

Even more remarkable was Ada's vision of what such machines might become. Babbage mostly thought of his engine as a powerful number cruncher. Ada suggested that if music or other symbols could be represented by numbers, the engine might one day compose music or work with ideas beyond arithmetic. More than a century later, modern computers began doing exactly that.

Ada died in 1852, at only thirty-six. Today, the second Tuesday of October is celebrated as Ada Lovelace Day, honoring women in science, technology, engineering, and mathematics.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the central idea of the passage?",
        "Ada Lovelace wrote early instructions for a computing machine and imagined its future uses.",
        [
          ["Charles Babbage built the first smartphone.", "not_in_text"],
          ["Ada Lovelace translated an article from French.", "too_narrow"],
          ["Only mathematicians can understand computers.", "too_broad"],
        ],
        "The passage explains her algorithm and her vision of machines working with more than numbers.",
        "Many historians now call her the world's first computer programmer, even though the machine she wrote for was never actually built.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "What made the Analytical Engine different from simple calculators?",
        "It could follow different instructions given to it on punched cards.",
        [
          ["It was small enough to carry.", "opposite"],
          ["It was powered by electricity.", "not_in_text"],
          ["It could only add numbers.", "opposite"],
        ],
        "Its instructions came from punched cards, so it could be programmed.",
        "Unlike simple calculators, it was meant to follow a series of instructions punched into cards, so that it could perform different calculations depending on the cards it was given.",
        3,
      ),
      ep(
        "inference",
        "Why does the author say Ada \"did far more than translate\" the article?",
        "She added her own original ideas and instructions that went beyond the article.",
        [
          ["She translated it into many languages.", "not_in_text"],
          ["She rewrote it to remove Babbage's name.", "not_in_text"],
          ["She shortened the article.", "opposite"],
        ],
        "Her notes were nearly three times longer than the article and included an algorithm.",
        "She added her own notes, which ended up nearly three times longer than the original article.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, "algorithm" most nearly means',
        "a step-by-step set of instructions",
        [
          ["a type of musical rhythm", "true_but_irrelevant"],
          ["a machine made of gears", "not_in_text"],
          ["a random guess", "opposite"],
        ],
        "The passage describes her step-by-step plan for calculating numbers.",
        "This detailed plan is often considered the first published algorithm written for a machine.",
        2,
      ),
      mc(
        "point_of_view",
        "open",
        "How did Ada's view of the Analytical Engine differ from Babbage's?",
        "Babbage saw it mainly as a calculator, while Ada imagined it working with music and symbols.",
        [
          ["Babbage thought it could compose music, but Ada disagreed.", "opposite"],
          ["Ada believed it would never work.", "not_in_text"],
          ["They had exactly the same view.", "not_in_text"],
        ],
        "The passage contrasts Babbage's 'number cruncher' view with Ada's wider vision.",
        "Babbage mostly thought of his engine as a powerful number cruncher.",
        3,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the author mention that Ada's mother made sure she studied mathematics?",
        "To explain how Ada gained skills that were unusual for girls at the time",
        [
          ["To show that Ada disliked math", "opposite"],
          ["To describe Babbage's machines", "not_in_text"],
          ["To explain Ada Lovelace Day", "true_but_irrelevant"],
        ],
        "Her education helped prepare her for work most girls then were not taught.",
        "Her mother, who loved mathematics, made sure Ada received an unusually strong education in science and numbers at a time when most girls were not taught those subjects.",
        3,
      ),
    ],
  },
  {
    slug: "stop-motion-magic",
    title: "Stop-Motion Magic",
    genre: "informational",
    tags: ["movies", "tech"],
    rating: 5.5,
    knowledgeDemand: 2,
    purpose: "As you read, figure out why stop-motion films take so long to make.",
    keyIdeas: [
      "Stop-motion animation creates the illusion of movement from many still photographs.",
      "Animators move puppets tiny amounts between frames, often producing only seconds of film per day.",
      "Despite computers, many filmmakers still choose stop-motion because of its handmade, real-world look.",
    ],
    glossary: [
      ["frame", "one single still picture in a film"],
      ["illusion", "something that tricks the eye or mind into seeing what is not really there"],
      ["armature", "a wire or metal skeleton inside a puppet"],
      ["painstaking", "done with very great care and effort"],
    ],
    body: `Imagine moving a small clay figure a fraction of a centimeter, snapping a photograph, moving it again, and taking another photograph, thousands upon thousands of times. That painstaking process is how stop-motion animation is made, and it has produced some of the most beloved films ever created.

Stop-motion works because of a simple trick of human vision. When we see a series of still pictures in rapid succession, our brains blend them together and perceive smooth movement. Movies typically show twenty-four frames, or separate pictures, every second. In a stop-motion film, each frame is a photograph of real objects that the animator has adjusted by a tiny amount. Played back at full speed, the photographs create the illusion that the puppets are walking, talking, and breathing on their own.

Building the puppets is an art in itself. Many stop-motion characters have an armature, a metal skeleton with joints that can bend and hold a pose. The armature is covered with clay, foam, fabric, or silicone. For a character to speak, animators may replace its mouth or entire face for each frame, choosing from dozens or even hundreds of slightly different expressions.

The work is extraordinarily slow. On a feature film, a skilled animator might complete only a few seconds of finished footage in an entire day of work. A ninety-minute movie can take a team of animators years to finish. A single bump to the set or an unexpected change in lighting can ruin hours of careful shots.

With computer animation now able to create almost anything, why do filmmakers still choose stop-motion? Many say it is because audiences can sense the handmade quality. The fingerprints pressed into clay, the tiny stitches in a costume, and the real shadows cast by real lamps give stop-motion films a warmth that is difficult to copy. Every movement on the screen was once a decision made by a human hand.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "What is the central idea of the passage?",
        "Stop-motion is a slow, handmade animation method that many filmmakers still value.",
        [
          ["Movies show twenty-four frames per second.", "too_narrow"],
          ["Computer animation has replaced all other kinds.", "opposite"],
          ["Clay is the best material for art.", "too_broad"],
        ],
        "The passage explains how stop-motion works, why it is slow, and why people still use it.",
        "That painstaking process is how stop-motion animation is made, and it has produced some of the most beloved films ever created.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "What is an armature?",
        "A metal skeleton inside a puppet that can bend and hold a pose",
        [
          ["A camera used to take each frame", "not_in_text"],
          ["A set of mouths for a talking character", "true_but_irrelevant"],
          ["A type of clay", "not_in_text"],
        ],
        "The passage defines an armature as a jointed metal skeleton.",
        "Many stop-motion characters have an armature, a metal skeleton with joints that can bend and hold a pose.",
        2,
      ),
      ep(
        "inference",
        "Why might a small bump to the set be such a big problem for animators?",
        "It could move objects out of place and make shots no longer match.",
        [
          ["It would make the puppets talk.", "not_in_text"],
          ["It would speed up the film.", "not_in_text"],
          ["It would turn the lights off forever.", "not_in_text"],
        ],
        "Each frame depends on tiny, careful changes; an accidental bump breaks the smooth sequence.",
        "A single bump to the set or an unexpected change in lighting can ruin hours of careful shots.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, "illusion" most nearly means',
        "something that tricks the eye",
        [
          ["a real movement", "opposite"],
          ["a long movie", "not_in_text"],
          ["a type of puppet", "not_in_text"],
        ],
        "The puppets only appear to move because the photos are played quickly.",
        "Played back at full speed, the photographs create the illusion that the puppets are walking, talking, and breathing on their own.",
        2,
      ),
      mc(
        "text_structure",
        "open",
        "How is the final paragraph organized?",
        "It asks a question and then answers it.",
        [
          ["It lists steps in order.", "not_in_text"],
          ["It compares two animators.", "not_in_text"],
          ["It tells a story with dialogue.", "not_in_text"],
        ],
        "It asks why filmmakers still choose stop-motion, then explains the handmade appeal.",
        "With computer animation now able to create almost anything, why do filmmakers still choose stop-motion?",
        2,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the author mention fingerprints in clay and tiny stitches in costumes?",
        "To give examples of the handmade details that make stop-motion feel special",
        [
          ["To explain how to repair a puppet", "not_in_text"],
          ["To criticize animators for being careless", "opposite"],
          ["To describe how lights are set up", "not_in_text"],
        ],
        "These details support the idea that audiences can sense the handmade quality.",
        "The fingerprints pressed into clay, the tiny stitches in a costume, and the real shadows cast by real lamps give stop-motion films a warmth that is difficult to copy.",
        3,
      ),
    ],
  },
  {
    slug: "the-lighthouse-keeper",
    title: "The Lighthouse Keeper",
    genre: "poetry",
    tags: ["history", "geography"],
    rating: 6.5,
    knowledgeDemand: 2,
    purpose: "As you read, figure out what the keeper's work means to the people he never meets.",
    keyIdeas: [
      "A lighthouse keeper tends his lamp through long, lonely nights.",
      "The ships he guides never know him, but his steady work keeps sailors safe.",
      "The poem suggests that quiet, faithful work can matter deeply even when no one sees it.",
    ],
    glossary: [
      ["vigil", "a period of staying awake to watch or guard"],
      ["beacon", "a light that guides or warns"],
      ["anonymous", "unknown by name"],
      ["solitary", "alone; without company"],
    ],
    body: `He climbs the spiral, step on iron step,
one hundred twelve, the same as every night,
and wipes the salt from glass the wind has kept,
and trims the wick, and coaxes up the light.

Below, the sea is restless as a dream;
it throws its weight against the patient stone.
He keeps his solitary vigil there,
a lantern and a man, and both alone.

Out past the reef, a freighter feels its way,
its captain squinting through the rain-washed dark,
and sees, far off, a beacon sweep and fade,
and turns the wheel a little toward the mark.

The captain never learns the keeper's name.
The sailors sleep below and never know
that someone climbed the tower in the storm
so they could find the harbor's narrow throw.

But morning comes, and all the ships are in,
and gulls are calling over quiet bay,
and he, anonymous and satisfied,
blows out the flame and greets the ordinary day.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the theme of the poem?",
        "Faithful work can protect others even when no one knows who did it.",
        [
          ["Lighthouses are no longer needed.", "not_in_text"],
          ["Storms always sink ships.", "opposite"],
          ["The keeper climbs one hundred twelve steps.", "too_narrow"],
        ],
        "The keeper's unseen work guides the ships safely, and he is satisfied without recognition.",
        "and he, anonymous and satisfied,",
        3,
      ),
      mc(
        "key_details",
        "closed",
        "What does the captain do when he sees the beacon?",
        "He turns the wheel toward it.",
        [
          ["He sends a message to the keeper.", "opposite"],
          ["He drops anchor and waits.", "not_in_text"],
          ["He sails away from the harbor.", "opposite"],
        ],
        "The captain uses the light to steer, turning the wheel toward the mark.",
        "and turns the wheel a little toward the mark.",
        2,
      ),
      ep(
        "inference",
        "Why is the keeper \"satisfied\" at the end of the poem?",
        "All the ships made it safely into the harbor.",
        [
          ["The captain finally thanked him.", "opposite"],
          ["He is going to quit his job.", "not_in_text"],
          ["The storm destroyed the lighthouse.", "not_in_text"],
        ],
        "Morning shows that every ship is safely in, so his night's work succeeded.",
        "But morning comes, and all the ships are in,",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'In the poem, "vigil" most nearly means',
        "a time of staying awake to keep watch",
        [
          ["a loud celebration", "opposite"],
          ["a type of ship", "not_in_text"],
          ["a set of stairs", "true_but_irrelevant"],
        ],
        "The keeper stays awake all night watching over the sea and the light.",
        "He keeps his solitary vigil there,",
        3,
      ),
      mc(
        "author_purpose",
        "open",
        'Why does the poet describe the sea as "restless as a dream"?',
        "To suggest the sea is constantly moving and unpredictable",
        [
          ["To show the keeper is asleep", "not_in_text"],
          ["To describe the color of the water", "not_in_text"],
          ["To show the sea is calm and gentle", "opposite"],
        ],
        "Dreams shift and change, like the restless sea throwing itself against the rocks.",
        "Below, the sea is restless as a dream;",
        4,
      ),
      mc(
        "text_structure",
        "open",
        "How does the third stanza shift the focus of the poem?",
        "It moves from the keeper to the ship he is guiding.",
        [
          ["It moves from night to the next morning.", "true_but_irrelevant"],
          ["It moves from the ocean to a city.", "not_in_text"],
          ["It moves from the present to the distant past.", "not_in_text"],
        ],
        "The first two stanzas focus on the keeper; the third switches to the freighter and its captain.",
        "Out past the reef, a freighter feels its way,",
        3,
      ),
    ],
  },
  {
    slug: "the-wright-brothers",
    title: "Twelve Seconds That Changed the World",
    genre: "informational",
    tags: ["history", "tech", "biographies"],
    rating: 5.5,
    knowledgeDemand: 3,
    purpose: "As you read, figure out how the Wright brothers solved the problem of controlling an airplane.",
    keyIdeas: [
      "Wilbur and Orville Wright, bicycle makers from Ohio, made the first powered, controlled airplane flight in 1903.",
      "They realized that control, not just power, was the key problem, and they invented wing warping.",
      "Careful testing, including their own wind tunnel, helped them succeed where others failed.",
    ],
    glossary: [
      ["glider", "an aircraft that flies without an engine"],
      ["wind tunnel", "a tube where air is blown over models to test how they fly"],
      ["methodical", "done in a careful, step-by-step way"],
      ["controlled", "steered or guided on purpose"],
    ],
    body: `On the cold, windy morning of December 17, 1903, on the sand dunes near Kitty Hawk, North Carolina, Orville Wright lay on the lower wing of a strange wooden machine as his brother Wilbur ran alongside. The engine roared, the machine lifted off its track, and for twelve seconds it flew, traveling about thirty-seven meters before settling back onto the sand. It was the first time a powered airplane had made a sustained, controlled flight with a pilot aboard.

The Wright brothers were not famous scientists or wealthy inventors. They ran a bicycle shop in Dayton, Ohio, where they designed, built, and repaired bicycles. That experience turned out to matter. A bicycle is unstable unless its rider constantly balances and steers it, and the brothers suspected that an airplane would be the same.

At the time, many inventors were focused on building more powerful engines. The Wrights believed the real problem was control. A pilot needed a way to keep the machine balanced and to turn it safely, just as a bicyclist leans into a curve. By watching birds, Wilbur noticed that they tilt the tips of their wings to turn. The brothers invented a system called wing warping, in which cables twisted the ends of the wings slightly so the pilot could roll the aircraft left or right.

The brothers were also unusually methodical. When their gliders did not lift as much as expected, they began to doubt the published data that other researchers had used. So they built their own small wind tunnel and tested about two hundred different wing shapes, carefully measuring how each one performed. With their own reliable numbers, they designed better wings and propellers.

The brothers made four flights that December day. The longest, with Wilbur at the controls, lasted fifty-nine seconds and covered about 260 meters. Within a few years, the Wrights were flying for more than an hour at a time, and the age of aviation had begun.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the central idea of the passage?",
        "By focusing on control and testing carefully, the Wright brothers achieved the first controlled powered flight.",
        [
          ["The first flight lasted twelve seconds.", "too_narrow"],
          ["Bicycles are more useful than airplanes.", "not_in_text"],
          ["The Wrights built the most powerful engine of their time.", "opposite"],
        ],
        "The passage explains how their focus on control and careful experiments led to success.",
        "The Wrights believed the real problem was control.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "What did the Wright brothers do when they doubted other researchers' data?",
        "They built a wind tunnel and tested wing shapes themselves.",
        [
          ["They gave up building gliders.", "opposite"],
          ["They bought a more powerful engine.", "not_in_text"],
          ["They asked birds for help.", "not_in_text"],
        ],
        "They tested about two hundred wing shapes in their own wind tunnel.",
        "So they built their own small wind tunnel and tested about two hundred different wing shapes, carefully measuring how each one performed.",
        2,
      ),
      ep(
        "inference",
        "How did running a bicycle shop help the Wright brothers?",
        "It helped them understand that a flying machine would need constant balance and steering.",
        [
          ["It gave them money to buy an airplane.", "not_in_text"],
          ["It taught them how to build engines.", "not_in_text"],
          ["It showed them that machines are always stable.", "opposite"],
        ],
        "Bicycles must be balanced constantly, and they suspected airplanes worked the same way.",
        "A bicycle is unstable unless its rider constantly balances and steers it, and the brothers suspected that an airplane would be the same.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, "methodical" most nearly means',
        "careful and organized",
        [
          ["lucky", "not_in_text"],
          ["careless and rushed", "opposite"],
          ["famous", "not_in_text"],
        ],
        "They measured and tested step by step, which is methodical work.",
        "The brothers were also unusually methodical.",
        2,
      ),
      mc(
        "text_structure",
        "open",
        "Why does the passage begin with a description of the first flight?",
        "To capture the reader's interest with the key moment before explaining how it happened",
        [
          ["Because the passage is organized from least to most important", "not_in_text"],
          ["To show that the flight was a failure", "opposite"],
          ["To compare the Wrights with other inventors", "not_in_text"],
        ],
        "The passage opens with the famous flight, then goes back to explain the brothers' work.",
        "It was the first time a powered airplane had made a sustained, controlled flight with a pilot aboard.",
        3,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the author include the detail about Wilbur watching birds?",
        "To show where the idea for wing warping came from",
        [
          ["To show that the brothers studied animals instead of machines", "too_broad"],
          ["To explain why the flight happened in December", "not_in_text"],
          ["To prove birds can fly faster than airplanes", "not_in_text"],
        ],
        "Seeing birds tilt their wingtips inspired the system for turning the aircraft.",
        "By watching birds, Wilbur noticed that they tilt the tips of their wings to turn.",
        2,
      ),
    ],
  },
];
