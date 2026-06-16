"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";

export function Step5Profile() {
  const firstName = useAppStore((s) => s.profile.firstName ?? "");
  const age = useAppStore((s) => s.profile.age);
  const position = useAppStore((s) => s.profile.position ?? "");
  const setProfileFields = useAppStore((s) => s.setProfileFields);
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <div className="w-full pb-4">
      <div className="mb-8 text-center">
        <h1 className="font-display text-[34px] font-bold tracking-tight text-[var(--label-primary)]">
          Last step — who are you?
        </h1>
        <p className="mt-2 text-[17px] text-[var(--label-secondary)]">
          Your profile helps personalize your experience.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <label
            htmlFor="firstName"
            className={`absolute left-4 transition-all ${
              focused === "firstName" || firstName
                ? "top-2 text-[12px] text-[var(--tint)]"
                : "top-4 text-[17px] text-[var(--label-tertiary)]"
            }`}
          >
            First name *
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={firstName}
            onChange={(e) => setProfileFields({ firstName: e.target.value })}
            onFocus={() => setFocused("firstName")}
            onBlur={() => setFocused(null)}
            className="apple-input pt-7"
            aria-required
          />
        </div>

        <div className="relative">
          <label
            htmlFor="age"
            className={`absolute left-4 transition-all ${
              focused === "age" || age
                ? "top-2 text-[12px] text-[var(--tint)]"
                : "top-4 text-[17px] text-[var(--label-tertiary)]"
            }`}
          >
            Age (optional)
          </label>
          <input
            id="age"
            type="number"
            min={10}
            max={99}
            value={age ?? ""}
            onChange={(e) =>
              setProfileFields({
                age: e.target.value ? parseInt(e.target.value, 10) : undefined,
              })
            }
            onFocus={() => setFocused("age")}
            onBlur={() => setFocused(null)}
            className="apple-input pt-7"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="position"
            className={`absolute left-4 transition-all ${
              focused === "position" || position
                ? "top-2 text-[12px] text-[var(--tint)]"
                : "top-4 text-[17px] text-[var(--label-tertiary)]"
            }`}
          >
            Primary position (optional)
          </label>
          <input
            id="position"
            type="text"
            placeholder=""
            value={position}
            onChange={(e) => setProfileFields({ position: e.target.value })}
            onFocus={() => setFocused("position")}
            onBlur={() => setFocused(null)}
            className="apple-input pt-7"
          />
        </div>
      </div>
    </div>
  );
}
