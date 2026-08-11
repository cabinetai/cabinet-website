"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import {
  Bot,
  FileCode,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  LayoutDashboard,
  ListChecks,
  PenTool,
  Presentation,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useAnimationControls,
  type MotionValue,
} from "framer-motion";
import { ScrollReveal } from "@/components/lightswind/scroll-reveal";

/* ──────────────────────────────────────────────────────────────
   Integration scene: a pinned files-to-Cabinet story.

   App and file tiles begin as a scattered cloud on the left. As the
   visitor scrolls, every tile converges on the open Cabinet at centre.
   The scene deliberately has one action and one destination.

   Two flourishes:
     • the cloud is reshuffled + jittered + rotated on every mount,
       so the scene looks different each visit.
     • while spread, the tiles magnetically flee the cursor
       (spring-damped), so hovering feels alive.
   ────────────────────────────────────────────────────────────── */

const LOGOS = [
  "slack", "microsoft-teams", "notion", "github", "hubspot", "confluence",
  "google-drive", "gmail", "stripe", "zendesk", "figma", "workday",
  "intercom", "servicenow", "airtable", "bamboohr", "brex", "docusign",
  "looker", "mixpanel", "quickbooks", "tableau", "greenhouse",
  "google-calendar", "google-meet", "onedrive", "sharepoint", "bigquery",
  "gong", "salesforce", "jira", "zoom", "snowflake", "asana", "calendly",
  "clickup", "dropbox", "box", "gitlab", "databricks", "datadog",
  "amplitude", "linear",
].map((n) => `/logos/${n}.svg`);

// "Pages" — the markdown / docs / sheets that pile up around the tools.
// Colour-coded by type: .md brown · .pdf red · .csv/.xlsx green ·
// .docx/.sql blue · .key/.fig purple.
const FILES: { name: string; color: string }[] = [
  { name: "Q3-OKRs.md", color: "#8B5E3C" },
  { name: "board-deck.pdf", color: "#C0392B" },
  { name: "budget-FY26.xlsx", color: "#1E8E5A" },
  { name: "roadmap.md", color: "#8B5E3C" },
  { name: "gtm-strategy.docx", color: "#2E6FB0" },
  { name: "sales-pipeline.csv", color: "#1E8E5A" },
  { name: "metrics.sql", color: "#2E6FB0" },
  { name: "design-spec.fig", color: "#6B4FB0" },
  { name: "pitch-deck.key", color: "#6B4FB0" },
  { name: "forecast.xlsx", color: "#1E8E5A" },
  { name: "invoice-Q1.pdf", color: "#C0392B" },
  { name: "brand-guide.md", color: "#8B5E3C" },
];

const TILE = 74;

// Cluster the clutter on the LEFT of the canvas (golden-angle spiral
// around a left-of-center point → dense, even, organic). Radii widened a
// touch to keep breathing room now that there are more pages.
const LCX = -460;
const LRX = 280;
const LRY = 300;
function scatterLeft(i: number, total: number) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const t = (i + 0.5) / total;
  const r = Math.sqrt(t);
  const a = i * golden;
  return { x: LCX + Math.cos(a) * r * LRX, y: Math.sin(a) * r * LRY };
}

// Bring-your-own-AI providers — the agents that operate the Cabinet,
// mixed into the same cloud as the tools and pages they work on.
const PROVIDERS = [
  "claude.svg", "openai.svg", "gemini.svg", "grok.svg",
  "copilot.svg", "cursor.svg", "opencode.svg", "pi.svg",
].map((f) => `/providers/${f}`);

type Floating =
  | { kind: "logo"; src: string; ai?: boolean }
  | { kind: "file"; name: string; color: string };

const FLOATING: Floating[] = [
  ...LOGOS.map((src) => ({ kind: "logo" as const, src })),
  ...PROVIDERS.map((src) => ({ kind: "logo" as const, src, ai: true })),
  ...FILES.map((f) => ({ kind: "file" as const, name: f.name, color: f.color })),
];

type Slot = { item: Floating; x: number; y: number; rot: number; s: number };

// Build a randomised cloud: Fisher–Yates shuffle the items (so each lands
// on a different spiral slot), then jitter position and rotation per tile.
// Called once on mount → a fresh layout every page load.
function buildLayout(): Slot[] {
  const order = [...FLOATING];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order.map((item, i) => {
    const base = scatterLeft(i, order.length);
    return {
      item,
      x: base.x + (Math.random() - 0.5) * 50,
      y: base.y + (Math.random() - 0.5) * 50,
      rot: (Math.random() - 0.5) * 18,
      s: ((i % 8) / 8) * 0.14, // staggered stream
    };
  });
}

// Magnetic repel tuning — tiles flee the cursor within this radius (px),
// pushed up to this many px, spring-damped for a soft, liquid feel.
const REPEL_RADIUS = 160;
const REPEL_STRENGTH = 88;
const REPEL_SPRING = { stiffness: 240, damping: 17, mass: 0.7 };

// Map a filename's extension to its file-type badge icon. Flat vector marks
// (not raster) so they stay crisp at the tile's 22–40px display size.
const FILE_TAB_ICON: Record<string, LucideIcon> = {
  md: FileText, pdf: FileText, xlsx: FileSpreadsheet, csv: FileSpreadsheet,
  docx: FileText, sql: FileCode, key: Presentation, fig: PenTool,
};

