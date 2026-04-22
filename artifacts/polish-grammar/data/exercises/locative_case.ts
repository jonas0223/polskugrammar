import type { Exercise } from "../modules";

export const locativeCaseExercises: Exercise[] = [
  { id: "loc_mc_001", type: "multiple_choice", question: "The locative case is ALWAYS used with...?", options: ["no preposition", "a preposition", "a numeral", "negation"], correctAnswer: "a preposition", explanation: "The locative never stands alone — it always follows a preposition like w, na, o, przy, po." },
  { id: "loc_mc_002", type: "multiple_choice", question: "Locative of 'dom' (house, masc.)?", options: ["domu", "domem", "domu", "domu"], correctAnswer: "domu", explanation: "Masculine nouns often take -u in locative: dom → domu. (w domu = at home)" },
  { id: "loc_mc_003", type: "multiple_choice", question: "Locative of 'Warszawa' (Warsaw, fem.)?", options: ["Warszawy", "Warszawę", "Warszawie", "Warszawą"], correctAnswer: "Warszawie", explanation: "Feminine -a nouns: -a → -ie in locative. Warszawa → Warszawie." },
  { id: "loc_mc_004", type: "multiple_choice", question: "Locative of 'miasto' (city, neuter)?", options: ["miastem", "miast", "mieście", "miastu"], correctAnswer: "mieście", explanation: "Neuter -o nouns: -o → -ie/-e in locative. miasto → mieście." },
  { id: "loc_mc_005", type: "multiple_choice", question: "Complete: 'Mieszkam ___ Krakowie.' (I live in Kraków)", options: ["do", "z", "w", "na"], correctAnswer: "w", explanation: "'W' (in) + locative for enclosed places: w Krakowie." },
  { id: "loc_mc_006", type: "multiple_choice", question: "Complete: 'Jestem ___ poczcie.' (I'm at the post office – poczta, fem.)", options: ["w", "do", "z", "na"], correctAnswer: "na", explanation: "'Na' is used for public institutions and open spaces: na poczcie." },
  { id: "loc_mc_007", type: "multiple_choice", question: "Complete: 'Mówię ___ pogodzie.' (I'm talking about the weather – pogoda)", options: ["w", "na", "o", "przy"], correctAnswer: "o", explanation: "'O' (about) + locative: Mówię o pogodzie." },
  { id: "loc_mc_008", type: "multiple_choice", question: "Locative of 'szkoła' (school, fem.)?", options: ["szkoły", "szkołę", "szkole", "szkołą"], correctAnswer: "szkole", explanation: "szkoła → szkole (loc. fem.). w szkole = in school." },
  { id: "loc_mc_009", type: "multiple_choice", question: "Complete: 'Siedzę ___ kanapie.' (I'm sitting on the sofa – kanapa, fem.)", options: ["do", "w", "na", "z"], correctAnswer: "na", explanation: "'Na' (on) + locative: na kanapie." },
  { id: "loc_mc_010", type: "multiple_choice", question: "Locative of 'Polska' (Poland, fem.)?", options: ["Polski", "Polsce", "Polskę", "Polską"], correctAnswer: "Polsce", explanation: "Polska → Polsce (loc. fem.). w Polsce = in Poland." },
  { id: "loc_mc_011", type: "multiple_choice", question: "Complete: 'Pracuję ___ biurze.' (I work in an office – biuro)", options: ["na", "do", "w", "z"], correctAnswer: "w", explanation: "'W' + locative for enclosed workplaces: biuro → biurze. w biurze." },
  { id: "loc_mc_012", type: "multiple_choice", question: "Locative of 'Polska' used in 'I live in Poland'?", options: ["Polskę", "Polski", "Polsce", "Polską"], correctAnswer: "Polsce", explanation: "Mieszkam w Polsce. Polsce = locative of Polska." },
  { id: "loc_mc_013", type: "multiple_choice", question: "Locative of 'stół' (table, masc.)?", options: ["stołu", "stołem", "stole", "stołowi"], correctAnswer: "stole", explanation: "stół → stole (loc. masc.). na stole = on the table." },
  { id: "loc_mc_014", type: "multiple_choice", question: "Complete: 'Myślę ___ tobie.' (I'm thinking about you – ty)", options: ["o", "w", "na", "przy"], correctAnswer: "o", explanation: "'O' (about) + locative. ty → tobie. Myślę o tobie." },
  { id: "loc_mc_015", type: "multiple_choice", question: "Locative of 'pies' (dog, masc.)?", options: ["psem", "psie", "psa", "psu"], correctAnswer: "psie", explanation: "pies → psie (loc. masc.). o psie = about the dog." },
  { id: "loc_mc_016", type: "multiple_choice", question: "Complete: 'Uczę się ___ historii.' (I study/learn about history – historia)", options: ["o", "do", "w", "na"], correctAnswer: "o", explanation: "Uczyć się (o) = to learn about. historia → historii. o historii." },
  { id: "loc_mc_017", type: "multiple_choice", question: "Locative of 'kino' (cinema, neuter)?", options: ["kina", "kinu", "kinie", "kinem"], correctAnswer: "kinie", explanation: "kino → kinie (loc. neuter). w kinie = at the cinema." },
  { id: "loc_mc_018", type: "multiple_choice", question: "Complete: 'Stoję ___ oknie.' (I'm standing by the window)", options: ["przy", "o", "do", "w"], correctAnswer: "przy", explanation: "'Przy' (next to/by) + locative: okno → oknie. Przy oknie." },
  { id: "loc_mc_019", type: "multiple_choice", question: "Locative of 'Niemcy' (Germany, pl.)?", options: ["Niemcach", "Niemców", "Niemcom", "Niemcami"], correctAnswer: "Niemcach", explanation: "Locative plural: -ach. w Niemczech → standard form. (w Niemczech = in Germany)." },
  { id: "loc_mc_020", type: "multiple_choice", question: "Which sentence is correct?", options: ["Jestem w Warszawo.", "Jestem w Warszawa.", "Jestem w Warszawie.", "Jestem w Warszawą."], correctAnswer: "Jestem w Warszawie.", explanation: "'W' + locative: Warszawa → Warszawie. Jestem w Warszawie." },

  { id: "loc_fb_001", type: "fill_blank", question: "Fill in: 'Mieszkam w ___ (Polska).'", sentence: "Mieszkam w ___.", blanks: ["Polsce"], explanation: "Polska → Polsce (locative). w Polsce = in Poland." },
  { id: "loc_fb_002", type: "fill_blank", question: "Fill in: 'Pracuję na ___ (poczta).'", sentence: "Pracuję na ___.", blanks: ["poczcie"], explanation: "poczta → poczcie (locative fem.). na poczcie = at the post office." },
  { id: "loc_fb_003", type: "fill_blank", question: "Fill in: 'Leżę na ___ (łóżko, bed, neuter).'", sentence: "Leżę na ___.", blanks: ["łóżku"], explanation: "łóżko → łóżku (locative neut.). na łóżku = on the bed." },
  { id: "loc_fb_004", type: "fill_blank", question: "Fill in: 'Rozmawiamy o ___ (film, masc.).'", sentence: "Rozmawiamy o ___.", blanks: ["filmie"], explanation: "film → filmie (loc. masc.). o filmie = about the film." },
  { id: "loc_fb_005", type: "fill_blank", question: "Fill in: 'Siedzę w ___ (samochód, masc.).'", sentence: "Siedzę w ___.", blanks: ["samochodzie"], explanation: "samochód → samochodzie (loc. masc.). w samochodzie = in the car." },

  { id: "loc_match_001", type: "matching", question: "Match each noun to its locative form.", pairs: [
    { left: "dom", right: "domu" },
    { left: "szkoła", right: "szkole" },
    { left: "miasto", right: "mieście" },
    { left: "Polska", right: "Polsce" },
    { left: "kino", right: "kinie" },
  ]},
  { id: "loc_match_002", type: "matching", question: "Match the preposition to a locative example.", pairs: [
    { left: "w (in)", right: "w domu" },
    { left: "na (on/at)", right: "na stole" },
    { left: "o (about)", right: "o muzyce" },
    { left: "przy (by/next to)", right: "przy oknie" },
  ]},

  { id: "loc_sb_001", type: "sentence_builder", question: "Build: 'I live in Warsaw.'", words: ["Mieszkam", "w", "Warszawie", "."], correctOrder: ["Mieszkam", "w", "Warszawie", "."] },
  { id: "loc_sb_002", type: "sentence_builder", question: "Build: 'The book is on the table.'", words: ["Książka", "jest", "na", "stole", "."], correctOrder: ["Książka", "jest", "na", "stole", "."] },

  { id: "loc_ec_001", type: "error_correction", question: "Correct the locative:", wrongSentence: "Mieszkam w Polska.", correctedSentence: "Mieszkam w Polsce.", explanation: "'W' + locative: Polska → Polsce." },
  { id: "loc_ec_002", type: "error_correction", question: "Correct the locative:", wrongSentence: "Jestem w szkoła.", correctedSentence: "Jestem w szkole.", explanation: "'W' + locative: szkoła → szkole." },
];
