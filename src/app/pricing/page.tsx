import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Cloud, Download } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { DiscordIcon } from "@/components/site-icons";
import { WaitlistCloudBackdrop } from "@/components/waitlist-cloud-backdrop";
import { PricingInteractive } from "@/components/pricing-interactive";
import { PricingComparisonTable } from "@/components/pricing-comparison-table";
import { DISCORD_URL, MACOS_DOWNLOAD_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Pricing | Cabinet",
  description:
    "Cabinet is free and open source. Cabinet Cloud is hosted on a dedicated container: Pro from $20/mo, Max from $49/mo. Self-host always works.",
  openGraph: {
    title: "Pricing | Cabinet",
    description:
      "Cabinet is free and open source. Hosted plans from $20/mo. Self-host always works.",
    type: "website",
    url: "https://runcabinet.com/pricing",
  },
};

const FAQS: Array<{ q: string; a: React.ReactNode }> = [
  {
    q: "It's open source. Why would I pay?",
    a: (
      <>
        You don&apos;t have to. Self-Hosted is free forever and gets every
        Cabinet feature. Pay only when you want it running 24/7 on a managed
        container: no server to stand up, no OS to babysit, no backups to
        wire.
      </>
    ),
  },
  {
    q: "Can I move from Cloud back to Self-Hosted later?",
    a: (
      <>
        Yes. Your Cabinet is plain markdown on disk. Export the whole directory
        with one click and run it locally. We don&apos;t hold your data hostage
        and there&apos;s nothing to migrate.
      </>
    ),
  },
  {
    q: "Where does my data live?",
    a: (
      <>
        Plain markdown on your container&apos;s encrypted disk. Region pinning
        is available on Max and Enterprise. Self-Hosted lives wherever you put
        it.
      </>
    ),
  },
  {
    q: "Do you train on my data?",
    a: <>Never. Your Cabinet is your Cabinet.</>,
  },
  {
    q: "What about AI costs?",
    a: (
      <>
        <strong>BYOAI</strong> (bring your own AI) is the default on every
        Cloud tier, and it&apos;s free. Plug in OpenAI, Anthropic, Google
        Gemini, xAI Grok, DeepSeek, or run a local model with Ollama. If
        you&apos;d rather not juggle keys, add <strong>Managed AI</strong> from
        $10/mo and we&apos;ll provide the access on one invoice.
      </>
    ),
  },
  {
    q: "Is there a free trial of Cloud?",
    a: (
      <>
        Self-Hosted <em>is</em> the free trial: same code, same features. Run
        it locally, fall in love, then move to Cloud when you want it always
        on.
      </>
    ),
  },
  {
    q: "Cancel anytime?",
    a: (
      <>
        Yes. Monthly plans cancel at the end of the period. Annual plans are
        non-refundable after 30 days.
      </>
    ),
  },
  {
    q: "What's in 'data protection' on Max?",
    a: (
      <>
        Encrypted backups, 30-day retention, point-in-time restore, and region
        pinning. Pro has daily backups with 7-day retention; Max hardens that
        for serious work.
      </>
    ),
  },
  {
    q: "Do you have multi-user / team plans?",
    a: (
      <>
        Cabinet is single-user today. Multi-user is shipping on the Enterprise
        track first; a self-serve <strong>Team</strong> tier is in early access.
        Sign up and we&apos;ll prioritize you.
      </>
    ),
  },
  {
    q: "How fast is 'instant' support?",
    a: (
      <>
        Max: under one hour during business hours via in-app chat. Enterprise:
        a dedicated Slack channel and a named contact who actually knows your
        setup.
      </>
    ),
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <SiteNavbar />

      {/* ─── Hero (cloud backdrop, /cloud-inspired warmth) ─── */}
      <section className="relative py-20 md:py-24 dot-grid overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-90">
          <WaitlistCloudBackdrop />
        </div>

        <div className="relative z-[1] max-w-4xl mx-auto px-6 text-center">
          <Image
            src="/cabinet-icon.png"
            alt="Cabinet"
            width={64}
            height={64}
            className="mx-auto mb-6 mt-2 rounded-2xl"
          />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-text-primary tracking-tight leading-[1.05] mb-5">
            Your Cabinet, anywhere.
            <br />
            <span className="italic gradient-text">Your AI team, always on.</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary font-body-serif leading-relaxed max-w-2xl mx-auto mb-4">
            Open your Cabinet from any device while your AI agents keep working
            (drafting, researching, organizing) even when your laptop is
            closed.
          </p>
          <p className="text-base text-text-tertiary font-body-serif italic leading-relaxed max-w-2xl mx-auto mb-8">
            Pick the plan that fits how you work. Self-host always stays free.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.7rem] font-code uppercase tracking-[0.2em] text-text-tertiary">
            <span>MIT licensed</span>
            <span aria-hidden className="text-text-muted">·</span>
            <span>Export anytime</span>
            <span aria-hidden className="text-text-muted">·</span>
            <span>No vendor lock-in</span>
          </div>
        </div>
      </section>

      {/* ─── BYOAI providers band ─── */}
      <section className="border-t border-border bg-bg-warm py-10 md:py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[0.7rem] font-code uppercase tracking-[0.22em] text-text-tertiary mb-5">
            Bring your own AI · works with the providers you already use
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3">
            {[
              "OpenAI",
              "Anthropic",
              "Google Gemini",
              "xAI Grok",
              "DeepSeek",
              "Ollama",
            ].map((provider) => (
              <span
                key={provider}
                className="font-display text-lg md:text-xl text-text-secondary"
              >
                {provider}
              </span>
            ))}
            <span className="font-code text-xs text-text-tertiary self-center">
              + more
            </span>
          </div>
        </div>
      </section>

      {/* ─── Billing toggle + 4-card grid + Team early callout ─── */}
      <section className="border-t border-border bg-bg pt-16 pb-20 md:pt-20 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <PricingInteractive />
        </div>
      </section>

      {/* ─── Comparison table ─── */}
      <section className="border-t border-border bg-bg-warm py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Compare</p>
            <h2 className="text-3xl md:text-4xl font-display text-text-primary">
              The whole picture.
            </h2>
          </div>
          <PricingComparisonTable />
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="border-t border-border bg-bg py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-label mb-2">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-display text-text-primary">
              Questions &amp; Answers
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="dict-card p-6 md:p-7">
                <h3 className="font-display text-lg text-text-primary mb-2">
                  {q}
                </h3>
                <p className="text-[15px] text-text-secondary font-body-serif leading-relaxed">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA band ─── */}
      <section className="border-t border-border bg-bg-warm py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-3">
            Still deciding?
          </h2>
          <p className="text-base text-text-secondary font-body-serif leading-relaxed mb-8">
            Try Self-Hosted first. It&apos;s the same Cabinet, just on your
            machine.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={MACOS_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border-dark bg-bg-card px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-card-hover"
            >
              <Download className="h-4 w-4" />
              Try Self-Hosted now
            </a>
            <a
              href="/cloud?source=pricing-final"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-warm shadow-sm"
            >
              <Cloud className="h-4 w-4" />
              See Cabinet Cloud
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-6 text-xs text-text-tertiary font-code">
            Questions? Email{" "}
            <a
              href="mailto:hi@runcabinet.com"
              className="underline underline-offset-2 hover:text-text-primary"
            >
              hi@runcabinet.com
            </a>{" "}
            or join us on{" "}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-text-primary"
            >
              <DiscordIcon className="h-3 w-3" />
              Discord
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
