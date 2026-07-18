import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Instrument_Serif, Martian_Mono, Fraunces, Ms_Madi } from "next/font/google";
import { LiquidGlassFilter } from "@/components/liquid-glass-filter";
import "./globals.css";

// Body / UI sans (also carries the uppercase labels at 0.08em tracking).
const geist = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

// Warm editorial serif for headlines (variable weight + optical sizing).
const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  axes: ["opsz"],
});

// Kept only for the Cabinet brand wordmark.
const instrumentSerif = Instrument_Serif({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const martianMono = Martian_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// Handwriting signature font for testimonial names.
const msMadi = Ms_Madi({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://runcabinet.com"),
  title: "Cabinet: The AI workspace your company owns",
  description:
    "Cabinet shows your entire knowledge base and files, puts AI teams to work on it, and renders results as live apps and dashboards. Open source, self-hosted, bring your own AI.",
  openGraph: {
    title: "Cabinet: The AI workspace your company owns",
    description:
      "Company knowledge, working AI teams, and live apps in one open-source, self-hosted workspace. Bring your own AI.",
    type: "website",
    url: "https://runcabinet.com",
    images: [
      {
        url: "https://runcabinet.com/og.png",
        width: 1200,
        height: 630,
        alt: "Cabinet: the AI workspace your company owns, with knowledge, AI teams, and live apps in one place",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabinet: The AI workspace your company owns",
    description:
      "Company knowledge, working AI teams, and live apps in one open-source, self-hosted workspace. Bring your own AI.",
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
      className={`${geist.variable} ${fraunces.variable} ${instrumentSerif.variable} ${martianMono.variable} ${msMadi.variable} h-full antialiased`}
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
      <body className="min-h-full flex flex-col">
        <LiquidGlassFilter />
        {children}
      </body>
    </html>
  );
}
