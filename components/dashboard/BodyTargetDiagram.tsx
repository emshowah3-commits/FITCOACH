"use client";

import { motion } from "framer-motion";
import type { BodyRegion } from "@/lib/body-regions";
import { REGION_LABELS } from "@/lib/body-regions";

interface BodyTargetDiagramProps {
  regions: BodyRegion[];
  accentColor?: string;
}

const REGION_PATHS: Record<
  BodyRegion,
  { d: string; label: { x: number; y: number } } | null
> = {
  neck: {
    d: "M92 28 h16 v10 a8 8 0 0 1 -16 0 Z",
    label: { x: 100, y: 24 },
  },
  shoulders: {
    d: "M62 38 h76 a12 12 0 0 1 -12 14 H74 a12 12 0 0 1 -12 -14 Z",
    label: { x: 100, y: 34 },
  },
  chest: {
    d: "M74 52 h52 v28 a26 14 0 0 1 -52 0 Z",
    label: { x: 100, y: 66 },
  },
  core: {
    d: "M78 80 h44 v36 a22 18 0 0 1 -44 0 Z",
    label: { x: 100, y: 98 },
  },
  obliques: {
    d: "M62 82 h16 v32 a8 16 0 0 1 -8 -2 v-28 a8 8 0 0 1 8 -2 Z M122 82 h-16 v32 a8 16 0 0 0 8 -2 v-28 a8 8 0 0 0 -8 -2 Z",
    label: { x: 100, y: 100 },
  },
  "upper-back": null,
  "lower-back": null,
  glutes: {
    d: "M72 116 h56 v18 a28 9 0 0 1 -56 0 Z",
    label: { x: 100, y: 128 },
  },
  quads: {
    d: "M74 134 h22 v52 a11 26 0 0 1 -22 -4 Z M104 134 h22 v52 a11 26 0 0 0 -22 -4 Z",
    label: { x: 100, y: 158 },
  },
  hamstrings: null,
  calves: {
    d: "M78 186 h18 v34 a9 17 0 0 1 -18 -4 Z M104 186 h18 v34 a9 17 0 0 0 -18 -4 Z",
    label: { x: 100, y: 204 },
  },
  "hip-flexors": {
    d: "M78 116 h44 v18 a22 9 0 0 1 -44 0 Z",
    label: { x: 100, y: 124 },
  },
  adductors: {
    d: "M92 134 h16 v40 a8 20 0 0 1 -16 -4 Z M92 134 h16 v40 a8 20 0 0 0 16 -4 Z",
    label: { x: 100, y: 154 },
  },
  forearms: {
    d: "M52 52 h14 v36 a7 18 0 0 1 -14 -4 Z M134 52 h-14 v36 a7 18 0 0 0 14 -4 Z",
    label: { x: 100, y: 72 },
  },
  biceps: {
    d: "M56 56 h12 v28 a6 14 0 0 1 -12 -3 Z M132 56 h-12 v28 a6 14 0 0 0 12 -3 Z",
    label: { x: 100, y: 70 },
  },
  triceps: {
    d: "M58 58 h10 v26 a5 13 0 0 0 10 2 v-28 a5 5 0 0 0 -10 0 Z M132 58 h-10 v26 a5 13 0 0 1 -10 2 v-28 a5 5 0 0 1 10 0 Z",
    label: { x: 100, y: 72 },
  },
  "full-body": {
    d: "M70 28 h60 v192 a30 96 0 0 1 -60 0 Z",
    label: { x: 100, y: 120 },
  },
  cardio: {
    d: "M74 52 h52 v120 a26 60 0 0 1 -52 0 Z",
    label: { x: 100, y: 110 },
  },
};

export function BodyTargetDiagram({
  regions,
  accentColor = "#007AFF",
}: BodyTargetDiagramProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-[var(--radius-md)] bg-[var(--bg-secondary)] p-3"
      aria-label="Muscle target diagram"
    >
      <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-wide text-[var(--label-tertiary)]">
        Target Zones
      </p>
      <svg
        viewBox="0 0 200 240"
        className="mx-auto h-[180px] w-full max-w-[140px]"
        role="img"
        aria-hidden
      >
        <ellipse cx="100" cy="18" rx="14" ry="16" fill="var(--separator-opaque)" />
        <rect x="88" y="28" width="24" height="10" rx="4" fill="var(--separator-opaque)" />
        <rect x="70" y="38" width="60" height="14" rx="6" fill="var(--separator-opaque)" />
        <rect x="74" y="52" width="52" height="64" rx="12" fill="var(--separator-opaque)" />
        <rect x="78" y="116" width="44" height="18" rx="6" fill="var(--separator-opaque)" />
        <rect x="74" y="134" width="22" height="52" rx="8" fill="var(--separator-opaque)" />
        <rect x="104" y="134" width="22" height="52" rx="8" fill="var(--separator-opaque)" />
        <rect x="78" y="186" width="18" height="34" rx="6" fill="var(--separator-opaque)" />
        <rect x="104" y="186" width="18" height="34" rx="6" fill="var(--separator-opaque)" />
        <rect x="52" y="52" width="14" height="36" rx="6" fill="var(--separator-opaque)" />
        <rect x="134" y="52" width="14" height="36" rx="6" fill="var(--separator-opaque)" />

        {regions.map((region, i) => {
          const path = REGION_PATHS[region];
          if (!path) return null;
          return (
            <motion.path
              key={region}
              d={path.d}
              fill={accentColor}
              fillOpacity={0.55}
              stroke={accentColor}
              strokeWidth={1.5}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 0.75, 0.55] }}
              transition={{
                delay: i * 0.08,
                duration: 1.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          );
        })}
      </svg>
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
