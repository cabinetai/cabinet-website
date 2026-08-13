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
  Calendar,
  FileCode,
  FileSpreadsheet,
  FileText,
  MessageSquare,
  PenTool,
  Presentation,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { WoodIcon } from "@/components/wood-icon";
import {
  AnimatePresence,
  animate,
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

/* ── Mobile staging ──────────────────────────────────────────────
   The desktop scene is blocked across ~1600px: clutter on the left, the
   cabinet at centre, a reading pile on the right. None of that fits a
   phone, so mobile re-blocks the same beats into a single column —
   cabinet up top, everything else centred underneath — and plays the
   timeline on a timer instead of on scroll.
   ─────────────────────────────────────────────────────────────── */
// How long the whole story takes to play itself. Long enough to read each
// beat, short enough that a thumb doesn't leave before the end.
const AUTOPLAY_SECONDS = 15;
// Blocked for a ~700px tall stage. Shorter phones (an SE, or any browser
// whose chrome eats half the screen) scale the whole staging down to fit
// rather than dropping out of it, see MOBILE_FIT_HEIGHT.
const MOBILE_CABINET_SCALE = 0.6;
const MOBILE_CABINET_DY = -135;
const MOBILE_PILE_SCALE = 0.55;
const MOBILE_PILE_DY = 172;
const MOBILE_FIT_HEIGHT = 700;
// A point inside the cabinet's own coordinate space, mapped to where it
// actually lands once the cabinet is scaled and lifted for mobile.
const mobileCabinetY = (y: number) => y * MOBILE_CABINET_SCALE + MOBILE_CABINET_DY;

// Phones get the clutter wrapped all the way around the cabinet instead of
// piled off to one side — same golden-angle spiral, taller than it is wide,
// so the "hundred places" read fills the screen a thumb is holding.
const MRX = 178;
const MRY = 352;
function scatterAround(i: number, total: number) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const t = (i + 0.5) / total;
  const r = 0.3 + 0.7 * Math.sqrt(t);
  const a = i * golden;
  return { x: Math.cos(a) * r * MRX, y: Math.sin(a) * r * MRY };
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
function buildLayout(mobile: boolean): Slot[] {
  const order = [...FLOATING];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const jitter = mobile ? 26 : 50;
  return order.map((item, i) => {
    const base = mobile ? scatterAround(i, order.length) : scatterLeft(i, order.length);
    return {
      item,
      x: base.x + (Math.random() - 0.5) * jitter,
      y: base.y + (Math.random() - 0.5) * jitter,
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
const DRAWERS = ["Knowledge", "Team", "Tasks"];
// The cabinet is drawn at a native 216px and blown up as ONE piece — every
// scene-space constant that points at a drawer must carry the same factor.
const CABINET_SCALE = 1.35;
// Where tiles fly to, in the scene's centered coordinate space: the middle
// of the DARK exposed strip of the open Knowledge drawer. In native units
// the cabinet (242 tall incl. legs) is nudged up 13px to recenter in its
// 216 box, so drawer row 0's top sits at -106; the open front slides down
// DRAWER_EXTEND, exposing that many px of dark — midpoint -106 + 17 = -89.
const DRAWER_MOUTH_Y = -89 * CABINET_SCALE;
const CABINET_WOOD = "linear-gradient(135deg, #EDDCBF 0%, #DCC098 45%, #C9A47A 100%)";
const CABINET_WOOD_DARK = "linear-gradient(135deg, #C9A47A 0%, #B8905F 60%, #A87F4F 100%)";
const CABINET_BRASS = "linear-gradient(180deg, #F0DCA8 0%, #D9BC7A 55%, #B89A54 100%)";

// How far the drawer front slides out when open — shared with its side
// panels below so they extend exactly as far as the front actually moves.
const DRAWER_EXTEND = 34;
const DRAWER_SPRING = { type: "spring" as const, stiffness: 420, mass: 0.8 };

function CabinetDrawer({ label, open }: { label: string; open: boolean }) {
  return (
    <div className="relative" style={{ height: 62, margin: "5px 10px", zIndex: open ? 2 : 1 }}>
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
        className="absolute inset-0 flex flex-col items-center justify-center rounded-[9px]"
        animate={{ y: open ? DRAWER_EXTEND : 0, scale: open ? 1.08 : 1 }}
        transition={{ ...DRAWER_SPRING, damping: open ? 12 : 24 }}
        style={{
          gap: 6,
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
        {/* card-catalog label holder: brass frame, paper card, typed text */}
        <span
          className="rounded-[5px] p-[2px]"
          style={{
            background: CABINET_BRASS,
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.55)",
          }}
        >
          <span
            className="font-display block whitespace-nowrap rounded-[3px] px-2.5 py-px text-[11.5px] font-bold uppercase tracking-[0.07em]"
            style={{
              color: "#6B4226",
              background: "linear-gradient(180deg, #FCF6E8 0%, #F0E4C8 100%)",
              boxShadow: "inset 0 1px 2px rgba(96, 64, 32, 0.28)",
            }}
          >
            {label}
          </span>
        </span>
      </motion.div>
    </div>
  );
}

// holdOpen: a drawer index keeps that drawer open, -1 holds every drawer
// shut, null lets the drawers cycle on their own.
function AnimatedCabinet({ holdOpen = null }: { holdOpen?: number | null }) {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(holdOpen ?? 0);
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
  mobile,
}: {
  progress: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  item: Floating;
  posX: number;
  posY: number;
  rot: number;
  s: number;
  mobile: boolean;
}) {
  // Hold the opening composition, then draw every tile into Cabinet.
  const clearEnd = 0.24 + s * 0.55;
  const mouthY = mobile ? mobileCabinetY(DRAWER_MOUTH_Y) : DRAWER_MOUTH_Y;
  const baseX = useTransform(progress, [0, 0.08, clearEnd], [posX, posX, 0]);
  const baseY = useTransform(progress, [0, 0.08, clearEnd], [posY, posY, mouthY]);
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
  | { kind: "label"; text: string }
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
  | { kind: "agent"; name: string; logo: string; accent: string; figure: string }
  | { kind: "task"; name: string; meta: string; icon: LucideIcon; accent: string };

// Each category's label + sample items queue through ONE shared reading spot
// beside the cabinet — a single column, not four clusters scattered across
// the screen — then peel off into the drawer that actually holds them:
// Files and Dashboards both live in Knowledge, AI agents in AI team, Tasks
// in Tasks.
type ScatterSlot = { x: number; y: number; r: number };

// Hand-placed slots for the scattered Files pile — a loose 4/3/3 grid with
// jitter and tilt, deterministic so server and client render identically.
// Spacing is sized to a page + its name (~100×95px), so every file stays
// readable, and the pile spreads rightward into space that sat empty.
const FILE_SLOTS: ScatterSlot[] = [
  { x: -60, y: -122, r: -8 },
  { x: 55, y: -100, r: 6 },
  { x: 175, y: -125, r: -4 },
  { x: 295, y: -98, r: 9 },
  { x: -5, y: 18, r: 7 },
  { x: 115, y: 38, r: -9 },
  { x: 240, y: 12, r: 4 },
  { x: -45, y: 155, r: -6 },
  { x: 80, y: 172, r: 8 },
  { x: 205, y: 150, r: -5 },
];

// Three wide agent planks — a gentle zigzag, spaced to their ~330×70 size
// (plus the mascot standing over each plank's left end).
const AGENT_SLOTS: ScatterSlot[] = [
  { x: -30, y: -100, r: -3 },
  { x: 120, y: 25, r: 2 },
  { x: -5, y: 150, r: -2 },
];

// Task papers are wide (~300×85), so they zigzag left/right down the
// column instead of stacking flush.
const TASK_SLOTS: ScatterSlot[] = [
  { x: -50, y: -180, r: -2 },
  { x: 130, y: -88, r: 2 },
  { x: -25, y: 6, r: -1.5 },
  { x: 145, y: 98, r: 2.5 },
  { x: 15, y: 190, r: -2 },
];

// Dashboard cards are ~190×150, so their pile is a 2-wide/3-deep grid with
// jitter, reaching further right for the same reason.
const DASH_SLOTS: ScatterSlot[] = [
  { x: -40, y: -150, r: -4 },
  { x: 205, y: -168, r: 3 },
  { x: -15, y: 15, r: 3 },
  { x: 230, y: 0, r: -3 },
  { x: -45, y: 180, r: 2 },
  { x: 195, y: 165, r: -2 },
];

const CATEGORIES: {
  text: string;
  drawer: number;
  // Hand-placed scatter slots (piled like the opening cloud) + where the
  // label sits above that pile. Categories without slots stack as a list.
  slots?: ScatterSlot[];
  labelPos?: { x: number; y: number };
  items: LaneItem[];
}[] = [
  {
    text: "Files",
    drawer: 0,
    slots: FILE_SLOTS,
    labelPos: { x: 90, y: -215 },
    items: [
      // Motif palette — terracotta, amber, gold, leaf, teal, sky.
      { kind: "file", name: "roadmap.md", color: "#E2725B" },
      { kind: "file", name: "spec.md", color: "#E08A3C" },
      { kind: "file", name: "notes.md", color: "#E0B23C" },
      { kind: "file", name: "budget.xlsx", color: "#6FA45A" },
      { kind: "file", name: "deck.pdf", color: "#4FA39A" },
      { kind: "file", name: "brief.docx", color: "#5B8FD6" },
      { kind: "file", name: "metrics.sql", color: "#E2725B" },
      { kind: "file", name: "design.fig", color: "#E08A3C" },
      { kind: "file", name: "pitch.key", color: "#E0B23C" },
      { kind: "file", name: "okrs.md", color: "#6FA45A" },
    ],
  },
  {
    text: "Dashboards",
    drawer: 0,
    slots: DASH_SLOTS,
    labelPos: { x: 110, y: -265 },
    items: [
      { kind: "dash", title: "Pipeline", value: "$482K", trend: 12, accent: "#5B8FD6", bars: [45, 60, 72, 55, 80, 68], chartStyle: "bars", rotate: -5, offsetX: -10, offsetY: 4 },
      { kind: "dash", title: "Usage", value: "94%", trend: 6, accent: "#6FA45A", bars: [60, 85, 45, 92, 65, 78], chartStyle: "line", rotate: 4, offsetX: 12, offsetY: -8 },
      { kind: "dash", title: "Open tickets", value: "23", trend: -8, accent: "#E2725B", bars: [70, 55, 62, 40, 48, 35], chartStyle: "area", rotate: -3, offsetX: -6, offsetY: 12 },
      { kind: "dash", title: "Revenue", value: "$1.2M", trend: 18, accent: "#E0B23C", bars: [30, 45, 55, 60, 72, 88], chartStyle: "bars", rotate: 3, offsetX: 8, offsetY: -6 },
      { kind: "dash", title: "NPS", value: "62", trend: 4, accent: "#4FA39A", bars: [48, 52, 58, 55, 63, 70], chartStyle: "line", rotate: -4, offsetX: -8, offsetY: 8 },
      { kind: "dash", title: "Signups", value: "1,840", trend: 9, accent: "#E08A3C", bars: [35, 50, 42, 65, 58, 80], chartStyle: "area", rotate: 4, offsetX: 10, offsetY: -4 },
    ],
  },
  {
    text: "AI agents",
    drawer: 1,
    slots: AGENT_SLOTS,
    labelPos: { x: 70, y: -205 },
    items: [
      // Wooden mascots from the /agents exploration: the one who picks up
      // the phone, the typewriter, and the scout owl.
      { kind: "agent", name: "SDR", logo: PROVIDERS[0], accent: "#5B8FD6", figure: "/brand/agents-office/ring.png" },
      { kind: "agent", name: "Marketing Expert", logo: PROVIDERS[1], accent: "#E2725B", figure: "/brand/agents-office/type.png" },
      { kind: "agent", name: "Researcher", logo: PROVIDERS[2], accent: "#4FA39A", figure: "/brand/agents/owl.png" },
    ],
  },
  {
    text: "Tasks",
    drawer: 2,
    slots: TASK_SLOTS,
    // Centered over the zigzag pile, not hanging off its left edge.
    labelPos: { x: 130, y: -265 },
    items: [
      { kind: "task", name: "Board brief", meta: "Ready every Monday, 7:00", icon: Calendar, accent: "#E0B23C" },
      { kind: "task", name: "Competitor watch", meta: "Scans the market daily", icon: Target, accent: "#E2725B" },
      { kind: "task", name: "Inbox triage", meta: "Sorted before you wake", icon: MessageSquare, accent: "#4FA39A" },
      { kind: "task", name: "Pipeline digest", meta: "Every morning at 8", icon: TrendingUp, accent: "#6FA45A" },
      { kind: "task", name: "Meeting notes", meta: "Filed right after the call", icon: FileText, accent: "#E08A3C" },
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
  task: 88,
};
const LABEL_ROW_HEIGHT = 78;
// Where the column sits while it's being read, before diving toward x=0.
const COLUMN_X = 260;
// Consecutive drawers are 72px apart native (drawer height 62 + 5px margin
// each side) — reused from CabinetDrawer's own layout, see DRAWER_MOUTH_Y.
const DRAWER_GAP_Y = 72 * CABINET_SCALE;
// The column always plays inside this fixed progress window: it starts once
// the "Cabinet pulls it all into one place" caption has settled (opaque by
// 0.38) and is guaranteed to finish by the end value — buildColumnRows
// normalizes the whole timeline into it, so adding or removing items can
// never push the last dive past the closing captions again.
const COLUMN_START = 0.42;
const COLUMN_END_TARGET = 0.88;
// The constants below are RELATIVE weights (rescaled by the normalization),
// so only their proportions matter.
// A small gap held open between one category finishing and the next.
const CATEGORY_GAP = 0.012;
// Phase 1 — gather: items slide in one after another, staggered by this
// much. Scattered piles (many more items) use a tighter stagger so a big
// pile doesn't take forever to arrive.
const ROW_ENTER_STEP = 0.007;
const SCATTER_ENTER_STEP = 0.0035;
const ENTER_DUR = 0.022;
// A short beat after the LAST item lands, so the full group is visibly
// assembled before any of them moves — pull them all in, then send them in.
const GROUP_HOLD = 0.008;
// Phase 2 — enter: once gathered, items dive into the drawer as a group.
const DIVE_STEP = 0.004;
const SCATTER_DIVE_STEP = 0.002;
// Long enough for the pull to read like the opening cloud's suck-in — the
// chip visibly shrinks the whole way to the drawer, not a quick hop.
const DIVE_DUR = 0.035;

type ColumnRow = {
  item: LaneItem;
  rowX: number;
  rowY: number;
  tileRotate: number;
  drawer: number;
  enterStart: number;
  enterEnd: number;
  diveStart: number;
  diveEnd: number;
  // Same pile, re-centred for the phone's single column (see mobile staging).
  mobileX: number;
  mobileY: number;
};

function buildColumnRows(): ColumnRow[] {
  const rows: ColumnRow[] = [];
  let cursor = 0;
  CATEGORIES.forEach((cat) => {
    const catStart = cursor;
    const items: LaneItem[] = [{ kind: "label", text: cat.text }, ...cat.items];
    // The desktop pile hangs off to the right of the cabinet; on mobile the
    // whole category slides back so its own middle sits on the screen's.
    const midX = cat.slots
      ? cat.slots.reduce((sum, slot) => sum + slot.x, 0) / cat.slots.length
      : 0;
    const enterStep = cat.slots ? SCATTER_ENTER_STEP : ROW_ENTER_STEP;
    const diveStep = cat.slots ? SCATTER_DIVE_STEP : DIVE_STEP;
    // Every item waits for the LAST one to finish arriving before any of
    // them dives — the category gathers fully, then enters together.
    const groupHoldEnd = catStart + (items.length - 1) * enterStep + ENTER_DUR + GROUP_HOLD;
    const rowHeight = cat.slots
      ? 0
      : Math.max(ROW_HEIGHT_BY_KIND[cat.items[0].kind] ?? 90, LABEL_ROW_HEIGHT);
    items.forEach((item, j) => {
      const enterStart = catStart + j * enterStep;
      const diveStart = groupHoldEnd + j * diveStep;
      const diveEnd = diveStart + DIVE_DUR;
      // The label sits above the pile (nudged right to sit over its middle);
      // each scattered item gets its own hand-placed slot.
      const slot = cat.slots && j > 0 ? cat.slots[(j - 1) % cat.slots.length] : null;
      const rowX = slot ? slot.x : cat.labelPos ? cat.labelPos.x : 0;
      const rowY = slot ? slot.y : cat.labelPos ? cat.labelPos.y : (j - (items.length - 1) / 2) * rowHeight;
      rows.push({
        item,
        rowX,
        rowY,
        mobileX: (rowX - midX) * MOBILE_PILE_SCALE,
        mobileY: rowY * MOBILE_PILE_SCALE + MOBILE_PILE_DY,
        tileRotate: slot ? slot.r : 0,
        drawer: cat.drawer,
        enterStart,
        enterEnd: enterStart + ENTER_DUR,
        diveStart,
        diveEnd,
      });
      cursor = diveEnd; // last item's dive sets when the next category may start
    });
    cursor += CATEGORY_GAP;
  });
  // Normalize the raw 0..cursor timeline into the fixed window, so the
  // column always ends exactly at COLUMN_END_TARGET no matter how many
  // items the categories hold.
  const scale = (COLUMN_END_TARGET - COLUMN_START) / cursor;
  const fit = (t: number) => COLUMN_START + t * scale;
  return rows.map((row) => ({
    ...row,
    enterStart: fit(row.enterStart),
    enterEnd: fit(row.enterEnd),
    diveStart: fit(row.diveStart),
    diveEnd: fit(row.diveEnd),
  }));
}
const COLUMN_ROWS = buildColumnRows();
// When the last item has dived, the show is over — the cabinet closes up
// for the "…your AI team takes it from here" beat.
const COLUMN_END = COLUMN_ROWS[COLUMN_ROWS.length - 1].diveEnd;

function LaneChip({ item }: { item: LaneItem }) {
  switch (item.kind) {
    case "label":
      // Same card-catalog hardware as the drawer labels — brass frame,
      // recessed paper card, Fraunces caps — scaled up for a section title.
      return (
        <span
          className="inline-block rounded-[7px]"
          style={{
            padding: 3,
            background: CABINET_BRASS,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.55)",
          }}
        >
          <span
            className="font-display block whitespace-nowrap rounded-[4px] font-bold uppercase tracking-[0.07em]"
            style={{
              padding: "6px 18px",
              fontSize: 26,
              color: "#6B4226",
              background: "linear-gradient(180deg, #FCF6E8 0%, #F0E4C8 100%)",
              boxShadow: "inset 0 1px 3px rgba(96, 64, 32, 0.28)",
            }}
          >
            {item.text}
          </span>
        </span>
      );
    case "file": {
      // A little paper document — cream page, colored dog-ear fold, the
      // type's icon and faint text lines — papers drifting mid-air, not
      // flat colored squares. Bobs gently (float-slow) while parked; a
      // deterministic negative delay desyncs the pile without Math.random.
      const ext = item.name.split(".").pop() ?? "";
      const Icon = FILE_TAB_ICON[ext] ?? FileText;
      const fold = 16;
      return (
        <div
          className="float-slow flex flex-col items-center gap-2"
          style={{ animationDelay: `${-((item.name.length * 0.7) % 4).toFixed(1)}s` }}
        >
          <div
            className="relative"
            style={{ width: 56, height: 68, filter: "drop-shadow(0 10px 14px rgba(84, 52, 26, 0.3))" }}
          >
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-2"
              style={{
                background: "linear-gradient(165deg, #FFFEF9 0%, #F6EDDB 100%)",
                borderRadius: 9,
                clipPath: `polygon(0 0, calc(100% - ${fold}px) 0, 100% ${fold}px, 100% 100%, 0 100%)`,
              }}
            >
              <Icon size={22} style={{ color: item.color }} strokeWidth={2.25} />
              <span className="flex flex-col items-center gap-1">
                <span className="h-[3px] w-7 rounded-full" style={{ background: `${item.color}42` }} />
                <span className="h-[3px] w-5 rounded-full bg-black/10" />
              </span>
            </div>
            {/* folded-back corner */}
            <div
              className="absolute right-0 top-0"
              style={{
                width: fold,
                height: fold,
                background: item.color,
                clipPath: "polygon(0 0, 100% 100%, 0 100%)",
                borderRadius: "0 0 0 7px",
              }}
            />
          </div>
          <span className="whitespace-nowrap font-code text-[11px] font-semibold text-[#4b3a2a] [text-shadow:0_1px_6px_rgba(250,246,241,0.9)]">
            {item.name}
          </span>
        </div>
      );
    }
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
          className="rounded-xl border border-black/5 bg-[#FFFDF8] p-3.5 shadow-xl shadow-black/10"
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
            <span className={`font-code text-xs font-bold ${up ? "text-[#6FA45A]" : "text-[#E2725B]"}`}>
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
      // A long wooden plank — same material as the opening cloud's tiles.
      // The wooden mascot from the /agents exploration stands over the
      // plank's left end; the provider mark sits in a little circle with a
      // beaming heartbeat aura in the agent's own color, and the name reads
      // as carved into the wood (dark ink, light catch below, shadow above).
      return (
        <span className="relative inline-flex items-end">
          <Image
            src={item.figure}
            alt=""
            width={78}
            height={78}
            className="relative z-10 -mr-6 -translate-y-2 object-contain"
            style={{
              width: 78,
              height: 78,
              filter: "drop-shadow(0 6px 8px rgba(84, 52, 26, 0.35))",
            }}
          />
          <span
            className="wood-tile painted-wood-tile inline-flex items-center gap-3.5 whitespace-nowrap rounded-2xl"
            style={{
              padding: "12px 24px 12px 34px",
              // The shared tile classes skip grain on purpose (dozens animate
              // in the cloud); only 3 planks exist, so give them real streaks:
              // two near-horizontal banding layers over the maple base.
              background:
                "repeating-linear-gradient(178deg, rgba(122, 82, 44, 0.10) 0 1.5px, transparent 1.5px 7px), repeating-linear-gradient(2deg, rgba(146, 100, 55, 0.07) 0 2px, transparent 2px 11px), linear-gradient(150deg, #F2DFB9 0%, #E2C58F 58%, #D5AD73 100%)",
            }}
          >
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
              <span
                aria-hidden
                className="agent-aura absolute left-1/2 top-1/2 h-12 w-12 rounded-full"
                style={{ background: `radial-gradient(circle, ${item.accent}66 0%, transparent 70%)` }}
              />
              <span className="agent-heartbeat relative flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF8EC] shadow-sm">
                <Image
                  src={item.logo}
                  alt=""
                  width={20}
                  height={20}
                  className="object-contain"
                  style={{ width: 20, height: 20 }}
                />
              </span>
            </span>
            <span
              className="font-display text-xl font-semibold"
              style={{
                color: "#5B432C",
                textShadow: "0 1px 0 rgba(255, 244, 222, 0.65), 0 -1px 1px rgba(60, 36, 16, 0.45)",
              }}
            >
              {item.name}
            </span>
          </span>
        </span>
      );
    case "task": {
      // A piece of white paper in motion: faint fiber texture, a slight 3D
      // bow (alternating direction so the stack doesn't look stamped), a
      // gentle drift, and a dog-eared corner. Padding is inline so a stale
      // Tailwind cache can never strip it and clip the text.
      const fold = 14;
      const bow = item.name.length % 2 ? -7 : 7;
      return (
        <span
          className="float-slow inline-block"
          style={{
            filter: "drop-shadow(0 12px 14px rgba(84, 52, 26, 0.28))",
            animationDelay: `${-((item.name.length * 0.9) % 4).toFixed(1)}s`,
          }}
        >
          <span
            className="relative inline-flex items-center gap-3.5 whitespace-nowrap"
            style={{
              padding: "14px 40px 14px 16px",
              background:
                "repeating-linear-gradient(0deg, rgba(120, 96, 60, 0.03) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(120, 96, 60, 0.02) 0 2px, transparent 2px 5px), linear-gradient(170deg, #FFFFFF 0%, #F6F1E4 100%)",
              borderRadius: 7,
              clipPath: `polygon(0 0, calc(100% - ${fold}px) 0, 100% ${fold}px, 100% 100%, 0 100%)`,
              transform: `perspective(700px) rotateY(${bow}deg) rotateX(2.5deg)`,
            }}
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{ background: `${item.accent}22` }}
            >
              <WoodIcon icon={item.icon} className="h-8 w-8" />
            </span>
            <span className="flex flex-col text-left leading-snug">
              <span className="font-sans text-xl font-semibold text-text-primary">{item.name}</span>
              <span className="font-code text-sm text-text-secondary">{item.meta}</span>
            </span>
            {/* folded-back corner */}
            <span
              aria-hidden
              className="absolute right-0 top-0"
              style={{
                width: fold,
                height: fold,
                background: "#E6DEC9",
                clipPath: "polygon(0 0, 100% 100%, 0 100%)",
                borderRadius: "0 0 0 5px",
              }}
            />
          </span>
        </span>
      );
    }
  }
}

function ColumnItem({
  progress,
  row,
  mobile,
}: {
  progress: MotionValue<number>;
  row: ColumnRow;
  mobile: boolean;
}) {
  const { item, rowX, rowY, mobileX, mobileY, tileRotate, drawer, enterStart, enterEnd, diveStart, diveEnd } = row;
  const rawMouthY = DRAWER_MOUTH_Y + drawer * DRAWER_GAP_Y;
  const drawerMouthY = mobile ? mobileCabinetY(rawMouthY) : rawMouthY;
  const parkY = mobile ? mobileY : rowY;
  // Off the right edge on a phone, not off a 1500px canvas.
  const offstageX = mobile ? 320 : 690;
  const parkScale = mobile ? MOBILE_PILE_SCALE : 1;

  // The wrapper is LEFT-edge anchored (so the parked column lines up), which
  // means x=0 puts the chip's left edge — not its middle — on the drawer
  // center; wide chips then shrank to a point right of the drawer. Measure
  // the chip once and land its center instead.
  const chipRef = useRef<HTMLDivElement>(null);
  const [chipW, setChipW] = useState(0);
  useEffect(() => {
    if (chipRef.current) setChipW(chipRef.current.offsetWidth);
  }, []);

  // Phase 1: slide in flat at its own row height (label on top, items below
  // — one column, first row first) and wait — the whole category gathers
  // before anyone moves. Phase 2: once gathered, dive into the drawer that
  // actually holds it.
  // Desktop parks by left edge so ragged-width chips line up as a column.
  // Mobile centres each chip instead — scaling happens about the centre, so
  // centring on a target is the same maths at any scale.
  const parkLeft = mobile ? mobileX - chipW / 2 : COLUMN_X + rowX;
  const x = useTransform(
    progress,
    [enterStart, enterEnd, diveStart, diveEnd],
    [offstageX, parkLeft, parkLeft, -chipW / 2]
  );
  const y = useTransform(progress, [enterStart, diveStart, diveEnd], [parkY, parkY, drawerMouthY]);
  const scale = useTransform(
    progress,
    [enterStart, diveStart, diveEnd],
    [parkScale, parkScale, 0.05]
  );
  // Like the opening cloud's tiles: fully opaque for the whole pull,
  // shrinking continuously, and only winking out right at the drawer
  // mouth — not dissolving mid-air.
  const opacity = useTransform(
    progress,
    [enterStart, enterStart + (enterEnd - enterStart) * 0.6, diveEnd - 0.01, diveEnd],
    [0, 1, 1, 0]
  );
  // In front of the cabinet (z-10) so items visibly drop INTO the open drawer.
  const zIndex = item.kind === "label" ? 21 : 20;

  return (
    // Anchored at the LEFT edge (not centered) so items of different widths
    // — "TASKS" vs. "Nightly backup" — still line up into a neat pile
    // instead of drifting to ragged left edges.
    // w-max because an absolute box anchored at left:50% otherwise shrinks to
    // the half-screen that remains — which clips the wide planks on a phone.
    <div className="pointer-events-none absolute left-1/2 top-1/2 w-max -translate-y-1/2" style={{ zIndex }}>
      <motion.div ref={chipRef} style={{ x, y, scale, opacity, rotate: tileRotate, willChange: "transform" }}>
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
  // Phones don't get the 700vh pin: nobody thumb-scrolls seven screens to
  // watch a story. They get the mobile staging and the timeline plays itself.
  const [mobile, setMobile] = useState(false);
  const [stageHeight, setStageHeight] = useState(MOBILE_FIT_HEIGHT);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const dist = Math.max(1, el.offsetHeight - window.innerHeight);
      setRange([top, top + dist]);
      stickyRectRef.current = null;
      // The mobile staging assumes a tall, narrow screen. A phone held
      // sideways is neither, so it keeps the scrolled scene. Deliberately NOT
      // a min-height test: iOS reports a viewport shrunk by its own chrome,
      // which quietly dropped small phones back onto the desktop scene.
      setMobile(window.matchMedia("(max-width: 767px) and (orientation: portrait)").matches);
      setStageHeight(stickyRef.current?.offsetHeight ?? window.innerHeight);
    };
    const animationFrame = requestAnimationFrame(() => {
      setMounted(true);
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

  // The two stagings scatter the cloud differently, so it is rebuilt if the
  // breakpoint flips (rotating a phone, resizing a desktop window).
  useEffect(() => {
    if (!mounted) return;
    const frame = requestAnimationFrame(() => setLayout(buildLayout(mobile)));
    return () => cancelAnimationFrame(frame);
  }, [mounted, mobile]);

  const scrollYProgress = useTransform(scrollY, range, [0, 1], { clamp: true });
  // One driver for both modes, so every derived transform below keeps a
  // stable source: scroll writes into it on desktop, a timer on mobile.
  const raw = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!mobile) raw.set(v);
  });
  const sceneProgress = useSpring(raw, {
    stiffness: 120,
    damping: 24,
    mass: 0.6,
    restDelta: 0.0005,
  });

  useEffect(() => {
    if (!mobile || !sceneInView || prefersReduced) return;
    raw.set(0);
    const playback = animate(raw, 1, { duration: AUTOPLAY_SECONDS, ease: "linear" });
    return () => playback.stop();
  }, [mobile, sceneInView, prefersReduced, raw]);

  // Cabinet appears before the cloud starts moving so every tile has a clear
  // destination. It stays through the complete absorption beat AND through
  // the closing "AI team" caption — only clearing in the last sliver, right
  // as the pin releases into the demo video.
  // The cabinet never leaves: it stays fully visible through the closing
  // "…your AI team takes it from here" beat, right up to the pin release.
  const hubOpacity = useTransform(sceneProgress, [0.035, 0.1], [0, 1]);
  const hubScale = useTransform(sceneProgress, [0.035, 0.11], [0.72, 1]);
  const hubGroundOpacity = useTransform(sceneProgress, [0.08, 0.14], [0, 0.28]);

  // Hold whichever drawer is currently receiving the column open: Knowledge
  // while the tile cloud pours in and through Files/Dashboards, AI team for
  // agents, Tasks for tasks — otherwise the drawers resume cycling.
  const [drawerHold, setDrawerHold] = useState<number | null>(-1);
  useMotionValueEvent(sceneProgress, "change", (v) => {
    // The cabinet enters with every drawer shut; Knowledge springs open
    // only once the cloud is visibly being pulled (tiles move from 0.08).
    if (v < 0.1) {
      setDrawerHold(-1);
      return;
    }
    if (v < COLUMN_START - 0.02) {
      setDrawerHold(0);
      return;
    }
    const row = COLUMN_ROWS.find((r) => v > r.enterStart - 0.006 && v < r.diveEnd + 0.015);
    if (row) {
      setDrawerHold(row.drawer);
      return;
    }
    // Finale: every drawer shut while "…your AI team takes it from here"
    // plays over the closed cabinet.
    setDrawerHold(v > COLUMN_END ? -1 : null);
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

  // On a phone the pile lands in the band right under this caption, so the
  // line clears the stage before the first category arrives instead of
  // holding all the way through it.
  const capCapture = useTransform(
    sceneProgress,
    mobile ? [0.29, 0.38, 0.44, 0.5] : [0.29, 0.38, 0.85, 0.9],
    [0, 1, 1, 0],
  );
  const captureScale = useTransform(sceneProgress, [0.29, 0.38], [0.9, 1]);
  const captureY = useTransform(sceneProgress, [0.29, 0.38], [20, 0]);
  const captureBlur = useTransform(sceneProgress, [0.29, 0.38], [10, 0]);
  const captureFilter = useMotionTemplate`blur(${captureBlur}px)`;

  // Fully in by 0.925, then the pin holds to 1.0 — a long locked beat
  // on the closed cabinet before the page releases.
  const capVideo = useTransform(sceneProgress, [0.89, 0.925, 1], [0, 1, 1]);
  const hintOpacity = useTransform(sceneProgress, [0, 0.04], [1, 0]);

  // Shrink the whole staged composition on a stage shorter than it was
  // blocked for, so the bottom of the pile never falls off the screen.
  const stageFit = Math.min(1, stageHeight / MOBILE_FIT_HEIGHT);

  // Word-stagger triggers for the later captions. Inside the pinned scene the
  // caption elements sit in the viewport the whole time, so in-view detection
  // would fire the reveal at scene entry; gate it on the caption's own beat.
  const [captureRevealed, setCaptureRevealed] = useState(false);
  const [videoCapRevealed, setVideoCapRevealed] = useState(false);
  const [demoVideoReady, setDemoVideoReady] = useState(false);
  const demoRef = useRef<HTMLElement>(null);

  useMotionValueEvent(sceneProgress, "change", (v) => {
    setCaptureRevealed(v > 0.33);
    setVideoCapRevealed(v > 0.9);
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
    <div ref={ref} className={`relative bg-bg ${mobile ? "h-[100svh]" : "h-[700vh]"}`}>
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

        {/* Every staged layer (cloud, pile, glow, cabinet) is positioned from
            the scene's centre, so one scale here fits the whole composition
            to a short phone. `contents` keeps the box out of the tree
            entirely on desktop, where nothing needs fitting. */}
        <div
          className={mobile ? "absolute inset-0" : "contents"}
          style={mobile ? { transform: `scale(${stageFit})` } : undefined}
        >
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
                mobile={mobile}
              />
            ))}
        </div>

        {COLUMN_ROWS.map((row, index) => (
          <ColumnItem key={index} progress={sceneProgress} row={row} mobile={mobile} />
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
          {/* Mobile lifts and shrinks the cabinet about its centre — every
              flight path into a drawer is mapped through the same numbers,
              see mobileCabinetY. */}
          <div
            className="relative h-[216px] w-[216px] origin-bottom"
            style={
              mobile
                ? {
                    transformOrigin: "center",
                    transform: `translateY(${MOBILE_CABINET_DY}px) scale(${MOBILE_CABINET_SCALE})`,
                  }
                : undefined
            }
          >
            {/* native 216 box blown up as one piece; the drawer-mouth
                constants carry the same CABINET_SCALE factor */}
            {/* the taller cabinet runs 242px native in this 216 box, so it
                is nudged up 13px (inside the scale) to stay centered */}
            <div
              className="absolute inset-0"
              style={{ transform: `scale(${CABINET_SCALE}) translateY(-13px)` }}
            >
              <motion.div
                aria-hidden
                className="absolute left-1/2 top-[114%] h-5 w-24 -translate-x-1/2 rounded-full bg-[#4b3424] blur-md"
                style={{ opacity: hubGroundOpacity }}
              />
              <AnimatedCabinet holdOpen={drawerHold} />
            </div>
          </div>
        </motion.div>
        </div>

        {/* beat 1 — title beside the cloud on a desktop, straight through the
            middle of it on a phone (outer div positions; inner h2 is free to
            run its own magic-wand dissolve transform) */}
        <div
          className={
            mobile
              ? "pointer-events-none absolute inset-x-4 top-1/2 z-30 -translate-y-1/2 text-center"
              : "pointer-events-none absolute right-[9vw] top-1/2 z-30 max-w-xs -translate-y-1/2 text-right sm:max-w-sm md:right-[12vw] md:max-w-lg lg:right-[14vw]"
          }
        >
          <motion.div
            className={mobile ? "px-4 py-8" : undefined}
            style={{
              opacity: capTitle,
              scale: titleScale,
              y: titleY,
              filter: titleFilter,
              // The phone reads this type over a full screen of clutter, so it
              // gets a soft cream haze to lift off.
              background: mobile
                ? "radial-gradient(farthest-side, rgba(242,236,228,0.95), rgba(242,236,228,0.9) 55%, rgba(242,236,228,0) 100%)"
                : undefined,
            }}
          >
            <ScrollReveal
              baseRotation={0}
              revealed
              staggerDelay={0.08}
              textClassName={`[font-family:var(--font-brand)] [text-shadow:0_1px_18px_rgba(250,246,241,0.72)] text-[clamp(3.4rem,5.7vw,6.25rem)] leading-[0.9] tracking-[-0.045em] text-text-primary ${mobile ? "text-center" : "text-right"}`}
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

        {/* captions — beside the cabinet on a desktop; on a phone this sits in
            the band between the cabinet above and the arriving pile below, so
            it runs two lines instead of four */}
        <div
          className={
            mobile
              ? "pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2 text-center"
              : "absolute top-1/2 left-[4vw] md:left-[8vw] lg:left-[11vw] -translate-y-1/2 max-w-xs sm:max-w-sm md:max-w-lg text-left pointer-events-none"
          }
        >
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
              textClassName={`[font-family:var(--font-brand)] leading-[0.98] tracking-[-0.045em] text-text-primary ${
                mobile
                  ? "text-[2.35rem] text-center"
                  : "text-[clamp(3rem,4.6vw,5rem)] text-left"
              }`}
            >
              {/* the spaces keep the words apart on phones, where the two
                  outer breaks collapse and the lines run together */}
              <span className="font-brand italic">Cabinet</span>{" "}
              <br className="max-md:hidden" />
              pulls it all
              <br />
              into one{" "}
              <br className="max-md:hidden" />
              place.
            </ScrollReveal>
          </motion.div>
        </div>
        <motion.div
          className={`absolute left-1/2 w-full max-w-4xl -translate-x-1/2 px-6 ${
            // sits under the closed cabinet on a phone, not way down the screen
            mobile ? "bottom-[32%]" : "bottom-24"
          }`}
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

        {/* scroll hint — the mobile scene plays itself, so it has nothing to ask for */}
        {!mobile && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bottom-8 text-xs font-code text-text-muted uppercase tracking-widest"
            style={{ opacity: hintOpacity }}
          >
            scroll
          </motion.div>
        )}
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