function FileMark({ name, color, size = 22 }: { name: string; color: string; size?: number }) {
  const ext = name.split(".").pop() ?? "";
  const Icon = FILE_TAB_ICON[ext];
  if (Icon) {
    return (
      <span
        className="flex shrink-0 items-center justify-center rounded-md"
        style={{ width: size, height: size, background: color }}
      >
        <Icon size={size * 0.62} color="#fff8ec" strokeWidth={2.25} />
      </span>
    );
  }
  return (
    <span
      className="shrink-0 rounded-md"
      style={{ width: size * 0.8, height: size, background: color }}
    />
  );
}

/* ─── The wooden cabinet from the launch video, drawn in CSS. The whole
   cabinet buzzes, then the next drawer springs open as the last one shuts,
   cycling through what Cabinet holds. ─── */
const DRAWERS = ["Knowledge", "AI team", "Tasks"];
// Where tiles fly to: the mouth of the open Knowledge drawer, in the scene's
// centered coordinate space (cabinet is 216 wide, drawer 1 sits near the top).
const DRAWER_MOUTH_Y = -69;
const CABINET_WOOD = "linear-gradient(135deg, #EDDCBF 0%, #DCC098 45%, #C9A47A 100%)";
const CABINET_WOOD_DARK = "linear-gradient(135deg, #C9A47A 0%, #B8905F 60%, #A87F4F 100%)";
const CABINET_BRASS = "linear-gradient(180deg, #F0DCA8 0%, #D9BC7A 55%, #B89A54 100%)";

// How far the drawer front slides out when open — shared with its side
// panels below so they extend exactly as far as the front actually moves.
const DRAWER_EXTEND = 26;
const DRAWER_SPRING = { type: "spring" as const, stiffness: 420, mass: 0.8 };

