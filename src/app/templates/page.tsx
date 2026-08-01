import type { Metadata } from "next";
import { ArrowRight, Boxes } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { CabinetList } from "@/components/templates/cabinet-list";
import { getAllEntries, SECTION_ORDER } from "@/lib/registry";

export const metadata: Metadata = {
  title: "Cabinet templates | Working AI teams",
  description:
    "Browse ready-made Cabinet templates for sales, product, operations, and other business functions.",
  alternates: { canonical: "/templates" },
  openGraph: {
    title: "Cabinet templates | Working AI teams",
    description:
      "Browse ready-made Cabinet templates for sales, product, operations, and other business functions.",
    url: "https://runcabinet.com/templates",
  },
};

export default async function TemplatesPage() {
  const entries = await getAllEntries();
  const categories = SECTION_ORDER.map((name) => ({
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  })).filter((category) => entries.some((entry) => entry.section === category.name));

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <SiteNavbar />
      <main>
        <section className="border-b border-border bg-bg-warm px-6 pb-16 pt-28 sm:pb-20 sm:pt-32 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-3 py-1.5 text-xs font-semibold text-accent">
              <Boxes aria-hidden className="h-3.5 w-3.5" />
              Cabinet templates
            </div>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[0.94] tracking-[-0.055em] sm:text-6xl">
              Start with a working team.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
              Ready-made Cabinet workspaces give your team an operating model, AI specialists, jobs, files, and interactive views to adapt to your business.
            </p>
            <a href="#browse" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-warm">
              Browse templates <ArrowRight aria-hidden className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section id="browse" className="mx-auto max-w-5xl px-6 py-14 sm:py-20 lg:px-8">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label">Template library</p>
              <h2 className="mt-3 font-display text-3xl tracking-[-0.04em] sm:text-4xl">Find a starting point</h2>
            </div>
            <p className="text-sm text-text-tertiary">{entries.length} templates</p>
          </div>
          <CabinetList entries={entries} categories={categories} />
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
