import { getRankColor } from "@/lib/constants";

interface RankBadgeProps {
  rank: number;
}

export function RankBadge({ rank }: RankBadgeProps) {
  const { accent, bg } = getRankColor(rank);
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold"
      style={{ borderColor: accent, backgroundColor: bg, color: accent }}
      aria-label={`Rank ${rank}`}
    >
      {rank}
    </span>
  );
}
