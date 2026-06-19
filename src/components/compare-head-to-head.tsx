import Link from "next/link";
import {
  ArrowRight,
  Check,
  Star,
  Quote,
  ArrowRightLeft,
  ChevronDown,
} from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { WoodIcon } from "@/components/wood-icon";
import { CompareVerdict } from "@/components/compare-verdict";
import { CompareTable } from "@/components/compare-table";
import { GITHUB_URL } from "@/lib/site-config";
import { compareLabel, type Comparison } from "@/lib/compare";

const CTA_MICRO = "Open source · self-hosted · bring your own AI";

function PrimaryActions({ size = "lg" }: { size?: "lg" | "md" }) {
  const pad = size === "lg" ? "px-7 py-3.5 text-base" : "px-6 py-3 text-sm";
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href="/#get-started"
        className={`inline-flex items-center gap-2 rounded-xl btn-wood ${pad} font-semibold`}
      >
        Get started free <ArrowRight className="h-4 w-4" />
      </Link>
      <Link
        href="/demo"
        className={`inline-flex items-center gap-2 rounded-xl border border-border bg-bg-card ${pad} font-semibold text-text-primary shadow-sm transition-all hover:border-border-dark hover:bg-bg-card-hover`}
      >
        Book a demo
      </Link>
    </div>
  );
}

export function CompareHeadToHead({ data }: { data: Comparison }) {
  return (
    <main className="min-h-screen bg-bg">
      <SiteNavbar />

      {/* ─── Hero + verdict ─── */}
      <section className="relative overflow-hidden border-b border-border dot-grid">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 70% 0%, rgba(139, 94, 60, 0.08), transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 md:py-20">
          <nav aria-label="Breadcrumb" className="font-code text-xs text-text-tertiary">
            <Link href="/compare" className="transition-colors hover:text-text-primary">
              Compare
            </Link>
            <span className="mx-2 text-text-muted">/</span>
            <span className="text-text-secondary">Cabinet vs {data.competitor}</span>
          </nav>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.07] tracking-tight text-text-primary sm:text-5xl">
            {data.h1}
          </h1>
          <p className="mt-5 max-w-2xl font-body-serif text-lg leading-relaxed text-text-secondary">
            {data.lead}
          </p>

          <div className="mt-9">
            <CompareVerdict competitor={data.competitor} verdict={data.verdict} />
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <PrimaryActions />
            <p className="font-code text-xs text-text-tertiary">{CTA_MICRO}</p>
          </div>
        </div>
      </section>

      {/* ─── Core difference ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="section-label mb-3">The core difference</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            {data.coreDifference.heading}
          </h2>
          <div className="mt-6 space-y-4">
            {data.coreDifference.paras.map((p) => (
              <p key={p} className="font-body-serif text-lg leading-relaxed text-text-secondary">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Differentiators ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">Where Cabinet wins</p>
          <h2 className="max-w-2xl font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Three things {data.competitor} cannot do
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {data.differentiators.map((d) => (
              <div key={d.title} className="flex flex-col soft-card p-6">
                <WoodIcon icon={d.icon} className="h-12 w-12" />
                <h3 className="mt-4 font-display text-lg text-text-primary">{d.title}</h3>
                <p className="mt-2 font-body-serif text-sm leading-relaxed text-text-secondary">
                  {d.body}
                </p>
                {d.code && (
                  <pre className="mt-4 overflow-x-auto rounded-lg bg-bg-terminal px-4 py-3 font-code text-[12px] leading-relaxed text-[#E8DDD0]">
                    {d.code}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Comparison table ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="section-label mb-3">Feature by feature</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Cabinet vs {data.competitor}, side by side
          </h2>
          <p className="mt-4 font-body-serif leading-relaxed text-text-secondary">
            The features that actually decide this, including the ones where{" "}
            {data.competitor} comes out ahead.
          </p>
          <div className="mt-8">
            <CompareTable competitor={data.competitor} rows={data.rows} />
          </div>
        </div>
      </section>

      {/* ─── When the competitor wins ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="section-label mb-3">Being honest</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            {data.whenThemWins.heading}
          </h2>
          <ul className="mt-8 space-y-4">
            {data.whenThemWins.points.map((p) => (
              <li key={p} className="flex gap-3 soft-card p-5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-text-tertiary" aria-hidden />
                <span className="font-body-serif leading-relaxed text-text-secondary">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Migration ─── */}
      {data.migration && (
        <section className="border-b border-border py-16">
          <div className="mx-auto max-w-3xl px-6">
            <div className="flex flex-col gap-4 soft-card p-7 sm:flex-row sm:items-start sm:gap-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                <WoodIcon icon={ArrowRightLeft} className="h-10 w-10" />
              </div>
              <div>
                <h2 className="font-display text-xl text-text-primary">
                  {data.migration.heading}
                </h2>
                <p className="mt-2 font-body-serif leading-relaxed text-text-secondary">
                  {data.migration.body}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Switcher quote (illustrative) ─── */}
      {data.switcher && (
        <section className="border-b border-border bg-bg-warm py-20">
          <div className="mx-auto max-w-3xl px-6">
            <div className="flex items-center justify-center gap-2">
              <p className="section-label">From the field</p>
              <span className="rounded-full bg-bg-card px-2.5 py-0.5 font-code text-[10px] uppercase tracking-wider text-text-tertiary ring-1 ring-border-light">
                Illustrative
              </span>
            </div>
            <figure className="mt-8 soft-card p-8 sm:p-10">
              <WoodIcon icon={Quote} className="h-10 w-10" />
              <blockquote className="mt-4 font-display text-xl leading-snug tracking-tight text-text-primary md:text-2xl">
                {data.switcher.quote}
              </blockquote>
              <figcaption className="mt-5 font-code text-sm text-text-tertiary">
                {data.switcher.attribution}
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* ─── FAQ ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="section-label mb-3">Questions</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Cabinet vs {data.competitor}, answered
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
                <p className="mt-3 font-body-serif leading-relaxed text-text-secondary">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Own your knowledge. Keep your AI. Start free.
          </h2>
          <p className="mt-4 font-body-serif leading-relaxed text-text-secondary">
            Run Cabinet in minutes, or get a guided walkthrough. Your files, your models, your infrastructure.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <PrimaryActions />
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
