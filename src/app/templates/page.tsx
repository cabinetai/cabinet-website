import type { Metadata } from "next";
import { SiteNavbar } from "@/components/site-navbar";
import { CabinetTemplatesIntro, CabinetOutcomes } from "@/components/marketing/cabinet-library";
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
          <div className="mx-auto w-full max-w-7xl">
            <CabinetTemplatesIntro headingLevel="h1" />
            <CabinetOutcomes />
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
