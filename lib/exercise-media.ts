import type { BodyRegion } from "./body-regions";
import { musclesToRegions } from "./body-regions";

export interface ExerciseMediaMeta {
  videoId: string;
  bodyRegions?: BodyRegion[];
  gameplayTemplate: string;
}

const EXERCISE_MEDIA: Record<string, ExerciseMediaMeta> = {
  Crunches: {
    videoId: "Db9VqZuXmNc",
    gameplayTemplate:
      "Builds baseline trunk endurance for {sport}, but won't directly improve the explosive bracing you need during {demand}.",
  },
  "Plank Hold": {
    videoId: "pSHjTRCQxIw",
    gameplayTemplate:
      "Teaches you to brace under fatigue — useful when holding position during contact and pivots in {sport}.",
  },
  "Bird Dog": {
    videoId: "wifMLbzSczo",
    gameplayTemplate:
      "Trains cross-body stability for running and throwing mechanics that show up constantly in {sport}.",
  },
  "Pallof Press": {
    videoId: "SzPGMYS-b6o",
    gameplayTemplate:
      "Anti-rotation strength helps you stay square through contact and direction changes during {demand}.",
  },
  "Medicine Ball Rotational Throw": {
    videoId: "6bnMiWL51wc",
    gameplayTemplate:
      "Develops rotational power transfer — the same hip-to-shoulder chain used for shots, throws, and cuts in {sport}.",
  },
  "Dead Bug with Band Anti-Rotation": {
    videoId: "PnWqZ-_aJWE",
    gameplayTemplate:
      "Mirrors game-day trunk control in {sport} when your limbs move but your core must stay locked during {demand}.",
  },
  "Wall Sit": {
    videoId: "Y-S_1sQ4Zm8",
    gameplayTemplate:
      "Builds quad endurance for long possessions, but lacks the reactive bounce {sport} athletes need in {demand}.",
  },
  "Bodyweight Squats": {
    videoId: "xsQlrW0-bnE",
    gameplayTemplate:
      "Foundation leg strength supports every jump, sprint, and plant you'll make in {sport}.",
  },
  "Walking Lunges": {
    videoId: "QOVaHwm-Q6U",
    gameplayTemplate:
      "Single-leg strength carries over to decelerating and re-accelerating during {demand} in {sport}.",
  },
  "Romanian Deadlift": {
    videoId: "QBh8kWrKqrU",
    gameplayTemplate:
      "Posterior chain power drives sprint speed and hip extension on every explosive move in {sport}.",
  },
  "Bulgarian Split Squat": {
    videoId: "2qz3s_h0hXc",
    gameplayTemplate:
      "Trains the exact single-leg loading pattern when you plant, cut, and drive in {sport} during {demand}.",
  },
  "Trap Bar Jump": {
    videoId: "0Zfq7wLnPr0",
    gameplayTemplate:
      "Loaded jumps build rate of force development for first-step bursts and vertical power in {sport}.",
  },
  "Push-Ups": {
    videoId: "IODxDxX7oi4",
    gameplayTemplate:
      "Upper-body pushing endurance helps you win contact battles and maintain posture through {demand}.",
  },
  "Dumbbell Row": {
    videoId: "8pJ34K24lhY",
    gameplayTemplate:
      "Pulling strength supports tackling form, rebounding position, and posture under fatigue in {sport}.",
  },
  "Landmine Press": {
    videoId: "BHKwI0YPkFg",
    gameplayTemplate:
      "Combines overhead strength with core anti-rotation — key for throwing, blocking, and finishing through contact in {sport}.",
  },
  "Pull-Ups": {
    videoId: "eGo4IYlbE5g",
    gameplayTemplate:
      "Relative upper-body strength improves climbing, grappling, and body control during {demand} in {sport}.",
  },
  "Single-Arm Cable Press": {
    videoId: "8mL2RhFXmOQ",
    gameplayTemplate:
      "Unilateral pressing while resisting rotation maps directly to blocking, stiff-arms, and off-balance finishes in {sport}.",
  },
  "Jumping Jacks": {
    videoId: "c4bLDJZZ7Fw",
    gameplayTemplate:
      "Elevates heart rate for warm-up but won't build the explosive ground forces {sport} demands during {demand}.",
  },
  "Broad Jumps": {
    videoId: "u61qwGx1s90",
    gameplayTemplate:
      "Horizontal power helps with diving saves, burst acceleration, and closing space quickly in {sport}.",
  },
  "Box Jumps": {
    videoId: "T26Dn7u-x5A",
    gameplayTemplate:
      "Reactive vertical power translates to blocks, headers, rebounds, and explosive starts in {sport}.",
  },
  "Depth Jumps": {
    videoId: "VNqH9xU9mKE",
    gameplayTemplate:
      "Trains elastic rebound — the springy landing-to-burst cycle critical for {demand} in {sport}.",
  },
  "Depth Jump to Sprint": {
    videoId: "VNqH9xU9mKE",
    gameplayTemplate:
      "Landing and immediately exploding mirrors transition moments in {sport} — rebound to sprint on {demand}.",
  },
  "5-10-5 Shuttle": {
    videoId: "FvXWv2_XPLE",
    gameplayTemplate:
      "Sharp lateral cuts and deceleration directly improve defensive slides, jukes, and direction changes in {sport}.",
  },
  "Reactive Cone Shuffle": {
    videoId: "uKYNYR5vZV8",
    gameplayTemplate:
      "Reactive footwork builds the defensive reads and recovery steps you need during {demand} in {sport}.",
  },
  "Sport-Specific Interval Sprints": {
    videoId: "L3hR3O-0fQQ",
    gameplayTemplate:
      "Repeat sprint intervals match the work-rest rhythm of {demand} — the energy system you actually compete in for {sport}.",
  },
  "Repeated Sprint Ability Test": {
    videoId: "L3hR3O-0fQQ",
    gameplayTemplate:
      "Maintains burst quality when fatigued — exactly when games are won or lost in {sport} during {demand}.",
  },
  "Dynamic Lunge with Rotation": {
    videoId: "F8xz3mKxE9k",
    gameplayTemplate:
      "Opens hips and T-spine together — the mobility chain for cutting, throwing, and rotating through {demand} in {sport}.",
  },
  "Single-Leg Hop & Stick": {
    videoId: "YE0RQPQQ1NU",
    gameplayTemplate:
      "Landing stability on one leg prevents energy leaks on plants and reduces injury risk during {demand} in {sport}.",
  },
  "Max Vertical Jump (Tracked)": {
    videoId: "DvhKT8qZtN8",
    gameplayTemplate:
      "Max-intent vertical training builds the explosive hip extension for blocks, spikes, and finishes in {sport}.",
  },
  "Depth Jump to Max Vertical": {
    videoId: "VNqH9xU9mKE",
    gameplayTemplate:
      "Second-jump explosiveness for offensive rebounds, block recoveries, and reactive hops in {sport}.",
  },
  "Defensive Slide to Closeout": {
    videoId: "uKYNYR5vZV8",
    gameplayTemplate:
      "Slide-to-closeout footwork is the foundation of perimeter defense and space denial in {sport}.",
  },
  "Mirror Lateral Cut Drill": {
    videoId: "FvXWv2_XPLE",
    gameplayTemplate:
      "One-on-one mirroring builds the lateral speed and reaction to stay with opponents during {demand} in {sport}.",
  },
  "Spiderman Lunge with Reach": {
    videoId: "F8xz3mKxE9k",
    gameplayTemplate:
      "Hip flexor mobility unlocks longer stride length and deeper athletic positions for {demand} in {sport}.",
  },
  "Towel Pull-Ups": {
    videoId: "eGo4IYlbE5g",
    gameplayTemplate:
      "Grip plus pull strength helps with ball security, jersey battles, and climbing through contact in {sport}.",
  },
  "Neck Harness Extensions": {
    videoId: "LDm7JHmJHcA",
    gameplayTemplate:
      "Neck strength reduces whiplash risk and helps you absorb contact safely during {demand} in {sport}.",
  },
  "Steady Jog": {
    videoId: "XCNbz5yZmL4",
    gameplayTemplate:
      "Base aerobic conditioning builds work capacity for sustained effort in {demand} during {sport}.",
  },
  "Jump Rope": {
    videoId: "LJEKr4vQkAg",
    gameplayTemplate:
      "Footwork coordination and calf endurance transfer to court movement and rhythm in {sport}.",
  },
  "Bike Intervals": {
    videoId: "kLLmUKkVQRs",
    gameplayTemplate:
      "Low-impact interval training builds repeat-effort capacity without excessive joint stress in {sport}.",
  },
  "Tempo Runs": {
    videoId: "BQmMfL7nnok",
    gameplayTemplate:
      "Threshold training teaches you to sustain high-intensity output when {demand} peaks in {sport}.",
  },
  "High Knees": {
    videoId: "LWcI5-DUSN0",
    gameplayTemplate:
      "Hip flexor activation and ground contact speed prime the nervous system for explosive starts in {sport}.",
  },
  "Ladder In-Outs": {
    videoId: "KXxJQH6K-pY",
    gameplayTemplate:
      "Rapid foot coordination drills improve directional change mechanics for cuts and pivots in {sport}.",
  },
  "T-Drill": {
    videoId: "FvXWv2_XPLE",
    gameplayTemplate:
      "Forward-back-lateral movement patterns match the footwork demands of {demand} in {sport}.",
  },
  "Mirror Drill with Cut": {
    videoId: "FvXWv2_XPLE",
    gameplayTemplate:
      "Reactive lateral movement mirrors defensive positioning and attacking changes in {sport} during {demand}.",
  },
  "Squat to Calf Raise": {
    videoId: "xsQlrW0-bnE",
    gameplayTemplate:
      "Combines lower-body extension with calf engagement for powerful takeoff and landing mechanics in {sport}.",
  },
  "Single-Leg Stand": {
    videoId: "YE0RQPQQ1NU",
    gameplayTemplate:
      "Single-leg balance trains proprioception for maintaining body control under game conditions in {sport}.",
  },
  "BOSU Ball Balance": {
    videoId: "uKYNYR5vZV8",
    gameplayTemplate:
      "Unstable surface training challenges stabilizer muscles to prevent ankle turns during {demand} in {sport}.",
  },
  "Single-Leg RDL": {
    videoId: "TvxNkmSAaNc",
    gameplayTemplate:
      "Single-leg balance with loading trains hip stability for lunging, reaching, and lateral movement in {sport}.",
  },
  "Y-Balance Reach": {
    videoId: "84iJGmVYKg4",
    gameplayTemplate:
      "Multi-directional reaching improves dynamic balance when changing direction quickly during {demand} in {sport}.",
  },
  "Single-Leg Catch & Throw": {
    videoId: "LWcI5-DUSN0",
    gameplayTemplate:
      "Catching on one leg while maintaining balance mirrors split-second reactions and catches in {sport}.",
  },
  "Butterfly Stretch": {
    videoId: "F8xz3mKxE9k",
    gameplayTemplate:
      "Hip internal rotation mobility supports deep squatting and lateral movement ranges in {sport}.",
  },
  "Hip Circles": {
    videoId: "F8xz3mKxE9k",
    gameplayTemplate:
      "Active hip mobility in all planes readies the hip complex for explosive changes of direction in {sport}.",
  },
  "Cossack Squat": {
    videoId: "2t-2j9_8SL8",
    gameplayTemplate:
      "Lateral hip and quad loading opens the hips for deep lateral movement during {demand} in {sport}.",
  },
  "90/90 Switches": {
    videoId: "F8xz3mKxE9k",
    gameplayTemplate:
      "Hip external/internal rotation switches improve hip mobility and deceleration control in {sport}.",
  },
  "Lateral Lunge to Deep Squat Flow": {
    videoId: "2t-2j9_8SL8",
    gameplayTemplate:
      "Dynamic lateral-to-sagittal movement transitions prepare hips for cutting and directional changes in {sport}.",
  },
  "Arm Circles": {
    videoId: "L5-VHN-YKrU",
    gameplayTemplate:
      "Shoulder mobility warm-up activates rotator cuffs for overhead and throwing mechanics in {sport}.",
  },
};

