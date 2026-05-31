"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import {
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  Section,
  SectionHeader,
} from "@/components/enterprise/primitives";

const LINKEDIN_URL = "https://www.linkedin.com/in/hilashmuel/";

function LinkedinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 11.01-4.13 2.06 2.06 0 01-.01 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="bg-bg-warm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="grid lg:grid-cols-[480px_1fr] gap-12 lg:gap-20 items-start">
          {/* Photo */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-bg-card shadow-md">
              <Image
                src="/hila.png"
                alt="Hila Shmuel, founder of Cabinet"
                width={800}
                height={1000}
                priority
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 20%" }}
              />
            </div>
            {/* Caption strip below photo, restrained */}
            <p className="mt-4 text-xs text-text-tertiary font-medium tracking-wide">
              Tel Aviv, Israel
            </p>
          </div>

          {/* Copy */}
          <div className="lg:pt-6">
            <Eyebrow>Founder</Eyebrow>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.04] tracking-tight text-text-primary">
              Hila Shmuel
            </h1>
            <p className="mt-3 text-[1.0625rem] text-text-secondary font-body-serif italic">
              Founder, Cabinet. Previously Engineering Manager,
              AI &amp; Data Infrastructure at Apple.
            </p>

            <div className="mt-7 space-y-5 text-[1.0625rem] text-text-secondary font-body-serif leading-relaxed max-w-2xl">
              <p>
                I spent four years at Apple building the infrastructure behind
                on-device AI: the training and data systems that produce the
                models running on billions of iPhones, Macs, and iPads.
                Twenty years of engineering led me to one conclusion:{" "}
                <span className="text-text-primary font-semibold">
                  systems that scale to billions are the ones that hide
                  complexity, not display it.
                </span>
              </p>
              <p>
                Cabinet is the application of that idea to a different problem:
                running strategy execution at the scale of an enterprise, on
                files the enterprise actually owns.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ent-btn-primary group"
              >
                <LinkedinIcon className="w-4 h-4" />
                Connect on LinkedIn
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <SecondaryButton href="/enterprise/briefing" icon={ArrowRight}>
                Book a briefing
              </SecondaryButton>
            </div>

            {/* Credibility strip */}
            <div className="mt-12 pt-8 border-t border-border grid grid-cols-3 gap-6 max-w-lg">
              <Cred n="20+" l="Years engineering" />
              <Cred n="4 yrs" l="At Apple, AI & Data" />
              <Cred n="2" l="BSc degrees" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cred({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p className="font-display text-3xl text-text-primary leading-none">{n}</p>
      <p className="text-[11px] text-text-tertiary uppercase tracking-widest font-semibold mt-2">
        {l}
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   APPLE — the work, told plainly
   ────────────────────────────────────────────────────────────── */
function AppleWork() {
  return (
    <Section>
      <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
        <div className="lg:pt-2">
          <Eyebrow>The work at Apple</Eyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-text-primary leading-tight">
            Four years building the infrastructure behind on-device AI.
          </h2>
        </div>

        <div className="space-y-6 text-[1.0625rem] text-text-secondary font-body-serif leading-relaxed max-w-2xl">
          <p>
            I led the team that built the orchestration platform behind
            Apple's on-device AI training. Machine-learning engineers wrote
            Python. The platform handled fault tolerance, scheduling across
            thousands of GPUs, and the network topology across data centers.
            Training and data preparation became{" "}
            <span className="text-text-primary font-semibold">
              more than ten times faster
            </span>
            <span>, </span>at a scale where ten times faster meant tens of millions of
            dollars and many engineering quarters returned.
          </p>
          <p>
            Two consumer features shipped on pipelines I built end-to-end:{" "}
            <span className="text-text-primary font-semibold">
              Night Mode Portrait
            </span>{" "}
            and{" "}
            <span className="text-text-primary font-semibold">
              Cinematic Video on iPhone 13
            </span>
            . Both required new data infrastructure between research and
            shipping: collaboration across teams, careful trade-offs between
            quality and latency, and ML that had to feel reliable in a hand
            holding a phone.
          </p>
          <p>
            What I learned at that scale is what informs Cabinet now: the
            interface to a powerful system should be a few sentences. The
            complexity behind the interface should be invisible. The work of
            the system should be observable and reversible.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ──────────────────────────────────────────────────────────────
   WHY CABINET — the thesis
   ────────────────────────────────────────────────────────────── */
function Thesis() {
  return (
    <Section tone="warm">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
        <div className="lg:pt-2">
          <Eyebrow>Why Cabinet</Eyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-text-primary leading-tight">
            Why I'm spending the next decade on this.
          </h2>
        </div>

        <div className="space-y-6 text-[1.0625rem] text-text-secondary font-body-serif leading-relaxed max-w-2xl">
          <p>
            Every CEO has a Chief of Staff. Every SVP has an executive coach.
            The remaining 98% of managers have neither.{" "}
            <span className="text-text-primary font-semibold">
              That is not a tooling problem. It is an infrastructure problem.
            </span>{" "}
            The work a Chief of Staff does (scan the room, surface what
            slipped, draft the reply, queue the meeting) is the same kind of
            invisible, scheduled, distributed work I built infrastructure for at
            Apple.
          </p>
          <p>
            Cabinet is built the way good infrastructure is built. The
            executive writes a few sentences. The platform schedules, retrieves,
            drafts, and surfaces. The output lands in Slack, Teams, and email,
            wherever the executive already lives.
          </p>
          <p>
            And the data <span>(</span>
            <span className="text-text-primary font-semibold">
              your strategy, your decisions, your one-on-one history
            </span>
            <span>) </span>stays as plain files inside your company. Because the second
            lesson of Apple-scale was simpler: when you are responsible for
            billions of users' data, you do not trust anyone else to hold it.
            You hold it yourself.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ──────────────────────────────────────────────────────────────
   TIMELINE — selected, restrained
   ────────────────────────────────────────────────────────────── */
function Timeline() {
  const events = [
    {
      year: "2024 → ",
      role: "Founder",
      org: "Cabinet",
      detail: "Open-source platform for running strategy execution on files you own.",
    },
    {
      year: "2020 – 2024",
      role: "Engineering Manager · Software Engineer",
      org: "Apple, AI & Data Infrastructure",
      detail:
        "Led orchestration for distributed training and on-device ML data pipelines. Shipped Night Mode Portrait and Cinematic Video.",
    },
    {
      year: "2022 – 2023",
      role: "One-year career break",
      org: "Road trip: North America, then Asia",
      detail:
        "Drove the United States and Canada in a van, then continued through Japan, Korea, Taiwan, Thailand, Vietnam, India, and Singapore. Returned with the perspective that launched Cabinet.",
    },
    {
      year: "2017 – 2019",
      role: "Senior Researcher",
      org: "Armis Security",
      detail:
        "Vulnerability research and reverse engineering of embedded network devices. Built a network-crawler and configuration system from layer 2 up.",
    },
    {
      year: "2011 – 2014",
      role: "Software Engineer & Researcher",
      org: "Israeli Defense Forces, Military Intelligence",
      detail:
        "Embedded systems, reverse engineering, C/C++ on Linux and Windows. Owned projects from idea to deployment.",
    },
  ];
  return (
    <Section>
      <SectionHeader
        eyebrow="The path"
        title={
          <>
            Twenty years going down to the metal,{" "}
            <em className="text-accent">and back up</em>.
          </>
        }
      />
      <div className="max-w-3xl">
        <div className="space-y-10">
          {events.map((e, i) => (
            <article key={i} className="grid grid-cols-[140px_1fr] gap-6 md:gap-10">
              <p className="text-[12px] font-semibold text-text-tertiary uppercase tracking-widest pt-1">
                {e.year}
              </p>
              <div className="border-l border-border-dark pl-6">
                <h3 className="font-display text-xl text-text-primary leading-snug">
                  {e.role}
                </h3>
                <p className="text-sm font-semibold text-accent mt-0.5">{e.org}</p>
                <p className="text-[15px] text-text-secondary mt-3 font-body-serif leading-relaxed">
                  {e.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ──────────────────────────────────────────────────────────────
   BEYOND
   ────────────────────────────────────────────────────────────── */
function Beyond() {
  return (
    <Section tone="warm">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <article>
          <Eyebrow>Builders Podcast</Eyebrow>
          <h3 className="mt-3 font-display text-2xl text-text-primary leading-tight">
            Israel's first Hebrew podcast on bootstrapped and AI-powered
            startups.
          </h3>
          <p className="mt-4 text-[1.0625rem] text-text-secondary font-body-serif leading-relaxed">
            Every episode is a conversation with a founder who built a
            revenue-generating company without venture capital. The
            infrastructure choices, the actual numbers, the pivots that saved
            the business. It is also how I keep my finger on where AI workflows
            break in production, and where the next leverage point is hiding.
          </p>
        </article>

        <article>
          <Eyebrow>Education</Eyebrow>
          <h3 className="mt-3 font-display text-2xl text-text-primary leading-tight">
            Two BSc degrees, deliberately: Computer Science and
            Mathematics &amp; Physics.
          </h3>
          <p className="mt-4 text-[1.0625rem] text-text-secondary font-body-serif leading-relaxed">
            I finished my Computer Science BSc during high school, then read
            Mathematics and Physics afterwards. The depth and the breadth,
            taken in the order that gave me the most use of each. I have been
            writing software professionally since 2006.
          </p>
        </article>
      </div>
    </Section>
  );
}

/* ──────────────────────────────────────────────────────────────
   CONNECT
   ────────────────────────────────────────────────────────────── */
function Connect() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <div className="ent-card p-10 md:p-14 text-center">
          <Eyebrow>Get in touch</Eyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-text-primary leading-tight">
            Whether you're running a Fortune-500 strategy function or building
            your own thing, I'd like to hear from you.
          </h2>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ent-btn-primary group"
            >
              <LinkedinIcon className="w-4 h-4" />
              Connect on LinkedIn
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <SecondaryButton href="mailto:hi@runcabinet.com" icon={Mail}>
              hi@runcabinet.com
            </SecondaryButton>
            <SecondaryButton href="/enterprise/briefing" icon={ArrowRight}>
              Book a briefing
            </SecondaryButton>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function AboutPage() {
  return (
    <>
      <Hero />
      <AppleWork />
      <Thesis />
      <Timeline />
      <Beyond />
      <Connect />
    </>
  );
}
