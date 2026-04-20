import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useColors } from "@/hooks/useColors";
import { Exercise } from "@/data/modules";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

interface ExerciseCardProps {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
}

function NextButton({ onPress }: { onPress: () => void }) {
  const colors = useColors();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.nextBtn, { backgroundColor: colors.primary, opacity: pressed ? 0.88 : 1 }]}
    >
      <Text style={styles.nextBtnText}>Next Question</Text>
      <Feather name="arrow-right" size={18} color="#fff" />
    </Pressable>
  );
}

function FeedbackBar({ correct, explanation }: { correct: boolean; explanation?: string }) {
  const colors = useColors();
  return (
    <View style={[styles.feedbackBar, { backgroundColor: correct ? colors.successLight : colors.errorLight, borderColor: correct ? colors.success : colors.destructive }]}>
      <Feather name={correct ? "check-circle" : "x-circle"} size={16} color={correct ? colors.success : colors.destructive} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.feedbackTitle, { color: correct ? "#166534" : "#991b1b" }]}>
          {correct ? "Correct!" : "Incorrect"}
        </Text>
        {explanation && (
          <Text style={[styles.feedbackExp, { color: correct ? "#166534" : "#991b1b" }]}>
            {explanation}
          </Text>
        )}
      </View>
    </View>
  );
}

// ── Multiple Choice ────────────────────────────────────────────
function MultipleChoice({ exercise, onAnswer }: ExerciseCardProps) {
  const colors = useColors();
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = selected === exercise.correctAnswer;

  const handleSelect = (option: string) => { if (!submitted) setSelected(option); };

  const handleSubmit = () => {
    if (!selected || submitted) return;
    setSubmitted(true);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(isCorrect ? Haptics.ImpactFeedbackStyle.Light : Haptics.ImpactFeedbackStyle.Heavy);
    }
  };

  return (
    <View>
      {(exercise.options ?? []).map((option, idx) => {
        const isSelected = selected === option;
        const isOptionCorrect = option === exercise.correctAnswer;
        let bg = "#ffffff";
        let borderColor = colors.border;
        let textColor = colors.foreground;
        let letterBg = colors.muted;
        let letterColor = colors.mutedForeground;

        if (submitted) {
          if (isOptionCorrect) {
            bg = colors.successLight;
            borderColor = colors.success;
            textColor = "#166534";
            letterBg = colors.success;
            letterColor = "#fff";
          } else if (isSelected) {
            bg = colors.errorLight;
            borderColor = colors.destructive;
            textColor = "#991b1b";
            letterBg = colors.destructive;
            letterColor = "#fff";
          }
        } else if (isSelected) {
          borderColor = colors.primary;
          letterBg = colors.primary;
          letterColor = "#fff";
        }

        return (
          <Pressable
            key={option}
            onPress={() => handleSelect(option)}
            style={[styles.option, { backgroundColor: bg, borderColor }]}
          >
            <View style={[styles.letterBadge, { backgroundColor: letterBg }]}>
              <Text style={[styles.letterText, { color: letterColor }]}>{LETTERS[idx]}</Text>
            </View>
            <Text style={[styles.optionText, { color: textColor, flex: 1 }]}>{option}</Text>
            {submitted && isOptionCorrect && (
              <Feather name="check" size={16} color={colors.success} />
            )}
          </Pressable>
        );
      })}

      {!submitted ? (
        <Pressable
          onPress={handleSubmit}
          style={[styles.checkBtn, { backgroundColor: selected ? colors.primary : colors.muted }]}
        >
          <Text style={[styles.checkBtnText, { color: selected ? "#fff" : colors.mutedForeground }]}>
            Check Answer
          </Text>
        </Pressable>
      ) : (
        <>
          <FeedbackBar correct={isCorrect} explanation={exercise.explanation} />
          <NextButton onPress={() => onAnswer(isCorrect)} />
        </>
      )}
    </View>
  );
}

