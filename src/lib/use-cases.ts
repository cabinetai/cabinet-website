export type UseCase = {
  slug: string; // path under /use-cases/, served from public/
  tags: string[]; // also used as the categories for filtering
  title: string;
  blurb: string;
  cover: string; // social / OG card
  image: string; // thumbnail shown on the hub
  author: string;
  date: string; // ISO
  dateLabel: string;
  readingTime: string;
};

/**
 * Every published use case. Categories on the hub are derived from `tag`, in the
 * order items appear here, so adding a new use case (and a new tag) is all it
 * takes to grow the grid and the category filter.
 */
export const USE_CASES: UseCase[] = [
  {
    slug: "ai-agent-swarm-product-audit",
    tags: ["Product", "Development", "UX", "UI"],
    title: "Ship 60 product features in under an hour",
    blurb:
      "An AI agent swarm audits every screen of your product, ships the fixes, and hands you a review app to approve each one. A week of QA and polish, done in a single sitting, without touching the code.",
    cover: "/use-cases/ai-agent-swarm-product-audit/assets/img/og-cover.png",
    image: "/use-cases/ai-agent-swarm-product-audit/assets/img/og-cover.png",
    author: "Hila Shmuel",
    date: "2026-06-20",
    dateLabel: "Jun 2026",
    readingTime: "8 min read",
  },
];

/** Distinct categories (tags) in declaration order, for the filter chips. */
export function useCaseCategories(items: UseCase[] = USE_CASES): string[] {
  return Array.from(new Set(items.flatMap((i) => i.tags)));
}
