import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";

interface XPBarProps {
  xp: number;
}

function getLevel(xp: number): { level: number; current: number; max: number } {
  const thresholds = [0, 100, 250, 500, 900, 1400, 2100, 3000, 4200, 5700];
  let level = 1;
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (xp >= thresholds[i]) {
      level = i + 1;
      break;
    }
  }
  const currentThresh = thresholds[Math.min(level - 1, thresholds.length - 1)];
  const nextThresh =
    thresholds[Math.min(level, thresholds.length - 1)] ?? currentThresh + 1000;
  return {
    level,
    current: xp - currentThresh,
    max: nextThresh - currentThresh,
  };
}

export function XPBar({ xp }: XPBarProps) {
  const colors = useColors();
  const { level, current, max } = getLevel(xp);
  const progress = Math.min(current / max, 1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.levelText, { color: colors.primary }]}>
          Level {level}
        </Text>
        <Text style={[styles.xpText, { color: colors.mutedForeground }]}>
          {current} / {max} XP to next level
        </Text>
      </View>
      <View style={[styles.barBg, { backgroundColor: colors.muted }]}>
        <View
          style={[
            styles.barFill,
            {
              backgroundColor: colors.primary,
              width: `${progress * 100}%` as any,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  levelText: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
  },
  xpText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  barBg: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 4,
  },
});
