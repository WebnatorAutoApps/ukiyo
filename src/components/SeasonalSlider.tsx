"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export type Season = "spring" | "summer" | "autumn" | "winter";

interface SeasonConfig {
  id: Season;
  label: string;
  tooltip: string;
}

const SEASONS: SeasonConfig[] = [
  { id: "spring", label: "Spring", tooltip: "Sakura Season" },
  { id: "summer", label: "Summer", tooltip: "Bubble Tea Time" },
  { id: "autumn", label: "Autumn", tooltip: "Cozy Vibes" },
  { id: "winter", label: "Winter", tooltip: "Warm Coffee" },
];

function SeasonIcon({ season }: { season: Season }) {
  switch (season) {
    case "spring":
      // Cherry blossom / sakura flower
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="2" fill="#FFB6C1" />
          <ellipse cx="8" cy="3" rx="2" ry="2.5" fill="#FFD1DC" />
          <ellipse cx="8" cy="13" rx="2" ry="2.5" fill="#FFD1DC" />
          <ellipse cx="3" cy="8" rx="2.5" ry="2" fill="#FFD1DC" />
          <ellipse cx="13" cy="8" rx="2.5" ry="2" fill="#FFD1DC" />
          <ellipse cx="4.5" cy="4.5" rx="2" ry="2.2" transform="rotate(-45 4.5 4.5)" fill="#FFD1DC" />
        </svg>
      );
    case "summer":
      // Sun icon
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="3.5" fill="#FFD700" />
          <line x1="8" y1="0.5" x2="8" y2="3" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="13" x2="8" y2="15.5" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="0.5" y1="8" x2="3" y2="8" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="13" y1="8" x2="15.5" y2="8" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2.7" y1="2.7" x2="4.5" y2="4.5" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="11.5" y1="11.5" x2="13.3" y2="13.3" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2.7" y1="13.3" x2="4.5" y2="11.5" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="11.5" y1="4.5" x2="13.3" y2="2.7" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "autumn":
      // Leaf icon
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 13C3 13 2 7 6 4C10 1 14 2 14 2C14 2 15 8 11 11C7 14 3 13 3 13Z" fill="#D2691E" />
          <path d="M4 12.5C6 9 9 6 13.5 2.5" stroke="#8B4513" strokeWidth="0.8" fill="none" />
          <path d="M7 10C8 8.5 9.5 7 11 5.5" stroke="#8B4513" strokeWidth="0.5" fill="none" />
          <path d="M5.5 11.5C6.5 10 8 8.5 9.5 7.5" stroke="#8B4513" strokeWidth="0.5" fill="none" />
        </svg>
      );
    case "winter":
      // Snowflake icon
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <line x1="8" y1="1" x2="8" y2="15" stroke="#87CEEB" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="1" y1="8" x2="15" y2="8" stroke="#87CEEB" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="3.1" y1="3.1" x2="12.9" y2="12.9" stroke="#87CEEB" strokeWidth="1" strokeLinecap="round" />
          <line x1="12.9" y1="3.1" x2="3.1" y2="12.9" stroke="#87CEEB" strokeWidth="1" strokeLinecap="round" />
          <line x1="8" y1="1" x2="6.5" y2="3" stroke="#87CEEB" strokeWidth="1" strokeLinecap="round" />
          <line x1="8" y1="1" x2="9.5" y2="3" stroke="#87CEEB" strokeWidth="1" strokeLinecap="round" />
          <line x1="8" y1="15" x2="6.5" y2="13" stroke="#87CEEB" strokeWidth="1" strokeLinecap="round" />
          <line x1="8" y1="15" x2="9.5" y2="13" stroke="#87CEEB" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
  }
}

function getCurrentSeason(): Season {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
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
      {/* Track */}
      <div className="seasonal-slider__track">
        {/* Sliding thumb indicator */}
        <div
          className="seasonal-slider__thumb"
          style={{
            left: `${currentIndex * (100 / (SEASONS.length - 1))}%`,
          }}
          aria-hidden="true"
        />

        {/* Season stop badges */}
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
            <span className="seasonal-slider__badge">
              <SeasonIcon season={season.id} />
            </span>

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

export { SEASONS, getCurrentSeason };
