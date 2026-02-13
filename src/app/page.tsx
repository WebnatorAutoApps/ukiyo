import Hero from "@/components/Hero";
import MenuCTA from "@/components/MenuCTA";
import About from "@/components/About";
import TiendaTestimonials from "@/components/TiendaTestimonials";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LofiPlayer from "@/components/LofiPlayer";
import FAQ from "@/components/FAQ";
import Breadcrumbs from "@/components/Breadcrumbs";
import SakuraPetals from "@/components/SakuraPetals";
import MochiCounter from "@/components/MochiCounter";
import StickyHeader from "@/components/StickyHeader";

export default function Home() {
  return (
    <>
      <SakuraPetals />
      <StickyHeader />
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Mochis y Café en Madrid Norte" },
        ]}
      />
      <main>
        <Hero />
        <MochiCounter />
        <MenuCTA />
        <About />
        <TiendaTestimonials />
        <Location />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
      <LofiPlayer />
    </>
  );
}
