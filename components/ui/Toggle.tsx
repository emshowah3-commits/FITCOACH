"use client";

import { motion } from "framer-motion";
import { haptic } from "@/lib/motion";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label className="flex min-h-[44px] cursor-pointer items-center justify-between gap-4">
      <span className="text-[17px] text-[var(--label-primary)]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => {
          haptic();
          onChange(!checked);
        }}
        className={`relative h-[31px] w-[51px] shrink-0 rounded-full transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--tint)] focus-visible:outline-offset-2 ${
          checked ? "bg-[var(--tint)]" : "bg-[var(--separator-opaque)]"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 30, stiffness: 500 }}
          className="absolute top-[2px] h-[27px] w-[27px] rounded-full bg-white shadow-sm"
          style={{ left: checked ? "22px" : "2px" }}
        />
      </button>
    </label>
  );
}
