"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSeason } from "@/context/SeasonContext";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import type { ProductWithTags } from "@/lib/database.types";

function CherryBlossom({ index }: { index: number }) {
  const delays = [0, 1.2, 2.4, 0.8, 1.8, 3.0, 0.5, 2.0, 1.5, 3.5, 0.3, 2.8];
  const lefts = [5, 15, 25, 35, 48, 58, 68, 78, 88, 95, 42, 72];
  const sizes = [14, 10, 12, 10, 14, 11, 13, 10, 12, 14, 11, 13];

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

// Convert database product to menu item format
function productToMenuItem(product: ProductWithTags, locale: string): {
  name: string;
  price: string;
  description?: string;
  tag?: string;
  priceModifier?: string;
  hot?: boolean;
} {
  const name = locale === "ja" && product.title_ja ? product.title_ja : product.title_es;
  const description = locale === "ja" && product.description_ja ? product.description_ja : product.description_es;

  // Map tag: prioritize first tag found
  let tag: string | undefined;
  for (const t of product.product_tags) {
    if (t.tag_name === "nuevo") { tag = "nuevo"; break; }
    if (t.tag_name === "bestSeller") { tag = "bestSeller"; break; }
    if (t.tag_name === "popular") { tag = "popular"; break; }
    if (t.tag_name === "seasonal") { tag = "seasonal"; break; }
  }

  return {
    name,
    price: product.price,
    description,
    tag,
    priceModifier: product.price_modifier ?? undefined,
    hot: product.hot || undefined,
  };
}

// Map DB season values ("fall") to SeasonContext values ("autumn")
const DB_SEASON_MAP: Record<string, string> = { spring: "spring", summer: "summer", fall: "autumn", winter: "winter" };

function isVisibleInSeason(product: ProductWithTags, currentSeason: string): boolean {
  const seasonalTag = product.product_tags.find((t) => t.tag_name === "seasonal");
  if (!seasonalTag) return true;
  return DB_SEASON_MAP[seasonalTag.season ?? ""] === currentSeason;
}

export default function NuestroMenu() {
  const { t, locale } = useLanguage();
  const { season } = useSeason();
  const [activeCategory, setActiveCategory] = useState(0);
  const { products: dbProducts, loading: productsLoading } = useProducts();
  const { categories: dbCategories, loading: categoriesLoading } = useCategories();

  const isLoading = productsLoading || categoriesLoading;

  // Build category tabs from DB
  const categoryTabs = useMemo(() => {
    return dbCategories.map((cat) => ({
      id: cat.id,
      name: locale === "ja" && cat.name_ja ? cat.name_ja : cat.name_es,
      emoji: cat.emoji,
      productTypes: cat.product_types,
    }));
  }, [dbCategories, locale]);

  // For each category, get filtered products
  const currentCategory = categoryTabs[activeCategory];

  const isMochiCategory = currentCategory?.productTypes?.includes("mochis") ?? false;

  const currentItems = useMemo(() => {
    if (!currentCategory) return [];
    const types = new Set(currentCategory.productTypes);
    return dbProducts
      .filter((p) => types.has(p.type))
      .filter((p) => isVisibleInSeason(p, season))
      .map((p) => productToMenuItem(p, locale));
  }, [currentCategory, dbProducts, locale, season]);

  return (
    <section
      id="nuestro-menu"
      className="w-full py-16 px-5 bg-warm-cream overflow-hidden relative"
      aria-label={t.menu.sectionTitle}
    >
      {/* Cherry blossom petals covering entire section */}
      <div className="menu-petal-container absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <CherryBlossom key={i} index={i} />
        ))}
      </div>
      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section Title */}
        <div className="text-center mb-10 relative">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading">
            {t.menu.sectionTitle}
          </h2>
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
        {categoryTabs.length > 0 && (
          <div className="mb-6 max-w-full -mx-3">
            <div className="flex gap-3 overflow-x-auto px-3 py-3 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {categoryTabs.map((category, index) => (
                <CategoryTab
                  key={category.id}
                  category={category}
                  isActive={activeCategory === index}
                  onClick={() => setActiveCategory(index)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          key={currentCategory?.id ?? "loading"}
        >
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-wood-light/60 border border-soft-wood/30 p-4 animate-pulse">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="h-4 bg-soft-wood/30 rounded w-2/3 mb-2" />
                    <div className="h-3 bg-soft-wood/20 rounded w-full" />
                  </div>
                  <div className="h-5 bg-soft-wood/30 rounded w-12" />
                </div>
              </div>
            ))
          ) : currentItems.length === 0 ? (
            <div className="col-span-2 text-center py-8 text-text-secondary">
              <p>{t.menu.noProducts}</p>
            </div>
          ) : (
            currentItems.map((item, index) => (
              <div
                key={`${currentCategory?.id}-${index}`}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
              >
                <MenuItemRow
                  item={item}
                  t={t}
                  isMochiCategory={isMochiCategory}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
