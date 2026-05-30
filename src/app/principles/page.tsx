import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Code2, Server, Lock } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { PrinciplesShowcase } from "@/components/principles-showcase";
import { DiscordIcon, GithubIcon } from "@/components/site-icons";
import { DISCORD_URL, GITHUB_URL, MACOS_DOWNLOAD_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Principles — Cabinet",
  description:
    "The principles Cabinet is built on: your data stays yours, git everything, bring your own AI, keep it simple, security by design, and self-hosted by default. Every product decision gets weighed against these.",
  alternates: { canonical: "https://runcabinet.com/principles" },
  openGraph: {
    title: "Principles — Cabinet",
    description:
      "Yours · Git everything · BYOAI · KISS · Security · Self-hosted. The six principles every Cabinet decision is weighed against.",
    type: "website",
    url: "https://runcabinet.com/principles",
  },
};

const PROVIDERS = [
  { src: "/providers/claude.svg", name: "Claude" },
  { src: "/providers/openai.png", name: "OpenAI" },
  { src: "/providers/gemini.svg", name: "Gemini" },
  { src: "/providers/grok.svg", name: "Grok" },
  { src: "/providers/copilot.svg", name: "Copilot" },
  { src: "/providers/cursor.svg", name: "Cursor" },
  { src: "/providers/opencode.svg", name: "opencode" },
  { src: "/providers/pi.svg", name: "Pi" },
];

const TRUST_BADGES = [
  {
    icon: ShieldCheck,
    label: "SOC 2 Type II",
    status: "In progress",
    desc: "We're working toward it — and we'll show you the report, not just a badge.",
  },
  {
    icon: Code2,
    label: "Open source",
    desc: "MIT licensed. Read every line, fork it, or run your own build.",
  },
  {
    icon: Server,
    label: "Self-hosted",
    desc: "Runs in your environment, under the controls you already enforce.",
  },
  {
    icon: Lock,
    label: "Not training data",
    desc: "Your prompts and content are never used to train a model.",
  },
];

const READ_ON = [
  {
    title: "Philosophy",
    desc: "The 90-second pitch.",
    href: "/#karpathy",
  },
  {
    title: "Cabinet vs the alternatives",
    desc: "How these principles play out vs Obsidian and Notion.",
    href: "/#compare",
  },
  {
    title: "Bring your own AI",
    desc: "BYOAI in practice.",
    href: "/#features",
  },
];

export default function PrinciplesPage() {
  return (
    <main className="min-h-screen bg-bg">
      <SiteNavbar />

      {/* ── Hero ── */}
      <section className="relative py-16 md:py-24 dot-grid overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="section-label mb-3">Principles</p>
          <h1 className="text-4xl md:text-5xl font-display text-text-primary tracking-tight leading-[1.05] mb-5">
            What Cabinet is <span className="italic gradient-text">built on</span>
          </h1>
          <p className="text-lg text-text-secondary font-body-serif leading-relaxed">
            Cabinet is built around a few principles we think matter deeply for
            the future of AI + data tools. Every product decision gets weighed
            against these.
          </p>
        </div>
      </section>

      {/* ── The six principles ── */}
      <section className="pb-16 md:pb-20 bg-bg">
        <div className="max-w-6xl mx-auto px-6">
          <PrinciplesShowcase />
          <p className="mt-12 text-center font-body-serif italic text-text-secondary text-lg">
            If a feature would break any of these, it doesn&apos;t make it in.
          </p>
        </div>
      </section>

      {/* ── Bring your own AI — provider logos ── */}
      <section className="py-20 md:py-24 border-t border-border bg-bg-warm">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="section-label mb-3">Bring your own AI</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            Works with the AI you already pay for
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed mb-12">
            Cabinet runs on your existing model accounts and subscriptions. There&apos;s
            no bundled inference marked up on top, and no new AI vendor to push through
            procurement — point it at what your team already uses.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {PROVIDERS.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2.5 opacity-75 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  width={26}
                  height={26}
                  className="object-contain"
                  style={{ width: 26, height: 26 }}
                />
                <span className="text-sm font-medium text-text-secondary">{p.name}</span>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm font-code text-text-tertiary">
            …plus local models, and whatever comes next.
          </p>
        </div>
      </section>

      {/* ── Built for organizations ── */}
      <section className="py-20 md:py-24 border-t border-border bg-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Built for organizations</p>
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
              Designed to clear a security review
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed">
              The people who sign off on new tools — security, legal, platform
              owners — should come away with less to worry about, not more.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {TRUST_BADGES.map((b) => (
              <div
                key={b.label}
                className="rounded-2xl border border-border bg-bg-card p-6 card-hover"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-bg text-accent">
                    <b.icon className="h-5 w-5" strokeWidth={2.25} />
                  </div>
                  {b.status && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      {b.status}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg text-text-primary mb-1.5">
                  {b.label}
                </h3>
                <p className="text-sm text-text-secondary font-body-serif leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-text-tertiary font-body-serif">
            Questions for a vendor review?{" "}
            <a
              href="mailto:hi@runcabinet.com"
              className="text-accent underline underline-offset-2 hover:text-accent-warm"
            >
              hi@runcabinet.com
            </a>
          </p>
        </div>
      </section>

      {/* ── Read on ── */}
      <section className="py-20 md:py-24 border-t border-border bg-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Read on</p>
            <h2 className="text-3xl md:text-4xl font-display text-text-primary">
              Go deeper
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {READ_ON.map((r) => (
              <a
                key={r.title}
                href={r.href}
                className="group flex flex-col rounded-2xl border border-border bg-bg-card p-7 card-hover"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-display text-lg text-text-primary">
                    {r.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-text-tertiary shrink-0 transition-all group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <p className="text-sm text-text-secondary font-body-serif leading-relaxed">
                  {r.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-24 border-t border-border bg-bg-warm">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Image
            src="/cabinet-icon.png"
            alt="Cabinet"
            width={56}
            height={56}
            className="mx-auto mb-6 rounded-xl"
          />
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            Principles you can read in the source
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto leading-relaxed font-body-serif">
            Cabinet is free, open source, and self-hosted by default. Clone it,
            run it, and check the principles for yourself.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
            <a
              href={MACOS_DOWNLOAD_URL}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-accent hover:bg-accent-warm text-white font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download for Mac
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-border bg-bg-card text-sm font-semibold text-text-primary shadow-sm transition-all hover:border-border-dark hover:bg-bg-card-hover"
            >
              <GithubIcon className="w-4 h-4" /> Read the source
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-medium transition-colors shadow-sm shadow-[#5865F2]/20"
            >
              <DiscordIcon className="w-4 h-4" /> Join Discord
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-10 bg-bg">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-code text-text-tertiary">
          <div className="flex items-center gap-2.5">
            <Image
              src="/cabinet-icon.png"
              alt="Cabinet"
              width={22}
              height={22}
              className="rounded"
            />
            <span className="font-brand italic text-text-primary">Cabinet</span>
            <span className="text-text-muted">·</span>
            <span>Principles</span>
          </div>
          <Link href="/" className="hover:text-text-primary transition-colors">
            Back to home →
          </Link>
        </div>
      </footer>
    </main>
  );
}
