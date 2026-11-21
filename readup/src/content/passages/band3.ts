import { mc, oe, type SeedPassage } from "../types";

export const band3: SeedPassage[] = [
  {
    slug: "the-lost-kite",
    title: "The Lost Kite",
    genre: "fiction",
    tags: ["sports"],
    rating: 3,
    knowledgeDemand: 1,
    purpose: "As you read, figure out why Leo changes his mind about the new kid.",
    keyIdeas: [
      "Leo's red kite gets stuck high in an oak tree.",
      "Sam, the new kid Leo had ignored, helps get it down with a long pole.",
      "Leo learns that Sam is kind and they become friends.",
    ],
    glossary: [
      ["tangled", "twisted together in a messy knot"],
      ["sturdy", "strong and not easy to break"],
      ["sheepish", "a little embarrassed"],
    ],
    body: `Leo had the best kite in the neighborhood. It was bright red with a long yellow tail, and on windy days it climbed higher than any other kite in the park.

One Saturday, a strong gust pulled the kite sideways. The string snapped, and the kite drifted down into the top of a tall oak tree. Leo stared up at it. The tail was tangled in the branches, flapping like a flag.

"It's gone," he said quietly.

A boy walked over from the swings. It was Sam, the new kid from Leo's class. Leo had not talked to him once since he arrived. Sam always sat alone at lunch, reading a book about birds.

"I can help," Sam said. "My dad has a long pole for picking apples. We live right across the street."

Leo shrugged. He did not think it would work. But ten minutes later, Sam came back carrying a sturdy pole with a hook on the end. The two boys took turns stretching it up into the branches. On the fifth try, Sam caught the kite's tail and gently pulled. The kite slid free and floated down into Leo's arms.

Leo felt sheepish. He had been wrong about Sam, who was not strange at all. He was kind.

"Want to fly it with me?" Leo asked.

Sam grinned. "Only if you teach me how."

They spent the rest of the afternoon running across the grass, the red kite dancing above them.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the central idea of the story?",
        "Helping someone can turn a stranger into a friend.",
        [
          ["Kites are hard to fly on windy days.", "too_narrow"],
          ["Everyone should own a red kite.", "not_in_text"],
          ["New kids never want to make friends.", "opposite"],
        ],
        "The story is about how Sam's help changes Leo's view of him, and they become friends.",
        "Leo felt sheepish. He had been wrong about Sam, who was not strange at all. He was kind.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "How did the boys get the kite out of the tree?",
        "They used a long pole with a hook on the end.",
        [
          ["Leo climbed to the top of the oak tree.", "not_in_text"],
          ["They waited for the wind to blow it down.", "not_in_text"],
          ["Sam's dad picked it with apples.", "true_but_irrelevant"],
        ],
        "Sam brought his dad's apple-picking pole, and they hooked the kite's tail with it.",
        "Sam came back carrying a sturdy pole with a hook on the end.",
        1,
      ),
      mc(
        "inference",
        "open",
        "Why had Leo not talked to Sam before that Saturday?",
        "Leo thought Sam seemed strange because he was quiet and sat alone.",
        [
          ["Sam was mean to Leo on the first day.", "not_in_text"],
          ["Leo did not know that Sam was in his class.", "opposite"],
          ["Sam liked birds more than kites.", "true_but_irrelevant"],
        ],
        "Leo later realizes he 'had been wrong' that Sam was strange. He had judged him for sitting alone and reading.",
        "He had been wrong about Sam, who was not strange at all.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'In the story, the word "sheepish" most nearly means',
        "embarrassed",
        [
          ["angry", "opposite"],
          ["sleepy", "not_in_text"],
          ["woolly", "true_but_irrelevant"],
        ],
        "Leo feels a little embarrassed because he had judged Sam unfairly.",
        "Leo felt sheepish. He had been wrong about Sam, who was not strange at all. He was kind.",
        2,
      ),
      mc(
        "point_of_view",
        "open",
        "How does Leo feel when Sam first offers to help?",
        "Doubtful that the plan will work",
        [
          ["Excited and sure it will work", "opposite"],
          ["Angry that Sam came over", "not_in_text"],
          ["Sad about the snapped string", "too_narrow"],
        ],
        "Leo shrugs because he does not think Sam's idea will work.",
        "Leo shrugged. He did not think it would work.",
        2,
      ),
      oe(
        "key_details",
        "open",
        "Put these events in the order they happened.",
        [
          "The kite string snaps in a strong gust.",
          "Sam offers to bring a long pole.",
          "Sam pulls the kite free on the fifth try.",
          "Leo asks Sam to fly the kite with him.",
        ],
        "The kite gets stuck first, then Sam offers help, frees it, and Leo invites him to fly it.",
        "On the fifth try, Sam caught the kite's tail and gently pulled.",
        2,
      ),
    ],
  },
  {
    slug: "how-bees-make-honey",
    title: "How Bees Make Honey",
    genre: "informational",
    tags: ["animals", "science"],
    rating: 3,
    knowledgeDemand: 2,
    purpose: "As you read, figure out how nectar turns into honey.",
    keyIdeas: [
      "Worker bees collect sweet nectar from flowers.",
      "Bees pass the nectar to other bees and fan it with their wings to dry it into honey.",
      "Bees store honey in wax cells to eat in winter.",
    ],
    glossary: [
      ["nectar", "a sweet liquid inside flowers"],
      ["hive", "the home where a colony of bees lives"],
      ["seal", "to close something tightly"],
    ],
    body: `A single spoonful of honey takes a lot of work. Honey bees make it from nectar, a sweet, watery liquid found inside flowers.

Worker bees fly from flower to flower to collect nectar. A bee sucks it up with its long, tube-shaped tongue and stores it in a special part of its body called the honey stomach. One bee may visit hundreds of flowers on a single trip.

When the bee returns to the hive, it passes the nectar to another bee, mouth to mouth. That bee passes it on again. As the nectar moves from bee to bee, it slowly changes. It becomes thicker and less watery.

Next, the bees spread the nectar into the small six-sided cells of the honeycomb. Then they do something surprising. They fan the nectar with their wings! The moving air dries out the extra water. When the nectar is thick and sticky, it has become honey.

Finally, the bees seal each cell with a cap of wax. The honey stays fresh inside for a long time.

Why do bees work so hard? Honey is their food for winter. When it is too cold to find flowers, the whole hive eats the honey they stored. A strong hive may make much more honey than it needs, and that extra honey is what beekeepers collect.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "What is this passage mostly about?",
        "The steps bees follow to turn nectar into honey",
        [
          ["Why flowers make sweet nectar", "not_in_text"],
          ["How a bee's tongue is shaped", "too_narrow"],
          ["All the kinds of insects that live in hives", "too_broad"],
        ],
        "Each paragraph explains one step in how bees make honey, from collecting nectar to sealing the cells.",
        "Honey bees make it from nectar, a sweet, watery liquid found inside flowers.",
        1,
      ),
      mc(
        "key_details",
        "closed",
        "How do bees dry out the nectar?",
        "They fan it with their wings.",
        [
          ["They leave it out in the sun.", "not_in_text"],
          ["They mix it with wax.", "true_but_irrelevant"],
          ["They store it in their tongues.", "not_in_text"],
        ],
        "The passage says bees fan the nectar, and the moving air dries out the extra water.",
        "They fan the nectar with their wings!",
        2,
      ),
      mc(
        "inference",
        "open",
        "Based on the passage, what would most likely happen to a hive with no stored honey in winter?",
        "The bees would have trouble finding food.",
        [
          ["The bees would make more wax.", "not_in_text"],
          ["The bees would collect extra nectar from snow.", "not_in_text"],
          ["The beekeeper would collect more honey.", "opposite"],
        ],
        "Honey is the bees' winter food because there are no flowers when it is cold.",
        "When it is too cold to find flowers, the whole hive eats the honey they stored.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, the word "seal" means',
        "close tightly",
        [
          ["a sea animal", "true_but_irrelevant"],
          ["open slowly", "opposite"],
          ["fill with nectar", "not_in_text"],
        ],
        "The bees put a wax cap on each cell to close it, which keeps the honey fresh.",
        "Finally, the bees seal each cell with a cap of wax.",
        1,
      ),
      mc(
        "text_structure",
        "open",
        "How does the author mostly organize the passage?",
        "By explaining the steps in the order they happen",
        [
          ["By comparing bees with ants", "not_in_text"],
          ["By telling a story about one beekeeper", "not_in_text"],
          ["By listing problems and solutions", "not_in_text"],
        ],
        "Words like 'Next,' 'Then,' and 'Finally' show the passage moves step by step.",
        "Next, the bees spread the nectar into the small six-sided cells of the honeycomb.",
        2,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the author begin with the sentence about a spoonful of honey?",
        "To show that making even a little honey takes a lot of work",
        [
          ["To explain how to measure honey", "not_in_text"],
          ["To tell readers to eat more honey", "not_in_text"],
          ["To describe the shape of a spoon", "true_but_irrelevant"],
        ],
        "The opening hooks the reader by hinting at how much effort goes into a small amount of honey.",
        "A single spoonful of honey takes a lot of work.",
        3,
      ),
    ],
  },
  {
    slug: "why-our-class-needs-a-garden",
    title: "Why Our Class Needs a Garden",
    genre: "argument",
    tags: ["science"],
    rating: 3,
    knowledgeDemand: 1,
    purpose: "As you read, figure out the writer's three reasons for a class garden.",
    keyIdeas: [
      "The writer argues the school should let the class build a garden.",
      "A garden would teach science, encourage healthy eating, and teach teamwork.",
      "The writer answers the worry about summer care by suggesting family volunteers.",
    ],
    glossary: [
      ["volunteer", "a person who offers to help without being paid"],
      ["responsible", "trusted to take care of something"],
      ["worth", "good enough to be done"],
    ],
    body: `Our school has a sunny, empty patch of dirt behind the gym. I think our class should turn it into a garden. A garden would help us learn, eat better, and work together.

First, a garden is a great way to learn science. In class, we read about how seeds sprout and how plants need sunlight and water. In a garden, we could watch it happen. We could measure how tall the bean plants grow each week and make charts.

Second, kids who grow vegetables are more likely to eat them. My little brother never touched carrots until he pulled one out of Grandma's garden. Now he asks for them! If we grow our own lettuce and tomatoes, we might be excited to try them at lunch.

Third, a garden teaches teamwork. Someone has to water, someone has to pull weeds, and someone has to keep track of the schedule. Every student would be responsible for a job.

Some people worry that no one will take care of the garden in summer. That is a fair point. But families could sign up as volunteers, one week each. With twenty-six families in our class, each family would only need to help once or twice.

A garden takes work, but it is worth it. Let's give that patch of dirt a chance to grow something great.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "What is the writer's main claim?",
        "The class should be allowed to build a garden.",
        [
          ["Carrots are the best vegetable.", "too_narrow"],
          ["Schools should not have gyms.", "not_in_text"],
          ["Gardens are too much work for kids.", "opposite"],
        ],
        "The writer says in the first paragraph that the class should turn the empty patch into a garden.",
        "I think our class should turn it into a garden.",
        1,
      ),
      mc(
        "key_details",
        "closed",
        "How does the writer suggest the garden be cared for in summer?",
        "Families would sign up to help one week each.",
        [
          ["The principal would water it.", "not_in_text"],
          ["The garden would be closed until fall.", "not_in_text"],
          ["Students would come to school every day.", "not_in_text"],
        ],
        "The writer answers the summer worry by suggesting family volunteers take turns.",
        "But families could sign up as volunteers, one week each.",
        2,
      ),
      mc(
        "argument_evidence",
        "open",
        "Which detail does the writer use to support the idea that kids eat more vegetables they grow?",
        "The writer's little brother started asking for carrots after pulling one from a garden.",
        [
          ["Plants need sunlight and water.", "true_but_irrelevant"],
          ["There are twenty-six families in the class.", "true_but_irrelevant"],
          ["Someone has to pull weeds.", "true_but_irrelevant"],
        ],
        "The brother's story is the example that backs up the second reason.",
        "My little brother never touched carrots until he pulled one out of Grandma's garden.",
        2,
      ),
      mc(
        "text_structure",
        "open",
        'Why does the writer include the paragraph that begins "Some people worry"?',
        "To answer a reason someone might disagree",
        [
          ["To give a fourth reason for the garden", "not_in_text"],
          ["To admit the garden is a bad idea", "opposite"],
          ["To explain how to plant tomatoes", "not_in_text"],
        ],
        "The writer names a worry (summer care) and then offers a solution.",
        "Some people worry that no one will take care of the garden in summer.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'In the passage, "responsible for a job" means',
        "in charge of doing a job",
        [
          ["afraid of a job", "not_in_text"],
          ["paid for a job", "not_in_text"],
          ["finished with a job", "too_narrow"],
        ],
        "Each student would be in charge of one task, like watering or weeding.",
        "Every student would be responsible for a job.",
        2,
      ),
      mc(
        "inference",
        "open",
        "Why does the writer point out that the class has twenty-six families?",
        "To show that summer care would not be a big job for any one family",
        [
          ["To show the class is too big for a garden", "opposite"],
          ["To list everyone who likes vegetables", "not_in_text"],
          ["To explain why the gym is sunny", "not_in_text"],
        ],
        "With many families sharing, each one only helps once or twice.",
        "With twenty-six families in our class, each family would only need to help once or twice.",
        3,
      ),
    ],
  },
  {
    slug: "the-moons-changing-face",
    title: "The Moon's Changing Face",
    genre: "informational",
    tags: ["space", "science"],
    rating: 3.5,
    knowledgeDemand: 2,
    purpose: "As you read, figure out why the Moon seems to change shape.",
    keyIdeas: [
      "The Moon does not make its own light; it reflects sunlight.",
      "As the Moon orbits Earth, we see different amounts of its sunlit side.",
      "The cycle of phases from new moon to full moon and back takes about a month.",
    ],
    glossary: [
      ["reflect", "to bounce light back"],
      ["orbit", "to travel in a path around something"],
      ["phase", "one stage in a cycle that repeats"],
    ],
    body: `Look up at the Moon on different nights and it seems to change shape. Some nights it is a thin silver curve. Other nights it is a bright, round circle. But the Moon itself never changes shape. It is always a ball of rock.

The Moon does not make its own light. Instead, it reflects light from the Sun, the way a mirror bounces light. At any moment, the Sun lights up half of the Moon. The other half is dark.

The Moon travels around Earth in a path called an orbit. One trip takes about a month. As the Moon moves, we see different amounts of its sunny side. These different looks are called phases.

When the Moon is between Earth and the Sun, its lit side faces away from us. We can hardly see it at all. This is called a new moon. A few days later, a thin sliver of light appears. Night by night, the bright part grows. When Earth is between the Sun and the Moon, we see the whole lit side. That is a full moon. Then the bright part slowly shrinks again until the next new moon.

People have used the Moon's phases for thousands of years. Many calendars were based on them. In fact, the word "month" comes from the word "moon."`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which sentence best states the main idea of the passage?",
        "The Moon seems to change shape because we see different amounts of its sunlit side.",
        [
          ["The Moon is a ball of rock.", "too_narrow"],
          ["The Moon makes its own silver light.", "opposite"],
          ["Every planet has many moons.", "not_in_text"],
        ],
        "The passage explains that phases come from how much of the lit half we can see.",
        "As the Moon moves, we see different amounts of its sunny side.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "What happens during a new moon?",
        "The Moon's lit side faces away from Earth, so we can hardly see it.",
        [
          ["Earth is between the Sun and the Moon.", "opposite"],
          ["The Moon makes extra light.", "not_in_text"],
          ["The Moon changes into a new shape.", "opposite"],
        ],
        "At a new moon, the Moon is between Earth and the Sun, so its bright side faces away from us.",
        "When the Moon is between Earth and the Sun, its lit side faces away from us.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, "reflects" most nearly means',
        "bounces back",
        [
          ["thinks about", "true_but_irrelevant"],
          ["creates", "opposite"],
          ["hides", "not_in_text"],
        ],
        "The author compares the Moon to a mirror that bounces light.",
        "Instead, it reflects light from the Sun, the way a mirror bounces light.",
        2,
      ),
      mc(
        "inference",
        "open",
        "About how long after one full moon would you expect to see the next full moon?",
        "About a month",
        [
          ["About a day", "not_in_text"],
          ["About a year", "not_in_text"],
          ["About a week", "too_narrow"],
        ],
        "One orbit, and one full cycle of phases, takes about a month.",
        "One trip takes about a month.",
        3,
      ),
      mc(
        "author_purpose",
        "open",
        'Why does the author mention that the word "month" comes from "moon"?',
        "To show how important the Moon's phases have been to people",
        [
          ["To explain why the Moon is made of rock", "not_in_text"],
          ["To teach readers how to spell month", "not_in_text"],
          ["To prove the Moon changes shape", "opposite"],
        ],
        "The detail shows people used the Moon to keep track of time.",
        'In fact, the word "month" comes from the word "moon."',
        3,
      ),
      mc(
        "text_structure",
        "open",
        "How does the fourth paragraph mainly help the reader?",
        "It describes the phases in order through one cycle.",
        [
          ["It compares the Moon to the Sun's size.", "not_in_text"],
          ["It tells a story about an astronaut.", "not_in_text"],
          ["It argues that people should study the Moon.", "not_in_text"],
        ],
        "The paragraph walks from new moon, to sliver, to full moon, and back.",
        "Then the bright part slowly shrinks again until the next new moon.",
        2,
      ),
    ],
  },
  {
    slug: "rain-on-the-roof",
    title: "Rain on the Roof",
    genre: "poetry",
    tags: ["geography"],
    rating: 3,
    knowledgeDemand: 1,
    purpose: "As you read, figure out how the speaker feels about the rain.",
    keyIdeas: [
      "The speaker listens to rain on the roof at night.",
      "The poem compares the rain's sounds to drums and tapping fingers.",
      "The rain makes the speaker feel safe and cozy inside.",
    ],
    glossary: [
      ["patter", "a quick, light tapping sound"],
      ["gutter", "a channel at the edge of a roof that carries rainwater away"],
      ["snug", "warm, cozy, and comfortable"],
    ],
    body: `The rain comes tapping on the roof,
a hundred fingers, soft and quick.
It drums along the gutter pipe,
a patter, tap, a tick, a tick.

It hurries down the window glass
in silver lines that twist and run,
and somewhere out there in the dark
the puddles gather, one by one.

The wind may push, the clouds may roar,
the street may shine like river stone,
but here beneath my blanket's hill
I'm snug and warm and not alone.

My cat curls closer at my feet.
The lamp glows gold. The pages turn.
The rain can sing the whole night through.
I'll fall asleep before I learn
how many drops can fit inside
one long and gentle, sleepy night.
The rain keeps time. I close my eyes.
I'm safe inside, and all is right.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "What is the poem mostly about?",
        "Feeling cozy and safe inside while rain falls outside",
        [
          ["A storm that causes a flood", "not_in_text"],
          ["A cat who is afraid of rain", "not_in_text"],
          ["How puddles form", "too_narrow"],
        ],
        "The speaker hears the rain but feels 'snug and warm' and 'safe inside.'",
        "I'm safe inside, and all is right.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "Who is with the speaker during the poem?",
        "A cat",
        [
          ["A brother", "not_in_text"],
          ["A dog", "not_in_text"],
          ["No one at all", "opposite"],
        ],
        "The speaker's cat curls up at their feet.",
        "My cat curls closer at my feet.",
        1,
      ),
      mc(
        "vocab_context",
        "open",
        'In the poem, the word "snug" means',
        "cozy and warm",
        [
          ["cold and wet", "opposite"],
          ["loud and busy", "not_in_text"],
          ["small and tight", "too_narrow"],
        ],
        "'Snug' is paired with 'warm,' and the speaker is under a blanket.",
        "I'm snug and warm and not alone.",
        2,
      ),
      mc(
        "point_of_view",
        "open",
        "How does the speaker feel about the rain?",
        "Calm and comforted by it",
        [
          ["Scared of the loud noise", "opposite"],
          ["Bored and wishing it would stop", "not_in_text"],
          ["Excited to go play outside", "not_in_text"],
        ],
        "The speaker is happy to let the rain 'sing the whole night through' and falls asleep.",
        "The rain can sing the whole night through.",
        2,
      ),
      mc(
        "author_purpose",
        "open",
        'Why does the poet describe the rain as "a hundred fingers, soft and quick"?',
        "To help the reader hear the light, fast tapping of the rain",
        [
          ["To show that the rain is dangerous", "opposite"],
          ["To explain how many people are on the roof", "not_in_text"],
          ["To describe the shape of a raindrop", "not_in_text"],
        ],
        "Comparing raindrops to fingers helps the reader imagine the soft, quick sound.",
        "a hundred fingers, soft and quick.",
        3,
      ),
      mc(
        "inference",
        "open",
        "What is the speaker probably doing before falling asleep?",
        "Reading a book by lamplight",
        [
          ["Playing in the puddles", "opposite"],
          ["Fixing the gutter pipe", "not_in_text"],
          ["Watching television", "not_in_text"],
        ],
        "The lamp glows and 'the pages turn,' which suggests reading.",
        "The lamp glows gold. The pages turn.",
        3,
      ),
    ],
  },
  {
    slug: "the-first-pitch",
    title: "The First Pitch",
    genre: "fiction",
    tags: ["sports"],
    rating: 3,
    knowledgeDemand: 1,
    purpose: "As you read, figure out what helps Ana calm her nerves.",
    keyIdeas: [
      "Ana is nervous before pitching in her first real game.",
      "Her coach reminds her to focus on the catcher's glove, like in practice.",
      "Ana throws a strike and her confidence grows.",
    ],
    glossary: [
      ["mound", "the raised spot in the middle of a baseball field where the pitcher stands"],
      ["jittery", "nervous and shaky"],
      ["strike", "a good pitch the batter misses or does not swing at"],
    ],
    body: `Ana's hands were jittery as she walked to the pitcher's mound. It was her first real game. The bleachers were full of parents, and the other team's batter looked twice as tall as she was.

She rubbed the ball and tried to remember everything at once. Where should her feet go? How high should she lift her knee? What if she threw the ball over the backstop? Her stomach flipped.

Coach Rivera jogged out to the mound. "Ana," he said, "what do you do at practice?"

"I pitch," she said.

"And what do you look at?"

Ana thought for a second. "Maria's glove."

"Right. So do that. Forget the crowd. Forget the batter. Just you and the glove."

Ana nodded. Coach Rivera jogged back to the dugout.

She took a deep breath and looked at her catcher, Maria. Maria held up her mitt, a brown circle in the middle of all that noise. Ana stared at it until everything else faded. She stepped, lifted her knee, and threw.

Thwack. The ball hit the glove right in the center. The batter had not even swung.

"Strike one!" called the umpire.

Ana let out a breath she did not know she was holding. The ball came back to her, and this time her hands were steady.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "Which statement best expresses the theme of the story?",
        "Focusing on one simple thing can help you push through nerves.",
        [
          ["Pitchers should never listen to their coaches.", "opposite"],
          ["Baseball is the hardest sport.", "too_broad"],
          ["Tall batters always strike out.", "not_in_text"],
        ],
        "Coach Rivera tells Ana to focus only on the glove, and it calms her.",
        "Forget the crowd. Forget the batter. Just you and the glove.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "What does Coach Rivera tell Ana to look at?",
        "Her catcher's glove",
        [
          ["The crowd in the bleachers", "opposite"],
          ["The batter's bat", "not_in_text"],
          ["Her own feet", "too_narrow"],
        ],
        "He reminds her that in practice she looks at Maria's glove.",
        "\"Maria's glove.\"",
        1,
      ),
      mc(
        "vocab_context",
        "open",
        'In the first sentence, "jittery" most nearly means',
        "shaky and nervous",
        [
          ["dirty", "not_in_text"],
          ["strong and steady", "opposite"],
          ["cold", "not_in_text"],
        ],
        "Ana's hands are jittery because she is nervous about her first game.",
        "Ana's hands were jittery as she walked to the pitcher's mound.",
        2,
      ),
      mc(
        "inference",
        "open",
        "Why does Coach Rivera ask Ana what she does at practice instead of just giving advice?",
        "He wants her to remember that she already knows what to do.",
        [
          ["He forgot what Ana does at practice.", "not_in_text"],
          ["He wants to end the game early.", "not_in_text"],
          ["He is angry that she is nervous.", "not_in_text"],
        ],
        "His questions lead Ana to her own answer, which builds her confidence.",
        "\"And what do you look at?\"",
        4,
      ),
      mc(
        "point_of_view",
        "open",
        "How has Ana changed by the end of the story?",
        "She feels calmer and more confident.",
        [
          ["She is more nervous than before.", "opposite"],
          ["She wants to quit the team.", "not_in_text"],
          ["She is angry at the umpire.", "not_in_text"],
        ],
        "At the end, her hands are steady instead of jittery.",
        "The ball came back to her, and this time her hands were steady.",
        2,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the author list Ana's questions in the second paragraph?",
        "To show how many worries are crowding her mind",
        [
          ["To teach readers how to pitch", "not_in_text"],
          ["To show that Ana is an expert pitcher", "opposite"],
          ["To describe the other team", "not_in_text"],
        ],
        "The rapid questions show she is trying to remember too much at once.",
        "She rubbed the ball and tried to remember everything at once.",
        3,
      ),
    ],
  },
  {
    slug: "penguins-of-the-south",
    title: "Penguins of the South",
    genre: "informational",
    tags: ["animals", "geography"],
    rating: 3.5,
    knowledgeDemand: 2,
    purpose: "As you read, figure out how penguins are built for cold water.",
    keyIdeas: [
      "Penguins are birds that cannot fly but are excellent swimmers.",
      "Their feathers, fat, and huddling keep them warm in the cold.",
      "Penguins live in the Southern Hemisphere, not only in icy places.",
    ],
    glossary: [
      ["hemisphere", "one half of Earth, such as the northern or southern half"],
      ["blubber", "a thick layer of fat that keeps some animals warm"],
      ["huddle", "to crowd close together"],
    ],
    body: `Penguins are birds, but they cannot fly. Instead, they are amazing swimmers. Their wings work like flippers, pushing them through the water at high speed. Some penguins can dive deeper than five hundred meters to catch fish.

Almost all penguins live in the Southern Hemisphere, the half of Earth south of the equator. Many people picture penguins only on ice, but that is not the whole story. Some kinds live on the rocky coasts of South America, Africa, Australia, and New Zealand. One kind even lives on islands near the equator!

Still, many penguins do live where it is very cold. Their bodies are built for it. Penguins have short, stiff feathers packed tightly together, like the shingles on a roof. The feathers are coated with oil, which keeps water out. Under their skin, penguins have a layer of fat called blubber that holds in heat.

Emperor penguins face the coldest weather of all. During the Antarctic winter, they huddle together in large groups. The penguins on the outside of the group are colder, so the birds take turns. They slowly shuffle so that everyone gets a chance to stand in the warm middle.

Penguins may look a little silly when they waddle on land. In the water, though, they are fast, strong, and graceful.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "What is the main idea of the passage?",
        "Penguins are flightless birds whose bodies are suited to swimming and cold.",
        [
          ["Penguins live only on ice.", "opposite"],
          ["Emperor penguins huddle in winter.", "too_narrow"],
          ["All birds are good swimmers.", "too_broad"],
        ],
        "The passage describes how penguins swim and stay warm, and where they live.",
        "Penguins are birds, but they cannot fly.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "What keeps water out of a penguin's feathers?",
        "A coating of oil",
        [
          ["A layer of blubber", "true_but_irrelevant"],
          ["Huddling in groups", "true_but_irrelevant"],
          ["Thick fur", "not_in_text"],
        ],
        "The feathers are coated with oil, which keeps water out. Blubber holds heat, not water out.",
        "The feathers are coated with oil, which keeps water out.",
        3,
      ),
      mc(
        "inference",
        "open",
        "Why do emperor penguins take turns in the middle of the huddle?",
        "So that no penguin stays on the cold outside for too long",
        [
          ["So they can see who is the tallest", "not_in_text"],
          ["Because the middle is colder", "opposite"],
          ["So they can catch fish together", "not_in_text"],
        ],
        "The outside is colder, so shuffling lets everyone warm up.",
        "The penguins on the outside of the group are colder, so the birds take turns.",
        3,
      ),
      mc(
        "vocab_context",
        "open",
        'As used in the passage, "huddle" means to',
        "crowd close together",
        [
          ["dive deep", "not_in_text"],
          ["spread far apart", "opposite"],
          ["waddle on land", "true_but_irrelevant"],
        ],
        "The penguins gather in large groups to share warmth.",
        "During the Antarctic winter, they huddle together in large groups.",
        1,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the author compare penguin feathers to shingles on a roof?",
        "To help readers picture how tightly the feathers overlap",
        [
          ["To explain that penguins live on houses", "not_in_text"],
          ["To show that feathers are made of wood", "not_in_text"],
          ["To describe the color of penguins", "not_in_text"],
        ],
        "Shingles overlap closely, just like the short, stiff feathers do.",
        "Penguins have short, stiff feathers packed tightly together, like the shingles on a roof.",
        3,
      ),
      mc(
        "key_details",
        "open",
        "Which statement about where penguins live is supported by the passage?",
        "Some kinds live on warm coasts and even near the equator.",
        [
          ["Penguins live at the North Pole.", "not_in_text"],
          ["Every penguin lives in Antarctica.", "opposite"],
          ["Penguins live in every country.", "too_broad"],
        ],
        "The passage says some penguins live in South America, Africa, Australia, and near the equator.",
        "One kind even lives on islands near the equator!",
        2,
      ),
    ],
  },
  {
    slug: "robot-helpers-at-home",
    title: "Robot Helpers at Home",
    genre: "informational",
    tags: ["tech"],
    rating: 3.5,
    knowledgeDemand: 2,
    purpose: "As you read, figure out how a robot vacuum knows where to go.",
    keyIdeas: [
      "Robot vacuums use sensors to sense walls, stairs, and furniture.",
      "Some build a map of the home to clean more efficiently.",
      "Home robots are helpful but still need people to set them up and fix problems.",
    ],
    glossary: [
      ["sensor", "a part that notices things like light, touch, or distance"],
      ["map", "a drawing or record of where things are"],
      ["efficient", "doing a job without wasting time or energy"],
    ],
    body: `In many homes, a small, round robot rolls across the floor while everyone is busy. It is a robot vacuum, and it cleans without anyone pushing it. But how does it know where to go?

The answer is sensors. A sensor is a part that notices things in the world around it. Bump sensors on the robot's front tell it when it has hit a chair leg or a wall. When it bumps into something, the robot turns and tries a new direction. Other sensors point down at the floor. They notice when the floor suddenly drops away, like at the top of the stairs. That stops the robot from tumbling down the steps.

Newer robot vacuums are even smarter. They use cameras or lasers to measure the room as they clean. Little by little, they build a map of the home. With a map, the robot can clean in neat rows instead of zigzagging around. That makes it more efficient, so it finishes faster and uses less battery.

Robot helpers still need people, though. Someone has to empty the dust bin, untangle a sock from the brushes, and pick up toys before cleaning starts. A robot can do a boring job, but it cannot think the way you do.`,
    questions: [
      mc(
        "main_idea",
        "closed",
        "What is the passage mostly about?",
        "How robot vacuums use sensors and maps to clean",
        [
          ["Why people should buy robot vacuums", "not_in_text"],
          ["How to empty a dust bin", "too_narrow"],
          ["Every kind of robot ever built", "too_broad"],
        ],
        "The passage explains how the robot senses its surroundings and maps the home.",
        "The answer is sensors.",
        2,
      ),
      mc(
        "key_details",
        "closed",
        "What stops a robot vacuum from falling down the stairs?",
        "Sensors that point down at the floor",
        [
          ["Bump sensors on its front", "true_but_irrelevant"],
          ["A person who carries it", "not_in_text"],
          ["A dust bin that is full", "not_in_text"],
        ],
        "Downward sensors notice when the floor drops away.",
        "They notice when the floor suddenly drops away, like at the top of the stairs.",
        2,
      ),
      mc(
        "vocab_context",
        "open",
        'In the passage, "efficient" most nearly means',
        "getting the job done without wasting time or energy",
        [
          ["very loud", "not_in_text"],
          ["slow and careful", "opposite"],
          ["shaped like a circle", "true_but_irrelevant"],
        ],
        "The robot finishes faster and uses less battery, which is what efficient means.",
        "That makes it more efficient, so it finishes faster and uses less battery.",
        2,
      ),
      mc(
        "inference",
        "open",
        "Why would a robot vacuum without a map probably take longer to clean?",
        "It would zigzag and cover some spots more than once.",
        [
          ["It would refuse to turn around.", "not_in_text"],
          ["It would clean in perfectly neat rows.", "opposite"],
          ["It would fall down the stairs.", "not_in_text"],
        ],
        "Robots with maps clean in neat rows instead of zigzagging, so they finish faster.",
        "With a map, the robot can clean in neat rows instead of zigzagging around.",
        3,
      ),
      mc(
        "text_structure",
        "open",
        "How does the first paragraph introduce the topic?",
        "It describes a robot vacuum and asks a question the passage answers.",
        [
          ["It lists the prices of robots.", "not_in_text"],
          ["It tells the history of vacuums.", "not_in_text"],
          ["It argues that robots are dangerous.", "not_in_text"],
        ],
        "The question 'how does it know where to go?' is answered in the rest of the passage.",
        "But how does it know where to go?",
        3,
      ),
      mc(
        "author_purpose",
        "open",
        "Why does the author end with the paragraph about what people still need to do?",
        "To show that robots are helpful but have limits",
        [
          ["To explain how lasers work", "not_in_text"],
          ["To prove robots can think like people", "opposite"],
          ["To tell readers to clean their rooms", "not_in_text"],
        ],
        "The ending points out jobs robots can't do, showing their limits.",
        "A robot can do a boring job, but it cannot think the way you do.",
        3,
      ),
    ],
  },
];

