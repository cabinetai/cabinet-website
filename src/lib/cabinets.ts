/**
 * Featured cabinets from the public registry at cabinets.sh
 * (source: https://github.com/hilash/cabinets). Each cabinet is a complete
 * AI team — agents, jobs, and knowledge — that you clone and run.
 *
 * This is a curated snapshot for the marketing site; the full, always-current
 * list lives on cabinets.sh. Covers are served from cabinets.sh/covers/<slug>.jpg.
 */
export type Cabinet = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
};

export const CABINETS_SITE = "https://cabinets.sh";
export const cabinetUrl = (slug: string) => `${CABINETS_SITE}/cabinet/${slug}`;
export const cabinetCover = (slug: string) => `${CABINETS_SITE}/covers/${slug}.jpg`;

export const CABINETS: Cabinet[] = [
  {
    slug: "saas-startup",
    name: "SaaS Startup",
    description:
      "A B2B SaaS company in a folder: product-led growth, engineering, and customer success teams working in one knowledge base.",
    tags: ["saas", "b2b", "startup"],
  },
  {
    slug: "agency",
    name: "Digital Agency",
    description:
      "Run multiple client engagements with shared processes, templates, and an AI crew per account.",
    tags: ["agency", "services", "multi-client"],
  },
  {
    slug: "ecommerce",
    name: "E-commerce Store",
    description:
      "A direct-to-consumer brand with inventory, email marketing, and fulfillment operations on autopilot.",
    tags: ["ecommerce", "dtc", "retail"],
  },
  {
    slug: "content-creator",
    name: "Content Creator",
    description:
      "A solo creator operation with strategy, editing, and analytics workflows handled by a small AI team.",
    tags: ["creator", "content", "solo"],
  },
  {
    slug: "audits",
    name: "Product Audits",
    description:
      "Walk a product, file every friction as a markdown issue, ship the fixes to a Senior Product Lead bar, then hand a stakeholder an interactive review app.",
    tags: ["audit", "quality", "ux"],
  },
  {
    slug: "real-estate",
    name: "Real Estate Brokerage",
    description:
      "Listings management, marketing, and client relationship operations for a real estate brokerage.",
    tags: ["real-estate", "brokerage", "property"],
  },
  {
    slug: "career-ops",
    name: "Career Ops",
    description:
      "An always-on career team: strategist, resume tailor, interview coach, and networking scout.",
    tags: ["career", "job-search", "ai-powered"],
  },
  {
    slug: "job-hunt-hq",
    name: "Job Hunt HQ",
    description:
      "Job search is a full-time job. This cabinet staffs it with a strategist, resume tailor, interview coach, and networking scout.",
    tags: ["career", "job-search"],
  },
  {
    slug: "text-your-mom",
    name: "Text Your Mom",
    description:
      "A relatable B2C app company, used to show how nested cabinets behave inside a larger company.",
    tags: ["example", "b2c", "company"],
  },
];

export const cabinetBySlug = (slug: string): Cabinet | undefined =>
  CABINETS.find((c) => c.slug === slug);
