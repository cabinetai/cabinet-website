import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  Download,
  FolderGit2,
  Server,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { PricingComparisonTable } from "@/components/pricing-comparison-table";
import { PricingInteractive } from "@/components/pricing-interactive";
import { SiteNavbar } from "@/components/site-navbar";
import { MACOS_DOWNLOAD_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Pricing | Cabinet",
  description:
    "Cabinet is free and open source. Run it yourself for $0, or join the Cabinet Cloud waitlist for managed hosting from $20 per month.",
  openGraph: {
    title: "Pricing | Cabinet",
    description:
      "Run Cabinet yourself for $0 or choose managed hosting. Bring the AI accounts your company already uses on every plan.",
    type: "website",
    url: "https://runcabinet.com/pricing",
  },
};

const OWNERSHIP_ROWS = [
  {
    icon: Server,
    label: "Cabinet platform",
    value: "Self-host for $0 or choose Cloud from $20 per month",
  },
  {
    icon: Bot,
    label: "AI accounts",
    value: "Use the providers and company accounts you already trust",
  },
  {
    icon: FolderGit2,
    label: "Company work",
    value: "Keep the full Cabinet directory and move it when you choose",
  },
];

const PROVIDERS = [
  { name: "OpenAI", src: "/brand/vendors/openai.png" },
  { name: "Claude", src: "/brand/vendors/claude.png" },
  { name: "Gemini", src: "/brand/vendors/gemini.png" },
  { name: "Grok", src: "/brand/vendors/grok.png" },
  { name: "Copilot", src: "/brand/vendors/copilot.png" },
  { name: "OpenCode", src: "/brand/vendors/opencode.png" },
];

