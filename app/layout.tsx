import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/animations/PageTransition";
import { StickyQuoteCTA } from "@/components/ui/StickyQuoteCTA";
import { siteConfig } from "@/lib/utils";

const inter = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "production clip musical",
    "film publicitaire",
    "film de marque",
    "studio de production créative",
    "contenu cinématographique",
    "agence de branding",
    "narration visuelle",
    "agence créative luxe",
    "OBSIDIAN Arts Films",
  ],
  authors: [{ name: "OBSIDIAN Arts & Films" }],
  creator: "OBSIDIAN Arts & Films",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/brand/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "OBSIDIAN Arts & Films — Studio de production créative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
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
  icons: {
    icon: "/brand/favicon.svg",
    shortcut: "/brand/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="bg-obsidian-black text-obsidian-white antialiased">
        <Navbar />
        <PageTransition>
          <main className="pb-20 sm:pb-0">{children}</main>
        </PageTransition>
        <Footer />
        <StickyQuoteCTA />
      </body>
    </html>
  );
}