// ── Fill in the Blank ─────────────────────────────────────────
function FillBlank({ exercise, onAnswer }: ExerciseCardProps) {
  const colors = useColors();
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const correctAnswers = exercise.blanks ?? [];
  const sentenceParts = (exercise.sentence ?? "").split("___");

  const handleSubmit = () => {
    if (!answer.trim() || submitted) return;
    const isCorrect = correctAnswers.some((a) => a.toLowerCase().trim() === answer.toLowerCase().trim());
    setCorrect(isCorrect);
    setSubmitted(true);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(isCorrect ? Haptics.ImpactFeedbackStyle.Light : Haptics.ImpactFeedbackStyle.Heavy);
    }
  };

  return (
    <View>
      <View style={styles.fillRow}>
        {sentenceParts.map((part, i) => (
          <React.Fragment key={i}>
            <Text style={[styles.fillPart, { color: colors.foreground }]}>{part}</Text>
            {i < sentenceParts.length - 1 && (
              <TextInput
                value={answer}
                onChangeText={setAnswer}
                style={[styles.fillInput, {
                  color: colors.foreground,
                  borderBottomColor: submitted ? (correct ? colors.success : colors.destructive) : colors.primary,
                  backgroundColor: submitted ? (correct ? colors.successLight : colors.errorLight) : colors.highlight,
                }]}
                placeholder="____"
                placeholderTextColor={colors.mutedForeground}
                editable={!submitted}
                autoCorrect={false}
                autoCapitalize="none"
                onSubmitEditing={handleSubmit}
              />
            )}
          </React.Fragment>
        ))}
      </View>

      {!submitted ? (
        <Pressable
          onPress={handleSubmit}
          style={[styles.checkBtn, { backgroundColor: answer.trim() ? colors.primary : colors.muted }]}
        >
          <Text style={[styles.checkBtnText, { color: answer.trim() ? "#fff" : colors.mutedForeground }]}>
            Check Answer
          </Text>
        </Pressable>
      ) : (
        <>
          <FeedbackBar
            correct={correct}
            explanation={correct ? exercise.explanation : `Correct answer: ${correctAnswers.join(" / ")}${exercise.explanation ? "\n" + exercise.explanation : ""}`}
          />
          <NextButton onPress={() => onAnswer(correct)} />
        </>
      )}
    </View>
  );
}

