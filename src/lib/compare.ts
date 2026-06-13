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
  Workflow,
  Sparkles,
  BookOpen,
  Table,
  MessageSquare,
  ArrowRightLeft,
  Lock,
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

  {
    slug: "cabinet-vs-paperclip",
    kind: "head-to-head",
    competitor: "Paperclip",
    competitorSlug: "paperclip",
    category: "Agent orchestration",
    icon: Workflow,
    oneLiner: "Orchestrate agents, or give those agents a brain to work in.",
    title: "Paperclip vs Cabinet: Agents, Plus the Knowledge They Run On",
    metaDescription:
      "Paperclip orchestrates AI agents with org charts and budgets. Cabinet gives agents a knowledge base you own to read and write, plus a workspace your team shares. An honest comparison.",
    h1: "Paperclip vs Cabinet: an honest comparison",
    lead: "Paperclip is built to orchestrate AI agents: org charts, budgets, audit trails. Cabinet runs agents too, but gives them a knowledge base you own to read and write, with live apps, a terminal, and a place your team works together. One coordinates agents, the other gives them somewhere to think.",
    verdict: {
      chooseUs: [
        "You want agents working inside a knowledge base you own, not orchestrated in isolation.",
        "You want an editor, live apps, a terminal, and a team workspace around your agents, not only a control plane.",
        "Self-hosting and owning the files your agents produce are requirements.",
      ],
      chooseThem: [
        "Your only need is to coordinate a large fleet of agents, and you already have a knowledge system.",
        "You want the most granular agent budget and org-chart controls available today.",
      ],
    },
    coreDifference: {
      heading: "Paperclip coordinates agents. Cabinet gives them a brain.",
      paras: [
        "Paperclip is strong at the control plane for agents: hierarchies, budgets, scheduling, and audit logs. It is about managing a workforce of agents.",
        "Cabinet is the workspace those agents work in. Your whole knowledge base lives as files you own, agents read and write them directly, and your team sees the same knowledge base, live apps, and dashboards in one place.",
        "If Paperclip is the org chart, Cabinet is the office: the documents, the tools, and the shared space where the work actually lands.",
      ],
    },
    differentiators: [
      {
        icon: FileText,
        title: "A knowledge base agents own",
        body: "Paperclip coordinates agents but gives them no place to keep their work. Cabinet agents read and write files on your disk, so what they produce becomes a knowledge base you keep, not output that scatters.",
        code: "knowledge/\n  research/\n    market-scan.md\n  decisions/\n    q3-plan.md",
      },
      {
        icon: AppWindow,
        title: "A workspace, not just a control plane",
        body: "An editor, live web apps and dashboards, a web terminal, and team chat sit around your agents. Cabinet is where people and agents work side by side, not only where agents are scheduled.",
      },
      {
        icon: Cpu,
        title: "Self-hosted, bring your own AI",
        body: "Run Cabinet in your own environment and route inference through model accounts you already pay for. The agents and the knowledge they build stay on infrastructure you control.",
      },
    ],
    rows: [
      { feature: "Knowledge base agents read and write", cabinet: true, them: false },
      { feature: "AI agent orchestration", cabinet: true, them: true },
      { feature: "Agent org chart / hierarchy", cabinet: "partial", them: true },
      { feature: "Agent budget controls", cabinet: "partial", them: true },
      { feature: "Scheduled routines / heartbeats", cabinet: true, them: true },
      { feature: "Audit logs", cabinet: "partial", them: true },
      { feature: "Markdown files on disk you own", cabinet: true, them: false },
      { feature: "Visualize web apps and dashboards", cabinet: true, them: false },
      { feature: "Web terminal", cabinet: true, them: false },
      { feature: "Authoring / knowledge editor", cabinet: true, them: false },
      { feature: "Team collaboration workspace", cabinet: true, them: "partial" },
      { feature: "Self-hosted", cabinet: true, them: "partial" },
      { feature: "Bring your own AI model keys", cabinet: true, them: "partial" },
      { feature: "Open source (MIT)", cabinet: true, them: false },
    ],
    whenThemWins: {
      heading: "When Paperclip is the better choice",
      points: [
        "Your single need is orchestrating a large fleet of agents, and the knowledge already lives elsewhere.",
        "You need the most detailed budget, hierarchy, and audit controls for agents available today.",
        "You do not need an authoring surface, apps, or a shared team workspace.",
      ],
    },
    switcher: {
      quote: "Paperclip ran our agents well, but their output had nowhere to live. Cabinet gave the agents a knowledge base they write to, so the work compounds instead of scattering.",
      attribution: "Head of AI, scale-up",
    },
    faqs: [
      { q: "Is Cabinet a Paperclip alternative?", a: "For teams that want agents working inside a knowledge base they own, yes. Cabinet runs agents and gives them files to read and write, plus a workspace your team shares. Paperclip is the better fit if your only need is granular agent orchestration on top of an existing knowledge system." },
      { q: "Does Cabinet orchestrate agents like Paperclip?", a: "Cabinet runs agents with personas and schedules. Paperclip's org-chart, budget, and audit controls are more granular today. Cabinet's wedge is the knowledge base and workspace the agents act in." },
      { q: "Can I self-host Cabinet?", a: "Yes. Cabinet runs in your own environment with your own model keys, so the agents and the knowledge they build stay in your control." },
      { q: "Is Cabinet open source?", a: "Yes, under the MIT license. You can read every line, fork it, or run your own build." },
    ],
    related: ["cabinet-vs-dust", "cabinet-vs-glean", "cabinet-vs-notion"],
  },

  {
    slug: "cabinet-vs-mem",
    kind: "head-to-head",
    competitor: "Mem",
    competitorSlug: "mem",
    category: "AI notes",
    icon: Sparkles,
    oneLiner: "AI notes in the cloud, or a knowledge base you own with agents.",
    title: "Mem vs Cabinet: AI Notes in the Cloud, or a KB You Own",
    metaDescription:
      "Mem is an AI note-taking app in the cloud. Cabinet keeps your whole knowledge base as files you own, with agents that act on them and a workspace your team shares. An honest comparison.",
    h1: "Mem vs Cabinet: an honest comparison",
    lead: "Mem is a fast, AI-first note app that organizes your notes in the cloud. Cabinet keeps your whole knowledge base as files you own, renders live apps alongside them, and runs agents that read and write your work. One captures notes, the other is a workspace you control.",
    verdict: {
      chooseUs: [
        "You want to own your knowledge as files, not store notes in another company's cloud.",
        "You want agents that act on your knowledge on a schedule, not only AI that helps you write and recall.",
        "You want a shared team workspace with live apps and a terminal, not only personal notes.",
      ],
      chooseThem: [
        "You want a fast, polished personal note-capture app with zero setup.",
        "You do not need self-hosting, file ownership, or agents that run work.",
      ],
    },
    coreDifference: {
      heading: "Mem captures your notes. Cabinet is a workspace you own.",
      paras: [
        "Mem focuses on frictionless capture and AI recall: write quickly, let AI organize and resurface. It is a cloud product built around your personal notes.",
        "Cabinet is broader and owned. Your whole knowledge base and files live in one place you control, live apps and dashboards render alongside, your team works in it, and agents read and write the files on a schedule.",
        "Mem helps you remember. Cabinet helps your team and its agents do the work, on knowledge you keep.",
      ],
    },
    differentiators: [
      {
        icon: FileText,
        title: "Own your knowledge, do not rent it",
        body: "Mem keeps your notes in its cloud. Cabinet keeps your whole knowledge base as files on your disk, so you can grep it, git it, back it up, and self-host the lot.",
      },
      {
        icon: Bot,
        title: "Agents that act, not just recall",
        body: "Mem's AI helps you find and connect notes. Cabinet agents run on a schedule and write back: drafting, summarizing, and keeping your knowledge current on their own.",
      },
      {
        icon: Users,
        title: "A team workspace, not a personal app",
        body: "Cabinet is built for a team: shared knowledge, live apps and dashboards, a terminal, chat, and tasks, all on files everyone still owns.",
      },
    ],
    rows: [
      { feature: "Files on disk you own", cabinet: true, them: false },
      { feature: "Self-hosted", cabinet: true, them: false },
      { feature: "AI organization and recall", cabinet: "partial", them: true },
      { feature: "AI agents that act on your knowledge", cabinet: true, them: false },
      { feature: "Scheduled routines", cabinet: true, them: false },
      { feature: "Bring your own AI model keys", cabinet: true, them: false },
      { feature: "Visualize web apps and dashboards", cabinet: true, them: false },
      { feature: "Web terminal", cabinet: true, them: false },
      { feature: "Team collaboration workspace", cabinet: true, them: "partial" },
      { feature: "Fast personal capture", cabinet: "partial", them: true },
      { feature: "Mature mobile apps", cabinet: "partial", them: true },
      { feature: "Open source (MIT)", cabinet: true, them: false },
    ],
    whenThemWins: {
      heading: "When Mem is the better choice",
      points: [
        "You want a fast personal note app with strong AI capture and recall, and nothing to host.",
        "Mobile-first capture matters more than owning files or running agents.",
        "You do not need a shared team workspace or self-hosting.",
      ],
    },
    switcher: {
      quote: "Mem was great for catching thoughts, but our team's knowledge needed a home we owned. Cabinet kept the capture habit and added files we control plus agents that maintain them.",
      attribution: "Chief of Staff, startup",
    },
    faqs: [
      { q: "Is Cabinet a Mem alternative?", a: "Yes, for teams that want to own their knowledge as files and have agents act on it. Mem is the better fit if you want a fast personal note app in the cloud with strong AI recall." },
      { q: "Can I import my Mem notes into Cabinet?", a: "Export your notes as Markdown or text and drop them into a Cabinet folder, where they become files you own and can version with git." },
      { q: "Does Cabinet work on mobile like Mem?", a: "Mem's mobile capture is more mature. Cabinet's focus is an owned, self-hosted workspace with agents and live apps." },
      { q: "Is Cabinet open source?", a: "Yes, under the MIT license, and free to self-host." },
    ],
    related: ["cabinet-vs-notion", "cabinet-vs-obsidian", "notion-alternatives"],
  },

  {
    slug: "cabinet-vs-guru",
    kind: "head-to-head",
    competitor: "Guru",
    competitorSlug: "guru",
    category: "Knowledge management",
    icon: BookOpen,
    oneLiner: "A verified card wiki in the cloud, or a KB you own with agents.",
    title: "Guru vs Cabinet: A Verified Wiki, or Knowledge You Own",
    metaDescription:
      "Guru is a cloud knowledge base with verified cards and a browser extension. Cabinet keeps your whole knowledge base as files you own, with agents that maintain it and a workspace your team shares. An honest comparison.",
    h1: "Guru vs Cabinet: an honest comparison",
    lead: "Guru keeps knowledge in verified cards in the cloud, surfaced through a browser extension and AI answers. Cabinet keeps your whole knowledge base as files you own, with agents that keep it current and a workspace your team works in. One delivers answers, the other is where the knowledge is authored and owned.",
    verdict: {
      chooseUs: [
        "You want to own your knowledge as files, not store cards in a vendor's cloud.",
        "You want agents that keep docs current, not only human verification reminders.",
        "You want an authoring workspace with live apps and a terminal, not only a card layer in the browser.",
      ],
      chooseThem: [
        "Your main need is verified answers surfaced in a browser extension across support and sales tools.",
        "You want a managed cloud product with built-in verification workflows and do not need self-hosting.",
      ],
    },
    coreDifference: {
      heading: "Guru verifies cards. Cabinet owns the whole knowledge base.",
      paras: [
        "Guru is a knowledge layer: short, verified cards delivered where your team already works, with a verification cadence to keep them trusted. It lives in the cloud and connects to your tools.",
        "Cabinet is the substrate. Your whole knowledge base lives as files you own, agents draft and refresh them on a schedule, and your team sees the same knowledge base, live apps, and dashboards in one place.",
        "Guru is built to surface answers. Cabinet is built to own and produce the knowledge those answers come from.",
      ],
    },
    differentiators: [
      {
        icon: FileText,
        title: "Own the source, not just the cards",
        body: "Guru stores cards in its cloud. Cabinet keeps the whole knowledge base as files on your disk, so the source of truth is yours to grep, git, back up, and self-host.",
      },
      {
        icon: Clock,
        title: "Agents keep it current",
        body: "Guru relies on people verifying cards on a cadence. Cabinet agents draft and refresh documents on a schedule, so the knowledge stays current without a manual review queue.",
      },
      {
        icon: AppWindow,
        title: "A full workspace, not a browser layer",
        body: "An editor, live web apps and dashboards, a terminal, and team collaboration sit around your knowledge, instead of a card overlay on top of the tools you already use.",
      },
    ],
    rows: [
      { feature: "Knowledge you own as files", cabinet: true, them: false },
      { feature: "Self-hosted", cabinet: true, them: false },
      { feature: "AI answers over your knowledge", cabinet: true, them: true },
      { feature: "Agents that draft and maintain docs", cabinet: true, them: "partial" },
      { feature: "Verification workflows (trust, expiry)", cabinet: "partial", them: true },
      { feature: "Browser-extension delivery inside other tools", cabinet: false, them: true },
      { feature: "Scheduled routines", cabinet: true, them: "partial" },
      { feature: "Bring your own AI model keys", cabinet: true, them: false },
      { feature: "Visualize web apps and dashboards", cabinet: true, them: false },
      { feature: "Web terminal", cabinet: true, them: false },
      { feature: "Markdown files on disk", cabinet: true, them: false },
      { feature: "Open source (MIT)", cabinet: true, them: false },
    ],
    whenThemWins: {
      heading: "When Guru is the better choice",
      points: [
        "Your main need is verified answers delivered inside support, sales, and browser tools.",
        "You value Guru's verification workflows and do not need to own the underlying files.",
        "You want a managed cloud product and do not need self-hosting or agents that author docs.",
      ],
    },
    switcher: {
      quote: "Guru kept our answers verified, but the knowledge still lived in their cloud as cards. Cabinet gave us the source files we own, and agents that keep them current for us.",
      attribution: "Head of Enablement, SaaS company",
    },
    faqs: [
      { q: "Is Cabinet a Guru alternative?", a: "For teams that want to own and author their knowledge as files with agents maintaining it, yes. Guru is the better fit if your priority is verified answers delivered in a browser extension across your tools." },
      { q: "Does Cabinet deliver answers in other tools like Guru's extension?", a: "Guru's in-browser card delivery is its strength. Cabinet's focus is owning the knowledge base itself, with agents that author and refresh it and a workspace your team works in." },
      { q: "Can I self-host Cabinet?", a: "Yes, in your own environment with your own model keys, so sensitive knowledge stays inside your walls." },
      { q: "Is Cabinet open source?", a: "Yes, under the MIT license." },
    ],
    related: ["cabinet-vs-glean", "cabinet-vs-notion", "glean-alternatives"],
  },

  {
    slug: "cabinet-vs-coda",
    kind: "head-to-head",
    competitor: "Coda",
    competitorSlug: "coda",
    category: "Docs and tables",
    icon: Table,
    oneLiner: "Cloud docs that act like apps, or a KB you own that runs them.",
    title: "Coda vs Cabinet: Cloud Docs-as-Apps, or a KB You Own",
    metaDescription:
      "Coda turns docs into apps with tables and Packs in the cloud. Cabinet keeps your whole knowledge base as files you own, visualizes live web apps, and runs agents. An honest comparison.",
    h1: "Coda vs Cabinet: an honest comparison",
    lead: "Coda blends documents, tables, and integrations into cloud docs that behave like apps. Cabinet keeps your whole knowledge base as files you own, visualizes live web apps and dashboards alongside your docs, and runs agents that act on them. Both go beyond static pages, the difference is ownership and what your AI can do.",
    verdict: {
      chooseUs: [
        "You want to own your knowledge as files, not build docs inside a vendor's cloud.",
        "You want AI agents that read and write your work on a schedule, not only formulas and automations.",
        "You want self-hosting and bring-your-own-AI, with live apps and a terminal built in.",
      ],
      chooseThem: [
        "You want a polished cloud builder for interactive docs, relational tables, and no-code automations.",
        "You rely on Coda's Packs ecosystem and do not need self-hosting or file ownership.",
      ],
    },
    coreDifference: {
      heading: "Coda builds docs-as-apps in its cloud. Cabinet owns the KB and runs the apps.",
      paras: [
        "Coda is a powerful cloud builder: documents that combine text, relational tables, buttons, and Packs into interactive tools. The docs live in Coda's cloud.",
        "Cabinet keeps your whole knowledge base as files you own and visualizes live web apps and dashboards next to them, with agents reading and writing the files and a terminal when you need one.",
        "Coda makes a document feel like an app. Cabinet renders real apps over a knowledge base you keep, and puts agents to work on it.",
      ],
    },
    differentiators: [
      {
        icon: AppWindow,
        title: "Visualize real web apps over knowledge you own",
        body: "Coda builds app-like docs from its own blocks. Cabinet renders live web apps and dashboards over your files, so your knowledge base shows up as interactive views, not static text.",
      },
      {
        icon: FileText,
        title: "Own the files, not the cloud doc",
        body: "Coda docs live in Coda's cloud. Cabinet keeps everything as files on your disk you can grep, git, back up, and self-host.",
      },
      {
        icon: Bot,
        title: "Agents that act, not just automations",
        body: "Coda has AI and automations inside the doc. Cabinet agents run on a schedule across your whole knowledge base, reading and writing files with your own model keys.",
      },
    ],
    rows: [
      { feature: "Knowledge you own as files", cabinet: true, them: false },
      { feature: "Self-hosted", cabinet: true, them: false },
      { feature: "Interactive docs with relational tables", cabinet: "partial", them: true },
      { feature: "Render arbitrary web apps and dashboards", cabinet: true, them: "partial" },
      { feature: "AI agents that act on your knowledge", cabinet: true, them: "partial" },
      { feature: "Scheduled routines", cabinet: true, them: "partial" },
      { feature: "No-code automations and buttons", cabinet: "partial", them: true },
      { feature: "Packs / integration ecosystem", cabinet: "partial", them: true },
      { feature: "Bring your own AI model keys", cabinet: true, them: false },
      { feature: "Web terminal", cabinet: true, them: false },
      { feature: "Markdown files on disk", cabinet: true, them: false },
      { feature: "Open source (MIT)", cabinet: true, them: false },
    ],
    whenThemWins: {
      heading: "When Coda is the better choice",
      points: [
        "You want a polished cloud builder for interactive docs, relational tables, and no-code automations.",
        "You depend on Coda's Packs ecosystem and do not need to own the underlying files.",
        "Self-hosting and bring-your-own-AI are not requirements.",
      ],
    },
    switcher: {
      quote: "Coda let us build doc-apps fast, but everything lived in their cloud. Cabinet gave us files we own with live apps rendered over them, and agents doing the upkeep.",
      attribution: "Operations Lead, growth-stage company",
    },
    faqs: [
      { q: "Is Cabinet a Coda alternative?", a: "Yes, for teams that want to own their knowledge as files, visualize live apps over it, and have agents act on it. Coda is the better fit if you want a cloud builder for interactive docs and relational tables." },
      { q: "Can Cabinet do tables and interactive views like Coda?", a: "Coda's relational tables and no-code building blocks are more mature. Cabinet renders live web apps and dashboards over files you own, and runs agents on them." },
      { q: "Can I self-host Cabinet and use my own AI?", a: "Yes. Cabinet self-hosts and brings your own model keys across providers." },
      { q: "Is Cabinet open source?", a: "Yes, under the MIT license." },
    ],
    related: ["cabinet-vs-notion", "cabinet-vs-obsidian", "notion-alternatives"],
  },

  {
    slug: "cabinet-vs-microsoft-copilot",
    kind: "head-to-head",
    competitor: "Microsoft Copilot",
    competitorSlug: "microsoft-copilot",
    category: "Bundled enterprise AI",
    icon: Cpu,
    oneLiner: "AI bundled into Microsoft 365, or AI on a KB you own.",
    title: "Microsoft Copilot vs Cabinet: Bundled AI, or a KB You Own",
    metaDescription:
      "Microsoft 365 Copilot adds AI across Office in Microsoft's cloud. Cabinet is a knowledge base you own and self-host, with bring-your-own-AI and agents that act on your files. An honest comparison.",
    h1: "Microsoft Copilot vs Cabinet: an honest comparison",
    lead: "Microsoft 365 Copilot puts AI across Word, Excel, Outlook, and Teams, tied to your Microsoft Graph and cloud. Cabinet is a knowledge base you own and self-host, with bring-your-own-AI and agents that read and write your files. One is AI inside Microsoft's stack, the other is AI on infrastructure and knowledge you control.",
    verdict: {
      chooseUs: [
        "You want to own and self-host your knowledge, not deepen reliance on one vendor's cloud.",
        "You want bring-your-own-AI across providers, not a single bundled model.",
        "You want agents that persist work to files you keep, with org-wide ownership.",
      ],
      chooseThem: [
        "Your company runs on Microsoft 365 and you want AI inside the apps you already use.",
        "You want a fully managed assistant grounded in your existing Microsoft Graph and identity.",
      ],
    },
    coreDifference: {
      heading: "Copilot adds AI inside Microsoft. Cabinet is AI on a KB you own.",
      paras: [
        "Microsoft 365 Copilot is excellent if your work lives in Office and Teams: it reasons over your Microsoft Graph and drafts inside the apps. It is bundled, managed, and tied to Microsoft's cloud and model choices.",
        "Cabinet is independent and owned. Your whole knowledge base lives as files you control, you bring your own AI keys across providers, and agents read and write the files on a schedule. Self-host it anywhere.",
        "Copilot makes Microsoft smarter. Cabinet gives you an AI knowledge base that does not depend on one vendor.",
      ],
    },
    differentiators: [
      {
        icon: Lock,
        title: "Own and self-host your knowledge",
        body: "Copilot reasons over data in Microsoft's cloud. Cabinet keeps your knowledge base as files you own and run in your own environment, so your most sensitive material never has to leave your walls.",
      },
      {
        icon: Cpu,
        title: "Bring your own AI, any provider",
        body: "Copilot is tied to Microsoft's bundled model. Cabinet routes to the model accounts you already pay for, across providers, with no bundled inference marked up on top.",
      },
      {
        icon: FileText,
        title: "Knowledge as files, not locked in Graph",
        body: "Cabinet's knowledge is plain files you can grep, git, and back up, independent of any one suite, with agents that write back to them on a schedule.",
      },
    ],
    rows: [
      { feature: "Knowledge you own as files", cabinet: true, them: "partial", note: "Microsoft files live in OneDrive and SharePoint, in Microsoft's cloud." },
      { feature: "Self-hosted", cabinet: true, them: false },
      { feature: "Bring your own AI across providers", cabinet: true, them: false },
      { feature: "Agents that act on your files on a schedule", cabinet: true, them: "partial" },
      { feature: "Works without Microsoft 365", cabinet: true, them: false },
      { feature: "Deep Office and Teams integration", cabinet: false, them: true },
      { feature: "Grounded in enterprise identity and Graph", cabinet: "partial", them: true },
      { feature: "Visualize web apps and dashboards", cabinet: true, them: "partial" },
      { feature: "Web terminal", cabinet: true, them: false },
      { feature: "Markdown files on disk you own", cabinet: true, them: false },
      { feature: "Data not used to train models", cabinet: true, them: true },
      { feature: "Open source (MIT)", cabinet: true, them: false },
    ],
    whenThemWins: {
      heading: "When Microsoft Copilot is the better choice",
      points: [
        "Your organization runs on Microsoft 365 and you want AI inside Word, Excel, Outlook, and Teams.",
        "You want a managed assistant grounded in your existing Microsoft Graph and identity.",
        "Self-hosting, file ownership, and multi-provider AI are not priorities.",
      ],
    },
    switcher: {
      quote: "Copilot was great inside Office, but we wanted an AI knowledge base we owned and could self-host. Cabinet gave us that, with our own model keys instead of one bundled provider.",
      attribution: "IT Director, regulated industry",
    },
    faqs: [
      { q: "Is Cabinet a Microsoft Copilot alternative?", a: "For teams that want to own and self-host an AI knowledge base with bring-your-own-AI, yes. Copilot is the better fit if your work lives inside Microsoft 365 and you want AI in those apps." },
      { q: "Can Cabinet use models other than the bundled one?", a: "Yes. Cabinet brings your own keys across providers, so you choose the models and pay for inference directly." },
      { q: "Does Cabinet need Microsoft 365?", a: "No. Cabinet is independent of any suite and runs on its own." },
      { q: "Is my data used for training?", a: "No. Cabinet is self-hosted with your own keys, and your content is never used to train a model." },
    ],
    related: ["cabinet-vs-chatgpt-enterprise", "cabinet-vs-glean", "cabinet-vs-notion"],
  },

  {
    slug: "cabinet-vs-chatgpt-enterprise",
    kind: "head-to-head",
    competitor: "ChatGPT Enterprise",
    competitorSlug: "chatgpt-enterprise",
    category: "Enterprise AI assistant",
    icon: MessageSquare,
    oneLiner: "A hosted chat assistant, or a KB you own that agents work in.",
    title: "ChatGPT Enterprise vs Cabinet: Hosted Chat, or a KB You Own",
    metaDescription:
      "ChatGPT Enterprise is a hosted assistant on one provider's models. Cabinet is a knowledge base you own and self-host, with bring-your-own-AI and agents that persist work to files. An honest comparison.",
    h1: "ChatGPT Enterprise vs Cabinet: an honest comparison",
    lead: "ChatGPT Enterprise is a hosted assistant with strong models, admin controls, and your data kept out of training. Cabinet is a knowledge base you own and self-host, with bring-your-own-AI across providers and agents that write work to files you keep. One is a chat product, the other is a workspace you control.",
    verdict: {
      chooseUs: [
        "You want knowledge that persists as files you own, not chat history in a vendor's cloud.",
        "You want bring-your-own-AI across providers, not a single provider's models.",
        "You want scheduled agents and a team workspace, not only an interactive chat assistant.",
      ],
      chooseThem: [
        "You want the simplest path to one provider's latest models for your whole company, fully managed.",
        "You do not need self-hosting, file ownership, or multi-provider flexibility.",
      ],
    },
    coreDifference: {
      heading: "ChatGPT Enterprise is a chat product. Cabinet is a KB you own.",
      paras: [
        "ChatGPT Enterprise gives your company managed access to frontier models with admin controls and a promise not to train on your data. The work happens in chat, in the provider's cloud.",
        "Cabinet keeps your whole knowledge base as files you own, lets you bring model keys from any provider, and runs agents that read and write those files on a schedule, alongside live apps and a terminal.",
        "ChatGPT Enterprise answers questions. Cabinet turns the answers into a knowledge base your team and its agents keep building.",
      ],
    },
    differentiators: [
      {
        icon: FileText,
        title: "Work persists to files you own",
        body: "In a chat product, the output lives in threads. In Cabinet, agents write to files on your disk, so the work becomes a knowledge base you keep, grep, git, and back up.",
      },
      {
        icon: Cpu,
        title: "Bring your own AI, any provider",
        body: "ChatGPT Enterprise is one provider's models. Cabinet routes to whichever providers you choose, with your own keys, so you are not locked to a single model vendor.",
      },
      {
        icon: Users,
        title: "A workspace and agents, not just chat",
        body: "Cabinet gives a team a shared knowledge base, scheduled agents, live apps, and a terminal, not only an interactive assistant to ask questions of.",
      },
    ],
    rows: [
      { feature: "Knowledge persists as files you own", cabinet: true, them: false },
      { feature: "Self-hosted", cabinet: true, them: false },
      { feature: "Bring your own AI across providers", cabinet: true, them: false },
      { feature: "Scheduled agents that act on your files", cabinet: true, them: "partial" },
      { feature: "Shared team knowledge base", cabinet: true, them: "partial" },
      { feature: "Visualize web apps and dashboards", cabinet: true, them: "partial" },
      { feature: "Web terminal", cabinet: true, them: false },
      { feature: "Frontier model quality out of the box", cabinet: "partial", them: true },
      { feature: "Zero-setup managed service", cabinet: "partial", them: true },
      { feature: "Data not used for training", cabinet: true, them: true },
      { feature: "Markdown files on disk", cabinet: true, them: false },
      { feature: "Open source (MIT)", cabinet: true, them: false },
    ],
    whenThemWins: {
      heading: "When ChatGPT Enterprise is the better choice",
      points: [
        "You want the simplest managed access to one provider's frontier models for everyone, with admin controls.",
        "Chat is the primary interface and you do not need work to persist as files you own.",
        "Self-hosting and multi-provider AI are not requirements.",
      ],
    },
    switcher: {
      quote: "ChatGPT Enterprise answered questions well, but nothing it produced stayed put. Cabinet made the answers into a knowledge base we own, with agents that keep writing to it.",
      attribution: "VP Operations, mid-market company",
    },
    faqs: [
      { q: "Is Cabinet a ChatGPT Enterprise alternative?", a: "For teams that want an owned, self-hosted knowledge base with bring-your-own-AI and agents that persist work, yes. ChatGPT Enterprise is simpler if you only want managed chat on one provider's models." },
      { q: "Can Cabinet use OpenAI models?", a: "Yes, plus other providers, with your own keys. You are not locked to a single model vendor." },
      { q: "Does Cabinet keep my data private?", a: "Yes. Cabinet is self-hosted with your own keys, and your content is never used to train a model." },
      { q: "Is Cabinet open source?", a: "Yes, under the MIT license." },
    ],
    related: ["cabinet-vs-microsoft-copilot", "cabinet-vs-dust", "cabinet-vs-glean"],
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

  {
    slug: "glean-alternatives",
    kind: "round-up",
    competitor: "Glean",
    competitorSlug: "glean",
    icon: Search,
    oneLiner: "Enterprise AI tools that fit your ownership and cost needs.",
    title: "5 Best Glean Alternatives in 2026 (Own Your Knowledge)",
    metaDescription:
      "The best Glean alternatives for teams weighing cost, self-hosting, and ownership: Cabinet, Dust, Microsoft Copilot, Guru, and self-hosted search, compared honestly.",
    h1: "The best Glean alternatives, compared honestly",
    intro: "Teams evaluate Glean alternatives for a few reasons: enterprise pricing, limited self-hosting, or the realization that they want to own and author knowledge, not only search what is scattered across other tools. Here is an honest shortlist, and where Cabinet fits.",
    whyLeave: {
      heading: "Why teams look for a Glean alternative",
      points: [
        "Glean is a premium enterprise product, with enterprise pricing to match.",
        "It searches the tools you already have; it does not give you knowledge you own and author.",
        "Self-hosting and data residency can be constrained for sensitive environments.",
        "You may want agents that produce and maintain knowledge, not only retrieve it.",
      ],
    },
    topPick: {
      heading: "Our pick for teams that want ownership: Cabinet",
      body: "Cabinet keeps your whole knowledge base as files you own, runs self-hosted with your own model keys, and puts agents to work reading and writing those files. If the reason you are looking past Glean is ownership and control, this is the most direct answer.",
      reasons: [
        "You own and author the knowledge as files, not just search someone else's index.",
        "Self-hosted with bring-your-own-AI, so sensitive material stays in your environment.",
        "Agents maintain the knowledge base on a schedule, and live apps render over it.",
      ],
    },
    alternatives: [
      { name: "Cabinet", line: "A knowledge base you own and author, with agents acting on it and live apps over it.", bestFor: "Teams that want to own knowledge and self-host, not only search it.", theCatch: "Federated search across many existing SaaS tools is less mature than Glean's." },
      { name: "Dust", line: "AI assistants assembled over your connected tools.", bestFor: "Teams that want hosted assistants across many SaaS sources.", theCatch: "Knowledge stays in the tools it connects to, not files you own.", vsSlug: "cabinet-vs-dust" },
      { name: "Microsoft Copilot", line: "AI search and assistance across Microsoft 365 and the Graph.", bestFor: "Microsoft-centric organizations.", theCatch: "Tied to Microsoft's cloud and bundled model.", vsSlug: "cabinet-vs-microsoft-copilot" },
      { name: "Guru", line: "Verified knowledge cards and AI answers in a browser extension.", bestFor: "Support and sales answer delivery.", theCatch: "Cloud cards, not files you own.", vsSlug: "cabinet-vs-guru" },
      { name: "OpenSearch / Elastic", line: "Self-hosted search you run and tune yourself.", bestFor: "Teams that only need a search layer and want to own it.", theCatch: "Infrastructure to build on, not a finished product." },
    ],
    framework: [
      { need: "Federated search across many existing SaaS tools", pick: "Glean" },
      { need: "Hosted assistants across your connected tools", pick: "Dust" },
      { need: "AI search inside Microsoft 365", pick: "Microsoft Copilot" },
      { need: "Verified answers delivered in a browser extension", pick: "Guru" },
      { need: "Knowledge you own and author, with agents acting on it", pick: "Cabinet" },
    ],
    faqs: [
      { q: "What is the best self-hosted Glean alternative?", a: "Cabinet, if you want to own and author the knowledge and self-host it. If you only need a search layer, self-hosted search such as OpenSearch or Elastic is an option." },
      { q: "Is there an open-source Glean alternative?", a: "Cabinet is open source (MIT) for owning and authoring knowledge. OpenSearch and Elastic cover the search layer." },
      { q: "What is the most affordable Glean alternative?", a: "Cabinet is free to self-host under the MIT license, with inference billed directly through your own model keys." },
      { q: "How does Glean compare to Cabinet directly?", a: "Glean searches the tools you already have; Cabinet is where knowledge is authored and owned, with agents acting on it. See the full Glean vs Cabinet comparison." },
    ],
    related: ["cabinet-vs-glean", "cabinet-vs-dust", "cabinet-vs-microsoft-copilot"],
  },

  {
    slug: "obsidian-alternatives",
    kind: "round-up",
    competitor: "Obsidian",
    competitorSlug: "obsidian",
    icon: FileText,
    oneLiner: "Markdown tools that scale from a personal vault to a team.",
    title: "5 Best Obsidian Alternatives in 2026 (For Teams)",
    metaDescription:
      "The best Obsidian alternatives for teams that still want to own their files: Cabinet, Logseq, Notion, Anytype, and AppFlowy, compared honestly.",
    h1: "The best Obsidian alternatives, compared honestly",
    intro: "Obsidian is a brilliant personal vault, and people look past it when they need team collaboration, built-in AI and agents, or a workspace beyond notes, while still owning their files. Here is an honest shortlist, and where Cabinet fits.",
    whyLeave: {
      heading: "Why people look for an Obsidian alternative",
      points: [
        "Obsidian is single-player by design; team collaboration needs paid add-ons.",
        "AI is bolted on through community plugins, not built in.",
        "It is a note editor, not a workspace with apps, dashboards, and agents.",
        "You want a team to share the same knowledge, without giving up files you own.",
      ],
    },
    topPick: {
      heading: "Our pick for teams that want ownership: Cabinet",
      body: "Cabinet keeps the same files-on-disk model Obsidian users love and adds what a team needs: shared knowledge, AI agents that act on the notes, live apps and dashboards, chat, tasks, and a terminal. Your files stay yours and self-hosted.",
      reasons: [
        "Markdown on disk like Obsidian, so there is no conversion and no lock-in.",
        "Built-in agents and scheduled routines, not plugins you wire up yourself.",
        "A shared team workspace with live apps, dashboards, chat, and a terminal.",
      ],
    },
    alternatives: [
      { name: "Cabinet", line: "Files on disk like Obsidian, plus a team, agents, and live apps.", bestFor: "Teams that want to keep their files and add collaboration and AI.", theCatch: "Smaller plugin ecosystem than Obsidian's.", vsSlug: "cabinet-vs-obsidian" },
      { name: "Logseq", line: "An open-source, local-first outliner for Markdown notes.", bestFor: "Outliner-style personal note-taking.", theCatch: "Single-player, with a niche outliner workflow." },
      { name: "Notion", line: "A polished cloud workspace for teams.", bestFor: "Teams that want a managed all-in-one.", theCatch: "Cloud lock-in, not files you own.", vsSlug: "cabinet-vs-notion" },
      { name: "Anytype", line: "A local-first, open-source workspace with a Notion-like feel.", bestFor: "Notion's blocks without the cloud.", theCatch: "Custom data model and a younger ecosystem." },
      { name: "AppFlowy", line: "An open-source Notion-style app with docs, boards, and tables.", bestFor: "A self-hostable open-source workspace.", theCatch: "Fewer integrations than Notion." },
    ],
    framework: [
      { need: "An outliner-style personal vault", pick: "Logseq" },
      { need: "A managed all-in-one cloud workspace", pick: "Notion" },
      { need: "Notion's blocks without the cloud", pick: "Anytype" },
      { need: "A self-hostable open-source workspace", pick: "AppFlowy" },
      { need: "Files you own plus a team, agents, and live apps", pick: "Cabinet" },
    ],
    faqs: [
      { q: "What is the best Obsidian alternative for teams?", a: "Cabinet keeps your Markdown on disk like Obsidian and adds team collaboration, agents, and live apps, so a team shares the same knowledge without giving up files they own." },
      { q: "Is there an open-source Obsidian alternative?", a: "Logseq, Anytype, AppFlowy, and Cabinet are all open source. Cabinet is MIT licensed and adds agents and a team workspace." },
      { q: "Can I keep my Markdown files?", a: "Yes. Cabinet uses Markdown on disk like Obsidian, so your notes move over with no conversion." },
      { q: "How does Obsidian compare to Cabinet directly?", a: "Both store Markdown you own; Cabinet adds a team, agents, and live apps. See the full Obsidian vs Cabinet comparison." },
    ],
    related: ["cabinet-vs-obsidian", "cabinet-vs-notion", "notion-alternatives"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Three-way comparisons (1v1v1)
// ─────────────────────────────────────────────────────────────────────────────

export type Contender = { name: string; tagline: string };
/** Cells align to the `contenders` array order. Cabinet is always last. */
export type ThreeRow = { feature: string; cells: Cell[] };

export type ThreeWay = {
  slug: string;
  kind: "three-way";
  icon: LucideIcon;
  oneLiner: string;
  // SEO
  title: string;
  metaDescription: string;
  ogImage?: string;
  // Content
  h1: string;
  intro: string;
  contenders: Contender[];
  rows: ThreeRow[];
  bestFor: { contender: string; who: string }[];
  verdictParas: string[];
  faqs: Faq[];
  related: string[];
};

export const THREEWAYS: ThreeWay[] = [
  {
    slug: "notion-vs-obsidian-vs-cabinet",
    kind: "three-way",
    icon: FileText,
    oneLiner: "A cloud wiki, a local vault, and a KB you own, side by side.",
    title: "Notion vs Obsidian vs Cabinet: Which Knowledge Base Wins?",
    metaDescription:
      "Notion, Obsidian, and Cabinet compared across ownership, AI, collaboration, and cost. A cloud wiki, a local note vault, and a knowledge base you own with agents. An honest three-way comparison.",
    h1: "Notion vs Obsidian vs Cabinet",
    intro: "Three popular ways to run a knowledge base, three very different trade-offs. Notion is a polished cloud wiki. Obsidian is a local, single-player Markdown vault. Cabinet keeps your whole knowledge base as files you own, with team collaboration, live apps, and AI agents. Here is how they compare.",
    contenders: [
      { name: "Notion", tagline: "Polished cloud wiki, managed and multiplayer." },
      { name: "Obsidian", tagline: "Local-first Markdown vault for one person." },
      { name: "Cabinet", tagline: "A knowledge base you own, with agents and apps." },
    ],
    rows: [
      { feature: "Files on disk you own", cells: [false, true, true] },
      { feature: "Self-hosted", cells: [false, true, true] },
      { feature: "Built for teams", cells: [true, "partial", true] },
      { feature: "AI agents that act on your knowledge", cells: ["partial", "partial", true] },
      { feature: "Scheduled routines", cells: [false, false, true] },
      { feature: "Bring your own AI keys", cells: [false, "partial", true] },
      { feature: "Visualize web apps and dashboards", cells: [false, false, true] },
      { feature: "Real-time multiplayer editing", cells: [true, "partial", "partial"] },
      { feature: "Plugin ecosystem", cells: ["partial", true, "partial"] },
      { feature: "Open source", cells: [false, false, true] },
      { feature: "No vendor lock-in", cells: [false, true, true] },
      { feature: "Managed, zero-setup", cells: [true, "partial", "partial"] },
    ],
    bestFor: [
      { contender: "Notion", who: "Teams that want a polished, managed cloud workspace and live multiplayer, and are fine with their knowledge living in the cloud." },
      { contender: "Obsidian", who: "Solo note-takers who want the lightest local Markdown vault and a deep plugin ecosystem." },
      { contender: "Cabinet", who: "Teams that want to own their knowledge as files, with agents acting on it, live apps, and self-hosting." },
    ],
    verdictParas: [
      "If you want zero setup and live multiplayer above all, Notion is the easy pick, as long as you accept that your knowledge lives in their cloud.",
      "If you work alone and want the fastest, most hackable local editor, Obsidian is hard to beat.",
      "If you want to own your knowledge, give a team and its AI agents one place to work, and render live apps over it, Cabinet is the one of the three you actually control.",
    ],
    faqs: [
      { q: "Notion vs Obsidian vs Cabinet, which should I choose?", a: "Pick Notion for a managed cloud workspace with multiplayer, Obsidian for a personal local vault, and Cabinet if you want to own your knowledge as files with a team and AI agents working in it." },
      { q: "Which is best for teams?", a: "Notion and Cabinet are both built for teams. Choose Cabinet if owning your files and having agents act on them matters; choose Notion for the most polished managed multiplayer." },
      { q: "Which is open source?", a: "Cabinet is open source under the MIT license. Obsidian's core app is free but not open source, and Notion is closed source." },
      { q: "Which lets me own my files?", a: "Obsidian and Cabinet both store Markdown on disk you own. Notion keeps your pages in its cloud and proprietary format." },
    ],
    related: ["cabinet-vs-notion", "cabinet-vs-obsidian", "notion-alternatives"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Migration guides
// ─────────────────────────────────────────────────────────────────────────────

export type Migration = {
  slug: string;
  kind: "migration";
  from: string;
  fromSlug: string;
  icon: LucideIcon;
  oneLiner: string;
  // SEO
  title: string;
  metaDescription: string;
  ogImage?: string;
  // Content
  h1: string;
  intro: string;
  steps: { title: string; body: string }[];
  whatMovesOver: string[];
  watchOut: string[];
  afterValue: string[];
  faqs: Faq[];
  related: string[];
};

export const MIGRATIONS: Migration[] = [
  {
    slug: "migrate-from-notion",
    kind: "migration",
    from: "Notion",
    fromSlug: "notion",
    icon: ArrowRightLeft,
    oneLiner: "Move your Notion workspace to files you own, step by step.",
    title: "How to Migrate from Notion to Cabinet (Step by Step)",
    metaDescription:
      "A step-by-step guide to migrating from Notion to Cabinet: export your workspace, import the Markdown and CSV, and put AI agents to work on knowledge you now own.",
    h1: "Migrating from Notion to Cabinet",
    intro: "Leaving Notion does not mean losing your work. Notion exports clean Markdown and CSV, and Cabinet runs on exactly that: files on your disk. Here is how to move over in an afternoon and end up owning your knowledge.",
    steps: [
      { title: "Export your Notion workspace", body: "In Notion, choose Export with the Markdown and CSV format and include subpages. You get a zip of Markdown files and CSV tables that mirror your page tree." },
      { title: "Drop it into a Cabinet folder", body: "Unzip the export into your Cabinet knowledge folder. Your pages are now Markdown files on your disk, organized the way they were in Notion." },
      { title: "Tidy the structure", body: "Rename the export folders to match how your team thinks. Cabinet renders the tree, and live apps and dashboards over it, while everything stays plain Markdown you can grep and git." },
      { title: "Point your agents at it", body: "Add agent personas and routines so agents start reading and writing the imported knowledge: drafting, summarizing, and keeping docs current on a schedule." },
      { title: "Invite your team", body: "Share the workspace so colleagues work in the same knowledge base, now on files you own and self-host." },
    ],
    whatMovesOver: [
      "Pages and subpages, as Markdown files",
      "Databases and tables, as CSV you can keep or convert",
      "Your page hierarchy and most formatting",
      "Images and file attachments referenced from the export",
    ],
    watchOut: [
      "Notion-specific blocks such as synced blocks and some embeds may need a quick cleanup.",
      "Relational database links become CSV columns; complex relations may need reshaping.",
      "Real-time multiplayer works differently from Notion, so review the collaboration model with your team.",
    ],
    afterValue: [
      "Your knowledge is files you own: grep it, git it, back it up, self-host it.",
      "Agents read and write it on a schedule, using your own model keys.",
      "Live apps and dashboards render over the same files, for the whole team.",
    ],
    faqs: [
      { q: "Is migrating from Notion to Cabinet hard?", a: "No. Notion exports Markdown and CSV, which is exactly what Cabinet runs on, so most of the work is exporting and tidying." },
      { q: "Will I lose my databases?", a: "No. They export as CSV, so you keep the data and can reshape it in Cabinet as needed." },
      { q: "Can I keep using Notion during the move?", a: "Yes. The export is a copy, so you can migrate at your own pace and keep Notion running until you are ready." },
      { q: "How do Notion and Cabinet compare overall?", a: "Notion is a managed cloud wiki; Cabinet is a knowledge base you own with agents and apps. See the full Notion vs Cabinet comparison." },
    ],
    related: ["cabinet-vs-notion", "notion-alternatives", "migrate-from-obsidian"],
  },
  {
    slug: "migrate-from-obsidian",
    kind: "migration",
    from: "Obsidian",
    fromSlug: "obsidian",
    icon: ArrowRightLeft,
    oneLiner: "Bring your Obsidian vault into a team workspace, with no conversion.",
    title: "How to Migrate from Obsidian to Cabinet (Keep Your Vault)",
    metaDescription:
      "Move from Obsidian to Cabinet without converting anything. Both use Markdown on disk, so you point Cabinet at your vault and gain agents, team collaboration, and live apps.",
    h1: "Migrating from Obsidian to Cabinet",
    intro: "There is barely a migration here. Obsidian and Cabinet both store plain Markdown files on disk, so your vault moves over as-is. What changes is what you can do with it: a team, agents, and live apps over the same notes.",
    steps: [
      { title: "Locate your vault", body: "Find the folder where Obsidian stores your Markdown files. That folder is your knowledge base." },
      { title: "Open it in Cabinet", body: "Point Cabinet at the vault folder. Your notes appear immediately, still Markdown, still yours." },
      { title: "Keep your links and structure", body: "Wikilinks and folders carry over. Cabinet renders the tree and can visualize live apps and dashboards over your notes." },
      { title: "Add agents and routines", body: "Create agent personas so agents read and write the vault: summaries, digests, and upkeep on a schedule." },
      { title: "Bring in your team", body: "Share the workspace so colleagues collaborate in the same vault, now with chat, tasks, and apps around it." },
    ],
    whatMovesOver: [
      "Every Markdown note, unchanged",
      "Your folder structure and wikilinks",
      "Attachments stored alongside your notes",
    ],
    watchOut: [
      "Obsidian community plugins do not carry over; Cabinet replaces many with built-in features rather than a plugin marketplace.",
      "Graph view and some plugin-specific syntax differ, so review anything that depends on a specific plugin.",
    ],
    afterValue: [
      "Your vault is now a shared team workspace, still files you own.",
      "Agents act on your notes on a schedule, with your own model keys.",
      "Live apps, dashboards, chat, and tasks sit alongside the same Markdown.",
    ],
    faqs: [
      { q: "Do I have to convert my Obsidian notes?", a: "No. Both Obsidian and Cabinet use Markdown on disk, so there is no conversion: you point Cabinet at the vault." },
      { q: "Will my wikilinks still work?", a: "Yes. Links and folder structure carry over with your notes." },
      { q: "What about my plugins?", a: "Plugins do not transfer. Cabinet provides built-in agents, team features, and apps instead of a plugin marketplace." },
      { q: "How do Obsidian and Cabinet compare overall?", a: "Both keep Markdown you own; Cabinet adds a team, agents, and live apps. See the full Obsidian vs Cabinet comparison." },
    ],
    related: ["cabinet-vs-obsidian", "obsidian-alternatives", "migrate-from-notion"],
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

export function getThreeWay(slug: string): ThreeWay | undefined {
  return THREEWAYS.find((t) => t.slug === slug);
}

export function getMigration(slug: string): Migration | undefined {
  return MIGRATIONS.find((m) => m.slug === slug);
}

export function allCompareSlugs(): string[] {
  return [...COMPARISONS, ...ROUNDUPS, ...THREEWAYS, ...MIGRATIONS].map((x) => x.slug);
}

/** Human label for a compare slug, used for related-page cross-links. */
export function compareLabel(slug: string): string {
  const c = COMPARISONS.find((x) => x.slug === slug);
  if (c) return `Cabinet vs ${c.competitor}`;
  const r = ROUNDUPS.find((x) => x.slug === slug);
  if (r) return `${r.competitor} alternatives`;
  const t = THREEWAYS.find((x) => x.slug === slug);
  if (t) return t.contenders.map((x) => x.name).join(" vs ");
  const m = MIGRATIONS.find((x) => x.slug === slug);
  if (m) return `Migrate from ${m.from}`;
  return slug;
}
