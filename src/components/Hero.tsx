"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background transition layer */}
      <div
        className={`absolute inset-0 bg-warm-cream transition-opacity duration-1000 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "938/460" }}>
        <Image
          src="/images/hero-banner.jpg"
          alt="Ukiyo Mochis and Coffee - Mochis artesanales y café de especialidad en Madrid Norte"
          fill
          className={`object-cover transition-opacity duration-1000 ${
            scrolled ? "opacity-30" : "opacity-100"
          }`}
          priority
          sizes="100vw"
        />

        {/* Falling petals */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <svg
              key={i}
              className="petal"
              style={{
                left: `${15 + i * 14}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${5 + i * 0.5}s`,
              }}
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <ellipse cx="8" cy="8" rx="6" ry="4" fill="#FFD1DC" opacity="0.6" transform="rotate(30 8 8)" />
            </svg>
          ))}
        </div>

        {/* Hero content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-ukiyo-navy/30 px-4">
          <span className="mb-3 text-sm md:text-base text-sakura-pink font-heading tracking-widest uppercase">
            ~ El mundo flotante ~
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center drop-shadow-lg font-heading leading-tight">
            Mochis Artesanales y Café
            <br />
            <span className="text-sakura-pink">de Especialidad</span>
          </h1>
          <p className="mt-4 text-sm md:text-lg text-white/90 text-center max-w-2xl drop-shadow leading-relaxed">
            Sumérgete en una experiencia cozy de sabores japoneses en el corazón de Madrid Norte
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="/tienda"
              className="rounded-full bg-sakura-pink px-8 py-3 text-sm font-semibold text-ukiyo-navy hover:bg-sakura-pink/80 transition-all shadow-cozy hover:shadow-cozy-lg font-heading"
            >
              Explorar Sabores
            </a>
            <a
              href="#sobre-nosotros"
              className="rounded-full border-2 border-white/60 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all font-heading"
            >
              Nuestra Historia
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
