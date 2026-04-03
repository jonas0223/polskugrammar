import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";
import { useProgress } from "@/contexts/ProgressContext";
import { Module } from "@/data/modules";

interface ModuleCardProps {
  module: Module;
}

const ICON_MAP: Record<string, string> = {
  users: "users",
  book: "book",
  clock: "clock",
  layout: "layout",
  "arrow-right": "arrow-right",
  "x-circle": "x-circle",
  "help-circle": "help-circle",
  hash: "hash",
  tag: "tag",
  "map-pin": "map-pin",
  "rotate-ccw": "rotate-ccw",
  "message-circle": "message-circle",
};

export function ModuleCard({ module }: ModuleCardProps) {
  const colors = useColors();
  const router = useRouter();
  const { isLessonCompleted, getModuleProgress } = useProgress();

  const totalLessons = module.lessons.length;
  const completedLessons = module.lessons.filter((l) =>
    isLessonCompleted(module.id, l.id)
  ).length;
  const progress = totalLessons > 0 ? completedLessons / totalLessons : 0;

  const iconName = (ICON_MAP[module.icon] ?? "book") as keyof typeof Feather.glyphMap;

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/lesson/[moduleId]",
          params: { moduleId: module.id },
        })
      }
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          opacity: pressed ? 0.92 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View style={[styles.iconBg, { backgroundColor: module.color + "20" }]}>
        <Feather name={iconName} size={24} color={module.color} />
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: colors.foreground }]}>
            {module.title}
          </Text>
          <View
            style={[
              styles.levelBadge,
              { backgroundColor: module.color + "18" },
            ]}
          >
            <Text style={[styles.levelText, { color: module.color }]}>
              {module.level}
            </Text>
          </View>
        </View>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          {module.subtitle}
        </Text>

        <View style={styles.progressRow}>
          <View style={[styles.progressBg, { backgroundColor: colors.muted }]}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: module.color,
                  width: `${progress * 100}%` as any,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: colors.mutedForeground }]}>
            {completedLessons}/{totalLessons}
          </Text>
        </View>
      </View>

      <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconBg: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    flex: 1,
  },
  levelBadge: {
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  levelText: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  progressBg: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
  },
});
