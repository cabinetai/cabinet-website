import Image from "next/image";
import {
  ArrowRight,
  Bot,
  Check,
  Cloud,
  Code2,
  FileText,
  GitBranch,
  Server,
  Shield,
  Star,
  Terminal,
  Users,
  X,
} from "lucide-react";
import { Suspense } from "react";
import { IntegrationScene } from "@/components/integration-scene";
import { PrinciplesShowcase } from "@/components/principles-showcase";
import { DiscordIcon, GithubIcon } from "@/components/site-icons";
import { CloudHeroWaitlist } from "@/components/cloud-hero-waitlist";
import { WoodIcon } from "@/components/wood-icon";
import { DetectedDownloadCta, OsDownloadButtons, TerminalInstall } from "@/components/marketing/os-download";
import {
  CopyButton,
  TerminalDemo,
  TypingText,
} from "@/components/marketing/legacy-interactive-primitives";
import { MotionReveal } from "@/components/marketing/motion-primitives";
import { CABINETS, CABINETS_SITE, cabinetCover, cabinetUrl } from "@/lib/cabinets";
import { DISCORD_URL, GITHUB_URL, WAITLIST_COPY } from "@/lib/site-config";
import { SOLUTIONS, SOLUTION_STORIES } from "@/lib/solutions";

const PROVIDERS = [
  { src: "/providers/claude.svg", name: "Claude" },
  { src: "/providers/openai.svg", name: "OpenAI" },
  { src: "/providers/gemini.svg", name: "Gemini" },
  { src: "/providers/grok.svg", name: "Grok Code" },
  { src: "/providers/copilot.svg", name: "Copilot" },
  { src: "/providers/cursor.svg", name: "Cursor" },
  { src: "/providers/opencode.svg", name: "opencode" },
  { src: "/providers/pi.svg", name: "Pi" },
];

// Tools your company runs on - rendered as a scrolling, multi-row logo wall.
export const INTEGRATION_LOGOS: string[] = "slack microsoft-teams notion github hubspot confluence google-drive gmail stripe zendesk figma workday intercom servicenow airtable bamboohr brex docusign looker mixpanel quickbooks tableau greenhouse google-calendar google-meet onedrive sharepoint bigquery gong salesforce jira zoom snowflake asana calendly clickup dropbox box gitlab databricks datadog amplitude linear"
  .split(" ")
  .map((n) => `/logos/${n}.svg`);

// Three interleaved rows so each band mixes brands evenly.
const INTEGRATION_ROWS = [0, 1, 2].map((r) =>
  INTEGRATION_LOGOS.filter((_, i) => i % 3 === r),
);

