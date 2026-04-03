"use client";

import Image from "next/image";
import {
  Bot,
  FolderTree,
  Terminal,
  GitBranch,
  FileText,
  Code2,
  Globe,
  Layout,
  Search,
  Clock,
  Kanban,
  MessageSquare,
  Zap,
  Shield,
  Check,
  X,
  Minus,
  ArrowRight,
  ChevronDown,
  Star,
  Users,
  Layers,
  Mail,
  Table,
  Folder,
  AppWindow,
  FileType,
} from "lucide-react";

const DISCORD_URL = "https://discord.gg/rxd8BYnN";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.369A19.791 19.791 0 0 0 15.37 2.813a13.66 13.66 0 0 0-.637 1.302 18.27 18.27 0 0 0-5.464 0 13.66 13.66 0 0 0-.646-1.302 19.736 19.736 0 0 0-4.95 1.557C.533 9.046-.33 13.58.099 18.058a19.91 19.91 0 0 0 6.067 3.067 14.93 14.93 0 0 0 1.3-2.11 12.99 12.99 0 0 1-2.041-.984c.171-.125.339-.255.5-.389 3.94 1.852 8.214 1.852 12.108 0 .164.134.332.264.5.389a12.99 12.99 0 0 1-2.046.986 14.86 14.86 0 0 0 1.302 2.108 19.862 19.862 0 0 0 6.069-3.067c.503-5.19-.858-9.682-3.541-13.689ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.155 2.418 0 1.334-.955 2.419-2.155 2.419Zm7.975 0c-1.184 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.211 0 2.176 1.094 2.156 2.418 0 1.334-.945 2.419-2.156 2.419Z" />
    </svg>
  );
}
import { useState, useEffect, useRef } from "react";

/* ─── Navbar ─── */
function Navbar() {
  return (
    <nav className="relative z-20 border-b border-border bg-bg-card/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <Image src="/cabinet-icon.png" alt="Cabinet" width={36} height={36} className="rounded-lg" />
          <span className="text-xl font-display italic tracking-tight text-text-primary">
            Cabinet
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-code text-text-tertiary">
          <a href="#features" className="hover:text-text-primary transition-colors">
            Features
          </a>
          <a href="#karpathy" className="hover:text-text-primary transition-colors">
            Why Now
          </a>
          <a href="#compare" className="hover:text-text-primary transition-colors">
            Compare
          </a>
          <a href="#agents" className="hover:text-text-primary transition-colors">
            AI Agents
          </a>
          <a
            href="https://github.com/hilash/cabinet"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            GitHub
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-medium transition-colors shadow-sm shadow-[#5865F2]/20"
          >
            <DiscordIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Discord</span>
          </a>
          <a
            href="https://github.com/hilash/cabinet"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-border-dark text-text-secondary text-sm font-medium transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            Star on GitHub
          </a>
          <a
            href="#get-started"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent hover:bg-accent-warm text-white text-sm font-medium transition-colors"
          >
            Get Started
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── Typing Animation ─── */
function TypingText({ texts }: { texts: string[] }) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const timeout = deleting ? 30 : 60;

    if (!deleting && charIndex === current.length) {
      setTimeout(() => setDeleting(true), 2000);
      return;
    }
    if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex((i) => (i + 1) % texts.length);
      return;
    }

    const timer = setTimeout(() => {
      setCharIndex((c) => c + (deleting ? -1 : 1));
    }, timeout);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, textIndex, texts]);

  return (
    <span className="text-accent">
      {texts[textIndex].slice(0, charIndex)}
      <span className="cursor-blink text-accent-light">|</span>
    </span>
  );
}

