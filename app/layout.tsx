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
  title: "Jawa 42 Bobber | Own The Shadow",
  description: "A cinematic, luxury showcase of the Jawa 42 Bobber. Czech engineering soul reborn in Indian metal. Pure steel, crafted for the bold.",
  openGraph: {
    title: "Jawa 42 Bobber | Own The Shadow",
    description: "Experience the interactive 3D showcase of the Jawa 42 Bobber.",
    url: "https://your-vercel-link-goes-here.vercel.app", /* Update this once you get your link! */
    siteName: "Jawa Motorcycles",
    images: [
      {
        url: "/gallery/img-1.jpeg", /* Uses your best gallery image for the preview! */
        width: 1200,
        height: 630,
        alt: "Jawa 42 Bobber Side Profile",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jawa 42 Bobber | Own The Shadow",
    description: "Experience the interactive 3D showcase of the Jawa 42 Bobber.",
    images: ["/gallery/img-1.jpeg"],
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