const CATEGORY_FALLBACK: Record<string, ExerciseMediaMeta> = {
  core: {
    videoId: "pSHjTRCQxIw",
    gameplayTemplate:
      "Core stability keeps power flowing to your limbs instead of leaking during {demand} in {sport}.",
  },
  lower: {
    videoId: "xsQlrW0-bnE",
    gameplayTemplate:
      "Leg strength and power drive every sprint, jump, and cut you make during {demand} in {sport}.",
  },
  upper: {
    videoId: "IODxDxX7oi4",
    gameplayTemplate:
      "Upper-body strength supports contact, balance, and force transfer during {demand} in {sport}.",
  },
  plyo: {
    videoId: "T26Dn7u-x5A",
    gameplayTemplate:
      "Explosive training builds the fast-twitch power for bursts and reactive moves in {demand} during {sport}.",
  },
  agility: {
    videoId: "FvXWv2_XPLE",
    gameplayTemplate:
      "Change-of-direction speed helps you create separation and stay with opponents during {demand} in {sport}.",
  },
  endurance: {
    videoId: "L3hR3O-0fQQ",
    gameplayTemplate:
      "Conditioning lets you maintain skill and speed deep into competition when {demand} peaks in {sport}.",
  },
  mobility: {
    videoId: "F8xz3mKxE9k",
    gameplayTemplate:
      "Mobility keeps you moving efficiently through full range during {demand} and reduces injury risk in {sport}.",
  },
  balance: {
    videoId: "YE0RQPQQ1NU",
    gameplayTemplate:
      "Balance under load prevents wasted motion on single-leg landings and cuts during {demand} in {sport}.",
  },
  grip: {
    videoId: "eGo4IYlbE5g",
    gameplayTemplate:
      "Grip strength wins contested possessions and grappling moments during {demand} in {sport}.",
  },
  neck: {
    videoId: "LDm7JHmJHcA",
    gameplayTemplate:
      "Neck and trap strength prepares you for collision and contact situations during {demand} in {sport}.",
  },
  default: {
    videoId: "xsQlrW0-bnE",
    gameplayTemplate:
      "This drill builds athletic qualities that support your performance during {demand} in {sport}.",
  },
};

