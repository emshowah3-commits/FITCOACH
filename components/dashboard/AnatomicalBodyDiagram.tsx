"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { BodyRegion } from "@/lib/body-regions";
import { REGION_LABELS } from "@/lib/body-regions";

interface AnatomicalBodyDiagramProps {
  regions: BodyRegion[];
  accentColor?: string;
}

// SVG paths for front view muscle regions
const FRONT_VIEW_REGIONS: Record<BodyRegion, { path: string; label?: { x: number; y: number } } | null> = {
  neck: {
    path: "M200 65 Q215 62 225 70 Q220 85 200 88 Q180 85 175 70 Z",
  },
  shoulders: {
    path: "M155 85 Q130 90 110 110 Q125 115 155 118 L245 118 Q275 115 290 110 Q270 90 245 85 Z",
  },
  chest: {
    path: "M155 118 Q145 145 145 175 Q165 195 200 200 Q235 195 255 175 Q255 145 245 118 Z",
  },
  biceps: {
    path: "M125 115 Q100 140 95 185 Q110 195 140 185 Q145 150 135 125 Z M285 115 Q310 140 315 185 Q300 195 270 185 Q255 150 275 125 Z",
  },
  triceps: {
    path: "M135 120 Q145 150 150 190 Q165 200 180 195 Q175 155 165 130 Z M275 120 Q265 150 260 190 Q245 200 230 195 Q235 155 245 130 Z",
  },
  forearms: {
    path: "M95 185 Q82 220 78 270 Q95 280 115 270 Q105 225 100 195 Z M315 185 Q328 220 332 270 Q315 280 295 270 Q305 225 310 195 Z",
  },
  core: {
    path: "M170 200 Q158 225 156 270 Q175 285 200 290 Q225 285 244 270 Q242 225 230 200 Z",
  },
  obliques: {
    path: "M145 175 Q130 210 128 270 Q155 285 170 280 Q165 225 152 190 Z M255 175 Q270 210 272 270 Q245 285 230 280 Q235 225 248 190 Z",
  },
  quads: {
    path: "M175 290 Q162 350 158 430 Q175 450 190 445 Q195 375 188 310 Z M235 290 Q248 350 252 430 Q235 450 220 445 Q215 375 222 310 Z",
  },
  calves: {
    path: "M175 445 Q168 490 165 535 L188 545 L192 460 Z M225 445 Q232 490 235 535 L212 545 L208 460 Z",
  },
  glutes: null,
  hamstrings: null,
  "hip-flexors": {
    path: "M180 285 Q170 315 173 350 Q200 360 227 350 Q230 315 220 285 Z",
  },
  adductors: {
    path: "M195 310 Q190 370 193 430 Q205 440 215 430 Q218 370 213 310 Z",
  },
  "upper-back": null,
  "lower-back": null,
  "full-body": {
    path: "M95 85 Q75 200 80 380 Q115 500 200 530 Q285 500 320 380 Q325 200 305 85 Z",
  },
  cardio: {
    path: "M145 118 Q130 220 135 380 Q165 500 200 530 Q235 500 265 380 Q270 220 255 118 Z",
  },
};

// SVG paths for back view muscle regions
const BACK_VIEW_REGIONS: Record<BodyRegion, { path: string; label?: { x: number; y: number } } | null> = {
  neck: {
    path: "M200 65 Q215 62 225 70 Q220 85 200 88 Q180 85 175 70 Z",
  },
  shoulders: {
    path: "M155 85 Q130 90 110 110 Q125 115 155 118 L245 118 Q275 115 290 110 Q270 90 245 85 Z",
  },
  "upper-back": {
    path: "M155 118 Q125 155 130 200 Q170 180 200 190 Q230 180 270 200 Q275 155 245 118 Z",
  },
  "lower-back": {
    path: "M165 285 Q158 340 163 385 Q190 405 200 410 Q210 405 237 385 Q242 340 235 285 Z",
  },
  triceps: {
    path: "M125 115 Q100 140 95 185 Q110 195 140 185 Q145 150 135 125 Z M295 115 Q320 140 325 185 Q310 195 280 185 Q275 150 285 125 Z",
  },
  forearms: {
    path: "M95 185 Q82 220 78 270 Q95 280 115 270 Q105 225 100 195 Z M315 185 Q328 220 332 270 Q315 280 295 270 Q305 225 310 195 Z",
  },
  glutes: {
    path: "M165 385 Q150 425 155 470 Q185 495 200 502 Q215 495 245 470 Q250 425 235 385 Z",
  },
  hamstrings: {
    path: "M175 470 Q163 520 160 580 L190 595 L195 485 Z M235 470 Q247 520 250 580 L220 595 L225 485 Z",
  },
  calves: {
    path: "M180 595 Q172 625 170 655 L195 665 Z M220 595 Q228 625 230 655 L205 665 Z",
  },
  chest: null,
  biceps: null,
  core: null,
  obliques: null,
  quads: null,
  adductors: null,
  "hip-flexors": null,
  "full-body": {
    path: "M95 85 Q75 200 80 380 Q115 500 200 530 Q285 500 320 380 Q325 200 305 85 Z",
  },
  cardio: {
    path: "M145 118 Q130 220 135 380 Q165 500 200 530 Q235 500 265 380 Q270 220 255 118 Z",
  },
};

