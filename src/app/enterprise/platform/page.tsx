"use client";

import {
  ArrowRight,
  Bot,
  Brain,
  Calendar,
  Clock,
  Database,
  FileText,
  Folder,
  GitBranch,
  Globe,
  Layers,
  LayoutDashboard,
  MessageSquare,
  Network,
  Search,
  Shield,
  Sparkles,
  Terminal,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import {
  CheckList,
  Eyebrow,
  FeatureCard,
  Pill,
  PrimaryButton,
  SecondaryButton,
  Section,
  SectionHeader,
} from "@/components/enterprise/primitives";

function Hero() {
  return (
    <section className="relative ent-wash overflow-hidden">
      <div className="absolute inset-0 ent-dots opacity-40 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="max-w-3xl ent-rise">
          <Pill icon={Sparkles}>The platform</Pill>
          <h1 className="ent-display-1 mt-6">
            One platform.<br />
            <em className="text-accent">Three simple parts.</em>
          </h1>
          <p className="ent-lead mt-6 max-w-2xl">
            Cabinet is not an OKR tool, a coaching app, or a meeting assistant.
            It is the layer those things sit on top of: your files (strategy,
            OKRs, org chart, decisions, one-on-ones), a schedule that keeps
            them up to date, and four AI teammates that do the routine work
            for you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton href="/enterprise/briefing">Request a demo</PrimaryButton>
            <SecondaryButton href="/enterprise/security" icon={Shield}>
              Review security
            </SecondaryButton>
          </div>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          <Pillar
            n="01"
            t="Your files"
            d="Strategy, OKRs, org chart, decisions, one-on-one notes: all in plain text, in a folder you own, versioned by git."
            icon={Database}
          />
          <Pillar
            n="02"
            t="The schedule"
            d="A simple list of recurring jobs: morning brief, weekly status, monthly review. Each one written down. Each one runs on time."
            icon={Workflow}
          />
          <Pillar
            n="03"
            t="The AI teammates"
            d="Chief of Staff, Coach, Strategy Analyst, Risk Watcher. They read your files, write the briefs, surface the risks."
            icon={Bot}
          />
        </div>
      </div>
    </section>
  );
}

function Pillar({
  n,
  t,
  d,
  icon: Icon,
}: {
  n: string;
  t: string;
  d: string;
  icon: React.ElementType;
}) {
  return (
    <div className="ent-card ent-card-hover p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent-bg-subtle border border-accent-bg flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <span className="font-display text-2xl text-text-tertiary leading-none">{n}</span>
      </div>
      <h3 className="ent-display-3">{t}</h3>
      <p className="text-[15px] text-text-secondary mt-2 font-body-serif leading-relaxed">{d}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   YOUR FILES — deep dive
   ────────────────────────────────────────────────────────────── */
function SubstrateDeep() {
  return (
    <Section id="files">
      <SectionHeader
        eyebrow="Your files"
        title={
          <>
            Your strategy as a folder.{" "}
            <em className="text-accent">Yours forever.</em>
          </>
        }
        kicker={
          <>
            Cabinet keeps your strategy as a folder of plain text files,
            connected by simple links, like a private wiki. The AI teammates
            read the same files you do.
          </>
        }
      />

      <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
        <div className="ent-card overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-bg-warm">
            <Folder className="w-3.5 h-3.5 text-text-tertiary" />
            <span className="text-[11px] font-code text-text-secondary">
              global-strategy/strategy/narrative.md
            </span>
          </div>
          <div className="p-6 font-code text-[12.5px] leading-relaxed text-text-secondary">
            <p className="text-text-primary"># Q2 2026: Narrative</p>
            <p className="mt-2 text-text-tertiary"># Owners: [[org/sarah-kim]] · [[org/marcus-ren]]</p>
            <p className="mt-2"># Source for: <span className="text-accent">[[mbr/2026-05]]</span></p>
            <p className="mt-3">## North star</p>
            <p className="mt-1">Become the substrate every Fortune-class</p>
            <p>company runs strategy execution on.</p>
            <p className="mt-3">## Commitments</p>
            <p>- <span className="text-accent">[[okrs/emea]]</span> · slipping ⚠</p>
            <p>- <span className="text-accent">[[okrs/product-velocity]]</span> · on track</p>
            <p>- <span className="text-accent">[[okrs/cost-of-rollout]]</span> · ahead</p>
            <p className="mt-3">## Decisions log</p>
            <p>- 2026-05-12 · pricing extension <span className="text-accent">[[decisions/2026-05-12]]</span></p>
            <p>- 2026-05-04 · hiring freeze partial <span className="text-accent">[[decisions/2026-05-04]]</span></p>
          </div>
        </div>

        <div className="space-y-5">
          <FeatureRow
            icon={GitBranch}
            t="Versioned by git"
            d="Every change is a commit. Roll back a quarter, branch off a separate strategy, or compare two versions of a roadmap side by side."
          />
          <FeatureRow
            icon={Database}
            t="No proprietary database"
            d="Cabinet stores nothing in a closed system. The same files open in Obsidian, Cursor, VS Code, or the Cabinet UI. Export is `cp -r`."
          />
          <FeatureRow
            icon={Network}
            t="Linked like a wiki"
            d="A one-on-one file mentions [[okrs/emea]]. The AI follows the link to find the relevant OKR. Knowledge builds up the way you write it."
          />
          <FeatureRow
            icon={Search}
            t="Searched by code, not embeddings"
            d="A real index, not a vector database. Reproducible, debuggable, no drift. The AI works on top of clean, structured retrieval."
          />
        </div>
      </div>
    </Section>
  );
}

function FeatureRow({
  icon: Icon,
  t,
  d,
}: {
  icon: React.ElementType;
  t: string;
  d: string;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-bg-card">
      <div className="w-10 h-10 rounded-lg bg-accent-bg-subtle border border-accent-bg flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <div>
        <p className="text-[15px] font-semibold text-text-primary">{t}</p>
        <p className="text-sm text-text-secondary mt-1 font-body-serif leading-relaxed">{d}</p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   AGENTS
   ────────────────────────────────────────────────────────────── */
function Agents() {
  const agents = [
    {
      icon: Brain,
      name: "Chief of Staff",
      role: "Runs the daily operation",
      pulse: true,
      jobs: ["Morning brief", "Weekly status", "Monthly review brief", "Risk surfacing"],
      desc: "Drafts the morning brief every weekday, the status every Friday, the monthly review brief on the first of the month. Reads your files, surfaces what is slipping, and drafts the follow-ups before you wake up.",
    },
    {
      icon: Users,
      name: "Leadership Coach",
      role: "Works alongside the manager",
      pulse: false,
      jobs: ["1:1 prep", "Feedback prep", "Kudos drafts", "Growth plan"],
      desc: "Sits in the one-on-one prep flow. Drafts kudos from real contributions. Helps frame the hard conversation before it happens. Never replaces the manager. Gives them what a great coach would give them.",
    },
    {
      icon: LayoutDashboard,
      name: "Strategy Analyst",
      role: "The numbers behind the deck",
      pulse: false,
      jobs: ["OKR progress diffs", "Twelve-month metric grid", "Trend analysis"],
      desc: "Compares OKR progress week by week. Builds the twelve-month metric grid for the monthly review. Calls out the movements that matter and ignores the noise that does not.",
    },
    {
      icon: Shield,
      name: "Risk Watcher",
      role: "Looking out for what slips",
      pulse: true,
      jobs: ["Falling-behind detection", "Missed commitments", "Broken dependencies"],
      desc: "Checks one-on-one logs, OKR progress, and dependencies every hour. Surfaces overdue follow-ups and unclear ownership before the next standing review.",
    },
  ];

  return (
    <Section tone="warm" id="agents">
      <SectionHeader
        eyebrow="The AI teammates"
        title={
          <>
            Four specialists.{" "}
            <em className="text-accent">All reading the same files you do.</em>
          </>
        }
        kicker={
          <>
            Each AI teammate has a single job, a clear permission scope, and
            access to a defined slice of your files. None of them sends your
            data to a general chatbot. Every action is grounded in files you
            can read yourself.
          </>
        }
      />

      <div className="grid lg:grid-cols-2 gap-5">
        {agents.map((a) => (
          <AgentCard key={a.name} {...a} />
        ))}
      </div>
    </Section>
  );
}

function AgentCard({
  icon: Icon,
  name,
  role,
  pulse,
  jobs,
  desc,
}: {
  icon: React.ElementType;
  name: string;
  role: string;
  pulse: boolean;
  jobs: string[];
  desc: string;
}) {
  return (
    <div className="ent-card ent-card-hover p-7">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-accent-bg-subtle border border-accent-bg flex items-center justify-center">
            <Icon className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="ent-display-3">{name}</h3>
            <p className="text-[13px] text-text-tertiary font-body-serif italic">{role}</p>
          </div>
        </div>
        <span className="relative flex h-2 w-2 mt-2">
          {pulse && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${pulse ? "bg-green-500" : "bg-text-muted"}`} />
        </span>
      </div>
      <p className="text-[15px] text-text-secondary font-body-serif leading-relaxed">{desc}</p>
      <div className="flex flex-wrap gap-1.5 mt-5">
        {jobs.map((j) => (
          <span key={j} className="text-[11px] text-accent bg-accent-bg-subtle border border-accent-bg px-2 py-0.5 rounded">
            {j}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   THE SCHEDULE
   ────────────────────────────────────────────────────────────── */
function Cadence() {
  return (
    <Section id="schedule">
      <SectionHeader
        eyebrow="The schedule"
        title={
          <>
            Every recurring task is{" "}
            <em className="text-accent">a job written down</em>.
          </>
        }
        kicker={
          <>
            Each scheduled task (morning brief, weekly status, monthly review
            brief) is a short, readable file. When it runs, what it reads,
            and what it writes. You can read it, change it, or version it like
            any other code.
          </>
        }
      />

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
        <div className="ent-card overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-bg-warm">
            <FileText className="w-3.5 h-3.5 text-text-tertiary" />
            <span className="text-[11px] font-code text-text-secondary">
              .jobs/morning-brief.yaml
            </span>
            <span className="ml-auto text-[10px] font-code text-green-warm bg-green-bg-subtle px-2 py-0.5 rounded border border-green-bg">
              live
            </span>
          </div>
          <pre className="p-6 text-[12.5px] font-code text-text-secondary leading-relaxed overflow-x-auto">
{`# Daily 06:00 → today/index.md
cron: "0 6 * * 1-5"
agent: chief-of-staff
sources:
  - okrs/
  - 1on1s/
  - decisions/
  - mbr/
scope: read-only
output: today/index.md

prompt: |
  Read the OKR pages and 1:1 logs.
  Identify the top 3 actions for today.
  Surface any dropped commitments (1:1
  promises past their due date).
  Draft replies to anything pending.

  Write the brief as the executive's
  Chief of Staff would, grounded in
  the actual files. Cite sources.`}
          </pre>
        </div>

        <div className="space-y-4">
          <CadenceRow t="Every weekday · 06:00" e="Morning brief" d="Today's top 3, missed commitments, drafted replies, ready before you open your laptop." />
          <CadenceRow t="Every Friday · 16:00" e="Weekly status + kudos" d="What moved this week, what is at risk, who deserves a callout." />
          <CadenceRow t="1st of the month · 07:00" e="Monthly review brief" d="Twelve-month metric grid, scorecard, three things to discuss." />
          <CadenceRow t="Quarter -1" e="OKR cycle" d="Drafting → reviewed → aligned → in progress → done." />
          <CadenceRow t="Every hour, in the background" e="Risk check" d="Looks for things falling behind, missed commitments, and unclear ownership." />
        </div>
      </div>
    </Section>
  );
}

function CadenceRow({
  t,
  e,
  d,
}: {
  t: string;
  e: string;
  d: string;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-bg-card">
      <Clock className="w-4 h-4 text-accent shrink-0 mt-1" />
      <div>
        <p className="text-[11px] text-text-tertiary font-code">{t}</p>
        <p className="text-[15px] font-semibold text-text-primary">{e}</p>
        <p className="text-sm text-text-secondary mt-0.5 font-body-serif">{d}</p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   INTEGRATIONS
   ────────────────────────────────────────────────────────────── */
function Integrations() {
  const groups = [
    {
      title: "Communication",
      items: [
        { name: "Slack", desc: "Brief in DM" },
        { name: "Microsoft Teams", desc: "Native channel agent" },
        { name: "Email", desc: "Reply drafts queued" },
      ],
    },
    {
      title: "Work",
      items: [
        { name: "Linear", desc: "OKR → issue mapping" },
        { name: "Jira", desc: "Sprint roll-up" },
        { name: "GitHub", desc: "PR-aware status" },
        { name: "Notion", desc: "Two-way page sync" },
      ],
    },
    {
      title: "Data",
      items: [
        { name: "Snowflake", desc: "Live metrics in the brief" },
        { name: "BigQuery", desc: "Bowler chart source" },
        { name: "Postgres", desc: "Read replica" },
      ],
    },
    {
      title: "AI providers",
      items: [
        { name: "Anthropic", desc: "Your API key" },
        { name: "OpenAI", desc: "Your API key" },
        { name: "AWS Bedrock", desc: "Your AWS account" },
        { name: "Azure OpenAI", desc: "Enterprise tenant" },
      ],
    },
  ];

  return (
    <Section tone="warm">
      <SectionHeader
        eyebrow="Integrations"
        title={
          <>
            Cabinet lives{" "}
            <em className="text-accent">where work already happens</em>.
          </>
        }
        kicker={
          <>
            We don't ask your team to log into another tool. The AI teammates
            post into Slack and Teams, pull from Linear and Jira, query
            Snowflake, and write back to your files, all running on your own
            AI provider keys.
          </>
        }
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {groups.map((g) => (
          <div key={g.title} className="ent-card p-5">
            <Eyebrow muted>{g.title}</Eyebrow>
            <div className="mt-3 space-y-2.5">
              {g.items.map((it) => (
                <div key={it.name} className="flex items-start gap-2.5 py-1.5">
                  <div className="w-7 h-7 rounded-md bg-bg-warm border border-border flex items-center justify-center text-xs font-semibold text-text-primary shrink-0">
                    {it.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{it.name}</p>
                    <p className="text-[11px] text-text-tertiary">{it.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ──────────────────────────────────────────────────────────────
   MCP
   ────────────────────────────────────────────────────────────── */
function McpSection() {
  return (
    <Section>
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
        <div>
          <Eyebrow>Open API for AI tools</Eyebrow>
          <h2 className="ent-display-2 mt-3">
            Plug in your own AI tools.{" "}
            <em className="text-accent">No lock-in.</em>
          </h2>
          <p className="ent-lead mt-5 max-w-xl">
            Cabinet exposes its data through MCP, an open standard. Your own
            AI tools (Claude Code, Cursor, anything that speaks MCP) can read
            your strategy files and add to them. Cabinet becomes the layer
            underneath, not the only window in.
          </p>
          <div className="mt-7">
            <CheckList items={[
              "Open standard: no Cabinet-only SDK to learn",
              "Permissions per tool: read-only by default",
              "Every request and every change is logged",
              "Works with Claude Code, Cursor, Cline, and your own scripts",
            ]} />
          </div>
        </div>

        <div className="ent-card p-6 overflow-hidden">
          <Eyebrow muted>How it connects</Eyebrow>
          <div className="mt-4 grid gap-3">
            <McpBlock label="Your AI tools" sub="Claude Code · Cursor · custom scripts" tone="accent" icon={Bot} />
            <McpArrow />
            <McpBlock label="Cabinet open API" sub="Scoped · audited · read-write" tone="warm" icon={Network} />
            <McpArrow />
            <McpBlock label="Your files" sub="strategy/ · okrs/ · org/ · decisions/" tone="sage" icon={Folder} />
          </div>
        </div>
      </div>
    </Section>
  );
}

function McpBlock({
  label,
  sub,
  tone,
  icon: Icon,
}: {
  label: string;
  sub: string;
  tone: "accent" | "warm" | "sage";
  icon: React.ElementType;
}) {
  const tones = {
    accent: "bg-accent-bg-subtle border-accent-bg",
    warm: "bg-bg-warm border-border",
    sage: "bg-green-bg-subtle border-green-bg",
  }[tone];
  return (
    <div className={`flex items-center gap-3 rounded-xl border ${tones} px-4 py-3`}>
      <div className="w-9 h-9 rounded-md bg-white/60 border border-border flex items-center justify-center">
        <Icon className="w-4 h-4 text-accent" />
      </div>
      <div>
        <p className="text-sm font-semibold text-text-primary">{label}</p>
        <p className="text-[11px] text-text-tertiary font-code">{sub}</p>
      </div>
    </div>
  );
}
function McpArrow() {
  return (
    <div className="flex justify-center text-text-tertiary">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 4v14M5 12l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
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
        <Pill icon={Sparkles}>Ready to see it on your data?</Pill>
        <h2 className="ent-display-2 mt-4 max-w-2xl mx-auto">
          Ninety minutes. Your strategy.{" "}
          <em className="text-accent">A live demo on your org.</em>
        </h2>
        <p className="ent-lead mt-5 max-w-2xl mx-auto">
          We set up Cabinet on your top three OKRs together, walk you through
          the morning brief, and leave you with a working folder you can use
          on Monday.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <PrimaryButton href="/enterprise/briefing">Request the briefing</PrimaryButton>
          <SecondaryButton href="/enterprise/solutions" icon={ArrowRight}>
            See solutions by role
          </SecondaryButton>
        </div>
      </div>
    </Section>
  );
}

export default function PlatformPage() {
  return (
    <>
      <Hero />
      <SubstrateDeep />
      <Agents />
      <Cadence />
      <Integrations />
      <McpSection />
      <FinalCta />
    </>
  );
}