function guessCategory(name: string, muscles: string[]): string {
  const n = name.toLowerCase();
  const m = muscles.join(" ").toLowerCase();
  if (m.includes("cardio") || n.includes("sprint") || n.includes("jog") || n.includes("interval"))
    return "endurance";
  if (n.includes("jump") || n.includes("bound") || n.includes("plyo") || n.includes("depth"))
    return "plyo";
  if (n.includes("shuffle") || n.includes("drill") || n.includes("agility") || n.includes("ladder"))
    return "agility";
  if (n.includes("stretch") || n.includes("mobility") || n.includes("90/90") || n.includes("lunge"))
    return "mobility";
  if (n.includes("balance") || n.includes("bosu") || n.includes("y-balance") || n.includes("stick"))
    return "balance";
  if (n.includes("grip") || n.includes("hang") || n.includes("towel") || n.includes("farmer"))
    return "grip";
  if (n.includes("neck") || n.includes("trap") || n.includes("shrug"))
    return "neck";
  if (m.includes("core") || m.includes("oblique") || m.includes("abdom"))
    return "core";
  if (m.includes("quad") || m.includes("glute") || m.includes("hamstring") || m.includes("calf"))
    return "lower";
  if (m.includes("chest") || m.includes("shoulder") || m.includes("lat") || m.includes("bicep"))
    return "upper";
  return "default";
}

export function getExerciseMedia(
  exerciseName: string,
  primaryMuscles: string[],
  sportName: string,
  demand: string
) {
  const meta =
    EXERCISE_MEDIA[exerciseName] ??
    CATEGORY_FALLBACK[guessCategory(exerciseName, primaryMuscles)] ??
    CATEGORY_FALLBACK.default;

  const bodyRegions = meta.bodyRegions ?? musclesToRegions(primaryMuscles);
  const gameplayBenefit = meta.gameplayTemplate
    .replace(/\{sport\}/g, sportName)
    .replace(/\{demand\}/g, demand);

  return {
    videoId: meta.videoId,
    imageUrl: `https://img.youtube.com/vi/${meta.videoId}/hqdefault.jpg`,
    bodyRegions,
    gameplayBenefit,
  };
}

export function getYouTubeEmbedUrl(videoId: string) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
}

export function getYouTubeWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
