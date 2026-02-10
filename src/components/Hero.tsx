"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Fallback background — visible if image fails to load */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #5D5068 0%, #3D2E2E 50%, #5D5068 100%)",
        }}
      />

      {/* Scroll transition layer */}
      <div
        className={`absolute inset-0 bg-warm-cream transition-opacity duration-1000 z-[1] ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh]">
        {!imageError && (
          <Image
            src="/images/hero-banner.jpg"
            alt="Ukiyo Mochis and Coffee - Mochis artesanales y café de especialidad en Madrid Norte"
            fill
            className={`object-cover object-center transition-opacity duration-1000 ${
              scrolled ? "opacity-30" : "opacity-100"
            }`}
            priority
            sizes="100vw"
            onError={() => setImageError(true)}
          />
        )}

        {/* Gradient overlay for text readability */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(61,46,46,0.5) 0%, rgba(93,80,104,0.35) 40%, rgba(93,80,104,0.35) 60%, rgba(61,46,46,0.6) 100%)",
          }}
        />

        {/* Falling petals */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
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

        {/* Navigation overlay */}
        <nav className="absolute top-0 left-0 right-0 z-20">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <Link href="/">
              <Image
                src="/images/logo-ukiyo.png"
                alt="Ukiyo Mochis & Coffee - Mochis artesanales y café en Madrid Norte"
                width={200}
                height={210}
                className="h-11 w-auto brightness-0 invert drop-shadow-lg"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium font-heading">
              <Link
                href="#sobre-nosotros"
                className="text-white/90 hover:text-white transition-colors drop-shadow"
              >
                Sobre Nosotros
              </Link>
              <Link
                href="#preguntas-frecuentes"
                className="text-white/90 hover:text-white transition-colors drop-shadow"
              >
                FAQ
              </Link>
              <Link
                href="/tienda"
                className="rounded-full bg-sakura-pink px-6 py-2.5 text-sm font-bold text-ukiyo-navy hover:bg-white transition-all shadow-cozy hover:shadow-cozy-lg"
              >
                Compra Ahora
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-white drop-shadow"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {menuOpen && (
            <div className="md:hidden bg-ukiyo-navy/90 backdrop-blur-sm border-t border-white/10">
              <div className="flex flex-col px-5 py-4 gap-4 text-sm font-medium text-white font-heading">
                <Link
                  href="#sobre-nosotros"
                  className="hover:text-sakura-pink transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Sobre Nosotros
                </Link>
                <Link
                  href="#preguntas-frecuentes"
                  className="hover:text-sakura-pink transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  href="/tienda"
                  className="rounded-full bg-sakura-pink px-6 py-2.5 text-sm font-bold text-ukiyo-navy hover:bg-white transition-all text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Compra Ahora
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Hero content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-[4]">
          <span className="mb-3 text-sm md:text-base text-sakura-pink font-heading tracking-widest uppercase drop-shadow">
            ~ El mundo flotante ~
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center drop-shadow-lg font-heading leading-tight">
            Mochis Artesanales y Café
            <br />
            <span className="text-sakura-pink drop-shadow">de Especialidad</span>
          </h1>
          <p className="mt-4 text-sm md:text-lg text-white/90 text-center max-w-2xl drop-shadow leading-relaxed">
            Sumérgete en una experiencia cozy de sabores japoneses en el corazón de Madrid Norte
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="/tienda"
              className="rounded-full bg-sakura-pink px-8 py-3 text-sm font-semibold text-ukiyo-navy hover:bg-sakura-pink/80 transition-all shadow-cozy hover:shadow-cozy-lg font-heading"
            >
              Compra Ahora
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
