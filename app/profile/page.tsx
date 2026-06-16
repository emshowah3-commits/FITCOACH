"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { GOALS, LEVEL_LABELS } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import { Chip } from "@/components/ui/Chip";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  const router = useRouter();
  const profile = useAppStore((s) => s.profile);
  const toggleGoal = useAppStore((s) => s.toggleGoal);
  const setDarkMode = useAppStore((s) => s.setDarkMode);
  const resetOnboarding = useAppStore((s) => s.resetOnboarding);
  const workoutsGenerated = useAppStore((s) => s.workoutsGenerated);
  const lastGeneratedAt = useAppStore((s) => s.lastGeneratedAt);
  const [hydrated, setHydrated] = useState(false);

  const darkMode = profile.darkMode ?? "system";
  const darkEnabled = darkMode === "dark";

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (hydrated && !profile.onboarded) router.replace("/onboarding");
  }, [hydrated, profile.onboarded, router]);

  const handleReset = () => {
    resetOnboarding();
    router.replace("/onboarding");
  };

  if (!hydrated) return null;

  return (
    <div className="min-h-dvh bg-[var(--bg-secondary)] pb-12">
      <div className="mx-auto max-w-[520px] px-5 py-8">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex min-h-[44px] items-center gap-1 text-[var(--tint)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--tint)]"
        >
          <ChevronLeft className="h-5 w-5" />
          Dashboard
        </Link>

        <h1 className="font-display text-[34px] font-bold text-[var(--label-primary)]">
          Profile
        </h1>

        <section className="mt-8 rounded-[var(--radius-lg)] bg-[var(--surface-card)] p-4 shadow-card">
          <h2 className="text-[13px] font-semibold uppercase tracking-wide text-[var(--label-tertiary)]">
            Athlete
          </h2>
          <p className="mt-2 text-[22px] font-semibold">
            {profile.firstName}{" "}
            <span className="text-[var(--label-secondary)]">
              {profile.sportEmoji} {profile.sportName}
            </span>
          </p>
          <p className="text-[15px] text-[var(--label-secondary)]">
            {LEVEL_LABELS[profile.level ?? "amateur"]}
            {profile.position ? ` · ${profile.position}` : ""}
          </p>
          <Link
            href="/onboarding"
            className="mt-3 inline-block text-[15px] font-medium text-[var(--tint)]"
          >
            Edit sport & level →
          </Link>
        </section>

        <section className="mt-6">
          <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-[var(--label-tertiary)]">
            Training Goals
          </h2>
          <div className="flex flex-wrap gap-2">
            {GOALS.map((goal) => (
              <Chip
                key={goal}
                label={goal}
                selected={(profile.goals ?? []).includes(goal)}
                onClick={() => toggleGoal(goal)}
              />
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[var(--radius-lg)] bg-[var(--surface-card)] p-4 shadow-card">
          <h2 className="text-[13px] font-semibold uppercase tracking-wide text-[var(--label-tertiary)]">
            Stats
          </h2>
          <dl className="mt-3 space-y-2 text-[15px]">
            <div className="flex justify-between">
              <dt className="text-[var(--label-secondary)]">Workouts generated</dt>
              <dd className="font-semibold">{workoutsGenerated}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--label-secondary)]">Last generated</dt>
              <dd className="font-semibold">
                {lastGeneratedAt
                  ? new Date(lastGeneratedAt).toLocaleDateString()
                  : "—"}
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-6 rounded-[var(--radius-lg)] bg-[var(--surface-card)] px-4 py-3 shadow-card">
          <Toggle
            checked={darkEnabled}
            onChange={(checked) =>
              setDarkMode(checked ? "dark" : "light")
            }
            label="Dark mode"
          />
          <button
            type="button"
            onClick={() => setDarkMode("system")}
            className="mt-2 text-[13px] text-[var(--tint)]"
          >
            Use system appearance
          </button>
        </section>

        <div className="mt-8">
          <Button variant="secondary" onClick={handleReset}>
            Reset onboarding
          </Button>
        </div>
      </div>
    </div>
  );
}
