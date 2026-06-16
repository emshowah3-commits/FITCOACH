"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { BodyRegion } from "@/lib/body-regions";
import { REGION_LABELS } from "@/lib/body-regions";

interface MuscleHighlighterProps {
  regions: BodyRegion[];
  accentColor?: string;
}

// Map FitCoach body regions to SVG muscle group IDs
const REGION_TO_SVG_ID: Record<BodyRegion, string[]> = {
  // Front view
  neck: ["neck"],
  shoulders: ["front_delts", "side_delts"],
  chest: ["upper_pecs", "middle_pecs", "lower_pecs"],
  biceps: ["biceps"],
  triceps: ["triceps"],
  forearms: ["forearms"],
  core: ["upper_abs", "lower_abs"],
  obliques: ["obliques"],
  quads: ["quads"],
  "hip-flexors": ["hip_abductor"],
  adductors: ["hip_adductor"],
  calves: ["calves"],
  
  // Back view
  "upper-back": ["upper_traps", "rhomboids", "lats", "rear_delts"],
  "lower-back": ["lower_back", "lower_traps"],
  glutes: ["glutes"],
  hamstrings: ["hamstrings"],
  
  // Full body
  "full-body": [
    "neck",
    "front_delts",
    "side_delts",
    "rear_delts",
    "upper_pecs",
    "middle_pecs",
    "lower_pecs",
    "biceps",
    "triceps",
    "forearms",
    "upper_abs",
    "lower_abs",
    "obliques",
    "quads",
    "hip_abductor",
    "hip_adductor",
    "calves",
    "upper_traps",
    "lower_traps",
    "rhomboids",
    "lats",
    "lower_back",
    "glutes",
    "hamstrings",
  ],
  cardio: [
    "neck",
    "upper_pecs",
    "middle_pecs",
    "lower_pecs",
    "biceps",
    "upper_abs",
    "lower_abs",
    "quads",
    "hamstrings",
    "calves",
  ],
};

export function MuscleHighlighter({ regions, accentColor = "#007AFF" }: MuscleHighlighterProps) {
  const [view, setView] = useState<"front" | "rear">("front");

  // Collect all SVG IDs that should be highlighted
  const highlightedIds = new Set<string>();
  regions.forEach((region) => {
    const ids = REGION_TO_SVG_ID[region];
    if (ids) {
      ids.forEach((id) => highlightedIds.add(id));
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-[var(--radius-md)] bg-[var(--bg-secondary)] p-3"
      aria-label="Muscle anatomy diagram"
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="text-center text-[11px] font-semibold uppercase tracking-wide text-[var(--label-tertiary)]">
          Target Zones
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setView("front")}
            className={`rounded px-2 py-1 text-[10px] font-semibold uppercase transition-colors ${
              view === "front"
                ? "bg-[var(--tint)] text-white"
                : "bg-[var(--bg-tertiary)] text-[var(--label-secondary)] hover:bg-[var(--bg-secondary)]"
            }`}
            aria-pressed={view === "front"}
          >
            Front
          </button>
          <button
            type="button"
            onClick={() => setView("rear")}
            className={`rounded px-2 py-1 text-[10px] font-semibold uppercase transition-colors ${
              view === "rear"
                ? "bg-[var(--tint)] text-white"
                : "bg-[var(--bg-tertiary)] text-[var(--label-secondary)] hover:bg-[var(--bg-secondary)]"
            }`}
            aria-pressed={view === "rear"}
          >
            Rear
          </button>
        </div>
      </div>

      <div className="relative h-96 overflow-hidden rounded-lg bg-white">
        <svg
          viewBox="0 0 3528.37 3203.47"
          className="h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <style>{`
              #front_borders, #rear_borders { display: ${view === "front" ? "inline" : "none"}; }
              #front, #rear { display: ${view === "front" ? "inline" : "none"}; }
              #rear_borders { display: ${view === "rear" ? "inline" : "none"}; }
              #rear { display: ${view === "rear" ? "inline" : "none"}; }
            `}</style>
          </defs>

          {/* Use the imported SVG by displaying muscle groups */}
          <use href="/muscles.svg#front_borders" />
          <use href="/muscles.svg#rear_borders" />
          <use href="/muscles.svg#front" />
          <use href="/muscles.svg#rear" />

          {/* Overlay highlighting for targeted muscle groups */}
          {Array.from(highlightedIds).map((muscleId, i) => (
            <motion.use
              key={muscleId}
              href={`/muscles.svg#${muscleId}`}
              fill={accentColor}
              fillOpacity={0.4}
              style={{
                filter: `drop-shadow(0 0 8px ${accentColor})`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.7, 0.4] }}
              transition={{
                delay: i * 0.08,
                duration: 1.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </svg>
      </div>

      {/* Legend of targeted regions */}
      <motion.div
        className="mt-2 flex flex-wrap justify-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {regions.map((region) => (
          <span
            key={region}
            className="rounded-full px-2 py-0.5 text-[11px] font-medium text-white"
            style={{ backgroundColor: accentColor }}
          >
            {REGION_LABELS[region] ?? region}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
