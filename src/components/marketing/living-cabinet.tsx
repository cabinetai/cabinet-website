"use client";

import Image from "next/image";
import {
  Asterisk,
  BarChart3,
  BookOpen,
  Bot,
  Check,
  Clock3,
  FileSpreadsheet,
  FileText,
  Folder,
  FolderOpen,
  GitBranch,
  LayoutDashboard,
  MessageSquareText,
  ShieldCheck,
  SquareKanban,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/i18n";
import styles from "./living-cabinet.module.css";

// How long each tab stays open before the story advances.
const STORY_MS = 4200;

type SceneId = "knowledge" | "team" | "work";

// Copy that changes with the page language.
type Text = Record<Locale, string>;

type Scene = {
  id: SceneId;
  label: Text;
  icon: typeof BookOpen;
};

type SidebarRow = {
  label: Text;
  icon: typeof Folder;
  active?: boolean;
  depth?: number;
  directory?: boolean;
  image?: string;
  hint: Text;
};

const EN_COPY = {
  tablistLabel: "Explore Cabinet",
  windowTitle: "Company Cabinet",
  windowSubtitle: "owned workspace · live",
  windowStatus: "Connected",
  sidebarTeam: "Team",
  sidebarKnowledge: "Knowledge base",
  knowledge: {
    eyebrow: "Live operating view",
    title: "Q3 operating plan",
    meta: "Updated by Chief of Staff · 4 minutes ago · source history available",
    initiatives: "Initiatives",
    onTrack: "On track",
    decisions: "Decisions",
    chartLabel: "Initiative progress trending upward",
  },
  team: {
    eyebrow: "AI team",
    title: "Specialists with shared context",
    meta: "Each agent has a role, skills, provider, memory, and visible work.",
    activity: [
      "Research Lead attached 6 sources to the market map",
      "Chief of Staff requested approval for the operating brief",
      "Operations Lead scheduled the weekly review",
    ],
  },
  work: {
    eyebrow: "Work in motion",
    title: "Every task stays visible",
    meta: "Assign work, review decisions, and keep every artifact in the knowledge base.",
  },
};

type Copy = typeof EN_COPY;

const COPY: Record<Locale, Copy> = {
  en: EN_COPY,
  hi: {
    tablistLabel: "Cabinet को देखें",
    windowTitle: "कंपनी Cabinet",
    windowSubtitle: "आपका अपना वर्कस्पेस · लाइव",
    windowStatus: "कनेक्टेड",
    sidebarTeam: "टीम",
    sidebarKnowledge: "नॉलेज बेस",
    knowledge: {
      eyebrow: "लाइव ऑपरेटिंग व्यू",
      title: "Q3 ऑपरेटिंग प्लान",
      meta: "चीफ़ ऑफ़ स्टाफ़ ने अपडेट किया · 4 मिनट पहले · सोर्स हिस्ट्री उपलब्ध",
      initiatives: "पहल",
      onTrack: "ट्रैक पर",
      decisions: "फ़ैसले",
      chartLabel: "पहलों की प्रगति लगातार ऊपर जा रही है",
    },
    team: {
      eyebrow: "AI टीम",
      title: "एक ही संदर्भ पर काम करते विशेषज्ञ",
      meta: "हर एजेंट की अपनी भूमिका, स्किल्स, प्रोवाइडर और मेमोरी है, और उसका हर काम आपको दिखता है।",
      activity: [
        "रिसर्च लीड ने मार्केट मैप में 6 सोर्स जोड़े",
        "चीफ़ ऑफ़ स्टाफ़ ने ऑपरेटिंग ब्रीफ़ के लिए मंज़ूरी मांगी",
        "ऑपरेशंस लीड ने साप्ताहिक रिव्यू शेड्यूल किया",
      ],
    },
    work: {
      eyebrow: "काम जारी है",
      title: "हर टास्क नज़र में रहता है",
      meta: "काम सौंपें, फ़ैसलों की समीक्षा करें और हर आउटपुट नॉलेज बेस में रखें।",
    },
  },
};

const SCENES: Scene[] = [
  {
    id: "knowledge",
    label: { en: "Knowledge", hi: "नॉलेज" },
    icon: BookOpen,
  },
  {
    id: "team",
    label: { en: "AI team", hi: "AI टीम" },
    icon: Users,
  },
  {
    id: "work",
    label: { en: "Work", hi: "काम" },
    icon: SquareKanban,
  },
];

// Hints shared by the team sidebar and the agent cards.
const AGENT_HINTS = {
  chief: {
    en: "Put the Chief of Staff to work on your brief.",
    hi: "अपनी ब्रीफ़ तैयार करने का काम चीफ़ ऑफ़ स्टाफ़ को सौंपें।",
  },
  research: {
    en: "Send the Research Lead to compare the market.",
    hi: "बाज़ार की तुलना का काम रिसर्च लीड को दें।",
  },
  operations: {
    en: "Let the Operations Lead keep your weekly report current.",
    hi: "साप्ताहिक रिपोर्ट को अपडेट रखने का ज़िम्मा ऑपरेशंस लीड को दें।",
  },
  product: {
    en: "Have the Product Analyst maintain your decision log.",
    hi: "अपना डिसीज़न लॉग प्रोडक्ट एनालिस्ट को सौंपें।",
  },
} satisfies Record<string, Text>;

const AGENT_NAMES = {
  chief: { en: "Chief of Staff", hi: "चीफ़ ऑफ़ स्टाफ़" },
  research: { en: "Research Lead", hi: "रिसर्च लीड" },
  operations: { en: "Operations Lead", hi: "ऑपरेशंस लीड" },
  product: { en: "Product Analyst", hi: "प्रोडक्ट एनालिस्ट" },
} satisfies Record<string, Text>;

const connectHint = (source: string): Text => ({
  en: `Connect your ${source} to your knowledge base.`,
  hi: `अपने ${source} को अपने नॉलेज बेस से जोड़ें।`,
});

const SIDEBAR_ROWS: Record<SceneId, SidebarRow[]> = {
  knowledge: [
    {
      label: { en: "Company", hi: "कंपनी" },
      icon: Folder,
      hint: { en: "Your whole company, organized in one place.", hi: "आपकी पूरी कंपनी, एक ही जगह व्यवस्थित।" },
    },
    {
      label: { en: "Operating plan", hi: "ऑपरेटिंग प्लान" },
      icon: FileText,
      active: true,
      depth: 1,
      hint: {
        en: "Open the Q3 plan as a live, editable view.",
        hi: "Q3 प्लान को लाइव व्यू में खोलें और वहीं बदलाव करें।",
      },
    },
    {
      label: { en: "Research", hi: "रिसर्च" },
      icon: Folder,
      hint: {
        en: "Every research doc, structured and searchable.",
        hi: "हर रिसर्च डॉक्यूमेंट, व्यवस्थित और खोजने लायक।",
      },
    },
    {
      label: { en: "Sources", hi: "सोर्स" },
      icon: FolderOpen,
      directory: true,
      hint: {
        en: "Connect the tools your work already lives in.",
        hi: "उन टूल्स को जोड़ें जिनमें आपका काम पहले से है।",
      },
    },
    {
      label: { en: "Google Drive", hi: "Google Drive" },
      icon: FileText,
      image: "/logos/google-drive.svg",
      depth: 1,
      hint: connectHint("Google Drive"),
    },
    {
      label: { en: "Gmail", hi: "Gmail" },
      icon: FileText,
      image: "/logos/gmail.svg",
      depth: 1,
      hint: connectHint("Gmail"),
    },
    {
      label: { en: "Slack", hi: "Slack" },
      icon: MessageSquareText,
      image: "/logos/slack.svg",
      depth: 1,
      hint: connectHint("Slack"),
    },
    {
      label: { en: "Notion", hi: "Notion" },
      icon: FileText,
      image: "/logos/notion.svg",
      depth: 1,
      hint: connectHint("Notion"),
    },
    {
      label: { en: "Forecast.xlsx", hi: "Forecast.xlsx" },
      icon: FileSpreadsheet,
      depth: 1,
      hint: {
        en: "Your spreadsheets render as live dashboards.",
        hi: "आपकी स्प्रेडशीट लाइव डैशबोर्ड के रूप में दिखती हैं।",
      },
    },
    {
      label: { en: "Live dashboard", hi: "लाइव डैशबोर्ड" },
      icon: LayoutDashboard,
      depth: 1,
      hint: {
        en: "Watch the numbers update as work happens.",
        hi: "काम के साथ-साथ आंकड़े अपडेट होते देखें।",
      },
    },
  ],
  team: [
    {
      label: { en: "AI team", hi: "AI टीम" },
      icon: Users,
      active: true,
      hint: {
        en: "Specialists that share the same context.",
        hi: "विशेषज्ञ एजेंट, जो एक ही संदर्भ पर काम करते हैं।",
      },
    },
    { label: AGENT_NAMES.chief, icon: Bot, hint: AGENT_HINTS.chief },
    { label: AGENT_NAMES.research, icon: Bot, hint: AGENT_HINTS.research },
    { label: AGENT_NAMES.operations, icon: Bot, hint: AGENT_HINTS.operations },
    { label: AGENT_NAMES.product, icon: Bot, hint: AGENT_HINTS.product },
    {
      label: { en: "Conversations", hi: "बातचीत" },
      icon: MessageSquareText,
      hint: {
        en: "Every agent conversation, saved and searchable.",
        hi: "एजेंट्स से हर बातचीत सेव रहती है और खोजी जा सकती है।",
      },
    },
    {
      label: { en: "Providers", hi: "प्रोवाइडर" },
      icon: Asterisk,
      hint: {
        en: "Bring your own AI. Use the models you already pay for.",
        hi: "अपना AI खुद चुनें। जिन मॉडल्स का भुगतान आप पहले से करते हैं, उन्हीं का इस्तेमाल करें।",
      },
    },
  ],
  work: [
    {
      label: { en: "Task board", hi: "टास्क बोर्ड" },
      icon: SquareKanban,
      active: true,
      hint: {
        en: "See every task your AI team is running.",
        hi: "आपकी AI टीम जो भी टास्क चला रही है, सब एक जगह देखें।",
      },
    },
    {
      label: { en: "Running", hi: "जारी" },
      icon: Clock3,
      hint: { en: "Watch the work happen in real time.", hi: "काम को रियल टाइम में होते देखें।" },
    },
    {
      label: { en: "Your review", hi: "आपकी समीक्षा" },
      icon: ShieldCheck,
      hint: {
        en: "Approve the decisions that need a human.",
        hi: "जिन फ़ैसलों पर इंसान की मंज़ूरी चाहिए, उन्हें आप मंज़ूर करें।",
      },
    },
    {
      label: { en: "Completed", hi: "पूरे हुए" },
      icon: Check,
      hint: {
        en: "Finished work, with every artifact kept.",
        hi: "पूरा हुआ काम, हर आउटपुट के साथ सुरक्षित।",
      },
    },
    {
      label: { en: "Routines", hi: "रूटीन" },
      icon: GitBranch,
      hint: {
        en: "Schedule the work that should just happen.",
        hi: "जो काम नियमित रूप से होना चाहिए, उसे शेड्यूल करें।",
      },
    },
    {
      label: { en: "Artifacts", hi: "आउटपुट" },
      icon: Folder,
      hint: {
        en: "Every output saved back to your knowledge base.",
        hi: "हर आउटपुट आपके नॉलेज बेस में वापस सेव होता है।",
      },
    },
  ],
};

const AGENTS = [
  {
    name: AGENT_NAMES.chief,
    task: { en: "Preparing the Monday brief", hi: "सोमवार की ब्रीफ़ की तैयारी" },
    icon: Asterisk,
    hint: AGENT_HINTS.chief,
  },
  {
    name: AGENT_NAMES.research,
    task: { en: "Comparing 14 market signals", hi: "14 मार्केट संकेतों की तुलना" },
    icon: BarChart3,
    hint: AGENT_HINTS.research,
  },
  {
    name: AGENT_NAMES.operations,
    task: { en: "Reconciling the weekly report", hi: "साप्ताहिक रिपोर्ट का मिलान" },
    icon: Clock3,
    hint: AGENT_HINTS.operations,
  },
  {
    name: AGENT_NAMES.product,
    task: { en: "Updating the decision log", hi: "डिसीज़न लॉग अपडेट हो रहा है" },
    icon: FileText,
    hint: AGENT_HINTS.product,
  },
] satisfies Array<{ name: Text; task: Text; icon: typeof FileText; hint: Text }>;

const TASK_COLUMNS: Array<{
  title: Text;
  count: number;
  cards: Array<{ title: Text; meta: Text }>;
}> = [
  {
    title: { en: "Running", hi: "जारी" },
    count: 2,
    cards: [
      {
        title: { en: "Prepare operating review", hi: "ऑपरेटिंग रिव्यू तैयार करें" },
        meta: { en: "Chief of Staff · 04:12", hi: "चीफ़ ऑफ़ स्टाफ़ · 04:12" },
      },
      {
        title: { en: "Refresh market map", hi: "मार्केट मैप अपडेट करें" },
        meta: { en: "Research Lead · 02:48", hi: "रिसर्च लीड · 02:48" },
      },
    ],
  },
  {
    title: { en: "Your review", hi: "आपकी समीक्षा" },
    count: 1,
    cards: [
      {
        title: { en: "Approve forecast update", hi: "फ़ोरकास्ट अपडेट मंज़ूर करें" },
        meta: { en: "Needs decision", hi: "फ़ैसला बाकी" },
      },
    ],
  },
  {
    title: { en: "Complete", hi: "पूरे हुए" },
    count: 2,
    cards: [
      {
        title: { en: "Publish Q3 priorities", hi: "Q3 की प्राथमिकताएं जारी करें" },
        meta: { en: "3 artifacts", hi: "3 आउटपुट" },
      },
      {
        title: { en: "Summarize customer calls", hi: "ग्राहक कॉल्स का सार लिखें" },
        meta: { en: "Saved to Research", hi: "रिसर्च में सेव" },
      },
    ],
  },
];

export function LivingCabinet({ locale: localeProp }: { locale?: Locale } = {}) {
  const contextLocale = useLocale();
  const locale = localeProp ?? contextLocale;
  const t = COPY[locale];
  const [active, setActive] = useState<SceneId>("knowledge");
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  // The contextual hint shown when a row or agent is clicked.
  const [hint, setHint] = useState<string | null>(null);
  const activeIndex = SCENES.findIndex((scene) => scene.id === active);
  const scene = SCENES[activeIndex];

  // Respect reduced-motion: no story autoplay, tabs stay click-only.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setAutoplay(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const selectScene = (next: SceneId) => {
    setActive(next);
    // A hint belongs to the scene it was raised in.
    setHint(null);
  };

  const advance = () => selectScene(SCENES[(activeIndex + 1) % SCENES.length].id);

  return (
    <div
      className={styles.shell}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className={styles.toolbar}>
        <div className={styles.tabs} role="tablist" aria-label={t.tablistLabel}>
          {SCENES.map((item) => {
            const Icon = item.icon;
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                id={`cabinet-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`cabinet-panel-${item.id}`}
                className={`${styles.tab} ${selected ? styles.tabActive : ""}`}
                onClick={() => selectScene(item.id)}
              >
                <Icon aria-hidden className="h-3.5 w-3.5" />
                {item.label[locale]}
                {selected && autoplay && (
                  // Story timer: the bar fills over STORY_MS, then advances.
                  // Pausing freezes the fill so onAnimationEnd never fires.
                  <span
                    key={active}
                    className={styles.tabProgress}
                    style={{
                      animationDuration: `${STORY_MS}ms`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                    onAnimationEnd={advance}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.stage}>
        <section
          className={styles.productWindow}
          id={`cabinet-panel-${scene.id}`}
          role="tabpanel"
          aria-labelledby={`cabinet-tab-${scene.id}`}
        >
          <header className={styles.windowHeader}>
            <span className={styles.windowMark} aria-hidden>
              <Image
                src="/brand/cabinet-logo-smile.svg"
                alt=""
                width={18}
                height={18}
              />
            </span>
            <span className={styles.windowTitle}>
              <strong>{t.windowTitle}</strong>
              <span>{t.windowSubtitle}</span>
            </span>
            <span className={styles.windowStatus}>{t.windowStatus}</span>
          </header>

          <div className={styles.windowBody}>
            <Sidebar scene={scene.id} locale={locale} t={t} onPick={setHint} />
            {scene.id === "knowledge" && <KnowledgeScene t={t} />}
            {scene.id === "team" && <TeamScene locale={locale} t={t} onPick={setHint} />}
            {scene.id === "work" && <WorkScene locale={locale} t={t} />}
          </div>

          <div className={styles.hintDock} aria-live="polite">
            {hint && (
              <span key={hint} className={styles.hintToast}>
                <span className={styles.hintDot} aria-hidden />
                {hint}
              </span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function Sidebar({
  scene,
  locale,
  t,
  onPick,
}: {
  scene: SceneId;
  locale: Locale;
  t: Copy;
  onPick: (hint: string) => void;
}) {
  return (
    <aside className={styles.sidebar}>
      <p className={styles.sidebarLabel}>{scene === "team" ? t.sidebarTeam : t.sidebarKnowledge}</p>
      {SIDEBAR_ROWS[scene].map((row) => {
        const Icon = row.icon;
        return (
          <button
            key={row.label.en}
            type="button"
            onClick={() => onPick(row.hint[locale])}
            className={`${styles.sidebarRow} ${row.active ? styles.sidebarRowActive : ""} ${row.depth ? styles.sidebarRowNested : ""} ${row.directory ? styles.sidebarDirectoryRow : ""}`}
          >
            {row.image ? (
              <Image
                src={row.image}
                alt=""
                width={12}
                height={12}
                className={styles.sidebarSourceIcon}
              />
            ) : (
              <Icon aria-hidden className="h-3 w-3 shrink-0" />
            )}
            <span>{row.label[locale]}</span>
            <span className={styles.rowChevron} aria-hidden>›</span>
          </button>
        );
      })}
    </aside>
  );
}

function KnowledgeScene({ t }: { t: Copy }) {
  const bars = [38, 54, 48, 72, 66, 84, 92];
  return (
    <div className={styles.scene}>
      <p className={styles.sceneEyebrow}>{t.knowledge.eyebrow}</p>
      <h3 className={styles.sceneTitle}>{t.knowledge.title}</h3>
      <p className={styles.sceneMeta}>{t.knowledge.meta}</p>

      <div className={styles.metricGrid}>
        <div className={styles.metric}>
          <span>{t.knowledge.initiatives}</span>
          <strong>12</strong>
        </div>
        <div className={styles.metric}>
          <span>{t.knowledge.onTrack}</span>
          <strong>9</strong>
        </div>
        <div className={styles.metric}>
          <span>{t.knowledge.decisions}</span>
          <strong>3</strong>
        </div>
      </div>

      <div className={styles.chart} aria-label={t.knowledge.chartLabel}>
        {bars.map((height, index) => (
          <span
            key={height}
            className={styles.bar}
            style={{ height: `${height}%`, animationDelay: `${index * 55}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function TeamScene({
  locale,
  t,
  onPick,
}: {
  locale: Locale;
  t: Copy;
  onPick: (hint: string) => void;
}) {
  return (
    <div className={styles.scene}>
      <p className={styles.sceneEyebrow}>{t.team.eyebrow}</p>
      <h3 className={styles.sceneTitle}>{t.team.title}</h3>
      <p className={styles.sceneMeta}>{t.team.meta}</p>

      <div className={styles.agentsGrid}>
        {AGENTS.map((agent) => {
          const Icon = agent.icon;
          return (
            <button
              key={agent.name.en}
              type="button"
              onClick={() => onPick(agent.hint[locale])}
              className={styles.agentCard}
            >
              <span className={styles.agentAvatar} aria-hidden>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span>
                <strong>{agent.name[locale]}</strong>
                <span>{agent.task[locale]}</span>
              </span>
              <span className={styles.rowChevron} aria-hidden>›</span>
            </button>
          );
        })}
      </div>

      <div className={styles.activity}>
        {t.team.activity.map((line) => (
          <div key={line} className={styles.activityRow}>
            <span className={styles.activityDot} />
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkScene({ locale, t }: { locale: Locale; t: Copy }) {
  return (
    <div className={styles.scene}>
      <p className={styles.sceneEyebrow}>{t.work.eyebrow}</p>
      <h3 className={styles.sceneTitle}>{t.work.title}</h3>
      <p className={styles.sceneMeta}>{t.work.meta}</p>

      <div className={styles.taskBoard}>
        {TASK_COLUMNS.map((column) => (
          <div key={column.title.en} className={styles.taskColumn}>
            <div className={styles.taskColumnTitle}>
              <span>{column.title[locale]}</span>
              <span>{column.count}</span>
            </div>
            {column.cards.map((card) => (
              <div key={card.title.en} className={styles.taskCard}>
                <strong>{card.title[locale]}</strong>
                <span>{card.meta[locale]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.artifactStrip}>
        <span className={styles.artifact}>
          <FileText aria-hidden className="h-2.5 w-2.5" />
          operating-review.md
        </span>
        <span className={styles.artifact}>
          <FileSpreadsheet aria-hidden className="h-2.5 w-2.5" />
          forecast.xlsx
        </span>
        <span className={styles.artifact}>
          <LayoutDashboard aria-hidden className="h-2.5 w-2.5" />
          executive-dashboard
        </span>
      </div>
    </div>
  );
}
