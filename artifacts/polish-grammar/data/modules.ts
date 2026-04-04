export type ExerciseType =
  | "multiple_choice"
  | "fill_blank"
  | "matching"
  | "sentence_builder"
  | "error_correction";

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  explanation?: string;
  hint?: string;
  // Multiple choice
  options?: string[];
  correctAnswer?: string | string[];
  // Fill blank
  sentence?: string;
  blanks?: string[];
  // Matching
  pairs?: { left: string; right: string }[];
  // Sentence builder
  words?: string[];
  correctOrder?: string[];
  // Error correction
  wrongSentence?: string;
  correctedSentence?: string;
}

export interface Lesson {
  id: string;
  title: string;
  explanation: string;
  examples: { polish: string; english: string }[];
  exercises: Exercise[];
  audioWords?: { word: string; pronunciation: string }[];
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  level: "A1" | "A2";
}

export const MODULES: Module[] = [
  {
    id: "personal_pronouns",
    title: "Personal Pronouns",
    subtitle: "Ja, ty, on, ona...",
    icon: "users",
    color: "#3b5bdb",
    level: "A1",
    lessons: [
      {
        id: "pronouns_intro",
        title: "Subject Pronouns",
        explanation:
          "Polish has different personal pronouns depending on who you're talking about. Unlike English, Polish verbs change their endings based on the subject, so pronouns are sometimes dropped in conversation.",
        examples: [
          { polish: "Ja jestem studentem.", english: "I am a student." },
          { polish: "Ty mówisz po polsku.", english: "You speak Polish." },
          { polish: "On jest lekarzem.", english: "He is a doctor." },
          { polish: "Ona jest nauczycielką.", english: "She is a teacher." },
          { polish: "My jesteśmy przyjaciółmi.", english: "We are friends." },
          { polish: "Oni mówią po angielsku.", english: "They speak English." },
        ],
        exercises: [
          {
            id: "pp_mc1",
            type: "multiple_choice",
            question: "Which pronoun means 'she'?",
            options: ["on", "ona", "oni", "one"],
            correctAnswer: "ona",
            explanation: "'Ona' means 'she' in Polish. 'On' means 'he', 'oni' means 'they' (masculine), 'one' means 'they' (feminine/mixed).",
          },
          {
            id: "pp_mc2",
            type: "multiple_choice",
            question: "Choose the correct translation for 'We are students.'",
            options: [
              "Ty jesteś studentem.",
              "My jesteśmy studentami.",
              "Oni są studentami.",
              "Ja jestem studentem.",
            ],
            correctAnswer: "My jesteśmy studentami.",
            explanation: "'My' means 'we', and 'jesteśmy' is the 'we' form of 'być' (to be).",
          },
          {
            id: "pp_fb1",
            type: "fill_blank",
            question: "Fill in the correct pronoun.",
            sentence: "___ jestem z Polski.",
            blanks: ["Ja"],
            explanation: "'Ja' (I) + 'jestem' (am) = I am from Poland.",
          },
          {
            id: "pp_match1",
            type: "matching",
            question: "Match the Polish pronouns with their English translations.",
            pairs: [
              { left: "ja", right: "I" },
              { left: "ty", right: "you (singular)" },
              { left: "on", right: "he" },
              { left: "ona", right: "she" },
              { left: "my", right: "we" },
              { left: "wy", right: "you (plural)" },
            ],
          },
          {
            id: "pp_sb1",
            type: "sentence_builder",
            question: "Build the sentence: 'She is from Warsaw.'",
            words: ["Ona", "jest", "z", "Warszawy", ".",],
            correctOrder: ["Ona", "jest", "z", "Warszawy", "."],
          },
        ],
      },
    ],
  },
  {
    id: "noun_gender",
    title: "Noun Gender",
    subtitle: "Masculine, feminine, neuter",
    icon: "book",
    color: "#7c3aed",
    level: "A1",
    lessons: [
      {
        id: "gender_intro",
        title: "Three Genders",
        explanation:
          "Every Polish noun has a grammatical gender: masculine, feminine, or neuter. The gender affects adjectives, verb endings, and pronouns. Usually you can tell the gender from the ending of the noun.",
        examples: [
          { polish: "dom (masc.) — the house", english: "Masculine nouns often end in a consonant." },
          { polish: "kobieta (fem.) — the woman", english: "Feminine nouns often end in -a." },
          { polish: "dziecko (neut.) — the child", english: "Neuter nouns often end in -o or -e." },
          { polish: "Duży dom. (big house)", english: "Adjectives agree with the noun's gender." },
          { polish: "Duża kobieta. (big woman)", english: "Same adjective, different ending." },
        ],
        exercises: [
          {
            id: "ng_mc1",
            type: "multiple_choice",
            question: "What gender is the noun 'kobieta' (woman)?",
            options: ["Masculine", "Feminine", "Neuter"],
            correctAnswer: "Feminine",
            explanation: "Nouns ending in -a are almost always feminine in Polish.",
          },
          {
            id: "ng_mc2",
            type: "multiple_choice",
            question: "What gender is 'okno' (window)?",
            options: ["Masculine", "Feminine", "Neuter"],
            correctAnswer: "Neuter",
            explanation: "Nouns ending in -o are typically neuter gender.",
          },
          {
            id: "ng_mc3",
            type: "multiple_choice",
            question: "Which ending is typical for masculine nouns?",
            options: ["-a", "a consonant", "-o or -e", "-ia"],
            correctAnswer: "a consonant",
            explanation: "Most masculine nouns end in a consonant, e.g., 'dom' (house), 'kot' (cat), 'pies' (dog).",
          },
          {
            id: "ng_match1",
            type: "matching",
            question: "Match each noun with its gender.",
            pairs: [
              { left: "dom (house)", right: "Masculine" },
              { left: "mama (mom)", right: "Feminine" },
              { left: "miasto (city)", right: "Neuter" },
              { left: "student", right: "Masculine" },
              { left: "herbata (tea)", right: "Feminine" },
            ],
          },
          {
            id: "ng_ec1",
            type: "error_correction",
            question: "Find and correct the error in this sentence:",
            wrongSentence: "To jest duży dom. To jest duży kobieta.",
            correctedSentence: "To jest duży dom. To jest duża kobieta.",
            explanation: "'Kobieta' is feminine, so the adjective must be 'duża', not 'duży'.",
          },
        ],
      },
    ],
  },
  {
    id: "present_tense",
    title: "Present Tense",
    subtitle: "Verb conjugation basics",
    icon: "clock",
    color: "#059669",
    level: "A1",
    lessons: [
      {
        id: "present_intro",
        title: "Conjugating Verbs",
        explanation:
          "Polish verbs change their endings based on who is doing the action. The verb 'mówić' (to speak) is a great example. Each person (I, you, he/she...) gets its own suffix. The infinitive (dictionary form) usually ends in -ć.",
        examples: [
          { polish: "Ja mówię po polsku.", english: "I speak Polish." },
          { polish: "Ty mówisz po angielsku.", english: "You speak English." },
          { polish: "On/Ona mówi po francusku.", english: "He/She speaks French." },
          { polish: "My mówimy powoli.", english: "We speak slowly." },
          { polish: "Wy mówicie szybko.", english: "You (pl.) speak fast." },
          { polish: "Oni mówią po polsku.", english: "They speak Polish." },
        ],
        exercises: [
          {
            id: "pt_mc1",
            type: "multiple_choice",
            question: "Which is correct for 'She speaks Polish'?",
            options: ["Ona mówię po polsku.", "Ona mówi po polsku.", "Ona mówimy po polsku.", "Ona mówisz po polsku."],
            correctAnswer: "Ona mówi po polsku.",
            explanation: "For 'on/ona/ono' (he/she/it), 'mówić' becomes 'mówi'.",
          },
          {
            id: "pt_fb1",
            type: "fill_blank",
            question: "Fill in the correct verb form.",
            sentence: "Ja ___ w Warszawie.",
            blanks: ["mieszkam"],
            explanation: "'Mieszkać' (to live/reside) conjugated for 'ja' (I) = 'mieszkam'.",
          },
          {
            id: "pt_fb2",
            type: "fill_blank",
            question: "Fill in the correct form of 'pracować' (to work).",
            sentence: "Oni ___ w biurze.",
            blanks: ["pracują"],
            explanation: "For 'oni/one' (they), 'pracować' becomes 'pracują'.",
          },
          {
            id: "pt_mc2",
            type: "multiple_choice",
            question: "How do you say 'We study'? (studiować = to study)",
            options: ["My studiuję.", "My studiujesz.", "My studiujemy.", "My studiują."],
            correctAnswer: "My studiujemy.",
            explanation: "For 'my' (we), the ending is '-emy' or '-imy' depending on the verb class.",
          },
          {
            id: "pt_sb1",
            type: "sentence_builder",
            question: "Build: 'You work in a school.'",
            words: ["Ty", "pracujesz", "w", "szkole", "."],
            correctOrder: ["Ty", "pracujesz", "w", "szkole", "."],
          },
        ],
      },
    ],
  },
  {
    id: "noun_cases_nom",
    title: "Nominative Case",
    subtitle: "The subject of a sentence",
    icon: "layout",
    color: "#dc2626",
    level: "A1",
    lessons: [
      {
        id: "nom_intro",
        title: "Who is doing the action?",
        explanation:
          "The nominative case is used for the subject of a sentence — the person or thing doing the action. This is the dictionary form of the noun. Most sentences start with a nominative noun.",
        examples: [
          { polish: "Pies biega w parku.", english: "The dog runs in the park." },
          { polish: "Kot śpi na kanapie.", english: "The cat sleeps on the sofa." },
          { polish: "Student czyta książkę.", english: "The student reads a book." },
          { polish: "Nauczycielka mówi po angielsku.", english: "The teacher speaks English." },
        ],
        exercises: [
          {
            id: "nom_mc1",
            type: "multiple_choice",
            question: "Which word is in the nominative (subject) case? 'Mama gotuje zupę.'",
            options: ["gotuje", "zupę", "mama", "none of them"],
            correctAnswer: "mama",
            explanation: "'Mama' is the subject (the one cooking), so it's in the nominative case.",
          },
          {
            id: "nom_mc2",
            type: "multiple_choice",
            question: "The nominative case answers which question?",
            options: ["Whom? (Kogo?)", "Who/What? (Kto/Co?)", "To whom? (Komu?)", "Where? (Gdzie?)"],
            correctAnswer: "Who/What? (Kto/Co?)",
            explanation: "The nominative answers 'who?' or 'what?' — it identifies the subject.",
          },
          {
            id: "nom_sb1",
            type: "sentence_builder",
            question: "Build: 'The student drinks coffee.'",
            words: ["Student", "pije", "kawę", "."],
            correctOrder: ["Student", "pije", "kawę", "."],
          },
        ],
      },
    ],
  },
  {
    id: "noun_cases_acc",
    title: "Accusative Case",
    subtitle: "The direct object",
    icon: "arrow-right",
    color: "#ea580c",
    level: "A1",
    lessons: [
      {
        id: "acc_intro",
        title: "The Direct Object",
        explanation:
          "The accusative case marks the direct object — the thing that receives the action. Feminine nouns change from -a to -ę. Masculine animate nouns look like the genitive. This is one of the most common cases!",
        examples: [
          { polish: "Czytam książkę.", english: "I read a book. (książka → książkę)" },
          { polish: "Widzę psa.", english: "I see a dog. (pies → psa)" },
          { polish: "Piję kawę.", english: "I drink coffee. (kawa → kawę)" },
          { polish: "Lubię muzykę.", english: "I like music. (muzyka → muzykę)" },
        ],
        exercises: [
          {
            id: "acc_mc1",
            type: "multiple_choice",
            question: "Which is correct? 'I eat bread.' (chleb)",
            options: ["Jem chlebie.", "Jem chleba.", "Jem chleb.", "Jem chlebu."],
            correctAnswer: "Jem chleb.",
            explanation: "Inanimate masculine nouns don't change in the accusative. 'Chleb' (bread) stays 'chleb'.",
          },
          {
            id: "acc_fb1",
            type: "fill_blank",
            question: "Fill in the accusative form.",
            sentence: "Ona czyta ___ (gazeta → ?).",
            blanks: ["gazetę"],
            explanation: "Feminine nouns ending in -a change to -ę in the accusative: gazeta → gazetę.",
          },
          {
            id: "acc_match1",
            type: "matching",
            question: "Match the nominative to its accusative form.",
            pairs: [
              { left: "kawa (coffee)", right: "kawę" },
              { left: "herbata (tea)", right: "herbatę" },
              { left: "woda (water)", right: "wodę" },
              { left: "chleb (bread)", right: "chleb" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "negation",
    title: "Negation",
    subtitle: "Saying 'no' and 'not'",
    icon: "x-circle",
    color: "#be185d",
    level: "A1",
    lessons: [
      {
        id: "neg_intro",
        title: "Nie — The Power Word",
        explanation:
          "In Polish, 'nie' is placed before the verb to negate it, similar to English 'not'. After negation, some cases change — particularly the accusative becomes the genitive. This is a key feature of Polish!",
        examples: [
          { polish: "Mam czas. → Nie mam czasu.", english: "I have time. → I don't have time." },
          { polish: "Widzę psa. → Nie widzę psa.", english: "I see a dog. → I don't see a dog." },
          { polish: "To jest prawda. → To nie jest prawda.", english: "That is true. → That is not true." },
          { polish: "Lubię kawę. → Nie lubię kawy.", english: "I like coffee. → I don't like coffee." },
        ],
        exercises: [
          {
            id: "neg_mc1",
            type: "multiple_choice",
            question: "How do you say 'I don't understand'?",
            options: ["Ja rozumiem nie.", "Nie ja rozumiem.", "Nie rozumiem.", "Ja nie rozumienie."],
            correctAnswer: "Nie rozumiem.",
            explanation: "'Nie' goes directly before the verb. Subject pronoun 'ja' is optional and usually dropped.",
          },
          {
            id: "neg_ec1",
            type: "error_correction",
            question: "Correct this sentence: 'Nie lubię kawę.'",
            wrongSentence: "Nie lubię kawę.",
            correctedSentence: "Nie lubię kawy.",
            explanation: "After negation, the accusative (kawę) changes to the genitive (kawy). This is a key Polish grammar rule.",
          },
          {
            id: "neg_mc2",
            type: "multiple_choice",
            question: "Negate: 'Mam brata.' (I have a brother.)",
            options: ["Nie mam brata.", "Nie mam bratu.", "Nie mam bratem.", "Nie mam brat."],
            correctAnswer: "Nie mam brata.",
            explanation: "After 'nie mam' (don't have), the noun takes the genitive case. 'Brat' → 'brata' in genitive.",
          },
        ],
      },
    ],
  },
  {
    id: "question_forms",
    title: "Question Forms",
    subtitle: "Asking in Polish",
    icon: "help-circle",
    color: "#0891b2",
    level: "A1",
    lessons: [
      {
        id: "questions_intro",
        title: "How to Ask Questions",
        explanation:
          "Polish uses question words just like English. For yes/no questions, simply use rising intonation or add 'czy' at the start. For information questions, use the appropriate question word.",
        examples: [
          { polish: "Czy mówisz po polsku?", english: "Do you speak Polish? (yes/no)" },
          { polish: "Skąd jesteś?", english: "Where are you from?" },
          { polish: "Jak masz na imię?", english: "What's your name?" },
          { polish: "Co to jest?", english: "What is this?" },
          { polish: "Gdzie mieszkasz?", english: "Where do you live?" },
          { polish: "Ile to kosztuje?", english: "How much does it cost?" },
          { polish: "Kiedy przyjeżdżasz?", english: "When are you arriving?" },
        ],
        exercises: [
          {
            id: "q_mc1",
            type: "multiple_choice",
            question: "How do you ask 'What is your name?' in Polish?",
            options: ["Gdzie masz na imię?", "Jak masz na imię?", "Co masz na imię?", "Kiedy masz na imię?"],
            correctAnswer: "Jak masz na imię?",
            explanation: "'Jak masz na imię?' literally means 'How do you have for a name?' — the standard Polish way to ask someone's name.",
          },
          {
            id: "q_match1",
            type: "matching",
            question: "Match the question words with their English equivalents.",
            pairs: [
              { left: "co", right: "what" },
              { left: "kto", right: "who" },
              { left: "gdzie", right: "where" },
              { left: "kiedy", right: "when" },
              { left: "dlaczego", right: "why" },
              { left: "jak", right: "how" },
            ],
          },
          {
            id: "q_mc2",
            type: "multiple_choice",
            question: "Which word starts a yes/no question?",
            options: ["co", "gdzie", "czy", "kto"],
            correctAnswer: "czy",
            explanation: "'Czy' is a Polish question particle used at the beginning of yes/no questions.",
          },
          {
            id: "q_sb1",
            type: "sentence_builder",
            question: "Build: 'Where do you live?'",
            words: ["Gdzie", "mieszkasz", "?"],
            correctOrder: ["Gdzie", "mieszkasz", "?"],
          },
        ],
      },
    ],
  },
  {
    id: "numbers",
    title: "Numbers & Time",
    subtitle: "Counting and telling time",
    icon: "hash",
    color: "#7c3aed",
    level: "A1",
    lessons: [
      {
        id: "numbers_intro",
        title: "Numbers 1-20",
        explanation:
          "Polish numbers 1-10 must be memorized. From 11-19, add -naście. Tens follow patterns too. Numbers also change depending on the grammatical case of what's being counted!",
        examples: [
          { polish: "jeden, dwa, trzy, cztery, pięć", english: "one, two, three, four, five" },
          { polish: "sześć, siedem, osiem, dziewięć, dziesięć", english: "six, seven, eight, nine, ten" },
          { polish: "jedenaście, dwanaście, trzynaście", english: "eleven, twelve, thirteen" },
          { polish: "Mam dwadzieścia lat.", english: "I am twenty years old." },
          { polish: "Jest godzina trzecia.", english: "It is three o'clock." },
        ],
        exercises: [
          {
            id: "num_mc1",
            type: "multiple_choice",
            question: "What is 'five' in Polish?",
            options: ["cztery", "sześć", "pięć", "siedem"],
            correctAnswer: "pięć",
            explanation: "pięć = five. Remember: jeden(1), dwa(2), trzy(3), cztery(4), pięć(5).",
          },
          {
            id: "num_match1",
            type: "matching",
            question: "Match the numbers.",
            pairs: [
              { left: "jeden", right: "1" },
              { left: "dwa", right: "2" },
              { left: "pięć", right: "5" },
              { left: "dziesięć", right: "10" },
              { left: "dwadzieścia", right: "20" },
            ],
          },
          {
            id: "num_mc2",
            type: "multiple_choice",
            question: "How do you say 'It is twelve o'clock'?",
            options: [
              "Jest godzina jedenasta.",
              "Jest godzina dwunasta.",
              "Jest godzina dziesiąta.",
              "Jest godzina trzynasta.",
            ],
            correctAnswer: "Jest godzina dwunasta.",
            explanation: "'Dwunasta' is the ordinal feminine form of 'twelve', used with 'godzina' (hour/o'clock).",
          },
        ],
      },
    ],
  },
  {
    id: "adjective_agreement",
    title: "Adjective Agreement",
    subtitle: "Adjectives match the noun",
    icon: "tag",
    color: "#0f766e",
    level: "A2",
    lessons: [
      {
        id: "adj_intro",
        title: "Adjectives Change Form",
        explanation:
          "In Polish, adjectives must agree with the noun they describe in gender, number, and case. A masculine adjective ends in -y/-i, feminine in -a, neuter in -e. This is one of the trickier parts of Polish!",
        examples: [
          { polish: "duży dom (big house — masc.)", english: "Masculine adjective: -y/-i ending" },
          { polish: "duża kobieta (big woman — fem.)", english: "Feminine adjective: -a ending" },
          { polish: "duże miasto (big city — neut.)", english: "Neuter adjective: -e ending" },
          { polish: "stary pies (old dog)", english: "More masculine examples: nowy, stary, dobry" },
          { polish: "nowa książka (new book)", english: "Feminine: nowa, stara, dobra" },
        ],
        exercises: [
          {
            id: "adj_mc1",
            type: "multiple_choice",
            question: "Choose the correct adjective form: '___ dom' (big house — masc.)",
            options: ["duża", "duże", "duży", "duzi"],
            correctAnswer: "duży",
            explanation: "Masculine singular adjectives use -y or -i ending. 'dom' is masculine, so 'duży'.",
          },
          {
            id: "adj_mc2",
            type: "multiple_choice",
            question: "Choose the correct form: '___ kawa' (good coffee — fem.)",
            options: ["dobry", "dobre", "dobra", "dobrze"],
            correctAnswer: "dobra",
            explanation: "Feminine singular adjectives use -a ending. 'kawa' is feminine, so 'dobra'.",
          },
          {
            id: "adj_match1",
            type: "matching",
            question: "Match adjective form to the correct gender.",
            pairs: [
              { left: "duży", right: "masculine" },
              { left: "duża", right: "feminine" },
              { left: "duże", right: "neuter" },
              { left: "nowy", right: "masculine" },
              { left: "nowa", right: "feminine" },
            ],
          },
          {
            id: "adj_ec1",
            type: "error_correction",
            question: "Correct the mistake:",
            wrongSentence: "To jest nowy herbata.",
            correctedSentence: "To jest nowa herbata.",
            explanation: "'Herbata' is feminine, so the adjective must be 'nowa', not 'nowy'.",
          },
        ],
      },
    ],
  },
  {
    id: "common_prepositions",
    title: "Prepositions",
    subtitle: "In, on, to, from...",
    icon: "map-pin",
    color: "#b45309",
    level: "A2",
    lessons: [
      {
        id: "prep_intro",
        title: "Location Prepositions",
        explanation:
          "Polish prepositions trigger different cases in the nouns that follow them. The most common location prepositions are 'w' (in), 'na' (on/at), 'do' (to), 'z' (from/with), and 'przy' (near/by).",
        examples: [
          { polish: "Jestem w domu.", english: "I am at home. ('w' + locative)" },
          { polish: "Siedzę na kanapie.", english: "I'm sitting on the sofa. ('na' + locative)" },
          { polish: "Idę do sklepu.", english: "I'm going to the store. ('do' + genitive)" },
          { polish: "Wracam z pracy.", english: "I'm coming back from work. ('z' + genitive)" },
          { polish: "Stoję przy oknie.", english: "I'm standing by the window. ('przy' + locative)" },
        ],
        exercises: [
          {
            id: "prep_mc1",
            type: "multiple_choice",
            question: "Which preposition means 'in' for enclosed spaces?",
            options: ["na", "do", "w", "z"],
            correctAnswer: "w",
            explanation: "'W' (in) is used for enclosed spaces, while 'na' is for surfaces or open spaces.",
          },
          {
            id: "prep_mc2",
            type: "multiple_choice",
            question: "Complete: 'Idę ___ kawiarni.' (I'm going to the café.)",
            options: ["w", "na", "do", "z"],
            correctAnswer: "do",
            explanation: "'Do' (to) is used for movement towards a destination.",
          },
          {
            id: "prep_match1",
            type: "matching",
            question: "Match prepositions with their meanings.",
            pairs: [
              { left: "w", right: "in (enclosed space)" },
              { left: "na", right: "on / at (open space)" },
              { left: "do", right: "to (direction)" },
              { left: "z", right: "from / with" },
              { left: "przy", right: "near / by" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "past_tense",
    title: "Past Tense",
    subtitle: "Talking about the past",
    icon: "rotate-ccw",
    color: "#4f46e5",
    level: "A2",
    lessons: [
      {
        id: "past_intro",
        title: "What happened?",
        explanation:
          "The Polish past tense is formed by taking the verb stem and adding gender-specific endings. This is unique: the verb must agree with the gender of the subject. -łem/-łam for 'I', -łeś/-łaś for 'you', etc.",
        examples: [
          { polish: "Byłem w Krakowie. (masc.)", english: "I was in Kraków." },
          { polish: "Byłam w Krakowie. (fem.)", english: "I was in Kraków." },
          { polish: "On czytał książkę.", english: "He was reading a book." },
          { polish: "Ona pracowała wczoraj.", english: "She worked yesterday." },
          { polish: "Oni grali w piłkę.", english: "They played football." },
        ],
        exercises: [
          {
            id: "past_mc1",
            type: "multiple_choice",
            question: "A woman says 'I was in Warsaw'. Which is correct?",
            options: ["Byłem w Warszawie.", "Byłam w Warszawie.", "Było w Warszawie.", "Byłeś w Warszawie."],
            correctAnswer: "Byłam w Warszawie.",
            explanation: "A female speaker uses 'byłam' — the feminine form of 'być' (to be) in past tense.",
          },
          {
            id: "past_mc2",
            type: "multiple_choice",
            question: "Conjugate 'pracować' (to work) for 'he' in past tense:",
            options: ["pracowałem", "pracowałam", "pracował", "pracowała"],
            correctAnswer: "pracował",
            explanation: "For 'on' (he), the past tense masculine form is 'pracował'.",
          },
          {
            id: "past_fb1",
            type: "fill_blank",
            question: "Fill in the blank (she ate):",
            sentence: "Ona ___ śniadanie.",
            blanks: ["jadła"],
            explanation: "'Jeść' (to eat) in past tense for feminine: jadła. Masculine: jadł.",
          },
        ],
      },
    ],
  },
  {
    id: "everyday_sentences",
    title: "Everyday Phrases",
    subtitle: "Real conversations",
    icon: "message-circle",
    color: "#16a34a",
    level: "A1",
    lessons: [
      {
        id: "phrases_intro",
        title: "Essential Phrases",
        explanation:
          "These are the most useful phrases for everyday life in Poland. Learn them and you can have basic conversations right away!",
        examples: [
          { polish: "Dzień dobry! / Cześć!", english: "Good day! / Hi!" },
          { polish: "Jak się masz?", english: "How are you?" },
          { polish: "Dobrze, dziękuję.", english: "Fine, thank you." },
          { polish: "Przepraszam, nie rozumiem.", english: "Sorry, I don't understand." },
          { polish: "Czy mówi pan/pani po angielsku?", english: "Do you speak English? (formal)" },
          { polish: "Ile to kosztuje?", english: "How much does it cost?" },
          { polish: "Do widzenia!", english: "Goodbye!" },
        ],
        exercises: [
          {
            id: "phrases_mc1",
            type: "multiple_choice",
            question: "How do you say 'Thank you' in Polish?",
            options: ["Przepraszam", "Dziękuję", "Proszę", "Dobrze"],
            correctAnswer: "Dziękuję",
            explanation: "'Dziękuję' means 'thank you'. 'Przepraszam' = excuse me/sorry, 'Proszę' = please/here you go.",
          },
          {
            id: "phrases_mc2",
            type: "multiple_choice",
            question: "What does 'Nie rozumiem' mean?",
            options: ["I don't speak Polish.", "I don't understand.", "I don't know.", "I don't have time."],
            correctAnswer: "I don't understand.",
            explanation: "'Rozumieć' means 'to understand'. 'Nie rozumiem' = I don't understand.",
          },
          {
            id: "phrases_match1",
            type: "matching",
            question: "Match the Polish phrases to their English meanings.",
            pairs: [
              { left: "Dzień dobry", right: "Good day" },
              { left: "Do widzenia", right: "Goodbye" },
              { left: "Dziękuję", right: "Thank you" },
              { left: "Przepraszam", right: "Excuse me / Sorry" },
              { left: "Proszę", right: "Please / Here you go" },
            ],
          },
          {
            id: "phrases_sb1",
            type: "sentence_builder",
            question: "Build: 'I don't understand Polish.'",
            words: ["Nie", "rozumiem", "po", "polsku", "."],
            correctOrder: ["Nie", "rozumiem", "po", "polsku", "."],
          },
        ],
      },
    ],
  },
];

export function getModuleById(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}

export function getLessonById(moduleId: string, lessonId: string): Lesson | undefined {
  const module = getModuleById(moduleId);
  return module?.lessons.find((l) => l.id === lessonId);
}
