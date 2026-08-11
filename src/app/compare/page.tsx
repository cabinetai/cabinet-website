import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  X,
  Minus,
  ArrowRight,
  ArrowUpRight,
  Star,
  Brain,
  LayoutDashboard,
  Users,
  Calendar,
  Workflow,
  MessageSquare,
  FileText,
  Search,
} from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { brandify } from "@/components/brand-word";
import { WoodIcon } from "@/components/wood-icon";
import { GITHUB_URL } from "@/lib/site-config";
import {
  COMPARISONS,
  ROUNDUPS,
  THREEWAYS,
  MIGRATIONS,
  COMPARE_ASOF,
  type Cell,
} from "@/lib/compare";

const SITE = "https://runcabinet.com";

export const metadata: Metadata = {
  title: "Compare Cabinet vs Notion, Glean, Town, Gumloop & Buzz (2026)",
  description:
    "How Cabinet compares with Notion, Glean, Dust, Town, Gumloop, and Jack Dorsey's Buzz in 2026. One is the company brain you own: knowledge as files, AI agents on schedules, live dashboards, open source and self-hosted. Honest head-to-heads, including the rows competitors win.",
  alternates: { canonical: `${SITE}/compare` },
  openGraph: {
    title: "Compare Cabinet vs Notion, Glean, Town, Gumloop & Buzz (2026)",
    description:
      "Honest, side-by-side comparisons. Assistants, automations, wikis, search, and agent chat each hold a piece of your company's brain. Cabinet is the brain itself, and the only one you own.",
    type: "website",
    url: `${SITE}/compare`,
    images: [{ url: `${SITE}/og.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Cabinet vs Notion, Glean, Town, Gumloop & Buzz (2026)",
    description:
      "Honest, side-by-side comparisons. Cabinet is the company brain you own: knowledge as files, agents on schedules, live dashboards.",
    images: [`${SITE}/og.png`],
  },
};

// Curated cross-competitor view for the "at a glance" matrix: the 2026 field,
// not just the wiki generation. Per-competitor detail (and more rows where a
// competitor wins) lives on each spoke page.
const COLUMNS = ["Cabinet", "Notion", "Glean", "Town", "Gumloop", "Buzz"] as const;
const MATRIX: { feature: string; cells: Cell[] }[] = [
  { feature: "One home for company knowledge and files", cells: [true, true, false, false, "partial", false] },
  { feature: "A place people write and read knowledge", cells: [true, true, false, false, false, "partial"] },
  { feature: "Knowledge rendered as live apps and dashboards", cells: [true, "partial", false, false, "partial", false] },
  { feature: "AI agents that work on schedules", cells: [true, true, true, true, true, "partial"] },
  { feature: "Agent work persists as files you own", cells: [true, false, false, false, false, "partial"] },
  { feature: "Self-hosted on your infrastructure", cells: [true, false, "partial", false, "partial", true] },
  { feature: "Your AI keys at provider cost", cells: [true, false, false, false, "partial", true] },
  { feature: "Open source", cells: [true, false, false, false, false, true] },
  { feature: "Personal inbox and calendar assistant", cells: [false, false, false, true, "partial", false] },
  { feature: "Automation across 100+ SaaS apps", cells: ["partial", "partial", "partial", "partial", true, false] },
  { feature: "Search across your existing tools", cells: ["partial", "partial", true, "partial", true, false] },
];

function MatrixIcon({ value }: { value: Cell }) {
  if (value === true)
    return (
      <>
        <Check className="mx-auto h-4 w-4 text-green" aria-hidden />
        <span className="sr-only">Included</span>
      </>
    );
  if (value === "partial")
    return (
      <>
        <Minus className="mx-auto h-4 w-4 text-accent-light" aria-hidden />
        <span className="sr-only">Partial</span>
      </>
    );
  return (
    <>
      <X className="mx-auto h-4 w-4 text-text-muted" aria-hidden />
      <span className="sr-only">Not included</span>
    </>
  );
}

// The 2026 landscape, mapped honestly. Each card concedes what the category is
// good at, names its limit, and routes to the head-to-head.
const FIELD = [
  {
    icon: Calendar,
    category: "Personal AI assistants",
    who: "Town",
    body: "A Townie triages your inbox and preps your meetings, well. The work lands in your SaaS accounts, and what it learns stays in Town's cloud.",
    href: "/compare/cabinet-vs-town",
  },
  {
    icon: Workflow,
    category: "Workflow automation",
    who: "Gumloop",
    body: "Agents run no-code flows across a hundred tools. Knowledge is a paid index that feeds them, edited somewhere else.",
    href: "/compare/cabinet-vs-gumloop",
  },
  {
    icon: MessageSquare,
    category: "Agent team chat",
    who: "Buzz",
    body: "Jack Dorsey's open-source room where people and agents talk. The shared context is the scroll.",
    href: "/compare/cabinet-vs-buzz",
  },
  {
    icon: FileText,
    category: "Wikis and docs",
    who: "Notion, Coda",
    body: "The pages have a home, and since 2026, agents too. The home is their cloud, in their format.",
    href: "/compare/cabinet-vs-notion",
  },
  {
    icon: Search,
    category: "Enterprise search",
    who: "Glean, Dust",
    body: "Finds and answers across everything you already run. Authors and holds nothing of its own.",
    href: "/compare/cabinet-vs-glean",
  },
] as const;

const WEDGE = [
  {
    icon: Brain,
    title: "One brain, owned",
    body: "Your whole knowledge base and files live in one place, on your infrastructure, as files your IT can back up like anything else. Subscriptions end. The brain stays.",
  },
  {
    icon: LayoutDashboard,
    title: "Knowledge that shows itself as software",
    body: "Cabinet renders your knowledge as live dashboards and working apps, generated from the files and always current. A generative interface instead of a thousand static pages.",
  },
  {
    icon: Users,
    title: "People and agents, same rooms",
    body: "Your team and its AI specialists read and write the same knowledge. Agents run on schedules, you approve what ships, and inference runs on the model accounts you already pay for.",
  },
];

export default function CompareHubPage() {
  return (
    <main className="min-h-screen bg-bg">
      <SiteNavbar />
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden border-b border-border dot-grid">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 70% 0%, rgba(139, 94, 60, 0.08), transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="section-label mb-3">Compare</p>
              <h1 className="max-w-3xl font-display text-4xl leading-[1.07] tracking-tight text-text-primary sm:text-5xl">
                Where should your company&apos;s brain live?
              </h1>
              <p className="mt-5 max-w-2xl font-body-serif text-lg leading-relaxed text-text-secondary">
                Every tool on this page holds a piece of it. Town remembers how you work.
                Gumloop runs your workflows. Notion keeps the pages, Glean keeps the index,
                Buzz keeps the conversation. <span className="font-brand italic">Cabinet</span>{" "}
                is the brain itself: your whole knowledge base and files in one place you own,
                worked by your team and its AI agents, rendered as live apps and dashboards.
                The comparisons below are honest, including where the others win.
              </p>
              <p className="mt-5 font-code text-xs text-text-tertiary">
                Every page reviewed {COMPARE_ASOF} against public pricing and docs.
              </p>
            </div>
            <WoodIcon icon={Brain} className="hidden h-40 w-40 md:block" />
          </div>
        </div>
      </section>
      {/* ─── The field, mapped ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">The map</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Every category holds a piece
          </h2>
          <p className="mt-4 max-w-2xl font-body-serif leading-relaxed text-text-secondary">
            Assistants hold your habits. Automations hold your workflows. Wikis hold pages,
            search holds an index, agent chat holds the scroll. All useful, and none of them
            leaves your company holding the knowledge. That is the job{" "}
            <span className="font-brand italic">Cabinet</span> was built for.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FIELD.map((f) => (
              <Link key={f.category} href={f.href} className="group flex flex-col soft-card p-6">
                <div className="flex items-start justify-between gap-3">
                  <WoodIcon icon={f.icon} className="h-11 w-11" />
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-text-muted transition-colors group-hover:text-accent" />
                </div>
                <h3 className="mt-4 font-display text-lg text-text-primary">{f.category}</h3>
                <p className="font-code text-[11px] uppercase tracking-wider text-text-tertiary">
                  {f.who}
                </p>
                <p className="mt-2 font-body-serif text-sm leading-relaxed text-text-secondary">
                  {f.body}
                </p>
              </Link>
            ))}
            <div className="flex flex-col rounded-2xl border border-accent-bg bg-accent-bg-subtle p-6">
              <WoodIcon icon={Brain} className="h-11 w-11" />
              <h3 className="mt-4 font-display text-lg text-accent">The brain itself</h3>
              <p className="font-code text-[11px] uppercase tracking-wider text-text-tertiary">
                Cabinet
              </p>
              <p className="mt-2 font-body-serif text-sm leading-relaxed text-text-secondary">
                Knowledge, files, agents, and the live apps they render, in one place your
                company owns. That is the whole product.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ─── Master matrix ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">At a glance</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            The 2026 field, side by side
          </h2>
          <p className="mt-4 max-w-2xl font-body-serif leading-relaxed text-text-secondary">
            The capabilities that decide the choice, with the rows where a competitor is
            ahead left in on purpose. Open any head-to-head below for the full picture.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 font-code text-[11px] uppercase tracking-[0.12em] text-text-tertiary lg:hidden">
            <span aria-hidden className="text-accent">↔</span>
            Swipe to compare all six
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl bg-bg-card shadow-[0_8px_30px_-14px_rgba(150,108,68,0.32)] ring-1 ring-[rgba(59,47,47,0.05)]">
            <div className="compare-matrix-scroll overflow-x-auto" tabIndex={0} aria-label="Comparison matrix. Swipe horizontally to see all competitors.">
              <table className="w-full min-w-[52rem] text-sm">
                <thead>
                  <tr className="border-b border-border-dark">
                    <th className="sticky left-0 bg-bg-card px-5 py-4 text-left font-medium text-text-secondary">
                      Capability
                    </th>
                    {COLUMNS.map((col) => (
                      <th
                        key={col}
                        className={`px-4 py-4 text-center ${
                          col === "Cabinet"
                            ? "bg-accent-bg-subtle font-semibold text-accent"
                            : "font-medium text-text-tertiary"
                        }`}
                      >
                        {brandify(col)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MATRIX.map((row) => (
                    <tr key={row.feature} className="border-b border-border-light last:border-0">
                      <td className="sticky left-0 bg-bg-card px-5 py-3.5 font-body-serif text-text-primary">
                        {row.feature}
                      </td>
                      {row.cells.map((cell, i) => (
                        <td
                          key={COLUMNS[i]}
                          className={`px-4 py-3.5 ${i === 0 ? "bg-accent-bg-subtle/60" : ""}`}
                        >
                          <MatrixIcon value={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-border-light px-5 py-3 font-code text-[11px] text-text-tertiary">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-green" aria-hidden /> Included
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Minus className="h-3.5 w-3.5 text-accent-light" aria-hidden /> Partial
              </span>
              <span className="inline-flex items-center gap-1.5">
                <X className="h-3.5 w-3.5 text-text-muted" aria-hidden /> Not included
              </span>
              <span className="ml-auto">Reflects public information as of {COMPARE_ASOF}.</span>
            </div>
          </div>
        </div>
      </section>
      {/* ─── Head-to-head spokes ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">Head to head</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Pick a comparison
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {COMPARISONS.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="group flex gap-4 soft-card p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                  <WoodIcon icon={c.icon} className="h-10 w-10" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-display text-lg text-text-primary">
                      Cabinet{" "}vs {c.competitor}
                    </h3>
                    <span className="font-code text-[11px] uppercase tracking-wider text-text-tertiary">
                      {c.category}
                    </span>
                  </div>
                  <p className="mt-1.5 font-body-serif text-sm leading-relaxed text-text-secondary">
                    {brandify(c.oneLiner)}
                  </p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 self-center text-text-muted transition-colors group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* ─── Three-way comparisons ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">Three at once</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Three-way comparisons
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {THREEWAYS.map((t) => (
              <Link
                key={t.slug}
                href={`/compare/${t.slug}`}
                className="group flex items-center gap-3 soft-card p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <WoodIcon icon={t.icon} className="h-9 w-9" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-text-primary">
                    {t.contenders.map((c) => c.name).join(" vs ")}
                  </div>
                  <div className="font-code text-xs text-text-tertiary">{brandify(t.oneLiner)}</div>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-text-muted transition-colors group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* ─── Round-ups ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">Shortlists</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Alternatives, ranked
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ROUNDUPS.map((r) => (
              <Link
                key={r.slug}
                href={`/compare/${r.slug}`}
                className="group flex items-center gap-3 soft-card p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <WoodIcon icon={r.icon} className="h-9 w-9" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-text-primary">{r.competitor} alternatives</div>
                  <div className="font-code text-xs text-text-tertiary">{brandify(r.oneLiner)}</div>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-text-muted transition-colors group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* ─── Migration guides ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">Switching</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Migration guides
          </h2>
          <p className="mt-4 max-w-2xl font-body-serif leading-relaxed text-text-secondary">
            Moving from another tool? These walk you through it, end to end, so you keep your
            work and end up owning it.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {MIGRATIONS.map((m) => (
              <Link
                key={m.slug}
                href={`/compare/${m.slug}`}
                className="group flex items-center gap-3 soft-card p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <WoodIcon icon={m.icon} className="h-9 w-9" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-text-primary">Migrate from {m.from}</div>
                  <div className="font-code text-xs text-text-tertiary">{brandify(m.oneLiner)}</div>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-text-muted transition-colors group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* ─── The wedge ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">Why Cabinet</p>
          <h2 className="max-w-2xl font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Built to be the brain, and the only one you own
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {WEDGE.map((w) => (
              <div key={w.title} className="soft-card p-6">
                <WoodIcon icon={w.icon} className="h-12 w-12" />
                <h3 className="mt-4 font-display text-lg text-text-primary">{w.title}</h3>
                <p className="mt-2 font-body-serif text-sm leading-relaxed text-text-secondary">
                  {brandify(w.body)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ─── CTA ─── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Own your knowledge. Keep your AI. Start free.
          </h2>
          <p className="mt-4 font-body-serif leading-relaxed text-text-secondary">Run <span className="font-brand italic">Cabinet</span>{" "}in minutes, or get a guided walkthrough.
                                  </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#get-cabinet"
                className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold btn-wood"
              >
                Get started free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-full card-skin px-7 py-3.5 text-base font-semibold text-text-primary shadow-sm transition-all hover:border-border-dark hover:bg-bg-card-hover"
              >
                Book a demo
              </Link>
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-code text-sm text-text-tertiary transition-colors hover:text-text-primary"
            >
              <Star className="h-4 w-4" />Star <span className="font-brand italic">Cabinet</span>{" "}on GitHub
                                        </a>
          </div>
        </div>
      </section>
    </main>
  );
}
