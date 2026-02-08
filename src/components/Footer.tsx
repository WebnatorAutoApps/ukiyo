"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="w-full bg-footer-bg text-white">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo-ukiyo.png"
              alt="Ukiyo mochis and coffee logo"
              width={120}
              height={40}
              className="h-10 w-auto brightness-0 invert mb-4"
            />
            <p className="text-sm text-text-secondary leading-relaxed">
              Mochis artesanales y café de especialidad
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-bold mb-4">Contacto</h3>
            <div className="flex flex-col gap-2 text-sm text-text-secondary">
              <a
                href="mailto:hola@mochisukiyo.com"
                className="hover:text-white transition-colors"
              >
                hola@mochisukiyo.com
              </a>
              <a
                href="tel:+34605438663"
                className="hover:text-white transition-colors"
              >
                +34 605 43 86 63
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-base font-bold mb-4">
              ¿Quieres estar enterado de los nuevos sabores?
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
                placeholder="Tu email"
                className="rounded-md bg-white px-4 py-2.5 text-sm text-foreground placeholder-text-secondary outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
              >
                Quiero enterarme de los nuevos sabores
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-text-secondary">
            <Link
              href="/terms-and-conditions"
              className="hover:text-white transition-colors"
            >
              Términos y Condiciones
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
