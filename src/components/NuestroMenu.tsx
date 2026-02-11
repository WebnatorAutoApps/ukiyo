"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

function CherryBlossom({ index }: { index: number }) {
  const delays = [0, 1.2, 2.4, 0.8, 1.8, 3.0];
  const lefts = [10, 30, 55, 75, 90, 45];
  const sizes = [14, 10, 12, 10, 14, 11];

  return (
    <span
      className="menu-petal pointer-events-none absolute"
      style={{
        left: `${lefts[index % lefts.length]}%`,
        animationDelay: `${delays[index % delays.length]}s`,
        fontSize: `${sizes[index % sizes.length]}px`,
      }}
      aria-hidden="true"
    >
      🌸
    </span>
  );
}

function TagBadge({ tag, t }: { tag: string; t: ReturnType<typeof useLanguage>["t"] }) {
  if (tag === "nuevo") {
    return (
      <span className="menu-nuevo-tag inline-flex items-center rounded-full bg-red-500/90 px-2.5 py-0.5 text-[11px] font-bold text-white tracking-wide">
        {t.menu.nuevo}
      </span>
    );
  }
  if (tag === "bestSeller") {
    return (
      <span className="inline-flex items-center rounded-full bg-ukiyo-navy/90 px-2.5 py-0.5 text-[11px] font-bold text-white tracking-wide">
        ⭐ {t.menu.bestSeller}
      </span>
    );
  }
  if (tag === "popular") {
    return (
      <span className="inline-flex items-center rounded-full bg-sakura-pink px-2.5 py-0.5 text-[11px] font-bold text-foreground tracking-wide">
        🔥 {t.menu.popular}
      </span>
    );
  }
  if (tag === "seasonal") {
    return (
      <span className="seasonal-badge text-[11px]">
        {t.menu.seasonal}
      </span>
    );
  }
  return null;
}

function FeaturedCard({
  highlight,
  t,
}: {
  highlight: {
    name: string;
    description: string;
    price: string;
    tag: string;
    image: string;
    imageAlt: string;
  };
  t: ReturnType<typeof useLanguage>["t"];
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-wood-texture shadow-cozy hover:shadow-cozy-lg transition-all duration-300 flex flex-col">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/2" }}>
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center bg-sakura-pink/30">
            <span className="text-5xl">🍡</span>
          </div>
        ) : (
          <Image
            src={highlight.image}
            alt={highlight.imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={() => setImgError(true)}
          />
        )}
        {/* Price tag */}
        <div className="absolute top-3 right-3 z-10 bg-ukiyo-navy/90 text-white text-sm font-bold px-3 py-1.5 rounded-full font-heading shadow-md">
          {highlight.price}
        </div>
        {/* Tag */}
        <div className="absolute top-3 left-3 z-10">
          <TagBadge tag={highlight.tag} t={t} />
        </div>
      </div>
      <div className="p-4 bg-wood-light/80 flex-1 flex flex-col">
        <h3 className="text-base md:text-lg font-bold text-foreground font-heading">
          {highlight.name}
        </h3>
        <p className="mt-1 text-sm text-text-secondary leading-relaxed flex-1">
          {highlight.description}
        </p>
      </div>
    </div>
  );
}

function CategoryTab({
  category,
  isActive,
  onClick,
}: {
  category: { id: string; name: string; emoji: string };
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-heading font-semibold text-sm
        transition-all duration-300 border-2
        ${
          isActive
            ? "bg-wood-texture border-soft-wood text-foreground shadow-cozy-lg scale-105"
            : "bg-wood-light/50 border-soft-wood/30 text-text-secondary hover:bg-wood-light hover:border-soft-wood/60 hover:text-foreground"
        }
      `}
      aria-pressed={isActive}
    >
      <span className="text-lg" aria-hidden="true">
        {category.emoji}
      </span>
      <span>{category.name}</span>
    </button>
  );
}

function MenuItemRow({
  item,
  t,
  isMochiCategory,
}: {
  item: {
    name: string;
    price: string;
    description?: string;
    tag?: string;
    priceModifier?: string;
    hot?: boolean;
  };
  t: ReturnType<typeof useLanguage>["t"];
  isMochiCategory: boolean;
}) {
  const extraClass = item.hot
    ? "menu-item-hot"
    : isMochiCategory
      ? "menu-item-mochi"
      : "";

  return (
    <div className={`rounded-xl bg-wood-light/60 border border-soft-wood/30 p-4 shadow-cozy hover:shadow-cozy-lg transition-all duration-300 ${extraClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm md:text-base font-bold text-foreground font-heading">
              {item.hot && <span className="mr-1" aria-hidden="true">☕</span>}
              {item.name}
            </h4>
            {item.tag && <TagBadge tag={item.tag} t={t} />}
          </div>
          {item.description && (
            <p className="mt-1 text-sm text-text-secondary leading-relaxed">
              {item.description}
            </p>
          )}
          {item.priceModifier && (
            <p className="mt-0.5 text-xs text-ukiyo-navy font-semibold">
              {item.priceModifier}
            </p>
          )}
        </div>
        <span className="text-base md:text-lg font-bold text-ukiyo-navy whitespace-nowrap font-heading">
          {item.price}
        </span>
      </div>
    </div>
  );
}

export default function NuestroMenu() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = t.menu.categories;
  const currentCategory = categories[activeCategory];

  return (
    <section
      id="nuestro-menu"
      className="w-full py-16 px-5 bg-warm-cream overflow-hidden"
      aria-label={t.menu.sectionTitle}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Title with cherry blossom animation */}
        <div className="text-center mb-10 relative">
          <div className="relative inline-block">
            <div className="menu-petal-container absolute inset-0 overflow-hidden pointer-events-none" style={{ top: "-20px", bottom: "-20px", left: "-30px", right: "-30px" }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <CherryBlossom key={i} index={i} />
              ))}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading relative z-10">
              {t.menu.sectionTitle}
            </h2>
          </div>
          <p className="mt-3 text-text-secondary text-sm md:text-base">
            {t.menu.sectionSubtitle}
          </p>
        </div>

        {/* Featured Cards */}
        <div className="mb-12">
          <h3 className="text-lg font-bold text-foreground font-heading mb-5 flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">✨</span>
            {t.menu.featuredTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.menu.highlights.map((highlight, index) => (
              <FeaturedCard key={index} highlight={highlight} t={t} />
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-6 max-w-full">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {categories.map((category, index) => (
              <CategoryTab
                key={category.id}
                category={category}
                isActive={activeCategory === index}
                onClick={() => setActiveCategory(index)}
              />
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          key={currentCategory.id}
        >
          {currentCategory.items.map((item, index) => (
            <div
              key={`${currentCategory.id}-${index}`}
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
            >
              <MenuItemRow
                item={item}
                t={t}
                isMochiCategory={currentCategory.id === "mochis"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
