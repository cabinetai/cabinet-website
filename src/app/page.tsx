import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Download } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { CabinetLibrary } from "@/components/marketing/cabinet-library";
import { HeroProductReveal } from "@/components/marketing/hero-product-reveal";
import { KnowledgeNetwork } from "@/components/marketing/knowledge-network";
import {
  LegacyByoai,
  LegacyCta,
  LegacyFeaturesGrid,
  LegacyHero,
  LegacyIntegrationScene,
  LegacyIntegrationsMarquee,
  LegacyOrgBadges,
  LegacyPrinciples,
  LegacySocialProofBar,
  LegacySolutions,
  LegacyTestimonials,
  LegacyWhyTriad,
} from "@/components/marketing/legacy-sections";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { HeroHeadline, MotionReveal } from "@/components/marketing/motion-primitives";
import { SectionBadge } from "@/components/marketing/section-badge";
import { MACOS_DOWNLOAD_URL, WINDOWS_DOWNLOAD_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cabinet: The AI workspace your company owns",
  description:
    "Cabinet shows your entire knowledge base and files, puts a team of AI specialists to work on it, and renders results as live apps and dashboards. Open source, self-hosted, and connected to the AI providers you already trust.",
  openGraph: {
    title: "Cabinet: The AI workspace your company owns",
    description:
      "Company knowledge, working AI teams, and live apps in one open-source, self-hosted workspace. Bring your own AI.",
    url: "https://runcabinet.com",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Cabinet brings company knowledge, AI teams, and live apps together in one workspace",
      },
    ],
  },
};


export default function HomePage() {
  return (
    <main className="home-scroll-snap overflow-clip bg-bg text-text-primary">
      <SiteNavbar fixed />

      <SectionBadge n="27" title="Integration scene" origin="main">
        <LegacyIntegrationScene />
      </SectionBadge>

      <SectionBadge n="31" title="Testimonials: 10x work" origin="main">
        <LegacyTestimonials />
      </SectionBadge>

      <SectionBadge n="01" title="Hero: AI workspace" origin="kimi">
      <section className="home-snap-section relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pb-[clamp(3rem,7vh,6rem)] pt-[clamp(7rem,12vh,9rem)] sm:px-6 lg:px-8">
        <div
          aria-hidden
          className="home-hero-wash pointer-events-none absolute inset-0 -z-20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_72%)] dot-grid"
        />

        <div className="mx-auto grid w-full max-w-[1500px] items-center gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12 xl:gap-16">
          <div className="max-w-2xl">
            <MotionReveal delay={0.04} amount={0.1}>
              <p className="section-label mb-5">The AI workspace your company owns</p>
            </MotionReveal>
            <HeroHeadline />
            <MotionReveal delay={0.5} amount={0.1}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl">
              Cabinet shows your entire knowledge base and files, puts a team of AI specialists
              to work on it, and renders results as live apps and dashboards. Open source,
              self-hosted, and connected to the AI providers you already trust.
            </p>
            </MotionReveal>

            <MotionReveal delay={0.61} amount={0.1}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/demo"
                className="btn-wood inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-sm font-semibold sm:px-6 sm:text-base"
              >
                Book an executive demo <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <a
                href="#workflows"
                className="inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap px-3 text-sm font-semibold text-text-primary transition-colors hover:text-accent sm:text-base"
              >
                Explore AI teams <ArrowRight aria-hidden className="h-4 w-4" />
              </a>
            </div>
            </MotionReveal>

            <MotionReveal delay={0.66} amount={0.1}>
              <div
                className="mt-5 flex flex-wrap items-center gap-2.5 text-xs font-semibold"
                aria-label="Desktop app availability"
              >
                <a
                  href={MACOS_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-skin inline-flex h-10 items-center gap-2 rounded-full px-4 text-text-primary transition-transform hover:-translate-y-0.5"
                >
                  <Download aria-hidden className="h-3.5 w-3.5 text-accent" />
                  Download for macOS
                </a>
                <a
                  href={WINDOWS_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-skin inline-flex h-10 items-center gap-2 rounded-full px-4 text-text-primary transition-transform hover:-translate-y-0.5"
                >
                  <Download aria-hidden className="h-3.5 w-3.5 text-accent" />
                  Download for Windows
                </a>
                <span className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-bg-card/70 px-4 text-text-secondary">
                  Linux
                  <span className="font-code text-[9px] uppercase tracking-[0.1em] text-text-tertiary">
                    Coming soon
                  </span>
                </span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.7} amount={0.1}>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-text-tertiary">
              <span className="inline-flex items-center gap-1.5">
                <Check aria-hidden className="h-3.5 w-3.5 text-green" /> Open source
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check aria-hidden className="h-3.5 w-3.5 text-green" /> Self-hosted
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check aria-hidden className="h-3.5 w-3.5 text-green" /> Claude, GPT, and Gemini
              </span>
            </div>
            </MotionReveal>
          </div>

          <div className="min-w-0 lg:-mr-6 lg:pt-2 xl:-mr-10">
            <HeroProductReveal />
          </div>
        </div>
      </section>
      </SectionBadge>

      <SectionBadge n="06" title="Outcome explorer" origin="kimi">
        <div id="product" className="scroll-mt-24">
          <CabinetLibrary />
        </div>
      </SectionBadge>

      <SectionBadge n="02" title="Hero: knowledge base + typing" origin="main">
        <LegacyHero />
      </SectionBadge>

      <SectionBadge n="05" title="Why Cabinet: triad" origin="main">
        <LegacyWhyTriad />
      </SectionBadge>

      <SectionBadge n="09" title="Features grid: 12 cards" origin="main">
        <LegacyFeaturesGrid />
      </SectionBadge>

      <SectionBadge n="17" title="Solutions: every team" origin="main">
        <LegacySolutions />
      </SectionBadge>

      <SectionBadge n="18" title="Integrations: directory" origin="kimi">
        <KnowledgeNetwork />
      </SectionBadge>

      <SectionBadge n="19" title="Integrations: marquee" origin="main">
        <LegacyIntegrationsMarquee />
      </SectionBadge>

      <SectionBadge n="21" title="BYOAI: logo grid" origin="main">
        <LegacyByoai />
      </SectionBadge>

      <SectionBadge n="24" title="Built for organizations" origin="main">
        <LegacyOrgBadges />
      </SectionBadge>

      <SectionBadge n="25" title="Principles showcase" origin="main">
        <LegacyPrinciples />
      </SectionBadge>

      <SectionBadge n="29" title="Social proof bar" origin="main">
        <LegacySocialProofBar />
      </SectionBadge>

      <SectionBadge n="34" title="CTA: build your AI team" origin="main">
        <LegacyCta />
      </SectionBadge>

      <MarketingFooter />
    </main>
  );
}
