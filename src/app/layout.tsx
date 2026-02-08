import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import CopyPageInfo from "@/components/CopyPageInfo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ukiyo Mochis & Coffee",
  description:
    "Mochis artesanales y café de especialidad. Elaboramos mochis artesanales que combinan tradición japonesa y sabores únicos.",
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