function CabinetDrawer({ label, open }: { label: string; open: boolean }) {
  return (
    <div className="relative" style={{ height: 48, margin: "5px 10px", zIndex: open ? 2 : 1 }}>
      {/* dark opening revealed behind the front */}
      <div
        className="absolute inset-0 rounded-[9px]"
        style={{
          background: "linear-gradient(180deg, #211B16 0%, #2C2520 100%)",
          boxShadow: "inset 0 5px 12px rgba(0, 0, 0, 0.55)",
        }}
      />
      {/* drawer sides — angled wood panels (narrow at the back of the box,
          wide at the front) that grow in step with the front's own slide.
          The taper is what actually reads as depth, not just a rectangle
          that grows taller. */}
      {(["left", "right"] as const).map((side) => (
        <motion.div
          key={side}
          aria-hidden
          className="absolute top-0"
          style={{
            [side]: 0,
            width: 15,
            background: "linear-gradient(180deg, #6E4F31 0%, #B8905F 100%)",
            clipPath:
              side === "left"
                ? "polygon(55% 0, 100% 0, 100% 100%, 0 100%)"
                : "polygon(0 0, 45% 0, 100% 100%, 0 100%)",
            boxShadow:
              side === "left"
                ? "inset -3px 0 4px rgba(0, 0, 0, 0.4)"
                : "inset 3px 0 4px rgba(0, 0, 0, 0.4)",
          }}
          animate={{ height: open ? DRAWER_EXTEND + 10 : 0, opacity: open ? 1 : 0 }}
          transition={{ ...DRAWER_SPRING, damping: open ? 12 : 24 }}
        />
      ))}
      {/* drawer front slides down + out on a springy, wobbly open */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-[3px] rounded-[9px]"
        animate={{ y: open ? DRAWER_EXTEND : 0, scale: open ? 1.08 : 1 }}
        transition={{ ...DRAWER_SPRING, damping: open ? 12 : 24 }}
        style={{
          background: CABINET_WOOD,
          boxShadow: open
            ? "0 14px 22px -10px rgba(60, 38, 20, 0.6)"
            : "inset 0 1px 2px rgba(255, 255, 255, 0.28), inset 0 -2px 3px rgba(0, 0, 0, 0.22)",
        }}
      >
        <div
          style={{
            width: 52,
            height: 7,
            borderRadius: 5,
            background: CABINET_BRASS,
            boxShadow: "0 2px 3px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
          }}
        />
        <span
          className="whitespace-nowrap rounded px-2 text-[11px] font-semibold tracking-[0.03em]"
          style={{ color: "#7A4F30", background: "rgba(122, 79, 48, 0.13)" }}
        >
          {label}
        </span>
      </motion.div>
    </div>
  );
}

function AnimatedCabinet({ holdOpen = null }: { holdOpen?: number | null }) {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const body = useAnimationControls();

  useEffect(() => {
    if (prefersReduced) return;
    if (holdOpen !== null) {
      // e.g. while tiles pour into the Knowledge drawer, keep it open
      setActive(holdOpen);
      return;
    }
    const t = setInterval(() => {
      body.start({ rotate: [0, -1.1, 1.3, -0.7, 0.4, 0], transition: { duration: 0.4 } });
      setActive((a) => (a + 1) % DRAWERS.length);
    }, 2300);
    return () => clearInterval(t);
  }, [prefersReduced, body, holdOpen]);

  return (
    <motion.div animate={body} className="w-[216px]">
      <div
        className="rounded-[20px]"
        style={{
          background: CABINET_WOOD_DARK,
          padding: "10px 4px 4px",
          boxShadow:
            "0 24px 44px -18px rgba(60, 38, 20, 0.55), inset 0 2px 3px rgba(255, 255, 255, 0.18)",
        }}
      >
        {DRAWERS.map((label, i) => (
          <CabinetDrawer key={label} label={label} open={!prefersReduced && i === active} />
        ))}
      </div>
      {/* legs */}
      <div className="flex justify-between px-8">
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{ width: 20, height: 12, borderRadius: "0 0 6px 6px", background: CABINET_WOOD_DARK }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function FloatingTile({
  progress,
  pointerX,
  pointerY,
  item,
  posX,
  posY,
  rot,
  s,
}: {
  progress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  item: Floating;
  posX: number;
  posY: number;
  rot: number;
  s: number;
}) {
  // Hold the opening composition, then draw every tile into Cabinet.
  const clearEnd = 0.24 + s * 0.55;
  const baseX = useTransform(progress, [0, 0.08, clearEnd], [posX, posX, 0]);
  const baseY = useTransform(progress, [0, 0.08, clearEnd], [posY, posY, DRAWER_MOUTH_Y]);
  const baseScale = useTransform(progress, [0, 0.08, clearEnd], [1, 1, 0.05]);
  const opacity = useTransform(progress, [0, 0.08, clearEnd - 0.045, clearEnd], [1, 1, 1, 0]);

  // Magnetic repel — push away from the cursor with a quadratic falloff,
  // gated by opacity so tiles stop reacting once they're absorbed.
  const repelX = useTransform(() => {
    const dx = baseX.get() - pointerX.get();
    const dy = baseY.get() - pointerY.get();
    const dist = Math.hypot(dx, dy);
    if (dist >= REPEL_RADIUS || dist === 0) return 0;
    const g = (1 - dist / REPEL_RADIUS) ** 2 * opacity.get();
    return (dx / dist) * g * REPEL_STRENGTH;
  });
  const repelY = useTransform(() => {
    const dx = baseX.get() - pointerX.get();
    const dy = baseY.get() - pointerY.get();
    const dist = Math.hypot(dx, dy);
    if (dist >= REPEL_RADIUS || dist === 0) return 0;
    const g = (1 - dist / REPEL_RADIUS) ** 2 * opacity.get();
    return (dy / dist) * g * REPEL_STRENGTH;
  });
  const repelScale = useTransform(() => {
    const dx = baseX.get() - pointerX.get();
    const dy = baseY.get() - pointerY.get();
    const dist = Math.hypot(dx, dy);
    if (dist >= REPEL_RADIUS) return 0;
    return (1 - dist / REPEL_RADIUS) ** 2 * opacity.get() * 0.16;
  });

  const sx = useSpring(repelX, REPEL_SPRING);
  const sy = useSpring(repelY, REPEL_SPRING);
  const ss = useSpring(repelScale, REPEL_SPRING);

  const x = useTransform(() => baseX.get() + sx.get());
  const y = useTransform(() => baseY.get() + sy.get());
  const scale = useTransform(() => baseScale.get() + ss.get());

  const w = TILE;
  const h = TILE;
  const isAI = item.kind === "logo" && item.ai;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ x, y, rotate: rot, scale, opacity, marginLeft: -w / 2, marginTop: -h / 2, willChange: "transform" }}
    >
      {item.kind === "logo" ? (
        <div
          className={
            isAI
              ? "wood-tile wood-tile--ai painted-wood-tile flex items-center justify-center rounded-2xl"
              : "wood-tile painted-wood-tile flex items-center justify-center rounded-2xl"
          }
          style={{ width: w, height: h }}
        >
          <Image
            src={item.src}
            alt=""
            width={40}
            height={40}
            className="object-contain"
            // Printed-on-wood: one soft shadow under the mark keeps the logo
            // crisp and readable while still sitting "in" the tile.
            style={{
              width: 40,
              height: 40,
              filter: "drop-shadow(0 1px 1.5px rgba(84, 52, 26, 0.3))",
            }}
          />
        </div>
      ) : (
        <div
          className="wood-tile painted-wood-tile flex items-center justify-center rounded-2xl"
          style={{ width: w, height: h }}
        >
          <FileMark name={item.name} color={item.color} size={40} />
        </div>
      )}
    </motion.div>
  );
}

type LaneItem =
  | { kind: "label"; text: string; icon: LucideIcon }
  | { kind: "file"; name: string; color: string }
  | {
      kind: "dash";
      title: string;
      value: string;
      trend: number;
      accent: string;
      bars: number[];
      chartStyle: "bars" | "line" | "area";
      rotate: number;
      offsetX: number;
      offsetY: number;
    }
  | { kind: "agent"; name: string; logo: string }
  | { kind: "task"; name: string };

