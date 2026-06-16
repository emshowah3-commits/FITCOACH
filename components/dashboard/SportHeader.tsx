"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { LEVEL_LABELS } from "@/lib/constants";

interface SportHeaderProps {
  firstName: string;
  sportEmoji: string;
  sportName: string;
  level: string;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function SportHeader({
  firstName,
  sportEmoji,
  sportName,
  level,
}: SportHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-[28px] font-bold tracking-tight text-[var(--label-primary)]">
          {getGreeting()}, {firstName} 👋
        </h1>
        <p className="mt-1 text-[15px] text-[var(--label-secondary)]">
          {sportEmoji} {sportName} · {LEVEL_LABELS[level] ?? level}
        </p>
      </div>
      <Link
        href="/profile"
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-[var(--surface-card)] shadow-card text-[var(--label-secondary)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--tint)]"
        aria-label="Profile settings"
      >
        <Settings className="h-5 w-5" />
      </Link>
    </header>
  );
}
