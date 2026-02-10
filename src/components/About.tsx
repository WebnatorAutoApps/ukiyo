"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="sobre-nosotros" className="w-full py-16 px-5 bg-surface">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Image + Sleeping Cat */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-cozy" style={{ aspectRatio: "612/464" }}>
              <Image
                src="/images/about-photo.jpg"
                alt={t.about.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Sleeping Cat SVG */}
            <div className="absolute -bottom-6 -right-4 md:-right-8">
              <svg
                width="120"
                height="80"
                viewBox="0 0 120 80"
                className="cat-breathe"
                aria-hidden="true"
              >
                {/* Cat body */}
                <ellipse cx="60" cy="55" rx="40" ry="20" fill="#EBC8A6" />
                {/* Cat head */}
                <circle cx="30" cy="45" r="18" fill="#EBC8A6" />
                {/* Ears */}
                <polygon points="18,30 24,15 32,28" fill="#EBC8A6" />
                <polygon points="32,28 38,15 44,30" fill="#EBC8A6" />
                <polygon points="20,28 24,18 30,27" fill="#FFD1DC" />
                <polygon points="34,27 38,18 42,28" fill="#FFD1DC" />
                {/* Closed eyes */}
                <path d="M22,44 Q26,42 30,44" stroke="#5D5068" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M32,44 Q36,42 40,44" stroke="#5D5068" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* Nose */}
                <ellipse cx="31" cy="48" rx="2" ry="1.5" fill="#FFD1DC" />
                {/* Whiskers */}
                <line x1="14" y1="46" x2="24" y2="47" stroke="#5D5068" strokeWidth="0.8" />
                <line x1="14" y1="50" x2="24" y2="49" stroke="#5D5068" strokeWidth="0.8" />
                <line x1="38" y1="47" x2="48" y2="46" stroke="#5D5068" strokeWidth="0.8" />
                <line x1="38" y1="49" x2="48" y2="50" stroke="#5D5068" strokeWidth="0.8" />
                {/* Tail */}
                <path d="M100,55 Q115,40 105,30" stroke="#EBC8A6" strokeWidth="6" fill="none" strokeLinecap="round" />
                {/* Zzz */}
                <text x="50" y="25" fill="#5D5068" fontSize="10" fontWeight="bold" opacity="0.5">z</text>
                <text x="58" y="18" fill="#5D5068" fontSize="8" fontWeight="bold" opacity="0.4">z</text>
                <text x="64" y="12" fill="#5D5068" fontSize="6" fontWeight="bold" opacity="0.3">z</text>
              </svg>
            </div>
          </div>

          {/* Right: Text content */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight font-heading">
              {t.about.heading}
            </h2>

            {/* Japanese quote */}
            <blockquote className="mt-4 pl-4 border-l-4 border-sakura-pink italic text-ukiyo-navy">
              <p className="text-base font-heading">&ldquo;{t.about.quote}&rdquo;</p>
            </blockquote>

            <p className="mt-4 text-base text-text-body leading-relaxed">
              {t.about.paragraph1}
            </p>
            <p className="mt-3 text-base text-text-body leading-relaxed">
              {t.about.paragraph2}
            </p>
            <Link
              href="/tienda"
              className="mt-6 inline-block rounded-full bg-ukiyo-navy px-8 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors font-heading"
            >
              {t.about.buyButton}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
