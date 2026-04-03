import React, { useMemo, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { ModuleCard } from "@/components/ModuleCard";
import { useColors } from "@/hooks/useColors";
import { MODULES } from "@/data/modules";

const LEVELS = ["All", "A1", "A2"] as const;

export default function LearnScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [activeLevel, setActiveLevel] = useState<"All" | "A1" | "A2">("All");

  const filtered = useMemo(() => {
    return MODULES.filter((m) => {
      const matchesSearch =
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.subtitle.toLowerCase().includes(search.toLowerCase());
      const matchesLevel =
        activeLevel === "All" || m.level === activeLevel;
      return matchesSearch && matchesLevel;
    });
  }, [search, activeLevel]);

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
        Grammar Topics
      </Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        {MODULES.length} modules · CEFR A1–A2
      </Text>

      <View
        style={[
          styles.searchBar,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Feather name="search" size={16} color={colors.mutedForeground} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search topics..."
          placeholderTextColor={colors.mutedForeground}
          style={[styles.searchInput, { color: colors.foreground }]}
          autoCorrect={false}
        />
        {search.length > 0 && (
          <Feather
            name="x"
            size={16}
            color={colors.mutedForeground}
            onPress={() => setSearch("")}
          />
        )}
      </View>

      <View style={styles.levelRow}>
        {LEVELS.map((level) => (
          <View
            key={level}
            onStartShouldSetResponder={() => {
              setActiveLevel(level);
              return true;
            }}
            style={[
              styles.levelChip,
              {
                backgroundColor:
                  activeLevel === level ? colors.primary : colors.secondary,
                borderColor:
                  activeLevel === level ? colors.primary : colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.levelChipText,
                {
                  color:
                    activeLevel === level
                      ? "#fff"
                      : colors.foreground,
                },
              ]}
            >
              {level}
            </Text>
          </View>
        ))}
      </View>

      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Feather name="search" size={32} color={colors.mutedForeground} />
          <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
            No modules found
          </Text>
        </View>
      ) : (
        filtered.map((mod) => <ModuleCard key={mod.id} module={mod} />)
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  title: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
  },
  levelRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  levelChip: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  levelChipText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  empty: {
    alignItems: "center",
    paddingTop: 40,
    gap: 10,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
  },
});
