"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

export default function HomePage() {
  const router = useRouter();
  const onboarded = useAppStore((s) => s.profile.onboarded);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (onboarded) {
      router.replace("/dashboard");
    } else {
      router.replace("/onboarding");
    }
  }, [hydrated, onboarded, router]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[var(--bg-secondary)]">
      <div className="h-8 w-8 animate-pulse rounded-full bg-[var(--tint-light)]" aria-label="Loading" />
    </div>
  );
}
