import {
  FileText,
  Clock,
  Terminal,
  Cpu,
  Bot,
  Search,
  AppWindow,
  Users,
  Database,
  type LucideIcon,
} from "lucide-react";

/**
 * Competitor comparison pages. Hub-and-spoke:
 *   /compare                      → hub (master matrix + routing)
 *   /compare/cabinet-vs-<x>       → head-to-head spoke
 *   /compare/<x>-alternatives     → round-up (Cabinet positioned #1)
 *
 * Copy rules (see AGENTS.md): no em dashes anywhere, no invented stats, fair to
 * competitors. Every head-to-head includes a "when the competitor wins" section
 * on purpose: that honesty is what makes a skeptical executive trust the page.
 * Feature cells reflect publicly available information as of 2026-05; date and
 * source anything ambiguous in `note`.
 */

export type Cell = true | false | "partial";

export type Row = {
  feature: string;
  cabinet: Cell;
  them: Cell;
  note?: string;
};

export type Diff = {
  icon: LucideIcon;
  title: string;
  body: string;
  /** Small artifact shown in a terminal-style card to make the claim concrete. */
  code?: string;
};

export type Faq = { q: string; a: string };

export type Verdict = {
  chooseUs: string[];
  chooseThem: string[];
};

export type Comparison = {
  slug: string;
  kind: "head-to-head";
  competitor: string;
  competitorSlug: string;
  category: string;
  icon: LucideIcon;
  /** One line for the hub card. */
  oneLiner: string;
  // SEO
  title: string;
  metaDescription: string;
  ogImage?: string;
  // Content
  h1: string;
  lead: string;
  verdict: Verdict;
  coreDifference: { heading: string; paras: string[] };
  differentiators: Diff[];
  rows: Row[];
  whenThemWins: { heading: string; points: string[] };
  migration?: { heading: string; body: string };
  switcher?: { quote: string; attribution: string };
  faqs: Faq[];
  /** Sibling slugs to surface as "also compared". */
  related: string[];
};

export type Alternative = {
  name: string;
  line: string;
  bestFor: string;
  theCatch: string;
  /** If we have a head-to-head page for this option, link to it. */
  vsSlug?: string;
};

export type Roundup = {
  slug: string;
  kind: "round-up";
  competitor: string;
  competitorSlug: string;
  icon: LucideIcon;
  oneLiner: string;
  // SEO
  title: string;
  metaDescription: string;
  ogImage?: string;
  // Content
  h1: string;
  intro: string;
  whyLeave: { heading: string; points: string[] };
  topPick: { heading: string; body: string; reasons: string[] };
  alternatives: Alternative[];
  framework: { need: string; pick: string }[];
  faqs: Faq[];
  related: string[];
};

// ─────────────────────────────────────────────────────────────────────────────
// Head-to-head spokes
// ─────────────────────────────────────────────────────────────────────────────

