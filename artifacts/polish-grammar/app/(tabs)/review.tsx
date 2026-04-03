import { Feather } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ExerciseCard } from "@/components/ExerciseCard";
import { useProgress } from "@/contexts/ProgressContext";
import { useColors } from "@/hooks/useColors";
import { MODULES, Exercise } from "@/data/modules";

function findExercise(id: string): Exercise | null {
  for (const mod of MODULES) {
    for (const lesson of mod.lessons) {
      const ex = lesson.exercises.find((e) => e.id === id);
      if (ex) return ex;
    }
  }
  return null;
}

export default function ReviewScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { progress, removeFromReviewQueue } = useProgress();

  const queue = useMemo(() => {
    return progress.reviewQueue
      .map((id) => findExercise(id))
      .filter(Boolean) as Exercise[];
  }, [progress.reviewQueue]);

  const [current, setCurrent] = useState(0);
  const [sessionDone, setSessionDone] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);

  const handleAnswer = useCallback(
    async (isCorrect: boolean) => {
      const ex = queue[current];
      setTotal((t) => t + 1);
      if (isCorrect) {
        setCorrect((c) => c + 1);
        await removeFromReviewQueue(ex.id);
      }
      if (current + 1 >= queue.length) {
        setSessionDone(true);
      } else {
        setCurrent((c) => c + 1);
      }
    },
    [current, queue, removeFromReviewQueue]
  );

  const topPadding =
    Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top;
  const bottomPadding =
    Platform.OS === "web" ? Math.max(insets.bottom, 34) : insets.bottom;

  if (queue.length === 0) {
    return (
      <View
        style={[
          styles.emptyContainer,
          {
            backgroundColor: colors.background,
            paddingTop: topPadding + 16,
            paddingBottom: bottomPadding,
          },
        ]}
      >
        <Feather name="check-circle" size={48} color={colors.success} />
        <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
          All caught up!
        </Text>
        <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
          No mistakes to review. Keep completing lessons to build your review
          queue.
        </Text>
      </View>
    );
  }

  if (sessionDone) {
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    return (
      <View
        style={[
          styles.emptyContainer,
          {
            backgroundColor: colors.background,
            paddingTop: topPadding + 16,
            paddingBottom: bottomPadding,
          },
        ]}
      >
        <Feather
          name="award"
          size={48}
          color={accuracy >= 70 ? colors.success : colors.warning}
        />
        <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
          Review Complete!
        </Text>
        <Text style={[styles.accuracyText, { color: colors.primary }]}>
          {accuracy}% accuracy
        </Text>
        <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
          {correct} correct out of {total} exercises.
          {accuracy >= 70
            ? " Great job! Correct answers are removed from your review queue."
            : " Keep practicing — incorrect answers stay in the queue."}
        </Text>
        <Pressable
          onPress={() => {
            setCurrent(0);
            setSessionDone(false);
            setCorrect(0);
            setTotal(0);
          }}
          style={[styles.btn, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.btnText}>Practice Again</Text>
        </Pressable>
      </View>
    );
  }

  const exercise = queue[current];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: topPadding + 16,
          paddingBottom: bottomPadding + 100,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground }]}>Review</Text>
        <View
          style={[
            styles.progressChip,
            { backgroundColor: colors.secondary },
          ]}
        >
          <Text style={[styles.progressChipText, { color: colors.primary }]}>
            {current + 1} / {queue.length}
          </Text>
        </View>
      </View>

      <View style={[styles.progressBg, { backgroundColor: colors.muted }]}>
        <View
          style={[
            styles.progressFill,
            {
              backgroundColor: colors.primary,
              width: `${((current + 1) / queue.length) * 100}%` as any,
            },
          ]}
        />
      </View>

      <Text style={[styles.reviewLabel, { color: colors.mutedForeground }]}>
        Mistake Review — answer correctly to remove from queue
      </Text>

      <ExerciseCard exercise={exercise} onAnswer={handleAnswer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
  },
  progressChip: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  progressChipText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  progressBg: {
    height: 5,
    borderRadius: 3,
    marginBottom: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  reviewLabel: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 22,
  },
  accuracyText: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
  },
  btn: {
    borderRadius: 12,
    paddingHorizontal: 28,
    paddingVertical: 14,
    marginTop: 8,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
});
