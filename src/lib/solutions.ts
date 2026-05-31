import {
  TrendingUp,
  Megaphone,
  Code2,
  Compass,
  Workflow,
  Rocket,
  type LucideIcon,
} from "lucide-react";

/**
 * "Cabinet for X" — role/function solution pages.
 *
 * Each entry powers a /solutions/[slug] page and a navbar menu item. Copy is
 * grounded in real Cabinet primitives: agent personas (.agents/<slug>/persona.md),
 * heartbeats & routines (.jobs/*.yaml), the file-based knowledge base, and
 * bring-your-own-AI. Outcome stats are illustrative placeholders — swap in real
 * numbers as customers report them.
 */

export type Agent = { name: string; role: string; blurb: string };
export type Routine = { when: string; what: string };
export type Outcome = { stat: string; label: string };

export type Solution = {
  slug: string;
  label: string; // menu label, e.g. "Sales"
  menuBlurb: string; // one-line description in the dropdown
  icon: LucideIcon;
  eyebrow: string; // "Cabinet for Sales"
  headline: string;
  subhead: string;
  /** The status quo this function lives in today. */
  problem: { heading: string; points: string[] };
  /** The AI team you onboard for this function. */
  team: Agent[];
  /** Scheduled work that runs without anyone asking. */
  routines: Routine[];
  /** Illustrative outcome stats (placeholders). */
  outcomes: Outcome[];
  /** Tools this function already lives in — Cabinet pulls them together. */
  stack: string[];
  /** A starter cabinet template (cabinets.sh registry). */
  template: string;
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "sales",
    label: "Sales",
    menuBlurb: "Pipeline research, outreach, and CRM hygiene on autopilot.",
    icon: TrendingUp,
    eyebrow: "Cabinet for Sales",
    headline: "Your reps sell. Their AI team does everything else.",
    subhead:
      "Account research, first-touch drafts, call prep, and CRM updates run as scheduled work inside one knowledge base, so every rep walks into every meeting prepared, without burning a day on busywork.",
    problem: {
      heading: "Selling time is leaking into tabs",
      points: [
        "Reps spend half the week researching accounts, copy-pasting between the CRM, LinkedIn, and ten docs.",
        "Account knowledge lives in one rep's head. When they leave, the context leaves with them.",
        "Generic AI chat doesn't know your ICP, your pricing, or last quarter's notes.",
      ],
    },
    team: [
      { name: "SDR", role: "Outbound", blurb: "Enriches new leads, drafts personalized first-touch emails against your ICP and proof points." },
      { name: "Account Researcher", role: "Pre-call", blurb: "Builds a one-page brief on every account before the meeting: news, org chart, fit, objections." },
      { name: "Deal Desk", role: "Pipeline", blurb: "Watches the pipeline for stalls, drafts follow-ups, keeps next-steps current." },
      { name: "Sales Ops", role: "Hygiene", blurb: "Reconciles CRM exports, flags missing fields, and keeps the source of truth clean." },
    ],
    routines: [
      { when: "Every morning, 7am", what: "Enrich overnight inbound leads and draft first-touch emails for rep review." },
      { when: "30 min before each meeting", what: "Drop a fresh account brief into the deal folder." },
      { when: "Every Friday, 4pm", what: "Summarize pipeline movement and flag at-risk deals for the Monday forecast." },
    ],
    outcomes: [
      { stat: "8 hrs", label: "saved per rep, per week" },
      { stat: "3×", label: "more accounts researched before calls" },
      { stat: "100%", label: "of account context retained on disk" },
    ],
    stack: ["Salesforce / HubSpot", "Apollo", "LinkedIn", "Gmail", "Slack"],
    template: "cabinet:sales-room",
  },
  {
    slug: "marketing",
    label: "Marketing",
    menuBlurb: "Always-on research, content drafts, and campaign reporting.",
    icon: Megaphone,
    eyebrow: "Cabinet for Marketing",
    headline: "A content engine that compounds while you sleep.",
    subhead:
      "Briefs, drafts, competitor scans, and performance recaps run as a team of agents on top of your messaging, brand voice, and past work, all version-controlled markdown you own.",
    problem: {
      heading: "Great marketing dies in coordination overhead",
      points: [
        "Briefs, drafts, and approvals scatter across Docs, Slack, and a dozen chat threads.",
        "Every new hire re-learns brand voice from scratch because it lives in nobody's file.",
        "Reporting is a manual scramble at the end of every month.",
      ],
    },
    team: [
      { name: "Content Strategist", role: "Planning", blurb: "Turns a goal into briefs and an editorial calendar tied to your topic clusters." },
      { name: "Writer", role: "Drafting", blurb: "Drafts posts, emails, and landing copy in your brand voice from the knowledge base." },
      { name: "Competitor Scout", role: "Research", blurb: "Tracks competitor launches, pricing, and messaging, then files a digest you can act on." },
      { name: "Growth Analyst", role: "Reporting", blurb: "Pulls campaign numbers into a weekly recap with what to double down on." },
    ],
    routines: [
      { when: "Every Monday, 8am", what: "Draft the week's content calendar from the quarter's goals." },
      { when: "Every 6 hours", what: "Scan competitor sites and Reddit; file anything noteworthy." },
      { when: "Every Friday, 5pm", what: "Compile a performance recap with next-week recommendations." },
    ],
    outcomes: [
      { stat: "4×", label: "more publish-ready drafts per week" },
      { stat: "1 source", label: "of brand voice, on disk" },
      { stat: "0", label: "manual monthly reports" },
    ],
    stack: ["Google Drive", "Figma", "Ahrefs", "GA / Posthog", "Slack"],
    template: "cabinet:marketing-desk",
  },
  {
    slug: "engineering",
    label: "Engineering",
    menuBlurb: "Living docs, incident write-ups, and codebase-aware agents.",
    icon: Code2,
    eyebrow: "Cabinet for Engineering",
    headline: "Docs that stay alive because agents keep them honest.",
    subhead:
      "Link your repos, and agents draft RFCs, keep runbooks current, write incident retros, and answer 'how does this work?' against the actual codebase, all in markdown, all in git.",
    problem: {
      heading: "Your docs are wrong the moment they're written",
      points: [
        "Runbooks and architecture docs rot the second the code changes.",
        "Onboarding is tribal knowledge and a graveyard of stale wiki pages.",
        "Incident retros never get written because everyone's already on the next fire.",
      ],
    },
    team: [
      { name: "Docs Keeper", role: "Maintenance", blurb: "Watches linked repos and flags docs that drifted from the code." },
      { name: "RFC Drafter", role: "Design", blurb: "Turns a problem statement into a structured RFC with prior-art links." },
      { name: "Incident Scribe", role: "Reliability", blurb: "Drafts the retro from the timeline so the team just edits and ships it." },
      { name: "Onboarding Guide", role: "Ramp-up", blurb: "Answers 'where is X' and 'how does Y work' from the real codebase." },
    ],
    routines: [
      { when: "On every linked-repo change", what: "Re-check the runbooks that reference the changed paths." },
      { when: "After each incident", what: "Draft a blameless retro from the timeline and chat thread." },
      { when: "Every Friday", what: "Summarize merged work into a changelog the whole company can read." },
    ],
    outcomes: [
      { stat: "Days → mins", label: "to a useful, current doc" },
      { stat: "100%", label: "of incidents get a retro" },
      { stat: "Git", label: "history on every doc change" },
    ],
    stack: ["GitHub / GitLab", "Linear / Jira", "PagerDuty", "Datadog", "Slack"],
    template: "cabinet:eng-handbook",
  },
  {
    slug: "product",
    label: "Product",
    menuBlurb: "Synthesized research, living PRDs, and competitive tracking.",
    icon: Compass,
    eyebrow: "Cabinet for Product",
    headline: "From scattered signal to decisions you can defend.",
    subhead:
      "Customer interviews, support tickets, and feedback get synthesized into themes; PRDs draft themselves from the evidence; competitors get tracked continuously. It all lives in one knowledge base your whole team trusts.",
    problem: {
      heading: "Insight is everywhere and usable nowhere",
      points: [
        "Customer signal is buried across calls, tickets, surveys, and Slack.",
        "PRDs go stale the day after the kickoff and nobody updates them.",
        "Prioritization debates run on opinion because the evidence isn't in one place.",
      ],
    },
    team: [
      { name: "Research Synthesizer", role: "Discovery", blurb: "Clusters interviews and tickets into themes with quotes and frequencies." },
      { name: "PRD Drafter", role: "Definition", blurb: "Turns a validated problem into a structured PRD linked to the evidence." },
      { name: "Competitor Scout", role: "Market", blurb: "Tracks competitor releases and positioning so you're never surprised." },
      { name: "Roadmap Analyst", role: "Prioritization", blurb: "Scores opportunities against reach, impact, and effort from real data." },
    ],
    routines: [
      { when: "After each customer call", what: "File a structured summary and tag it to the right theme." },
      { when: "Every week", what: "Refresh the top-themes digest from new tickets and feedback." },
      { when: "Every release", what: "Update affected PRDs and notify the owners." },
    ],
    outcomes: [
      { stat: "1 place", label: "for every customer signal" },
      { stat: "Evidence-linked", label: "PRDs, always current" },
      { stat: "Faster", label: "prioritization calls" },
    ],
    stack: ["Linear / Jira", "Notion import", "Intercom / Zendesk", "Gong", "Figma"],
    template: "cabinet:product-room",
  },
  {
    slug: "operations",
    label: "Operations",
    menuBlurb: "SOPs, recurring reports, and cross-tool reconciliation.",
    icon: Workflow,
    eyebrow: "Cabinet for Operations",
    headline: "The recurring work that runs the company, running itself.",
    subhead:
      "SOPs, vendor reviews, board-prep packets, and reconciliations become scheduled routines. The institutional knowledge that usually lives in one ops person's head lives in files instead.",
    problem: {
      heading: "Ops is a thousand recurring tasks held by memory",
      points: [
        "Process lives in one person's head and a folder of out-of-date SOPs.",
        "Recurring reports are assembled by hand, the same way, every single week.",
        "Data has to be reconciled across tools that don't talk to each other.",
      ],
    },
    team: [
      { name: "Ops Coordinator", role: "Process", blurb: "Keeps SOPs current and runs the recurring checklist so nothing slips." },
      { name: "Reporting Analyst", role: "Reporting", blurb: "Assembles the weekly and monthly packets from source exports." },
      { name: "Vendor Watch", role: "Spend", blurb: "Tracks renewals, flags overlap, and drafts the review agenda." },
      { name: "Reconciler", role: "Data", blurb: "Cross-checks numbers across CSV exports and flags mismatches." },
    ],
    routines: [
      { when: "Every Monday, 9am", what: "Run the ops checklist and assign anything overdue." },
      { when: "Month-end", what: "Assemble the board-prep packet from the latest exports." },
      { when: "30 days before renewal", what: "Open a vendor review with usage and cost context." },
    ],
    outcomes: [
      { stat: "Hours → minutes", label: "on recurring packets" },
      { stat: "Documented", label: "process that outlives any one person" },
      { stat: "Fewer", label: "things falling through cracks" },
    ],
    stack: ["Google Sheets", "QuickBooks", "Ramp / Brex", "Airtable", "Slack"],
    template: "cabinet:ops-room",
  },
  {
    slug: "founders",
    label: "Founders & Execs",
    menuBlurb: "An always-on chief of staff across the whole business.",
    icon: Rocket,
    eyebrow: "Cabinet for Founders & Execs",
    headline: "Run the business from one place, with a team that never sleeps.",
    subhead:
      "Strategy, board prep, investor updates, hiring, and competitive intel, all coordinated by an AI team that reports to you, on infrastructure you control. Your company's brain, on your own disk.",
    problem: {
      heading: "You're the integration layer, and it doesn't scale",
      points: [
        "Context for every decision is scattered across tools, inboxes, and your memory.",
        "You're the bottleneck: every update, brief, and recap routes through you.",
        "Putting the company's crown-jewel knowledge into someone else's cloud is a non-starter.",
      ],
    },
    team: [
      { name: "Chief of Staff", role: "Coordination", blurb: "Dispatches work to the right agent and keeps the company's priorities current." },
      { name: "Board & Investor", role: "Reporting", blurb: "Drafts the monthly update and board deck from real metrics and notes." },
      { name: "Strategy Researcher", role: "Decisions", blurb: "Builds the brief (market, competitors, options) before the big call." },
      { name: "Recruiter", role: "Hiring", blurb: "Drafts JDs, screens inbound, and preps interview kits from the role spec." },
    ],
    routines: [
      { when: "Every morning", what: "Brief you on what moved overnight across the business." },
      { when: "Monthly", what: "Draft the investor update and board packet for your edit." },
      { when: "Before each decision", what: "Assemble the options memo with the trade-offs spelled out." },
    ],
    outcomes: [
      { stat: "Self-hosted", label: "your data never leaves your control" },
      { stat: "1 brain", label: "for the whole company" },
      { stat: "Less", label: "of the business routed through you" },
    ],
    stack: ["Gmail / Outlook", "Google Workspace", "Stripe", "Carta", "Slack"],
    template: "cabinet:exec-room",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}

