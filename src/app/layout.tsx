import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "U.E. Dr. José María Vargas | Altagracia, Nueva Esparta",
  description: "Portal Oficial de la Unidad Educativa Doctor José María Vargas. Institución privada fundada en 2017 en Altagracia, Municipio Gómez, Estado Nueva Esparta. RIF: J-41037200-1. Código DEA: PD04971705. Formación integral, identidad cultural neoespartana y excelencia académica. Preinscripción 2025-2026.",
  keywords: "Unidad Educativa José María Vargas, colegio Nueva Esparta, liceo Altagracia, Municipio Gómez, educación privada Venezuela, preinscripción 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
