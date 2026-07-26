"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
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
  "gong",
].map((n) => `/logos/${n}.svg`)
  .concat(
    ["salesforce", "jira", "zoom", "snowflake", "asana", "calendly",
     "clickup", "dropbox", "box", "gitlab", "databricks", "datadog",
     "amplitude", "linear"].map((n) => `/logos/${n}.webp`)
  );

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
const LCX = -470;
const LRX = 365;
const LRY = 335;
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
  "claude.svg", "openai.png", "gemini.svg", "grok.svg",
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

// Map a filename's extension to its generated file-type badge (public/
// generated/filetabs/*.webp, produced by scripts/generate-file-tabs.mjs).
// Until those assets exist, FileMark falls back to the colored bar.
const FILE_TAB: Record<string, string> = {
  md: "md", pdf: "pdf", xlsx: "sheet", csv: "sheet", docx: "doc",
  sql: "code", key: "deck", fig: "design",
};

function FileMark({ name, color, size = 22 }: { name: string; color: string; size?: number }) {
  const ext = name.split(".").pop() ?? "";
  const tab = FILE_TAB[ext];
  const [failed, setFailed] = useState(false);
  if (tab && !failed) {
    // Native <img> so a missing asset degrades gracefully to the chip below.
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/generated/filetabs/${tab}.webp`}
        alt=""
        width={size}
        height={size}
        onError={() => setFailed(true)}
        className="shrink-0 object-contain"
        style={{ width: size, height: size, filter: "drop-shadow(0 2px 2px rgba(120,80,45,0.3))" }}
      />
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
      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1500px] items-center gap-10 px-6 py-16 lg:grid-cols-[1fr_auto_1fr]">
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
        <div className="relative mx-auto h-[180px] w-[180px]">
          <div className="absolute left-1/2 top-[94%] h-6 w-28 -translate-x-1/2 rounded-full bg-[#59402f]/20 blur-xl" />
          <Image
            src={CABINET_HUB_IMAGE}
            alt="Cabinet"
            width={180}
            height={180}
            priority
            className="h-[180px] w-[180px]"
          />
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
    <h2 className="font-display text-3xl leading-tight tracking-tight text-text-primary md:text-5xl">
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
  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = stickyRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    pointerX.set(e.clientX - (r.left + r.width / 2));
    pointerY.set(e.clientY - (r.top + r.height / 2));
  };
  const resetPointer = () => {
    pointerX.set(99999);
    pointerY.set(99999);
  };

  const { scrollY } = useScroll();
  const [range, setRange] = useState<[number, number]>([0, 1]);
  // Randomised after hydration, so Math.random() never causes a mismatch and
  // the cloud is fresh on every visit.
  const [layout, setLayout] = useState<Slot[]>([]);

  useEffect(() => {
    setLayout(buildLayout());
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const dist = Math.max(1, el.offsetHeight - window.innerHeight);
      setRange([top, top + dist]);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
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
    [0.035, 0.1, 0.84, 0.92],
    [0, 1, 1, 0]
  );
  const hubScale = useTransform(
    sceneProgress,
    [0.035, 0.11, 0.84, 0.92],
    [0.72, 1, 1, 0.9]
  );
  const hubGroundOpacity = useTransform(
    sceneProgress,
    [0.08, 0.14, 0.84, 0.92],
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

  const capCapture = useTransform(sceneProgress, [0.29, 0.38, 0.64, 0.72], [0, 1, 1, 0]);
  const captureScale = useTransform(sceneProgress, [0.29, 0.38], [0.9, 1]);
  const captureY = useTransform(sceneProgress, [0.29, 0.38], [20, 0]);
  const captureBlur = useTransform(sceneProgress, [0.29, 0.38], [10, 0]);
  const captureFilter = useMotionTemplate`blur(${captureBlur}px)`;

  // The final caption follows immediately after the single absorption story.
  const capVideo = useTransform(sceneProgress, [0.72, 0.82, 1], [0, 1, 1]);
  const hintOpacity = useTransform(sceneProgress, [0, 0.04], [1, 0]);

  // Word-stagger triggers for the later captions. Inside the pinned scene the
  // caption elements sit in the viewport the whole time, so in-view detection
  // would fire the reveal at scene entry; gate it on the caption's own beat.
  const [captureRevealed, setCaptureRevealed] = useState(false);
  const [videoCapRevealed, setVideoCapRevealed] = useState(false);
  useMotionValueEvent(sceneProgress, "change", (v) => {
    setCaptureRevealed(v > 0.33);
    setVideoCapRevealed(v > 0.78);
  });

  const demoRef = useRef<HTMLElement>(null);

  if (prefersReduced) return <StaticFallback />;

  return (
    <>
    <div ref={ref} className="relative h-[250vh] bg-bg">
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
            open Cabinet, where they shrink behind the cabinet image. */}
        <div className="absolute inset-0 overflow-hidden">
          {layout.map((slot) => (
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
            marginLeft: -90,
            marginTop: -90,
          }}
        >
          <div className="relative h-[180px] w-[180px] origin-bottom max-sm:-translate-y-[15vh] max-sm:scale-[0.58]">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-[96%] h-5 w-24 -translate-x-1/2 rounded-full bg-[#4b3424] blur-md"
              style={{ opacity: hubGroundOpacity }}
            />
            <Image
              src={CABINET_HUB_IMAGE}
              alt="Cabinet"
              width={180}
              height={180}
              priority
              className="h-[180px] w-[180px]"
            />
          </div>
        </motion.div>

        {/* beat 1 — title beside the cloud (outer div positions; inner h2 is
            free to run its own magic-wand dissolve transform) */}
        <div className="pointer-events-none absolute right-[7vw] top-1/2 z-20 max-w-xs -translate-y-1/2 text-right sm:max-w-sm md:right-[10vw] md:max-w-lg lg:right-[12vw]">
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
              textClassName="text-[clamp(3.5rem,6vw,6.7rem)] leading-[0.88] tracking-[-0.045em] text-right text-text-primary"
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
              textClassName="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-left text-text-primary"
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
            textClassName="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-center text-text-primary"
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
      <section ref={demoRef} className="bg-bg px-6 pb-24">
        <div className="mx-auto w-fit max-w-full overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/25">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="mx-auto max-h-[64vh] w-auto max-w-full"
          >
            <source src="/demo.webm" type="video/webm" />
          </video>
        </div>
        <div className="mx-auto mt-8 max-w-5xl text-center">
          <RotatingBenefits />
        </div>
      </section>
    </>
  );
}
