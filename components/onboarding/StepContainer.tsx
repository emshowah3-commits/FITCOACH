"use client";

import { motion } from "framer-motion";

interface StepContainerProps {
  stepKey: string | number;
  direction: number;
  children: React.ReactNode;
}

export function StepContainer({
  stepKey,
  direction,
  children,
}: StepContainerProps) {
  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, x: direction > 0 ? 16 : -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
