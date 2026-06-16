"use client";

import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import type { LevelOption } from "@/lib/types";
import { haptic } from "@/lib/motion";

interface LevelCardProps {
  level: LevelOption;
  selected: boolean;
  onSelect: () => void;
}

export function LevelCard({ level, selected, onSelect }: LevelCardProps) {
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={`${level.label}: ${level.sublabel}`}
      whileTap={{ scale: 0.98 }}
      animate={{
        scale: selected ? 1.01 : 1,
      }}
      transition={{ type: "spring", damping: 25, stiffness: 350 }}
      onClick={() => {
        haptic();
        onSelect();
      }}
      className={`relative w-full rounded-[var(--radius-lg)] p-4 text-left shadow-card transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--tint)] focus-visible:outline-offset-2 ${
        selected
          ? "border-l-4 border-l-[var(--tint)] bg-[var(--tint-light)]"
          : "border border-transparent bg-[var(--surface-card)]"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden>
            {level.icon}
          </span>
          <div>
            <p className="text-[17px] font-semibold text-[var(--label-primary)]">
              {level.label}
            </p>
            <p className="text-[13px] text-[var(--label-secondary)]">
              {level.sublabel}
            </p>
          </div>
        </div>
        {selected && (
          <Check className="h-5 w-5 shrink-0 text-[var(--tint)]" aria-hidden />
        )}
      </div>
      <p className="mt-2 text-[14px] leading-snug text-[var(--label-secondary)]">
        {level.description}
      </p>
      <div className="mt-3 flex items-center gap-1.5 text-[13px] text-[var(--label-tertiary)]">
        <Clock className="h-3.5 w-3.5" aria-hidden />
        <span>{level.trainingDays} training</span>
      </div>
    </motion.button>
  );
}
