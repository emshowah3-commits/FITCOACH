"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CompletionCelebrationProps {
  name: string;
  onDone: () => void;
}

export function CompletionCelebration({ name, onDone }: CompletionCelebrationProps) {
  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(() => {
      if (!cancelled) onDone();
    }, 1800);

    import("canvas-confetti")
      .then(({ default: confetti }) => {
        const duration = 1200;
        const end = Date.now() + duration;

        const frame = () => {
          if (cancelled) return;
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors: ["#007AFF", "#34C759", "#FF9500"],
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors: ["#007AFF", "#34C759", "#FF9500"],
          });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
      })
      .catch(() => {
        // confetti is optional
      });

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-[60vh] flex-col items-center justify-center text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--success)] text-white"
      >
        <Check className="h-12 w-12" strokeWidth={2.5} />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", damping: 25, stiffness: 320 }}
        className="font-display text-[28px] font-bold text-[var(--label-primary)]"
      >
        You&apos;re all set, {name}!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-2 text-[17px] text-[var(--label-secondary)]"
      >
        Let&apos;s build your plan.
      </motion.p>
    </motion.div>
  );
}
