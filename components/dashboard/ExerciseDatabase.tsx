"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import exercisesData from "@/lib/exercises-dataset.json";

interface ExerciseDetail {
  id: string;
  name: string;
  category: string;
  body_part: string;
  target: string;
  equipment: string;
  muscle_group: string;
  secondary_muscles: string[];
  instructions: {
    en: string;
    it?: string;
    tr?: string;
  };
  instruction_steps: {
    en: string[];
    it?: string[];
    tr?: string[];
  };
  image: string;
  gif_url: string;
}

interface ExerciseDemoProps {
  exerciseName: string;
  accentColor: string;
}

// Exercise name mapping from FitCoach to dataset names
const EXERCISE_MAPPING: Record<string, string> = {
  "push-ups": "push-up",
  "pull-ups": "pull-up",
  "dumbbell row": "single arm dumbbell row",
  "crunches": "crunch",
  "plank hold": "front plank",
  "bird dog": "bird dog",
  "pallof press": "pallof press",
  "medicine ball rotational throw": "medicine ball slam",
  "dead bug with band anti-rotation": "dead bug",
  "wall sit": "wall sit",
  "bodyweight squats": "squat",
  "walking lunges": "dumbbell walking lunge",
  "romanian deadlift": "barbell deadlift",
  "bulgarian split squat": "bulgarian split squat",
  "trap bar jump": "trap bar jump",
  "arm circles": "arm circles",
  "landmine press": "single arm landmine press",
  "single-arm cable press": "machine press",
  "jumping jacks": "jumping jack",
  "squat to calf raise": "squat",
  "broad jumps": "broad jump",
  "box jumps": "box jump",
  "depth jumps": "depth jump",
  "depth jump to sprint": "depth jump",
  "high knees": "high knees",
  "ladder in-outs": "ladder drills",
  "t-drill": "t-drill",
  "5-10-5 shuttle": "shuttle run",
  "reactive cone shuffle": "cone shuffle drill",
  "mirror drill with cut": "cone drill",
  "steady jog": "jogging",
  "jump rope": "jump rope",
  "bike intervals": "stationary bike",
  "tempo runs": "running",
  "sport-specific interval sprints": "sprint",
  "repeated sprint ability test": "sprint",
  "static hamstring stretch": "hamstring stretch",
  "standing quad stretch": "quadriceps stretch",
  "worlds greatest stretch": "lunge",
  "leg swings (front & lateral)": "leg swing",
  "90/90 hip switches": "90/90 switches",
  "dynamic lunge with rotation": "lunge with twist",
  "single-leg stand": "single leg stand",
  "bosu ball balance": "bosu ball",
  "single-leg rdl": "single leg deadlift",
  "single-leg hop & stick": "single leg hop",
  "y-balance reach": "y balance test",
  "single-leg catch & throw": "single leg",
  "calf raises": "calf raise",
  "squat jump": "jump squat",
  "approach jump (no ball)": "jump",
  "depth jump": "depth jump",
  "max vertical jump (tracked)": "jump",
  "depth jump to max vertical": "depth jump",
  "side shuffles": "side shuffle",
  "lateral band walks": "lateral band walk",
  "lateral bounds": "lateral bound",
  "defensive slide to closeout": "slide",
  "reactive lateral shuffle": "shuffle",
  "mirror lateral cut drill": "cone drill",
  "butterfly stretch": "butterfly stretch",
  "hip circles": "hip circles",
  "cossack squat": "cossack squat",
  "90/90 switches": "90/90 switches",
  "spiderman lunge with reach": "spiderman lunge",
  "lateral lunge to deep squat flow": "lateral lunge",
  "dead hang": "pull-up",
  "farmers carry": "farmers carry",
  "plate pinch hold": "plate hold",
  "towel pull-ups": "pull-up",
  "fat bar rows": "barbell row",
  "partner grip battle": "grip",
  "shoulder shrugs": "shrug",
  "neck flexion (manual resist)": "neck",
  "4-way isometric neck hold": "neck",
  "trap bar shrug with pause": "shrug",
  "neck harness extensions": "neck",
  "scap pack + neck isometric combo": "neck",
};

// Helper function for fuzzy matching exercises
function findBestExerciseMatch(exerciseName: string, exercises: ExerciseDetail[]): ExerciseDetail | undefined {
  // First, check if there's a direct mapping
  const mappedName = EXERCISE_MAPPING[exerciseName.toLowerCase()];
  if (mappedName) {
    const mapped = exercises.find(ex => ex.name.toLowerCase().includes(mappedName.toLowerCase()));
    if (mapped) return mapped;
  }

  const normalize = (str: string) => 
    str.toLowerCase().replace(/[-\s]+/g, ' ').trim();
  
  const queryNorm = normalize(exerciseName);
  const queryWords = queryNorm.split(' ').filter(w => w.length > 2);
  
  // Exact match (after normalization)
  let best = exercises.find(ex => normalize(ex.name) === queryNorm);
  if (best) return best;
  
  // Exact match with original case
  best = exercises.find(ex => ex.name.toLowerCase() === exerciseName.toLowerCase());
  if (best) return best;
  
  // Score by word matches (prioritize by number of matching words)
  if (queryWords.length > 0) {
    let bestScore = 0;
    let candidates: ExerciseDetail[] = [];
    
    for (const ex of exercises) {
      const exNorm = normalize(ex.name);
      const matchCount = queryWords.filter(word => exNorm.includes(word)).length;
      
      if (matchCount > bestScore) {
        bestScore = matchCount;
        candidates = [ex];
        best = ex;
      } else if (matchCount === bestScore && matchCount > 0) {
        candidates.push(ex);
      }
    }
    
    // If we found good matches and one is much shorter, prefer it (likely more specific)
    if (candidates.length > 1) {
      candidates.sort((a, b) => a.name.length - b.name.length);
      return candidates[0];
    }
  }
  
  return best;
}

