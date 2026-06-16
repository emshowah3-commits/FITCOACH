"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { LEVEL_LABELS } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import { WorkoutCard } from "@/components/dashboard/WorkoutCard";

export default function WorkoutDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const profile = useAppStore((s) => s.profile);
  const history = useAppStore((s) => s.workoutHistory);
  const [hydrated, setHydrated] = useState(false);

  const entry = history.find((h) => h.id === id);

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (hydrated && !profile.onboarded) router.replace("/onboarding");
  }, [hydrated, profile.onboarded, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="h-8 w-8 animate-pulse rounded-full bg-[var(--tint-light)]" />
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="mx-auto max-w-[640px] px-5 py-12 text-center">
        <p className="text-[var(--label-secondary)]">Plan not found.</p>
        <Link href="/dashboard" className="mt-4 inline-block text-[var(--tint)]">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[var(--bg-secondary)] pb-12">
      <div className="mx-auto max-w-[640px] px-5 py-8">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex min-h-[44px] items-center gap-1 text-[var(--tint)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--tint)]"
        >
          <ChevronLeft className="h-5 w-5" />
          Dashboard
        </Link>

        <h1 className="font-display text-[28px] font-bold text-[var(--label-primary)]">
          {entry.sport}
        </h1>
        <p className="mt-1 text-[15px] text-[var(--label-secondary)]">
          {entry.targetAreas.join(" · ")} ·{" "}
          {new Date(entry.generatedAt).toLocaleString()}
        </p>

        {entry.plan.summary && (
          <p className="mt-4 text-[15px] text-[var(--label-secondary)]">
            {entry.plan.summary}
          </p>
        )}

        <div className="mt-8 space-y-3">
          {entry.plan.workouts.map((workout, i) => (
            <WorkoutCard
              key={workout.rank}
              workout={workout}
              index={i}
              sportEmoji={profile.sportEmoji}
              sportName={profile.sportName}
              sportId={profile.sport}
              levelLabel={LEVEL_LABELS[profile.level ?? "amateur"]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
