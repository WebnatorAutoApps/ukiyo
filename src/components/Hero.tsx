import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1224/360" }}>
        <Image
          src="/images/hero-banner.png"
          alt="Ukiyo Mochis - Disfruta de nuestros packs de mochis"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4 drop-shadow-lg">
            ¡Disfruta de nuestros packs de mochis!
          </h1>
        </div>
      </div>
    </section>
  );
}
