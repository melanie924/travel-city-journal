import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const SITE_URL = process.env.SITE_URL || "https://travel-city-journal.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "城市觀察筆記 — 旅行城市紀錄",
    template: "%s | 城市觀察筆記",
  },
  description:
    "記錄每座城市的獨特個性。不只是遊記，更是對城市文化的深度觀察。",
  openGraph: {
    title: "城市觀察筆記",
    description: "記錄每座城市的獨特個性與文化觀察",
    type: "website",
    locale: "zh_TW",
    siteName: "城市觀察筆記",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "城市觀察筆記",
    description: "記錄每座城市的獨特個性與文化觀察",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/api/rss",
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "城市觀察筆記",
  description: "記錄每座城市的獨特個性與文化觀察",
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
