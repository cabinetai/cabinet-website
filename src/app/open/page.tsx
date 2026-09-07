import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OpenCabinetLauncher } from "@/components/open-cabinet-launcher";

export const metadata: Metadata = {
  title: "Open Cabinet",
  description: "Opens the Cabinet desktop app on this computer.",
  robots: {
    index: false,
    follow: false,
  },
};

// Landing target for "Open Cabinet" links in email. See OpenCabinetLauncher for why the
// cabinet:// handoff happens here rather than in the email itself.
export default function OpenPage() {
  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full text-center dict-card px-8 py-10 md:px-12 md:py-12">
        <Image
          src="/brand/cabinet-drawers-logo.png"
          alt="Cabinet"
          width={104}
          height={104}
          priority
          className="mx-auto mb-6 h-[88px] w-auto object-contain drop-shadow-[0_12px_28px_rgba(150,108,68,0.35)]"
        />

        <h1 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
          Opening <span className="font-brand italic">Cabinet</span>
        </h1>

        <OpenCabinetLauncher />

        <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
          <a
            href="cabinet://open"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold btn-wood"
          >
            Open <span className="font-brand italic">Cabinet</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/download"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-border text-text-primary font-medium transition-colors hover:bg-accent-bg-subtle"
          >
            Get the desktop app
          </Link>
        </div>
      </div>
    </main>
  );
}
