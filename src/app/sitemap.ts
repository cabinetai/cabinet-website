import type { MetadataRoute } from "next";
import { allCompareSlugs } from "@/lib/compare";
import { SOLUTIONS } from "@/lib/solutions";
import { INDUSTRIES } from "@/lib/industries";

const SITE = "https://runcabinet.com";

export const dynamic = "force-static";

/**
 * Static sitemap, emitted at build time under `output: export`. Enumerates the
 * marketing routes plus every data-driven slug (compare, solutions, industries)
 * so new comparison pages are indexed the moment they ship.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/compare",
    "/pricing",
    "/demo",
    "/media",
    "/solutions",
    "/industries",
    "/enterprise",
    "/cloud",
    "/use-cases",
    "/use-cases/ai-agent-swarm-product-audit",
  ];

  const compareRoutes = allCompareSlugs().map((slug) => `/compare/${slug}`);
  const solutionRoutes = SOLUTIONS.map((s) => `/solutions/${s.slug}`);
  const industryRoutes = INDUSTRIES.map((i) => `/industries/${i.slug}`);

  return [...staticRoutes, ...compareRoutes, ...solutionRoutes, ...industryRoutes].map(
    (path) => ({
      url: `${SITE}${path}`,
      changeFrequency: "monthly",
      priority: path.startsWith("/compare") ? 0.8 : 0.6,
    }),
  );
}
