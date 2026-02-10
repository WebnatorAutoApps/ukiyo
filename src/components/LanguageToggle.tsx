"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export default function LanguageToggle({ variant = "default" }: { variant?: "default" | "transparent" }) {
  const { locale, setLocale } = useLanguage();

  const isJapanese = locale === "ja";

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => setLocale("es")}
        className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full transition-all font-heading ${
          !isJapanese
            ? variant === "transparent"
              ? "bg-white/20 text-white"
              : "bg-ukiyo-navy text-white"
            : variant === "transparent"
              ? "text-white/60 hover:text-white/80"
              : "text-text-secondary hover:text-foreground"
        }`}
        aria-label="Cambiar a Español"
        aria-current={!isJapanese ? "true" : undefined}
      >
        <span className="text-sm leading-none" role="img" aria-hidden="true">🇪🇸</span>
        ES
      </button>
      <button
        onClick={() => setLocale("ja")}
        className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full transition-all font-heading ${
          isJapanese
            ? variant === "transparent"
              ? "bg-white/20 text-white"
              : "bg-ukiyo-navy text-white"
            : variant === "transparent"
              ? "text-white/60 hover:text-white/80"
              : "text-text-secondary hover:text-foreground"
        }`}
        aria-label="日本語に切り替え"
        aria-current={isJapanese ? "true" : undefined}
      >
        <span className="text-sm leading-none" role="img" aria-hidden="true">🇯🇵</span>
        JA
      </button>
    </div>
  );
}
