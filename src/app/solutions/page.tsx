import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { SOLUTIONS } from "@/lib/solutions";

export const metadata: Metadata = {
  title: "Cabinet for every team · Solutions",
  description:
    "Onboard an AI team for Sales, Marketing, Engineering, Product, Operations, or the exec suite. One self-hosted knowledge base, agents that do the work 24/7, and data you own.",
  openGraph: {
    title: "Cabinet for every team",
    description:
      "An AI team for Sales, Marketing, Engineering, Product, Operations, and the exec suite: self-hosted, on data you own.",
    type: "website",
    url: "https://runcabinet.com/solutions",
    images: [{ url: "https://runcabinet.com/solutions-hero.png", width: 1408, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://runcabinet.com/solutions-hero.png"],
  },
};

export default function SolutionsIndexPage() {
  return (
    <main className="min-h-screen bg-bg">
      <SiteNavbar />

      <section className="relative overflow-hidden border-b border-border dot-grid">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 55% at 50% 0%, rgba(139, 94, 60, 0.08), transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center md:py-28">
          <p className="section-label mb-3">Solutions</p>
          <h1 className="mx-auto max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-text-primary sm:text-5xl md:text-6xl">
            Cabinet for every team
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body-serif text-lg leading-relaxed text-text-secondary md:text-xl">
            Each team gets its own AI crew working on top of one knowledge base you
            own: Markdown on disk, your models, your infrastructure.
          </p>
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-border shadow-xl shadow-black/10">
            <Image
              src="/solutions-hero.png"
              alt="One Cabinet knowledge base with documents, dashboards, and AI agents flowing into it"
              width={1408}
              height={768}
              className="w-full"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {SOLUTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/solutions/${s.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-border-dark hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-bg text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="font-display text-xl text-text-primary">
                      Cabinet for {s.label}
                    </h2>
                  </div>
                  <p className="mt-4 font-body-serif leading-relaxed text-text-secondary">
                    {s.headline}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-code text-sm text-accent transition-colors group-hover:text-accent-warm">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
