"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown, Share2 } from "lucide-react";
import type { Workout } from "@/lib/types";
import { getRankColor } from "@/lib/constants";
import { RankBadge } from "./RankBadge";
import { EffectivenessBar } from "./EffectivenessBar";
import { WorkoutDemonstration } from "./WorkoutDemonstration";
import { Badge } from "@/components/ui/Badge";

interface WorkoutCardProps {
  workout: Workout;
  sportEmoji?: string;
  sportName?: string;
  sportId?: string;
  levelLabel?: string;
  index?: number;
}

export function WorkoutCard({
  workout,
  sportEmoji,
  sportName,
  sportId,
  levelLabel,
  index = 0,
}: WorkoutCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const colors = getRankColor(workout.rank);

  const shareText = sportEmoji && sportName && levelLabel
    ? formatShareLine(workout, sportEmoji, sportName, levelLabel)
    : null;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 350,
        delay: index * 0.06,
      }}
      className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--surface-card)] shadow-card"
    >
      <div
        className="h-1 w-full"
        style={{ backgroundColor: colors.accent }}
        aria-hidden
      />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3">
            <RankBadge rank={workout.rank} />
            <div>
              <h3 className="text-[17px] font-semibold text-[var(--label-primary)]">
                {workout.name}
              </h3>
              <p className="mt-0.5 text-[13px] text-[var(--label-secondary)]">
                {workout.primaryMuscles.join(", ")} · {workout.sets}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge bg={colors.bg} color={colors.text}>
              {workout.rankLabel}
            </Badge>
            {shareText && (
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(shareText)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-[var(--label-secondary)] hover:bg-[var(--bg-secondary)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--tint)]"
                aria-label={`Share ${workout.name}`}
              >
                <Share2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-4">
          <EffectivenessBar
            effectiveness={workout.effectiveness}
            rank={workout.rank}
          />
        </div>

        <WorkoutDemonstration
          workout={workout}
          accentColor={colors.accent}
          sportName={sportName}
          sportId={sportId}
        />

        <p className="mt-4 text-[15px] leading-relaxed text-[var(--label-secondary)]">
          &ldquo;{workout.why}&rdquo;
        </p>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-3 flex min-h-[44px] w-full items-center justify-between text-[15px] font-medium text-[var(--tint)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--tint)]"
          aria-expanded={expanded}
        >
          <span>{expanded ? "Hide coaching details" : "Show coaching details"}</span>
          <motion.span animate={{ rotate: expanded ? 180 : 0 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-2 border-t border-[var(--separator)] pt-3 text-[14px] text-[var(--label-secondary)]">
                <p>
                  <strong className="text-[var(--label-primary)]">Tip:</strong>{" "}
                  {workout.tip}
                </p>
                <p>
                  <strong className="text-[var(--label-primary)]">Scale:</strong>{" "}
                  {workout.modification}
                </p>
                <p className="text-[13px] text-[var(--label-tertiary)]">
                  Rest {workout.restSeconds}s · {workout.equipment}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

function formatShareLine(
  workout: Workout,
  emoji: string,
  sport: string,
  level: string
) {
  return `${emoji} ${sport} Workout — ${level}
#${workout.rank} ${workout.name} (${workout.effectiveness}/100 — ${workout.rankLabel})
Generated by Athlete Workout Planner`;
}
