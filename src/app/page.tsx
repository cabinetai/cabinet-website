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
  Shield,
  Check,
  X,
  ArrowRight,
  Download,
  Star,
  Users,
  Layers,
  Mail,
  Table,
  Folder,
  AppWindow,
  FileType,
  Copy,
  Cloud,
  ShieldCheck,
  Server,
  Lock,
} from "lucide-react";
import { Suspense, useState, useEffect, useRef, useCallback } from "react";
import { DiscordIcon, GithubIcon } from "@/components/site-icons";
import { WaitlistCapture } from "@/components/waitlist-capture";
import { WaitlistCloudBackdrop } from "@/components/waitlist-cloud-backdrop";
import { WaitlistPopup } from "@/components/waitlist-popup";
import { IntegrationScene } from "@/components/integration-scene";
import { PrinciplesShowcase } from "@/components/principles-showcase";
import { DISCORD_URL, GITHUB_URL, MACOS_DOWNLOAD_URL } from "@/lib/site-config";

const PROVIDERS = [
  { src: "/providers/claude.svg", name: "Claude" },
  { src: "/providers/openai.png", name: "OpenAI" },
  { src: "/providers/gemini.svg", name: "Gemini" },
  { src: "/providers/grok.svg", name: "Grok" },
  { src: "/providers/copilot.svg", name: "Copilot" },
  { src: "/providers/cursor.svg", name: "Cursor" },
  { src: "/providers/opencode.svg", name: "opencode" },
  { src: "/providers/pi.svg", name: "Pi" },
];

const TRUST_BADGES = [
  {
    icon: ShieldCheck,
    label: "SOC 2 Type II",
    status: "In progress",
    desc: "We're working toward it — and we'll show you the report, not just a badge.",
  },
  {
    icon: Code2,
    label: "Open source",
    desc: "MIT licensed. Read every line, fork it, or run your own build.",
  },
  {
    icon: Server,
    label: "Self-hosted",
    desc: "Runs in your environment, under the controls you already enforce.",
  },
  {
    icon: Lock,
    label: "Not training data",
    desc: "Your prompts and content are never used to train a model.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Cabinet is a big unlock for how I think about operating a business with AI.",
    context:
      "Before Cabinet, AI felt fragmented — great for single tasks, but hard to orchestrate across the business. Every business has different workflows, and Cabinet makes it possible to turn those workflows into an AI team.",
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
    role: "Sustainability Solutions Architect, EMEA",
    location: "Europe",
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
    role: "Strategic narratives for high-stakes systems — from B2B SaaS growth to national public guidance",
    location: "",
    image: "/testimonials/assaf-haski.jpg",
    linkedin: "https://www.linkedin.com/in/assafhaski/",
    initials: "AH",
  },
];

type GitHubRepoResponse = {
  stargazers_count?: number;
};

function formatStarCount(stars: number | null) {
  if (stars === null) return "Star on GitHub";

  return new Intl.NumberFormat("en", {
    notation: stars >= 1000 ? "compact" : "standard",
    maximumFractionDigits: stars >= 1000 ? 1 : 0,
  }).format(stars);
}

function getGitHubRepoPath(url: string) {
  const match = url.match(/github\.com\/([^/]+\/[^/?#]+)/i);
  return match?.[1] ?? null;
}

function useGitHubStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const repoPath = getGitHubRepoPath(GITHUB_URL);
    if (!repoPath) return;

    const controller = new AbortController();

    async function loadStars() {
      try {
        const response = await fetch(`https://api.github.com/repos/${repoPath}`, {
          signal: controller.signal,
          headers: {
            Accept: "application/vnd.github+json",
          },
        });

        if (!response.ok) return;

        const data = (await response.json()) as GitHubRepoResponse;
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error("Unable to load GitHub stars", error);
        }
      }
    }

    loadStars();
    return () => controller.abort();
  }, []);

  return stars;
}

function GitHubStarsButton({
  stars,
  className,
  compact = false,
}: {
  stars: number | null;
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
        {formatStarCount(stars)}
      </span>
    </a>
  );
}

