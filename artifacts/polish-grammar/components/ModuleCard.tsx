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

export function ModuleCard({ module }: ModuleCardProps) {
  const colors = useColors();
  const router = useRouter();
  const { isLessonCompleted } = useProgress();

  const totalLessons = module.lessons.length;
  const completedLessons = module.lessons.filter((l) =>
    isLessonCompleted(module.id, l.id)
  ).length;

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
          borderColor: colors.border,
          opacity: pressed ? 0.88 : 1,
        },
      ]}
    >
      <View style={[styles.leftBorder, { backgroundColor: module.color }]} />

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.foreground }]}>
          {module.title}
        </Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          {module.subtitle}
        </Text>
        <Text style={[styles.lessonCount, { color: module.color }]}>
          {completedLessons}/{totalLessons} lessons
        </Text>
      </View>

      <Feather name="arrow-right" size={18} color={colors.mutedForeground} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    overflow: "hidden",
  },
  leftBorder: {
    width: 5,
    alignSelf: "stretch",
  },
  content: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 14,
    paddingRight: 8,
    gap: 3,
  },
  title: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  lessonCount: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    marginTop: 2,
  },
});
