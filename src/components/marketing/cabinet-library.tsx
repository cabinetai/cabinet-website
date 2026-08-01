"use client";

import Image from "next/image";
import { ArrowRight, Check, Clock3, PlugZap, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cabinetUrl, CABINETS_SITE } from "@/lib/cabinets";

type OutcomeId =
  | "tiktok"
  | "email"
  | "content_calendar"
  | "customer_crm"
  | "customer_chatbot"
  | "calendar"
  | "meetings"
  | "answers"
  | "drafts"
  | "repeat"
  | "collaboration"
  | "everywhere"
  | "bugs"
  | "ads"
  | "qbr"
  | "one_on_one"
  | "meeting_hub"
  | "ad_dashboard"
  | "client_onboarding"
  | "sales_pipeline"
  | "customer_health"
  | "new_hire"
  | "product_audit"
  | "cash_flow";

type TemplateStatus = "Available" | "Planned" | "Platform preview";

const OUTCOMES = [
  {
    id: "tiktok",
    label: "Launch TikTok ads",
    title: "Launch TikTok ads in one click.",
    description:
      "Turn a product brief into ready-to-review hooks, scripts, creative variants, and a testing queue.",
    result: "More creative tests reach the market without adding another production meeting.",
    icon: "/brand/ui/rocket.png",
    tone: "bg-[#f6d6df]",
    team: "Creative lead + growth analyst",
    cadence: "On demand, with a weekly learning loop",
    slug: null,
    status: "Planned",
    connectors: [
      { name: "TikTok", src: "/logos/tiktok.svg" },
      { name: "Google Drive", src: "/logos/google-drive.svg" },
      { name: "Slack", src: "/logos/slack.svg" },
    ],
  },
  {
    id: "email",
    label: "Clear the inbox",
    title: "Start every morning with a clean inbox.",
    description:
      "Surface what needs you, organize the rest, draft important replies, and keep every follow-up visible.",
    result: "Important conversations move forward without spending the first hour sorting mail.",
    icon: "/brand/ui/feather.png",
    tone: "bg-green-bg",
    team: "Inbox manager + reply writer",
    cadence: "Continuous triage, with approval before send",
    slug: "email",
    status: "Available",
    connectors: [{ name: "Gmail", src: "/logos/gmail.svg" }],
  },
  {
    id: "content_calendar",
    label: "Plan the content calendar",
    title: "Keep the content calendar full and ready for review.",
    description:
      "Turn campaign goals into channel plans, briefs, drafts, publishing dates, owners, and a clear approval queue.",
    result: "The team publishes consistently without rebuilding the plan in every weekly meeting.",
    icon: "/brand/ui/calendar.png",
    tone: "bg-bg-warm",
    team: "Editorial planner + channel producer",
    cadence: "Monthly planning with a weekly review and daily queue",
    slug: "content-creator",
    status: "Available",
    connectors: [
      { name: "Instagram", src: "/logos/instagram.svg" },
      { name: "TikTok", src: "/logos/tiktok.svg" },
      { name: "Google Drive", src: "/logos/google-drive.svg" },
      { name: "Slack", src: "/logos/slack.svg" },
    ],
  },
  {
    id: "customer_crm",
    label: "Run the customer CRM",
    title: "Keep every customer relationship current.",
    description:
      "Bring contacts, conversations, commitments, health signals, and next steps into one customer view the team can trust.",
    result: "Customer teams see the full relationship and the next action without reconciling five tools.",
    icon: "/brand/ui/database.png",
    tone: "bg-accent-bg-subtle",
    team: "Customer operations lead + account analyst",
    cadence: "Continuous sync with a weekly portfolio review",
    slug: null,
    status: "Planned",
    connectors: [
      { name: "HubSpot", src: "/logos/hubspot.svg" },
      { name: "Salesforce", src: "/logos/salesforce.svg" },
      { name: "Intercom", src: "/logos/intercom.svg" },
      { name: "Gmail", src: "/logos/gmail.svg" },
    ],
  },
  {
    id: "customer_chatbot",
    label: "Answer customers",
    title: "Answer customers where they already message.",
    description:
      "Use approved company knowledge to answer routine questions in WhatsApp and Telegram, then hand complex cases to a person with the conversation attached.",
    result: "Customers get faster answers while support teams keep control of exceptions and sensitive requests.",
    icon: "/brand/ui/globe.png",
    tone: "bg-green-bg-subtle",
    team: "Support agent + escalation coordinator",
    cadence: "Continuous response with human escalation rules",
    slug: null,
    status: "Planned",
    connectors: [
      { name: "WhatsApp", src: "/logos/whatsapp.svg" },
      { name: "Telegram", src: "/logos/telegram.svg" },
      { name: "Zendesk", src: "/logos/zendesk.svg" },
      { name: "Intercom", src: "/logos/intercom.svg" },
    ],
  },
  {
    id: "calendar",
    label: "Book the meeting",
    title: "Book the meeting without the back-and-forth.",
    description:
      "Find the time, protect focus rules, prepare the invitation, and resolve changes as schedules move.",
    result: "People get the right meeting on the calendar without another coordination thread.",
    icon: "/brand/ui/calendar.png",
    tone: "bg-accent-bg",
    team: "Scheduler + calendar guardian",
    cadence: "On request, with daily conflict checks",
    slug: null,
    status: "Planned",
    connectors: [
      { name: "Google Calendar", src: "/logos/google-calendar.svg" },
      { name: "Gmail", src: "/logos/gmail.svg" },
      { name: "Zoom", src: "/logos/zoom.svg" },
    ],
  },
  {
    id: "meetings",
    label: "Run the meeting lifecycle",
    title: "Leave every meeting with decisions and owners.",
    description:
      "Prepare the briefing, capture the conversation, extract decisions, and keep every next step moving.",
    result: "The meeting becomes usable company memory before anyone opens a blank notes document.",
    icon: "/brand/ui/handshake.png",
    tone: "bg-green-bg",
    team: "Briefing analyst + meeting operator",
    cadence: "Before, during, and after every meeting",
    slug: "meeting-memory",
    status: "Available",
    connectors: [
      { name: "Google Meet", src: "/logos/google-meet.svg" },
      { name: "Zoom", src: "/logos/zoom.svg" },
      { name: "Gmail", src: "/logos/gmail.svg" },
      { name: "Salesforce", src: "/logos/salesforce.svg" },
    ],
  },
  {
    id: "answers",
    label: "Find any answer",
    title: "Get the answer without hunting through five tools.",
    description:
      "Search the company structure, read the relevant material, and return a clear answer with its sources.",
    result: "Teams spend less time locating context and more time making the decision it supports.",
    icon: "/brand/ui/brain.png",
    tone: "bg-bg-warm",
    team: "Knowledge researcher + source analyst",
    cadence: "On demand, with findings kept for next time",
    slug: "company-brain",
    status: "Available",
    connectors: [
      { name: "Google Drive", src: "/logos/google-drive.svg" },
      { name: "Notion", src: "/logos/notion.svg" },
      { name: "SharePoint", src: "/logos/sharepoint.svg" },
      { name: "Slack", src: "/logos/slack.svg" },
    ],
  },
  {
    id: "drafts",
    label: "Draft docs and decks",
    title: "Open a strong first draft instead of a blank page.",
    description:
      "Build the document from company context, match the required format, and run a completeness check before review.",
    result: "PRDs, proposals, updates, and decks reach reviewers with the important structure already in place.",
    icon: "/brand/ui/document.png",
    tone: "bg-accent-bg-subtle",
    team: "Document writer + quality reviewer",
    cadence: "On demand, with review gates built in",
    slug: "prd-builder",
    status: "Available",
    connectors: [
      { name: "Microsoft 365", src: "/logos/microsoft-365.svg" },
      { name: "Google Drive", src: "/logos/google-drive.svg" },
      { name: "Notion", src: "/logos/notion.svg" },
    ],
  },
  {
    id: "repeat",
    label: "Automate repeat work",
    title: "Walk into Monday with the review already written.",
    description:
      "Run the recurring work on schedule, gather current context, prepare the artifact, and route it for review.",
    result: "The operating cadence keeps moving even when the person who owns it is busy.",
    icon: "/brand/ui/zap.png",
    tone: "bg-green-bg-subtle",
    team: "Chief of staff + business analyst",
    cadence: "Scheduled jobs with human review points",
    slug: "weekly-business-review",
    status: "Available",
    connectors: [
      { name: "Slack", src: "/logos/slack.svg" },
      { name: "Google Drive", src: "/logos/google-drive.svg" },
      { name: "Microsoft 365", src: "/logos/microsoft-365.svg" },
      { name: "Salesforce", src: "/logos/salesforce.svg" },
    ],
  },
  {
    id: "collaboration",
    label: "Coordinate team requests",
    title: "Turn every team request into owned work.",
    description:
      "Classify the request, route it to the right owner, apply the service level, and keep progress visible.",
    result: "Requests stop disappearing into shared channels and start reaching a visible finish line.",
    icon: "/brand/ui/team.png",
    tone: "bg-accent-bg",
    team: "Request router + workflow owner",
    cadence: "Continuous intake and routing",
    slug: "universal-request",
    status: "Available",
    connectors: [
      { name: "Slack", src: "/logos/slack.svg" },
      { name: "Microsoft Teams", src: "/logos/microsoft-teams.svg" },
      { name: "Jira", src: "/logos/jira.svg" },
      { name: "Salesforce", src: "/logos/salesforce.svg" },
    ],
  },
  {
    id: "everywhere",
    label: "Work from any channel",
    title: "Reach the same AI team wherever work starts.",
    description:
      "Bring one team and one memory to desktop, cloud, email, and the collaboration tools people already open.",
    result: "People keep the same context without moving every conversation into another suite.",
    icon: "/brand/ui/globe.png",
    tone: "bg-green-bg",
    team: "One persistent Cabinet team",
    cadence: "Desktop today, broader channel access planned",
    slug: null,
    status: "Platform preview",
    connectors: [
      { name: "Gmail", src: "/logos/gmail.svg" },
      { name: "Slack", src: "/logos/slack.svg" },
      { name: "Microsoft Teams", src: "/logos/microsoft-teams.svg" },
    ],
  },
  {
    id: "bugs",
    label: "Rank the bug queue",
    title: "Start the day with the bug queue already ranked.",
    description:
      "Combine issue, error, and support signals, then rank every bug by severity, frequency, and customer impact.",
    result: "Engineering spends the triage meeting making decisions instead of assembling the evidence.",
    icon: "/brand/ui/filecheck.png",
    tone: "bg-bg-warm",
    team: "Triage lead + impact analyst",
    cadence: "Daily engineering brief",
    slug: "bug-triage",
    status: "Available",
    connectors: [
      { name: "GitHub", src: "/logos/github.svg" },
      { name: "Jira", src: "/logos/jira.svg" },
      { name: "Zendesk", src: "/logos/zendesk.svg" },
      { name: "Slack", src: "/logos/slack.svg" },
    ],
  },
  {
    id: "ads",
    label: "Improve paid media",
    title: "Know which ads to scale before spend drifts.",
    description:
      "Track spend, CAC, ROAS, creative winners, anomalies, and the next experiment queue in one live review.",
    result: "Growth leaders get the decision, the evidence, and the next experiment without rebuilding a report.",
    icon: "/brand/ui/target.png",
    tone: "bg-accent-bg-subtle",
    team: "Ads analyst + performance writer",
    cadence: "Daily anomaly checks and a weekly memo",
    slug: "ad-performance",
    status: "Available",
    connectors: [
      { name: "TikTok", src: "/logos/tiktok.svg" },
      { name: "Looker", src: "/logos/looker.svg" },
      { name: "Salesforce", src: "/logos/salesforce.svg" },
      { name: "Slack", src: "/logos/slack.svg" },
    ],
  },
  {
    id: "qbr",
    label: "Build the customer QBR",
    title: "Build the QBR from live account data.",
    description:
      "Turn goals, usage, support history, ROI, risks, and the next-quarter plan into a review ready for the customer.",
    result: "Account teams spend the prep window improving the story, not copying data between slides.",
    icon: "/brand/ui/trophy.png",
    tone: "bg-green-bg-subtle",
    team: "Account analyst + QBR writer",
    cadence: "Decision-ready each quarter",
    slug: "qbr-generator",
    status: "Available",
    connectors: [
      { name: "Salesforce", src: "/logos/salesforce.svg" },
      { name: "Gong", src: "/logos/gong.svg" },
      { name: "Zendesk", src: "/logos/zendesk.svg" },
      { name: "Microsoft 365", src: "/logos/microsoft-365.svg" },
    ],
  },
  {
    id: "one_on_one",
    label: "Prepare every 1:1",
    title: "Walk into every 1:1 ready to help.",
    description:
      "Bring forward prior commitments, current goals, recent work, open concerns, and the questions worth discussing.",
    result: "Managers spend the meeting coaching and deciding, not reconstructing the last conversation.",
    icon: "/brand/ui/coffee.png",
    tone: "bg-accent-bg",
    team: "Manager coach + context researcher",
    cadence: "A private briefing before every 1:1",
    slug: "meeting-memory",
    status: "Available",
    connectors: [
      { name: "Google Calendar", src: "/logos/google-calendar.svg" },
      { name: "Gmail", src: "/logos/gmail.svg" },
      { name: "Google Meet", src: "/logos/google-meet.svg" },
      { name: "Notion", src: "/logos/notion.svg" },
    ],
  },
  {
    id: "meeting_hub",
    label: "Build a meeting hub",
    title: "Give the company one meeting memory.",
    description:
      "Collect briefs, recordings, notes, decisions, action items, and follow-through in one navigable company hub.",
    result: "Decisions stay searchable and teams stop asking what happened in meetings they missed.",
    icon: "/brand/ui/video.png",
    tone: "bg-green-bg",
    team: "Meeting operator + decision archivist",
    cadence: "Before, during, and after every meeting",
    slug: "meeting-memory",
    status: "Available",
    connectors: [
      { name: "Google Meet", src: "/logos/google-meet.svg" },
      { name: "Zoom", src: "/logos/zoom.svg" },
      { name: "Microsoft Teams", src: "/logos/microsoft-teams.svg" },
      { name: "Notion", src: "/logos/notion.svg" },
    ],
  },
  {
    id: "ad_dashboard",
    label: "Unify ad dashboards",
    title: "See Meta, Google, and Amazon ads in one live view.",
    description:
      "Combine spend, revenue, CAC, ROAS, creative performance, and anomalies in a dashboard shaped around your business.",
    result: "Owners see where to scale, pause, or investigate without waiting for another spreadsheet export.",
    icon: "/brand/ui/dashboard.png",
    tone: "bg-bg-warm",
    team: "Performance analyst + dashboard builder",
    cadence: "Live dashboard with daily anomaly checks",
    slug: null,
    status: "Planned",
    connectors: [
      { name: "Meta Ads", src: "/logos/facebook.svg" },
      { name: "Google Ads", src: "/brand/ui/target.png" },
      { name: "Amazon Ads", src: "/brand/ui/coins.png" },
      { name: "BigQuery", src: "/logos/bigquery.svg" },
      { name: "Looker", src: "/logos/looker.svg" },
    ],
  },
  {
    id: "client_onboarding",
    label: "Onboard a new client",
    title: "Move a signed client to first value without a handoff gap.",
    description:
      "Create the workspace, collect access and documents, assign owners, schedule kickoff, and keep every dependency visible.",
    result: "Clients experience one coordinated process from signature through their first delivered outcome.",
    icon: "/brand/ui/handshake.png",
    tone: "bg-accent-bg-subtle",
    team: "Onboarding lead + client coordinator",
    cadence: "Triggered when a contract is signed",
    slug: null,
    status: "Planned",
    connectors: [
      { name: "HubSpot", src: "/logos/hubspot.svg" },
      { name: "DocuSign", src: "/logos/docusign.svg" },
      { name: "Google Drive", src: "/logos/google-drive.svg" },
      { name: "Slack", src: "/logos/slack.svg" },
    ],
  },
  {
    id: "sales_pipeline",
    label: "Prepare sales follow-up",
    title: "Put the next best sales action in front of every rep.",
    description:
      "Brief the account, surface risk and intent signals, prepare discovery questions, and draft the right follow-up.",
    result: "Reps enter every conversation prepared and leave with the next step already moving.",
    icon: "/brand/ui/chart.png",
    tone: "bg-green-bg-subtle",
    team: "Account researcher + sales writer",
    cadence: "Before each call and after each customer reply",
    slug: "sales-call-prep",
    status: "Available",
    connectors: [
      { name: "Salesforce", src: "/logos/salesforce.svg" },
      { name: "Gong", src: "/logos/gong.svg" },
      { name: "Gmail", src: "/logos/gmail.svg" },
      { name: "Google Calendar", src: "/logos/google-calendar.svg" },
    ],
  },
  {
    id: "customer_health",
    label: "Protect customer health",
    title: "See churn risk before the renewal conversation.",
    description:
      "Combine product usage, support history, account conversations, commitments, and relationship signals into one review.",
    result: "Customer teams know which accounts need attention and why, while there is still time to act.",
    icon: "/brand/ui/shield.png",
    tone: "bg-accent-bg",
    team: "Customer analyst + renewal strategist",
    cadence: "Daily risk scan and weekly portfolio review",
    slug: null,
    status: "Planned",
    connectors: [
      { name: "Salesforce", src: "/logos/salesforce.svg" },
      { name: "Intercom", src: "/logos/intercom.svg" },
      { name: "Zendesk", src: "/logos/zendesk.svg" },
      { name: "Slack", src: "/logos/slack.svg" },
    ],
  },
  {
    id: "new_hire",
    label: "Onboard a new hire",
    title: "Give every new hire a confident first month.",
    description:
      "Prepare the plan, people, systems, reading, milestones, and role context before the employee arrives.",
    result: "New hires reach useful work sooner without relying on one manager to remember every step.",
    icon: "/brand/ui/team.png",
    tone: "bg-green-bg",
    team: "Onboarding coordinator + role guide",
    cadence: "A 30-day plan triggered before the start date",
    slug: null,
    status: "Planned",
    connectors: [
      { name: "Workday", src: "/logos/workday.svg" },
      { name: "Google Drive", src: "/logos/google-drive.svg" },
      { name: "Notion", src: "/logos/notion.svg" },
      { name: "Slack", src: "/logos/slack.svg" },
    ],
  },
  {
    id: "product_audit",
    label: "Audit the product",
    title: "Turn product friction into a ranked fix list.",
    description:
      "Walk critical flows, document every issue, connect evidence, rank impact, and prepare an interactive review for the team.",
    result: "Product leaders get a decision-ready audit instead of a folder of disconnected screenshots.",
    icon: "/brand/ui/filecheck.png",
    tone: "bg-bg-warm",
    team: "Product auditor + senior reviewer",
    cadence: "On demand before launches and planning cycles",
    slug: "audits",
    status: "Available",
    connectors: [
      { name: "Figma", src: "/logos/figma.svg" },
      { name: "GitHub", src: "/logos/github.svg" },
      { name: "Linear", src: "/logos/linear.svg" },
      { name: "Slack", src: "/logos/slack.svg" },
    ],
  },
  {
    id: "cash_flow",
    label: "Protect cash flow",
    title: "Know the cash decision before it becomes urgent.",
    description:
      "Track collections, recurring spend, runway, forecast changes, and unusual movements in one owner-ready review.",
    result: "Leaders see the pressure point, its cause, and the next decision without waiting for month-end close.",
    icon: "/brand/ui/coins.png",
    tone: "bg-accent-bg-subtle",
    team: "Finance analyst + operating partner",
    cadence: "Daily exception scan and weekly cash review",
    slug: null,
    status: "Planned",
    connectors: [
      { name: "QuickBooks", src: "/logos/quickbooks.svg" },
      { name: "Stripe", src: "/logos/stripe.svg" },
      { name: "Microsoft 365", src: "/logos/microsoft-365.svg" },
      { name: "Slack", src: "/logos/slack.svg" },
    ],
  },
] satisfies Array<{
  id: OutcomeId;
  label: string;
  title: string;
  description: string;
  result: string;
  icon: string;
  tone: string;
  team: string;
  cadence: string;
  slug: string | null;
  status: TemplateStatus;
  connectors: Array<{ name: string; src: string }>;
}>;

