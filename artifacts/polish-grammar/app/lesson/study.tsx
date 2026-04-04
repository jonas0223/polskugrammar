import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ExerciseCard } from "@/components/ExerciseCard";
import { useProgress } from "@/contexts/ProgressContext";
import { useColors } from "@/hooks/useColors";
import { getLessonById, getModuleById } from "@/data/modules";

type Phase = "intro" | "exercises" | "complete";
type StudyMode = "quick" | "refresh" | "exam";

const MODES: { key: StudyMode; label: string; icon: string; count: number; desc: string; color: string }[] = [
  { key: "quick",   label: "Quick",   icon: "zap",        count: 5,   desc: "5 questions",   color: "#16a34a" },
  { key: "refresh", label: "Refresh", icon: "refresh-cw", count: 30,  desc: "30 questions",  color: "#0891b2" },
  { key: "exam",    label: "Exam",    icon: "award",      count: 200, desc: "All questions",  color: "#7c3aed" },
];

export default function StudyScreen() {
  const { moduleId, lessonId } = useLocalSearchParams<{
    moduleId: string;
    lessonId: string;
  }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { completeLesson } = useProgress();

  const module = getModuleById(moduleId ?? "");
  const lesson = getLessonById(moduleId ?? "", lessonId ?? "");

  const [phase, setPhase] = useState<Phase>("intro");
  const [mode, setMode] = useState<StudyMode>("quick");
  const [currentEx, setCurrentEx] = useState(0);
  const mistakesRef = useRef<string[]>([]);
  const correctCountRef = useRef(0);

  const activeExercises = useMemo(() => {
    const all = lesson?.exercises ?? [];
    const modeObj = MODES.find((m) => m.key === mode)!;
    return all.slice(0, modeObj.count);
  }, [lesson, mode]);

  const startSession = (selectedMode: StudyMode) => {
    setMode(selectedMode);
    setCurrentEx(0);
    mistakesRef.current = [];
    correctCountRef.current = 0;
    setPhase("exercises");
  };

  const handleAnswer = useCallback(
    async (correct: boolean) => {
      const ex = activeExercises[currentEx];
      if (!ex) return;

      if (!correct) {
        mistakesRef.current.push(ex.id);
      } else {
        correctCountRef.current += 1;
      }

      const nextIndex = currentEx + 1;
      if (nextIndex >= activeExercises.length) {
        const total = activeExercises.length;
        const accuracy = correctCountRef.current / total;
        await completeLesson(
          moduleId ?? "",
          lessonId ?? "",
          accuracy,
          mistakesRef.current
        );
        setPhase("complete");
      } else {
        setCurrentEx(nextIndex);
      }
    },
    [currentEx, activeExercises, moduleId, lessonId, completeLesson]
  );

  const topPadding =
    Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top;
  const bottomPadding =
    Platform.OS === "web" ? Math.max(insets.bottom, 34) : insets.bottom;

  if (!module || !lesson) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.destructive }]}>
          Lesson not found.
        </Text>
      </View>
    );
  }

  // ── COMPLETE SCREEN ──────────────────────────────────────────
  if (phase === "complete") {
    const total = activeExercises.length;
    const correct = correctCountRef.current;
    const accuracy = Math.round((correct / total) * 100);
    const modeObj = MODES.find((m) => m.key === mode)!;

    return (
      <View
        style={[
          styles.completeContainer,
          {
            backgroundColor: colors.background,
            paddingTop: topPadding + 20,
            paddingBottom: bottomPadding + 20,
          },
        ]}
      >
        <View style={[styles.completeCard, { backgroundColor: colors.card }]}>
          <View
            style={[styles.completeMedal, { backgroundColor: module.color + "20" }]}
          >
            <Feather
              name="award"
              size={40}
              color={accuracy >= 70 ? module.color : colors.warning}
            />
          </View>
          <View style={[styles.modeBadge, { backgroundColor: modeObj.color + "18" }]}>
            <Feather name={modeObj.icon as any} size={12} color={modeObj.color} />
            <Text style={[styles.modeBadgeText, { color: modeObj.color }]}>
              {modeObj.label} Mode
            </Text>
          </View>
          <Text style={[styles.completeTitle, { color: colors.foreground }]}>
            Session Complete!
          </Text>
          <Text style={[styles.lessonName, { color: colors.mutedForeground }]}>
            {lesson.title}
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={[styles.statNum, { color: module.color }]}>
                {accuracy}%
              </Text>
              <Text style={[styles.statLab, { color: colors.mutedForeground }]}>
                Accuracy
              </Text>
            </View>
            <View
              style={[styles.statDivider, { backgroundColor: colors.border }]}
            />
            <View style={styles.stat}>
              <Text style={[styles.statNum, { color: module.color }]}>
                {correct}/{total}
              </Text>
              <Text style={[styles.statLab, { color: colors.mutedForeground }]}>
                Correct
              </Text>
            </View>
            <View
              style={[styles.statDivider, { backgroundColor: colors.border }]}
            />
            <View style={styles.stat}>
              <Text style={[styles.statNum, { color: module.color }]}>
                +{accuracy}
              </Text>
              <Text style={[styles.statLab, { color: colors.mutedForeground }]}>
                XP Earned
              </Text>
            </View>
          </View>
          {mistakesRef.current.length > 0 && (
            <Text style={[styles.mistakeHint, { color: colors.mutedForeground }]}>
              {mistakesRef.current.length} mistake
              {mistakesRef.current.length > 1 ? "s" : ""} added to your review queue.
            </Text>
          )}
        </View>

        <View style={styles.completeBtns}>
          <Pressable
            onPress={() => router.back()}
            style={[styles.outlineBtn, { borderColor: colors.primary }]}
          >
            <Text style={[styles.outlineBtnText, { color: colors.primary }]}>
              Back
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setPhase("intro")}
            style={[styles.solidBtn, { backgroundColor: module.color }]}
          >
            <Feather name="refresh-ccw" size={16} color="#fff" />
            <Text style={styles.solidBtnText}>Try Again</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // ── INTRO SCREEN ─────────────────────────────────────────────
  if (phase === "intro") {
    const totalExercises = lesson.exercises.length;

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

        <View
          style={[styles.introHeader, { backgroundColor: module.color + "14" }]}
        >
          <Text style={[styles.moduleTag, { color: module.color }]}>
            {module.title}
          </Text>
          <Text style={[styles.lessonTitle, { color: colors.foreground }]}>
            {lesson.title}
          </Text>
          <Text style={[styles.exerciseCount, { color: colors.mutedForeground }]}>
            {totalExercises} exercises available
          </Text>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          EXPLANATION
        </Text>
        <View style={[styles.explanationBox, { backgroundColor: colors.card }]}>
          <Text style={[styles.explanationText, { color: colors.foreground }]}>
            {lesson.explanation}
          </Text>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          EXAMPLES
        </Text>
        {lesson.examples.map((ex, i) => (
          <View
            key={i}
            style={[styles.exampleCard, { backgroundColor: colors.secondary }]}
          >
            <Text style={[styles.polishText, { color: colors.primary }]}>
              {ex.polish}
            </Text>
            <Text
              style={[styles.englishText, { color: colors.mutedForeground }]}
            >
              {ex.english}
            </Text>
          </View>
        ))}

        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          CHOOSE SESSION TYPE
        </Text>

        <View style={styles.modeGrid}>
          {MODES.map((m) => {
            const available = Math.min(m.count, totalExercises);
            const disabled = totalExercises < 1;
            return (
              <Pressable
                key={m.key}
                onPress={() => !disabled && startSession(m.key)}
                style={[
                  styles.modeCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: m.color,
                    borderWidth: 1.5,
                    opacity: disabled ? 0.4 : 1,
                  },
                ]}
              >
                <View style={[styles.modeIcon, { backgroundColor: m.color + "18" }]}>
                  <Feather name={m.icon as any} size={22} color={m.color} />
                </View>
                <Text style={[styles.modeLabel, { color: colors.foreground }]}>
                  {m.label}
                </Text>
                <Text style={[styles.modeCount, { color: m.color }]}>
                  {available} question{available !== 1 ? "s" : ""}
                </Text>
                <Text style={[styles.modeDesc, { color: colors.mutedForeground }]}>
                  {m.key === "quick" && "Fast practice"}
                  {m.key === "refresh" && "Solid review"}
                  {m.key === "exam" && "Full coverage"}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  // ── EXERCISE SCREEN ──────────────────────────────────────────
  const exercise = activeExercises[currentEx];
  const progressPct = ((currentEx + 1) / activeExercises.length) * 100;
  const modeObj = MODES.find((m) => m.key === mode)!;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: topPadding + 16, paddingBottom: bottomPadding + 40 },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.exerciseHeader}>
        <Pressable
          onPress={() => setPhase("intro")}
          style={styles.quitBtn}
        >
          <Feather name="x" size={20} color={colors.mutedForeground} />
        </Pressable>
        <View style={[styles.progressBg, { backgroundColor: colors.muted }]}>
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: modeObj.color,
                width: `${progressPct}%` as any,
              },
            ]}
          />
        </View>
        <Text style={[styles.progressCount, { color: colors.mutedForeground }]}>
          {currentEx + 1}/{activeExercises.length}
        </Text>
      </View>

      <View style={[styles.modePill, { backgroundColor: modeObj.color + "14" }]}>
        <Feather name={modeObj.icon as any} size={11} color={modeObj.color} />
        <Text style={[styles.modePillText, { color: modeObj.color }]}>
          {modeObj.label}
        </Text>
      </View>

      <ExerciseCard key={exercise.id} exercise={exercise} onAnswer={handleAnswer} />
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
  introHeader: { borderRadius: 20, padding: 24, alignItems: "center", gap: 8, marginBottom: 24 },
  moduleTag: { fontSize: 12, fontFamily: "Inter_700Bold", textTransform: "uppercase", letterSpacing: 0.8 },
  lessonTitle: { fontSize: 24, fontFamily: "Inter_700Bold", textAlign: "center" },
  exerciseCount: { fontSize: 13, fontFamily: "Inter_400Regular" },
  sectionLabel: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 1, marginBottom: 10, marginTop: 4 },
  explanationBox: { borderRadius: 14, padding: 16, marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  explanationText: { fontSize: 15, fontFamily: "Inter_400Regular", lineHeight: 24 },
  exampleCard: { borderRadius: 12, padding: 14, marginBottom: 8, gap: 4 },
  polishText: { fontSize: 16, fontFamily: "Inter_600SemiBold" },
  englishText: { fontSize: 13, fontFamily: "Inter_400Regular", fontStyle: "italic" },
  modeGrid: { flexDirection: "row", gap: 10, marginTop: 4, marginBottom: 8 },
  modeCard: { flex: 1, borderRadius: 16, padding: 16, alignItems: "center", gap: 6, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  modeIcon: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  modeLabel: { fontSize: 15, fontFamily: "Inter_700Bold" },
  modeCount: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  modeDesc: { fontSize: 11, fontFamily: "Inter_400Regular", textAlign: "center" },
  modePill: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, alignSelf: "flex-start", marginBottom: 14 },
  modePillText: { fontSize: 11, fontFamily: "Inter_700Bold", textTransform: "uppercase", letterSpacing: 0.5 },
  exerciseHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 8 },
  quitBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  progressBg: { flex: 1, height: 6, borderRadius: 3, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 3 },
  progressCount: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  completeContainer: { flex: 1, paddingHorizontal: 20, justifyContent: "center", gap: 20 },
  completeCard: { borderRadius: 24, padding: 28, alignItems: "center", gap: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 5 },
  completeMedal: { width: 80, height: 80, borderRadius: 24, alignItems: "center", justifyContent: "center", marginBottom: 4 },
  modeBadge: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  modeBadgeText: { fontSize: 12, fontFamily: "Inter_600SemiBold" },
  completeTitle: { fontSize: 26, fontFamily: "Inter_700Bold" },
  lessonName: { fontSize: 14, fontFamily: "Inter_400Regular" },
  statsRow: { flexDirection: "row", alignItems: "center", paddingTop: 16 },
  stat: { flex: 1, alignItems: "center", gap: 4 },
  statNum: { fontSize: 22, fontFamily: "Inter_700Bold" },
  statLab: { fontSize: 11, fontFamily: "Inter_500Medium" },
  statDivider: { width: 1, height: 36 },
  mistakeHint: { fontSize: 12, fontFamily: "Inter_400Regular", textAlign: "center", marginTop: 4 },
  completeBtns: { flexDirection: "row", gap: 12 },
  outlineBtn: { flex: 1, borderRadius: 14, borderWidth: 1.5, padding: 14, alignItems: "center" },
  outlineBtnText: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  solidBtn: { flex: 1, borderRadius: 14, padding: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 },
  solidBtnText: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: "#fff" },
});
