"use client";

import { GOALS } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import { OptionPill } from "@/components/onboarding/OptionPill";

export function Step3Goals() {
  const goals = useAppStore((s) => s.profile.goals ?? []);
  const toggleGoal = useAppStore((s) => s.toggleGoal);

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-6 text-center">
        <h1 className="font-display text-[34px] font-bold tracking-tight text-[var(--label-primary)]">
          What are you training for?
        </h1>
        <p className="mt-2 text-[17px] text-[var(--label-secondary)]">
          Pick everything that applies.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Training goals">
        {GOALS.map((goal) => (
          <OptionPill
            key={goal}
            label={goal}
            selected={goals.includes(goal)}
            onToggle={() => toggleGoal(goal)}
          />
        ))}
      </div>
    </div>
  );
}
