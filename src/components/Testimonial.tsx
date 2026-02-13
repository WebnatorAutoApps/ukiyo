"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { fetchTestimonials } from "@/lib/testimonials";
import type { TestimonialRow } from "@/lib/database.types";

export default function Testimonial() {
  const { t, locale } = useLanguage();
  const [dbTestimonials, setDbTestimonials] = useState<TestimonialRow[] | null>(null);

  useEffect(() => {
    fetchTestimonials("home").then((data) => {
      if (data.length > 0) setDbTestimonials(data);
    });
  }, []);

  const first = dbTestimonials?.[0];
  const testimonial = first
    ? {
        quote:
          locale === "ja" && first.quote_ja ? first.quote_ja : first.quote_es,
        name:
          locale === "ja" && first.name_ja ? first.name_ja : first.name_es,
        avatar: first.avatar_url || "/images/testimonial-avatar.jpg",
        rating: first.rating,
      }
    : {
        quote: t.testimonial.quote,
        name: t.testimonial.name,
        avatar: "/images/testimonial-avatar.jpg",
        rating: 5,
      };

  return (
    <section className="relative w-full py-16 px-5 bg-sakura-pink/30 overflow-hidden">
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="rounded-2xl bg-warm-cream p-8 md:p-12 shadow-cozy border border-sakura-pink/20 lantern-glow">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(testimonial.rating)].map((_, i) => (
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
          <blockquote className="text-lg md:text-xl text-text-body leading-relaxed italic">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              width={48}
              height={48}
              className="rounded-full object-cover ring-2 ring-sakura-pink"
            />
            <span className="text-sm font-bold text-foreground font-heading">
              {testimonial.name}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
