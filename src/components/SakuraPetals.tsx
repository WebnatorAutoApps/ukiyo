"use client";

import { useSeason } from "@/context/SeasonContext";
import type { Season } from "./SeasonalSlider";

const SEASON_PETAL_COLORS: Record<Season, string> = {
  spring: "#FFB6C8", // sakura pink (default)
  summer: "#7BC67E", // green
  autumn: "#E05A4E", // red
  winter: "#E8E8F0", // white/snow
};

export default function SakuraPetals() {
  const { season } = useSeason();
  const fillColor = SEASON_PETAL_COLORS[season];

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 30 }}
      aria-hidden="true"
    >
      {[...Array(12)].map((_, i) => (
        <svg
          key={i}
          className="petal-global"
          style={{
            left: `${5 + i * 8}%`,
            animationDelay: `${i * 1.1}s`,
            animationDuration: `${8 + (i % 5) * 1.5}s`,
          }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="5"
            fill={fillColor}
            opacity="0.75"
            transform={`rotate(${25 + (i % 4) * 15} 12 12)`}
            style={{ transition: "fill 0.4s ease" }}
          />
        </svg>
      ))}
    </div>
  );
}
