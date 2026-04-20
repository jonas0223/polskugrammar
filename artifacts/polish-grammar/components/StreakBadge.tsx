import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StreakBadgeProps {
  streak: number;
  compact?: boolean;
}

const GOLD = "#FBCC32";
const GOLD_BG = "#fff2cc";
const GOLD_DARK = "#7a5c00";

export function StreakBadge({ streak, compact = false }: StreakBadgeProps) {
  if (compact) {
    return (
      <View style={[styles.compact, { backgroundColor: GOLD }]}>
        <Feather name="zap" size={13} color="#fff" />
        <Text style={[styles.compactText, { color: "#fff" }]}>
          {streak} XP
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: GOLD }]}>
      <Feather name="zap" size={22} color="#fff" />
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
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  streakNumber: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  streakLabel: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: "rgba(255,255,255,0.85)",
  },
  compact: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  compactText: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
  },
});
