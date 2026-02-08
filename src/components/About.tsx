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
              alt="Mochis artesanales de Ukiyo"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              Descubre nuestra pasión dulce
            </h2>
            <p className="mt-4 text-base text-text-body leading-relaxed">
              En Ukiyo Mochis &amp; Coffee, elaboramos mochis artesanales que
              combinan tradición japonesa y sabores únicos, acompañados de
              nuestro café de especialidad.
            </p>
            <p className="mt-3 text-base text-text-body leading-relaxed">
              Cada mochi es preparado con ingredientes de primera calidad,
              cuidando cada detalle para ofrecerte una experiencia única que
              fusiona lo mejor de la repostería japonesa con un toque moderno.
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
