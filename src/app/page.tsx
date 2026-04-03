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
} from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}
import { useState, useEffect, useRef } from "react";

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
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
    { prompt: true, text: "cabinet init my-startup" },
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

/* ─── Main Page ─── */
export default function Home() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center justify-center dot-grid overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-bg-card text-xs font-code text-text-tertiary mb-10">
            <Zap className="w-3.5 h-3.5 text-accent" />
            open source &middot; self-hosted &middot; file-based
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

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-4 leading-relaxed font-body-serif">
            The AI-first startup OS where everything lives as markdown files on disk. No database. No vendor lock-in.
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#get-started"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent hover:bg-accent-warm text-white font-medium transition-all shadow-sm"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-border hover:border-border-dark text-text-secondary hover:text-text-primary font-medium transition-all"
            >
              See Features
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          <TerminalDemo />
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
              { step: "01", title: "Install & Run", desc: "One command. Next.js + daemon start. Your knowledge base is a /data directory on disk.", code: "npx cabinet init && npm run start" },
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
            Cabinet is free, open source, and self-hosted. Your data never leaves your machine. Start in 2 minutes.
          </p>
          <div className="terminal-chrome p-6 mb-8 max-w-md mx-auto">
            <div className="font-code text-sm flex items-center gap-2">
              <span className="text-green-400">$</span>
              <span className="text-zinc-200">npx cabinet init my-startup</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/hilash/cabinet"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent hover:bg-accent-warm text-white font-medium transition-all shadow-sm"
            >
              Get Started <ArrowRight className="w-4 h-4" />
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
              <span className="text-xs text-text-tertiary">Open source &middot; MIT License</span>
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
