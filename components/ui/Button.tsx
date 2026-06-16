"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function Button({
  variant = "primary",
  loading = false,
  disabled,
  children,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const base =
    "relative flex w-full min-h-[54px] items-center justify-center rounded-[var(--radius-xl)] text-[17px] font-semibold transition-opacity focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--tint)] focus-visible:outline-offset-2";

  const variants = {
    primary: "bg-[var(--tint)] text-white",
    secondary:
      "border border-[var(--separator-opaque)] bg-transparent text-[var(--tint)]",
  };

  return (
    <motion.button
      whileTap={isDisabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", damping: 25, stiffness: 400 }}
      className={`${base} ${variants[variant]} ${isDisabled ? "pointer-events-none opacity-40" : ""} ${className}`}
      disabled={isDisabled}
      aria-busy={loading}
      onClick={onClick}
      type={type}
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
      ) : (
        children
      )}
    </motion.button>
  );
}
