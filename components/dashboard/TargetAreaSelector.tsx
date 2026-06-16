"use client";

import { Chip } from "@/components/ui/Chip";

interface TargetAreaSelectorProps {
  areas: string[];
  selected: string[];
  onToggle: (area: string) => void;
}

export function TargetAreaSelector({
  areas,
  selected,
  onToggle,
}: TargetAreaSelectorProps) {
  return (
    <section aria-label="Target muscle areas">
      <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-[var(--label-tertiary)]">
        Target Areas
      </h2>
      <div className="flex flex-wrap gap-2">
        {areas.map((area) => (
          <Chip
            key={area}
            label={area}
            selected={selected.includes(area)}
            onClick={() => onToggle(area)}
          />
        ))}
      </div>
    </section>
  );
}
