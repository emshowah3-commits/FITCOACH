"use client";

import { Chip } from "@/components/ui/Chip";

interface OptionPillProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export function OptionPill({ label, selected, onToggle }: OptionPillProps) {
  return <Chip label={label} selected={selected} onClick={onToggle} />;
}
