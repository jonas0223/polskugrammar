import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface LessonProgress {
  lessonId: string;
  moduleId: string;
  completed: boolean;
  accuracy: number;
  completedAt?: string;
  mistakeIds: string[];
}

export interface ProgressState {
  lessonProgress: Record<string, LessonProgress>;
  streak: number;
  lastStudyDate: string | null;
  totalXP: number;
  reviewQueue: string[];
}

interface ProgressContextType {
  progress: ProgressState;
  completeLesson: (
    moduleId: string,
    lessonId: string,
    accuracy: number,
    mistakeIds: string[]
  ) => Promise<void>;
  getLessonProgress: (moduleId: string, lessonId: string) => LessonProgress | undefined;
  getModuleProgress: (moduleId: string) => number;
  isLessonCompleted: (moduleId: string, lessonId: string) => boolean;
  addToReviewQueue: (exerciseId: string) => Promise<void>;
  removeFromReviewQueue: (exerciseId: string) => Promise<void>;
  resetProgress: () => Promise<void>;
  getWeakAreas: () => string[];
}

const defaultState: ProgressState = {
  lessonProgress: {},
  streak: 0,
  lastStudyDate: null,
  totalXP: 0,
  reviewQueue: [],
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = "@polish_grammar_progress";

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(defaultState);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ProgressState;
        setProgress(parsed);
      }
    } catch (e) {
      // Use defaults
    }
  };

  const saveProgress = useCallback(async (newProgress: ProgressState) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (e) {
      // fail silently
    }
  }, []);

  const updateStreak = (current: ProgressState): ProgressState => {
    const today = new Date().toDateString();
    const lastDate = current.lastStudyDate;

    if (lastDate === today) {
      return current;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    const newStreak =
      lastDate === yesterdayStr ? current.streak + 1 : 1;

    return {
      ...current,
      streak: newStreak,
      lastStudyDate: today,
    };
  };

  const completeLesson = useCallback(
    async (
      moduleId: string,
      lessonId: string,
      accuracy: number,
      mistakeIds: string[]
    ) => {
      const key = `${moduleId}__${lessonId}`;
      const xpEarned = Math.round(accuracy * 100);

      let updated = updateStreak(progress);

      updated = {
        ...updated,
        totalXP: updated.totalXP + xpEarned,
        lessonProgress: {
          ...updated.lessonProgress,
          [key]: {
            lessonId,
            moduleId,
            completed: true,
            accuracy,
            completedAt: new Date().toISOString(),
            mistakeIds,
          },
        },
        reviewQueue: Array.from(
          new Set([...updated.reviewQueue, ...mistakeIds])
        ),
      };

      await saveProgress(updated);
    },
    [progress, saveProgress]
  );

  const getLessonProgress = useCallback(
    (moduleId: string, lessonId: string): LessonProgress | undefined => {
      const key = `${moduleId}__${lessonId}`;
      return progress.lessonProgress[key];
    },
    [progress]
  );

  const getModuleProgress = useCallback(
    (moduleId: string): number => {
      const keys = Object.keys(progress.lessonProgress).filter((k) =>
        k.startsWith(`${moduleId}__`)
      );
      if (keys.length === 0) return 0;
      const completed = keys.filter(
        (k) => progress.lessonProgress[k]?.completed
      ).length;
      return completed / keys.length;
    },
    [progress]
  );

  const isLessonCompleted = useCallback(
    (moduleId: string, lessonId: string): boolean => {
      const key = `${moduleId}__${lessonId}`;
      return progress.lessonProgress[key]?.completed ?? false;
    },
    [progress]
  );

  const addToReviewQueue = useCallback(
    async (exerciseId: string) => {
      const updated = {
        ...progress,
        reviewQueue: Array.from(new Set([...progress.reviewQueue, exerciseId])),
      };
      await saveProgress(updated);
    },
    [progress, saveProgress]
  );

  const removeFromReviewQueue = useCallback(
    async (exerciseId: string) => {
      const updated = {
        ...progress,
        reviewQueue: progress.reviewQueue.filter((id) => id !== exerciseId),
      };
      await saveProgress(updated);
    },
    [progress, saveProgress]
  );

  const resetProgress = useCallback(async () => {
    await saveProgress(defaultState);
  }, [saveProgress]);

  const getWeakAreas = useCallback((): string[] => {
    const moduleAccuracy: Record<string, number[]> = {};

    Object.values(progress.lessonProgress).forEach((lp) => {
      if (!moduleAccuracy[lp.moduleId]) {
        moduleAccuracy[lp.moduleId] = [];
      }
      moduleAccuracy[lp.moduleId].push(lp.accuracy);
    });

    return Object.entries(moduleAccuracy)
      .filter(([, accuracies]) => {
        const avg =
          accuracies.reduce((a, b) => a + b, 0) / accuracies.length;
        return avg < 0.7;
      })
      .map(([moduleId]) => moduleId);
  }, [progress]);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        completeLesson,
        getLessonProgress,
        getModuleProgress,
        isLessonCompleted,
        addToReviewQueue,
        removeFromReviewQueue,
        resetProgress,
        getWeakAreas,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}