function FrontView({ regions, accentColor }: { regions: BodyRegion[]; accentColor: string }) {
  return (
    <svg viewBox="0 0 400 600" className="h-full w-full" aria-hidden>
      {/* Head outline */}
      <ellipse cx="200" cy="50" rx="25" ry="28" fill="none" stroke="currentColor" strokeWidth="2" />

      {/* Neck outline */}
      <path d="M190 75 Q180 90 180 105 L220 105 Q220 90 210 75 Z" fill="none" stroke="currentColor" strokeWidth="2" />

      {/* Shoulders and trapezius outline */}
      <path
        d="M180 105 Q140 110 100 130 L90 140 Q100 115 140 105 Z M220 105 Q260 110 300 130 L310 140 Q300 115 260 105 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Chest and front upper body outline */}
      <path
        d="M140 130 L130 180 Q125 200 130 240 L200 250 L270 240 Q275 200 270 180 L260 130 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Pectoral muscles division */}
      <line x1="200" y1="140" x2="200" y2="200" stroke="currentColor" strokeWidth="1.5" />
      <path d="M160 150 Q180 155 200 160 Q220 155 240 150" fill="none" stroke="currentColor" strokeWidth="1.5" />

      {/* Abdominal outline and divisions */}
      <path d="M140 240 L140 310 Q150 330 200 340 Q250 330 260 310 L260 240 Z" fill="none" stroke="currentColor" strokeWidth="2" />

      {/* Abs divisions */}
      <line x1="200" y1="240" x2="200" y2="340" stroke="currentColor" strokeWidth="1" />
      <path d="M155 260 Q200 265 245 260" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M150 285 Q200 290 250 285" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M148 310 Q200 315 252 310" fill="none" stroke="currentColor" strokeWidth="1" />

      {/* Left arm */}
      <path d="M140 130 L110 140 Q90 160 85 220 L100 230 Q120 180 140 160 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="110" y1="180" x2="95" y2="200" stroke="currentColor" strokeWidth="1.5" />

      {/* Right arm */}
      <path d="M260 130 L290 140 Q310 160 315 220 L300 230 Q280 180 260 160 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="290" y1="180" x2="305" y2="200" stroke="currentColor" strokeWidth="1.5" />

      {/* Left forearm */}
      <path d="M85 220 Q75 260 70 310 L90 320 Q100 270 105 240 Z" fill="none" stroke="currentColor" strokeWidth="2" />

      {/* Right forearm */}
      <path d="M315 220 Q325 260 330 310 L310 320 Q300 270 295 240 Z" fill="none" stroke="currentColor" strokeWidth="2" />

      {/* Hips outline */}
      <path d="M140 310 Q130 330 130 360 Q140 380 200 390 Q260 380 270 360 Q270 330 260 310 Z" fill="none" stroke="currentColor" strokeWidth="2" />

      {/* Groin division */}
      <line x1="200" y1="340" x2="200" y2="390" stroke="currentColor" strokeWidth="1" />

      {/* Left quadriceps */}
      <path d="M155 360 Q140 420 135 500 L165 510 Q170 450 170 380 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="150" y1="400" x2="168" y2="400" stroke="currentColor" strokeWidth="1" />

      {/* Right quadriceps */}
      <path d="M245 360 Q260 420 265 500 L235 510 Q230 450 230 380 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="250" y1="400" x2="232" y2="400" stroke="currentColor" strokeWidth="1" />

      {/* Left calf */}
      <path d="M165 510 Q155 550 150 590 L175 600 L180 550 Z" fill="none" stroke="currentColor" strokeWidth="2" />

      {/* Right calf */}
      <path d="M235 510 Q245 550 250 590 L225 600 L220 550 Z" fill="none" stroke="currentColor" strokeWidth="2" />

      {/* Highlighted regions */}
      {regions.map((region, i) => {
        const regionPath = FRONT_VIEW_REGIONS[region];
        if (!regionPath) return null;
        return (
          <motion.path
            key={region}
            d={regionPath.path}
            fill={accentColor}
            fillOpacity={0.45}
            stroke={accentColor}
            strokeWidth={2}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.65, 0.45] }}
            transition={{
              delay: i * 0.1,
              duration: 1.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        );
      })}
    </svg>
  );
}

