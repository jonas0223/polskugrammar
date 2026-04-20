import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
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

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const MODES: { key: StudyMode; label: string; icon: string; count: number; color: string }[] = [
  { key: "quick",   label: "Quick",   icon: "zap",        count: 5,   color: "#054013" },
  { key: "refresh", label: "Refresh", icon: "refresh-cw", count: 30,  color: "#064b7d" },
  { key: "exam",    label: "Exam",    icon: "award",      count: 200, color: "#7c3aed" },
];

const TYPE_LABELS: Record<string, string> = {
  multiple_choice: "Multiple Choice",
  fill_blank: "Fill in the Blank",
  matching: "Matching",
  sentence_builder: "Sentence Builder",
  error_correction: "Error Correction",
};

export default function StudyScreen() {
  const { moduleId, lessonId } = useLocalSearchParams<{ moduleId: string; lessonId: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { completeLesson } = useProgress();

  const module = getModuleById(moduleId ?? "");
  const lesson = getLessonById(moduleId ?? "", lessonId ?? "");

  const [phase, setPhase] = useState<Phase>("intro");
  const [mode, setMode] = useState<StudyMode>("quick");
  const [currentEx, setCurrentEx] = useState(0);
  const [activeExercises, setActiveExercises] = useState(() => {
    const all = lesson?.exercises ?? [];
    return shuffleArray(all).slice(0, 5);
  });
  const mistakesRef = useRef<string[]>([]);
  const correctCountRef = useRef(0);

  const topPadding = Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top;
  const bottomPadding = Platform.OS === "web" ? Math.max(insets.bottom, 34) : insets.bottom;

  const startSession = (selectedMode: StudyMode) => {
    const all = lesson?.exercises ?? [];
    const modeObj = MODES.find((m) => m.key === selectedMode)!;
    setActiveExercises(shuffleArray(all).slice(0, modeObj.count));
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
      if (!correct) mistakesRef.current.push(ex.id);
      else correctCountRef.current += 1;

      const nextIndex = currentEx + 1;
      if (nextIndex >= activeExercises.length) {
        const total = activeExercises.length;
        const accuracy = correctCountRef.current / total;
        await completeLesson(moduleId ?? "", lessonId ?? "", accuracy, mistakesRef.current);
        setPhase("complete");
      } else {
        setCurrentEx(nextIndex);
      }
    },
    [currentEx, activeExercises, moduleId, lessonId, completeLesson]
  );

  if (!module || !lesson) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[{ color: colors.destructive, fontSize: 16, fontFamily: "Inter_500Medium" }]}>Lesson not found.</Text>
      </View>
    );
  }

  // ── COMPLETE SCREEN ──────────────────────────────────────────
  if (phase === "complete") {
    const total = activeExercises.length;
    const correct = correctCountRef.current;
    const accuracy = Math.round((correct / total) * 100);

    return (
      <View style={[styles.screen, { backgroundColor: colors.background }]}>
        <View style={[styles.blueHeader, { paddingTop: topPadding + 12, backgroundColor: colors.primary }]}>
          <Pressable onPress={() => router.back()} style={styles.backRow}>
            <Feather name="arrow-left" size={18} color="rgba(255,255,255,0.8)" />
            <Text style={styles.backText}>Back</Text>
          </Pressable>
          <Text style={styles.blueHeaderTitle}>Session Complete</Text>
        </View>

        <ScrollView contentContainerStyle={[styles.completePad, { paddingBottom: bottomPadding + 40 }]}>
          <View style={[styles.completeCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.medal, { backgroundColor: colors.primary + "18" }]}>
              <Feather name="award" size={44} color={accuracy >= 70 ? colors.primary : colors.accent} />
            </View>
            <Text style={[styles.completeTitle, { color: colors.foreground }]}>
              {accuracy >= 80 ? "Excellent!" : accuracy >= 60 ? "Good job!" : "Keep practising!"}
            </Text>
            <Text style={[styles.lessonName, { color: colors.mutedForeground }]}>{lesson.title}</Text>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={[styles.statNum, { color: colors.primary }]}>{accuracy}%</Text>
                <Text style={[styles.statLab, { color: colors.mutedForeground }]}>Accuracy</Text>
              </View>
              <View style={[styles.statDiv, { backgroundColor: colors.border }]} />
              <View style={styles.stat}>
                <Text style={[styles.statNum, { color: colors.primary }]}>{correct}/{total}</Text>
                <Text style={[styles.statLab, { color: colors.mutedForeground }]}>Correct</Text>
              </View>
              <View style={[styles.statDiv, { backgroundColor: colors.border }]} />
              <View style={styles.stat}>
                <Text style={[styles.statNum, { color: colors.accent }]}>+{accuracy}</Text>
                <Text style={[styles.statLab, { color: colors.mutedForeground }]}>XP</Text>
              </View>
            </View>
            {mistakesRef.current.length > 0 && (
              <Text style={[styles.mistakeHint, { color: colors.mutedForeground }]}>
                {mistakesRef.current.length} mistake{mistakesRef.current.length > 1 ? "s" : ""} added to review queue.
              </Text>
            )}
          </View>

          <View style={styles.completeBtns}>
            <Pressable onPress={() => router.back()} style={[styles.outlineBtn, { borderColor: colors.primary }]}>
              <Text style={[styles.outlineBtnText, { color: colors.primary }]}>Back</Text>
            </Pressable>
            <Pressable onPress={() => setPhase("intro")} style={[styles.solidBtn, { backgroundColor: colors.primary }]}>
              <Feather name="refresh-ccw" size={16} color="#fff" />
              <Text style={styles.solidBtnText}>Try Again</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    );
  }

  // ── INTRO SCREEN ─────────────────────────────────────────────
  if (phase === "intro") {
    const totalExercises = lesson.exercises.length;
    return (
      <View style={[styles.screen, { backgroundColor: colors.background }]}>
        <View style={[styles.blueHeader, { paddingTop: topPadding + 12, backgroundColor: colors.secondary }]}>
          <Pressable onPress={() => router.back()} style={styles.backRow}>
            <Feather name="arrow-left" size={18} color="rgba(255,255,255,0.8)" />
            <Text style={styles.backText}>Back</Text>
          </Pressable>
          <Text style={styles.blueHeaderTitle}>{lesson.title}</Text>
          <Text style={styles.blueHeaderSub}>{module.title}</Text>
        </View>

        <ScrollView
          contentContainerStyle={[styles.introPad, { paddingBottom: bottomPadding + 40 }]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>EXPLANATION</Text>
          <View style={[styles.box, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.explanationText, { color: colors.foreground }]}>{lesson.explanation}</Text>
          </View>

          <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>EXAMPLES</Text>
          {lesson.examples.map((ex, i) => (
            <View key={i} style={[styles.exCard, { backgroundColor: colors.highlight, borderColor: "#f0d98c" }]}>
              <Text style={[styles.polishEx, { color: colors.primary }]}>{ex.polish}</Text>
              <Text style={[styles.englishEx, { color: colors.mutedForeground }]}>{ex.english}</Text>
            </View>
          ))}

          <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>CHOOSE SESSION TYPE</Text>
          <View style={styles.modeGrid}>
            {MODES.map((m) => {
              const available = Math.min(m.count, totalExercises);
              return (
                <Pressable
                  key={m.key}
                  onPress={() => startSession(m.key)}
                  style={({ pressed }) => [styles.modeCard, {
                    backgroundColor: colors.card,
                    borderColor: m.color,
                    opacity: pressed ? 0.88 : 1,
                  }]}
                >
                  <View style={[styles.modeIcon, { backgroundColor: m.color + "18" }]}>
                    <Feather name={m.icon as any} size={22} color={m.color} />
                  </View>
                  <Text style={[styles.modeLabel, { color: colors.foreground }]}>{m.label}</Text>
                  <Text style={[styles.modeCount, { color: m.color }]}>{available}q</Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

  // ── EXERCISE SCREEN ───────────────────────────────────────────
  const exercise = activeExercises[currentEx];
  const progressPct = ((currentEx + 1) / activeExercises.length) * 100;
  const typeLabel = TYPE_LABELS[exercise?.type] ?? "Exercise";

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Blue fixed header */}
      <View style={[styles.blueHeader, { paddingTop: topPadding + 12, backgroundColor: colors.secondary }]}>
        <Pressable onPress={() => setPhase("intro")} style={styles.backRow}>
          <Feather name="arrow-left" size={18} color="rgba(255,255,255,0.8)" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.blueHeaderTitle}>{typeLabel}</Text>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>Question {currentEx + 1} of {activeExercises.length}</Text>
        </View>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progressPct}%` as any, backgroundColor: colors.accent }]} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.exercisePad, { paddingBottom: bottomPadding + 40 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ExerciseCard key={exercise.id} exercise={exercise} onAnswer={handleAnswer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  // Blue/green fixed header
  blueHeader: {
    paddingHorizontal: 20,
    paddingBottom: 18,
    gap: 4,
  },
  backRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
  backText: { fontSize: 14, fontFamily: "Inter_500Medium", color: "rgba(255,255,255,0.85)" },
  blueHeaderTitle: { fontSize: 22, fontFamily: "Inter_700Bold", color: "#fff" },
  blueHeaderSub: { fontSize: 13, fontFamily: "Inter_400Regular", color: "rgba(255,255,255,0.7)" },
  progressRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  progressLabel: { fontSize: 12, fontFamily: "Inter_500Medium", color: "rgba(255,255,255,0.8)" },
  progressBg: { height: 5, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.25)", marginTop: 6, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 3 },
  // Scrollable content pads
  introPad: { paddingHorizontal: 20, paddingTop: 20 },
  exercisePad: { paddingHorizontal: 20, paddingTop: 20 },
  completePad: { paddingHorizontal: 20, paddingTop: 24 },
  // Intro
  sectionLabel: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 1, marginBottom: 8, marginTop: 4 },
  box: { borderRadius: 12, borderWidth: 1, padding: 16, marginBottom: 20 },
  explanationText: { fontSize: 15, fontFamily: "Inter_400Regular", lineHeight: 24 },
  exCard: { borderRadius: 10, borderWidth: 1, padding: 14, marginBottom: 8, gap: 3 },
  polishEx: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
  englishEx: { fontSize: 13, fontFamily: "Inter_400Regular", fontStyle: "italic" },
  modeGrid: { flexDirection: "row", gap: 10, marginBottom: 8 },
  modeCard: { flex: 1, borderRadius: 12, borderWidth: 1.5, padding: 16, alignItems: "center", gap: 8 },
  modeIcon: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  modeLabel: { fontSize: 13, fontFamily: "Inter_700Bold" },
  modeCount: { fontSize: 12, fontFamily: "Inter_600SemiBold" },
  // Complete
  completeCard: { borderRadius: 16, borderWidth: 1, padding: 28, alignItems: "center", gap: 12, marginBottom: 20 },
  medal: { width: 80, height: 80, borderRadius: 24, alignItems: "center", justifyContent: "center", marginBottom: 4 },
  completeTitle: { fontSize: 24, fontFamily: "Inter_700Bold" },
  lessonName: { fontSize: 14, fontFamily: "Inter_400Regular" },
  statsRow: { flexDirection: "row", alignItems: "center", paddingTop: 16 },
  stat: { flex: 1, alignItems: "center", gap: 4 },
  statNum: { fontSize: 22, fontFamily: "Inter_700Bold" },
  statLab: { fontSize: 11, fontFamily: "Inter_500Medium" },
  statDiv: { width: 1, height: 36 },
  mistakeHint: { fontSize: 12, fontFamily: "Inter_400Regular", textAlign: "center", marginTop: 4 },
  completeBtns: { flexDirection: "row", gap: 12 },
  outlineBtn: { flex: 1, borderRadius: 12, borderWidth: 1.5, padding: 14, alignItems: "center" },
  outlineBtnText: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  solidBtn: { flex: 1, borderRadius: 12, padding: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 },
  solidBtnText: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: "#fff" },
});
