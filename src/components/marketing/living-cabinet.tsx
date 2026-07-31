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
import styles from "./living-cabinet.module.css";

// How long each tab stays open before the story advances.
const STORY_MS = 4200;

type SceneId = "knowledge" | "team" | "work";

type Scene = {
  id: SceneId;
  label: string;
  icon: typeof BookOpen;
};

type SidebarRow = {
  label: string;
  icon: typeof Folder;
  active?: boolean;
  depth?: number;
  directory?: boolean;
  image?: string;
  hint: string;
};

const SCENES: Scene[] = [
  {
    id: "knowledge",
    label: "Knowledge",
    icon: BookOpen,
  },
  {
    id: "team",
    label: "AI team",
    icon: Users,
  },
  {
    id: "work",
    label: "Work",
    icon: SquareKanban,
  },
];

const SIDEBAR_ROWS: Record<SceneId, SidebarRow[]> = {
  knowledge: [
    { label: "Company", icon: Folder, hint: "Your whole company, organized in one place." },
    { label: "Operating plan", icon: FileText, active: true, depth: 1, hint: "Open the Q3 plan as a live, editable view." },
    { label: "Research", icon: Folder, hint: "Every research doc, structured and searchable." },
    { label: "Sources", icon: FolderOpen, directory: true, hint: "Connect the tools your work already lives in." },
    {
      label: "Google Drive",
      icon: FileText,
      image: "/logos/google-drive.svg",
      depth: 1,
      hint: "Connect your Google Drive to your knowledge base.",
    },
    { label: "Gmail", icon: FileText, image: "/logos/gmail.svg", depth: 1, hint: "Connect your Gmail to your knowledge base." },
    { label: "Slack", icon: MessageSquareText, image: "/logos/slack.svg", depth: 1, hint: "Connect your Slack to your knowledge base." },
    { label: "Notion", icon: FileText, image: "/logos/notion.svg", depth: 1, hint: "Connect your Notion to your knowledge base." },
    { label: "Forecast.xlsx", icon: FileSpreadsheet, depth: 1, hint: "Your spreadsheets render as live dashboards." },
    { label: "Live dashboard", icon: LayoutDashboard, depth: 1, hint: "Watch the numbers update as work happens." },
  ],
  team: [
    { label: "AI team", icon: Users, active: true, hint: "Specialists that share the same context." },
    { label: "Chief of Staff", icon: Bot, hint: "Put the Chief of Staff to work on your brief." },
    { label: "Research Lead", icon: Bot, hint: "Send the Research Lead to compare the market." },
    { label: "Operations Lead", icon: Bot, hint: "Let the Operations Lead keep your weekly report current." },
    { label: "Product Analyst", icon: Bot, hint: "Have the Product Analyst maintain your decision log." },
    { label: "Conversations", icon: MessageSquareText, hint: "Every agent conversation, saved and searchable." },
    { label: "Providers", icon: Asterisk, hint: "Bring your own AI. Use the models you already pay for." },
  ],
  work: [
    { label: "Task board", icon: SquareKanban, active: true, hint: "See every task your AI team is running." },
    { label: "Running", icon: Clock3, hint: "Watch the work happen in real time." },
    { label: "Your review", icon: ShieldCheck, hint: "Approve the decisions that need a human." },
    { label: "Completed", icon: Check, hint: "Finished work, with every artifact kept." },
    { label: "Routines", icon: GitBranch, hint: "Schedule the work that should just happen." },
    { label: "Artifacts", icon: Folder, hint: "Every output saved back to your knowledge base." },
  ],
};

const AGENTS = [
  { name: "Chief of Staff", task: "Preparing the Monday brief", icon: Asterisk, hint: "Put the Chief of Staff to work on your brief." },
  { name: "Research Lead", task: "Comparing 14 market signals", icon: BarChart3, hint: "Send the Research Lead to compare the market." },
  { name: "Operations Lead", task: "Reconciling the weekly report", icon: Clock3, hint: "Let the Operations Lead keep your weekly report current." },
  { name: "Product Analyst", task: "Updating the decision log", icon: FileText, hint: "Have the Product Analyst maintain your decision log." },
];

const TASK_COLUMNS = [
  {
    title: "Running",
    count: 2,
    cards: [
      { title: "Prepare operating review", meta: "Chief of Staff · 04:12" },
      { title: "Refresh market map", meta: "Research Lead · 02:48" },
    ],
  },
  {
    title: "Your review",
    count: 1,
    cards: [{ title: "Approve forecast update", meta: "Needs decision" }],
  },
  {
    title: "Complete",
    count: 2,
    cards: [
      { title: "Publish Q3 priorities", meta: "3 artifacts" },
      { title: "Summarize customer calls", meta: "Saved to Research" },
    ],
  },
];

