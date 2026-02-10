"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { type Season, getCurrentSeason, getStoredSeason } from "@/components/SeasonalSlider";

interface SeasonContextType {
  season: Season;
  setSeason: (season: Season) => void;
}

const SeasonContext = createContext<SeasonContextType>({
  season: "spring",
  setSeason: () => {},
});

export function SeasonProvider({ children }: { children: React.ReactNode }) {
  const [season, setSeasonState] = useState<Season>(() => getStoredSeason() ?? getCurrentSeason());

  useEffect(() => {
    const stored = getStoredSeason();
    if (stored) {
      setSeasonState(stored);
    }
  }, []);

  const setSeason = useCallback((newSeason: Season) => {
    setSeasonState(newSeason);
    try {
      localStorage.setItem("ukiyo-season", newSeason);
    } catch {
      // localStorage not available
    }
  }, []);

  return (
    <SeasonContext.Provider value={{ season, setSeason }}>
      {children}
    </SeasonContext.Provider>
  );
}

export function useSeason() {
  return useContext(SeasonContext);
}
