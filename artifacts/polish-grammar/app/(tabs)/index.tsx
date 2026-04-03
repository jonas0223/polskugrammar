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

  const completedLessons = useMemo(
    () => Object.values(progress.lessonProgress).filter((p) => p.completed).length,
    [progress]
  );

  const totalLessons = MODULES.reduce((acc, m) => acc + m.lessons.length, 0);

  const recentModules = useMemo(() => {
    const recent = Object.values(progress.lessonProgress)
      .filter((p) => p.completed && p.completedAt)
      .sort(
        (a, b) =>
          new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()
      )
      .slice(0, 3)
      .map((p) => MODULES.find((m) => m.id === p.moduleId))
      .filter(Boolean);
    return [...new Map(recent.map((m) => [m!.id, m])).values()];
  }, [progress]);

  const weakAreas = useMemo(() => {
    return getWeakAreas()
      .map((id) => MODULES.find((m) => m.id === id))
      .filter(Boolean)
      .slice(0, 2);
  }, [getWeakAreas]);

  const nextLesson = useMemo(() => {
    for (const mod of MODULES) {
      for (const lesson of mod.lessons) {
        if (!isLessonCompleted(mod.id, lesson.id)) {
          return { module: mod, lesson };
        }
      }
    }
    return null;
  }, [isLessonCompleted]);

  const overallAccuracy = useMemo(() => {
    const lessons = Object.values(progress.lessonProgress).filter(
      (p) => p.completed
    );
    if (lessons.length === 0) return null;
    const avg = lessons.reduce((a, b) => a + b.accuracy, 0) / lessons.length;
    return Math.round(avg * 100);
  }, [progress]);

  const topPadding =
    Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top;
  const bottomPadding =
    Platform.OS === "web" ? Math.max(insets.bottom, 34) : insets.bottom;

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
        <View>
          <Text style={[styles.greeting, { color: colors.mutedForeground }]}>
            Dzień dobry!
          </Text>
          <Text style={[styles.title, { color: colors.foreground }]}>
            Your Progress
          </Text>
        </View>
        <StreakBadge streak={progress.streak} compact />
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <XPBar xp={progress.totalXP} />
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.primary }]}>
          <Text style={styles.statNumber}>{completedLessons}</Text>
          <Text style={styles.statLabel}>Lessons{"\n"}Done</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>
            {totalLessons - completedLessons}
          </Text>
          <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
            Remaining
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>
            {overallAccuracy !== null ? `${overallAccuracy}%` : "-"}
          </Text>
          <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
            Accuracy
          </Text>
        </View>
      </View>

      {nextLesson && (
        <>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Continue Learning
          </Text>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/lesson/[moduleId]",
                params: { moduleId: nextLesson.module.id },
              })
            }
            style={({ pressed }) => [
              styles.nextLessonCard,
              {
                backgroundColor: nextLesson.module.color,
                opacity: pressed ? 0.9 : 1,
              },
            ]}
          >
            <View style={styles.nextLessonContent}>
              <Text style={styles.nextLessonModule}>
                {nextLesson.module.title}
              </Text>
              <Text style={styles.nextLessonTitle}>
                {nextLesson.lesson.title}
              </Text>
            </View>
            <View style={styles.nextArrow}>
              <Feather name="play-circle" size={32} color="rgba(255,255,255,0.9)" />
            </View>
          </Pressable>
        </>
      )}

      {progress.reviewQueue.length > 0 && (
        <>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Review Mistakes
          </Text>
          <Pressable
            onPress={() => router.push("/(tabs)/review")}
            style={({ pressed }) => [
              styles.reviewCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.warning,
                opacity: pressed ? 0.9 : 1,
              },
            ]}
          >
            <Feather name="refresh-cw" size={24} color={colors.warning} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.reviewTitle, { color: colors.foreground }]}>
                Spaced Repetition Review
              </Text>
              <Text style={[styles.reviewSub, { color: colors.mutedForeground }]}>
                {progress.reviewQueue.length} exercises to review
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
          </Pressable>
        </>
      )}

      {weakAreas.length > 0 && (
        <>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Needs Practice
          </Text>
          {weakAreas.map((mod) => (
            <Pressable
              key={mod!.id}
              onPress={() =>
                router.push({
                  pathname: "/lesson/[moduleId]",
                  params: { moduleId: mod!.id },
                })
              }
              style={[styles.weakCard, { backgroundColor: colors.card, borderColor: colors.errorLight }]}
            >
              <View style={[styles.weakDot, { backgroundColor: colors.destructive }]} />
              <Text style={[styles.weakTitle, { color: colors.foreground }]}>
                {mod!.title}
              </Text>
              <Text style={[styles.weakSub, { color: colors.mutedForeground }]}>
                Low accuracy — practice again
              </Text>
            </Pressable>
          ))}
        </>
      )}

      {completedLessons === 0 && (
        <View style={[styles.emptyCard, { backgroundColor: colors.secondary }]}>
          <Feather name="book-open" size={28} color={colors.primary} />
          <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
            Start your first lesson!
          </Text>
          <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
            Head to the Learn tab to browse all grammar topics.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  greeting: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginBottom: 2,
  },
  title: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    gap: 4,
  },
  statNumber: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    color: "rgba(255,255,255,0.8)",
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
    marginBottom: 10,
  },
  nextLessonCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  nextLessonContent: {
    flex: 1,
    gap: 4,
  },
  nextLessonModule: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: "rgba(255,255,255,0.75)",
  },
  nextLessonTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  nextArrow: {
    marginLeft: 12,
  },
  reviewCard: {
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  reviewTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  reviewSub: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  weakCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  weakDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  weakTitle: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    flex: 1,
  },
  weakSub: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  emptyCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 20,
  },
});
