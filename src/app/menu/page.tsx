import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import NuestroMenu from "@/components/NuestroMenu";
import SpecialtyDrinks from "@/components/SpecialtyDrinks";
import ProductCategories from "@/components/ProductCategories";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LofiPlayer from "@/components/LofiPlayer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title:
    "Menú | Mochis, Bubble Tea, Brunch y Tapas en Madrid Norte",
  description:
    "Consulta la carta completa de Ukiyo Mochis & Coffee en Madrid Norte. Mochis artesanales, bubble tea, café de especialidad, brunch, tapas y más. Precios y descripción de todos nuestros productos.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Menú de Ukiyo Mochis & Coffee | Madrid Norte",
    description:
      "Carta completa: mochis artesanales, bubble tea, café, brunch y tapas. Visítanos en Fuencarral-El Pardo, Madrid Norte.",
    url: "https://www.mochisukiyo.com/menu",
    images: [
      {
        url: "/images/hero-storefront.jpg",
        width: 1224,
        height: 688,
        alt: "Menú de Ukiyo Mochis & Coffee - Mochis artesanales, bubble tea y más en Madrid Norte",
      },
    ],
  },
};

export default function MenuPage() {
  return (
    <>
      <NavBar />
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Menú", href: "/menu" },
          { name: "Carta completa de Ukiyo Mochis & Coffee" },
        ]}
      />
      <main>
        <ProductCategories />
        <SpecialtyDrinks />
        <NuestroMenu />
      </main>
      <Footer />
      <WhatsAppButton />
      <LofiPlayer />
    </>
  );
}
