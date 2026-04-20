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

  const topPadding =
    Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top;
  const bottomPadding =
    Platform.OS === "web" ? Math.max(insets.bottom, 34) : insets.bottom;

  const filtered = useMemo(() => {
    return MODULES.filter((m) => {
      const matchesSearch =
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.subtitle.toLowerCase().includes(search.toLowerCase());
      const matchesLevel = activeLevel === "All" || m.level === activeLevel;
      return matchesSearch && matchesLevel;
    });
  }, [search, activeLevel]);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* ── Fixed green header ── */}
      <View style={[styles.header, { paddingTop: topPadding + 12, backgroundColor: colors.primary }]}>
        <Text style={styles.headerTitle}>Learn</Text>
      </View>

      {/* ── Scrollable body ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPadding + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Search bar */}
        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
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
            <Feather name="x" size={16} color={colors.mutedForeground} onPress={() => setSearch("")} />
          )}
        </View>

        {/* Level filter chips */}
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
                  backgroundColor: activeLevel === level ? colors.primary : colors.card,
                  borderColor: activeLevel === level ? colors.primary : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.levelChipText,
                  { color: activeLevel === level ? "#fff" : colors.foreground },
                ]}
              >
                {level}
              </Text>
            </View>
          ))}
        </View>

        {/* Module list */}
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Feather name="search" size={32} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>No modules found</Text>
          </View>
        ) : (
          filtered.map((mod) => <ModuleCard key={mod.id} module={mod} />)
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
  headerTitle: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    color: "#ffffff",
    marginTop: 4,
  },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 20 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
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
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  levelChipText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  empty: { alignItems: "center", paddingTop: 40, gap: 10 },
  emptyText: { fontSize: 16, fontFamily: "Inter_500Medium" },
});
