"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Building2,
  Check,
  ChevronRight,
  Clock,
  Copy,
  Cpu,
  Database,
  FileText,
  Folder,
  GitBranch,
  Globe,
  Layers,
  Lock,
  Network,
  Quote,
  Shield,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  CheckList,
  Eyebrow,
  FeatureCard,
  Pill,
  PrimaryButton,
  SecondaryButton,
  Section,
  SectionHeader,
  StatCard,
} from "@/components/enterprise/primitives";

/* ──────────────────────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden ent-wash">
      <div className="absolute inset-0 ent-dots opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-start">
          <div className="ent-rise">
            <Pill icon={Sparkles}>Now in Fortune-500 pilots · Q2 2026</Pill>

            <h1 className="ent-display-1 mt-6">
              Strategy that executes itself.
              <br />
              <em className="text-accent">At every level of the company.</em>
            </h1>

            <p className="mt-4 text-base md:text-lg font-semibold text-text-secondary tracking-tight">
              The AI platform for strategy execution &amp; OKRs.
            </p>

            <p className="ent-lead mt-5 max-w-xl">
              Cabinet's AI teammates draft the brief, run the OKR cycle, and
              prep every meeting, on a schedule that never slips. Every manager
              gets a Chief of Staff; every leader gets a coach. It all runs on
              your own infrastructure, yours to inspect, down to the last line
              of code.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryButton href="/enterprise/briefing">
                Request an executive briefing
              </PrimaryButton>
              <SecondaryButton href="/enterprise/platform" icon={Sparkles}>
                See how it works
              </SecondaryButton>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <MiniStat n="10 min" l="To first brief" />
              <MiniStat n="0%" l="Vendor lock-in" />
              <MiniStat n="100%" l="Yours to audit" />
            </div>
          </div>

          <HeroBriefCard />
        </div>

        {/* Built-by line */}
        <div className="mt-16 pt-8 border-t border-border flex flex-wrap items-center gap-x-8 gap-y-3">
          <Eyebrow muted>Built by</Eyebrow>
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-text-primary">Hila Shmuel</span>{" "}
            was previously Engineering Manager at Apple, AI &amp; Data
            Infrastructure. Designed the platforms that train the on-device AI
            models running on billions of iPhones, Macs, and iPads.{" "}
            <a
              href="/enterprise/about"
              className="text-accent hover:text-accent-warm font-medium underline decoration-accent/30 underline-offset-2"
            >
              Read her story →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p className="font-display text-2xl md:text-3xl text-text-primary leading-none">
        {n}
      </p>
      <p className="text-xs text-text-tertiary mt-1.5 uppercase tracking-widest font-medium">
        {l}
      </p>
    </div>
  );
}

