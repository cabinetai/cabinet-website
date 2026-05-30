import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS, getSolution } from "@/lib/solutions";
import { SolutionTemplate } from "@/components/solution-template";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ role: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role } = await params;
  const solution = getSolution(role);
  if (!solution) return { title: "Solutions — Cabinet" };

  const title = `${solution.eyebrow} — Cabinet`;
  const description = solution.subhead;
  const image = "https://runcabinet.com/solutions-hero.png";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://runcabinet.com/solutions/${solution.slug}`,
      images: [{ url: image, width: 1408, height: 768 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  const solution = getSolution(role);
  if (!solution) notFound();

  return <SolutionTemplate solution={solution} />;
}
