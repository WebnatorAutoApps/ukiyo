"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export type Season = "spring" | "summer" | "autumn" | "winter";

interface SeasonConfig {
  id: Season;
  icon: string;
  label: string;
  tooltip: string;
}

const SEASONS: SeasonConfig[] = [
  { id: "spring", icon: "🌸", label: "Spring", tooltip: "Sakura Season" },
  { id: "summer", icon: "☀️", label: "Summer", tooltip: "Bubble Tea Time" },
  { id: "autumn", icon: "🍂", label: "Autumn", tooltip: "Cozy Vibes" },
  { id: "winter", icon: "❄️", label: "Winter", tooltip: "Warm Coffee" },
];

function getCurrentSeason(): Season {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}

function getStoredSeason(): Season | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("ukiyo-season");
    if (stored && ["spring", "summer", "autumn", "winter"].includes(stored)) {
      return stored as Season;
    }
  } catch {
    // localStorage not available
  }
  return null;
}

interface SeasonalSliderProps {
  onSeasonChange: (season: Season) => void;
  currentSeason: Season;
}

export default function SeasonalSlider({
  onSeasonChange,
  currentSeason,
}: SeasonalSliderProps) {
  const [tooltipSeason, setTooltipSeason] = useState<Season | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentIndex = SEASONS.findIndex((s) => s.id === currentSeason);

  const clearHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const showTooltip = useCallback(
    (season: Season) => {
      clearHideTimeout();
      setTooltipSeason(season);
      hideTimeoutRef.current = setTimeout(() => {
        setTooltipSeason(null);
        hideTimeoutRef.current = null;
      }, 1000);
    },
    [clearHideTimeout]
  );

  const hideTooltip = useCallback(() => {
    clearHideTimeout();
    setTooltipSeason(null);
  }, [clearHideTimeout]);

  useEffect(() => {
    return () => clearHideTimeout();
  }, [clearHideTimeout]);

  const handleSeasonSelect = useCallback(
    (season: Season) => {
      showTooltip(season);
      onSeasonChange(season);
    },
    [onSeasonChange, showTooltip]
  );

  return (
    <div
      className="seasonal-slider"
      role="radiogroup"
      aria-label="Select season"
    >
      {/* Wooden branch track */}
      <div className="seasonal-slider__track">
        {/* Thumb — kawaii cat face that slides along the branch */}
        <div
          className="seasonal-slider__thumb"
          style={{
            left: `${currentIndex * (100 / (SEASONS.length - 1))}%`,
          }}
          aria-hidden="true"
        >
          <span className="seasonal-slider__thumb-face">🐱</span>
        </div>

        {/* Branch knots / step markers */}
        {SEASONS.map((season, index) => (
          <button
            key={season.id}
            className={`seasonal-slider__stop ${
              currentSeason === season.id ? "seasonal-slider__stop--active" : ""
            }`}
            style={{
              left: `${index * (100 / (SEASONS.length - 1))}%`,
            }}
            onClick={() => handleSeasonSelect(season.id)}
            onMouseDown={() => showTooltip(season.id)}
            onMouseUp={hideTooltip}
            onTouchStart={() => showTooltip(season.id)}
            onTouchEnd={hideTooltip}
            role="radio"
            aria-checked={currentSeason === season.id}
            aria-label={`${season.label} — ${season.tooltip}`}
            title={season.tooltip}
          >
            <span className="seasonal-slider__icon">{season.icon}</span>

            {/* Tooltip — appears on interaction, auto-hides after 1s */}
            {tooltipSeason === season.id && (
              <span
                className="seasonal-slider__tooltip"
                role="tooltip"
              >
                {season.tooltip}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export { SEASONS, getCurrentSeason, getStoredSeason };
