import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1224/360" }}>
        <Image
          src="/images/hero-banner.png"
          alt="Mochis artesanales y bubble tea en Madrid Norte - Ukiyo Mochis & Coffee en Fuencarral-El Pardo"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 px-4">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center drop-shadow-lg">
            Mochis Artesanales y Café de Especialidad en Madrid Norte
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/90 text-center max-w-2xl drop-shadow">
            Descubre los mejores mochis japoneses, bubble tea y café en Fuencarral-El Pardo
          </p>
        </div>
      </div>
    </section>
  );
}
