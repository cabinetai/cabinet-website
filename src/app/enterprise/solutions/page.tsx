"use client";

import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  Check,
  Clock,
  DollarSign,
  FileText,
  GitBranch,
  HeartHandshake,
  LineChart,
  Lock,
  PieChart,
  ScrollText,
  Shield,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import {
  CheckList,
  Eyebrow,
  Pill,
  PrimaryButton,
  SecondaryButton,
  Section,
  SectionHeader,
} from "@/components/enterprise/primitives";

/* ──────────────────────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative ent-wash overflow-hidden">
      <div className="absolute inset-0 ent-dots opacity-40 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 md:pt-24 pb-14">
        <div className="max-w-3xl ent-rise">
          <Pill icon={Sparkles}>Solutions by role</Pill>
          <h1 className="ent-display-1 mt-6">
            One substrate.{" "}
            <em className="text-accent">Four offices it pays for itself with.</em>
          </h1>
          <p className="ent-lead mt-6 max-w-2xl">
            Cabinet is rare in enterprise software: it lands at the CEO level
            and the bottom of the org chart in the same quarter. Pick the office
            you sit in. Every section below maps a real Cabinet deployment to
            the budget that pays for it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton href="/enterprise/briefing">
              Request a briefing for my office
            </PrimaryButton>
            <SecondaryButton href="/enterprise/platform" icon={Sparkles}>
              See the platform
            </SecondaryButton>
          </div>
        </div>

        {/* Anchor nav */}
        <div className="mt-12 flex flex-wrap gap-2">
          <AnchorChip href="#ceo" icon={Briefcase} label="Office of the CEO" />
          <AnchorChip href="#chro" icon={HeartHandshake} label="CHRO / People" />
          <AnchorChip href="#cfo" icon={LineChart} label="CFO / Finance" />
          <AnchorChip href="#cio" icon={Shield} label="CIO / CISO" />
        </div>
      </div>
    </section>
  );
}

function AnchorChip({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-bg-card hover:bg-bg-warm hover:border-border-dark transition-all"
    >
      <Icon className="w-3.5 h-3.5 text-accent" />
      <span className="text-sm font-medium text-text-primary">{label}</span>
    </a>
  );
}

/* ──────────────────────────────────────────────────────────────
   PERSONA SECTION (reusable)
   ────────────────────────────────────────────────────────────── */
