export interface LearningSection {
  title: string;
  body: string;
  tip?: string;
  examples?: { polish: string; english: string }[];
}

export interface LearningResource {
  moduleId: string;
  sections: LearningSection[];
}

export const LEARNING_RESOURCES: LearningResource[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. PERSONAL PRONOUNS
  // ─────────────────────────────────────────────────────────────
  {
    moduleId: "personal_pronouns",
    sections: [
      {
        title: "The 9 Personal Pronouns",
        body: "Polish has nine personal pronouns. Unlike English, you often drop the subject pronoun in speech because the verb ending already tells you who is doing the action.",
        examples: [
          { polish: "ja", english: "I" },
          { polish: "ty", english: "you (singular, informal)" },
          { polish: "on / ona / ono", english: "he / she / it" },
          { polish: "my", english: "we" },
          { polish: "wy", english: "you (plural)" },
          { polish: "oni / one", english: "they (masc.) / they (fem./mixed)" },
        ],
        tip: "Because verb endings change per person, native speakers often skip 'ja', 'ty', etc. — e.g. 'Mówię po polsku' = 'I speak Polish' without saying 'ja'.",
      },
      {
        title: "oni vs. one",
        body: "'Oni' is used when a group contains at least one male person. 'One' is used for all-female groups or groups of non-personal things.",
        examples: [
          { polish: "Oni są studentami.", english: "They (mixed/male group) are students." },
          { polish: "One są nauczycielkami.", english: "They (female group) are teachers." },
        ],
      },
      {
        title: "Pronouns in Other Cases",
        body: "Like nouns, pronouns change their form depending on their grammatical role in the sentence (case). Here are the most important forms for everyday use:",
        examples: [
          { polish: "Widzę go.", english: "I see him. (accusative of 'on')" },
          { polish: "Daj mi to.", english: "Give me that. (dative of 'ja')" },
          { polish: "Idę z nią.", english: "I'm going with her. (instrumental of 'ona')" },
          { polish: "Mówię o tobie.", english: "I'm talking about you. (locative of 'ty')" },
        ],
        tip: "After a preposition, 'go' becomes 'niego', 'jej' becomes 'niej', 'im' becomes 'nim', etc. The 'n-' prefix appears whenever a pronoun follows a preposition.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 2. NOUN GENDER
  // ─────────────────────────────────────────────────────────────
  {
    moduleId: "noun_gender",
    sections: [
      {
        title: "Three Grammatical Genders",
        body: "Every Polish noun is masculine, feminine, or neuter. Gender is grammatical, not natural — it's determined by the word's ending, not the real-world meaning of the word.",
        examples: [
          { polish: "dom (masc.)", english: "house — ends in consonant" },
          { polish: "kobieta (fem.)", english: "woman — ends in -a" },
          { polish: "dziecko (neut.)", english: "child — ends in -o" },
        ],
      },
      {
        title: "Masculine Nouns",
        body: "Most masculine nouns end in a consonant. However, there is an important group of masculine nouns ending in -a — these are mainly professions and relationships.",
        examples: [
          { polish: "pies, dom, lekarz, długopis", english: "dog, house, doctor, pen (typical masculine)" },
          { polish: "mężczyzna, kolega, tata, poeta", english: "man, colleague, dad, poet (masc. ending in -a)" },
        ],
        tip: "Even though 'mężczyzna' ends in -a like a feminine noun, it is grammatically masculine. The adjective agrees with the grammatical gender: 'mój kolega' (my colleague), not 'moja'.",
      },
      {
        title: "Feminine Nouns",
        body: "Most feminine nouns end in -a. A smaller group ends in -i (like 'pani') or in a consonant (mostly abstract nouns and body-related words).",
        examples: [
          { polish: "mama, szkoła, kawa, książka", english: "mom, school, coffee, book" },
          { polish: "pani, gospodyni", english: "lady/Mrs., housewife" },
          { polish: "sól, mysz, noc, kość", english: "salt, mouse, night, bone (consonant-ending feminine)" },
        ],
      },
      {
        title: "Neuter Nouns",
        body: "Neuter nouns end in -o, -e, -ę, or -um. The -um endings come from Latin loan words.",
        examples: [
          { polish: "okno, piwo, dziecko", english: "window, beer, child (-o endings)" },
          { polish: "słońce, mieszkanie", english: "sun, apartment (-e endings)" },
          { polish: "imię, cielę", english: "name, calf (-ę endings)" },
          { polish: "centrum, muzeum, liceum", english: "centre, museum, high school (-um endings)" },
        ],
      },
      {
        title: "Why Gender Matters",
        body: "Gender affects adjectives, demonstratives ('ten/ta/to'), possessives ('mój/moja/moje'), and past-tense verb endings. Everything must agree with the noun's gender.",
        examples: [
          { polish: "duży dom / duża kawa / duże miasto", english: "big house / big coffee / big city" },
          { polish: "ten pies / ta kobieta / to dziecko", english: "this dog / this woman / this child" },
          { polish: "mój brat / moja siostra / moje dziecko", english: "my brother / my sister / my child" },
        ],
        tip: "When you learn a new noun, always learn its gender at the same time — it's much harder to unlearn a wrong gender later.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 3. PRESENT TENSE
  // ─────────────────────────────────────────────────────────────
  {
    moduleId: "present_tense",
    sections: [
      {
        title: "Three Conjugation Patterns",
        body: "Polish present-tense verbs follow three main conjugation types, named by their 1st-person-singular / 2nd-person-singular endings. Learning which type a verb belongs to unlocks all six forms.",
        examples: [
          { polish: "-m / -sz type (e.g. kochać → kocham, kochasz)", english: "love — most -ać verbs + rozumieć, wiedzieć, jeść, mieć" },
          { polish: "-ę / -isz type (e.g. mówić → mówię, mówisz)", english: "speak — most -ić/-yć/-eć verbs" },
          { polish: "-ę / -esz type (e.g. pracować → pracuję, pracujesz)", english: "work — most -ować verbs" },
        ],
        tip: "If you know the 'ja' and 'ty' forms of any verb, you can build all the other forms using the same pattern.",
      },
      {
        title: "Type 1: -m / -sz (e.g. kochać)",
        body: "Remove -ć from the infinitive, then add: -m, -sz, -ø, -my, -cie, -ją.",
        examples: [
          { polish: "kocham, kochasz, kocha", english: "I love, you love, he/she loves" },
          { polish: "kochamy, kochacie, kochają", english: "we love, you (pl.) love, they love" },
          { polish: "mam, masz, ma, mamy, macie, mają", english: "I have, you have, he has…" },
          { polish: "rozumiem, rozumiesz, rozumie", english: "I understand, you understand, he understands" },
        ],
      },
      {
        title: "Type 2: -ę / -isz (e.g. mówić)",
        body: "Add endings: -ę, -isz, -i, -imy, -icie, -ą. Note: consonant changes occur in the 'ja' and 'oni' forms.",
        examples: [
          { polish: "mówię, mówisz, mówi", english: "I speak, you speak, he speaks" },
          { polish: "mówimy, mówicie, mówią", english: "we speak, you (pl.) speak, they speak" },
          { polish: "noszę, nosisz, nosi, nosimy, nosicie, noszą", english: "I carry… (sz in ja/oni form)" },
        ],
        tip: "If the verb stem ends in -sz, -cz, -ż, -rz, or -dż, use -ysz instead of -isz, e.g. uczysz (not uczisz).",
      },
      {
        title: "Type 3: -ę / -esz (e.g. pracować)",
        body: "Remove -ować, add -uj-, then endings: -ę, -esz, -e, -emy, -ecie, -ą.",
        examples: [
          { polish: "pracuję, pracujesz, pracuje", english: "I work, you work, he works" },
          { polish: "pracujemy, pracujecie, pracują", english: "we work, you (pl.) work, they work" },
          { polish: "piję, pijesz, pije, pijemy, pijecie, piją", english: "I drink… (pić follows this pattern)" },
        ],
      },
      {
        title: "Dropping Subject Pronouns",
        body: "Because each verb form is unique per person, Poles often skip the pronoun — the verb ending carries the information.",
        examples: [
          { polish: "Mieszkam w Warszawie.", english: "I live in Warsaw. (no 'ja' needed)" },
          { polish: "Pracujesz w biurze?", english: "Do you work in an office? (no 'ty' needed)" },
          { polish: "Mówią po polsku.", english: "They speak Polish. (no 'oni' needed)" },
        ],
        tip: "Pronouns ARE used for emphasis or contrast: 'JA mieszkam w Warszawie, a ty?' = 'I live in Warsaw — what about you?'",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 4. NOMINATIVE CASE
  // ─────────────────────────────────────────────────────────────
  {
    moduleId: "noun_cases_nom",
    sections: [
      {
        title: "What is the Nominative Case?",
        body: "Polish has 7 grammatical cases — different noun endings that show the noun's role in a sentence. The nominative (mianownik) is the base form: the dictionary form. It answers the question 'kto?' (who?) or 'co?' (what?) and marks the subject of the sentence.",
        examples: [
          { polish: "Kto to jest? To mój przyjaciel.", english: "Who is it? It's my friend." },
          { polish: "Co jest na stole? Książka.", english: "What is on the table? A book." },
          { polish: "Pies śpi. Kot biega.", english: "The dog sleeps. The cat runs." },
        ],
        tip: "The nominative is the form you see in the dictionary. Always learn this form first, then learn how it changes in other cases.",
      },
      {
        title: "Nominative Singular Endings",
        body: "The nominative singular endings depend on the noun's gender — and the gender itself is usually visible from the ending.",
        examples: [
          { polish: "Masculine: consonant — kot, dom, lekarz", english: "cat, house, doctor" },
          { polish: "Masculine -a: mężczyzna, tata, kolega", english: "man, dad, colleague (grammatically masculine despite -a)" },
          { polish: "Feminine -a: mama, kawa, szkoła", english: "mom, coffee, school" },
          { polish: "Feminine consonant: sól, mysz, noc", english: "salt, mouse, night" },
          { polish: "Neuter -o/-e/-ę/-um: okno, słońce, imię, centrum", english: "window, sun, name, centre" },
        ],
      },
      {
        title: "Nominative Plural",
        body: "In the plural, masculine personal nouns (referring to groups with at least one man) have special endings. All other nouns use simpler patterns.",
        examples: [
          { polish: "koty, ołówki, kosze", english: "cats (-y/-i/-e for non-personal masc.)" },
          { polish: "ryby, paki, pomarańcze", english: "fish, packs, oranges (feminine)" },
          { polish: "jabłka, okna, piwa", english: "apples, windows, beers (neuter → -a)" },
          { polish: "lekarze, uczniowie, panowie", english: "doctors, students, gentlemen (masculine personal)" },
        ],
        tip: "Masculine personal plural is one of the trickiest areas in Polish. For now, focus on singular — plural patterns come with exposure.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 5. ACCUSATIVE CASE
  // ─────────────────────────────────────────────────────────────
  {
    moduleId: "noun_cases_acc",
    sections: [
      {
        title: "What is the Accusative Case?",
        body: "The accusative (biernik) marks the direct object — the thing or person that directly receives the action. It answers 'kogo?' (whom?) or 'co?' (what?). It is the most common case after the nominative.",
        examples: [
          { polish: "Lubię kawę.", english: "I like coffee. (kawa → kawę)" },
          { polish: "Mam brata.", english: "I have a brother. (brat → brata)" },
          { polish: "Czytam gazetę.", english: "I read a newspaper. (gazeta → gazetę)" },
          { polish: "Widzę psa.", english: "I see a dog. (pies → psa)" },
        ],
        tip: "Common verbs that take the accusative: mieć (have), lubić (like), kochać (love), widzieć (see), czytać (read), pisać (write), jeść (eat), pić (drink).",
      },
      {
        title: "Accusative Singular Changes",
        body: "Feminine nouns ending in -a change to -ę. Masculine animate nouns take a genitive-like -a ending. Inanimate masculine and all neuter nouns stay the same as the nominative.",
        examples: [
          { polish: "kawa → kawę, herbata → herbatę, mama → mamę", english: "Feminine -a → -ę" },
          { polish: "pies → psa, kot → kota, brat → brata", english: "Animate masculine → -a (genitive-like)" },
          { polish: "stół → stół, chleb → chleb, samochód → samochód", english: "Inanimate masculine → unchanged" },
          { polish: "okno → okno, miasto → miasto", english: "Neuter → unchanged" },
        ],
      },
      {
        title: "Negation Changes Accusative to Genitive",
        body: "This is one of the most important rules in Polish: when you negate a verb, the accusative object changes to the genitive case.",
        examples: [
          { polish: "Mam czas. → Nie mam czasu.", english: "I have time. → I don't have time." },
          { polish: "Lubię kawę. → Nie lubię kawy.", english: "I like coffee. → I don't like coffee." },
          { polish: "Widzę psa. → Nie widzę psa.", english: "I see the dog. → I don't see the dog." },
        ],
        tip: "In negation, feminine -ę becomes -y/-i, and the genitive ending for masculine animate (-a) stays the same — so 'Nie widzę psa' looks like accusative but is actually genitive.",
      },
      {
        title: "Accusative after Prepositions",
        body: "The accusative also appears after certain prepositions, especially with verbs of movement.",
        examples: [
          { polish: "Idę na zakupy.", english: "I'm going shopping. ('na' + acc. with movement)" },
          { polish: "Czekam na autobus.", english: "I'm waiting for the bus. ('na' + acc. after czekać)" },
          { polish: "Przez cały dzień pracuję.", english: "I work all day. ('przez' + acc.)" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 6. NEGATION
  // ─────────────────────────────────────────────────────────────
  {
    moduleId: "negation",
    sections: [
      {
        title: "Nie — The Negation Particle",
        body: "'Nie' is the single Polish word for 'no', 'not', and 'don't'. It always goes directly before the verb — there is no do/does auxiliary like in English.",
        examples: [
          { polish: "Mówię po polsku.", english: "I speak Polish." },
          { polish: "Nie mówię po polsku.", english: "I don't speak Polish." },
          { polish: "To jest prawda.", english: "That is true." },
          { polish: "To nie jest prawda.", english: "That is not true." },
        ],
        tip: "'Nie' and the verb are written as two separate words (never joined together), and 'nie' always comes immediately before the verb it negates.",
      },
      {
        title: "Accusative → Genitive After Negation",
        body: "When you negate a sentence, any direct object in the accusative case must shift to the genitive. This is one of the most distinctive rules of Polish grammar.",
        examples: [
          { polish: "Mam samochód. → Nie mam samochodu.", english: "I have a car. → I don't have a car." },
          { polish: "Lubię herbatę. → Nie lubię herbaty.", english: "I like tea. → I don't like tea." },
          { polish: "Widzę kota. → Nie widzę kota.", english: "I see the cat. → I don't see the cat." },
        ],
        tip: "A quick guide: feminine -ę → -y/-i (kawę → kawy), inanimate masc. + -u or consonant changes (samochód → samochodu), animate masc. -a → -a (psa → psa, same form).",
      },
      {
        title: "Double Negation",
        body: "Polish uses double (or even triple) negation — 'nie' stays even when you add words like 'nothing', 'nobody', 'never'. This is grammatically correct in Polish.",
        examples: [
          { polish: "Nic nie mam.", english: "I have nothing. (lit. 'Nothing I don't have')" },
          { polish: "Nikt nie rozumie.", english: "Nobody understands. (lit. 'Nobody doesn't understand')" },
          { polish: "Nigdy nie byłem w Polsce.", english: "I've never been to Poland." },
          { polish: "Nie mam nic.", english: "I don't have anything. (also correct word order)" },
        ],
        tip: "Using only 'nic' without 'nie' would be incorrect in Polish: you need both. 'Nic mam' is wrong — 'Nic nie mam' is right.",
      },
      {
        title: "Negating 'Być' (To Be)",
        body: "To negate the verb 'być' (to be), simply add 'nie' before it — no case changes apply to the predicate noun/adjective.",
        examples: [
          { polish: "Jestem studentem. → Nie jestem studentem.", english: "I am a student. → I am not a student." },
          { polish: "On jest zmęczony. → On nie jest zmęczony.", english: "He is tired. → He is not tired." },
          { polish: "Ona jest w domu. → Ona nie jest w domu.", english: "She is home. → She is not home." },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 7. QUESTION FORMS
  // ─────────────────────────────────────────────────────────────
  {
    moduleId: "question_forms",
    sections: [
      {
        title: "Yes/No Questions with 'Czy'",
        body: "'Czy' works like a question mark at the start of a sentence — it signals that you're asking a yes/no question. The word order after 'czy' stays the same as in a statement.",
        examples: [
          { polish: "Mówisz po polsku. → Czy mówisz po polsku?", english: "You speak Polish. → Do you speak Polish?" },
          { polish: "On jest studentem. → Czy on jest studentem?", english: "He is a student. → Is he a student?" },
          { polish: "Masz czas? (without 'czy')", english: "Do you have time? (rising intonation alone also works)" },
        ],
        tip: "You can skip 'czy' and just use rising intonation — but adding 'czy' makes it clearer that it's a question, especially in writing.",
      },
      {
        title: "Question Words",
        body: "Information questions use specific question words at the beginning of the sentence. Here are the essential ones for A1-A2:",
        examples: [
          { polish: "co — Co to jest?", english: "what — What is this?" },
          { polish: "kto — Kto tam jest?", english: "who — Who is there?" },
          { polish: "gdzie — Gdzie mieszkasz?", english: "where — Where do you live?" },
          { polish: "skąd — Skąd jesteś?", english: "where from — Where are you from?" },
          { polish: "kiedy — Kiedy przyjeżdżasz?", english: "when — When are you arriving?" },
          { polish: "jak — Jak masz na imię?", english: "how — What's your name?" },
          { polish: "dlaczego — Dlaczego uczysz się polskiego?", english: "why — Why are you learning Polish?" },
          { polish: "ile — Ile to kosztuje?", english: "how much/many — How much does it cost?" },
          { polish: "który — Który autobus jedzie do centrum?", english: "which — Which bus goes to the centre?" },
        ],
      },
      {
        title: "Key Question Phrases",
        body: "These fixed question phrases are used constantly in everyday Polish. Learn them as whole chunks.",
        examples: [
          { polish: "Jak masz na imię?", english: "What's your name? (lit. 'How do you have for a name?')" },
          { polish: "Ile masz lat?", english: "How old are you? (lit. 'How many years do you have?')" },
          { polish: "Jak się masz?", english: "How are you? (lit. 'How do you have yourself?')" },
          { polish: "Ile to kosztuje?", english: "How much does this cost?" },
          { polish: "Czy mówisz po angielsku?", english: "Do you speak English?" },
          { polish: "Gdzie jest toaleta?", english: "Where is the toilet?" },
        ],
        tip: "Polish question phrases often sound strange when translated literally. Learn them as fixed expressions rather than trying to analyse them word by word.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 8. NUMBERS & TIME
  // ─────────────────────────────────────────────────────────────
  {
    moduleId: "numbers",
    sections: [
      {
        title: "Cardinal Numbers 0–20",
        body: "Numbers 1–10 must be memorised. From 11–19, most end in -naście. 20 is 'dwadzieścia'.",
        examples: [
          { polish: "0 zero, 1 jeden, 2 dwa, 3 trzy, 4 cztery, 5 pięć", english: "zero, one, two, three, four, five" },
          { polish: "6 sześć, 7 siedem, 8 osiem, 9 dziewięć, 10 dziesięć", english: "six, seven, eight, nine, ten" },
          { polish: "11 jedenaście, 12 dwanaście, 13 trzynaście, 14 czternaście, 15 piętnaście", english: "eleven, twelve, thirteen, fourteen, fifteen" },
          { polish: "16 szesnaście, 17 siedemnaście, 18 osiemnaście, 19 dziewiętnaście, 20 dwadzieścia", english: "sixteen, seventeen, eighteen, nineteen, twenty" },
        ],
        tip: "A useful memory hook: 'pięć' (5) rhymes with English 'pence'. 'Osiem' (8) sounds a bit like 'awesome'. Mnemonics help!",
      },
      {
        title: "Tens and Hundreds",
        body: "Tens follow their own patterns. Hundreds combine 'sto' with number prefixes.",
        examples: [
          { polish: "20 dwadzieścia, 30 trzydzieści, 40 czterdzieści, 50 pięćdziesiąt", english: "twenty, thirty, forty, fifty" },
          { polish: "60 sześćdziesiąt, 70 siedemdziesiąt, 80 osiemdziesiąt, 90 dziewięćdziesiąt", english: "sixty, seventy, eighty, ninety" },
          { polish: "100 sto, 200 dwieście, 300 trzysta, 400 czterysta, 500 pięćset, 1000 tysiąc", english: "hundred, two hundred, three hundred, four hundred, five hundred, thousand" },
        ],
      },
      {
        title: "Numbers and Noun Agreement",
        body: "The form of the noun after a number depends on the number. This is one of the trickiest areas of Polish.",
        examples: [
          { polish: "1 samochód (nominative singular)", english: "1 car" },
          { polish: "2, 3, 4 samochody (nominative plural)", english: "2, 3, 4 cars" },
          { polish: "5+ samochodów (genitive plural)", english: "5+ cars" },
          { polish: "21 samochodów, 22 samochody, 25 samochodów", english: "21 cars, 22 cars, 25 cars (it's the last digit that matters!)" },
        ],
        tip: "Numbers ending in 2, 3, 4 (but NOT 12, 13, 14) use nominative plural. All others (5+, teens) use genitive plural. For now, just focus on 1–4 and beyond.",
      },
      {
        title: "Telling the Time",
        body: "To tell the time in Polish, you use ordinal numbers (like 'first', 'second') in the feminine form, because 'godzina' (hour) is feminine.",
        examples: [
          { polish: "Jest godzina pierwsza. (1:00)", english: "It is one o'clock." },
          { polish: "Jest godzina trzecia. (3:00)", english: "It is three o'clock." },
          { polish: "Jest siódma trzydzieści. (7:30)", english: "It is seven thirty." },
          { polish: "Jest dwunasta piętnaście. (12:15)", english: "It is twelve fifteen." },
        ],
        tip: "In casual speech, Poles often drop 'godzina' and just say the number: 'Jest trzecia' = 'It's three o'clock'.",
      },
      {
        title: "Ordinal Numbers",
        body: "Ordinal numbers (first, second…) behave like adjectives — they change form to agree with the noun's gender and case.",
        examples: [
          { polish: "1. pierwszy / pierwsza / pierwsze", english: "first (masc./fem./neut.)" },
          { polish: "2. drugi / druga / drugie", english: "second" },
          { polish: "3. trzeci / trzecia / trzecie", english: "third" },
          { polish: "5. piąty / piąta / piąte", english: "fifth" },
          { polish: "10. dziesiąty / dziesiąta / dziesiąte", english: "tenth" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 9. ADJECTIVE AGREEMENT
  // ─────────────────────────────────────────────────────────────
  {
    moduleId: "adjective_agreement",
    sections: [
      {
        title: "Adjectives Must Agree",
        body: "In Polish, every adjective must match the noun it describes in gender, number, and case. This is called grammatical agreement. The most important agreement is gender in the nominative singular.",
        examples: [
          { polish: "duży dom (masc.)", english: "big house — -y ending" },
          { polish: "duża kawa (fem.)", english: "big coffee — -a ending" },
          { polish: "duże miasto (neut.)", english: "big city — -e ending" },
        ],
        tip: "A quick rule: masculine = -y or -i, feminine = -a, neuter = -e or -ie.",
      },
      {
        title: "Nominative Singular Endings",
        body: "These are the base forms of adjectives. Masculine uses -y/-i (depends on the final consonant of the stem), feminine uses -a, neuter uses -e/-ie.",
        examples: [
          { polish: "duży, stary, dobry, nowy (masc.)", english: "big, old, good, new" },
          { polish: "duża, stara, dobra, nowa (fem.)", english: "big, old, good, new" },
          { polish: "duże, stare, dobre, nowe (neut.)", english: "big, old, good, new" },
          { polish: "wysoki → wysoki (masc.), wysoka (fem.), wysokie (neut.)", english: "tall — -i ending after k/g" },
        ],
      },
      {
        title: "Adjectives Change with Cases Too",
        body: "Adjectives don't just change with gender — they also change in every case, just like nouns. Here are the most common accusative changes for A1–A2 learners:",
        examples: [
          { polish: "Lubię dobrego przyjaciela. (masc. animate acc.)", english: "I like a good friend. (-ego ending)" },
          { polish: "Widzę ładną kobietę. (fem. acc.)", english: "I see a pretty woman. (-ą ending)" },
          { polish: "Mam nowe auto. (neut. acc.)", english: "I have a new car. (-e, same as nominative)" },
        ],
        tip: "For now, focus on getting the nominative right. The accusative and other cases come naturally with more practice.",
      },
      {
        title: "Comparatives and Superlatives",
        body: "To compare adjectives, add -szy or -ejszy. Superlatives add the prefix naj- to the comparative form.",
        examples: [
          { polish: "szybki → szybszy → najszybszy", english: "fast → faster → fastest" },
          { polish: "dobry → lepszy → najlepszy", english: "good → better → best (irregular)" },
          { polish: "duży → większy → największy", english: "big → bigger → biggest (irregular)" },
          { polish: "mały → mniejszy → najmniejszy", english: "small → smaller → smallest (irregular)" },
          { polish: "interesujący → bardziej interesujący", english: "interesting → more interesting (descriptive form)" },
        ],
        tip: "Some very common adjectives have irregular comparative forms. Memorise: dobry/lepszy, duży/większy, mały/mniejszy, zły/gorszy.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 10. PREPOSITIONS
  // ─────────────────────────────────────────────────────────────
  {
    moduleId: "common_prepositions",
    sections: [
      {
        title: "Prepositions Govern Cases",
        body: "Every Polish preposition requires the noun that follows it to be in a specific grammatical case. Learning which case each preposition triggers is essential.",
        examples: [
          { polish: "'w' + locative — Jestem w domu.", english: "'in' (enclosed space) — I'm at home." },
          { polish: "'na' + locative — Siedzę na kanapie.", english: "'on/at' (surface/open) — I'm sitting on the sofa." },
          { polish: "'do' + genitive — Idę do sklepu.", english: "'to' (movement toward) — I'm going to the shop." },
          { polish: "'z' + genitive — Wracam z pracy.", english: "'from/with' — I'm coming back from work." },
          { polish: "'przy' + locative — Stoję przy oknie.", english: "'near/by' — I'm standing by the window." },
          { polish: "'bez' + genitive — Bez ciebie.", english: "'without' — Without you." },
          { polish: "'dla' + genitive — To jest dla ciebie.", english: "'for' — This is for you." },
        ],
        tip: "'Do' (to) is for movement toward a destination and always takes the genitive. Don't confuse it with 'w' (in), which takes the locative and expresses location.",
      },
      {
        title: "'W' vs. 'Na' — Location",
        body: "Both 'w' and 'na' can mean 'at/in' for locations, but which one to use depends on the specific place — it's often a matter of convention rather than logic.",
        examples: [
          { polish: "w domu, w szkole, w mieście, w Polsce", english: "'w' — at home, at school, in the city, in Poland" },
          { polish: "na poczcie, na lotnisku, na ulicy, na plaży", english: "'na' — at the post office, at the airport, in the street, at the beach" },
          { polish: "w kawiarni, w restauracji, w sklepie", english: "'w' — in the café, in the restaurant, in the shop" },
          { polish: "na stacji, na dworcu, na rynku", english: "'na' — at the station, at the railway station, in the market square" },
        ],
        tip: "Unfortunately, 'w' vs. 'na' for locations must often be memorised per place. Open/public spaces and outdoor locations tend to use 'na'; enclosed buildings use 'w'.",
      },
      {
        title: "Movement Prepositions: Do, Na, Z",
        body: "When talking about going TO a place, use 'do' (for most places) or 'na' (for certain places). For coming FROM a place, use 'z' (from).",
        examples: [
          { polish: "Idę do sklepu / do szkoły / do kawiarni.", english: "I'm going to the shop / school / café." },
          { polish: "Idę na pocztę / na dworzec / na plażę.", english: "I'm going to the post office / station / beach." },
          { polish: "Wracam ze sklepu / ze szkoły / z kawiarni.", english: "I'm coming back from the shop / school / café." },
          { polish: "Wracam z poczty / z dworca / z plaży.", english: "I'm coming back from the post office / station / beach." },
        ],
        tip: "The preposition for 'to' matches the preposition for 'in/at': if you say 'na poczcie' (at the post office), then going there is 'na pocztę', and returning is 'z poczty'.",
      },
      {
        title: "Other Common Prepositions",
        body: "Here are additional prepositions you'll encounter frequently at A1–A2 level:",
        examples: [
          { polish: "'o' + locative — Rozmawiamy o tym.", english: "'about' — We're talking about it." },
          { polish: "'po' + locative — Chodzę po mieście.", english: "'around/after' — I walk around the city." },
          { polish: "'przed' + instrumental — Stoję przed domem.", english: "'in front of' — I'm standing in front of the house." },
          { polish: "'za' + instrumental — To jest za rogiem.", english: "'behind/beyond' — It's around the corner." },
          { polish: "'między' + instrumental — Siedzę między nimi.", english: "'between' — I'm sitting between them." },
          { polish: "'przez' + accusative — Szłam przez park.", english: "'through' — I walked through the park." },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 11. PAST TENSE
  // ─────────────────────────────────────────────────────────────
  {
    moduleId: "past_tense",
    sections: [
      {
        title: "Past Tense Agrees with Gender",
        body: "Polish past tense is unique: the verb ending changes depending on the gender of the subject. A male speaker says 'byłem', a female speaker says 'byłam'. This applies to all verbs.",
        examples: [
          { polish: "ja (masc.) byłem / ja (fem.) byłam", english: "I was (male) / I was (female)" },
          { polish: "ty (masc.) byłeś / ty (fem.) byłaś", english: "you were (male) / you were (female)" },
          { polish: "on był / ona była / ono było", english: "he was / she was / it was" },
          { polish: "my (masc.) byliśmy / my (fem.) byłyśmy", english: "we were (mixed/masc.) / we were (all-female)" },
          { polish: "oni byli / one były", english: "they were (mixed/masc.) / they were (all-female)" },
        ],
        tip: "In a mixed group (even one man among many women), use the masculine form. 'Byliśmy' = at least one man in the group. 'Byłyśmy' = all female.",
      },
      {
        title: "Forming the Past Tense",
        body: "Take the infinitive, remove -ć, and add the past tense suffix. The core suffix is -ł- (masculine singular), -ła- (feminine singular), -ło- (neuter), -li- (masc. personal plural), -ły- (other plural). Then add personal endings.",
        examples: [
          { polish: "pracować → pracował (he) / pracowała (she) / pracowali (they, masc.)", english: "to work → he worked / she worked / they worked" },
          { polish: "mówić → mówił / mówiła / mówili / mówiły", english: "to speak → he spoke / she spoke / they (masc.) / they (fem.)" },
          { polish: "czytać → czytałem / czytałam / czytałeś / czytałaś", english: "I read (masc.) / I read (fem.) / you read (masc.) / you read (fem.)" },
        ],
      },
      {
        title: "Irregular Past Forms",
        body: "Some of the most common verbs have irregular past stems. These must be memorised.",
        examples: [
          { polish: "być → był / była / byli", english: "to be → he was / she was / they were" },
          { polish: "iść → szedł / szła / szli", english: "to go (on foot) → he went / she went / they went" },
          { polish: "jeść → jadł / jadła / jedli", english: "to eat → he ate / she ate / they ate" },
          { polish: "wiedzieć → wiedział / wiedziała / wiedzieli", english: "to know → he knew / she knew / they knew" },
        ],
        tip: "The verb 'iść' (to go, one-time) has one of the most irregular past forms in Polish. 'Szedłem/szłam do sklepu' = I was going/walked to the shop.",
      },
      {
        title: "Perfective vs. Imperfective",
        body: "Polish verbs come in pairs: imperfective (ongoing/repeated) and perfective (completed). In the past tense, this distinction matters a lot.",
        examples: [
          { polish: "pisać (imperf.) → pisałem list", english: "I was writing a letter. (process, ongoing)" },
          { polish: "napisać (perf.) → napisałem list", english: "I wrote a letter. (completed result)" },
          { polish: "robić → robiłam / zrobić → zrobiłam", english: "I was doing / I did (and finished)" },
          { polish: "czytać → czytał / przeczytać → przeczytał", english: "he was reading / he read (finished the book)" },
        ],
        tip: "For beginners, focus on using the imperfective past (the -ał/-ała forms without a prefix). Perfectivity becomes clearer as you advance.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 12. EVERYDAY PHRASES
  // ─────────────────────────────────────────────────────────────
  {
    moduleId: "everyday_sentences",
    sections: [
      {
        title: "Greetings",
        body: "Polish greetings differ depending on the time of day and the level of formality. Cześć is informal, Dzień dobry is always safe.",
        examples: [
          { polish: "Cześć! / Hej!", english: "Hi! / Hey! (informal)" },
          { polish: "Dzień dobry!", english: "Good day! / Good morning! (formal, used until evening)" },
          { polish: "Dobry wieczór!", english: "Good evening! (formal)" },
          { polish: "Dobranoc!", english: "Good night! (when saying goodbye at night)" },
          { polish: "Do widzenia! / Cześć! / Pa pa!", english: "Goodbye! (formal) / Bye! (informal) / Bye bye!" },
        ],
        tip: "'Dzień dobry' is safe in all formal situations — shops, offices, meeting new people. Use 'Cześć' only with people you know well.",
      },
      {
        title: "Politeness Essentials",
        body: "These few words will take you very far. Learn them first.",
        examples: [
          { polish: "Dziękuję. / Dziękuję bardzo.", english: "Thank you. / Thank you very much." },
          { polish: "Proszę.", english: "Please / Here you go / You're welcome. (context-dependent)" },
          { polish: "Przepraszam.", english: "Excuse me / I'm sorry. (getting attention or apologising)" },
          { polish: "Nie ma za co.", english: "Don't mention it / You're welcome." },
          { polish: "Przepraszam, nie rozumiem.", english: "Sorry, I don't understand." },
          { polish: "Czy mówi pan/pani po angielsku?", english: "Do you speak English? (formal, to a man/woman)" },
        ],
        tip: "'Proszę' is extremely versatile — a waiter saying it means 'here is your order', someone holding a door says it meaning 'after you', and you say it when asking for something meaning 'please'.",
      },
      {
        title: "Introducing Yourself",
        body: "Key phrases for introductions — a must for any first conversation.",
        examples: [
          { polish: "Jak masz na imię? / Jak pan/pani ma na imię?", english: "What's your name? (informal / formal)" },
          { polish: "Mam na imię Anna. / Nazywam się Anna Kowalska.", english: "My name is Anna. / My name is Anna Kowalska." },
          { polish: "Skąd jesteś? / Skąd pan/pani jest?", english: "Where are you from? (informal / formal)" },
          { polish: "Jestem z Anglii / z Polski / z Ameryki.", english: "I'm from England / Poland / America." },
          { polish: "Miło mi cię poznać. / Miło mi pana/panią poznać.", english: "Nice to meet you. (informal / formal)" },
        ],
        tip: "Polish has formal (pan/pani) and informal (ty) address. Use pan (for men) and pani (for women) with strangers, older people, and in professional settings.",
      },
      {
        title: "Survival Phrases",
        body: "These phrases will help you navigate real-life situations in Poland.",
        examples: [
          { polish: "Ile to kosztuje?", english: "How much does it cost?" },
          { polish: "Gdzie jest toaleta / dworzec / apteka?", english: "Where is the toilet / station / pharmacy?" },
          { polish: "Poproszę kawę / herbatę / wodę.", english: "I'd like coffee / tea / water, please." },
          { polish: "Nie mówię dobrze po polsku.", english: "I don't speak Polish well." },
          { polish: "Proszę mówić wolniej.", english: "Please speak more slowly." },
          { polish: "Jak to się mówi po polsku?", english: "How do you say that in Polish?" },
        ],
        tip: "'Poproszę' (I would like, please) is a polite way to order or request something. It's more natural than 'chcę' (I want) in shops and restaurants.",
      },
    ],
  },
];

export function getLearningResource(moduleId: string): LearningResource | undefined {
  return LEARNING_RESOURCES.find((r) => r.moduleId === moduleId);
}