// Each category's label + sample items queue through ONE shared reading spot
// beside the cabinet — a single column, not four clusters scattered across
// the screen — then peel off into the drawer that actually holds them:
// Files and Dashboards both live in Knowledge, AI agents in AI team, Tasks
// in Tasks.
const CATEGORIES: { text: string; icon: LucideIcon; drawer: number; items: LaneItem[] }[] = [
  {
    text: "Files",
    icon: FolderOpen,
    drawer: 0,
    items: [
      { kind: "file", name: "roadmap.md", color: "#8B5E3C" },
      { kind: "file", name: "spec.md", color: "#5A7A4F" },
      { kind: "file", name: "notes.md", color: "#3B6FB0" },
      { kind: "file", name: "budget.xlsx", color: "#1E8E5A" },
      { kind: "file", name: "deck.pdf", color: "#C0392B" },
    ],
  },
  {
    text: "Dashboards",
    icon: LayoutDashboard,
    drawer: 0,
    items: [
      { kind: "dash", title: "Pipeline", value: "$482K", trend: 12, accent: "#3B6FB0", bars: [45, 60, 72, 55, 80, 68], chartStyle: "bars", rotate: -5, offsetX: -10, offsetY: 4 },
      { kind: "dash", title: "Usage", value: "94%", trend: 6, accent: "#5A7A4F", bars: [60, 85, 45, 92, 65, 78], chartStyle: "line", rotate: 4, offsetX: 12, offsetY: -8 },
      { kind: "dash", title: "Open tickets", value: "23", trend: -8, accent: "#C0392B", bars: [70, 55, 62, 40, 48, 35], chartStyle: "area", rotate: -3, offsetX: -6, offsetY: 12 },
    ],
  },
  {
    text: "AI agents",
    icon: Bot,
    drawer: 1,
    items: [
      { kind: "agent", name: "SDR", logo: PROVIDERS[0] },
      { kind: "agent", name: "Marketing Expert", logo: PROVIDERS[1] },
      { kind: "agent", name: "Researcher", logo: PROVIDERS[2] },
    ],
  },
  {
    text: "Tasks",
    icon: ListChecks,
    drawer: 2,
    items: [
      { kind: "task", name: "Weekly report" },
      { kind: "task", name: "Scout Reddit" },
      { kind: "task", name: "Nightly backup" },
    ],
  },
];

// Row spacing, sized to each item kind's actual rendered height (dashboard
// cards run ~150px tall, file tiles ~74px) — a spacing this size prevents
// consecutive rows, and the category label, from overlapping one another.
const ROW_HEIGHT_BY_KIND: Partial<Record<LaneItem["kind"], number>> = {
  file: 96,
  dash: 168,
  agent: 78,
  task: 72,
};
const LABEL_ROW_HEIGHT = 78;
// Where the column sits while it's being read, before diving toward x=0.
const COLUMN_X = 260;
// Consecutive drawers are 58px apart (drawer height 48 + 5px margin each
// side) — reused from CabinetDrawer's own layout, see DRAWER_MOUTH_Y above.
const DRAWER_GAP_Y = 58;
const CATEGORY_SPAN = 0.12;
const COLUMN_START = 0.3;
// Phase 1 — gather: items slide in one after another, staggered by this much.
const ROW_ENTER_STEP = 0.012;
const ENTER_DUR = 0.035;
// A short beat after the LAST item lands, so the full group is visibly
// assembled before any of them moves — pull them all in, then send them in.
const GROUP_HOLD = 0.015;
// Phase 2 — enter: once gathered, items dive into the drawer as a group.
const DIVE_STEP = 0.008;
const DIVE_DUR = 0.035;

type ColumnRow = {
  item: LaneItem;
  rowY: number;
  drawer: number;
  enterStart: number;
  enterEnd: number;
  diveStart: number;
  diveEnd: number;
};

function buildColumnRows(): ColumnRow[] {
  const rows: ColumnRow[] = [];
  CATEGORIES.forEach((cat, c) => {
    const catStart = COLUMN_START + c * CATEGORY_SPAN;
    const items: LaneItem[] = [{ kind: "label", text: cat.text, icon: cat.icon }, ...cat.items];
    // Every item waits for the LAST one to finish arriving before any of
    // them dives — the category gathers fully, then enters together.
    const groupHoldEnd = catStart + (items.length - 1) * ROW_ENTER_STEP + ENTER_DUR + GROUP_HOLD;
    const rowHeight = Math.max(ROW_HEIGHT_BY_KIND[cat.items[0].kind] ?? 90, LABEL_ROW_HEIGHT);
    items.forEach((item, j) => {
      const enterStart = catStart + j * ROW_ENTER_STEP;
      const diveStart = groupHoldEnd + j * DIVE_STEP;
      rows.push({
        item,
        rowY: (j - (items.length - 1) / 2) * rowHeight,
        drawer: cat.drawer,
        enterStart,
        enterEnd: enterStart + ENTER_DUR,
        diveStart,
        diveEnd: diveStart + DIVE_DUR,
      });
    });
  });
  return rows;
}
const COLUMN_ROWS = buildColumnRows();

