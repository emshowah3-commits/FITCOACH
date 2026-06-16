export type BodyRegion =
  | "neck"
  | "shoulders"
  | "chest"
  | "core"
  | "obliques"
  | "upper-back"
  | "lower-back"
  | "glutes"
  | "quads"
  | "hamstrings"
  | "calves"
  | "hip-flexors"
  | "adductors"
  | "forearms"
  | "biceps"
  | "triceps"
  | "full-body"
  | "cardio";

export const REGION_LABELS: Record<BodyRegion, string> = {
  neck: "Neck",
  shoulders: "Shoulders",
  chest: "Chest",
  core: "Core / Abs",
  obliques: "Obliques",
  "upper-back": "Upper Back",
  "lower-back": "Lower Back",
  glutes: "Glutes",
  quads: "Quadriceps",
  hamstrings: "Hamstrings",
  calves: "Calves",
  "hip-flexors": "Hip Flexors",
  adductors: "Adductors",
  forearms: "Forearms",
  biceps: "Biceps",
  triceps: "Triceps",
  "full-body": "Full Body",
  cardio: "Cardiovascular",
};

const MUSCLE_TO_REGIONS: Record<string, BodyRegion[]> = {
  "rectus abdominis": ["core"],
  "transverse abdominis": ["core"],
  obliques: ["obliques", "core"],
  "deep core": ["core"],
  core: ["core"],
  "erector spinae": ["lower-back", "core"],
  quadriceps: ["quads"],
  quads: ["quads"],
  glutes: ["glutes"],
  hamstrings: ["hamstrings"],
  calves: ["calves"],
  soleus: ["calves"],
  "hip flexors": ["hip-flexors", "core"],
  "hip rotators": ["glutes", "hip-flexors"],
  "hip abductors": ["glutes", "adductors"],
  "glute medius": ["glutes", "hip-flexors"],
  adductors: ["adductors", "quads"],
  chest: ["chest"],
  shoulders: ["shoulders"],
  "anterior deltoid": ["shoulders"],
  deltoids: ["shoulders"],
  "rotator cuff": ["shoulders"],
  lats: ["upper-back"],
  rhomboids: ["upper-back"],
  biceps: ["biceps"],
  triceps: ["triceps"],
  forearms: ["forearms"],
  "finger flexors": ["forearms"],
  hands: ["forearms"],
  "upper trapezius": ["neck", "shoulders"],
  "upper traps": ["neck", "shoulders"],
  traps: ["neck", "upper-back"],
  "levator scapulae": ["neck", "upper-back"],
  "neck flexors": ["neck"],
  "neck extensors": ["neck"],
  "neck stabilizers": ["neck"],
  "sternocleidomastoid": ["neck"],
  cardiovascular: ["cardio"],
  legs: ["quads", "calves"],
  "full lower body": ["quads", "glutes", "hamstrings", "calves"],
  proprioceptors: ["calves", "core"],
};

export function musclesToRegions(muscles: string[]): BodyRegion[] {
  const regions = new Set<BodyRegion>();
  for (const muscle of muscles) {
    const key = muscle.toLowerCase();
    const mapped = MUSCLE_TO_REGIONS[key];
    if (mapped) {
      mapped.forEach((r) => regions.add(r));
    } else {
      for (const [pattern, regs] of Object.entries(MUSCLE_TO_REGIONS)) {
        if (key.includes(pattern) || pattern.includes(key)) {
          regs.forEach((r) => regions.add(r));
        }
      }
    }
  }
  if (regions.size === 0) regions.add("full-body");
  return Array.from(regions);
}
