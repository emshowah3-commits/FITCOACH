"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ONBOARDING_STEPS } from "@/lib/constants";
import { useAppStore } from "@/lib/store";
import { saveUserProfile } from "@/lib/profile-service";
import type { OnboardingStep } from "@/lib/types";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { StepContainer } from "@/components/onboarding/StepContainer";
import { Button } from "@/components/ui/Button";
import { Step1Sport } from "./steps/Step1Sport";
import { Step2Level } from "./steps/Step2Level";
import { Step3Goals } from "./steps/Step3Goals";
import { Step4Schedule } from "./steps/Step4Schedule";
import { Step5Profile } from "./steps/Step5Profile";
import { CompletionCelebration } from "./steps/CompletionCelebration";

export default function OnboardingPage() {
  const router = useRouter();
  const step = useAppStore((s) => s.onboardingStep);
  const direction = useAppStore((s) => s.onboardingDirection);
  const setOnboardingStep = useAppStore((s) => s.setOnboardingStep);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const profile = useAppStore((s) => s.profile);
  const [celebrating, setCelebrating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    contentRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [step]);

  const canContinue = (() => {
    switch (step) {
      case 1:
        return !!profile.sport;
      case 2:
        return !!profile.level;
      case 3:
        return (profile.goals?.length ?? 0) >= 1;
      case 4:
        return !!profile.trainingDays && !!profile.sessionDuration;
      case 5:
        return (profile.firstName?.trim().length ?? 0) > 0;
      default:
        return false;
    }
  })();

  const goNext = useCallback(async () => {
    if (step === 5) {
      try {
        // Save profile to Supabase before completing onboarding
        await saveUserProfile({
          firstName: profile.firstName ?? "",
          age: profile.age,
          position: profile.position,
        });
      } catch (error) {
        console.error("Failed to save profile:", error);
        // Continue anyway to not block user experience
      }

      completeOnboarding();
      setCelebrating(true);
      return;
    }
    setOnboardingStep((step + 1) as OnboardingStep, 1);
  }, [step, setOnboardingStep, completeOnboarding, profile]);

  const goBack = () => {
    if (step > 1) setOnboardingStep((step - 1) as OnboardingStep, -1);
  };

  const skipToEnd = () => {
    if (!profile.sport) return;
    setOnboardingStep(5, 1);
  };

  const handleCelebrationDone = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  if (celebrating) {
    return (
      <div className="flex min-h-dvh flex-col bg-[var(--bg-secondary)]">
        <div className="mx-auto flex w-full max-w-[520px] flex-1 flex-col px-5 py-8">
          <CompletionCelebration
            name={profile.firstName ?? "Athlete"}
            onDone={handleCelebrationDone}
          />
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Sport />;
      case 2:
        return <Step2Level />;
      case 3:
        return <Step3Goals />;
      case 4:
        return <Step4Schedule />;
      case 5:
        return <Step5Profile />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--bg-secondary)]">
      <div className="mx-auto flex w-full max-w-[520px] flex-1 flex-col px-5">
        <nav className="flex min-h-[44px] items-center justify-between py-3">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 1}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-[var(--tint)] disabled:invisible focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--tint)]"
            aria-label="Go back"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <span className="text-[15px] font-medium text-[var(--label-secondary)]">
            Step {step} of {ONBOARDING_STEPS}
          </span>
          {step < 4 ? (
            <button
              type="button"
              onClick={skipToEnd}
              className="min-h-[44px] px-2 text-[15px] font-medium text-[var(--tint)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--tint)]"
            >
              Skip
            </button>
          ) : (
            <span className="w-[52px]" aria-hidden />
          )}
        </nav>

        <ProgressBar currentStep={step} />

        <div
          ref={contentRef}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto py-4"
        >
          <StepContainer stepKey={step} direction={direction}>
            {renderStep()}
          </StepContainer>
        </div>

        <div className="sticky bottom-0 bg-[var(--bg-secondary)] pb-6 pt-2">
          <Button onClick={goNext} disabled={!canContinue}>
            {step === 5 ? "Get Started" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
