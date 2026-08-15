/**
 * Featured cabinets from the public registry
 * (source: https://github.com/cabinetai/cabinets). Each cabinet is a complete
 * AI team (agents, jobs, and knowledge) that you clone and run.
 *
 * The registry is hosted on THIS site at /templates (cabinets.sh now
 * redirects to runcabinet.com, so external cabinets.sh links are dead).
 * This is a curated snapshot; the full list lives at /templates, and covers
 * are served from this site's /covers/<slug>.jpg.
 */
export type Cabinet = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
};

export const CABINETS_SITE = "/templates";
export const cabinetUrl = (slug: string) => `/templates/${slug}`;
export const cabinetCover = (slug: string) => `/covers/${slug}.jpg`;

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
  // Assistant workflows: the daily-operating use cases (see TOWN.md for the
  // competitive mapping). Each is a published registry cabinet.
  {
    slug: "email",
    name: "Email",
    description:
      "A Gmail-integrated inbox workspace: triage what needs you, draft replies for your review, and keep label workflows running.",
    tags: ["assistant", "email", "inbox"],
  },
  {
    slug: "meeting-memory",
    name: "Meeting Memory",
    description:
      "Captures every meeting as structured memory: summaries, decisions, action items, and owners, so nothing falls through the cracks.",
    tags: ["assistant", "meetings", "action-items"],
  },
  {
    slug: "company-brain",
    name: "Company Brain",
    description:
      "The AI-native knowledge base that makes every doc findable and every question answerable, with sources.",
    tags: ["assistant", "knowledge", "search"],
  },
  {
    slug: "internal-faq",
    name: "Internal FAQ",
    description:
      "Instant, sourced answers to HR, IT, finance, and policy questions, without a ticket or a Slack thread.",
    tags: ["assistant", "knowledge", "ops"],
  },
  {
    slug: "sales-call-prep",
    name: "Sales Call Prep",
    description:
      "Briefings before every call: account context, recent activity, likely pain points, and discovery questions, delivered before 7 AM.",
    tags: ["assistant", "sales", "briefings"],
  },
  {
    slug: "prd-builder",
    name: "PRD Builder",
    description:
      "Turns customer pain, goals, and constraints into a structured PRD draft, then runs a completeness QA pass before handoff.",
    tags: ["assistant", "docs", "product"],
  },
  {
    slug: "decision-log",
    name: "Decision Log",
    description:
      "Extracts every material decision from meetings, docs, and email into a searchable register with owner, rationale, and status.",
    tags: ["assistant", "decisions", "leadership"],
  },
  {
    slug: "weekly-business-review",
    name: "Weekly Business Review",
    description:
      "Auto-generates the Monday business review across revenue, product, support, and finance as one sourced memo.",
    tags: ["assistant", "automation", "reporting"],
  },
  {
    slug: "universal-request",
    name: "Universal Request",
    description:
      "One intake flow for every team: requests are categorised, routed to an owner, given an SLA, and tracked to completion.",
    tags: ["assistant", "team", "intake"],
  },
];

/**
 * The Town-parity assistant workflow set (TOWN.md §3), in display order:
 * inbox, meetings, answers, docs, automation, team.
 */
export const WORKFLOW_CABINET_SLUGS = [
  "email",
  "meeting-memory",
  "company-brain",
  "sales-call-prep",
  "prd-builder",
  "weekly-business-review",
  "decision-log",
  "internal-faq",
  "universal-request",
] as const;

export const cabinetBySlug = (slug: string): Cabinet | undefined =>
  CABINETS.find((c) => c.slug === slug);
