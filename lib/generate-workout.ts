import type { AthleticLevel, Workout, WorkoutPlan } from "./types";
import { getExerciseMedia } from "./exercise-media";

export interface GeneratePlanInput {
  sportId: string;
  sportName: string;
  level: AthleticLevel;
  levelLabel: string;
  goals: string[];
  targetAreas: string[];
  trainingDays: number;
  sessionDuration: number;
}

type ExerciseTemplate = {
  name: string;
  sets: string;
  restSeconds: number;
  primaryMuscles: string[];
  equipment: string;
  rankLabel: string;
  whyTemplate: string;
  tip: string;
  modification: string;
};

const RANK_LABELS = [
  "Least Effective",
  "Below Average",
  "Moderate",
  "Good",
  "Very Effective",
  "Most Effective",
];

const EFFECTIVENESS = [26, 41, 57, 71, 87, 93];

export const SPORT_DEMANDS: Record<string, string> = {
  basketball:
    "court spacing, closeouts, rebounding battles, and transition sprints",
  soccer:
    "90-minute repeat sprints, cutting on a dime, and single-leg deceleration",
  football:
    "collision prep, burst off the line, and change-of-direction under load",
  tennis:
    "rotational power, lateral recovery steps, and repeated explosive starts",
  swimming:
    "streamline core control, shoulder endurance, and hip-driven propulsion",
  track:
    "stride mechanics, ground contact stiffness, and race-pace power output",
  volleyball:
    "vertical approach jumps, lateral floor coverage, and overhead stability",
  baseball:
    "rotational bat speed, throwing arm durability, and base-stealing bursts",
  hockey:
    "low-skate posture, hip hinge power, and explosive starts from ice",
  cycling:
    "sustained power output, hip flexor endurance, and core anti-rotation",
  gymnastics:
    "hollow-body control, wrist/shoulder prep, and single-leg landing stability",
  boxing:
    "rotational punch power, footwork rhythm, and trunk stiffness under fatigue",
  wrestling:
    "hip dominance, grip endurance, and explosive level changes",
  rugby:
    "contact resilience, maul driving power, and multi-directional acceleration",
  golf:
    "X-factor rotation, hip dissociation, and stable lower-body ground force",
  rowing:
    "posterior chain endurance, thoracic extension, and leg drive sequencing",
  skiing:
    "eccentric quad control, lateral hip stability, and core anti-rotation",
  weightlifting:
    "triple-extension power, overhead mobility, and pulling chain strength",
  fencing:
    "lunge explosiveness, ankle stability, and rapid direction reversals",
  climbing:
    "pulling endurance, shoulder stability, and hip flexibility for high steps",
  default:
    "sport-specific speed, power endurance, and injury-resilient movement quality",
};

const AREA_PLANS: Record<
  string,
  { summary: string; exercises: ExerciseTemplate[] }
