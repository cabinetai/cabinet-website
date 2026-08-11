import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  COMPARISONS,
  ROUNDUPS,
  THREEWAYS,
  MIGRATIONS,
  getComparison,
  getRoundup,
  getThreeWay,
  getMigration,
  COMPARE_MODIFIED_ISO,
  type Faq,
} from "@/lib/compare";
import { CompareHeadToHead } from "@/components/compare-head-to-head";
import { CompareRoundup } from "@/components/compare-roundup";
import { CompareThreeWay } from "@/components/compare-three-way";
import { CompareMigration } from "@/components/compare-migration";
import { stripLinks } from "@/components/brand-word";
import { serializeJsonLd } from "@/lib/json-ld";

const SITE = "https://runcabinet.com";

type AnyCompare = { title: string; metaDescription: string; slug: string };

export function generateStaticParams() {
  return [...COMPARISONS, ...ROUNDUPS, ...THREEWAYS, ...MIGRATIONS].map((x) => ({
    slug: x.slug,
  }));
}

export const dynamicParams = false;

function find(slug: string): AnyCompare | undefined {
  return (
    getComparison(slug) ?? getRoundup(slug) ?? getThreeWay(slug) ?? getMigration(slug)
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = find(slug);
  if (!data) return { title: "Compare · Cabinet" };

  const url = `${SITE}/compare/${data.slug}`;
  // og:image and twitter:image come from the colocated opengraph-image.tsx
  // (build-time generated), so they are intentionally omitted here.
  return {
    title: data.title,
    description: data.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: data.title,
      description: data.metaDescription,
      type: "website",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.metaDescription,
    },
  };
}

function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      // Copy may carry markdown-style links for the page; schema gets plain text.
      acceptedAnswer: { "@type": "Answer", text: stripLinks(f.a) },
    })),
  };
}

// Visible freshness plus machine-readable dateModified: AI answer engines and
// Google both favor recently reviewed comparison content.
function webPageSchema(slug: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${SITE}/compare/${slug}`,
    dateModified: COMPARE_MODIFIED_ISO,
  };
}

function breadcrumbSchema(slug: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE}/compare` },
      { "@type": "ListItem", position: 3, name, item: `${SITE}/compare/${slug}` },
    ],
  };
}

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cabinet",
  applicationCategory: "BusinessApplication",
  operatingSystem: "macOS, Linux, Windows",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  sameAs: ["https://github.com/cabinetai/cabinet"],
};

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const comparison = getComparison(slug);
  if (comparison) {
    return (
      <>
        <JsonLd data={breadcrumbSchema(slug, `Cabinet vs ${comparison.competitor}`)} />
        <JsonLd data={webPageSchema(slug, comparison.title, comparison.metaDescription)} />
        <JsonLd data={faqSchema(comparison.faqs)} />
        <JsonLd data={softwareSchema} />
        <CompareHeadToHead data={comparison} />
      </>
    );
  }

  const roundup = getRoundup(slug);
  if (roundup) {
    return (
      <>
        <JsonLd data={breadcrumbSchema(slug, `${roundup.competitor} alternatives`)} />
        <JsonLd data={webPageSchema(slug, roundup.title, roundup.metaDescription)} />
        <JsonLd data={faqSchema(roundup.faqs)} />
        <JsonLd data={softwareSchema} />
        <CompareRoundup data={roundup} />
      </>
    );
  }

  const threeWay = getThreeWay(slug);
  if (threeWay) {
    const name = threeWay.contenders.map((c) => c.name).join(" vs ");
    return (
      <>
        <JsonLd data={breadcrumbSchema(slug, name)} />
        <JsonLd data={webPageSchema(slug, threeWay.title, threeWay.metaDescription)} />
        <JsonLd data={faqSchema(threeWay.faqs)} />
        <JsonLd data={softwareSchema} />
        <CompareThreeWay data={threeWay} />
      </>
    );
  }

  const migration = getMigration(slug);
  if (migration) {
    return (
      <>
        <JsonLd data={breadcrumbSchema(slug, `Migrate from ${migration.from}`)} />
        <JsonLd data={webPageSchema(slug, migration.title, migration.metaDescription)} />
        <JsonLd data={faqSchema(migration.faqs)} />
        <JsonLd data={softwareSchema} />
        <CompareMigration data={migration} />
      </>
    );
  }

  notFound();
}
