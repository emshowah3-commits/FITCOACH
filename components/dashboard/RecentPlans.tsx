"use client";

import Link from "next/link";
import type { WorkoutHistory } from "@/lib/types";

interface RecentPlansProps {
  history: WorkoutHistory[];
}

export function RecentPlans({ history }: RecentPlansProps) {
  if (history.length === 0) return null;

  return (
    <section aria-label="Recent workout plans">
      <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-[var(--label-tertiary)]">
        Recent Plans
      </h2>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {history.map((entry) => (
          <Link
            key={entry.id}
            href={`/workout/${entry.id}`}
            className="flex min-w-[200px] shrink-0 flex-col rounded-[var(--radius-lg)] bg-[var(--surface-card)] p-4 shadow-card focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--tint)]"
          >
            <span className="text-[15px] font-semibold text-[var(--label-primary)]">
              {entry.sport}
            </span>
            <span className="mt-1 text-[13px] text-[var(--label-secondary)]">
              {entry.targetAreas.slice(0, 2).join(", ")}
              {entry.targetAreas.length > 2 ? "…" : ""}
            </span>
            <span className="mt-2 text-[12px] text-[var(--label-tertiary)]">
              {new Date(entry.generatedAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
