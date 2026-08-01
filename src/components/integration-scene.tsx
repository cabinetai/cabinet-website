"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  FileCode,
  FileSpreadsheet,
  FileText,
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
const CABINET_HUB_IMAGE = "/brand/cabinet-logo-top-open-512.png";

// Cluster the clutter on the LEFT of the canvas (golden-angle spiral
// around a left-of-center point → dense, even, organic). Radii widened a
// touch to keep breathing room now that there are more pages.
const LCX = -330;
const LRX = 300;
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
  const baseY = useTransform(progress, [0, 0.08, clearEnd], [posY, posY, 0]);
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
            // Engraved-into-wood: dark groove wall to the top-left, lit wall to
            // the bottom-right (light source top-left), so the logo reads as
            // carved into the tile while keeping its brand colour.
            style={{
              width: 40,
              height: 40,
              filter:
                "drop-shadow(0.6px 0.6px 0.4px rgba(255,248,232,0.6)) drop-shadow(-0.6px -0.6px 0.4px rgba(84,52,26,0.6))",
            }}
          />
        </div>
      ) : (
        <div
          className="wood-tile painted-wood-tile flex flex-col items-center justify-center gap-1 rounded-2xl px-1"
          style={{ width: w, height: h }}
        >
          <FileMark name={item.name} color={item.color} size={40} />
          <span
            className="w-full truncate text-center font-sans text-[9px] font-bold leading-none tracking-tight"
            style={{
              color: "#3b2f2f",
              textShadow:
                "0 1px 2px rgba(255,248,236,0.95), 0 0 3px rgba(255,248,236,0.85)",
            }}
          >
            {item.name}
          </span>
        </div>
      )}
    </motion.div>
  );
}

type LaneItem =
  | { kind: "label"; text: string }
  | { kind: "file"; name: string; color: string }
  | { kind: "dash"; accent: string }
  | { kind: "agent"; name: string }
  | { kind: "task"; name: string };

const SUCK_LANES: { y: number; start: number; items: LaneItem[] }[] = [
  {
    y: -420,
    start: 0.42,
    items: [
      { kind: "label", text: "Files" },
      { kind: "file", name: "roadmap.md", color: "#8B5E3C" },
      { kind: "file", name: "spec.md", color: "#5A7A4F" },
      { kind: "file", name: "notes.md", color: "#3B6FB0" },
    ],
  },
  {
    y: -140,
    start: 0.52,
    items: [
      { kind: "label", text: "Dashboards" },
      { kind: "dash", accent: "#3B6FB0" },
      { kind: "dash", accent: "#5A7A4F" },
      { kind: "dash", accent: "#C0392B" },
    ],
  },
  {
    y: 140,
    start: 0.62,
    items: [
      { kind: "label", text: "AI agents" },
      { kind: "agent", name: "SDR" },
      { kind: "agent", name: "Marketing Expert" },
      { kind: "agent", name: "Researcher" },
    ],
  },
  {
    y: 420,
    start: 0.72,
    items: [
      { kind: "label", text: "Routines & tasks" },
      { kind: "task", name: "Weekly report" },
      { kind: "task", name: "Scout Reddit" },
      { kind: "task", name: "Nightly backup" },
    ],
  },
];

