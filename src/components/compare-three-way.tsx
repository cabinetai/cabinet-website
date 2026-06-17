import Link from "next/link";
import { ArrowRight, Check, X, Minus, Star, ChevronDown } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { GITHUB_URL } from "@/lib/site-config";
import { compareLabel, type Cell, type ThreeWay } from "@/lib/compare";

function CellIcon({ value }: { value: Cell }) {
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

export function CompareThreeWay({ data }: { data: ThreeWay }) {
  const cabinetIdx = data.contenders.findIndex((c) => c.name === "Cabinet");

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
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 md:py-20">
          <nav aria-label="Breadcrumb" className="font-code text-xs text-text-tertiary">
            <Link href="/compare" className="transition-colors hover:text-text-primary">
              Compare
            </Link>
            <span className="mx-2 text-text-muted">/</span>
            <span className="text-text-secondary">
              {data.contenders.map((c) => c.name).join(" vs ")}
            </span>
          </nav>
          <h1 className="mt-5 font-display text-4xl leading-[1.07] tracking-tight text-text-primary sm:text-5xl">
            {data.h1}
          </h1>
          <p className="mt-5 max-w-2xl font-body-serif text-lg leading-relaxed text-text-secondary">
            {data.intro}
          </p>
          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {data.contenders.map((c, i) => (
              <div
                key={c.name}
                className={`rounded-2xl border p-5 ${
                  i === cabinetIdx
                    ? "border-accent-bg bg-accent-bg-subtle"
                    : "border-border bg-bg-card"
                }`}
              >
                <h2
                  className={`font-display text-lg ${
                    i === cabinetIdx ? "text-accent" : "text-text-primary"
                  }`}
                >
                  {c.name}
                </h2>
                <p className="mt-1.5 font-body-serif text-sm leading-relaxed text-text-secondary">
                  {c.tagline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Matrix ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">Side by side</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            The features that decide it
          </h2>
          <div className="mt-8 overflow-hidden soft-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] text-sm">
                <thead>
                  <tr className="border-b border-border-dark">
                    <th className="sticky left-0 bg-bg-card px-5 py-4 text-left font-medium text-text-secondary">
                      Feature
                    </th>
                    {data.contenders.map((c, i) => (
                      <th
                        key={c.name}
                        className={`w-32 px-4 py-4 text-center ${
                          i === cabinetIdx
                            ? "bg-accent-bg-subtle font-semibold text-accent"
                            : "font-medium text-text-tertiary"
                        }`}
                      >
                        {c.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((row) => (
                    <tr key={row.feature} className="border-b border-border-light last:border-0">
                      <td className="sticky left-0 bg-bg-card px-5 py-3.5 font-body-serif text-text-primary">
                        {row.feature}
                      </td>
                      {row.cells.map((cell, i) => (
                        <td
                          key={data.contenders[i].name}
                          className={`px-4 py-3.5 ${i === cabinetIdx ? "bg-accent-bg-subtle/60" : ""}`}
                        >
                          <CellIcon value={cell} />
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

      {/* ─── Best for ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">Who each is for</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Pick by what you need
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {data.bestFor.map((b) => (
              <div key={b.contender} className="soft-card p-6">
                <h3 className="font-display text-lg text-text-primary">{b.contender}</h3>
                <p className="mt-2 font-body-serif text-sm leading-relaxed text-text-secondary">
                  {b.who}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Verdict ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="section-label mb-3">The verdict</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            So which should you choose?
          </h2>
          <div className="mt-6 space-y-4">
            {data.verdictParas.map((p) => (
              <p key={p} className="font-body-serif text-lg leading-relaxed text-text-secondary">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="section-label mb-3">Questions</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Answered
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
            Own your knowledge. Keep your AI. Start free.
          </h2>
          <p className="mt-4 font-body-serif leading-relaxed text-text-secondary">
            Run Cabinet in minutes, or get a guided walkthrough.
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