function HeroBriefCard() {
  return (
    <div className="relative ent-rise">
      <div className="ent-glow" />
      <div className="relative ent-card overflow-hidden shadow-xl shadow-text-primary/[0.06]">
        {/* chrome */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-bg-warm">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-1.5 rounded-md bg-bg-card border border-border px-2.5 py-1 text-[11px] font-code text-text-tertiary">
              <Lock className="w-3 h-3 text-green-warm" />
              cabinet · global-strategy · daily-brief
            </div>
          </div>
          <span className="text-[10px] text-text-tertiary font-medium">Mon 06:00</span>
        </div>

        <div className="px-6 py-6">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-md bg-accent-bg flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-accent uppercase tracking-wider">
                Chief of Staff · agent
              </p>
              <p className="text-[10px] text-text-tertiary font-code">
                Drafted 12 minutes ago · grounded in 14 sources
              </p>
            </div>
          </div>

          <h3 className="font-display text-2xl md:text-3xl text-text-primary leading-snug">
            Good morning, Sarah.
          </h3>
          <p className="text-[14px] text-text-secondary mt-2 font-body-serif leading-relaxed">
            Three things moved over the weekend. Two need your attention this morning.
          </p>

          <div className="space-y-2.5 mt-5">
            <BriefRow
              tone="risk"
              tag="OKR · slipping"
              title="EMEA expansion KR · 88% of target (Δ −12pts)"
              detail="Mercedes pilot delayed. Jürgen requests Tuesday call"
            />
            <BriefRow
              tone="win"
              tag="Movement · positive"
              title="Q2 revenue tracking +4pts above plan"
              detail="Pricing change in March is the variable"
            />
            <BriefRow
              tone="action"
              tag="Drafted · awaiting you"
              title="2 follow-up replies ready to send"
              detail="Reply drafts saved to /1on1s/marcus.md"
            />
          </div>

          <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-[11px] text-text-tertiary">
              Next: <span className="text-text-secondary">MBR pre-read auto-drafts Wed</span>
            </span>
            <button className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:text-accent-warm transition-colors">
              Open <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BriefRow({
  tone,
  tag,
  title,
  detail,
}: {
  tone: "risk" | "win" | "action";
  tag: string;
  title: string;
  detail: string;
}) {
  const map = {
    risk: { bg: "bg-red-50/70", text: "text-red-700", dot: "bg-red-400" },
    win: { bg: "bg-green-bg-subtle", text: "text-green-warm", dot: "bg-green-light" },
    action: { bg: "bg-accent-bg-subtle", text: "text-accent", dot: "bg-accent" },
  }[tone];
  return (
    <div className={`flex gap-3 rounded-lg border border-border ${map.bg} px-3.5 py-2.5`}>
      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${map.dot}`} />
      <div className="flex-1 min-w-0">
        <p className={`text-[10px] font-semibold uppercase tracking-wider ${map.text}`}>
          {tag}
        </p>
        <p className="text-[13px] text-text-primary font-medium mt-0.5 leading-snug">
          {title}
        </p>
        <p className="text-[11px] font-code text-text-tertiary mt-0.5 truncate">
          {detail}
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   PROBLEM
   ────────────────────────────────────────────────────────────── */
function Problem() {
  return (
    <Section>
      <SectionHeader
        eyebrow="The problem"
        title={
          <>
            70% of company strategies{" "}
            <em className="text-accent">fail in execution.</em>
          </>
        }
        kicker={
          <>
            Not because the strategy is wrong, but because nobody knows it.
            Strategy lives in slides. The work lives in fourteen separate
            tools. The gap between them is where most enterprises stall.
          </>
        }
      />

      <div className="grid md:grid-cols-3 gap-5">
        <StatCard
          stat="40%"
          label="of employees can't name their company's top 3 priorities"
        />
        <StatCard
          stat="2%"
          label="of leaders have access to a Chief of Staff; the other 98% fly blind"
        />
        <StatCard
          stat="23"
          label="meetings per week the average S&P 500 manager attends, and still misses the goal"
        />
      </div>

      <div className="mt-12 ent-card p-8 md:p-10">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 md:gap-10">
          <div>
            <Eyebrow>Today's only solution</Eyebrow>
            <h3 className="ent-display-3 mt-3">
              One Chief of Staff per CEO. One coach per SVP.
            </h3>
          </div>
          <div className="text-[15px] text-text-secondary font-body-serif leading-relaxed">
            <p>
              The CEO has a Chief of Staff. The SVP has a coach. Everyone else?{" "}
              <span className="text-accent font-semibold">No one.</span>
            </p>
            <p className="mt-3">
              Cabinet gives every manager a Chief of Staff and every leader a
              coach, running on files the company already owns, not a SaaS
              contract it has to renew.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ──────────────────────────────────────────────────────────────
   HOW IT WORKS — strategy as files
   ────────────────────────────────────────────────────────────── */
function Substrate() {
  return (
    <Section tone="warm" id="substrate">
      <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-center">
        <div>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="ent-display-2 mt-3">
            Your strategy is a{" "}
            <em className="text-accent">folder</em>, not a SaaS contract.
          </h2>
          <p className="ent-lead mt-5 max-w-xl">
            Workboard locks your strategy inside a closed database under a SaaS
            contract. Cabinet stores it the other way around: your OKRs, org
            chart, decisions, one-on-ones and meetings live as roughly 200
            plain text files in a folder you control. Version-controlled by
            git. Hosted wherever you choose.
          </p>

          <div className="mt-7 space-y-2.5">
            <SubLine icon={Database} t="Everything in one place" d="OKRs, org chart, decisions, meetings: connected, kept up to date by the AI teammates." />
            <SubLine icon={GitBranch} t="Versioned by git" d="Every change is a commit. Roll back a quarter, branch a strategy, diff a roadmap." />
            <SubLine icon={Cpu} t="Humans and AI read the same files" d="Plain markdown. No proprietary index. Nothing hidden from you." />
            <SubLine icon={Lock} t="Your cloud or ours" d="Run on each manager's laptop, in your VPC, or on Cabinet Cloud. Your choice." />
          </div>
        </div>

        <SubstrateVisual />
      </div>
    </Section>
  );
}

function SubLine({
  icon: Icon,
  t,
  d,
}: {
  icon: React.ElementType;
  t: string;
  d: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-bg-card transition-colors">
      <div className="w-9 h-9 rounded-lg bg-bg-card border border-border flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-accent" />
      </div>
      <div>
        <p className="text-[15px] font-semibold text-text-primary">{t}</p>
        <p className="text-sm text-text-secondary mt-0.5 font-body-serif">{d}</p>
      </div>
    </div>
  );
}

function SubstrateVisual() {
  return (
    <div className="relative">
      <div className="ent-glow" />
      <div className="relative ent-card overflow-hidden shadow-xl shadow-text-primary/[0.05]">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-bg-warm">
          <Folder className="w-3.5 h-3.5 text-text-tertiary" />
          <span className="text-[11px] font-code text-text-secondary">
            ~/strategy/global-strategy
          </span>
          <span className="ml-auto text-[10px] font-code text-text-muted">
            217 files · 12 agents · main ↑
          </span>
        </div>

        <div className="grid grid-cols-[170px_1fr] min-h-[400px]">
          {/* tree */}
          <div className="border-r border-border bg-bg p-3 text-[11px] font-code space-y-0.5">
            <Tree>strategy/</Tree>
            <Tree i={1}>vision.md</Tree>
            <Tree i={1} active>narrative.md</Tree>
            <Tree>okrs/</Tree>
            <Tree i={1}>company.md</Tree>
            <Tree i={1}>emea.md</Tree>
            <Tree>org/</Tree>
            <Tree i={1}>chart.md</Tree>
            <Tree i={1}>1on1s/</Tree>
            <Tree>decisions/</Tree>
            <Tree i={1}>2026-q2.md</Tree>
            <Tree>mbr/</Tree>
            <Tree i={1}>2026-05.md</Tree>
            <Tree>.agents/</Tree>
            <Tree i={1}>cos/</Tree>
            <Tree>.jobs/</Tree>
            <Tree i={1}>morning.yaml</Tree>
          </div>

          {/* graph */}
          <div className="relative p-6 bg-bg-card">
            <svg viewBox="0 0 360 360" className="w-full h-full">
              <g stroke="#D4C4B0" strokeWidth="1" fill="none" opacity="0.7">
                <path d="M180,40 Q180,80 100,130" />
                <path d="M180,40 Q180,80 180,130" />
                <path d="M180,40 Q180,80 260,130" />
                <path d="M100,130 Q100,170 60,220" />
                <path d="M100,130 Q100,170 140,220" />
                <path d="M180,130 Q180,170 210,220" />
                <path d="M260,130 Q260,170 290,220" />
                <path d="M60,220 Q70,270 90,320" />
                <path d="M140,220 Q160,270 180,320" />
                <path d="M210,220 Q230,270 240,320" />
                <path d="M290,220 Q290,270 310,320" />
              </g>
              <Node x={180} y={40} label="strategy" major />
              <Node x={100} y={130} label="okrs" />
              <Node x={180} y={130} label="org" />
              <Node x={260} y={130} label="initiatives" />
              <Node x={60} y={220} label="emea KR" small />
              <Node x={140} y={220} label="product KR" small />
              <Node x={210} y={220} label="manager · m" small />
              <Node x={290} y={220} label="α" small />
              <Node x={90} y={320} label="1on1" tiny />
              <Node x={180} y={320} label="decision" tiny />
              <Node x={240} y={320} label="kudos" tiny />
              <Node x={310} y={320} label="meeting" tiny />
            </svg>

            <div className="absolute bottom-3 left-4 right-4 rounded-md border border-border bg-bg/95 backdrop-blur p-3">
              <p className="text-[10px] font-semibold text-accent uppercase tracking-widest mb-1">
                What the AI teammates see
              </p>
              <p className="text-[12px] text-text-secondary leading-relaxed">
                A wiki of plain text files, linked together. The AI reads the
                same files you do: nothing hidden, nothing in a vector
                database, nothing to migrate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tree({
  children,
  i = 0,
  active = false,
}: {
  children: React.ReactNode;
  i?: number;
  active?: boolean;
}) {
  const isFolder = typeof children === "string" && children.endsWith("/");
  return (
    <div
      className={`flex items-center gap-1.5 py-0.5 pr-2 rounded ${
        active ? "bg-accent-bg text-accent border-l-2 border-accent pl-2" : "pl-3 border-l-2 border-transparent"
      }`}
      style={{ marginLeft: `${i * 10}px` }}
    >
      {isFolder ? (
        <Folder className="w-3 h-3 text-text-tertiary" />
      ) : (
        <FileText className={`w-3 h-3 ${active ? "text-accent" : "text-text-tertiary"}`} />
      )}
      <span className={`${active ? "font-medium" : "text-text-secondary"}`}>
        {children}
      </span>
    </div>
  );
}

function Node({
  x,
  y,
  label,
  major,
  small,
  tiny,
}: {
  x: number;
  y: number;
  label: string;
  major?: boolean;
  small?: boolean;
  tiny?: boolean;
}) {
  const r = major ? 22 : small ? 13 : tiny ? 8 : 17;
  const fill = major ? "#8B5E3C" : small ? "#A0714D" : tiny ? "#C5B3A0" : "#B98B61";
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} />
      <text
        x={x}
        y={y + r + 13}
        textAnchor="middle"
        fontSize={major ? 11 : small ? 9 : tiny ? 8 : 10}
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight={major ? 600 : 500}
        fill={tiny ? "#8B7A6B" : "#5C4A3E"}
      >
        {label}
      </text>
    </g>
  );
}

/* ──────────────────────────────────────────────────────────────
   LIVE BRIEF DEMO — tabbed dashboard
   ────────────────────────────────────────────────────────────── */
function LiveBriefSection() {
  return (
    <Section id="brief">
      <SectionHeader
        align="center"
        eyebrow="A live look"
        title={
          <>
            Walk into Monday with{" "}
            <em className="text-accent">the brief already written.</em>
          </>
        }
        kicker={
          <>
            By 06:00 every weekday, Cabinet's AI teammates have read the
            weekend: surfaced the risks, drafted the replies, queued the
            meetings. You read the brief over coffee. The work is already done.
          </>
        }
      />
      <LiveBriefDemo />
    </Section>
  );
}

function LiveBriefDemo() {
  const [tab, setTab] = useState<"brief" | "okrs" | "mbr" | "risks">("brief");
  const tabs = [
    { id: "brief" as const, label: "Daily brief", icon: Briefcase, cadence: "Every weekday 06:00" },
    { id: "okrs" as const, label: "OKR tree", icon: Target, cadence: "Always live" },
    { id: "mbr" as const, label: "Monthly review", icon: FileText, cadence: "First of the month" },
    { id: "risks" as const, label: "Risk list", icon: Shield, cadence: "Checked hourly" },
  ];
  return (
    <div className="ent-card overflow-hidden shadow-xl shadow-text-primary/[0.05]">
      {/* chrome */}
      <div className="flex items-center gap-3 px-5 py-2.5 border-b border-border bg-bg-warm">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-[11px] text-text-tertiary font-code">
            cabinet / global-strategy / executive-room
          </span>
        </div>
        <span className="text-[10px] text-text-tertiary inline-flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
          </span>
          12 AI teammates active
        </span>
      </div>

      {/* tabs */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-bg">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                active
                  ? "bg-bg-card text-text-primary border border-border shadow-sm"
                  : "text-text-tertiary hover:text-text-primary"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${active ? "text-accent" : ""}`} />
              {t.label}
              <span
                className={`hidden md:inline text-[10px] uppercase tracking-wider font-semibold ${
                  active ? "text-text-tertiary" : "text-text-muted"
                }`}
              >
                {t.cadence}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] min-h-[500px]">
        {/* sidebar */}
        <div className="border-r border-border bg-bg p-4">
          <p className="ent-eyebrow-muted mb-2">AI teammates</p>
          <div className="space-y-1 mb-5">
            <Agent name="Chief of Staff" status="running" task="Drafting next monthly review" />
            <Agent name="Strategy Analyst" status="running" task="Checking OKR progress" />
            <Agent name="Risk Watcher" status="running" task="Scanning 14 initiatives" />
            <Agent name="Coach" status="idle" task="Runs Friday 16:00" />
            <Agent name="Comms" status="idle" task="Waits for your approval" />
          </div>
          <p className="ent-eyebrow-muted mb-2">Schedule</p>
          <div className="space-y-0.5 mb-5 text-[12px]">
            <Cad t="06:00 daily" e="Morning brief" />
            <Cad t="Mon 09:00" e="OKR refresh" />
            <Cad t="Fri 16:00" e="Weekly status + kudos" />
            <Cad t="1st of month" e="Monthly review brief" />
            <Cad t="Quarterly" e="OKR cycle" />
          </div>
          <p className="ent-eyebrow-muted mb-2">Reads from</p>
          <div className="space-y-0.5 text-[12px]">
            <Src icon={Folder} l="strategy/q2-plan.md" />
            <Src icon={Folder} l="okrs/" b="142" />
            <Src icon={Folder} l="1on1s/" b="38" />
            <Src icon={Database} l="snowflake.live" />
            <Src icon={GitBranch} l="github · 4 repos" />
          </div>
        </div>

        <div className="p-7 bg-bg-card">
          {tab === "brief" && <PanelBrief />}
          {tab === "okrs" && <PanelOkr />}
          {tab === "mbr" && <PanelMbr />}
          {tab === "risks" && <PanelRisk />}
        </div>
      </div>
    </div>
  );
}

function Agent({ name, status, task }: { name: string; status: "running" | "idle"; task: string }) {
  return (
    <div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-bg-warm">
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        {status === "running" && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${status === "running" ? "bg-green-500" : "bg-text-muted"}`} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-text-primary truncate">{name}</p>
        <p className="text-[10px] text-text-tertiary truncate">{task}</p>
      </div>
    </div>
  );
}
function Cad({ t, e }: { t: string; e: string }) {
  return (
    <div className="flex items-center justify-between py-1 px-2 rounded hover:bg-bg-warm">
      <span className="text-text-tertiary font-code">{t}</span>
      <span className="text-text-secondary">{e}</span>
    </div>
  );
}
function Src({ icon: Icon, l, b }: { icon: React.ElementType; l: string; b?: string }) {
  return (
    <div className="flex items-center gap-1.5 py-1 px-2 rounded hover:bg-bg-warm">
      <Icon className="w-3 h-3 text-text-tertiary shrink-0" />
      <span className="flex-1 truncate font-code text-text-secondary">{l}</span>
      {b && <span className="text-[9px] text-accent bg-accent-bg px-1 rounded">{b}</span>}
    </div>
  );
}

function PanelBrief() {
  return (
    <div>
      <Pill>Monday · 06:00 · grounded in 142 OKRs, 38 1:1s, 14 initiatives</Pill>
      <h3 className="font-display text-3xl text-text-primary mt-3">Good morning, Sarah.</h3>
      <p className="text-[15px] text-text-secondary mt-2 font-body-serif">
        Three things moved over the weekend. Two need your attention before 10am.
      </p>
      <div className="space-y-3 mt-6">
        <BigBrief tone="risk" tag="OKR · falling behind" title="EMEA expansion KR · 88% of target (12 points behind plan)" body="The Mercedes pilot timeline slipped Friday after a legal escalation. Jürgen (VP) requested a 30-minute call Tuesday." link="okrs/emea-expansion.md" />
        <BigBrief tone="win" tag="Good news" title="Q2 revenue 4 points above plan" body="The March pricing change is the driver. Marcus drafted a one-pager, flagged for your review." link="board/may-prep.md" />
        <BigBrief tone="action" tag="Drafted · awaiting your OK" title="2 replies ready to send" body="Marcus one-on-one follow-up (a commitment from 3 weeks ago, now overdue). Mercedes apology and reschedule." link="1on1s/marcus.md" />
        <BigBrief tone="info" tag="In progress" title="May review brief drafts Wednesday 07:00" body="Twelve-month metric grid, scorecard, and discussion topics will be ready before your Wednesday prep block." link="mbr/2026-05.md" />
      </div>
    </div>
  );
}
function BigBrief({ tone, tag, title, body, link }: { tone: "risk" | "win" | "action" | "info"; tag: string; title: string; body: string; link: string }) {
  const tones = {
    risk: { bar: "bg-red-400", text: "text-red-700", bg: "bg-red-50/60" },
    win: { bar: "bg-green-light", text: "text-green-warm", bg: "bg-green-bg-subtle" },
    action: { bar: "bg-accent", text: "text-accent", bg: "bg-accent-bg-subtle" },
    info: { bar: "bg-blue-400", text: "text-blue-700", bg: "bg-blue-50/60" },
  }[tone];
  return (
    <div className={`relative flex gap-4 p-4 rounded-xl border border-border ${tones.bg}`}>
      <span className={`absolute top-3 bottom-3 left-0 w-0.5 rounded-r ${tones.bar}`} />
      <div className="flex-1 min-w-0">
        <p className={`text-[10px] font-semibold uppercase tracking-widest ${tones.text}`}>{tag}</p>
        <h4 className="text-[15px] font-semibold text-text-primary mt-0.5 leading-snug">{title}</h4>
        <p className="text-sm text-text-secondary mt-1 font-body-serif leading-relaxed">{body}</p>
        <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-code text-text-tertiary">
          <FileText className="w-3 h-3" /> {link}
        </p>
      </div>
    </div>
  );
}

function PanelOkr() {
  const rows = [
    { name: "Reach $1.2B ARR in EMEA", own: "CRO", pct: 88, st: "risk", lv: 0 },
    { name: "Launch in 3 enterprise markets", own: "VP Sales EMEA", pct: 67, st: "risk", lv: 1 },
    { name: "30 design partners signed", own: "Field Engineering", pct: 92, st: "ok", lv: 1 },
    { name: "Cut monthly review prep from 14h to 3h", own: "Chief of Staff", pct: 100, st: "win", lv: 0 },
    { name: "Auto-draft the monthly metric grid", own: "Strategy AI", pct: 100, st: "win", lv: 1 },
    { name: "98% on-time review attendance", own: "BU Heads", pct: 71, st: "ok", lv: 1 },
    { name: "Roll out Cabinet to all managers", own: "CHRO", pct: 54, st: "ok", lv: 0 },
  ];
  return (
    <div>
      <div className="flex items-start justify-between mb-5">
        <div>
          <Pill>Live · all OKRs across 12 BUs</Pill>
          <h3 className="font-display text-2xl text-text-primary mt-2">Q2 2026 OKR tree</h3>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <Legend dot="bg-green-500" l="47 on track" />
          <Legend dot="bg-red-400" l="6 at risk" />
          <Legend dot="bg-text-muted" l="2 dropped" />
        </div>
      </div>
      <div className="space-y-1.5">
        {rows.map((o, i) => (
          <div key={i}
            className="grid grid-cols-[24px_1fr_140px_90px_28px] gap-3 items-center py-2.5 px-3 rounded-lg hover:bg-bg-warm border border-transparent hover:border-border transition-colors"
            style={{ paddingLeft: `${12 + o.lv * 20}px` }}
          >
            <span>{o.lv === 0 ? <Target className="w-4 h-4 text-accent" /> : <ChevronRight className="w-3.5 h-3.5 text-text-tertiary" />}</span>
            <span className="text-sm text-text-primary truncate">{o.name}</span>
            <span className="text-[12px] text-text-tertiary truncate font-code">{o.own}</span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-border-light overflow-hidden">
                <div className={`h-full rounded-full ${o.st === "risk" ? "bg-red-400" : o.st === "win" ? "bg-accent" : "bg-green-light"}`} style={{ width: `${o.pct}%` }} />
              </div>
              <span className="text-[10px] text-text-tertiary w-7 text-right font-code">{o.pct}%</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-text-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
function Legend({ dot, l }: { dot: string; l: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-text-secondary">
      <span className={`w-2 h-2 rounded-full ${dot}`} /> {l}
    </span>
  );
}

function PanelMbr() {
  return (
    <div>
      <Pill>Auto-drafted Wednesday 07:00 · ready for review</Pill>
      <h3 className="font-display text-2xl text-text-primary mt-2 mb-1">May monthly review: brief</h3>
      <p className="text-xs text-text-tertiary font-code mb-5">Drafted by Strategy AI · 1,420 words · 4 sources · 6 charts</p>
      <div className="space-y-4 font-body-serif text-[15px] leading-relaxed text-text-primary max-w-3xl">
        <p>
          <strong>The short version.</strong> May closed with revenue 4 points above plan and 91% attendance at the executive standing review, a record. The one material risk this month is{" "}
          <span className="text-accent font-semibold">EMEA expansion</span>: the Mercedes pilot shifted right by 6 weeks because of legal review.
        </p>
        <h4 className="font-display text-lg mt-5 mb-2">Twelve-month metric grid</h4>
        <div className="grid grid-cols-12 gap-1">
          {Array.from({ length: 12 }).map((_, i) => {
            const isRed = i === 7;
            const isAmber = i === 4 || i === 9;
            return (
              <div key={i} className={`h-9 rounded ${isRed ? "bg-red-100 border border-red-300" : isAmber ? "bg-amber-100 border border-amber-300" : "bg-green-100 border border-green-300"} flex items-center justify-center text-[10px] font-code text-text-secondary`}>
                {["J","F","M","A","M","J","J","A","S","O","N","D"][i]}
              </div>
            );
          })}
        </div>
        <h4 className="font-display text-lg mt-5 mb-2">Three things to discuss</h4>
        <ol className="list-decimal pl-5 space-y-1.5 text-text-secondary">
          <li>EMEA legal escalation: who owns the path forward?</li>
          <li>Pricing change: hold through Q3 or revert?</li>
          <li>Hiring: are we lifting the freeze, and where?</li>
        </ol>
      </div>
    </div>
  );
}

function PanelRisk() {
  const risks = [
    { t: "Mercedes EMEA pilot: timeline slipped", s: "high", o: "Jürgen K.", f: "12 hours ago", src: "1on1s/jurgen.md" },
    { t: "Hiring freeze conflicts with Q3 plan", s: "high", o: "CHRO", f: "2 days ago", src: "/strategy/headcount.md" },
    { t: "Promised follow-up missed for 3 weeks", s: "med", o: "Sarah / Marcus", f: "found automatically", src: "/1on1s/marcus.md" },
    { t: "4 OKRs have no clear owner", s: "med", o: "Unassigned", f: "this week", src: "/okrs/" },
    { t: "August metric projection looks weak", s: "low", o: "FP&A", f: "flagged by Strategy AI", src: "/mbr/2026-05.md" },
  ];
  return (
    <div>
      <Pill>Checked every hour · things slipping, missed, or unclear</Pill>
      <h3 className="font-display text-2xl text-text-primary mt-2 mb-5">Live risk list</h3>
      <div className="space-y-2">
        {risks.map((r, i) => (
          <div key={i} className="grid grid-cols-[70px_1fr_150px_110px] gap-3 items-center px-3 py-2.5 rounded-lg border border-border bg-bg-warm/40 hover:bg-bg-warm transition-colors">
            <span className={`text-[10px] uppercase tracking-widest text-center px-2 py-0.5 rounded font-semibold ${
              r.s === "high" ? "bg-red-50 text-red-700 border border-red-200"
              : r.s === "med" ? "bg-amber-50 text-amber-800 border border-amber-200"
              : "bg-bg text-text-tertiary border border-border"
            }`}>{r.s}</span>
            <div className="min-w-0">
              <p className="text-sm text-text-primary truncate">{r.t}</p>
              <p className="text-[10px] text-text-tertiary truncate font-code">{r.src}</p>
            </div>
            <span className="text-[12px] text-text-secondary truncate">{r.o}</span>
            <span className="text-[11px] text-text-tertiary truncate font-code">{r.f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   VERSUS
   ────────────────────────────────────────────────────────────── */
function Versus() {
  const rows: { feature: string; cabinet: string | true; wb: string | true | false; viva: string | false; manual: string | true | false }[] = [
    { feature: "Your data stays in a folder you own", cabinet: true, wb: false, viva: false, manual: true },
    { feature: "Open source: you can read the code", cabinet: true, wb: false, viva: false, manual: false },
    { feature: "Run on your servers (or fully offline)", cabinet: true, wb: false, viva: false, manual: false },
    { feature: "Uses your own AI keys", cabinet: true, wb: "Limited", viva: false, manual: false },
    { feature: "Time to first AI-drafted document", cabinet: "10 min", wb: "3–6 months", viva: false, manual: false },
    { feature: "Chief of Staff for every manager", cabinet: true, wb: true, viva: false, manual: false },
    { feature: "Leadership coach for every leader", cabinet: true, wb: true, viva: false, manual: false },
    { feature: "OKRs · scorecards · monthly review brief", cabinet: true, wb: true, viva: "Sunset", manual: false },
    { feature: "Works inside Slack, Teams, Linear, etc.", cabinet: true, wb: "Some", viva: false, manual: false },
    { feature: "Ready-made templates · copy and use", cabinet: true, wb: false, viva: false, manual: false },
    { feature: "Open API for your other AI tools", cabinet: true, wb: "Proprietary", viva: false, manual: false },
    { feature: "Public per-seat pricing", cabinet: true, wb: false, viva: false, manual: false },
  ];

  function cell(v: string | true | false, hero: boolean) {
    if (v === true) return <Check className={`w-4 h-4 mx-auto ${hero ? "text-accent" : "text-text-secondary"}`} strokeWidth={3} />;
    if (v === false) return <X className="w-4 h-4 mx-auto text-text-muted" />;
    return <span className={`text-[12px] ${hero ? "text-accent font-semibold" : "text-text-tertiary"}`}>{v}</span>;
  }

  return (
    <Section tone="warm" id="versus">
      <SectionHeader
        align="center"
        eyebrow="How Cabinet compares"
        title={
          <>
            Same platform.{" "}
            <span className="text-accent">Without the six-figure contract.</span>
          </>
        }
        kicker={
          <>
            Workboard sells the dashboards. Microsoft retired Viva Goals at the
            end of 2024. The rest of the market sells slides. Cabinet sells you
            the files underneath all of them.
          </>
        }
      />

      <div className="ent-card overflow-hidden">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="px-5 py-4 border-b border-border">
            <Eyebrow muted>What you need</Eyebrow>
          </div>
          <ColHead title="Cabinet" sub="Open · file-based" hero />
          <ColHead title="Workboard" sub="Closed database" />
          <ColHead title="Viva Goals" sub="Retired Dec '24" warn />
          <ColHead title="PowerPoint + Slack" sub="Today's default" />
        </div>

        {rows.map((r, i) => (
          <div
            key={r.feature}
            className={`grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] border-t border-border ${i % 2 === 1 ? "bg-bg-warm/40" : ""}`}
          >
            <div className="px-5 py-3.5 text-[14px] text-text-primary">{r.feature}</div>
            <div className="px-5 py-3.5 text-center bg-accent-bg-subtle/40 border-l border-border">{cell(r.cabinet, true)}</div>
            <div className="px-5 py-3.5 text-center border-l border-border">{cell(r.wb, false)}</div>
            <div className="px-5 py-3.5 text-center border-l border-border">{cell(r.viva, false)}</div>
            <div className="px-5 py-3.5 text-center border-l border-border">{cell(r.manual, false)}</div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs text-text-tertiary text-center">
        Comparison based on publicly disclosed capabilities · workboard.com (May 2026) · Viva Goals deprecation notice (Dec 2024).
      </p>
    </Section>
  );
}

function ColHead({
  title,
  sub,
  hero,
  warn,
}: {
  title: string;
  sub: string;
  hero?: boolean;
  warn?: boolean;
}) {
  return (
    <div className={`px-5 py-4 border-l border-border text-center ${hero ? "bg-accent-bg-subtle/60" : ""}`}>
      <p className={`font-display text-[1.05rem] ${hero ? "text-accent" : "text-text-primary"}`}>{title}</p>
      <p className={`text-[10px] mt-0.5 uppercase tracking-widest font-medium ${warn ? "text-red-700" : "text-text-tertiary"}`}>{sub}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TEMPLATES
   ────────────────────────────────────────────────────────────── */
function Templates() {
  const t = [
    { name: "chief-of-staff", tagline: "A Chief of Staff for every manager", desc: "Morning brief, weekly status, missed-commitment alerts, one-on-one prep, kudos. Schedule and AI teammates are all included.", delivers: ["Morning brief", "Weekly status", "1:1 prep", "Kudos"], cmd: "github:cabinetai/template-chief-of-staff", icon: Briefcase, featured: true },
    { name: "exec-strategy", tagline: "The CEO's operating room", desc: "OKR tree, scorecard, twelve-month metric grid, monthly review brief, cross-team heatmap, risk list.", delivers: ["OKR tree", "Scorecard", "Monthly review", "Risk list"], cmd: "github:cabinetai/template-exec-strategy", icon: Building2 },
    { name: "okr-cycle", tagline: "Quarterly planning, end to end", desc: "Drafting → reviewed → aligned → in progress → at risk → done. An OKR Coach lives in the same folder.", delivers: ["Playbook", "Alignment", "Coach"], cmd: "github:cabinetai/template-okr-cycle", icon: Target },
    { name: "leadership-coach", tagline: "A coach in every manager's pocket", desc: "Feedback framing, prep for hard conversations, personal growth plan, Friday reflection, every week.", delivers: ["Feedback prep", "Growth plan", "Kudos"], cmd: "github:cabinetai/template-leadership-coach", icon: Users },
    { name: "initiative-tracker", tagline: "Cross-team portfolio in one place", desc: "One folder per initiative. Weekly auto-drafted briefing. Named owners, named dependencies, named milestones.", delivers: ["Portfolio", "Briefings", "Dependencies"], cmd: "github:cabinetai/template-initiatives", icon: Layers },
    { name: "operating-schedule", tagline: "The schedule under everything", desc: "The set of jobs every other template installs: morning brief, weekly status, monthly review, quarterly cycle.", delivers: ["Morning", "Weekly", "Monthly", "Quarterly"], cmd: "github:cabinetai/template-operating-schedule", icon: Clock },
  ];

  return (
    <Section id="templates">
      <SectionHeader
        align="center"
        eyebrow="Ready-made templates"
        title={
          <>
            Workboard: three months to roll out.{" "}
            <em className="text-accent">Cabinet: ten minutes.</em>
          </>
        }
        kicker={
          <>
            Each template is a folder with the AI teammates, the schedule, and
            the layout already wired up. Copy from GitHub, install in Cabinet,
            fill in two names, ship value the same afternoon.
          </>
        }
      />

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
        {t.map((x) => (
          <TplCard key={x.name} {...x} />
        ))}
      </div>
    </Section>
  );
}

function TplCard(p: {
  name: string;
  tagline: string;
  desc: string;
  delivers: string[];
  cmd: string;
  icon: React.ElementType;
  featured?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const Icon = p.icon;
  return (
    <div className={`relative ent-card ent-card-hover p-6 ${p.featured ? "ring-1 ring-accent/30 border-accent/50" : ""}`}>
      {p.featured && (
        <span className="absolute -top-2.5 left-5 ent-pill" style={{ background: "var(--accent)", color: "#fff", borderColor: "var(--accent-warm)" }}>
          <Sparkles className="w-3 h-3" />
          Start here
        </span>
      )}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent-bg-subtle border border-accent-bg flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="text-[11px] text-text-tertiary font-code">cabinet:{p.name}</p>
          <h3 className="ent-display-3 leading-snug">{p.tagline}</h3>
        </div>
      </div>
      <p className="text-[15px] text-text-secondary font-body-serif leading-relaxed">{p.desc}</p>
      <div className="flex flex-wrap gap-1 mt-4 mb-4">
        {p.delivers.map((d) => (
          <span key={d} className="text-[11px] text-accent bg-accent-bg-subtle border border-accent-bg px-2 py-0.5 rounded">
            {d}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-md bg-bg border border-border px-3 py-2">
        <Terminal className="w-3 h-3 text-text-tertiary shrink-0" />
        <code className="flex-1 text-[11px] font-code text-text-secondary truncate">{p.cmd}</code>
        <button
          onClick={() => {
            navigator.clipboard.writeText(p.cmd);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          }}
          className="text-text-tertiary hover:text-text-primary"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-warm" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   OUTCOMES
   ────────────────────────────────────────────────────────────── */
function Outcomes() {
  return (
    <Section tone="warm">
      <SectionHeader
        eyebrow="What you will measure"
        title={
          <>
            What changes in{" "}
            <em className="text-accent">the first 90 days</em>.
          </>
        }
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard stat="14h → 3h" label="Monthly review prep, per business unit" detail="The brief is drafted in advance. No more weekend war rooms." icon={Clock} />
        <StatCard stat="+91%" label="Executive review attendance" detail="The agenda is ready the night before. No prep means no one cancels." icon={TrendingUp} />
        <StatCard stat="0" label="Missed one-on-one commitments per quarter" detail="The Risk Watcher checks every one-on-one log hourly for overdue follow-ups." icon={Target} />
        <StatCard stat="3×" label="Faster OKR cycle close" detail="Drafting, alignment, and ratification all happen in the same folder." icon={Zap} />
        <StatCard stat="100%" label="Of decisions captured in writing" detail="Every meeting writes a decision file the AI reads the following week." icon={FileText} />
        <StatCard stat="$240k" label="Saved per year, vs. a Workboard contract" detail="Average enterprise replacing a six-figure SaaS contract." icon={Database} />
      </div>
      <p className="mt-7 text-center text-xs text-text-tertiary">
        Targets based on Workboard's published customer benchmarks applied to Cabinet's open-source approach. Validated with pilot customers in Q2 2026.
      </p>
    </Section>
  );
}

/* ──────────────────────────────────────────────────────────────
   SOLUTIONS PREVIEW
   ────────────────────────────────────────────────────────────── */
function SolutionsPreview() {
  const personas = [
    { title: "Chief Executive", sub: "Operating model and board view", icon: Briefcase, items: ["A 06:00 morning brief grounded in every team's OKR", "The next monthly review brief is drafted 5 days ahead", "Re-plan continuously. The annual cycle is over"] },
    { title: "Chief of Staff", sub: "Schedule, drafts, decisions", icon: Users, items: ["Every meeting writes a decision file", "Friday 16:00: weekly status drafts itself", "Replace Slack threads with an auditable record"] },
    { title: "CHRO / People", sub: "Performance and manager support", icon: Building2, items: ["A coach in every manager's pocket", "Kudos drafted from real contributions, not LinkedIn fluff", "Feedback prep before the hard conversation"] },
    { title: "CIO / CISO", sub: "Data ownership and audit trail", icon: Shield, items: ["Open source: your team can read the code before signing", "Run on your servers, with your AI keys, fully offline if needed", "Export your data with one shell command. No 90-day queue"] },
  ];

  return (
    <Section>
      <SectionHeader
        eyebrow="Built for every leader"
        title={
          <>
            One platform.{" "}
            <em className="text-accent">Four budgets it replaces.</em>
          </>
        }
        kicker={
          <>
            Cabinet is the rare enterprise platform that lands at the CEO level
            and on every manager's laptop in the same quarter, because the AI
            teammates work at every altitude.
          </>
        }
      />
      <div className="grid md:grid-cols-2 gap-5">
        {personas.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="ent-card ent-card-hover p-7">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-lg bg-accent-bg-subtle border border-accent-bg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="ent-display-3">{p.title}</h3>
                  <Eyebrow muted>{p.sub}</Eyebrow>
                </div>
              </div>
              <CheckList items={p.items} />
            </div>
          );
        })}
      </div>
      <div className="mt-10 text-center">
        <SecondaryButton href="/enterprise/solutions" icon={ArrowRight}>
          See all solutions by role
        </SecondaryButton>
      </div>
    </Section>
  );
}

/* ──────────────────────────────────────────────────────────────
   QUOTE
   ────────────────────────────────────────────────────────────── */
function QuoteRow() {
  return (
    <section className="bg-bg-warm py-20 md:py-24 border-t border-border">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <Quote className="w-8 h-8 mx-auto text-accent/40 mb-6" />
        <p className="ent-display-3 italic max-w-3xl mx-auto">
          “Most software helps teams do work. Cabinet helps teams do the{" "}
          <span className="text-accent not-italic font-semibold">right</span>{" "}
          work, and proves it.”
        </p>
        <p className="mt-7 text-sm font-semibold text-text-tertiary uppercase tracking-widest">
          Cabinet
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   FINAL CTA
   ────────────────────────────────────────────────────────────── */
function FinalCta() {
  return (
    <Section>
      <div className="relative ent-card overflow-hidden p-10 md:p-16 text-center">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, rgba(139,94,60,0.18), transparent 60%)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, rgba(90,122,79,0.12), transparent 60%)" }}
        />
        <div className="relative">
          <Pill icon={Sparkles}>Executive briefing · Q2 2026</Pill>
          <h2 className="ent-display-2 mt-5 max-w-2xl mx-auto">
            Book a{" "}
            <em className="text-accent">90-minute executive briefing.</em>
          </h2>
          <p className="ent-lead mt-5 max-w-2xl mx-auto">
            The founder sits with you and your Chief of Staff. We set up
            Cabinet on your top three OKRs, live. You leave with a working
            folder, an AI teammate drafting your next monthly review brief,
            and a clear 30-day rollout plan.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton href="/enterprise/briefing">Request the briefing</PrimaryButton>
            <SecondaryButton href="/enterprise/security" icon={Shield}>
              Review security &amp; controls
            </SecondaryButton>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-left">
            <TrustItem icon={Lock} t="Your data, your folder" b="Your servers. Your AI keys. Your control." />
            <TrustItem icon={Network} t="EU AI Act ready" b="Every action logged. Every source traceable." />
            <TrustItem icon={Globe} t="Pilots open in Q2" b="Europe, North America, APAC." />
          </div>
        </div>
      </div>
    </Section>
  );
}

function TrustItem({ icon: Icon, t, b }: { icon: React.ElementType; t: string; b: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-accent-bg-subtle border border-accent-bg flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-accent" />
      </div>
      <div>
        <p className="text-[14px] font-semibold text-text-primary">{t}</p>
        <p className="text-[13px] text-text-secondary mt-0.5 font-body-serif">{b}</p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────────────────────── */
export default function EnterpriseLandingPage() {
  return (
    <>
      <Hero />
      <Problem />
      <Substrate />
      <LiveBriefSection />
      <Versus />
      <Templates />
      <Outcomes />
      <SolutionsPreview />
      <QuoteRow />
      <FinalCta />
    </>
  );
}
