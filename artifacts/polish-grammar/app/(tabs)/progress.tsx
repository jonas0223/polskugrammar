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

import { StreakBadge } from "@/components/StreakBadge";
import { XPBar } from "@/components/XPBar";
import { useProgress } from "@/contexts/ProgressContext";
import { useColors } from "@/hooks/useColors";
import { MODULES } from "@/data/modules";

export default function ProgressScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { progress, resetProgress } = useProgress();

  const moduleStats = useMemo(() => {
    return MODULES.map((mod) => {
      const lessonKeys = mod.lessons.map(
        (l) => `${mod.id}__${l.id}`
      );
      const done = lessonKeys.filter(
        (k) => progress.lessonProgress[k]?.completed
      );
      const accuracies = done.map(
        (k) => progress.lessonProgress[k]?.accuracy ?? 0
      );
      const avgAccuracy =
        accuracies.length > 0
          ? Math.round(
              (accuracies.reduce((a, b) => a + b, 0) / accuracies.length) * 100
            )
          : null;
      return {
        module: mod,
        completed: done.length,
        total: mod.lessons.length,
        avgAccuracy,
      };
    });
  }, [progress]);

  const handleReset = () => {
    Alert.alert(
      "Reset Progress",
      "This will erase all your progress, streaks, and XP. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => resetProgress(),
        },
      ]
    );
  };

  const topPadding =
    Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top;
  const bottomPadding =
    Platform.OS === "web" ? Math.max(insets.bottom, 34) : insets.bottom;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPadding + 16, paddingBottom: bottomPadding + 100 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: colors.foreground }]}>
        Progress
      </Text>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <XPBar xp={progress.totalXP} />
      </View>

      <View style={styles.streakRow}>
        <StreakBadge streak={progress.streak} />
        <View style={[styles.reviewQueueChip, { backgroundColor: colors.secondary }]}>
          <Feather name="refresh-cw" size={16} color={colors.primary} />
          <View>
            <Text style={[styles.queueNumber, { color: colors.primary }]}>
              {progress.reviewQueue.length}
            </Text>
            <Text style={[styles.queueLabel, { color: colors.mutedForeground }]}>
              to review
            </Text>
          </View>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
        Module Performance
      </Text>

      {moduleStats.map(({ module, completed, total, avgAccuracy }) => (
        <View
          key={module.id}
          style={[styles.moduleRow, { backgroundColor: colors.card }]}
        >
          <View
            style={[
              styles.moduleIcon,
              { backgroundColor: module.color + "20" },
            ]}
          >
            <Feather name="book" size={18} color={module.color} />
          </View>
          <View style={styles.moduleContent}>
            <View style={styles.moduleHeader}>
              <Text style={[styles.moduleTitle, { color: colors.foreground }]}>
                {module.title}
              </Text>
              {avgAccuracy !== null && (
                <Text
                  style={[
                    styles.accuracy,
                    {
                      color:
                        avgAccuracy >= 80
                          ? colors.success
                          : avgAccuracy >= 60
                          ? colors.warning
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
                    width:
                      total > 0
                        ? (`${(completed / total) * 100}%` as any)
                        : "0%",
                  },
                ]}
              />
            </View>
            <Text
              style={[styles.lessonCount, { color: colors.mutedForeground }]}
            >
              {completed}/{total} lessons completed
            </Text>
          </View>
        </View>
      ))}

      <Pressable
        onPress={handleReset}
        style={[
          styles.resetBtn,
          { borderColor: colors.destructive },
        ]}
      >
        <Feather name="trash-2" size={16} color={colors.destructive} />
        <Text style={[styles.resetText, { color: colors.destructive }]}>
          Reset All Progress
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  title: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    marginBottom: 16,
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
  streakRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  reviewQueueChip: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "transparent",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  queueNumber: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  queueLabel: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
    marginBottom: 12,
  },
  moduleRow: {
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  moduleIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  moduleContent: {
    flex: 1,
    gap: 4,
  },
  moduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moduleTitle: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    flex: 1,
  },
  accuracy: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
  },
  barBg: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 2,
  },
  lessonCount: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
  },
  resetBtn: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
  },
  resetText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
});
