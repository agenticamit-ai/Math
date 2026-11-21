import { ep, mc, ms, oe, type SeedPassage } from "../types";

export const band4: SeedPassage[] = [
  {
    slug: "milas-model-rocket",
    title: "Mila's Model Rocket",
    genre: "fiction",
    tags: ["space", "science"],
    rating: 4.5,
    knowledgeDemand: 2,
    purpose: "As you read, figure out what Mila learns from her rocket's first failure.",
    keyIdeas: [
      "Mila's first model rocket launch fails when the rocket tips over and spins.",
      "She studies the problem and discovers the rocket's weight is too far back.",
      "After adding clay to the nose cone, her second launch flies straight and high.",
    ],
    glossary: [
      ["launch", "to send something into the air"],
      ["stable", "steady and not likely to tip over"],
      ["tinker", "to make small changes to fix or improve something"],
      ["wobble", "to move unsteadily from side to side"],
    ],
    body: `Mila had spent three weekends building her model rocket. She had glued the cardboard tube, sanded the balsa-wood fins, and painted the whole thing a brilliant orange. Now, standing in the empty soccer field with her grandfather, she was ready for the launch.

"Five, four, three, two, one!" she shouted, and pressed the button.

The engine fired with a loud whoosh. For half a second, the rocket shot upward. Then it began to wobble. It tipped sideways, spun in a crazy spiral, and plowed into the grass about twenty meters away.

Mila's face fell. "All that work," she muttered, "and it flew like a confused bird."

Her grandfather picked up the rocket and turned it over in his hands. "Engineers have a saying," he told her. "A failure is just information you did not have yesterday. So what does this failure tell us?"

That night, Mila read everything she could find about rocket flight. She learned that a rocket is stable only if its center of mass, the point where its weight balances, sits in front of the place where air pushes on the fins. She balanced her rocket on one finger and found the problem right away. The heavy engine in the tail made the back end too heavy.

The next morning, Mila decided to tinker with the design. She pressed a small lump of modeling clay into the tip of the nose cone. When she balanced the rocket again, the balance point had moved forward.

On the second launch, the orange rocket roared straight up, climbed until it was a speck against the clouds, and drifted down under its parachute. Mila cheered, and then pulled out her notebook. She had more information to write down.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the theme of the story?",
        "Studying a failure can help you find a way to succeed.",
        [
          ["Model rockets are too dangerous to build.", "not_in_text"],
          ["Orange is the best color for a rocket.", "true_but_irrelevant"],
          ["If something fails once, it will always fail.", "opposite"],
        ],
        "Mila investigates why the rocket failed, fixes it, and succeeds on the second try.",
        "A failure is just information you did not have yesterday.",
        2,
      ),
      oe(
        "key_details",
        "closed",
        "Put these events in the order they happened.",
        [
          "The rocket tips sideways and spins into the grass.",
          "Mila reads about rocket flight that night.",
          "Mila presses clay into the nose cone.",
          "The rocket flies straight up and floats down on its parachute.",
        ],
        "The rocket fails, Mila researches, she fixes it, and the second launch works.",
        "The next morning, Mila decided to tinker with the design.",
        2,
      ),
      ep(
        "inference",
        "Why did adding clay to the nose cone fix the rocket?",
        "It moved the rocket's balance point toward the front.",
        [
          ["It made the engine more powerful.", "not_in_text"],
          ["It made the fins larger.", "not_in_text"],
          ["It made the back end heavier.", "opposite"],
        ],
        "A rocket is stable when its center of mass is in front of where air pushes on the fins. The clay moved the balance point forward.",
        "When she balanced the rocket again, the balance point had moved forward.",
        4,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the story, "tinker with the design" most nearly means',
        "make small changes to improve it",
        [
          ["throw it away", "opposite"],
          ["paint it a new color", "too_narrow"],
          ["show it to friends", "not_in_text"],
        ],
        "Mila makes one small change, adding clay, to fix the rocket.",
        "The next morning, Mila decided to tinker with the design.",
        2,
      ),
      mc(
        "point_of_view",
        "open",
        "How does the grandfather's view of the failed launch differ from Mila's at first?",
        "He sees it as a chance to learn, while she sees it as wasted work.",
        [
          ["He is angrier about it than she is.", "opposite"],
          ["They both think the rocket should be thrown away.", "not_in_text"],
          ["He thinks the rocket flew perfectly.", "not_in_text"],
        ],
        "Mila mutters 'All that work,' but her grandfather calls the failure 'information.'",
        "\"All that work,\" she muttered, \"and it flew like a confused bird.\"",
        3,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the author end the story with Mila pulling out her notebook?",
        "To show that she has started thinking like an engineer",
        [
          ["To show that she is bored with rockets", "opposite"],
          ["To explain how parachutes work", "not_in_text"],
          ["To suggest she failed again", "not_in_text"],
        ],
        "Writing down 'more information' echoes her grandfather's saying, showing she has learned his way of thinking.",
        "She had more information to write down.",
        4,
      ),
    ],
  },
  {
    slug: "the-great-wall-of-china",
    title: "The Great Wall of China",
    genre: "informational",
    tags: ["history", "geography"],
    rating: 4.5,
    knowledgeDemand: 3,
    purpose: "As you read, figure out why the Great Wall is really many walls.",
    keyIdeas: [
      "The Great Wall was built and rebuilt over about two thousand years by different rulers.",
      "It was built to protect China's northern borders and to send warnings with signal towers.",
      "Much of the wall standing today was built during the Ming dynasty, and the claim that it is visible from space is a myth.",
    ],
    glossary: [
      ["dynasty", "a series of rulers from the same family"],
      ["invader", "someone who enters a place by force to take it over"],
      ["myth", "a widely believed idea that is not true"],
      ["rammed", "pushed or packed down hard"],
    ],
    body: `The Great Wall of China is one of the most famous structures on Earth. But it is not really one single wall. It is a long chain of walls, towers, and forts that were built, connected, and rebuilt over roughly two thousand years.

The earliest walls were built more than 2,500 years ago, when China was divided into separate kingdoms that often fought each other. Each kingdom built its own walls for protection. Around 221 BCE, a ruler named Qin Shi Huang united the kingdoms and became China's first emperor. He ordered workers to connect many of the older walls to protect his northern border from invaders.

Over the following centuries, other dynasties, or ruling families, added new sections and repaired old ones. The builders used whatever materials were nearby. In the desert, they used rammed earth, which is soil packed down until it is hard. In the mountains, they cut blocks of stone. Much of the wall that visitors see today was built during the Ming dynasty, between about 1368 and 1644, using sturdy bricks.

The wall was more than a barrier. Soldiers lived in its watchtowers. When they spotted danger, they lit fires at night or sent up smoke by day. Tower by tower, the signal could travel hundreds of kilometers in a few hours, much faster than a messenger on horseback.

You may have heard that the Great Wall can be seen from space. This is a myth. The wall is very long, but it is narrow, and its color blends in with the land around it. Astronauts say it is extremely hard to spot without a camera.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the central idea of the passage?",
        "The Great Wall is a set of walls built over many centuries for protection and communication.",
        [
          ["The Great Wall was built in one year by one emperor.", "opposite"],
          ["The Great Wall is made of bricks.", "too_narrow"],
          ["Every country in Asia built a great wall.", "too_broad"],
        ],
        "The passage explains that many rulers built and rebuilt the wall for defense and signaling.",
        "It is a long chain of walls, towers, and forts that were built, connected, and rebuilt over roughly two thousand years.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "What did soldiers do when they spotted danger?",
        "They lit fires or sent up smoke to signal other towers.",
        [
          ["They rang giant bells.", "not_in_text"],
          ["They built a new wall.", "not_in_text"],
          ["They waited for a messenger on horseback.", "opposite"],
        ],
        "Fire at night and smoke by day passed the warning from tower to tower.",
        "When they spotted danger, they lit fires at night or sent up smoke by day.",
        2,
      ),
      ep(
        "inference",
        "Why did builders use different materials in different places?",
        "They used what was available nearby, which differed from desert to mountains.",
        [
          ["The emperor wanted each section to look different.", "not_in_text"],
          ["Bricks had not been invented in any region.", "opposite"],
          ["Stone was too heavy for anyone to move.", "not_in_text"],
        ],
        "The passage says builders used whatever was nearby, such as earth in the desert and stone in the mountains.",
        "The builders used whatever materials were nearby.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, the word "myth" means',
        "an idea many people believe that is not true",
        [
          ["an ancient Chinese story about gods", "true_but_irrelevant"],
          ["a fact proven by astronauts", "opposite"],
          ["a type of building material", "not_in_text"],
        ],
        "The author calls the space claim a myth and then explains why it is false.",
        "You may have heard that the Great Wall can be seen from space. This is a myth.",
        2,
      ),
      mc(
        "text_structure",
        "open",
        "How is the second and third paragraphs' information mainly organized?",
        "In time order, from the earliest walls to the Ming dynasty",
        [
          ["As a list of problems and solutions", "not_in_text"],
          ["By comparing China with Rome", "not_in_text"],
          ["From the most important fact to the least", "not_in_text"],
        ],
        "The paragraphs move from 2,500 years ago, to 221 BCE, to the Ming dynasty.",
        "Over the following centuries, other dynasties, or ruling families, added new sections and repaired old ones.",
        3,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the author include the last paragraph?",
        "To correct a common mistaken belief about the wall",
        [
          ["To prove the wall is the longest structure in space", "opposite"],
          ["To explain how astronauts train", "not_in_text"],
          ["To describe the wall's watchtowers", "true_but_irrelevant"],
        ],
        "The paragraph names the belief that the wall is visible from space and explains why it is false.",
        "Astronauts say it is extremely hard to spot without a camera.",
        3,
      ),
    ],
  },
  {
    slug: "should-recess-be-longer",
    title: "Should Recess Be Longer?",
    genre: "argument",
    tags: ["science"],
    rating: 4.5,
    knowledgeDemand: 2,
    purpose: "As you read, figure out what evidence the writer uses and how the writer answers the other side.",
    keyIdeas: [
      "The writer argues that middle school recess should be lengthened from fifteen to thirty minutes.",
      "Movement breaks help students focus and give them time to build social skills.",
      "The writer responds to the concern about lost class time by arguing that better focus makes up for it.",
    ],
    glossary: [
      ["concentrate", "to keep your attention on one thing"],
      ["restless", "unable to stay still or calm"],
      ["counterargument", "a reason someone gives on the other side of an argument"],
      ["unstructured", "without a set plan or rules"],
    ],
    body: `At our middle school, recess lasts only fifteen minutes. By the time students walk outside, find their friends, and choose a game, the bell is already ringing. I believe recess should be extended to thirty minutes, because longer breaks would help students learn better and get along better.

The first reason is focus. After sitting still for a long time, most students become restless. Their minds wander, and it becomes harder to concentrate. Many teachers notice that students pay better attention after they have had a chance to move around. Running, jumping, and playing get blood flowing to the brain, which can make it easier to think clearly when class begins again.

The second reason is social skills. During class, students mostly listen to the teacher. Recess is one of the few times in the school day when kids practice working things out on their own. They invent rules for games, take turns, and settle arguments. These skills matter, and they take time to learn. Fifteen minutes is barely enough to get started.

Some people make the counterargument that a longer recess would take time away from math, reading, and science. That is an understandable worry. However, fifteen extra minutes of unstructured play could make the rest of the day more productive. A class that can focus for forty minutes may learn more than a class that is distracted for fifty-five.

Recess is not wasted time. It is part of learning. Our school should give students the full thirty minutes they need to move, play, and come back ready to work.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "What is the writer's central claim?",
        "Recess at the school should be extended to thirty minutes.",
        [
          ["Recess should be removed so there is more class time.", "opposite"],
          ["Students need to settle arguments.", "too_narrow"],
          ["All schools in the world should change their schedules.", "too_broad"],
        ],
        "The writer states the claim at the end of the first paragraph and repeats it at the end.",
        "I believe recess should be extended to thirty minutes, because longer breaks would help students learn better and get along better.",
        1,
      ),
      ms(
        "argument_evidence",
        "closed",
        "Select the two reasons the writer gives for a longer recess.",
        ["It would help students focus in class.", "It would give students time to practice social skills."],
        [
          ["It would let students eat a longer lunch.", "not_in_text"],
          ["It would give teachers more time to plan.", "not_in_text"],
        ],
        "The writer calls focus 'the first reason' and social skills 'the second reason.'",
        "The first reason is focus.",
        2,
      ),
      ep(
        "argument_evidence",
        "How does the writer respond to the worry that a longer recess would cut into class time?",
        "By arguing that better focus could make the remaining class time more productive",
        [
          ["By agreeing that recess should stay short", "opposite"],
          ["By saying math and science are not important", "not_in_text"],
          ["By suggesting school should start earlier", "not_in_text"],
        ],
        "The writer admits the worry is understandable, then argues a focused class learns more.",
        "A class that can focus for forty minutes may learn more than a class that is distracted for fifty-five.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, "restless" most nearly means',
        "unable to stay still or calm",
        [
          ["very tired and sleepy", "opposite"],
          ["happy and relaxed", "opposite"],
          ["without any friends", "not_in_text"],
        ],
        "After sitting still too long, students' minds wander and they want to move.",
        "After sitting still for a long time, most students become restless.",
        2,
      ),
      mc(
        "inference",
        "open",
        "Based on the first paragraph, what problem does the writer see with a fifteen-minute recess?",
        "Students spend most of it getting ready to play instead of playing.",
        [
          ["Students do not like going outside.", "not_in_text"],
          ["The bell is too loud.", "true_but_irrelevant"],
          ["Teachers have to watch too many students.", "not_in_text"],
        ],
        "Walking outside, finding friends, and choosing a game use up the time before the bell rings.",
        "By the time students walk outside, find their friends, and choose a game, the bell is already ringing.",
        3,
      ),
      mc(
        "text_structure",
        "open",
        'How does the paragraph beginning "Some people make the counterargument" fit into the essay?',
        "It presents an opposing view and then responds to it.",
        [
          ["It gives the writer's first reason.", "not_in_text"],
          ["It tells a story about one student.", "not_in_text"],
          ["It changes the writer's claim.", "opposite"],
        ],
        "The writer names the other side's concern, then uses 'However' to answer it.",
        "However, fifteen extra minutes of unstructured play could make the rest of the day more productive.",
        3,
      ),
    ],
  },
  {
    slug: "octopus-escape-artists",
    title: "Octopus Escape Artists",
    genre: "informational",
    tags: ["animals", "science"],
    rating: 4.5,
    knowledgeDemand: 2,
    purpose: "As you read, figure out which body features make the octopus such a good escape artist.",
    keyIdeas: [
      "Octopuses have no bones, so they can squeeze through tiny openings.",
      "They are intelligent problem-solvers that can open jars and learn by watching.",
      "Their color-changing skin and ink help them hide from predators.",
    ],
    glossary: [
      ["predator", "an animal that hunts other animals for food"],
      ["camouflage", "colors or patterns that help an animal blend in"],
      ["flexible", "able to bend easily without breaking"],
      ["aquarium", "a building or tank where water animals are kept"],
    ],
    body: `One night in 2016, an octopus named Inky made headlines around the world. Inky lived in a tank at the National Aquarium of New Zealand. When the staff arrived one morning, the tank was empty. Wet tracks led across the floor to a drain, and the drain led to the ocean. Inky had climbed out through a small gap at the top of the tank and slipped away to freedom.

How could an animal pull off such an escape? The answer begins with its body. An octopus has no bones at all. Its only hard part is a small, sharp beak, similar to a parrot's. That means an octopus can squeeze its soft, flexible body through any opening larger than its beak. A large octopus can fit through a hole the size of a coin.

Octopuses are also clever. In experiments, they have learned to unscrew jar lids to reach food inside. Some can find their way through mazes, and some seem to learn by watching other octopuses solve a problem first. Scientists find this surprising, because most octopuses live alone and do not learn from parents.

Finally, octopuses are masters of camouflage. Their skin contains thousands of tiny color cells that can open and close in a fraction of a second. An octopus can turn from red to sandy brown to speckled gray to match the rocks around it. If a predator still spots it, the octopus can shoot out a cloud of dark ink and jet away while its enemy is confused.

With a body that bends, a brain that solves puzzles, and skin that disappears, the octopus is one of the ocean's greatest escape artists.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "What is the central idea of the passage?",
        "The octopus's body and intelligence make it skilled at escaping and hiding.",
        [
          ["Inky the octopus escaped from an aquarium.", "too_narrow"],
          ["Octopuses are the smartest animals in the world.", "too_broad"],
          ["Aquariums should not keep octopuses.", "not_in_text"],
        ],
        "The passage uses Inky's story to introduce the features that make octopuses escape artists.",
        "With a body that bends, a brain that solves puzzles, and skin that disappears, the octopus is one of the ocean's greatest escape artists.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "What is the only hard part of an octopus's body?",
        "Its beak",
        [
          ["Its skull", "not_in_text"],
          ["Its suckers", "not_in_text"],
          ["Its color cells", "true_but_irrelevant"],
        ],
        "The passage says an octopus has no bones; its only hard part is a small beak.",
        "Its only hard part is a small, sharp beak, similar to a parrot's.",
        1,
      ),
      ep(
        "inference",
        "Why do scientists find it surprising that octopuses learn by watching?",
        "Most octopuses live alone and are not taught by parents.",
        [
          ["Octopuses cannot see well.", "not_in_text"],
          ["Octopuses never solve problems.", "opposite"],
          ["Octopuses only learn from scientists.", "not_in_text"],
        ],
        "Learning by watching is unexpected in an animal that usually lives on its own.",
        "Scientists find this surprising, because most octopuses live alone and do not learn from parents.",
        4,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, "camouflage" most nearly means',
        "the ability to blend in with the surroundings",
        [
          ["a cloud of dark ink", "true_but_irrelevant"],
          ["a way of swimming quickly", "not_in_text"],
          ["a bright warning color", "opposite"],
        ],
        "The paragraph describes how the octopus changes color to match the rocks.",
        "An octopus can turn from red to sandy brown to speckled gray to match the rocks around it.",
        2,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the author begin the passage with the story of Inky?",
        "To grab the reader's interest with a real example of an octopus escape",
        [
          ["To explain how aquariums are built", "not_in_text"],
          ["To argue that Inky was the smartest octopus ever", "too_broad"],
          ["To show that octopuses are dangerous to people", "not_in_text"],
        ],
        "The true story hooks the reader and leads to the question of how such an escape is possible.",
        "How could an animal pull off such an escape?",
        3,
      ),
      mc(
        "text_structure",
        "open",
        "How are the second, third, and fourth paragraphs organized?",
        "Each explains a different feature that helps the octopus escape.",
        [
          ["They tell the events of Inky's escape in order.", "not_in_text"],
          ["They compare octopuses with parrots.", "true_but_irrelevant"],
          ["They describe problems with aquariums and solutions.", "not_in_text"],
        ],
        "The paragraphs cover the boneless body, intelligence, and camouflage, one at a time.",
        "Finally, octopuses are masters of camouflage.",
        3,
      ),
    ],
  },
  {
    slug: "how-movies-get-their-sound",
    title: "How Movies Get Their Sound",
    genre: "informational",
    tags: ["movies", "tech"],
    rating: 4.5,
    knowledgeDemand: 2,
    purpose: "As you read, figure out why movie sounds are often recorded separately from the scenes.",
    keyIdeas: [
      "Many everyday sounds in movies are added later by Foley artists.",
      "Foley artists watch the film and perform sounds in sync, often using surprising objects.",
      "Recording sounds separately gives filmmakers clear, controllable audio.",
    ],
    glossary: [
      ["sync", "short for synchronized: happening at exactly the same time"],
      ["studio", "a room set up for recording or filming"],
      ["convincing", "seeming real or true"],
    ],
    body: `When you watch a movie, you hear footsteps on a wooden floor, the swish of a coat, and the clink of a spoon in a cup. It would be natural to think these sounds were recorded while the actors were filming. Very often, though, they were not. They were made later, in a special studio, by people called Foley artists.

The job is named after Jack Foley, who worked at Universal Studios starting in the 1920s, when movies first began to have sound. He discovered that it was easier to add many small sounds after filming than to capture them perfectly on the set. On a busy movie set, microphones are aimed at the actors' voices. They also pick up the hum of lights and the noise of the crew, while softer sounds like footsteps get lost.

In a Foley studio, the artist watches the scene on a large screen and performs the sounds in sync with the action. If a character walks across a room, the Foley artist walks in place on a patch of wood at exactly the same pace. The studio floor may have squares of gravel, tile, carpet, and sand for different kinds of footsteps.

Foley artists often use objects that have nothing to do with what you see. Two coconut shell halves clopped together sound like horse hooves. Squeezing a leather pouch full of cornstarch sounds like footsteps crunching through snow. Flapping a pair of gloves can sound like a bird taking off.

Recording sounds separately gives filmmakers control. They can make a sound louder, softer, closer, or farther away. When it is done well, nobody in the audience notices. The sounds are so convincing that the movie simply feels real.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "What is the passage mainly about?",
        "How Foley artists create everyday sounds for movies after filming",
        [
          ["The life story of Jack Foley", "too_narrow"],
          ["How actors learn their lines", "not_in_text"],
          ["Why movies are better than books", "not_in_text"],
        ],
        "The passage explains what Foley artists do, how, and why.",
        "They were made later, in a special studio, by people called Foley artists.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "What object can a Foley artist use to make the sound of horse hooves?",
        "Two coconut shell halves",
        [
          ["A leather pouch of cornstarch", "true_but_irrelevant"],
          ["A pair of gloves", "true_but_irrelevant"],
          ["A real horse in the studio", "not_in_text"],
        ],
        "Clopping coconut shells together sounds like hooves.",
        "Two coconut shell halves clopped together sound like horse hooves.",
        1,
      ),
      ep(
        "inference",
        "Why are footsteps often missing from the sound recorded on a movie set?",
        "The microphones focus on voices, and soft sounds get lost in other noise.",
        [
          ["Actors are told to walk silently.", "not_in_text"],
          ["Movie sets have no floors.", "not_in_text"],
          ["Footsteps are too loud to record.", "opposite"],
        ],
        "Microphones point at voices and also catch lights and crew noise, so footsteps are drowned out.",
        "They also pick up the hum of lights and the noise of the crew, while softer sounds like footsteps get lost.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, "in sync with the action" means',
        "at exactly the same moment as the action",
        [
          ["before the scene is filmed", "opposite"],
          ["louder than the action", "not_in_text"],
          ["in a kitchen sink", "not_in_text"],
        ],
        "The artist walks at exactly the same pace as the character on screen.",
        "If a character walks across a room, the Foley artist walks in place on a patch of wood at exactly the same pace.",
        2,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the author include the examples of coconut shells, cornstarch, and gloves?",
        "To show that Foley sounds often come from surprising objects",
        [
          ["To explain how to cook with cornstarch", "not_in_text"],
          ["To prove that real horses are used in films", "opposite"],
          ["To list the tools every actor carries", "not_in_text"],
        ],
        "The examples support the idea that the objects 'have nothing to do with what you see.'",
        "Foley artists often use objects that have nothing to do with what you see.",
        2,
      ),
      mc(
        "argument_evidence",
        "open",
        "Which sentence best supports the idea that recording sounds separately helps filmmakers?",
        "They can make a sound louder, softer, closer, or farther away.",
        [
          ["The job is named after Jack Foley.", "true_but_irrelevant"],
          ["The studio floor may have squares of gravel, tile, carpet, and sand.", "true_but_irrelevant"],
          ["Microphones are aimed at the actors' voices.", "too_narrow"],
        ],
        "This sentence shows the control filmmakers gain from separate recordings.",
        "They can make a sound louder, softer, closer, or farther away.",
        3,
      ),
    ],
  },
  {
    slug: "ode-to-an-old-sneaker",
    title: "Ode to an Old Sneaker",
    genre: "poetry",
    tags: ["sports"],
    rating: 4.5,
    knowledgeDemand: 1,
    purpose: "As you read, figure out why the speaker will not throw the sneaker away.",
    keyIdeas: [
      "The speaker praises a worn-out sneaker as if it were a loyal friend.",
      "The sneaker carries memories of games, races, and practice.",
      "Even though it is falling apart, the speaker refuses to replace it.",
    ],
    glossary: [
      ["frayed", "worn so that threads come loose"],
      ["loyal", "always faithful and supportive"],
      ["scuffed", "marked or scraped from use"],
    ],
    body: `O sneaker, scuffed and grass-stained gray,
you used to be bright white.
Your laces, frayed to fuzzy threads,
still knot and hold on tight.

You ran the bases in the spring
and slid through muddy clay.
You sprinted through the final lap
on that cold field day.

You've got a hole above the toe,
your sole is thin as bread,
and Mom says it is time to buy
a shiny pair instead.

But new shoes do not know my feet
or how I turn and go.
They have not jumped the creek with me
or kicked through melting snow.

So stay, my loyal, tattered friend,
one season, maybe two.
A shoe is just a shoe, they say,
but you are more than a shoe.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "What is the main idea of the poem?",
        "The old sneaker matters to the speaker because of the memories it holds.",
        [
          ["New shoes are always better than old ones.", "opposite"],
          ["The sneaker has a hole above the toe.", "too_narrow"],
          ["Running is the best sport.", "too_broad"],
        ],
        "The speaker remembers games and adventures and calls the sneaker 'more than a shoe.'",
        "A shoe is just a shoe, they say,\nbut you are more than a shoe.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "Who thinks the speaker should buy new shoes?",
        "The speaker's mom",
        [
          ["The speaker's coach", "not_in_text"],
          ["The speaker's best friend", "not_in_text"],
          ["The speaker", "opposite"],
        ],
        "Mom says it is time for a shiny new pair.",
        "and Mom says it is time to buy\na shiny pair instead.",
        1,
      ),
      ep(
        "inference",
        "Why does the speaker say new shoes \"do not know my feet\"?",
        "New shoes have not shared the speaker's experiences.",
        [
          ["New shoes are the wrong size.", "not_in_text"],
          ["New shoes cannot be tied.", "not_in_text"],
          ["The speaker has never worn shoes before.", "not_in_text"],
        ],
        "The next lines explain that new shoes have not jumped the creek or kicked through snow with the speaker.",
        "They have not jumped the creek with me\nor kicked through melting snow.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'In the poem, "frayed" describes laces that are',
        "worn so the threads are coming loose",
        [
          ["brand new and stiff", "opposite"],
          ["tied in a double knot", "true_but_irrelevant"],
          ["bright white", "not_in_text"],
        ],
        "The laces are 'frayed to fuzzy threads,' meaning they are worn out.",
        "Your laces, frayed to fuzzy threads,",
        2,
      ),
      mc(
        "author_purpose",
        "open",
        'Why does the poet compare the sneaker\'s sole to bread ("thin as bread")?',
        "To show how worn down and thin the sole has become",
        [
          ["To suggest the shoe is good to eat", "not_in_text"],
          ["To show the sole is brand new", "opposite"],
          ["To describe the color of the shoe", "not_in_text"],
        ],
        "A slice of bread is thin and soft, like the worn-out sole.",
        "your sole is thin as bread,",
        2,
      ),
      mc(
        "point_of_view",
        "open",
        "How does the speaker feel about the sneaker?",
        "Fond and loyal, like it is a friend",
        [
          ["Embarrassed and eager to replace it", "opposite"],
          ["Angry that it fell apart", "not_in_text"],
          ["Uncaring about what happens to it", "opposite"],
        ],
        "The speaker calls it a 'loyal, tattered friend' and asks it to stay.",
        "So stay, my loyal, tattered friend,",
        2,
      ),
    ],
  },
  {
    slug: "jackie-robinson-breaks-the-barrier",
    title: "Jackie Robinson Breaks the Barrier",
    genre: "informational",
    tags: ["sports", "history", "biographies"],
    rating: 5,
    knowledgeDemand: 3,
    purpose: "As you read, figure out why Jackie Robinson's first season took more than athletic skill.",
    keyIdeas: [
      "In 1947, Jackie Robinson became the first Black player in modern Major League Baseball.",
      "He faced insults and threats but stayed calm and let his playing speak for him.",
      "His courage helped open baseball to Black players, and every player wears 42 on Jackie Robinson Day.",
    ],
    glossary: [
      ["segregated", "kept separate by race"],
      ["barrier", "something that blocks the way"],
      ["composure", "calmness and self-control"],
      ["honor", "to show great respect for"],
    ],
    body: `On April 15, 1947, Jackie Robinson stepped onto the field for the Brooklyn Dodgers. With that step, he became the first Black player in modern Major League Baseball. For more than fifty years, the major leagues had been segregated. Black players had to play in separate teams called the Negro Leagues, no matter how talented they were.

Branch Rickey, the president of the Dodgers, wanted to break that barrier. He knew the first player would face enormous pressure. Before signing Robinson, Rickey warned him that some fans and players would insult him and try to make him lose his temper. If Robinson fought back, people who opposed integration would use it as an excuse to keep Black players out. Rickey asked him to have the courage not to fight back. Robinson agreed.

That first season was brutal. Some opponents shouted cruel names from the dugout. Pitchers threw at him. Robinson received threatening letters. Through it all, he kept his composure. He answered with his bat, his glove, and especially his speed. Robinson was famous for stealing bases, and his daring running rattled pitchers.

By the end of the year, Robinson had won the very first Rookie of the Year award. Two years later, he was named the National League's Most Valuable Player. Just as important, other teams began signing Black players. The barrier was falling.

In 1997, Major League Baseball retired Robinson's number, 42, for every team. No new player will ever wear it. But each year on April 15, every player in the league wears 42 to honor the man who changed the game.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the central idea of the passage?",
        "Jackie Robinson's skill and self-control helped end segregation in Major League Baseball.",
        [
          ["Jackie Robinson was famous for stealing bases.", "too_narrow"],
          ["Branch Rickey was the best baseball player of his time.", "not_in_text"],
          ["Baseball has always welcomed every player.", "opposite"],
        ],
        "The passage shows how Robinson's talent and composure broke the color barrier.",
        "With that step, he became the first Black player in modern Major League Baseball.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "What award did Robinson win at the end of his first season?",
        "Rookie of the Year",
        [
          ["Most Valuable Player", "true_but_irrelevant"],
          ["The World Series trophy", "not_in_text"],
          ["The Hall of Fame", "not_in_text"],
        ],
        "He won the first Rookie of the Year award; the MVP came two years later.",
        "By the end of the year, Robinson had won the very first Rookie of the Year award.",
        2,
      ),
      ep(
        "inference",
        "Why did Branch Rickey ask Robinson not to fight back?",
        "Fighting back could be used as an excuse to keep Black players out of the league.",
        [
          ["Rickey did not believe the insults would happen.", "opposite"],
          ["Robinson was not strong enough to fight.", "not_in_text"],
          ["The rules of baseball do not allow arguing.", "not_in_text"],
        ],
        "Rickey knew opponents of integration were looking for any reason to stop it.",
        "If Robinson fought back, people who opposed integration would use it as an excuse to keep Black players out.",
        4,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, "composure" most nearly means',
        "calm self-control",
        [
          ["quick speed", "true_but_irrelevant"],
          ["loud anger", "opposite"],
          ["a written letter", "not_in_text"],
        ],
        "Despite insults and threats, Robinson stayed calm and in control.",
        "Through it all, he kept his composure.",
        2,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the author describe the insults, pitches, and letters in the third paragraph?",
        "To show how much pressure Robinson had to endure",
        [
          ["To explain the rules of pitching", "not_in_text"],
          ["To argue that Robinson should have quit", "opposite"],
          ["To describe a typical rookie season", "not_in_text"],
        ],
        "The details show how difficult Robinson's first season was, making his composure more impressive.",
        "That first season was brutal.",
        3,
      ),
      mc(
        "text_structure",
        "open",
        "How does the final paragraph relate to the rest of the passage?",
        "It shows how Robinson is still honored today.",
        [
          ["It explains why the Negro Leagues began.", "not_in_text"],
          ["It introduces a new player.", "not_in_text"],
          ["It describes Robinson's first game.", "true_but_irrelevant"],
        ],
        "After telling his story, the passage ends with how baseball remembers him every April 15.",
        "But each year on April 15, every player in the league wears 42 to honor the man who changed the game.",
        2,
      ),
    ],
  },
  {
    slug: "the-night-hike",
    title: "The Night Hike",
    genre: "fiction",
    tags: ["animals", "geography"],
    rating: 4.5,
    knowledgeDemand: 1,
    purpose: "As you read, figure out how Priya's feelings about the dark change.",
    keyIdeas: [
      "Priya is nervous about her first night hike at camp.",
      "When the guide has everyone turn off their flashlights, Priya's eyes adjust and she notices sights and sounds she had missed.",
      "By the end, Priya feels amazed rather than afraid of the dark.",
    ],
    glossary: [
      ["adjust", "to change in order to fit a new situation"],
      ["silhouette", "a dark shape seen against a lighter background"],
      ["chorus", "a group of sounds or voices together"],
      ["reluctant", "not wanting to do something"],
    ],
    body: `Priya gripped her flashlight so hard her fingers ached. The rest of the cabin group chattered as they followed the guide, Mr. Okafor, up the trail, but Priya stayed in the middle of the line where it felt safest. At home, the streetlights glowed all night. Here, the forest seemed to swallow everything.

Halfway up the hill, Mr. Okafor stopped in a clearing. "Everyone, turn off your flashlights," he said.

A few kids groaned. Priya felt her heart thump. She was reluctant, but she clicked the button anyway. The darkness rushed in so completely that she could not see her own hand.

"Now wait," Mr. Okafor said softly. "Give your eyes a few minutes to adjust."

At first, nothing happened. Then, little by little, shapes appeared. The tall pines became dark silhouettes against a sky that was not black at all, but deep blue. Above them, more stars than Priya had ever seen spilled across the sky like sugar on a dark table. A pale band of light stretched from one side to the other.

"That's the Milky Way," Mr. Okafor said. "Our own galaxy. You can't see it from the city."

Now Priya noticed the sounds, too. Crickets kept a steady rhythm. Somewhere below, frogs joined in, a whole chorus of creaks and peeps. An owl called twice, low and soft.

"Should we turn the flashlights back on?" someone asked.

Priya surprised herself by being the first to answer. "Not yet," she said. "Let's look a little longer."`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the theme of the story?",
        "Facing something you fear can reveal things you never noticed.",
        [
          ["Flashlights are the most important camping gear.", "not_in_text"],
          ["The city is a better place to live than the forest.", "opposite"],
          ["Owls only call twice at night.", "too_narrow"],
        ],
        "By turning off her flashlight despite her fear, Priya discovers the stars and night sounds.",
        "Then, little by little, shapes appeared.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "What does Mr. Okafor ask the group to do in the clearing?",
        "Turn off their flashlights and wait",
        [
          ["Sing a camp song", "not_in_text"],
          ["Count the stars", "not_in_text"],
          ["Walk back to the cabin", "not_in_text"],
        ],
        "He tells them to turn off their flashlights and let their eyes adjust.",
        "\"Everyone, turn off your flashlights,\" he said.",
        1,
      ),
      ep(
        "inference",
        "Why has Priya probably never seen the Milky Way before?",
        "Light from her city hides it.",
        [
          ["She has never looked at the sky.", "not_in_text"],
          ["The Milky Way only appears at camp.", "too_narrow"],
          ["She is afraid of stars.", "not_in_text"],
        ],
        "Priya lives where streetlights glow all night, and Mr. Okafor says you can't see the Milky Way from the city.",
        "You can't see it from the city.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the story, "silhouettes" most nearly means',
        "dark shapes against a lighter background",
        [
          ["bright lights in the trees", "opposite"],
          ["loud sounds in the forest", "not_in_text"],
          ["paths through the woods", "not_in_text"],
        ],
        "The pines appear as dark shapes against the deep blue sky.",
        "The tall pines became dark silhouettes against a sky that was not black at all, but deep blue.",
        2,
      ),
      mc(
        "point_of_view",
        "open",
        "How do Priya's feelings change from the beginning to the end of the story?",
        "She goes from nervous about the dark to amazed by it.",
        [
          ["She goes from excited to bored.", "not_in_text"],
          ["She stays scared the whole time.", "opposite"],
          ["She goes from calm to angry.", "not_in_text"],
        ],
        "At first she grips her flashlight; at the end she wants to keep looking in the dark.",
        "\"Not yet,\" she said. \"Let's look a little longer.\"",
        2,
      ),
      mc(
        "author_purpose",
        "open",
        'Why does the author compare the stars to "sugar on a dark table"?',
        "To help the reader picture how many tiny stars are scattered across the sky",
        [
          ["To show that Priya is hungry", "not_in_text"],
          ["To explain what stars are made of", "not_in_text"],
          ["To show the sky is completely black", "opposite"],
        ],
        "Spilled sugar is many small, bright grains, like the stars.",
        "Above them, more stars than Priya had ever seen spilled across the sky like sugar on a dark table.",
        3,
      ),
    ],
  },
];
