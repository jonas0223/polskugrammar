import type { Exercise } from "../modules";

export const instrumentalCaseExercises: Exercise[] = [
  { id: "ins_mc_001", type: "multiple_choice", question: "The instrumental case is used after 'być' (to be) for...?", options: ["location", "direct object", "professions and identity", "negation"], correctAnswer: "professions and identity", explanation: "After być: Jestem studentem (I am a student). The noun following być takes instrumental." },
  { id: "ins_mc_002", type: "multiple_choice", question: "Instrumental of 'student' (masc.)?", options: ["studenta", "studentowi", "studentem", "studencie"], correctAnswer: "studentem", explanation: "Masculine nouns take -em in instrumental: student → studentem." },
  { id: "ins_mc_003", type: "multiple_choice", question: "Instrumental of 'nauczycielka' (female teacher, fem.)?", options: ["nauczycielki", "nauczycielkę", "nauczycielką", "nauczycielce"], correctAnswer: "nauczycielką", explanation: "Feminine nouns take -ą in instrumental: nauczycielka → nauczycielką." },
  { id: "ins_mc_004", type: "multiple_choice", question: "Instrumental of 'dziecko' (child, neuter)?", options: ["dziecka", "dziecku", "dzieckiem", "dzieciom"], correctAnswer: "dzieckiem", explanation: "Neuter nouns take -em/-iem: dziecko → dzieckiem." },
  { id: "ins_mc_005", type: "multiple_choice", question: "Complete: 'Jestem ___.' (I am a doctor – lekarz, masc.)", options: ["lekarza", "lekarzu", "lekarzem", "lekarzowi"], correctAnswer: "lekarzem", explanation: "After być, profession in instrumental: lekarz → lekarzem." },
  { id: "ins_mc_006", type: "multiple_choice", question: "Complete: 'Ona jest ___.' (She is a teacher – nauczycielka)", options: ["nauczycielką", "nauczycielki", "nauczycielkę", "nauczycielce"], correctAnswer: "nauczycielką", explanation: "Profession after być: nauczycielka → nauczycielką." },
  { id: "ins_mc_007", type: "multiple_choice", question: "Complete: 'Jadę ___.' (I travel by bus – autobus, inan. masc.)", options: ["autobusu", "autobusem", "autobusowi", "autobus"], correctAnswer: "autobusem", explanation: "Means of transport use instrumental: autobusem = by bus." },
  { id: "ins_mc_008", type: "multiple_choice", question: "Complete: 'Piszę ___.' (I write with a pen – długopis, inan. masc.)", options: ["długopisu", "długopisem", "długopisowi", "długopis"], correctAnswer: "długopisem", explanation: "Tool or instrument takes instrumental: długopis → długopisem." },
  { id: "ins_mc_009", type: "multiple_choice", question: "Complete: 'Idę z ___.' (I'm going with my friend – przyjaciel, masc.)", options: ["przyjaciela", "przyjacielem", "przyjacielowi", "przyjacielu"], correctAnswer: "przyjacielem", explanation: "'Z' (with, meaning together with) takes instrumental: przyjaciel → przyjacielem." },
  { id: "ins_mc_010", type: "multiple_choice", question: "Instrumental of 'kawa' (coffee, fem.) — 'coffee with milk'?", options: ["kawę", "kawą", "kawy", "kawie"], correctAnswer: "kawą", explanation: "'Z kawą' = with coffee. kawa → kawą (instrumental)." },
  { id: "ins_mc_011", type: "multiple_choice", question: "Complete: 'Byłem ___.' (I was a child – dziecko)", options: ["dziecko", "dziecka", "dziecku", "dzieckiem"], correctAnswer: "dzieckiem", explanation: "After być in past tense, instrumental: dziecko → dzieckiem." },
  { id: "ins_mc_012", type: "multiple_choice", question: "Instrumental of 'kobieta' (woman, fem.)?", options: ["kobietę", "kobiety", "kobietą", "kobiecie"], correctAnswer: "kobietą", explanation: "kobieta → kobietą (instrumental fem.)." },
  { id: "ins_mc_013", type: "multiple_choice", question: "Complete: 'Między ___ a domem.' (Between the school and the house – szkoła)", options: ["szkoły", "szkole", "szkołą", "szkołę"], correctAnswer: "szkołą", explanation: "'Między' (between) takes instrumental: szkoła → szkołą." },
  { id: "ins_mc_014", type: "multiple_choice", question: "Complete: 'Pod ___.' (Under the table – stół, masc.)", options: ["stołu", "stołowi", "stołem", "stole"], correctAnswer: "stołem", explanation: "'Pod' (under, static position) takes instrumental: stół → stołem." },
  { id: "ins_mc_015", type: "multiple_choice", question: "Which preposition takes instrumental when indicating position?", options: ["do", "od", "za (behind)", "bez"], correctAnswer: "za (behind)", explanation: "'Za', 'pod', 'nad', 'przed', 'między', 'z' all take instrumental." },
  { id: "ins_mc_016", type: "multiple_choice", question: "Instrumental plural of 'student'?", options: ["studentów", "studentom", "studentami", "studenci"], correctAnswer: "studentami", explanation: "Instrumental plural: -ami. studentami (with students)." },
  { id: "ins_mc_017", type: "multiple_choice", question: "Instrumental of 'on' (he)?", options: ["jego", "mu", "nim", "go"], correctAnswer: "nim", explanation: "Instrumental of 'on' (he) = nim: z nim (with him)." },
  { id: "ins_mc_018", type: "multiple_choice", question: "Complete: 'Lecę ___.' (I fly by plane – samolot, masc.)", options: ["samolotu", "samolotem", "samolocie", "samolotem"], correctAnswer: "samolotem", explanation: "Mode of transport uses instrumental: samolotem = by plane." },
  { id: "ins_mc_019", type: "multiple_choice", question: "Instrumental of 'Polska' (Poland, fem.)?", options: ["Polski", "Polsce", "Polskę", "Polską"], correctAnswer: "Polską", explanation: "Polska → Polską (instrumental fem.). Np. przed Polską (before Poland)." },
  { id: "ins_mc_020", type: "multiple_choice", question: "Instrumental of 'pies' (dog, masc.)?", options: ["psa", "psu", "psem", "psie"], correctAnswer: "psem", explanation: "pies → psem (instrumental masc.)." },

  { id: "ins_fb_001", type: "fill_blank", question: "Fill in: 'Jestem ___ (lekarz).'", sentence: "Jestem ___.", blanks: ["lekarzem"], explanation: "Profession after być → instrumental: lekarz → lekarzem." },
  { id: "ins_fb_002", type: "fill_blank", question: "Fill in: 'Jadę ___ (samochód).'", sentence: "Jadę ___.", blanks: ["samochodem"], explanation: "Transport in instrumental: samochód → samochodem." },
  { id: "ins_fb_003", type: "fill_blank", question: "Fill in: 'Wracam z ___ (praca, fem.).'", sentence: "Wracam z ___.", blanks: ["pracy"], explanation: "'Z' (from a place) takes genitive. BUT 'z' (together with) takes instrumental. Here 'z pracy' = from work → genitive: praca → pracy." },
  { id: "ins_fb_004", type: "fill_blank", question: "Fill in: 'Piszę ___ (ołówek, pencil, masc.).'", sentence: "Piszę ___.", blanks: ["ołówkiem"], explanation: "Tool → instrumental: ołówek → ołówkiem." },
  { id: "ins_fb_005", type: "fill_blank", question: "Fill in: 'Ona jest ___ (studentka, fem.).'", sentence: "Ona jest ___.", blanks: ["studentką"], explanation: "Identity after być → instrumental: studentka → studentką." },

  { id: "ins_match_001", type: "matching", question: "Match each noun to its instrumental form.", pairs: [
    { left: "student", right: "studentem" },
    { left: "kobieta", right: "kobietą" },
    { left: "dziecko", right: "dzieckiem" },
    { left: "pies", right: "psem" },
    { left: "Polska", right: "Polską" },
  ]},
  { id: "ins_match_002", type: "matching", question: "Match the preposition to its usage with instrumental.", pairs: [
    { left: "z (with)", right: "together with: z bratem" },
    { left: "pod (under)", right: "static position: pod stołem" },
    { left: "między (between)", right: "between: między miastami" },
    { left: "nad (above)", right: "above: nad morzem" },
  ]},

  { id: "ins_sb_001", type: "sentence_builder", question: "Build: 'I am a student.' (masc.)", words: ["Jestem", "studentem", "."], correctOrder: ["Jestem", "studentem", "."] },
  { id: "ins_sb_002", type: "sentence_builder", question: "Build: 'I travel by train.'", words: ["Jadę", "pociągiem", "."], correctOrder: ["Jadę", "pociągiem", "."] },

  { id: "ins_ec_001", type: "error_correction", question: "Correct: profession after 'być':", wrongSentence: "Jestem lekarz.", correctedSentence: "Jestem lekarzem.", explanation: "After być, professions take instrumental: lekarz → lekarzem." },
  { id: "ins_ec_002", type: "error_correction", question: "Correct the transport:", wrongSentence: "Jadę autobus.", correctedSentence: "Jadę autobusem.", explanation: "Mode of transport uses instrumental: autobus → autobusem." },
];
