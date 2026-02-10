"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Fallback background — soft pink gradient matching the storefront illustration */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #FFD1DC 0%, #FFC4D6 30%, #FADADD 60%, #F5E6D3 100%)",
        }}
      />

      <div className="relative w-full min-h-[100vh]">
        {!imageError && (
          <Image
            src="/images/hero-storefront.jpg"
            alt="Ukiyo Mochis and Coffee - Fachada estilo anime de nuestra tienda de mochis artesanales y café en Madrid Norte"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            onError={() => setImageError(true)}
          />
        )}

        {/* Soft gradient overlay — lighter to preserve the illustration's pastel tones */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,209,220,0.15) 0%, rgba(255,209,220,0.05) 30%, transparent 50%, rgba(61,46,46,0.3) 80%, rgba(61,46,46,0.55) 100%)",
          }}
        />

        {/* Falling cherry blossom petals */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
          {[...Array(8)].map((_, i) => (
            <svg
              key={i}
              className="petal"
              style={{
                left: `${8 + i * 11}%`,
                animationDelay: `${i * 0.9}s`,
                animationDuration: `${5 + i * 0.6}s`,
              }}
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <ellipse cx="9" cy="9" rx="7" ry="4" fill="#FFB6C8" opacity="0.5" transform="rotate(30 9 9)" />
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

        {/* Hero content — positioned at bottom to not obstruct the storefront illustration */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-10 md:pb-14 px-4 z-[4]">
          <span className="mb-3 text-sm md:text-base text-sakura-pink font-heading tracking-widest uppercase drop-shadow">
            ~ El mundo flotante ~
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center drop-shadow-lg font-heading leading-tight">
            Mochis Artesanales y Café
            <br />
            <span className="text-sakura-pink drop-shadow">de Especialidad</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
