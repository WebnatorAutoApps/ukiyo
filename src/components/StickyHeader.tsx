"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function StickyHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const { t } = useLanguage();

  const updateOpacity = useCallback(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setOpacity(1);
      return;
    }
    const heroHeight = hero.offsetHeight;
    const scrollY = window.scrollY;
    const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
    setOpacity(progress);
  }, []);

  useEffect(() => {
    updateOpacity();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateOpacity();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateOpacity);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateOpacity);
    };
  }, [updateOpacity]);

  const isScrolled = opacity > 0.5;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
      style={{
        backgroundColor: `rgba(255, 245, 225, ${opacity})`,
        borderBottom: opacity > 0.1 ? `1px solid rgba(235, 200, 166, ${opacity * 0.4})` : "none",
        backdropFilter: opacity > 0.05 ? `blur(${opacity * 8}px)` : "none",
        WebkitBackdropFilter: opacity > 0.05 ? `blur(${opacity * 8}px)` : "none",
        boxShadow: opacity > 0.3 ? `0 1px 8px rgba(93, 80, 104, ${opacity * 0.06})` : "none",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/">
          <Image
            src="/images/logo-ukiyo.png"
            alt={t.logoAlt}
            width={200}
            height={210}
            className="h-11 w-auto transition-all duration-300"
            style={{
              filter: isScrolled ? "none" : "brightness(0) invert(1) drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
            }}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium font-heading">
          <Link
            href="/menu"
            className="transition-colors duration-300"
            style={{
              color: isScrolled ? "var(--foreground)" : "rgba(255,255,255,0.9)",
              textShadow: isScrolled ? "none" : "0 1px 3px rgba(0,0,0,0.3)",
            }}
          >
            {t.nav.menu}
          </Link>
          <Link
            href="#sobre-nosotros"
            className="transition-colors duration-300"
            style={{
              color: isScrolled ? "var(--foreground)" : "rgba(255,255,255,0.9)",
              textShadow: isScrolled ? "none" : "0 1px 3px rgba(0,0,0,0.3)",
            }}
          >
            {t.nav.aboutUs}
          </Link>
          <Link
            href="#preguntas-frecuentes"
            className="transition-colors duration-300"
            style={{
              color: isScrolled ? "var(--foreground)" : "rgba(255,255,255,0.9)",
              textShadow: isScrolled ? "none" : "0 1px 3px rgba(0,0,0,0.3)",
            }}
          >
            {t.nav.faq}
          </Link>
          <LanguageToggle variant={isScrolled ? "default" : "transparent"} />
          <Link
            href="/tienda"
            className="rounded-full bg-sakura-pink px-6 py-2.5 text-sm font-bold text-ukiyo-navy hover:bg-white transition-all shadow-cozy hover:shadow-cozy-lg"
          >
            {t.nav.buyNow}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 transition-colors duration-300"
          style={{
            color: isScrolled ? "var(--foreground)" : "white",
            filter: isScrolled ? "none" : "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
          }}
          aria-label={t.nav.toggleMenu}
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
        <div
          className="md:hidden backdrop-blur-sm border-t"
          style={{
            backgroundColor: isScrolled ? "var(--warm-cream)" : "rgba(93, 80, 104, 0.9)",
            borderColor: isScrolled ? "rgba(235, 200, 166, 0.3)" : "rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="flex flex-col px-5 py-4 gap-4 text-sm font-medium font-heading"
            style={{ color: isScrolled ? "var(--foreground)" : "white" }}
          >
            <Link
              href="/menu"
              className="hover:text-sakura-pink transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.menu}
            </Link>
            <Link
              href="#sobre-nosotros"
              className="hover:text-sakura-pink transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.aboutUs}
            </Link>
            <Link
              href="#preguntas-frecuentes"
              className="hover:text-sakura-pink transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.faq}
            </Link>
            <div className="py-1">
              <LanguageToggle variant={isScrolled ? "default" : "transparent"} />
            </div>
            <Link
              href="/tienda"
              className="rounded-full bg-sakura-pink px-6 py-2.5 text-sm font-bold text-ukiyo-navy hover:bg-white transition-all text-center"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.buyNow}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