function PersonaSection({
  id,
  tone,
  reverse,
  eyebrow,
  title,
  jtbd,
  outcomes,
  template,
  visual,
}: {
  id: string;
  tone?: "default" | "warm";
  reverse?: boolean;
  eyebrow: string;
  title: React.ReactNode;
  jtbd: string;
  outcomes: { stat: string; label: string }[];
  template: { name: string; lines: string[] };
  visual: React.ReactNode;
}) {
  return (
    <Section id={id} tone={tone}>
      <div className={`grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}>
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="ent-display-2 mt-3">{title}</h2>
          <p className="ent-lead mt-5">{jtbd}</p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {outcomes.map((o) => (
              <div key={o.label} className="ent-card-flat p-4">
                <p className="font-display text-3xl text-accent leading-none">{o.stat}</p>
                <p className="text-[12px] text-text-secondary mt-2 leading-snug">{o.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 p-5 rounded-xl bg-accent-bg-subtle border border-accent-bg">
            <Eyebrow>Cabinet template</Eyebrow>
            <p className="font-display text-lg text-text-primary mt-1.5">{template.name}</p>
            <ul className="mt-3 space-y-1.5">
              {template.lines.map((l) => (
                <li key={l} className="flex items-start gap-2 text-[14px] text-text-secondary">
                  <Check className="w-3.5 h-3.5 text-accent mt-1 shrink-0" strokeWidth={3} />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7">
            <SecondaryButton href="/enterprise/briefing" icon={ArrowRight}>
              Map this to my org
            </SecondaryButton>
          </div>
        </div>

        <div>{visual}</div>
      </div>
    </Section>
  );
}

/* ──────────────────────────────────────────────────────────────
   VISUALS
   ────────────────────────────────────────────────────────────── */
function CeoVisual() {
  return (
    <div className="relative">
      <div className="ent-glow" />
      <div className="relative ent-card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-bg-warm">
          <Briefcase className="w-3.5 h-3.5 text-accent" />
          <span className="text-[11px] font-code text-text-secondary">
            ceo-room / today.md
          </span>
        </div>
        <div className="p-6">
          <h4 className="font-display text-xl text-text-primary leading-tight">
            Monday · briefing for Sarah
          </h4>
          <p className="text-[12px] text-text-tertiary font-code mt-1">
            grounded in 142 OKRs · 38 1:1s · 14 initiatives
          </p>
          <div className="mt-5 space-y-2.5">
            <Bullet color="bg-red-400" t="EMEA expansion KR slipping 12pts" s="Mercedes pilot: call Tuesday" />
            <Bullet color="bg-green-light" t="Q2 revenue +4pts above plan" s="Marcus drafted the one-pager" />
            <Bullet color="bg-accent" t="2 follow-ups drafted" s="Approve in /1on1s/marcus.md" />
          </div>
          <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-[11px]">
            <span className="text-text-tertiary">Next</span>
            <span className="text-text-secondary">MBR pre-read drafts Wed 07:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChroVisual() {
  return (
    <div className="relative">
      <div className="ent-glow" />
      <div className="relative ent-card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-bg-warm">
          <HeartHandshake className="w-3.5 h-3.5 text-accent" />
          <span className="text-[11px] font-code text-text-secondary">
            coach-agent / friday-reflection.md
          </span>
        </div>
        <div className="p-6">
          <h4 className="font-display text-xl text-text-primary leading-tight">
            Friday reflection · Marcus's team
          </h4>
          <p className="text-[12px] text-text-tertiary font-code mt-1">
            drafted by Coach · grounded in 1:1 history
          </p>
          <div className="mt-5 space-y-3">
            <CoachItem
              tag="Kudos · drafted"
              title="Recognise Priya for unblocking the integration"
              detail="Cross-team work shipped 9 days ahead of plan."
            />
            <CoachItem
              tag="SBI prep · 1:1 Tuesday"
              title="Hard conversation with Eli on missed dates"
              detail="Situation, Behaviour, Impact frame ready in /1on1s/eli.md"
            />
            <CoachItem
              tag="Growth plan · this quarter"
              title="Marcus → ready for principal-level work"
              detail="Three skill areas mapped to project assignments."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CoachItem({
  tag,
  title,
  detail,
}: {
  tag: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-bg-warm/40 px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">{tag}</p>
      <p className="text-[14px] font-semibold text-text-primary mt-0.5 leading-snug">{title}</p>
      <p className="text-[12px] text-text-tertiary mt-1 font-body-serif">{detail}</p>
    </div>
  );
}

function CfoVisual() {
  return (
    <div className="relative">
      <div className="ent-glow" />
      <div className="relative ent-card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-bg-warm">
          <LineChart className="w-3.5 h-3.5 text-accent" />
          <span className="text-[11px] font-code text-text-secondary">
            mbr / 2026-05.md
          </span>
        </div>
        <div className="p-6">
          <h4 className="font-display text-xl text-text-primary leading-tight">
            May Bowler · live grid
          </h4>
          <p className="text-[12px] text-text-tertiary font-code mt-1">
            auto-drafted Wed 07:00 · 6 charts · 4 sources
          </p>
          <div className="mt-5 grid grid-cols-12 gap-1">
            {Array.from({ length: 12 }).map((_, i) => {
              const isRed = i === 7;
              const isAmber = i === 4 || i === 9;
              return (
                <div
                  key={i}
                  className={`h-9 rounded ${
                    isRed
                      ? "bg-red-100 border border-red-300"
                      : isAmber
                      ? "bg-amber-100 border border-amber-300"
                      : "bg-green-100 border border-green-300"
                  } flex items-center justify-center text-[10px] font-code text-text-secondary`}
                >
                  {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
                </div>
              );
            })}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 text-[12px]">
            <KpiBlock l="Revenue" v="+4 pts" tone="up" />
            <KpiBlock l="Attendance" v="91%" tone="up" />
            <KpiBlock l="EMEA Pilot" v="−12 pts" tone="down" />
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiBlock({ l, v, tone }: { l: string; v: string; tone: "up" | "down" }) {
  return (
    <div className={`rounded-md px-3 py-2 border ${tone === "up" ? "bg-green-bg-subtle border-green-bg" : "bg-red-50 border-red-200"}`}>
      <p className="text-[10px] text-text-tertiary uppercase tracking-wider">{l}</p>
      <p className={`text-[14px] font-semibold ${tone === "up" ? "text-green-warm" : "text-red-700"}`}>{v}</p>
    </div>
  );
}

function CioVisual() {
  return (
    <div className="relative">
      <div className="ent-glow" />
      <div className="relative ent-card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-bg-warm">
          <Shield className="w-3.5 h-3.5 text-accent" />
          <span className="text-[11px] font-code text-text-secondary">
            audit / 2026-05.log
          </span>
        </div>
        <div className="p-5 space-y-2 font-code text-[12px] text-text-secondary">
          <AuditLine t="13:42:18" a="cos-agent" act="read" path="okrs/emea.md" />
          <AuditLine t="13:42:21" a="cos-agent" act="write" path="today/index.md" />
          <AuditLine t="13:42:29" a="risk-sentinel" act="read" path="1on1s/marcus.md" />
          <AuditLine t="13:42:33" a="risk-sentinel" act="flag" path="risks/marcus-followup" />
          <AuditLine t="13:42:40" a="coach" act="read" path="1on1s/eli.md" />
          <AuditLine t="13:42:48" a="strategy" act="query" path="snowflake.live" />
        </div>
        <div className="px-5 py-3 border-t border-border bg-bg-warm flex items-center justify-between">
          <span className="text-[11px] text-text-tertiary">Stream to SIEM</span>
          <div className="flex items-center gap-1.5">
            <span className="ent-pill ent-pill-sage">Splunk</span>
            <span className="ent-pill ent-pill-neutral">Datadog</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuditLine({
  t,
  a,
  act,
  path,
}: {
  t: string;
  a: string;
  act: string;
  path: string;
}) {
  const colors: Record<string, string> = {
    read: "text-text-tertiary",
    write: "text-accent",
    flag: "text-red-700",
    query: "text-blue-700",
  };
  return (
    <div className="flex items-baseline gap-3 py-0.5">
      <span className="text-text-muted">{t}</span>
      <span className="font-semibold text-text-secondary min-w-[100px]">{a}</span>
      <span className={`uppercase text-[10px] font-semibold ${colors[act]}`}>{act}</span>
      <span className="text-text-tertiary truncate">{path}</span>
    </div>
  );
}

function Bullet({ color, t, s }: { color: string; t: string; s: string }) {
  return (
    <div className="flex items-start gap-3 py-1.5">
      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${color}`} />
      <div>
        <p className="text-[14px] font-semibold text-text-primary">{t}</p>
        <p className="text-[12px] text-text-tertiary font-code">{s}</p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   PERSONAS
   ────────────────────────────────────────────────────────────── */
function CeoSection() {
  return (
    <PersonaSection
      id="ceo"
      eyebrow="Office of the CEO"
      title={
        <>
          The operating model{" "}
          <em className="text-accent">that survives Monday morning</em>.
        </>
      }
      jtbd="The CEO walks into the week with too much to process. Cabinet's Chief of Staff agent reads the room over the weekend (the OKRs that slipped, the dependencies that broke, the commitments past due) and lands a briefing at 06:00 that grounds every decision for the week."
      outcomes={[
        { stat: "14h→3h", label: "MBR prep, per cycle" },
        { stat: "06:00", label: "Daily brief, every weekday" },
        { stat: "100%", label: "Decisions captured in writing" },
      ]}
      template={{
        name: "cabinet:exec-strategy-room",
        lines: [
          "Daily brief at 06:00 grounded in every BU's OKR",
          "Auto-drafted MBR pre-read 5 days ahead",
          "Risk register heartbeat scans every hour",
          "Decisions log with named owners and timestamps",
        ],
      }}
      visual={<CeoVisual />}
    />
  );
}

function ChroSection() {
  return (
    <PersonaSection
      id="chro"
      tone="warm"
      reverse
      eyebrow="CHRO · People · Talent"
      title={
        <>
          Every manager.{" "}
          <em className="text-accent">One coach in their pocket.</em>
        </>
      }
      jtbd="The CEO gets a Chief of Staff. The SVP gets a coach. Everyone else gets nothing. Cabinet's Coach agent sits with every people manager: it drafts kudos from real contributions, frames hard conversations using SBI, builds personal growth plans grounded in actual project history. The most expensive perk in your org, made universal."
      outcomes={[
        { stat: "100%", label: "Manager coaching coverage" },
        { stat: "0", label: "Dropped 1:1 commitments per quarter" },
        { stat: "+91%", label: "Standing review attendance" },
      ]}
      template={{
        name: "cabinet:leadership-coach",
        lines: [
          "Coach agent runs in each manager's room",
          "Friday reflection prompt: auto-drafts kudos",
          "SBI feedback frame before hard conversations",
          "Per-report growth plan grounded in 1:1 logs",
        ],
      }}
      visual={<ChroVisual />}
    />
  );
}

function CfoSection() {
  return (
    <PersonaSection
      id="cfo"
      eyebrow="CFO · Finance · FP&A"
      title={
        <>
          The numbers that make it to{" "}
          <em className="text-accent">the next board deck</em>.
        </>
      }
      jtbd="The FP&A team spends 60% of a month preparing the next MBR. Cabinet's Strategy Analyst diffs OKR progress weekly, generates the bowler chart automatically, surfaces metric movements that matter and ignores the noise that doesn't. The pre-read lands Wednesday before your prep block, every month."
      outcomes={[
        { stat: "$240k", label: "Saved on Workboard-equivalent ARR" },
        { stat: "3×", label: "Faster OKR cycle close" },
        { stat: "10×", label: "MBR prep velocity" },
      ]}
      template={{
        name: "cabinet:exec-strategy-room + bowler",
        lines: [
          "Live bowler chart sourced from Snowflake",
          "Auto-diff of OKR progress, week over week",
          "MBR pre-read with TL;DR + three discussion points",
          "Decision log tied to financial outcome impact",
        ],
      }}
      visual={<CfoVisual />}
    />
  );
}

function CioSection() {
  return (
    <PersonaSection
      id="cio"
      tone="warm"
      reverse
      eyebrow="CIO · CISO · Platform"
      title={
        <>
          The first AI platform you can{" "}
          <em className="text-accent">read line by line before you sign</em>.
        </>
      }
      jtbd="Most enterprise AI vendors hand you a glossy security PDF and a closed binary. Cabinet hands you a GitHub repo. Your team pen-tests the code, your security architect reviews the agent permission model, your platform team chooses where it runs. Inference stays on your keys; data stays a folder you can `tar` and move."
      outcomes={[
        { stat: "OSS", label: "MIT-licensed code · audit before signing" },
        { stat: "BYOK", label: "Your inference keys · your provider" },
        { stat: "`cp -r`", label: "Export your data in 1 command" },
      ]}
      template={{
        name: "cabinet:platform + audit + SSO",
        lines: [
          "Self-host in your VPC, on-prem, or air-gap",
          "SAML 2.0 + SCIM 2.0 + per-room RBAC",
          "Append-only audit log streamable to your SIEM",
          "Per-agent permission scopes: read-only by default",
        ],
      }}
      visual={<CioVisual />}
    />
  );
}

/* ──────────────────────────────────────────────────────────────
   CROSS-OFFICE TABLE
   ────────────────────────────────────────────────────────────── */
function PaysFor() {
  return (
    <Section>
      <SectionHeader
        eyebrow="One platform · four budgets"
        title={
          <>
            Cabinet doesn't come out of{" "}
            <em className="text-accent">one office's line item</em>.
          </>
        }
        kicker={
          <>
            Different stakeholders fund different layers of the same deployment.
            Below: which office signs the cheque, what they get, what they
            measure.
          </>
        }
      />

      <div className="ent-card overflow-hidden">
        <div className="grid grid-cols-[1fr_1.2fr_1.2fr_140px] border-b border-border">
          <ColH t="Buyer" />
          <ColH t="Value layer" />
          <ColH t="They measure" />
          <ColH t="Cabinet template" />
        </div>
        {[
          { b: "Office of the CEO", v: "Operating brief · MBR pre-read · risk register", m: "Cycle close time · attendance · decisions captured", t: "exec-strategy" },
          { b: "CHRO / People", v: "Coach agent · kudos · 1:1 prep · growth plans", m: "Manager coaching coverage · engagement", t: "leadership-coach" },
          { b: "CFO / FP&A", v: "Bowler · scorecard · OKR diffs · finance close", m: "Prep velocity · pre-read quality · cost per BU", t: "exec-strategy + bowler" },
          { b: "CIO / CISO", v: "Platform · self-host · BYOK · audit · SSO", m: "Sovereignty · audit completeness · vendor risk", t: "platform + audit + SSO" },
        ].map((r, i) => (
          <div key={r.b} className={`grid grid-cols-[1fr_1.2fr_1.2fr_140px] border-b border-border last:border-0 ${i % 2 === 1 ? "bg-bg-warm/40" : ""}`}>
            <div className="px-5 py-4 text-[14px] font-semibold text-text-primary">{r.b}</div>
            <div className="px-5 py-4 text-[14px] text-text-secondary">{r.v}</div>
            <div className="px-5 py-4 text-[14px] text-text-tertiary font-body-serif italic">{r.m}</div>
            <div className="px-5 py-4 text-[11px] text-accent font-code">{r.t}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ColH({ t }: { t: string }) {
  return (
    <div className="px-5 py-3">
      <Eyebrow muted>{t}</Eyebrow>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   FINAL CTA
   ────────────────────────────────────────────────────────────── */
function FinalCta() {
  return (
    <Section tone="warm">
      <div className="ent-card p-10 md:p-14 text-center max-w-4xl mx-auto">
        <Pill icon={Sparkles}>Your role · your deployment</Pill>
        <h2 className="ent-display-2 mt-4 max-w-2xl mx-auto">
          Tell us your seat.{" "}
          <em className="text-accent">We'll map the deployment.</em>
        </h2>
        <p className="ent-lead mt-5 max-w-2xl mx-auto">
          90-minute working session with the founders. We pre-load your top
          three OKRs into a Cabinet room and walk you through the experience
          your seat would actually have on Monday morning.
        </p>
        <div className="mt-7">
          <PrimaryButton href="/enterprise/briefing">Request the briefing</PrimaryButton>
        </div>
      </div>
    </Section>
  );
}

export default function SolutionsPage() {
  return (
    <>
      <Hero />
      <CeoSection />
      <ChroSection />
      <CfoSection />
      <CioSection />
      <PaysFor />
      <FinalCta />
    </>
  );
}
