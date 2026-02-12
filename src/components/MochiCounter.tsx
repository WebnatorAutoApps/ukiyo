"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { useSeason } from "@/context/SeasonContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { useMochis } from "@/hooks/useMochis";
import type { Season } from "@/components/SeasonalSlider";

interface MochiImageData {
  image: string;
  emoji: string;
  seasonal?: boolean;
  season?: Season;
}

interface MochiProduct {
  name: string;
  description: string;
  image: string;
  emoji: string;
  seasonal?: boolean;
  season?: Season;
}

const STORAGE_BASE = "https://jbpckrdwxzouwfiuggpw.supabase.co/storage/v1/object/public/images/mochis";

const fallbackMochiImages: MochiImageData[] = [
  { image: `${STORAGE_BASE}/mochi-oreo.jpg`, emoji: "🍪" },
  { image: `${STORAGE_BASE}/mochi-nutella.jpg`, emoji: "🍫" },
  { image: `${STORAGE_BASE}/mochi-anko.jpg`, emoji: "🫘" },
  { image: `${STORAGE_BASE}/mochi-matcha.jpg`, emoji: "🍵" },
  { image: `${STORAGE_BASE}/mochi-mango.jpg`, emoji: "🥭" },
  { image: `${STORAGE_BASE}/mochi-lemon-pie.jpg`, emoji: "🍋" },
  { image: `${STORAGE_BASE}/mochi-choco-coco.jpg`, emoji: "🥥" },
  { image: `${STORAGE_BASE}/mochi-maracuya.jpg`, emoji: "🍈" },
  { image: `${STORAGE_BASE}/mochi-tarta-queso-fresa.jpg`, emoji: "🍓" },
  { image: `${STORAGE_BASE}/mochi-pumpkin.jpg`, emoji: "🎃", seasonal: true, season: "autumn" },
  { image: `${STORAGE_BASE}/mochi-raspberry.jpg`, emoji: "🫐", seasonal: true, season: "winter" },
];

// Map database season values to component season values
function mapSeason(dbSeason: string | null): Season | undefined {
  if (!dbSeason) return undefined;
  const map: Record<string, Season> = { spring: "spring", summer: "summer", fall: "autumn", winter: "winter" };
  return map[dbSeason];
}

