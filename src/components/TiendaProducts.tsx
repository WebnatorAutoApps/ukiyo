"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

const productData = [
  {
    id: 1,
    price: 15.0,
    image: "/images/product-mochis-pack.jpg",
    href: "/mochis-artesanales-ukiyo",
    inStock: true,
  },
  {
    id: 2,
    price: 10.0,
    image: "/images/product-mochis-box.jpg",
    href: "/mochis-artesanales-de-ukiyo",
    inStock: true,
  },
];

export default function TiendaProducts() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-16 px-5 bg-warm-cream">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10 font-heading">
          {t.tiendaProducts.sectionTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {productData.map((product, index) => {
            const productTranslation = t.tiendaProducts.products[index];
            return (
              <Link
                key={product.id}
                href={product.href}
                className="group block rounded-2xl bg-wood-light/80 border border-soft-wood/30 overflow-hidden shadow-cozy hover:shadow-cozy-lg transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={productTranslation.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  {product.inStock && (
                    <span className="absolute top-3 left-3 rounded-full bg-ukiyo-navy px-3 py-1 text-xs font-semibold text-white font-heading">
                      {t.tiendaProducts.available}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground mb-2 font-heading">
                    {productTranslation.name}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                    {productTranslation.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-ukiyo-navy font-heading">
                      {product.price.toFixed(2)}€
                    </span>
                    <span className="inline-flex items-center rounded-full bg-ukiyo-navy px-5 py-2 text-sm font-semibold text-white group-hover:bg-primary-hover transition-colors font-heading">
                      {t.tiendaProducts.viewProduct}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
