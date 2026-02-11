"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSeason } from "@/context/SeasonContext";
import SeasonalSlider, { type Season } from "./SeasonalSlider";

const SEASON_IMAGES: Record<Season, { desktop: string; mobile: string }> = {
  spring: {
    desktop: "/images/hero-storefront.jpg",
    mobile: "/images/hero-storefront-mobile.jpg",
  },
  summer: {
    desktop: "/images/hero-summer.svg",
    mobile: "/images/hero-summer-mobile.jpg",
  },
  autumn: {
    desktop: "/images/hero-autumn.svg",
    mobile: "/images/hero-autumn-mobile.svg",
  },
  winter: {
    desktop: "/images/hero-winter.jpg",
    mobile: "/images/hero-winter-mobile.jpg",
  },
};

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const { t } = useLanguage();
  const { season: activeSeason, setSeason } = useSeason();
  const [displayedSeason, setDisplayedSeason] = useState<Season>(activeSeason);
  const [isFading, setIsFading] = useState(false);

  const handleSeasonChange = useCallback(
    (newSeason: Season) => {
      if (newSeason === activeSeason) return;
      // Start fade out
      setIsFading(true);
      setSeason(newSeason);

      // After fade out completes, swap image and fade in
      const timer = setTimeout(() => {
        setDisplayedSeason(newSeason);
        setImageError(false);
        setIsFading(false);
      }, 400);

      return () => clearTimeout(timer);
    },
    [activeSeason, setSeason]
  );

  const images = SEASON_IMAGES[displayedSeason];

  return (
    <section id="hero" className="relative w-full overflow-hidden">
      {/* Fallback background — soft pink gradient matching the storefront illustration */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #FFD1DC 0%, #FFC4D6 30%, #FADADD 60%, #F5E6D3 100%)",
        }}
      />

      <div className="relative w-full min-h-[100vh]">
        {!imageError && (
          <div
            className={`hero-season-image ${isFading ? "hero-season-image--fading" : ""}`}
          >
            {/* Mobile hero — portrait illustration optimised for small screens */}
            <Image
              src={images.mobile}
              alt={t.hero.imageAlt}
              fill
              className="object-cover object-center md:hidden"
              priority
              sizes="(max-width: 767px) 100vw, 0px"
              onError={() => setImageError(true)}
            />
            {/* Desktop hero — wide storefront image for larger screens */}
            <Image
              src={images.desktop}
              alt={t.hero.imageAlt}
              fill
              className="object-cover object-center hidden md:block"
              priority
              sizes="(min-width: 768px) 100vw, 0px"
              onError={() => setImageError(true)}
            />
          </div>
        )}

        {/* Soft gradient overlay — lighter to preserve the illustration's pastel tones */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,209,220,0.15) 0%, rgba(255,209,220,0.05) 30%, transparent 50%, rgba(61,46,46,0.3) 80%, rgba(61,46,46,0.55) 100%)",
          }}
        />

        {/* Hero content — centered on mobile, bottom-aligned on desktop */}
        <div className="absolute inset-0 flex flex-col items-center justify-center md:justify-end pb-28 md:pb-32 px-4 z-[4]">
          <span className="mb-3 text-sm md:text-base text-sakura-pink font-heading tracking-widest uppercase drop-shadow">
            {t.hero.tagline}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center drop-shadow-lg font-heading leading-tight">
            {t.hero.title}
            <br />
            <span className="text-sakura-pink drop-shadow">
              {t.hero.titleAccent}
            </span>
          </h1>
        </div>

        {/* Seasonal slider — bottom center of hero */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-[5]">
          <SeasonalSlider
            currentSeason={activeSeason}
            onSeasonChange={handleSeasonChange}
          />
        </div>
      </div>
    </section>
  );
}
