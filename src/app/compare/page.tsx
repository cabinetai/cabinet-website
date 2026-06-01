import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  X,
  Minus,
  ArrowRight,
  FileText,
  Cpu,
  ShieldCheck,
  Star,
} from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { GITHUB_URL } from "@/lib/site-config";
import { COMPARISONS, ROUNDUPS, type Cell } from "@/lib/compare";

const SITE = "https://runcabinet.com";

export const metadata: Metadata = {
  title: "Compare Cabinet: Honest Head-to-Heads vs Notion, Obsidian, Glean & Dust",
  description:
    "How Cabinet compares to Notion, Obsidian, Glean, and Dust. The only knowledge base where you own your whole KB and files, visualize live apps and dashboards, and have your team and AI agents work in it. Open source, self-hosted.",
  alternates: { canonical: `${SITE}/compare` },
  openGraph: {
    title: "Compare Cabinet vs Notion, Obsidian, Glean & Dust",
    description:
      "Honest, side-by-side comparisons. Cabinet is the only one of these you actually own: your whole KB and files, live apps, AI agents, self-hosted.",
    type: "website",
    url: `${SITE}/compare`,
    images: [{ url: `${SITE}/og.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Cabinet vs Notion, Obsidian, Glean & Dust",
    description:
      "Honest, side-by-side comparisons. Cabinet is the only one of these you actually own.",
    images: [`${SITE}/og.png`],
  },
};

// Curated cross-competitor view for the "at a glance" matrix. Per-competitor
// detail (and the rows where a competitor wins) lives on each spoke page.
const COLUMNS = ["Cabinet", "Notion", "Obsidian", "Glean", "Dust"] as const;
const MATRIX: { feature: string; cells: Cell[] }[] = [
  { feature: "Markdown files on disk you own", cells: [true, false, true, false, false] },
  { feature: "Self-hosted", cells: [true, false, true, "partial", "partial"] },
  { feature: "AI agents that act on your files", cells: [true, "partial", "partial", true, true] },
  { feature: "Scheduled agent routines", cells: [true, false, false, "partial", "partial"] },
  { feature: "Bring your own AI keys", cells: [true, false, "partial", "partial", true] },
  { feature: "Visualize web apps and dashboards", cells: [true, false, false, false, false] },
  { feature: "Web terminal", cells: [true, false, false, false, false] },
  { feature: "Authoring / knowledge editor", cells: [true, true, true, false, false] },
  { feature: "Open source", cells: [true, false, false, false, "partial"] },
  { feature: "No vendor lock-in", cells: [true, false, true, false, false] },
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

const WEDGE = [
  {
    icon: FileText,
    title: "Your whole KB lives on disk",
    body: "Your whole knowledge base lives in a folder you own: files, not locked rows, with live apps and dashboards rendered alongside. Grep it, git it, back it up. No export, no lock-in, no vendor holding your knowledge hostage.",
  },
  {
    icon: Cpu,
    title: "Bring your own AI",
    body: "Cabinet routes to the model accounts you already pay for. No bundled inference marked up on top, no new AI vendor through procurement.",
  },
  {
    icon: ShieldCheck,
    title: "Self-hosted by default",
    body: "Run it on your machine or your cloud. Your data never leaves your infrastructure: sovereignty first, with SSO and audit on the enterprise track.",
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
          <p className="section-label mb-3">Compare</p>
          <h1 className="max-w-3xl font-display text-4xl leading-[1.07] tracking-tight text-text-primary sm:text-5xl">
            Not another note-taking app
          </h1>
          <p className="mt-5 max-w-2xl font-body-serif text-lg leading-relaxed text-text-secondary">
            Notion is a cloud wiki. Obsidian is a single-player editor. Glean searches your tools. Dust connects assistants to them. Cabinet is the only one where you own your whole knowledge base and files, visualize live apps and dashboards, and have your team and AI agents work in it. Here is how they stack up, honestly.
          </p>
        </div>
      </section>

      {/* ─── Master matrix ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">At a glance</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Cabinet vs the field
          </h2>
          <p className="mt-4 max-w-2xl font-body-serif leading-relaxed text-text-secondary">
            The features that define the category. Open any head-to-head below for the full picture, including where each competitor comes out ahead.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-bg-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[44rem] text-sm">
                <thead>
                  <tr className="border-b border-border-dark">
                    <th className="sticky left-0 bg-bg-card px-5 py-4 text-left font-medium text-text-secondary">
                      Feature
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
                        {col}
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
              <span className="ml-auto">Reflects public information as of May 2026.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Head-to-head spokes ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
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
                className="group flex gap-4 rounded-2xl border border-border bg-bg-card p-6 transition-all hover:border-border-dark hover:bg-bg-card-hover"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-bg text-accent">
                  <c.icon className="h-5 w-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-display text-lg text-text-primary">
                      Cabinet vs {c.competitor}
                    </h3>
                    <span className="font-code text-[11px] uppercase tracking-wider text-text-tertiary">
                      {c.category}
                    </span>
                  </div>
                  <p className="mt-1.5 font-body-serif text-sm leading-relaxed text-text-secondary">
                    {c.oneLiner}
                  </p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 self-center text-text-muted transition-colors group-hover:text-accent" />
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
                className="group flex items-center gap-3 rounded-2xl border border-border bg-bg-card p-5 transition-all hover:border-border-dark hover:bg-bg-card-hover"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-bg text-accent">
                  <r.icon className="h-5 w-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-text-primary">{r.competitor} alternatives</div>
                  <div className="font-code text-xs text-text-tertiary">{r.oneLiner}</div>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-text-muted transition-colors group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The wedge ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">Why Cabinet</p>
          <h2 className="max-w-2xl font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            The only one of these you actually own
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {WEDGE.map((w) => (
              <div key={w.title} className="rounded-2xl border border-border bg-bg-card p-6">
                <w.icon className="h-6 w-6 text-accent" aria-hidden />
                <h3 className="mt-4 font-display text-lg text-text-primary">{w.title}</h3>
                <p className="mt-2 font-body-serif text-sm leading-relaxed text-text-secondary">
                  {w.body}
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
          <p className="mt-4 font-body-serif leading-relaxed text-text-secondary">
            Run Cabinet in minutes, or get a guided walkthrough.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#get-started"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-accent-warm hover:shadow-lg"
              >
                Get started free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg-card px-7 py-3.5 text-base font-semibold text-text-primary shadow-sm transition-all hover:border-border-dark hover:bg-bg-card-hover"
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
              <Star className="h-4 w-4" /> Star Cabinet on GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
