"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Sport } from "@/lib/types";
import { haptic } from "@/lib/motion";

interface SportCardProps {
  sport: Sport;
  selected: boolean;
  onSelect: () => void;
}

export function SportCard({ sport, selected, onSelect }: SportCardProps) {
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={sport.name}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", damping: 25, stiffness: 400 }}
      onClick={() => {
        haptic();
        onSelect();
      }}
      className={`relative flex flex-col items-center justify-center gap-1 rounded-[var(--radius-lg)] border p-3 min-h-[88px] transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--tint)] focus-visible:outline-offset-2 ${
        selected
          ? "border-2 border-[var(--tint)] bg-[var(--tint-light)]"
          : "border border-[var(--separator-opaque)] bg-[var(--surface-card)]"
      }`}
    >
      {selected && (
        <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--tint)] text-white">
          <Check className="h-3 w-3" aria-hidden />
        </span>
      )}
      <span className="text-[36px] leading-none" aria-hidden>
        {sport.emoji}
      </span>
      <span className="text-center text-[13px] font-semibold text-[var(--label-primary)]">
        {sport.name}
      </span>
    </motion.button>
  );
}
