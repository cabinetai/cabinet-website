import {
  Landmark,
  HeartPulse,
  Scale,
  Briefcase,
  Rocket,
  type LucideIcon,
} from "lucide-react";

/**
 * "Cabinet for [industry]" pages. Where the role pages lead with function,
 * these lead with the reason regulated/enterprise buyers pick a self-hosted
 * tool: the data never leaves their control. Content is positioning, not
 * compliance claims — SOC 2 is still in progress (see homepage trust block).
 */

export type Industry = {
  slug: string;
  label: string;
  menuBlurb: string;
  icon: LucideIcon;
  eyebrow: string;
  headline: string;
  subhead: string;
  stakes: { heading: string; points: string[] };
  uses: string[];
  /** One line on why the sovereignty model fits this industry. */
  complianceNote: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "financial-services",
    label: "Financial Services",
    menuBlurb: "Research and reporting where the data never leaves your walls.",
    icon: Landmark,
    eyebrow: "Cabinet for Financial Services",
    headline: "AI on your most sensitive data — without sending it anywhere.",
    subhead:
      "Self-hosted by design: deal research, memos, and reporting run on your infrastructure, with your model keys, and a full git-backed audit trail. The data your compliance team worries about never leaves your walls.",
    stakes: {
      heading: "Cloud AI is a non-starter when the data is regulated",
      points: [
        "Sending MNPI, client data, or deal docs to a third-party cloud is a compliance and reputational risk.",
        "Analysts re-do the same research and memos every cycle, by hand.",
        "Auditors want a trail; most AI tools can't show who-knew-what-when.",
      ],
    },
    uses: [
      "Deal and market research compiled into structured memos",
      "Investment committee packets assembled from source data",
      "Portfolio and competitor monitoring on a schedule",
      "Policy and procedure knowledge that stays current",
    ],
    complianceNote:
      "Self-hosted means client data stays in your environment and your region; every change is versioned and attributable.",
  },
  {
    slug: "healthcare",
    label: "Healthcare",
    menuBlurb: "Protocols, research, and ops on infrastructure you control.",
    icon: HeartPulse,
    eyebrow: "Cabinet for Healthcare",
    headline: "Put AI to work on clinical knowledge — on your own infrastructure.",
    subhead:
      "Protocols, literature reviews, and operational playbooks become a living knowledge base with an AI team — self-hosted, with no patient data crossing into a vendor cloud and no model training on what you share.",
    stakes: {
      heading: "Patient data and vendor clouds don't mix",
      points: [
        "PHI can't be casually pasted into a consumer AI chat.",
        "Protocols and literature go stale faster than anyone can maintain them.",
        "Operational knowledge lives in binders and the most senior person's memory.",
      ],
    },
    uses: [
      "Literature and guideline reviews synthesized for clinicians",
      "Protocol and SOP libraries kept current by agents",
      "Operational reporting assembled from source systems",
      "Onboarding and training knowledge that answers itself",
    ],
    complianceNote:
      "Run it inside your own environment under the controls you already enforce; nothing you share trains a model.",
  },
  {
    slug: "legal",
    label: "Legal",
    menuBlurb: "Matter knowledge and drafting under privilege you preserve.",
    icon: Scale,
    eyebrow: "Cabinet for Legal",
    headline: "Privileged work stays privileged — and your AI still helps.",
    subhead:
      "Matter research, first drafts, and a firm-wide knowledge base run on infrastructure you control, with a complete audit trail — so confidentiality and privilege aren't traded away for AI leverage.",
    stakes: {
      heading: "Confidentiality is the whole job",
      points: [
        "Client matters can't be exposed to a third-party model provider.",
        "Precedent and know-how walk out the door when people leave.",
        "Drafting and research eat the hours clients won't pay for.",
      ],
    },
    uses: [
      "Matter research compiled with citations to source",
      "First drafts from your templates and precedent",
      "A firm knowledge base that captures know-how",
      "Intake and conflict summaries on demand",
    ],
    complianceNote:
      "Self-hosted and BYO-keys keep privileged material in your control, with a git-backed record of every change.",
  },
  {
    slug: "professional-services",
    label: "Professional Services",
    menuBlurb: "Proposals, delivery, and reusable IP for consultancies & agencies.",
    icon: Briefcase,
    eyebrow: "Cabinet for Professional Services",
    headline: "Turn every engagement into reusable, AI-leveraged IP.",
    subhead:
      "Proposals, research, and delivery artifacts compound into a knowledge base your AI team draws on — so consultancies and agencies win more work and deliver faster without re-inventing the wheel each time.",
    stakes: {
      heading: "Your margin is in not redoing the same work",
      points: [
        "Every proposal and deck starts from a blank page.",
        "Hard-won engagement knowledge is scattered across clients and people.",
        "Senior time goes to drafting instead of judgment.",
      ],
    },
    uses: [
      "Proposals and SOWs drafted from past wins",
      "Engagement research and competitive scans",
      "Reusable frameworks and deliverable templates",
      "Client-ready reporting assembled on a schedule",
    ],
    complianceNote:
      "Each client's data stays in your environment; share nothing with a vendor cloud you don't control.",
  },
  {
    slug: "startups",
    label: "Startups & Scale-ups",
    menuBlurb: "A whole AI org for a team that's still small.",
    icon: Rocket,
    eyebrow: "Cabinet for Startups & Scale-ups",
    headline: "Run like a company 5× your size — before you hire for it.",
    subhead:
      "Onboard an AI team across go-to-market, product, and ops on day one. Open-source and self-hosted, so there's no per-seat AI tax and no vendor lock-in as you scale.",
    stakes: {
      heading: "Too much to do, too few people, too little budget",
      points: [
        "Founders are the integration layer for the whole company.",
        "Per-seat AI tools tax you for every hire you make.",
        "Tool sprawl starts on day one and never stops.",
      ],
    },
    uses: [
      "GTM research, outreach, and content on autopilot",
      "Product discovery synthesized from customer signal",
      "Investor updates and board packets drafted for you",
      "One knowledge base instead of ten subscriptions",
    ],
    complianceNote:
      "Open source and self-hosted: own your stack from day one, with no lock-in to unwind later.",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