function LaneChip({ item }: { item: LaneItem }) {
  switch (item.kind) {
    case "label":
      return (
        <span className="inline-flex items-center whitespace-nowrap rounded-full bg-accent px-9 py-4 font-display text-4xl font-bold text-white shadow-2xl shadow-accent/30 sm:text-5xl">
          {item.text}
        </span>
      );
    case "file":
      return (
        <span className="inline-flex items-center gap-3 rounded-xl border border-black/5 bg-white px-5 py-3.5 shadow-xl shadow-black/10">
          <span className="h-9 w-2 shrink-0 rounded-full" style={{ background: item.color }} />
          <span className="font-code text-2xl text-text-secondary">{item.name}</span>
        </span>
      );
    case "dash":
      return (
        <div
          className="rounded-xl border border-black/5 bg-white p-3.5 shadow-xl shadow-black/10"
          style={{ width: 168 }}
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ background: item.accent }} />
            <span className="h-2 w-20 rounded bg-black/10" />
          </div>
          <div className="flex h-14 items-end gap-1.5">
            {[60, 85, 45, 92, 65, 78].map((barHeight, index) => (
              <span
                key={index}
                className="flex-1 rounded-sm"
                style={{ height: `${barHeight}%`, background: `${item.accent}55` }}
              />
            ))}
          </div>
        </div>
      );
    case "agent":
      return (
        <span className="inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-accent-bg-subtle px-6 py-3.5 shadow-xl shadow-accent/10 ring-1 ring-accent/20">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-base font-bold text-white">
            AI
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

function SuckItem({
  progress,
  start,
  y: startY,
  item,
}: {
  progress: MotionValue<number>;
  start: number;
  y: number;
  item: LaneItem;
}) {
  const end = start + 0.14;
  const x = useTransform(progress, [start, end], [690, 0]);
  const y = useTransform(progress, [start, end], [startY, 0]);
  const scale = useTransform(progress, [start, end - 0.025, end], [1, 1, 0.05]);
  const opacity = useTransform(
    progress,
    [start, start + 0.02, end - 0.02, end],
    [0, 1, 1, 0]
  );
  const zIndex = item.kind === "label" ? 0 : -1;

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{ zIndex }}
    >
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
          <Image
            src={CABINET_HUB_IMAGE}
            alt="Cabinet"
            width={216}
            height={216}
            priority
            className="mx-auto h-[216px] w-[216px]"
          />
          <div className="mt-2 flex flex-wrap justify-center gap-1.5">
            {["Files", "Dashboards", "AI agents", "Routines & tasks"].map((label) => (
              <span
                key={label}
                className="rounded-full bg-[#8b5833] px-3 py-1 font-code text-[9px] font-semibold uppercase tracking-[0.1em] text-[#fff8ec]"
              >
                {label}
              </span>
            ))}
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
    <h2 className="[font-family:var(--font-brand)] text-3xl leading-tight tracking-[-0.045em] text-text-primary md:text-5xl">
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
  // destination. It stays through the complete absorption beat.
  const hubOpacity = useTransform(
    sceneProgress,
    [0.035, 0.1, 0.94, 0.985],
    [0, 1, 1, 0]
  );
  const hubScale = useTransform(
    sceneProgress,
    [0.035, 0.11, 0.94, 0.985],
    [0.72, 1, 1, 0.9]
  );
  const hubGroundOpacity = useTransform(
    sceneProgress,
    [0.08, 0.14, 0.94, 0.985],
    [0, 0.28, 0.28, 0]
  );

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

  const capCapture = useTransform(sceneProgress, [0.29, 0.38, 0.82, 0.89], [0, 1, 1, 0]);
  const captureScale = useTransform(sceneProgress, [0.29, 0.38], [0.9, 1]);
  const captureY = useTransform(sceneProgress, [0.29, 0.38], [20, 0]);
  const captureBlur = useTransform(sceneProgress, [0.29, 0.38], [10, 0]);
  const captureFilter = useMotionTemplate`blur(${captureBlur}px)`;

  const capVideo = useTransform(sceneProgress, [0.93, 0.985, 1], [0, 1, 1]);
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
    setVideoCapRevealed(v > 0.96);
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
    <div ref={ref} className="relative h-[360vh] bg-bg">
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
        <div className="absolute inset-0 overflow-hidden">
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

        {SUCK_LANES.map((lane) =>
          lane.items.map((item, index) => (
            <SuckItem
              key={`${lane.y}-${index}`}
              progress={sceneProgress}
              start={lane.start + index * 0.025}
              y={lane.y}
              item={item}
            />
          ))
        )}

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
            <Image
              src={CABINET_HUB_IMAGE}
              alt="Cabinet"
              width={216}
              height={216}
              priority
              className="h-[216px] w-[216px]"
            />
          </div>
        </motion.div>

        {/* beat 1 — title beside the cloud (outer div positions; inner h2 is
            free to run its own magic-wand dissolve transform) */}
        <div className="pointer-events-none absolute right-[7vw] top-1/2 z-20 max-w-xs -translate-y-1/2 text-right sm:max-w-sm md:right-[9vw] md:max-w-lg lg:right-[11vw]">
          <motion.div
            role="heading"
            aria-level={2}
            style={{
              opacity: capTitle,
              scale: titleScale,
              y: titleY,
              filter: titleFilter,
              fontFamily: "var(--font-brand)",
              textShadow: "0 1px 18px rgba(250, 246, 241, 0.72)",
            }}
          >
            <ScrollReveal
              baseRotation={0}
              threshold={0.3}
              staggerDelay={0.08}
              textClassName="text-[clamp(3.4rem,5.7vw,6.25rem)] leading-[0.9] tracking-[-0.045em] text-right text-text-primary"
            >
              Your work
              <br />
              lives in
              <br />
              <span className="italic text-text-secondary/75">a hundred<br />places.</span>
            </ScrollReveal>
          </motion.div>
        </div>

        {/* captions */}
        <div className="absolute top-1/2 left-[4vw] md:left-[8vw] lg:left-[11vw] -translate-y-1/2 max-w-xs sm:max-w-sm md:max-w-md text-left pointer-events-none">
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
              textClassName="[font-family:var(--font-brand)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.045em] text-left text-text-primary"
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

      {/* demo video — a plain block right after the scene's "…AI team, 24/7" beat */}
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
    </>
  );
}
