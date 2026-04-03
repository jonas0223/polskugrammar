import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useColors } from "@/hooks/useColors";
import { Exercise } from "@/data/modules";

interface ExerciseCardProps {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
}

function MultipleChoice({ exercise, onAnswer }: ExerciseCardProps) {
  const colors = useColors();
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (option: string) => {
    if (submitted) return;
    setSelected(option);
  };

  const handleSubmit = () => {
    if (!selected || submitted) return;
    const correct = selected === exercise.correctAnswer;
    setSubmitted(true);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(
        correct
          ? Haptics.ImpactFeedbackStyle.Light
          : Haptics.ImpactFeedbackStyle.Heavy
      );
    }
    setTimeout(() => onAnswer(correct), 1200);
  };

  return (
    <View>
      {(exercise.options ?? []).map((option) => {
        const isSelected = selected === option;
        const isCorrect = option === exercise.correctAnswer;
        let bg = colors.card;
        let borderColor = colors.border;
        let textColor = colors.foreground;

        if (submitted) {
          if (isCorrect) {
            bg = colors.successLight;
            borderColor = colors.success;
            textColor = "#166534";
          } else if (isSelected && !isCorrect) {
            bg = colors.errorLight;
            borderColor = colors.destructive;
            textColor = "#991b1b";
          }
        } else if (isSelected) {
          bg = colors.secondary;
          borderColor = colors.primary;
        }

        return (
          <Pressable
            key={option}
            onPress={() => handleSelect(option)}
            style={[styles.option, { backgroundColor: bg, borderColor }]}
          >
            <Text style={[styles.optionText, { color: textColor }]}>
              {option}
            </Text>
            {submitted && isCorrect && (
              <Feather name="check-circle" size={18} color={colors.success} />
            )}
            {submitted && isSelected && !isCorrect && (
              <Feather name="x-circle" size={18} color={colors.destructive} />
            )}
          </Pressable>
        );
      })}
      {!submitted && (
        <Pressable
          onPress={handleSubmit}
          style={[
            styles.submitBtn,
            {
              backgroundColor: selected ? colors.primary : colors.muted,
            },
          ]}
        >
          <Text
            style={[
              styles.submitText,
              { color: selected ? "#fff" : colors.mutedForeground },
            ]}
          >
            Check Answer
          </Text>
        </Pressable>
      )}
      {submitted && exercise.explanation && (
        <View style={[styles.explanation, { backgroundColor: colors.secondary }]}>
          <Feather name="info" size={14} color={colors.primary} />
          <Text style={[styles.explanationText, { color: colors.foreground }]}>
            {exercise.explanation}
          </Text>
        </View>
      )}
    </View>
  );
}

function FillBlank({ exercise, onAnswer }: ExerciseCardProps) {
  const colors = useColors();
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);

  const correctAnswers = exercise.blanks ?? [];

  const handleSubmit = () => {
    if (!answer.trim() || submitted) return;
    const isCorrect = correctAnswers.some(
      (a) => a.toLowerCase().trim() === answer.toLowerCase().trim()
    );
    setCorrect(isCorrect);
    setSubmitted(true);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(
        isCorrect
          ? Haptics.ImpactFeedbackStyle.Light
          : Haptics.ImpactFeedbackStyle.Heavy
      );
    }
    setTimeout(() => onAnswer(isCorrect), 1400);
  };

  const sentenceParts = (exercise.sentence ?? "").split("___");

  return (
    <View>
      <View style={styles.fillSentenceRow}>
        {sentenceParts.map((part, i) => (
          <React.Fragment key={i}>
            <Text style={[styles.fillSentencePart, { color: colors.foreground }]}>
              {part}
            </Text>
            {i < sentenceParts.length - 1 && (
              <View
                style={[
                  styles.fillInput,
                  {
                    borderBottomColor: submitted
                      ? correct
                        ? colors.success
                        : colors.destructive
                      : colors.primary,
                    backgroundColor: submitted
                      ? correct
                        ? colors.successLight
                        : colors.errorLight
                      : colors.secondary,
                  },
                ]}
              >
                <TextInput
                  value={answer}
                  onChangeText={setAnswer}
                  style={[styles.fillInputText, { color: colors.foreground }]}
                  placeholder="type here"
                  placeholderTextColor={colors.mutedForeground}
                  editable={!submitted}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onSubmitEditing={handleSubmit}
                />
              </View>
            )}
          </React.Fragment>
        ))}
      </View>

      {!submitted && (
        <Pressable
          onPress={handleSubmit}
          style={[
            styles.submitBtn,
            {
              backgroundColor: answer.trim()
                ? colors.primary
                : colors.muted,
            },
          ]}
        >
          <Text
            style={[
              styles.submitText,
              {
                color: answer.trim() ? "#fff" : colors.mutedForeground,
              },
            ]}
          >
            Check Answer
          </Text>
        </Pressable>
      )}

      {submitted && (
        <View
          style={[
            styles.feedbackBanner,
            {
              backgroundColor: correct ? colors.successLight : colors.errorLight,
              borderColor: correct ? colors.success : colors.destructive,
            },
          ]}
        >
          <Feather
            name={correct ? "check-circle" : "x-circle"}
            size={16}
            color={correct ? colors.success : colors.destructive}
          />
          <Text
            style={[
              styles.feedbackText,
              { color: correct ? "#166534" : "#991b1b" },
            ]}
          >
            {correct
              ? "Correct!"
              : `Correct answer: ${correctAnswers.join(" / ")}`}
          </Text>
        </View>
      )}

      {submitted && exercise.explanation && (
        <View style={[styles.explanation, { backgroundColor: colors.secondary }]}>
          <Feather name="info" size={14} color={colors.primary} />
          <Text style={[styles.explanationText, { color: colors.foreground }]}>
            {exercise.explanation}
          </Text>
        </View>
      )}
    </View>
  );
}

