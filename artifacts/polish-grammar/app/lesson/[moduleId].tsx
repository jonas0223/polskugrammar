import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { useProgress } from "@/contexts/ProgressContext";
import { getModuleById } from "@/data/modules";
import { getLearningResource, LearningSection } from "@/data/learningResources";

// ── Collapsible Grammar Note Section ─────────────────────────
function NoteSection({
  section,
  moduleColor,
}: {
  section: LearningSection;
  moduleColor: string;
}) {
  const [open, setOpen] = useState(false);
  const colors = useColors();

  return (
    <View style={[noteStyles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Pressable onPress={() => setOpen((p) => !p)} style={noteStyles.header}>
        <Text style={[noteStyles.sectionTitle, { color: colors.foreground }]}>
          {section.title}
        </Text>
        <Feather
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color={colors.mutedForeground}
        />
      </Pressable>

      {open && (
        <View style={noteStyles.body}>
          <Text style={[noteStyles.bodyText, { color: colors.foreground }]}>
            {section.body}
          </Text>

          {section.examples && section.examples.length > 0 && (
            <View style={[noteStyles.examplesBox, { backgroundColor: moduleColor + "0d" }]}>
              {section.examples.map((ex, i) => (
                <View
                  key={i}
                  style={[
                    noteStyles.exampleRow,
                    i < section.examples!.length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: moduleColor + "22",
                    },
                  ]}
                >
                  <Text style={[noteStyles.polishEx, { color: moduleColor }]}>
                    {ex.polish}
                  </Text>
                  <Text style={[noteStyles.englishEx, { color: colors.mutedForeground }]}>
                    {ex.english}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {section.tip && (
            <View style={[noteStyles.tipBox, { backgroundColor: colors.secondary, borderLeftColor: moduleColor }]}>
              <Feather name="zap" size={13} color={moduleColor} />
              <Text style={[noteStyles.tipText, { color: colors.foreground }]}>
                {section.tip}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const noteStyles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 8,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    gap: 10,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  body: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    gap: 12,
  },
  bodyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  examplesBox: {
    borderRadius: 10,
    overflow: "hidden",
  },
  exampleRow: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 2,
  },
  polishEx: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  englishEx: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    fontStyle: "italic",
  },
  tipBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    borderRadius: 10,
    borderLeftWidth: 3,
    padding: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 19,
  },
});

// ── Main Screen ───────────────────────────────────────────────
export default function ModuleLessonsScreen() {
  const { moduleId } = useLocalSearchParams<{ moduleId: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isLessonCompleted, getLessonProgress } = useProgress();

  const module = getModuleById(moduleId ?? "");
  const resource = getLearningResource(moduleId ?? "");

  const topPadding =
    Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top;
  const bottomPadding =
    Platform.OS === "web" ? Math.max(insets.bottom, 34) : insets.bottom;

  if (!module) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.destructive }]}>
          Module not found.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPadding + 16, paddingBottom: bottomPadding + 40 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Feather name="arrow-left" size={20} color={colors.primary} />
        <Text style={[styles.backText, { color: colors.primary }]}>Back</Text>
      </Pressable>

      <View style={[styles.moduleHeader, { backgroundColor: module.color + "14" }]}>
        <View style={[styles.moduleIconBg, { backgroundColor: module.color }]}>
          <Feather name="book" size={28} color="#fff" />
        </View>
        <Text style={[styles.moduleTitle, { color: colors.foreground }]}>
          {module.title}
        </Text>
        <Text style={[styles.moduleSub, { color: colors.mutedForeground }]}>
          {module.subtitle}
        </Text>
        <View style={[styles.levelBadge, { backgroundColor: module.color + "22" }]}>
          <Text style={[styles.levelText, { color: module.color }]}>
            CEFR {module.level}
          </Text>
        </View>
      </View>

      {/* ── Grammar Notes ─────────────────────────────────── */}
      {resource && resource.sections.length > 0 && (
        <>
          <View style={styles.sectionHeader}>
            <Feather name="book-open" size={13} color={module.color} />
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
              GRAMMAR NOTES
            </Text>
          </View>

          {resource.sections.map((sec, i) => (
            <NoteSection key={i} section={sec} moduleColor={module.color} />
          ))}

          <View style={[styles.sourceBadge, { backgroundColor: colors.secondary }]}>
            <Feather name="external-link" size={11} color={colors.mutedForeground} />
            <Text style={[styles.sourceText, { color: colors.mutedForeground }]}>
              Sourced & adapted from LingQ Polish Grammar Guide
            </Text>
          </View>
        </>
      )}

      {/* ── Lessons ───────────────────────────────────────── */}
      <View style={[styles.sectionHeader, { marginTop: resource ? 8 : 0 }]}>
        <Feather name="play-circle" size={13} color={module.color} />
        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          {module.lessons.length}{" "}
          {module.lessons.length === 1 ? "LESSON" : "LESSONS"}
        </Text>
      </View>

      {module.lessons.map((lesson, index) => {
        const completed = isLessonCompleted(module.id, lesson.id);
        const lessonProg = getLessonProgress(module.id, lesson.id);
        return (
          <Pressable
            key={lesson.id}
            onPress={() =>
              router.push({
                pathname: "/lesson/study",
                params: { moduleId: module.id, lessonId: lesson.id },
              })
            }
            style={({ pressed }) => [
              styles.lessonCard,
              {
                backgroundColor: colors.card,
                borderColor: completed ? module.color + "60" : colors.border,
                opacity: pressed ? 0.9 : 1,
              },
            ]}
          >
            <View
              style={[
                styles.lessonNumber,
                { backgroundColor: completed ? module.color : colors.secondary },
              ]}
            >
              {completed ? (
                <Feather name="check" size={14} color="#fff" />
              ) : (
                <Text style={[styles.lessonNumberText, { color: colors.primary }]}>
                  {index + 1}
                </Text>
              )}
            </View>
            <View style={styles.lessonContent}>
              <Text style={[styles.lessonTitle, { color: colors.foreground }]}>
                {lesson.title}
              </Text>
              <Text style={[styles.lessonInfo, { color: colors.mutedForeground }]}>
                {lesson.exercises.length} exercises
                {lessonProg?.accuracy !== undefined
                  ? ` · ${Math.round(lessonProg.accuracy * 100)}% accuracy`
                  : ""}
              </Text>
            </View>
            <Feather
              name={completed ? "refresh-ccw" : "play"}
              size={18}
              color={completed ? module.color : colors.primary}
            />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  errorText: { fontSize: 16, fontFamily: "Inter_500Medium" },
  backBtn: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 16 },
  backText: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
  moduleHeader: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    gap: 10,
    marginBottom: 24,
  },
  moduleIconBg: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  moduleTitle: { fontSize: 22, fontFamily: "Inter_700Bold", textAlign: "center" },
  moduleSub: { fontSize: 14, fontFamily: "Inter_400Regular", textAlign: "center" },
  levelBadge: { borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4 },
  levelText: { fontSize: 12, fontFamily: "Inter_700Bold" },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
    marginTop: 4,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
  },
  sourceBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: "flex-start",
    marginBottom: 20,
    marginTop: 4,
  },
  sourceText: { fontSize: 11, fontFamily: "Inter_400Regular" },
  lessonCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  lessonNumber: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  lessonNumberText: { fontSize: 15, fontFamily: "Inter_700Bold" },
  lessonContent: { flex: 1, gap: 3 },
  lessonTitle: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
  lessonInfo: { fontSize: 12, fontFamily: "Inter_400Regular" },
});
