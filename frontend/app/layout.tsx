import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppProvider from "@/components/providers/AppProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Expenses App",
  description: "Gestor de gastos personales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning se usa para evitar warnings de React sobre diferencias entre el HTML renderizado en el servidor y el cliente, útil cuando usamos next-themes que manipula clases en el HTML para el modo oscuro.
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
