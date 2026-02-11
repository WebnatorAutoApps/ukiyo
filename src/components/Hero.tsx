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

const FADE_DURATION_MS = 400;
// Small buffer after CSS transition to ensure it fully completes before layer swap
const TRANSITION_BUFFER_MS = 50;

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

/** Renders a pair of mobile + desktop hero images for a given season */
function SeasonLayer({
  season,
  alt,
  priority,
  className,
  onLoad,
  onError,
}: {
  season: Season;
  alt: string;
  priority: boolean;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}) {
  const images = SEASON_IMAGES[season];
  return (
    <div className={className}>
      <Image
        src={images.mobile}
        alt={alt}
        fill
        className="object-cover object-center md:hidden"
        priority={priority}
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
        sizes="(max-width: 767px) 100vw, 0px"
        onLoad={onLoad}
        onError={onError}
      />
      <Image
        src={images.desktop}
        alt={alt}
        fill
        className="object-cover object-center hidden md:block"
        priority={priority}
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
        sizes="(min-width: 768px) 100vw, 0px"
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  );
}

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { t } = useLanguage();
  const { season: activeSeason, setSeason } = useSeason();

  // Base layer: the currently visible season image
  const [baseSeason, setBaseSeason] = useState<Season>(activeSeason);
  // Incoming layer: the season fading in on top (null when idle)
  const [incomingSeason, setIncomingSeason] = useState<Season | null>(null);
  // Whether the incoming layer has started its opacity transition
  const [incomingVisible, setIncomingVisible] = useState(false);

  const { ref: heroRef, isInView } = useHeroInView("200px");
  const reducedMotion = usePrefersReducedMotion();
  const preloadedRef = useRef<Set<string>>(new Set());
  // Track the latest requested season so rapid clicks always resolve to the last one
  const pendingSeasonRef = useRef<Season | null>(null);
  // Abort controller for cancelling in-flight transitions
  const transitionIdRef = useRef(0);

  // Sync base season when context resets (e.g. on navigation)
  useEffect(() => {
    if (incomingSeason === null && baseSeason !== activeSeason) {
      setBaseSeason(activeSeason);
      setImageError(false);
      // Only reset imageLoaded if the new season images aren't preloaded yet
      const { desktop, mobile } = SEASON_IMAGES[activeSeason];
      if (!preloadedRef.current.has(desktop) && !preloadedRef.current.has(mobile)) {
        setImageLoaded(false);
      }
    }
  }, [activeSeason, baseSeason, incomingSeason]);

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
            setBaseSeason(newSeason);
            setIncomingSeason(null);
            setIncomingVisible(false);
            setImageError(false);
            setImageLoaded(true);
          });
        return;
      }

      // If a transition is already in progress, immediately promote the
      // current incoming layer to base so there's no gap
      if (incomingSeason !== null) {
        setBaseSeason(incomingSeason);
        setIncomingSeason(null);
        setIncomingVisible(false);
        setImageLoaded(true);
      }

      // Track the latest request so rapid clicks converge
      pendingSeasonRef.current = newSeason;
      const id = ++transitionIdRef.current;

      // Wait for images to be ready, then start crossfade
      Promise.all(imagesToLoad)
        .catch(() => {/* proceed even if preload fails */})
        .then(() => {
          // If a newer transition was requested, skip this one
          if (transitionIdRef.current !== id) return;

          // Mount the incoming layer at opacity 0
          setIncomingSeason(newSeason);
          setIncomingVisible(false);

          // Trigger the fade-in on the next frame so the browser registers opacity 0 first
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (transitionIdRef.current !== id) return;
              setIncomingVisible(true);
            });
          });

          // After the CSS transition fully completes, promote incoming to base
          setTimeout(() => {
            if (transitionIdRef.current !== id) return;

            setBaseSeason(newSeason);
            setIncomingSeason(null);
            setIncomingVisible(false);
            setImageError(false);
            // Keep imageLoaded true — image is already rendered by the incoming layer
            setImageLoaded(true);
            pendingSeasonRef.current = null;
          }, FADE_DURATION_MS + TRANSITION_BUFFER_MS);
        });
    },
    [activeSeason, setSeason, reducedMotion, incomingSeason]
  );

  const baseImages = SEASON_IMAGES[baseSeason];

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
        {/* Base layer — currently displayed season */}
        {!imageError && isInView && (
          <SeasonLayer
            season={baseSeason}
            alt={t.hero.imageAlt}
            priority={shouldPrioritize}
            className={`hero-season-image ${!imageLoaded ? "hero-season-image--loading" : "hero-season-image--loaded"}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        {/* Incoming layer — new season crossfading in on top */}
        {incomingSeason !== null && isInView && (
          <SeasonLayer
            season={incomingSeason}
            alt={t.hero.imageAlt}
            priority={false}
            className={`hero-season-image hero-season-image--incoming ${incomingVisible ? "hero-season-image--incoming-visible" : ""}`}
          />
        )}

        {/* noscript fallback — render active season image eagerly when JS is disabled */}
        <noscript>
          <img
            src={baseImages.mobile}
            alt=""
            className="md:hidden"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <img
            src={baseImages.desktop}
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
