"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback, memo } from "react";

const mochiProducts = [
  {
    name: "Mochi de Oreo",
    description: "Crujiente galleta Oreo envuelta en suave mochi artesanal",
    price: "3,50€",
    image: "https://images.unsplash.com/photo-1631206616829-3e5e6e61db9e?w=400&h=400&fit=crop&q=80",
    emoji: "🍪",
  },
  {
    name: "Mochi de Matcha",
    description: "Auténtico matcha japonés en un mochi cremoso y delicado",
    price: "3,50€",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop&q=80",
    emoji: "🍵",
  },
  {
    name: "Mochi de Mango",
    description: "Explosión tropical de mango maduro en mochi esponjoso",
    price: "3,50€",
    image: "https://images.unsplash.com/photo-1582716401356-b0e6ee11e8f5?w=400&h=400&fit=crop&q=80",
    emoji: "🥭",
  },
];

// Duplicate for seamless infinite scroll
const carouselItems = [...mochiProducts, ...mochiProducts];

const MochiProductCard = memo(function MochiProductCard({
  product,
}: {
  product: (typeof mochiProducts)[0];
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
        {imgError ? (
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
        {/* Price tag */}
        <div className="absolute top-3 right-3 z-10 bg-ukiyo-navy/90 text-white text-sm font-bold px-3 py-1 rounded-full font-heading">
          {product.price}
        </div>
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
  const trackRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const scrollPosRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

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
  }, []);

  return (
    <section
      className="w-full py-14 px-5 mochi-counter-section overflow-hidden"
      aria-label="Nuestros Mochis"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading">
            Nuestros Mochis
          </h2>
          <p className="mt-2 text-text-secondary text-sm md:text-base">
            Nuestros sabores más populares, hechos a mano cada día
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none mochi-counter-fade-left" />
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none mochi-counter-fade-right" />

          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide py-2 px-1"
            role="region"
            aria-label="Carrusel de mochis"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {carouselItems.map((product, index) => (
              <MochiProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
