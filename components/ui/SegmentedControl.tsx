"use client";

import { motion } from "framer-motion";
import { haptic } from "@/lib/motion";

interface SegmentedControlProps<T extends string | number> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  formatLabel?: (value: T) => string;
  ariaLabel: string;
}

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  formatLabel = (v) => String(v),
  ariaLabel,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="relative flex rounded-[var(--radius-md)] bg-[var(--bg-tertiary)] p-1"
    >
      {options.map((option) => {
        const selected = option === value;
        return (
          <button
            key={String(option)}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => {
              haptic();
              onChange(option);
            }}
            className="relative z-10 flex flex-1 min-h-[44px] items-center justify-center rounded-[10px] text-[15px] font-medium text-[var(--label-primary)] transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--tint)]"
          >
            {selected && (
              <motion.div
                layoutId={`segment-${ariaLabel}`}
                className="absolute inset-0 rounded-[10px] bg-[var(--surface-card)] shadow-sm"
                transition={{ type: "spring", damping: 28, stiffness: 350 }}
              />
            )}
            <span className="relative z-10">{formatLabel(option)}</span>
          </button>
        );
      })}
    </div>
  );
}
