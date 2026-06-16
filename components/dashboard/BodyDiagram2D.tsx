"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { BodyRegion } from "@/lib/body-regions";
import { REGION_LABELS } from "@/lib/body-regions";

interface BodyDiagram2DProps {
  regions: BodyRegion[];
  accentColor?: string;
}

// Muscle region paths based on anatomical references
// Front view - using proper anatomical boundaries
const FRONT_VIEW_REGIONS: Record<BodyRegion, { path: string } | null> = {
  neck: {
    path: "M185 55 L215 55 L218 85 L182 85 Z",
  },
  shoulders: {
    path: "M140 82 Q110 75 85 105 Q105 140 155 150 L200 148 L245 150 Q295 140 315 105 Q290 75 260 82 Z",
  },
  chest: {
    path: "M155 150 L140 175 Q135 210 140 250 L165 265 L200 275 L235 265 L260 250 Q265 210 260 175 L245 150 Z",
  },
  biceps: {
    path: "M140 150 Q115 175 100 240 Q110 260 150 248 Q160 200 160 160 Z M260 150 Q285 175 300 240 Q290 260 250 248 Q240 200 240 160 Z",
  },
  triceps: {
    path: "M145 155 Q162 185 168 248 Q188 265 210 255 Q205 190 190 165 Z M255 155 Q238 185 232 248 Q212 265 190 255 Q195 190 210 165 Z",
  },
  forearms: {
    path: "M100 240 Q82 290 72 340 Q95 360 138 340 Q120 295 108 260 Z M300 240 Q318 290 328 340 Q305 360 262 340 Q280 295 292 260 Z",
  },
  core: {
    path: "M168 265 Q155 310 153 375 Q180 405 200 418 Q220 405 247 375 Q245 310 232 265 Z",
  },
  obliques: {
    path: "M140 250 Q120 310 118 375 Q148 405 172 398 Q165 310 155 268 Z M260 250 Q280 310 282 375 Q252 405 228 398 Q235 310 245 268 Z",
  },
  quads: {
    path: "M172 418 Q160 500 158 580 Q183 610 202 605 Q208 510 196 430 Z M228 418 Q240 500 242 580 Q217 610 198 605 Q192 510 204 430 Z",
  },
  calves: {
    path: "M178 605 Q165 660 162 695 L195 705 L200 615 Z M222 605 Q235 660 238 695 L205 705 L200 615 Z",
  },
  glutes: null,
  hamstrings: null,
  "hip-flexors": {
    path: "M180 375 Q168 420 172 460 Q200 478 228 460 Q232 420 220 375 Z",
  },
  adductors: {
    path: "M195 360 Q190 425 193 490 Q208 500 215 490 Q218 425 213 360 Z",
  },
  "upper-back": null,
  "lower-back": null,
  "full-body": {
    path: "M100 85 Q70 200 75 380 Q120 520 200 560 Q280 520 325 380 Q330 200 300 85 Z",
  },
  cardio: {
    path: "M140 135 Q125 250 130 380 Q165 520 200 560 Q235 520 270 380 Q275 250 260 135 Z",
  },
};

