import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { INDUSTRIES } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Cabinet by industry · self-hosted AI for regulated teams",
  description:
    "Financial services, healthcare, legal, professional services, and startups run AI on a self-hosted knowledge base where the data never leaves their control.",
  openGraph: {
    title: "Cabinet by industry",
    description:
      "Self-hosted AI for financial services, healthcare, legal, professional services, and startups: data that never leaves your control.",
    type: "website",
    url: "https://runcabinet.com/industries",
  },
};

export default function IndustriesIndexPage() {
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
          <p className="section-label mb-3">Industries</p>
          <h1 className="mx-auto max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-text-primary sm:text-5xl md:text-6xl">
            AI for teams that can&apos;t send their data away
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body-serif text-lg leading-relaxed text-text-secondary md:text-xl">
            Self-hosted by design, so regulated and sensitive industries get an AI team
            without their data ever leaving their own infrastructure.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {INDUSTRIES.map((i) => (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className="group flex flex-col soft-card card-hover p-7"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={`/brand/icons/${i.slug}.png`}
                    alt=""
                    className="h-12 w-12 shrink-0 object-contain transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-2"
                  />
                  <h2 className="font-display text-xl text-text-primary">{i.label}</h2>
                </div>
                <p className="mt-4 font-body-serif leading-relaxed text-text-secondary">
                  {i.headline}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-code text-sm text-accent transition-colors group-hover:text-accent-warm">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