export function CabinetLibrary() {
  const [activeId, setActiveId] = useState<OutcomeId>("email");
  const reduceMotion = useReducedMotion();
  const activeIndex = OUTCOMES.findIndex((outcome) => outcome.id === activeId);
  const active = OUTCOMES[activeIndex];

  function moveSelection(offset: number) {
    const next = OUTCOMES[(activeIndex + offset + OUTCOMES.length) % OUTCOMES.length];
    setActiveId(next.id);
    window.requestAnimationFrame(() => {
      document.getElementById(`outcome-tab-${next.id}`)?.focus();
    });
  }

  return (
    <section id="workflows" className="home-snap-section home-viewport-section home-workflows-section scroll-mt-20 bg-bg-warm px-5 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          className="grid items-end gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12"
        >
          <div>
            <p className="section-label">Cabinet templates</p>
            <h2 className="mt-3 max-w-[15ch] font-section text-[clamp(2.15rem,3.35vw,3.4rem)] leading-[1.01] text-text-primary">
              Plug-and-play AI teams for real results.
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-text-secondary">
              Each cabinet runs as an always-on team on its own dedicated
              machine, self-hosted or in <span className="font-brand italic">Cabinet</span>{" "}Cloud.
              Real software doing real work while you sleep.
            </p>
          </div>
          <div className="lg:pb-1">
            <p className="max-w-xl text-base leading-relaxed text-text-secondary">
              Each cabinet is a complete AI team: agents, jobs, and knowledge. Clone a
              directory. Run a company.
            </p>
            <a
              href={CABINETS_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-warm"
            >
              Browse the full cabinet library <ArrowRight aria-hidden className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <div className="home-product-surface mt-[clamp(1.25rem,2.4svh,2rem)] overflow-hidden rounded-[28px] bg-bg-card lg:grid lg:h-[clamp(450px,61svh,620px)] lg:grid-cols-[300px_minmax(0,1fr)]">
          <div
            role="tablist"
            aria-label="Business outcomes"
            className="outcome-tablist flex gap-2 overflow-x-auto bg-bg-card p-3 lg:h-full lg:flex-col lg:gap-1 lg:overflow-x-hidden lg:overflow-y-auto lg:overscroll-contain lg:border-r lg:border-border lg:bg-bg-card lg:p-3"
          >
            {OUTCOMES.map((outcome, index) => {
              const selected = outcome.id === activeId;
              return (
                <motion.button
                  key={outcome.id}
                  id={`outcome-tab-${outcome.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="outcome-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(outcome.id)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                      event.preventDefault();
                      moveSelection(1);
                    }
                    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                      event.preventDefault();
                      moveSelection(-1);
                    }
                  }}
                  initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  whileHover={reduceMotion ? undefined : { x: 3 }}
                  transition={{ duration: 0.34, delay: Math.min(index * 0.025, 0.28) }}
                  className={`group flex min-w-[205px] items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 lg:min-w-0 ${
                    selected
                      ? "bg-bg-warm text-text-primary"
                      : "text-text-secondary hover:bg-bg-warm/65 hover:text-text-primary"
                  }`}
                >
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${outcome.tone}`}>
                    <Image src={outcome.icon} alt="" width={30} height={30} className="h-7 w-7 object-contain" />
                  </span>
                  <span className="min-w-0 flex-1 truncate">{outcome.label}</span>
                  {outcome.status !== "Available" && (
                    <span className="rounded-full bg-bg-card px-2 py-1 text-[8px] uppercase tracking-[0.06em] text-text-tertiary">
                      {outcome.status === "Planned" ? "Planned" : "Preview"}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={active.id}
            id="outcome-panel"
            role="tabpanel"
            aria-labelledby={`outcome-tab-${active.id}`}
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.992, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.995, filter: "blur(4px)" }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className={`grid min-h-[450px] overflow-hidden ${active.tone} lg:h-full lg:min-h-0 lg:grid-cols-[1.08fr_0.92fr]`}
          >
            <div className="flex min-h-0 flex-col p-6 sm:p-8 lg:p-[clamp(1.35rem,2.6svh,2rem)]">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/72 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-text-secondary">
                  <Sparkles aria-hidden className="h-3.5 w-3.5 text-accent" /> Business result
                </span>
                <span className="rounded-full bg-white/72 px-3 py-1.5 text-[10px] font-semibold text-text-secondary">
                  {active.status}
                </span>
              </div>

              <Image
                src={active.icon}
                alt=""
                width={118}
                height={118}
                className="mt-4 h-20 w-20 object-contain drop-shadow-[0_18px_20px_rgba(92,62,39,0.14)] lg:h-[clamp(4.25rem,8svh,5.75rem)] lg:w-[clamp(4.25rem,8svh,5.75rem)]"
              />
              <h3 className="mt-3 max-w-[12ch] font-display text-[clamp(2.15rem,3.5vw,3.25rem)] leading-[0.98] tracking-[-0.052em] text-text-primary">
                {active.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary lg:text-base">
                {active.description}
              </p>

              <div className="mt-auto pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
                  Business impact
                </p>
                <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-text-primary">
                  {active.result}
                </p>
              </div>
            </div>

            <aside className="flex min-h-0 flex-col bg-white/62 p-6 backdrop-blur-sm sm:p-8 lg:m-3 lg:overflow-y-auto lg:rounded-[22px] lg:p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
                What comes ready
              </p>
              <div className="mt-4 space-y-2">
                <ReceiptRow icon={Check} label="AI team" value={active.team} />
                <ReceiptRow icon={Clock3} label="Operating cadence" value={active.cadence} />
                <ReceiptRow
                  icon={PlugZap}
                  label="Connectors"
                  value={`${active.connectors.length} systems connected for this workflow`}
                />
              </div>

              <div className="mt-5 border-t border-black/8 pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
                  Connect company systems
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {active.connectors.map((connector) => (
                    <motion.span
                      key={connector.name}
                      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
                      transition={{ duration: 0.16 }}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[10px] font-semibold text-text-secondary shadow-sm"
                    >
                      <Image
                        src={connector.src}
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                      />
                      {connector.name}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-5">
                {active.slug ? (
                  <a
                    href={cabinetUrl(active.slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-text-primary px-5 py-3.5 text-sm font-semibold text-bg-card transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35"
                  >
                    Inspect this AI team <ArrowRight aria-hidden className="h-4 w-4" />
                  </a>
                ) : (
                  <span className="inline-flex w-full items-center justify-center rounded-full bg-white/70 px-5 py-3.5 text-sm font-semibold text-text-secondary">
                    {active.status === "Planned" ? "Template planned" : "Platform capability in progress"}
                  </span>
                )}
              </div>
            </aside>
          </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ReceiptRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Check;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl bg-white/72 p-3.5">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-bg text-accent">
        <Icon aria-hidden className="h-3.5 w-3.5" />
      </span>
      <span>
        <strong className="block text-xs text-text-primary">{label}</strong>
        <span className="mt-1 block text-[11px] leading-relaxed text-text-secondary">{value}</span>
      </span>
    </div>
  );
}
