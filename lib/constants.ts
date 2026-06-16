import type { LevelOption, Sport } from "./types";

export const SPORTS: Sport[] = [
  { id: "basketball", name: "Basketball", emoji: "🏀", category: "team" },
  { id: "soccer", name: "Soccer", emoji: "⚽", category: "team" },
  { id: "football", name: "Football", emoji: "🏈", category: "team" },
  { id: "tennis", name: "Tennis", emoji: "🎾", category: "individual" },
  { id: "swimming", name: "Swimming", emoji: "🏊", category: "water" },
  { id: "track", name: "Track & Field", emoji: "🏃", category: "endurance" },
  { id: "volleyball", name: "Volleyball", emoji: "🏐", category: "team" },
  { id: "baseball", name: "Baseball", emoji: "⚾", category: "team" },
  { id: "hockey", name: "Hockey", emoji: "🏒", category: "team" },
  { id: "cycling", name: "Cycling", emoji: "🚴", category: "endurance" },
  { id: "gymnastics", name: "Gymnastics", emoji: "🤸", category: "individual" },
  { id: "boxing", name: "Boxing", emoji: "🥊", category: "combat" },
  { id: "wrestling", name: "Wrestling", emoji: "🤼", category: "combat" },
  { id: "rugby", name: "Rugby", emoji: "🏉", category: "team" },
  { id: "golf", name: "Golf", emoji: "⛳", category: "individual" },
  { id: "rowing", name: "Rowing", emoji: "🚣", category: "water" },
  { id: "skiing", name: "Skiing", emoji: "🎿", category: "individual" },
  { id: "weightlifting", name: "Weightlifting", emoji: "🏋️", category: "individual" },
  { id: "fencing", name: "Fencing", emoji: "🤺", category: "combat" },
  { id: "climbing", name: "Climbing", emoji: "🧗", category: "individual" },
];

export const LEVELS: LevelOption[] = [
  {
    id: "recreational",
    label: "Recreational",
    sublabel: "I play for fun and fitness",
    icon: "🌱",
    description:
      "Casual games, occasional training, no competition pressure",
    trainingDays: "1–2x / week",
  },
  {
    id: "amateur",
    label: "Amateur",
    sublabel: "I train regularly and compete locally",
    icon: "⚡",
    description:
      "League play, consistent workouts, improvement-focused",
    trainingDays: "3–4x / week",
  },
  {
    id: "semi_pro",
    label: "Semi-Pro",
    sublabel: "Serious competition, structured training",
    icon: "🔥",
    description:
      "Club or college level, periodized training, performance metrics",
    trainingDays: "5–6x / week",
  },
  {
    id: "elite",
    label: "Elite / Professional",
    sublabel: "Top-level competition is my livelihood",
    icon: "🏆",
    description:
      "National/professional level, full-time training, coaching staff",
    trainingDays: "Daily + recovery",
  },
];

export const GOALS = [
  "Speed & Agility",
  "Strength & Power",
  "Endurance",
  "Injury Prevention",
  "Weight Loss",
  "Muscle Gain",
  "Flexibility",
  "Explosiveness",
  "Recovery",
  "Sport-Specific Skills",
  "Mental Toughness",
  "Balance & Coordination",
];

export const TRAINING_DAYS_OPTIONS = [1, 2, 3, 4, 5, 6, 7];
export const SESSION_DURATION_OPTIONS = [20, 30, 45, 60, 90];

export const TARGET_AREAS_BY_SPORT: Record<string, string[]> = {
  default: [
    "Core",
    "Lower Body",
    "Upper Body",
    "Explosiveness",
    "Agility",
    "Endurance",
    "Flexibility",
    "Balance",
  ],
  basketball: [
    "Core",
    "Lower Body",
    "Explosiveness",
    "Agility",
    "Vertical Jump",
    "Lateral Quickness",
    "Upper Body",
    "Endurance",
  ],
  soccer: [
    "Lower Body",
    "Core",
    "Endurance",
    "Agility",
    "Explosiveness",
    "Balance",
    "Hip Mobility",
    "Upper Body",
  ],
  football: [
    "Lower Body",
    "Core",
    "Explosiveness",
    "Upper Body",
    "Agility",
    "Grip Strength",
    "Neck & Traps",
    "Endurance",
  ],
};

export function getTargetAreas(sportId: string): string[] {
  return TARGET_AREAS_BY_SPORT[sportId] ?? TARGET_AREAS_BY_SPORT.default;
}

export function getRankColor(rank: number) {
  const colors = [
    { accent: "#FF3B30", bg: "#FFF1F0", text: "#CC2200" },
    { accent: "#FF6B35", bg: "#FFF4EF", text: "#C04010" },
    { accent: "#FF9500", bg: "#FFF8EC", text: "#B56800" },
    { accent: "#FFCC00", bg: "#FFFBEA", text: "#996600" },
    { accent: "#34C759", bg: "#F0FBF3", text: "#1A7A37" },
    { accent: "#30D158", bg: "#EDFBF2", text: "#157030" },
  ];
  return colors[rank - 1] ?? colors[colors.length - 1];
}

export const LEVEL_LABELS: Record<string, string> = {
  recreational: "Recreational",
  amateur: "Amateur",
  semi_pro: "Semi-Pro",
  elite: "Elite / Professional",
};

export const ONBOARDING_STEPS = 5;
