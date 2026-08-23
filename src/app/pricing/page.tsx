import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowRight, ChevronDown, Download } from "lucide-react";
import { CloudHeroWaitlist } from "@/components/cloud-hero-waitlist";
import { HeroProductReveal } from "@/components/marketing/hero-product-reveal";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { PricingInteractive } from "@/components/pricing-interactive";
import { SiteNavbar } from "@/components/site-navbar";
import { MACOS_DOWNLOAD_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Pricing | Cabinet",
  description:
    "Cabinet puts a team of AI to work on your files, 24/7. Ready-made AI teams for the job you need done, or build your own.",
  openGraph: {
    title: "Pricing | Cabinet",
    description:
      "Cabinet puts a team of AI to work on your files, 24/7. Ready-made AI teams for the job you need done, or build your own.",
    type: "website",
    url: "https://runcabinet.com/pricing",
  },
};

const FAQS = [
  {
    q: "Cabinet is open source. Why would I pay?",
    a: "You don't have to. Running it yourself is free forever. Paying gets us to run it for you instead, so you don't have to manage a server, updates, or backups.",
  },
  {
    q: "Is my AI cost included in the price?",
    a: "No. Connect the OpenAI, Claude, or Gemini account your company already has, and that stays a separate bill. Don't have one? We can sell you AI access too, starting at $10 a month.",
  },
  {
    q: "Can I switch from paid hosting back to running it myself?",
    a: "Yes, anytime. Download your data and move it to your own server. Nothing is locked in.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. Monthly plans stop at the end of the month you're on. Annual plans can be refunded in the first 30 days.",
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

      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8 lg:pt-36">
        <div aria-hidden className="home-hero-wash pointer-events-none absolute inset-0 -z-20" />
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-45 [mask-image:linear-gradient(to_bottom,black,transparent_76%)]"
        />

        <div className="mx-auto grid w-full max-w-[1500px] items-center gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12 xl:gap-16">
          <div className="max-w-2xl">
            <p className="section-label">Pricing</p>
            <h1 className="mt-5 max-w-[15ch] font-section text-[clamp(2.7rem,5.2vw,5.2rem)] leading-[0.98] text-text-primary">
              A team of AI, working your real work, 24/7.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl">
              Cabinet puts AI to work on your files and knowledge base, not just a chat box.
              Grab a ready-made AI team for the job you need done, or build your own.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={MACOS_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wood inline-flex h-13 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold sm:text-base"
              >
                <Download aria-hidden className="h-4 w-4" /> Download free for Mac
              </a>
              <a
                href="#plans"
                className="ent-btn-secondary h-13 justify-center px-6 text-sm sm:text-base"
              >
                See all plans <ArrowRight aria-hidden className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 max-w-md">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                Want us to host it for you? Leave your email.
              </p>
              <Suspense fallback={<div className="h-[60px] rounded-full bg-bg-card/60" />}>
                <CloudHeroWaitlist source="pricing-hero" originPage="/pricing" />
              </Suspense>
            </div>
          </div>

          <div className="min-w-0 lg:-mr-6 lg:pt-2 xl:-mr-10">
            <HeroProductReveal />
          </div>
        </div>
      </section>

      <section id="plans" className="px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">The 4 plans</p>
            <h2 className="mt-3 font-section text-[clamp(1.9rem,2.6vw,2.4rem)] leading-[1.02] text-text-primary">
              Pick one.
            </h2>
          </div>

          <div className="mt-8">
            <PricingInteractive />
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="section-label text-center">Questions</p>
          <div className="mt-4 divide-y divide-border">
            {FAQS.map((item) => (
              <details key={item.q} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg">
                  <span className="font-section text-lg text-text-primary sm:text-xl">{item.q}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-bg-card text-text-tertiary shadow-sm transition-transform group-open:rotate-180">
                    <ChevronDown aria-hidden className="h-4 w-4" />
                  </span>
                </summary>
                <p className="pb-6 pr-12 text-base leading-relaxed text-text-secondary">{item.a}</p>
              </details>
            ))}
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