/* ─── Navbar ─── */
function Navbar({ stars }: { stars: number | null }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg-card/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 min-h-16 py-3 flex items-center gap-6 lg:gap-10">
        <a href="#" className="flex shrink-0 items-center gap-3 pr-4 lg:pr-6">
          <Image src="/cabinet-icon.png" alt="Cabinet" width={36} height={36} className="rounded-lg" />
          <span className="whitespace-nowrap text-xl font-brand italic tracking-tight text-text-primary">
            Cabinet
          </span>
        </a>
        <div className="hidden min-[1100px]:flex flex-1 items-center gap-8 text-sm font-medium text-text-secondary">
          <a href="#features" className="hover:text-text-primary transition-colors">
            Features
          </a>
          <a href="/compare" className="hover:text-text-primary transition-colors">
            Compare
          </a>
          <a href="/pricing" className="hover:text-text-primary transition-colors">
            Pricing
          </a>
          <a
            href="https://docs.runcabinet.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            Docs
          </a>
          <a href="/media" className="hover:text-text-primary transition-colors">
            In the Wild
          </a>
        </div>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <GitHubStarsButton
            stars={stars}
            compact
            className="inline-flex h-12 min-w-[11rem] items-center justify-between gap-3 rounded-full border border-border bg-bg-card px-4 text-sm font-semibold text-text-primary shadow-sm transition-all hover:border-border-dark hover:bg-bg-card-hover"
          />
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#5865F2] px-5 text-sm font-medium text-white transition-colors shadow-sm shadow-[#5865F2]/20 hover:bg-[#4752C4]"
          >
            <DiscordIcon className="w-4 h-4" />
            <span>Discord</span>
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
      const timer = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(timer);
    }
    if (deleting && charIndex === 0) {
      const timer = setTimeout(() => {
        setDeleting(false);
        setTextIndex((i) => (i + 1) % texts.length);
      }, timeout);
      return () => clearTimeout(timer);
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

/* ─── Copy Button ─── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);
  return (
    <button
      onClick={handleCopy}
      className="shrink-0 p-1 rounded text-zinc-500 hover:text-zinc-200 hover:bg-white/10 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

/* ─── Terminal Demo ─── */
function TerminalDemo() {
  const lines = [
    { prompt: true, text: "npx cabinetai run" },
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
          <span className="text-[11px] font-brand italic text-text-primary">Cabinet</span>
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
  const total = USE_CASES.length;
  // We render [last, ...all, first] so we can seamlessly loop
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(1); // 1-based because slot 0 is the clone of last
  const [isTransitioning, setIsTransitioning] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const isSwiping = useRef(false);

  // Real index into USE_CASES (0-based)
  const realIndex = ((idx - 1) % total + total) % total;
  const c = USE_CASES[realIndex];

  // Slides: [clone-last, 0, 1, 2, ..., n-1, clone-first]
  const slides = [USE_CASES[total - 1], ...USE_CASES, USE_CASES[0]];

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setIsTransitioning(true);
      setIdx((i) => i + 1);
    }, 5000);
  }, []);

  // Start auto-play on mount
  useEffect(() => {
    resetAutoPlay();
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [resetAutoPlay]);

  // When transition ends, if we're on a clone slide, jump instantly to the real one
  const handleTransitionEnd = useCallback(() => {
    if (idx === 0) {
      setIsTransitioning(false);
      setIdx(total);
    } else if (idx === total + 1) {
      setIsTransitioning(false);
      setIdx(1);
    }
  }, [idx, total]);

  const goTo = useCallback((i: number) => {
    setIsTransitioning(true);
    setIdx(i + 1); // +1 because slot 0 is clone
    resetAutoPlay();
  }, [resetAutoPlay]);

  const prev = useCallback(() => {
    setIsTransitioning(true);
    setIdx((i) => i - 1);
    resetAutoPlay();
  }, [resetAutoPlay]);

  const next = useCallback(() => {
    setIsTransitioning(true);
    setIdx((i) => i + 1);
    resetAutoPlay();
  }, [resetAutoPlay]);

  // Touch / swipe handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    isSwiping.current = true;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    const threshold = 50;
    if (touchDeltaX.current < -threshold) {
      next();
    } else if (touchDeltaX.current > threshold) {
      prev();
    }
  }, [next, prev]);

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

        {/* Sliding track */}
        <div
          className="relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="overflow-hidden rounded-2xl border border-border">
            <div
              ref={trackRef}
              className="flex"
              style={{
                transform: `translateX(-${idx * 100}%)`,
                transition: isTransitioning ? "transform 500ms ease-in-out" : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {slides.map((s, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <div className="bg-bg-card">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Left — quote + activity */}
                      <div className="p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border">
                        <div>
                          <div className="flex items-center gap-3 mb-5">
                            <span className="text-3xl">{s.emoji}</span>
                            <div>
                              <span className="text-[10px] font-code text-accent bg-accent-bg px-2 py-0.5 rounded uppercase tracking-wider">
                                {s.tag}
                              </span>
                              <p className="text-xs text-text-tertiary font-code mt-1">{s.persona}</p>
                            </div>
                          </div>
                          <h3 className="font-display text-xl md:text-2xl text-text-primary mb-4 leading-snug">
                            {s.headline}
                          </h3>
                          <p className="text-text-secondary text-sm leading-relaxed font-body-serif italic">
                            &ldquo;{s.quote}&rdquo;
                          </p>
                        </div>

                        {/* Activity bar */}
                        <div className="mt-8 pt-6 border-t border-border">
                          <p className="text-[10px] font-code text-text-tertiary uppercase tracking-widest mb-2">
                            Activity — last 24h
                          </p>
                          <div className="flex gap-0.5 items-end h-7">
                            {Array.from({ length: 24 }, (_, j) => {
                              const heights = [2, 4, 3, 6, 4, 8, 5, 3, 7, 4, 9, 6, 4, 7, 5, 8, 3, 6, 4, 7, 5, 3, 6, 4];
                              const h = heights[(j + i * 7) % heights.length];
                              return (
                                <div
                                  key={j}
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
                        <CabinetMockup kb={s.kb} caseEmoji={s.emoji} agents={s.agents} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
              onClick={() => goTo(i)}
              className={`transition-all rounded-full ${
                i === realIndex ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-border hover:bg-border-dark"
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
              onClick={() => goTo(i)}
              className={`text-xs font-code px-3 py-1 rounded-full border transition-all ${
                i === realIndex
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
  const stars = useGitHubStars();

  return (
    <div className="relative min-h-screen bg-bg">
      <Navbar stars={stars} />
      <WaitlistPopup />

      {/* ─── Integration scrollytelling scene ─── */}
      <IntegrationScene />

      {/* ─── Hero ─── */}
      <section className="relative flex items-center justify-center dot-grid overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-12">
          {/* ─── Install Options ─── */}
          <div className="max-w-xl mx-auto mb-20">
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <a
                href={MACOS_DOWNLOAD_URL}
                className="shrink-0 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-accent hover:bg-accent-warm text-white font-semibold text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                Download for Mac
              </a>
              <span className="hidden sm:flex items-center text-text-muted text-sm font-code">or</span>
              <div className="flex-1 terminal-chrome flex items-center justify-between px-5 py-4 rounded-xl" style={{ overflow: 'visible' }}>
                <div className="font-code text-sm flex items-center gap-2">
                  <span className="text-green-400 shrink-0">$</span>
                  <span className="text-zinc-200 whitespace-nowrap">npx cabinetai run</span>
                </div>
                <CopyButton text="npx cabinetai run" />
              </div>
            </div>
          </div>

          {/* ─── Dictionary Definition (commented out) ─── */}
          {/*
          <div className="max-w-2xl mx-auto mb-14 text-left">
            <div className="dict-card px-8 py-8 md:px-10 md:py-10">
              <div className="flex items-baseline gap-3 mb-1">
                <h1 className="font-brand italic text-4xl sm:text-5xl md:text-6xl tracking-tight text-text-primary">
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
          */}

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
        </div>
      </section>

      {/* ─── Testimonials ─── */}
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
            <h2 className="text-3xl md:text-4xl font-display text-text-primary">
              How teams achieve 10x work with Cabinet
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
              return (
                <figure
                  key={`${t.name}-${i}`}
                  aria-hidden={i >= TESTIMONIALS.length}
                  className="mr-6 flex w-[340px] shrink-0 flex-col rounded-2xl border border-border bg-bg-card p-6 shadow-sm card-hover sm:w-[380px]"
                >
                  {/* Photo at the top — clickable to LinkedIn */}
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

      {/* ─── Bring your own AI — provider logos ─── */}
      <section id="byoai" className="py-24 border-t border-border bg-bg-card">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="section-label mb-3">Bring your own AI</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            Works with the AI you already pay for
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed mb-12">
            Cabinet runs on your existing model accounts and subscriptions. There&apos;s
            no bundled inference marked up on top, and no new AI vendor to push through
            procurement — point it at what your team already uses.
          </p>

          <div className="grid grid-cols-8 gap-2 sm:gap-3 max-w-4xl mx-auto">
            {PROVIDERS.map((p) => (
              <div key={p.name} className="group flex flex-col items-center gap-2">
                <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-border bg-bg shadow-sm transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:scale-105 group-hover:border-border-dark group-hover:shadow-lg group-hover:bg-bg-card">
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

      {/* ─── Cabinet Cloud Waitlist ─── */}
      <section className="relative overflow-hidden py-20 md:py-24 bg-bg">
        <WaitlistCloudBackdrop />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <Suspense
            fallback={
              <div className="mx-auto min-h-[320px] max-w-5xl rounded-[28px] border border-border bg-bg-card/70" />
            }
          >
            <WaitlistCapture
              source="homepage-section"
              originPage="/"
              trackView
              className="max-w-5xl mx-auto"
            />
          </Suspense>
        </div>
      </section>

      {/* ─── Principles ─── */}
      <section className="py-24 border-t border-border bg-bg-warm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="section-label mb-3">Principles</p>
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
              What Cabinet is <span className="italic gradient-text">built on</span>
            </h2>
            <p className="text-text-secondary font-body-serif leading-relaxed">
              A few principles we think matter deeply for the future of AI + data
              tools. Every product decision gets weighed against these.
            </p>
          </div>
          <PrinciplesShowcase />
          <p className="mt-12 text-center font-body-serif italic text-text-secondary text-lg">
            If a feature would break any of these, it doesn&apos;t make it in.
          </p>
        </div>
      </section>

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
              { step: "01", title: "Install & Run", desc: "One command. Next.js + daemon start. Your knowledge base is a /data directory on disk.", code: "npx cabinetai run" },
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

      {/* ─── Built for organizations ─── */}
      <section className="py-24 border-t border-border bg-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Built for organizations</p>
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
              Designed to clear a security review
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed">
              The people who sign off on new tools — security, legal, platform
              owners — should come away with less to worry about, not more.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {TRUST_BADGES.map((b) => (
              <div
                key={b.label}
                className="rounded-2xl border border-border bg-bg-card p-6 card-hover"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-bg text-accent">
                    <b.icon className="h-5 w-5" strokeWidth={2.25} />
                  </div>
                  {b.status && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
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
          <div className="max-w-xl mx-auto mb-10">
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <a
                href={MACOS_DOWNLOAD_URL}
                className="shrink-0 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-accent hover:bg-accent-warm text-white font-semibold text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                Download for Mac
              </a>
              <span className="hidden sm:flex items-center text-text-muted text-sm font-code">or</span>
              <div className="flex-1 terminal-chrome flex items-center justify-between px-5 py-4 rounded-xl" style={{ overflow: 'visible' }}>
                <div className="font-code text-sm flex items-center gap-2">
                  <span className="text-green-400 shrink-0">$</span>
                  <span className="text-zinc-200 whitespace-nowrap">npx cabinetai run</span>
                </div>
                <CopyButton text="npx cabinetai run" />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mt-4">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium transition-colors shadow-sm shadow-[#5865F2]/20"
            >
              <DiscordIcon className="w-4 h-4" /> Join Discord
            </a>
            <GitHubStarsButton
              stars={stars}
              className="inline-flex h-12 min-w-[11rem] items-center justify-between gap-3 rounded-full border border-border bg-bg-card px-4 text-sm font-semibold text-text-primary shadow-sm transition-all hover:border-border-dark hover:bg-bg-card-hover"
            />
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
                <li><a href="/compare" className="text-text-secondary hover:text-text-primary transition-colors">Compare</a></li>
                <li>
                  <a href="/cloud?source=footer" className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors">
                    <Cloud className="w-3.5 h-3.5 text-accent" />
                    Cabinet Cloud
                    <span className="ml-1 rounded-full bg-accent-bg-subtle px-1.5 py-0.5 text-[10px] font-code uppercase tracking-wider text-accent">Soon</span>
                  </a>
                </li>
                <li><a href="/pricing" className="text-text-secondary hover:text-text-primary transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-code text-xs uppercase tracking-wider text-text-tertiary mb-4">Developers</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href={`${GITHUB_URL}#readme`} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href={`${GITHUB_URL}/issues`} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
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
                  <a href={`${GITHUB_URL}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
                    License
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-text-secondary hover:text-text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-text-secondary hover:text-text-primary transition-colors">
                    Privacy Policy
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
                  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5" /> hilash/cabinet {stars !== null ? `· ${formatStarCount(stars)} stars` : ""}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Image src="/cabinet-icon.png" alt="Cabinet" width={24} height={24} className="rounded" />
              <span className="font-brand italic text-sm text-text-primary">Cabinet</span>
              <span className="text-xs text-text-muted">&middot;</span>
              <span className="text-xs text-text-tertiary">
                &copy; {new Date().getFullYear()} HOLY BIBLE APPS LTD &middot; Open source &middot; MIT License
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-text-tertiary">
              <a href="/terms" className="hover:text-text-primary transition-colors">Terms</a>
              <a href="/privacy" className="hover:text-text-primary transition-colors">Privacy</a>
            </div>
          </div>
          <p className="mt-6 text-center text-[0.7rem] text-text-tertiary font-body-serif italic leading-relaxed max-w-3xl mx-auto">
            Cabinet is provided &ldquo;as is,&rdquo; without warranty of any kind. The Software may
            run autonomous AI agents with file-system, shell, and network access on systems you
            control; you install and run Cabinet at your own risk. See the{" "}
            <a href="/terms" className="underline underline-offset-2 hover:text-text-primary">Terms of Service</a>{" "}
            for the full disclaimer and limitation of liability.
          </p>
        </div>
      </footer>
    </div>
  );
}
