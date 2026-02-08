import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import CopyPageInfo from "@/components/CopyPageInfo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Mochis artesanales y café de especialidad en Ukiyo | Ukiyo mochis and coffe",
  description:
    "En Ukiyo Mochis & Coffee creemos que cada pequeño detalle cuenta. Por eso, elaboramos mochis artesanales inspirados en la tradición japonesa, con un enfoque creativo y contemporáneo. Cada mochi es preparado a mano, uno a uno, con ingredientes de alta calidad, cuidando su textura, sabor y estética.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <CopyPageInfo />
      </body>
    </html>
  );
}
