"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import { useHighlights } from "@/hooks/useHighlights";

const FALLBACK_PRODUCTS = [
  {
    id: "fallback-1",
    price: "15.00",
    image: "/images/product-mochis-pack.jpg",
    inStock: true,
  },
  {
    id: "fallback-2",
    price: "10.00",
    image: "/images/product-mochis-box.jpg",
    inStock: true,
  },
];

interface DisplayProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  inStock: boolean;
}

export default function TiendaProducts() {
  const { t, locale } = useLanguage();
  const { products: highlightProducts, loading } = useHighlights("storeHighlights");

  const displayProducts: DisplayProduct[] = useMemo(() => {
    if (highlightProducts.length > 0) {
      return highlightProducts.map((p) => ({
        id: p.id,
        name: locale === "ja" && p.title_ja ? p.title_ja : p.title_es,
        description: locale === "ja" && p.description_ja ? p.description_ja : p.description_es,
        price: p.price,
        image: p.image_url || "",
        inStock: p.enabled,
      }));
    }

    return FALLBACK_PRODUCTS.map((p, index) => {
      const translation = t.tiendaProducts.products[index];
      return {
        id: p.id,
        name: translation?.name ?? "",
        description: translation?.description ?? "",
        price: p.price,
        image: p.image,
        inStock: p.inStock,
      };
    });
  }, [highlightProducts, locale, t.tiendaProducts.products]);

  return (
    <section className="w-full py-16 px-5 bg-warm-cream">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10 font-heading">
          {t.tiendaProducts.sectionTitle}
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-wood-light/80 border border-soft-wood/30 overflow-hidden shadow-cozy animate-pulse"
              >
                <div className="aspect-square bg-soft-wood/20" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-3/4 rounded bg-soft-wood/20" />
                  <div className="h-4 w-full rounded bg-soft-wood/20" />
                  <div className="h-6 w-1/4 rounded bg-soft-wood/20" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 ${
              displayProducts.length === 1
                ? "sm:grid-cols-1 max-w-md mx-auto"
                : displayProducts.length >= 3
                  ? "sm:grid-cols-2 lg:grid-cols-3"
                  : "sm:grid-cols-2"
            } gap-8`}
          >
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl bg-wood-light/80 border border-soft-wood/30 overflow-hidden shadow-cozy hover:shadow-cozy-lg transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  {product.inStock && (
                    <span className="absolute top-3 left-3 rounded-full bg-ukiyo-navy px-3 py-1 text-xs font-semibold text-white font-heading">
                      {t.tiendaProducts.available}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground mb-2 font-heading">
                    {product.name}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div>
                    <span className="text-xl font-bold text-ukiyo-navy font-heading">
                      {product.price}€
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
