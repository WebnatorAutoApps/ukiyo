"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { type Season, getCurrentSeason } from "@/components/SeasonalSlider";

interface SeasonContextType {
  season: Season;
  setSeason: (season: Season) => void;
}

const SeasonContext = createContext<SeasonContextType>({
  season: "spring",
  setSeason: () => {},
});

/** Resets season to current whenever the route changes. */
function SeasonResetter({ resetSeason }: { resetSeason: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    resetSeason();
  }, [pathname, resetSeason]);

  return null;
}

export function SeasonProvider({ children }: { children: React.ReactNode }) {
  const [season, setSeasonState] = useState<Season>(getCurrentSeason);

  const resetSeason = useCallback(() => {
    setSeasonState(getCurrentSeason());
  }, []);

  const setSeason = useCallback((newSeason: Season) => {
    setSeasonState(newSeason);
  }, []);

  return (
    <SeasonContext.Provider value={{ season, setSeason }}>
      <SeasonResetter resetSeason={resetSeason} />
      {children}
    </SeasonContext.Provider>
  );
}

export function useSeason() {
  return useContext(SeasonContext);
}
