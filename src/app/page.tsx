import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import About from "@/components/About";
import Testimonial from "@/components/Testimonial";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FAQ from "@/components/FAQ";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Home() {
  return (
    <>
      <Header />
      <Breadcrumbs
        items={[
          { name: "Inicio", href: "/" },
          { name: "Mochis y Café en Madrid Norte" },
        ]}
      />
      <main>
        <Hero />
        <ProductCategories />
        <About />
        <Testimonial />
        <Location />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
