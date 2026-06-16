"use client";

import { motion } from "framer-motion";
import { ONBOARDING_STEPS } from "@/lib/constants";

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

export function ProgressBar({
  currentStep,
  totalSteps = ONBOARDING_STEPS,
}: ProgressBarProps) {
  return (
    <div
      className="flex items-center justify-center gap-2 py-2"
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Step ${currentStep} of ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const filled = step <= currentStep;
        return (
          <motion.div
            key={step}
            initial={false}
            animate={{
              scale: filled ? 1 : 0.85,
              backgroundColor: filled ? "var(--tint)" : "var(--separator-opaque)",
            }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="h-2 w-2 rounded-full"
            aria-hidden
          />
        );
      })}
    </div>
  );
}
