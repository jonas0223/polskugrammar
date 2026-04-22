import type { Exercise } from "../modules";

export const futureTenseExercises: Exercise[] = [
  { id: "fut_mc_001", type: "multiple_choice", question: "How do you form the simple future in Polish?", options: ["być + nominative", "perfective verb conjugated in present-tense forms", "będę + adjective", "chcę + infinitive"], correctAnswer: "perfective verb conjugated in present-tense forms", explanation: "Simple future = perfective verb in present forms: napiszę, zrobię, pójdę." },
  { id: "fut_mc_002", type: "multiple_choice", question: "How do you form the compound future in Polish?", options: ["perfective + noun", "będę + infinitive OR będę + past tense form (imperf.)", "chciałem + verb", "będę + nominative"], correctAnswer: "będę + infinitive OR będę + past tense form (imperf.)", explanation: "Compound future with imperfective: Będę pisać / Będę pisał (I will be writing)." },
  { id: "fut_mc_003", type: "multiple_choice", question: "What does 'napiszę' mean?", options: ["I was writing", "I will write (and finish)", "I write", "I am writing"], correctAnswer: "I will write (and finish)", explanation: "Napiszę = 1st person singular simple future of napisać (perf.)." },
  { id: "fut_mc_004", type: "multiple_choice", question: "What does 'będę czytać' mean?", options: ["I was reading", "I read (habit)", "I will be reading (ongoing)", "I have read"], correctAnswer: "I will be reading (ongoing)", explanation: "Będę czytać = compound future (imperfective) = ongoing future action." },
  { id: "fut_mc_005", type: "multiple_choice", question: "Which is the simple future of 'zrobić' (perf.) for 'I'?", options: ["robię", "zrobiłem", "zrobię", "będę robił"], correctAnswer: "zrobię", explanation: "zrobić → zrobię (1st person future). Simple perfective future." },
  { id: "fut_mc_006", type: "multiple_choice", question: "Which is the compound future of 'pisać' for 'she'?", options: ["napisze", "pisała", "piszę", "będzie pisać / pisała"], correctAnswer: "będzie pisać / pisała", explanation: "Compound future (imperf.): będzie + infinitive/past form = będzie pisać/pisała." },
  { id: "fut_mc_007", type: "multiple_choice", question: "Complete: 'Jutro ___ do Krakowa.' (I'll go to Kraków – iść/pójść)", options: ["idę", "szedłem", "pójdę", "będę iść"], correctAnswer: "pójdę", explanation: "pójść (perf.) → pójdę = simple future. Expressing a specific planned trip." },
  { id: "fut_mc_008", type: "multiple_choice", question: "Complete: '___ uczyć się polskiego.' (I will be learning Polish – ongoing)", options: ["Uczę się", "Uczyłem się", "Nauczę się", "Będę uczyć się"], correctAnswer: "Będę uczyć się", explanation: "Ongoing future → compound future with imperfective uczyć się: będę uczyć się." },
  { id: "fut_mc_009", type: "multiple_choice", question: "Which time word is typical for future tense?", options: ["wczoraj", "zawsze", "jutro", "teraz"], correctAnswer: "jutro", explanation: "'Jutro' (tomorrow) signals future tense. 'Wczoraj' = yesterday, 'teraz' = now." },
  { id: "fut_mc_010", type: "multiple_choice", question: "Complete: 'Ona ___ to zadanie.' (She will complete this task – skończyć, perf.)", options: ["kończyła", "skończy", "będzie skończyć", "kończy"], correctAnswer: "skończy", explanation: "skończyć (perf.) → skończy = 3rd person simple future (she will finish)." },
  { id: "fut_mc_011", type: "multiple_choice", question: "Future of 'być' (to be) for 'I'?", options: ["jestem", "byłem", "będę", "będzie"], correctAnswer: "będę", explanation: "Future of być: będę (I will be), będziesz, będzie, będziemy, będziecie, będą." },
  { id: "fut_mc_012", type: "multiple_choice", question: "Future of 'być' (to be) for 'they'?", options: ["będę", "będzie", "będziemy", "będą"], correctAnswer: "będą", explanation: "Oni/one będą = they will be." },
  { id: "fut_mc_013", type: "multiple_choice", question: "Which sentence means 'We will study tonight.'?", options: ["Uczyliśmy się wieczorem.", "Będziemy uczyć się wieczorem.", "Uczymy się wieczorem.", "Nauczymy się jutro."], correctAnswer: "Będziemy uczyć się wieczorem.", explanation: "Compound future (ongoing): będziemy uczyć się." },
  { id: "fut_mc_014", type: "multiple_choice", question: "Complete: 'Za tydzień ___ do Londynu.' (In a week I'll fly to London – polecieć, perf.)", options: ["leciałem", "lecę", "polecę", "będę lecieć"], correctAnswer: "polecę", explanation: "polecieć (perf.) → polecę = simple future." },
  { id: "fut_mc_015", type: "multiple_choice", question: "What does 'za chwilę' mean?", options: ["a moment ago", "in a moment", "every moment", "for a moment"], correctAnswer: "in a moment", explanation: "'Za chwilę' = in a moment. Used with future tense: Za chwilę wrócę." },
  { id: "fut_mc_016", type: "multiple_choice", question: "Complete: 'W przyszłym roku ___ do Hiszpanii.' (Next year we'll go to Spain – pojechać, perf.)", options: ["jedzie", "jechaliśmy", "pojedziemy", "będziemy jechać"], correctAnswer: "pojedziemy", explanation: "pojechać (perf.) → pojedziemy = simple future plural (we)." },
  { id: "fut_mc_017", type: "multiple_choice", question: "Which sentence means 'I will call you tomorrow.' (zadzwonić = perf.)?", options: ["Dzwoniłem jutro.", "Będę dzwonić jutro.", "Zadzwonię jutro.", "Dzwonię jutro."], correctAnswer: "Zadzwonię jutro.", explanation: "zadzwonić (perf.) → zadzwonię = I will call (and it will happen)." },
  { id: "fut_mc_018", type: "multiple_choice", question: "Future of 'być' for 'you' (singular)?", options: ["jesteś", "byłeś", "będziesz", "będzie"], correctAnswer: "będziesz", explanation: "ty → będziesz (future of być)." },
  { id: "fut_mc_019", type: "multiple_choice", question: "Which sentence expresses ongoing future?", options: ["Napiszę raport.", "Zrobię zadanie.", "Będę pracować cały dzień.", "Pojadę do domu."], correctAnswer: "Będę pracować cały dzień.", explanation: "Będę pracować = imperfective compound future = ongoing throughout the day." },
  { id: "fut_mc_020", type: "multiple_choice", question: "Complete: 'Czy ___ na przyjęcie?' (Will you come to the party? – przyjść, perf., ty)", options: ["przyszedłeś", "przychodzisz", "przyjdziesz", "będziesz przychodzić"], correctAnswer: "przyjdziesz", explanation: "przyjść (perf.) → przyjdziesz = simple future (you)." },

  { id: "fut_fb_001", type: "fill_blank", question: "Fill in the simple future: 'Tomorrow I will buy bread.' (kupić – perf.)", sentence: "Jutro ___ chleb.", blanks: ["kupię"], explanation: "kupić (perf.) → kupię = I will buy." },
  { id: "fut_fb_002", type: "fill_blank", question: "Fill in the compound future: 'She will be reading all day.' (czytać – imperf.)", sentence: "Ona ___ czytać cały dzień.", blanks: ["będzie"], explanation: "Będzie czytać = compound future (ongoing)." },
  { id: "fut_fb_003", type: "fill_blank", question: "Fill in: 'In a year we will be in Poland.' (być)", sentence: "Za rok ___ w Polsce.", blanks: ["będziemy"], explanation: "być future for 'my' = będziemy." },
  { id: "fut_fb_004", type: "fill_blank", question: "Fill in: 'They will arrive tomorrow.' (przyjechać – perf.)", sentence: "Oni ___ jutro.", blanks: ["przyjadą"], explanation: "przyjechać (perf.) → przyjadą = 3rd person pl. future." },
  { id: "fut_fb_005", type: "fill_blank", question: "Fill in: 'I will be working in the evening.' (pracować – imperf.)", sentence: "Wieczorem ___ pracować.", blanks: ["będę"], explanation: "Będę pracować = compound future (ongoing)." },

  { id: "fut_match_001", type: "matching", question: "Match the infinitive to its 1st person simple future.", pairs: [
    { left: "napisać", right: "napiszę" },
    { left: "zrobić", right: "zrobię" },
    { left: "kupić", right: "kupię" },
    { left: "pójść", right: "pójdę" },
    { left: "być", right: "będę" },
  ]},
  { id: "fut_match_002", type: "matching", question: "Match the Polish future sentence to its English meaning.", pairs: [
    { left: "Napiszę list.", right: "I will write (finish) the letter." },
    { left: "Będę pisać.", right: "I will be writing (ongoing)." },
    { left: "Zrobię to jutro.", right: "I will do it tomorrow." },
    { left: "Będziemy czekać.", right: "We will be waiting." },
  ]},

  { id: "fut_sb_001", type: "sentence_builder", question: "Build: 'Tomorrow I will go to school.'", words: ["Jutro", "pójdę", "do", "szkoły", "."], correctOrder: ["Jutro", "pójdę", "do", "szkoły", "."] },
  { id: "fut_sb_002", type: "sentence_builder", question: "Build: 'She will be cooking dinner.'", words: ["Ona", "będzie", "gotować", "obiad", "."], correctOrder: ["Ona", "będzie", "gotować", "obiad", "."] },

  { id: "fut_ec_001", type: "error_correction", question: "Fix the future tense:", wrongSentence: "Jutro idę do Krakowa. (planned one-time trip, use perf. future)", correctedSentence: "Jutro pójdę do Krakowa.", explanation: "For a one-time planned trip in the future, use perfective: pójdę." },
  { id: "fut_ec_002", type: "error_correction", question: "Fix the future tense:", wrongSentence: "W przyszłym roku będę mieszkać w Londynie. (I will move to London – zamieszkać, perf.)", correctedSentence: "W przyszłym roku zamieszkam w Londynie.", explanation: "For a completed action (settling down), use perfective: zamieszkam." },
];