function LaneChip({ item }: { item: LaneItem }) {
  switch (item.kind) {
    case "label": {
      const Icon = item.icon;
      return (
        <span className="inline-flex items-center gap-3 whitespace-nowrap rounded-2xl bg-accent px-7 py-4 shadow-2xl shadow-accent/30">
          <Icon size={26} className="shrink-0 text-white/90" strokeWidth={2.25} />
          <span className="font-sans text-2xl font-bold uppercase tracking-[0.06em] text-white sm:text-3xl">
            {item.text}
          </span>
        </span>
      );
    }
    case "file":
      // Same wood-tile mark as the file cloud earlier in the scene — icon on
      // top, filename below — so a file reads as the same object throughout.
      return (
        <div
          className="wood-tile painted-wood-tile flex flex-col items-center justify-center gap-1 rounded-2xl"
          style={{ width: TILE, height: TILE }}
        >
          <FileMark name={item.name} color={item.color} size={38} />
          <span className="w-full truncate px-1 text-center font-sans text-[8px] font-bold text-[#3b2f2f]">
            {item.name}
          </span>
        </div>
      );
    case "dash": {
      const up = item.trend >= 0;
      // Line/area charts share one set of points derived from the same bar
      // values, so all three chart styles are reading the same "data".
      const w = 156;
      const h = 56;
      const pts = item.bars.map((v, i) => ({
        x: (i / (item.bars.length - 1)) * w,
        y: h - (v / 100) * h,
      }));
      const linePoints = pts.map((p) => `${p.x},${p.y}`).join(" ");
      const areaPath = `M0,${h} L${pts.map((p) => `${p.x},${p.y}`).join(" L")} L${w},${h} Z`;
      const last = pts[pts.length - 1];
      return (
        <div
          className="rounded-xl border border-black/5 bg-white p-3.5 shadow-xl shadow-black/10"
          style={{
            width: 190,
            // Scattered, not stacked — pitched and nudged like the file
            // tiles in the opening cloud, so the pile reads as a pile.
            transform: `rotate(${item.rotate}deg) translate(${item.offsetX}px, ${item.offsetY}px)`,
          }}
        >
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <span className="font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
              {item.title}
            </span>
            <span className={`font-code text-xs font-bold ${up ? "text-[#1E8E5A]" : "text-[#C0392B]"}`}>
              {up ? "▲" : "▼"} {Math.abs(item.trend)}%
            </span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: item.accent }} />
            <span className="font-code text-xl font-bold text-text-primary">{item.value}</span>
          </div>
          {item.chartStyle === "bars" && (
            <div className="flex h-14 items-end gap-1.5">
              {item.bars.map((barHeight, index) => (
                <span
                  key={index}
                  className="chart-bar-pulse flex-1 rounded-sm"
                  style={{
                    height: `${barHeight}%`,
                    background: `${item.accent}55`,
                    animationDelay: `${index * 0.12}s`,
                  }}
                />
              ))}
            </div>
          )}
          {item.chartStyle === "line" && (
            <svg viewBox={`0 0 ${w} ${h}`} className="h-14 w-full" preserveAspectRatio="none">
              <polyline
                points={linePoints}
                fill="none"
                stroke={item.accent}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="chart-line-draw"
              />
              <circle cx={last.x} cy={last.y} r={3.5} fill={item.accent} className="chart-dot-pulse" />
            </svg>
          )}
          {item.chartStyle === "area" && (
            <svg viewBox={`0 0 ${w} ${h}`} className="h-14 w-full">
              <path
                d={areaPath}
                fill={`${item.accent}33`}
                stroke={item.accent}
                strokeWidth={2}
                className="chart-area-breathe"
              />
            </svg>
          )}
        </div>
      );
    }
    case "agent":
      return (
        <span className="inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-accent-bg-subtle px-6 py-3.5 shadow-xl shadow-accent/10 ring-1 ring-accent/20">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
            <Image src={item.logo} alt="" width={20} height={20} className="object-contain" />
          </span>
          <span className="font-code text-2xl font-medium text-accent-warm">{item.name}</span>
        </span>
      );
    case "task":
      return (
        <span className="inline-flex items-center gap-3 whitespace-nowrap rounded-xl border border-black/5 bg-white px-5 py-3.5 shadow-xl shadow-black/10">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-base font-bold leading-none text-white">
            ✓
          </span>
          <span className="font-code text-2xl text-text-secondary">{item.name}</span>
        </span>
      );
  }
}

function ColumnItem({ progress, row }: { progress: MotionValue<number>; row: ColumnRow }) {
  const { item, rowY, drawer, enterStart, enterEnd, diveStart, diveEnd } = row;
  const drawerMouthY = DRAWER_MOUTH_Y + drawer * DRAWER_GAP_Y;

  // Phase 1: slide in flat at its own row height (label on top, items below
  // — one column, first row first) and wait — the whole category gathers
  // before anyone moves. Phase 2: once gathered, dive into the drawer that
  // actually holds it.
  const x = useTransform(progress, [enterStart, enterEnd, diveStart, diveEnd], [690, COLUMN_X, COLUMN_X, 0]);
  const y = useTransform(progress, [enterStart, diveStart, diveEnd], [rowY, rowY, drawerMouthY]);
  const scale = useTransform(progress, [enterStart, diveStart, diveEnd], [1, 1, 0.05]);
  const opacity = useTransform(
    progress,
    [enterStart, enterStart + (enterEnd - enterStart) * 0.6, diveStart, diveEnd],
    [0, 1, 1, 0]
  );
  // In front of the cabinet (z-10) so items visibly drop INTO the open drawer.
  const zIndex = item.kind === "label" ? 21 : 20;

  return (
    // Anchored at the LEFT edge (not centered) so items of different widths
    // — "TASKS" vs. "Nightly backup" — still line up into a neat pile
    // instead of drifting to ragged left edges.
    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-y-1/2" style={{ zIndex }}>
      <motion.div style={{ x, y, scale, opacity, willChange: "transform" }}>
        <LaneChip item={item} />
      </motion.div>
    </div>
  );
}