const BACK_VIEW_REGIONS: Record<BodyRegion, { path: string } | null> = {
  neck: {
    path: "M185 55 L215 55 L218 85 L182 85 Z",
  },
  shoulders: {
    path: "M140 82 Q110 75 85 105 Q105 140 155 150 L200 148 L245 150 Q295 140 315 105 Q290 75 260 82 Z",
  },
  "upper-back": {
    path: "M145 150 Q120 190 125 250 Q175 215 200 235 Q225 215 275 250 Q280 190 255 150 Z",
  },
  "lower-back": {
    path: "M168 375 Q158 435 165 485 Q195 510 200 520 Q205 510 235 485 Q242 435 232 375 Z",
  },
  triceps: {
    path: "M140 150 Q115 175 100 240 Q110 260 150 248 Q160 200 160 160 Z M260 150 Q285 175 300 240 Q290 260 250 248 Q240 200 240 160 Z",
  },
  forearms: {
    path: "M100 240 Q82 290 72 340 Q95 360 138 340 Q120 295 108 260 Z M300 240 Q318 290 328 340 Q305 360 262 340 Q280 295 292 260 Z",
  },
  glutes: {
    path: "M172 485 Q152 545 160 605 Q190 635 200 645 Q210 635 240 605 Q248 545 228 485 Z",
  },
  hamstrings: {
    path: "M180 605 Q165 665 162 695 L195 705 L200 620 Z M220 605 Q235 665 238 695 L205 705 L200 620 Z",
  },
  calves: {
    path: "M185 705 Q170 745 168 780 L200 790 Z M215 705 Q230 745 232 780 L200 790 Z",
  },
  chest: null,
  biceps: null,
  core: null,
  obliques: null,
  quads: null,
  adductors: null,
  "hip-flexors": null,
  "full-body": {
    path: "M85 85 Q55 200 60 390 Q110 580 200 625 Q290 580 340 390 Q345 200 315 85 Z",
  },
  cardio: {
    path: "M140 150 Q125 260 130 390 Q170 580 200 625 Q230 580 270 390 Q275 260 260 150 Z",
  },
};

