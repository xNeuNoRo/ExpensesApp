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
    <html lang="en">
      <body className={`bg-gray-100 ${inter.variable}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
