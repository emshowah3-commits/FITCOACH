import { NextResponse } from "next/server";
import { generateWorkoutPlan } from "@/lib/generate-workout";
import type { AthleticLevel } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      sportId,
      sport,
      level,
      levelId,
      goals,
      targetAreas,
      trainingDays,
      sessionDuration,
    } = body;

  if (!sport || !level || !targetAreas?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const plan = generateWorkoutPlan({
      sportId: sportId ?? "default",
      sportName: sport,
      level: (levelId ?? "amateur") as AthleticLevel,
      levelLabel: level,
      goals: goals ?? [],
      targetAreas,
      trainingDays: trainingDays ?? 3,
      sessionDuration: sessionDuration ?? 45,
    });

    return NextResponse.json(plan);
  } catch (err) {
    console.error("generate-workout error:", err);
    return NextResponse.json(
      { error: "Couldn't load your plan — try again." },
      { status: 500 }
    );
  }
}
