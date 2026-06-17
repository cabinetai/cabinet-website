import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { INDUSTRIES, type Industry } from "@/lib/industries";

export function IndustryTemplate({ industry }: { industry: Industry }) {
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
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-bg-card py-1.5 pl-2 pr-4 text-sm font-medium text-accent shadow-sm">
                <img src={`/brand/icons/${industry.slug}.png`} alt="" className="h-6 w-6 object-contain" />
                {industry.eyebrow}
              </div>
              <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-text-primary sm:text-5xl">
                {industry.headline}
              </h1>
              <p className="mt-6 font-body-serif text-lg leading-relaxed text-text-secondary md:text-xl">
                {industry.subhead}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/#get-started"
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold btn-wood"
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
            <div className="relative flex items-center justify-center">
              <div
                aria-hidden
                className="pointer-events-none absolute h-72 w-72 rounded-full md:h-80 md:w-80"
                style={{ background: "radial-gradient(circle, rgba(224,178,60,0.22), transparent 70%)" }}
              />
              <Image
                src={`/brand/heroes/ind-${industry.slug}.png`}
                alt={`Cabinet for ${industry.label}`}
                width={720}
                height={720}
                priority
                className="relative mx-auto h-auto w-full max-w-md object-contain drop-shadow-2xl"
              />
            </div>
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
              <div key={p} className="soft-card p-6">
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
              <div key={u} className="flex items-start gap-3 soft-card p-6">
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
              className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold btn-wood"
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
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/industries/${o.slug}`}
                className="group flex items-center gap-3 rounded-2xl bg-bg-card p-5 card-hover"
              >
                <img
                  src={`/brand/icons/${o.slug}.png`}
                  alt=""
                  className="h-11 w-11 shrink-0 object-contain transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-2"
                />
                <div className="font-display text-text-primary">{o.label}</div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 -translate-x-1 text-text-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