export function LivingCabinet() {
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
        <div className={styles.tabs} role="tablist" aria-label="Explore Cabinet">
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
                {item.label}
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
              <strong>Company Cabinet</strong>
              <span>owned workspace · live</span>
            </span>
            <span className={styles.windowStatus}>Connected</span>
          </header>

          <div className={styles.windowBody}>
            <Sidebar scene={scene.id} onPick={setHint} />
            {scene.id === "knowledge" && <KnowledgeScene />}
            {scene.id === "team" && <TeamScene onPick={setHint} />}
            {scene.id === "work" && <WorkScene />}
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

function Sidebar({ scene, onPick }: { scene: SceneId; onPick: (hint: string) => void }) {
  return (
    <aside className={styles.sidebar}>
      <p className={styles.sidebarLabel}>{scene === "team" ? "Team" : "Knowledge base"}</p>
      {SIDEBAR_ROWS[scene].map((row) => {
        const Icon = row.icon;
        return (
          <button
            key={row.label}
            type="button"
            onClick={() => onPick(row.hint)}
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
            <span>{row.label}</span>
            <span className={styles.rowChevron} aria-hidden>›</span>
          </button>
        );
      })}
    </aside>
  );
}

function KnowledgeScene() {
  const bars = [38, 54, 48, 72, 66, 84, 92];
  return (
    <div className={styles.scene}>
      <p className={styles.sceneEyebrow}>Live operating view</p>
      <h3 className={styles.sceneTitle}>Q3 operating plan</h3>
      <p className={styles.sceneMeta}>Updated by Chief of Staff · 4 minutes ago · source history available</p>

      <div className={styles.metricGrid}>
        <div className={styles.metric}>
          <span>Initiatives</span>
          <strong>12</strong>
        </div>
        <div className={styles.metric}>
          <span>On track</span>
          <strong>9</strong>
        </div>
        <div className={styles.metric}>
          <span>Decisions</span>
          <strong>3</strong>
        </div>
      </div>

      <div className={styles.chart} aria-label="Initiative progress trending upward">
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

function TeamScene({ onPick }: { onPick: (hint: string) => void }) {
  return (
    <div className={styles.scene}>
      <p className={styles.sceneEyebrow}>AI team</p>
      <h3 className={styles.sceneTitle}>Specialists with shared context</h3>
      <p className={styles.sceneMeta}>Each agent has a role, skills, provider, memory, and visible work.</p>

      <div className={styles.agentsGrid}>
        {AGENTS.map((agent) => {
          const Icon = agent.icon;
          return (
            <button
              key={agent.name}
              type="button"
              onClick={() => onPick(agent.hint)}
              className={styles.agentCard}
            >
              <span className={styles.agentAvatar} aria-hidden>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span>
                <strong>{agent.name}</strong>
                <span>{agent.task}</span>
              </span>
              <span className={styles.rowChevron} aria-hidden>›</span>
            </button>
          );
        })}
      </div>

      <div className={styles.activity}>
        <div className={styles.activityRow}>
          <span className={styles.activityDot} />
          Research Lead attached 6 sources to the market map
        </div>
        <div className={styles.activityRow}>
          <span className={styles.activityDot} />
          Chief of Staff requested approval for the operating brief
        </div>
        <div className={styles.activityRow}>
          <span className={styles.activityDot} />
          Operations Lead scheduled the weekly review
        </div>
      </div>
    </div>
  );
}

function WorkScene() {
  return (
    <div className={styles.scene}>
      <p className={styles.sceneEyebrow}>Work in motion</p>
      <h3 className={styles.sceneTitle}>Every task stays visible</h3>
      <p className={styles.sceneMeta}>Assign work, review decisions, and keep every artifact in the knowledge base.</p>

      <div className={styles.taskBoard}>
        {TASK_COLUMNS.map((column) => (
          <div key={column.title} className={styles.taskColumn}>
            <div className={styles.taskColumnTitle}>
              <span>{column.title}</span>
              <span>{column.count}</span>
            </div>
            {column.cards.map((card) => (
              <div key={card.title} className={styles.taskCard}>
                <strong>{card.title}</strong>
                <span>{card.meta}</span>
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
