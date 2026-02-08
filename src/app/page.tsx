import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import About from "@/components/About";
import Testimonial from "@/components/Testimonial";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductCategories />
        <About />
        <Testimonial />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
