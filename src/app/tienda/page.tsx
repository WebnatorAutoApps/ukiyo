import type { Metadata } from "next";
import Header from "@/components/Header";
import TiendaHero from "@/components/TiendaHero";
import TiendaTestimonials from "@/components/TiendaTestimonials";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Tienda - Ukiyo Mochis & Coffee",
  description:
    "Mochis artesanales y café de especialidad. Pide con Glovo o descubre nuestros packs de mochis artesanales inspirados en la tradición japonesa.",
};

export default function TiendaPage() {
  return (
    <>
      <Header />
      <main>
        <TiendaHero />
        <TiendaTestimonials />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
