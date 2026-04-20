import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StreakBadge } from "@/components/StreakBadge";
import { XPBar } from "@/components/XPBar";
import { useProgress } from "@/contexts/ProgressContext";
import { useColors } from "@/hooks/useColors";
import { MODULES } from "@/data/modules";

export default function DashboardScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { progress, isLessonCompleted, getWeakAreas } = useProgress();

  const topPadding =
    Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top;
  const bottomPadding =
    Platform.OS === "web" ? Math.max(insets.bottom, 34) : insets.bottom;

  const completedLessons = useMemo(
    () => Object.values(progress.lessonProgress).filter((p) => p.completed).length,
    [progress]
  );
  const totalLessons = MODULES.reduce((acc, m) => acc + m.lessons.length, 0);

  const nextLesson = useMemo(() => {
    for (const mod of MODULES) {
      for (const lesson of mod.lessons) {
        if (!isLessonCompleted(mod.id, lesson.id)) return { module: mod, lesson };
      }
    }
    return null;
  }, [isLessonCompleted]);

  const weakAreas = useMemo(
    () => getWeakAreas().map((id) => MODULES.find((m) => m.id === id)).filter(Boolean).slice(0, 2),
    [getWeakAreas]
  );

  const overallAccuracy = useMemo(() => {
    const lessons = Object.values(progress.lessonProgress).filter((p) => p.completed);
    if (lessons.length === 0) return null;
    return Math.round((lessons.reduce((a, b) => a + b.accuracy, 0) / lessons.length) * 100);
  }, [progress]);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* ── Fixed green header ── */}
      <View style={[styles.header, { paddingTop: topPadding + 12, backgroundColor: colors.primary }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Dzień dobry!</Text>
            <Text style={styles.headerTitle}>Your Progress</Text>
          </View>
          <StreakBadge streak={progress.streak} compact />
        </View>
      </View>

      {/* ── Scrollable body ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Level / XP card */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <XPBar xp={progress.totalXP} />
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.primary }]}>
            <Text style={styles.statNumber}>{completedLessons}</Text>
            <Text style={styles.statLabel}>Lessons{"\n"}Done</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.secondary }]}>
            <Text style={styles.statNumber}>{totalLessons - completedLessons}</Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.accent }]}>
            <Text style={[styles.statNumber, { color: "#1a1a1a" }]}>
              {overallAccuracy !== null ? `${overallAccuracy}%` : "—"}
            </Text>
            <Text style={[styles.statLabel, { color: "rgba(0,0,0,0.6)" }]}>Accuracy</Text>
          </View>
        </View>

        {/* Continue Learning */}
        {nextLesson && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Continue Learning
            </Text>
            <Pressable
              onPress={() =>
                router.push({ pathname: "/lesson/[moduleId]", params: { moduleId: nextLesson.module.id } })
              }
              style={({ pressed }) => [
                styles.continueCard,
                { backgroundColor: colors.secondary, opacity: pressed ? 0.88 : 1 },
              ]}
            >
              <View style={styles.continueContent}>
                <Text style={styles.continueModule}>{nextLesson.module.title}</Text>
                <Text style={styles.continueLesson}>{nextLesson.lesson.title}</Text>
              </View>
              <View style={styles.playCircle}>
                <Feather name="play" size={18} color="#fff" />
              </View>
            </Pressable>
          </>
        )}

        {/* Review queue */}
        {progress.reviewQueue.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Review Mistakes
            </Text>
            <Pressable
              onPress={() => router.push("/(tabs)/review")}
              style={({ pressed }) => [
                styles.reviewCard,
                { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.88 : 1 },
              ]}
            >
              <Feather name="refresh-cw" size={22} color={colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.reviewTitle, { color: colors.foreground }]}>
                  Spaced Repetition Review
                </Text>
                <Text style={[styles.reviewSub, { color: colors.mutedForeground }]}>
                  {progress.reviewQueue.length} exercises ready
                </Text>
              </View>
              <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
            </Pressable>
          </>
        )}

        {/* Weak areas */}
        {weakAreas.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Needs Practice</Text>
            {weakAreas.map((mod) => (
              <Pressable
                key={mod!.id}
                onPress={() =>
                  router.push({ pathname: "/lesson/[moduleId]", params: { moduleId: mod!.id } })
                }
                style={[styles.weakCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <View style={[styles.weakDot, { backgroundColor: colors.destructive }]} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.weakTitle, { color: colors.foreground }]}>{mod!.title}</Text>
                  <Text style={[styles.weakSub, { color: colors.mutedForeground }]}>Low accuracy — practice again</Text>
                </View>
                <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
              </Pressable>
            ))}
          </>
        )}

        {/* Empty state */}
        {completedLessons === 0 && (
          <View style={[styles.emptyCard, { backgroundColor: colors.muted, borderColor: colors.border }]}>
            <Feather name="book-open" size={28} color={colors.primary} />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Start your first lesson!</Text>
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              Head to the Learn tab to browse all grammar topics.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 4,
  },
  greeting: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.75)",
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    color: "#ffffff",
  },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 20 },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    gap: 4,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    color: "#ffffff",
  },
  statLabel: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    color: "rgba(255,255,255,0.8)",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    marginBottom: 10,
  },
  continueCard: {
    borderRadius: 12,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  continueContent: { flex: 1, gap: 4 },
  continueModule: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: "rgba(255,255,255,0.7)",
  },
  continueLesson: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
    color: "#ffffff",
  },
  playCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  reviewTitle: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  reviewSub: { fontSize: 12, fontFamily: "Inter_400Regular" },
  weakCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  weakDot: { width: 8, height: 8, borderRadius: 4 },
  weakTitle: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  weakSub: { fontSize: 12, fontFamily: "Inter_400Regular" },
  emptyCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 28,
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  emptyTitle: { fontSize: 16, fontFamily: "Inter_700Bold" },
  emptyText: { fontSize: 13, fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 20 },
});
