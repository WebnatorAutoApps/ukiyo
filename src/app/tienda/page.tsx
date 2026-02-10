import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import TiendaHero from "@/components/TiendaHero";
import TiendaProducts from "@/components/TiendaProducts";
import TiendaTestimonials from "@/components/TiendaTestimonials";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LofiPlayer from "@/components/LofiPlayer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title:
    "Tienda de Mochis Artesanales y Bubble Tea en Madrid Norte",
  description:
    "Compra mochis artesanales, bubble tea y café de especialidad en Madrid Norte. Pide con Glovo o visítanos en Fuencarral-El Pardo. Packs de mochis japoneses hechos a mano con ingredientes premium.",
  alternates: {
    canonical: "/tienda",
  },
  openGraph: {
    title: "Tienda de Mochis Artesanales | Ukiyo Madrid Norte",
    description:
      "Compra mochis artesanales y bubble tea en Madrid Norte. Envío a domicilio con Glovo.",
    url: "https://www.mochisukiyo.com/tienda",
    images: [
      {
        url: "/images/tienda-hero.png",
        width: 1920,
        height: 600,
        alt: "Tienda Ukiyo Mochis - Pide mochis artesanales en Madrid Norte",
      },
    ],
  },
};

export default function TiendaPage() {
  return (
    <>
      <NavBar />
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Tienda", href: "/tienda" },
          { name: "Mochis y Bubble Tea en Madrid Norte" },
        ]}
      />
      <main>
        <TiendaHero />
        <TiendaProducts />
        <TiendaTestimonials />
      </main>
      <Footer />
      <WhatsAppButton />
      <LofiPlayer />
    </>
  );
}
