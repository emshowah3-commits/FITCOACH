"use client";

import {
  SESSION_DURATION_OPTIONS,
  TRAINING_DAYS_OPTIONS,
} from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Toggle } from "@/components/ui/Toggle";

export function Step4Schedule() {
  const trainingDays = useAppStore((s) => s.profile.trainingDays ?? 3);
  const sessionDuration = useAppStore((s) => s.profile.sessionDuration ?? 45);
  const includeRestDays = useAppStore((s) => s.profile.includeRestDays ?? true);
  const setTrainingDays = useAppStore((s) => s.setTrainingDays);
  const setSessionDuration = useAppStore((s) => s.setSessionDuration);
  const setIncludeRestDays = useAppStore((s) => s.setIncludeRestDays);

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-8 text-center">
        <h1 className="font-display text-[34px] font-bold tracking-tight text-[var(--label-primary)]">
          How often can you train?
        </h1>
        <p className="mt-2 text-[17px] text-[var(--label-secondary)]">
          We&apos;ll build a plan that fits your schedule.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <p className="mb-3 text-[15px] font-medium text-[var(--label-primary)]">
            Days per week
          </p>
          <SegmentedControl
            options={TRAINING_DAYS_OPTIONS}
            value={trainingDays}
            onChange={setTrainingDays}
            ariaLabel="Training days per week"
          />
        </div>

        <div>
          <p className="mb-3 text-[15px] font-medium text-[var(--label-primary)]">
            Session duration
          </p>
          <SegmentedControl
            options={SESSION_DURATION_OPTIONS}
            value={sessionDuration}
            onChange={setSessionDuration}
            formatLabel={(v) => `${v} min`}
            ariaLabel="Session duration"
          />
        </div>

        <div className="rounded-[var(--radius-lg)] bg-[var(--surface-card)] px-4 py-3 shadow-card">
          <Toggle
            checked={includeRestDays}
            onChange={setIncludeRestDays}
            label="Include rest day planning"
          />
        </div>
      </div>
    </div>
  );
}
