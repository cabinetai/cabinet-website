import Image from "next/image";
import Link from "next/link";
import type { ReactElement, ReactNode } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  FileText,
  GitBranch,
  Shield,
  Users,
  X,
} from "lucide-react";
import { IntegrationScene } from "@/components/integration-scene";
import { CloudCabinet } from "@/components/marketing/cloud-cabinet";
import { PrinciplesShowcase } from "@/components/principles-showcase";
import { DiscordIcon } from "@/components/site-icons";
import { WoodIcon } from "@/components/wood-icon";
import {
  CopyButton,
  TerminalDemo,
  TypingText,
} from "@/components/marketing/legacy-interactive-primitives";
import { MotionReveal } from "@/components/marketing/motion-primitives";
import { CABINETS, CABINETS_SITE, cabinetCover, cabinetUrl } from "@/lib/cabinets";
import { DISCORD_URL } from "@/lib/site-config";
import { DownloadButtons } from "@/components/marketing/download-buttons";
import { DownloadShowcase } from "@/components/marketing/download-showcase";
import { SOLUTIONS, SOLUTION_STORIES } from "@/lib/solutions";
import type { Locale } from "@/lib/i18n";

// The brand name as it is set inside running copy.
const BRAND = <span className="font-brand italic">Cabinet</span>;

const PROVIDERS = [
  { src: "/providers/claude.svg", name: "Claude" },
  { src: "/providers/openai.svg", name: "OpenAI" },
  { src: "/providers/gemini.svg", name: "Gemini" },
  { src: "/providers/grok.svg", name: "Grok Code" },
  { src: "/providers/copilot.svg", name: "Copilot" },
  { src: "/providers/cursor.svg", name: "Cursor" },
  { src: "/providers/opencode.svg", name: "opencode" },
  { src: "/providers/pi.svg", name: "Pi" },
];

// Tools your company runs on - rendered as a scrolling, multi-row logo wall.
export const INTEGRATION_LOGOS: string[] = "slack microsoft-teams notion github hubspot confluence google-drive gmail stripe zendesk figma workday intercom servicenow airtable bamboohr brex docusign looker mixpanel quickbooks tableau greenhouse google-calendar google-meet onedrive sharepoint bigquery gong salesforce jira zoom snowflake asana calendly clickup dropbox box gitlab databricks datadog amplitude linear"
  .split(" ")
  .map((n) => `/logos/${n}.svg`);

// Three interleaved rows so each band mixes brands evenly.
const INTEGRATION_ROWS = [0, 1, 2].map((r) =>
  INTEGRATION_LOGOS.filter((_, i) => i % 3 === r),
);

