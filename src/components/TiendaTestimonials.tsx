"use client";

import Image from "next/image";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sofía M.",
    text: "Los mochis de Ukiyo son simplemente deliciosos, cada bocado es una experiencia única y satisfactoria.",
    avatar: "/images/testimonial-sofia.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos G.",
    text: "Me encantaron los sabores, especialmente el de maracuyá. El café complementó perfectamente esta deliciosa elección.",
    avatar: "/images/testimonial-carlos.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "María R.",
    text: "Los mejores mochis artesanales que he probado en Madrid. La textura es perfecta y los sabores son increíbles.",
    avatar: "/images/testimonial-maria.jpg",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex justify-center gap-1 mb-4">
      {[...Array(rating)].map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TiendaTestimonials() {
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full py-16 px-5 bg-primary-light">
      <div className="mx-auto max-w-3xl">
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-12 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-surface transition-colors"
            aria-label="Testimonio anterior"
          >
            <svg
              className="w-5 h-5 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-12 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-surface transition-colors"
            aria-label="Siguiente testimonio"
          >
            <svg
              className="w-5 h-5 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Testimonial card */}
          <div className="rounded-2xl bg-white p-8 md:p-12 shadow-sm text-center">
            <StarRating rating={testimonials[current].rating} />
            <blockquote className="text-lg md:text-xl text-text-body leading-relaxed italic mb-6">
              &ldquo;{testimonials[current].text}&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <Image
                src={testimonials[current].avatar}
                alt={testimonials[current].name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <span className="text-sm font-bold text-foreground">
                {testimonials[current].name}
              </span>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === current
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