function StaticFallback() {
  return (
    <section className="dot-grid relative min-h-screen overflow-hidden bg-[#f2ece4] pt-20">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 48% 50%, rgba(190,139,82,0.2), transparent 24%), radial-gradient(circle at 12% 48%, rgba(255,255,255,0.74), transparent 38%)",
        }}
      />
      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1500px] items-center gap-6 px-6 py-16 lg:grid-cols-[1fr_auto_1fr]">
        <div className="flex max-w-xl flex-wrap justify-center gap-2.5 lg:justify-start">
          {[...LOGOS.slice(0, 9), ...PROVIDERS.slice(0, 3)].map((src) => (
            <div
              key={src}
              className="wood-tile painted-wood-tile flex items-center justify-center rounded-2xl"
              style={{ width: TILE, height: TILE }}
            >
              <Image
                src={src}
                alt=""
                width={40}
                height={40}
                style={{ width: 40, height: 40 }}
                className="object-contain"
              />
            </div>
          ))}
          {FILES.slice(0, 4).map((file) => (
            <div
              key={file.name}
              className="wood-tile painted-wood-tile flex flex-col items-center justify-center gap-1 rounded-2xl"
              style={{ width: TILE, height: TILE }}
            >
              <FileMark name={file.name} color={file.color} size={38} />
              <span className="w-full truncate px-1 text-center font-sans text-[8px] font-bold text-[#3b2f2f]">
                {file.name}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mx-auto h-[250px] w-[240px]">
          <div className="absolute left-1/2 top-[94%] h-6 w-28 -translate-x-1/2 rounded-full bg-[#59402f]/20 blur-xl" />
          <div className="mx-auto w-[216px]">
            <AnimatedCabinet />
          </div>
        </div>
        <div className="mx-auto max-w-xl text-center lg:ml-auto lg:text-right">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            One place for your work
          </p>
          <h2
            className="text-[clamp(3.5rem,6vw,6.5rem)] leading-[0.88] tracking-[-0.045em] text-text-primary"
            style={{
              fontFamily: "var(--font-brand)",
              textShadow: "0 1px 18px rgba(250, 246, 241, 0.72)",
            }}
          >
            Your work
            <br />
            lives in
            <br />
            <span className="italic text-text-secondary/75">a hundred places.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}

// Above the demo video: "Cabinet" plus a rotating benefit line.
const BENEFITS = [
  "works the way you already do.",
  "holds your entire knowledge base.",
  "is built for your whole team.",
  "puts ready-made AI teams to work.",
];

function RotatingBenefits() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % BENEFITS.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <h2 className="[font-family:var(--font-brand)] text-[clamp(1.05rem,4.4vw,1.875rem)] leading-tight tracking-[-0.045em] text-text-primary sm:text-3xl md:text-5xl">
      <span className="inline-flex items-baseline gap-3 text-left">
        <span className="font-brand italic">Cabinet</span>
        {/* invisible sizer reserves the widest phrase's width so Cabinet
            stays anchored and the block doesn't recenter as text rotates */}
        <span className="relative inline-block whitespace-nowrap">
          <span aria-hidden className="invisible">holds your entire knowledge base.</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              className="absolute left-0 top-0 inline-block"
            >
              {BENEFITS[i]}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </h2>
  );
}

