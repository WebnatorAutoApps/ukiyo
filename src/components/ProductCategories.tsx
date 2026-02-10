"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const categories = [
  {
    title: "Momentos de dulzura,",
    subtitle: "sabores únicos",
    description:
      "Descubre nuestros mochis artesanales elaborados a mano en Madrid Norte con ingredientes de primera calidad e inspiración japonesa.",
    image: "/images/mochi-product-1.jpg",
    imageAlt: "Mochis artesanales japoneses en Madrid Norte - Ukiyo Mochis & Coffee Fuencarral",
    link: "/tienda",
    buttonText: "Explorar",
    aspectRatio: "628/558",
  },
  {
    title: "Bubble Tea",
    description:
      "Refrescantes bubble teas con sabores auténticos y toppings únicos. Boba tea artesanal en Madrid Norte.",
    image: "/images/bubble-tea.jpg",
    imageAlt: "Bubble tea artesanal en Madrid Norte - Boba tea y té de burbujas en Ukiyo",
    link: "/tienda",
    buttonText: "Explorar",
    aspectRatio: "543/254",
  },
  {
    title: "Sabores únicos disponibles",
    description:
      "Variedad de sabores que combinan tradición japonesa con toques creativos. Anko, matcha, maracuyá y más en Madrid Norte.",
    image: "/images/mochi-lifestyle.jpg",
    imageAlt: "Variedad de mochis y sabores japoneses en Madrid Norte - anko, matcha y más",
    link: "/tienda",
    buttonText: "Explorar",
    aspectRatio: "541/267",
  },
];

function MochiCard({ category, index }: { category: typeof categories[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative rounded-2xl overflow-hidden bg-wood-texture shadow-cozy hover:shadow-cozy-lg transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Steam/sparkle effects on hover */}
      {hovered && (
        <div className="absolute top-0 left-0 right-0 z-10 h-20 pointer-events-none">
          <span className="steam-particle" />
          <span className="steam-particle" />
          <span className="steam-particle" />
        </div>
      )}
      {hovered && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <span className="sparkle" />
          <span className="sparkle" />
          <span className="sparkle" />
          <span className="sparkle" />
        </div>
      )}

      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: index === 0 ? "1/1" : category.aspectRatio }}
      >
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes={index === 0 ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, 50vw"}
        />
      </div>
      <div className="p-5 bg-wood-light/80">
        <h2 className="text-lg font-bold text-foreground leading-tight font-heading">
          {category.title}
          {category.subtitle && (
            <>
              <br />
              <span className="text-ukiyo-navy">{category.subtitle}</span>
            </>
          )}
        </h2>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          {category.description}
        </p>
        <Link
          href={category.link}
          className="mt-4 inline-block rounded-full bg-ukiyo-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors font-heading"
        >
          {category.buttonText}
        </Link>
      </div>
    </div>
  );
}

export default function ProductCategories() {
  return (
    <section className="w-full py-16 px-5 bg-warm-cream">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10 font-heading">
          Nuestras Delicias
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First card - tall */}
          <MochiCard category={categories[0]} index={0} />

          {/* Second and third cards stacked */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {categories.slice(1).map((category, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row rounded-2xl overflow-hidden bg-wood-texture shadow-cozy hover:shadow-cozy-lg transition-all duration-300"
              >
                <div
                  className="relative w-full sm:w-1/2 min-h-[200px] overflow-hidden"
                  style={{ aspectRatio: category.aspectRatio }}
                >
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5 flex flex-col justify-center sm:w-1/2 bg-wood-light/80">
                  <h3 className="text-lg font-bold text-foreground font-heading">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {category.description}
                  </p>
                  <Link
                    href={category.link}
                    className="mt-4 inline-block w-fit rounded-full bg-ukiyo-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors font-heading"
                  >
                    {category.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