function FrontView({ regions, accentColor }: { regions: BodyRegion[]; accentColor: string }) {
  return (
    <svg viewBox="0 0 400 800" className="h-full w-full" aria-hidden="true">
      <defs>
        {/* Base skin gradient */}
        <linearGradient id="skinTone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5ddb0" />
          <stop offset="50%" stopColor="#e8cfa0" />
          <stop offset="100%" stopColor="#d9b088" />
        </linearGradient>
        
        {/* Muscle highlighting */}
        <radialGradient id="muscleDim" cx="30%" cy="20%">
          <stop offset="0%" stopColor="#e8a87c" />
          <stop offset="100%" stopColor="#c4744c" />
        </radialGradient>
      </defs>

      {/* Head and neck area */}
      <ellipse cx="200" cy="50" rx="28" ry="35" fill="url(#skinTone)" stroke="#9d8b7d" strokeWidth="1.5" />
      {/* Facial features - minimal */}
      <circle cx="192" cy="42" r="3" fill="#333" />
      <circle cx="208" cy="42" r="3" fill="#333" />

      {/* Neck */}
      <path
        d="M186 82 Q172 95 172 115 L228 115 Q228 95 214 82 Q200 88 186 82 Z"
        fill="url(#skinTone)"
        stroke="#9d8b7d"
        strokeWidth="1.5"
      />

      {/* Shoulders/Trapezius */}
      <path
        d="M140 115 Q100 110 70 140 Q90 165 140 180 L200 178 L260 180 Q310 165 330 140 Q300 110 260 115 Z"
        fill="url(#muscleDim)"
        stroke="#9d8b7d"
        strokeWidth="1.5"
      />

      {/* Pectoralis Major - Left */}
      <ellipse cx="160" cy="220" rx="42" ry="60" fill="url(#muscleDim)" stroke="#9d8b7d" strokeWidth="1.5" />
      {/* Pec detail line */}
      <path d="M152 185 Q148 220 160 270" stroke="#8b7d6b" strokeWidth="0.8" opacity="0.6" />

      {/* Pectoralis Major - Right */}
      <ellipse cx="240" cy="220" rx="42" ry="60" fill="url(#muscleDim)" stroke="#9d8b7d" strokeWidth="1.5" />
      {/* Pec detail line */}
      <path d="M248 185 Q252 220 240 270" stroke="#8b7d6b" strokeWidth="0.8" opacity="0.6" />

      {/* Sternum */}
      <line x1="200" y1="160" x2="200" y2="280" stroke="#9d8b7d" strokeWidth="1" opacity="0.5" />

      {/* Rectus Abdominis (6-pack) */}
      <path
        d="M175 285 Q160 360 162 450 Q190 490 200 505 Q210 490 238 450 Q240 360 225 285 Z"
        fill="url(#muscleDim)"
        stroke="#9d8b7d"
        strokeWidth="1.5"
      />
      {/* Abs definition */}
      <line x1="200" y1="285" x2="200" y2="505" stroke="#9d8b7d" strokeWidth="1" opacity="0.7" />
      <path d="M175 315 Q200 320 225 315" stroke="#9d8b7d" strokeWidth="0.8" opacity="0.6" />
      <path d="M172 360 Q200 365 228 360" stroke="#9d8b7d" strokeWidth="0.8" opacity="0.6" />
      <path d="M170 405 Q200 410 230 405" stroke="#9d8b7d" strokeWidth="0.8" opacity="0.6" />
      <path d="M172 450 Q200 455 228 450" stroke="#9d8b7d" strokeWidth="0.8" opacity="0.6" />

      {/* Obliques - External - Left */}
      <path
        d="M140 300 Q110 380 115 480 Q155 510 185 500 Q175 390 160 320 Z"
        fill="url(#muscleDim)"
        stroke="#9d8b7d"
        strokeWidth="1.5"
        opacity="0.85"
      />

      {/* Obliques - External - Right */}
      <path
        d="M260 300 Q290 380 285 480 Q245 510 215 500 Q225 390 240 320 Z"
        fill="url(#muscleDim)"
        stroke="#9d8b7d"
        strokeWidth="1.5"
        opacity="0.85"
      />

      {/* Biceps - Left */}
      <ellipse cx="118" cy="250" rx="28" ry="70" fill="url(#muscleDim)" stroke="#9d8b7d" strokeWidth="1.5" />
      {/* Bicep definition */}
      <path d="M112 190 Q110 250 120 320" stroke="#8b7d6b" strokeWidth="0.8" opacity="0.5" />

      {/* Biceps - Right */}
      <ellipse cx="282" cy="250" rx="28" ry="70" fill="url(#muscleDim)" stroke="#9d8b7d" strokeWidth="1.5" />
      {/* Bicep definition */}
      <path d="M288 190 Q290 250 280 320" stroke="#8b7d6b" strokeWidth="0.8" opacity="0.5" />

      {/* Forearms - Left */}
      <ellipse cx="95" cy="370" rx="20" ry="60" fill="url(#muscleDim)" stroke="#9d8b7d" strokeWidth="1.5" transform="rotate(-20 95 370)" />
      {/* Forearm striations */}
      <path d="M85 330 Q92 365 100 410" stroke="#8b7d6b" strokeWidth="0.6" opacity="0.4" />
      <path d="M95 325 Q102 365 108 415" stroke="#8b7d6b" strokeWidth="0.6" opacity="0.4" />
      <path d="M105 330 Q110 365 112 415" stroke="#8b7d6b" strokeWidth="0.6" opacity="0.4" />

      {/* Forearms - Right */}
      <ellipse cx="305" cy="370" rx="20" ry="60" fill="url(#muscleDim)" stroke="#9d8b7d" strokeWidth="1.5" transform="rotate(20 305 370)" />
      {/* Forearm striations */}
      <path d="M315 330 Q308 365 300 410" stroke="#8b7d6b" strokeWidth="0.6" opacity="0.4" />
      <path d="M305 325 Q298 365 292 415" stroke="#8b7d6b" strokeWidth="0.6" opacity="0.4" />
      <path d="M295 330 Q290 365 288 415" stroke="#8b7d6b" strokeWidth="0.6" opacity="0.4" />

      {/* Hands - simplified */}
      <rect x="70" y="420" width="35" height="50" rx="10" fill="url(#skinTone)" stroke="#9d8b7d" strokeWidth="1" />
      <rect x="295" y="420" width="35" height="50" rx="10" fill="url(#skinTone)" stroke="#9d8b7d" strokeWidth="1" />

      {/* Quadriceps - Left */}
      <path
        d="M175 505 Q158 610 155 720 Q185 755 202 750 Q208 620 195 520 Z"
        fill="url(#muscleDim)"
        stroke="#9d8b7d"
        strokeWidth="1.5"
      />
      {/* Quad striations */}
      <path d="M170 560 Q175 630 185 720" stroke="#8b7d6b" strokeWidth="0.7" opacity="0.5" />
      <path d="M185 560 Q190 630 200 720" stroke="#8b7d6b" strokeWidth="0.7" opacity="0.5" />

      {/* Quadriceps - Right */}
      <path
        d="M225 505 Q242 610 245 720 Q215 755 198 750 Q192 620 205 520 Z"
        fill="url(#muscleDim)"
        stroke="#9d8b7d"
        strokeWidth="1.5"
      />
      {/* Quad striations */}
      <path d="M230 560 Q225 630 215 720" stroke="#8b7d6b" strokeWidth="0.7" opacity="0.5" />
      <path d="M215 560 Q210 630 200 720" stroke="#8b7d6b" strokeWidth="0.7" opacity="0.5" />

      {/* Quad separation line */}
      <line x1="200" y1="505" x2="200" y2="750" stroke="#9d8b7d" strokeWidth="1" opacity="0.6" />

      {/* Calves - Left */}
      <ellipse cx="182" cy="680" rx="18" ry="50" fill="url(#muscleDim)" stroke="#9d8b7d" strokeWidth="1.5" />
      <path d="M175 650 Q180 670 188 720" stroke="#8b7d6b" strokeWidth="0.6" opacity="0.5" />

      {/* Calves - Right */}
      <ellipse cx="218" cy="680" rx="18" ry="50" fill="url(#muscleDim)" stroke="#9d8b7d" strokeWidth="1.5" />
      <path d="M225 650 Q220 670 212 720" stroke="#8b7d6b" strokeWidth="0.6" opacity="0.5" />

      {/* Feet - simplified */}
      <ellipse cx="182" cy="755" rx="16" ry="20" fill="url(#skinTone)" stroke="#9d8b7d" strokeWidth="1" />
      <ellipse cx="218" cy="755" rx="16" ry="20" fill="url(#skinTone)" stroke="#9d8b7d" strokeWidth="1" />

      {/* Highlighted muscle regions based on workout targets */}
      {regions.map((region, i) => {
        const regionPath = FRONT_VIEW_REGIONS[region];
        if (!regionPath) return null;
        return (
          <motion.path
            key={region}
            d={regionPath.path}
            fill={accentColor}
            fillOpacity={0.4}
            stroke={accentColor}
            strokeWidth={2.5}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.25, 0.65, 0.4] }}
            transition={{
              delay: i * 0.08,
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
    <svg viewBox="0 0 400 800" className="h-full w-full" aria-hidden="true">
      <defs>
        {/* Base skin gradient */}
        <linearGradient id="skinToneBack" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5ddb0" />
          <stop offset="50%" stopColor="#e8cfa0" />
          <stop offset="100%" stopColor="#d9b088" />
        </linearGradient>
        
        {/* Muscle highlighting */}
        <radialGradient id="muscleDimBack" cx="30%" cy="20%">
          <stop offset="0%" stopColor="#e8a87c" />
          <stop offset="100%" stopColor="#c4744c" />
        </radialGradient>
      </defs>

      {/* Head */}
      <ellipse cx="200" cy="50" rx="28" ry="35" fill="url(#skinToneBack)" stroke="#9d8b7d" strokeWidth="1.5" />

      {/* Neck */}
      <path
        d="M186 82 Q172 95 172 115 L228 115 Q228 95 214 82 Q200 88 186 82 Z"
        fill="url(#skinToneBack)"
        stroke="#9d8b7d"
        strokeWidth="1.5"
      />

      {/* Shoulders/Trapezius */}
      <path
        d="M140 115 Q100 110 70 140 Q90 165 140 180 L200 178 L260 180 Q310 165 330 140 Q300 110 260 115 Z"
        fill="url(#muscleDimBack)"
        stroke="#9d8b7d"
        strokeWidth="1.5"
      />

      {/* Rhomboids */}
      <path
        d="M155 180 Q125 220 130 280 Q180 245 200 260 Q220 245 270 280 Q275 220 245 180 Z"
        fill="url(#muscleDimBack)"
        stroke="#9d8b7d"
        strokeWidth="1.5"
      />

      {/* Latissimus Dorsi - Left */}
      <path
        d="M140 180 Q110 260 115 360 Q155 385 180 375 Q170 280 160 200 Z"
        fill="url(#muscleDimBack)"
        stroke="#9d8b7d"
        strokeWidth="1.5"
      />
      {/* Lat definition */}
      <path d="M145 220 Q120 300 125 370" stroke="#8b7d6b" strokeWidth="0.7" opacity="0.5" />

      {/* Latissimus Dorsi - Right */}
      <path
        d="M260 180 Q290 260 285 360 Q245 385 220 375 Q230 280 240 200 Z"
        fill="url(#muscleDimBack)"
        stroke="#9d8b7d"
        strokeWidth="1.5"
      />
      {/* Lat definition */}
      <path d="M255 220 Q280 300 275 370" stroke="#8b7d6b" strokeWidth="0.7" opacity="0.5" />

      {/* Spine */}
      <line x1="200" y1="115" x2="200" y2="520" stroke="#9d8b7d" strokeWidth="1" opacity="0.5" />

      {/* Erector Spinae (Lower back) */}
      <path
        d="M185 375 Q175 440 180 500 Q200 530 200 540 Q200 530 220 500 Q225 440 215 375 Z"
        fill="url(#muscleDimBack)"
        stroke="#9d8b7d"
        strokeWidth="1.5"
      />
      {/* Lower back definition */}
      <line x1="200" y1="375" x2="200" y2="540" stroke="#9d8b7d" strokeWidth="0.8" opacity="0.6" />

      {/* Glutes - Left */}
      <ellipse cx="170" cy="570" rx="38" ry="55" fill="url(#muscleDimBack)" stroke="#9d8b7d" strokeWidth="1.5" />
      {/* Glute highlight */}
      <ellipse cx="170" cy="550" rx="35" ry="50" fill="url(#muscleDimBack)" opacity="0.4" />

      {/* Glutes - Right */}
      <ellipse cx="230" cy="570" rx="38" ry="55" fill="url(#muscleDimBack)" stroke="#9d8b7d" strokeWidth="1.5" />
      {/* Glute highlight */}
      <ellipse cx="230" cy="550" rx="35" ry="50" fill="url(#muscleDimBack)" opacity="0.4" />

      {/* Glute separation */}
      <line x1="200" y1="520" x2="200" y2="630" stroke="#9d8b7d" strokeWidth="1" opacity="0.6" />

      {/* Biceps (back view) - Left */}
      <ellipse cx="118" cy="250" rx="26" ry="65" fill="url(#muscleDimBack)" stroke="#9d8b7d" strokeWidth="1.5" opacity="0.8" />

      {/* Biceps (back view) - Right */}
      <ellipse cx="282" cy="250" rx="26" ry="65" fill="url(#muscleDimBack)" stroke="#9d8b7d" strokeWidth="1.5" opacity="0.8" />

      {/* Triceps - Left */}
      <ellipse cx="100" cy="280" rx="20" ry="60" fill="url(#muscleDimBack)" stroke="#9d8b7d" strokeWidth="1.5" />
      {/* Tricep definition */}
      <path d="M92 240 Q95 300 110 340" stroke="#8b7d6b" strokeWidth="0.7" opacity="0.5" />

      {/* Triceps - Right */}
      <ellipse cx="300" cy="280" rx="20" ry="60" fill="url(#muscleDimBack)" stroke="#9d8b7d" strokeWidth="1.5" />
      {/* Tricep definition */}
      <path d="M308 240 Q305 300 290 340" stroke="#8b7d6b" strokeWidth="0.7" opacity="0.5" />

      {/* Forearms - Left */}
      <ellipse cx="85" cy="380" rx="18" ry="55" fill="url(#muscleDimBack)" stroke="#9d8b7d" strokeWidth="1.5" transform="rotate(-20 85 380)" />
      {/* Forearm striations */}
      <path d="M75 345 Q82 380 92 425" stroke="#8b7d6b" strokeWidth="0.6" opacity="0.4" />

      {/* Forearms - Right */}
      <ellipse cx="315" cy="380" rx="18" ry="55" fill="url(#muscleDimBack)" stroke="#9d8b7d" strokeWidth="1.5" transform="rotate(20 315 380)" />
      {/* Forearm striations */}
      <path d="M325 345 Q318 380 308 425" stroke="#8b7d6b" strokeWidth="0.6" opacity="0.4" />

      {/* Hamstrings - Left */}
      <path
        d="M178 630 Q165 700 162 750 L195 760 L200 645 Z"
        fill="url(#muscleDimBack)"
        stroke="#9d8b7d"
        strokeWidth="1.5"
      />
      {/* Hamstring definition */}
      <path d="M172 670 Q168 715 170 755" stroke="#8b7d6b" strokeWidth="0.7" opacity="0.5" />

      {/* Hamstrings - Right */}
      <path
        d="M222 630 Q235 700 238 750 L205 760 L200 645 Z"
        fill="url(#muscleDimBack)"
        stroke="#9d8b7d"
        strokeWidth="1.5"
      />
      {/* Hamstring definition */}
      <path d="M228 670 Q232 715 230 755" stroke="#8b7d6b" strokeWidth="0.7" opacity="0.5" />

      {/* Hamstring separation */}
      <line x1="200" y1="630" x2="200" y2="760" stroke="#9d8b7d" strokeWidth="0.8" opacity="0.5" />

      {/* Calves - Left */}
      <ellipse cx="185" cy="710" rx="16" ry="48" fill="url(#muscleDimBack)" stroke="#9d8b7d" strokeWidth="1.5" />
      {/* Calf definition */}
      <path d="M178 680 Q182 710 190 750" stroke="#8b7d6b" strokeWidth="0.6" opacity="0.5" />

      {/* Calves - Right */}
      <ellipse cx="215" cy="710" rx="16" ry="48" fill="url(#muscleDimBack)" stroke="#9d8b7d" strokeWidth="1.5" />
      {/* Calf definition */}
      <path d="M222 680 Q218 710 210 750" stroke="#8b7d6b" strokeWidth="0.6" opacity="0.5" />

      {/* Feet - simplified */}
      <ellipse cx="185" cy="775" rx="16" ry="20" fill="url(#skinToneBack)" stroke="#9d8b7d" strokeWidth="1" />
      <ellipse cx="215" cy="775" rx="16" ry="20" fill="url(#skinToneBack)" stroke="#9d8b7d" strokeWidth="1" />

      {/* Highlighted muscle regions based on workout targets */}
      {regions.map((region, i) => {
        const regionPath = BACK_VIEW_REGIONS[region];
        if (!regionPath) return null;
        return (
          <motion.path
            key={region}
            d={regionPath.path}
            fill={accentColor}
            fillOpacity={0.4}
            stroke={accentColor}
            strokeWidth={2.5}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.25, 0.65, 0.4] }}
            transition={{
              delay: i * 0.08,
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

export function BodyDiagram2D({ regions, accentColor = "#007AFF" }: BodyDiagram2DProps) {
  const [view, setView] = useState<"front" | "back">("front");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-[var(--radius-md)] bg-[var(--bg-secondary)] p-3"
      aria-label="2D body muscle diagram"
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="text-center text-[11px] font-semibold uppercase tracking-wide text-[var(--label-tertiary)]">
          Target Zones
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setView("front")}
            className={`rounded px-2 py-1 text-[10px] font-semibold uppercase transition-colors ${
              view === "front"
                ? "bg-[var(--tint)] text-white"
                : "bg-[var(--bg-tertiary)] text-[var(--label-secondary)] hover:bg-[var(--bg-secondary)]"
            }`}
            aria-pressed={view === "front"}
          >
            Front
          </button>
          <button
            type="button"
            onClick={() => setView("back")}
            className={`rounded px-2 py-1 text-[10px] font-semibold uppercase transition-colors ${
              view === "back"
                ? "bg-[var(--tint)] text-white"
                : "bg-[var(--bg-tertiary)] text-[var(--label-secondary)] hover:bg-[var(--bg-secondary)]"
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