/* ─── Terminal Demo ─── */
function TerminalDemo() {
  const lines = [
    { prompt: true, text: "npx create-cabinet my-startup" },
    { prompt: false, text: "Creating knowledge base..." },
    { prompt: false, text: "Setting up AI agents..." },
    { prompt: false, text: "" },
    { prompt: false, text: "  CEO Agent        ready    strategic planning" },
    { prompt: false, text: "  Content Writer   ready    blog, social, SEO" },
    { prompt: false, text: "  Editor           ready    KB maintenance" },
    { prompt: false, text: "" },
    { prompt: false, text: "Cabinet is running at http://localhost:3000" },
    { prompt: false, text: "Your AI team is ready." },
  ];

  const [visibleLines, setVisibleLines] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setVisibleLines(i);
            if (i >= lines.length) clearInterval(interval);
          }, 300);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [lines.length]);

  return (
    <div ref={containerRef} className="terminal-chrome relative scanline">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-zinc-500 font-code">cabinet ~ zsh</span>
      </div>
      <div className="p-5 font-code text-sm leading-relaxed min-h-[280px]">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="flex">
            {line.prompt ? (
              <>
                <span className="text-green-400 mr-2">$</span>
                <span className="text-zinc-200">{line.text}</span>
              </>
            ) : (
              <span
                className={
                  line.text.startsWith("  ") && !line.text.startsWith("  Cabinet")
                    ? "text-amber-300"
                    : line.text.startsWith("Cabinet") || line.text.startsWith("Your")
                      ? "text-green-400 font-semibold"
                      : "text-zinc-500"
                }
              >
                {line.text}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Feature Card ─── */
function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="group p-6 rounded-xl border border-border bg-bg-card card-hover">
      <div className="w-10 h-10 rounded-lg bg-accent-bg flex items-center justify-center mb-4 group-hover:bg-accent-bg transition-colors">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <h3 className="font-display text-lg mb-2 text-text-primary">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
}

/* ─── Comparison Table ─── */
function ComparisonTable() {
  const features = [
    { name: "Knowledge base / wiki", cabinet: true, obsidian: true, notion: true, paperclip: false },
    { name: "Markdown files on disk", cabinet: true, obsidian: true, notion: false, paperclip: false },
    { name: "Self-hosted / local-first", cabinet: true, obsidian: true, notion: false, paperclip: true },
    { name: "AI agent orchestration", cabinet: true, obsidian: false, notion: "partial", paperclip: true },
    { name: "Agent org chart / hierarchy", cabinet: true, obsidian: false, notion: false, paperclip: true },
    { name: "Agent heartbeats / scheduling", cabinet: true, obsidian: false, notion: false, paperclip: true },
    { name: "Agent budget controls", cabinet: "partial", obsidian: false, notion: false, paperclip: true },
    { name: "Embedded HTML apps", cabinet: true, obsidian: false, notion: false, paperclip: false },
    { name: "Web terminal (xterm.js)", cabinet: true, obsidian: false, notion: false, paperclip: false },
    { name: "WYSIWYG editor", cabinet: true, obsidian: true, notion: true, paperclip: false },
    { name: "PDF / CSV viewing & editing", cabinet: true, obsidian: "partial", notion: false, paperclip: false },
    { name: "Git-backed version history", cabinet: true, obsidian: "partial", notion: "partial", paperclip: false },
    { name: "Internal team chat", cabinet: true, obsidian: false, notion: false, paperclip: "partial" },
    { name: "Mission / task system", cabinet: true, obsidian: false, notion: true, paperclip: true },
    { name: "Linked Git repos", cabinet: true, obsidian: false, notion: false, paperclip: false },
    { name: "Audit logs", cabinet: "partial", obsidian: false, notion: false, paperclip: true },
    { name: "No database required", cabinet: true, obsidian: true, notion: false, paperclip: false },
  ];

  const renderIcon = (val: boolean | string) => {
    if (val === true) return <Check className="w-4 h-4 text-accent mx-auto" />;
    if (val === "partial") return <Minus className="w-4 h-4 text-accent-light mx-auto" />;
    return <X className="w-4 h-4 text-text-muted mx-auto" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-dark">
            <th className="text-left py-3 px-4 font-medium text-text-secondary">Feature</th>
            <th className="text-center py-3 px-4 font-semibold text-accent">Cabinet</th>
            <th className="text-center py-3 px-4 font-medium text-text-tertiary">Obsidian</th>
            <th className="text-center py-3 px-4 font-medium text-text-tertiary">Notion</th>
            <th className="text-center py-3 px-4 font-medium text-text-tertiary">Paperclip</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f) => (
            <tr key={f.name} className="border-b border-border-light hover:bg-bg-warm/50">
              <td className="py-3 px-4 text-text-primary">{f.name}</td>
              <td className="py-3 px-4">{renderIcon(f.cabinet)}</td>
              <td className="py-3 px-4">{renderIcon(f.obsidian)}</td>
              <td className="py-3 px-4">{renderIcon(f.notion)}</td>
              <td className="py-3 px-4">{renderIcon(f.paperclip)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Karpathy Quote Section ─── */
function KarpathySection() {
  return (
    <section id="karpathy" className="py-24 bg-bg-warm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-3">The Shift</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            Why the world needs Cabinet
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Andrej Karpathy recently described the future of knowledge work.
            Cabinet is that future, built today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="border border-border rounded-xl p-8 bg-bg-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent-bg flex items-center justify-center text-sm font-bold text-accent-warm">
                AK
              </div>
              <div>
                <p className="font-semibold text-sm text-text-primary">Andrej Karpathy</p>
                <p className="text-xs text-text-tertiary">LLM Knowledge Bases</p>
              </div>
            </div>
            <div className="space-y-4 text-sm text-text-secondary leading-relaxed font-body-serif">
              <p>
                &ldquo;Using LLMs to build personal knowledge bases for various
                topics of research interest. A large fraction of my recent token
                throughput is going less into manipulating code, and more into{" "}
                <span className="text-accent font-semibold">manipulating knowledge</span>.&rdquo;
              </p>
              <p>
                &ldquo;Raw data from a given number of sources is collected, then
                compiled by an LLM into a .md wiki, then operated on by various
                CLIs by the LLM to do Q&A and to incrementally enhance the wiki.&rdquo;
              </p>
              <p className="text-accent font-semibold">
                &ldquo;I think there is room here for an incredible new product
                instead of a hacky collection of scripts.&rdquo;
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                label: "Data Ingest",
                karpathy: "Index source docs into raw/, LLM compiles a wiki of .md files",
                cabinet: "Drag PDFs, CSVs, HTML apps, markdown into the KB. AI agents auto-organize and cross-link.",
              },
              {
                label: "IDE / Viewer",
                karpathy: "Uses Obsidian as the frontend to view compiled wiki",
                cabinet: "Built-in WYSIWYG editor, PDF viewer, CSV editor, embedded HTML apps, web terminal - all in one UI.",
              },
              {
                label: "Q&A",
                karpathy: "Once wiki is big enough, ask LLM complex questions against it",
                cabinet: "AI panel with @mentions. Agents reference the entire KB. Ask questions, get answers with page citations.",
              },
              {
                label: "Output",
                karpathy: "Render markdown, slide shows, matplotlib images back into Obsidian",
                cabinet: "Agents write directly to the KB. Slides, dashboards, reports - all viewable inline. Output compounds.",
              },
              {
                label: "Automation",
                karpathy: "Manually runs LLM health checks, vibe-coded a search engine",
                cabinet: "Scheduled cron jobs, agent heartbeats, mission boards. Your AI team runs 24/7 without scripts.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="border border-border rounded-lg p-5 bg-bg-card card-hover"
              >
                <span className="text-xs font-code text-accent bg-accent-bg px-2 py-0.5 rounded">
                  {item.label}
                </span>
                <p className="text-xs text-text-tertiary mt-2 mb-1.5 italic font-body-serif">
                  Karpathy: {item.karpathy}
                </p>
                <p className="text-sm text-text-primary">{item.cabinet}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Agent Cards ─── */
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
        <div key={agent.name} className="border border-border rounded-xl p-5 bg-bg-card card-hover group">
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

/* ─── Use Cases Carousel ─── */
const USE_CASES = [
  {
    tag: "B2C App",
    persona: "Indie App Founder",
    emoji: "📱",
    headline: "My app runs itself while I sleep",
    quote:
      "I use it to run my B2C app. The App Store listing is a markdown page I can update any time. I have an hourly Reddit scout that surfaces user complaints, and a weekly competitor job that crawls the market and dumps everything into /market/competitors/. I wake up to a briefing.",
    agents: [
      { emoji: "🔍", name: "Reddit Scout", status: "running", job: "every hour", pulse: true },
      { emoji: "📊", name: "Competitor Analyst", status: "idle", job: "every Monday" },
      { emoji: "📝", name: "Content Writer", status: "idle", job: "every day 9am" },
    ],
    kb: {
      projectName: "my-b2c-app",
      tree: [
        { name: "product/", type: "folder", depth: 0 },
        { name: "app-store-listing.md", type: "md", depth: 1, active: true },
        { name: "roadmap.md", type: "md", depth: 1 },
        { name: "pricing.md", type: "md", depth: 1 },
        { name: "market/", type: "folder", depth: 0 },
        { name: "competitors/", type: "folder", depth: 1 },
        { name: "week-14.md", type: "md", depth: 2, badge: "new" },
        { name: "week-13.md", type: "md", depth: 2 },
        { name: "positioning.md", type: "md", depth: 1 },
        { name: "data/", type: "folder", depth: 0 },
        { name: "analytics.csv", type: "csv", depth: 1 },
        { name: "reviews.csv", type: "csv", depth: 1 },
      ],
      preview: {
        title: "product/app-store-listing",
        lines: [
          { t: "h1", v: "App Store Listing" },
          { t: "meta", v: "Updated by Content Writer · 2 hours ago" },
          { t: "h2", v: "Short Description" },
          { t: "p", w: 95 },
          { t: "p", w: 72 },
          { t: "h2", v: "Keywords" },
          { t: "tags", v: ["b2c", "productivity", "ios", "mobile", "startup"] },
          { t: "h2", v: "What's New in v4.2" },
          { t: "p", w: 88 },
          { t: "p", w: 60 },
        ],
      },
    },
  },
  {
    tag: "B2B Sales",
    persona: "Small Business Owner",
    emoji: "💼",
    headline: "2,000 leads. One army of agents.",
    quote:
      "I have a CSV of leads. My agents read it, research each company, and draft personalised outreach. The pipeline CSV updates in real time — I watch it fill up from my dashboard. It's like having a sales team that never sleeps and never asks for a raise.",
    agents: [
      { emoji: "🕵️", name: "Lead Researcher", status: "running", job: "continuous", pulse: true },
      { emoji: "✉️", name: "Outreach Writer", status: "running", job: "continuous", pulse: true },
      { emoji: "📈", name: "Pipeline Tracker", status: "idle", job: "every 30 min" },
    ],
    kb: {
      projectName: "acme-sales",
      tree: [
        { name: "leads/", type: "folder", depth: 0 },
        { name: "pipeline.csv", type: "csv", depth: 1, active: true },
        { name: "leads-raw.csv", type: "csv", depth: 1 },
        { name: "intel/", type: "folder", depth: 0 },
        { name: "companies/", type: "folder", depth: 1 },
        { name: "techcorp.md", type: "md", depth: 2, badge: "new" },
        { name: "globex.md", type: "md", depth: 2 },
        { name: "outreach/", type: "folder", depth: 0 },
        { name: "templates/", type: "folder", depth: 1 },
        { name: "cold-email.md", type: "md", depth: 2 },
        { name: "follow-up.md", type: "md", depth: 2 },
        { name: "tools/", type: "folder", depth: 0 },
        { name: "pipeline-dashboard/", type: "html", depth: 1 },
      ],
      preview: {
        title: "leads/pipeline.csv",
        lines: [
          { t: "h1", v: "pipeline.csv" },
          { t: "meta", v: "87 rows · Updated by Lead Researcher · just now" },
          { t: "table",
            cols: ["Company", "Contact", "Status", "Score"],
            rows: [
              ["TechCorp Inc", "Alice Chen", "✅ Researched", "87"],
              ["StartupXYZ", "Bob Lee", "📝 Drafted", "72"],
              ["GlobalDev", "Carol Kim", "📤 Sent", "91"],
              ["NewCo Ltd", "Dan Park", "🔍 Researching…", "—"],
            ],
          },
        ],
      },
    },
  },
  {
    tag: "Newsletter",
    persona: "Solo Creator",
    emoji: "✍️",
    headline: "Monday morning. Newsletter writes itself.",
    quote:
      "Every Monday my Trend Scout scans HN and Reddit, picks the top signals, and my Draft Writer assembles the issue. I open Cabinet, read the draft, make a few edits, and hit send. What used to take 3 hours now takes 10 minutes.",
    agents: [
      { emoji: "📡", name: "Trend Scout", status: "running", job: "daily 6am", pulse: true },
      { emoji: "🖊️", name: "Draft Writer", status: "idle", job: "every Monday" },
      { emoji: "🔎", name: "SEO Reviewer", status: "idle", job: "on publish" },
    ],
    kb: {
      projectName: "my-newsletter",
      tree: [
        { name: "newsletter/", type: "folder", depth: 0 },
        { name: "issues/", type: "folder", depth: 1 },
        { name: "2026-w14.md", type: "md", depth: 2, active: true, badge: "new" },
        { name: "2026-w13.md", type: "md", depth: 2 },
        { name: "2026-w12.md", type: "md", depth: 2 },
        { name: "brand/", type: "folder", depth: 0 },
        { name: "voice-guide.md", type: "md", depth: 1 },
        { name: "tone-examples.md", type: "md", depth: 1 },
        { name: "research/", type: "folder", depth: 0 },
        { name: "sources.md", type: "md", depth: 1 },
        { name: "hn-picks.md", type: "md", depth: 1, badge: "updated" },
        { name: "archive/", type: "folder", depth: 0 },
      ],
      preview: {
        title: "newsletter/issues/2026-w14",
        lines: [
          { t: "h1", v: "Week 14 — The AI Stack Shift" },
          { t: "meta", v: "Drafted by Draft Writer · Monday 8:14am · ready for review" },
          { t: "h2", v: "This week's signal" },
          { t: "p", w: 100 },
          { t: "p", w: 82 },
          { t: "p", w: 91 },
          { t: "h2", v: "Top picks" },
          { t: "p", w: 95 },
          { t: "p", w: 70 },
          { t: "tags", v: ["AI", "tooling", "indie hackers", "dev tools"] },
        ],
      },
    },
  },
  {
    tag: "Consulting",
    persona: "Freelance Consultant",
    emoji: "🏢",
    headline: "Every client. One brain.",
    quote:
      "Each client gets their own folder. Meeting notes, proposals, deliverables — all markdown. When I switch clients, I just ask the AI about the folder. It has full context: the history, the decisions, the open questions. No re-reading, no catch-up.",
    agents: [
      { emoji: "🗒️", name: "Meeting Summariser", status: "idle", job: "after each call" },
      { emoji: "📄", name: "Proposal Writer", status: "running", job: "on demand", pulse: true },
      { emoji: "🔗", name: "Research Assistant", status: "idle", job: "on demand" },
    ],
    kb: {
      projectName: "consulting-kb",
      tree: [
        { name: "clients/", type: "folder", depth: 0 },
        { name: "acme/", type: "folder", depth: 1 },
        { name: "strategy.md", type: "md", depth: 2, active: true },
        { name: "proposal-v2.md", type: "md", depth: 2 },
        { name: "meeting-notes/", type: "folder", depth: 2 },
        { name: "2026-03-28.md", type: "md", depth: 3 },
        { name: "2026-03-14.md", type: "md", depth: 3 },
        { name: "globex/", type: "folder", depth: 1 },
        { name: "proposal-v3.md", type: "md", depth: 2, badge: "updated" },
        { name: "brief.md", type: "md", depth: 2 },
        { name: "templates/", type: "folder", depth: 0 },
        { name: "proposal.md", type: "md", depth: 1 },
        { name: "discovery.md", type: "md", depth: 1 },
      ],
      preview: {
        title: "clients/acme/strategy",
        lines: [
          { t: "h1", v: "Acme — Q2 Strategy" },
          { t: "meta", v: "Updated after kickoff call · 3 days ago" },
          { t: "h2", v: "Current Focus" },
          { t: "p", w: 100 },
          { t: "p", w: 75 },
          { t: "h2", v: "Open Questions" },
          { t: "p", w: 90 },
          { t: "p", w: 65 },
          { t: "h2", v: "Next Steps" },
          { t: "p", w: 82 },
          { t: "p", w: 55 },
        ],
      },
    },
  },
  {
    tag: "Open Source",
    persona: "OSS Maintainer",
    emoji: "⚙️",
    headline: "Merge PR. Changelog writes itself.",
    quote:
      "I linked my GitHub repo with .repo.yaml. When I merge a PR, an agent reads the diff, updates CHANGELOG.md, drafts release notes, and queues a Discord announcement. Maintenance overhead dropped to almost zero.",
    agents: [
      { emoji: "📋", name: "Release Writer", status: "idle", job: "on PR merge" },
      { emoji: "📖", name: "Docs Updater", status: "running", job: "continuous", pulse: true },
      { emoji: "📣", name: "Announcer", status: "idle", job: "on release tag" },
    ],
    kb: {
      projectName: "my-oss-lib",
      tree: [
        { name: "docs/", type: "folder", depth: 0 },
        { name: "getting-started.md", type: "md", depth: 1 },
        { name: "api-reference.md", type: "md", depth: 1 },
        { name: "contributing.md", type: "md", depth: 1 },
        { name: "changelog.md", type: "md", depth: 0, active: true, badge: "updated" },
        { name: "releases/", type: "folder", depth: 0 },
        { name: "v2.1.0.md", type: "md", depth: 1, badge: "new" },
        { name: "v2.0.0.md", type: "md", depth: 1 },
        { name: ".repo.yaml", type: "yaml", depth: 0 },
      ],
      preview: {
        title: "changelog",
        lines: [
          { t: "h1", v: "Changelog" },
          { t: "meta", v: "Written by Release Writer · just now · linked to github/my-lib" },
          { t: "h2", v: "v2.1.0 — 2026-04-02" },
          { t: "p", w: 98 },
          { t: "p", w: 80 },
          { t: "p", w: 68 },
          { t: "h2", v: "v2.0.0 — 2026-03-15" },
          { t: "p", w: 85 },
          { t: "p", w: 72 },
        ],
      },
    },
  },
  {
    tag: "Startup OS",
    persona: "Solo Founder",
    emoji: "🚀",
    headline: "Strategy, roadmap, market — one place.",
    quote:
      "I run my entire startup from here. Strategy in /strategy/, roadmap in /product/roadmap.md, ICP in /market/icp.md. My CEO agent attends every planning session — I open a page, describe the week, and it challenges my assumptions and updates the mission board.",
    agents: [
      { emoji: "🎯", name: "CEO Agent", status: "running", job: "daily standup", pulse: true },
      { emoji: "📊", name: "Market Scout", status: "idle", job: "every Monday" },
      { emoji: "✅", name: "OKR Tracker", status: "idle", job: "every Friday" },
    ],
    kb: {
      projectName: "my-startup",
      tree: [
        { name: "strategy/", type: "folder", depth: 0 },
        { name: "q2-plan.md", type: "md", depth: 1, active: true },
        { name: "vision.md", type: "md", depth: 1 },
        { name: "product/", type: "folder", depth: 0 },
        { name: "roadmap.md", type: "md", depth: 1 },
        { name: "specs/", type: "folder", depth: 1 },
        { name: "market/", type: "folder", depth: 0 },
        { name: "icp.md", type: "md", depth: 1 },
        { name: "competitors.md", type: "md", depth: 1, badge: "updated" },
        { name: "tools/", type: "folder", depth: 0 },
        { name: "okr-tracker/", type: "app", depth: 1 },
      ],
      preview: {
        title: "strategy/q2-plan",
        lines: [
          { t: "h1", v: "Q2 Plan — 2026" },
          { t: "meta", v: "Reviewed by CEO Agent · today · 3 open questions flagged" },
          { t: "h2", v: "North Star" },
          { t: "p", w: 93 },
          { t: "p", w: 70 },
          { t: "h2", v: "OKRs" },
          { t: "p", w: 88 },
          { t: "p", w: 75 },
          { t: "tags", v: ["growth", "retention", "Q2-2026", "fundraising"] },
        ],
      },
    },
  },
];

function getNodeIcon(type: string, isActive: boolean) {
  const base = "w-3.5 h-3.5 shrink-0";
  if (type === "folder")  return <Folder     className={`${base} text-text-tertiary`} />;
  if (type === "csv")     return <Table      className={`${base} text-green-500`} />;
  if (type === "html")    return <Globe      className={`${base} text-blue-500`} />;
  if (type === "app")     return <AppWindow  className={`${base} text-green-500`} />;
  if (type === "yaml")    return <GitBranch  className={`${base} text-orange-400`} />;
  if (type === "pdf")     return <FileType   className={`${base} text-red-400`} />;
  return <FileText className={`${base} ${isActive ? "text-accent" : "text-text-tertiary"}`} />;
}

function displayNodeName(name: string, type: string) {
  if (type === "md" && name.endsWith(".md")) return name.slice(0, -3);
  return name;
}

function CabinetMockup({ kb, caseEmoji, agents }: { kb: (typeof USE_CASES)[0]["kb"]; caseEmoji: string; agents: (typeof USE_CASES)[0]["agents"] }) {
  return (
    <div className="rounded-xl overflow-hidden border border-border text-left shadow-sm">
      {/* Browser chrome — warm parchment */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-bg-warm">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/90" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/90" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/90" />
        <div className="flex-1 mx-3 flex items-center justify-center gap-1.5">
          <span className="text-[11px] font-display italic text-text-primary">Cabinet</span>
          <span className="text-text-muted text-[10px]">/</span>
          <span className="text-[10px] font-code text-text-tertiary truncate">{kb.projectName}</span>
        </div>
        <Search className="w-3 h-3 text-text-muted" />
      </div>

      {/* App body */}
      <div className="flex" style={{ height: "264px" }}>

        {/* Sidebar — #FAF6F1 */}
        <div className="flex-shrink-0 border-r border-border flex flex-col bg-bg" style={{ width: "176px" }}>
          {/* Project header */}
          <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-border">
            <span className="text-sm leading-none">{caseEmoji}</span>
            <span className="text-[11px] font-code text-text-primary font-semibold truncate">{kb.projectName}</span>
          </div>
          {/* Agents */}
          <div className="border-b border-border px-3 py-2">
            <p className="text-[9px] font-code text-text-muted uppercase tracking-widest mb-1.5">Agents</p>
            <div className="space-y-1">
              {agents.map((agent) => (
                <div key={agent.name} className="flex items-center gap-1.5">
                  <span className="text-xs leading-none">{agent.emoji}</span>
                  <span className="text-[10px] font-code text-text-secondary truncate flex-1">{agent.name}</span>
                  {agent.pulse ? (
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                    </span>
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-border shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Files */}
          <div className="flex-1 overflow-y-auto py-1">
            <p className="text-[9px] font-code text-text-muted uppercase tracking-widest px-3 pt-1.5 pb-1">Files</p>
            {kb.tree.map((node, i) => {
              const isActive = !!(node as { active?: boolean }).active;
              const badge = (node as { badge?: string }).badge;
              const label = displayNodeName(node.name, node.type);
              return (
                <div
                  key={i}
                  className={`flex items-center gap-1.5 py-[3px] text-[11px] font-code cursor-default select-none transition-colors
                    ${isActive
                      ? "bg-accent-bg border-l-2 border-accent text-accent"
                      : "text-text-secondary hover:bg-bg-warm border-l-2 border-transparent"}`}
                  style={{ paddingLeft: `${6 + (node.depth || 0) * 11}px`, paddingRight: "6px" }}
                >
                  {getNodeIcon(node.type, isActive)}
                  <span className={`truncate flex-1 ${isActive ? "text-accent font-medium" : ""}`}>{label}</span>
                  {badge && (
                    <span className="shrink-0 text-[8px] font-code bg-green-50 text-green-600 border border-green-200 px-1 rounded leading-none py-px">
                      {badge}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content pane — white card */}
        <div className="flex-1 overflow-y-auto p-5 bg-bg-card">
          {kb.preview.lines.map((line, i) => {
            if (line.t === "h1") return (
              <div key={i} className="text-sm font-bold text-text-primary mb-0.5 leading-tight font-display">
                {(line as { t: string; v: string }).v}
              </div>
            );
            if (line.t === "h2") return (
              <div key={i} className="text-[10px] font-semibold text-text-primary mt-3 mb-1.5 uppercase tracking-wide">
                {(line as { t: string; v: string }).v}
              </div>
            );
            if (line.t === "meta") return (
              <div key={i} className="text-[10px] font-code text-text-tertiary mb-2.5 pb-2 border-b border-border leading-tight">
                {(line as { t: string; v: string }).v}
              </div>
            );
            if (line.t === "p") return (
              <div
                key={i}
                className="h-1.5 rounded-full bg-border mb-1.5"
                style={{ width: `${(line as { t: string; w: number }).w}%` }}
              />
            );
            if (line.t === "tags") return (
              <div key={i} className="flex flex-wrap gap-1 mt-1">
                {((line as { t: string; v: string[] }).v).map((tag) => (
                  <span key={tag} className="text-[9px] font-code text-accent bg-accent-bg border border-accent/20 px-1.5 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            );
            if (line.t === "table") {
              const l = line as { t: string; cols: string[]; rows: string[][] };
              return (
                <div key={i} className="mt-0.5 overflow-hidden rounded border border-border text-[9px] font-code">
                  <div className="flex bg-bg-warm border-b border-border">
                    {l.cols.map((col) => (
                      <div key={col} className="flex-1 px-2 py-1.5 text-text-tertiary font-semibold truncate">{col}</div>
                    ))}
                  </div>
                  {l.rows.map((row, ri) => (
                    <div key={ri} className={`flex border-b border-border/60 last:border-0 ${ri % 2 === 1 ? "bg-bg" : "bg-bg-card"}`}>
                      {row.map((cell, ci) => (
                        <div key={ci} className={`flex-1 px-2 py-1.5 truncate ${
                          cell.includes("Researching") ? "text-amber-600" :
                          cell.includes("Sent")        ? "text-green-600" :
                          cell.includes("Researched")  ? "text-blue-600" :
                          cell.includes("Drafted")     ? "text-violet-600" :
                          ci === 3                     ? "text-text-primary font-medium" :
                                                         "text-text-secondary"
                        }`}>{cell}</div>
                      ))}
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

function UseCasesCarousel() {
  const [active, setActive] = useState(0);
  const total = USE_CASES.length;
  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);
  const c = USE_CASES[active];

  return (
    <section className="py-24 border-t border-border bg-bg-warm overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Real Use Cases</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-3">
            How people actually use Cabinet
          </h2>
          <p className="text-text-secondary font-body-serif max-w-xl mx-auto">
            Knowledge base + agents + files. One OS for wildly different workflows.
          </p>
        </div>

        {/* Card */}
        <div className="relative">
          <div className="border border-border rounded-2xl bg-bg-card overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">

              {/* Left — quote + activity */}
              <div className="p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-3xl">{c.emoji}</span>
                    <div>
                      <span className="text-[10px] font-code text-accent bg-accent-bg px-2 py-0.5 rounded uppercase tracking-wider">
                        {c.tag}
                      </span>
                      <p className="text-xs text-text-tertiary font-code mt-1">{c.persona}</p>
                    </div>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-text-primary mb-4 leading-snug">
                    {c.headline}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed font-body-serif italic">
                    &ldquo;{c.quote}&rdquo;
                  </p>
                </div>

                {/* Activity bar */}
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-[10px] font-code text-text-tertiary uppercase tracking-widest mb-2">
                    Activity — last 24h
                  </p>
                  <div className="flex gap-0.5 items-end h-7">
                    {Array.from({ length: 24 }, (_, i) => {
                      const heights = [2, 4, 3, 6, 4, 8, 5, 3, 7, 4, 9, 6, 4, 7, 5, 8, 3, 6, 4, 7, 5, 3, 6, 4];
                      const h = heights[(i + active * 7) % heights.length];
                      return (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm ${h > 5 ? "bg-accent" : "bg-border"}`}
                          style={{ height: `${(h / 9) * 100}%` }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right — Cabinet KB mockup */}
              <div className="p-6 md:p-8 bg-bg">
                <CabinetMockup kb={c.kb} caseEmoji={c.emoji} agents={c.agents} />
              </div>
            </div>
          </div>

          {/* Prev / Next */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 rounded-full border border-border bg-bg-card shadow-md flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-dark transition-all"
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 rounded-full border border-border bg-bg-card shadow-md flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-dark transition-all"
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {USE_CASES.map((uc, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all rounded-full ${
                i === active ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-border hover:bg-border-dark"
              }`}
              aria-label={uc.tag}
            />
          ))}
        </div>

        {/* Tags row */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {USE_CASES.map((uc, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`text-xs font-code px-3 py-1 rounded-full border transition-all ${
                i === active
                  ? "border-accent text-accent bg-accent-bg"
                  : "border-border text-text-tertiary hover:border-border-dark hover:text-text-secondary"
              }`}
            >
              {uc.tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstallTerminalSection() {
  return (
    <section className="py-24 border-t border-border bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="section-label mb-3">Install Flow</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            See Cabinet start up in the terminal
          </h2>
          <p className="text-text-secondary font-body-serif leading-relaxed">
            The install walkthrough is back. One command scaffolds the workspace, sets up your AI team, and gets Cabinet running locally.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <TerminalDemo />
          <div className="mt-8 text-center">
            <a
              href="#get-started"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent hover:bg-accent-warm text-white font-medium transition-all shadow-sm"
            >
              Install Cabinet
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center justify-center dot-grid overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-bg-card text-xs font-code text-text-tertiary mb-8">
            <Zap className="w-3.5 h-3.5 text-accent" />
            free project &middot; open source &middot; self-hosted
          </div>

          {/* ─── Dictionary Definition ─── */}
          <div className="max-w-2xl mx-auto mb-14 text-left">
            <div className="dict-card px-8 py-8 md:px-10 md:py-10">
              <div className="flex items-baseline gap-3 mb-1">
                <h1 className="font-display italic text-4xl sm:text-5xl md:text-6xl tracking-tight text-text-primary">
                  cabinet
                </h1>
                <span className="font-code text-xs text-text-tertiary">/ˈkab.ɪ.nət/</span>
              </div>
              <p className="font-code text-xs text-text-tertiary mb-6 italic">noun</p>

              <ol className="space-y-5 text-[15px] leading-relaxed font-body-serif">
                <li className="flex gap-3">
                  <span className="font-display italic text-accent text-lg mt-[-2px] shrink-0">1.</span>
                  <div>
                    <p className="text-text-secondary">
                      A cupboard with shelves or drawers for storing or displaying items.
                    </p>
                    <p className="font-code text-xs text-text-tertiary mt-1.5 italic">
                      &ldquo;a filing cabinet&rdquo;
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-display italic text-accent text-lg mt-[-2px] shrink-0">2.</span>
                  <div>
                    <p className="text-text-secondary">
                      <span className="font-code text-[11px] text-text-tertiary bg-stone-100 px-1.5 py-0.5 rounded mr-1.5 uppercase tracking-wider">politics</span>
                      The committee of senior ministers responsible for controlling government policy.
                    </p>
                    <p className="font-code text-xs text-text-tertiary mt-1.5 italic">
                      &ldquo;a cabinet meeting&rdquo;
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-display italic text-accent text-lg mt-[-2px] shrink-0">3.</span>
                  <div>
                    <p className="text-text-primary">
                      <span className="font-code text-[11px] text-accent bg-accent-bg px-1.5 py-0.5 rounded mr-1.5 uppercase tracking-wider">software</span>
                      An AI-first knowledge base where files live on disk and a team of AI agents helps you execute.
                    </p>
                    <p className="font-code text-xs text-text-tertiary mt-1.5 italic">
                      &ldquo;I asked my cabinet to research the market and draft the blog post&rdquo;
                    </p>
                  </div>
                </li>
              </ol>

              <div className="mt-6 pt-5 border-t border-border-light">
                <p className="font-code text-xs text-text-tertiary">
                  <span className="text-text-secondary">origin</span> &mdash; mid 16th century: from{" "}
                  <span className="italic text-text-secondary">cabinet</span>, diminutive of Old French{" "}
                  <span className="italic text-text-secondary">cabine</span>.
                  <br />
                  <span className="text-text-secondary">definition 3</span> &mdash; 2026, open source.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.1] mb-6">
            <span className="font-display text-text-primary">Your knowledge base.</span>
            <br />
            <span className="font-display italic gradient-text">Your AI team.</span>
          </h2>

          {/* ─── Hero Illustration ─── */}
          <div className="w-48 h-48 mx-auto mb-8 rounded-2xl overflow-hidden">
            <Image
              src="/cabinet-icon.png"
              alt="Cabinet — AI-first knowledge base"
              width={240}
              height={240}
              className="w-full h-full object-cover scale-120 drop-shadow-lg"
              priority
            />
          </div>

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-4 leading-relaxed font-body-serif">
            A free and open-source AI-first startup OS where everything lives as markdown files on disk. No database. No vendor lock-in.
          </p>

          <p className="text-sm md:text-base text-text-tertiary max-w-2xl mx-auto mb-6 font-code">
            No subscription. No trial. No paywall. Clone it, run it, and make it your own.
          </p>

          <p className="text-base font-code text-text-tertiary max-w-xl mx-auto mb-10">
            <TypingText
              texts={[
                "Onboard an AI team in 5 questions",
                "Ship HTML apps inside your KB",
                "Cron-scheduled AI agents that work 24/7",
                "Git-backed version history on every page",
                "PDF, CSV, markdown — all first-class content",
              ]}
            />
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#get-started"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent hover:bg-accent-warm text-white font-medium transition-all shadow-sm"
            >
              Get Cabinet Free
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-border hover:border-border-dark text-text-secondary hover:text-text-primary font-medium transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Join Discord
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-border shadow-lg shadow-black/5">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full"
            >
              <source src="/demo.webm" type="video/webm" />
            </video>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-5 h-5 text-text-muted" />
        </div>
      </section>

      {/* ─── Social proof bar ─── */}
      <section className="border-y border-border py-8 bg-bg-card">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-text-tertiary text-sm font-code">
          <div className="flex items-center gap-2"><FileText className="w-4 h-4" /><span>Markdown on disk</span></div>
          <div className="flex items-center gap-2"><Shield className="w-4 h-4" /><span>Self-hosted</span></div>
          <div className="flex items-center gap-2"><GitBranch className="w-4 h-4" /><span>Git-backed</span></div>
          <div className="flex items-center gap-2"><Bot className="w-4 h-4" /><span>AI-native</span></div>
          <div className="flex items-center gap-2"><Code2 className="w-4 h-4" /><span>Open source</span></div>
        </div>
      </section>

      {/* ─── Use Cases Carousel ─── */}
      <UseCasesCarousel />

      {/* ─── Install Walkthrough ─── */}
      <InstallTerminalSection />

      {/* ─── The Problem ─── */}
      <section className="py-24 bg-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="section-label mb-3">The Problem</p>
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-6">
              Your AI agents have no memory
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed font-body-serif">
              Every time you start a new Claude session, it forgets everything.
              Your project context, your decisions, your research — gone. You
              keep re-explaining the same things. Cabinet gives your AI a
              persistent brain: a knowledge base that both you and your agents
              read and write to, 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-8 rounded-xl border border-border bg-bg-card">
              <div className="w-12 h-12 mx-auto rounded-xl bg-accent-bg flex items-center justify-center mb-4">
                <X className="w-6 h-6 text-accent-warm" />
              </div>
              <h3 className="font-display text-lg mb-2 text-text-primary">Without Cabinet</h3>
              <p className="text-sm text-text-secondary">
                Scattered docs in Notion. AI sessions that forget context. Manual copy-paste between tools. Scripts held together with tape.
              </p>
            </div>
            <div className="text-center p-8 rounded-xl border border-accent/20 bg-accent-bg-subtle">
              <Image src="/cabinet-icon.png" alt="Cabinet" width={48} height={48} className="mx-auto rounded-xl mb-4" />
              <h3 className="font-display text-lg mb-2 text-text-primary">With Cabinet</h3>
              <p className="text-sm text-text-primary">
                One knowledge base. AI agents that remember everything. Scheduled jobs that compound. Your team grows while you sleep.
              </p>
            </div>
            <div className="text-center p-8 rounded-xl border border-border bg-bg-card">
              <div className="w-12 h-12 mx-auto rounded-xl bg-accent-bg-subtle flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-lg mb-2 text-text-primary">Design Principle</h3>
              <p className="text-sm text-text-secondary font-body-serif italic">
                If it feels like enterprise workflow software, it&apos;s wrong. If it feels like watching a team work, it&apos;s right.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Embedded Apps Highlight ─── */}
      <section className="py-24 border-t border-border bg-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-3">Unique to Cabinet</p>
              <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-6">
                Ship HTML apps inside<br />your knowledge base
              </h2>
              <p className="text-text-secondary mb-6 leading-relaxed font-body-serif">
                This is the biggest difference between Cabinet and tools like
                Obsidian or Notion. Drop an{" "}
                <code className="text-accent bg-accent-bg px-1.5 py-0.5 rounded text-sm font-code">index.html</code>{" "}
                into any folder and it renders as a live, interactive app.
              </p>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span><strong className="text-text-primary">Full-screen mode:</strong> add a <code className="text-accent bg-accent-bg px-1 py-0.5 rounded text-xs font-code">.app</code> marker — sidebar and AI panel auto-collapse</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span><strong className="text-text-primary">AI-generated apps:</strong> ask Claude to build a dashboard, it writes the HTML directly into your KB</span>
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

      {/* ─── Features Grid ─── */}
      <section id="features" className="py-24 border-t border-border bg-bg-warm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
              Everything you need. Nothing you don&apos;t.
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto font-body-serif">
              A complete operating system for your startup — knowledge base, AI agents, task management, and team chat in one self-hosted app.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard icon={Layout} title="WYSIWYG + Markdown" description="Rich text editing with Tiptap. Tables, code blocks, slash commands. Toggle to raw markdown anytime." />
            <FeatureCard icon={Bot} title="AI Agents" description="Onboard a CEO, Editor, Marketer. Each has goals, skills, scheduled jobs. Watch them work like a real team." />
            <FeatureCard icon={Globe} title="Embedded HTML Apps" description="Drop an index.html in any folder — it renders as an iframe. Full-screen mode for dashboards and tools." />
            <FeatureCard icon={Terminal} title="Web Terminal" description="Full Claude Code terminal in the browser. xterm.js + node-pty. Run commands without leaving Cabinet." />
            <FeatureCard icon={FolderTree} title="File-Based Everything" description="No database. Markdown on disk. Drag-and-drop tree sidebar. Your data is always yours, always portable." />
            <FeatureCard icon={GitBranch} title="Git-Backed History" description="Every save auto-commits. Full diff viewer. Restore any page to any point in time. Linked repo support." />
            <FeatureCard icon={Clock} title="Scheduled Jobs" description="Cron-based agent automation. Reddit scout every 6 hours. Weekly reports on Monday. Your AI team never sleeps." />
            <FeatureCard icon={Kanban} title="Missions & Tasks" description="Break goals into missions. Assign tasks to agents. Track progress with Kanban boards and progress bars." />
            <FeatureCard icon={MessageSquare} title="Internal Chat" description="Built-in team channels. Agents and humans communicate. @mention an agent to trigger a response." />
            <FeatureCard icon={Search} title="Full-Text Search" description="Cmd+K instant search across all pages. Fuzzy matching. FlexSearch index rebuilt on every change." />
            <FeatureCard icon={FileText} title="PDF & CSV First-Class" description="PDFs render inline. CSVs open as editable tables with add/delete rows and columns. Auto-save with git commit." />
            <FeatureCard icon={Layers} title="Linked Git Repos" description="Add .repo.yaml to link KB directories to source code repos. AI agents read and reference your codebase." />
          </div>
        </div>
      </section>

      {/* ─── Karpathy Section ─── */}
      <KarpathySection />

      {/* ─── Comparison Table ─── */}
      <section id="compare" className="py-24 border-t border-border bg-bg">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Comparison</p>
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
              Not another note-taking app
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto font-body-serif">
              Obsidian is a markdown editor. Notion is a team wiki. Paperclip
              orchestrates agents. Cabinet is the only tool that combines a
              knowledge base, AI agents, and embedded apps in one self-hosted OS.
            </p>
          </div>

          <div className="border border-border rounded-xl bg-bg-card overflow-hidden">
            <ComparisonTable />
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="border border-border rounded-xl p-6 bg-bg-card">
              <h3 className="font-display text-lg mb-3 flex items-center gap-2 text-text-primary">
                <Star className="w-4 h-4 text-accent" /> vs Obsidian
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body-serif">
                Obsidian is a great markdown editor with plugins. But it has no
                AI agents, no scheduled jobs, no embedded HTML apps, no web
                terminal. Cabinet is a knowledge OS, not just a note editor.
              </p>
            </div>
            <div className="border border-border rounded-xl p-6 bg-bg-card">
              <h3 className="font-display text-lg mb-3 flex items-center gap-2 text-text-primary">
                <Star className="w-4 h-4 text-accent" /> vs Notion
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body-serif">
                Notion locks your data in their cloud. Cabinet stores everything
                as markdown files on disk. You own your data. You can grep it.
                AI agents read and write directly. No API limits. No lock-in.
              </p>
            </div>
            <div className="border border-border rounded-xl p-6 bg-bg-card">
              <h3 className="font-display text-lg mb-3 flex items-center gap-2 text-text-primary">
                <Star className="w-4 h-4 text-accent" /> vs Paperclip
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body-serif">
                Paperclip is excellent at agent orchestration — org charts,
                budgets, audit logs. But it has no knowledge base, no editor, no
                content layer. Cabinet gives your agents a brain to read and
                write to, plus HTML apps, a terminal, and a full wiki.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AI Agents ─── */}
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

      {/* ─── How It Works ─── */}
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
              { step: "01", title: "Install & Run", desc: "One command. Next.js + daemon start. Your knowledge base is a /data directory on disk.", code: "npx create-cabinet my-startup" },
              { step: "02", title: "Answer 5 Questions", desc: "What's your company? What do you do? What are your goals? Cabinet builds your custom AI team.", code: null },
              { step: "03", title: "Watch Your Team Work", desc: "Agents create missions, write content, scout Reddit, review quality — all on schedule.", code: null },
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
                    <code className="text-xs font-code text-accent bg-accent-bg px-3 py-1.5 rounded-lg">{item.code}</code>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section id="get-started" className="py-24 border-t border-border bg-bg-warm">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Image src="/cabinet-icon.png" alt="Cabinet" width={64} height={64} className="mx-auto mb-6 rounded-xl" />
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            Ready to build your AI team?
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto leading-relaxed font-body-serif">
            Cabinet is a free, open-source project you can run yourself. No subscription, no trial clock, and no vendor lock-in. Start in 2 minutes.
          </p>
          <div className="terminal-chrome p-6 mb-8 max-w-md mx-auto">
            <div className="font-code text-sm flex items-center gap-2">
              <span className="text-green-400">$</span>
              <span className="text-zinc-200">npx create-cabinet my-startup</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/hilash/cabinet"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent hover:bg-accent-warm text-white font-medium transition-all shadow-sm"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium transition-colors shadow-sm shadow-[#5865F2]/20"
            >
              <DiscordIcon className="w-4 h-4" /> Join Discord
            </a>
            <a
              href="https://github.com/hilash/cabinet"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-border hover:border-border-dark text-text-secondary hover:text-text-primary font-medium transition-all"
            >
              <GithubIcon className="w-4 h-4" /> Star on GitHub
            </a>
          </div>
          <p className="mt-6 text-sm text-text-tertiary">
            Questions? <a href="mailto:hi@runcabinet.com" className="text-accent hover:text-accent-warm underline underline-offset-2">hi@runcabinet.com</a>
          </p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border py-16 bg-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-code text-xs uppercase tracking-wider text-text-tertiary mb-4">Product</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#features" className="text-text-secondary hover:text-text-primary transition-colors">Features</a></li>
                <li><a href="#agents" className="text-text-secondary hover:text-text-primary transition-colors">AI Agents</a></li>
                <li><a href="#compare" className="text-text-secondary hover:text-text-primary transition-colors">Compare</a></li>
                <li><a href="#get-started" className="text-text-secondary hover:text-text-primary transition-colors">Get Started</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-code text-xs uppercase tracking-wider text-text-tertiary mb-4">Developers</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="https://github.com/hilash/cabinet" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://github.com/hilash/cabinet#readme" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="https://github.com/hilash/cabinet/issues" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                    Issues
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-code text-xs uppercase tracking-wider text-text-tertiary mb-4">Resources</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#karpathy" className="text-text-secondary hover:text-text-primary transition-colors">Why Now</a></li>
                <li>
                  <a href="https://github.com/hilash/cabinet/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                    License
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-code text-xs uppercase tracking-wider text-text-tertiary mb-4">Contact</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="mailto:hi@runcabinet.com" className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> hi@runcabinet.com
                  </a>
                </li>
                <li>
                  <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" /> Join Discord
                  </a>
                </li>
                <li>
                  <a href="https://github.com/hilash/cabinet" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5" /> hilash/cabinet
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Image src="/cabinet-icon.png" alt="Cabinet" width={24} height={24} className="rounded" />
              <span className="font-display italic text-sm text-text-primary">Cabinet</span>
              <span className="text-xs text-text-muted">&middot;</span>
              <span className="text-xs text-text-tertiary">Free project &middot; Open source &middot; MIT License</span>
            </div>
            <p className="text-xs text-text-tertiary font-body-serif italic">
              Humans define intent. Agents do the work. The knowledge base is the shared memory.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
