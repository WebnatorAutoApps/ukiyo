"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export default function LanguageToggle({ variant = "default" }: { variant?: "default" | "transparent" }) {
  const { locale, setLocale } = useLanguage();

  const isJapanese = locale === "ja";

  const labelActive = variant === "transparent" ? "text-white" : "text-ukiyo-navy";
  const labelInactive = variant === "transparent" ? "text-white/60" : "text-text-secondary";
  const trackBg = variant === "transparent" ? "bg-white/20" : "bg-soft-wood/50";
  const focusRing = variant === "transparent" ? "focus:ring-white/40" : "focus:ring-sakura-pink";

  return (
    <div className="flex items-center gap-3">
      <span
        className={`text-sm font-semibold font-heading transition-colors ${!isJapanese ? labelActive : labelInactive}`}
      >
        ES
      </span>
      <button
        onClick={() => setLocale(isJapanese ? "es" : "ja")}
        className={`relative w-16 h-8 rounded-full ${trackBg} transition-colors focus:outline-none focus:ring-2 ${focusRing}`}
        aria-label={isJapanese ? "Cambiar a Español" : "日本語に切り替え"}
        role="switch"
        aria-checked={isJapanese}
      >
        <span
          className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center text-sm leading-none ${
            isJapanese
              ? "left-9 bg-sakura-pink"
              : "left-1 bg-ukiyo-navy"
          }`}
        >
          <span role="img" aria-hidden="true">
            {isJapanese ? "🇯🇵" : "🇪🇸"}
          </span>
        </span>
      </button>
      <span
        className={`text-sm font-semibold font-heading transition-colors ${isJapanese ? labelActive : labelInactive}`}
      >
        JA
      </span>
    </div>
  );
}