function BackView({ regions, accentColor }: { regions: BodyRegion[]; accentColor: string }) {
  return (
    <svg viewBox="0 0 400 600" className="h-full w-full" aria-hidden>
      {/* Head outline */}
      <ellipse cx="200" cy="50" rx="25" ry="28" fill="none" stroke="currentColor" strokeWidth="2" />

      {/* Neck outline */}
      <path d="M190 75 Q180 90 180 105 L220 105 Q220 90 210 75 Z" fill="none" stroke="currentColor" strokeWidth="2" />

      {/* Trapezius outline */}
      <path
        d="M180 105 Q140 110 100 130 L90 140 Q100 115 140 105 Z M220 105 Q260 110 300 130 L310 140 Q300 115 260 105 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Back outline */}
      <path
        d="M100 130 L95 200 Q90 300 120 400 Q150 480 200 500 Q250 480 280 400 Q310 300 305 200 L300 130 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Spine line */}
      <line x1="200" y1="105" x2="200" y2="500" stroke="currentColor" strokeWidth="1" />

      {/* Rhomboid outlines */}
      <path d="M160 140 Q190 160 220 140" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M150 180 Q200 200 250 180" fill="none" stroke="currentColor" strokeWidth="1.5" />

      {/* Latissimus dorsi outlines */}
      <path d="M140 200 Q120 270 130 340" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M260 200 Q280 270 270 340" fill="none" stroke="currentColor" strokeWidth="1.5" />

      {/* Left shoulder blade region */}
      <path d="M130 140 Q120 180 130 220 Q150 210 160 180 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />

      {/* Right shoulder blade region */}
      <path d="M270 140 Q280 180 270 220 Q250 210 240 180 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />

      {/* Lower back outline */}
      <path d="M160 300 L160 360 Q180 380 200 385 Q220 380 240 360 L240 300 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />

      {/* Glutes outline */}
      <path d="M150 380 Q140 410 145 450 Q170 470 200 475 Q230 470 255 450 Q260 410 250 380 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="200" y1="380" x2="200" y2="475" stroke="currentColor" strokeWidth="1" />

      {/* Left hamstring */}
      <path d="M165 450 Q155 500 150 560 L180 570 Q185 510 180 470 Z" fill="none" stroke="currentColor" strokeWidth="2" />

      {/* Right hamstring */}
      <path d="M235 450 Q245 500 250 560 L220 570 Q215 510 220 470 Z" fill="none" stroke="currentColor" strokeWidth="2" />

      {/* Left calf */}
      <path d="M180 570 Q170 600 165 600 L175 600 L185 570 Z" fill="none" stroke="currentColor" strokeWidth="2" />

      {/* Right calf */}
      <path d="M220 570 Q230 600 235 600 L225 600 L215 570 Z" fill="none" stroke="currentColor" strokeWidth="2" />

      {/* Highlighted regions */}
      {regions.map((region, i) => {
        const regionPath = BACK_VIEW_REGIONS[region];
        if (!regionPath) return null;
        return (
          <motion.path
            key={region}
            d={regionPath.path}
            fill={accentColor}
            fillOpacity={0.45}
            stroke={accentColor}
            strokeWidth={2}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.65, 0.45] }}
            transition={{
              delay: i * 0.1,
              duration: 1.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        );
      })}
    </svg>
  );
}

export function AnatomicalBodyDiagram({ regions, accentColor = "#007AFF" }: AnatomicalBodyDiagramProps) {
  const [view, setView] = useState<"front" | "back">("front");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-[var(--radius-md)] bg-[var(--bg-secondary)] p-3"
      aria-label="Anatomical muscle target diagram"
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="text-center text-[11px] font-semibold uppercase tracking-wide text-[var(--label-tertiary)]">
          Target Zones
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setView("front")}
            className={`rounded px-2 py-1 text-[10px] font-semibold uppercase ${
              view === "front"
                ? "bg-[var(--tint)] text-white"
                : "bg-[var(--bg-tertiary)] text-[var(--label-secondary)]"
            }`}
            aria-pressed={view === "front"}
          >
            Front
          </button>
          <button
            type="button"
            onClick={() => setView("back")}
            className={`rounded px-2 py-1 text-[10px] font-semibold uppercase ${
              view === "back"
                ? "bg-[var(--tint)] text-white"
                : "bg-[var(--bg-tertiary)] text-[var(--label-secondary)]"
            }`}
            aria-pressed={view === "back"}
          >
            Back
          </button>
        </div>
      </div>

      <div className="text-[var(--label-primary)]">
        {view === "front" ? (
          <FrontView regions={regions} accentColor={accentColor} />
        ) : (
          <BackView regions={regions} accentColor={accentColor} />
        )}
      </div>

      <motion.div
        className="mt-2 flex flex-wrap justify-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {regions.map((region) => (
          <span
            key={region}
            className="rounded-full px-2 py-0.5 text-[11px] font-medium text-white"
            style={{ backgroundColor: accentColor }}
          >
            {REGION_LABELS[region] ?? region}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