/**
 * Illustrative customer stories per role — anonymized personas, not real named
 * customers. Shown with an "illustrative" tag (same convention as the docs
 * Stories page) and swapped for real, named case studies as they land.
 */
export type Story = { metric: string; metricLabel: string; quote: string; attribution: string };

export const SOLUTION_STORIES: Record<string, Story> = {
  sales: {
    metric: "8 hrs",
    metricLabel: "reclaimed per rep each week",
    quote:
      "Our reps stopped living in tabs. The SDR agent enriches and drafts overnight, so mornings start with reviewing, not researching.",
    attribution: "VP Sales · Series B SaaS",
  },
  marketing: {
    metric: "4×",
    metricLabel: "more publish-ready drafts per week",
    quote:
      "Brand voice finally lives in a file instead of someone's head. New hires ship on-brand from day one, and the weekly recap writes itself.",
    attribution: "Head of Marketing · DevTools company",
  },
  engineering: {
    metric: "100%",
    metricLabel: "of incidents now get a retro",
    quote:
      "Docs used to rot the moment code changed. Now an agent flags the drift and drafts the retro, and we just edit and ship.",
    attribution: "Staff Engineer · Fintech platform",
  },
  product: {
    metric: "1 place",
    metricLabel: "for every customer signal",
    quote:
      "Interviews, tickets, and feedback land as themes with quotes attached. Prioritization runs on evidence now, not the loudest voice.",
    attribution: "Director of Product · B2B marketplace",
  },
  operations: {
    metric: "Hours → mins",
    metricLabel: "on the monthly board packet",
    quote:
      "The recurring work that used to live in my head is documented and scheduled. The packet assembles itself from the source exports.",
    attribution: "Head of Ops · Scale-up",
  },
  founders: {
    metric: "Self-hosted",
    metricLabel: "crown-jewel data never leaves",
    quote:
      "It's the chief of staff I couldn't hire yet: it briefs me every morning and drafts the board update, all on infrastructure I control.",
    attribution: "Founder & CEO · Seed-stage startup",
  },
};
