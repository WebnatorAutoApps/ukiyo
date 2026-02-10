import Image from "next/image";

export default function TiendaHero() {
  return (
    <section className="w-full">
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "1920/600" }}
      >
        <Image
          src="/images/tienda-hero.png"
          alt="Tienda de mochis artesanales y bubble tea en Madrid Norte - Pide con Glovo desde Fuencarral-El Pardo"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-ukiyo-navy/40 px-4 text-center">
          <span className="mb-3 text-sm text-sakura-pink font-heading tracking-widest uppercase">
            ~ Tienda Online ~
          </span>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-4 font-heading">
            Pide Mochis Artesanales a Domicilio en Madrid Norte
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl mb-6 drop-shadow">
            Disfruta de nuestros packs de mochis japoneses, bubble tea y café de especialidad. ¡Haz tu pedido ahora con Glovo!
          </p>
          <a
            href="https://ufv9.adj.st/?adjust_deeplink=glovoapp%3A%2F%2Fopen%3Flink_type%3Dstore%26store_id%3D496002&adjust_t=s321jkn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-sakura-pink px-8 py-3 text-sm font-semibold text-ukiyo-navy hover:bg-sakura-pink/80 transition-all shadow-cozy font-heading"
          >
            Ordenar con Glovo
          </a>
          <p className="mt-4 flex items-center gap-1.5 text-sm text-white/80">
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </span>
            5 estrellas de satisfacción
          </p>
        </div>
      </div>
    </section>
  );
}
