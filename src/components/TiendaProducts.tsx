import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Mochis artesanales Ukiyo",
    description:
      "Descubre nuestros mochis artesanales, inspirados en la tradición japonesa. Elaborados diariamente a mano, suaves por fuera y cremosos por dentro, con sabores como oreo, nutella, maracuyá y más.",
    price: 15.0,
    image: "/images/product-mochis-pack.jpg",
    href: "/mochis-artesanales-ukiyo",
    inStock: true,
  },
  {
    id: 2,
    name: "Mochis artesanales de Ukiyo",
    description:
      "Mochis artesanales inspirados en la tradición japonesa. Cada bocado es suave por fuera y cremoso por dentro, con sabores como oreo, nutella, maracuyá y más. Elaborados a mano con ingredientes de alta calidad.",
    price: 10.0,
    image: "/images/product-mochis-box.jpg",
    href: "/mochis-artesanales-de-ukiyo",
    inStock: true,
  },
];

export default function TiendaProducts() {
  return (
    <section className="w-full py-16 px-5">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          Nuestros productos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="group block rounded-2xl bg-white border border-border-color overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                {product.inStock && (
                  <span className="absolute top-3 left-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                    Disponible
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    €{product.price.toFixed(2)}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white group-hover:bg-primary-hover transition-colors">
                    Ver producto
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
