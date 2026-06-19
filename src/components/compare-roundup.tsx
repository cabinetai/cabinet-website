import Link from "next/link";
import {
  ArrowRight,
  Check,
  Star,
  ChevronDown,
  Trophy,
} from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { WoodIcon } from "@/components/wood-icon";
import { GITHUB_URL } from "@/lib/site-config";
import { compareLabel, type Roundup } from "@/lib/compare";

export function CompareRoundup({ data }: { data: Roundup }) {
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
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:py-20">
          <nav aria-label="Breadcrumb" className="font-code text-xs text-text-tertiary">
            <Link href="/compare" className="transition-colors hover:text-text-primary">
              Compare
            </Link>
            <span className="mx-2 text-text-muted">/</span>
            <span className="text-text-secondary">{data.competitor} alternatives</span>
          </nav>
          <h1 className="mt-5 font-display text-4xl leading-[1.07] tracking-tight text-text-primary sm:text-5xl">
            {data.h1}
          </h1>
          <p className="mt-5 font-body-serif text-lg leading-relaxed text-text-secondary">
            {data.intro}
          </p>
        </div>
      </section>

      {/* ─── Why leave ─── */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className="section-label mb-3">Why teams switch</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            {data.whyLeave.heading}
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {data.whyLeave.points.map((p) => (
              <li key={p} className="soft-card p-5">
                <p className="font-body-serif leading-relaxed text-text-secondary">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Top pick: Cabinet ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-bg bg-accent-bg-subtle px-3 py-1 font-code text-xs text-accent-warm">
            <WoodIcon icon={Trophy} className="h-6 w-6" /> Our pick
          </div>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            {data.topPick.heading}
          </h2>
          <p className="mt-4 font-body-serif text-lg leading-relaxed text-text-secondary">
            {data.topPick.body}
          </p>
          <ul className="mt-6 space-y-3">
            {data.topPick.reasons.map((r) => (
              <li key={r} className="flex gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden />
                <span className="font-body-serif leading-relaxed text-text-secondary">{r}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#get-started"
              className="inline-flex items-center gap-2 rounded-xl btn-wood px-7 py-3.5 text-base font-semibold"
            >
              Get started free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/compare/cabinet-vs-${data.competitorSlug}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg-card px-7 py-3.5 text-base font-semibold text-text-primary shadow-sm transition-all hover:border-border-dark hover:bg-bg-card-hover"
            >
              See Cabinet vs {data.competitor}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── The shortlist ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="section-label mb-3">The shortlist</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            {data.alternatives.length} {data.competitor} alternatives, honestly
          </h2>
          <div className="mt-8 space-y-4">
            {data.alternatives.map((a, i) => (
              <div key={a.name} className="soft-card p-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-sm text-text-tertiary">{i + 1}</span>
                  <h3 className="font-display text-lg text-text-primary">{a.name}</h3>
                  {a.vsSlug && (
                    <Link
                      href={`/compare/${a.vsSlug}`}
                      className="ml-auto font-code text-xs text-accent transition-colors hover:text-accent-warm"
                    >
                      Compare
                    </Link>
                  )}
                </div>
                <p className="mt-2 font-body-serif leading-relaxed text-text-secondary">{a.line}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-border-light bg-bg-warm px-4 py-3">
                    <p className="font-code text-[11px] uppercase tracking-wider text-green-warm">Best for</p>
                    <p className="mt-1 font-body-serif text-sm leading-relaxed text-text-secondary">{a.bestFor}</p>
                  </div>
                  <div className="rounded-lg border border-border-light bg-bg-warm px-4 py-3">
                    <p className="font-code text-[11px] uppercase tracking-wider text-accent-warm">The catch</p>
                    <p className="mt-1 font-body-serif text-sm leading-relaxed text-text-secondary">{a.theCatch}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Decision framework ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="section-label mb-3">Pick in ten seconds</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Which one is right for you
          </h2>
          <div className="mt-8 divide-y divide-border-light overflow-hidden soft-card">
            {data.framework.map((f) => (
              <div key={f.need} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:gap-6">
                <p className="font-body-serif leading-relaxed text-text-secondary sm:flex-1">
                  {f.need}
                </p>
                <span className="shrink-0 font-display text-text-primary">{f.pick}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="section-label mb-3">Questions</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            {data.competitor} alternatives, answered
          </h2>
          <div className="mt-8 divide-y divide-border-light overflow-hidden soft-card">
            {data.faqs.map((f) => (
              <details key={f.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base text-text-primary marker:hidden">
                  {f.q}
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-text-tertiary transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="mt-3 font-body-serif leading-relaxed text-text-secondary">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            The {data.competitor} alternative you actually own
          </h2>
          <p className="mt-4 font-body-serif leading-relaxed text-text-secondary">
            Run Cabinet in minutes, or get a guided walkthrough. Your files, your models, your infrastructure.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#get-started"
                className="inline-flex items-center gap-2 rounded-xl btn-wood px-7 py-3.5 text-base font-semibold"
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

      {/* ─── Related ─── */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-6">Keep comparing</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.related.map((slug) => (
              <Link
                key={slug}
                href={`/compare/${slug}`}
                className="group flex items-center justify-between gap-3 soft-card p-5 transition-all hover:border-border-dark hover:bg-bg-card-hover"
              >
                <span className="font-display text-text-primary">{compareLabel(slug)}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-text-muted transition-colors group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
