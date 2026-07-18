import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Download,
} from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";
import { AppsWedge } from "@/components/marketing/apps-wedge";
import { CabinetLibrary } from "@/components/marketing/cabinet-library";
import { DurableWork } from "@/components/marketing/durable-work";
import { HeroProductReveal } from "@/components/marketing/hero-product-reveal";
import { KnowledgeNetwork } from "@/components/marketing/knowledge-network";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { HeroHeadline, MotionReveal } from "@/components/marketing/motion-primitives";
import { ProviderNetwork } from "@/components/marketing/provider-network";
import { TrustBand } from "@/components/marketing/trust-band";
import { WhatIsCabinet } from "@/components/marketing/what-is-cabinet";
import { WhyCabinet } from "@/components/marketing/why-cabinet";
import { WorkspaceFeatures } from "@/components/marketing/workspace-features";
import {
  MACOS_DOWNLOAD_URL,
  WINDOWS_DOWNLOAD_URL,
} from "@/lib/site-config";

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

const TESTIMONIALS = [
  {
    quote:
      "Every business has different workflows. Cabinet turns those workflows into teams that keep the context and the result.",
    context: "On operating a business with AI.",
    name: "Collin Davis",
    role: "Chief Product Officer, Clover",
    image: "/testimonials/collin-davis.jpg",
    href: "https://www.linkedin.com/in/collinedavis/",
  },
  {
    quote:
      "Cabinet is the missing persistence and memory layer that TOGAF, ISO, and many other framework tools have never had.",
    context: "The framework provides the skeleton. Cabinet provides the living connective tissue.",
    name: "Jean Pierre Traets",
    role: "Sustainability Solutions Architect, EMEA",
    image: "/testimonials/jean-pierre-traets.jpg",
    href: "https://www.linkedin.com/in/jean-pierre-traets/",
  },
  {
    quote: "As one of the first users of Superhuman, I definitely see the same spark here.",
    context:
      "I use Cabinet to manage GTM, and the whole system runs without me touching it, 24/7.",
    name: "Assaf Haski",
    role: "Strategic narratives for high-stakes systems",
    image: "/testimonials/assaf-haski.jpg",
    href: "https://www.linkedin.com/in/assafhaski/",
  },
];

export default function HomePage() {
  return (
    <main className="home-scroll-snap overflow-clip bg-bg text-text-primary">
      <SiteNavbar fixed />

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

      <WhatIsCabinet />
      <WhyCabinet />

      <div id="product" className="scroll-mt-24">
        <CabinetLibrary />
      </div>

      <WorkspaceFeatures />
      <AppsWedge />
      <DurableWork />
      <KnowledgeNetwork />

      <ProviderNetwork />

      <TrustBand />

      <section id="proof" className="home-snap-section home-proof-section home-testimonials-section scroll-mt-24 px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <MotionReveal>
          <SectionHeading
            eyebrow="Used in real operations"
            title="Operators put Cabinet on real company work."
            body="Cabinet runs go-to-market work, company memory, and recurring operations between sessions."
          />
          </MotionReveal>

          <div className="mx-auto mt-10 grid max-w-7xl gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <MotionReveal key={testimonial.name} variant="pop" delay={index * 0.1}>
              <figure
                className="home-role-card flex min-h-[320px] flex-col rounded-[24px] bg-bg-card p-6 sm:p-7"
              >
                <blockquote className="font-display text-[1.35rem] leading-[1.18] tracking-[-0.035em] text-text-primary sm:text-[1.5rem]">
                  “{testimonial.quote}”
                </blockquote>
                <p className="mt-5 text-sm leading-relaxed text-text-secondary">
                  {testimonial.context}
                </p>
                <figcaption className="mt-auto flex items-center gap-3 pt-8">
                  <a
                    href={testimonial.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${testimonial.name} on LinkedIn`}
                  >
                    <Image
                      src={testimonial.image}
                      alt=""
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover shadow-sm"
                    />
                  </a>
                  <span className="min-w-0">
                    <a
                      href={testimonial.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-semibold text-text-primary hover:text-accent"
                    >
                      {testimonial.name}
                    </a>
                    <span className="mt-1 block text-xs leading-relaxed text-text-tertiary">
                      {testimonial.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="get-cabinet" className="home-snap-section home-proof-section scroll-mt-24 px-5 sm:px-6 lg:px-8">
        <MotionReveal variant="pop" className="w-full">
        <div className="home-cta-surface relative mx-auto max-w-7xl overflow-hidden rounded-[34px] bg-accent-bg-subtle px-6 py-12 text-text-primary sm:px-10 sm:py-16 lg:px-16">
          <div
            aria-hidden
            className="home-light-cta-wash pointer-events-none absolute inset-0"
          />
          <div className="relative z-10 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-accent">
                Get Cabinet
              </p>
              <h2 className="mt-5 max-w-[15ch] font-section text-[clamp(2.3rem,3.8vw,3.8rem)] leading-[1.02] text-text-primary">
                Run AI teams in a workspace your company owns.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
                Download the desktop app or run Cabinet from the command line. Your files, model
                accounts, teams, and workflow history stay under your control.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="#cabinet-downloads"
                className="btn-wood inline-flex h-13 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold"
              >
                <Download aria-hidden className="h-4 w-4" /> Download for free
              </a>
              <Link
                href="/demo"
                className="ent-btn-secondary h-13 justify-center px-6 text-sm"
              >
                Book an executive demo <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div id="cabinet-downloads" className="relative z-10 mt-12 grid scroll-mt-32 gap-3 md:grid-cols-3">
            <DownloadOption
              href={MACOS_DOWNLOAD_URL}
              icon={Download}
              title="Download for Mac"
              body="Install the desktop app."
            />
            <DownloadOption
              href={WINDOWS_DOWNLOAD_URL}
              icon={Download}
              title="Download for Windows"
              body="Install Cabinet on Windows."
            />
            <div className="rounded-2xl bg-bg-card p-4 shadow-sm">
              <p className="font-code text-[10px] uppercase tracking-[0.12em] text-text-tertiary">
                Run from the CLI
              </p>
              <code className="mt-3 block overflow-x-auto font-code text-sm text-text-primary">
                $ npx cabinetai run
              </code>
            </div>
          </div>
        </div>
        </MotionReveal>
      </section>

      <MarketingFooter />
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  body: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-2xl"}>
      <p className="section-label">{eyebrow}</p>
      <h2 className="mt-3 font-section text-[clamp(2.15rem,3.5vw,3.2rem)] leading-[1.03] text-text-primary">
        {title}
      </h2>
      <p
        className={`mt-4 text-lg leading-relaxed text-text-secondary ${
          align === "center" ? "mx-auto max-w-3xl" : "max-w-xl"
        }`}
      >
        {body}
      </p>
    </div>
  );
}

function DownloadOption({
  href,
  icon: Icon,
  title,
  body,
}: {
  href: string;
  icon: typeof Download;
  title: string;
  body: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 rounded-2xl bg-bg-card p-4 shadow-sm transition-transform hover:-translate-y-0.5"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-bg text-accent">
        <Icon aria-hidden className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <strong className="block text-sm text-text-primary">{title}</strong>
        <span className="mt-1 block text-[11px] text-text-tertiary">{body}</span>
      </span>
      <ArrowRight
        aria-hidden
        className="h-4 w-4 shrink-0 text-text-tertiary transition-transform group-hover:translate-x-0.5"
      />
    </a>
  );
}
