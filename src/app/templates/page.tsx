import type { Metadata } from "next";
import Image from "next/image";
import { SiteNavbar } from "@/components/site-navbar";
import { CabinetTemplatesIntro, CabinetOutcomes } from "@/components/marketing/cabinet-library";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { ShowcaseShelves } from "@/components/templates/showcase-shelves";
import { IntegrationsBand } from "@/components/templates/integrations-band";
import { CabinetList } from "@/components/templates/cabinet-list";
import { SectionLabel } from "@/components/templates/section-label";
import { getAllEntries, INTEGRATIONS_SECTION, SECTION_ORDER } from "@/lib/registry";

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

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default async function TemplatesPage() {
  const entries = await getAllEntries();
  const integrationEntries = entries.filter(
    (entry) => entry.section === INTEGRATIONS_SECTION,
  );
  const categories = SECTION_ORDER.map((name) => {
    const inSection = entries.filter((entry) => entry.section === name);
    const cover = inSection[0]?.slug;
    const integrations = name === INTEGRATIONS_SECTION;

    return {
      name,
      slug: slugify(name),
      count: inSection.length,
      image: integrations
        ? "/generated/integrations-hero.webp"
        : cover
          ? `/covers/${cover}.jpg`
          : null,
      color: integrations ? "139, 94, 60" : "59, 47, 47",
    };
  }).filter((category) => category.count > 0);

  return (
    <div className="templates-page min-h-screen bg-bg text-text-primary">
      <SiteNavbar />
      <main>
        <section className="border-b border-border bg-bg-warm px-6 pb-16 pt-28 sm:pb-20 sm:pt-32 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <CabinetTemplatesIntro headingLevel="h1" />
            <CabinetOutcomes />
          </div>
        </section>

        <ShowcaseShelves />
        <IntegrationsBand entries={integrationEntries} />

        <section id="categories" className="mx-auto max-w-4xl px-6 pt-16">
          <SectionLabel>Categories</SectionLabel>
          <h2 className="mb-8 mt-2 font-display text-4xl leading-[1.08] text-text-primary sm:text-5xl">
            Browse by category.
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {categories.map((category) => (
              <a key={category.slug} href={`#${category.slug}`} className="group block">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-bg-warm card-hover">
                  {category.image && (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 400px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <h3
                  className="mt-3 font-display text-3xl leading-tight sm:text-4xl"
                  style={{ color: `rgb(${category.color})` }}
                >
                  {category.name}
                </h3>
                <span className="font-code text-sm text-text-muted">
                  {category.count} cabinet{category.count === 1 ? "" : "s"}
                </span>
              </a>
            ))}
          </div>
        </section>

        <section id="browse" className="mx-auto max-w-4xl px-6 py-16">
          <SectionLabel>Browse</SectionLabel>
          <h2 className="mb-8 mt-2 font-display text-4xl leading-[1.08] text-text-primary sm:text-5xl">
            Every cabinet, on one shelf.
          </h2>
          <CabinetList entries={entries} categories={categories} />
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
