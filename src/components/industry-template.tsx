import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { INDUSTRIES, type Industry } from "@/lib/industries";

export function IndustryTemplate({ industry }: { industry: Industry }) {
  const Icon = industry.icon;
  const others = INDUSTRIES.filter((i) => i.slug !== industry.slug);

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
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-card px-4 py-1.5 text-sm font-code text-accent shadow-sm">
            <Icon className="h-4 w-4" />
            {industry.eyebrow}
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-text-primary sm:text-5xl md:text-6xl">
            {industry.headline}
          </h1>
          <p className="mt-6 max-w-2xl font-body-serif text-lg leading-relaxed text-text-secondary md:text-xl">
            {industry.subhead}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
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
        </div>
      </section>

      {/* ─── Stakes ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">Why it matters here</p>
          <h2 className="max-w-2xl font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            {industry.stakes.heading}
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {industry.stakes.points.map((p) => (
              <div key={p} className="rounded-xl border border-border bg-bg-card p-6">
                <p className="font-body-serif leading-relaxed text-text-secondary">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What teams run ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">In practice</p>
          <h2 className="max-w-2xl font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            What your teams put Cabinet to work on
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {industry.uses.map((u) => (
              <div key={u} className="flex items-start gap-3 rounded-2xl border border-border bg-bg-card p-6">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="font-body-serif leading-relaxed text-text-secondary">{u}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sovereignty ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-bg text-accent">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Your data never leaves your control
          </h2>
          <p className="mt-4 font-body-serif text-lg leading-relaxed text-text-secondary">
            {industry.complianceNote}
          </p>
          <p className="mt-3 font-code text-xs text-text-tertiary">
            Open source · self-hosted · bring your own keys · git-backed audit trail
          </p>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Put AI to work. Keep the data yours.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
        </div>
      </section>

      {/* ─── Other industries ─── */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-6">Cabinet across industries</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => {
              const OIcon = o.icon;
              return (
                <Link
                  key={o.slug}
                  href={`/industries/${o.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-bg-card p-5 transition-all hover:border-border-dark hover:bg-bg-card-hover"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-bg text-accent">
                    <OIcon className="h-5 w-5" />
                  </div>
                  <div className="font-display text-text-primary">{o.label}</div>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-text-muted transition-colors group-hover:text-accent" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
