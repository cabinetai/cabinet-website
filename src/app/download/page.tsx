import type { Metadata } from "next";
import { LegacyCta } from "@/components/marketing/legacy-sections";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: "Download Cabinet",
  description:
    "Get the Cabinet desktop app for macOS, Windows, or Linux, or run it from the terminal. Free, open source, and self-hosted.",
  openGraph: {
    title: "Download Cabinet",
    description:
      "Get the Cabinet desktop app for macOS, Windows, or Linux, or run it from the terminal. Free, open source, and self-hosted.",
    type: "website",
    url: "https://runcabinet.com/download",
  },
};

export default function DownloadPage() {
  return (
    <main className="bg-bg text-text-primary">
      <SiteNavbar fixed />
      {/* ponytail: the whole page is the main page's CTA section, reused as-is */}
      <div className="pt-16">
        <LegacyCta />
      </div>
      <MarketingFooter />
    </main>
  );
}