> = {
  Core: {
    summary:
      "Anti-rotation and bracing work ranked for {sport} — where a weak core leaks power on every {demand}.",
    exercises: [
      {
        name: "Crunches",
        sets: "3 x 20 reps",
        restSeconds: 45,
        primaryMuscles: ["Rectus Abdominis"],
        equipment: "None",
        rankLabel: "Least Effective",
        whyTemplate:
          "Crunches isolate the front abs and build basic trunk endurance. They don't train the anti-rotation or bracing patterns {sport} athletes need during {demand}.",
        tip: "Exhale on the way up; don't pull your neck.",
        modification: "Dead bug for safer spine position.",
      },
      {
        name: "Plank Hold",
        sets: "3 x 45 sec",
        restSeconds: 60,
        primaryMuscles: ["Transverse Abdominis", "Obliques"],
        equipment: "None",
        rankLabel: "Below Average",
        whyTemplate:
          "Planks teach isometric bracing useful in static contact. {sport} demands dynamic core control during {demand}, not just holding still.",
        tip: "Squeeze glutes; keep ribs stacked over pelvis.",
        modification: "Elevate hands to reduce intensity.",
      },
      {
        name: "Bird Dog",
        sets: "3 x 10 each side",
        restSeconds: 45,
        primaryMuscles: ["Erector Spinae", "Glutes", "Core"],
        equipment: "None",
        rankLabel: "Moderate",
        whyTemplate:
          "Bird dogs build contralateral stability for running and throwing patterns. They lack the rotational velocity {sport} requires during {demand}.",
        tip: "Move slow; don't rotate your hips.",
        modification: "Hold each rep 3 seconds at extension.",
      },
      {
        name: "Pallof Press",
        sets: "3 x 12 each side",
        restSeconds: 60,
        primaryMuscles: ["Obliques", "Transverse Abdominis"],
        equipment: "Cable or band",
        rankLabel: "Good",
        whyTemplate:
          "Pallof presses train anti-rotation under load — critical when resisting contact or changing direction in {sport}. Still missing multi-planar speed seen in {demand}.",
        tip: "Press straight out; resist the twist.",
        modification: "Half-kneeling for more hip challenge.",
      },
      {
        name: "Medicine Ball Rotational Throw",
        sets: "4 x 6 each side",
        restSeconds: 75,
        primaryMuscles: ["Obliques", "Hip Rotators", "Core"],
        equipment: "Med ball",
        rankLabel: "Very Effective",
        whyTemplate:
          "Rotational throws develop power transfer from ground to upper body — the same chain used in {sport} during {demand}. High carryover with explosive intent.",
        tip: "Drive from back hip through the ball.",
        modification: "Lighter ball, faster reps for speed.",
      },
      {
        name: "Dead Bug with Band Anti-Rotation",
        sets: "4 x 8 each side",
        restSeconds: 60,
        primaryMuscles: ["Deep Core", "Obliques", "Hip Flexors"],
        equipment: "Mini band",
        rankLabel: "Most Effective",
        whyTemplate:
          "Combining limb motion with anti-rotation mirrors {sport} trunk demands during {demand} — bracing while limbs move independently. This is the closest core pattern to game action.",
        tip: "Keep lower back glued to the floor.",
        modification: "Add exhale on full extension.",
      },
    ],
  },
  "Lower Body": {
    summary:
      "Leg strength and power ranked for {sport} — built around the demands of {demand}.",
    exercises: [
      {
        name: "Wall Sit",
        sets: "3 x 30 sec",
        restSeconds: 60,
        primaryMuscles: ["Quadriceps", "Glutes"],
        equipment: "None",
        rankLabel: "Least Effective",
        whyTemplate:
          "Wall sits build isometric quad endurance. {sport} requires reactive eccentric strength and explosive concentric power during {demand}, not static holds.",
        tip: "Thighs parallel to floor; back flat on wall.",
        modification: "Shorter holds with more sets.",
      },
      {
        name: "Bodyweight Squats",
        sets: "3 x 15 reps",
        restSeconds: 60,
        primaryMuscles: ["Quadriceps", "Glutes"],
        equipment: "None",
        rankLabel: "Below Average",
        whyTemplate:
          "Squats develop general leg strength in one plane. {sport} athletes need single-leg and lateral force production during {demand}.",
        tip: "Sit back; knees track over toes.",
        modification: "Goblet squat with dumbbell.",
      },
      {
        name: "Walking Lunges",
        sets: "3 x 12 each leg",
        restSeconds: 75,
        primaryMuscles: ["Quadriceps", "Glutes", "Hamstrings"],
        equipment: "None",
        rankLabel: "Moderate",
        whyTemplate:
          "Walking lunges introduce single-leg stability useful for {sport}. They lack the explosive intent and short ground contacts of {demand}.",
        tip: "Torso tall; back knee nearly touches floor.",
        modification: "Reverse lunges for less knee stress.",
      },
      {
        name: "Romanian Deadlift",
        sets: "4 x 8 reps",
        restSeconds: 90,
        primaryMuscles: ["Hamstrings", "Glutes", "Erector Spinae"],
        equipment: "Barbell or dumbbells",
        rankLabel: "Good",
        whyTemplate:
          "RDLs build posterior chain strength for sprinting and jumping in {sport}. Missing the rapid stretch-shortening cycle of {demand}.",
        tip: "Hinge at hips; bar stays close to legs.",
        modification: "Single-leg RDL for balance.",
      },
      {
        name: "Bulgarian Split Squat",
        sets: "4 x 8 each leg",
        restSeconds: 90,
        primaryMuscles: ["Quadriceps", "Glutes"],
        equipment: "Bench",
        rankLabel: "Very Effective",
        whyTemplate:
          "Split squats mirror the single-leg loading pattern in {sport} during {demand} — decelerating, planting, and driving off one leg.",
        tip: "Front knee over mid-foot; torso slight forward lean.",
        modification: "Add dumbbells for load.",
      },
      {
        name: "Trap Bar Jump",
        sets: "5 x 4 reps",
        restSeconds: 120,
        primaryMuscles: ["Quadriceps", "Glutes", "Calves"],
        equipment: "Trap bar",
        rankLabel: "Most Effective",
        whyTemplate:
          "Loaded jumps develop rate of force development directly transferable to {sport} — the explosive leg drive behind {demand}. Highest lower-body specificity on this list.",
        tip: "Land softly; reset each rep.",
        modification: "Bodyweight squat jump if no trap bar.",
      },
    ],
  },
  "Upper Body": {
    summary:
      "Push, pull, and shoulder stability ranked for {sport} — tuned for {demand}.",
    exercises: [
      {
        name: "Arm Circles",
        sets: "2 x 20 each direction",
        restSeconds: 30,
        primaryMuscles: ["Deltoids", "Rotator Cuff"],
        equipment: "None",
        rankLabel: "Least Effective",
        whyTemplate:
          "Arm circles warm the shoulders but don't build strength or power for {sport}. Minimal transfer to {demand}.",
        tip: "Small controlled circles; increase size gradually.",
        modification: "Band pull-aparts instead.",
      },
      {
        name: "Push-Ups",
        sets: "3 x 12 reps",
        restSeconds: 60,
        primaryMuscles: ["Chest", "Triceps", "Anterior Deltoid"],
        equipment: "None",
        rankLabel: "Below Average",
        whyTemplate:
          "Push-ups build general pushing strength. {sport} upper-body demands during {demand} are often rotational or overhead, not horizontal pressing.",
        tip: "Body straight line; elbows 45 degrees.",
        modification: "Incline push-ups to scale.",
      },
      {
        name: "Dumbbell Row",
        sets: "3 x 10 each arm",
        restSeconds: 75,
        primaryMuscles: ["Lats", "Rhomboids", "Biceps"],
        equipment: "Dumbbell",
        rankLabel: "Moderate",
        whyTemplate:
          "Rows strengthen the pulling chain for contact and posture in {sport}. Lacks explosive pulling speed needed in {demand}.",
        tip: "Pull elbow to hip; squeeze shoulder blade.",
        modification: "Chest-supported row for form.",
      },
      {
        name: "Landmine Press",
        sets: "4 x 8 each side",
        restSeconds: 75,
        primaryMuscles: ["Shoulders", "Core", "Triceps"],
        equipment: "Barbell landmine",
        rankLabel: "Good",
        whyTemplate:
          "Landmine presses combine shoulder strength with core anti-rotation — useful for {sport} athletes during {demand}.",
        tip: "Press up and forward; brace core.",
        modification: "Half-kneeling for stability.",
      },
      {
        name: "Pull-Ups",
        sets: "4 x 6 reps",
        restSeconds: 90,
        primaryMuscles: ["Lats", "Biceps", "Core"],
        equipment: "Pull-up bar",
        rankLabel: "Very Effective",
        whyTemplate:
          "Pull-ups build relative upper-body strength critical for {sport} contact, climbing, and body control during {demand}.",
        tip: "Full hang to chin over bar.",
        modification: "Band-assisted pull-ups.",
      },
      {
        name: "Single-Arm Cable Press",
        sets: "4 x 8 each side",
        restSeconds: 75,
        primaryMuscles: ["Chest", "Shoulders", "Obliques"],
        equipment: "Cable machine",
        rankLabel: "Most Effective",
        whyTemplate:
          "Unilateral pressing with anti-rotation directly maps to {sport} — pushing or blocking while the trunk resists twist during {demand}. Top upper-body transfer.",
        tip: "Don't rotate; press through the floor.",
        modification: "Resistance band single-arm press.",
      },
    ],
  },
  Explosiveness: {
    summary:
      "Power output exercises ranked for {sport} — from general to game-speed explosive work for {demand}.",
    exercises: [
      {
        name: "Jumping Jacks",
        sets: "3 x 30 sec",
        restSeconds: 45,
        primaryMuscles: ["Calves", "Hip Flexors"],
        equipment: "None",
        rankLabel: "Least Effective",
        whyTemplate:
          "Jumping jacks elevate heart rate but produce low ground reaction forces. {sport} explosiveness during {demand} needs maximal intent, not rhythmic cardio.",
        tip: "Land softly on balls of feet.",
        modification: "Step jacks for low impact.",
      },
      {
        name: "Squat to Calf Raise",
        sets: "3 x 12 reps",
        restSeconds: 60,
        primaryMuscles: ["Quadriceps", "Calves"],
        equipment: "None",
        rankLabel: "Below Average",
        whyTemplate:
          "This combo builds strength without speed. {sport} athletes need rapid force production during {demand}, not slow strength-endurance.",
        tip: "Explode up on calf raise.",
        modification: "Add dumbbells for load.",
      },
      {
        name: "Broad Jumps",
        sets: "4 x 5 reps",
        restSeconds: 90,
        primaryMuscles: ["Glutes", "Hamstrings", "Calves"],
        equipment: "None",
        rankLabel: "Moderate",
        whyTemplate:
          "Broad jumps develop horizontal power useful in {sport}. Missing the vertical and lateral components of {demand}.",
        tip: "Swing arms; stick the landing.",
        modification: "Standing long jump for measurement.",
      },
      {
        name: "Box Jumps",
        sets: "4 x 5 reps",
        restSeconds: 90,
        primaryMuscles: ["Quadriceps", "Glutes", "Calves"],
        equipment: "Plyo box",
        rankLabel: "Good",
        whyTemplate:
          "Box jumps build reactive vertical power for {sport}. Limited transfer to multi-directional explosiveness in {demand}.",
        tip: "Step down; don't rebound off box.",
        modification: "Lower box for technique focus.",
      },
      {
        name: "Depth Jumps",
        sets: "4 x 4 reps",
        restSeconds: 120,
        primaryMuscles: ["Quadriceps", "Glutes", "Calves"],
        equipment: "Low box",
        rankLabel: "Very Effective",
        whyTemplate:
          "Depth jumps train stretch-shortening cycle — the elastic rebound {sport} athletes use during {demand} for bursts and landings.",
        tip: "Minimal ground contact; react instantly.",
        modification: "Drop height 12–18 inches.",
      },
      {
        name: "Depth Jump to Sprint",
        sets: "4 x 4 reps",
        restSeconds: 120,
        primaryMuscles: ["Quadriceps", "Glutes", "Hip Flexors"],
        equipment: "Low box",
        rankLabel: "Most Effective",
        whyTemplate:
          "Landing and immediately sprinting mirrors {sport}'s most decisive moments during {demand} — rebound to first-step explosion. Highest explosiveness transfer.",
        tip: "React on ground contact; drive arms.",
        modification: "Depth jump to lateral shuffle.",
      },
    ],
  },
  Agility: {
    summary:
      "Change-of-direction drills ranked for {sport} — how well each prepares you for {demand}.",
    exercises: [
      {
        name: "High Knees",
        sets: "3 x 20 sec",
        restSeconds: 45,
        primaryMuscles: ["Hip Flexors", "Calves"],
        equipment: "None",
        rankLabel: "Least Effective",
        whyTemplate:
          "High knees warm up hip flexors in a straight line. {sport} agility during {demand} requires lateral and diagonal reactivity, not marching in place.",
        tip: "Quick feet; drive knees to hip height.",
        modification: "A-skips for rhythm.",
      },
      {
        name: "Ladder In-Outs",
        sets: "3 x 2 passes",
        restSeconds: 60,
        primaryMuscles: ["Calves", "Hip Flexors", "Core"],
        equipment: "Agility ladder",
        rankLabel: "Below Average",
        whyTemplate:
          "Ladder drills improve foot speed in controlled patterns. {sport} cuts during {demand} happen at unpredictable angles with external stimuli.",
        tip: "Eyes up; light on toes.",
        modification: "Draw ladder with tape on floor.",
      },
      {
        name: "T-Drill",
        sets: "4 x 3 reps",
        restSeconds: 75,
        primaryMuscles: ["Quadriceps", "Glutes", "Calves"],
        equipment: "Cones",
        rankLabel: "Moderate",
        whyTemplate:
          "The T-drill combines forward, lateral, and backpedal patterns useful for {sport}. Still lacks reactive decision-making in {demand}.",
        tip: "Plant outside foot on each cut.",
        modification: "Walk through first, then speed up.",
      },
      {
        name: "5-10-5 Shuttle",
        sets: "4 x 3 reps",
        restSeconds: 90,
        primaryMuscles: ["Quadriceps", "Glutes", "Hamstrings"],
        equipment: "Cones",
        rankLabel: "Good",
        whyTemplate:
          "Pro agility shuttle tests lateral acceleration and deceleration — core skills in {sport} during {demand}.",
        tip: "Touch lines with hand; stay low on cuts.",
        modification: "3-5-3 shuttle for shorter space.",
      },
      {
        name: "Reactive Cone Shuffle",
        sets: "4 x 20 sec",
        restSeconds: 75,
        primaryMuscles: ["Glute Medius", "Adductors", "Calves"],
        equipment: "Cones",
        rankLabel: "Very Effective",
        whyTemplate:
          "Partner- or coach-called shuffles add reaction time to lateral movement — closer to defensive reads in {sport} during {demand}.",
        tip: "Don't cross feet; stay in athletic stance.",
        modification: "Self-call random directions.",
      },
      {
        name: "Mirror Drill with Cut",
        sets: "5 x 15 sec",
        restSeconds: 90,
        primaryMuscles: ["Full Lower Body", "Core"],
        equipment: "Partner or cones",
        rankLabel: "Most Effective",
        whyTemplate:
          "Mirroring an opponent then cutting away replicates {sport} one-on-one agility during {demand} — reactive COD with competitive intent. Best agility transfer.",
        tip: "Sell the fake; explode on the cut.",
        modification: "Shadow defense without partner.",
      },
    ],
  },
  Endurance: {
    summary:
      "Conditioning work ranked for {sport} — from generic cardio to energy-system work that matches {demand}.",
    exercises: [
      {
        name: "Steady Jog",
        sets: "1 x 15 min",
        restSeconds: 0,
        primaryMuscles: ["Cardiovascular", "Legs"],
        equipment: "None",
        rankLabel: "Least Effective",
        whyTemplate:
          "Steady jogging builds aerobic base but doesn't match the interval nature of {sport} during {demand} — repeated high-intensity bursts with recovery.",
        tip: "Conversational pace; nose breathing if possible.",
        modification: "Brisk walk intervals.",
      },
      {
        name: "Jump Rope",
        sets: "3 x 2 min",
        restSeconds: 60,
        primaryMuscles: ["Calves", "Shoulders", "Core"],
        equipment: "Jump rope",
        rankLabel: "Below Average",
        whyTemplate:
          "Jump rope improves footwork rhythm and calf endurance for {sport}. Lacks sport-specific movement patterns in {demand}.",
        tip: "Small hops; wrists rotate rope.",
        modification: "Single-leg rope intervals.",
      },
      {
        name: "Bike Intervals",
        sets: "6 x 1 min hard / 1 min easy",
        restSeconds: 0,
        primaryMuscles: ["Quadriceps", "Cardiovascular"],
        equipment: "Stationary bike",
        rankLabel: "Moderate",
        whyTemplate:
          "Bike intervals train repeat power output. Missing the eccentric leg loading and ground contacts of {demand} in {sport}.",
        tip: "Hard efforts at 85–90% max effort.",
        modification: "Assault bike for full-body.",
      },
      {
        name: "Tempo Runs",
        sets: "4 x 200 m",
        restSeconds: 90,
        primaryMuscles: ["Hamstrings", "Glutes", "Cardiovascular"],
        equipment: "Track or field",
        rankLabel: "Good",
        whyTemplate:
          "Tempo runs build lactate tolerance at sub-max speed — useful for {sport} middle-phase intensity during {demand}.",
        tip: "Run at 75% max; consistent splits.",
        modification: "Shuttle tempos for direction change.",
      },
      {
        name: "Sport-Specific Interval Sprints",
        sets: "8 x 20 sec / 40 sec rest",
        restSeconds: 0,
        primaryMuscles: ["Full Lower Body", "Cardiovascular"],
        equipment: "Field or court space",
        rankLabel: "Very Effective",
        whyTemplate:
          "Short max-effort sprints with incomplete rest mimic {sport} work-rest ratios during {demand} — the energy system you actually compete in.",
        tip: "Full effort each rep; walk recovery.",
        modification: "Add a cut or jump mid-sprint.",
      },
      {
        name: "Repeated Sprint Ability Test",
        sets: "6 x 30 m sprint / 25 sec rest",
        restSeconds: 0,
        primaryMuscles: ["Full Lower Body", "Cardiovascular"],
        equipment: "Cones",
        rankLabel: "Most Effective",
        whyTemplate:
          "RSA training directly targets speed endurance — maintaining burst quality when fatigued in {sport} during {demand}. Gold standard for game conditioning.",
        tip: "Track time drop-off; aim for under 10% decay.",
        modification: "Add sport-specific start position.",
      },
    ],
  },
  Flexibility: {
    summary:
      "Mobility work ranked for {sport} — static to dynamic prep that supports {demand}.",
    exercises: [
      {
        name: "Static Hamstring Stretch",
        sets: "2 x 30 sec each leg",
        restSeconds: 30,
        primaryMuscles: ["Hamstrings"],
        equipment: "None",
        rankLabel: "Least Effective",
        whyTemplate:
          "Static stretching before activity can reduce power output in {sport}. {demand} needs dynamic mobility, not passive holds pre-training.",
        tip: "Keep back flat; hinge from hips.",
        modification: "Save static work for post-session.",
      },
      {
        name: "Standing Quad Stretch",
        sets: "2 x 30 sec each leg",
        restSeconds: 30,
        primaryMuscles: ["Quadriceps", "Hip Flexors"],
        equipment: "None",
        rankLabel: "Below Average",
        whyTemplate:
          "Quad stretches improve passive range but don't integrate movement for {sport}. Limited prep value for {demand}.",
        tip: "Knees together; push hip forward.",
        modification: "Couch stretch for deeper hip flexor.",
      },
      {
        name: "World's Greatest Stretch",
        sets: "3 x 5 each side",
        restSeconds: 45,
        primaryMuscles: ["Hip Flexors", "Thoracic Spine", "Hamstrings"],
        equipment: "None",
        rankLabel: "Moderate",
        whyTemplate:
          "This flow opens hips and T-spine useful for {sport} athletes. Good warm-up but not maximal range for {demand}.",
        tip: "Rotate open chest; sink into lunge.",
        modification: "Hold elbow down on rotation.",
      },
      {
        name: "Leg Swings (Front & Lateral)",
        sets: "2 x 15 each direction",
        restSeconds: 30,
        primaryMuscles: ["Hip Flexors", "Hamstrings", "Adductors"],
        equipment: "None",
        rankLabel: "Good",
        whyTemplate:
          "Dynamic leg swings prep hip range with movement — better pre-{sport} prep than static stretching for {demand}.",
        tip: "Control the swing; don't force range.",
        modification: "Hold wall for balance.",
      },
      {
        name: "90/90 Hip Switches",
        sets: "3 x 8 each side",
        restSeconds: 45,
        primaryMuscles: ["Hip Rotators", "Glutes"],
        equipment: "None",
        rankLabel: "Very Effective",
        whyTemplate:
          "Internal/external hip rotation mobility supports cutting and pivoting in {sport} during {demand} — especially for change-of-direction athletes.",
        tip: "Sit tall; rotate from hips not lower back.",
        modification: "Hands behind for support.",
      },
      {
        name: "Dynamic Lunge with Rotation",
        sets: "3 x 6 each side",
        restSeconds: 45,
        primaryMuscles: ["Hip Flexors", "Thoracic Spine", "Glutes"],
        equipment: "None",
        rankLabel: "Most Effective",
        whyTemplate:
          "Lunge plus rotation integrates hip, ankle, and T-spine mobility under load — the full chain {sport} uses during {demand}. Best flexibility transfer.",
        tip: "Rotate toward front leg; reach overhead.",
        modification: "Walking lunge rotation across floor.",
      },
    ],
  },
  Balance: {
    summary:
      "Stability drills ranked for {sport} — from static balance to dynamic control for {demand}.",
    exercises: [
      {
        name: "Single-Leg Stand",
        sets: "3 x 30 sec each leg",
        restSeconds: 30,
        primaryMuscles: ["Ankle Stabilizers", "Glute Medius"],
        equipment: "None",
        rankLabel: "Least Effective",
        whyTemplate:
          "Standing on one leg builds basic proprioception. {sport} balance during {demand} happens at speed with external forces, not standing still.",
        tip: "Fix gaze on one point; soft knee.",
        modification: "Eyes closed for challenge.",
      },
      {
        name: "BOSU Ball Balance",
        sets: "3 x 20 sec each leg",
        restSeconds: 45,
        primaryMuscles: ["Ankle Stabilizers", "Core"],
        equipment: "BOSU ball",
        rankLabel: "Below Average",
        whyTemplate:
          "Unstable surface training improves ankle reactivity for {sport}. Still lacks the dynamic single-leg forces of {demand}.",
        tip: "Barefoot if safe; micro-bend knee.",
        modification: "Foam pad instead of BOSU.",
      },
      {
        name: "Single-Leg RDL",
        sets: "3 x 8 each leg",
        restSeconds: 60,
        primaryMuscles: ["Hamstrings", "Glutes", "Core"],
        equipment: "None or dumbbell",
        rankLabel: "Moderate",
        whyTemplate:
          "Single-leg RDLs combine balance with posterior chain strength for {sport}. Missing reactive balance under fatigue in {demand}.",
        tip: "Hinge at hip; back leg extends straight.",
        modification: "Touch wall lightly for support.",
      },
      {
        name: "Single-Leg Hop & Stick",
        sets: "3 x 6 each leg",
        restSeconds: 75,
        primaryMuscles: ["Quadriceps", "Glutes", "Ankle Stabilizers"],
        equipment: "None",
        rankLabel: "Good",
        whyTemplate:
          "Hop and stick trains landing stability — critical for {sport} athletes during {demand} when absorbing force on one leg.",
        tip: "Hold landing 2 seconds; knee stable.",
        modification: "Forward hop then lateral hop.",
      },
      {
        name: "Y-Balance Reach",
        sets: "3 x 3 reaches each direction",
        restSeconds: 60,
        primaryMuscles: ["Glute Medius", "Quadriceps", "Core"],
        equipment: "Y-balance kit or tape",
        rankLabel: "Very Effective",
        whyTemplate:
          "Multi-directional reach tests and trains single-leg stability in all planes — mirrors planting angles in {sport} during {demand}.",
        tip: "Reach as far as possible without losing form.",
        modification: "Use tape lines on floor.",
      },
      {
        name: "Single-Leg Catch & Throw",
        sets: "4 x 8 each leg",
        restSeconds: 75,
        primaryMuscles: ["Full Lower Body", "Core", "Proprioceptors"],
        equipment: "Med ball, partner",
        rankLabel: "Most Effective",
        whyTemplate:
          "Catching while balanced on one leg adds external perturbation — exactly how {sport} challenges stability during {demand} in contact or on uneven landings.",
        tip: "Soft knees; absorb throw through core.",
        modification: "Self-toss while balanced.",
      },
    ],
  },
  "Vertical Jump": {
    summary:
      "Jump training ranked for {sport} — vertical power progressions for {demand}.",
    exercises: [
      {
        name: "Calf Raises",
        sets: "3 x 20 reps",
        restSeconds: 45,
        primaryMuscles: ["Calves", "Soleus"],
        equipment: "None or step",
        rankLabel: "Least Effective",
        whyTemplate:
          "Calf raises build ankle plantar flexor strength but produce slow contractions. {sport} vertical demands during {demand} need rapid triple extension.",
        tip: "Full range; pause at top.",
        modification: "Single-leg calf raises.",
      },
      {
        name: "Squat Jump",
        sets: "4 x 6 reps",
        restSeconds: 90,
        primaryMuscles: ["Quadriceps", "Glutes", "Calves"],
        equipment: "None",
        rankLabel: "Below Average",
        whyTemplate:
          "Squat jumps develop basic vertical power for {sport}. Lack reactive eccentric loading seen in game jumps during {demand}.",
        tip: "Arm swing; land softly.",
        modification: "Pause squat jump for power.",
      },
      {
        name: "Approach Jump (No Ball)",
        sets: "4 x 4 reps",
        restSeconds: 90,
        primaryMuscles: ["Quadriceps", "Glutes", "Hip Flexors"],
        equipment: "None",
        rankLabel: "Moderate",
        whyTemplate:
          "Approach jumps mimic the run-up pattern in {sport}. Still missing max intent reactive component of {demand}.",
        tip: "Penultimate step; explode off two feet.",
        modification: "One-step jump for beginners.",
      },
      {
        name: "Depth Jump",
        sets: "4 x 4 reps",
        restSeconds: 120,
        primaryMuscles: ["Quadriceps", "Glutes", "Calves"],
        equipment: "12–18 in box",
        rankLabel: "Good",
        whyTemplate:
          "Depth jumps train reactive vertical stiffness for {sport} rebounding and blocking during {demand}.",
        tip: "Step off box; minimal ground time.",
        modification: "Lower box height to start.",
      },
      {
        name: "Max Vertical Jump (Tracked)",
        sets: "5 x 3 reps",
        restSeconds: 120,
        primaryMuscles: ["Full Lower Body"],
        equipment: "Vertec or wall chalk",
        rankLabel: "Very Effective",
        whyTemplate:
          "Max-effort vertical jumps with tracking build neural drive for {sport} — the exact intent of {demand} at the rim or net.",
        tip: "Full arm swing; reach max height.",
        modification: "Approach max jumps.",
      },
      {
        name: "Depth Jump to Max Vertical",
        sets: "4 x 3 reps",
        restSeconds: 120,
        primaryMuscles: ["Quadriceps", "Glutes", "Calves"],
        equipment: "Box + vert target",
        rankLabel: "Most Effective",
        whyTemplate:
          "Reactive drop into max vertical mirrors second-jump explosiveness in {sport} — offensive rebounds and block recoveries during {demand}.",
        tip: "React instantly; touch target each rep.",
        modification: "Depth jump to block touch.",
      },
    ],
  },
  "Lateral Quickness": {
    summary:
      "Side-to-side speed drills ranked for {sport} — defensive and cutting prep for {demand}.",
    exercises: [
      {
        name: "Side Shuffles",
        sets: "3 x 20 sec",
        restSeconds: 45,
        primaryMuscles: ["Glute Medius", "Adductors"],
        equipment: "None",
        rankLabel: "Least Effective",
        whyTemplate:
          "Basic shuffles warm lateral muscles but lack explosiveness for {sport}. {demand} requires burst lateral acceleration, not gliding.",
        tip: "Stay low; don't cross feet.",
        modification: "Resistance band around ankles.",
      },
      {
        name: "Lateral Band Walks",
        sets: "3 x 12 each direction",
        restSeconds: 45,
        primaryMuscles: ["Glute Medius", "Hip Abductors"],
        equipment: "Mini band",
        rankLabel: "Below Average",
        whyTemplate:
          "Band walks activate hip stabilizers for {sport} defensive slides. No speed or reactive component of {demand}.",
        tip: "Quarter squat; tension on band.",
        modification: "Monster walks for variety.",
      },
      {
        name: "Lateral Bounds",
        sets: "3 x 8 each leg",
        restSeconds: 75,
        primaryMuscles: ["Glutes", "Adductors", "Calves"],
        equipment: "None",
        rankLabel: "Moderate",
        whyTemplate:
          "Lateral bounds build single-leg lateral power for {sport}. Good but not max-speed defensive recovery in {demand}.",
        tip: "Stick landing; pause briefly.",
        modification: "Continuous lateral hops.",
      },
      {
        name: "Defensive Slide to Closeout",
        sets: "4 x 6 each side",
        restSeconds: 75,
        primaryMuscles: ["Quadriceps", "Glutes", "Calves"],
        equipment: "Cones",
        rankLabel: "Good",
        whyTemplate:
          "Slide-to-closeout mimics {sport} defensive footwork during {demand} — lateral then forward burst.",
        tip: "Chop feet on closeout; hand up.",
        modification: "Add fake drive reaction.",
      },
      {
        name: "Reactive Lateral Shuffle",
        sets: "5 x 12 sec",
        restSeconds: 60,
        primaryMuscles: ["Full Lower Body"],
        equipment: "Cones, partner calls",
        rankLabel: "Very Effective",
        whyTemplate:
          "Called-direction shuffles add reaction to lateral speed — defensive reads in {sport} during {demand}.",
        tip: "First step is everything; stay low.",
        modification: "Audio cue randomizer app.",
      },
      {
        name: "Mirror Lateral Cut Drill",
        sets: "5 x 15 sec",
        restSeconds: 90,
        primaryMuscles: ["Full Lower Body", "Core"],
        equipment: "Partner",
        rankLabel: "Most Effective",
        whyTemplate:
          "Mirroring then cutting away at max lateral speed replicates {sport} one-on-one defense during {demand} — the highest lateral quickness transfer.",
        tip: "Beat opponent to the spot; no crossing feet.",
        modification: "Cone shadow defense.",
      },
    ],
  },
  "Hip Mobility": {
    summary:
      "Hip range and control ranked for {sport} — unlocking movement for {demand}.",
    exercises: [
      {
        name: "Butterfly Stretch",
        sets: "2 x 45 sec",
        restSeconds: 30,
        primaryMuscles: ["Adductors", "Hip Flexors"],
        equipment: "None",
        rankLabel: "Least Effective",
        whyTemplate:
          "Static butterfly stretch improves passive adductor length. {sport} hip demands during {demand} need active control at end range.",
        tip: "Gentle pressure on knees; sit tall.",
        modification: "Dynamic butterfly pulses.",
      },
      {
        name: "Hip Circles",
        sets: "2 x 10 each direction",
        restSeconds: 30,
        primaryMuscles: ["Hip Flexors", "Glutes"],
        equipment: "None",
        rankLabel: "Below Average",
        whyTemplate:
          "Hip circles warm the joint for {sport} but don't build strength at range needed for {demand}.",
        tip: "Hands on wall; controlled circles.",
        modification: "Larger circles for range.",
      },
      {
        name: "Cossack Squat",
        sets: "3 x 6 each side",
        restSeconds: 60,
        primaryMuscles: ["Adductors", "Glutes", "Quadriceps"],
        equipment: "None",
        rankLabel: "Moderate",
        whyTemplate:
          "Cossack squats build lateral hip mobility and strength for {sport} cutting. Good but not max-speed prep for {demand}.",
        tip: "Heel down on bent leg; chest up.",
        modification: "Hold support for balance.",
      },
      {
        name: "90/90 Switches",
        sets: "3 x 8 each side",
        restSeconds: 45,
        primaryMuscles: ["Hip Rotators", "Glutes"],
        equipment: "None",
        rankLabel: "Good",
        whyTemplate:
          "90/90 switches improve internal/external rotation for {sport} pivots during {demand}.",
        tip: "Rotate from hips; minimal lean.",
        modification: "PAILs/RAILs at end range.",
      },
      {
        name: "Spiderman Lunge with Reach",
        sets: "3 x 6 each side",
        restSeconds: 45,
        primaryMuscles: ["Hip Flexors", "Thoracic Spine", "Glutes"],
        equipment: "None",
        rankLabel: "Very Effective",
        whyTemplate:
          "Spiderman lunges open hip flexors dynamically — essential for {sport} stride and kick mechanics during {demand}.",
        tip: "Elbow to instep; reach same arm up.",
        modification: "Hold 3 sec at bottom.",
      },
      {
        name: "Lateral Lunge to Deep Squat Flow",
        sets: "3 x 5 each side",
        restSeconds: 60,
        primaryMuscles: ["Adductors", "Glutes", "Hip Flexors"],
        equipment: "None",
        rankLabel: "Most Effective",
        whyTemplate:
          "Flowing lateral to deep squat integrates all hip planes {sport} uses during {demand} — cutting, planting, and low posture.",
        tip: "Smooth transitions; keep heels down.",
        modification: "Add rotation at bottom.",
      },
    ],
  },
  "Grip Strength": {
    summary:
      "Hand and forearm work ranked for {sport} — contact and control for {demand}.",
    exercises: [
      {
        name: "Dead Hang",
        sets: "3 x 20 sec",
        restSeconds: 60,
        primaryMuscles: ["Forearms", "Lats"],
        equipment: "Pull-up bar",
        rankLabel: "Least Effective",
        whyTemplate:
          "Dead hangs build passive grip endurance. {sport} grip during {demand} is dynamic — grabbing, ripping, and holding under movement.",
        tip: "Relax shoulders; full hang.",
        modification: "Towel over bar for thickness.",
      },
      {
        name: "Farmer's Carry",
        sets: "3 x 40 m",
        restSeconds: 90,
        primaryMuscles: ["Forearms", "Traps", "Core"],
        equipment: "Dumbbells or kettlebells",
        rankLabel: "Below Average",
        whyTemplate:
          "Farmer carries build crushing grip for {sport}. Missing sport-specific pulling angles in {demand}.",
        tip: "Tall posture; quick short steps.",
        modification: "Single-arm carry for anti-rotation.",
      },
      {
        name: "Plate Pinch Hold",
        sets: "3 x 20 sec",
        restSeconds: 60,
        primaryMuscles: ["Finger Flexors", "Forearms"],
        equipment: "Weight plates",
        rankLabel: "Moderate",
        whyTemplate:
          "Pinch grip builds finger strength useful for {sport} ball security. Narrow transfer to full-hand grappling in {demand}.",
        tip: "Smooth plates; don't drop.",
        modification: "Hub lifts for variety.",
      },
      {
        name: "Towel Pull-Ups",
        sets: "3 x 5 reps",
        restSeconds: 90,
        primaryMuscles: ["Forearms", "Lats", "Biceps"],
        equipment: "Pull-up bar, towels",
        rankLabel: "Good",
        whyTemplate:
          "Towel pull-ups combine grip with pulling — closer to jersey grabs and ball control in {sport} during {demand}.",
        tip: "Wrap towels tight; full range.",
        modification: "Towel dead hangs first.",
      },
      {
        name: "Fat Bar Rows",
        sets: "4 x 8 reps",
        restSeconds: 90,
        primaryMuscles: ["Forearms", "Lats", "Rhomboids"],
        equipment: "Fat bar or grips",
        rankLabel: "Very Effective",
        whyTemplate:
          "Thick-bar rows force max grip while pulling — mirrors {sport} contact and leverage during {demand}.",
        tip: "Reset grip each set; no straps.",
        modification: "Fat grip attachments on dumbbells.",
      },
      {
        name: "Partner Grip Battle",
        sets: "4 x 10 sec",
        restSeconds: 75,
        primaryMuscles: ["Forearms", "Hands", "Core"],
        equipment: "Partner, towel or belt",
        rankLabel: "Most Effective",
        whyTemplate:
          "Live grip contests replicate {sport} tug-of-war moments during {demand} — reactive, max-intent hand fighting. Highest grip transfer.",
        tip: "Wide base; pull through hips.",
        modification: "Towel tug-of-war solo on pole.",
      },
    ],
  },
  "Neck & Traps": {
    summary:
      "Neck and trap training ranked for {sport} — collision readiness for {demand}.",
    exercises: [
      {
        name: "Shoulder Shrugs",
        sets: "3 x 15 reps",
        restSeconds: 60,
        primaryMuscles: ["Upper Trapezius"],
        equipment: "Dumbbells",
        rankLabel: "Least Effective",
        whyTemplate:
          "Shrugs isolate upper traps vertically. {sport} neck and trap demands during {demand} involve isometric bracing from multiple angles.",
        tip: "Pause at top; don't roll shoulders.",
        modification: "Barbell shrugs for load.",
      },
      {
        name: "Neck Flexion (Manual Resist)",
        sets: "2 x 10 reps",
        restSeconds: 45,
        primaryMuscles: ["Sternocleidomastoid"],
        equipment: "Hand resistance",
        rankLabel: "Below Average",
        whyTemplate:
          "Manual neck flexion starts neck strengthening for {sport}. Missing multi-direction isometric work of {demand}.",
        tip: "Move slow; equal pressure both sides.",
        modification: "4-way manual resistance.",
      },
      {
        name: "4-Way Isometric Neck Hold",
        sets: "2 x 10 sec each direction",
        restSeconds: 45,
        primaryMuscles: ["Neck Flexors", "Neck Extensors"],
        equipment: "Hand or band",
        rankLabel: "Moderate",
        whyTemplate:
          "Isometric neck holds in four directions build bracing for {sport} contact. Good foundation for {demand}.",
        tip: "Submax effort; breathe normally.",
        modification: "Neck harness with light load.",
      },
      {
        name: "Trap Bar Shrug with Pause",
        sets: "4 x 8 reps",
        restSeconds: 90,
        primaryMuscles: ["Upper Traps", "Levator Scapulae"],
        equipment: "Trap bar",
        rankLabel: "Good",
        whyTemplate:
          "Heavy paused shrugs build trap strength for {sport} shoulder packing during {demand} hits and blocks.",
        tip: "Hold 2 sec at top; ears away from shoulders.",
        modification: "Dumbbell shrug with scap squeeze.",
      },
      {
        name: "Neck Harness Extensions",
        sets: "3 x 12 reps",
        restSeconds: 60,
        primaryMuscles: ["Neck Extensors", "Upper Traps"],
        equipment: "Neck harness",
        rankLabel: "Very Effective",
        whyTemplate:
          "Neck harness work builds eccentric capacity for {sport} — reducing whiplash risk during {demand} collisions.",
        tip: "Neutral spine; controlled tempo.",
        modification: "Partner manual resistance.",
      },
      {
        name: "Scap Pack + Neck Isometric Combo",
        sets: "4 x 8 reps",
        restSeconds: 75,
        primaryMuscles: ["Traps", "Rhomboids", "Neck Stabilizers"],
        equipment: "Band or cable",
        rankLabel: "Most Effective",
        whyTemplate:
          "Combining scap retraction with neck bracing mirrors {sport} tackling and blocking posture during {demand} — full collision-ready chain.",
        tip: "Pinch shoulder blades; tuck chin.",
        modification: "Wall posture hold with band pull.",
      },
    ],
  },
};

