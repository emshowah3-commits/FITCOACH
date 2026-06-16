"use client";

export function WorkoutSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading workouts">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--surface-card)] shadow-card"
        >
          <div className="h-1 shimmer" />
          <div className="space-y-3 p-4">
            <div className="flex gap-3">
              <div className="h-8 w-8 shrink-0 rounded-full shimmer" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-2/3 rounded shimmer" />
                <div className="h-3 w-1/2 rounded shimmer" />
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full shimmer" />
            <div className="h-12 w-full rounded shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}