export function IntegrationScene() {
  const ref = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Cursor position relative to the scene centre (where the tiles' x/y are
  // anchored). Parked far away so nothing reacts until the cursor enters.
  const pointerX = useMotionValue(99999);
  const pointerY = useMotionValue(99999);
  // Cached instead of re-measured on every pointermove (which can fire well
  // above 60Hz) — the sticky container's rect only changes on resize.
  const stickyRectRef = useRef<DOMRect | null>(null);
  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!stickyRectRef.current) {
      const el = stickyRef.current;
      if (!el) return;
      stickyRectRef.current = el.getBoundingClientRect();
    }
    const r = stickyRectRef.current;
    pointerX.set(e.clientX - (r.left + r.width / 2));
    pointerY.set(e.clientY - (r.top + r.height / 2));
  };
  const resetPointer = () => {
    pointerX.set(99999);
    pointerY.set(99999);
  };

  const { scrollY } = useScroll();
  const [range, setRange] = useState<[number, number]>([0, 1]);
  const [mounted, setMounted] = useState(false);
  // Randomised after hydration, so Math.random() never causes a mismatch and
  // the cloud is fresh on every visit.
  const [layout, setLayout] = useState<Slot[]>([]);
  // The scatter/repel physics (63 tiles' worth of chained motion values) only
  // need to run while the scene is actually on screen — gated the same way
  // the demo video below already gates its own load.
  const [sceneInView, setSceneInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const dist = Math.max(1, el.offsetHeight - window.innerHeight);
      setRange([top, top + dist]);
      stickyRectRef.current = null;
    };
    const animationFrame = requestAnimationFrame(() => {
      setMounted(true);
      setLayout(buildLayout());
      measure();
    });
    window.addEventListener("resize", measure);

    const observer = new IntersectionObserver(
      ([entry]) => setSceneInView(entry.isIntersecting),
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, []);

  const scrollYProgress = useTransform(scrollY, range, [0, 1], { clamp: true });
  const sceneProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.6,
    restDelta: 0.0005,
  });

  // Cabinet appears before the cloud starts moving so every tile has a clear
  // destination. It stays through the complete absorption beat AND through
  // the closing "AI team" caption — only clearing in the last sliver, right
  // as the pin releases into the demo video.
  const hubOpacity = useTransform(
    sceneProgress,
    [0.035, 0.1, 0.99, 1],
    [0, 1, 1, 0]
  );
  const hubScale = useTransform(
    sceneProgress,
    [0.035, 0.11, 0.99, 1],
    [0.72, 1, 1, 0.9]
  );
  const hubGroundOpacity = useTransform(
    sceneProgress,
    [0.08, 0.14, 0.99, 1],
    [0, 0.28, 0.28, 0]
  );

  // Hold whichever drawer is currently receiving the column open: Knowledge
  // while the tile cloud pours in and through Files/Dashboards, AI team for
  // agents, Tasks for tasks — otherwise the drawers resume cycling.
  const [drawerHold, setDrawerHold] = useState<number | null>(null);
  useMotionValueEvent(sceneProgress, "change", (v) => {
    if (v > 0.06 && v < COLUMN_START - 0.02) {
      setDrawerHold(0);
      return;
    }
    const row = COLUMN_ROWS.find((r) => v > r.enterStart - 0.006 && v < r.diveEnd + 0.015);
    setDrawerHold(row ? row.drawer : null);
  });

  // Absorption glow (stays centered while the suck-in happens).
  const glowScale = useTransform(sceneProgress, [0, 0.3], [0.5, 1.5]);
  const glowOpacity = useTransform(sceneProgress, [0.04, 0.18, 0.28, 0.34], [0, 0.9, 0.9, 0]);

  // Captions — beat 1 → beat 2 handoff.
  // The title doesn't just fade: as the Cabinet appears and swallows the cloud
  // it gets "whisked away" — drifting up and blurring into a soft poof (a
  // magic-wand dissolve) while keeping its own type intact. The capture line
  // then materialises right behind it with a focus-pull: it unblurs, scales up,
  // and rises into place.
  const capTitle = useTransform(sceneProgress, [0, 0.13, 0.23], [1, 1, 0]);
  const titleScale = useTransform(sceneProgress, [0.13, 0.23], [1, 1.035]);
  const titleY = useTransform(sceneProgress, [0.13, 0.23], [0, -24]);
  const titleBlur = useTransform(sceneProgress, [0.13, 0.23], [0, 7]);
  const titleFilter = useMotionTemplate`blur(${titleBlur}px)`;

  const capCapture = useTransform(sceneProgress, [0.29, 0.38, 0.72, 0.8], [0, 1, 1, 0]);
  const captureScale = useTransform(sceneProgress, [0.29, 0.38], [0.9, 1]);
  const captureY = useTransform(sceneProgress, [0.29, 0.38], [20, 0]);
  const captureBlur = useTransform(sceneProgress, [0.29, 0.38], [10, 0]);
  const captureFilter = useMotionTemplate`blur(${captureBlur}px)`;

  const capVideo = useTransform(sceneProgress, [0.8, 0.88, 1], [0, 1, 1]);
  const hintOpacity = useTransform(sceneProgress, [0, 0.04], [1, 0]);

  // Word-stagger triggers for the later captions. Inside the pinned scene the
  // caption elements sit in the viewport the whole time, so in-view detection
  // would fire the reveal at scene entry; gate it on the caption's own beat.
  const [captureRevealed, setCaptureRevealed] = useState(false);
  const [videoCapRevealed, setVideoCapRevealed] = useState(false);
  const [demoVideoReady, setDemoVideoReady] = useState(false);
  const demoRef = useRef<HTMLElement>(null);

  useMotionValueEvent(sceneProgress, "change", (v) => {
    setCaptureRevealed(v > 0.33);
    setVideoCapRevealed(v > 0.84);
  });

  useEffect(() => {
    const demo = demoRef.current;
    if (!demo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setDemoVideoReady(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(demo);
    return () => observer.disconnect();
  }, []);

  if (prefersReduced && mounted) return <StaticFallback />;

  return (
    <>
    <div ref={ref} className="relative h-[420vh] bg-bg">
      <div
        ref={stickyRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
        className="dot-grid sticky top-0 h-screen overflow-hidden bg-[#f2ece4]"
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(193,139,78,0.2), transparent 20%), radial-gradient(circle at 14% 46%, rgba(255,255,255,0.7), transparent 38%)",
          }}
        />

        {/* Brown app and file tiles stay fully legible until they reach the
            open Cabinet, where they shrink behind the cabinet image. Only
            mounted while the scene is on screen — 63 tiles' worth of chained
            spring/repel motion values is real work to skip when scrolled away. */}
        <div className="absolute inset-0 z-20 overflow-hidden">
          {sceneInView &&
            layout.map((slot) => (
              <FloatingTile
                key={slot.item.kind === "logo" ? slot.item.src : slot.item.name}
                progress={sceneProgress}
                pointerX={pointerX}
                pointerY={pointerY}
                item={slot.item}
                posX={slot.x}
                posY={slot.y}
                rot={slot.rot}
                s={slot.s}
              />
            ))}
        </div>

        {COLUMN_ROWS.map((row, index) => (
          <ColumnItem key={index} progress={sceneProgress} row={row} />
        ))}

        {/* absorption glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            scale: glowScale,
            opacity: glowOpacity,
            width: 360,
            height: 360,
            marginLeft: -180,
            marginTop: -180,
            background:
              "radial-gradient(circle, rgba(139,94,60,0.55), rgba(139,94,60,0.12) 45%, transparent 70%)",
          }}
        />

        {/* The only destination in the scene. */}
        <motion.div
          className="absolute left-1/2 top-1/2 z-10"
          style={{
            scale: hubScale,
            opacity: hubOpacity,
            marginLeft: -108,
            marginTop: -108,
          }}
        >
          <div className="relative h-[216px] w-[216px] origin-bottom max-sm:-translate-y-[15vh] max-sm:scale-[0.52]">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-[96%] h-5 w-24 -translate-x-1/2 rounded-full bg-[#4b3424] blur-md"
              style={{ opacity: hubGroundOpacity }}
            />
            <AnimatedCabinet holdOpen={drawerHold} />
          </div>
        </motion.div>

        {/* beat 1 — title beside the cloud (outer div positions; inner h2 is
            free to run its own magic-wand dissolve transform) */}
        <div className="pointer-events-none absolute right-[9vw] top-1/2 z-30 max-w-xs -translate-y-1/2 text-right sm:max-w-sm md:right-[12vw] md:max-w-lg lg:right-[14vw]">
          <motion.div
            style={{
              opacity: capTitle,
              scale: titleScale,
              y: titleY,
              filter: titleFilter,
            }}
          >
            <ScrollReveal
              baseRotation={0}
              revealed
              staggerDelay={0.08}
              textClassName="[font-family:var(--font-brand)] [text-shadow:0_1px_18px_rgba(250,246,241,0.72)] text-[clamp(3.4rem,5.7vw,6.25rem)] leading-[0.9] tracking-[-0.045em] text-right text-text-primary"
            >
              Your work
              <br />
              lives in
              <br />
              <span className="italic text-text-secondary/75">
                a hundred
                <br />
                places.
              </span>
            </ScrollReveal>
          </motion.div>
        </div>

        {/* captions */}
        <div className="absolute top-1/2 left-[4vw] md:left-[8vw] lg:left-[11vw] -translate-y-1/2 max-w-xs sm:max-w-sm md:max-w-lg text-left pointer-events-none">
          <motion.div
            style={{
              opacity: capCapture,
              scale: captureScale,
              y: captureY,
              filter: captureFilter,
            }}
          >
            <ScrollReveal
              baseRotation={0}
              revealed={captureRevealed}
              staggerDelay={0.08}
              textClassName="[font-family:var(--font-brand)] text-[clamp(3rem,4.6vw,5rem)] leading-[0.98] tracking-[-0.045em] text-left text-text-primary"
            >
              <span className="font-brand italic">Cabinet</span>
              <br />
              pulls it all
              <br />
              into one
              <br />
              place.
            </ScrollReveal>
          </motion.div>
        </div>
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-24 w-full max-w-4xl px-6"
          style={{ opacity: capVideo }}
        >
          <ScrollReveal
            baseRotation={0}
            revealed={videoCapRevealed}
            staggerDelay={0.08}
            textClassName="[font-family:var(--font-brand)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.045em] text-center text-text-primary"
          >
            …and your AI team takes it from here, 24/7.
          </ScrollReveal>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-8 text-xs font-code text-text-muted uppercase tracking-widest"
          style={{ opacity: hintOpacity }}
        >
          scroll
        </motion.div>
      </div>
    </div>

      <DemoVideoSection demoRef={demoRef} demoVideoReady={demoVideoReady} />
    </>
  );
}

// A plain block right after the scene's "…AI team, 24/7" beat — shared by the
// full pinned-scroll scene and the mobile/reduced-motion static intro so
// neither loses the video or the rotating benefit line.
function DemoVideoSection({
  demoRef,
  demoVideoReady,
}: {
  demoRef: RefObject<HTMLElement | null>;
  demoVideoReady: boolean;
}) {
  return (
    <section ref={demoRef} className="dot-grid bg-[#f2ece4] px-6 pb-24 pt-16">
      <div className="mx-auto w-fit max-w-full overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/25">
        <video
          key={demoVideoReady ? "ready" : "idle"}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          width={2880}
          height={1794}
          className="mx-auto max-h-[64vh] w-auto max-w-full scale-[1.01]"
        >
          {demoVideoReady && (
            <>
              <source src="/new-cabinet.webm" type="video/webm" />
              <source src="/new-cabinet.mp4" type="video/mp4" />
            </>
          )}
        </video>
      </div>
      <div className="mx-auto mt-8 max-w-5xl text-center">
        <RotatingBenefits />
      </div>
    </section>
  );
}
