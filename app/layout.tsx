import type { Metadata } from "next";
import { Geist, Syne } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Catterpillar — Waste has a second life",
  description:
    "We collect, sort, aggregate and move recyclable materials back into the economy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${syne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
