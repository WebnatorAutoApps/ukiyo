"use client";

import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSeason } from "@/context/SeasonContext";
import { useHeroInView, usePrefersReducedMotion } from "@/hooks/useHeroLazyLoad";
import SeasonalSlider, { type Season } from "./SeasonalSlider";

const SEASON_IMAGES: Record<Season, { desktop: string; mobile: string }> = {
  spring: {
    desktop: "/images/hero-storefront.jpg",
    mobile: "/images/hero-storefront-mobile.jpg",
  },
  summer: {
    desktop: "/images/hero-summer.jpg",
    mobile: "/images/hero-summer-mobile.jpg",
  },
  autumn: {
    desktop: "/images/hero-autumn.jpg",
    mobile: "/images/hero-autumn-mobile.jpg",
  },
  winter: {
    desktop: "/images/hero-winter.jpg",
    mobile: "/images/hero-winter-mobile.jpg",
  },
};

const ALL_SEASONS: Season[] = ["spring", "summer", "autumn", "winter"];

// Tiny 4x4 pink/cream blur placeholder matching the fallback gradient
const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAP0lEQVQI12P4/58BAwMDAwMDA8P/f/8ZGBgYGBgY/v//z8DAwMDAwPD//38GBob/DAwMDP//MzAwMDAwMDAwAABfSBEH3wvMOAAAAABJRU5ErkJggg==";

/** Preload an image and return a promise */
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.src = src;
  });
}

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { t } = useLanguage();
  const { season: activeSeason, setSeason } = useSeason();
  const [displayedSeason, setDisplayedSeason] = useState<Season>(activeSeason);
  const [isFading, setIsFading] = useState(false);
  const { ref: heroRef, isInView } = useHeroInView("200px");
  const reducedMotion = usePrefersReducedMotion();
  const preloadedRef = useRef<Set<string>>(new Set());

  // Sync displayed season when context resets (e.g. on navigation)
  useEffect(() => {
    if (!isFading && displayedSeason !== activeSeason) {
      setDisplayedSeason(activeSeason);
      setImageError(false);
      setImageLoaded(false);
    }
  }, [activeSeason, displayedSeason, isFading]);

  // Preload inactive season images once hero is in view
  useEffect(() => {
    if (!isInView) return;

    const inactiveSeasons = ALL_SEASONS.filter((s) => s !== activeSeason);
    const toPreload: string[] = [];

    for (const s of inactiveSeasons) {
      const { desktop, mobile } = SEASON_IMAGES[s];
      if (!preloadedRef.current.has(desktop)) toPreload.push(desktop);
      if (!preloadedRef.current.has(mobile)) toPreload.push(mobile);
    }

    // Preload with a small stagger to avoid bandwidth contention
    toPreload.forEach((src, i) => {
      setTimeout(() => {
        preloadImage(src)
          .then(() => preloadedRef.current.add(src))
          .catch(() => {/* image failed — will show fallback if selected */});
      }, i * 100);
    });
  }, [isInView, activeSeason]);

  const handleSeasonChange = useCallback(
    (newSeason: Season) => {
      if (newSeason === activeSeason) return;

      const { desktop, mobile } = SEASON_IMAGES[newSeason];
      const imagesToLoad: Promise<void>[] = [];

      // Preload new season images if not yet cached
      if (!preloadedRef.current.has(desktop)) {
        imagesToLoad.push(
          preloadImage(desktop).then(() => { preloadedRef.current.add(desktop); })
        );
      }
      if (!preloadedRef.current.has(mobile)) {
        imagesToLoad.push(
          preloadImage(mobile).then(() => { preloadedRef.current.add(mobile); })
        );
      }

      setSeason(newSeason);

      // Skip fade animation when user prefers reduced motion
      if (reducedMotion) {
        Promise.all(imagesToLoad)
          .catch(() => {})
          .then(() => {
            setDisplayedSeason(newSeason);
            setImageError(false);
            setImageLoaded(false);
          });
        return;
      }

      // Start fade out
      setIsFading(true);

      // Wait for both fade-out AND image preload before swapping
      const fadePromise = new Promise((r) => setTimeout(r, 400));
      Promise.all([fadePromise, ...imagesToLoad])
        .catch(() => {/* proceed even if preload fails */})
        .then(() => {
          setDisplayedSeason(newSeason);
          setImageError(false);
          setImageLoaded(false);
          setIsFading(false);
        });
    },
    [activeSeason, setSeason, reducedMotion]
  );

  const images = SEASON_IMAGES[displayedSeason];

  // Only mark as priority for the first render (above the fold, LCP)
  const shouldPrioritize = isInView;

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      ref={heroRef as React.RefObject<HTMLElement>}
    >
      {/* Fallback background — soft pink gradient matching the storefront illustration */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #FFD1DC 0%, #FFC4D6 30%, #FADADD 60%, #F5E6D3 100%)",
        }}
      />

      <div className="relative w-full min-h-[100vh]">
        {!imageError && isInView && (
          <div
            className={`hero-season-image ${isFading ? "hero-season-image--fading" : ""} ${!imageLoaded ? "hero-season-image--loading" : "hero-season-image--loaded"}`}
          >
            {/* Mobile hero — portrait illustration optimised for small screens */}
            <Image
              src={images.mobile}
              alt={t.hero.imageAlt}
              fill
              className="object-cover object-center md:hidden"
              priority={shouldPrioritize}
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              sizes="(max-width: 767px) 100vw, 0px"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            {/* Desktop hero — wide storefront image for larger screens */}
            <Image
              src={images.desktop}
              alt={t.hero.imageAlt}
              fill
              className="object-cover object-center hidden md:block"
              priority={shouldPrioritize}
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              sizes="(min-width: 768px) 100vw, 0px"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </div>
        )}

        {/* noscript fallback — render active season image eagerly when JS is disabled */}
        <noscript>
          <img
            src={images.mobile}
            alt=""
            className="md:hidden"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <img
            src={images.desktop}
            alt=""
            className="hidden md:block"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        </noscript>

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
