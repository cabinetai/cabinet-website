import type { Metadata } from "next";
import { Check, X, Minus, Star } from "lucide-react";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: "Compare Cabinet vs Obsidian, Notion & Paperclip",
  description:
    "Obsidian is a markdown editor. Notion is a team wiki. Paperclip orchestrates agents. Cabinet is the only tool that combines a knowledge base, AI agents, and embedded apps in one self-hosted OS.",
  openGraph: {
    title: "Not another note-taking app: Cabinet compared",
    description:
      "How Cabinet compares to Obsidian, Notion, and Paperclip across knowledge base, AI agents, embedded apps, and self-hosting.",
    type: "website",
    url: "https://runcabinet.com/compare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Not another note-taking app: Cabinet compared",
    description:
      "How Cabinet compares to Obsidian, Notion, and Paperclip across knowledge base, AI agents, embedded apps, and self-hosting.",
  },
};

function ComparisonTable() {
  const features = [
    { name: "Knowledge base / wiki", cabinet: true, obsidian: true, notion: true, paperclip: false, glean: "partial", dust: false },
    { name: "Markdown files on disk", cabinet: true, obsidian: true, notion: false, paperclip: false, glean: false, dust: false },
    { name: "Self-hosted / local-first", cabinet: true, obsidian: true, notion: false, paperclip: true, glean: "partial", dust: "partial" },
    { name: "AI agent orchestration", cabinet: true, obsidian: false, notion: "partial", paperclip: true, glean: true, dust: true },
    { name: "Agent org chart / hierarchy", cabinet: true, obsidian: false, notion: false, paperclip: true, glean: false, dust: false },
    { name: "Agent heartbeats / scheduling", cabinet: true, obsidian: false, notion: false, paperclip: true, glean: "partial", dust: "partial" },
    { name: "Agent budget controls", cabinet: "partial", obsidian: false, notion: false, paperclip: true, glean: false, dust: false },
    { name: "Embedded HTML apps", cabinet: true, obsidian: false, notion: false, paperclip: false, glean: false, dust: false },
    { name: "Web terminal (xterm.js)", cabinet: true, obsidian: false, notion: false, paperclip: false, glean: false, dust: false },
    { name: "WYSIWYG editor", cabinet: true, obsidian: true, notion: true, paperclip: false, glean: false, dust: false },
    { name: "PDF / CSV viewing & editing", cabinet: true, obsidian: "partial", notion: false, paperclip: false, glean: false, dust: false },
    { name: "Git-backed version history", cabinet: true, obsidian: "partial", notion: "partial", paperclip: false, glean: false, dust: false },
    { name: "Internal team chat", cabinet: true, obsidian: false, notion: false, paperclip: "partial", glean: false, dust: false },
    { name: "Mission / task system", cabinet: true, obsidian: false, notion: true, paperclip: true, glean: false, dust: false },
    { name: "Linked Git repos", cabinet: true, obsidian: false, notion: false, paperclip: false, glean: "partial", dust: "partial" },
    { name: "Audit logs", cabinet: "partial", obsidian: false, notion: false, paperclip: true, glean: true, dust: "partial" },
    { name: "No database required", cabinet: true, obsidian: true, notion: false, paperclip: false, glean: false, dust: false },
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
            <th className="text-center py-3 px-4 font-medium text-text-tertiary">Glean</th>
            <th className="text-center py-3 px-4 font-medium text-text-tertiary">Dust</th>
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
              <td className="py-3 px-4">{renderIcon(f.glean)}</td>
              <td className="py-3 px-4">{renderIcon(f.dust)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-bg">
      <SiteNavbar />

      {/* ─── Comparison Table ─── */}
      <section id="compare" className="py-24 bg-bg">
        <div className="max-w-5xl mx-auto px-6">
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
                Paperclip is excellent at agent orchestration: org charts,
                budgets, audit logs. But it has no knowledge base, no editor, no
                content layer. Cabinet gives your agents a brain to read and
                write to, plus HTML apps, a terminal, and a full wiki.
              </p>
            </div>
            <div className="border border-border rounded-xl p-6 bg-bg-card">
              <h3 className="font-display text-lg mb-3 flex items-center gap-2 text-text-primary">
                <Star className="w-4 h-4 text-accent" /> vs Glean
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body-serif">
                Glean is enterprise AI search. It indexes your existing apps
                and answers questions across them. But it&apos;s a cloud search
                layer: no files you own, no editor, no embedded apps, no
                terminal. Cabinet is where knowledge is authored and lives, not
                just searched.
              </p>
            </div>
            <div className="border border-border rounded-xl p-6 bg-bg-card">
              <h3 className="font-display text-lg mb-3 flex items-center gap-2 text-text-primary">
                <Star className="w-4 h-4 text-accent" /> vs Dust
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body-serif">
                Dust builds AI assistants on top of your company data through
                connectors. But your content stays locked in those other tools.
                There&apos;s no knowledge base you author in, no markdown on
                disk, no editor. Cabinet gives agents a file-based brain they
                read and write directly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
