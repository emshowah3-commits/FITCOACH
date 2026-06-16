"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AthleticLevel,
  OnboardingStep,
  UserProfile,
  WorkoutHistory,
  WorkoutPlan,
} from "./types";

interface AppState {
  profile: Partial<UserProfile>;
  onboardingStep: OnboardingStep;
  onboardingDirection: number;
  currentPlan: WorkoutPlan | null;
  workoutHistory: WorkoutHistory[];
  workoutsGenerated: number;
  lastGeneratedAt: string | null;
  selectedTargetAreas: string[];

  setOnboardingStep: (step: OnboardingStep, direction?: number) => void;
  setSport: (id: string, name: string, emoji: string) => void;
  setLevel: (level: AthleticLevel) => void;
  toggleGoal: (goal: string) => void;
  setGoals: (goals: string[]) => void;
  setTrainingDays: (days: number) => void;
  setSessionDuration: (minutes: number) => void;
  setIncludeRestDays: (value: boolean) => void;
  setProfileFields: (fields: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  setCurrentPlan: (plan: WorkoutPlan | null) => void;
  addToHistory: (entry: WorkoutHistory) => void;
  toggleTargetArea: (area: string) => void;
  setTargetAreas: (areas: string[]) => void;
  setDarkMode: (mode: "system" | "light" | "dark") => void;
}

const defaultProfile: Partial<UserProfile> = {
  goals: [],
  trainingDays: 3,
  sessionDuration: 45,
  includeRestDays: true,
  onboarded: false,
  darkMode: "system",
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      profile: { ...defaultProfile },
      onboardingStep: 1,
      onboardingDirection: 1,
      currentPlan: null,
      workoutHistory: [],
      workoutsGenerated: 0,
      lastGeneratedAt: null,
      selectedTargetAreas: [],

      setOnboardingStep: (step, direction = 1) =>
        set({ onboardingStep: step, onboardingDirection: direction }),

      setSport: (id, name, emoji) =>
        set((s) => ({
          profile: { ...s.profile, sport: id, sportName: name, sportEmoji: emoji },
        })),

      setLevel: (level) =>
        set((s) => ({ profile: { ...s.profile, level } })),

      toggleGoal: (goal) =>
        set((s) => {
          const goals = s.profile.goals ?? [];
          const next = goals.includes(goal)
            ? goals.filter((g) => g !== goal)
            : [...goals, goal];
          return { profile: { ...s.profile, goals: next } };
        }),

      setGoals: (goals) =>
        set((s) => ({ profile: { ...s.profile, goals } })),

      setTrainingDays: (trainingDays) =>
        set((s) => ({ profile: { ...s.profile, trainingDays } })),

      setSessionDuration: (sessionDuration) =>
        set((s) => ({ profile: { ...s.profile, sessionDuration } })),

      setIncludeRestDays: (includeRestDays) =>
        set((s) => ({ profile: { ...s.profile, includeRestDays } })),

      setProfileFields: (fields) =>
        set((s) => ({ profile: { ...s.profile, ...fields } })),

      completeOnboarding: () =>
        set((s) => ({
          profile: { ...s.profile, onboarded: true },
        })),

      resetOnboarding: () =>
        set({
          profile: { ...defaultProfile },
          onboardingStep: 1,
          onboardingDirection: 1,
          currentPlan: null,
          selectedTargetAreas: [],
        }),

      setCurrentPlan: (currentPlan) => set({ currentPlan }),

      addToHistory: (entry) =>
        set((s) => {
          const history = [entry, ...s.workoutHistory].slice(0, 5);
          return {
            workoutHistory: history,
            workoutsGenerated: s.workoutsGenerated + 1,
            lastGeneratedAt: entry.generatedAt,
          };
        }),

      toggleTargetArea: (area) =>
        set((s) => {
          const areas = s.selectedTargetAreas;
          const next = areas.includes(area)
            ? areas.filter((a) => a !== area)
            : [...areas, area];
          return { selectedTargetAreas: next };
        }),

      setTargetAreas: (selectedTargetAreas) => set({ selectedTargetAreas }),

      setDarkMode: (darkMode) =>
        set((s) => ({ profile: { ...s.profile, darkMode } })),
    }),
    {
      name: "fitcoach-storage",
      partialize: (state) => ({
        profile: state.profile,
        workoutHistory: state.workoutHistory,
        workoutsGenerated: state.workoutsGenerated,
        lastGeneratedAt: state.lastGeneratedAt,
        currentPlan: state.currentPlan,
        selectedTargetAreas: state.selectedTargetAreas,
      }),
    }
  )
);

export function useIsOnboarded() {
  return useAppStore((s) => s.profile.onboarded === true);
}
