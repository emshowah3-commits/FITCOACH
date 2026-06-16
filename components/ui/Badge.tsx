interface BadgeProps {
  children: React.ReactNode;
  bg?: string;
  color?: string;
  className?: string;
}

export function Badge({
  children,
  bg = "var(--tint-light)",
  color = "var(--tint)",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
      style={{ backgroundColor: bg, color }}
    >
      {children}
    </span>
  );
}
