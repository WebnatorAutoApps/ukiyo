"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative w-full overflow-hidden">
      {/* Fallback background — soft pink gradient matching the storefront illustration */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #FFD1DC 0%, #FFC4D6 30%, #FADADD 60%, #F5E6D3 100%)",
        }}
      />

      <div className="relative w-full min-h-[100vh]">
        {!imageError && (
          <>
            {/* Mobile hero — portrait illustration optimised for small screens */}
            <Image
              src="/images/hero-storefront-mobile.jpg"
              alt={t.hero.imageAlt}
              fill
              className="object-cover object-center md:hidden"
              priority
              sizes="(max-width: 767px) 100vw, 0px"
              onError={() => setImageError(true)}
            />
            {/* Desktop hero — wide storefront image for larger screens */}
            <Image
              src="/images/hero-storefront.jpg"
              alt={t.hero.imageAlt}
              fill
              className="object-cover object-center hidden md:block"
              priority
              sizes="(min-width: 768px) 100vw, 0px"
              onError={() => setImageError(true)}
            />
          </>
        )}

        {/* Soft gradient overlay — lighter to preserve the illustration's pastel tones */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,209,220,0.15) 0%, rgba(255,209,220,0.05) 30%, transparent 50%, rgba(61,46,46,0.3) 80%, rgba(61,46,46,0.55) 100%)",
          }}
        />

        {/* Hero content — centered on mobile, bottom-aligned on desktop */}
        <div className="absolute inset-0 flex flex-col items-center justify-center md:justify-end pb-0 md:pb-14 px-4 z-[4]">
          <span className="mb-3 text-sm md:text-base text-sakura-pink font-heading tracking-widest uppercase drop-shadow">
            {t.hero.tagline}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center drop-shadow-lg font-heading leading-tight">
            {t.hero.title}
            <br />
            <span className="text-sakura-pink drop-shadow">{t.hero.titleAccent}</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
