"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";

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

const OUTCOME_DATA = [
  {
    id: "tiktok",
    icon: "/brand/ui/rocket.png",
    tone: "bg-[#f6d6df]",
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
    icon: "/brand/ui/feather.png",
    tone: "bg-green-bg",
    slug: "email",
    status: "Available",
    connectors: [{ name: "Gmail", src: "/logos/gmail.svg" }],
  },
  {
    id: "content_calendar",
    icon: "/brand/ui/calendar.png",
    tone: "bg-bg-warm",
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
    icon: "/brand/ui/database.png",
    tone: "bg-accent-bg-subtle",
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
    icon: "/brand/ui/globe.png",
    tone: "bg-green-bg-subtle",
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
    icon: "/brand/ui/calendar.png",
    tone: "bg-accent-bg",
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
    icon: "/brand/ui/handshake.png",
    tone: "bg-green-bg",
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
    icon: "/brand/ui/brain.png",
    tone: "bg-bg-warm",
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
    icon: "/brand/ui/document.png",
    tone: "bg-accent-bg-subtle",
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
    icon: "/brand/ui/zap.png",
    tone: "bg-green-bg-subtle",
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
    icon: "/brand/ui/team.png",
    tone: "bg-accent-bg",
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
    icon: "/brand/ui/globe.png",
    tone: "bg-green-bg",
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
    icon: "/brand/ui/filecheck.png",
    tone: "bg-bg-warm",
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
    icon: "/brand/ui/target.png",
    tone: "bg-accent-bg-subtle",
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
    icon: "/brand/ui/trophy.png",
    tone: "bg-green-bg-subtle",
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
    icon: "/brand/ui/coffee.png",
    tone: "bg-accent-bg",
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
    icon: "/brand/ui/video.png",
    tone: "bg-green-bg",
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
    icon: "/brand/ui/dashboard.png",
    tone: "bg-bg-warm",
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
    icon: "/brand/ui/handshake.png",
    tone: "bg-accent-bg-subtle",
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
    icon: "/brand/ui/chart.png",
    tone: "bg-green-bg-subtle",
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
    icon: "/brand/ui/shield.png",
    tone: "bg-accent-bg",
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
    icon: "/brand/ui/team.png",
    tone: "bg-green-bg",
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
    icon: "/brand/ui/filecheck.png",
    tone: "bg-bg-warm",
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
    icon: "/brand/ui/coins.png",
    tone: "bg-accent-bg-subtle",
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
  icon: string;
  tone: string;
  slug: string | null;
  status: TemplateStatus;
  connectors: Array<{ name: string; src: string }>;
}>;

type OutcomeText = {
  label: string;
  title: string;
  description: string;
  result: string;
  team: string;
  cadence: string;
};

const OUTCOME_COPY: Record<Locale, Record<OutcomeId, OutcomeText>> = {
  en: {
    tiktok: {
      label: "Launch TikTok ads",
      title: "Launch TikTok ads in one click.",
      description:
        "Turn a product brief into ready-to-review hooks, scripts, creative variants, and a testing queue.",
      result:
        "More creative tests reach the market without adding another production meeting.",
      team: "Creative lead + growth analyst",
      cadence: "On demand, with a weekly learning loop",
    },
    email: {
      label: "Clear the inbox",
      title: "Start every morning with a clean inbox.",
      description:
        "Surface what needs you, organize the rest, draft important replies, and keep every follow-up visible.",
      result:
        "Important conversations move forward without spending the first hour sorting mail.",
      team: "Inbox manager + reply writer",
      cadence: "Continuous triage, with approval before send",
    },
    content_calendar: {
      label: "Plan the content calendar",
      title: "Keep the content calendar full and ready for review.",
      description:
        "Turn campaign goals into channel plans, briefs, drafts, publishing dates, owners, and a clear approval queue.",
      result:
        "The team publishes consistently without rebuilding the plan in every weekly meeting.",
      team: "Editorial planner + channel producer",
      cadence: "Monthly planning with a weekly review and daily queue",
    },
    customer_crm: {
      label: "Run the customer CRM",
      title: "Keep every customer relationship current.",
      description:
        "Bring contacts, conversations, commitments, health signals, and next steps into one customer view the team can trust.",
      result:
        "Customer teams see the full relationship and the next action without reconciling five tools.",
      team: "Customer operations lead + account analyst",
      cadence: "Continuous sync with a weekly portfolio review",
    },
    customer_chatbot: {
      label: "Answer customers",
      title: "Answer customers where they already message.",
      description:
        "Use approved company knowledge to answer routine questions in WhatsApp and Telegram, then hand complex cases to a person with the conversation attached.",
      result:
        "Customers get faster answers while support teams keep control of exceptions and sensitive requests.",
      team: "Support agent + escalation coordinator",
      cadence: "Continuous response with human escalation rules",
    },
    calendar: {
      label: "Book the meeting",
      title: "Book the meeting without the back-and-forth.",
      description:
        "Find the time, protect focus rules, prepare the invitation, and resolve changes as schedules move.",
      result:
        "People get the right meeting on the calendar without another coordination thread.",
      team: "Scheduler + calendar guardian",
      cadence: "On request, with daily conflict checks",
    },
    meetings: {
      label: "Run the meeting lifecycle",
      title: "Leave every meeting with decisions and owners.",
      description:
        "Prepare the briefing, capture the conversation, extract decisions, and keep every next step moving.",
      result:
        "The meeting becomes usable company memory before anyone opens a blank notes document.",
      team: "Briefing analyst + meeting operator",
      cadence: "Before, during, and after every meeting",
    },
    answers: {
      label: "Find any answer",
      title: "Get the answer without hunting through five tools.",
      description:
        "Search the company structure, read the relevant material, and return a clear answer with its sources.",
      result:
        "Teams spend less time locating context and more time making the decision it supports.",
      team: "Knowledge researcher + source analyst",
      cadence: "On demand, with findings kept for next time",
    },
    drafts: {
      label: "Draft docs and decks",
      title: "Open a strong first draft instead of a blank page.",
      description:
        "Build the document from company context, match the required format, and run a completeness check before review.",
      result:
        "PRDs, proposals, updates, and decks reach reviewers with the important structure already in place.",
      team: "Document writer + quality reviewer",
      cadence: "On demand, with review gates built in",
    },
    repeat: {
      label: "Automate repeat work",
      title: "Walk into Monday with the review already written.",
      description:
        "Run the recurring work on schedule, gather current context, prepare the artifact, and route it for review.",
      result:
        "The operating cadence keeps moving even when the person who owns it is busy.",
      team: "Chief of staff + business analyst",
      cadence: "Scheduled jobs with human review points",
    },
    collaboration: {
      label: "Coordinate team requests",
      title: "Turn every team request into owned work.",
      description:
        "Classify the request, route it to the right owner, apply the service level, and keep progress visible.",
      result:
        "Requests stop disappearing into shared channels and start reaching a visible finish line.",
      team: "Request router + workflow owner",
      cadence: "Continuous intake and routing",
    },
    everywhere: {
      label: "Work from any channel",
      title: "Reach the same AI team wherever work starts.",
      description:
        "Bring one team and one memory to desktop, cloud, email, and the collaboration tools people already open.",
      result:
        "People keep the same context without moving every conversation into another suite.",
      team: "One persistent Cabinet team",
      cadence: "Desktop today, broader channel access planned",
    },
    bugs: {
      label: "Rank the bug queue",
      title: "Start the day with the bug queue already ranked.",
      description:
        "Combine issue, error, and support signals, then rank every bug by severity, frequency, and customer impact.",
      result:
        "Engineering spends the triage meeting making decisions instead of assembling the evidence.",
      team: "Triage lead + impact analyst",
      cadence: "Daily engineering brief",
    },
    ads: {
      label: "Improve paid media",
      title: "Know which ads to scale before spend drifts.",
      description:
        "Track spend, CAC, ROAS, creative winners, anomalies, and the next experiment queue in one live review.",
      result:
        "Growth leaders get the decision, the evidence, and the next experiment without rebuilding a report.",
      team: "Ads analyst + performance writer",
      cadence: "Daily anomaly checks and a weekly memo",
    },
    qbr: {
      label: "Build the customer QBR",
      title: "Build the QBR from live account data.",
      description:
        "Turn goals, usage, support history, ROI, risks, and the next-quarter plan into a review ready for the customer.",
      result:
        "Account teams spend the prep window improving the story, not copying data between slides.",
      team: "Account analyst + QBR writer",
      cadence: "Decision-ready each quarter",
    },
    one_on_one: {
      label: "Prepare every 1:1",
      title: "Walk into every 1:1 ready to help.",
      description:
        "Bring forward prior commitments, current goals, recent work, open concerns, and the questions worth discussing.",
      result:
        "Managers spend the meeting coaching and deciding, not reconstructing the last conversation.",
      team: "Manager coach + context researcher",
      cadence: "A private briefing before every 1:1",
    },
    meeting_hub: {
      label: "Build a meeting hub",
      title: "Give the company one meeting memory.",
      description:
        "Collect briefs, recordings, notes, decisions, action items, and follow-through in one navigable company hub.",
      result:
        "Decisions stay searchable and teams stop asking what happened in meetings they missed.",
      team: "Meeting operator + decision archivist",
      cadence: "Before, during, and after every meeting",
    },
    ad_dashboard: {
      label: "Unify ad dashboards",
      title: "See Meta, Google, and Amazon ads in one live view.",
      description:
        "Combine spend, revenue, CAC, ROAS, creative performance, and anomalies in a dashboard shaped around your business.",
      result:
        "Owners see where to scale, pause, or investigate without waiting for another spreadsheet export.",
      team: "Performance analyst + dashboard builder",
      cadence: "Live dashboard with daily anomaly checks",
    },
    client_onboarding: {
      label: "Onboard a new client",
      title: "Move a signed client to first value without a handoff gap.",
      description:
        "Create the workspace, collect access and documents, assign owners, schedule kickoff, and keep every dependency visible.",
      result:
        "Clients experience one coordinated process from signature through their first delivered outcome.",
      team: "Onboarding lead + client coordinator",
      cadence: "Triggered when a contract is signed",
    },
    sales_pipeline: {
      label: "Prepare sales follow-up",
      title: "Put the next best sales action in front of every rep.",
      description:
        "Brief the account, surface risk and intent signals, prepare discovery questions, and draft the right follow-up.",
      result:
        "Reps enter every conversation prepared and leave with the next step already moving.",
      team: "Account researcher + sales writer",
      cadence: "Before each call and after each customer reply",
    },
    customer_health: {
      label: "Protect customer health",
      title: "See churn risk before the renewal conversation.",
      description:
        "Combine product usage, support history, account conversations, commitments, and relationship signals into one review.",
      result:
        "Customer teams know which accounts need attention and why, while there is still time to act.",
      team: "Customer analyst + renewal strategist",
      cadence: "Daily risk scan and weekly portfolio review",
    },
    new_hire: {
      label: "Onboard a new hire",
      title: "Give every new hire a confident first month.",
      description:
        "Prepare the plan, people, systems, reading, milestones, and role context before the employee arrives.",
      result:
        "New hires reach useful work sooner without relying on one manager to remember every step.",
      team: "Onboarding coordinator + role guide",
      cadence: "A 30-day plan triggered before the start date",
    },
    product_audit: {
      label: "Audit the product",
      title: "Turn product friction into a ranked fix list.",
      description:
        "Walk critical flows, document every issue, connect evidence, rank impact, and prepare an interactive review for the team.",
      result:
        "Product leaders get a decision-ready audit instead of a folder of disconnected screenshots.",
      team: "Product auditor + senior reviewer",
      cadence: "On demand before launches and planning cycles",
    },
    cash_flow: {
      label: "Protect cash flow",
      title: "Know the cash decision before it becomes urgent.",
      description:
        "Track collections, recurring spend, runway, forecast changes, and unusual movements in one owner-ready review.",
      result:
        "Leaders see the pressure point, its cause, and the next decision without waiting for month-end close.",
      team: "Finance analyst + operating partner",
      cadence: "Daily exception scan and weekly cash review",
    },
  },
  hi: {
    tiktok: {
      label: "TikTok ऐड्स लॉन्च करें",
      title: "एक क्लिक में TikTok ऐड्स लॉन्च करें।",
      description:
        "प्रोडक्ट ब्रीफ़ से समीक्षा के लिए तैयार हुक, स्क्रिप्ट, क्रिएटिव वेरिएंट और टेस्टिंग की कतार बनाएं।",
      result:
        "प्रोडक्शन की एक और मीटिंग के बिना ज़्यादा क्रिएटिव टेस्ट बाज़ार तक पहुंचते हैं।",
      team: "क्रिएटिव लीड + ग्रोथ एनालिस्ट",
      cadence: "ज़रूरत के हिसाब से, हर हफ़्ते सीख की समीक्षा के साथ",
    },
    email: {
      label: "इनबॉक्स साफ़ करें",
      title: "हर सुबह की शुरुआत साफ़ इनबॉक्स से करें।",
      description:
        "जिन मेल पर आपका ध्यान चाहिए उन्हें सामने लाएं, बाकी को व्यवस्थित करें, ज़रूरी जवाबों के ड्राफ़्ट बनाएं और हर फ़ॉलो-अप नज़र में रखें।",
      result:
        "ज़रूरी बातचीत आगे बढ़ती रहती है, और दिन का पहला घंटा मेल छांटने में नहीं जाता।",
      team: "इनबॉक्स मैनेजर + रिप्लाई राइटर",
      cadence: "लगातार छंटाई, भेजने से पहले आपकी मंज़ूरी",
    },
    content_calendar: {
      label: "कंटेंट कैलेंडर प्लान करें",
      title: "कंटेंट कैलेंडर भरा रहे और समीक्षा के लिए तैयार रहे।",
      description:
        "कैंपेन के लक्ष्यों को चैनल प्लान, ब्रीफ़, ड्राफ़्ट, पब्लिशिंग की तारीखों, ज़िम्मेदार लोगों और मंज़ूरी की साफ़ कतार में बदलें।",
      result:
        "हर हफ़्ते की मीटिंग में प्लान दोबारा बनाए बिना टीम नियमित रूप से पब्लिश करती है।",
      team: "एडिटोरियल प्लानर + चैनल प्रोड्यूसर",
      cadence: "मासिक प्लानिंग, साप्ताहिक समीक्षा और रोज़ की कतार",
    },
    customer_crm: {
      label: "कस्टमर CRM चलाएं",
      title: "हर ग्राहक के साथ रिश्ते की जानकारी अप-टू-डेट रखें।",
      description:
        "कॉन्टैक्ट, बातचीत, वादे, हेल्थ सिग्नल और अगले कदम एक ऐसे कस्टमर व्यू में लाएं जिस पर टीम भरोसा कर सके।",
      result:
        "कस्टमर टीमें पांच टूल्स का मिलान किए बिना पूरा रिश्ता और अगला कदम देख पाती हैं।",
      team: "कस्टमर ऑपरेशंस लीड + अकाउंट एनालिस्ट",
      cadence: "लगातार सिंक, साप्ताहिक पोर्टफ़ोलियो समीक्षा के साथ",
    },
    customer_chatbot: {
      label: "ग्राहकों को जवाब दें",
      title: "ग्राहकों को वहीं जवाब दें जहां वे पहले से मैसेज करते हैं।",
      description:
        "कंपनी की मंज़ूरशुदा जानकारी से WhatsApp और Telegram पर आम सवालों के जवाब दें, और पेचीदा मामले पूरी बातचीत के साथ किसी व्यक्ति को सौंपें।",
      result:
        "ग्राहकों को जल्दी जवाब मिलते हैं, और अपवाद व संवेदनशील अनुरोध सपोर्ट टीम के नियंत्रण में रहते हैं।",
      team: "सपोर्ट एजेंट + एस्केलेशन कोऑर्डिनेटर",
      cadence: "लगातार जवाब, इंसानी एस्केलेशन के नियमों के साथ",
    },
    calendar: {
      label: "मीटिंग बुक करें",
      title: "बार-बार के मेल के बिना मीटिंग बुक करें।",
      description:
        "सही समय ढूंढें, फ़ोकस टाइम के नियमों का ध्यान रखें, इनविटेशन तैयार करें और शेड्यूल बदलने पर बदलाव संभालें।",
      result: "तालमेल के लिए एक और थ्रेड चलाए बिना सही मीटिंग कैलेंडर पर आ जाती है।",
      team: "शेड्यूलर + कैलेंडर गार्डियन",
      cadence: "मांगने पर, रोज़ टकराव की जांच के साथ",
    },
    meetings: {
      label: "मीटिंग का पूरा चक्र संभालें",
      title: "हर मीटिंग से फ़ैसले और ज़िम्मेदार तय करके निकलें।",
      description:
        "ब्रीफ़िंग तैयार करें, बातचीत दर्ज करें, फ़ैसले निकालें और हर अगला कदम आगे बढ़ाते रहें।",
      result:
        "किसी के खाली नोट्स डॉक्यूमेंट खोलने से पहले ही मीटिंग कंपनी की उपयोगी याददाश्त बन जाती है।",
      team: "ब्रीफ़िंग एनालिस्ट + मीटिंग ऑपरेटर",
      cadence: "हर मीटिंग से पहले, उसके दौरान और बाद में",
    },
    answers: {
      label: "कोई भी जवाब ढूंढें",
      title: "पांच टूल्स खंगाले बिना जवाब पाएं।",
      description:
        "कंपनी के पूरे ढांचे में खोजें, ज़रूरी सामग्री पढ़ें और सोर्स के साथ साफ़ जवाब दें।",
      result:
        "टीमें संदर्भ ढूंढने में कम और उस पर आधारित फ़ैसले लेने में ज़्यादा समय लगाती हैं।",
      team: "नॉलेज रिसर्चर + सोर्स एनालिस्ट",
      cadence: "ज़रूरत के हिसाब से, नतीजे अगली बार के लिए सुरक्षित",
    },
    drafts: {
      label: "डॉक्यूमेंट और डेक ड्राफ़्ट करें",
      title: "खाली पन्ने की जगह एक मज़बूत पहला ड्राफ़्ट खोलें।",
      description:
        "कंपनी के संदर्भ से डॉक्यूमेंट तैयार करें, ज़रूरी फ़ॉर्मैट से मिलाएं और समीक्षा से पहले जांचें कि कुछ छूटा तो नहीं।",
      result:
        "PRD, प्रस्ताव, अपडेट और डेक ज़रूरी ढांचे के साथ समीक्षकों तक पहुंचते हैं।",
      team: "डॉक्यूमेंट राइटर + क्वालिटी रिव्यूअर",
      cadence: "ज़रूरत के हिसाब से, समीक्षा के चरण पहले से शामिल",
    },
    repeat: {
      label: "रोज़मर्रा का काम ऑटोमेट करें",
      title: "सोमवार को पहुंचें तो रिव्यू पहले से लिखा मिले।",
      description:
        "नियमित काम तय समय पर चलाएं, ताज़ा संदर्भ जुटाएं, आउटपुट तैयार करें और उसे समीक्षा के लिए भेजें।",
      result: "जिसकी ज़िम्मेदारी है वह व्यस्त हो, तब भी कामकाज की लय बनी रहती है।",
      team: "चीफ़ ऑफ़ स्टाफ़ + बिज़नेस एनालिस्ट",
      cadence: "शेड्यूल किए गए जॉब्स, इंसानी समीक्षा के पड़ावों के साथ",
    },
    collaboration: {
      label: "टीम के अनुरोध संभालें",
      title: "टीम के हर अनुरोध को किसी की ज़िम्मेदारी बनाएं।",
      description:
        "अनुरोध की श्रेणी तय करें, सही व्यक्ति तक भेजें, सर्विस लेवल लागू करें और प्रगति नज़र में रखें।",
      result:
        "अनुरोध शेयर्ड चैनलों में गुम नहीं होते और पूरे होने तक साफ़ दिखते रहते हैं।",
      team: "रिक्वेस्ट राउटर + वर्कफ़्लो ओनर",
      cadence: "लगातार अनुरोध लेना और सही व्यक्ति तक भेजना",
    },
    everywhere: {
      label: "किसी भी चैनल से काम करें",
      title: "काम जहां से भी शुरू हो, वही AI टीम आपके साथ।",
      description:
        "डेस्कटॉप, क्लाउड, ईमेल और उन कोलैबोरेशन टूल्स में, जिन्हें लोग पहले से खोलते हैं, एक ही टीम और एक ही मेमोरी लाएं।",
      result: "हर बातचीत किसी नए सूट में ले जाए बिना लोगों के पास वही संदर्भ रहता है।",
      team: "एक स्थायी Cabinet टीम",
      cadence: "आज डेस्कटॉप पर, बाकी चैनल योजना में",
    },
    bugs: {
      label: "बग की कतार रैंक करें",
      title: "दिन की शुरुआत पहले से रैंक की गई बग कतार के साथ करें।",
      description:
        "इश्यू, एरर और सपोर्ट के संकेत मिलाएं, फिर हर बग को गंभीरता, बारंबारता और ग्राहकों पर असर के हिसाब से रैंक करें।",
      result: "इंजीनियरिंग ट्राइएज मीटिंग में सबूत जुटाने के बजाय फ़ैसले लेती है।",
      team: "ट्राइएज लीड + इम्पैक्ट एनालिस्ट",
      cadence: "रोज़ की इंजीनियरिंग ब्रीफ़",
    },
    ads: {
      label: "पेड मीडिया बेहतर करें",
      title: "खर्च बेकाबू होने से पहले जानें कि कौन से ऐड्स बढ़ाने हैं।",
      description:
        "खर्च, CAC, ROAS, सबसे अच्छे क्रिएटिव, असामान्य बदलाव और अगले प्रयोगों की कतार, सब एक लाइव समीक्षा में ट्रैक करें।",
      result:
        "ग्रोथ लीडर्स को रिपोर्ट दोबारा बनाए बिना फ़ैसला, उसके सबूत और अगला प्रयोग मिल जाता है।",
      team: "ऐड्स एनालिस्ट + परफ़ॉर्मेंस राइटर",
      cadence: "रोज़ असामान्य बदलावों की जांच और साप्ताहिक मेमो",
    },
    qbr: {
      label: "ग्राहक का QBR तैयार करें",
      title: "लाइव अकाउंट डेटा से QBR तैयार करें।",
      description:
        "लक्ष्य, इस्तेमाल, सपोर्ट हिस्ट्री, ROI, जोखिम और अगली तिमाही की योजना को ग्राहक के लिए तैयार समीक्षा में बदलें।",
      result:
        "अकाउंट टीमें तैयारी का समय स्लाइड्स में डेटा कॉपी करने के बजाय कहानी बेहतर बनाने में लगाती हैं।",
      team: "अकाउंट एनालिस्ट + QBR राइटर",
      cadence: "हर तिमाही फ़ैसले के लिए तैयार",
    },
    one_on_one: {
      label: "हर 1:1 की तैयारी करें",
      title: "हर 1:1 में मदद के लिए तैयार होकर जाएं।",
      description:
        "पिछले वादे, मौजूदा लक्ष्य, हाल का काम, खुली चिंताएं और चर्चा लायक सवाल सामने लाएं।",
      result:
        "मैनेजर पिछली बातचीत याद करने के बजाय मीटिंग में कोचिंग और फ़ैसलों पर ध्यान देते हैं।",
      team: "मैनेजर कोच + कॉन्टेक्स्ट रिसर्चर",
      cadence: "हर 1:1 से पहले एक निजी ब्रीफ़िंग",
    },
    meeting_hub: {
      label: "मीटिंग हब बनाएं",
      title: "पूरी कंपनी को मीटिंग्स की एक साझा याददाश्त दें।",
      description:
        "ब्रीफ़, रिकॉर्डिंग, नोट्स, फ़ैसले, एक्शन आइटम और फ़ॉलो-अप को कंपनी के एक व्यवस्थित हब में जमा करें।",
      result:
        "फ़ैसले खोजे जा सकते हैं, और टीमों को यह नहीं पूछना पड़ता कि छूटी हुई मीटिंग में क्या हुआ।",
      team: "मीटिंग ऑपरेटर + डिसीज़न आर्काइविस्ट",
      cadence: "हर मीटिंग से पहले, उसके दौरान और बाद में",
    },
    ad_dashboard: {
      label: "ऐड डैशबोर्ड एक करें",
      title: "Meta, Google और Amazon के ऐड्स एक लाइव व्यू में देखें।",
      description:
        "खर्च, रेवेन्यू, CAC, ROAS, क्रिएटिव परफ़ॉर्मेंस और असामान्य बदलावों को आपके बिज़नेस के हिसाब से बने एक डैशबोर्ड में लाएं।",
      result:
        "मालिक बिना किसी और स्प्रेडशीट एक्सपोर्ट का इंतज़ार किए देखते हैं कि कहां बढ़ाना है, कहां रोकना है और कहां जांच करनी है।",
      team: "परफ़ॉर्मेंस एनालिस्ट + डैशबोर्ड बिल्डर",
      cadence: "लाइव डैशबोर्ड, रोज़ असामान्य बदलावों की जांच के साथ",
    },
    client_onboarding: {
      label: "नए क्लाइंट को ऑनबोर्ड करें",
      title: "साइन हुए क्लाइंट को बिना किसी रुकावट के पहले नतीजे तक पहुंचाएं।",
      description:
        "वर्कस्पेस बनाएं, एक्सेस और दस्तावेज़ जुटाएं, ज़िम्मेदार तय करें, किकऑफ़ शेड्यूल करें और हर निर्भरता नज़र में रखें।",
      result:
        "साइन करने से लेकर पहले नतीजे तक क्लाइंट को एक ही, तालमेल भरी प्रक्रिया मिलती है।",
      team: "ऑनबोर्डिंग लीड + क्लाइंट कोऑर्डिनेटर",
      cadence: "कॉन्ट्रैक्ट साइन होते ही शुरू",
    },
    sales_pipeline: {
      label: "सेल्स फ़ॉलो-अप तैयार करें",
      title: "हर सेल्स प्रतिनिधि के सामने अगला सबसे सही कदम रखें।",
      description:
        "अकाउंट की ब्रीफ़िंग दें, जोखिम और रुचि के संकेत सामने लाएं, डिस्कवरी के सवाल तैयार करें और सही फ़ॉलो-अप का ड्राफ़्ट बनाएं।",
      result:
        "सेल्स प्रतिनिधि हर बातचीत में तैयार होकर जाते हैं और अगला कदम पहले से तय करके निकलते हैं।",
      team: "अकाउंट रिसर्चर + सेल्स राइटर",
      cadence: "हर कॉल से पहले और ग्राहक के हर जवाब के बाद",
    },
    customer_health: {
      label: "कस्टमर हेल्थ पर नज़र रखें",
      title: "रिन्यूअल की बातचीत से पहले ही चर्न का जोखिम देखें।",
      description:
        "प्रोडक्ट का इस्तेमाल, सपोर्ट हिस्ट्री, अकाउंट की बातचीत, वादे और रिश्ते के संकेत एक समीक्षा में लाएं।",
      result:
        "कस्टमर टीमें समय रहते जान लेती हैं कि किन अकाउंट्स पर ध्यान देना है और क्यों।",
      team: "कस्टमर एनालिस्ट + रिन्यूअल स्ट्रैटेजिस्ट",
      cadence: "रोज़ जोखिम की जांच और साप्ताहिक पोर्टफ़ोलियो समीक्षा",
    },
    new_hire: {
      label: "नए कर्मचारी को ऑनबोर्ड करें",
      title: "हर नए कर्मचारी के पहले महीने को आत्मविश्वास भरा बनाएं।",
      description:
        "कर्मचारी के आने से पहले प्लान, लोग, सिस्टम, पढ़ने की सामग्री, पड़ाव और भूमिका का संदर्भ तैयार रखें।",
      result:
        "नए कर्मचारी जल्दी काम में लगते हैं, और हर कदम याद रखने का बोझ किसी एक मैनेजर पर नहीं रहता।",
      team: "ऑनबोर्डिंग कोऑर्डिनेटर + रोल गाइड",
      cadence: "जॉइनिंग से पहले शुरू होने वाला 30 दिन का प्लान",
    },
    product_audit: {
      label: "प्रोडक्ट का ऑडिट करें",
      title: "प्रोडक्ट की अड़चनों को प्राथमिकता वाली सुधार सूची में बदलें।",
      description:
        "अहम फ़्लो जांचें, हर समस्या दर्ज करें, सबूत जोड़ें, असर के हिसाब से रैंक करें और टीम के लिए इंटरैक्टिव समीक्षा तैयार करें।",
      result:
        "प्रोडक्ट लीडर्स को बिखरे स्क्रीनशॉट्स के फ़ोल्डर की जगह फ़ैसले के लिए तैयार ऑडिट मिलता है।",
      team: "प्रोडक्ट ऑडिटर + सीनियर रिव्यूअर",
      cadence: "लॉन्च और प्लानिंग साइकल से पहले, ज़रूरत के हिसाब से",
    },
    cash_flow: {
      label: "कैश फ़्लो सुरक्षित रखें",
      title: "कैश से जुड़ा फ़ैसला अर्जेंट होने से पहले ही जान लें।",
      description:
        "वसूली, नियमित खर्च, रनवे, फ़ोरकास्ट में बदलाव और असामान्य लेन-देन को मालिकों के लिए तैयार एक समीक्षा में ट्रैक करें।",
      result:
        "लीडर्स महीने के अंत की क्लोज़िंग का इंतज़ार किए बिना दबाव का बिंदु, उसकी वजह और अगला फ़ैसला देख पाते हैं।",
      team: "फ़ाइनेंस एनालिस्ट + ऑपरेटिंग पार्टनर",
      cadence: "रोज़ अपवादों की जांच और साप्ताहिक कैश समीक्षा",
    },
  },
};

// Outcome data merged with its copy, once per locale.
const OUTCOMES = {
  en: OUTCOME_DATA.map((outcome) => ({ ...outcome, ...OUTCOME_COPY.en[outcome.id] })),
  hi: OUTCOME_DATA.map((outcome) => ({ ...outcome, ...OUTCOME_COPY.hi[outcome.id] })),
} satisfies Record<Locale, unknown>;

type LibraryCopy = {
  introLabel: string;
  introHeading: string;
  // Text around the "Cabinet" wordmark in "... in Cabinet Cloud. ...".
  introBeforeBrand: string;
  introAfterBrand: string;
  introSide: string;
  browseLink: string;
  selectLabel: string;
  tablistLabel: string;
  // Full status, shown in the panel badge and the mobile select.
  status: Record<TemplateStatus, string>;
  // Compact status for the narrow tab pill.
  statusPill: Record<Exclude<TemplateStatus, "Available">, string>;
  // Appended to an option in the mobile select for unavailable outcomes.
  optionSuffix: (status: string) => string;
  businessResult: string;
  businessImpact: string;
  whatComesReady: string;
  aiTeam: string;
  cadence: string;
  connectors: string;
  connectorsValue: (count: number) => string;
  connectSystems: string;
  inspectTeam: string;
  templatePlanned: string;
  capabilityInProgress: string;
};

const LIBRARY_COPY: Record<Locale, LibraryCopy> = {
  en: {
    introLabel: "Cabinet templates",
    introHeading: "Plug-and-play AI teams for real results.",
    introBeforeBrand:
      "Each cabinet runs as an always-on team on its own dedicated machine, self-hosted or in ",
    introAfterBrand: " Cloud. Real software doing real work while you sleep.",
    introSide:
      "Each cabinet is a complete AI team: agents, jobs, and knowledge. Clone a directory. Run a company.",
    browseLink: "Browse the full template library",
    selectLabel: "Business outcome",
    tablistLabel: "Business outcomes",
    status: { Available: "Available", Planned: "Planned", "Platform preview": "Platform preview" },
    statusPill: { Planned: "Planned", "Platform preview": "Preview" },
    optionSuffix: (status) => ` \u2014 ${status}`,
    businessResult: "Business result",
    businessImpact: "Business impact",
    whatComesReady: "What comes ready",
    aiTeam: "AI team",
    cadence: "Operating cadence",
    connectors: "Connectors",
    connectorsValue: (count) => `${count} systems connected for this workflow`,
    connectSystems: "Connect company systems",
    inspectTeam: "Inspect this AI team",
    templatePlanned: "Template planned",
    capabilityInProgress: "Platform capability in progress",
  },
  hi: {
    introLabel: "Cabinet टेम्पलेट",
    introHeading: "प्लग-एंड-प्ले AI टीमें, ठोस नतीजों के लिए।",
    introBeforeBrand:
      "हर cabinet एक ऐसी टीम है जो हमेशा चालू रहती है और अपनी अलग मशीन पर चलती है, चाहे सेल्फ़-होस्टेड हो या ",
    introAfterBrand: " Cloud में। असली सॉफ़्टवेयर, जो आपके सोते समय भी असली काम करता है।",
    introSide:
      "हर cabinet एक पूरी AI टीम है: एजेंट, जॉब्स और नॉलेज। एक डायरेक्टरी क्लोन करें। पूरी कंपनी चलाएं।",
    browseLink: "पूरी टेम्पलेट लाइब्रेरी देखें",
    selectLabel: "बिज़नेस नतीजा",
    tablistLabel: "बिज़नेस नतीजे",
    status: { Available: "उपलब्ध", Planned: "योजना में", "Platform preview": "प्लेटफ़ॉर्म प्रीव्यू" },
    statusPill: { Planned: "योजना में", "Platform preview": "प्रीव्यू" },
    optionSuffix: (status) => ` (${status})`,
    businessResult: "बिज़नेस नतीजा",
    businessImpact: "बिज़नेस पर असर",
    whatComesReady: "क्या-क्या तैयार मिलता है",
    aiTeam: "AI टीम",
    cadence: "काम का शेड्यूल",
    connectors: "कनेक्टर",
    connectorsValue: (count) => `इस वर्कफ़्लो के लिए ${count} सिस्टम जुड़े हैं`,
    connectSystems: "कंपनी के सिस्टम जोड़ें",
    inspectTeam: "इस AI टीम को देखें",
    templatePlanned: "टेम्पलेट योजना में है",
    capabilityInProgress: "इस क्षमता पर काम जारी है",
  },
};

export function CabinetTemplatesIntro({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const reduceMotion = useReducedMotion();
  const Heading = headingLevel;
  const t = LIBRARY_COPY[useLocale()];

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      className="grid items-end gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12"
    >
      <div>
        <p className="section-label">{t.introLabel}</p>
        <Heading className="mt-3 max-w-[15ch] font-section text-[clamp(2.15rem,3.35vw,3.4rem)] leading-[1.01] text-text-primary">
          {t.introHeading}
        </Heading>
        <p className="mt-3 text-lg leading-relaxed text-text-secondary">
          {t.introBeforeBrand}
          <span className="font-brand italic">Cabinet</span>
          {t.introAfterBrand}
        </p>
      </div>
      <div className="lg:pb-1">
        <p className="max-w-xl text-base leading-relaxed text-text-secondary">
          {t.introSide}
        </p>
        <Link
          href="/templates#browse"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-warm"
        >
          {t.browseLink} <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export function CabinetLibrary() {
  return (
    <section id="workflows" className="home-snap-section home-viewport-section home-workflows-section scroll-mt-20 bg-bg-warm px-5 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <CabinetTemplatesIntro />
        <CabinetOutcomes />
      </div>
    </section>
  );
}

export function CabinetOutcomes() {
  const [activeId, setActiveId] = useState<OutcomeId>("email");
  const reduceMotion = useReducedMotion();
  const locale = useLocale();
  const t = LIBRARY_COPY[locale];
  const outcomes = OUTCOMES[locale];
  const activeIndex = outcomes.findIndex((outcome) => outcome.id === activeId);
  const active = outcomes[activeIndex];

  function moveSelection(offset: number) {
    const next = outcomes[(activeIndex + offset + outcomes.length) % outcomes.length];
    setActiveId(next.id);
    window.requestAnimationFrame(() => {
      document.getElementById(`outcome-tab-${next.id}`)?.focus();
    });
  }

  return (
        <div className="home-product-surface mt-[clamp(1.25rem,2.4svh,2rem)] overflow-hidden rounded-[28px] bg-bg-card lg:grid lg:h-[clamp(450px,61svh,620px)] lg:grid-cols-[300px_minmax(0,1fr)]">
          <div className="p-3 lg:hidden">
            <label htmlFor="outcome-select" className="sr-only">
              {t.selectLabel}
            </label>
            <select
              id="outcome-select"
              value={activeId}
              onChange={(event) => setActiveId(event.target.value as OutcomeId)}
              className="w-full rounded-xl border border-border bg-bg-warm px-4 py-3 text-sm font-semibold text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35"
            >
              {outcomes.map((outcome) => (
                <option key={outcome.id} value={outcome.id}>
                  {outcome.label}
                  {outcome.status !== "Available" ? t.optionSuffix(t.status[outcome.status]) : ""}
                </option>
              ))}
            </select>
          </div>
          <div
            role="tablist"
            aria-label={t.tablistLabel}
            className="outcome-tablist hidden gap-2 bg-bg-card p-3 lg:flex lg:h-full lg:flex-col lg:gap-1 lg:overflow-x-hidden lg:overflow-y-auto lg:overscroll-contain lg:border-r lg:border-border lg:bg-bg-card lg:p-3"
          >
            {outcomes.map((outcome, index) => {
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
                      {t.statusPill[outcome.status]}
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
                  <Sparkles aria-hidden className="h-3.5 w-3.5 text-accent" /> {t.businessResult}
                </span>
                <span className="rounded-full bg-white/72 px-3 py-1.5 text-[10px] font-semibold text-text-secondary">
                  {t.status[active.status]}
                </span>
              </div>

              <Image
                src={active.icon}
                alt=""
                width={118}
                height={118}
                className="mt-4 h-20 w-20 object-contain drop-shadow-[0_18px_20px_rgba(92,62,39,0.14)] lg:h-[clamp(4.25rem,8svh,5.75rem)] lg:w-[clamp(4.25rem,8svh,5.75rem)]"
              />
              <h3
                className={
                  locale === "hi"
                    ? // Devanagari runs wider and needs taller lines, so the
                      // Hindi title gets more measure and a smaller size to
                      // fit the fixed-height panel.
                      "mt-3 max-w-[20ch] font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.3] text-text-primary"
                    : "mt-3 max-w-[12ch] font-display text-[clamp(2.15rem,3.5vw,3.25rem)] leading-[0.98] tracking-[-0.052em] text-text-primary"
                }
              >
                {active.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary lg:text-base">
                {active.description}
              </p>

              <div className="mt-auto pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
                  {t.businessImpact}
                </p>
                <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-text-primary">
                  {active.result}
                </p>
              </div>
            </div>

            <aside className="flex min-h-0 flex-col bg-white/62 p-6 backdrop-blur-sm sm:p-8 lg:m-3 lg:overflow-y-auto lg:rounded-[22px] lg:p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
                {t.whatComesReady}
              </p>
              <div className="mt-4 space-y-2">
                <ReceiptRow icon="/brand/ui/team.png" label={t.aiTeam} value={active.team} />
                <ReceiptRow icon="/brand/ui/calendar.png" label={t.cadence} value={active.cadence} />
                <ReceiptRow
                  icon="/brand/ui/network.png"
                  label={t.connectors}
                  value={t.connectorsValue(active.connectors.length)}
                />
              </div>

              <div className="mt-5 border-t border-black/8 pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">
                  {t.connectSystems}
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
                  <Link
                    href={`/templates/${active.slug}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-text-primary px-5 py-3.5 text-sm font-semibold text-bg-card transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35"
                  >
                    {t.inspectTeam} <ArrowRight aria-hidden className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className="inline-flex w-full items-center justify-center rounded-full bg-white/70 px-5 py-3.5 text-sm font-semibold text-text-secondary">
                    {active.status === "Planned" ? t.templatePlanned : t.capabilityInProgress}
                  </span>
                )}
              </div>
            </aside>
          </motion.article>
          </AnimatePresence>
        </div>
  );
}

function ReceiptRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl bg-white/72 p-3.5">
      <span className="grid h-8 w-8 shrink-0 place-items-center">
        <Image src={icon} alt="" width={30} height={30} className="h-7 w-7 object-contain" />
      </span>
      <span>
        <strong className="block text-xs text-text-primary">{label}</strong>
        <span className="mt-1 block text-[11px] leading-relaxed text-text-secondary">{value}</span>
      </span>
    </div>
  );
}
