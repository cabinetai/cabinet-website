import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Clock,
  Bot,
  FileText,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { GITHUB_URL } from "@/lib/site-config";
import { SOLUTIONS, SOLUTION_STORIES, type Solution } from "@/lib/solutions";

// The three claims only Cabinet can make — shown on every solution page so the
// ownership/agentic wedge lands no matter which role page a buyer enters on.
const WEDGE = [
  {
    icon: FileText,
    title: "Your work lives on disk",
    body: "Everything is Markdown in a folder you own. Grep it, git it, back it up. No export, no lock-in, no vendor holding your knowledge hostage.",
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

export function SolutionTemplate({ solution }: { solution: Solution }) {
  const others = SOLUTIONS.filter((s) => s.slug !== solution.slug);
  const story = SOLUTION_STORIES[solution.slug];

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
                <img src={`/brand/icons/${solution.slug}.png`} alt="" className="h-6 w-6 object-contain" />
                {solution.eyebrow}
              </div>
              <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-text-primary sm:text-5xl">
                {solution.headline}
              </h1>
              <p className="mt-6 font-body-serif text-lg leading-relaxed text-text-secondary md:text-xl">
                {solution.subhead}
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
              <p className="mt-4 font-code text-xs text-text-tertiary">
                Open source · self-hosted · bring your own AI
              </p>
            </div>
            <div className="relative flex items-center justify-center">
              <div
                aria-hidden
                className="pointer-events-none absolute h-72 w-72 rounded-full md:h-80 md:w-80"
                style={{ background: "radial-gradient(circle, rgba(224,178,60,0.22), transparent 70%)" }}
              />
              <Image
                src={`/brand/heroes/sol-${solution.slug}.png`}
                alt={`Cabinet for ${solution.label}: ${solution.menuBlurb}`}
                width={720}
                height={720}
                priority
                className="relative mx-auto h-auto w-full max-w-md object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── The problem ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">The status quo</p>
          <h2 className="max-w-2xl font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            {solution.problem.heading}
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {solution.problem.points.map((p) => (
              <div key={p} className="soft-card p-6">
                <p className="font-body-serif leading-relaxed text-text-secondary">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The AI team ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">Your AI team</p>
          <h2 className="max-w-2xl font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Onboard the team {solution.label.toLowerCase()} actually needs
          </h2>
          <p className="mt-4 max-w-2xl font-body-serif leading-relaxed text-text-secondary">
            Each agent is a Markdown persona with a goal, skills, and a schedule. Edit the
            file, the agent updates. Delete it, it&apos;s gone. Every change is in git.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {solution.team.map((a) => (
              <div
                key={a.name}
                className="flex gap-4 soft-card p-6 card-hover"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-bg text-accent">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-display text-lg text-text-primary">{a.name}</h3>
                    <span className="font-code text-[11px] uppercase tracking-wider text-text-tertiary">
                      {a.role}
                    </span>
                  </div>
                  <p className="mt-1.5 font-body-serif text-sm leading-relaxed text-text-secondary">
                    {a.blurb}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it runs (routines) ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">Always-on</p>
          <h2 className="max-w-2xl font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Work that runs on a schedule, not when someone remembers
          </h2>
          <p className="mt-4 max-w-2xl font-body-serif leading-relaxed text-text-secondary">
            Routines are scheduled prompts attached to an agent. Same agent, same shape,
            every time, 24/7, whether or not anyone&apos;s online.
          </p>
          <div className="mt-10 divide-y divide-border-light overflow-hidden soft-card">
            {solution.routines.map((r) => (
              <div key={r.when} className="flex flex-col gap-1 p-6 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex shrink-0 items-center gap-2 sm:w-56">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="font-code text-sm text-accent-warm">{r.when}</span>
                </div>
                <p className="font-body-serif leading-relaxed text-text-secondary">{r.what}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Outcomes ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3 text-center">Outcomes</p>
          <div className="grid gap-6 sm:grid-cols-3">
            {solution.outcomes.map((o) => (
              <div key={o.label} className="soft-card p-8 text-center">
                <div className="font-display text-4xl tracking-tight text-accent md:text-5xl">
                  {o.stat}
                </div>
                <p className="mt-2 font-body-serif text-sm leading-relaxed text-text-secondary">
                  {o.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center font-code text-xs text-text-tertiary">
            Illustrative. Real benchmarks coming as teams report them.
          </p>
        </div>
      </section>

      {/* ─── Why Cabinet (the wedge) ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">Why Cabinet</p>
          <h2 className="max-w-2xl font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            The only one of these you actually own
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {WEDGE.map((w) => (
              <div key={w.title} className="soft-card p-6">
                <w.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 font-display text-lg text-text-primary">{w.title}</h3>
                <p className="mt-2 font-body-serif text-sm leading-relaxed text-text-secondary">
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stack ─── */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="font-code text-sm text-text-tertiary">
            Works with what {solution.label.toLowerCase()} already uses
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {solution.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-bg-card px-4 py-2 font-code text-sm text-text-secondary"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Story (illustrative) ─── */}
      <section className="border-b border-border bg-bg-warm py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-center justify-center gap-2">
            <p className="section-label">From the field</p>
            <span className="rounded-full bg-bg-card px-2.5 py-0.5 font-code text-[10px] uppercase tracking-wider text-text-tertiary ring-1 ring-border-light">
              Illustrative
            </span>
          </div>
          <div className="mt-8 grid items-center gap-8 soft-card p-8 sm:p-10 md:grid-cols-[200px_1fr]">
            <div className="text-center md:text-left">
              <div className="font-display text-5xl tracking-tight text-accent">{story.metric}</div>
              <p className="mt-2 font-body-serif text-sm leading-relaxed text-text-secondary">
                {story.metricLabel}
              </p>
            </div>
            <div>
              <blockquote className="font-display text-xl leading-snug tracking-tight text-text-primary md:text-2xl">
                &ldquo;{story.quote}&rdquo;
              </blockquote>
              <p className="mt-4 font-code text-sm text-text-tertiary">{story.attribution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-b border-border py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl tracking-tight text-text-primary md:text-4xl">
            Hire your {solution.label} team. Keep your data.
          </h2>
          <p className="mt-4 font-body-serif leading-relaxed text-text-secondary">
            Start free in minutes, or get a guided walkthrough. Begin from the{" "}
            <span className="font-code text-accent-warm">{solution.template}</span> template.
          </p>
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
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-code text-sm text-text-tertiary transition-colors hover:text-text-primary"
            >
              <Check className="h-4 w-4" /> Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ─── Other solutions ─── */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-6">Cabinet for every team</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/solutions/${o.slug}`}
                className="group flex items-center gap-3 rounded-2xl bg-bg-card p-5 card-hover"
              >
                <img
                  src={`/brand/icons/${o.slug}.png`}
                  alt=""
                  className="h-11 w-11 shrink-0 object-contain transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-2"
                />
                <div>
                  <div className="font-display text-text-primary">Cabinet for {o.label}</div>
                  <div className="text-xs text-text-tertiary">{o.menuBlurb}</div>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 -translate-x-1 text-text-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