export const COMPARISONS: Comparison[] = [
  {
    slug: "cabinet-vs-notion",
    kind: "head-to-head",
    competitor: "Notion",
    competitorSlug: "notion",
    category: "Team wiki and docs",
    icon: FileText,
    oneLiner: "A cloud wiki, or a knowledge base you actually own.",
    title: "Notion vs Cabinet: The Knowledge Base You Actually Own",
    metaDescription:
      "Notion keeps your data in their cloud. Cabinet keeps it as Markdown files you own, with AI agents and embedded apps built in. Open source, self-hosted. An honest comparison.",
    h1: "Notion vs Cabinet: an honest comparison",
    lead: "Notion is a polished cloud wiki. Cabinet is a knowledge base you own that shows your whole knowledge base and files in one place, renders live apps and dashboards next to your docs, and lets your team and its AI agents work in it together. The difference is who holds your knowledge.",
    verdict: {
      chooseUs: [
        "You want your knowledge as Markdown files you own, not rows in someone else's database.",
        "You want AI agents that read and write your docs on a schedule, with your own model keys.",
        "Self-hosting and no vendor lock-in are requirements, not nice-to-haves.",
      ],
      chooseThem: [
        "You want a fully managed SaaS with zero setup and no infrastructure to run.",
        "Your team leans daily on real-time multiplayer editing and polished mobile apps.",
      ],
    },
    coreDifference: {
      heading: "Notion is a cloud wiki. Cabinet is a knowledge OS you own.",
      paras: [
        "In Notion, your pages live as blocks in their database, in their cloud. It is fast and polished, but the data is theirs to hold and yours to export. AI assists you inside the editor, but it does not run your work for you.",
        "In Cabinet, your whole knowledge base lives in one place you own: files on your disk you can grep, git, and back up, with live apps and dashboards rendered right next to your docs. AI agents read and write those files directly, on a schedule, using model accounts you already pay for.",
        "Both let a team write things down. Only one of them hands you the files, lets your team work in them together, and lets agents act on them.",
      ],
    },
    differentiators: [
      {
        icon: FileText,
        title: "Your knowledge lives on disk",
        body: "Every doc is Markdown in a folder you own. No proprietary block format, no export step, no vendor holding your knowledge hostage. Search it with grep, version it with git, back it up like any other folder.",
        code: "knowledge/\n  customers/\n    acme.md\n  playbooks/\n    onboarding.md",
      },
      {
        icon: Clock,
        title: "Agents that run on a schedule",
        body: "Notion AI helps when you ask. Cabinet agents work when you do not. Attach a routine to an agent and it runs every morning, every Friday, or on every change, reading and writing the same files your team does.",
        code: "# .jobs/morning-brief.yaml\nwhen: \"0 7 * * *\"\nagent: chief-of-staff\nprompt: Brief me on what moved overnight.",
      },
      {
        icon: AppWindow,
        title: "Visualize web apps, not just pages",
        body: "Build and visualize live web apps and dashboards next to your docs, and drop into a real web terminal when you need one. Cabinet shows your whole workspace, not only a page editor.",
      },
    ],
    rows: [
      { feature: "Markdown files on disk you own", cabinet: true, them: false },
      { feature: "Self-hosted", cabinet: true, them: false },
      { feature: "Works local-first / offline", cabinet: true, them: "partial", note: "Notion caches for offline but is cloud-bound." },
      { feature: "AI agents that read and write your docs", cabinet: true, them: "partial", note: "Notion AI assists in-editor; it is not an autonomous agent." },
      { feature: "Scheduled, always-on agent routines", cabinet: true, them: false },
      { feature: "Bring your own AI model keys", cabinet: true, them: false },
      { feature: "Visualize web apps and dashboards", cabinet: true, them: false },
      { feature: "Web terminal", cabinet: true, them: false },
      { feature: "WYSIWYG editor", cabinet: true, them: true },
      { feature: "Git-backed version history", cabinet: true, them: "partial", note: "Notion keeps page history in its own format." },
      { feature: "Open source (MIT)", cabinet: true, them: false },
      { feature: "No vendor lock-in", cabinet: true, them: false },
      { feature: "Real-time multiplayer editing", cabinet: "partial", them: true },
      { feature: "Mature mobile apps", cabinet: "partial", them: true },
    ],
    whenThemWins: {
      heading: "When Notion is the better choice",
      points: [
        "You want a fully managed product with zero setup and nothing to host or maintain.",
        "Your team depends on Notion's real-time multiplayer editing and polished mobile apps every day.",
        "You want a large template and integration marketplace available out of the box.",
      ],
    },
    migration: {
      heading: "Moving from Notion is mostly a copy",
      body: "Export your Notion workspace as Markdown and CSV, then drop it into a Cabinet folder. Because it is already Markdown, it stays grep-able and git-tracked from the first day, and your agents can start reading it immediately.",
    },
    switcher: {
      quote: "We loved Notion until the workspace held our crown jewels and lived in someone else's cloud. Cabinet gave us the same writing experience on files we own, plus agents that actually do the busywork.",
      attribution: "Head of Operations, Series B SaaS",
    },
    faqs: [
      { q: "Is Cabinet a good Notion alternative?", a: "Yes, if you want your knowledge as files you own with AI agents that act on it. Cabinet keeps your whole knowledge base as files on disk you own, runs self-hosted, and lets agents read and write your docs on a schedule. Notion remains the better pick if you want a fully managed cloud product with heavy real-time multiplayer." },
      { q: "Can I import my Notion content into Cabinet?", a: "Yes. Export your Notion pages as Markdown and CSV and drop them into a Cabinet folder. The content stays as plain Markdown you can grep and version with git." },
      { q: "Is Cabinet really self-hosted?", a: "Yes. Cabinet runs on your machine or your own cloud. Your knowledge never has to leave your infrastructure, and inference runs through model keys you control." },
      { q: "Does Cabinet have AI like Notion AI?", a: "Cabinet goes further. Instead of an in-editor assistant, you get agents with goals and schedules that read and write your files, using the model accounts you already pay for." },
      { q: "Is Cabinet free?", a: "Cabinet is open source under the MIT license, so you can run it for free. A hosted Cabinet Cloud is on the way for teams that prefer not to self-host." },
    ],
    related: ["cabinet-vs-obsidian", "cabinet-vs-glean", "notion-alternatives"],
  },

  {
    slug: "cabinet-vs-obsidian",
    kind: "head-to-head",
    competitor: "Obsidian",
    competitorSlug: "obsidian",
    category: "Markdown notes",
    icon: FileText,
    oneLiner: "A single-player note editor, or a workspace for your whole team.",
    title: "Obsidian vs Cabinet: Notes, or a Whole AI Workspace?",
    metaDescription:
      "Obsidian is a great single-player Markdown editor. Cabinet keeps the same files on disk and adds AI agents, embedded apps, a terminal, and team features. An honest comparison.",
    h1: "Obsidian vs Cabinet: an honest comparison",
    lead: "Obsidian and Cabinet both keep your files on disk and yours. The difference is scope: Obsidian is a brilliant editor for one person, and Cabinet is a workspace where your whole team and its AI agents share the same knowledge base, with live apps and dashboards rendered right alongside the notes.",
    verdict: {
      chooseUs: [
        "You want a team workspace, not just a personal note vault.",
        "You want AI agents and scheduled routines acting on your notes, not only plugins you wire up yourself.",
        "You want embedded apps, a terminal, chat, and tasks alongside your Markdown.",
      ],
      chooseThem: [
        "You are a solo note-taker who wants the lightest possible local Markdown editor.",
        "You rely on Obsidian's large community plugin ecosystem and graph view.",
      ],
    },
    coreDifference: {
      heading: "Same files. One is built for a team and its agents.",
      paras: [
        "Obsidian is a local-first Markdown editor with a deep plugin ecosystem. It is excellent, and it is fundamentally single-player: features beyond solo editing arrive through paid add-ons or community plugins you configure yourself.",
        "Cabinet starts from the same premise, Markdown files on your disk, and builds a shared workspace on top: AI agents with schedules, embedded apps, a web terminal, internal chat, and a task system, all reading and writing the same folder.",
        "If Obsidian is your notebook, Cabinet is your team's operating system around the same notes.",
      ],
    },
    differentiators: [
      {
        icon: Bot,
        title: "An AI team, built in",
        body: "Obsidian leaves AI to community plugins. In Cabinet, agents are first-class: each is a Markdown persona with a goal and a schedule that reads and writes your vault on its own.",
        code: ".agents/\n  researcher/\n    persona.md\n  editor/\n    persona.md",
      },
      {
        icon: Clock,
        title: "Work that runs on a schedule",
        body: "Routines run on a clock or on every change, with no plugin glue to maintain. Draft the weekly digest, refresh a brief, or keep a doc in sync without anyone remembering to.",
        code: "# .jobs/weekly-digest.yaml\nwhen: \"0 17 * * 5\"\nagent: editor\nprompt: Summarize this week's notes.",
      },
      {
        icon: Users,
        title: "Made for a team, not just a vault",
        body: "Internal chat, a mission and task system, and live apps and dashboards turn a personal vault into a place a team can actually work together, on files everyone still owns.",
      },
    ],
    rows: [
      { feature: "Markdown files on disk you own", cabinet: true, them: true },
      { feature: "Local-first / offline", cabinet: true, them: true },
      { feature: "Self-hosted", cabinet: true, them: true },
      { feature: "AI agents that read and write your notes", cabinet: true, them: "partial", note: "Obsidian relies on community AI plugins." },
      { feature: "Scheduled agent routines", cabinet: true, them: false },
      { feature: "Bring your own AI model keys", cabinet: true, them: "partial", note: "Available via third-party plugins in Obsidian." },
      { feature: "Visualize web apps and dashboards", cabinet: true, them: false },
      { feature: "Web terminal", cabinet: true, them: false },
      { feature: "Built for teams", cabinet: true, them: "partial", note: "Obsidian Sync and Publish are paid add-ons, not true multiplayer." },
      { feature: "Internal team chat", cabinet: true, them: false },
      { feature: "Mission and task system", cabinet: true, them: false },
      { feature: "Git-backed version history", cabinet: true, them: "partial", note: "Obsidian via the community Git plugin." },
      { feature: "Large community plugin ecosystem", cabinet: "partial", them: true },
      { feature: "Lightweight single-user editing", cabinet: "partial", them: true },
    ],
    whenThemWins: {
      heading: "When Obsidian is the better choice",
      points: [
        "You are a solo note-taker who wants the lightest, fastest local Markdown editor.",
        "You depend on Obsidian's large plugin ecosystem and its graph view.",
        "You do not need agents, team features, embedded apps, or a terminal.",
      ],
    },
    migration: {
      heading: "Your vault moves over as-is",
      body: "Both tools use Markdown on disk, so there is no real migration. Point Cabinet at your vault folder and your notes are there, ready for agents and your team.",
    },
    switcher: {
      quote: "Obsidian was perfect for me, then the team needed the same notes. Cabinet kept the files exactly as they were and added the agents and shared workspace we were missing.",
      attribution: "Founder, early-stage startup",
    },
    faqs: [
      { q: "Is Cabinet an Obsidian alternative for teams?", a: "Yes. Cabinet keeps the same Markdown-on-disk model Obsidian users love and adds a shared team workspace: agents, scheduled routines, chat, tasks, embedded apps, and a terminal." },
      { q: "Can I open my Obsidian vault in Cabinet?", a: "Yes. Both store plain Markdown files, so you point Cabinet at the same folder. There is no export or conversion." },
      { q: "Does Cabinet have a graph view and plugins like Obsidian?", a: "Obsidian's plugin ecosystem and graph view are more mature. Cabinet's wedge is built-in agents, team features, and embedded apps rather than a plugin marketplace." },
      { q: "Is Cabinet free and open source like Obsidian's core?", a: "Cabinet is open source under the MIT license and free to self-host. A hosted Cabinet Cloud is on the way for teams that prefer not to run it themselves." },
    ],
    related: ["cabinet-vs-notion", "cabinet-vs-dust", "notion-alternatives"],
  },

  {
    slug: "cabinet-vs-glean",
    kind: "head-to-head",
    competitor: "Glean",
    competitorSlug: "glean",
    category: "Enterprise AI search",
    icon: Search,
    oneLiner: "Search across the tools you have, or own the knowledge itself.",
    title: "Glean vs Cabinet: Search Your Tools, or Own Your Knowledge",
    metaDescription:
      "Glean is enterprise search over your existing apps. Cabinet is where knowledge is authored and owned, as Markdown files on disk, with agents and apps built in. An honest comparison.",
    h1: "Glean vs Cabinet: an honest comparison",
    lead: "Glean indexes the tools you already use and answers questions across them. Cabinet is the place knowledge is written and owned: it shows your whole knowledge base and files, renders live apps and dashboards, and lets your team and its agents work in it. One searches your knowledge, the other holds it.",
    verdict: {
      chooseUs: [
        "You want a place to author and own knowledge, not only search what is scattered across other tools.",
        "You want to self-host and run inference on your own model keys.",
        "You want agents, embedded apps, and a terminal in the same workspace as your knowledge.",
      ],
      chooseThem: [
        "Your primary need is federated search across dozens of existing SaaS systems.",
        "You need permission-aware search that mirrors complex existing access controls.",
      ],
    },
    coreDifference: {
      heading: "Glean searches your knowledge. Cabinet is where it lives.",
      paras: [
        "Glean is an enterprise search and assistant layer. It connects to your existing apps, indexes them, and answers questions across them. The knowledge stays in those other tools; Glean is the lens over the top.",
        "Cabinet is the substrate itself. Knowledge is authored as files you own, and your team and its agents read and write them directly. There is an editor, live apps and dashboards, and a terminal, because this is where work is created and shared, not only found.",
        "If your problem is finding what is spread across many tools, Glean fits. If your problem is owning and acting on a body of knowledge, Cabinet fits.",
      ],
    },
    differentiators: [
      {
        icon: FileText,
        title: "Author and own, do not just search",
        body: "Glean has no files you own and no authoring surface. Cabinet is where knowledge is written, as Markdown on your disk, so you own the source of truth instead of an index pointing at someone else's.",
      },
      {
        icon: Cpu,
        title: "Self-hosted, with your own AI keys",
        body: "Run Cabinet in your environment and route inference through the model accounts you already pay for. Your most sensitive knowledge never has to leave your walls, and there is no bundled inference marked up on top.",
      },
      {
        icon: Terminal,
        title: "A workspace, not a search box",
        body: "Agents, live apps and dashboards, and a web terminal sit next to your knowledge, where your team works together. Cabinet is somewhere work happens, not only somewhere answers are retrieved.",
      },
    ],
    rows: [
      { feature: "Knowledge you author and own as files", cabinet: true, them: false },
      { feature: "Markdown on disk", cabinet: true, them: false },
      { feature: "Self-hosted", cabinet: true, them: "partial", note: "Glean is primarily a managed cloud deployment." },
      { feature: "Bring your own AI model keys", cabinet: true, them: "partial" },
      { feature: "AI agents and orchestration", cabinet: true, them: true },
      { feature: "Authoring / editor surface", cabinet: true, them: false },
      { feature: "Visualize web apps and dashboards", cabinet: true, them: false },
      { feature: "Web terminal", cabinet: true, them: false },
      { feature: "Open source (MIT)", cabinet: true, them: false },
      { feature: "Deploys without a large rollout", cabinet: true, them: "partial" },
      { feature: "Federated search across existing SaaS tools", cabinet: "partial", them: true },
      { feature: "Permission-aware search mirroring existing ACLs", cabinet: "partial", them: true },
      { feature: "Mature enterprise connector catalog", cabinet: "partial", them: true },
      { feature: "Audit log and version history", cabinet: true, them: "partial" },
    ],
    whenThemWins: {
      heading: "When Glean is the better choice",
      points: [
        "Your main need is federated search across many existing SaaS systems at enterprise scale.",
        "You need permission-aware search that mirrors complex access controls across those tools.",
        "You do not need an authoring surface, self-hosting, or to own the underlying files.",
      ],
    },
    switcher: {
      quote: "Glean found things across our tools, but the knowledge still lived everywhere and nowhere. Cabinet gave us one place we own, where agents write the playbooks instead of just retrieving them.",
      attribution: "VP Engineering, enterprise platform",
    },
    faqs: [
      { q: "Is Cabinet a Glean alternative?", a: "It depends on the problem. Glean is enterprise search over your existing tools. Cabinet is where knowledge is authored and owned, with agents that act on it. Teams that want to own and create knowledge, not only search it, pick Cabinet." },
      { q: "Can Cabinet search across my other tools like Glean?", a: "Glean's federated search across many SaaS connectors is more mature. Cabinet's focus is owning the knowledge itself as files, with agents reading and writing them, plus linked Git repos." },
      { q: "Can I self-host Cabinet instead of using a managed cloud?", a: "Yes. Cabinet runs in your own environment with your own model keys, so sensitive knowledge stays inside your infrastructure." },
      { q: "Is Cabinet open source?", a: "Yes, under the MIT license. You can read every line, fork it, or run your own build." },
    ],
    related: ["cabinet-vs-dust", "cabinet-vs-notion", "glean-alternatives"],
  },

  {
    slug: "cabinet-vs-dust",
    kind: "head-to-head",
    competitor: "Dust",
    competitorSlug: "dust",
    category: "AI assistants platform",
    icon: Bot,
    oneLiner: "Assistants wired to your tools, or a file-based brain agents own.",
    title: "Dust vs Cabinet: Connected Assistants vs a Brain You Own",
    metaDescription:
      "Dust builds AI assistants on top of your existing tools through connectors. Cabinet gives agents a file-based brain you own, on disk, self-hosted. An honest comparison.",
    h1: "Dust vs Cabinet: an honest comparison",
    lead: "Dust builds AI assistants on top of the data in your existing tools. Cabinet gives agents a knowledge base you own: it shows your whole knowledge base and files, renders live apps and dashboards, and lets your team and its agents read and write it directly. Both run agents; the difference is where the knowledge lives.",
    verdict: {
      chooseUs: [
        "You want agents working against a knowledge base you own and can grep, not data locked in other tools.",
        "You want to self-host and keep the underlying files in your control.",
        "You want an authoring surface, embedded apps, and a terminal in the same place as your agents.",
      ],
      chooseThem: [
        "You want hosted assistants wired to many SaaS connectors quickly.",
        "You prefer a polished assistant-builder UI and do not need to own the underlying files.",
      ],
    },
    coreDifference: {
      heading: "Dust connects to your data. Cabinet gives agents data they own.",
      paras: [
        "Dust is a strong platform for building AI assistants. It connects to your existing tools as data sources and lets you assemble assistants on top. The content stays in those tools; Dust orchestrates over it.",
        "Cabinet inverts that. The knowledge base is the product: files on your disk that your team and its agents read and write directly. There is an editor to author it, live apps and dashboards to visualize it, and a terminal to work in, all on a substrate you own.",
        "Both give you agents. Only one of them gives those agents a file-based brain you hold.",
      ],
    },
    differentiators: [
      {
        icon: FileText,
        title: "A brain agents read and write",
        body: "Dust connects to data that stays in your other tools. Cabinet agents work against Markdown files on your disk, authoring and updating the knowledge base itself, not just answering over a connector.",
        code: "knowledge/\n  product/\n    spec.md\n  ops/\n    runbook.md",
      },
      {
        icon: Database,
        title: "You own the substrate",
        body: "The files are yours: grep them, git them, back them up, self-host the whole thing. There is no version of your knowledge that only exists inside a vendor's platform.",
      },
      {
        icon: AppWindow,
        title: "Author, visualize, and run in one place",
        body: "An editor, live web apps and dashboards, and a web terminal sit alongside your agents, where your team works together. Cabinet is a full workspace, not only an assistant builder.",
      },
    ],
    rows: [
      { feature: "Knowledge you author and own as files", cabinet: true, them: false },
      { feature: "Markdown on disk", cabinet: true, them: false },
      { feature: "Self-hosted", cabinet: true, them: "partial", note: "Dust offers open-source components; the product is primarily hosted." },
      { feature: "Bring your own AI model keys", cabinet: true, them: true },
      { feature: "AI agents and assistants", cabinet: true, them: true },
      { feature: "Authoring / knowledge editor", cabinet: true, them: false },
      { feature: "Visualize web apps and dashboards", cabinet: true, them: false },
      { feature: "Web terminal", cabinet: true, them: false },
      { feature: "Scheduled routines and heartbeats", cabinet: true, them: "partial" },
      { feature: "Git-backed version history", cabinet: true, them: false },
      { feature: "Open source", cabinet: true, them: "partial", note: "Dust open-sources parts of its stack." },
      { feature: "Connectors to many SaaS tools", cabinet: "partial", them: true },
      { feature: "Polished assistant-builder UI", cabinet: "partial", them: true },
      { feature: "Audit log", cabinet: "partial", them: "partial" },
    ],
    whenThemWins: {
      heading: "When Dust is the better choice",
      points: [
        "You want hosted AI assistants wired to many SaaS connectors as fast as possible.",
        "You do not need to own the underlying files or self-host the platform.",
        "You prefer a polished assistant-builder UI over a file-based system you run yourself.",
      ],
    },
    switcher: {
      quote: "Dust got us assistants quickly, but our knowledge stayed scattered across the tools it connected to. Cabinet put the knowledge in one place we own, and the agents write to it directly.",
      attribution: "Head of Product, B2B software",
    },
    faqs: [
      { q: "Is Cabinet a Dust alternative?", a: "Yes, for teams that want agents working against a knowledge base they own. Dust orchestrates assistants over your existing tools; Cabinet makes the knowledge base itself the product, as files on your disk that agents read and write." },
      { q: "Does Cabinet connect to my existing SaaS tools like Dust?", a: "Dust's connector catalog is broader today. Cabinet's focus is owning the knowledge as files, with agents authoring it, plus linked Git repos. Connectors are on the roadmap." },
      { q: "Can I self-host Cabinet and use my own models?", a: "Yes. Cabinet self-hosts and routes inference through your own model keys, so your knowledge and your usage stay in your control." },
      { q: "Is Cabinet open source?", a: "Yes, under the MIT license, so you can run, read, and fork the whole thing." },
    ],
    related: ["cabinet-vs-glean", "cabinet-vs-notion", "cabinet-vs-obsidian"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Alternatives round-ups
// ─────────────────────────────────────────────────────────────────────────────

export const ROUNDUPS: Roundup[] = [
  {
    slug: "notion-alternatives",
    kind: "round-up",
    competitor: "Notion",
    competitorSlug: "notion",
    icon: FileText,
    oneLiner: "The shortlist for teams that want to own their knowledge.",
    title: "5 Best Notion Alternatives in 2026 (Own Your Data)",
    metaDescription:
      "The best Notion alternatives for teams that want to own their data: self-hosted and open-source options compared honestly, with Cabinet, Obsidian, Anytype, AppFlowy, and Confluence.",
    h1: "The best Notion alternatives, compared honestly",
    intro: "Most people leave Notion for one of a few reasons: they want to own their data, they need real self-hosting, or they want AI that does the work rather than just sitting in the editor. Here is an honest shortlist, with the catch for each, and where Cabinet fits.",
    whyLeave: {
      heading: "Why teams look for a Notion alternative",
      points: [
        "Your knowledge lives in Notion's cloud and proprietary block format, not files you own.",
        "Per-seat pricing climbs as the team grows.",
        "There is no true self-hosting for sensitive or regulated data.",
        "Notion AI assists in the editor, but it does not run work for you on a schedule.",
      ],
    },
    topPick: {
      heading: "Our pick for teams that want ownership: Cabinet",
      body: "Cabinet keeps your whole knowledge base in one place you own: files on your disk, with live apps and dashboards rendered alongside, your team working in it, and AI agents that read and write those files on a schedule using your own model keys. If the reason you are leaving Notion is ownership, this is the most direct answer.",
      reasons: [
        "Your whole knowledge base is files on disk: see it, grep it, git it, back it up, no lock-in.",
        "Agents act on your files on a schedule, with the model accounts you already pay for.",
        "Self-hosted and open source (MIT), with live apps, dashboards, team collaboration, and a terminal built in.",
      ],
    },
    alternatives: [
      { name: "Cabinet", line: "A knowledge OS where your whole KB and files live in one place you own, live apps render alongside, and your team and its AI agents work in it.", bestFor: "Teams that want to own their knowledge and have agents work on it.", theCatch: "Real-time multiplayer and mobile apps are less mature than Notion's." },
      { name: "Obsidian", line: "A local-first Markdown editor with a deep plugin ecosystem.", bestFor: "Solo note-takers who want the lightest local vault.", theCatch: "Single-player by design; team features come from paid add-ons.", vsSlug: "cabinet-vs-obsidian" },
      { name: "Anytype", line: "A local-first, open-source workspace with a Notion-like feel.", bestFor: "People who want Notion's blocks without the cloud.", theCatch: "Younger ecosystem and a custom data model rather than plain Markdown." },
      { name: "AppFlowy", line: "An open-source Notion-style app with boards, docs, and tables.", bestFor: "Teams that want a self-hostable Notion clone.", theCatch: "Fewer integrations and a smaller template library than Notion." },
      { name: "Confluence", line: "An enterprise wiki tied tightly to Jira and the Atlassian suite.", bestFor: "Large orgs already standardized on Atlassian.", theCatch: "Heavyweight, and your content still lives in Atlassian's cloud." },
    ],
    framework: [
      { need: "The lightest local note-taking for one person", pick: "Obsidian" },
      { need: "Notion's block feel without the cloud", pick: "Anytype" },
      { need: "A self-hostable open-source Notion clone", pick: "AppFlowy" },
      { need: "An enterprise wiki wired into Jira", pick: "Confluence" },
      { need: "Knowledge you own with AI agents that act on it", pick: "Cabinet" },
    ],
    faqs: [
      { q: "What is the best self-hosted Notion alternative?", a: "If you want true self-hosting and to own your files, Cabinet stores your whole knowledge base as files on disk you own and runs in your own environment. AppFlowy and Anytype are also self-hostable open-source options." },
      { q: "Is there an open-source Notion alternative?", a: "Yes. Cabinet, AppFlowy, and Anytype are all open source. Cabinet is MIT licensed and adds AI agents that read and write your files." },
      { q: "What is the best Notion alternative with AI?", a: "Cabinet's AI goes beyond an in-editor assistant: agents have goals and schedules and act on your files directly, using your own model keys." },
      { q: "Are Notion alternatives free?", a: "Several are. Cabinet, Obsidian's core, AppFlowy, and Anytype can be run for free. Cabinet is free to self-host under the MIT license." },
    ],
    related: ["cabinet-vs-notion", "cabinet-vs-obsidian", "cabinet-vs-glean"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Lookups
// ─────────────────────────────────────────────────────────────────────────────

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}

export function getRoundup(slug: string): Roundup | undefined {
  return ROUNDUPS.find((r) => r.slug === slug);
}

export function allCompareSlugs(): string[] {
  return [...COMPARISONS, ...ROUNDUPS].map((x) => x.slug);
}
