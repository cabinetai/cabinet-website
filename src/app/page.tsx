import type { Metadata } from "next";
import { HomePage } from "@/components/marketing/home-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://runcabinet.com/",
    languages: { en: "https://runcabinet.com/", hi: "https://runcabinet.com/hi" },
  },
  title: "Cabinet: The AI workspace your company owns",
  description:
    "Cabinet shows your entire knowledge base and files, puts a team of AI specialists to work on it, and renders results as live apps and dashboards. Self-hosted, and connected to the AI providers you already trust.",
  openGraph: {
    title: "Cabinet: The AI workspace your company owns",
    description:
      "Company knowledge, working AI teams, and live apps in one self-hosted workspace. Bring your own AI.",
    url: "https://runcabinet.com",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Cabinet brings company knowledge, AI teams, and live apps together in one workspace",
      },
    ],
  },
};

export default function Page() {
  return <HomePage locale="en" />;
}
