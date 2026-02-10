import type { Metadata } from "next";
import { Nunito, Quicksand, Varela_Round } from "next/font/google";
import "./globals.css";
import CopyPageInfo from "@/components/CopyPageInfo";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const varelaRound = Varela_Round({
  variable: "--font-varela-round",
  subsets: ["latin"],
  weight: "400",
});

const siteUrl = "https://www.mochisukiyo.com";

export const metadata: Metadata = {
  title: {
    default:
      "Ukiyo Mochis & Coffee | Mochis Artesanales y Bubble Tea en Madrid Norte",
    template: "%s | Ukiyo Mochis & Coffee",
  },
  description:
    "Descubre los mejores mochis artesanales, bubble tea y café de especialidad en Madrid Norte. Ukiyo Mochis & Coffee en Fuencarral-El Pardo, elaborados a mano con ingredientes de primera calidad. Visítanos en Santiago de Compostela 36, 28034 Madrid.",
  keywords: [
    "mochis Madrid",
    "mochis artesanales Madrid norte",
    "bubble tea Madrid norte",
    "café de especialidad Madrid norte",
    "mochis Fuencarral",
    "tienda de mochis Madrid",
    "mochis japoneses Madrid",
    "boba tea Madrid",
    "té de burbujas Madrid",
    "anko Madrid",
    "repostería japonesa Madrid",
    "mochi café Madrid norte",
    "mochis artesanales Fuencarral-El Pardo",
    "dulces japoneses Madrid",
    "ukiyo mochis",
  ],
  authors: [{ name: "Ukiyo Mochis & Coffee" }],
  creator: "Ukiyo Mochis & Coffee",
  publisher: "Ukiyo Mochis & Coffee",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "Ukiyo Mochis & Coffee",
    title:
      "Ukiyo Mochis & Coffee | Mochis Artesanales y Bubble Tea en Madrid Norte",
    description:
      "Los mejores mochis artesanales, bubble tea y café de especialidad en Madrid Norte. Elaborados a mano con ingredientes de primera calidad en Fuencarral-El Pardo.",
    images: [
      {
        url: "/images/hero-storefront.jpg",
        width: 1224,
        height: 688,
        alt: "Ukiyo Mochis & Coffee - Fachada estilo anime de nuestra tienda de mochis artesanales en Madrid Norte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Ukiyo Mochis & Coffee | Mochis Artesanales en Madrid Norte",
    description:
      "Descubre los mejores mochis artesanales y bubble tea en Madrid Norte. Visítanos en Fuencarral-El Pardo.",
    images: ["/images/hero-storefront.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "ES-MD",
    "geo.placename": "Madrid",
    "geo.position": "40.4893;-3.7086",
    ICBM: "40.4893, -3.7086",
    "content-language": "es",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${nunito.variable} ${quicksand.variable} ${varelaRound.variable} antialiased`}>
        <LocalBusinessSchema />
        {children}
        <CopyPageInfo />
      </body>
    </html>
  );
}
