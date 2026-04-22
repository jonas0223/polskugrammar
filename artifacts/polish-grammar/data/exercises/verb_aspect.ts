import type { Exercise } from "../modules";

export const verbAspectExercises: Exercise[] = [
  { id: "asp_mc_001", type: "multiple_choice", question: "The perfective aspect (dokonany) describes an action that is...?", options: ["ongoing or repeated", "completed with a result", "always in the future", "always negative"], correctAnswer: "completed with a result", explanation: "Perfective = completed, one-time, result matters. Napisałem list. (I wrote/finished the letter.)" },
  { id: "asp_mc_002", type: "multiple_choice", question: "The imperfective aspect (niedokonany) describes an action that is...?", options: ["completed and finished", "ongoing, repeated, or general", "always in the past", "impossible"], correctAnswer: "ongoing, repeated, or general", explanation: "Imperfective = ongoing, repeated, habitual. Pisałem list. (I was writing a letter.)" },
  { id: "asp_mc_003", type: "multiple_choice", question: "Which is the perfective partner of 'pisać' (to write)?", options: ["piszę", "pisywać", "napisać", "pisałem"], correctAnswer: "napisać", explanation: "pisać (imperf.) ↔ napisać (perf.). The na- prefix makes it perfective." },
  { id: "asp_mc_004", type: "multiple_choice", question: "Which is the perfective partner of 'czytać' (to read)?", options: ["czytywać", "przeczytać", "oczytać", "doczytać"], correctAnswer: "przeczytać", explanation: "czytać (imperf.) ↔ przeczytać (perf.)." },
  { id: "asp_mc_005", type: "multiple_choice", question: "Which is the perfective partner of 'robić' (to do/make)?", options: ["narobić", "zrobić", "dorobić", "robować"], correctAnswer: "zrobić", explanation: "robić (imperf.) ↔ zrobić (perf.)." },
  { id: "asp_mc_006", type: "multiple_choice", question: "'Codziennie czytam gazetę.' — Which aspect is 'czytam'?", options: ["Perfective", "Imperfective"], correctAnswer: "Imperfective", explanation: "'Codziennie' (every day) = habitual action → imperfective aspect." },
  { id: "asp_mc_007", type: "multiple_choice", question: "'Przeczytałem tę książkę.' — Which aspect?", options: ["Perfective", "Imperfective"], correctAnswer: "Perfective", explanation: "Przeczytałem = I (have) read [and finished] the book. Completed → perfective." },
  { id: "asp_mc_008", type: "multiple_choice", question: "Which sentence means 'I was eating soup' (ongoing)?", options: ["Zjadłem zupę.", "Jadłem zupę.", "Zjem zupę.", "Jem zupę."], correctAnswer: "Jadłem zupę.", explanation: "Jadłem = imperfective past (was eating, ongoing). Zjadłem = finished eating." },
  { id: "asp_mc_009", type: "multiple_choice", question: "Which sentence means 'I finished writing the report'?", options: ["Pisałem raport.", "Napisałem raport.", "Będę pisał raport.", "Piszę raport."], correctAnswer: "Napisałem raport.", explanation: "Napisałem = perfective past = completed the writing." },
  { id: "asp_mc_010", type: "multiple_choice", question: "Perfective partner of 'jeść' (to eat)?", options: ["najeść", "przejeść", "zjeść", "dojeść"], correctAnswer: "zjeść", explanation: "jeść (imperf.) ↔ zjeść (perf.)." },
  { id: "asp_mc_011", type: "multiple_choice", question: "Perfective partner of 'mówić' (to speak/say)?", options: ["namówić", "powiedzieć", "przemówić", "odmówić"], correctAnswer: "powiedzieć", explanation: "mówić (imperf.) ↔ powiedzieć (perf.). Note: this pair has a different root." },
  { id: "asp_mc_012", type: "multiple_choice", question: "Simple future in Polish is formed with...?", options: ["będę + infinitive", "perfective verb in present tense forms", "chcę + infinitive", "będę + nominative"], correctAnswer: "perfective verb in present tense forms", explanation: "Perfective verbs conjugated in present-tense forms express simple future: napiszę = I will write (and finish)." },
  { id: "asp_mc_013", type: "multiple_choice", question: "Compound future in Polish is formed with...?", options: ["perfective present forms", "będę + infinitive or past form", "chcę + noun", "będę + nominative"], correctAnswer: "będę + infinitive or past form", explanation: "Będę pisał/pisać = I will be writing (ongoing). This uses the imperfective." },
  { id: "asp_mc_014", type: "multiple_choice", question: "'Napiszę list jutro.' — What does this mean?", options: ["I was writing a letter yesterday.", "I will write (and finish) the letter tomorrow.", "I write letters every day.", "I am writing a letter."], correctAnswer: "I will write (and finish) the letter tomorrow.", explanation: "Napiszę = perf. future. Simple future = completed action in the future." },
  { id: "asp_mc_015", type: "multiple_choice", question: "'Będę czytał tę książkę.' — What does this mean?", options: ["I read this book.", "I will be reading this book (ongoing).", "I finished reading this book.", "I was reading a book."], correctAnswer: "I will be reading this book (ongoing).", explanation: "Będę czytał = imperfective compound future = ongoing reading in the future." },
  { id: "asp_mc_016", type: "multiple_choice", question: "Perfective partner of 'pić' (to drink)?", options: ["wypić", "napić", "odpić", "dopić"], correctAnswer: "wypić", explanation: "pić (imperf.) ↔ wypić (perf.)." },
  { id: "asp_mc_017", type: "multiple_choice", question: "Which sentence means 'She used to watch TV every evening'?", options: ["Obejrzała telewizję.", "Oglądała telewizję każdego wieczoru.", "Będzie oglądać telewizję.", "Ogląda telewizję."], correctAnswer: "Oglądała telewizję każdego wieczoru.", explanation: "Habitual past → imperfective: oglądała (imperf. past)." },
  { id: "asp_mc_018", type: "multiple_choice", question: "Perfective partner of 'kupować' (to buy)?", options: ["zakupować", "kupić", "nakupować", "odkupić"], correctAnswer: "kupić", explanation: "kupować (imperf.) ↔ kupić (perf.)." },
  { id: "asp_mc_019", type: "multiple_choice", question: "Which is imperfective?", options: ["zrobić", "napisać", "przeczytać", "robić"], correctAnswer: "robić", explanation: "robić = imperfective (ongoing). zrobić = its perfective partner." },
  { id: "asp_mc_020", type: "multiple_choice", question: "Which sentence expresses a completed past action?", options: ["Jadłem obiad przez godzinę.", "Zjadłem obiad.", "Będę jeść obiad.", "Jem obiad."], correctAnswer: "Zjadłem obiad.", explanation: "Zjadłem = perfective past = I ate (and finished) dinner." },

  { id: "asp_fb_001", type: "fill_blank", question: "Fill in the perfective future: 'I will write the email.' (napisać – perf.)", sentence: "___ e-mail jutro.", blanks: ["Napiszę"], explanation: "Napiszę = 1st person future of napisać (perf.). One-time, completed future." },
  { id: "asp_fb_002", type: "fill_blank", question: "Fill in the imperfective compound future: 'I will be reading.' (czytać – imperf.)", sentence: "___ czytał.", blanks: ["Będę"], explanation: "Będę czytał = compound future (imperfective): ongoing reading." },
  { id: "asp_fb_003", type: "fill_blank", question: "Fill in the perfective past: 'She finished cooking.' (ugotować – perf., fem.)", sentence: "Ona ___ obiad.", blanks: ["ugotowała"], explanation: "ugotować (perf.) → ugotowała. She cooked (and finished) dinner." },
  { id: "asp_fb_004", type: "fill_blank", question: "Fill in correctly: 'Every day I read the news.' (czytać – imperf.)", sentence: "Codziennie ___ wiadomości.", blanks: ["czytam"], explanation: "Habitual action → imperfective present: czytam." },

  { id: "asp_match_001", type: "matching", question: "Match imperfective to perfective partner.", pairs: [
    { left: "pisać", right: "napisać" },
    { left: "czytać", right: "przeczytać" },
    { left: "robić", right: "zrobić" },
    { left: "jeść", right: "zjeść" },
    { left: "kupować", right: "kupić" },
  ]},
  { id: "asp_match_002", type: "matching", question: "Match the sentence to its aspect meaning.", pairs: [
    { left: "Pisałem list.", right: "I was writing a letter (ongoing)" },
    { left: "Napisałem list.", right: "I wrote the letter (finished)" },
    { left: "Będę pisał.", right: "I will be writing (ongoing future)" },
    { left: "Napiszę.", right: "I will write/finish (simple future)" },
  ]},

  { id: "asp_sb_001", type: "sentence_builder", question: "Build: 'I will read (and finish) the book.'", words: ["Przeczytam", "tę", "książkę", "."], correctOrder: ["Przeczytam", "tę", "książkę", "."] },
  { id: "asp_sb_002", type: "sentence_builder", question: "Build: 'She was cooking dinner.'", words: ["Ona", "gotowała", "obiad", "."], correctOrder: ["Ona", "gotowała", "obiad", "."] },

  { id: "asp_ec_001", type: "error_correction", question: "Fix: habitual action should be imperfective:", wrongSentence: "Codziennie zjadałem śniadanie.", correctedSentence: "Codziennie jadłem śniadanie.", explanation: "Habitual/repeated past → imperfective: jadłem, not zjadałem (perfective implies one-time)." },
  { id: "asp_ec_002", type: "error_correction", question: "Fix: completed action should be perfective:", wrongSentence: "Wczoraj pisałem cały raport w godzinę.", correctedSentence: "Wczoraj napisałem cały raport w godzinę.", explanation: "Completing the whole report in one hour = completed result → perfective: napisałem." },
];
