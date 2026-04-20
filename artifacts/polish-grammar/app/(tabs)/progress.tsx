import { Feather } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useProgress } from "@/contexts/ProgressContext";
import { useColors } from "@/hooks/useColors";
import { MODULES } from "@/data/modules";

export default function ProgressScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { progress, resetProgress } = useProgress();

  const topPadding =
    Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top;
  const bottomPadding =
    Platform.OS === "web" ? Math.max(insets.bottom, 34) : insets.bottom;

  const moduleStats = useMemo(() => {
    return MODULES.map((mod) => {
      const lessonKeys = mod.lessons.map((l) => `${mod.id}__${l.id}`);
      const done = lessonKeys.filter((k) => progress.lessonProgress[k]?.completed);
      const accuracies = done.map((k) => progress.lessonProgress[k]?.accuracy ?? 0);
      const avgAccuracy =
        accuracies.length > 0
          ? Math.round((accuracies.reduce((a, b) => a + b, 0) / accuracies.length) * 100)
          : null;
      return { module: mod, completed: done.length, total: mod.lessons.length, avgAccuracy };
    });
  }, [progress]);

  const totalXP = progress.totalXP;
  const overallAccuracy = useMemo(() => {
    const lessons = Object.values(progress.lessonProgress).filter((p) => p.completed);
    if (!lessons.length) return null;
    return Math.round((lessons.reduce((a, b) => a + b.accuracy, 0) / lessons.length) * 100);
  }, [progress]);
  const completedCount = Object.values(progress.lessonProgress).filter((p) => p.completed).length;

  const handleReset = () => {
    Alert.alert("Reset Progress", "This will erase all your progress, streaks, and XP. This cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      { text: "Reset", style: "destructive", onPress: () => resetProgress() },
    ]);
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* ── Fixed green header ── */}
      <View style={[styles.header, { paddingTop: topPadding + 12, backgroundColor: colors.primary }]}>
        <Text style={styles.headerTitle}>Your Progress</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Overall stats */}
        <View style={[styles.statsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.statsCardTitle, { color: colors.foreground }]}>Overall Statistics</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: colors.primary }]}>{totalXP}</Text>
              <Text style={[styles.statLab, { color: colors.mutedForeground }]}>Total XP</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: colors.primary }]}>
                {overallAccuracy !== null ? `${overallAccuracy}%` : "—"}
              </Text>
              <Text style={[styles.statLab, { color: colors.mutedForeground }]}>Accuracy</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: colors.primary }]}>{completedCount}</Text>
              <Text style={[styles.statLab, { color: colors.mutedForeground }]}>Completed</Text>
            </View>
          </View>
        </View>

        {/* Module performance */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Module Performance</Text>

        {moduleStats.map(({ module, completed, total, avgAccuracy }) => (
          <View key={module.id} style={[styles.moduleRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.moduleTop}>
              <Text style={[styles.moduleTitle, { color: colors.foreground }]}>{module.title}</Text>
              {avgAccuracy !== null && (
                <Text
                  style={[
                    styles.accuracy,
                    {
                      color:
                        avgAccuracy >= 80 ? colors.success
                        : avgAccuracy >= 60 ? colors.warning
                        : colors.destructive,
                    },
                  ]}
                >
                  {avgAccuracy}%
                </Text>
              )}
            </View>
            <View style={[styles.barBg, { backgroundColor: colors.muted }]}>
              <View
                style={[
                  styles.barFill,
                  {
                    backgroundColor: module.color,
                    width: total > 0 ? (`${(completed / total) * 100}%` as any) : "0%",
                  },
                ]}
              />
            </View>
            <Text style={[styles.lessonCount, { color: colors.mutedForeground }]}>
              {completed}/{total} lessons completed
            </Text>
          </View>
        ))}

        {/* Streak banner */}
        {progress.streak > 0 && (
          <View style={[styles.streakBanner, { backgroundColor: colors.accent }]}>
            <Feather name="zap" size={22} color="#fff" />
            <View>
              <Text style={styles.streakNum}>{progress.streak} Day Streak!</Text>
              <Text style={styles.streakSub}>Keep it up!</Text>
            </View>
          </View>
        )}

        {/* Reset button */}
        <Pressable
          onPress={handleReset}
          style={[styles.resetBtn, { borderColor: colors.destructive }]}
        >
          <Feather name="trash-2" size={16} color={colors.destructive} />
          <Text style={[styles.resetText, { color: colors.destructive }]}>Reset All Progress</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 20 },
  headerTitle: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    color: "#ffffff",
    marginTop: 4,
  },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 20 },
  statsCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
    gap: 16,
  },
  statsCardTitle: { fontSize: 15, fontFamily: "Inter_700Bold" },
  statsRow: { flexDirection: "row", alignItems: "center" },
  statItem: { flex: 1, alignItems: "center", gap: 2 },
  statNum: { fontSize: 24, fontFamily: "Inter_700Bold" },
  statLab: { fontSize: 12, fontFamily: "Inter_500Medium" },
  statDivider: { width: 1, height: 36 },
  sectionTitle: { fontSize: 16, fontFamily: "Inter_700Bold", marginBottom: 12 },
  moduleRow: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 8,
    gap: 6,
  },
  moduleTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  moduleTitle: { fontSize: 14, fontFamily: "Inter_600SemiBold", flex: 1 },
  accuracy: { fontSize: 13, fontFamily: "Inter_700Bold" },
  barBg: { height: 5, borderRadius: 3, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 3 },
  lessonCount: { fontSize: 11, fontFamily: "Inter_400Regular" },
  streakBanner: {
    borderRadius: 12,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 8,
    marginBottom: 8,
  },
  streakNum: { fontSize: 18, fontFamily: "Inter_700Bold", color: "#fff" },
  streakSub: { fontSize: 13, fontFamily: "Inter_400Regular", color: "rgba(255,255,255,0.85)" },
  resetBtn: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
  },
  resetText: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
});
