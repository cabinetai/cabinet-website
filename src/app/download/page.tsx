import type { Metadata } from "next";
import { SiteNavbar } from "@/components/site-navbar";
import { LegacyCta } from "@/components/marketing/legacy-sections";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export const metadata: Metadata = {
  title: "Download Cabinet",
  description:
    "Download Cabinet, the AI workspace where your knowledge base, AI team, workflows, and live apps work together.",
  openGraph: {
    title: "Download Cabinet",
    description:
      "Your knowledge base, AI team, workflows, and live apps in one workspace your company controls.",
    url: "https://runcabinet.com/download",
  },
};

export default function DownloadPage() {
  return (
    <main className="min-h-screen overflow-clip bg-bg text-text-primary">
      <SiteNavbar fixed />

      <LegacyCta />

      <MarketingFooter />
    </main>
  );
}
