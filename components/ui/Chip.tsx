"use client";

import { motion } from "framer-motion";
import { haptic } from "@/lib/motion";

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function Chip({ label, selected = false, onClick }: ChipProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.93 }}
      transition={{ type: "spring", damping: 25, stiffness: 400 }}
      onClick={() => {
        haptic();
        onClick?.();
      }}
      aria-pressed={selected}
      className={`inline-flex h-9 min-h-[44px] items-center rounded-full px-3.5 text-[15px] font-medium transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--tint)] focus-visible:outline-offset-2 ${
        selected
          ? "bg-[var(--tint)] text-white"
          : "border border-[var(--separator)] bg-[var(--bg-tertiary)] text-[var(--label-primary)]"
      }`}
    >
      {label}
    </motion.button>
  );
}
