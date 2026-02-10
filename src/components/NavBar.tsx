"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 w-full bg-warm-cream/95 backdrop-blur-sm border-b border-soft-wood/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/">
          <Image
            src="/images/logo-ukiyo.png"
            alt={t.logoAlt}
            width={200}
            height={210}
            className="h-11 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground font-heading">
          <Link
            href="/menu"
            className="hover:text-ukiyo-navy transition-colors"
          >
            {t.nav.menu}
          </Link>
          <Link
            href="/"
            className="hover:text-ukiyo-navy transition-colors"
          >
            {t.nav.aboutUs}
          </Link>
          <LanguageToggle />
          <Link
            href="/tienda"
            className="rounded-full bg-sakura-pink px-6 py-2.5 text-sm font-bold text-ukiyo-navy hover:bg-ukiyo-navy hover:text-white transition-all shadow-cozy hover:shadow-cozy-lg"
          >
            {t.nav.buyNow}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-foreground"
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
        <div className="md:hidden border-t border-soft-wood/30 bg-warm-cream">
          <div className="flex flex-col px-5 py-4 gap-4 text-sm font-medium text-foreground font-heading">
            <Link
              href="/menu"
              className="hover:text-ukiyo-navy transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.menu}
            </Link>
            <Link
              href="/"
              className="hover:text-ukiyo-navy transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.aboutUs}
            </Link>
            <div className="py-1">
              <LanguageToggle />
            </div>
            <Link
              href="/tienda"
              className="rounded-full bg-sakura-pink px-6 py-2.5 text-sm font-bold text-ukiyo-navy hover:bg-ukiyo-navy hover:text-white transition-all text-center"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.buyNow}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
