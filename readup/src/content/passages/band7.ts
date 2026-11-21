import { ep, mc, ms, oe, type SeedPassage } from "../types";

export const band7: SeedPassage[] = [
  {
    slug: "the-last-library-card",
    title: "The Last Library Card",
    genre: "fiction",
    tags: ["history"],
    rating: 7,
    knowledgeDemand: 2,
    purpose: "As you read, figure out why the old library card matters so much to Mr. Abernathy.",
    keyIdeas: [
      "Nadia volunteers at a library that is replacing its old paper card catalog with computers.",
      "An elderly patron, Mr. Abernathy, asks to keep his original paper library card from 1956.",
      "Nadia learns the card represents the library's role in his life as an immigrant, and she helps him preserve it.",
    ],
    glossary: [
      ["catalog", "an organized list of items, such as all the books in a library"],
      ["tedious", "long, boring, and repetitive"],
      ["obsolete", "no longer used because something newer has replaced it"],
      ["laminating", "covering with a thin layer of clear plastic for protection"],
    ],
    body: `The summer Nadia turned thirteen, the Westbrook Public Library was finally retiring its wooden card catalog, an enormous cabinet with two hundred narrow drawers that had stood in the lobby for nearly seventy years. Every book in the building now had a record in the computer system, so the cards were obsolete, and Nadia's volunteer job was to empty the drawers into recycling bins before the cabinet was carried away to a museum.

It was tedious work. Drawer after drawer held yellowed index cards typed on machines that no longer existed, listing titles nobody had borrowed in decades. By the second afternoon, Nadia was dumping whole handfuls without reading them.

That was when she noticed the elderly man watching her from the reading tables. He was thin and carefully dressed, with a cane hooked over the back of his chair, and he had been there both days, reading the same newspaper. Finally he approached the cabinet.

"Excuse me," he said. "I wonder if the library still keeps the old borrowers' files. I am looking for one card in particular."

The borrowers' files turned out to be in the bottom row, three long drawers labeled with letters of the alphabet. Under A, behind a cardboard divider, Nadia found it: a faded blue card that read "Westbrook Public Library. Borrower No. 4417. Samuel Abernathy. Issued March 2, 1956."

Mr. Abernathy held it with both hands. For a long moment he said nothing.

"I arrived in this country that winter," he said at last. "I was nineteen. I had a little English, no money, and no friends. A librarian named Mrs. Okonkwo gave me this card and told me I could borrow any book in the building, for free, as long as I brought it back. I could not believe it was true. I read every engineering book on the third floor. Eventually I became an engineer myself." He tapped the card gently. "This was the first thing in America with my name on it."

Nadia looked down at the recycling bin, half full of cards she had not even glanced at, and felt her face grow warm.

"Would you like to keep it?" she asked.

"If it is permitted."

Nadia checked with the head librarian, who agreed immediately. Then she did one more thing. At the front desk, she ran the fragile card through the laminating machine and handed it back, sealed and shining.

After Mr. Abernathy left, Nadia worked more slowly. She still recycled the cards, but now she read each name first.`,
    questions: [
      mc("main_idea", "closed", "Which statement best expresses the theme of the story?",
        "Ordinary objects can hold deep personal meaning that others might overlook.",
        [["Libraries should never use computers.", "not_in_text"], ["Recycling old paper is a waste of time.", "opposite"], ["Engineers read more books than other people.", "too_broad"]],
        "A card Nadia nearly threw away turns out to mean everything to Mr. Abernathy.",
        "\"This was the first thing in America with my name on it.\"", 2),
      mc("key_details", "closed", "What did Mrs. Okonkwo tell Mr. Abernathy when she gave him the card?",
        "That he could borrow any book for free as long as he returned it",
        [["That he had to pay a small fee each month", "opposite"], ["That he should study engineering", "not_in_text"], ["That the card would expire in a year", "not_in_text"]],
        "She told him he could borrow any book in the building for free.",
        "A librarian named Mrs. Okonkwo gave me this card and told me I could borrow any book in the building, for free, as long as I brought it back.", 2),
      ep("inference", "Why does Nadia's face \"grow warm\" when she looks at the recycling bin?",
        "She feels embarrassed that she threw away cards without considering what they might mean to people.",
        [["She is overheated from working all afternoon.", "true_but_irrelevant"], ["She is angry at Mr. Abernathy for interrupting.", "opposite"], ["She is proud of how much work she finished.", "opposite"]],
        "After hearing his story, she realizes she had been dumping cards carelessly.",
        "Nadia looked down at the recycling bin, half full of cards she had not even glanced at, and felt her face grow warm.", 4),
      mc("vocab_context", "open", 'As used in the first paragraph, "obsolete" most nearly means',
        "no longer needed because something newer replaced it",
        [["extremely valuable", "opposite"], ["damaged by water", "not_in_text"], ["written in another language", "not_in_text"]],
        "The computer system replaced the cards, so they were no longer needed.",
        "Every book in the building now had a record in the computer system, so the cards were obsolete, and Nadia's volunteer job was to empty the drawers into recycling bins before the cabinet was carried away to a museum.", 2),
      mc("point_of_view", "open", "How does Nadia's attitude toward her job change by the end?",
        "She moves from treating it as boring busywork to treating each card with respect.",
        [["She decides to quit volunteering.", "not_in_text"], ["She becomes faster and more careless.", "opposite"], ["She refuses to recycle any more cards.", "opposite"]],
        "At first she dumps cards without reading them; at the end she reads each name.",
        "She still recycled the cards, but now she read each name first.", 3),
      mc("text_structure", "open", "Why does the author describe Nadia dumping \"whole handfuls\" of cards early in the story?",
        "To set up a contrast with how carefully she treats the cards at the end",
        [["To explain how card catalogs were organized", "not_in_text"], ["To show that Nadia was a careless person in general", "too_broad"], ["To describe how recycling works", "not_in_text"]],
        "Her early carelessness makes the change in her behavior at the end meaningful.",
        "By the second afternoon, Nadia was dumping whole handfuls without reading them.", 4),
    ],
  },
  {
    slug: "dark-matter",
    title: "The Invisible Universe",
    genre: "informational",
    tags: ["space", "science"],
    rating: 7.5,
    knowledgeDemand: 4,
    purpose: "As you read, figure out how scientists can study something they cannot see.",
    keyIdeas: [
      "Galaxies spin too fast to be held together by the matter we can see, suggesting invisible dark matter.",
      "Scientists infer dark matter from its gravitational effects, including the bending of light.",
      "Dark matter seems to make up about 27 percent of the universe, while ordinary matter is about 5 percent, and its nature remains unknown.",
    ],
    glossary: [
      ["infer", "to figure something out from evidence rather than seeing it directly"],
      ["gravitational", "having to do with gravity, the force that pulls objects toward each other"],
      ["hypothesis", "an idea that can be tested to see whether it is true"],
      ["anomaly", "something that does not fit what is expected"],
    ],
    body: `Everything you have ever seen, from your own hand to the most distant galaxy photographed by a telescope, is made of ordinary matter: atoms of hydrogen, carbon, iron, and the other elements. Yet astronomers now believe that ordinary matter makes up only about five percent of the universe. Most of what exists appears to be something we cannot see at all.

The first clues emerged from an anomaly in the way galaxies move. A galaxy like our Milky Way is a vast, spinning disk of stars, gas, and dust. According to the laws of gravity, stars near the outer edge of such a disk should orbit more slowly than stars near the center, just as the outer planets of our solar system travel more slowly around the Sun than the inner ones. In the 1970s, however, the American astronomer Vera Rubin carefully measured the speeds of stars in spiral galaxies and found something startling. The outer stars were moving just as fast as the inner ones. At those speeds, the galaxies should have flung their outer stars into space long ago, unless something unseen was providing extra gravitational pull.

Rubin's measurements supported a hypothesis that had been proposed decades earlier by the Swiss astronomer Fritz Zwicky, who had noticed that galaxies in a distant cluster were moving too quickly to be held together by their visible mass alone. Scientists began calling the missing ingredient dark matter. It is "dark" not because it is black but because it does not appear to give off, absorb, or reflect light.

If dark matter is invisible, how can anyone study it? The answer is that scientists infer its presence from its effects, much as you might infer the wind by watching trees bend. One powerful method relies on a prediction of Albert Einstein's theory of gravity: massive objects bend the path of light passing near them. When astronomers observe distant galaxies whose light has been bent and stretched by a cluster in front of them, they can calculate how much mass the cluster must contain. Again and again, the answer is far more than the visible stars and gas can account for.

Today, measurements suggest that dark matter makes up roughly twenty-seven percent of the universe, more than five times as much as ordinary matter. The remaining sixty-eight percent is attributed to an even more mysterious phenomenon called dark energy. What dark matter actually is remains one of the greatest unsolved problems in science. Experiments buried deep underground are searching for rare collisions between dark matter particles and ordinary atoms, but so far, the invisible universe has kept its secrets.`,
    questions: [
      mc("main_idea", "closed", "Which statement best expresses the central idea of the passage?",
        "Scientists have strong indirect evidence for invisible dark matter, though they do not yet know what it is.",
        [["Dark matter has been captured in underground experiments.", "opposite"], ["Vera Rubin measured the speeds of stars.", "too_narrow"], ["Everything in the universe is made of ordinary atoms.", "opposite"]],
        "The passage explains the evidence for dark matter and notes that its nature is unknown.",
        "What dark matter actually is remains one of the greatest unsolved problems in science.", 2),
      mc("key_details", "closed", "What did Vera Rubin discover about stars in spiral galaxies?",
        "Stars near the outer edge moved about as fast as stars near the center.",
        [["Outer stars moved much more slowly than inner stars.", "opposite"], ["The galaxies were not spinning at all.", "not_in_text"], ["Outer stars gave off no light.", "not_in_text"]],
        "This was surprising because gravity from visible matter alone predicts slower outer stars.",
        "The outer stars were moving just as fast as the inner ones.", 3),
      ep("inference", "Why did the speed of the outer stars suggest that dark matter exists?",
        "Without extra unseen mass, the galaxies' gravity would be too weak to hold such fast-moving stars.",
        [["Fast stars produce dark matter as they move.", "not_in_text"], ["Light from the outer stars was being bent.", "true_but_irrelevant"], ["The outer stars were made of dark energy.", "not_in_text"]],
        "At those speeds, the stars should have escaped unless something unseen added gravitational pull.",
        "At those speeds, the galaxies should have flung their outer stars into space long ago, unless something unseen was providing extra gravitational pull.", 4),
      mc("vocab_context", "open", 'As used in the passage, "infer" most nearly means',
        "conclude from evidence",
        [["see directly", "opposite"], ["create from nothing", "not_in_text"], ["ignore completely", "not_in_text"]],
        "Scientists cannot see dark matter, so they reason about it from its effects.",
        "The answer is that scientists infer its presence from its effects, much as you might infer the wind by watching trees bend.", 2),
      mc("author_purpose", "open", "Why does the author compare studying dark matter to watching trees bend in the wind?",
        "To illustrate how something invisible can be detected by its effects",
        [["To suggest that wind is made of dark matter", "not_in_text"], ["To show that dark matter is found on Earth", "not_in_text"], ["To explain how telescopes are built", "not_in_text"]],
        "We cannot see wind but can see what it does, just as with dark matter's gravity.",
        "The answer is that scientists infer its presence from its effects, much as you might infer the wind by watching trees bend.", 3),
      ms("key_details", "open", "Select the two kinds of evidence the passage gives for dark matter.",
        ["Stars in galaxies moving faster than visible mass can explain", "Light from distant galaxies being bent by more mass than can be seen"],
        [["Photographs showing dark clouds in space", "not_in_text"], ["Dark matter particles collected underground", "opposite"]],
        "The passage describes galaxy rotation speeds and the bending of light.",
        "When astronomers observe distant galaxies whose light has been bent and stretched by a cluster in front of them, they can calculate how much mass the cluster must contain.", 3),
    ],
  },
  {
    slug: "esports-as-a-school-sport",
    title: "Should Esports Be a School Sport?",
    genre: "argument",
    tags: ["sports", "tech"],
    rating: 7,
    knowledgeDemand: 2,
    purpose: "As you read, figure out how the writer defines a 'sport' and whether esports fits that definition.",
    keyIdeas: [
      "The writer argues that schools should recognize competitive video gaming, or esports, as an official school sport.",
      "Esports require skill, strategy, practice, and teamwork, and they can reach students who do not join other teams.",
      "The writer addresses concerns about screen time and physical inactivity by proposing practice limits and fitness requirements.",
    ],
    glossary: [
      ["esports", "organized competitive video gaming"],
      ["coordination", "the ability to make different body parts work together smoothly"],
      ["sedentary", "involving a lot of sitting and little physical activity"],
      ["legitimate", "real, acceptable, and deserving to be taken seriously"],
    ],
    body: `When people hear the word "athlete," they usually picture a sprinter, a swimmer, or a basketball player. Few imagine a student wearing headphones, eyes locked on a monitor, coordinating with four teammates to outmaneuver an opposing team. Yet competitive video gaming, known as esports, has grown into a global activity with organized leagues, college scholarships, and enormous audiences. I believe schools should recognize esports as an official school sport, with the same structure, coaching, and expectations as any other team.

Critics argue that video games cannot be a legitimate sport because they do not require physical effort. This objection depends on a narrow definition. Chess is officially recognized as a sport by the International Olympic Committee, and so is archery, which demands precision far more than endurance. What these activities share with esports is that they reward skill developed through disciplined practice, quick decision-making under pressure, and, in team formats, constant communication. Top esports players make hundreds of precise hand movements per minute, a level of coordination that takes years to build.

Esports also teach the same lessons coaches value in traditional sports. A team must analyze its opponents, adjust its strategy mid-game, recover from mistakes, and support one another after a loss. These are exactly the skills that make athletics valuable in schools.

Perhaps most importantly, an esports team can reach students who are not involved in any other school activity. Many students do not play traditional sports, whether because of interest, ability, or cost. For them, joining a team and representing their school can provide a sense of belonging that has been missing. Several schools that have launched esports programs report that participating students show increased engagement and connections with teachers.

The concerns about screen time and sedentary behavior are reasonable, and an official program should address them directly. Schools could limit practice to a set number of hours per week, just as other sports have practice limits, and require esports athletes to participate in regular physical fitness activities. In fact, bringing gaming under the supervision of coaches may encourage healthier habits than unsupervised play at home.

Sports have always changed with the times; basketball itself was invented in 1891. Recognizing esports would not lower the standards of school athletics. It would extend those standards to students who deserve the chance to compete.`,
    questions: [
      mc("main_idea", "closed", "What is the writer's central claim?",
        "Schools should recognize esports as an official school sport.",
        [["Esports should replace traditional sports.", "too_broad"], ["Video games are harmful to students.", "opposite"], ["Chess is recognized by the Olympic Committee.", "too_narrow"]],
        "The claim is stated at the end of the first paragraph.",
        "I believe schools should recognize esports as an official school sport, with the same structure, coaching, and expectations as any other team.", 1),
      mc("argument_evidence", "closed", "Why does the writer mention chess and archery?",
        "To show that recognized sports do not all require great physical effort",
        [["To argue that chess is harder than esports", "not_in_text"], ["To suggest schools should drop archery", "not_in_text"], ["To prove that esports are part of the Olympics", "not_in_text"]],
        "Both are recognized sports that reward skill and precision rather than endurance.",
        "Chess is officially recognized as a sport by the International Olympic Committee, and so is archery, which demands precision far more than endurance.", 3),
      ep("argument_evidence", "How does the writer respond to concerns about screen time and inactivity?",
        "By proposing practice limits and fitness requirements under coach supervision",
        [["By saying screen time has no effects", "opposite"], ["By arguing students should game more at home", "opposite"], ["By ignoring the concern entirely", "opposite"]],
        "The writer accepts the concern and proposes specific limits and fitness activities.",
        "Schools could limit practice to a set number of hours per week, just as other sports have practice limits, and require esports athletes to participate in regular physical fitness activities.", 3),
      mc("vocab_context", "open", 'As used in the passage, "sedentary" most nearly means',
        "involving a lot of sitting",
        [["highly competitive", "true_but_irrelevant"], ["very active", "opposite"], ["supervised by adults", "not_in_text"]],
        "The concern is about physical inactivity, which sitting at screens causes.",
        "The concerns about screen time and sedentary behavior are reasonable, and an official program should address them directly.", 2),
      mc("inference", "open", "Why does the writer point out that basketball was invented in 1891?",
        "To suggest that new sports can earn acceptance over time",
        [["To show that basketball is outdated", "not_in_text"], ["To prove that esports are older than basketball", "opposite"], ["To argue that schools should stop playing basketball", "not_in_text"]],
        "Basketball was once new too; sports change over time.",
        "Sports have always changed with the times; basketball itself was invented in 1891.", 3),
      mc("text_structure", "open", 'How does the paragraph beginning "Perhaps most importantly" contribute to the argument?',
        "It presents what the writer sees as the strongest benefit: including students left out of other activities.",
        [["It responds to a counterargument about cost.", "not_in_text"], ["It describes the rules of a popular game.", "not_in_text"], ["It admits esports may not be a real sport.", "opposite"]],
        "'Most importantly' signals the writer's key reason: belonging for students not on other teams.",
        "Perhaps most importantly, an esports team can reach students who are not involved in any other school activity.", 3),
    ],
  },
  {
    slug: "the-silk-road",
    title: "The Silk Road: A Highway of Ideas",
    genre: "informational",
    tags: ["history", "geography"],
    rating: 7.5,
    knowledgeDemand: 4,
    purpose: "As you read, figure out why the author calls the Silk Road a 'highway of ideas' rather than just a trade route.",
    keyIdeas: [
      "The Silk Road was a network of trade routes connecting China, Central Asia, the Middle East, and Europe for over a thousand years.",
      "Goods usually passed through many traders' hands instead of being carried the whole distance.",
      "Along with goods, the routes spread technologies, religions, languages, and artistic styles.",
    ],
    glossary: [
      ["caravan", "a group of travelers, often with animals, journeying together"],
      ["intermediaries", "people who pass things or messages between others"],
      ["exchange", "the act of giving one thing and receiving another"],
      ["oasis", "a fertile place in a desert where water is found"],
    ],
    body: `The name "Silk Road" suggests a single paved highway stretching across Asia, but the reality was far more complex. The Silk Road was a vast network of overland and sea routes that, for more than a thousand years, connected China with Central Asia, India, the Middle East, and Europe. The name itself is relatively modern; a German geographer popularized it in 1877, long after the routes' greatest era had ended.

Historians often date the beginning of regular Silk Road trade to the second century BCE, when China's Han dynasty sent an envoy named Zhang Qian westward to seek allies. His reports of wealthy kingdoms and powerful horses in Central Asia encouraged the Han emperors to expand trade along the western routes. Chinese silk, a luxurious fabric whose method of production was a closely guarded secret, became so prized in the Roman Empire that some Roman writers complained about the fortunes being spent on it.

Few merchants, however, ever traveled the entire route. The journey crossed some of the harshest terrain on Earth, including the Taklamakan Desert and the towering Pamir Mountains. Instead, goods typically moved in stages. A caravan of camels might carry bales of silk from one oasis city to the next, where local merchants bought the goods and sold them to other traders heading farther west. By the time a piece of silk reached a Roman market, it may have passed through the hands of a dozen intermediaries, each of whom added to its price.

This relay system had a remarkable side effect. Because so many people from different cultures met, bargained, and lived alongside each other in the bustling trading cities, the Silk Road became a channel for far more than merchandise. Technologies traveled along it: papermaking, which was invented in China, gradually spread westward to the Islamic world and eventually to Europe, transforming how knowledge was recorded. Religions spread as well. Buddhism traveled from India into Central Asia and China, carried by monks and merchants who built temples along the way. Languages mixed, musical instruments were traded and adapted, and artistic styles blended in ways still visible in ancient murals and sculptures.

The exchange was not always positive; diseases also traveled along the trade routes. Nevertheless, the Silk Road demonstrates how trade can connect distant peoples and accelerate the spread of ideas. In many ways, it was a forerunner of the interconnected world we live in today.`,
    questions: [
      mc("main_idea", "closed", "Which statement best expresses the central idea of the passage?",
        "The Silk Road connected distant regions and spread ideas and technologies as well as goods.",
        [["The Silk Road was a single paved highway.", "opposite"], ["Romans spent fortunes on silk.", "too_narrow"], ["All modern trade began in China.", "too_broad"]],
        "The passage emphasizes how the trade network spread technologies, religions, and art.",
        "Because so many people from different cultures met, bargained, and lived alongside each other in the bustling trading cities, the Silk Road became a channel for far more than merchandise.", 2),
      mc("key_details", "closed", "How did goods usually travel along the Silk Road?",
        "In stages, passing from trader to trader between cities",
        [["Carried by a single merchant from China to Rome", "opposite"], ["Shipped only by sea", "not_in_text"], ["Delivered by the Roman army", "not_in_text"]],
        "Few merchants traveled the whole route; goods moved city to city through many traders.",
        "Instead, goods typically moved in stages.", 2),
      ep("inference", "Why would silk become more expensive the farther west it traveled?",
        "Each trader who bought and resold it added to its price.",
        [["The silk was dyed a new color at each city.", "not_in_text"], ["Western countries charged a tax on all fabric.", "not_in_text"], ["The silk became damaged on the journey.", "not_in_text"]],
        "Passing through many intermediaries, each adding profit, raised the price.",
        "By the time a piece of silk reached a Roman market, it may have passed through the hands of a dozen intermediaries, each of whom added to its price.", 3),
      mc("vocab_context", "open", 'As used in the passage, "intermediaries" most nearly means',
        "people who pass goods between others",
        [["travelers who crossed the whole route", "opposite"], ["Roman writers", "not_in_text"], ["desert cities", "true_but_irrelevant"]],
        "The intermediaries bought and resold goods along the way.",
        "By the time a piece of silk reached a Roman market, it may have passed through the hands of a dozen intermediaries, each of whom added to its price.", 2),
      mc("text_structure", "open", "How does the fourth paragraph build on the third?",
        "It explains a surprising result of the stage-by-stage trading system the third paragraph describes.",
        [["It contradicts the claim that few merchants traveled the whole route.", "opposite"], ["It describes the geography of the Pamir Mountains.", "not_in_text"], ["It tells the story of Zhang Qian's journey.", "not_in_text"]],
        "The relay system brought many cultures together, which spread ideas.",
        "This relay system had a remarkable side effect.", 3),
      mc("author_purpose", "open", "Why does the author mention that diseases also traveled along the routes?",
        "To give a balanced view by acknowledging that the exchange had harmful effects too",
        [["To argue that the Silk Road should never have existed", "too_broad"], ["To explain how papermaking spread", "not_in_text"], ["To show that the exchange was entirely positive", "opposite"]],
        "The author notes a negative effect before concluding about the Silk Road's importance.",
        "The exchange was not always positive; diseases also traveled along the trade routes.", 3),
    ],
  },
  {
    slug: "clever-crows",
    title: "Clever Crows",
    genre: "informational",
    tags: ["animals", "science"],
    rating: 7,
    knowledgeDemand: 3,
    purpose: "As you read, figure out what experiments reveal about how crows think.",
    keyIdeas: [
      "Crows show problem-solving abilities once thought to be uniquely human or limited to great apes.",
      "New Caledonian crows make and use tools, and crows can solve multistep puzzles such as raising water levels to reach food.",
      "Crows recognize and remember individual human faces for years and may share that information with other crows.",
    ],
    glossary: [
      ["cognition", "the mental processes of thinking, learning, and remembering"],
      ["corvid", "a member of the bird family that includes crows, ravens, and jays"],
      ["displace", "to push something out of its place"],
      ["neurons", "cells in the brain and nerves that carry signals"],
    ],
    body: `For much of the twentieth century, scientists considered intelligence a quality that belonged mainly to humans and perhaps a few other primates, such as chimpanzees. Birds, with their small heads, were dismissed with the insult "birdbrain." Research on crows and their relatives, a family of birds called corvids, has forced scientists to reconsider that assumption.

Some of the most striking evidence comes from New Caledonian crows, which live on a group of islands in the South Pacific. In the wild, these birds make tools. They strip leaves from twigs, nibble the ends into hooks, and use them to pull insect larvae out of holes in dead wood. Each crow's tools are carefully shaped, and young crows learn the craft by watching adults, a process that takes months of practice.

In laboratory experiments, corvids have solved puzzles that challenge young children. In one test, inspired by an ancient fable, researchers placed a floating treat inside a narrow tube of water, just out of the bird's reach. Many crows figured out that dropping stones into the tube would displace the water and raise the treat higher. Some birds even chose heavier objects that sink over lighter objects that float, and they preferred tubes filled with water over tubes filled with sand, suggesting that they understood something about cause and effect rather than simply trying random actions.

Crows also have impressive memories for faces. In a well-known study at the University of Washington, researchers wearing a particular rubber mask captured and banded several wild crows before releasing them unharmed. For years afterward, whenever anyone wore that mask on campus, crows scolded and mobbed the wearer, even crows that had never been captured themselves. The researchers concluded that the birds not only remembered the threatening face but also seemed to communicate the danger to other crows. When the same researchers walked by wearing a different mask, the crows ignored them.

How can a bird brain the size of a walnut accomplish such feats? Scientists have discovered that bird brains pack neurons much more densely than mammal brains of the same size, which may help explain their abilities. Studies of crow cognition remind us that intelligence can evolve in very different forms. The next time you see a crow watching you from a fence post, it may be paying closer attention than you think.`,
    questions: [
      mc("main_idea", "closed", "Which statement best expresses the central idea of the passage?",
        "Research shows that crows have surprising intelligence, including tool use, problem solving, and face memory.",
        [["Crows have the largest brains of any bird.", "opposite"], ["New Caledonian crows live in the South Pacific.", "too_narrow"], ["All birds are smarter than chimpanzees.", "too_broad"]],
        "The passage presents several kinds of evidence for crow intelligence.",
        "Research on crows and their relatives, a family of birds called corvids, has forced scientists to reconsider that assumption.", 2),
      mc("key_details", "closed", "In the mask study, what happened when researchers wore a different mask?",
        "The crows ignored them.",
        [["The crows attacked them even more.", "opposite"], ["The crows flew away from campus.", "not_in_text"], ["The crows brought them food.", "not_in_text"]],
        "Only the mask linked to capture triggered scolding; the other mask was ignored.",
        "When the same researchers walked by wearing a different mask, the crows ignored them.", 2),
      ep("inference", "What does the crows' preference for heavy objects and water-filled tubes suggest?",
        "They understood how their actions would cause the water to rise.",
        [["They prefer playing with heavy objects.", "not_in_text"], ["They were trained to pick certain objects.", "not_in_text"], ["They dislike sand.", "true_but_irrelevant"]],
        "Choosing the options that actually raise the water shows understanding of cause and effect.",
        "Some birds even chose heavier objects that sink over lighter objects that float, and they preferred tubes filled with water over tubes filled with sand, suggesting that they understood something about cause and effect rather than simply trying random actions.", 4),
      mc("vocab_context", "open", 'As used in the passage, "displace" most nearly means',
        "push out of the way",
        [["soak up", "opposite"], ["freeze", "not_in_text"], ["hide from view", "not_in_text"]],
        "The stones take up space, pushing the water up.",
        "Many crows figured out that dropping stones into the tube would displace the water and raise the treat higher.", 2),
      mc("inference", "open", "Why is it significant that crows which had never been captured also scolded the mask wearer?",
        "It suggests crows can share information about danger with each other.",
        [["It proves crows can see through masks.", "not_in_text"], ["It shows the captured crows were harmed.", "opposite"], ["It means crows dislike all humans.", "too_broad"]],
        "Uncaptured crows could only have learned about the mask from other crows.",
        "The researchers concluded that the birds not only remembered the threatening face but also seemed to communicate the danger to other crows.", 3),
      mc("author_purpose", "open", 'Why does the author begin by mentioning the insult "birdbrain"?',
        "To introduce an old assumption that the passage then challenges",
        [["To show that the author agrees birds are not smart", "opposite"], ["To explain how bird brains are built", "not_in_text"], ["To make fun of scientists", "not_in_text"]],
        "The passage sets up the old belief that birds are not intelligent, then disproves it.",
        "Birds, with their small heads, were dismissed with the insult \"birdbrain.\"", 3),
    ],
  },
  {
    slug: "prairie-wind",
    title: "Prairie Wind",
    genre: "poetry",
    tags: ["geography", "history"],
    rating: 8,
    knowledgeDemand: 3,
    purpose: "As you read, figure out what the wind has 'seen' and what that suggests about time.",
    keyIdeas: [
      "The speaker describes the wind moving across the prairie as if it were an ancient witness.",
      "The wind has passed over bison herds, wagon trains, and modern highways and fields.",
      "The poem suggests that human history is brief compared with the long life of the land and wind.",
    ],
    glossary: [
      ["thunderheads", "tall, towering storm clouds"],
      ["witness", "someone who sees an event happen"],
      ["furrow", "a long narrow trench made in the ground by a plow"],
      ["ceaseless", "never stopping"],
    ],
    body: `The wind was here before the fences came,
before the furrow and the iron plow;
it combed the grasses taller than a man
and knew no names for anything till now.

It ran beside the bison, ten miles wide,
a dark tide rolling under thunderheads;
it lifted hawks, and scattered seeds, and sang
across the river's shallow, braided beds.

It tugged the canvas of the wagon trains
and filled the settlers' eyes with grit and dust;
it rattled windows of the sod-house towns
and wore the weathervanes to rust.

And now it pours across the interstate,
it spins the white wind turbines on the ridge,
it bends the wheat in waves of gold and green
and whistles underneath the concrete bridge.

The wind has watched it all and keeps no score.
It does not care for borders or for deeds.
We are a single afternoon to it,
a brief, bright season scattered with our seeds.

So stand out in the field and feel it pass,
that ceaseless breath that rolled before our birth;
it will be running here when we are gone,
the oldest, restless witness of the earth.`,
    questions: [
      mc("main_idea", "closed", "Which statement best expresses the theme of the poem?",
        "Human history is brief compared with the enduring natural world.",
        [["Wind turbines are the best source of energy.", "not_in_text"], ["Settlers enjoyed the prairie wind.", "opposite"], ["Bison once lived on the prairie.", "too_narrow"]],
        "The wind existed before people and will continue after them; we are 'a single afternoon' to it.",
        "We are a single afternoon to it,", 3),
      oe("text_structure", "closed", "Put these things the wind passes over in the order the poem presents them.",
        ["Herds of bison", "Wagon trains of settlers", "Sod-house towns", "The interstate and wind turbines"],
        "The poem moves through history from bison, to settlers, to towns, to modern highways.",
        "And now it pours across the interstate,", 3),
      ep("inference", 'What does the speaker mean by saying "We are a single afternoon to it"?',
        "Compared with how long the wind has existed, human lives and history are very short.",
        [["People only go outside in the afternoon.", "not_in_text"], ["The wind blows hardest in the afternoon.", "not_in_text"], ["Humans will live forever on the prairie.", "opposite"]],
        "The next lines call humans 'a brief, bright season,' emphasizing how short our time is.",
        "a brief, bright season scattered with our seeds.", 4),
      mc("vocab_context", "open", 'As used in the poem, "ceaseless" most nearly means',
        "never stopping",
        [["gentle", "not_in_text"], ["brief", "opposite"], ["cold", "not_in_text"]],
        "The wind 'will be running here when we are gone,' so it never stops.",
        "that ceaseless breath that rolled before our birth;", 2),
      mc("author_purpose", "open", 'Why does the poet describe the bison herd as "a dark tide rolling"?',
        "To convey the enormous size and movement of the herd",
        [["To suggest the bison were swimming", "not_in_text"], ["To show the bison were frightened of the wind", "not_in_text"], ["To describe the river's color", "true_but_irrelevant"]],
        "A tide is vast and moving, like a herd ten miles wide.",
        "a dark tide rolling under thunderheads;", 3),
      mc("point_of_view", "open", 'What does the line "It does not care for borders or for deeds" suggest about the speaker\'s view of the wind?',
        "The wind is indifferent to the human ideas of ownership and boundaries.",
        [["The wind is angry at people for building fences.", "not_in_text"], ["The wind protects people's property.", "opposite"], ["The speaker wants to own the wind.", "not_in_text"]],
        "Borders and deeds are human concepts of ownership that mean nothing to the wind.",
        "It does not care for borders or for deeds.", 4),
    ],
  },
  {
    slug: "effects-before-computers",
    title: "Movie Magic Before Computers",
    genre: "informational",
    tags: ["movies", "history", "tech"],
    rating: 7,
    knowledgeDemand: 3,
    purpose: "As you read, figure out how early filmmakers fooled audiences without computers.",
    keyIdeas: [
      "Before computer graphics, filmmakers created illusions with camera tricks, paintings, and models.",
      "Techniques included the stop trick, matte paintings on glass, miniatures, and forced perspective.",
      "These practical effects relied on understanding how cameras and human perception work, and some are still used today.",
    ],
    glossary: [
      ["matte painting", "a painted image of scenery combined with live film"],
      ["miniature", "a very small, detailed model of something"],
      ["perspective", "the way objects appear smaller when they are farther away"],
      ["ingenuity", "cleverness and creativity in solving problems"],
    ],
    body: `Today, when a film shows a spaceship exploding or a city being swallowed by a tidal wave, audiences usually assume the images were created on a computer. Yet for most of the history of cinema, filmmakers had no such tools. They relied instead on ingenuity, careful planning, and a deep understanding of how both cameras and human eyes can be fooled.

One of the earliest special effects was discovered almost by accident. According to a popular story, the French filmmaker Georges Méliès was filming a street in Paris in the 1890s when his camera jammed. By the time he got it running again, the scene had changed. When he watched the film, a bus seemed to transform instantly into a horse-drawn hearse. Whether or not the story is exactly true, Méliès developed this "stop trick" into an art, stopping the camera, changing something in the scene, and starting again so that people appeared, vanished, or transformed as if by magic.

Filmmakers soon learned to create entire landscapes that never existed. In a technique called matte painting, an artist painted scenery, such as a castle or a distant mountain range, on a large sheet of glass placed in front of the camera. The section of glass where the actors would appear was left clear. When filmed, the painted background and the real actors blended into one convincing image. Many of the grand cities and starry skies in classic films were actually paintings no larger than a door.

Miniatures, or detailed models, were another essential tool. To film a train crash or a ship sinking in a storm, crews built small replicas and filmed them, often at high speed. When the footage was played back at normal speed, the motion slowed down, making the small models seem heavy and enormous.

Perhaps the simplest trick of all was forced perspective, which takes advantage of the way objects look smaller when they are farther away. By placing one actor much closer to the camera than another, a filmmaker could make an ordinary person appear to be a giant standing beside a tiny companion.

Although computers now dominate visual effects, these practical techniques have not disappeared. Many modern filmmakers still build miniatures and use forced perspective, valuing the way real objects catch real light. The magicians of early cinema proved that imagination can be just as powerful as technology.`,
    questions: [
      mc("main_idea", "closed", "Which statement best expresses the central idea of the passage?",
        "Early filmmakers created convincing illusions with clever practical techniques instead of computers.",
        [["Georges Méliès invented the movie camera.", "not_in_text"], ["Computer effects are always better than practical effects.", "opposite"], ["Matte paintings were no larger than a door.", "too_narrow"]],
        "The passage describes several pre-computer techniques and how they fooled audiences.",
        "They relied instead on ingenuity, careful planning, and a deep understanding of how both cameras and human eyes can be fooled.", 2),
      mc("key_details", "closed", "How did a matte painting combine with live action?",
        "Scenery was painted on glass in front of the camera, leaving a clear area where actors appeared.",
        [["Actors were painted onto a background.", "opposite"], ["The painting was projected onto a screen behind the actors.", "not_in_text"], ["The camera was stopped and restarted.", "true_but_irrelevant"]],
        "The painted glass and the clear section with actors were filmed together.",
        "The section of glass where the actors would appear was left clear.", 3),
      ep("inference", "Why did crews film miniatures at high speed?",
        "Playing the footage back at normal speed slowed the motion, making the models seem huge and heavy.",
        [["It saved money on film.", "not_in_text"], ["The models would break if filmed slowly.", "not_in_text"], ["It made the colors look brighter.", "not_in_text"]],
        "Slowed-down motion makes small objects seem to move like large, heavy ones.",
        "When the footage was played back at normal speed, the motion slowed down, making the small models seem heavy and enormous.", 3),
      mc("vocab_context", "open", 'As used in the passage, "ingenuity" most nearly means',
        "clever creativity",
        [["expensive equipment", "opposite"], ["luck", "not_in_text"], ["laziness", "opposite"]],
        "Without computers, filmmakers had to rely on clever problem solving.",
        "They relied instead on ingenuity, careful planning, and a deep understanding of how both cameras and human eyes can be fooled.", 2),
      mc("author_purpose", "open", 'Why does the author write "Whether or not the story is exactly true" about Méliès?',
        "To signal that the story may be a legend while still explaining the technique",
        [["To prove that Méliès lied about his films", "too_broad"], ["To show that the stop trick never existed", "opposite"], ["To describe the streets of Paris", "not_in_text"]],
        "The author is careful about the story's accuracy but uses it to introduce the stop trick.",
        "Whether or not the story is exactly true, Méliès developed this \"stop trick\" into an art, stopping the camera, changing something in the scene, and starting again so that people appeared, vanished, or transformed as if by magic.", 4),
      mc("text_structure", "open", "How are the third through fifth paragraphs organized?",
        "Each describes a different special-effects technique and how it works.",
        [["They tell Méliès's life story in order.", "not_in_text"], ["They compare movies from different countries.", "not_in_text"], ["They argue against using computers.", "opposite"]],
        "The paragraphs explain matte painting, miniatures, and forced perspective in turn.",
        "Perhaps the simplest trick of all was forced perspective, which takes advantage of the way objects look smaller when they are farther away.", 2),
    ],
  },
  {
    slug: "the-glacier-survey",
    title: "The Glacier Survey",
    genre: "fiction",
    tags: ["science", "geography"],
    rating: 7,
    knowledgeDemand: 3,
    purpose: "As you read, figure out why the old photograph affects Lena so strongly.",
    keyIdeas: [
      "Lena joins her aunt, a glaciologist, on a trip to measure how far a mountain glacier has retreated.",
      "They compare the glacier with a photograph taken from the same spot in 1925, revealing dramatic shrinkage.",
      "Seeing the change firsthand turns abstract data into something personal for Lena, who decides to continue the record.",
    ],
    glossary: [
      ["glaciologist", "a scientist who studies glaciers"],
      ["survey", "a careful measurement or study of an area"],
      ["moraine", "a ridge of rocks and dirt left behind by a glacier"],
      ["abstract", "existing as an idea rather than something you can see or touch"],
    ],
    body: `Lena had seen the graphs a hundred times. Her aunt Marisol, a glaciologist, kept them pinned above her desk: jagged lines sloping downward, year after year, showing glaciers around the world losing ice. Lena understood them the way she understood most facts from school, as something true but distant, an abstract problem happening somewhere else.

That changed in August, when Marisol invited her along on a survey trip to the Hallett Glacier, high in the mountains three hours from the nearest town. They hiked for most of a day, following a trail marked with small stone piles, until they reached a rocky ridge overlooking a valley.

"This ridge is a moraine," Marisol explained, catching her breath. "It's made of rocks the glacier pushed in front of it, like a bulldozer, when it was much bigger. About a century ago, the ice reached right here, to where we're standing."

Lena looked down the valley. The glacier was there, a dirty white tongue of ice curling between two peaks, but it was far away, at least a kilometer up the valley. Between the ridge and the ice lay a wide expanse of gray gravel, scattered boulders, and a milky blue lake that had not appeared on any old maps.

Marisol pulled a plastic sleeve from her pack. Inside was a black-and-white photograph, its corners soft with age. "A surveyor took this in 1925," she said, "from this exact spot. We find the same rock and take the same picture every five years."

They searched until Lena found the boulder, a large split stone that matched the one in the corner of the old photograph. Lena held the picture up beside the real view.

In 1925, the glacier had filled the entire valley. The ice had risen like a frozen wall just below the ridge, so thick and wide that the two peaks seemed to be standing in it up to their knees. In the real valley before her, the wall was gone. There was only the lake, the gravel, and the small, shrunken glacier far in the distance.

Lena felt something tighten in her chest. The graphs above Marisol's desk had never made her feel anything. This did.

Marisol set up the camera on its tripod and adjusted the angle until the view matched the photograph. Then, unexpectedly, she stepped aside. "Want to take this year's picture?" she asked.

Lena pressed the shutter. She knew the photo would be added to the record, one more image in a series that stretched back a hundred years. She also knew that, five years from now, she wanted to be standing on this ridge again to take the next one.`,
    questions: [
      mc("main_idea", "closed", "Which statement best expresses the theme of the story?",
        "Seeing evidence firsthand can make a distant problem feel real and personal.",
        [["Hiking in the mountains is exhausting.", "too_narrow"], ["Graphs are always more useful than photographs.", "opposite"], ["Glaciers are growing larger every year.", "opposite"]],
        "The graphs never moved Lena, but seeing the glacier's change in person did.",
        "The graphs above Marisol's desk had never made her feel anything. This did.", 2),
      mc("key_details", "closed", "What is a moraine, according to Marisol?",
        "A ridge of rocks pushed into place by a glacier",
        [["A lake formed by melting ice", "true_but_irrelevant"], ["A type of old photograph", "not_in_text"], ["A trail marked with stone piles", "not_in_text"]],
        "Marisol explains the ridge is made of rocks the glacier pushed in front of it.",
        "It's made of rocks the glacier pushed in front of it, like a bulldozer, when it was much bigger.", 2),
      ep("inference", "What does the milky blue lake suggest about the valley's history?",
        "It formed in the space left behind as the glacier melted and retreated.",
        [["It has always been in the valley.", "opposite"], ["It was dug by the surveyor in 1925.", "not_in_text"], ["It is fed by a river from the town.", "not_in_text"]],
        "The lake did not appear on old maps and lies where the ice used to be.",
        "Between the ridge and the ice lay a wide expanse of gray gravel, scattered boulders, and a milky blue lake that had not appeared on any old maps.", 4),
      mc("vocab_context", "open", 'As used in the first paragraph, "abstract" most nearly means',
        "existing only as an idea, not felt directly",
        [["very large and dramatic", "not_in_text"], ["happening nearby", "opposite"], ["made of ice", "not_in_text"]],
        "Lena knew the facts but did not feel connected to them.",
        "Lena understood them the way she understood most facts from school, as something true but distant, an abstract problem happening somewhere else.", 3),
      mc("author_purpose", "open", "Why does the author describe the 1925 glacier as making the peaks look like they were standing \"up to their knees\"?",
        "To help the reader picture how thick and high the ice once was",
        [["To suggest the mountains were alive", "not_in_text"], ["To show the glacier was very small", "opposite"], ["To explain how photographs are taken", "not_in_text"]],
        "The image emphasizes the depth of the ice compared with today's shrunken glacier.",
        "The ice had risen like a frozen wall just below the ridge, so thick and wide that the two peaks seemed to be standing in it up to their knees.", 3),
      mc("inference", "open", "Why does Marisol let Lena take this year's picture?",
        "She wants Lena to become part of the long-term record.",
        [["She is too tired to use the camera.", "not_in_text"], ["The camera is broken.", "not_in_text"], ["She wants to stop doing surveys.", "not_in_text"]],
        "Handing over the camera invites Lena to continue the century-long series, which Lena then wants to do.",
        "She also knew that, five years from now, she wanted to be standing on this ridge again to take the next one.", 4),
    ],
  },
  {
    slug: "the-printing-press",
    title: "The Machine That Spread Ideas",
    genre: "informational",
    tags: ["history", "tech"],
    rating: 8,
    knowledgeDemand: 4,
    purpose: "As you read, figure out how the printing press changed who could access knowledge.",
    keyIdeas: [
      "Before printing, books in Europe were copied by hand, making them rare and expensive.",
      "Around 1440, Johannes Gutenberg developed a press using movable metal type, building on earlier inventions from Asia.",
      "Printing made books cheaper and more plentiful, spreading literacy and new ideas rapidly across Europe.",
    ],
    glossary: [
      ["scribe", "a person whose job was copying documents by hand"],
      ["movable type", "individual letters that can be arranged and rearranged to print pages"],
      ["circulation", "being passed around among many people"],
      ["unprecedented", "never having happened before"],
    ],
    body: `In Europe in the early 1400s, a single book could take a skilled scribe months or even years to copy by hand. Each page was written letter by letter on parchment made from animal skin, and a large volume might require the hides of hundreds of animals. As a result, books were rare treasures, owned mainly by monasteries, universities, and the very wealthy. Most people never owned a book in their lives, and the majority could not read.

Around 1440, a goldsmith in the German city of Mainz named Johannes Gutenberg began developing a machine that would transform this situation. Gutenberg's crucial innovation was a practical system of movable metal type. He cast individual letters in metal using a mold he designed, which allowed him to produce large numbers of identical, durable letters quickly. These letters could be arranged into lines and pages, inked, and pressed onto paper using a modified screw press, similar to the presses used for squeezing grapes for wine. After printing, the letters could be taken apart and rearranged for the next page.

Gutenberg was not the first to print with movable type. In China, an inventor named Bi Sheng created movable type from baked clay around 1040, and in Korea, printers were using metal movable type by the 1300s; one Korean book printed in 1377 survives today. However, these systems faced different challenges, including written languages with thousands of characters. Gutenberg's combination of metal type, oil-based ink, and the press proved especially well suited to European alphabets, which use only a few dozen letters.

Around 1455, Gutenberg's workshop completed its most famous project, a Bible printed in about 180 copies. The speed of the new method was unprecedented. Within decades, printing shops had spread to hundreds of cities across Europe. Historians estimate that by 1500, millions of printed books were in circulation, more than scribes could have produced in many centuries.

The consequences were enormous. As books became cheaper, more people learned to read. Scientists could share their discoveries with colleagues across the continent, and identical copies meant that a reader in Italy and a reader in England could discuss exactly the same text. New ideas in religion, politics, and science spread faster than authorities could control them. Some historians argue that the printing press helped make possible the scientific revolution and many of the major changes in European society that followed.`,
    questions: [
      mc("main_idea", "closed", "Which statement best expresses the central idea of the passage?",
        "The printing press made books far more available, speeding the spread of literacy and ideas.",
        [["Gutenberg was the first person ever to print with movable type.", "opposite"], ["Parchment was made from animal skin.", "too_narrow"], ["Every European could read by 1500.", "too_broad"]],
        "The passage explains how printing changed access to books and knowledge.",
        "As books became cheaper, more people learned to read.", 2),
      mc("key_details", "closed", "What was Gutenberg's crucial innovation, according to the passage?",
        "A practical system of movable metal type",
        [["The invention of paper", "not_in_text"], ["The first use of clay type", "true_but_irrelevant"], ["A machine for pressing grapes", "true_but_irrelevant"]],
        "Gutenberg's key contribution was casting durable metal letters that could be rearranged.",
        "Gutenberg's crucial innovation was a practical system of movable metal type.", 2),
      ep("inference", "Why might movable type have been easier to use for European languages than for Chinese?",
        "European alphabets have only a few dozen letters, while Chinese writing uses thousands of characters.",
        [["Chinese printers did not have presses.", "not_in_text"], ["European languages have no punctuation.", "not_in_text"], ["Clay type was stronger than metal type.", "opposite"]],
        "Fewer letters means fewer pieces of type to make and arrange.",
        "Gutenberg's combination of metal type, oil-based ink, and the press proved especially well suited to European alphabets, which use only a few dozen letters.", 4),
      mc("vocab_context", "open", 'As used in the passage, "unprecedented" most nearly means',
        "never seen before",
        [["very slow", "opposite"], ["well known", "not_in_text"], ["expensive", "not_in_text"]],
        "Printing was faster than anything that had existed before.",
        "The speed of the new method was unprecedented.", 2),
      mc("author_purpose", "open", "Why does the author include information about Bi Sheng and Korean printers?",
        "To show that Gutenberg built on earlier inventions from Asia",
        [["To argue that Gutenberg copied Korean books", "not_in_text"], ["To prove Asian printing failed completely", "opposite"], ["To explain how parchment is made", "not_in_text"]],
        "The paragraph places Gutenberg's work in a longer history of printing.",
        "Gutenberg was not the first to print with movable type.", 3),
      mc("text_structure", "open", "How does the first paragraph prepare the reader for the rest of the passage?",
        "It describes the problem of rare, hand-copied books that the press would solve.",
        [["It explains how Gutenberg's press worked.", "not_in_text"], ["It argues that scribes did better work.", "not_in_text"], ["It lists the consequences of printing.", "not_in_text"]],
        "Showing how rare books were makes the press's impact clearer.",
        "As a result, books were rare treasures, owned mainly by monasteries, universities, and the very wealthy.", 3),
    ],
  },
  {
    slug: "is-mars-worth-it",
    title: "Is Mars Worth It?",
    genre: "argument",
    tags: ["space", "science"],
    rating: 7.5,
    knowledgeDemand: 3,
    purpose: "As you read, figure out the writer's position and how the writer handles the cost argument.",
    keyIdeas: [
      "The writer argues that sending humans to Mars is worth its considerable cost and risk.",
      "Mars exploration drives technological innovation and may answer whether life ever existed beyond Earth.",
      "The writer acknowledges problems on Earth but argues that space spending is small and its benefits reach everyday life.",
    ],
    glossary: [
      ["innovation", "a new idea, method, or invention"],
      ["hostile", "unfriendly or dangerous"],
      ["inhospitable", "difficult or impossible to live in"],
      ["fraction", "a small part of something"],
    ],
    body: `Mars is one of the most inhospitable places a human could visit. Its average surface temperature is around minus sixty degrees Celsius, its thin atmosphere is made mostly of carbon dioxide, and the trip from Earth takes roughly seven months each way. Space agencies and private companies are nonetheless developing plans to send astronauts there. Critics ask whether the enormous cost and risk can be justified when there are so many urgent problems on our own planet. I believe a human mission to Mars is worth the investment.

The first reason is scientific discovery. Mars was once very different from the cold desert we see today. Rovers have found dried riverbeds, ancient lake deposits, and minerals that form only in water, evidence that the planet was once warmer and wetter. That raises one of the most profound questions people have ever asked: did life ever exist anywhere besides Earth? Robotic rovers have accomplished remarkable work, but they move slowly and can perform only the tasks they were designed for. Trained human geologists could explore far more ground, recognize unexpected clues, and adapt their investigations on the spot.

The second reason is innovation. Keeping people alive on a hostile world requires solving extraordinarily difficult problems in recycling water and air, producing food, generating power, and protecting the body from radiation. Solutions to these challenges often prove valuable on Earth. Past space programs helped accelerate improvements in water filtration, medical imaging, weather forecasting, and the tiny cameras now found in phones. Already, an experiment on NASA's Perseverance rover has succeeded in producing small amounts of oxygen from the carbon dioxide in Mars's atmosphere, a technology that could someday matter both on Mars and on Earth.

The strongest objection is that the money should be spent solving problems at home, such as poverty, disease, and climate change. These problems are serious, and I do not dismiss them. However, the choice is not truly either-or. Space exploration makes up only a small fraction of government spending, and much of that money pays engineers, scientists, and manufacturers on Earth. Furthermore, the satellites and technologies developed through space programs are among our most important tools for monitoring the climate and responding to natural disasters.

Humans have always been explorers. Reaching Mars would test our ingenuity, deepen our understanding of the universe, and inspire a new generation to study science and engineering. Those benefits make the journey worth taking.`,
    questions: [
      mc("main_idea", "closed", "What is the writer's central claim?",
        "A human mission to Mars is worth its cost and risk.",
        [["Mars is too cold for humans to ever visit.", "opposite"], ["All space money should go to fighting poverty.", "opposite"], ["Rovers have found dried riverbeds on Mars.", "too_narrow"]],
        "The writer states the claim at the end of the first paragraph.",
        "I believe a human mission to Mars is worth the investment.", 1),
      ms("argument_evidence", "closed", "Select the two main reasons the writer gives for going to Mars.",
        ["Scientific discovery, including the search for past life", "Technological innovation that can benefit Earth"],
        [["Mars has a warm climate for vacations", "opposite"], ["Mars has valuable gold to mine", "not_in_text"]],
        "The 'first reason' is discovery and the 'second reason' is innovation.",
        "The second reason is innovation.", 2),
      ep("argument_evidence", "How does the writer respond to the argument that the money should be spent on problems at home?",
        "By arguing that space spending is a small share of the budget and also helps solve problems on Earth",
        [["By claiming that poverty and disease are not serious", "opposite"], ["By agreeing that the Mars mission should be canceled", "opposite"], ["By saying that rovers are too slow", "true_but_irrelevant"]],
        "The writer acknowledges the problems but argues it is not an either-or choice.",
        "Space exploration makes up only a small fraction of government spending, and much of that money pays engineers, scientists, and manufacturers on Earth.", 3),
      mc("vocab_context", "open", 'As used in the passage, "inhospitable" most nearly means',
        "very difficult to live in",
        [["friendly and welcoming", "opposite"], ["far away", "true_but_irrelevant"], ["full of water", "not_in_text"]],
        "The writer lists Mars's freezing cold and thin air to show how harsh it is.",
        "Mars is one of the most inhospitable places a human could visit.", 2),
      mc("inference", "open", "Why does the writer compare human geologists with robotic rovers?",
        "To argue that humans could make discoveries robots would miss",
        [["To prove that rovers have failed", "opposite"], ["To show that geologists are cheaper", "not_in_text"], ["To explain how rovers are built", "not_in_text"]],
        "Humans can recognize unexpected clues and adapt, which rovers cannot.",
        "Trained human geologists could explore far more ground, recognize unexpected clues, and adapt their investigations on the spot.", 3),
      mc("text_structure", "open", "Why does the writer begin by describing Mars's harsh conditions?",
        "To acknowledge the challenges honestly before arguing the mission is still worth it",
        [["To argue that the mission is impossible", "opposite"], ["To describe a typical vacation destination", "not_in_text"], ["To explain the history of rovers", "not_in_text"]],
        "Admitting the difficulties up front makes the argument more credible.",
        "Its average surface temperature is around minus sixty degrees Celsius, its thin atmosphere is made mostly of carbon dioxide, and the trip from Earth takes roughly seven months each way.", 3),
    ],
  },
];
