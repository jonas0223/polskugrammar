import { personalPronounsExercises } from "./exercises/personal_pronouns";
import { nounGenderExercises } from "./exercises/noun_gender";
import { presentTenseExercises } from "./exercises/present_tense";
import { nominativeCaseExercises } from "./exercises/nominative_case";
import { accusativeCaseExercises } from "./exercises/accusative_case";
import { negationExercises } from "./exercises/negation";
import { questionsExercises } from "./exercises/questions";
import { numbersExercises } from "./exercises/numbers";
import { adjectiveAgreementExercises } from "./exercises/adjective_agreement";
import { prepositionsExercises } from "./exercises/prepositions";
import { pastTenseExercises } from "./exercises/past_tense";
import { everydayPhrasesExercises } from "./exercises/everyday_phrases";

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
  // ─────────────────────────────────────────────────────────────
  // 1. PERSONAL PRONOUNS
  // ─────────────────────────────────────────────────────────────
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
            explanation: "'Ona' means 'she'. 'On' = he, 'oni' = they (masc.), 'one' = they (fem./mixed).",
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
              { left: "ty", right: "you (sing.)" },
              { left: "on", right: "he" },
              { left: "ona", right: "she" },
              { left: "my", right: "we" },
              { left: "wy", right: "you (pl.)" },
            ],
          },
          {
            id: "pp_sb1",
            type: "sentence_builder",
            question: "Build the sentence: 'She is from Warsaw.'",
            words: ["Ona", "jest", "z", "Warszawy", "."],
            correctOrder: ["Ona", "jest", "z", "Warszawy", "."],
          },
          {
            id: "pp_mc3",
            type: "multiple_choice",
            question: "Which pronoun means 'they' when the group includes at least one man?",
            options: ["one", "oni", "ono", "my"],
            correctAnswer: "oni",
            explanation: "'Oni' is used for groups containing at least one male person. 'One' is for all-female or mixed non-personal groups.",
          },
          {
            id: "pp_fb2",
            type: "fill_blank",
            question: "Complete with the correct pronoun (he):",
            sentence: "___ jest moim przyjacielem.",
            blanks: ["On"],
            explanation: "'On' = he. 'On jest moim przyjacielem.' = He is my friend.",
          },
          {
            id: "pp_sb2",
            type: "sentence_builder",
            question: "Build: 'They are from Kraków.'",
            words: ["Oni", "są", "z", "Krakowa", "."],
            correctOrder: ["Oni", "są", "z", "Krakowa", "."],
          },
          {
            id: "pp_ec1",
            type: "error_correction",
            question: "Correct the pronoun error:",
            wrongSentence: "Ona jest moim bratem.",
            correctedSentence: "On jest moim bratem.",
            explanation: "'Brat' (brother) is masculine, so the subject pronoun must be 'on' (he), not 'ona' (she).",
          },
          {
            id: "pp_mc4",
            type: "multiple_choice",
            question: "What does 'ono' refer to?",
            options: ["a male person", "a female person", "a neuter noun or small child", "a group of people"],
            correctAnswer: "a neuter noun or small child",
            explanation: "'Ono' refers to neuter-gender subjects (e.g., dziecko = child, miasto = city).",
          },
          ...personalPronounsExercises,
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 2. NOUN GENDER
  // ─────────────────────────────────────────────────────────────
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
              { left: "herbata (tea)", right: "Feminine" },
              { left: "kot (cat)", right: "Masculine" },
            ],
          },
          {
            id: "ng_ec1",
            type: "error_correction",
            question: "Find and correct the adjective error:",
            wrongSentence: "To jest duży kobieta.",
            correctedSentence: "To jest duża kobieta.",
            explanation: "'Kobieta' is feminine, so the adjective must be 'duża', not 'duży'.",
          },
          {
            id: "ng_mc4",
            type: "multiple_choice",
            question: "What gender is 'piwо' (beer)?",
            options: ["Masculine", "Feminine", "Neuter"],
            correctAnswer: "Neuter",
            explanation: "'Piwo' ends in -o, making it neuter gender.",
          },
          {
            id: "ng_mc5",
            type: "multiple_choice",
            question: "What gender is 'mężczyzna' (man)?",
            options: ["Masculine", "Feminine", "Neuter"],
            correctAnswer: "Masculine",
            explanation: "Although 'mężczyzna' ends in -a (unusual for masculine nouns), it refers to a man and is grammatically masculine.",
          },
          {
            id: "ng_fb1",
            type: "fill_blank",
            question: "What gender is 'krzesło' (chair)? Type: masculine, feminine, or neuter.",
            sentence: "'krzesło' is ___.",
            blanks: ["neuter"],
            explanation: "'Krzesło' ends in -o, so it is neuter gender.",
          },
          {
            id: "ng_match2",
            type: "matching",
            question: "Match the nouns to their typical endings.",
            pairs: [
              { left: "Masculine", right: "ends in consonant" },
              { left: "Feminine", right: "ends in -a" },
              { left: "Neuter", right: "ends in -o or -e" },
            ],
          },
          {
            id: "ng_sb1",
            type: "sentence_builder",
            question: "Build: 'The cat is big.' (masculine noun)",
            words: ["Kot", "jest", "duży", "."],
            correctOrder: ["Kot", "jest", "duży", "."],
          },
          ...nounGenderExercises,
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 3. PRESENT TENSE
  // ─────────────────────────────────────────────────────────────
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
          "Polish verbs change their endings based on who is doing the action. The verb 'mówić' (to speak) is a great example. Each person gets its own suffix. The infinitive (dictionary form) usually ends in -ć.",
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
            question: "Fill in the correct verb form of 'mieszkać' (to live).",
            sentence: "Ja ___ w Warszawie.",
            blanks: ["mieszkam"],
            explanation: "'Mieszkać' conjugated for 'ja' (I) = 'mieszkam'.",
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
          {
            id: "pt_match1",
            type: "matching",
            question: "Match the subject pronoun to the correct verb form of 'być' (to be).",
            pairs: [
              { left: "ja", right: "jestem" },
              { left: "ty", right: "jesteś" },
              { left: "on/ona", right: "jest" },
              { left: "my", right: "jesteśmy" },
              { left: "oni/one", right: "są" },
            ],
          },
          {
            id: "pt_fb3",
            type: "fill_blank",
            question: "Conjugate 'czytać' (to read) for 'ty':",
            sentence: "Ty ___ książkę.",
            blanks: ["czytasz"],
            explanation: "For 'ty' (you), 'czytać' → 'czytasz'. The -asz ending is common for -ać verbs.",
          },
          {
            id: "pt_mc3",
            type: "multiple_choice",
            question: "Which verb form goes with 'wy' (you plural)?",
            options: ["mówię", "mówisz", "mówicie", "mówią"],
            correctAnswer: "mówicie",
            explanation: "For 'wy' (you plural), 'mówić' becomes 'mówicie'.",
          },
          {
            id: "pt_ec1",
            type: "error_correction",
            question: "Fix the verb conjugation:",
            wrongSentence: "My jestem studentami.",
            correctedSentence: "My jesteśmy studentami.",
            explanation: "'Jestem' is the 'ja' (I) form. For 'my' (we), 'być' becomes 'jesteśmy'.",
          },
          {
            id: "pt_sb2",
            type: "sentence_builder",
            question: "Build: 'He reads the newspaper.'",
            words: ["On", "czyta", "gazetę", "."],
            correctOrder: ["On", "czyta", "gazetę", "."],
          },
          ...presentTenseExercises,
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 4. NOMINATIVE CASE
  // ─────────────────────────────────────────────────────────────
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
          {
            id: "nom_mc3",
            type: "multiple_choice",
            question: "Identify the subject: 'Kot śpi na łóżku.'",
            options: ["śpi", "na", "łóżku", "kot"],
            correctAnswer: "kot",
            explanation: "'Kot' (cat) is the subject — it is the one sleeping. It's in the nominative case.",
          },
          {
            id: "nom_match1",
            type: "matching",
            question: "Match each sentence with its nominative subject.",
            pairs: [
              { left: "Pies biega.", right: "pies" },
              { left: "Ona czyta.", right: "ona" },
              { left: "Mój brat pracuje.", right: "brat" },
              { left: "Deszcz pada.", right: "deszcz" },
            ],
          },
          {
            id: "nom_fb1",
            type: "fill_blank",
            question: "Fill in the subject (nominative) — use 'nauczyciel' (teacher):",
            sentence: "___ uczy matematyki.",
            blanks: ["Nauczyciel"],
            explanation: "'Nauczyciel' (teacher, masc.) is the subject and stays in nominative form.",
          },
          {
            id: "nom_sb2",
            type: "sentence_builder",
            question: "Build: 'The woman is reading a book.'",
            words: ["Kobieta", "czyta", "książkę", "."],
            correctOrder: ["Kobieta", "czyta", "książkę", "."],
          },
          {
            id: "nom_ec1",
            type: "error_correction",
            question: "The subject should be in nominative. Correct this:",
            wrongSentence: "Kobietę mieszka w Krakowie.",
            correctedSentence: "Kobieta mieszka w Krakowie.",
            explanation: "'Kobietę' is the accusative form. As the subject, it must be nominative: 'kobieta'.",
          },
          ...nominativeCaseExercises,
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 5. ACCUSATIVE CASE
  // ─────────────────────────────────────────────────────────────
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
          "The accusative case marks the direct object — the thing that receives the action. Feminine nouns change from -a to -ę. Masculine animate nouns look like the genitive. Inanimate masculine and neuter nouns stay the same.",
        examples: [
          { polish: "Czytam książkę.", english: "I read a book. (książka → książkę)" },
          { polish: "Widzę psa.", english: "I see a dog. (pies → psa)" },
          { polish: "Piję kawę.", english: "I drink coffee. (kawa → kawę)" },
          { polish: "Lubię muzykę.", english: "I like music. (muzyka → muzykę)" },
          { polish: "Mam samochód.", english: "I have a car. (inanimate masc. — no change)" },
        ],
        exercises: [
          {
            id: "acc_mc1",
            type: "multiple_choice",
            question: "Which is correct? 'I eat bread.' (chleb = inanimate masculine)",
            options: ["Jem chlebie.", "Jem chleba.", "Jem chleb.", "Jem chlebu."],
            correctAnswer: "Jem chleb.",
            explanation: "Inanimate masculine nouns don't change in the accusative. 'Chleb' stays 'chleb'.",
          },
          {
            id: "acc_fb1",
            type: "fill_blank",
            question: "Put 'gazeta' in the accusative:",
            sentence: "Ona czyta ___.",
            blanks: ["gazetę"],
            explanation: "Feminine nouns ending in -a change to -ę in the accusative: gazeta → gazetę.",
          },
          {
            id: "acc_match1",
            type: "matching",
            question: "Match each nominative to its accusative form.",
            pairs: [
              { left: "kawa (coffee)", right: "kawę" },
              { left: "herbata (tea)", right: "herbatę" },
              { left: "woda (water)", right: "wodę" },
              { left: "chleb (bread)", right: "chleb" },
            ],
          },
          {
            id: "acc_mc2",
            type: "multiple_choice",
            question: "Which is correct? 'I see a cat.' (kot = animate masculine)",
            options: ["Widzę kota.", "Widzę kot.", "Widzę kotem.", "Widzę kotu."],
            correctAnswer: "Widzę kota.",
            explanation: "Animate masculine nouns take genitive endings in the accusative: kot → kota.",
          },
          {
            id: "acc_fb2",
            type: "fill_blank",
            question: "Put 'muzyka' in accusative (I listen to music):",
            sentence: "Słucham ___.",
            blanks: ["muzyki"],
            hint: "After 'słuchać', you use the genitive, not accusative — both end in -i/-y for feminine nouns.",
            explanation: "'Słuchać' (to listen) takes the genitive case. Muzyka → muzyki.",
          },
          {
            id: "acc_sb1",
            type: "sentence_builder",
            question: "Build: 'I drink water.'",
            words: ["Piję", "wodę", "."],
            correctOrder: ["Piję", "wodę", "."],
          },
          {
            id: "acc_ec1",
            type: "error_correction",
            question: "Fix the accusative form:",
            wrongSentence: "Widzę kobieta.",
            correctedSentence: "Widzę kobietę.",
            explanation: "'Kobieta' is feminine -a. In accusative it becomes 'kobietę' (-a → -ę).",
          },
          {
            id: "acc_mc3",
            type: "multiple_choice",
            question: "The accusative is used after which verb?",
            options: ["być (to be)", "mieć (to have)", "mieszkać (to live)", "pracować (to work)"],
            correctAnswer: "mieć (to have)",
            explanation: "'Mieć' (to have) takes a direct object in accusative: Mam brata. (I have a brother.)",
          },
          ...accusativeCaseExercises,
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 6. NEGATION
  // ─────────────────────────────────────────────────────────────
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
          "In Polish, 'nie' is placed directly before the verb to negate it. After negation, some cases change — the accusative becomes the genitive. This is a key feature of Polish!",
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
            explanation: "'Nie' goes directly before the verb. 'Ja' is optional and usually dropped.",
          },
          {
            id: "neg_ec1",
            type: "error_correction",
            question: "Correct this negated sentence:",
            wrongSentence: "Nie lubię kawę.",
            correctedSentence: "Nie lubię kawy.",
            explanation: "After negation, the accusative (kawę) changes to the genitive (kawy).",
          },
          {
            id: "neg_mc2",
            type: "multiple_choice",
            question: "Negate: 'Mam brata.' (I have a brother.)",
            options: ["Nie mam brata.", "Nie mam bratu.", "Nie mam bratem.", "Nie mam brat."],
            correctAnswer: "Nie mam brata.",
            explanation: "After 'nie mam' (don't have), the noun takes the genitive case. Brat → brata.",
          },
          {
            id: "neg_sb1",
            type: "sentence_builder",
            question: "Build: 'I don't speak Polish.'",
            words: ["Nie", "mówię", "po", "polsku", "."],
            correctOrder: ["Nie", "mówię", "po", "polsku", "."],
          },
          {
            id: "neg_mc3",
            type: "multiple_choice",
            question: "Where does 'nie' go in a Polish sentence?",
            options: [
              "At the end of the sentence",
              "Directly before the verb",
              "Before the subject",
              "After the object",
            ],
            correctAnswer: "Directly before the verb",
            explanation: "'Nie' always comes directly before the verb it negates.",
          },
          {
            id: "neg_fb1",
            type: "fill_blank",
            question: "Negate the sentence (fill in 'nie' + verb):",
            sentence: "Ona ___ w Polsce.",
            blanks: ["nie mieszka"],
            explanation: "'Ona nie mieszka w Polsce.' = She doesn't live in Poland.",
          },
          {
            id: "neg_match1",
            type: "matching",
            question: "Match the positive sentence with its negation.",
            pairs: [
              { left: "Mam czas.", right: "Nie mam czasu." },
              { left: "Lubię herbatę.", right: "Nie lubię herbaty." },
              { left: "Mówię po polsku.", right: "Nie mówię po polsku." },
              { left: "To jest prawda.", right: "To nie jest prawda." },
            ],
          },
          {
            id: "neg_ec2",
            type: "error_correction",
            question: "Fix the word order in this negation:",
            wrongSentence: "Rozumiem nie tego.",
            correctedSentence: "Nie rozumiem tego.",
            explanation: "'Nie' must come directly before the verb: 'Nie rozumiem tego.' = I don't understand this.",
          },
          ...negationExercises,
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 7. QUESTION FORMS
  // ─────────────────────────────────────────────────────────────
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
          "Polish uses question words just like English. For yes/no questions, add 'czy' at the start or use rising intonation. For information questions, use the appropriate question word at the beginning.",
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
            explanation: "'Jak masz na imię?' literally 'How do you have for a name?' — the standard Polish phrasing.",
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
            explanation: "'Czy' is the Polish yes/no question particle, placed at the beginning.",
          },
          {
            id: "q_sb1",
            type: "sentence_builder",
            question: "Build: 'Where do you live?'",
            words: ["Gdzie", "mieszkasz", "?"],
            correctOrder: ["Gdzie", "mieszkasz", "?"],
          },
          {
            id: "q_fb1",
            type: "fill_blank",
            question: "Ask 'How much does it cost?' — fill in the question word:",
            sentence: "___ to kosztuje?",
            blanks: ["Ile"],
            explanation: "'Ile' means 'how much / how many'. 'Ile to kosztuje?' = How much does it cost?",
          },
          {
            id: "q_mc3",
            type: "multiple_choice",
            question: "How do you say 'Where are you from?'",
            options: ["Gdzie jesteś?", "Skąd jesteś?", "Kiedy jesteś?", "Jak jesteś?"],
            correctAnswer: "Skąd jesteś?",
            explanation: "'Skąd' means 'from where'. 'Skąd jesteś?' = Where are you from?",
          },
          {
            id: "q_sb2",
            type: "sentence_builder",
            question: "Build: 'What is this?'",
            words: ["Co", "to", "jest", "?"],
            correctOrder: ["Co", "to", "jest", "?"],
          },
          {
            id: "q_ec1",
            type: "error_correction",
            question: "Fix the word order in this question:",
            wrongSentence: "Mówisz czy po polsku?",
            correctedSentence: "Czy mówisz po polsku?",
            explanation: "'Czy' must come first in yes/no questions: 'Czy mówisz po polsku?'",
          },
          {
            id: "q_mc4",
            type: "multiple_choice",
            question: "What does 'Ile masz lat?' mean?",
            options: ["What year is it?", "How old are you?", "How many years did you study?", "When were you born?"],
            correctAnswer: "How old are you?",
            explanation: "'Ile masz lat?' literally 'How many years do you have?' — Polish way of asking age.",
          },
          ...questionsExercises,
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 8. NUMBERS & TIME
  // ─────────────────────────────────────────────────────────────
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
        title: "Numbers 1–20",
        explanation:
          "Polish numbers 1–10 must be memorized. From 11–19, most add -naście. Tens follow their own patterns. Numbers also change depending on the grammatical case of what's being counted!",
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
            explanation: "pięć = five. jeden(1), dwa(2), trzy(3), cztery(4), pięć(5).",
          },
          {
            id: "num_match1",
            type: "matching",
            question: "Match the Polish numbers to their digits.",
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
            explanation: "'Dwunasta' is the feminine ordinal form of 'twelve', used with 'godzina'.",
          },
          {
            id: "num_mc3",
            type: "multiple_choice",
            question: "What is 'eight' in Polish?",
            options: ["siedem", "dziewięć", "osiem", "sześć"],
            correctAnswer: "osiem",
            explanation: "osiem = eight. sześć(6), siedem(7), osiem(8), dziewięć(9).",
          },
          {
            id: "num_fb1",
            type: "fill_blank",
            question: "Write the number 'three' in Polish:",
            sentence: "___, cztery, pięć...",
            blanks: ["Trzy"],
            explanation: "trzy = three. The sequence: jeden, dwa, trzy, cztery, pięć.",
          },
          {
            id: "num_match2",
            type: "matching",
            question: "Match the numbers 6–10.",
            pairs: [
              { left: "sześć", right: "6" },
              { left: "siedem", right: "7" },
              { left: "osiem", right: "8" },
              { left: "dziewięć", right: "9" },
              { left: "dziesięć", right: "10" },
            ],
          },
          {
            id: "num_sb1",
            type: "sentence_builder",
            question: "Build: 'I am twenty years old.'",
            words: ["Mam", "dwadzieścia", "lat", "."],
            correctOrder: ["Mam", "dwadzieścia", "lat", "."],
          },
          {
            id: "num_mc4",
            type: "multiple_choice",
            question: "How do you say 'fifteen' in Polish?",
            options: ["pięćdziesiąt", "piętnasty", "piętnaście", "pięćset"],
            correctAnswer: "piętnaście",
            explanation: "piętnaście = fifteen. Numbers 11-19 usually end in -naście.",
          },
          {
            id: "num_ec1",
            type: "error_correction",
            question: "Fix the number word:",
            wrongSentence: "Mam dwie psy.",
            correctedSentence: "Mam dwa psy.",
            explanation: "'Psy' (dogs) is masculine, so use 'dwa' not 'dwie'. 'Dwie' is used with feminine nouns.",
          },
          ...numbersExercises,
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 9. ADJECTIVE AGREEMENT
  // ─────────────────────────────────────────────────────────────
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
          "In Polish, adjectives must agree with the noun they describe in gender, number, and case. Masculine adjectives end in -y/-i, feminine in -a, neuter in -e. This is one of the trickier parts of Polish!",
        examples: [
          { polish: "duży dom (big house — masc.)", english: "Masculine: -y/-i ending" },
          { polish: "duża kobieta (big woman — fem.)", english: "Feminine: -a ending" },
          { polish: "duże miasto (big city — neut.)", english: "Neuter: -e ending" },
          { polish: "stary pies (old dog)", english: "More masc. examples: nowy, stary, dobry" },
          { polish: "nowa książka (new book)", english: "Feminine: nowa, stara, dobra" },
        ],
        exercises: [
          {
            id: "adj_mc1",
            type: "multiple_choice",
            question: "Choose the correct form: '___ dom' (big house — masc.)",
            options: ["duża", "duże", "duży", "duzi"],
            correctAnswer: "duży",
            explanation: "Masculine singular adjectives use -y or -i. 'dom' is masculine → 'duży'.",
          },
          {
            id: "adj_mc2",
            type: "multiple_choice",
            question: "Choose the correct form: '___ kawa' (good coffee — fem.)",
            options: ["dobry", "dobre", "dobra", "dobrze"],
            correctAnswer: "dobra",
            explanation: "Feminine singular adjectives use -a. 'kawa' is feminine → 'dobra'.",
          },
          {
            id: "adj_match1",
            type: "matching",
            question: "Match each adjective form to the gender it agrees with.",
            pairs: [
              { left: "duży", right: "masculine" },
              { left: "duża", right: "feminine" },
              { left: "duże", right: "neuter" },
              { left: "stary", right: "masculine" },
              { left: "stara", right: "feminine" },
            ],
          },
          {
            id: "adj_ec1",
            type: "error_correction",
            question: "Correct the adjective agreement:",
            wrongSentence: "To jest nowy herbata.",
            correctedSentence: "To jest nowa herbata.",
            explanation: "'Herbata' is feminine → adjective must be 'nowa', not 'nowy'.",
          },
          {
            id: "adj_fb1",
            type: "fill_blank",
            question: "Fill in the correct form of 'stary' (old) for 'miasto' (city, neut.):",
            sentence: "To jest ___ miasto.",
            blanks: ["stare"],
            explanation: "'Miasto' is neuter → adjective takes -e ending: 'stare'.",
          },
          {
            id: "adj_mc3",
            type: "multiple_choice",
            question: "Which form of 'mały' (small) goes with 'pies' (dog, masc.)?",
            options: ["mała", "małe", "mały", "mali"],
            correctAnswer: "mały",
            explanation: "'Pies' is masculine singular → 'mały pies' (small dog).",
          },
          {
            id: "adj_sb1",
            type: "sentence_builder",
            question: "Build: 'This is a beautiful woman.' (fem.)",
            words: ["To", "jest", "piękna", "kobieta", "."],
            correctOrder: ["To", "jest", "piękna", "kobieta", "."],
          },
          {
            id: "adj_ec2",
            type: "error_correction",
            question: "Fix the adjective ending:",
            wrongSentence: "Mam stary mama.",
            correctedSentence: "Mam starą mamę.",
            explanation: "In the accusative, feminine adjective 'stary' → 'starą', and 'mama' → 'mamę'.",
          },
          {
            id: "adj_match2",
            type: "matching",
            question: "Match the noun with the correct adjective form of 'dobry' (good).",
            pairs: [
              { left: "dom (masc.)", right: "dobry" },
              { left: "herbata (fem.)", right: "dobra" },
              { left: "piwo (neut.)", right: "dobre" },
              { left: "chleb (masc.)", right: "dobry" },
            ],
          },
          ...adjectiveAgreementExercises,
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 10. PREPOSITIONS
  // ─────────────────────────────────────────────────────────────
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
            explanation: "'W' (in) is for enclosed spaces. 'Na' is for surfaces or open spaces.",
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
          {
            id: "prep_fb1",
            type: "fill_blank",
            question: "Fill in the correct preposition ('on the table'):",
            sentence: "Książka leży ___ stole.",
            blanks: ["na"],
            explanation: "'Na' (on) is used for surfaces: 'na stole' = on the table.",
          },
          {
            id: "prep_mc3",
            type: "multiple_choice",
            question: "Which preposition do you use to say 'from Warsaw'?",
            options: ["do Warszawy", "w Warszawie", "z Warszawy", "przy Warszawie"],
            correctAnswer: "z Warszawy",
            explanation: "'Z' (from) + genitive: 'z Warszawy' = from Warsaw.",
          },
          {
            id: "prep_sb1",
            type: "sentence_builder",
            question: "Build: 'I am in the café.'",
            words: ["Jestem", "w", "kawiarni", "."],
            correctOrder: ["Jestem", "w", "kawiarni", "."],
          },
          {
            id: "prep_ec1",
            type: "error_correction",
            question: "Fix the preposition:",
            wrongSentence: "Idę w sklepu.",
            correctedSentence: "Idę do sklepu.",
            explanation: "For movement towards a destination, use 'do' (to), not 'w' (in).",
          },
          {
            id: "prep_mc4",
            type: "multiple_choice",
            question: "How do you say 'I work in an office'?",
            options: ["Pracuję do biurze.", "Pracuję na biurze.", "Pracuję w biurze.", "Pracuję z biurze."],
            correctAnswer: "Pracuję w biurze.",
            explanation: "'W' + locative for location: 'w biurze' = in the office.",
          },
          {
            id: "prep_match2",
            type: "matching",
            question: "Match the phrase to its English meaning.",
            pairs: [
              { left: "w domu", right: "at home" },
              { left: "do szkoły", right: "to school" },
              { left: "z Polski", right: "from Poland" },
              { left: "na stole", right: "on the table" },
            ],
          },
          ...prepositionsExercises,
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 11. PAST TENSE
  // ─────────────────────────────────────────────────────────────
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
          "The Polish past tense agrees with the gender of the subject: -łem/-łam for 'I' (masc./fem.), -łeś/-łaś for 'you', -ł/-ła for he/she, -liśmy/-łyśmy for 'we', etc.",
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
            explanation: "A female speaker uses 'byłam' — the feminine past form of 'być'.",
          },
          {
            id: "past_mc2",
            type: "multiple_choice",
            question: "Conjugate 'pracować' (to work) for 'he' in past tense:",
            options: ["pracowałem", "pracowałam", "pracował", "pracowała"],
            correctAnswer: "pracował",
            explanation: "For 'on' (he), the masculine past tense form is 'pracował'.",
          },
          {
            id: "past_fb1",
            type: "fill_blank",
            question: "Fill in past tense of 'jeść' (to eat) for 'she':",
            sentence: "Ona ___ śniadanie.",
            blanks: ["jadła"],
            explanation: "Feminine past of 'jeść': jadła. Masculine: jadł.",
          },
          {
            id: "past_mc3",
            type: "multiple_choice",
            question: "A man says 'I ate dinner'. Which is correct?",
            options: ["Jadłam obiad.", "Jadł obiad.", "Jadłem obiad.", "Jadłeś obiad."],
            correctAnswer: "Jadłem obiad.",
            explanation: "For 'ja' (I) masculine, past tense of 'jeść' = 'jadłem'.",
          },
          {
            id: "past_sb1",
            type: "sentence_builder",
            question: "Build: 'She worked yesterday.' (ona)",
            words: ["Ona", "pracowała", "wczoraj", "."],
            correctOrder: ["Ona", "pracowała", "wczoraj", "."],
          },
          {
            id: "past_match1",
            type: "matching",
            question: "Match the subject to the correct past form of 'być' (to be).",
            pairs: [
              { left: "ja (masc.)", right: "byłem" },
              { left: "ja (fem.)", right: "byłam" },
              { left: "on", right: "był" },
              { left: "ona", right: "była" },
              { left: "oni", right: "byli" },
            ],
          },
          {
            id: "past_fb2",
            type: "fill_blank",
            question: "Fill in past tense of 'mówić' (to speak) for 'they' (mixed group):",
            sentence: "Oni ___ po polsku.",
            blanks: ["mówili"],
            explanation: "For 'oni' (they, masc. group), past tense of 'mówić' = 'mówili'.",
          },
          {
            id: "past_ec1",
            type: "error_correction",
            question: "Fix the past tense gender agreement (female speaker):",
            wrongSentence: "Byłem w szkole wczoraj.",
            correctedSentence: "Byłam w szkole wczoraj.",
            explanation: "A woman uses the feminine ending -łam: 'byłam', not 'byłem'.",
          },
          {
            id: "past_mc4",
            type: "multiple_choice",
            question: "What ending does 'we' (female group) take in past tense?",
            options: ["-liśmy", "-łyśmy", "-łeśmy", "-liście"],
            correctAnswer: "-łyśmy",
            explanation: "Female 'we' (my, feminine group) takes -łyśmy: 'byłyśmy' (we were).",
          },
          ...pastTenseExercises,
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 12. EVERYDAY PHRASES
  // ─────────────────────────────────────────────────────────────
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
            explanation: "'Dziękuję' = thank you. 'Przepraszam' = sorry/excuse me, 'Proszę' = please/here you go.",
          },
          {
            id: "phrases_mc2",
            type: "multiple_choice",
            question: "What does 'Nie rozumiem' mean?",
            options: ["I don't speak Polish.", "I don't understand.", "I don't know.", "I don't have time."],
            correctAnswer: "I don't understand.",
            explanation: "'Rozumieć' = to understand. 'Nie rozumiem' = I don't understand.",
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
          {
            id: "phrases_mc3",
            type: "multiple_choice",
            question: "How do you say 'Excuse me' in Polish?",
            options: ["Dziękuję", "Cześć", "Przepraszam", "Proszę"],
            correctAnswer: "Przepraszam",
            explanation: "'Przepraszam' = excuse me / I'm sorry. Also used to get someone's attention.",
          },
          {
            id: "phrases_fb1",
            type: "fill_blank",
            question: "Fill in the missing word for 'How are you?':",
            sentence: "Jak się ___?",
            blanks: ["masz"],
            explanation: "'Jak się masz?' = How are you? Literally 'How do you have yourself?'",
          },
          {
            id: "phrases_mc4",
            type: "multiple_choice",
            question: "What is the informal greeting for 'Hi' in Polish?",
            options: ["Dzień dobry", "Do widzenia", "Cześć", "Dobranoc"],
            correctAnswer: "Cześć",
            explanation: "'Cześć' is the informal 'Hi/Hello'. 'Dzień dobry' is the formal 'Good day'.",
          },
          {
            id: "phrases_sb2",
            type: "sentence_builder",
            question: "Build: 'Good evening!' (formal greeting)",
            words: ["Dobry", "wieczór", "!"],
            correctOrder: ["Dobry", "wieczór", "!"],
          },
          {
            id: "phrases_match2",
            type: "matching",
            question: "Match the time-based greetings.",
            pairs: [
              { left: "Dzień dobry", right: "Good morning / Good day" },
              { left: "Dobry wieczór", right: "Good evening" },
              { left: "Dobranoc", right: "Good night" },
              { left: "Do widzenia", right: "Goodbye (formal)" },
              { left: "Cześć", right: "Hi / Bye (informal)" },
            ],
          },
          {
            id: "phrases_ec1",
            type: "error_correction",
            question: "Fix this common learner mistake:",
            wrongSentence: "Dziękuję cię bardzo.",
            correctedSentence: "Dziękuję ci bardzo.",
            explanation: "'Dziękuję' takes the dative case: 'ci' (you, dative), not 'cię' (you, accusative/genitive).",
          },
          ...everydayPhrasesExercises,
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
