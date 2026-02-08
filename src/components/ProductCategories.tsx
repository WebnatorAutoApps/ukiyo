import Image from "next/image";
import Link from "next/link";

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

export default function ProductCategories() {
  return (
    <section className="w-full py-16 px-5 bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First card - tall */}
          <div className="group rounded-xl overflow-hidden bg-white shadow-sm border border-border-color hover:shadow-md transition-shadow">
            <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
              <Image
                src={categories[0].image}
                alt={categories[0].imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-5">
              <h2 className="text-lg font-bold text-foreground leading-tight">
                {categories[0].title}
                <br />
                <span className="text-primary">{categories[0].subtitle}</span>
              </h2>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                {categories[0].description}
              </p>
              <Link
                href={categories[0].link}
                className="mt-4 inline-block rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
              >
                {categories[0].buttonText}
              </Link>
            </div>
          </div>

          {/* Second and third cards stacked */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {categories.slice(1).map((category, index) => (
              <div
                key={index}
                className="group rounded-xl overflow-hidden bg-white shadow-sm border border-border-color hover:shadow-md transition-shadow flex flex-col sm:flex-row"
              >
                <div
                  className="relative w-full sm:w-1/2 min-h-[200px]"
                  style={{ aspectRatio: category.aspectRatio }}
                >
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5 flex flex-col justify-center sm:w-1/2">
                  <h3 className="text-lg font-bold text-foreground">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {category.description}
                  </p>
                  <Link
                    href={category.link}
                    className="mt-4 inline-block w-fit rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
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
