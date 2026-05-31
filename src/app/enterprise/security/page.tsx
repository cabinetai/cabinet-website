"use client";

import {
  ArrowRight,
  Check,
  ChevronDown,
  Database,
  FileText,
  Fingerprint,
  Globe,
  Key,
  KeyRound,
  Lock,
  Network,
  Scale,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
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
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          <div className="ent-rise">
            <Pill icon={ShieldCheck}>Security &amp; control</Pill>
            <h1 className="ent-display-1 mt-6">
              Built for the CISO who has to{" "}
              <em className="text-accent">sign the contract</em>.
            </h1>
            <p className="ent-lead mt-6 max-w-xl">
              Cabinet is the only platform of its kind your team can read line
              by line, run inside your own network, and power with the AI
              keys you already pay for. Five layers (code, data, AI, hosting,
              and identity), all under your control.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href="/enterprise/briefing">
                Request architecture review
              </PrimaryButton>
              <SecondaryButton
                href="mailto:hi@runcabinet.com?subject=Security%20documentation%20request"
                icon={FileText}
              >
                Request the security pack
              </SecondaryButton>
            </div>
          </div>

          {/* Layers card */}
          <div className="relative">
            <div className="ent-glow" />
            <div className="relative ent-card overflow-hidden">
              <div className="px-5 py-3 border-b border-border bg-bg-warm flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-green-warm" />
                <span className="text-[11px] font-code text-text-secondary">
                  Five layers, all yours
                </span>
              </div>
              <div className="p-5 space-y-2.5">
                <SovLine icon={FileText} t="Code" s="Open source · MIT · on GitHub" />
                <SovLine icon={Database} t="Data" s="Your folder · your git · your servers" />
                <SovLine icon={KeyRound} t="AI" s="Your keys · Anthropic, OpenAI, AWS, or Azure" />
                <SovLine icon={Server} t="Hosting" s="Your laptops, your VPC, offline, or Cabinet Cloud" />
                <SovLine icon={Fingerprint} t="Identity" s="SSO · SAML · SCIM · Active Directory" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SovLine({
  icon: Icon,
  t,
  s,
}: {
  icon: React.ElementType;
  t: string;
  s: string;
}) {
  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg bg-bg-warm/60 border border-border">
      <div className="w-9 h-9 rounded-md bg-bg-card border border-border flex items-center justify-center">
        <Icon className="w-4 h-4 text-accent" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-text-primary">{t}</p>
        <p className="text-[11px] text-text-tertiary font-code">{s}</p>
      </div>
      <Check className="w-4 h-4 text-green-warm" strokeWidth={3} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   PILLARS
   ────────────────────────────────────────────────────────────── */
function Pillars() {
  const pillars = [
    {
      icon: Shield,
      tag: "Code",
      title: "Open source",
      body: "MIT-licensed. Every line of code that touches your strategy data is in a public GitHub repo. Your security team reads it before procurement signs.",
    },
    {
      icon: Lock,
      tag: "Data",
      title: "Your folder, your files",
      body: "Cabinet keeps your strategy as plain files on your disk. Backup is `tar`. Export is `cp`. No closed database, no migration queue, no escape hatch needed.",
    },
    {
      icon: Server,
      tag: "Host",
      title: "Run it where you want",
      body: "On your laptops, in your VPC, on an offline machine in a secured facility, or on Cabinet Cloud. AI calls go to your provider with your keys. We never see them.",
    },
    {
      icon: Network,
      tag: "EU",
      title: "EU AI Act ready",
      body: "Every AI-written document links to its sources. Every AI teammate has a narrow permission scope. Every action is logged. GDPR-aligned by design.",
    },
  ];
  return (
    <Section>
      <SectionHeader
        eyebrow="The four guarantees"
        title={
          <>
            Control isn't a checkbox.{" "}
            <em className="text-accent">It's how Cabinet is built.</em>
          </>
        }
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((p) => (
          <PillarCard key={p.title} {...p} />
        ))}
      </div>
    </Section>
  );
}

function PillarCard({
  icon: Icon,
  tag,
  title,
  body,
}: {
  icon: React.ElementType;
  tag: string;
  title: string;
  body: string;
}) {
  return (
    <div className="ent-card ent-card-hover p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="w-11 h-11 rounded-lg bg-accent-bg-subtle border border-accent-bg flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-accent bg-accent-bg-subtle border border-accent-bg px-2 py-0.5 rounded">
          {tag}
        </span>
      </div>
      <h3 className="ent-display-3 mb-2">{title}</h3>
      <p className="text-[15px] text-text-secondary leading-relaxed font-body-serif">{body}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   ARCHITECTURE
   ────────────────────────────────────────────────────────────── */
function Architecture() {
  return (
    <Section tone="warm">
      <SectionHeader
        eyebrow="Reference architecture"
        title={
          <>
            How data flows.{" "}
            <em className="text-accent">And where it doesn't.</em>
          </>
        }
        kicker={
          <>
            Cabinet runs entirely inside your perimeter. The orchestrator, the
            files, and the inference calls all happen on your infrastructure
            and your keys. Nothing (not telemetry, not prompts, not artefacts)
            leaves the boundary you choose.
          </>
        }
      />

      <div className="ent-card p-8 md:p-10 overflow-hidden">
        <ArchitectureDiagram />
        <div className="mt-8 grid md:grid-cols-3 gap-5 text-sm">
          <ArchNote n="01" t="Inference stays local" b="LLM API calls go from your Cabinet host to your inference provider with your keys. Cabinet's servers are not in the path." />
          <ArchNote n="02" t="No external telemetry" b="Optional anonymous usage analytics ship to nowhere by default. You opt in per-event, per-room." />
          <ArchNote n="03" t="Audit log is yours" b="Every prompt, every write, every agent action is appended to an audit file in the room. Stream it to your SIEM." />
        </div>
      </div>
    </Section>
  );
}

function ArchNote({ n, t, b }: { n: string; t: string; b: string }) {
  return (
    <div>
      <span className="font-display text-2xl text-text-tertiary">{n}</span>
      <p className="mt-2 text-[15px] font-semibold text-text-primary">{t}</p>
      <p className="text-sm text-text-secondary mt-1 font-body-serif leading-relaxed">{b}</p>
    </div>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="relative grid lg:grid-cols-[1fr_1.2fr_1fr] gap-6 items-stretch">
      {/* Left: users */}
      <ArchPanel
        label="Your team"
        sub="Cabinet UI · CLI · Slack · Teams"
        items={["CEO", "Chief of Staff", "Manager m"]}
      />
      {/* Center: Cabinet host */}
      <div className="relative rounded-xl border-2 border-accent/30 bg-accent-bg-subtle p-5">
        <Pill>Inside your perimeter</Pill>
        <h4 className="mt-3 font-display text-xl text-text-primary">Cabinet host</h4>
        <p className="text-[12px] font-code text-text-tertiary mt-1">
          self-hosted · VPC · air-gap · cloud
        </p>
        <div className="mt-4 grid gap-2">
          <ArchTile l="Orchestrator" s="MIT · open source · no telemetry by default" />
          <ArchTile l="Files" s="Markdown · git-backed · on your disk" />
          <ArchTile l="Jobs" s="Cron · agents · audit log" />
          <ArchTile l="MCP server" s="Scoped · auditable" />
        </div>
      </div>
      {/* Right: providers */}
      <ArchPanel
        label="Inference providers"
        sub="Your BYOK · choose any"
        items={["Anthropic", "OpenAI", "AWS Bedrock", "Azure OpenAI"]}
      />

      {/* Decorative arrows */}
      <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-[31%] w-[8%] h-6 items-center justify-center text-text-tertiary">
        <ArrowGlyph />
      </div>
      <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-[61%] w-[8%] h-6 items-center justify-center text-text-tertiary">
        <ArrowGlyph />
      </div>
    </div>
  );
}

function ArrowGlyph() {
  return (
    <svg width="48" height="14" viewBox="0 0 48 14" fill="none" className="text-text-tertiary">
      <path d="M0 7h44m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArchPanel({ label, sub, items }: { label: string; sub: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-bg-card p-5 flex flex-col">
      <Eyebrow muted>{label}</Eyebrow>
      <p className="text-[12px] text-text-tertiary font-code mt-1">{sub}</p>
      <div className="mt-4 space-y-2 flex-1">
        {items.map((it) => (
          <div key={it} className="flex items-center gap-2 px-3 py-2 rounded-md bg-bg-warm border border-border">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-sm text-text-secondary">{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
function ArchTile({ l, s }: { l: string; s: string }) {
  return (
    <div className="rounded-md bg-white/80 border border-accent-bg px-3 py-2">
      <p className="text-[13px] font-semibold text-text-primary">{l}</p>
      <p className="text-[11px] text-text-tertiary font-code">{s}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   CONTROLS TABLE
   ────────────────────────────────────────────────────────────── */
function Controls() {
  const groups = [
    {
      title: "Identity & access",
      icon: Fingerprint,
      rows: [
        { l: "Single sign-on (SSO)", v: "SAML 2.0 · OIDC" },
        { l: "Just-in-time provisioning", v: "SCIM 2.0" },
        { l: "Role-based access control", v: "Per-room · per-folder" },
        { l: "Per-agent permission scopes", v: "Read-only by default" },
      ],
    },
    {
      title: "Data protection",
      icon: Lock,
      rows: [
        { l: "Encryption in transit", v: "TLS 1.3" },
        { l: "Encryption at rest", v: "AES-256 · BYOK option" },
        { l: "Secrets management", v: "Vault · AWS KMS · GCP KMS" },
        { l: "Data residency", v: "Pick your region, or your laptop" },
      ],
    },
    {
      title: "Auditability",
      icon: Scale,
      rows: [
        { l: "Audit log", v: "Append-only · per-room file" },
        { l: "SIEM streaming", v: "Splunk · Datadog · Elastic" },
        { l: "Prompt + write log", v: "Every agent action recorded" },
        { l: "Immutable history", v: "Git commits · WORM bucket" },
      ],
    },
    {
      title: "Operational",
      icon: Server,
      rows: [
        { l: "Air-gap deployment", v: "Supported · no outbound required" },
        { l: "Backup & disaster recovery", v: "`tar` your folder · `restic`" },
        { l: "Multi-region", v: "Run a Cabinet per region" },
        { l: "SLA on Cloud tier", v: "99.9% available" },
      ],
    },
  ];

  return (
    <Section id="controls">
      <SectionHeader
        eyebrow="Controls catalogue"
        title={
          <>
            What you get out of the box,{" "}
            <em className="text-accent">before any add-on</em>.
          </>
        }
      />
      <div className="grid md:grid-cols-2 gap-5">
        {groups.map((g) => {
          const Icon = g.icon;
          return (
            <div key={g.title} className="ent-card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-accent-bg-subtle border border-accent-bg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="ent-display-3">{g.title}</h3>
              </div>
              <div className="divide-y divide-border">
                {g.rows.map((r) => (
                  <div key={r.l} className="grid grid-cols-[1fr_auto] gap-4 py-3">
                    <span className="text-[14px] text-text-primary">{r.l}</span>
                    <span className="text-[12px] font-code text-text-tertiary text-right">
                      {r.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ──────────────────────────────────────────────────────────────
   COMPLIANCE
   ────────────────────────────────────────────────────────────── */
function Compliance() {
  const items = [
    { t: "SOC 2 · Type II", s: "In progress · Q4 2026", state: "progress" },
    { t: "ISO 27001", s: "Planned · Q1 2027", state: "planned" },
    { t: "GDPR / DSGVO", s: "By design", state: "ready" },
    { t: "EU AI Act", s: "Architecture ready", state: "ready" },
    { t: "HIPAA path", s: "On request · BAA available", state: "request" },
    { t: "FedRAMP", s: "Planned · Q3 2027", state: "planned" },
    { t: "CCPA / CPRA", s: "Covered by data sovereignty", state: "ready" },
    { t: "PCI DSS", s: "N/A: no card data processed", state: "na" },
  ];

  const map = {
    ready: { c: "text-green-warm", b: "bg-green-bg-subtle border-green-bg", l: "Ready" },
    progress: { c: "text-amber-700", b: "bg-amber-50 border-amber-200", l: "In progress" },
    planned: { c: "text-text-secondary", b: "bg-bg-warm border-border", l: "Planned" },
    request: { c: "text-accent", b: "bg-accent-bg-subtle border-accent-bg", l: "On request" },
    na: { c: "text-text-tertiary", b: "bg-bg-warm border-border", l: "N/A" },
  };

  return (
    <Section tone="warm">
      <SectionHeader
        eyebrow="Compliance roadmap"
        title={
          <>
            Honest about where we are.{" "}
            <em className="text-accent">And where we're going.</em>
          </>
        }
        kicker={
          <>
            We don't claim certifications we haven't earned. The roadmap below
            is the public source of truth, updated quarterly with named
            auditors.
          </>
        }
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((it) => {
          const m = map[it.state as keyof typeof map];
          return (
            <div key={it.t} className="ent-card p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-[15px] font-semibold text-text-primary">{it.t}</p>
                <span className={`text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded border ${m.c} ${m.b}`}>
                  {m.l}
                </span>
              </div>
              <p className="text-[12px] text-text-tertiary font-code">{it.s}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ──────────────────────────────────────────────────────────────
   FAQ
   ────────────────────────────────────────────────────────────── */
function Faq() {
  const faqs = [
    {
      q: "Can we run Cabinet entirely inside our perimeter?",
      a: "Yes. Cabinet is a Node application with a markdown filesystem. Deploy it on a VM in your VPC, in an air-gapped facility, or on each employee's laptop. No outbound connection is required for the application to function, only your chosen inference provider (and you can self-host that too via vLLM or Ollama).",
    },
    {
      q: "How does inference work? Do you see our prompts?",
      a: "No. Inference calls go directly from your Cabinet host to the inference provider of your choice using your API key. Cabinet's servers are not in the path. We literally cannot see your prompts. There is no telemetry endpoint receiving them.",
    },
    {
      q: "What happens to our data if we churn?",
      a: "Nothing. Your data is already a folder on your disk. There is no export step. There is no 90-day data extraction queue. Run `tar -czvf strategy.tar.gz strategy/` and you have a complete, portable archive.",
    },
    {
      q: "How do you handle agent provenance for the EU AI Act?",
      a: "Every artefact an agent writes includes its sources, the prompt used, the model, and the timestamp. The audit log appends every prompt and every write. Risk classification (per Art. 6) and human oversight requirements (per Art. 14) are configured per-agent at the room level.",
    },
    {
      q: "Can we restrict an agent's access to specific folders?",
      a: "Yes. Each agent has a scope declaration: read-only by default, with explicit allow-lists for write targets and source folders. The Risk Sentinel can scan 1:1 logs without ever being allowed to write to them.",
    },
    {
      q: "What about SOC 2? Can we sign a contract before you have it?",
      a: "Yes. Many of our pilot customers do. We're happy to share our security questionnaire responses, our pen-test reports, the SOC 2 readiness plan with our auditor, and our roadmap. For regulated industries we can also offer the air-gap deployment, which sidesteps most of the typical SOC 2 concerns.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section>
      <SectionHeader
        eyebrow="Security FAQ"
        title="Questions your CISO will ask."
      />
      <div className="max-w-3xl space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="ent-card overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center gap-4 text-left px-6 py-5 hover:bg-bg-warm/50 transition-colors"
              >
                <span className="text-[16px] font-semibold text-text-primary flex-1">
                  {f.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-text-tertiary shrink-0 transition-transform ${
                    isOpen ? "rotate-180 text-accent" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 -mt-1 ent-fade">
                  <p className="text-[15px] text-text-secondary leading-relaxed font-body-serif">
                    {f.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ──────────────────────────────────────────────────────────────
   FINAL CTA
   ────────────────────────────────────────────────────────────── */
function FinalCta() {
  return (
    <Section tone="warm">
      <div className="ent-card p-10 md:p-14 text-center max-w-4xl mx-auto">
        <Pill icon={ShieldCheck}>Security review · NDA-friendly</Pill>
        <h2 className="ent-display-2 mt-4 max-w-2xl mx-auto">
          Send us the security questionnaire.{" "}
          <em className="text-accent">We'll send it back filled in.</em>
        </h2>
        <p className="ent-lead mt-5 max-w-2xl mx-auto">
          Whether you're at a regulated bank, a defence contractor, or a
          healthcare payer, we'll meet your security team where they are,
          with the documentation they're used to seeing.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <PrimaryButton href="/enterprise/briefing">Request architecture review</PrimaryButton>
          <SecondaryButton
            href="mailto:hi@runcabinet.com?subject=Security%20pack%20request"
            icon={FileText}
          >
            Email the security pack
          </SecondaryButton>
        </div>
      </div>
    </Section>
  );
}

export default function SecurityPage() {
  return (
    <>
      <Hero />
      <Pillars />
      <Architecture />
      <Controls />
      <Compliance />
      <Faq />
      <FinalCta />
    </>
  );
}