const MochiProductCard = memo(function MochiProductCard({
  product,
  seasonalBadge,
}: {
  product: MochiProduct;
  seasonalBadge: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="mochi-counter-card group relative flex-shrink-0 w-[260px] sm:w-[280px] rounded-2xl overflow-hidden shadow-cozy hover:shadow-cozy-lg transition-shadow duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="group"
      aria-label={product.name}
      style={{ willChange: "transform" }}
    >
      {/* Seasonal badge */}
      {product.seasonal && (
        <div className="absolute top-3 left-3 z-20">
          <span className="seasonal-badge">
            {product.season === "winter" ? "❄️" : "🎃"} {seasonalBadge}
          </span>
        </div>
      )}

      {/* Steam effect — always rendered, toggled via CSS opacity for perf */}
      <div
        className="absolute top-0 left-0 right-0 z-10 h-20 pointer-events-none transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        <span className="steam-particle" />
        <span className="steam-particle" />
        <span className="steam-particle" />
      </div>

      {/* Sparkle effect — always rendered, toggled via CSS opacity for perf */}
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
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1/1" }}>
        {imgError || !product.image ? (
          <div className="w-full h-full flex items-center justify-center bg-sakura-pink/30">
            <span className="text-6xl" role="img" aria-label={product.name}>
              {product.emoji}
            </span>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="280px"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4 mochi-counter-card-body">
        <h3 className="text-base font-bold text-foreground font-heading flex items-center gap-2">
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

export default function MochiCounter() {
  const { t, locale } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const scrollPosRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const { season } = useSeason();
  const { mochis: dbMochis, hasData } = useMochis();

  // Drag-to-scroll state
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragScrollStartRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  // Build product list from Supabase data or fallback to translations
  const mochiProducts: MochiProduct[] = useMemo(() => {
    if (hasData) {
      return dbMochis.map((m) => {
        const seasonalTag = m.product_tags.find((tag) => tag.tag_name === "seasonal");
        const isSeasonal = !!seasonalTag;
        return {
          name: locale === "ja" && m.title_ja ? m.title_ja : m.title_es,
          description: locale === "ja" && m.description_ja ? m.description_ja : m.description_es,
          image: m.image_url,
          emoji: m.emoji,
          seasonal: isSeasonal,
          season: isSeasonal ? mapSeason(seasonalTag.season) : undefined,
        };
      });
    }
    // Fallback to hardcoded data from translations
    return fallbackMochiImages.map((item, i) => ({
      ...item,
      name: t.mochiCounter.products[i]?.name ?? "",
      description: t.mochiCounter.products[i]?.description ?? "",
    }));
  }, [hasData, dbMochis, locale, t]);

  const visibleProducts = useMemo(
    () => mochiProducts.filter((p) => !p.seasonal || p.season === season),
    [mochiProducts, season]
  );

  const carouselItems = useMemo(
    () => [...visibleProducts, ...visibleProducts],
    [visibleProducts]
  );

  // Reset scroll position when season changes
  useEffect(() => {
    if (trackRef.current) {
      scrollPosRef.current = 0;
      trackRef.current.scrollLeft = 0;
    }
  }, [season]);

  // Keep ref in sync with state
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!trackRef.current) return;
    const scrollAmount = 300;
    if (e.key === "ArrowLeft") {
      trackRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else if (e.key === "ArrowRight") {
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, []);

  // Drag-to-scroll handlers
  const handleDragStart = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = clientX;
    dragScrollStartRef.current = track.scrollLeft;
    isPausedRef.current = true;
    setIsPaused(true);
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    const dx = clientX - dragStartXRef.current;
    trackRef.current.scrollLeft = dragScrollStartRef.current - dx;
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    // Sync auto-scroll position with current manual scroll position
    if (trackRef.current) {
      scrollPosRef.current = trackRef.current.scrollLeft;
    }
  }, []);

  // Mouse event handlers
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  }, [handleDragStart]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  }, [handleDragMove]);

  const onMouseUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  const onMouseLeave = useCallback(() => {
    if (isDraggingRef.current) {
      handleDragEnd();
    }
  }, [handleDragEnd]);

  // Touch event handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  }, [handleDragStart]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  }, [handleDragMove]);

  const onTouchEnd = useCallback(() => {
    handleDragEnd();
    // On touch devices there's no hover state, so resume auto-scroll
    isPausedRef.current = false;
    setIsPaused(false);
  }, [handleDragEnd]);

  // Auto-scroll logic — uses refs to avoid re-creating the animation loop on pause/unpause
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId: number;
    const speed = 0.5; // pixels per frame

    // Sync initial scroll position
    scrollPosRef.current = track.scrollLeft;

    const step = () => {
      if (!isPausedRef.current) {
        scrollPosRef.current += speed;
        // Reset when we've scrolled through the first set of items
        const halfWidth = track.scrollWidth / 2;
        if (scrollPosRef.current >= halfWidth) {
          scrollPosRef.current = 0;
        }
        track.scrollLeft = scrollPosRef.current;
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationId);
  }, [visibleProducts]);

  return (
    <section
      className="w-full py-14 px-5 mochi-counter-section overflow-hidden"
      aria-label={t.mochiCounter.sectionTitle}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading">
            {t.mochiCounter.sectionTitle}
          </h2>
          <p className="mt-2 text-text-secondary text-sm md:text-base">
            {t.mochiCounter.subtitle}
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => { handleDragEnd(); setIsPaused(false); }}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none mochi-counter-fade-left" />
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none mochi-counter-fade-right" />

          <div
            ref={trackRef}
            className={`flex gap-6 overflow-x-auto scrollbar-hide py-2 px-1 ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
            role="region"
            aria-label={t.mochiCounter.carouselLabel}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {carouselItems.map((product, index) => (
              <MochiProductCard key={index} product={product} seasonalBadge={t.mochiCounter.seasonalBadge} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
