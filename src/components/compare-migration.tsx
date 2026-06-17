import Link from "next/link";
import { ArrowRight, Check, AlertTriangle, Star, ChevronDown } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { GITHUB_URL } from "@/lib/site-config";
import { compareLabel, type Migration } from "@/lib/compare";

export function CompareMigration({ data }: { data: Migration }) {
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
            <span className="text-text-secondary">Migrate from {data.from}</span>
          </nav>
          <h1 className="mt-5 font-display text-4xl leading-[1.07] tracking-tight text-text-primary sm:text-5xl">
            {data.h1}
          </h1>
          <p className="mt-5 font-body-serif text-lg leading-relaxed text-text-secondary">
            {data.intro}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/#get-started"
              className="inline-flex items-center gap-2 rounded-xl btn-wood px-7 py-3.5 text-base font-semibold"
            >
              Get started free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/compare/cabinet-vs-${data.fromSlug}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg-card px-7 py-3.5 text-base font-semibold text-text-primary shadow-sm transition-all hover:border-border-dark hover:bg-bg-card-hover"
            >
              {data.from} vs Cabinet
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Steps ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="section-label mb-3">Step by step</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Moving over
          </h2>
          <ol className="mt-8 space-y-4">
            {data.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 soft-card p-6">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-bg font-display text-accent">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display text-lg text-text-primary">{s.title}</h3>
                  <p className="mt-1.5 font-body-serif leading-relaxed text-text-secondary">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── What moves over ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="section-label mb-3">What moves over</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Your work comes with you
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {data.whatMovesOver.map((m) => (
              <li key={m} className="flex gap-3 soft-card p-5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden />
                <span className="font-body-serif leading-relaxed text-text-secondary">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── What to watch out for (honest) ─── */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className="section-label mb-3">Being honest</p>
          <h2 className="font-display text-2xl tracking-tight text-text-primary md:text-3xl">
            What to watch out for
          </h2>
          <ul className="mt-6 space-y-3">
            {data.watchOut.map((w) => (
              <li key={w} className="flex gap-3 soft-card p-5">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" aria-hidden />
                <span className="font-body-serif leading-relaxed text-text-secondary">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── After ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="section-label mb-3">After the move</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            What you gain
          </h2>
          <ul className="mt-8 space-y-3">
            {data.afterValue.map((v) => (
              <li key={v} className="flex gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden />
                <span className="font-body-serif text-lg leading-relaxed text-text-secondary">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="section-label mb-3">Questions</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Migration, answered
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

      {/* ─── CTA ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Move once. Own it from here.
          </h2>
          <p className="mt-4 font-body-serif leading-relaxed text-text-secondary">
            Bring your {data.from} content into a knowledge base you keep, and put agents to work on it.
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
          <p className="section-label mb-6">Keep exploring</p>
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
