import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustry } from "@/lib/industries";
import { IndustryTemplate } from "@/components/industry-template";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ industry: i.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry } = await params;
  const found = getIndustry(industry);
  if (!found) return { title: "Industries · Cabinet" };

  const title = `${found.eyebrow} · Cabinet`;
  const description = found.subhead;
  const image = `https://runcabinet.com/heroes/industry-${found.slug}.jpg`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://runcabinet.com/industries/${found.slug}`,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const found = getIndustry(industry);
  if (!found) notFound();

  return <IndustryTemplate industry={found} />;
}