function integrationName(src: string): string {
  const base = src.split("/").pop()!.replace(/\.(svg|webp|png)$/, "");
  return base
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const TRUST_BADGES = [
  {
    img: "/brand/trust/soc2.png",
    label: "SOC 2 Type II",
    status: "In progress",
    desc: "We're working toward it, and we'll show you the report, not just a badge.",
  },
  {
    img: "/brand/trust/open-source.png",
    label: "Open source",
    desc: "Read every line, fork it, or run your own build.",
  },
  {
    img: "/brand/trust/self-hosted.png",
    label: "Self-hosted",
    desc: "Runs in your environment, under the controls you already enforce.",
  },
  {
    img: "/brand/trust/not-training.png",
    label: "Not training data",
    desc: "Your prompts and content are never used to train a model.",
  },
  {
    img: "/brand/trust/byo-keys.png",
    label: "Bring your own keys",
    desc: "Your model providers, your API keys. Inference never routes through us.",
  },
  {
    img: "/brand/trust/audit-log.png",
    label: "Audit log & git history",
    desc: "Every change to data and agents is versioned, diffable, and attributable.",
  },
  {
    img: "/brand/trust/sso-scim.png",
    label: "SSO & SCIM",
    status: "Enterprise track",
    desc: "SAML single sign-on and provisioning for teams that need it.",
  },
  {
    img: "/brand/trust/data-residency.png",
    label: "Your data residency",
    desc: "Self-hosted means your knowledge lives in your region, under your policies.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Cabinet is a big unlock for how I think about operating a business with AI.",
    context:
      "Before Cabinet, AI felt fragmented: great for single tasks, but hard to orchestrate across the business. Every business has different workflows, and Cabinet makes it possible to turn those workflows into an AI team.",
    name: "Collin Davis",
    role: "Chief Product Officer, Clover",
    location: "Florida, USA",
    image: "/testimonials/collin-davis.jpg",
    linkedin: "https://www.linkedin.com/in/collinedavis/",
    initials: "CD",
  },
  {
    quote:
      "Cabinet is exactly doing what it's strong at: orchestrating structure, standardization, opportunities, and challenges in a digital way.",
    context:
      "Cabinet is the missing persistence and memory layer that TOGAF, ISO, and many other framework tools have never had. The framework provides the skeleton; Cabinet provides the living connective tissue.",
    name: "Jean Pierre Traets",
    role: "Sustainability Solutions Architect",
    location: "EMEA",
    image: "/testimonials/jean-pierre-traets.jpg",
    linkedin: "https://www.linkedin.com/in/jean-pierre-traets/",
    initials: "JT",
  },
  {
    quote:
      "As one of the first users of Superhuman, I definitely see the same spark here.",
    context:
      "I use Cabinet to manage GTM and send emails through Apollo, and the whole system runs without me touching it, 24/7. The researcher agent built into Cabinet crafted award-winning GTM emails that blew my mind and achieved incredible open rates.",
    name: "Assaf Haski",
    role: "Strategic narratives for high-stakes systems, from B2B SaaS growth to national public guidance",
    location: "",
    image: "/testimonials/assaf-haski.jpg",
    linkedin: "https://www.linkedin.com/in/assafhaski/",
    initials: "AH",
  },
];

function GitHubStarsButton({
  className,
  compact = false,
}: {
  className: string;
  compact?: boolean;
}) {
  return (
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <span className="inline-flex items-center gap-2">
        <GithubIcon className="w-4 h-4" />
        <span>{compact ? "Star Cabinet" : "Star Cabinet on GitHub"}</span>
      </span>
      <span className="inline-flex items-center gap-1 rounded-full bg-accent-bg px-2.5 py-1 text-[0.72rem] font-semibold text-accent shadow-sm ring-1 ring-border-light">
        <Star className="w-3.5 h-3.5 fill-current" />
        GitHub
      </span>
    </a>
  );
}

/* Feature Card */
function FeatureCard({
  img,
  title,
  description,
  className = "",
  featured = false,
}: {
  img: string;
  title: string;
  description: string;
  className?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl p-6 card-hover ${
        featured ? "bg-gradient-to-br from-[#FBF2E4] to-[#F2E5CF] max-lg:text-center" : "bg-bg-card"
      } ${className}`}
    >
      {featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(224,178,60,0.18), transparent 70%)" }}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt=""
        loading="lazy"
        decoding="async"
        className={`relative z-10 mb-4 object-contain transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-2 ${
          featured ? "h-16 w-16 max-lg:mx-auto lg:h-[88px] lg:w-[88px]" : "h-16 w-16"
        }`}
      />
      <h3 className="relative z-10 mb-2 font-display text-lg text-text-primary">{title}</h3>
      <p className="relative z-10 text-sm leading-relaxed text-text-secondary">{description}</p>
    </div>
  );
}

/* Agent Cards */
function AgentShowcase() {
  const agents = [
    { emoji: "🎯", name: "CEO Agent", type: "Lead", desc: "Strategic planning, goal tracking, task delegation. Creates missions, coordinates the team.", jobs: ["Weekly report", "Goal review"] },
    { emoji: "📝", name: "Editor", type: "Specialist", desc: "KB content editing, formatting, linking. Maintains documentation quality.", jobs: ["Content review", "Link checker"] },
    { emoji: "📣", name: "Content Marketer", type: "Specialist", desc: "Blog posts, social media, newsletters. SEO-optimized content generation.", jobs: ["Reddit scout", "Blog drafts"] },
    { emoji: "🔍", name: "SEO Specialist", type: "Specialist", desc: "Keyword research, site optimization, ranking analysis.", jobs: ["Keyword tracker", "Competitor scan"] },
    { emoji: "💰", name: "Sales Agent", type: "Specialist", desc: "Lead generation, outreach, pipeline tracking.", jobs: ["Lead scorer", "Follow-up drafter"] },
    { emoji: "🧪", name: "QA Agent", type: "Specialist", desc: "Review, proofread, fact-check content across the KB.", jobs: ["Content audit", "Broken link scan"] },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {agents.map((agent) => (
        <div key={agent.name} className="rounded-xl p-5 card-skin card-hover group">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{agent.emoji}</span>
              <div>
                <p className="font-semibold text-sm text-text-primary">{agent.name}</p>
                <p className="text-xs text-text-tertiary">{agent.type}</p>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
          </div>
          <p className="text-xs text-text-secondary mb-3 leading-relaxed">{agent.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {agent.jobs.map((job) => (
              <span key={job} className="text-[10px] font-code text-accent bg-accent-bg px-2 py-0.5 rounded">
                {job}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function LegacyInstallTerminal() {
  return (
    <section className="py-24 border-t border-border bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="section-label mb-3">Install Flow</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">See <span className="font-brand italic">Cabinet</span>{" "}start up in the terminal
                                  </h2>
          <p className="text-text-secondary font-body-serif leading-relaxed">The install walkthrough is back. One command scaffolds the workspace, sets up your AI team, and gets <span className="font-brand italic">Cabinet</span>{" "}running locally.
                                  </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <TerminalDemo />
          <div className="mt-8 text-center">
            <a
              href="#get-started"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium btn-wood"
            >Install <span className="font-brand italic">Cabinet</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LegacyIntegrationScene() {
  return <IntegrationScene />;
}

export function LegacyHero() {
  return (
    <section className="relative flex items-center justify-center dot-grid overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-12">
        {/* Install Options */}
        <div className="hidden max-w-3xl mx-auto mb-20 lg:block">
          {/* Every OS gets the same size button; the visitor's own build leads. */}
          <OsDownloadButtons />
          <TerminalInstall className="mt-3 text-left" />
          <p className="mt-4 text-sm font-body-serif text-text-tertiary">Evaluating <span className="font-brand italic">Cabinet</span>{" "}for your team?{" "}
            <a
              href="/demo"
              className="text-accent underline underline-offset-2 hover:text-accent-warm"
            >
              Book a demo
            </a>
          </p>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.1] mb-6">
          <span className="font-display text-text-primary">Your knowledge base.</span>
          <br />
          <span className="font-display italic gradient-text">Your AI team.</span>
        </h2>

        {/* Hero Illustration */}
        <div className="mx-auto mb-8 w-60 sm:w-72 md:w-80">
          <Image
            src="/brand/cabinet-logo-flip.webp"
            alt="Cabinet: your files and knowledge in one drawer, a team of AI agents in the other"
            width={812}
            height={835}
            className="h-auto w-full drop-shadow-2xl"
          />
        </div>

        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-4 leading-relaxed font-body-serif">
          A free and open-source AI-first startup OS where everything lives as markdown files on disk. No database. No vendor lock-in.
        </p>

        <p className="text-sm md:text-base text-text-tertiary max-w-2xl mx-auto mb-6 font-code">
          No subscription. No trial. No paywall. Clone it, run it, and make it your own.
        </p>

        {/* relative + invisible sizer reserves height for the longest phrase
            so the typing/deleting animation never reflows the border below */}
        <p className="relative text-base font-code text-text-tertiary max-w-xl mx-auto mb-10">
          <span aria-hidden className="invisible">
            PDF, CSV, markdown: all first-class content
          </span>
          <span className="absolute inset-0">
            <TypingText
              texts={[
                "Onboard an AI team in 5 questions",
                "Ship HTML apps inside your KB",
                "Cron-scheduled AI agents that work 24/7",
                "Git-backed version history on every page",
                "PDF, CSV, markdown: all first-class content",
              ]}
            />
          </span>
        </p>
      </div>
    </section>
  );
}

export function LegacyWhyTriad() {
  return (
    <section className="py-24 border-t border-border bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Why Cabinet</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            The only AI workspace you actually own
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed">Search tools find. Chatbots answer. <span className="font-brand italic">Cabinet</span>{" "}does the work: on your
                                        files, your models, your infrastructure.
                                      </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3 max-w-6xl mx-auto">
          {/* Files */}
          <div className="group rounded-3xl bg-bg-card p-8 card-hover">
            <div className="relative flex h-52 items-center justify-center">
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(224,178,60,0.18), transparent 70%)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/icons/files.webp" alt="" loading="lazy" decoding="async" className="relative h-36 w-36 object-contain float-slow" />
            </div>
            <span className="section-label">Your work lives on disk</span>
            <h3 className="mt-2 mb-2 font-display text-xl text-text-primary">Own your data</h3>
            <p className="text-sm font-body-serif leading-relaxed text-text-secondary">Everything is Markdown in a folder you own. Grep it, git it, back it up. No export, no lock-in.</p>
          </div>

          {/* Bring your own AI - rotating vendor ring */}
          <div className="group rounded-3xl bg-bg-card p-8 card-hover">
            <div className="relative flex h-52 items-center justify-center">
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(139,94,60,0.12), transparent 70%)" }} />
              <div className="orbit relative h-[200px] w-[200px]">
                {[
                  { v: "claude", l: 156, t: 78 }, { v: "openai", l: 133, t: 133 }, { v: "gemini", l: 78, t: 156 }, { v: "grok", l: 23, t: 133 },
                  { v: "opencode", l: 0, t: 78 }, { v: "copilot", l: 23, t: 23 }, { v: "cursor", l: 78, t: 0 }, { v: "pi", l: 133, t: 23 },
                ].map((p) => (
                  <span key={p.v} className="orbit__item absolute" style={{ left: p.l, top: p.t }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/brand/vendors/${p.v}.png`} alt="" loading="lazy" decoding="async" className="h-11 w-11 object-contain" />
                  </span>
                ))}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/cabinet-logo-512.png" alt="" loading="lazy" decoding="async" className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-lg" />
            </div>
            <span className="section-label">Bring your own AI</span>
            <h3 className="mt-2 mb-2 font-display text-xl text-text-primary">No AI tax</h3>
            <p className="text-sm font-body-serif leading-relaxed text-text-secondary">Plug in the model accounts you already pay for: Claude, GPT, Gemini, Grok, local models. No markup, no new vendor.</p>
          </div>

          {/* Agents - abstract floating shapes */}
          <div className="group rounded-3xl bg-bg-card p-8 card-hover">
            <div className="relative flex h-52 items-center justify-center">
              <div aria-hidden className="agent-aura pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(111,164,90,0.16), transparent 70%)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/agents-shapes.webp" alt="" loading="lazy" decoding="async" className="relative h-44 w-44 object-contain agent-heartbeat" />
            </div>
            <span className="section-label">Agents that do the work</span>
            <h3 className="mt-2 mb-2 font-display text-xl text-text-primary">Always on</h3>
            <p className="text-sm font-body-serif leading-relaxed text-text-secondary">Not just search and chat. A team of agents researches, drafts, and ships on a schedule, 24/7.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LegacyTestimonials() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-bg-warm py-24">
      {/* soft accent wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, rgba(139, 94, 60, 0.07), transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary">How teams achieve 10x work with <span className="font-brand italic">Cabinet</span>
          </h2>
        </div>

        <div className="testimonial-marquee-viewport relative overflow-hidden">
          {/* edge fades */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg-warm to-transparent sm:w-24"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg-warm to-transparent sm:w-24"
          />
          <div className="testimonial-marquee flex w-max items-stretch py-2">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => {
            const avatar = t.image ? (
              <Image
                src={t.image}
                alt={t.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover shadow-sm"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent font-display text-lg text-white shadow-sm">
                {t.initials}
              </div>
            );
            const isCollin = t.name === "Collin Davis";
            return (
              <figure
                key={`${t.name}-${i}`}
                aria-hidden={i >= TESTIMONIALS.length}
                className={`mr-6 flex w-[340px] shrink-0 flex-col rounded-2xl card-skin p-6 shadow-sm card-hover sm:w-[380px] ${
                  isCollin ? "text-center items-center" : ""
                }`}
              >
                {/* Photo at the top - clickable to LinkedIn */}
                {t.linkedin ? (
                  <a
                    href={t.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t.name} on LinkedIn`}
                    className="mb-4 inline-block rounded-full transition-transform hover:scale-105"
                  >
                    {avatar}
                  </a>
                ) : (
                  <div className="mb-4">{avatar}</div>
                )}

                <blockquote
                  className={`mb-3 font-display text-text-primary ${
                    t.quote.length > 90
                      ? "text-lg leading-relaxed tracking-normal md:text-xl"
                      : "text-xl leading-snug tracking-tight md:text-2xl"
                  }`}
                >
                  {t.quote}
                </blockquote>
                <p className="mb-5 font-body-serif leading-relaxed text-text-secondary">
                  {t.context}
                </p>

                <figcaption className="mt-auto">
                  {t.linkedin ? (
                    <a
                      href={t.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/who block"
                    >
                      <span className="block font-hand text-3xl leading-none text-text-primary transition-colors group-hover/who:text-accent">
                        {t.name}
                      </span>
                      <span className="mt-0.5 block text-sm text-text-secondary transition-colors group-hover/who:text-accent">
                        {t.role}
                      </span>
                    </a>
                  ) : (
                    <>
                      <p className="font-hand text-3xl leading-none text-text-primary">
                        {t.name}
                      </p>
                      <p className="mt-0.5 text-sm text-text-secondary">{t.role}</p>
                    </>
                  )}
                  <p className="mt-1 text-xs font-code text-text-tertiary">{t.location}</p>
                </figcaption>
              </figure>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LegacyCustomerStories() {
  return (
    <section className="py-24 border-t border-border bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-3 flex items-center justify-center gap-2">
          <p className="section-label">Customer stories</p>
          <span className="rounded-full bg-bg-card px-2.5 py-0.5 font-code text-[10px] uppercase tracking-wider text-text-tertiary ring-1 ring-border-light">
            Illustrative
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4 text-center">What teams ship with <span className="font-brand italic">Cabinet</span>
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed mb-12 text-center">
          Anonymized scenarios that mirror how teams put an AI crew to work. Real,
          named case studies land here as teams go public.
        </p>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {["sales", "marketing", "founders"].map((slug) => {
            const s = SOLUTION_STORIES[slug];
            return (
              <div key={slug} className="flex flex-col rounded-2xl card-skin p-7 card-hover">
                <div className="font-display text-4xl tracking-tight text-accent">{s.metric}</div>
                <p className="mt-1.5 text-sm text-text-secondary font-body-serif">{s.metricLabel}</p>
                <blockquote className="mt-5 flex-1 font-body-serif leading-relaxed text-text-secondary">
                  &ldquo;{s.quote}&rdquo;
                </blockquote>
                <p className="mt-4 font-code text-xs text-text-tertiary">{s.attribution}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function LegacyByoai() {
  return (
    <section id="byoai" className="py-24 border-t border-border bg-bg-card">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="section-label mb-3">Bring your own AI</p>
        <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
          Works with the AI you already pay for
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed mb-12">
          <span className="font-brand italic">Cabinet</span>{" "}runs on your existing model accounts and subscriptions. There&apos;s
                                  no bundled inference marked up on top, and no new AI vendor to push through
                                  procurement. Point it at what your team already uses.
                                </p>

        <div className="grid grid-cols-8 gap-2 sm:gap-3 max-w-4xl mx-auto">
          {PROVIDERS.map((p) => (
            <div key={p.name} className="group flex flex-col items-center gap-2">
              <div className="flex aspect-square w-full items-center justify-center rounded-2xl card-skin transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-lg">
                <Image
                  src={p.src}
                  alt={p.name}
                  width={40}
                  height={40}
                  className="h-6 w-6 sm:h-9 sm:w-9 object-contain transition-transform duration-200 ease-out group-hover:scale-110"
                />
              </div>
              <span className="text-[11px] sm:text-sm font-medium text-text-secondary text-center leading-tight">
                {p.name}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm font-code text-text-tertiary">
          …plus local models, and whatever comes next.
        </p>
      </div>
    </section>
  );
}

export function LegacyIntegrationsMarquee() {
  return (
    <section id="integrations" className="overflow-hidden border-t border-border bg-bg-warm py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="section-label mb-3">Integrations</p>
        <h2 className="mb-4 font-display text-3xl text-text-primary md:text-4xl">
          Connect to everything that runs your company
        </h2>
        <p className="mx-auto max-w-2xl font-body-serif leading-relaxed text-text-secondary">Your company runs on dozens of tools. <span className="font-brand italic">Cabinet</span>{" "}brings the work scattered
                                  across them into one place you own, where your team and its agents can find
                                  it, act on it, and keep it moving.
                                </p>
      </div>

      <div className="mt-14 flex flex-col gap-4">
        {INTEGRATION_ROWS.map((row, r) => (
          <div key={r} className="logo-marquee-viewport relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg-warm to-transparent sm:w-24"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg-warm to-transparent sm:w-24"
            />
            <div
              className={`logo-marquee-track ${r % 2 === 1 ? "logo-marquee-track-reverse" : ""}`}
            >
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1 ? true : undefined}
                  className="flex shrink-0 gap-3 pr-3"
                >
                  {row.map((src) => (
                    <div
                      key={src}
                      className="card-skin flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-sm sm:h-20 sm:w-20"
                    >
                      <Image
                        src={src}
                        alt={integrationName(src)}
                        width={40}
                        height={40}
                        className="h-8 w-8 object-contain sm:h-10 sm:w-10"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-2xl px-6 text-center text-sm font-code text-text-tertiary">
        …and the rest of the stack your team already uses.
      </p>
    </section>
  );
}

export function LegacySocialProofBar() {
  return (
    <section className="border-y border-border py-8 bg-bg-card">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-text-tertiary text-sm font-code">
        <div className="flex items-center gap-2"><WoodIcon icon={FileText} className="w-6 h-6" /><span>Markdown on disk</span></div>
        <div className="flex items-center gap-2"><WoodIcon icon={Shield} className="w-6 h-6" /><span>Self-hosted</span></div>
        <div className="flex items-center gap-2"><WoodIcon icon={GitBranch} className="w-6 h-6" /><span>Git-backed</span></div>
        <div className="flex items-center gap-2"><WoodIcon icon={Bot} className="w-6 h-6" /><span>AI-native</span></div>
        <div className="flex items-center gap-2"><WoodIcon icon={Code2} className="w-6 h-6" /><span>Open source</span></div>
      </div>
    </section>
  );
}

// A pillar of the Cloud story drawn as one drawer of the Cabinet itself:
// wood front, brass handle, brass-framed paper label (the hero cabinet's
// own construction), with the wooden object resting on top.
function CloudDrawer({
  icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="text-center">
      <WoodIcon
        icon={icon}
        className="relative z-10 mx-auto -mb-4 h-24 w-24 drop-shadow-[0_10px_10px_rgba(84,52,26,0.3)]"
      />
      <div
        className="relative flex flex-col items-center justify-center gap-2 rounded-2xl"
        style={{
          height: 104,
          background: "linear-gradient(135deg, #EDDCBF 0%, #DCC098 45%, #C9A47A 100%)",
          boxShadow:
            "inset 0 1.5px 0 rgba(255, 250, 238, 0.9), inset 0 0 0 1px rgba(90, 58, 30, 0.22), 0 18px 28px -14px rgba(74, 48, 24, 0.45)",
        }}
      >
        <div
          aria-hidden
          style={{
            width: 64,
            height: 9,
            borderRadius: 6,
            background: "linear-gradient(180deg, #F0DCA8 0%, #D9BC7A 55%, #B89A54 100%)",
            boxShadow: "0 2px 3px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
          }}
        />
        <span
          className="rounded-[6px]"
          style={{
            padding: 2.5,
            background: "linear-gradient(180deg, #F0DCA8 0%, #D9BC7A 55%, #B89A54 100%)",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.55)",
          }}
        >
          <span
            className="font-display block whitespace-nowrap rounded-[4px] font-bold uppercase tracking-[0.07em]"
            style={{
              padding: "3px 14px",
              fontSize: 15,
              color: "#6B4226",
              background: "linear-gradient(180deg, #FCF6E8 0%, #F0E4C8 100%)",
              boxShadow: "inset 0 1px 2px rgba(96, 64, 32, 0.28)",
            }}
          >
            {title}
          </span>
        </span>
      </div>
      <p className="mx-auto mt-5 max-w-xs text-base leading-relaxed text-text-secondary">
        {children}
      </p>
    </div>
  );
}

export function LegacyCloudWaitlist() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-bg py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <span className="float-slow absolute left-[9%] top-[20%] block" style={{ animationDelay: "-1s" }}>
          <WoodIcon icon={Cloud} className="h-24 w-24 -rotate-6 opacity-90" />
        </span>
        <span className="float-slow absolute right-[11%] top-[16%] block" style={{ animationDelay: "-3.5s" }}>
          <WoodIcon icon={Terminal} className="h-20 w-20 rotate-6 opacity-90" />
        </span>
        <span className="float-slow absolute left-[15%] bottom-[18%] block" style={{ animationDelay: "-2.2s" }}>
          <WoodIcon icon={Server} className="h-16 w-16 rotate-3 opacity-90" />
        </span>
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <MotionReveal amount={0.3}>
          <p className="mb-6 text-[11px] font-code uppercase tracking-[0.28em] text-accent">
            <span className="font-brand italic normal-case text-sm tracking-normal">Cabinet</span> Cloud
          </p>
        </MotionReveal>

        <MotionReveal delay={0.08} amount={0.3}>
          <h2 className="font-display text-4xl leading-tight text-text-primary md:text-5xl">
            Your laptop needs sleep.
            <br />
            Your AI team shouldn&apos;t.
          </h2>
        </MotionReveal>

        <MotionReveal delay={0.16} amount={0.3}>
          <p className="mx-auto mt-5 max-w-xl font-body-serif text-lg leading-relaxed text-text-secondary">
            <span className="font-brand italic">Cabinet</span>{" "}Cloud runs your workspace around the
            clock, on hardware that belongs to you alone. No shared tenants, no shortcuts on security.
          </p>
        </MotionReveal>

        <MotionReveal delay={0.24} amount={0.2}>
          {/* Not cards: three drawers of the Cabinet itself, each with its
              wooden object resting on top and a brass-framed label. */}
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-3">
            <CloudDrawer icon={Server} title="Your own machine">
              A dedicated container, not a shared slice of someone else&apos;s server.
            </CloudDrawer>
            <CloudDrawer icon={Shield} title="Locked down">
              Encrypted, isolated, and walled off from every other Cabinet.
            </CloudDrawer>
            <CloudDrawer icon={Users} title="Teams, ready to go">
              Pick a pre-built AI team and start working on day one.
            </CloudDrawer>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.32} amount={0.2}>
          <p className="mt-9 text-sm font-semibold text-accent">
            We are building it now. {WAITLIST_COPY.scarcity}
          </p>
          <Suspense fallback={<div className="mx-auto mt-4 h-16 max-w-xl rounded-full card-skin/70" />}>
            <CloudHeroWaitlist source="homepage-section" originPage="/" className="mx-auto mt-4 max-w-xl" />
          </Suspense>
        </MotionReveal>
      </div>
    </section>
  );
}

export function LegacyPrinciples() {
  return (
    <section className="py-24 border-t border-border bg-bg-warm">
      <div className="max-w-6xl mx-auto px-6">
        <PrinciplesShowcase />
        <p className="mt-16 text-center font-body-serif italic text-text-secondary text-lg">
          If a feature would break any of these, it doesn&apos;t make it in.
        </p>
      </div>
    </section>
  );
}

export function LegacyProblem() {
  return (
    <section className="py-24 bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="section-label mb-3">The Problem</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-6">
            Your AI agents have no memory
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed font-body-serif">Every time you start a new Claude session, it forgets everything.
                                        Your project context, your decisions, your research. Gone. You
                                        keep re-explaining the same things. <span className="font-brand italic">Cabinet</span>{" "}gives your AI a
                                        persistent brain: a knowledge base that both you and your agents
                                        read and write to, 24/7.
                                      </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-8 rounded-xl card-skin">
            <div className="w-12 h-12 mx-auto rounded-xl bg-accent-bg flex items-center justify-center mb-4">
              <X className="w-6 h-6 text-accent-warm" />
            </div>
            <h3 className="font-display text-lg mb-2 text-text-primary">Without <span className="font-brand italic">Cabinet</span></h3>
            <p className="text-sm text-text-secondary">
              Scattered docs in Notion. AI sessions that forget context. Manual copy-paste between tools. Scripts held together with tape.
            </p>
          </div>
          <div className="text-center p-8 rounded-xl border border-accent/20 bg-accent-bg-subtle">
            <Image src="/cabinet-icon.png" alt="Cabinet" width={48} height={48} className="mx-auto rounded-xl mb-4" />
            <h3 className="font-display text-lg mb-2 text-text-primary">With <span className="font-brand italic">Cabinet</span></h3>
            <p className="text-sm text-text-primary">
              One knowledge base. AI agents that remember everything. Scheduled jobs that compound. Your team grows while you sleep.
            </p>
          </div>
          <div className="text-center p-8 rounded-xl card-skin">
            <div className="w-14 h-14 mx-auto flex items-center justify-center mb-4">
              <WoodIcon icon={Users} className="w-12 h-12" />
            </div>
            <h3 className="font-display text-lg mb-2 text-text-primary">Design Principle</h3>
            <p className="text-sm text-text-secondary font-body-serif italic">
              If it feels like enterprise workflow software, it&apos;s wrong. If it feels like watching a team work, it&apos;s right.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LegacyEmbeddedApps() {
  return (
    <section className="py-24 border-t border-border bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-label mb-3">Unique to Cabinet</p>
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-6">
              Ship HTML apps inside<br />your knowledge base
            </h2>
            <p className="text-text-secondary mb-6 leading-relaxed font-body-serif">This is the biggest difference between <span className="font-brand italic">Cabinet</span>{" "}and tools like
                                              Obsidian or Notion. Drop an{" "}
              <code className="text-accent bg-accent-bg px-1.5 py-0.5 rounded text-sm font-code">index.html</code>{" "}into any folder and it renders as a live, interactive app.
                                            </p>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span><strong className="text-text-primary">Full-screen mode:</strong> add a <code className="text-accent bg-accent-bg px-1 py-0.5 rounded text-xs font-code">.app</code> marker. Sidebar and AI panel auto-collapse</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span><strong className="text-text-primary">AI-generated apps:</strong> ask Claude to build a dashboard, and it writes the HTML directly into your KB</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span><strong className="text-text-primary">Version controlled:</strong> every change is tracked in git, same as your markdown pages</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span><strong className="text-text-primary">No build step:</strong> plain HTML/CSS/JS. Works with React, Vue, or vanilla</span>
              </li>
            </ul>
          </div>
          <div className="terminal-chrome">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-zinc-500 font-code">/tools/lead-scorer/index.html</span>
            </div>
            <div className="p-6 font-code text-xs text-zinc-400 leading-relaxed">
              <div className="text-zinc-600">&lt;!-- Your KB file tree --&gt;</div>
              <div className="mt-2"><span className="text-zinc-500">data/</span></div>
              <div className="ml-4"><span className="text-zinc-500">tools/</span></div>
              <div className="ml-8"><span className="text-zinc-500">lead-scorer/</span></div>
              <div className="ml-12 text-green-400">index.html &larr; renders as app</div>
              <div className="ml-12 text-green-400">.app &larr; full-screen mode</div>
              <div className="ml-12 text-zinc-500">styles.css</div>
              <div className="ml-12 text-zinc-500">app.js</div>
              <div className="ml-4 mt-2"><span className="text-zinc-500">dashboards/</span></div>
              <div className="ml-8"><span className="text-zinc-500">metrics/</span></div>
              <div className="ml-12 text-blue-400">index.html &larr; embedded site</div>
              <div className="ml-4 mt-2"><span className="text-zinc-500">research/</span></div>
              <div className="ml-8 text-zinc-300">market-analysis.md</div>
              <div className="ml-8 text-red-400">whitepaper.pdf</div>
              <div className="ml-8 text-green-300">leads.csv</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LegacyFeaturesGrid() {
  return (
    <section id="features" className="py-24 border-t border-border bg-bg-warm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-3">Features</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-body-serif">
            A complete operating system for your startup: knowledge base, AI agents, task management, and team chat in one self-hosted app.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 max-w-6xl mx-auto max-lg:grid-flow-dense lg:auto-rows-fr">
          {[
            { img: "/brand/feat/agents.png", span: "col-span-2 lg:col-span-3", featured: true, title: "AI Agents", description: "Onboard a CEO, Editor, Marketer. Each has goals, skills, scheduled jobs. Watch them work like a real team." },
            { img: "/brand/feat/files.png", span: "col-span-2 lg:col-span-3", featured: true, title: "File-Based Everything", description: "No database. Markdown on disk. Drag-and-drop tree sidebar. Your data is always yours, always portable." },
            { img: "/brand/feat/editor.png", span: "lg:col-span-2", title: "WYSIWYG + Markdown", description: "Rich text editing with Tiptap. Tables, code blocks, slash commands. Toggle to raw markdown anytime." },
            { img: "/brand/feat/htmlapp.png", span: "lg:col-span-2", title: "Embedded HTML Apps", description: "Drop an index.html in any folder. It renders as an iframe. Full-screen mode for dashboards." },
            { img: "/brand/feat/terminal.png", span: "lg:col-span-2", title: "Web Terminal", description: "Full Claude Code terminal in the browser. xterm.js + node-pty. Run commands without leaving Cabinet." },
            { img: "/brand/feat/git.png", span: "col-span-2 lg:col-span-4", featured: true, title: "Git-Backed History", description: "Every save auto-commits. Full diff viewer. Restore any page to any point in time. Linked repo support." },
            { img: "/brand/feat/schedule.png", span: "lg:col-span-2", title: "Scheduled Jobs", description: "Cron-based agent automation. Reddit scout every 6 hours. Weekly reports on Monday. Your AI team never sleeps." },
            { img: "/brand/feat/tasks.png", span: "lg:col-span-2", title: "Missions & Tasks", description: "Break goals into missions. Assign tasks to agents. Track progress with Kanban boards." },
            { img: "/brand/feat/chat.png", span: "col-span-2 lg:col-span-4", featured: true, title: "Internal Chat", description: "Built-in team channels. Agents and humans communicate. @mention an agent to trigger a response." },
            { img: "/brand/feat/search.png", span: "lg:col-span-2", title: "Full-Text Search", description: "Cmd+K instant search across all pages. Fuzzy matching. FlexSearch index rebuilt on every change." },
            { img: "/brand/feat/docs.png", span: "lg:col-span-2", title: "PDF & CSV First-Class", description: "PDFs render inline. CSVs open as editable tables with add/delete rows and columns." },
            { img: "/brand/feat/repos.png", span: "lg:col-span-2", title: "Linked Git Repos", description: "Add .repo.yaml to link KB directories to source code repos. Agents read your codebase." },
          ].map((f) => (
            <FeatureCard key={f.title} img={f.img} title={f.title} description={f.description} featured={f.featured} className={f.span} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function LegacyAiTeam() {
  return (
    <section id="agents" className="py-24 border-t border-border bg-bg-warm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-3">AI Team</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            Hire your AI team in 5 questions
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-body-serif">
            Answer 5 questions. A CEO agent appears. It suggests teammates.
            Each agent has goals, skills, and recurring jobs. You watch them
            work like watching a real team.
          </p>
        </div>
        <AgentShowcase />
      </div>
    </section>
  );
}

export function LegacyHowItWorks() {
  return (
    <section className="py-24 border-t border-border bg-bg">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-3">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary">
            From zero to AI team in 2 minutes
          </h2>
        </div>

        <div className="space-y-0">
          {[
            { step: "01", title: "Install & Run", desc: "One command. Next.js + daemon start. Your knowledge base is a /data directory on disk.", code: "npx cabinetai run" },
            { step: "02", title: "Answer 5 Questions", desc: "What's your company? What do you do? What are your goals? Cabinet builds your custom AI team.", code: null },
            { step: "03", title: "Watch Your Team Work", desc: "Agents create missions, write content, scout Reddit, review quality, all on schedule.", code: null },
            { step: "04", title: "Knowledge Compounds", desc: "Every agent run, every edit, every research session adds to the KB. Your system gets smarter every day.", code: null },
          ].map((item, i) => (
            <div key={item.step} className="flex gap-6 relative">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center text-sm font-code shrink-0">
                  {item.step}
                </div>
                {i < 3 && <div className="w-px h-full bg-border mt-2" />}
              </div>
              <div className="pb-12">
                <h3 className="font-display text-xl mb-2 text-text-primary">{item.title}</h3>
                <p className="text-sm text-text-secondary mb-3 leading-relaxed font-body-serif">{item.desc}</p>
                {item.code && (
                  <div className="inline-flex items-center gap-2 text-xs font-code text-accent bg-accent-bg px-3 py-1.5 rounded-lg">
                    <code>{item.code}</code>
                    <CopyButton text={item.code} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LegacySolutions() {
  return (
    <section id="solutions" className="py-24 border-t border-border bg-bg-warm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Solutions</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            Cabinet{" "}for every team
                                      </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed">
            Same knowledge base: a different AI crew for each function, working on
            your data, on your infrastructure, around the clock.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {SOLUTIONS.map((s) => (
            <a
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className="group flex flex-col rounded-2xl card-skin p-6 card-hover max-lg:text-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/brand/solutions/${s.slug}.png`}
                alt=""
                loading="lazy"
                decoding="async"
                className="mb-4 h-20 w-20 object-contain transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-2 max-lg:mx-auto"
              />
              <h3 className="mb-2 font-display text-lg text-text-primary">
                Cabinet{" "}for {s.label}
              </h3>
              <p className="text-sm text-text-secondary font-body-serif leading-relaxed flex-1">
                {s.menuBlurb}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-code text-sm text-accent transition-colors group-hover:text-accent-warm">
                Explore <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LegacyCabinetTemplates() {
  return (
    <section id="cabinets" className="py-24 border-t border-border bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Cabinet{" "}templates</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            Plug-and-play AI teams for real results
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed">
            Each cabinet runs as an always-on team on its own dedicated machine,
            self-hosted or in <span className="font-brand italic">Cabinet</span>{" "}Cloud.
            Real software doing real work while you sleep.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {CABINETS.slice(0, 6).map((c) => (
            <a
              key={c.slug}
              href={cabinetUrl(c.slug)}
              className="group flex flex-col overflow-hidden rounded-2xl card-skin card-hover"
            >
              <div
                className="relative w-full overflow-hidden"
                style={{ paddingBottom: "56%" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cabinetCover(c.slug)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 font-display text-lg text-text-primary">
                  {c.name}
                </h3>
                <p className="mb-3 flex-1 text-sm text-text-secondary font-body-serif leading-relaxed">
                  {c.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {c.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-accent-bg px-2 py-0.5 font-code text-[11px] text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={CABINETS_SITE}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold btn-wood"
          >
            Browse all cabinets
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function LegacyBusinessCase() {
  return (
    <section className="py-20 border-t border-border bg-bg">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">The business case</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            Own more. Pay less. Move faster.
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed">
            The numbers execs actually care about, before a single line of custom
            integration.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { stat: "$0", label: "per-seat AI markup: you bring your own models" },
            { stat: "100%", label: "of your data stays on your infrastructure" },
            { stat: "1 folder", label: "replaces the wiki, the chatbot, and the agent platform" },
            { stat: "24/7", label: "your AI team runs on a schedule, not on demand" },
          ].map((o) => (
            <div
              key={o.label}
              className="rounded-2xl card-skin p-7 text-center"
            >
              <div className="font-display text-4xl md:text-5xl tracking-tight text-accent">
                {o.stat}
              </div>
              <p className="mt-2 text-sm text-text-secondary font-body-serif leading-relaxed">
                {o.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LegacyOrgBadges() {
  return (
    <section className="py-24 border-t border-border bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Built for organizations</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            Designed to clear a security review
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed">
            The people who sign off on new tools (security, legal, platform
            owners) should come away with less to worry about, not more.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {TRUST_BADGES.map((b) => (
            <div
              key={b.label}
              className="group rounded-2xl card-skin p-6 card-hover"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.img}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-16 w-16 object-contain transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-2"
                />
                {b.status && (
                  <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
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
  );
}

export function LegacyCta() {
  return (
    <section id="get-started" className="py-24 border-t border-border bg-bg-warm overflow-hidden">
      {/* Full-bleed pair: text column centered, video bleeding to the viewport's right edge */}
      <div className="mb-16 grid items-center gap-10 px-6 text-center lg:grid-cols-[2fr_3fr] lg:gap-14 lg:pr-0">
        <div className="mx-auto w-full max-w-xl">
          <Image src="/cabinet-icon.png" alt="Cabinet" width={64} height={64} className="mx-auto mb-6 rounded-xl" />
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            Download <span className="font-brand italic">Cabinet</span>
            <br />
            your <TypingText texts={["knowledge base", "AI team", "workflows", "AI workspace"]} />
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto leading-relaxed font-body-serif">
            <span className="font-brand italic">Cabinet</span>{" "}is the AI workspace where your knowledge base, AI team, and workflows live in one beautiful home.
          </p>
          <DetectedDownloadCta />
        </div>
        {/* Wrapper clips the 2px border baked into the recording */}
        <div className="overflow-hidden rounded-2xl shadow-lg lg:rounded-r-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            width={2880}
            height={1794}
            className="-m-[2px] w-[calc(100%+4px)] max-w-none"
          >
            <source src="/new-cabinet.webm" type="video/webm" />
            <source src="/new-cabinet.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="mx-auto mt-16 max-w-3xl rounded-3xl bg-gradient-to-br from-[#FBF2E4] to-[#F2E5CF] px-6 py-12 shadow-sm sm:px-12">
          <Image
            src="/brand/icons/professional-services.png"
            alt=""
            width={64}
            height={64}
            className="mx-auto mb-4 object-contain"
          />
          <h3 className="text-2xl md:text-3xl font-display text-text-primary mb-3">
            Bringing Cabinet to your company?
          </h3>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto leading-relaxed font-body-serif">
            Talk to us about rollout, security review, and the workflows your teams run every day.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/demo"
              className="btn-wood inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap rounded-full px-8 text-base font-semibold"
            >
              Book a demo
            </a>
            <a
              href="/enterprise/security"
              className="inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap px-3 text-base font-semibold text-text-primary transition-colors hover:text-accent"
            >
              Learn more <ArrowRight aria-hidden className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-6 text-sm text-text-tertiary">
            Questions? <a href="mailto:hi@runcabinet.com" className="text-accent hover:text-accent-warm underline underline-offset-2">hi@runcabinet.com</a>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mt-12">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium transition-colors shadow-sm shadow-[#5865F2]/20"
          >
            <DiscordIcon className="w-4 h-4" /> Join Discord
          </a>
          <GitHubStarsButton
            className="inline-flex h-12 min-w-[11rem] items-center justify-between gap-3 rounded-full card-skin px-4 text-sm font-semibold text-text-primary shadow-sm transition-all hover:border-border-dark hover:bg-bg-card-hover"
          />
        </div>
      </div>
    </section>
  );
}
