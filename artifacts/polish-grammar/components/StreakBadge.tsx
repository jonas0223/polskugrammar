import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";

interface StreakBadgeProps {
  streak: number;
  compact?: boolean;
}

export function StreakBadge({ streak, compact = false }: StreakBadgeProps) {
  const colors = useColors();

  if (compact) {
    return (
      <View style={[styles.compact, { backgroundColor: "#fef3c7" }]}>
        <Feather name="zap" size={14} color="#f59e0b" />
        <Text style={[styles.compactText, { color: "#92400e" }]}>
          {streak}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: "#fef3c7", borderColor: "#fde68a" }]}>
      <Feather name="zap" size={20} color="#f59e0b" />
      <View>
        <Text style={styles.streakNumber}>{streak}</Text>
        <Text style={styles.streakLabel}>day streak</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  streakNumber: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#92400e",
  },
  streakLabel: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: "#b45309",
  },
  compact: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  compactText: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
  },
});
