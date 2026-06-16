export type SportCategory =
  | "team"
  | "individual"
  | "combat"
  | "water"
  | "endurance";

export interface Sport {
  id: string;
  name: string;
  emoji: string;
  category: SportCategory;
}

export type AthleticLevel =
  | "recreational"
  | "amateur"
  | "semi_pro"
  | "elite";

export interface LevelOption {
  id: AthleticLevel;
  label: string;
  sublabel: string;
  icon: string;
  description: string;
  trainingDays: string;
}

export interface UserProfile {
  sport: string;
  sportName: string;
  sportEmoji: string;
  level: AthleticLevel;
  goals: string[];
  trainingDays: number;
  sessionDuration: number;
  includeRestDays: boolean;
  firstName: string;
  age?: number;
  position?: string;
  onboarded: boolean;
  darkMode?: "system" | "light" | "dark";
}

import type { BodyRegion } from "./body-regions";

export interface Workout {
  rank: number;
  name: string;
  sets: string;
  restSeconds: number;
  primaryMuscles: string[];
  equipment: string;
  effectiveness: number;
  rankLabel: string;
  why: string;
  tip: string;
  modification: string;
  videoId?: string;
  imageUrl?: string;
  bodyRegions?: BodyRegion[];
  gameplayBenefit?: string;
}

export interface WorkoutPlan {
  sport: string;
  level: string;
  summary: string;
  totalDuration: string;
  workouts: Workout[];
}

export interface WorkoutHistory {
  id: string;
  generatedAt: string;
  sport: string;
  targetAreas: string[];
  plan: WorkoutPlan;
}

export type OnboardingStep = 1 | 2 | 3 | 4 | 5;
