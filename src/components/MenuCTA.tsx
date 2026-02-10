"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function MenuCTA() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-16 px-5 bg-warm-cream">
      <div className="mx-auto max-w-4xl text-center">
        <div className="rounded-3xl bg-wood-light/60 border-2 border-soft-wood/40 p-10 md:p-14 shadow-cozy">
          <span className="text-4xl mb-4 block" aria-hidden="true">
            🍡
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading mb-3">
            {t.menu.sectionTitle}
          </h2>
          <p className="text-text-secondary text-sm md:text-base mb-8 max-w-lg mx-auto">
            {t.menu.sectionSubtitle}
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full bg-ukiyo-navy px-8 py-3.5 text-base font-bold text-white hover:bg-ukiyo-navy/90 transition-all shadow-cozy hover:shadow-cozy-lg font-heading"
          >
            {t.nav.viewMenu}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
