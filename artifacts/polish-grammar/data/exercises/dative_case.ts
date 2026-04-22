import type { Exercise } from "../modules";

export const dativeCaseExercises: Exercise[] = [
  { id: "dat_mc_001", type: "multiple_choice", question: "The dative case marks the...?", options: ["subject", "direct object", "indirect object / recipient", "location"], correctAnswer: "indirect object / recipient", explanation: "Dative = recipient of an action: 'I gave the book TO HER' — 'her' is dative." },
  { id: "dat_mc_002", type: "multiple_choice", question: "Dative of 'mama' (mum, fem.)?", options: ["mamę", "mamą", "mamie", "mamy"], correctAnswer: "mamie", explanation: "Feminine -a nouns: -a → -ie in dative. mama → mamie." },
  { id: "dat_mc_003", type: "multiple_choice", question: "Dative of 'brat' (brother, masc.)?", options: ["brata", "brat", "bratu", "bratowi"], correctAnswer: "bratowi", explanation: "Masculine nouns take -owi in dative: brat → bratowi." },
  { id: "dat_mc_004", type: "multiple_choice", question: "Dative of 'dziecko' (child, neuter)?", options: ["dzieci", "dziecku", "dzieckiem", "dziecka"], correctAnswer: "dziecku", explanation: "Neuter nouns take -u in dative: dziecko → dziecku." },
  { id: "dat_mc_005", type: "multiple_choice", question: "Complete: 'Daję ___ prezent.' (I give a present to my sister – siostra, fem.)", options: ["siostrę", "siostrą", "siostry", "siostrze"], correctAnswer: "siostrze", explanation: "Dative of siostra: -a → -ze. Daję siostrze prezent." },
  { id: "dat_mc_006", type: "multiple_choice", question: "Complete: 'Powiem ___ prawdę.' (I'll tell the teacher the truth – nauczyciel, masc.)", options: ["nauczyciela", "nauczycielowi", "nauczycielem", "nauczycielu"], correctAnswer: "nauczycielowi", explanation: "Powiedzieć (to tell) + dative recipient. nauczyciel → nauczycielowi." },
  { id: "dat_mc_007", type: "multiple_choice", question: "Which verb takes dative for its recipient?", options: ["lubić (to like)", "widzieć (to see)", "pomagać (to help)", "czytać (to read)"], correctAnswer: "pomagać (to help)", explanation: "Pomagać + dative: pomagam mamie (I help mum)." },
  { id: "dat_mc_008", type: "multiple_choice", question: "Complete: 'Dziękuję ___.' (I thank you – ty)", options: ["cię", "tobie/ci", "tobą", "twoim"], correctAnswer: "tobie/ci", explanation: "Dziękować (to thank) takes dative. Ty → tobie or short form ci." },
  { id: "dat_mc_009", type: "multiple_choice", question: "Dative of 'kot' (cat, masc.)?", options: ["kota", "kotowi", "kotem", "kocie"], correctAnswer: "kotowi", explanation: "Masculine animate: kot → kotowi." },
  { id: "dat_mc_010", type: "multiple_choice", question: "Complete: 'To podoba się ___.' (She likes it – ona)", options: ["ją", "jej", "jąs", "ona"], correctAnswer: "jej", explanation: "Podobać się (to be liked by) takes dative. Ona → jej." },
  { id: "dat_mc_011", type: "multiple_choice", question: "Dative of 'on' (he)?", options: ["go", "mu", "jego", "nim"], correctAnswer: "mu", explanation: "Dative of 'on': mu (short form) or jemu (long form)." },
  { id: "dat_mc_012", type: "multiple_choice", question: "Dative of 'ja' (I)?", options: ["mnie", "mi", "mną", "me"], correctAnswer: "mi", explanation: "Dative of 'ja': mi (short form) or mnie (long form)." },
  { id: "dat_mc_013", type: "multiple_choice", question: "Complete: 'Kupiłem ___ kwiaty.' (I bought her flowers – ona)", options: ["ją", "niej", "jej", "nią"], correctAnswer: "jej", explanation: "Ona → jej (dative). Kupiłem jej kwiaty." },
  { id: "dat_mc_014", type: "multiple_choice", question: "Which preposition takes dative?", options: ["do", "z (from)", "dzięki (thanks to)", "bez"], correctAnswer: "dzięki (thanks to)", explanation: "'Dzięki' (thanks to) takes dative: dzięki tobie (thanks to you)." },
  { id: "dat_mc_015", type: "multiple_choice", question: "Complete: 'Ufam ___.' (I trust my friend – przyjaciel, masc.)", options: ["przyjaciela", "przyjacielowi", "przyjacielem", "przyjacielu"], correctAnswer: "przyjacielowi", explanation: "Ufać (to trust) takes dative: przyjaciel → przyjacielowi." },
  { id: "dat_mc_016", type: "multiple_choice", question: "Dative of 'Warszawa' (Warsaw, fem.)?", options: ["Warszawę", "Warszawy", "Warszawie", "Warszawą"], correctAnswer: "Warszawie", explanation: "Warszawa → Warszawie (dat. fem.)." },
  { id: "dat_mc_017", type: "multiple_choice", question: "Dative of 'Polska' (Poland, fem.)?", options: ["Polskę", "Polski", "Polsce", "Polską"], correctAnswer: "Polsce", explanation: "Polska → Polsce (dat. fem.)." },
  { id: "dat_mc_018", type: "multiple_choice", question: "Complete: 'Przeszkadzasz ___.' (You disturb me – ja)", options: ["mnie/mi", "mną", "moim", "moje"], correctAnswer: "mnie/mi", explanation: "Przeszkadzać (to disturb) takes dative. Ja → mi/mnie." },
  { id: "dat_mc_019", type: "multiple_choice", question: "Dative plural of 'dzieci' (children)?", options: ["dzieci", "dzieciom", "dziecmi", "dziecia"], correctAnswer: "dzieciom", explanation: "Dative plural takes -om: dzieciom (to the children)." },
  { id: "dat_mc_020", type: "multiple_choice", question: "Complete: 'Wierzy ___ lekarzowi.' (He trusts the doctor)", options: ["lekarzem", "lekarza", "lekarzowi", "lekarzu"], correctAnswer: "lekarzowi", explanation: "Wierzyć (to believe/trust) + dative: lekarz → lekarzowi." },

  { id: "dat_fb_001", type: "fill_blank", question: "Fill in dative: 'Daję ___ (tata) jedzenie.'", sentence: "Daję ___ jedzenie.", blanks: ["tacie"], explanation: "tata (masc. but -a ending) → tacie in dative." },
  { id: "dat_fb_002", type: "fill_blank", question: "Fill in dative: 'Pomagam ___ (mama).'", sentence: "Pomagam ___.", blanks: ["mamie"], explanation: "mama → mamie (dat. fem.)." },
  { id: "dat_fb_003", type: "fill_blank", question: "Fill in dative: 'On ___ (ja) pomógł.' (He helped me)", sentence: "On ___ pomógł.", blanks: ["mi"], explanation: "Dative of 'ja' = mi (short form). Pomagać + dative." },
  { id: "dat_fb_004", type: "fill_blank", question: "Fill in dative: 'Dziękuję ___ (pan).'", sentence: "Dziękuję ___.", blanks: ["panu"], explanation: "pan (sir/Mr., masc.) → panu (dat.). Dziękuję panu = Thank you, sir." },
  { id: "dat_fb_005", type: "fill_blank", question: "Fill in dative: 'Kupiłam ___ (pies) smakołyk.'", sentence: "Kupiłam ___ smakołyk.", blanks: ["psu"], explanation: "pies → psu (dat.). Short irregular form." },

  { id: "dat_match_001", type: "matching", question: "Match each noun to its dative form.", pairs: [
    { left: "mama", right: "mamie" },
    { left: "brat", right: "bratowi" },
    { left: "dziecko", right: "dziecku" },
    { left: "ja", right: "mi / mnie" },
    { left: "on", right: "mu / jemu" },
  ]},
  { id: "dat_match_002", type: "matching", question: "Match each verb to a dative example.", pairs: [
    { left: "dawać (to give)", right: "daję mamie" },
    { left: "pomagać (to help)", right: "pomagam siostrze" },
    { left: "dziękować (to thank)", right: "dziękuję ci" },
    { left: "ufać (to trust)", right: "ufam przyjacielowi" },
  ]},

  { id: "dat_sb_001", type: "sentence_builder", question: "Build: 'I give mum a present.'", words: ["Daję", "mamie", "prezent", "."], correctOrder: ["Daję", "mamie", "prezent", "."] },
  { id: "dat_sb_002", type: "sentence_builder", question: "Build: 'She helps her brother.'", words: ["Ona", "pomaga", "bratu", "."], correctOrder: ["Ona", "pomaga", "bratu", "."] },

  { id: "dat_ec_001", type: "error_correction", question: "Correct the dative:", wrongSentence: "Daję mama kwiaty.", correctedSentence: "Daję mamie kwiaty.", explanation: "mama → mamie (dative, recipient). Daję mamie kwiaty." },
  { id: "dat_ec_002", type: "error_correction", question: "Correct the verb + dative:", wrongSentence: "Dziękuję cię za pomoc.", correctedSentence: "Dziękuję ci za pomoc.", explanation: "Dziękować takes dative, not accusative. ty → ci (dat.), not cię (acc.)." },
];