function fillTemplate(
  template: string,
  sportName: string,
  demand: string
): string {
  return template
    .replace(/\{sport\}/g, sportName)
    .replace(/\{demand\}/g, demand);
}

function scaleSets(sets: string, level: AthleticLevel): string {
  if (level === "recreational") {
    return sets.replace(/^(\d+)/, (_, n) =>
      String(Math.max(2, Number(n) - 1))
    );
  }
  if (level === "semi_pro" || level === "elite") {
    return sets.replace(/^(\d+)/, (_, n) => String(Number(n) + 1));
  }
  return sets;
}

function scaleRest(seconds: number, level: AthleticLevel): number {
  if (level === "recreational") return Math.round(seconds * 1.2);
  if (level === "elite") return Math.round(seconds * 0.85);
  return seconds;
}

function pickPrimaryArea(targetAreas: string[]): string {
  for (const area of targetAreas) {
    if (AREA_PLANS[area]) return area;
  }
  return "Core";
}

export function generateWorkoutPlan(input: GeneratePlanInput): WorkoutPlan {
  const primaryArea = pickPrimaryArea(input.targetAreas);
  const plan = AREA_PLANS[primaryArea] ?? AREA_PLANS.Core;
  const demand = SPORT_DEMANDS[input.sportId] ?? SPORT_DEMANDS.default;

  const goalNote =
    input.goals.length > 0
      ? ` Focus areas: ${input.goals.slice(0, 3).join(", ")}.`
      : "";

  const secondaryAreas = input.targetAreas.filter((a) => a !== primaryArea);
  const areaNote =
    secondaryAreas.length > 0
      ? ` Also targets ${secondaryAreas.join(", ")}.`
      : "";

  const summary =
    fillTemplate(plan.summary, input.sportName, demand) + goalNote + areaNote;

  const workouts: Workout[] = plan.exercises.map((ex, i) => {
    const media = getExerciseMedia(
      ex.name,
      ex.primaryMuscles,
      input.sportName,
      demand
    );
    return {
      rank: i + 1,
      name: ex.name,
      sets: scaleSets(ex.sets, input.level),
      restSeconds: scaleRest(ex.restSeconds, input.level),
      primaryMuscles: ex.primaryMuscles,
      equipment: ex.equipment,
      effectiveness: EFFECTIVENESS[i],
      rankLabel: RANK_LABELS[i],
      why: fillTemplate(ex.whyTemplate, input.sportName, demand),
      tip: ex.tip,
      modification: ex.modification,
      videoId: media.videoId,
      imageUrl: media.imageUrl,
      bodyRegions: media.bodyRegions,
      gameplayBenefit: media.gameplayBenefit,
    };
  });

  return {
    sport: input.sportName,
    level: input.levelLabel,
    summary,
    totalDuration: `${input.sessionDuration} minutes · ${input.trainingDays} days/week`,
    workouts,
  };
}
