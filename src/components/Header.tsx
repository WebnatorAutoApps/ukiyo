"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [policiesOpen, setPoliciesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-warm-cream/95 backdrop-blur-sm border-b border-soft-wood/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/">
          <Image
            src="/images/logo-ukiyo.png"
            alt="Ukiyo Mochis & Coffee - Mochis artesanales y café en Madrid Norte"
            width={200}
            height={210}
            className="h-11 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground font-heading">
          <Link
            href="/"
            className="hover:text-ukiyo-navy transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/tienda"
            className="hover:text-ukiyo-navy transition-colors"
          >
            Tienda
          </Link>
          <div className="relative">
            <button
              onClick={() => setPoliciesOpen(!policiesOpen)}
              className="flex items-center gap-1 hover:text-ukiyo-navy transition-colors"
            >
              Nuestras políticas
              <svg
                className={`w-4 h-4 transition-transform ${policiesOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {policiesOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-warm-cream shadow-cozy-lg border border-soft-wood/30 py-2">
                <Link
                  href="/terms-and-conditions"
                  className="block px-4 py-2 text-sm text-text-body hover:bg-sakura-pink/30 transition-colors rounded-lg mx-1"
                >
                  Términos y Condiciones
                </Link>
                <Link
                  href="/privacy-policy"
                  className="block px-4 py-2 text-sm text-text-body hover:bg-sakura-pink/30 transition-colors rounded-lg mx-1"
                >
                  Política de Privacidad
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-foreground"
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
        <div className="md:hidden border-t border-soft-wood/30 bg-warm-cream">
          <nav className="flex flex-col px-5 py-4 gap-4 text-sm font-medium text-foreground font-heading">
            <Link href="/" className="hover:text-ukiyo-navy transition-colors">
              Inicio
            </Link>
            <Link href="/tienda" className="hover:text-ukiyo-navy transition-colors">
              Tienda
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-ukiyo-navy transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="/privacy-policy" className="hover:text-ukiyo-navy transition-colors">
              Política de Privacidad
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
