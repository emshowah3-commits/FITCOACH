# Athlete Workout Planner

A full-stack Next.js app that learns your sport and level through onboarding, then serves pre-built workout plans ranked worst to best for your target muscle areas.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript.
- Tailwind CSS + Apple-inspired design tokens.
- Framer Motion.
- Zustand + localStorage persistence.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No API keys required — all workout plans are pre-built locally.

## How Plans Work

Each plan is selected based on your picks:

- **Sport** — sport-specific language in summaries and exercise explanations
- **Target area** — first selected area picks the exercise list (13 unique area plans)
- **Level** — adjusts sets volume and rest periods (Recreational → Elite)
- **Goals** — appended to the plan summary
- **Schedule** — shown in total duration label

Try Basketball + Explosiveness vs Soccer + Endurance vs Football + Neck & Traps to see different ranked exercise lists.

## Features

- 5-step onboarding with confetti completion
- Dashboard with target area selection
- 6 exercises ranked worst → best with effectiveness bars
- Workout history (last 5 plans)
- Profile page with dark mode toggle
- Share individual exercises or full plan to clipboard