export function ExerciseDatabase({
  exerciseName,
  accentColor,
}: ExerciseDemoProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "fr">(
    "en"
  );
  const [showInstructions, setShowInstructions] = useState(false);

  // Find matching exercise from dataset
  const exercise = useMemo(() => {
    const exercises = exercisesData as ExerciseDetail[];
    return findBestExerciseMatch(exerciseName, exercises);
  }, [exerciseName]);

  const steps = exercise?.instruction_steps[selectedLanguage === "fr" ? "en" : selectedLanguage] || [];

  if (!exercise) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--separator-opaque)] bg-[var(--bg-secondary)] p-4"
      >
        <div className="bg-[var(--bg-primary)] rounded p-3">
          <h3 className="text-[12px] font-medium text-[var(--label-primary)] mb-2">
            {exerciseName}
          </h3>
          <p className="text-[10px] text-[var(--label-secondary)] leading-relaxed mb-3">
            This exercise doesn&apos;t have a video demonstration available, but focus on proper form and controlled movement.
          </p>
          <div className="bg-[var(--bg-secondary)] rounded p-2">
            <p className="text-[10px] text-[var(--label-secondary)] italic">
              💡 Tip: Maintain consistent breathing throughout the movement and prioritize form over speed or weight.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const animationUrl = `/exercise-videos/${exercise.gif_url.split("/").pop()}`;
  const imageUrl = `/exercise-images/${exercise.image.split("/").pop()}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--separator-opaque)]"
    >
      <div className="bg-[var(--bg-secondary)] px-3 py-2">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-[12px] text-[var(--label-secondary)] font-medium uppercase tracking-wide">
              Exercise Guide
            </h3>
            <p className="text-[10px] text-[var(--label-secondary)] mt-1">
              {exercise.muscle_group}
              {exercise.secondary_muscles.length > 0 &&
                ` • ${exercise.secondary_muscles[0]}`}
            </p>
          </div>
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-[12px] font-medium transition-colors flex-shrink-0 ${
              showInstructions
                ? "bg-white/20 text-white"
                : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
            }`}
          >
            <BookOpen className="h-3 w-3" />
            {showInstructions ? "Animation" : "Instructions"}
          </button>
        </div>

        {!showInstructions ? (
          // Animation View
          <div className="relative aspect-video w-full bg-black rounded overflow-hidden">
            <img
              src={animationUrl}
              alt={exercise.name}
              className="w-full h-full object-contain bg-black"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = imageUrl;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
              <span className="text-[10px] font-medium text-white bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                Form demonstration
              </span>
            </div>
          </div>
        ) : (
          // Instructions View
          <div className="bg-[var(--bg-primary)] rounded p-3 space-y-3">
            {/* Language selector */}
            <div className="flex gap-1">
              {(["en", "fr"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                    selectedLanguage === lang
                      ? "bg-white/20 text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {lang === "en" ? "EN" : "FR"}
                </button>
              ))}
            </div>

            {/* Step-by-step instructions */}
            <div className="space-y-2">
              <p className="text-[12px] font-semibold text-[var(--label-primary)] uppercase tracking-wide">
                Steps
              </p>
              <ol className="space-y-2">
                {steps.map((step, index) => (
                  <li
                    key={index}
                    className="flex gap-2 text-[11px] text-[var(--label-primary)] leading-tight"
                  >
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                      style={{ backgroundColor: accentColor }}
                    >
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Muscle info */}
            <div className="pt-2 border-t border-white/10">
              <p className="text-[10px] text-[var(--label-secondary)] mb-2 uppercase tracking-wide font-semibold">
                Muscles
              </p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 rounded bg-white/10 text-[10px] text-white font-medium">
                  {exercise.muscle_group}
                </span>
                {exercise.secondary_muscles.slice(0, 2).map((muscle) => (
                  <span
                    key={muscle}
                    className="px-2 py-1 rounded bg-white/5 text-[10px] text-white/70"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--separator-opaque)] bg-[var(--bg-secondary)] px-3 py-2">
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div>
            <p className="text-[var(--label-secondary)]">Equipment</p>
            <p className="text-[var(--label-primary)] font-medium capitalize">
              {exercise.equipment}
            </p>
          </div>
          <div>
            <p className="text-[var(--label-secondary)]">Category</p>
            <p className="text-[var(--label-primary)] font-medium capitalize">
              {exercise.category}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
