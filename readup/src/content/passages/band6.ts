import { ep, mc, ms, oe, type SeedPassage } from "../types";

export const band6: SeedPassage[] = [
  {
    slug: "the-mapmakers-apprentice",
    title: "The Mapmaker's Apprentice",
    genre: "fiction",
    tags: ["history", "geography"],
    rating: 6.5,
    knowledgeDemand: 2,
    purpose: "As you read, figure out why Tomas decides to draw the river the way he does.",
    keyIdeas: [
      "Tomas is an apprentice to a mapmaker who demands accuracy above all.",
      "A wealthy merchant offers money to have a map drawn that hides a dangerous rapid to attract travelers.",
      "Tomas chooses to draw the truth, and his master praises his honesty.",
    ],
    glossary: [
      ["apprentice", "a person learning a trade by working for an expert"],
      ["rapids", "a part of a river where the water flows fast over rocks"],
      ["integrity", "the quality of being honest and doing what is right"],
      ["parchment", "a thin material made from animal skin, used for writing"],
    ],
    body: `In the city of Valmora, where the river curved like a question mark around the harbor, Master Elena Ruiz was known as the most careful mapmaker in the land. Captains paid extra for her charts because her coastlines were precise, her depths were measured, and her warnings were always true. Her apprentice, Tomas, had been grinding her inks and stretching her parchment for two years before she finally trusted him to draw a map on his own.

His first assignment was the upper river, a stretch of water he had traveled many times on his uncle's barge. He knew every bend, every sandbar, and especially the Teeth, a set of jagged rapids that had overturned more than one careless boat.

While Tomas was working late one evening, a merchant in a velvet coat stepped into the shop. He introduced himself as Señor Pardo, owner of a new inn upriver, and he placed a heavy purse on the table.

"Your map will be copied and sold to every traveler in Valmora," Pardo said smoothly. "Travelers avoid the upper river because of the rapids. But the Teeth are not so terrible in summer. If you simply forgot to mark them, more boats would come my way, and you would be well rewarded."

Tomas stared at the purse. It held more money than he would earn in a year. Master Ruiz was away visiting the coast, and no one else would ever know.

He thought about his uncle's barge tipping sideways in the white water, and the cold shock of the river when he was eight years old. He thought about the families who would trust his map without question.

"I'm sorry," Tomas said, sliding the purse back across the table. "A map that lies is worse than no map at all."

When Master Ruiz returned, she studied the finished chart for a long time. In the narrowest bend of the river, Tomas had drawn the Teeth in sharp black strokes, with a careful note: Dangerous in all seasons. Portage on the eastern bank.

"Pardo came to see me on the coast road," she said at last. "He complained that my apprentice was stubborn." She rolled up the map and handed it back to him. "In this trade, integrity is the only ink that never fades. You may sign this one yourself."`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the theme of the story?",
        "Honesty matters more than personal gain, especially when others depend on you.",
        [
          ["Mapmaking is the most difficult job in the world.", "too_broad"],
          ["It is acceptable to lie if no one will find out.", "opposite"],
          ["Rivers are most dangerous in summer.", "not_in_text"],
        ],
        "Tomas refuses a bribe because travelers will trust his map, and his master praises his integrity.",
        "\"A map that lies is worse than no map at all.\"",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "What did Señor Pardo want Tomas to do?",
        "Leave the dangerous rapids off the map",
        [
          ["Draw a map of the harbor", "true_but_irrelevant"],
          ["Copy the map and sell it himself", "not_in_text"],
          ["Close the inn upriver", "opposite"],
        ],
        "Pardo wanted the Teeth left off so more boats would travel past his inn.",
        "If you simply forgot to mark them, more boats would come my way, and you would be well rewarded.",
        2,
      ),
      ep(
        "inference",
        "Why does Tomas think about his uncle's barge tipping over before he answers Pardo?",
        "He remembers firsthand how dangerous the rapids are for people who trust the river.",
        [
          ["He wants to buy his uncle a new barge.", "not_in_text"],
          ["He is trying to remember where the inn is.", "not_in_text"],
          ["He has never seen the rapids himself.", "opposite"],
        ],
        "His own frightening experience reminds him what could happen to travelers if the map lies.",
        "He thought about his uncle's barge tipping sideways in the white water, and the cold shock of the river when he was eight years old.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'In the final paragraph, "integrity is the only ink that never fades" most nearly means',
        "an honest reputation lasts longer than anything else",
        [
          ["mapmakers should buy better ink", "true_but_irrelevant"],
          ["old maps are easy to read", "not_in_text"],
          ["dishonesty is the key to success", "opposite"],
        ],
        "Master Ruiz uses ink as a metaphor: honesty is what makes a mapmaker's work last.",
        "\"In this trade, integrity is the only ink that never fades.",
        4,
      ),
      mc(
        "point_of_view",
        "open",
        'When Pardo calls Tomas "stubborn," how does Master Ruiz view that same quality?',
        "She sees it as a sign of the honesty a mapmaker needs.",
        [
          ["She agrees that Tomas was rude to a customer.", "opposite"],
          ["She is angry that Tomas turned away money.", "opposite"],
          ["She thinks Tomas should apologize to Pardo.", "not_in_text"],
        ],
        "She repeats Pardo's complaint and then rewards Tomas by letting him sign the map.",
        "You may sign this one yourself.",
        4,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the author mention that Master Ruiz was away when Pardo visited?",
        "To show that Tomas had to make the choice entirely on his own",
        [
          ["To explain how maps are delivered", "not_in_text"],
          ["To suggest Master Ruiz knew about the bribe all along", "not_in_text"],
          ["To describe the coast road", "true_but_irrelevant"],
        ],
        "With no one watching, Tomas's decision truly tests his character.",
        "Master Ruiz was away visiting the coast, and no one else would ever know.",
        3,
      ),
    ],
  },
  {
    slug: "living-on-the-space-station",
    title: "A Day Aboard the Space Station",
    genre: "informational",
    tags: ["space", "science", "tech"],
    rating: 6,
    knowledgeDemand: 3,
    purpose: "As you read, figure out how astronauts handle everyday tasks without gravity pulling them down.",
    keyIdeas: [
      "The International Space Station orbits Earth about every ninety minutes, about 400 kilometers above the surface.",
      "Without the sensation of gravity, everyday tasks such as sleeping, eating, and drinking require special equipment.",
      "Astronauts exercise about two hours a day to protect their muscles and bones, and the station recycles most of its water.",
    ],
    glossary: [
      ["orbit", "the curved path of an object around a planet or star"],
      ["microgravity", "a condition in which people and objects seem nearly weightless"],
      ["recycle", "to process something used so it can be used again"],
      ["tether", "a rope or strap that holds something in place"],
    ],
    body: `About 400 kilometers above Earth's surface, a spacecraft the size of a football field races through space at roughly 28,000 kilometers per hour. The International Space Station circles the entire planet about every ninety minutes, which means the astronauts aboard can see around sixteen sunrises and sixteen sunsets each day. People have lived on the station continuously since November 2000, and its crews have conducted thousands of scientific experiments.

Life aboard the station is shaped by microgravity. Gravity has not disappeared, but because the station and everything in it are constantly falling around Earth together, astronauts and objects float. That sounds delightful, and astronauts often say it is, but it also makes ordinary tasks surprisingly complicated.

Consider sleeping. There is no "up" or "down," so astronauts sleep in small cabins inside sleeping bags attached to the wall. Without a tether, a sleeping astronaut could drift into equipment or air vents during the night. Eating requires similar planning. Loose crumbs could float into delicate machinery or someone's eyes, so bread is often replaced with tortillas, and salt and pepper come in liquid form. Drinks are sipped through straws from sealed pouches, because a splash of water would not fall but would instead wobble through the air in shimmering globes.

Microgravity also affects the human body. On Earth, our muscles and bones are strengthened by constantly working against gravity. In orbit, they gradually weaken. To slow this loss, astronauts exercise for about two hours every day using a treadmill with harnesses, a stationary bicycle, and a machine that simulates weightlifting.

Because shipping supplies from Earth is expensive, the station recycles as much as possible. A water recovery system collects moisture from the air, including astronauts' sweat and breath, and even purifies urine into clean drinking water. Astronauts like to joke that yesterday's coffee becomes tomorrow's coffee.

Every detail of daily life in space teaches scientists something about how humans might someday live on longer journeys, perhaps to the Moon or even Mars.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the central idea of the passage?",
        "Living in microgravity requires astronauts to adapt nearly every part of daily life.",
        [
          ["The space station is the size of a football field.", "too_narrow"],
          ["Astronauts dislike living in space.", "opposite"],
          ["Humans will move to Mars next year.", "not_in_text"],
        ],
        "The passage explains how sleeping, eating, exercise, and water use all change in space.",
        "That sounds delightful, and astronauts often say it is, but it also makes ordinary tasks surprisingly complicated.",
        2,
      ),
      ms(
        "key_details",
        "closed",
        "Select the two ways astronauts adjust their eating habits in space.",
        ["They often eat tortillas instead of bread.", "They use liquid salt and pepper."],
        [
          ["They eat only once a day.", "not_in_text"],
          ["They drink from open cups.", "opposite"],
        ],
        "Both changes keep crumbs and grains from floating into machinery or eyes.",
        "Loose crumbs could float into delicate machinery or someone's eyes, so bread is often replaced with tortillas, and salt and pepper come in liquid form.",
        2,
      ),
      ep(
        "inference",
        "Why do astronauts float even though gravity still exists on the station?",
        "The station and everything in it are falling around Earth together.",
        [
          ["The station is too far away for gravity to reach.", "opposite"],
          ["Astronauts wear special floating suits.", "not_in_text"],
          ["Their muscles become too weak to stand.", "true_but_irrelevant"],
        ],
        "Because everything falls together, nothing presses against the floor, so astronauts feel weightless.",
        "Gravity has not disappeared, but because the station and everything in it are constantly falling around Earth together, astronauts and objects float.",
        4,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, "tether" most nearly means',
        "something that ties an object in place",
        [
          ["a type of sleeping bag", "too_narrow"],
          ["a powerful air vent", "not_in_text"],
          ["a way of floating freely", "opposite"],
        ],
        "Without a tether, a sleeping astronaut would drift; it holds them in place.",
        "Without a tether, a sleeping astronaut could drift into equipment or air vents during the night.",
        2,
      ),
      mc(
        "text_structure",
        "open",
        "How is the third paragraph organized?",
        "It gives examples of everyday tasks and explains how each is adapted for microgravity.",
        [
          ["It describes events in the order they happened in history.", "not_in_text"],
          ["It argues that astronauts should not eat in space.", "not_in_text"],
          ["It compares the station with a submarine.", "not_in_text"],
        ],
        "The paragraph walks through sleeping, eating, and drinking, explaining each change.",
        "Consider sleeping.",
        3,
      ),
      mc(
        "author_purpose",
        "open",
        'Why does the author include the joke that "yesterday\'s coffee becomes tomorrow\'s coffee"?',
        "To show in a lighthearted way how thoroughly the station recycles water",
        [
          ["To explain how astronauts make coffee", "too_narrow"],
          ["To suggest that the water on the station is unsafe", "opposite"],
          ["To show that astronauts drink too much coffee", "not_in_text"],
        ],
        "The joke highlights that used water is purified and reused again and again.",
        "Astronauts like to joke that yesterday's coffee becomes tomorrow's coffee.",
        3,
      ),
    ],
  },
  {
    slug: "should-zoos-exist",
    title: "Zoos: Prisons or Lifeboats?",
    genre: "argument",
    tags: ["animals", "science"],
    rating: 6.5,
    knowledgeDemand: 3,
    purpose: "As you read, figure out the writer's position and how the writer handles the strongest argument against it.",
    keyIdeas: [
      "The writer argues that well-run, accredited zoos play an important role in protecting wildlife.",
      "Zoos support conservation through breeding programs, research, and education, as shown by the California condor.",
      "The writer acknowledges that some animals suffer in captivity and argues that the solution is stronger standards, not closing all zoos.",
    ],
    glossary: [
      ["captivity", "the state of being kept in an enclosed space"],
      ["conservation", "the protection of plants, animals, and natural areas"],
      ["accredited", "officially approved for meeting certain standards"],
      ["endangered", "at risk of disappearing forever"],
    ],
    body: `For many people, a trip to the zoo is a favorite childhood memory. For others, the sight of a tiger pacing behind glass is deeply troubling. Critics argue that keeping wild animals in captivity is cruel and that zoos should be shut down entirely. Although this concern deserves to be taken seriously, I believe that well-run, accredited zoos are essential to protecting the world's wildlife.

The strongest case for zoos is conservation. Many species are now endangered because their habitats are being destroyed. Zoos can act as lifeboats, maintaining healthy populations of animals that might otherwise vanish. Consider the California condor. By 1987, only twenty-seven condors remained, and scientists captured every one of them for a breeding program run partly by zoos. Thanks to that effort, there are now more than five hundred condors, and over half of them fly free in the wild.

Zoos also contribute to scientific research. Studying animals up close allows scientists to learn about their health, diets, and behavior in ways that would be difficult or impossible in the wild. That knowledge can then help wildlife experts protect animals in their natural habitats.

Finally, zoos inspire people to care about nature. Most people will never travel to a rainforest or an African savanna. Seeing a real gorilla, hearing a lion roar, or watching an elephant spray water creates a personal connection that a documentary rarely can. Many zoos use that connection to teach visitors about threats to wildlife and how to help.

It would be dishonest to pretend that every zoo treats animals well. Some animals, especially large, wide-ranging species like elephants and orcas, may suffer in small enclosures. Some roadside attractions call themselves zoos but care little for their animals. Yet these problems are an argument for higher standards, not for abolishing all zoos. Accredited zoos must meet strict requirements for animal care, and many are redesigning exhibits to give animals more space and more natural environments.

Instead of asking whether zoos should exist, we should ask how to make every zoo worthy of the animals it protects.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "What is the writer's central claim?",
        "Well-run, accredited zoos are important for protecting wildlife.",
        [
          ["All zoos should be shut down.", "opposite"],
          ["California condors are the most endangered birds.", "too_narrow"],
          ["People should visit rainforests instead of zoos.", "not_in_text"],
        ],
        "The writer states that accredited zoos are essential to protecting wildlife.",
        "Although this concern deserves to be taken seriously, I believe that well-run, accredited zoos are essential to protecting the world's wildlife.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "How many California condors were left in 1987?",
        "Twenty-seven",
        [
          ["More than five hundred", "true_but_irrelevant"],
          ["None", "not_in_text"],
          ["About two hundred", "not_in_text"],
        ],
        "Only twenty-seven remained in 1987; there are now more than five hundred.",
        "By 1987, only twenty-seven condors remained, and scientists captured every one of them for a breeding program run partly by zoos.",
        2,
      ),
      ep(
        "argument_evidence",
        "How does the writer respond to the argument that some animals suffer in zoos?",
        "By agreeing that problems exist but arguing they call for higher standards rather than closing zoos",
        [
          ["By denying that any animal suffers in a zoo", "opposite"],
          ["By saying elephants and orcas do not need space", "opposite"],
          ["By changing the claim to say zoos should close", "opposite"],
        ],
        "The writer concedes the problem and then argues it should be fixed with better rules.",
        "Yet these problems are an argument for higher standards, not for abolishing all zoos.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, the word "lifeboats" suggests that zoos',
        "can save species that might otherwise disappear",
        [
          ["keep animals in boats", "not_in_text"],
          ["are dangerous places for animals", "opposite"],
          ["are only near the ocean", "not_in_text"],
        ],
        "The metaphor compares zoos to boats that rescue people from a sinking ship.",
        "Zoos can act as lifeboats, maintaining healthy populations of animals that might otherwise vanish.",
        3,
      ),
      mc(
        "inference",
        "open",
        "Why does the writer mention that most people will never travel to a rainforest?",
        "To suggest that zoos give people a rare chance to connect with wild animals",
        [
          ["To argue that travel is too expensive", "too_narrow"],
          ["To prove that rainforests are disappearing", "not_in_text"],
          ["To show that documentaries are better than zoos", "opposite"],
        ],
        "Since most people can't see animals in the wild, zoos offer that connection.",
        "Seeing a real gorilla, hearing a lion roar, or watching an elephant spray water creates a personal connection that a documentary rarely can.",
        3,
      ),
      mc(
        "text_structure",
        "open",
        "What is the function of the final sentence?",
        "It reframes the debate as a question about improving zoos rather than eliminating them.",
        [
          ["It introduces a new piece of evidence.", "not_in_text"],
          ["It admits the writer was wrong.", "opposite"],
          ["It describes a specific zoo.", "not_in_text"],
        ],
        "The conclusion shifts the question from 'should zoos exist' to 'how can zoos be better.'",
        "Instead of asking whether zoos should exist, we should ask how to make every zoo worthy of the animals it protects.",
        3,
      ),
    ],
  },
  {
    slug: "science-of-a-curveball",
    title: "The Science of a Curveball",
    genre: "informational",
    tags: ["sports", "science"],
    rating: 6,
    knowledgeDemand: 3,
    purpose: "As you read, figure out how spin makes a baseball change direction.",
    keyIdeas: [
      "A curveball drops and bends because of the spin the pitcher puts on it.",
      "The Magnus effect: a spinning ball pushes air in one direction, and the air pushes the ball the opposite way.",
      "The ball's raised seams grip the air, and batters find curveballs hard to hit because the path changes late.",
    ],
    glossary: [
      ["trajectory", "the curved path of an object moving through the air"],
      ["deflect", "to cause something to change direction"],
      ["seam", "the line where two pieces of material are stitched together"],
      ["perceive", "to notice or become aware of something"],
    ],
    body: `To a batter standing at home plate, a good curveball seems to play a trick. It leaves the pitcher's hand heading toward the batter's shoulders, then suddenly dives toward the knees just as the batter begins to swing. For many years, some people insisted that the curveball was an optical illusion. Physics, however, has shown that the curve is very real.

The secret is spin. When a pitcher throws a curveball, he or she snaps the wrist and pulls the fingers down over the front of the ball. This motion sends the ball spinning forward, rotating from top to bottom, much like a wheel rolling toward the batter. A typical curveball can spin more than two thousand times per minute.

A spinning ball affects the air around it. As the ball travels, the top of the ball moves forward while the bottom moves backward relative to the oncoming air. The spinning surface drags a thin layer of air along with it and deflects the air flowing past the ball upward. According to one of the basic laws of motion, every action produces an equal and opposite reaction. If the ball pushes air up, the air pushes the ball down. This sideways force caused by spin is called the Magnus effect, named after a German scientist who studied it in the 1850s.

The baseball's design makes the effect even stronger. A baseball is covered by two pieces of leather held together with 108 raised red stitches. These seams act like tiny paddles, gripping the air and increasing the force. That is why pitchers carefully choose where to place their fingers on the seams.

The Magnus effect is not limited to baseball. It explains why a soccer ball can bend around a wall of defenders and why a tennis ball hit with topspin dips sharply inside the line.

For batters, the challenge is timing. A ball from the mound takes less than half a second to reach the plate, and the batter must begin swinging before the ball has traveled even halfway. Because the curveball's trajectory changes most near the end of its flight, the batter's brain may perceive the drop as a sudden "break," even though the ball has been curving gradually the entire time.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the central idea of the passage?",
        "A curveball's path is changed by its spin, which creates a force known as the Magnus effect.",
        [
          ["A curveball is only an optical illusion.", "opposite"],
          ["A baseball has 108 red stitches.", "too_narrow"],
          ["Every sport uses the same kind of ball.", "too_broad"],
        ],
        "The passage explains how spin and air create the force that makes the ball curve.",
        "This sideways force caused by spin is called the Magnus effect, named after a German scientist who studied it in the 1850s.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "How does a pitcher make a curveball spin forward?",
        "By snapping the wrist and pulling the fingers down over the front of the ball",
        [
          ["By throwing the ball as hard as possible", "not_in_text"],
          ["By rubbing the ball on the leather", "not_in_text"],
          ["By releasing the ball with no spin at all", "opposite"],
        ],
        "The wrist snap and finger motion create forward, top-to-bottom spin.",
        "When a pitcher throws a curveball, he or she snaps the wrist and pulls the fingers down over the front of the ball.",
        2,
      ),
      ep(
        "inference",
        "Why do pitchers pay close attention to where they place their fingers on the seams?",
        "The seams grip the air, so finger placement affects how strongly the ball curves.",
        [
          ["The seams make the ball lighter.", "not_in_text"],
          ["The rules require fingers on the seams.", "not_in_text"],
          ["The seams prevent the ball from spinning.", "opposite"],
        ],
        "The raised stitches act like paddles that increase the Magnus force.",
        "These seams act like tiny paddles, gripping the air and increasing the force.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, "deflects" most nearly means',
        "turns aside",
        [
          ["stops completely", "opposite"],
          ["speeds up", "not_in_text"],
          ["measures", "not_in_text"],
        ],
        "The spinning ball redirects the air flowing past it upward.",
        "The spinning surface drags a thin layer of air along with it and deflects the air flowing past the ball upward.",
        2,
      ),
      mc(
        "text_structure",
        "open",
        "How does the fifth paragraph, about soccer and tennis, contribute to the passage?",
        "It shows that the same scientific principle applies in other sports.",
        [
          ["It argues that soccer is harder than baseball.", "not_in_text"],
          ["It explains how batters time their swings.", "true_but_irrelevant"],
          ["It describes the history of the Magnus effect.", "not_in_text"],
        ],
        "The paragraph extends the Magnus effect beyond baseball.",
        "The Magnus effect is not limited to baseball.",
        2,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the author explain that the ball reaches the plate in less than half a second?",
        "To help explain why the curve seems to happen suddenly to the batter",
        [
          ["To prove that pitchers throw too fast", "not_in_text"],
          ["To show that batters can easily hit curveballs", "opposite"],
          ["To explain how the stitches are sewn", "not_in_text"],
        ],
        "Because batters must decide so quickly, the late change in path feels like a sudden break.",
        "Because the curveball's trajectory changes most near the end of its flight, the batter's brain may perceive the drop as a sudden \"break,\" even though the ball has been curving gradually the entire time.",
        3,
      ),
    ],
  },
  {
    slug: "many-hands-lightbulb",
    title: "The Lightbulb Had Many Inventors",
    genre: "informational",
    tags: ["history", "tech", "biographies"],
    rating: 6.5,
    knowledgeDemand: 3,
    purpose: "As you read, figure out why the author says the lightbulb had many inventors.",
    keyIdeas: [
      "Electric light was developed over decades by many inventors, not just Thomas Edison.",
      "Joseph Swan and Edison both created practical carbon-filament bulbs around 1879, and Lewis Latimer improved the filament.",
      "Invention is usually a collaborative process that builds on earlier work.",
    ],
    glossary: [
      ["filament", "a thin wire or thread that glows when electricity passes through it"],
      ["practical", "useful and workable in real life"],
      ["patent", "a legal right that gives an inventor control over an invention"],
      ["collaborative", "involving people working together"],
    ],
    body: `Ask almost anyone who invented the lightbulb, and they will answer, "Thomas Edison." The real story is more complicated and, in many ways, more interesting. The electric lightbulb was not the work of a single genius in a single moment. It was developed over several decades by many inventors, each building on the discoveries of others.

As early as the first decade of the 1800s, the English chemist Humphry Davy showed that electricity could produce light. By connecting a powerful battery to two charcoal rods, he created a brilliant arc of light leaping between them. Arc lamps were eventually used to light streets and factories, but they were far too bright, hot, and expensive for homes.

The challenge for later inventors was to create a practical light for homes: small, gentle, and long-lasting. The basic idea was simple: send electricity through a thin thread called a filament until it glowed. The difficulty was that most filaments either melted or burned up within minutes. Dozens of inventors experimented with platinum wires, carbon threads, and glass bulbs from which the air had been removed, since a filament burns more slowly without oxygen.

In England, the physicist Joseph Swan demonstrated a working carbon-filament lamp in the late 1870s. Around the same time, in New Jersey, Edison and his large team of assistants tested thousands of materials. In 1879, they produced a carbon filament that glowed for many hours, and they soon discovered that carbonized bamboo could last more than a thousand hours. Edison's greatest strength was not simply the bulb itself but the entire system he designed to deliver electricity to homes, including generators, wiring, and meters.

Another important contributor was Lewis Latimer, the son of parents who had escaped slavery. A skilled draftsman and inventor, Latimer patented an improved method of making carbon filaments in 1882 that made bulbs longer-lasting and cheaper to produce. He later worked for Edison's company and wrote one of the first books about electric lighting.

Swan and Edison eventually joined forces and formed a company together in England. The history of the lightbulb shows that invention is often a collaborative process, a relay of ideas passed from one mind to another.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the central idea of the passage?",
        "The lightbulb was developed over time by many inventors building on each other's work.",
        [
          ["Thomas Edison invented the lightbulb by himself.", "opposite"],
          ["Arc lamps were too bright for homes.", "too_narrow"],
          ["Every modern invention was created in England.", "too_broad"],
        ],
        "The passage traces contributions from Davy, Swan, Edison, Latimer, and others.",
        "It was developed over several decades by many inventors, each building on the discoveries of others.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "What did Lewis Latimer contribute?",
        "An improved method of making carbon filaments",
        [
          ["The first arc lamp", "true_but_irrelevant"],
          ["The idea of removing air from bulbs", "not_in_text"],
          ["A bamboo farm for Edison", "not_in_text"],
        ],
        "In 1882, Latimer patented a better way to make filaments that were longer-lasting and cheaper.",
        "A skilled draftsman and inventor, Latimer patented an improved method of making carbon filaments in 1882 that made bulbs longer-lasting and cheaper to produce.",
        2,
      ),
      ep(
        "inference",
        "Why did inventors remove the air from inside lightbulbs?",
        "Without oxygen, the filament would burn up more slowly.",
        [
          ["Air made the bulbs too heavy.", "not_in_text"],
          ["Air blocked electricity from entering.", "not_in_text"],
          ["Removing air made the light brighter than an arc lamp.", "not_in_text"],
        ],
        "The passage explains that a filament burns more slowly without oxygen.",
        "Dozens of inventors experimented with platinum wires, carbon threads, and glass bulbs from which the air had been removed, since a filament burns more slowly without oxygen.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, "practical" most nearly means',
        "useful in everyday life",
        [
          ["imaginary", "opposite"],
          ["extremely bright", "not_in_text"],
          ["old-fashioned", "not_in_text"],
        ],
        "Arc lamps worked but were not practical for homes; inventors wanted a usable everyday light.",
        "The challenge for later inventors was to create a practical light for homes: small, gentle, and long-lasting.",
        3,
      ),
      mc(
        "point_of_view",
        "open",
        "What is the author's view of the common belief that Edison invented the lightbulb?",
        "It is incomplete because it leaves out many other contributors.",
        [
          ["It is completely accurate.", "opposite"],
          ["It is false because Edison did nothing.", "too_broad"],
          ["It does not matter who invented the lightbulb.", "not_in_text"],
        ],
        "The author credits Edison's system but argues the full story includes many people.",
        "The real story is more complicated and, in many ways, more interesting.",
        3,
      ),
      mc(
        "author_purpose",
        "open",
        'Why does the author describe invention as "a relay of ideas passed from one mind to another"?',
        "To emphasize that inventions are built by many people over time",
        [
          ["To compare inventors with athletes", "true_but_irrelevant"],
          ["To suggest that inventors steal ideas", "not_in_text"],
          ["To explain how electricity flows", "not_in_text"],
        ],
        "Like runners passing a baton, inventors passed ideas forward.",
        "The history of the lightbulb shows that invention is often a collaborative process, a relay of ideas passed from one mind to another.",
        3,
      ),
    ],
  },
  {
    slug: "fog-comes-in",
    title: "Morning Fog",
    genre: "poetry",
    tags: ["geography"],
    rating: 7,
    knowledgeDemand: 2,
    purpose: "As you read, figure out how the poet makes the fog seem like a living thing.",
    keyIdeas: [
      "The poem describes fog rolling into a coastal town in the early morning.",
      "The fog is personified as a quiet visitor that erases and then returns the town.",
      "As the sun burns the fog away, the familiar world reappears, changed by the speaker's new attention.",
    ],
    glossary: [
      ["steeple", "a tall, pointed tower on top of a church"],
      ["muffle", "to make a sound quieter"],
      ["erase", "to remove completely"],
      ["reluctant", "not wanting to do something"],
    ],
    body: `Before the town has rubbed its eyes, the fog
comes walking up the harbor on gray feet,
a patient visitor who does not knock
but simply lets itself into the street.

It folds the fishing boats into its sleeves.
It borrows every steeple, roof, and wire.
It muffles barking dogs and slamming doors
and dims the bakery's early, orange fire.

I stand on our front step and cannot see
the corner mailbox, or the neighbor's tree,
as though the world had quietly agreed
to be erased, and only I am freed

to wander in a page that is still blank.
But by and by, the sun climbs, cool and thin,
and the reluctant fog lets go its hold,
returning everything it gathered in:

the boats, the wires, the steeple, and the tree,
the mailbox standing where it always stood,
each one more clearly drawn than yesterday,
as if the fog had polished them for good.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best describes what happens in the poem?",
        "Fog covers a town in the morning and then lifts, revealing familiar things in a new way.",
        [
          ["A storm destroys a fishing town.", "not_in_text"],
          ["The speaker gets lost walking to the harbor.", "not_in_text"],
          ["The bakery opens early in the morning.", "too_narrow"],
        ],
        "The fog hides the town and then 'returns' everything as the sun rises.",
        "returning everything it gathered in:",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "What causes the fog to let go of the town?",
        "The rising sun",
        [
          ["A strong wind", "not_in_text"],
          ["The barking dogs", "true_but_irrelevant"],
          ["The speaker's voice", "not_in_text"],
        ],
        "As the sun climbs, the fog releases its hold.",
        "But by and by, the sun climbs, cool and thin,",
        2,
      ),
      ep(
        "inference",
        "What does the speaker suggest in the final stanza about how the town looks after the fog?",
        "The speaker sees the familiar objects more clearly and appreciates them more.",
        [
          ["The town has been damaged by the fog.", "opposite"],
          ["The objects have moved to new places.", "opposite"],
          ["The speaker cannot see anything at all.", "opposite"],
        ],
        "The objects seem 'more clearly drawn than yesterday,' showing a fresh appreciation.",
        "each one more clearly drawn than yesterday,",
        4,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the poem, "muffles" most nearly means',
        "makes quieter",
        [
          ["makes louder", "opposite"],
          ["frightens", "not_in_text"],
          ["paints", "not_in_text"],
        ],
        "Fog softens sounds like barking and slamming doors.",
        "It muffles barking dogs and slamming doors",
        2,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the poet describe the fog as a visitor that \"does not knock\"?",
        "To personify the fog as something that quietly enters without permission",
        [
          ["To show that the fog is rude and dangerous", "too_broad"],
          ["To explain how fog forms over water", "not_in_text"],
          ["To describe the speaker's front door", "true_but_irrelevant"],
        ],
        "Giving the fog human actions makes its silent arrival vivid.",
        "a patient visitor who does not knock",
        3,
      ),
      mc(
        "text_structure",
        "open",
        "How does the poem's structure follow the fog's movement?",
        "It moves from the fog arriving, to covering the town, to lifting and returning everything.",
        [
          ["It moves from evening to midnight.", "not_in_text"],
          ["It describes the town before, then after, a flood.", "not_in_text"],
          ["It repeats the same stanza four times.", "not_in_text"],
        ],
        "The stanzas trace the fog's arrival, its hold on the town, and its departure.",
        "and the reluctant fog lets go its hold,",
        3,
      ),
    ],
  },
  {
    slug: "the-robot-that-couldnt-lie",
    title: "The Robot That Couldn't Lie",
    genre: "fiction",
    tags: ["tech"],
    rating: 6,
    knowledgeDemand: 2,
    purpose: "As you read, figure out what Zara learns about the difference between honesty and kindness.",
    keyIdeas: [
      "Zara builds a robot assistant, Bolt, programmed never to lie.",
      "Bolt's blunt honesty hurts her friend Lin's feelings about a painting.",
      "Zara reprograms Bolt to be both truthful and kind, learning that honesty can be delivered with care.",
    ],
    glossary: [
      ["swivel", "to turn around on a fixed point"],
      ["verdict", "a final judgment or decision"],
      ["algorithm", "a set of step-by-step instructions for a computer"],
      ["mortified", "extremely embarrassed"],
    ],
    body: `For the regional science fair, Zara built a robot assistant named Bolt. It was about the size of a toaster, with two camera eyes and a small speaker that gave its voice a slightly tinny sound. Bolt could answer questions, identify objects, and describe what it saw. Most importantly, Zara had programmed one unbreakable rule into its algorithm: Bolt could never say anything untrue.

"An honest robot," Zara explained to her friend Lin. "People can always trust what it says."

The trouble began the next afternoon. Lin had spent two weeks on a watercolor painting of the lake behind their school, and she brought it over to show Zara. Before Zara could say a word, Bolt swiveled its camera eyes toward the canvas.

"The proportions of the trees are inaccurate," Bolt announced. "The water is a color that does not occur in nature. The painting is unsuccessful."

Lin's face crumpled. She mumbled that she had to go home and left before Zara could stop her.

Zara was mortified. She sat down in front of Bolt and stared at it. "Why would you say that?"

"Every statement was true," Bolt replied.

Zara opened her laptop and began scrolling through Bolt's code, searching for a mistake. But there was no mistake. Bolt had done exactly what she designed it to do. The problem was not that Bolt had told the truth. The problem was that it had chosen which truths to tell and how to tell them without any concern for the person listening.

She worked late into the night. She did not remove the honesty rule. Instead, she added new instructions. Before speaking, Bolt would identify something genuinely good. When it noticed problems, it would describe them as suggestions rather than verdicts, and only if someone asked for feedback.

The next day, Zara invited Lin back. Nervously, Lin held up the painting.

Bolt studied it for a moment. "The reflections on the water show careful observation," it said. "If you would like a suggestion, the trees on the left could be taller compared to the hills."

Lin tilted her head, looked at the painting again, and slowly smiled. "Actually," she said, "you're right."

Zara wrote one line in her project notebook: Truth tells you what to say. Kindness tells you how.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the theme of the story?",
        "Honesty is most helpful when it is delivered with kindness.",
        [
          ["Robots should never be allowed to talk.", "not_in_text"],
          ["It is better to lie than to hurt someone's feelings.", "opposite"],
          ["Watercolor is the hardest kind of painting.", "not_in_text"],
        ],
        "Zara keeps Bolt honest but teaches it to be kind, and the feedback becomes helpful.",
        "Truth tells you what to say. Kindness tells you how.",
        2,
      ),
      oe(
        "key_details",
        "closed",
        "Put these events in the order they happened.",
        [
          "Zara programs Bolt never to say anything untrue.",
          "Bolt says Lin's painting is unsuccessful.",
          "Zara adds new instructions to Bolt's code.",
          "Lin agrees with Bolt's suggestion about the trees.",
        ],
        "Zara builds Bolt, Bolt hurts Lin, Zara updates the code, and Lin accepts the new feedback.",
        "She worked late into the night.",
        2,
      ),
      ep(
        "inference",
        "Why doesn't Zara simply remove the honesty rule after Bolt upsets Lin?",
        "She realizes honesty was not the problem; the way Bolt shared the truth was.",
        [
          ["She does not know how to change the code.", "not_in_text"],
          ["She wants Bolt to keep hurting people.", "opposite"],
          ["The science fair rules require honest robots.", "not_in_text"],
        ],
        "Zara recognizes that the problem was how Bolt chose and delivered its truths.",
        "The problem was not that Bolt had told the truth.",
        4,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the story, "mortified" most nearly means',
        "very embarrassed",
        [
          ["very proud", "opposite"],
          ["confused about code", "not_in_text"],
          ["sleepy", "not_in_text"],
        ],
        "Zara feels terrible that her robot hurt her friend.",
        "Zara was mortified.",
        2,
      ),
      mc(
        "point_of_view",
        "open",
        "How do Bolt's two comments about the painting differ?",
        "The first lists flaws as final judgments, while the second begins with praise and offers a suggestion.",
        [
          ["The first is true and the second is a lie.", "opposite"],
          ["The first is kind and the second is harsh.", "opposite"],
          ["Both comments are exactly the same.", "not_in_text"],
        ],
        "Both are honest, but the second is delivered with care.",
        "\"The reflections on the water show careful observation,\" it said.",
        3,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the author include Bolt's reply \"Every statement was true\"?",
        "To show that being truthful alone does not prevent hurting someone",
        [
          ["To prove that Bolt was broken", "opposite"],
          ["To explain how cameras work", "not_in_text"],
          ["To show that Lin's painting was perfect", "not_in_text"],
        ],
        "Bolt's answer highlights the gap between truthfulness and kindness that Zara must fix.",
        "\"Every statement was true,\" Bolt replied.",
        3,
      ),
    ],
  },
  {
    slug: "coral-reefs-in-hot-water",
    title: "Coral Reefs in Hot Water",
    genre: "informational",
    tags: ["science", "animals", "geography"],
    rating: 6.5,
    knowledgeDemand: 3,
    purpose: "As you read, figure out what causes coral bleaching and what people are doing about it.",
    keyIdeas: [
      "Coral reefs cover less than one percent of the ocean floor but support about a quarter of marine species.",
      "When water becomes too warm, corals expel the algae that feed them and turn white, a process called bleaching.",
      "Bleached corals can recover if conditions improve, and scientists are growing and replanting corals to help reefs.",
    ],
    glossary: [
      ["symbiotic", "describing a close relationship between two living things that helps both"],
      ["expel", "to force something out"],
      ["resilient", "able to recover quickly from difficulty"],
      ["biodiversity", "the variety of living things in an area"],
    ],
    body: `Coral reefs are sometimes called the rainforests of the sea. Although they cover less than one percent of the ocean floor, they provide homes for roughly a quarter of all known marine species, from tiny shrimp to sea turtles and sharks. Reefs also protect coastlines from powerful waves and support fishing and tourism that millions of people depend on.

It may be surprising to learn that corals are animals. Each coral is made of many tiny creatures called polyps, which build hard skeletons of limestone that grow together into enormous structures over hundreds or thousands of years. Most reef-building corals depend on a symbiotic relationship with microscopic algae that live inside their tissues. The algae use sunlight to make food, sharing much of it with the coral. In return, the coral provides the algae with shelter. The algae also give many corals their brilliant colors.

This partnership, however, is delicate. When ocean water becomes too warm for too long, the stressed corals expel the algae. Without the algae, the coral's tissue becomes nearly transparent, revealing the white skeleton underneath. This process is called coral bleaching. A bleached coral is not yet dead, but it is starving. If the water cools within a few weeks, the algae can return and the coral may recover. If the heat lasts too long, the coral may die.

As ocean temperatures have risen, bleaching events have become more frequent and widespread. Scientists have recorded several mass bleaching events in recent decades, affecting reefs in many parts of the world.

Despite this troubling news, many scientists remain hopeful. Some corals appear to be more resilient to heat than others, and researchers are studying what makes them tougher. In coral nurseries, divers grow small fragments of coral on underwater frames, then transplant them onto damaged reefs. Communities are also working to reduce pollution and overfishing, which can make reefs better able to survive heat.

Protecting coral reefs will require action on many levels, from local cleanup projects to global efforts to slow the warming of the oceans. The future of the sea's biodiversity may depend on it.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the central idea of the passage?",
        "Coral reefs are vital but threatened by warming water, and people are working to protect them.",
        [
          ["Coral reefs cover most of the ocean floor.", "opposite"],
          ["Algae give corals their color.", "too_narrow"],
          ["All ocean animals live in coral reefs.", "too_broad"],
        ],
        "The passage explains why reefs matter, how bleaching harms them, and efforts to help.",
        "Protecting coral reefs will require action on many levels, from local cleanup projects to global efforts to slow the warming of the oceans.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "What happens during coral bleaching?",
        "Stressed corals expel the algae living in their tissues and turn white.",
        [
          ["Corals grow new limestone skeletons.", "not_in_text"],
          ["Algae turn the corals bright red.", "opposite"],
          ["Divers paint the corals white.", "not_in_text"],
        ],
        "Without the algae, the coral's tissue becomes clear, revealing the white skeleton.",
        "When ocean water becomes too warm for too long, the stressed corals expel the algae.",
        2,
      ),
      ep(
        "inference",
        "Why does a bleached coral begin to starve?",
        "It has lost the algae that made much of its food.",
        [
          ["Fish eat all of its food.", "not_in_text"],
          ["Its skeleton dissolves in warm water.", "not_in_text"],
          ["It is buried under sand.", "not_in_text"],
        ],
        "The algae make food from sunlight and share it with the coral; without them, the coral lacks food.",
        "The algae use sunlight to make food, sharing much of it with the coral.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, "resilient" most nearly means',
        "able to recover from difficulty",
        [
          ["easily damaged", "opposite"],
          ["brightly colored", "not_in_text"],
          ["very old", "not_in_text"],
        ],
        "Some corals handle heat better and recover; scientists study what makes them tougher.",
        "Some corals appear to be more resilient to heat than others, and researchers are studying what makes them tougher.",
        2,
      ),
      mc(
        "text_structure",
        "open",
        'How does the paragraph beginning "Despite this troubling news" relate to the paragraph before it?',
        "It shifts from describing a problem to describing possible solutions.",
        [
          ["It gives more examples of bleaching events.", "not_in_text"],
          ["It explains how polyps build skeletons.", "not_in_text"],
          ["It argues that bleaching is not a real problem.", "opposite"],
        ],
        "After describing frequent bleaching, the author turns to hopeful efforts like coral nurseries.",
        "Despite this troubling news, many scientists remain hopeful.",
        3,
      ),
      mc(
        "author_purpose",
        "open",
        'Why does the author call coral reefs "the rainforests of the sea"?',
        "To emphasize that reefs, like rainforests, are home to a huge variety of life",
        [
          ["To suggest that reefs contain trees", "not_in_text"],
          ["To show that reefs are found on land", "not_in_text"],
          ["To explain how reefs are formed", "true_but_irrelevant"],
        ],
        "The comparison highlights the reefs' great biodiversity.",
        "Although they cover less than one percent of the ocean floor, they provide homes for roughly a quarter of all known marine species, from tiny shrimp to sea turtles and sharks.",
        2,
      ),
    ],
  },
  {
    slug: "katherine-johnson",
    title: "Katherine Johnson: The Mathematician Behind the Mission",
    genre: "informational",
    tags: ["space", "history", "biographies"],
    rating: 6.5,
    knowledgeDemand: 3,
    purpose: "As you read, figure out why astronauts trusted Katherine Johnson's calculations.",
    keyIdeas: [
      "Katherine Johnson was a gifted mathematician who worked at NACA and NASA starting in 1953.",
      "She calculated flight paths for early American spaceflights, and John Glenn asked her to check the computer's numbers before his orbital flight.",
      "Despite discrimination as a Black woman, her accuracy and persistence earned her respect and, later, the Presidential Medal of Freedom.",
    ],
    glossary: [
      ["trajectories", "the paths objects follow through the air or space"],
      ["segregated", "kept separate by race"],
      ["calculation", "the process of working out an answer using math"],
      ["precision", "the quality of being exact and accurate"],
    ],
    body: `In 1962, as astronaut John Glenn prepared to become the first American to orbit Earth, NASA's engineers had a new tool: an electronic computer that could calculate his spacecraft's path. Yet Glenn was not entirely willing to trust the new machine with his life. Before launch, he made a request: he wanted one particular mathematician to check the computer's numbers by hand. Her name was Katherine Johnson.

Born in West Virginia in 1918, Johnson showed a remarkable talent for numbers from an early age. She raced through school, finished high school at fourteen, and graduated from college at eighteen with degrees in mathematics and French. Opportunities for Black women in science were extremely limited, and for years she worked as a teacher.

In 1953, she joined the National Advisory Committee for Aeronautics, which later became NASA, at its laboratory in Hampton, Virginia. She was hired as one of the "computers," a term then used for people, mostly women, who performed complex calculations by hand. At first, she worked in a segregated unit with other Black women mathematicians, who were required to use separate offices and dining facilities.

Johnson refused to let unfair barriers limit her. She asked questions, insisted on attending meetings where important decisions were made, and earned a reputation for precision. Soon she was assigned to the team calculating trajectories for spaceflights. She helped plot the path of Alan Shepard's 1961 flight, the first American trip into space, carefully working out exactly when and where his capsule would come down in the ocean.

When Glenn made his request, Johnson spent days repeating the computer's calculations by hand. Her results matched, and Glenn's historic flight went forward. Later, she worked on calculations for the Apollo missions, including the 1969 flight that carried astronauts to the Moon, as well as on early plans for the space shuttle.

For decades, the public knew little about her work. That changed in her later years. In 2015, at the age of ninety-seven, she received the Presidential Medal of Freedom, the nation's highest civilian honor. Today, a NASA research facility bears her name, a permanent tribute to the mathematician whose precision helped send people into space.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the central idea of the passage?",
        "Katherine Johnson's skill and determination made her calculations essential to early American spaceflight.",
        [
          ["John Glenn was the first American to orbit Earth.", "true_but_irrelevant"],
          ["Electronic computers replaced all human mathematicians in 1962.", "opposite"],
          ["Every NASA employee received the Presidential Medal of Freedom.", "too_broad"],
        ],
        "The passage shows how her precision and persistence made her vital to NASA's missions.",
        "Johnson refused to let unfair barriers limit her.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "What did John Glenn ask before his orbital flight?",
        "That Katherine Johnson check the computer's calculations by hand",
        [
          ["That his flight be delayed a year", "not_in_text"],
          ["That the computer be turned off", "opposite"],
          ["That Alan Shepard fly instead", "not_in_text"],
        ],
        "Glenn wanted Johnson to confirm the electronic computer's numbers.",
        "Before launch, he made a request: he wanted one particular mathematician to check the computer's numbers by hand.",
        1,
      ),
      ep(
        "inference",
        "What does Glenn's request suggest about Katherine Johnson's reputation at NASA?",
        "She was known as someone whose calculations could be trusted completely.",
        [
          ["She was the only person who knew how to use computers.", "not_in_text"],
          ["She was famous throughout the country.", "opposite"],
          ["She was in charge of the entire space program.", "too_broad"],
        ],
        "Glenn trusted her accuracy even more than the new computer, which reflects her reputation for precision.",
        "She asked questions, insisted on attending meetings where important decisions were made, and earned a reputation for precision.",
        4,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, "computers" in quotation marks refers to',
        "people who did complex math by hand",
        [
          ["electronic machines", "opposite"],
          ["office buildings", "not_in_text"],
          ["spacecraft", "not_in_text"],
        ],
        "The passage explains the term was once used for people who performed calculations.",
        "She was hired as one of the \"computers,\" a term then used for people, mostly women, who performed complex calculations by hand.",
        2,
      ),
      mc(
        "text_structure",
        "open",
        "Why does the author begin the passage with John Glenn's request instead of Johnson's birth?",
        "To immediately show how much her work was trusted before telling her life story",
        [
          ["Because the passage is told in exact time order", "opposite"],
          ["To suggest Glenn was more important than Johnson", "not_in_text"],
          ["To explain how spacecraft are built", "not_in_text"],
        ],
        "Opening with this dramatic moment highlights her importance, then the passage moves back in time.",
        "Her name was Katherine Johnson.",
        3,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the author describe the segregated unit where Johnson first worked?",
        "To show the unfair barriers she had to overcome",
        [
          ["To explain how calculations were checked", "not_in_text"],
          ["To show that all NASA workers were treated equally", "opposite"],
          ["To describe the city of Hampton", "not_in_text"],
        ],
        "Describing separate offices and dining facilities shows the discrimination she faced.",
        "At first, she worked in a segregated unit with other Black women mathematicians, who were required to use separate offices and dining facilities.",
        3,
      ),
    ],
  },
  {
    slug: "should-school-start-later",
    title: "Let Sleeping Students Learn",
    genre: "argument",
    tags: ["science"],
    rating: 6.5,
    knowledgeDemand: 3,
    purpose: "As you read, figure out what scientific evidence the writer uses and whether it supports the claim.",
    keyIdeas: [
      "The writer argues that middle and high schools should start no earlier than 8:30 a.m.",
      "Adolescents' internal body clocks shift later, so early start times cause chronic sleep loss.",
      "The writer responds to concerns about schedules and costs by arguing that student health and learning are worth the adjustment.",
    ],
    glossary: [
      ["adolescent", "a young person who is developing from a child into an adult"],
      ["circadian rhythm", "the body's natural daily cycle of sleeping and waking"],
      ["chronic", "lasting a long time or happening again and again"],
      ["logistics", "the detailed planning of how something will work"],
    ],
    body: `At many schools across the country, the first bell rings before 8:00 a.m., which means some students wake up as early as 6:00 a.m. Many of them stumble into class groggy, yawning, and struggling to focus. I believe that middle and high schools should start no earlier than 8:30 a.m. The evidence from sleep science strongly supports this change.

The central reason is biology. Every person has a circadian rhythm, an internal clock that tells the body when to feel alert and when to feel sleepy. During adolescence, that clock shifts later. Research has found that teenagers' bodies often begin releasing melatonin, the hormone that signals sleepiness, later at night than children's or adults' bodies do. As a result, many adolescents find it physically difficult to fall asleep before about 11:00 p.m. This is not laziness or poor discipline; it is how the developing body works.

Sleep experts recommend that teenagers get between eight and ten hours of sleep each night. A student who cannot fall asleep until 11:00 p.m. and must wake at 6:00 a.m. gets only seven hours at best. Over weeks and months, that chronic shortfall adds up. Lack of sleep is linked to weaker memory, poorer attention, more frequent illness, and greater difficulty managing emotions. Because of evidence like this, the American Academy of Pediatrics has recommended that middle and high schools begin at 8:30 a.m. or later.

Opponents raise reasonable concerns about logistics. Later start times could affect bus schedules, after-school sports, and parents' work routines, and some districts would face new costs. These challenges are real, but they are not impossible to solve. Several school districts that have adopted later start times have adjusted their bus routes and practice schedules successfully. Some have reported improvements in attendance and fewer tardy students.

Schools exist to help students learn and grow. Requiring them to arrive before their brains are fully awake works against that purpose. Moving the first bell a little later is a small change that could make a significant difference in students' health and learning.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "What is the writer's central claim?",
        "Middle and high schools should start no earlier than 8:30 a.m.",
        [
          ["Teenagers are lazy and need more discipline.", "opposite"],
          ["Bus schedules are too complicated to change.", "opposite"],
          ["All students should sleep twelve hours a night.", "not_in_text"],
        ],
        "The writer states the claim in the first paragraph and supports it with sleep science.",
        "I believe that middle and high schools should start no earlier than 8:30 a.m.",
        1,
      ),
      mc(
        "key_details",
        "closed",
        "How many hours of sleep do experts recommend for teenagers?",
        "Between eight and ten hours",
        [
          ["About seven hours", "true_but_irrelevant"],
          ["Exactly six hours", "not_in_text"],
          ["More than twelve hours", "not_in_text"],
        ],
        "Seven hours is what the early-rising student gets, not what experts recommend.",
        "Sleep experts recommend that teenagers get between eight and ten hours of sleep each night.",
        2,
      ),
      ep(
        "argument_evidence",
        "Which evidence best supports the writer's claim that teenagers' difficulty falling asleep early is not their fault?",
        "Research showing that teenagers' bodies release melatonin later at night",
        [
          ["The fact that some districts adjusted their bus routes", "true_but_irrelevant"],
          ["The observation that students yawn in class", "too_narrow"],
          ["Parents' concerns about work routines", "true_but_irrelevant"],
        ],
        "The melatonin research shows the delay is biological, not a lack of discipline.",
        "Research has found that teenagers' bodies often begin releasing melatonin, the hormone that signals sleepiness, later at night than children's or adults' bodies do.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, "chronic" most nearly means',
        "continuing over a long period",
        [
          ["sudden and brief", "opposite"],
          ["caused by illness", "too_narrow"],
          ["related to time zones", "not_in_text"],
        ],
        "The writer describes sleep loss that adds up 'over weeks and months.'",
        "Over weeks and months, that chronic shortfall adds up.",
        2,
      ),
      mc(
        "inference",
        "open",
        "Why does the writer mention the American Academy of Pediatrics?",
        "To show that medical experts support the proposed change",
        [
          ["To prove that all doctors disagree with later start times", "opposite"],
          ["To explain how melatonin is produced", "not_in_text"],
          ["To describe how buses are scheduled", "not_in_text"],
        ],
        "Citing an expert medical organization strengthens the argument.",
        "Because of evidence like this, the American Academy of Pediatrics has recommended that middle and high schools begin at 8:30 a.m. or later.",
        3,
      ),
      mc(
        "text_structure",
        "open",
        "What is the purpose of the fourth paragraph?",
        "To acknowledge practical objections and argue that they can be overcome",
        [
          ["To introduce the writer's main claim", "not_in_text"],
          ["To explain how the circadian rhythm works", "not_in_text"],
          ["To admit that the proposal will not work", "opposite"],
        ],
        "The writer names logistical concerns and gives examples of districts that solved them.",
        "These challenges are real, but they are not impossible to solve.",
        3,
      ),
    ],
  },
];

