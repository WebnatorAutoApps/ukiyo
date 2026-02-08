import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="w-full py-16 px-5 bg-surface">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "612/464" }}>
            <Image
              src="/images/about-photo.jpg"
              alt="Elaboración de mochis artesanales en Ukiyo Mochis & Coffee Madrid Norte"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              Repostería japonesa artesanal en Madrid Norte
            </h2>
            <p className="mt-4 text-base text-text-body leading-relaxed">
              En Ukiyo Mochis &amp; Coffee, somos la tienda de referencia de mochis artesanales en Madrid Norte. Desde nuestro local en Fuencarral-El Pardo, elaboramos a mano dulces japoneses que combinan tradición y creatividad, acompañados de café de especialidad y bubble tea.
            </p>
            <p className="mt-3 text-base text-text-body leading-relaxed">
              Cada mochi es preparado uno a uno con ingredientes de primera calidad, cuidando su textura, sabor y estética. Ofrecemos sabores como anko, matcha, maracuyá, fresa y chocolate, fusionando lo mejor de la repostería japonesa con un toque moderno y madrileño.
            </p>
            <Link
              href="/tienda"
              className="mt-6 inline-block rounded-md bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
            >
              Comprar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