// ── Matching ──────────────────────────────────────────────────
function Matching({ exercise, onAnswer }: ExerciseCardProps) {
  const colors = useColors();
  const pairs = exercise.pairs ?? [];

  const [shuffledRights] = useState<{ value: string; pairIndex: number }[]>(() => {
    const items = pairs.map((p, i) => ({ value: p.right, pairIndex: i }));
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  });

  const [selectedLeftIdx, setSelectedLeftIdx] = useState<number | null>(null);
  const [matched, setMatched] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);

  const handleLeftTap = (i: number) => {
    if (submitted || matched[i] !== undefined) return;
    setSelectedLeftIdx(i === selectedLeftIdx ? null : i);
  };

  const handleRightTap = (pairIndex: number) => {
    if (submitted || selectedLeftIdx === null) return;
    if (Object.values(matched).includes(pairIndex)) return;
    const newMatched = { ...matched, [selectedLeftIdx]: pairIndex };
    setMatched(newMatched);
    setSelectedLeftIdx(null);
    if (Object.keys(newMatched).length === pairs.length) {
      const correct = pairs.every((_, i) => newMatched[i] === i);
      setAllCorrect(correct);
      setSubmitted(true);
      if (Platform.OS !== "web") {
        Haptics.impactAsync(correct ? Haptics.ImpactFeedbackStyle.Light : Haptics.ImpactFeedbackStyle.Heavy);
      }
    }
  };

  return (
    <View>
      <View style={styles.matchGrid}>
        <View style={styles.matchCol}>
          {pairs.map((p, i) => {
            const isSelected = selectedLeftIdx === i;
            const isDone = matched[i] !== undefined;
            const isCorrect = submitted && matched[i] === i;
            const isWrong = submitted && matched[i] !== undefined && matched[i] !== i;
            return (
              <Pressable
                key={i}
                onPress={() => handleLeftTap(i)}
                style={[styles.matchChip, {
                  backgroundColor: isSelected ? colors.primary : isCorrect ? colors.successLight : isWrong ? colors.errorLight : isDone ? "#e8f4e8" : "#fff",
                  borderColor: isSelected ? colors.primary : isCorrect ? colors.success : isWrong ? colors.destructive : colors.border,
                }]}
              >
                <Text style={[styles.matchText, { color: isSelected ? "#fff" : colors.foreground }]}>{p.left}</Text>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.matchCol}>
          {shuffledRights.map((item, idx) => {
            const isUsed = Object.values(matched).includes(item.pairIndex);
            return (
              <Pressable
                key={idx}
                onPress={() => handleRightTap(item.pairIndex)}
                style={[styles.matchChip, {
                  backgroundColor: isUsed ? colors.highlight : "#fff",
                  borderColor: isUsed ? colors.secondary : colors.border,
                }]}
              >
                <Text style={[styles.matchText, { color: colors.foreground }]}>{item.value}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      {submitted && (
        <>
          <FeedbackBar correct={allCorrect} explanation={allCorrect ? "All pairs matched correctly!" : "Some pairs were incorrect."} />
          <NextButton onPress={() => onAnswer(allCorrect)} />
        </>
      )}
    </View>
  );
}

// ── Sentence Builder ──────────────────────────────────────────
function SentenceBuilder({ exercise, onAnswer }: ExerciseCardProps) {
  const colors = useColors();
  const correctOrder = exercise.correctOrder ?? [];

  // Shuffle the word bank once on mount so the correct order is never visible
  const [shuffledWords] = useState<string[]>(() => {
    const words = [...(exercise.words ?? [])];
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    return words;
  });

  const [placed, setPlaced] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const available = shuffledWords.filter((w) => {
    const usedCount = placed.filter((p) => p === w).length;
    return usedCount < shuffledWords.filter((a) => a === w).length;
  });

  const isCorrect = placed.join(" ") === correctOrder.join(" ");

  const handleSubmit = () => {
    if (placed.length !== correctOrder.length || submitted) return;
    setSubmitted(true);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(isCorrect ? Haptics.ImpactFeedbackStyle.Light : Haptics.ImpactFeedbackStyle.Heavy);
    }
  };

  return (
    <View>
      <View style={[styles.sentenceArea, {
        backgroundColor: submitted ? (isCorrect ? colors.successLight : colors.errorLight) : colors.muted,
        borderColor: submitted ? (isCorrect ? colors.success : colors.destructive) : colors.border,
      }]}>
        {placed.length === 0 ? (
          <Text style={[styles.sbPlaceholder, { color: colors.mutedForeground }]}>Tap words below to build the sentence</Text>
        ) : (
          <View style={styles.sbWordRow}>
            {placed.map((word, i) => (
              <Pressable key={`${word}-${i}`} onPress={() => { if (!submitted) { const n = [...placed]; n.splice(i, 1); setPlaced(n); } }}
                style={[styles.sbWord, { backgroundColor: colors.primary }]}>
                <Text style={styles.sbWordText}>{word}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <View style={styles.wordBank}>
        {available.map((word, i) => (
          <Pressable key={`bank-${word}-${i}`} onPress={() => !submitted && setPlaced([...placed, word])}
            style={[styles.bankWord, { backgroundColor: "#fff", borderColor: colors.border }]}>
            <Text style={[styles.sbWordText, { color: colors.foreground }]}>{word}</Text>
          </Pressable>
        ))}
      </View>

      {!submitted ? (
        <Pressable
          onPress={handleSubmit}
          style={[styles.checkBtn, { backgroundColor: placed.length === correctOrder.length ? colors.primary : colors.muted }]}
        >
          <Text style={[styles.checkBtnText, { color: placed.length === correctOrder.length ? "#fff" : colors.mutedForeground }]}>
            Check Sentence
          </Text>
        </Pressable>
      ) : (
        <>
          <FeedbackBar correct={isCorrect} explanation={isCorrect ? exercise.explanation : `Correct: ${correctOrder.join(" ")}${exercise.explanation ? "\n" + exercise.explanation : ""}`} />
          <NextButton onPress={() => onAnswer(isCorrect)} />
        </>
      )}
    </View>
  );
}

// ── Error Correction ──────────────────────────────────────────
function ErrorCorrection({ exercise, onAnswer }: ExerciseCardProps) {
  const colors = useColors();
  const [answer, setAnswer] = useState(exercise.wrongSentence ?? "");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleSubmit = () => {
    if (submitted) return;
    const isCorrect = answer.trim().toLowerCase() === (exercise.correctedSentence ?? "").trim().toLowerCase();
    setCorrect(isCorrect);
    setSubmitted(true);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(isCorrect ? Haptics.ImpactFeedbackStyle.Light : Haptics.ImpactFeedbackStyle.Heavy);
    }
  };

  return (
    <View>
      <Text style={[styles.ecLabel, { color: colors.mutedForeground }]}>Edit the sentence to correct it:</Text>
      <TextInput
        value={answer}
        onChangeText={setAnswer}
        style={[styles.ecInput, {
          color: colors.foreground,
          backgroundColor: submitted ? (correct ? colors.successLight : colors.errorLight) : colors.highlight,
          borderColor: submitted ? (correct ? colors.success : colors.destructive) : colors.border,
        }]}
        multiline
        editable={!submitted}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {!submitted ? (
        <Pressable onPress={handleSubmit} style={[styles.checkBtn, { backgroundColor: colors.primary }]}>
          <Text style={[styles.checkBtnText, { color: "#fff" }]}>Submit Correction</Text>
        </Pressable>
      ) : (
        <>
          <FeedbackBar correct={correct} explanation={correct ? exercise.explanation : `Correct: "${exercise.correctedSentence}"${exercise.explanation ? "\n" + exercise.explanation : ""}`} />
          <NextButton onPress={() => onAnswer(correct)} />
        </>
      )}
    </View>
  );
}

// ── Main ExerciseCard ─────────────────────────────────────────
export function ExerciseCard({ exercise, onAnswer }: ExerciseCardProps) {
  const colors = useColors();

  return (
    <View style={styles.wrapper}>
      {/* Question card */}
      <View style={[styles.questionCard, { backgroundColor: colors.muted, borderColor: colors.border }]}>
        <Text style={[styles.question, { color: colors.foreground }]}>{exercise.question}</Text>
        {exercise.hint && (
          <Text style={[styles.hint, { color: colors.mutedForeground }]}>💡 {exercise.hint}</Text>
        )}
      </View>

      {/* Exercise body */}
      <View style={styles.body}>
        {exercise.type === "multiple_choice" && <MultipleChoice exercise={exercise} onAnswer={onAnswer} />}
        {exercise.type === "fill_blank" && <FillBlank exercise={exercise} onAnswer={onAnswer} />}
        {exercise.type === "matching" && <Matching exercise={exercise} onAnswer={onAnswer} />}
        {exercise.type === "sentence_builder" && <SentenceBuilder exercise={exercise} onAnswer={onAnswer} />}
        {exercise.type === "error_correction" && <ErrorCorrection exercise={exercise} onAnswer={onAnswer} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 12 },
  questionCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
    gap: 8,
  },
  question: {
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
    lineHeight: 26,
  },
  hint: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    fontStyle: "italic",
  },
  body: { gap: 0 },
  // Options
  option: {
    borderRadius: 10,
    borderWidth: 1.5,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  letterBadge: {
    width: 28,
    height: 28,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  letterText: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
  },
  optionText: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  // Buttons
  checkBtn: {
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 4,
  },
  checkBtnText: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
  },
  nextBtn: {
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
  },
  nextBtnText: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  // Feedback
  feedbackBar: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    borderRadius: 10,
    borderWidth: 1,
    padding: 14,
    marginTop: 8,
  },
  feedbackTitle: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
  },
  feedbackExp: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginTop: 3,
    lineHeight: 19,
  },
  // Fill blank
  fillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 4,
    marginBottom: 12,
  },
  fillPart: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
  },
  fillInput: {
    borderBottomWidth: 2,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    minWidth: 80,
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  // Matching
  matchGrid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  matchCol: { flex: 1, gap: 8 },
  matchChip: {
    borderRadius: 8,
    borderWidth: 1.5,
    padding: 10,
    alignItems: "center",
    minHeight: 44,
    justifyContent: "center",
  },
  matchText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
  // Sentence Builder
  sentenceArea: {
    borderRadius: 10,
    borderWidth: 1.5,
    minHeight: 56,
    padding: 12,
    marginBottom: 12,
  },
  sbPlaceholder: { fontSize: 14, fontFamily: "Inter_400Regular", fontStyle: "italic" },
  sbWordRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  sbWord: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sbWordText: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: "#fff" },
  wordBank: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 },
  bankWord: {
    borderRadius: 8,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  // Error correction
  ecLabel: { fontSize: 13, fontFamily: "Inter_400Regular", marginBottom: 8 },
  ecInput: {
    borderRadius: 10,
    borderWidth: 1.5,
    padding: 14,
    fontSize: 15,
    fontFamily: "Inter_500Medium",
    marginBottom: 12,
    lineHeight: 22,
  },
});
