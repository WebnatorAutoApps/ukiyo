"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const prices = {
  hot: ["3.50", "4.00", "4.00", "4.50"],
  cold: ["5.00", "5.50", "5.50", "5.00"],
};

export default function SpecialtyDrinks() {
  const [isHot, setIsHot] = useState(true);
  const { t } = useLanguage();

  const drinkTranslations = isHot ? t.drinks.hotDrinks : t.drinks.coldDrinks;
  const drinkPrices = isHot ? prices.hot : prices.cold;

  return (
    <section className="w-full py-16 px-5 bg-warm-cream">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3 font-heading">
          {t.drinks.sectionTitle}
        </h2>
        <p className="text-center text-text-secondary mb-8">
          {t.drinks.subtitle}
        </p>

        {/* Coffee Bean Toggle */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className={`text-sm font-semibold font-heading transition-colors ${isHot ? "text-ukiyo-navy" : "text-text-secondary"}`}>
            {t.drinks.hot}
          </span>
          <button
            onClick={() => setIsHot(!isHot)}
            className="relative w-16 h-8 rounded-full bg-soft-wood/50 transition-colors focus:outline-none focus:ring-2 focus:ring-sakura-pink"
            aria-label={isHot ? t.drinks.switchToCold : t.drinks.switchToHot}
          >
            <span
              className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center text-xs ${
                isHot
                  ? "left-1 bg-ukiyo-navy"
                  : "left-9 bg-sakura-pink"
              }`}
            >
              {/* Coffee bean / ice icon */}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                {isHot ? (
                  // Coffee bean
                  <>
                    <ellipse cx="7" cy="7" rx="5" ry="6" fill="white" />
                    <path d="M7 1.5 C5 4, 5 10, 7 12.5" stroke="currentColor" strokeWidth="1" fill="none" className="text-ukiyo-navy" />
                  </>
                ) : (
                  // Ice crystal
                  <>
                    <line x1="7" y1="1" x2="7" y2="13" stroke="white" strokeWidth="1.5" />
                    <line x1="1" y1="7" x2="13" y2="7" stroke="white" strokeWidth="1.5" />
                    <line x1="3" y1="3" x2="11" y2="11" stroke="white" strokeWidth="1" />
                    <line x1="11" y1="3" x2="3" y2="11" stroke="white" strokeWidth="1" />
                  </>
                )}
              </svg>
            </span>
          </button>
          <span className={`text-sm font-semibold font-heading transition-colors ${!isHot ? "text-ukiyo-navy" : "text-text-secondary"}`}>
            {t.drinks.cold}
          </span>
        </div>

        {/* Drinks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {drinkTranslations.map((drink, index) => (
            <div
              key={`${isHot ? "hot" : "cold"}-${index}`}
              className="rounded-2xl bg-wood-light/60 border border-soft-wood/30 p-5 shadow-cozy hover:shadow-cozy-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-foreground font-heading">{drink.name}</h3>
                  <p className="mt-1 text-sm text-text-secondary leading-relaxed">{drink.description}</p>
                </div>
                <span className="text-lg font-bold text-ukiyo-navy whitespace-nowrap font-heading">
                  {drinkPrices[index]}€
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
