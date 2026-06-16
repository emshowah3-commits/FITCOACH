"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import type { Workout } from "@/lib/types";
import { MuscleHighlighter } from "./MuscleHighlighter";
import { ExerciseDatabase } from "./ExerciseDatabase";
import {
  getExerciseMedia,
} from "@/lib/exercise-media";
import { SPORT_DEMANDS } from "@/lib/generate-workout";

interface WorkoutDemonstrationProps {
  workout: Workout;
  accentColor: string;
  sportName?: string;
  sportId?: string;
}

export function WorkoutDemonstration({
  workout,
  accentColor,
  sportName = "your sport",
  sportId = "default",
}: WorkoutDemonstrationProps) {
  const media = useMemo(() => {
    if (workout.videoId && workout.imageUrl && workout.bodyRegions?.length) {
      return {
        videoId: workout.videoId,
        imageUrl: workout.imageUrl,
        bodyRegions: workout.bodyRegions,
        gameplayBenefit:
          workout.gameplayBenefit ??
          getExerciseMedia(
            workout.name,
            workout.primaryMuscles,
            sportName,
            SPORT_DEMANDS[sportId] ?? SPORT_DEMANDS.default
          ).gameplayBenefit,
      };
    }
    const demand = SPORT_DEMANDS[sportId] ?? SPORT_DEMANDS.default;
    return getExerciseMedia(
      workout.name,
      workout.primaryMuscles,
      sportName,
      demand
    );
  }, [workout, sportName, sportId]);

  return (
    <div className="mt-4 space-y-3">
      {/* Exercise Guide */}
      <ExerciseDatabase exerciseName={workout.name} accentColor={accentColor} />

      {/* Muscle Diagram and Gameplay Impact */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <MuscleHighlighter
          regions={media.bodyRegions}
          accentColor={accentColor}
        />

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col rounded-[var(--radius-md)] bg-[var(--tint-light)] p-3"
        >
          <div className="mb-2 flex items-center gap-1.5 text-[var(--tint)]">
            <Gamepad2 className="h-4 w-4" />
            <span className="text-[12px] font-semibold uppercase tracking-wide">
              Gameplay Impact
            </span>
          </div>
          <p className="text-[14px] leading-relaxed text-[var(--label-primary)]">
            {media.gameplayBenefit}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
