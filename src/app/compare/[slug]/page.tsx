import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  COMPARISONS,
  ROUNDUPS,
  getComparison,
  getRoundup,
  type Faq,
} from "@/lib/compare";
import { CompareHeadToHead } from "@/components/compare-head-to-head";
import { CompareRoundup } from "@/components/compare-roundup";

const SITE = "https://runcabinet.com";
const DEFAULT_OG = `${SITE}/og.png`;

export function generateStaticParams() {
  return [...COMPARISONS, ...ROUNDUPS].map((x) => ({ slug: x.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getComparison(slug) ?? getRoundup(slug);
  if (!data) return { title: "Compare · Cabinet" };

  const url = `${SITE}/compare/${data.slug}`;
  const image = data.ogImage ? `${SITE}${data.ogImage}` : DEFAULT_OG;
  return {
    title: data.title,
    description: data.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: data.title,
      description: data.metaDescription,
      type: "website",
      url,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.metaDescription,
      images: [image],
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
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
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
  sameAs: ["https://github.com/hilash/cabinet"],
};

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
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
    const crumbName = `Cabinet vs ${comparison.competitor}`;
    return (
      <>
        <JsonLd data={breadcrumbSchema(slug, crumbName)} />
        <JsonLd data={faqSchema(comparison.faqs)} />
        <JsonLd data={softwareSchema} />
        <CompareHeadToHead data={comparison} />
      </>
    );
  }

  const roundup = getRoundup(slug);
  if (roundup) {
    const crumbName = `${roundup.competitor} alternatives`;
    return (
      <>
        <JsonLd data={breadcrumbSchema(slug, crumbName)} />
        <JsonLd data={faqSchema(roundup.faqs)} />
        <JsonLd data={softwareSchema} />
        <CompareRoundup data={roundup} />
      </>
    );
  }

  notFound();
}
