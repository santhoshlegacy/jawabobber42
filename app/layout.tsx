import type { Metadata } from "next";
import { Inter, Bebas_Neue, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JAWA 42 Bobber — Own The Shadow",
  description:
    "Experience the Jawa 42 Bobber — where heritage meets shadow. A cinematic scrollytelling showcase of mechanical luxury.",
  keywords: ["Jawa 42 Bobber", "motorcycle", "bobber", "scrollytelling", "cinematic"],
  openGraph: {
    title: "JAWA 42 Bobber — Own The Shadow",
    description: "Where heritage meets shadow. Cinematic motorcycle experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} ${spaceMono.variable}`}
    >
      <body className="relative bg-[#0a0a0a] text-[#f5f5f5] selection:bg-[#c9a84c] selection:text-black">
        <CustomCursor />
        <div className="grain-overlay" aria-hidden="true" />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
