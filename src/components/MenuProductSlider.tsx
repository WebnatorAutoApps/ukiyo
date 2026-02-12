"use client";

import Image from "next/image";
import { useState, useRef, useCallback, memo, useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useHighlights } from "@/hooks/useHighlights";

const SliderCard = memo(function SliderCard({
  product,
}: {
  product: {
    name: string;
    description: string;
    image: string;
    emoji: string;
    imageAlt: string;
  };
}) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="menu-slider-card group relative flex-shrink-0 w-[240px] sm:w-[270px] md:w-[300px] rounded-2xl overflow-hidden shadow-cozy hover:shadow-cozy-lg transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="group"
      aria-label={product.name}
    >
      {/* Steam effect */}
      <div
        className="absolute top-0 left-0 right-0 z-10 h-20 pointer-events-none transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <span className="steam-particle" />
        <span className="steam-particle" />
        <span className="steam-particle" />
      </div>

      {/* Sparkle effect */}
      <div
        className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <span className="sparkle" />
        <span className="sparkle" />
        <span className="sparkle" />
        <span className="sparkle" />
      </div>

      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
        {imgError || !product.image ? (
          <div className="w-full h-full flex items-center justify-center bg-sakura-pink/30">
            <span className="text-7xl" role="img" aria-label={product.name}>
              {product.emoji}
            </span>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 240px, (max-width: 768px) 270px, 300px"
            onError={() => setImgError(true)}
          />
        )}
        {/* Gradient overlay at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-4 menu-slider-card-body">
        <h3 className="text-base md:text-lg font-bold text-foreground font-heading flex items-center gap-2">
          <span role="img" aria-hidden="true">{product.emoji}</span>
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );
});

export default function MenuProductSlider() {
  const { t, locale } = useLanguage();
  const { products, loading } = useHighlights("menuSlider");
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const sliderProducts = useMemo(
    () =>
      products.map((p) => ({
        name: locale === "ja" && p.title_ja ? p.title_ja : p.title_es,
        description: locale === "ja" && p.description_ja ? p.description_ja : p.description_es,
        image: p.image_url || "",
        emoji: p.emoji,
        imageAlt: locale === "ja" && p.title_ja ? p.title_ja : p.title_es,
      })),
    [products, locale]
  );

  const updateScrollButtons = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollLeft(track.scrollLeft > 10);
    setCanScrollRight(track.scrollLeft < track.scrollWidth - track.clientWidth - 10);
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const scrollAmount = 320;
    track.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        scroll("left");
      } else if (e.key === "ArrowRight") {
        scroll("right");
      }
    },
    [scroll]
  );

  return (
    <section
      className="w-full py-16 px-5 menu-slider-section overflow-hidden"
      aria-label={t.menuSlider.sectionTitle}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading">
            {t.menuSlider.sectionTitle}
          </h2>
          <p className="mt-3 text-text-secondary text-sm md:text-base">
            {t.menuSlider.subtitle}
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none menu-slider-fade-left" />
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none menu-slider-fade-right" />

          {/* Navigation arrows */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-wood-light/90 border-2 border-soft-wood shadow-cozy flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? "opacity-100 hover:bg-sakura-pink/40 hover:scale-110"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll left"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-foreground">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-wood-light/90 border-2 border-soft-wood shadow-cozy flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? "opacity-100 hover:bg-sakura-pink/40 hover:scale-110"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll right"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-foreground">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide py-2 px-1"
            role="region"
            aria-label={t.menuSlider.carouselLabel}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onScroll={updateScrollButtons}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[240px] sm:w-[270px] md:w-[300px] rounded-2xl overflow-hidden shadow-cozy animate-pulse"
                  >
                    <div className="w-full bg-soft-wood/30" style={{ aspectRatio: "3/4" }} />
                    <div className="p-4 bg-wood-light/60">
                      <div className="h-4 bg-soft-wood/30 rounded w-2/3 mb-2" />
                      <div className="h-3 bg-soft-wood/20 rounded w-full" />
                    </div>
                  </div>
                ))
              : sliderProducts.map((product, index) => (
                  <SliderCard key={index} product={product} />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
