import type { Metadata } from "next";
import Script from "next/script";
import { Source_Serif_4, Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-body-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cabinet — Free & Open-Source AI-First Knowledge Base",
  description:
    "Free and open-source AI-first knowledge base and startup OS. Markdown files on disk. AI agents that actually work. No database. No vendor lock-in. Self-hosted.",
  openGraph: {
    title: "Cabinet — Free & Open-Source AI-First Knowledge Base",
    description:
      "Free and open-source AI-first knowledge base. Markdown on disk. Self-hosted. No vendor lock-in.",
    type: "website",
    url: "https://runcabinet.com",
    images: [
      {
        url: "https://runcabinet.com/og.png",
        width: 1200,
        height: 630,
        alt: "Cabinet — AI-first knowledge base with embedded apps, AI agents, and file-based storage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabinet — Free & Open-Source AI-First Knowledge Base",
    description:
      "Free and open-source AI-first knowledge base. Markdown on disk. Self-hosted. No vendor lock-in.",
    images: ["https://runcabinet.com/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4L81D0BVTP"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4L81D0BVTP');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
