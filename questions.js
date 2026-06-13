// IKS (Indian Knowledge System) Question Bank
// Extracted from: IKS Practice Questions Answers
// Total Questions: 155

const QUESTIONS = [
  {
    id: 1,
    question: "India has been a land of great cultures since ancient times including…....",
    options: ["Hinduism", "Jainism", "Buddhism", "All of these"],
    correct: 3
  },
  {
    id: 2,
    question: "Bharatiya Knowledge System has been evident from the era of Harappan Civilization which was started from…............................",
    options: ["2600-1900 BCE", "3600-900 BCE", "6600-2900 BCE", "5600-3900 BCE"],
    correct: 0
  },
  {
    id: 3,
    question: "Mohenjodaro in Sind province is now  located in…............",
    options: ["Bhutan", "Sri Lanka", "India", "Pakistan"],
    correct: 3
  },
  {
    id: 4,
    question: "What is Pyrotechnology?",
    options: ["Crafts created using fire", "Crafts created without use of fire", "Crafts created using water and soil", "None of these"],
    correct: 0
  },
  {
    id: 5,
    question: "What is the time period of colonial period in India?",
    options: ["From 1500 CE - 1747 CE", "From 1700 CE - 1947 CE", "From 1600 CE - 1847 CE", "None of these"],
    correct: 1
  },
  {
    id: 6,
    question: "India has been a land of great cultures since ancient times including…....",
    options: ["Hinduism", "Jainism", "Buddhism", "All of these"],
    correct: 3
  },
  {
    id: 7,
    question: "……………………….. is the ultimate goal of human life, representing liberation from the cycle of birth and death.",
    options: ["Karma", "Maya", "Atman", "Moksha"],
    correct: 3
  },
  {
    id: 8,
    question: "Shakuntala is dramatic literature written by…......................",
    options: ["Surdasa", "Kalidasa", "Tulsidasa", "Narottamdasa"],
    correct: 1
  },
  {
    id: 9,
    question: "Ajanta and Ellora caves contain some of the finest examples of classical Indian painting, depicting scenes from the life of……………………………..",
    options: ["Hinduism", "Buddhism", "Both Hinduism and Buddhism", "Sikkhism"],
    correct: 2
  },
  {
    id: 10,
    question: "What is the time period of vedic period in India?",
    options: ["From 1000 BCE - 500 BCE", "From 1500 BCE - 500 BCE", "From 2000 BCE - 1500 BCE", "All of these"],
    correct: 1
  },
  {
    id: 11,
    question: "The illusionary nature of the world is also known as…........",
    options: ["Karma", "Maya", "Atman", "Moksha"],
    correct: 1
  },
  {
    id: 12,
    question: "The entire body of knowledge is divided into ….... sets in Mundakupanishad.",
    options: ["0", "1", "2", "3"],
    correct: 2
  },
  {
    id: 13,
    question: "Aṣṭādhyāyī is a grammer book written by…........",
    options: ["Aryabhatta", "Brahmgupta", "Panini", "None of these"],
    correct: 2
  },
  {
    id: 14,
    question: "Sage Gautam is famous for his contribution about the scripture related to…................",
    options: ["Vaisheshika", "Samkhya", "Nyaya", "None of these"],
    correct: 2
  },
  {
    id: 15,
    question: "Who is known as the father of Vedanta?",
    options: ["Gautam", "Kanad", "Jamini", "Veda Vyas"],
    correct: 3
  },
  {
    id: 16,
    question: "Philosophical study of being, existence, and reality is known as….....................",
    options: ["Phenology", "Oncology", "Ontology", "None of these"],
    correct: 2
  },
  {
    id: 17,
    question: "In traditional knowledge of India, water and fire are known as…………………….and ………………….., respectively.",
    options: ["Ap and Tejas", "Vayu and Tejas", "Tejas and Akasha", "All of these"],
    correct: 0
  },
  {
    id: 18,
    question: "Mimamsa means….......",
    options: ["Science education", "Art education", "Critical investigation", "Economics education"],
    correct: 2
  },
  {
    id: 19,
    question: "Sage Patanjali has given the concept of….........................",
    options: ["Nyaya", "Yoga", "Vaisheshika", "None of these"],
    correct: 1
  },
  {
    id: 20,
    question: "Apara Vidhya means…......",
    options: ["Sanskrit", "The higher knowledge", "The lower knowledge", "All of these"],
    correct: 2
  },
  {
    id: 21,
    question: "Which one is famous for foundational principles governing health, disease, diagnosis, and treatment.",
    options: ["Vaisheshika", "Āyurveda", "Apara vidhya", "Para vidhaya"],
    correct: 1
  },
  {
    id: 22,
    question: "What was the time period of Gupta script?",
    options: ["From 4th to 6th century CE", "From 6th to 8th century CE", "From 8th to 10th century CE", "From 10th to 12th century CE"],
    correct: 0
  },
  {
    id: 23,
    question: "Isa is a type of …........",
    options: ["Upanishads", "Puranas", "Grammer", "None of these"],
    correct: 0
  },
  {
    id: 24,
    question: "How many Parvas are in Mahabharata?",
    options: ["18", "28", "38", "48"],
    correct: 0
  },
  {
    id: 25,
    question: "Which ancient  and sacred scriptures are known as the foundation of Hinduism?",
    options: ["Vedas", "Bhagvad Gita", "Ramayana", "Mahabhartha"],
    correct: 0
  },
  {
    id: 26,
    question: "In Hinduism, Yajna (Sacrifice) means",
    options: ["Emphasis on purity and precision in the execution of rituals", "Performing rituals and sacrifices toappease the gods and maintain cosmic order", "Contains prose mantras used in rituals", "Detailed explanations of the rituals and their significance"],
    correct: 1
  },
  {
    id: 27,
    question: "What are Agamas and Tantras?",
    options: ["Collection of ethical guidelines", "Role of different dities", "Base of various religious and spiritual practices", "None of these"],
    correct: 2
  },
  {
    id: 28,
    question: "Music is originated from….........",
    options: ["Rk veda", "Yajur Veda", "Sama veda", "Atharva Veda"],
    correct: 2
  },
  {
    id: 29,
    question: "The Vedas are the oldest and most authoritative scriptures of Hinduism. They consist of ….... main collections.",
    options: ["2", "3", "4", "5"],
    correct: 2
  },
  {
    id: 30,
    question: "Devanagari Script was developed in…......centuary.",
    options: ["9th century CE", "8th century CE", "7th century CE", "6th century CE"],
    correct: 1
  },
  {
    id: 31,
    question: "a concise and aphoristic style of writing used in ancient IndianWhich one refers to the literature, particularly within the realms of philosophy, spirituality, law, and grammar?",
    options: ["Karma", "Darshana", "Tantras", "Sutras"],
    correct: 3
  },
  {
    id: 32,
    question: "In which ancient scripture, social customs, ethics of human behaviour have been mentioned?",
    options: ["Smritis", "Sutras", "Puranas", "Gita"],
    correct: 0
  },
  {
    id: 33,
    question: "Tripitaka scripture is related to…..........",
    options: ["Hinduism", "Jainism", "Buddhism", "Sikkhism"],
    correct: 2
  },
  {
    id: 34,
    question: "Which one comprises translations of the Buddha's teachings intoTibetan,",
    options: ["Kangyur", "Smritis", "Sutras", "None of these"],
    correct: 0
  },
  {
    id: 35,
    question: "Which one is the oldest veda?",
    options: ["Rk veda", "Yajur Veda", "Sama veda", "Atharva Veda"],
    correct: 0
  },
  {
    id: 36,
    question: "Which one is the sacred scriptures of the Jainism.",
    options: ["Upanishadas", "Agamas", "Puranas", "Mahayana"],
    correct: 1
  },
  {
    id: 37,
    question: "During ancient Indian education system, education was provided in residential schools, which is known as…………………….",
    options: ["Akhadas", "Sarayas", "Gurukulas", "Mathas"],
    correct: 2
  },
  {
    id: 38,
    question: "Breathing exercises are also known as…...............",
    options: ["Pranayama", "Asanas", "Chintan", "Manan"],
    correct: 0
  },
  {
    id: 39,
    question: "Which place was famous for the pursuing meditation, contemplation, and philosophical inquiry under the guidance of a spiritual teacher (guru)?",
    options: ["Mathas", "Gurukulas", "Viharas", "Ashramas"],
    correct: 3
  },
  {
    id: 40,
    question: "Mahayana Sutras are the …..............scriptures.",
    options: ["Hindu", "Jain", "Sikkh", "Buddhist"],
    correct: 3
  },
  {
    id: 41,
    question: "Which one is known as 5th veda in Hinduism?",
    options: ["Vedas", "Mahabhartha", "Ramayana", "Bhagvad Gita"],
    correct: 1
  },
  {
    id: 42,
    question: "Charaka and Kautilya were the alumni of ……………………",
    options: ["Takshashila", "Nalanda", "Vikramshila", "Vallabhi"],
    correct: 0
  },
  {
    id: 43,
    question: "The golden period of Nalanda University was in between……………………………",
    options: ["5th century CE and 12th century CE", "7th century CE and 11th century CE", "8th century CE and 15th century CE", "9th century CE and 10th century CE"],
    correct: 0
  },
  {
    id: 44,
    question: "Vallabhi was a great center of learning which is located in the state of….................",
    options: ["Bihar", "Gujarat", "Madhya Pradesh", "Punjab"],
    correct: 1
  },
  {
    id: 45,
    question: "Ether is among….................",
    options: ["Five elements", "Siksha", "Darshana", "None of these"],
    correct: 0
  },
  {
    id: 46,
    question: "Total how many Nakshatras are mentioned in the ancient literatures?",
    options: ["8", "18", "23", "28"],
    correct: 3
  },
  {
    id: 47,
    question: "Vedanga-Jyotisha was composed in….......",
    options: ["1000 BCE", "1100 BCE", "1200 BCE", "1300 BCE"],
    correct: 2
  },
  {
    id: 48,
    question: "Yajnopavita is realted to…......................",
    options: ["Upnayana", "Grihstha", "Vanprastha", "None of these"],
    correct: 0
  },
  {
    id: 49,
    question: "Arthashastra was written by…..........",
    options: ["Aryabhatta", "Kautilya", "Panini", "Brahmgupta"],
    correct: 1
  },
  {
    id: 50,
    question: "In which state, ancient Vikramshila University was located?",
    options: ["Uttar Pradesh", "Gujarat", "Madhya Pradesh", "Bihar"],
    correct: 3
  },
  {
    id: 51,
    question: "What was the period of Aryabhata?",
    options: ["376–440 CE", "476–550 CE", "526–560 CE", "396–510 CE"],
    correct: 1
  },
  {
    id: 52,
    question: "Siddhanta Shiromani is written by…........",
    options: ["Brahgupta", "Aryabhatta", "Bhaskara", "Kautilya"],
    correct: 2
  },
  {
    id: 53,
    question: "Who gave Heliocentric model of thesolar system?",
    options: ["Aryabhatta", "Brahgupta", "Bhaskara", "Kautilya"],
    correct: 0
  },
  {
    id: 54,
    question: "The Indian calendar often integrates….....",
    options: ["Only stars", "Only Lunar element", "Only Solar element", "Both lunar and solar elements"],
    correct: 3
  },
  {
    id: 55,
    question: "How many ritus are there as The Indian calendar?",
    options: ["4", "6", "8", "10"],
    correct: 1
  },
  {
    id: 56,
    question: "Which ancient Indian text describes mining and metallurgical techniques?",
    options: ["Rigveda", "Arthashastra", "Charaka Samhita", "Natya Shastra"],
    correct: 1
  },
  {
    id: 57,
    question: "What was the primary fuel used for smelting metals in ancient India?",
    options: ["Coal", "Charcoal", "Cow dung", "Wood"],
    correct: 1
  },
  {
    id: 58,
    question: "Which metal was extensively used in ancient India for making idols using the lost-wax technique?",
    options: ["Bronze", "Iron", "Zinc", "Copper"],
    correct: 0
  },
  {
    id: 59,
    question: "What was the primary purpose of 'Kupya' in ancient Indian metallurgy?",
    options: ["A type of furnace", "A crucible for melting metals", "A bellow for air supply", "A hammer for forging"],
    correct: 0
  },
  {
    id: 60,
    question: "Which of the following was NOT an alloy developed in ancient India?",
    options: ["Brass", "Bronze", "Stainless steel", "Pewter"],
    correct: 2
  },
  {
    id: 61,
    question: "The famous Iron Pillar of Delhi is made up of which material?",
    options: ["Wrought Iron", "Cast Iron", "High-carbon steel", "Pure Iron"],
    correct: 0
  },
  {
    id: 62,
    question: "Which ancient Indian metallurgist is known for advancements in iron smelting?",
    options: ["Nagarjuna", "Sushruta", "Varahamihira", "Patanjali"],
    correct: 0
  },
  {
    id: 63,
    question: "Which of the following is a unique contribution of Indian Mathematics?",
    options: ["Calculus", "Complex Numbers", "Pythagorean Theorem", "Decimal System with Zero"],
    correct: 3
  },
  {
    id: 64,
    question: "Which Indian mathematician introduced the concept of negative numbers?",
    options: ["Bhaskara II", "Brahmagupta", "Aryabhata", "Varahamihira"],
    correct: 1
  },
  {
    id: 65,
    question: "The 'Pingala's Chandaḥ Śāstra' is associated with which mathematical concept?",
    options: ["Magic Squares", "Binary Numbers", "Trigonometry", "Algebra"],
    correct: 1
  },
  {
    id: 66,
    question: "What is the unique feature of Indian trigonometry compared to Greek trigonometry?",
    options: ["Use of Sine (Jya) function", "Use of Angles", "Use of Tangents", "Use of Radians"],
    correct: 0
  },
  {
    id: 67,
    question: "Which ancient Indian text contains the earliest known discussion of permutations and combinations?",
    options: ["Lilavati", "Yuktibhāṣā", "Chandah Sāstra", "Siddhanta Shiromani"],
    correct: 2
  },
  {
    id: 68,
    question: "Which ancient Indian text is considered the most authoritative work on military strategy and statecraft?",
    options: ["Manusmriti", "Mahabharata", "Rigveda", "Arthashastra"],
    correct: 3
  },
  {
    id: 69,
    question: "Who is regarded as the ancient Indian scholar who systematized military science and warfare strategies?",
    options: ["Chanakya", "Aryabhata", "Patanjali", "Panini"],
    correct: 0
  },
  {
    id: 70,
    question: "What was the primary focus of military training in ancient India as described in the Arthashastra?",
    options: ["Physical strength only", "Archery and Swordsmanship", "Espionage and psychological warfare", "Combined training in weapons, strategy, and discipline"],
    correct: 3
  },
  {
    id: 71,
    question: "Which ancient Indian kingdom was particularly known for its advanced military formations like the 'Chakravyuha'?",
    options: ["Maurya Empire", "Gupta Empire", "Magadha", "Mahajanapadas"],
    correct: 1
  },
  {
    id: 72,
    question: "hat was the primary purpose of Niyuddha Kala in ancient India?",
    options: ["Entertainment", "Military combat and self-defense", "Religious rituals", "Agricultural training"],
    correct: 1
  },
  {
    id: 73,
    question: "Which ancient Indian text describes Niyuddha techniques and combat strategies?",
    options: ["Arthashastra", "Natya Shastra", "Manusmriti", "Agni Purana"],
    correct: 3
  },
  {
    id: 74,
    question: "Which warrior-sage is traditionally associated with the origin of Niyuddha in Indian culture?",
    options: ["Dronacharya", "Parshuram", "Bhishma", "Karna"],
    correct: 1
  },
  {
    id: 75,
    question: "Which of the following was a key principle of Niyuddha Kala?",
    options: ["Use of only long-range weapons", "Strict non-violence", "Discipline, ethics, and physical prowess", "Focus on magical powers"],
    correct: 2
  },
  {
    id: 76,
    question: "Which Vedic concept represents the deification and sacredness of nature?",
    options: ["Yajna", "Pradushana", "Devata", "Prakriti"],
    correct: 2
  },
  {
    id: 77,
    question: "In Vedic tradition, what does the term 'Prithvi' signify?",
    options: ["Goddess of Water", "Mother Earth", "God of Fire", "Divine Air"],
    correct: 1
  },
  {
    id: 78,
    question: "Which Vedic practice reflects environmental conservation through ritual offerings?",
    options: ["Tapasya", "Yajna", "Dhyana", "Puja"],
    correct: 1
  },
  {
    id: 79,
    question: "Which Vedic text emphasizes the interconnectedness of all natural elements?",
    options: ["Rigveda", "Atharvaveda", "Samaveda", "Yajurveda"],
    correct: 1
  },
  {
    id: 80,
    question: "The \"Paradigm Shift\" through IKS emphasizes:",
    options: ["Blending ancient wisdom with modern scientific methods", "Rejecting technological advancements", "Exclusively using Sanskrit terminology", "Reviving outdated practices without modification"],
    correct: 0
  },
  {
    id: 81,
    question: "According to Bhartṛhari, what is the indivisible unit of linguistic communication?",
    options: ["Word", "Phoneme", "Sentence", "Meaning"],
    correct: 2
  },
  {
    id: 82,
    question: "The \"Vigyan Jyoti\" program encourages girls to pursue STEM fields by:",
    options: ["Teaching Vedic mathematics exclusively", "Combining traditional Indian sciences with modern STEM", "Focusing only on space technology", "Ignoring IKS completely"],
    correct: 1
  },
  {
    id: 83,
    question: "Bhartṛhari's view that language and reality are inseparable aligns with which concept?",
    options: ["Śabda-pramana", "Yajna", "Pradushana", "Karma"],
    correct: 0
  },
  {
    id: 84,
    question: "Which of the following is a key strategy to integrate IKS into modern education?",
    options: ["Incorporate traditional texts in STEM curricula", "Replace Western science entirely", "Limit IKS to history courses", "Ignore contemporary applications"],
    correct: 0
  },
  {
    id: 85,
    question: "n Panini's Aṣṭādhyāyī, what is the primary mechanism for generating grammatical rules?",
    options: ["Random word lists", "Sutras with recursive operations", "Pictorial representations", "Oral traditions only"],
    correct: 1
  },
  {
    id: 86,
    question: "hich of the following is a focus area of the IKS Division established under the Ministry of Education?",
    options: ["Preserving ancient manuscripts only", "Promoting only Ayurveda in schools", "Integrating IKS into mainstream education and research", "Translating all texts into English"],
    correct: 2
  },
  {
    id: 87,
    question: "How does IKS contribute to environmental sustainability today?",
    options: ["Adapting ancient water management to modern ecology", "By reviving outdated farming tools", "Banning all industrial development", "Using only organic pesticides"],
    correct: 0
  },
  {
    id: 88,
    question: "What makes Sanskrit uniquely suited for Natural Language Processing (NLP)?",
    options: ["Its ancient religious status", "Simple vocabulary", "Large number of speakers today", "Highly structured, rule-based grammar"],
    correct: 3
  },
  {
    id: 89,
    question: "What is the primary purpose of Chandas (prosody) in ancient Indian literature?",
    options: ["Decorative wordplay", "Structural framework for poetic composition", "Religious rituals only", "Musical notation"],
    correct: 1
  },
  {
    id: 90,
    question: "Which Vedic text is the earliest known source for the study of Chandas?",
    options: ["Rigveda", "Yajurveda", "Chandogya Upanishad", "Natya Shastra"],
    correct: 0
  },
  {
    id: 91,
    question: "In prosody, a Guru (heavy syllable) is defined by:",
    options: ["Sacred meaning", "High pitch", "Length", "Position in the stanza"],
    correct: 2
  },
  {
    id: 92,
    question: "What was the primary function of Gana (mnemonic syllables) in Sanskrit prosody?",
    options: ["To memorize Vedic hymns", "To classify poetic metres", "To teach grammar rules", "To compose musical notes"],
    correct: 1
  },
  {
    id: 93,
    question: "Which of these is NOT one of the \"seven birds\" (major Sanskrit metres)?",
    options: ["Anuṣṭubh", "Triṣṭubh", "Jagatī", "Kavya"],
    correct: 3
  },
  {
    id: 94,
    question: "How did metres contribute to literary architecture in ancient India?",
    options: ["By standardizing emotional expression", "By providing rigid rhythmic frameworks for poetry", "By replacing grammatical rules", "Limiting creative freedom"],
    correct: 1
  },
  {
    id: 95,
    question: "ccording to the Vedic model, how many levels (koshas) of consciousness are described?",
    options: ["3", "6", "5", "12"],
    correct: 2
  },
  {
    id: 96,
    question: "The ancient Indian theory of speech (Vak) and cognition is primarily explored in which text?",
    options: ["Patanjali's Yoga Sutras", "Charaka Samhita", "Nyaya Sutras", "Mandukya Upanishad"],
    correct: 3
  },
  {
    id: 97,
    question: "Which governmental initiative promotes IKS in current research and policy?",
    options: ["AYUSH Mission", "Digital India", "Make in India", "Swachh Bharat"],
    correct: 0
  },
  {
    id: 98,
    question: "Which ancient Indian text explicitly mentions Anvīkṣikī as one of the four vital vidyās for statecraft?",
    options: ["Manusmriti", "Arthashastra", "Rigveda", "Natya Shastra"],
    correct: 1
  },
  {
    id: 99,
    question: "The term Anvīkṣikī primarily refers to:",
    options: ["Military strategy", "Agricultural techniques", "Poetic composition", "Logical and philosophical reasoning"],
    correct: 3
  },
  {
    id: 100,
    question: "Rajadharma in ancient Indian polity primarily emphasized:",
    options: ["Military conquests", "Duties and ethical responsibilities of a ruler", "Trade regulations", "Religious rituals"],
    correct: 1
  },
  {
    id: 101,
    question: "Kautilya's Arthashastra is fundamentally a treatise on:",
    options: ["Poetic composition", "Astronomical calculations", "Statecraft, economics, and political strategy", "Ayurvedic medicine"],
    correct: 2
  },
  {
    id: 102,
    question: "The Shulba Sutras in ancient India primarily dealt with:",
    options: ["Land measurement and taxation", "Military strategy", "Temple architecture", "Ayurvedic medicine"],
    correct: 2
  },
  {
    id: 103,
    question: "Which ancient Indian text provides detailed guidelines for revenue collection and taxation under the Mauryan administration?",
    options: ["Manusmriti", "Arthashastra", "Rigveda", "Natya Shastra"],
    correct: 1
  },
  {
    id: 104,
    question: "A key mechanism to integrate IKS into modern education is:",
    options: ["Incorporating traditional texts in interdisciplinary curricula", "Limiting IKS to history courses", "Promoting only theoretical study", "Ignoring Western sciences"],
    correct: 0
  },
  {
    id: 105,
    question: "The Paradigm Shift expected from IKS integration emphasizes:",
    options: ["Isolating IKS from global systems", "Rejecting all contemporary knowledge", "Focusing on Sanskrit literature", "Blending ancient wisdom with modern scientific rigor"],
    correct: 3
  },
  {
    id: 106,
    question: "What is the primary focus of the Indian Knowledge System (IKS)?",
    options: ["Modern scientific theories", "Ancient Indian intellectual traditions and their applications", "Western philosophies", "Contemporary technological advancements"],
    correct: 1
  },
  {
    id: 107,
    question: "Which ancient Indian text is considered the oldest and forms the foundation of the Vedic literature?",
    options: ["Bhagavad Gita", "Rigveda", "Upanishads", "Mahabharata"],
    correct: 1
  },
  {
    id: 108,
    question: "In ancient Indian mathematics, which numeral system was developed that significantly influenced global mathematics?",
    options: ["Roman numeral system", "Binary numeral system", "Decimal place value system", "Hexadecimal system"],
    correct: 2
  },
  {
    id: 109,
    question: "Who is known as the 'Father of Indian Astronomy' for his seminal work 'Aryabhatiya'?",
    options: ["Varahamihira", "Brahmagupta", "Aryabhata", "Bhaskara I"],
    correct: 2
  },
  {
    id: 110,
    question: "Which ancient Indian treatise is renowned for its detailed exposition on statecraft, economics, and military strategy?",
    options: ["Manusmriti", "Arthashastra", "Ramayana", "Mahabharata"],
    correct: 1
  },
  {
    id: 111,
    question: "In the context of Indian linguistics, what is 'Panini' known for?",
    options: ["Developing the concept of zero", "Writing the epic Mahabharata", "Composing a comprehensive grammar of Sanskrit", "Establishing the principles of Ayurveda"],
    correct: 2
  },
  {
    id: 112,
    question: "Which ancient Indian science focuses on health, wellness, and longevity through natural means?",
    options: ["Yoga", "Ayurveda", "Jyotisha", "Vaastu Shastra"],
    correct: 1
  },
  {
    id: 113,
    question: "The 'Sulbasutras' are ancient Indian texts primarily concerned with which subject?",
    options: ["Astronomy", "Geometry and construction of altars", "Music and arts", "Medicine"],
    correct: 1
  },
  {
    id: 114,
    question: "Which ancient Indian scholar is credited with the discovery of the concept of zero as a numeral?",
    options: ["Aryabhata", "Brahmagupta", "Bhaskara II", "Varahamihira"],
    correct: 0
  },
  {
    id: 115,
    question: "In ancient Indian architecture, what is the significance of 'Vaastu Shastra'?",
    options: ["It is a treatise on dance and performance arts", "It provides guidelines on the design and layout of buildings and structures", "It is a manual on ancient warfare techniques"],
    correct: 1
  },
  {
    id: 116,
    question: "Which of the following is a classical Indian dance form that originated in Tamil Nadu?",
    options: ["Kathak", "Bharatanatyam", "Odissi", "Kathakali"],
    correct: 1
  },
  {
    id: 117,
    question: "The ancient Indian text 'Charaka Samhita' is associated with which field?",
    options: ["Astronomy", "Medicine", "Mathematics", "Music"],
    correct: 1
  },
  {
    id: 118,
    question: "Which ancient Indian university was renowned for its vast library and attracted students from various parts of the world?",
    options: ["Takshashila", "Nalanda", "Vikramashila", "Vallabhi"],
    correct: 1
  },
  {
    id: 119,
    question: "In the context of Indian philosophy, what does 'Advaita Vedanta' emphasize?",
    options: ["Duality between mind and body", "Non-dualism and the unity of the individual soul with the ultimate reality", "The importance of rituals and ceremonies", "The supremacy of devotional practices"],
    correct: 1
  },
  {
    id: 120,
    question: "Who authored the ancient Indian text 'Natya Shastra', which serves as a comprehensive guide on performing arts?",
    options: ["Kalidasa", "Bharata Muni", "Tulsidas", "Valmiki"],
    correct: 1
  },
  {
    id: 121,
    question: "The 'Panchatantra' is a collection of ancient Indian tales primarily intended to impart what?",
    options: ["Religious teachings", "Moral and ethical lessons", "Historical accounts", "Scientific knowledge"],
    correct: 1
  },
  {
    id: 122,
    question: "Which ancient Indian text is considered a foundational work on yoga philosophy?",
    options: ["Bhagavad Gita", "Yoga Sutras of Patanjali", "Hatha Yoga Pradipika", "Gheranda Samhita"],
    correct: 1
  },
  {
    id: 123,
    question: "In Indian classical music, what are the two primary systems?",
    options: ["Carnatic and Hindustani", "Folk and Classical", "Raga and Tala", "Sitar and Tabla"],
    correct: 0
  },
  {
    id: 124,
    question: "Which ancient Indian text deals with the principles of love and human relationships?",
    options: ["Manusmriti", "Kamasutra", "Arthashastra", "Upanishads"],
    correct: 1
  },
  {
    id: 125,
    question: "The 'Bhagavad Gita' is a part of which larger Indian epic?",
    options: ["Ramayana", "Mahabharata", "Vedas", "Puranas"],
    correct: 1
  },
  {
    id: 126,
    question: "Which ancient Indian scholar made significant contributions to the field of metallurgy and is known for his work 'Rasaratnakara'?",
    options: ["Aryabhata", "Charaka", "Nagarjuna", "Varahamihira"],
    correct: 2
  },
  {
    id: 127,
    question: "Which Indian system of knowledge focuses on ethical living, duties, and moral responsibilities?",
    options: ["Dharma Shastra", "Arthashastra", "Nyaya Sutra", "Vaastu Shastra"],
    correct: 0
  },
  {
    id: 128,
    question: "The ancient Indian science of 'Jyotisha' is primarily concerned with which field?",
    options: ["Mathematics", "Astronomy and astrology", "Medicine", "Architecture"],
    correct: 1
  },
  {
    id: 129,
    question: "Which Indian scripture contains detailed discussions on the four goals of life: Dharma, Artha, Kama, and Moksha?",
    options: ["Upanishads", "Bhagavad Gita", "Manusmriti", "Puranas"],
    correct: 2
  },
  {
    id: 130,
    question: "The 'Brihat Samhita' by Varahamihira is an encyclopedic work covering topics related to which fields?",
    options: ["Medicine and surgery", "Astronomy, meteorology, and architecture", "Poetry and drama", "Religion and philosophy"],
    correct: 1
  },
  {
    id: 131,
    question: "Which ancient Indian epic narrates the story of Lord Rama and his quest to rescue Sita?",
    options: ["Mahabharata", "Ramayana", "Bhagavad Gita", "Upanishads"],
    correct: 1
  },
  {
    id: 132,
    question: "In Ayurveda, what does the term 'Tridosha' refer to?",
    options: ["Three types of food", "Three fundamental bodily humors (Vata, Pitta, Kapha)", "Three stages of life", "Three types of diseases"],
    correct: 1
  },
  {
    id: 133,
    question: "Which ancient Indian university was known for specializing in Buddhist studies and higher education?",
    options: ["Takshashila", "Nalanda", "Vikramashila", "Ujjain"],
    correct: 1
  },
  {
    id: 134,
    question: "The 'Ashtadhyayi' by Panini is a seminal work in which field?",
    options: ["Medicine", "Grammar and linguistics", "Astronomy", "Ethics"],
    correct: 1
  },
  {
    id: 135,
    question: "Which Indian knowledge tradition emphasizes meditation and self-realization?",
    options: ["Vedanta", "Mimamsa", "Nyaya", "Samkhya"],
    correct: 0
  },
  {
    id: 136,
    question: "Which branch of Indian philosophy is primarily concerned with logic and reasoning?",
    options: ["Nyaya", "Yoga", "Samkhya", "Vedanta"],
    correct: 0
  },
  {
    id: 137,
    question: "The concept of 'Panch Mahabhuta' in Indian philosophy refers to which of the following?",
    options: ["Five types of meditation", "Five great elements (Earth, Water, Fire, Air, Space)", "Five branches of Ayurveda", "Five Vedic scriptures"],
    correct: 1
  },
  {
    id: 138,
    question: "Who among the following is regarded as the pioneer of Indian logic (Nyaya)?",
    options: ["Gautama", "Kapila", "Patanjali", "Bhartrihari"],
    correct: 0
  },
  {
    id: 139,
    question: "Which of the following is NOT a classical Indian musical instrument?",
    options: ["Sitar", "Veena", "Tabla", "Guitar"],
    correct: 3
  },
  {
    id: 140,
    question: "The 'Sushruta Samhita' is an ancient Indian text that deals with which field?",
    options: ["Astronomy", "Surgery and medicine", "Architecture", "Philosophy"],
    correct: 1
  },
  {
    id: 141,
    question: "Which Indian philosophy focuses on cause and effect and is considered dualistic in nature?",
    options: ["Samkhya", "Vedanta", "Mimamsa", "Charvaka"],
    correct: 0
  },
  {
    id: 142,
    question: "Which of the following was an ancient Indian center of learning located in present-day Pakistan?",
    options: ["Takshashila", "Nalanda", "Vikramashila", "Ujjain"],
    correct: 0
  },
  {
    id: 143,
    question: "The concept of 'Rasa' in Indian aesthetics refers to which of the following?",
    options: ["Ayurvedic medicine preparation", "The essence or sentiment in performing arts", "A type of Indian dance form", "A Vedic ritual"],
    correct: 1
  },
  {
    id: 144,
    question: "Who composed the classical Sanskrit play 'Shakuntala'?",
    options: ["Kalidasa", "Bharata Muni", "Valmiki", "Tulsidas"],
    correct: 0
  },
  {
    id: 145,
    question: "Which ancient Indian scripture describes the duties and responsibilities of a ruler?",
    options: ["Manusmriti", "Arthashastra", "Vedas", "Upanishads"],
    correct: 1
  },
  {
    id: 146,
    question: "Which text is considered the foundational scripture of the Samkhya philosophy?",
    options: ["Yoga Sutras", "Samkhya Karika", "Vedanta Sutra", "Bhagavad Gita"],
    correct: 1
  },
  {
    id: 147,
    question: "Which ancient Indian text is known as the \"Fifth Veda\" due to its comprehensive nature?",
    options: ["Bhagavad Gita", "Natya Shastra", "Upanishads", "Mahabharata"],
    correct: 3
  },
  {
    id: 148,
    question: "The concept of 'Karma' in Indian philosophy primarily refers to:",
    options: ["Fate predetermined by the gods", "The law of cause and effect governing actions", "Ritualistic sacrifices", "The pursuit of pleasure"],
    correct: 1
  },
  {
    id: 149,
    question: "Who is considered the father of Ayurveda?",
    options: ["Charaka", "Sushruta", "Nagarjuna", "Brahmagupta"],
    correct: 0
  },
  {
    id: 150,
    question: "Which Indian scripture is primarily a dialogue between Nachiketa and Yama (the god of death)?",
    options: ["Katha Upanishad", "Mundaka Upanishad", "Bhagavad Gita", "Brahma Sutra"],
    correct: 0
  },
  {
    id: 151,
    question: "Which of the following is NOT a traditional Indian martial art?",
    options: ["Kalaripayattu", "Silambam", "Gatka", "Judo"],
    correct: 3
  },
  {
    id: 152,
    question: "The 'Puranas' primarily deal with:",
    options: ["History, mythology, and cosmology", "Military strategies", "Medical sciences", "Grammar and linguistics"],
    correct: 0
  },
  {
    id: 153,
    question: "Which ancient Indian text describes the laws of motion and gravity before Newton?",
    options: ["Surya Siddhanta", "Charaka Samhita", "Arthashastra", "Nyaya Sutra"],
    correct: 0
  },
  {
    id: 154,
    question: "What is the literal meaning of 'Vedanta'?",
    options: ["End of the Vedas", "Science of life", "Cosmic order", "Sacred law"],
    correct: 0
  },
  {
    id: 155,
    question: "Which Indian philosophy emphasizes devotion (bhakti) as a path to liberation?",
    options: ["Vedanta", "Bhakti Yoga", "Nyaya", "Charvaka"],
    correct: 1
  },
];