const FAQS = [
  {
    q: "Cabinet is open source. Why would I pay?",
    a: "You do not have to. Self-hosted Cabinet is free and includes the complete product. Cabinet Cloud is for teams that want Cabinet available around the clock without running the server, updates, and backups themselves.",
  },
  {
    q: "Can I move from Cabinet Cloud back to self-hosted?",
    a: "Yes. Export the whole Cabinet directory and run it in your own environment. Your knowledge, files, apps, agents, and work history move together.",
  },
  {
    q: "Where does my data live?",
    a: "Self-hosted Cabinet lives wherever you deploy it. Cabinet Cloud uses encrypted storage on its managed container. Region pinning is available on Max and Enterprise.",
  },
  {
    q: "How are AI costs handled?",
    a: "Bring your own AI is the default on every plan. Connect the OpenAI, Anthropic, Google, xAI, or other provider access your company already manages. Managed AI starts at $10 per month if you prefer one invoice.",
  },
  {
    q: "Is there a free Cabinet Cloud trial?",
    a: "Self-hosted Cabinet is the free evaluation path and uses the same product. Cabinet Cloud is currently on a waitlist while the managed service is prepared for broader access.",
  },
  {
    q: "Does Cabinet support teams?",
    a: "Cabinet is single-user today. Shared workspaces are entering the Enterprise track first, with a self-serve Team plan in early access.",
  },
  {
    q: "What does data protection include on Max?",
    a: "Max includes encrypted backups, 30-day retention, point-in-time restore, and region pinning. Pro includes daily backups with 7-day retention.",
  },
  {
    q: "Can I cancel Cabinet Cloud?",
    a: "Monthly plans cancel at the end of the billing period. Annual plans are refundable during the first 30 days and non-refundable after that window.",
  },
] as const;

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function PricingPage() {
  return (
    <main className="min-h-screen overflow-clip bg-bg text-text-primary">
      <SiteNavbar fixed />

      <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8 lg:pt-36">
        <div aria-hidden className="home-hero-wash pointer-events-none absolute inset-0 -z-20" />
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-45 [mask-image:linear-gradient(to_bottom,black,transparent_76%)]"
        />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.84fr_1.16fr] lg:gap-18">
          <div className="max-w-2xl">
            <p className="section-label">Simple pricing · clear ownership</p>
            <h1 className="mt-5 max-w-[13ch] font-section text-[clamp(3rem,5.8vw,5.8rem)] leading-[0.96] text-text-primary">
              Run Cabinet free. Pay when it should stay on.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl">
              Self-host the complete product for $0. Choose Cabinet Cloud when you want managed hosting, updates, and backups. Keep AI provider choice separate on every plan.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#plans"
                className="btn-wood inline-flex h-13 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold sm:text-base"
              >
                Compare plans <ArrowRight aria-hidden className="h-4 w-4" />
              </a>
              <Link
                href="/demo?source=pricing-hero"
                className="ent-btn-secondary h-13 justify-center px-6 text-sm sm:text-base"
              >
                Book a technical review
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-text-tertiary">
              <span className="inline-flex items-center gap-1.5">
                <Check aria-hidden className="h-3.5 w-3.5 text-green" /> Open source
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check aria-hidden className="h-3.5 w-3.5 text-green" /> Whole-Cabinet export
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check aria-hidden className="h-3.5 w-3.5 text-green" /> Bring your own AI
              </span>
            </div>
          </div>

          <div className="home-product-surface relative overflow-hidden rounded-[30px] bg-bg-card p-5 sm:p-7 lg:p-8">
            <Image
              src="/brand/ui/scale.png"
              alt=""
              width={512}
              height={512}
              priority
              className="pointer-events-none absolute -right-16 -top-20 h-64 w-auto opacity-20 sm:h-80"
            />

            <div className="relative z-10 flex items-start justify-between gap-6">
              <div>
                <p className="section-label">Your operating model</p>
                <h2 className="mt-3 max-w-lg font-section text-3xl leading-[1.02] text-text-primary sm:text-4xl">
                  One Cabinet. Three decisions you keep separate.
                </h2>
              </div>
              <span className="hidden rounded-full bg-green-bg px-3 py-1.5 text-[10px] font-semibold text-green-warm sm:inline-flex">
                You choose
              </span>
            </div>

            <div className="relative z-10 mt-8 space-y-3">
              {OWNERSHIP_ROWS.map((row) => {
                const Icon = row.icon;
                return (
                  <div
                    key={row.label}
                    className="grid gap-3 rounded-2xl bg-bg-warm p-4 sm:grid-cols-[auto_0.62fr_1.38fr] sm:items-center sm:p-5"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-bg-card text-accent shadow-sm">
                      <Icon aria-hidden className="h-4 w-4" />
                    </span>
                    <strong className="text-sm text-text-primary">{row.label}</strong>
                    <span className="text-sm leading-relaxed text-text-secondary sm:text-right">
                      {row.value}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="relative z-10 mt-4 flex items-start gap-3 rounded-2xl bg-green-bg-subtle p-4 sm:p-5">
              <ShieldCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-green" />
              <p className="text-sm leading-relaxed text-text-secondary">
                <strong className="text-text-primary">No model bundle is required.</strong> Change the hosting plan without changing the providers, files, or workflows the company owns.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-viewport-section relative isolate overflow-hidden bg-green-bg-subtle px-5 sm:px-6 lg:px-8">
        <div aria-hidden className="home-light-ai-wash pointer-events-none absolute inset-0 -z-10" />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-18">
          <div className="max-w-2xl">
            <p className="section-label">Bring your own AI</p>
            <h2 className="mt-5 max-w-[12ch] font-section text-[clamp(2.7rem,5vw,4.8rem)] leading-[0.98] text-text-primary">
              Do not buy the same AI twice.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
              Connect the model accounts your company already funds. Cabinet charges for the operating environment, while provider usage stays on the provider bill you already control.
            </p>

            <div className="mt-8 flex flex-wrap gap-3" aria-label="Supported AI providers">
              {PROVIDERS.map((provider) => (
                <span
                  key={provider.name}
                  className="inline-flex items-center gap-2 rounded-full bg-bg-card px-3 py-2 text-xs font-semibold text-text-secondary shadow-sm"
                >
                  <Image
                    src={provider.src}
                    alt=""
                    width={28}
                    height={28}
                    className="h-6 w-6 object-contain"
                  />
                  {provider.name}
                </span>
              ))}
            </div>
          </div>

          <div className="home-product-surface rounded-[30px] bg-bg-card p-6 sm:p-8 lg:p-10">
            <div className="flex items-center justify-between gap-4">
              <span>
                <span className="section-label block">Example monthly equation</span>
                <strong className="mt-2 block font-section text-2xl text-text-primary">
                  Cabinet Cloud Pro
                </strong>
              </span>
              <WalletCards aria-hidden className="h-7 w-7 text-accent" />
            </div>

            <div className="mt-8 space-y-4 font-code text-xs">
              <PriceLine label="Cabinet Cloud Pro" value="$20 / month" />
              <PriceLine label="AI provider usage" value="Billed by your provider" />
              <PriceLine label="Required model bundle" value="$0" positive />
            </div>

            <div className="mt-7 flex flex-col gap-2 rounded-2xl bg-accent-bg-subtle p-5 sm:flex-row sm:items-end sm:justify-between">
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                  Platform total
                </span>
                <span className="mt-2 block text-sm text-text-secondary">plus your existing provider usage</span>
              </span>
              <strong className="font-section text-4xl leading-none text-text-primary">$20</strong>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-text-tertiary">
              Prefer one invoice? Managed AI starts at $10 per month on eligible Cabinet Cloud plans.
            </p>
          </div>
        </div>
      </section>

      <section id="plans" className="scroll-mt-24 px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="section-label">Choose how Cabinet runs</p>
            <h2 className="mt-5 font-section text-[clamp(2.7rem,5vw,4.8rem)] leading-[0.98] text-text-primary">
              Start with control. Add operations when you need them.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary">
              Every path keeps the complete Cabinet product. The price changes with hosting, backup, support, and organizational requirements.
            </p>
          </div>

          <div className="mt-14">
            <PricingInteractive />
          </div>
        </div>
      </section>

      <section className="bg-bg-warm px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="section-label">Plan details</p>
              <h2 className="mt-5 max-w-[11ch] font-section text-[clamp(2.7rem,4.8vw,4.5rem)] leading-[0.98] text-text-primary">
                Compare the operating responsibility.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-text-secondary lg:justify-self-end">
              The product stays the same. Hosting capacity, backup policy, support, and enterprise controls determine the plan.
            </p>
          </div>

          <div className="mt-12">
            <PricingComparisonTable />
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-18">
          <div className="max-w-xl">
            <p className="section-label">Pricing questions</p>
            <h2 className="mt-5 font-section text-[clamp(2.7rem,4.8vw,4.5rem)] leading-[0.98] text-text-primary">
              The details buyers usually need.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              The short version: self-hosting stays free, Cabinet Cloud is optional, and the company keeps control of its AI relationships and work.
            </p>
          </div>

          <div className="divide-y divide-border">
            {FAQS.map((item) => (
              <details key={item.q} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg">
                  <span className="font-section text-xl text-text-primary sm:text-2xl">{item.q}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-bg-card text-text-tertiary shadow-sm transition-transform group-open:rotate-180">
                    <ChevronDown aria-hidden className="h-4 w-4" />
                  </span>
                </summary>
                <p className="max-w-3xl pb-6 pr-12 text-base leading-relaxed text-text-secondary">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="home-proof-section px-5 sm:px-6 lg:px-8">
        <div className="home-cta-surface relative mx-auto max-w-7xl overflow-hidden rounded-[34px] bg-accent-bg-subtle px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div aria-hidden className="home-light-cta-wash pointer-events-none absolute inset-0" />
          <div className="relative z-10 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="section-label">Choose the first step</p>
              <h2 className="mt-5 max-w-[15ch] font-section text-[clamp(2.6rem,4.8vw,4.6rem)] leading-[0.99] text-text-primary">
                Start free, or test the operating case with us.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
                Run Cabinet on your own machine today. If the decision involves deployment, governance, or a company workflow, bring that requirement to a technical review.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/demo?source=pricing-final"
                className="btn-wood inline-flex h-13 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold"
              >
                Book a technical review <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <a
                href={MACOS_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ent-btn-secondary h-13 justify-center px-6 text-sm"
              >
                <Download aria-hidden className="h-4 w-4" /> Download for Mac
              </a>
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA).replace(/</g, "\\u003c") }}
      />
    </main>
  );
}

function PriceLine({
  label,
  value,
  positive = false,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-border pb-4 last:border-0 last:pb-0">
      <span className="text-text-secondary">{label}</span>
      <strong className={positive ? "text-green-warm" : "text-text-primary"}>{value}</strong>
    </div>
  );
}
