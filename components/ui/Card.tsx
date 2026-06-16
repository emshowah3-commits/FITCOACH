"use client";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = "", onClick }: CardProps) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`rounded-[var(--radius-lg)] bg-[var(--surface-card)] shadow-card ${onClick ? "cursor-pointer text-left" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
