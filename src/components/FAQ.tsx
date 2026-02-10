"use client";

import { useState } from "react";

const faqs = [
  {
    question: "¿Dónde está Ukiyo Mochis & Coffee en Madrid Norte?",
    answer:
      "Nuestra tienda está ubicada en Santiago de Compostela 36, en el barrio de Fuencarral-El Pardo, 28034 Madrid Norte. Estamos en una zona muy accesible con transporte público y fácil aparcamiento. ¡Te esperamos!",
  },
  {
    question: "¿Qué son los mochis artesanales de Ukiyo?",
    answer:
      "Los mochis son un dulce tradicional japonés elaborado con masa de arroz glutinoso. En Ukiyo, elaboramos cada mochi a mano con ingredientes de primera calidad, combinando la tradición japonesa con sabores creativos y contemporáneos. Ofrecemos variedades con rellenos como matcha, fresa, maracuyá, chocolate y muchos más.",
  },
  {
    question: "¿Qué es el bubble tea y qué sabores tenéis?",
    answer:
      "El bubble tea (también conocido como boba tea o té de burbujas) es una bebida de origen asiático que combina té con leche y perlas de tapioca. En Ukiyo Madrid Norte ofrecemos una amplia variedad de sabores refrescantes con toppings únicos, perfectos para cualquier momento del día.",
  },
  {
    question: "¿Hacéis envíos de mochis a domicilio en Madrid?",
    answer:
      "Sí, puedes pedir nuestros mochis artesanales a domicilio a través de Glovo. También puedes hacer pedidos por WhatsApp al +34 605 43 86 63 o visitarnos directamente en nuestra tienda de Madrid Norte en Fuencarral-El Pardo.",
  },
  {
    question: "¿Cuál es el horario de Ukiyo Mochis en Madrid Norte?",
    answer:
      "Nuestro horario es de lunes a viernes de 10:00 a 20:00, sábados de 10:00 a 21:00 y domingos de 11:00 a 19:00. Te recomendamos visitarnos para descubrir todos nuestros sabores de mochis y bubble tea.",
  },
  {
    question: "¿Tenéis opciones sin gluten o para alérgicos?",
    answer:
      "Los mochis tradicionales están elaborados con harina de arroz glutinoso, que es naturalmente libre de gluten de trigo. Sin embargo, te recomendamos consultar con nuestro equipo sobre los ingredientes específicos de cada variedad si tienes alergias alimentarias.",
  },
  {
    question: "¿Se pueden hacer pedidos para eventos o celebraciones?",
    answer:
      "¡Por supuesto! Ofrecemos packs especiales de mochis artesanales ideales para cumpleaños, bodas, eventos corporativos y cualquier celebración. Contáctanos por email a hola@mochisukiyo.com o por WhatsApp para personalizar tu pedido.",
  },
  {
    question: "¿Qué hace especial a los mochis de Ukiyo frente a otros en Madrid?",
    answer:
      "En Ukiyo Mochis & Coffee cada mochi es preparado a mano, uno a uno, con ingredientes de alta calidad importados y locales. No somos una franquicia ni usamos producción industrial. Nuestra pasión por la repostería japonesa y nuestro enfoque artesanal nos diferencia como la tienda de referencia de mochis en Madrid Norte.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="w-full py-16 px-5 bg-surface" id="preguntas-frecuentes">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-2 font-heading">
          Preguntas frecuentes
        </h2>
        <p className="text-center text-text-secondary mb-10">
          Todo lo que necesitas saber sobre nuestros mochis artesanales, bubble
          tea y café de especialidad en Madrid Norte
        </p>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-soft-wood/30 bg-warm-cream overflow-hidden shadow-cozy"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-5 text-left hover:bg-sakura-pink/20 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-sm font-semibold text-foreground pr-4 font-heading">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-text-secondary shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-text-body leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
