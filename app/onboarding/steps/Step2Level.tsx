"use client";

import { LEVELS } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import { LevelCard } from "@/components/onboarding/LevelCard";

export function Step2Level() {
  const level = useAppStore((s) => s.profile.level);
  const setLevel = useAppStore((s) => s.setLevel);

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-6 text-center">
        <h1 className="font-display text-[34px] font-bold tracking-tight text-[var(--label-primary)]">
          How competitive are you?
        </h1>
        <p className="mt-2 text-[17px] text-[var(--label-secondary)]">
          Be honest — it helps us get your training right.
        </p>
      </div>

      <div role="radiogroup" aria-label="Select your athletic level" className="space-y-3">
        {LEVELS.map((l) => (
          <LevelCard
            key={l.id}
            level={l}
            selected={level === l.id}
            onSelect={() => setLevel(l.id)}
          />
        ))}
      </div>
    </div>
  );
}