function integrationName(src: string): string {
  const base = src.split("/").pop()!.replace(/\.(svg|webp|png)$/, "");
  return base
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

type TrustBadgeText = { label: string; status?: string; desc: string };

const TRUST_BADGES: { img: string; text: Record<Locale, TrustBadgeText> }[] = [
  {
    img: "/brand/trust/soc2.png",
    text: {
      en: {
        label: "SOC 2 Type II",
        status: "In progress",
        desc: "We're working toward it, and we'll show you the report, not just a badge.",
      },
      hi: {
        label: "SOC 2 Type II",
        status: "प्रक्रिया जारी",
        desc: "हम इस पर काम कर रहे हैं। आपको सिर्फ़ बैज नहीं, पूरी रिपोर्ट दिखाएँगे।",
      },
    },
  },
  {
    img: "/brand/trust/self-hosted.png",
    text: {
      en: {
        label: "Self-hosted",
        desc: "Runs in your environment, under the controls you already enforce.",
      },
      hi: {
        label: "सेल्फ़-होस्टेड",
        desc: "आपके अपने एनवायरनमेंट में चलता है, उन्हीं नियंत्रणों के तहत जो आप पहले से लागू करते हैं।",
      },
    },
  },
  {
    img: "/brand/trust/not-training.png",
    text: {
      en: {
        label: "Not training data",
        desc: "Your prompts and content are never used to train a model.",
      },
      hi: {
        label: "ट्रेनिंग में इस्तेमाल नहीं",
        desc: "आपके प्रॉम्प्ट और कंटेंट से कभी किसी मॉडल को ट्रेन नहीं किया जाता।",
      },
    },
  },
  {
    img: "/brand/trust/byo-keys.png",
    text: {
      en: {
        label: "Bring your own keys",
        desc: "Your model providers, your API keys. Inference never routes through us.",
      },
      hi: {
        label: "अपनी API कीज़",
        desc: "मॉडल प्रोवाइडर आपके, API कीज़ आपकी। इन्फ़रेंस कभी हमारे ज़रिए नहीं होता।",
      },
    },
  },
  {
    img: "/brand/trust/audit-log.png",
    text: {
      en: {
        label: "Audit log & git history",
        desc: "Every change to data and agents is versioned, diffable, and attributable.",
      },
      hi: {
        label: "ऑडिट लॉग और Git हिस्ट्री",
        desc: "डेटा और एजेंटों में हर बदलाव का वर्ज़न दर्ज होता है। आप बदलावों की तुलना कर सकते हैं और देख सकते हैं कि किसने क्या बदला।",
      },
    },
  },
  {
    img: "/brand/trust/sso-scim.png",
    text: {
      en: {
        label: "SSO & SCIM",
        status: "Enterprise track",
        desc: "SAML single sign-on and provisioning for teams that need it.",
      },
      hi: {
        label: "SSO और SCIM",
        status: "एंटरप्राइज़ के लिए",
        desc: "जिन टीमों को ज़रूरत है, उनके लिए SAML सिंगल साइन-ऑन और यूज़र प्रोविज़निंग।",
      },
    },
  },
  {
    img: "/brand/trust/data-residency.png",
    text: {
      en: {
        label: "Your data residency",
        desc: "Self-hosted means your knowledge lives in your region, under your policies.",
      },
      hi: {
        label: "आपकी डेटा रेज़िडेंसी",
        desc: "सेल्फ़-होस्टेड होने का मतलब है कि आपकी जानकारी आपके क्षेत्र में, आपकी नीतियों के तहत रहती है।",
      },
    },
  },
];

type TestimonialText = { quote: string; context: string; role: string; location: string };

const TESTIMONIALS: {
  name: string;
  image: string;
  linkedin: string;
  initials: string;
  text: Record<Locale, TestimonialText>;
}[] = [
  {
    name: "Collin Davis",
    image: "/testimonials/collin-davis.jpg",
    linkedin: "https://www.linkedin.com/in/collinedavis/",
    initials: "CD",
    text: {
      en: {
        quote:
          "Cabinet is a big unlock for how I think about operating a business with AI.",
        context:
          "Before Cabinet, AI felt fragmented: great for single tasks, but hard to orchestrate across the business. Every business has different workflows, and Cabinet makes it possible to turn those workflows into an AI team.",
        role: "Chief Product Officer, Clover",
        location: "Florida, USA",
      },
      hi: {
        quote:
          "AI के साथ बिज़नेस चलाने को लेकर मेरी सोच में Cabinet एक बड़ा बदलाव लाया है।",
        context:
          "Cabinet से पहले AI बिखरा हुआ लगता था: अलग-अलग कामों के लिए बढ़िया, पर पूरे बिज़नेस में उसे एक साथ चलाना मुश्किल। हर बिज़नेस के वर्कफ़्लो अलग होते हैं, और Cabinet उन्हीं वर्कफ़्लो को एक AI टीम में बदलना संभव बनाता है।",
        role: "चीफ़ प्रोडक्ट ऑफ़िसर, Clover",
        location: "फ़्लोरिडा, अमेरिका",
      },
    },
  },
  {
    name: "Jean Pierre Traets",
    image: "/testimonials/jean-pierre-traets.jpg",
    linkedin: "https://www.linkedin.com/in/jean-pierre-traets/",
    initials: "JT",
    text: {
      en: {
        quote:
          "Cabinet is exactly doing what it's strong at: orchestrating structure, standardization, opportunities, and challenges in a digital way.",
        context:
          "Cabinet is the missing persistence and memory layer that TOGAF, ISO, and many other framework tools have never had. The framework provides the skeleton; Cabinet provides the living connective tissue.",
        role: "Sustainability Solutions Architect",
        location: "EMEA",
      },
      hi: {
        quote:
          "Cabinet ठीक वही कर रहा है जिसमें वह सबसे मज़बूत है: ढाँचे, मानकीकरण, अवसरों और चुनौतियों को डिजिटल रूप से एक सूत्र में पिरोना।",
        context:
          "Cabinet वह स्थायी मेमोरी लेयर है जो TOGAF, ISO और कई दूसरे फ़्रेमवर्क टूल्स में कभी नहीं रही। फ़्रेमवर्क ढाँचा देता है, और Cabinet उसमें जान डालकर सब कुछ आपस में जोड़े रखता है।",
        role: "सस्टेनेबिलिटी सॉल्यूशंस आर्किटेक्ट",
        location: "EMEA",
      },
    },
  },
  {
    name: "Assaf Haski",
    image: "/testimonials/assaf-haski.jpg",
    linkedin: "https://www.linkedin.com/in/assafhaski/",
    initials: "AH",
    text: {
      en: {
        quote:
          "As one of the first users of Superhuman, I definitely see the same spark here.",
        context:
          "I use Cabinet to manage GTM and send emails through Apollo, and the whole system runs without me touching it, 24/7. The researcher agent built into Cabinet crafted award-winning GTM emails that blew my mind and achieved incredible open rates.",
        role: "Strategic narratives for high-stakes systems, from B2B SaaS growth to national public guidance",
        location: "",
      },
      hi: {
        quote:
          "Superhuman के शुरुआती यूज़र्स में से एक होने के नाते, मुझे यहाँ भी वही चमक साफ़ दिखती है।",
        context:
          "मैं Cabinet से GTM संभालता हूँ और Apollo के ज़रिए ईमेल भेजता हूँ। पूरा सिस्टम मेरे हाथ लगाए बिना 24/7 चलता है। Cabinet के रिसर्चर एजेंट ने ऐसे बेहतरीन GTM ईमेल लिखे कि मैं हैरान रह गया, और उनके ओपन रेट शानदार रहे।",
        role: "बड़े दांव वाले सिस्टम्स के लिए रणनीतिक नैरेटिव: B2B SaaS ग्रोथ से लेकर राष्ट्रीय स्तर के जन-मार्गदर्शन तक",
        location: "",
      },
    },
  },
];

/* Feature Card */
function FeatureCard({
  img,
  title,
  description,
  className = "",
  featured = false,
}: {
  img: string;
  title: string;
  description: string;
  className?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl p-6 card-hover ${
        featured ? "bg-gradient-to-br from-[#FBF2E4] to-[#F2E5CF] max-lg:text-center" : "bg-bg-card"
      } ${className}`}
    >
      {featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(224,178,60,0.18), transparent 70%)" }}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt=""
        loading="lazy"
        decoding="async"
        className={`relative z-10 mb-4 object-contain transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-2 ${
          featured ? "h-16 w-16 max-lg:mx-auto lg:h-[88px] lg:w-[88px]" : "h-16 w-16"
        }`}
      />
      <h3 className="relative z-10 mb-2 font-display text-lg text-text-primary">{title}</h3>
      <p className="relative z-10 text-sm leading-relaxed text-text-secondary">{description}</p>
    </div>
  );
}

/* Agent Cards */
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
        <div key={agent.name} className="rounded-xl p-5 card-skin card-hover group">
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

export function LegacyInstallTerminal() {
  return (
    <section className="py-24 border-t border-border bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="section-label mb-3">Install Flow</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">See <span className="font-brand italic">Cabinet</span>{" "}start up in the terminal
                                  </h2>
          <p className="text-text-secondary font-body-serif leading-relaxed">The install walkthrough is back. One command scaffolds the workspace, sets up your AI team, and gets <span className="font-brand italic">Cabinet</span>{" "}running locally.
                                  </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <TerminalDemo />
          <div className="mt-8 text-center">
            <a
              href="#get-started"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium btn-wood"
            >Install <span className="font-brand italic">Cabinet</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// IntegrationScene and CloudCabinet are client components that read the
// locale from context, so these wrappers accept the prop for a uniform call
// site but have no copy of their own.
type LocaleProps = { locale?: Locale };

export const LegacyIntegrationScene: (props: LocaleProps) => ReactElement = () => (
  <IntegrationScene />
);

const HERO_COPY: Record<
  Locale,
  {
    evaluating: ReactNode;
    bookDemo: string;
    titleTop: string;
    titleBottom: string;
    logoAlt: string;
    lede: string;
    terms: string;
    typing: string[];
  }
> = {
  en: {
    evaluating: <>Evaluating {BRAND}{" "}for your team?</>,
    bookDemo: "Book a demo",
    titleTop: "Your knowledge base.",
    titleBottom: "Your AI team.",
    logoAlt: "Cabinet: your files and knowledge in one drawer, a team of AI agents in the other",
    lede: "A free AI-first startup OS where everything lives as files on disk. No database. No vendor lock-in.",
    terms: "No subscription. No trial. No paywall. Clone it, run it, and make it your own.",
    typing: [
      "Onboard an AI team in 5 questions",
      "Ship HTML apps inside your KB",
      "Cron-scheduled AI agents that work 24/7",
      "Git-backed version history on every page",
      "PDF, CSV, markdown: all first-class content",
    ],
  },
  hi: {
    evaluating: <>अपनी टीम के लिए {BRAND}{" "}पर विचार कर रहे हैं?</>,
    bookDemo: "डेमो बुक करें",
    titleTop: "आपका नॉलेज बेस।",
    titleBottom: "आपकी AI टीम।",
    logoAlt: "Cabinet: एक दराज़ में आपकी फ़ाइलें और नॉलेज, दूसरी में AI एजेंटों की टीम",
    lede: "एक मुफ़्त, AI-फ़र्स्ट स्टार्टअप OS, जिसमें सारा काम आपकी अपनी डिस्क पर फ़ाइलों के रूप में रहता है। कोई डेटाबेस नहीं। कोई वेंडर लॉक-इन नहीं।",
    terms: "न सब्सक्रिप्शन, न ट्रायल, न पेवॉल। क्लोन करें, चलाएँ और अपनी ज़रूरत के हिसाब से ढालें।",
    typing: [
      "5 सवालों में अपनी AI टीम तैयार करें",
      "नॉलेज बेस के भीतर HTML ऐप्स चलाएँ",
      "तय शेड्यूल पर 24/7 काम करते AI एजेंट",
      "हर पेज की वर्ज़न हिस्ट्री, Git में सुरक्षित",
      "PDF, CSV, markdown: सबका पूरा सपोर्ट",
    ],
  },
};

export function LegacyHero({ locale = "en" }: LocaleProps) {
  const t = HERO_COPY[locale];
  // The invisible sizer holds the longest phrase so the typing animation
  // never reflows the content below.
  const sizer = t.typing.reduce((a, b) => (b.length > a.length ? b : a));
  return (
    <section className="relative flex items-center justify-center dot-grid overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-12">
        {/* Install Options */}
        <div className="hidden max-w-3xl mx-auto mb-20 lg:block">
          <DownloadButtons locale={locale} />
          <p className="mt-4 text-sm font-body-serif text-text-tertiary">{t.evaluating}{" "}
            <a
              href="/demo"
              className="text-accent underline underline-offset-2 hover:text-accent-warm"
            >
              {t.bookDemo}
            </a>
          </p>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.1] mb-6">
          <span className="font-display text-text-primary">{t.titleTop}</span>
          <br />
          <span className="font-display italic gradient-text">{t.titleBottom}</span>
        </h2>

        {/* Hero Illustration */}
        <div className="mx-auto mb-8 w-60 sm:w-72 md:w-80">
          <Image
            src="/brand/cabinet-logo-flip.webp"
            alt={t.logoAlt}
            width={812}
            height={835}
            className="h-auto w-full drop-shadow-2xl"
          />
        </div>

        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-4 leading-relaxed font-body-serif">
          {t.lede}
        </p>

        <p className="text-sm md:text-base text-text-tertiary max-w-2xl mx-auto mb-6 font-code">
          {t.terms}
        </p>

        {/* relative + invisible sizer reserves height for the longest phrase
            so the typing/deleting animation never reflows the border below */}
        <p className="relative text-base font-code text-text-tertiary max-w-xl mx-auto mb-10">
          <span aria-hidden className="invisible">
            {sizer}
          </span>
          <span className="absolute inset-0">
            <TypingText texts={t.typing} />
          </span>
        </p>
      </div>
    </section>
  );
}

const WHY_COPY: Record<
  Locale,
  {
    label: string;
    title: string;
    intro: ReactNode;
    files: { label: string; title: string; body: string; compare: string; compareLink: string; compareEnd: string };
    byoai: { label: string; title: string; body: string };
    agents: { label: string; title: string; body: string };
  }
> = {
  en: {
    label: "Why Cabinet",
    title: "The only AI workspace you actually own",
    intro: <>Search tools find. Chatbots answer. {BRAND}{" "}does the work: on your files, your models, your infrastructure.</>,
    files: {
      label: "Your work lives on disk",
      title: "Own your data",
      body: "Everything is Markdown in a folder you own. Grep it, git it, back it up. No export, no lock-in.",
      compare: "Compare",
      compareLink: "Notion alternatives for teams that want to own their data",
      compareEnd: ".",
    },
    byoai: {
      label: "Bring your own AI",
      title: "No AI tax",
      body: "Plug in the model accounts you already pay for: Claude, GPT, Gemini, Grok, local models. No markup, no new vendor.",
    },
    agents: {
      label: "Agents that do the work",
      title: "Always on",
      body: "Not just search and chat. A team of agents researches, drafts, and ships on a schedule, 24/7.",
    },
  },
  hi: {
    label: "Cabinet क्यों",
    title: "इकलौता AI वर्कस्पेस, जिसके मालिक सच में आप हैं",
    intro: <>सर्च टूल ढूँढ़ते हैं। चैटबॉट जवाब देते हैं। {BRAND}{" "}काम पूरा करता है: आपकी फ़ाइलों पर, आपके मॉडलों से, आपके इन्फ्रास्ट्रक्चर पर।</>,
    files: {
      label: "आपका काम, आपकी डिस्क पर",
      title: "डेटा पर पूरा अधिकार",
      body: "सब कुछ आपके अपने फ़ोल्डर में, Markdown फ़ाइलों के रूप में। उसे खोजें, Git में रखें, बैकअप लें। न एक्सपोर्ट की ज़रूरत, न लॉक-इन।",
      compare: "तुलना करें:",
      compareLink: "अपने डेटा पर नियंत्रण चाहने वाली टीमों के लिए Notion के विकल्प",
      compareEnd: "।",
    },
    byoai: {
      label: "अपना AI खुद चुनें",
      title: "AI पर कोई अतिरिक्त खर्च नहीं",
      body: "जिन मॉडल अकाउंट्स के लिए आप पहले से भुगतान करते हैं, उन्हें ही जोड़ें: Claude, GPT, Gemini, Grok, लोकल मॉडल। न कोई मार्कअप, न कोई नया वेंडर।",
    },
    agents: {
      label: "एजेंट जो काम पूरा करते हैं",
      title: "हमेशा सक्रिय",
      body: "सिर्फ़ सर्च और चैट नहीं। एजेंटों की एक टीम तय शेड्यूल पर, 24/7, रिसर्च करती है, ड्राफ़्ट तैयार करती है और काम पूरा करके देती है।",
    },
  },
};

export function LegacyWhyTriad({ locale = "en" }: LocaleProps) {
  const t = WHY_COPY[locale];
  return (
    <section className="py-24 border-t border-border bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">{t.label}</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            {t.title}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed">{t.intro}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3 max-w-6xl mx-auto">
          {/* Files */}
          <div className="group rounded-3xl bg-bg-card p-8 card-hover">
            <div className="relative flex h-52 items-center justify-center">
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(224,178,60,0.18), transparent 70%)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/icons/files.webp" alt="" loading="lazy" decoding="async" className="relative h-36 w-36 object-contain float-slow" />
            </div>
            <span className="section-label">{t.files.label}</span>
            <h3 className="mt-2 mb-2 font-display text-xl text-text-primary">{t.files.title}</h3>
            <p className="text-sm font-body-serif leading-relaxed text-text-secondary">{t.files.body}</p>
            <p className="mt-3 text-sm font-body-serif leading-relaxed text-text-secondary">
              {t.files.compare}{" "}
              <Link href="/compare/notion-alternatives" className="text-accent underline underline-offset-4 hover:text-accent-warm">
                {t.files.compareLink}
              </Link>{t.files.compareEnd}
            </p>
          </div>

          {/* Bring your own AI - rotating vendor ring */}
          <div className="group rounded-3xl bg-bg-card p-8 card-hover">
            <div className="relative flex h-52 items-center justify-center">
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(139,94,60,0.12), transparent 70%)" }} />
              <div className="orbit relative h-[200px] w-[200px]">
                {[
                  { v: "claude", l: 156, t: 78 }, { v: "openai", l: 133, t: 133 }, { v: "gemini", l: 78, t: 156 }, { v: "grok", l: 23, t: 133 },
                  { v: "opencode", l: 0, t: 78 }, { v: "copilot", l: 23, t: 23 }, { v: "cursor", l: 78, t: 0 }, { v: "pi", l: 133, t: 23 },
                ].map((p) => (
                  <span key={p.v} className="orbit__item absolute" style={{ left: p.l, top: p.t }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/brand/vendors/${p.v}.png`} alt="" loading="lazy" decoding="async" className="h-11 w-11 object-contain" />
                  </span>
                ))}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/cabinet-logo-512.png" alt="" loading="lazy" decoding="async" className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-lg" />
            </div>
            <span className="section-label">{t.byoai.label}</span>
            <h3 className="mt-2 mb-2 font-display text-xl text-text-primary">{t.byoai.title}</h3>
            <p className="text-sm font-body-serif leading-relaxed text-text-secondary">{t.byoai.body}</p>
          </div>

          {/* Agents - abstract floating shapes */}
          <div className="group rounded-3xl bg-bg-card p-8 card-hover">
            <div className="relative flex h-52 items-center justify-center">
              <div aria-hidden className="agent-aura pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(111,164,90,0.16), transparent 70%)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/agents-shapes.webp" alt="" loading="lazy" decoding="async" className="relative h-44 w-44 object-contain agent-heartbeat" />
            </div>
            <span className="section-label">{t.agents.label}</span>
            <h3 className="mt-2 mb-2 font-display text-xl text-text-primary">{t.agents.title}</h3>
            <p className="text-sm font-body-serif leading-relaxed text-text-secondary">{t.agents.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS_COPY: Record<
  Locale,
  { label: string; title: ReactNode; onLinkedIn: (name: string) => string }
> = {
  en: {
    label: "Testimonials",
    title: <>How teams achieve 10x work with {BRAND}</>,
    onLinkedIn: (name) => `${name} on LinkedIn`,
  },
  hi: {
    label: "ग्राहकों की राय",
    title: <>{BRAND}{" "}के साथ टीमें 10 गुना काम कैसे कर रही हैं</>,
    onLinkedIn: (name) => `LinkedIn पर ${name}`,
  },
};

export function LegacyTestimonials({ locale = "en" }: LocaleProps) {
  const copy = TESTIMONIALS_COPY[locale];
  return (
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
          <p className="section-label mb-3">{copy.label}</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary">{copy.title}</h2>
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
          {[...TESTIMONIALS, ...TESTIMONIALS].map((item, i) => {
            const t = { ...item, ...item.text[locale] };
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
            const isCollin = t.name === "Collin Davis";
            return (
              <figure
                key={`${t.name}-${i}`}
                aria-hidden={i >= TESTIMONIALS.length}
                className={`mr-6 flex w-[340px] shrink-0 flex-col rounded-2xl card-skin p-6 shadow-sm card-hover sm:w-[380px] ${
                  isCollin ? "text-center items-center" : ""
                }`}
              >
                {/* Photo at the top - clickable to LinkedIn */}
                {t.linkedin ? (
                  <a
                    href={t.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={copy.onLinkedIn(t.name)}
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
  );
}

export function LegacyCustomerStories() {
  return (
    <section className="py-24 border-t border-border bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-3 flex items-center justify-center gap-2">
          <p className="section-label">Customer stories</p>
          <span className="rounded-full bg-bg-card px-2.5 py-0.5 font-code text-[10px] uppercase tracking-wider text-text-tertiary ring-1 ring-border-light">
            Illustrative
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4 text-center">What teams ship with <span className="font-brand italic">Cabinet</span>
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed mb-12 text-center">
          Anonymized scenarios that mirror how teams put an AI crew to work. Real,
          named case studies land here as teams go public.
        </p>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {["sales", "marketing", "founders"].map((slug) => {
            const s = SOLUTION_STORIES[slug];
            return (
              <div key={slug} className="flex flex-col rounded-2xl card-skin p-7 card-hover">
                <div className="font-display text-4xl tracking-tight text-accent">{s.metric}</div>
                <p className="mt-1.5 text-sm text-text-secondary font-body-serif">{s.metricLabel}</p>
                <blockquote className="mt-5 flex-1 font-body-serif leading-relaxed text-text-secondary">
                  &ldquo;{s.quote}&rdquo;
                </blockquote>
                <p className="mt-4 font-code text-xs text-text-tertiary">{s.attribution}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const BYOAI_COPY: Record<Locale, { label: string; title: string; intro: ReactNode; more: string }> = {
  en: {
    label: "Bring your own AI",
    title: "Works with the AI you already pay for",
    intro: <>{BRAND}{" "}runs on your existing model accounts and subscriptions. There&apos;s no bundled inference marked up on top, and no new AI vendor to push through procurement. Point it at what your team already uses.</>,
    more: "…plus local models, and whatever comes next.",
  },
  hi: {
    label: "अपना AI खुद चुनें",
    title: "उसी AI के साथ काम करता है, जिसके लिए आप पहले से भुगतान करते हैं",
    intro: <>{BRAND}{" "}आपके मौजूदा मॉडल अकाउंट्स और सब्सक्रिप्शन पर चलता है। ऊपर से मार्कअप जोड़कर कोई इन्फ़रेंस नहीं बेचा जाता, और प्रोक्योरमेंट में किसी नए AI वेंडर को मंज़ूरी दिलाने की ज़रूरत नहीं पड़ती। आपकी टीम जो पहले से इस्तेमाल करती है, {BRAND}{" "}को उसी से जोड़ दें।</>,
    more: "…साथ में लोकल मॉडल, और आगे जो भी आए।",
  },
};

export function LegacyByoai({ locale = "en" }: LocaleProps) {
  const t = BYOAI_COPY[locale];
  return (
    <section id="byoai" className="py-24 border-t border-border bg-bg-card">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="section-label mb-3">{t.label}</p>
        <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
          {t.title}
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed mb-12">
          {t.intro}
        </p>

        <div className="grid grid-cols-8 gap-2 sm:gap-3 max-w-4xl mx-auto">
          {PROVIDERS.map((p) => (
            <div key={p.name} className="group flex flex-col items-center gap-2">
              <div className="flex aspect-square w-full items-center justify-center rounded-2xl card-skin transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-lg">
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
          {t.more}
        </p>
      </div>
    </section>
  );
}

const INTEGRATIONS_COPY: Record<Locale, { label: string; title: string; intro: ReactNode; more: string }> = {
  en: {
    label: "Integrations",
    title: "Connect to everything that runs your company",
    intro: <>Your company runs on dozens of tools. {BRAND}{" "}brings the work scattered across them into one place you own, where your team and its agents can find it, act on it, and keep it moving.</>,
    more: "…and the rest of the stack your team already uses.",
  },
  hi: {
    label: "इंटीग्रेशन",
    title: "उन सभी टूल्स से जुड़ें, जिन पर आपकी कंपनी चलती है",
    intro: <>आपकी कंपनी दर्जनों टूल्स पर चलती है। {BRAND}{" "}उनमें बिखरे काम को एक ऐसी जगह ले आता है जो पूरी तरह आपकी है, जहाँ आपकी टीम और उसके एजेंट उसे ढूँढ़ सकें, उस पर काम कर सकें और उसे आगे बढ़ाते रहें।</>,
    more: "…और बाकी सभी टूल्स, जो आपकी टीम पहले से इस्तेमाल करती है।",
  },
};

export function LegacyIntegrationsMarquee({ locale = "en" }: LocaleProps) {
  const t = INTEGRATIONS_COPY[locale];
  return (
    <section id="integrations" className="overflow-hidden border-t border-border bg-bg-warm py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="section-label mb-3">{t.label}</p>
        <h2 className="mb-4 font-display text-3xl text-text-primary md:text-4xl">
          {t.title}
        </h2>
        <p className="mx-auto max-w-2xl font-body-serif leading-relaxed text-text-secondary">{t.intro}</p>
      </div>

      <div className="mt-14 flex flex-col gap-4">
        {INTEGRATION_ROWS.map((row, r) => (
          <div key={r} className="logo-marquee-viewport relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg-warm to-transparent sm:w-24"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg-warm to-transparent sm:w-24"
            />
            <div
              className={`logo-marquee-track ${r % 2 === 1 ? "logo-marquee-track-reverse" : ""}`}
            >
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1 ? true : undefined}
                  className="flex shrink-0 gap-3 pr-3"
                >
                  {row.map((src) => (
                    <div
                      key={src}
                      className="card-skin flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-sm sm:h-20 sm:w-20"
                    >
                      <Image
                        src={src}
                        alt={integrationName(src)}
                        width={40}
                        height={40}
                        className="h-8 w-8 object-contain sm:h-10 sm:w-10"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-2xl px-6 text-center text-sm font-code text-text-tertiary">
        {t.more}
      </p>
    </section>
  );
}

const SOCIAL_PROOF: { icon: typeof FileText; text: Record<Locale, string> }[] = [
  { icon: FileText, text: { en: "Markdown on disk", hi: "डिस्क पर Markdown" } },
  { icon: Shield, text: { en: "Self-hosted", hi: "सेल्फ़-होस्टेड" } },
  { icon: GitBranch, text: { en: "Git-backed", hi: "Git पर आधारित" } },
  { icon: Bot, text: { en: "AI-native", hi: "AI-नेटिव" } },
];

export function LegacySocialProofBar({ locale = "en" }: LocaleProps) {
  return (
    <section className="border-y border-border py-8 bg-bg-card">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-text-tertiary text-sm font-code">
        {SOCIAL_PROOF.map((item) => (
          <div key={item.text.en} className="flex items-center gap-2"><WoodIcon icon={item.icon} className="w-6 h-6" /><span>{item.text[locale]}</span></div>
        ))}
      </div>
    </section>
  );
}

// See LegacyIntegrationScene: CloudCabinet reads the locale from context.
export const LegacyCloudWaitlist: (props: LocaleProps) => ReactElement = () => {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-clip bg-bg py-10">
      <div className="relative mx-auto w-full max-w-6xl px-6 text-center">
        <MotionReveal amount={0.2}>
          {/* The Cloud pillars as the Cabinet itself: drawers open and slide
              each page out onto the desk, the hero animation in reverse.
              The section heading lives inside the scene, on its sky. */}
          <CloudCabinet />
        </MotionReveal>
      </div>
    </section>
  );
};

const PRINCIPLES_FOOTNOTE: Record<Locale, string> = {
  en: "If a feature would break any of these, it doesn't make it in.",
  hi: "जो फ़ीचर इनमें से किसी भी सिद्धांत को तोड़ता हो, वह प्रोडक्ट में शामिल नहीं होता।",
};

export function LegacyPrinciples({ locale = "en" }: LocaleProps) {
  return (
    <section className="py-24 border-t border-border bg-bg-warm">
      <div className="max-w-6xl mx-auto px-6">
        <PrinciplesShowcase locale={locale} />
        <p className="mt-16 text-center font-body-serif italic text-text-secondary text-lg">
          {PRINCIPLES_FOOTNOTE[locale]}
        </p>
      </div>
    </section>
  );
}

export function LegacyProblem() {
  return (
    <section className="py-24 bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="section-label mb-3">The Problem</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-6">
            Your AI agents have no memory
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed font-body-serif">Every time you start a new Claude session, it forgets everything.
                                        Your project context, your decisions, your research. Gone. You
                                        keep re-explaining the same things. <span className="font-brand italic">Cabinet</span>{" "}gives your AI a
                                        persistent brain: a knowledge base that both you and your agents
                                        read and write to, 24/7.
                                      </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-8 rounded-xl card-skin">
            <div className="w-12 h-12 mx-auto rounded-xl bg-accent-bg flex items-center justify-center mb-4">
              <X className="w-6 h-6 text-accent-warm" />
            </div>
            <h3 className="font-display text-lg mb-2 text-text-primary">Without <span className="font-brand italic">Cabinet</span></h3>
            <p className="text-sm text-text-secondary">
              Scattered docs in Notion. AI sessions that forget context. Manual copy-paste between tools. Scripts held together with tape.
            </p>
          </div>
          <div className="text-center p-8 rounded-xl border border-accent/20 bg-accent-bg-subtle">
            <Image src="/cabinet-icon.png" alt="Cabinet" width={48} height={48} className="mx-auto rounded-xl mb-4" />
            <h3 className="font-display text-lg mb-2 text-text-primary">With <span className="font-brand italic">Cabinet</span></h3>
            <p className="text-sm text-text-primary">
              One knowledge base. AI agents that remember everything. Scheduled jobs that compound. Your team grows while you sleep.
            </p>
          </div>
          <div className="text-center p-8 rounded-xl card-skin">
            <div className="w-14 h-14 mx-auto flex items-center justify-center mb-4">
              <WoodIcon icon={Users} className="w-12 h-12" />
            </div>
            <h3 className="font-display text-lg mb-2 text-text-primary">Design Principle</h3>
            <p className="text-sm text-text-secondary font-body-serif italic">
              If it feels like enterprise workflow software, it&apos;s wrong. If it feels like watching a team work, it&apos;s right.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LegacyEmbeddedApps() {
  return (
    <section className="py-24 border-t border-border bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-label mb-3">Unique to Cabinet</p>
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-6">
              Ship HTML apps inside<br />your knowledge base
            </h2>
            <p className="text-text-secondary mb-6 leading-relaxed font-body-serif">This is the biggest difference between <span className="font-brand italic">Cabinet</span>{" "}and tools like
                                              Obsidian or Notion. Drop an{" "}
              <code className="text-accent bg-accent-bg px-1.5 py-0.5 rounded text-sm font-code">index.html</code>{" "}into any folder and it renders as a live, interactive app.
                                            </p>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span><strong className="text-text-primary">Full-screen mode:</strong> add a <code className="text-accent bg-accent-bg px-1 py-0.5 rounded text-xs font-code">.app</code> marker. Sidebar and AI panel auto-collapse</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span><strong className="text-text-primary">AI-generated apps:</strong> ask Claude to build a dashboard, and it writes the HTML directly into your KB</span>
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
  );
}

type FeatureText = { title: string; description: string };

const FEATURES: {
  img: string;
  span: string;
  featured?: boolean;
  text: Record<Locale, FeatureText>;
}[] = [
  {
    img: "/brand/feat/agents.png", span: "col-span-2 lg:col-span-3", featured: true,
    text: {
      en: { title: "AI Agents", description: "Onboard a CEO, Editor, Marketer. Each has goals, skills, scheduled jobs. Watch them work like a real team." },
      hi: { title: "AI एजेंट", description: "CEO, एडिटर और मार्केटर को टीम में शामिल करें। हर एक के अपने लक्ष्य, स्किल्स और तय शेड्यूल वाले काम हैं। उन्हें एक असली टीम की तरह काम करते देखें।" },
    },
  },
  {
    img: "/brand/feat/files.png", span: "col-span-2 lg:col-span-3", featured: true,
    text: {
      en: { title: "File-Based Everything", description: "No database. Markdown on disk. Drag-and-drop tree sidebar. Your data is always yours, always portable." },
      hi: { title: "सब कुछ फ़ाइलों पर आधारित", description: "कोई डेटाबेस नहीं। डिस्क पर Markdown। ड्रैग-एंड-ड्रॉप ट्री साइडबार। आपका डेटा हमेशा आपका, और जहाँ चाहें वहाँ ले जाने लायक।" },
    },
  },
  {
    img: "/brand/feat/editor.png", span: "lg:col-span-2",
    text: {
      en: { title: "WYSIWYG + Markdown", description: "Rich text editing with Tiptap. Tables, code blocks, slash commands. Toggle to raw markdown anytime." },
      hi: { title: "WYSIWYG + Markdown", description: "Tiptap के साथ रिच टेक्स्ट एडिटिंग। टेबल, कोड ब्लॉक, स्लैश कमांड। जब चाहें, रॉ markdown पर स्विच करें।" },
    },
  },
  {
    img: "/brand/feat/htmlapp.png", span: "lg:col-span-2",
    text: {
      en: { title: "Embedded HTML Apps", description: "Drop an index.html in any folder. It renders as an iframe. Full-screen mode for dashboards." },
      hi: { title: "एम्बेडेड HTML ऐप्स", description: "किसी भी फ़ोल्डर में index.html रखें, वह iframe में लाइव ऐप की तरह खुलता है। डैशबोर्ड के लिए फ़ुल-स्क्रीन मोड।" },
    },
  },
  {
    img: "/brand/feat/terminal.png", span: "lg:col-span-2",
    text: {
      en: { title: "Web Terminal", description: "Full Claude Code terminal in the browser. xterm.js + node-pty. Run commands without leaving Cabinet." },
      hi: { title: "वेब टर्मिनल", description: "ब्राउज़र में पूरा Claude Code टर्मिनल। xterm.js + node-pty। Cabinet छोड़े बिना कमांड चलाएँ।" },
    },
  },
  {
    img: "/brand/feat/git.png", span: "col-span-2 lg:col-span-4", featured: true,
    text: {
      en: { title: "Git-Backed History", description: "Every save auto-commits. Full diff viewer. Restore any page to any point in time. Linked repo support." },
      hi: { title: "Git पर आधारित हिस्ट्री", description: "हर सेव अपने आप कमिट होता है। पूरा डिफ़ व्यूअर। किसी भी पेज को किसी भी पुराने समय की स्थिति में लौटाएँ। लिंक्ड रिपॉज़िटरी का सपोर्ट।" },
    },
  },
  {
    img: "/brand/feat/schedule.png", span: "lg:col-span-2",
    text: {
      en: { title: "Scheduled Jobs", description: "Cron-based agent automation. Reddit scout every 6 hours. Weekly reports on Monday. Your AI team never sleeps." },
      hi: { title: "शेड्यूल किए गए काम", description: "Cron पर आधारित एजेंट ऑटोमेशन। हर 6 घंटे में Reddit पर नज़र। हर सोमवार साप्ताहिक रिपोर्ट। आपकी AI टीम कभी नहीं सोती।" },
    },
  },
  {
    img: "/brand/feat/tasks.png", span: "lg:col-span-2",
    text: {
      en: { title: "Missions & Tasks", description: "Break goals into missions. Assign tasks to agents. Track progress with Kanban boards." },
      hi: { title: "मिशन और टास्क", description: "लक्ष्यों को मिशन में बाँटें। एजेंटों को टास्क सौंपें। Kanban बोर्ड पर प्रगति देखें।" },
    },
  },
  {
    img: "/brand/feat/chat.png", span: "col-span-2 lg:col-span-4", featured: true,
    text: {
      en: { title: "Internal Chat", description: "Built-in team channels. Agents and humans communicate. @mention an agent to trigger a response." },
      hi: { title: "इंटरनल चैट", description: "बिल्ट-इन टीम चैनल, जहाँ एजेंट और लोग आपस में बात करते हैं। किसी एजेंट को @mention करें, वह जवाब देगा।" },
    },
  },
  {
    img: "/brand/feat/search.png", span: "lg:col-span-2",
    text: {
      en: { title: "Full-Text Search", description: "Cmd+K instant search across all pages. Fuzzy matching. FlexSearch index rebuilt on every change." },
      hi: { title: "फ़ुल-टेक्स्ट सर्च", description: "Cmd+K से सभी पेजों में तुरंत सर्च। फ़ज़ी मैचिंग। हर बदलाव पर FlexSearch इंडेक्स फिर से बनता है।" },
    },
  },
  {
    img: "/brand/feat/docs.png", span: "lg:col-span-2",
    text: {
      en: { title: "PDF & CSV First-Class", description: "PDFs render inline. CSVs open as editable tables with add/delete rows and columns." },
      hi: { title: "PDF और CSV का पूरा सपोर्ट", description: "PDF पेज के भीतर ही खुलते हैं। CSV एडिट करने लायक टेबल के रूप में खुलते हैं, जिनमें पंक्तियाँ और कॉलम जोड़े या हटाए जा सकते हैं।" },
    },
  },
  {
    img: "/brand/feat/repos.png", span: "lg:col-span-2",
    text: {
      en: { title: "Linked Git Repos", description: "Add .repo.yaml to link KB directories to source code repos. Agents read your codebase." },
      hi: { title: "लिंक्ड Git रिपॉज़िटरी", description: "नॉलेज बेस के फ़ोल्डरों को सोर्स कोड रिपॉज़िटरी से जोड़ने के लिए .repo.yaml जोड़ें। एजेंट आपका कोडबेस पढ़ते हैं।" },
    },
  },
];

const FEATURES_COPY: Record<Locale, { label: string; title: string; intro: string }> = {
  en: {
    label: "Features",
    title: "Everything you need. Nothing you don't.",
    intro: "A complete operating system for your startup: knowledge base, AI agents, task management, and team chat in one self-hosted app.",
  },
  hi: {
    label: "फ़ीचर्स",
    title: "जो ज़रूरी है, वह सब। जो नहीं, वह कुछ नहीं।",
    intro: "आपके स्टार्टअप के लिए एक पूरा ऑपरेटिंग सिस्टम: नॉलेज बेस, AI एजेंट, टास्क मैनेजमेंट और टीम चैट, सब एक सेल्फ़-होस्टेड ऐप में।",
  },
};

export function LegacyFeaturesGrid({ locale = "en" }: LocaleProps) {
  const t = FEATURES_COPY[locale];
  return (
    <section id="features" className="py-24 border-t border-border bg-bg-warm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-3">{t.label}</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            {t.title}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-body-serif">
            {t.intro}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 max-w-6xl mx-auto max-lg:grid-flow-dense lg:auto-rows-fr">
          {FEATURES.map((f) => (
            <FeatureCard key={f.img} img={f.img} title={f.text[locale].title} description={f.text[locale].description} featured={f.featured} className={f.span} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function LegacyAiTeam() {
  return (
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
  );
}

export function LegacyHowItWorks() {
  return (
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
            { step: "01", title: "Download & Open", desc: "Install the desktop app. Your knowledge base is a folder on disk.", code: null },
            { step: "02", title: "Answer 5 Questions", desc: "What's your company? What do you do? What are your goals? Cabinet builds your custom AI team.", code: null },
            { step: "03", title: "Watch Your Team Work", desc: "Agents create missions, write content, scout Reddit, review quality, all on schedule.", code: null },
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
  );
}

const SOLUTIONS_COPY: Record<
  Locale,
  { label: string; title: string; intro: string; cardTitle: (label: string) => string; explore: string }
> = {
  en: {
    label: "Solutions",
    title: "Cabinet for every team",
    intro: "Same knowledge base: a different AI crew for each function, working on your data, on your infrastructure, around the clock.",
    cardTitle: (label) => `Cabinet for ${label}`,
    explore: "Explore",
  },
  hi: {
    label: "समाधान",
    title: "हर टीम के लिए Cabinet",
    intro: "नॉलेज बेस एक, पर हर विभाग के लिए अलग AI टीम, जो आपके डेटा पर, आपके इन्फ्रास्ट्रक्चर पर, चौबीसों घंटे काम करती है।",
    cardTitle: (label) => `${label} के लिए Cabinet`,
    explore: "और जानें",
  },
};

// Hindi text for the SOLUTIONS entries in @/lib/solutions, keyed by slug.
// Any slug missing here falls back to the English label and blurb.
const SOLUTIONS_HI: Record<string, { label: string; menuBlurb: string }> = {
  sales: {
    label: "सेल्स",
    menuBlurb: "पाइपलाइन रिसर्च, आउटरीच और CRM की साफ़-सफ़ाई, सब अपने आप।",
  },
  marketing: {
    label: "मार्केटिंग",
    menuBlurb: "लगातार रिसर्च, कंटेंट ड्राफ़्ट और कैंपेन रिपोर्टिंग।",
  },
  engineering: {
    label: "इंजीनियरिंग",
    menuBlurb: "हमेशा अपडेट रहने वाले डॉक्स, इंसिडेंट रिपोर्ट और कोडबेस को समझने वाले एजेंट।",
  },
  product: {
    label: "प्रोडक्ट",
    menuBlurb: "रिसर्च का सार, हमेशा अपडेट PRD और प्रतिस्पर्धियों पर लगातार नज़र।",
  },
  operations: {
    label: "ऑपरेशंस",
    menuBlurb: "SOP, नियमित रिपोर्ट और अलग-अलग टूल्स के डेटा का मिलान।",
  },
  founders: {
    label: "फ़ाउंडर्स और एग्ज़ीक्यूटिव",
    menuBlurb: "पूरे बिज़नेस के लिए हर समय उपलब्ध एक चीफ़ ऑफ़ स्टाफ़।",
  },
};

export function LegacySolutions({ locale = "en" }: LocaleProps) {
  const t = SOLUTIONS_COPY[locale];
  return (
    <section id="solutions" className="py-24 border-t border-border bg-bg-warm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">{t.label}</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            {t.title}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed">
            {t.intro}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {SOLUTIONS.map((solution) => {
            const s = locale === "hi" ? { ...solution, ...SOLUTIONS_HI[solution.slug] } : solution;
            return (
            <a
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className="group flex flex-col rounded-2xl card-skin p-6 card-hover max-lg:text-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/brand/solutions/${s.slug}.png`}
                alt=""
                loading="lazy"
                decoding="async"
                className="mb-4 h-20 w-20 object-contain transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-2 max-lg:mx-auto"
              />
              <h3 className="mb-2 font-display text-lg text-text-primary">
                {t.cardTitle(s.label)}
              </h3>
              <p className="text-sm text-text-secondary font-body-serif leading-relaxed flex-1">
                {s.menuBlurb}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-code text-sm text-accent transition-colors group-hover:text-accent-warm">
                {t.explore} <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function LegacyCabinetTemplates() {
  return (
    <section id="cabinets" className="py-24 border-t border-border bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Cabinet{" "}templates</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            Plug-and-play AI teams for real results
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed">
            Each cabinet runs as an always-on team on its own dedicated machine,
            self-hosted or in <span className="font-brand italic">Cabinet</span>{" "}Cloud.
            Real software doing real work while you sleep.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {CABINETS.slice(0, 6).map((c) => (
            <a
              key={c.slug}
              href={cabinetUrl(c.slug)}
              className="group flex flex-col overflow-hidden rounded-2xl card-skin card-hover"
            >
              <div
                className="relative w-full overflow-hidden"
                style={{ paddingBottom: "56%" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cabinetCover(c.slug)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 font-display text-lg text-text-primary">
                  {c.name}
                </h3>
                <p className="mb-3 flex-1 text-sm text-text-secondary font-body-serif leading-relaxed">
                  {c.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {c.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-accent-bg px-2 py-0.5 font-code text-[11px] text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={CABINETS_SITE}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold btn-wood"
          >
            Browse all cabinets
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function LegacyBusinessCase() {
  return (
    <section className="py-20 border-t border-border bg-bg">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">The business case</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            Own more. Pay less. Move faster.
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed">
            The numbers execs actually care about, before a single line of custom
            integration.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { stat: "$0", label: "per-seat AI markup: you bring your own models" },
            { stat: "100%", label: "of your data stays on your infrastructure" },
            { stat: "1 folder", label: "replaces the wiki, the chatbot, and the agent platform" },
            { stat: "24/7", label: "your AI team runs on a schedule, not on demand" },
          ].map((o) => (
            <div
              key={o.label}
              className="rounded-2xl card-skin p-7 text-center"
            >
              <div className="font-display text-4xl md:text-5xl tracking-tight text-accent">
                {o.stat}
              </div>
              <p className="mt-2 text-sm text-text-secondary font-body-serif leading-relaxed">
                {o.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ORG_COPY: Record<Locale, { label: string; title: string; intro: string; questions: string }> = {
  en: {
    label: "Built for organizations",
    title: "Designed to clear a security review",
    intro: "The people who sign off on new tools (security, legal, platform owners) should come away with less to worry about, not more.",
    questions: "Questions for a vendor review?",
  },
  hi: {
    label: "संगठनों के लिए बना",
    title: "सुरक्षा समीक्षा में खरा उतरने के लिए बना",
    intro: "नए टूल्स को मंज़ूरी देने वालों (सुरक्षा, लीगल और प्लेटफ़ॉर्म टीमों) की चिंताएँ कम होनी चाहिए, बढ़नी नहीं।",
    questions: "वेंडर समीक्षा से जुड़े सवाल हैं?",
  },
};

export function LegacyOrgBadges({ locale = "en" }: LocaleProps) {
  const t = ORG_COPY[locale];
  return (
    <section className="py-24 border-t border-border bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">{t.label}</p>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-4">
            {t.title}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-body-serif leading-relaxed">
            {t.intro}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {TRUST_BADGES.map(({ img, text }) => ({ img, ...text[locale] })).map((b) => (
            <div
              key={b.img}
              className="group rounded-2xl card-skin p-6 card-hover"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.img}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-16 w-16 object-contain transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-2"
                />
                {b.status && (
                  <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
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
          {t.questions}{" "}
          <a
            href="mailto:hi@runcabinet.com"
            className="text-accent underline underline-offset-2 hover:text-accent-warm"
          >
            hi@runcabinet.com
          </a>
        </p>
      </div>
    </section>
  );
}

const CTA_COPY: Record<
  Locale,
  { title: string; body: string; bookDemo: string; learnMore: string; questions: string; discord: string }
> = {
  en: {
    title: "Bringing Cabinet to your company?",
    body: "Talk to us about rollout, security review, and the workflows your teams run every day.",
    bookDemo: "Book a demo",
    learnMore: "Learn more",
    questions: "Questions?",
    discord: "Join Discord",
  },
  hi: {
    title: "अपनी कंपनी में Cabinet लाना चाहते हैं?",
    body: "रोलआउट, सुरक्षा समीक्षा और आपकी टीमों के रोज़मर्रा के वर्कफ़्लो पर हमसे बात करें।",
    bookDemo: "डेमो बुक करें",
    learnMore: "और जानें",
    questions: "कोई सवाल?",
    discord: "Discord से जुड़ें",
  },
};

export function LegacyCta({ locale = "en" }: LocaleProps) {
  const t = CTA_COPY[locale];
  return (
    <section id="get-started" className="py-24 border-t border-border bg-bg-warm overflow-hidden">
      <DownloadShowcase />
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="mx-auto mt-16 max-w-3xl rounded-3xl bg-gradient-to-br from-[#FBF2E4] to-[#F2E5CF] px-6 py-12 shadow-sm sm:px-12">
          <Image
            src="/brand/icons/professional-services.png"
            alt=""
            width={64}
            height={64}
            className="mx-auto mb-4 object-contain"
          />
          <h3 className="text-2xl md:text-3xl font-display text-text-primary mb-3">
            {t.title}
          </h3>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto leading-relaxed font-body-serif">
            {t.body}
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/demo"
              className="btn-wood inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap rounded-full px-8 text-base font-semibold"
            >
              {t.bookDemo}
            </a>
            <a
              href="/enterprise/security"
              className="inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap px-3 text-base font-semibold text-text-primary transition-colors hover:text-accent"
            >
              {t.learnMore} <ArrowRight aria-hidden className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-6 text-sm text-text-tertiary">
            {t.questions} <a href="mailto:hi@runcabinet.com" className="text-accent hover:text-accent-warm underline underline-offset-2">hi@runcabinet.com</a>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mt-12">
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium transition-colors shadow-sm shadow-[#5865F2]/20"
          >
            <DiscordIcon className="w-4 h-4" /> {t.discord}
          </a>
        </div>
      </div>
    </section>
  );
}
