"use client";

import { SPORTS } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import { SportCard } from "@/components/onboarding/SportCard";

export function Step1Sport() {
  const sport = useAppStore((s) => s.profile.sport);
  const setSport = useAppStore((s) => s.setSport);

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-6 text-center">
        <h1 className="font-display text-[34px] font-bold tracking-tight text-[var(--label-primary)]">
          What sport do you play?
        </h1>
        <p className="mt-2 text-[17px] text-[var(--label-secondary)]">
          We&apos;ll tailor every workout to your game.
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label="Select your sport"
        className="-mx-1 max-h-[min(50vh,400px)] overflow-y-auto px-1"
      >
        <div className="grid grid-cols-3 gap-2">
          {SPORTS.map((s) => (
            <SportCard
              key={s.id}
              sport={s}
              selected={sport === s.id}
              onSelect={() => setSport(s.id, s.name, s.emoji)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
