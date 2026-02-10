import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import SpecialtyDrinks from "@/components/SpecialtyDrinks";
import About from "@/components/About";
import Testimonial from "@/components/Testimonial";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LofiPlayer from "@/components/LofiPlayer";
import FAQ from "@/components/FAQ";
import Breadcrumbs from "@/components/Breadcrumbs";
import SakuraPetals from "@/components/SakuraPetals";
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
        <ProductCategories />
        <SpecialtyDrinks />
        <About />
        <Testimonial />
        <Location />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
      <LofiPlayer />
    </>
  );
}
