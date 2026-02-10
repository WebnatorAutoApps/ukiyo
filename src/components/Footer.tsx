"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="w-full bg-footer-bg text-white">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo-ukiyo.png"
              alt="Ukiyo Mochis & Coffee - Mochis artesanales y bubble tea en Madrid Norte"
              width={120}
              height={40}
              className="h-10 w-auto brightness-0 invert mb-4"
            />
            <p className="text-sm text-warm-cream/60 leading-relaxed mb-4">
              Mochis artesanales, bubble tea y café de especialidad en Madrid Norte
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/ukiyomochis/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-cream/60 hover:text-sakura-pink transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@ukiyomochisandcoffee"
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-cream/60 hover:text-sakura-pink transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.01a8.35 8.35 0 004.76 1.49v-3.45a4.85 4.85 0 01-1-.36z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-base font-bold mb-4 font-heading">Nuestras Políticas</h3>
            <div className="flex flex-col gap-2 text-sm text-warm-cream/60">
              <Link
                href="/terms-and-conditions"
                className="hover:text-sakura-pink transition-colors"
              >
                Términos y Condiciones
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-sakura-pink transition-colors"
              >
                Política de Privacidad
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-bold mb-4 font-heading">Contacto</h3>
            <div className="flex flex-col gap-2 text-sm text-warm-cream/60">
              <a
                href="mailto:hola@mochisukiyo.com"
                className="hover:text-sakura-pink transition-colors"
              >
                hola@mochisukiyo.com
              </a>
              <a
                href="tel:+34605438663"
                className="hover:text-sakura-pink transition-colors"
              >
                +34 605 43 86 63
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-base font-bold mb-4 font-heading">
              ¿Quieres estar enterado de nuestros sabores?
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                className="rounded-full bg-white/10 border border-warm-cream/20 px-4 py-2.5 text-sm text-white placeholder-warm-cream/40 outline-none focus:ring-2 focus:ring-sakura-pink"
              />
              <button
                type="submit"
                className="rounded-full bg-sakura-pink px-4 py-2.5 text-sm font-semibold text-ukiyo-navy hover:bg-sakura-pink/80 transition-colors font-heading"
              >
                Quiero enterarme de los nuevos sabores
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-warm-cream/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-cream/40">
            &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-warm-cream/40">
            <Link
              href="/terms-and-conditions"
              className="hover:text-sakura-pink transition-colors"
            >
              Términos y Condiciones
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-sakura-pink transition-colors"
            >
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