function Matching({ exercise, onAnswer }: ExerciseCardProps) {
  const colors = useColors();
  const pairs = exercise.pairs ?? [];
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const rights = pairs.map((p) => p.right);

  const handleLeftTap = (left: string) => {
    if (submitted || matched[left]) return;
    setSelectedLeft(left === selectedLeft ? null : left);
  };

  const handleRightTap = (right: string) => {
    if (submitted || !selectedLeft) return;
    if (Object.values(matched).includes(right)) return;
    const newMatched = { ...matched, [selectedLeft]: right };
    setMatched(newMatched);
    setSelectedLeft(null);

    if (Object.keys(newMatched).length === pairs.length) {
      setSubmitted(true);
      const allCorrect = pairs.every((p) => newMatched[p.left] === p.right);
      if (Platform.OS !== "web") {
        Haptics.impactAsync(
          allCorrect
            ? Haptics.ImpactFeedbackStyle.Light
            : Haptics.ImpactFeedbackStyle.Heavy
        );
      }
      setTimeout(() => onAnswer(allCorrect), 1400);
    }
  };

  const isRightMatched = (right: string) =>
    Object.values(matched).includes(right);

  const isMatchCorrect = (left: string): boolean => {
    if (!submitted) return false;
    const correctRight = pairs.find((p) => p.left === left)?.right;
    return matched[left] === correctRight;
  };

  return (
    <View style={styles.matchContainer}>
      <View style={styles.matchColumn}>
        {pairs.map((p) => {
          const isSelected = selectedLeft === p.left;
          const isComplete = !!matched[p.left];
          const correct = isMatchCorrect(p.left);
          return (
            <Pressable
              key={p.left}
              onPress={() => handleLeftTap(p.left)}
              style={[
                styles.matchChip,
                {
                  backgroundColor: isSelected
                    ? colors.primary
                    : isComplete
                    ? submitted
                      ? correct
                        ? colors.successLight
                        : colors.errorLight
                      : colors.secondary
                    : colors.card,
                  borderColor: isSelected
                    ? colors.primary
                    : isComplete
                    ? submitted
                      ? correct
                        ? colors.success
                        : colors.destructive
                      : colors.border
                    : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.matchChipText,
                  {
                    color: isSelected
                      ? "#fff"
                      : colors.foreground,
                    fontSize: 13,
                  },
                ]}
              >
                {p.left}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.matchColumn}>
        {rights.map((right) => {
          const isUsed = isRightMatched(right);
          return (
            <Pressable
              key={right}
              onPress={() => handleRightTap(right)}
              style={[
                styles.matchChip,
                {
                  backgroundColor: isUsed ? colors.secondary : colors.card,
                  borderColor: isUsed ? colors.primary : colors.border,
                  opacity: isUsed && !selectedLeft ? 0.7 : 1,
                },
              ]}
            >
              <Text
                style={[styles.matchChipText, { color: colors.foreground, fontSize: 13 }]}
              >
                {right}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function SentenceBuilder({ exercise, onAnswer }: ExerciseCardProps) {
  const colors = useColors();
  const allWords = exercise.words ?? [];
  const correctOrder = exercise.correctOrder ?? [];

  const [placed, setPlaced] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const availableWords = allWords.filter((w, i) => {
    const usedCount = placed.filter((p) => p === w).length;
    const totalCount = allWords.filter((a) => a === w).length;
    return usedCount < totalCount;
  });

  const handlePlace = (word: string) => {
    if (submitted) return;
    setPlaced([...placed, word]);
  };

  const handleRemove = (index: number) => {
    if (submitted) return;
    const newPlaced = [...placed];
    newPlaced.splice(index, 1);
    setPlaced(newPlaced);
  };

  const handleSubmit = () => {
    if (placed.length !== correctOrder.length || submitted) return;
    const isCorrect = placed.every((w, i) => w === correctOrder[i]);
    setSubmitted(true);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(
        isCorrect
          ? Haptics.ImpactFeedbackStyle.Light
          : Haptics.ImpactFeedbackStyle.Heavy
      );
    }
    setTimeout(() => onAnswer(isCorrect), 1400);
  };

  return (
    <View>
      <View
        style={[
          styles.sentenceBuilderArea,
          {
            backgroundColor: colors.muted,
            borderColor: submitted
              ? placed.join(" ") === correctOrder.join(" ")
                ? colors.success
                : colors.destructive
              : colors.border,
          },
        ]}
      >
        {placed.length === 0 ? (
          <Text style={[styles.sbPlaceholder, { color: colors.mutedForeground }]}>
            Tap words below to build the sentence
          </Text>
        ) : (
          <View style={styles.sbWordRow}>
            {placed.map((word, i) => (
              <Pressable
                key={`${word}-${i}`}
                onPress={() => handleRemove(i)}
                style={[styles.sbWord, { backgroundColor: colors.primary }]}
              >
                <Text style={[styles.sbWordText, { color: "#fff" }]}>{word}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <View style={styles.sbWordBank}>
        {availableWords.map((word, i) => (
          <Pressable
            key={`bank-${word}-${i}`}
            onPress={() => handlePlace(word)}
            style={[
              styles.sbBankWord,
              { backgroundColor: colors.secondary, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.sbWordText, { color: colors.foreground }]}>
              {word}
            </Text>
          </Pressable>
        ))}
      </View>

      {!submitted && (
        <Pressable
          onPress={handleSubmit}
          style={[
            styles.submitBtn,
            {
              backgroundColor:
                placed.length === correctOrder.length
                  ? colors.primary
                  : colors.muted,
            },
          ]}
        >
          <Text
            style={[
              styles.submitText,
              {
                color:
                  placed.length === correctOrder.length
                    ? "#fff"
                    : colors.mutedForeground,
              },
            ]}
          >
            Check Sentence
          </Text>
        </Pressable>
      )}

      {submitted && (
        <View
          style={[
            styles.feedbackBanner,
            {
              backgroundColor:
                placed.join(" ") === correctOrder.join(" ")
                  ? colors.successLight
                  : colors.errorLight,
              borderColor:
                placed.join(" ") === correctOrder.join(" ")
                  ? colors.success
                  : colors.destructive,
            },
          ]}
        >
          <Text
            style={[
              styles.feedbackText,
              {
                color:
                  placed.join(" ") === correctOrder.join(" ")
                    ? "#166534"
                    : "#991b1b",
              },
            ]}
          >
            {placed.join(" ") === correctOrder.join(" ")
              ? "Correct!"
              : `Correct order: ${correctOrder.join(" ")}`}
          </Text>
        </View>
      )}
    </View>
  );
}

function ErrorCorrection({ exercise, onAnswer }: ExerciseCardProps) {
  const colors = useColors();
  const [answer, setAnswer] = useState(exercise.wrongSentence ?? "");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleSubmit = () => {
    if (submitted) return;
    const isCorrect =
      answer.trim().toLowerCase() ===
      (exercise.correctedSentence ?? "").trim().toLowerCase();
    setCorrect(isCorrect);
    setSubmitted(true);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(
        isCorrect
          ? Haptics.ImpactFeedbackStyle.Light
          : Haptics.ImpactFeedbackStyle.Heavy
      );
    }
    setTimeout(() => onAnswer(isCorrect), 1400);
  };

  return (
    <View>
      <Text style={[styles.ecLabel, { color: colors.mutedForeground }]}>
        Edit the sentence below to correct it:
      </Text>
      <TextInput
        value={answer}
        onChangeText={setAnswer}
        style={[
          styles.ecInput,
          {
            color: colors.foreground,
            backgroundColor: colors.secondary,
            borderColor: submitted
              ? correct
                ? colors.success
                : colors.destructive
              : colors.border,
          },
        ]}
        multiline
        editable={!submitted}
        autoCorrect={false}
        autoCapitalize="none"
      />

      {!submitted && (
        <Pressable
          onPress={handleSubmit}
          style={[styles.submitBtn, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.submitText, { color: "#fff" }]}>
            Submit Correction
          </Text>
        </Pressable>
      )}

      {submitted && (
        <View
          style={[
            styles.feedbackBanner,
            {
              backgroundColor: correct ? colors.successLight : colors.errorLight,
              borderColor: correct ? colors.success : colors.destructive,
            },
          ]}
        >
          <Text
            style={[
              styles.feedbackText,
              { color: correct ? "#166534" : "#991b1b" },
            ]}
          >
            {correct
              ? "Correct!"
              : `Correct: "${exercise.correctedSentence}"`}
          </Text>
        </View>
      )}

      {submitted && exercise.explanation && (
        <View style={[styles.explanation, { backgroundColor: colors.secondary }]}>
          <Feather name="info" size={14} color={colors.primary} />
          <Text style={[styles.explanationText, { color: colors.foreground }]}>
            {exercise.explanation}
          </Text>
        </View>
      )}
    </View>
  );
}

export function ExerciseCard({ exercise, onAnswer }: ExerciseCardProps) {
  const colors = useColors();

  const typeLabel: Record<string, string> = {
    multiple_choice: "Multiple Choice",
    fill_blank: "Fill in the Blank",
    matching: "Matching",
    sentence_builder: "Sentence Builder",
    error_correction: "Error Correction",
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={styles.typeBadge}>
        <Text style={[styles.typeLabel, { color: colors.primary }]}>
          {typeLabel[exercise.type] ?? exercise.type}
        </Text>
      </View>
      <Text style={[styles.question, { color: colors.foreground }]}>
        {exercise.question}
      </Text>
      {exercise.hint && (
        <Text style={[styles.hint, { color: colors.mutedForeground }]}>
          Hint: {exercise.hint}
        </Text>
      )}

      {exercise.type === "multiple_choice" && (
        <MultipleChoice exercise={exercise} onAnswer={onAnswer} />
      )}
      {exercise.type === "fill_blank" && (
        <FillBlank exercise={exercise} onAnswer={onAnswer} />
      )}
      {exercise.type === "matching" && (
        <Matching exercise={exercise} onAnswer={onAnswer} />
      )}
      {exercise.type === "sentence_builder" && (
        <SentenceBuilder exercise={exercise} onAnswer={onAnswer} />
      )}
      {exercise.type === "error_correction" && (
        <ErrorCorrection exercise={exercise} onAnswer={onAnswer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  typeBadge: {
    marginBottom: 8,
  },
  typeLabel: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  question: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 16,
    lineHeight: 24,
  },
  hint: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginBottom: 12,
    fontStyle: "italic",
  },
  option: {
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
    flex: 1,
  },
  submitBtn: {
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    marginTop: 8,
  },
  submitText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  explanation: {
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    flexDirection: "row",
    gap: 8,
  },
  explanationText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    flex: 1,
    lineHeight: 20,
  },
  fillSentenceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 16,
    gap: 4,
  },
  fillSentencePart: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
  },
  fillInput: {
    borderBottomWidth: 2,
    minWidth: 80,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  fillInputText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
  feedbackBanner: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    marginTop: 12,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  feedbackText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    flex: 1,
  },
  matchContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
  matchColumn: {
    flex: 1,
    gap: 8,
  },
  matchChip: {
    borderRadius: 10,
    borderWidth: 1.5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  matchChipText: {
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
  sentenceBuilderArea: {
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 14,
    minHeight: 60,
    marginBottom: 12,
  },
  sbPlaceholder: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    fontStyle: "italic",
  },
  sbWordRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  sbWord: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sbWordText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  sbWordBank: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  sbBankWord: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ecLabel: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginBottom: 8,
  },
  ecInput: {
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 14,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    marginBottom: 12,
    minHeight: 80,
    textAlignVertical: "top",
  },
});
