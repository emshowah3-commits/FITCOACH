"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getRankColor } from "@/lib/constants";

interface EffectivenessBarProps {
  effectiveness: number;
  rank: number;
}

export function EffectivenessBar({ effectiveness, rank }: EffectivenessBarProps) {
  const reducedMotion = useReducedMotion();
  const { accent } = getRankColor(rank);

  return (
    <div className="flex items-center gap-3">
      <div
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--separator-opaque)]"
        role="progressbar"
        aria-valuenow={effectiveness}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Effectiveness ${effectiveness} out of 100`}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: accent }}
          initial={{ width: reducedMotion ? `${effectiveness}%` : 0 }}
          animate={{ width: `${effectiveness}%` }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }
        />
      </div>
      <span className="shrink-0 text-[13px] font-semibold tabular-nums text-[var(--label-secondary)]">
        {effectiveness} / 100
      </span>
    </div>
  );
}
