"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";

/* ──────────────────────────────────────────────────────────────
   Integration scene — a pinned, horizontal scrollytelling hero.

   Left → Center → Right narrative (scrubbed by scroll):
     LEFT    your app logos + AI providers + dashboards + pages,
             clustered, visible from the very first frame.
     CENTER  as you scroll they stream rightward and get sucked into
             the Cabinet — the hub that captures everything.
     RIGHT   keep scrolling and the demo video slides in from the
             right. The Cabinet stays as the connector between your
             stack (left) and the working product (right).

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
  { name: "hiring-plan.md", color: "#8B5E3C" },
  { name: "roadmap.md", color: "#8B5E3C" },
  { name: "gtm-strategy.docx", color: "#2E6FB0" },
  { name: "sales-pipeline.csv", color: "#1E8E5A" },
  { name: "all-hands.key", color: "#6B4FB0" },
  { name: "metrics.sql", color: "#2E6FB0" },
  { name: "security-audit.pdf", color: "#C0392B" },
  { name: "1on1-notes.md", color: "#8B5E3C" },
  { name: "retro.md", color: "#8B5E3C" },
  { name: "contract-acme.pdf", color: "#C0392B" },
  { name: "design-spec.fig", color: "#6B4FB0" },
  { name: "pricing.csv", color: "#1E8E5A" },
  { name: "runbook.md", color: "#8B5E3C" },
  { name: "meeting-notes.md", color: "#8B5E3C" },
  { name: "competitor-scan.md", color: "#8B5E3C" },
  { name: "user-interviews.pdf", color: "#C0392B" },
  { name: "invoice-Q1.pdf", color: "#C0392B" },
  { name: "forecast.xlsx", color: "#1E8E5A" },
  { name: "leads.csv", color: "#1E8E5A" },
  { name: "campaign-brief.docx", color: "#2E6FB0" },
  { name: "press-release.docx", color: "#2E6FB0" },
  { name: "schema.sql", color: "#2E6FB0" },
  { name: "pitch-deck.key", color: "#6B4FB0" },
  { name: "wireframes.fig", color: "#6B4FB0" },
  { name: "changelog.md", color: "#8B5E3C" },
  { name: "api-spec.md", color: "#8B5E3C" },
  { name: "standup.md", color: "#8B5E3C" },
  { name: "incident-report.pdf", color: "#C0392B" },
  { name: "brand-guide.md", color: "#8B5E3C" },
];

// Dashboards clustered on the left with everything else.
const DASH = [
  { x: -560, y: -150, w: 220, h: 144, accent: "#8B5E3C" },
  { x: -300, y: 150, w: 210, h: 138, accent: "#5A7A4F" },
  { x: -640, y: 110, w: 200, h: 128, accent: "#3B6FB0" },
  { x: -360, y: -180, w: 210, h: 136, accent: "#6B4FB0" },
  { x: -200, y: 20, w: 230, h: 148, accent: "#C0392B" },
];

const TILE = 74;

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
  // Scroll-driven base: stream rightward into the Cabinet (0,0) from the
  // very first scroll.
  const baseX = useTransform(progress, [0, 0.44 + s], [posX, 0]);
  const baseY = useTransform(progress, [0, 0.44 + s], [posY, 0]);
  const baseScale = useTransform(progress, [0, 0.44 + s], [1, 0.05]);
  const opacity = useTransform(progress, [0, 0.34 + s, 0.44 + s], [1, 1, 0]);

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

  const isFile = item.kind === "file";
  const w = isFile ? 150 : TILE;
  const h = isFile ? 40 : TILE;
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
              ? "flex items-center justify-center rounded-2xl bg-accent-bg-subtle shadow-lg shadow-accent/15 ring-1 ring-accent/25 border border-accent/10"
              : "flex items-center justify-center rounded-2xl bg-white shadow-lg shadow-black/10 border border-black/5"
          }
          style={{ width: w, height: h }}
        >
          <Image
            src={item.src}
            alt=""
            width={40}
            height={40}
            className="object-contain"
            style={{ width: 40, height: 40 }}
          />
        </div>
      ) : (
        <div
          className="flex items-center gap-2 rounded-lg bg-white shadow-md shadow-black/10 border border-black/5 px-2.5"
          style={{ width: w, height: h }}
        >
          <span className="w-1 h-5 rounded-full shrink-0" style={{ background: item.color }} />
          <span className="truncate font-code text-[11px] text-text-secondary">{item.name}</span>
        </div>
      )}
    </motion.div>
  );
}

function DashCard({
  progress,
  card,
}: {
  progress: MotionValue<number>;
  card: (typeof DASH)[number];
}) {
  const x = useTransform(progress, [0, 0.4], [card.x, 0]);
  const y = useTransform(progress, [0, 0.4], [card.y, 0]);
  const scale = useTransform(progress, [0, 0.4], [1, 0.05]);
  const opacity = useTransform(progress, [0, 0.3, 0.4], [1, 1, 0]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ x, y, scale, opacity, marginLeft: -card.w / 2, marginTop: -card.h / 2 }}
    >
      <div
        className="rounded-xl bg-white shadow-xl shadow-black/10 border border-black/5 p-3 overflow-hidden"
        style={{ width: card.w, height: card.h }}
      >
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-2 h-2 rounded-full" style={{ background: card.accent }} />
          <span className="h-1.5 w-16 rounded bg-black/10" />
        </div>
        <div className="flex items-end gap-1.5 h-[56%]">
          {[55, 80, 40, 95, 65, 75, 50].map((bh, i) => (
            <span key={i} className="flex-1 rounded-sm" style={{ height: `${bh}%`, background: `${card.accent}33` }} />
          ))}
        </div>
        <div className="mt-2 space-y-1">
          <span className="block h-1.5 w-full rounded bg-black/5" />
          <span className="block h-1.5 w-2/3 rounded bg-black/5" />
        </div>
      </div>
    </motion.div>
  );
}

function StaticFallback() {
  return (
    <section className="relative bg-bg border-b border-border py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-sm font-code text-text-tertiary uppercase tracking-widest mb-8">
          Your whole stack — in one Cabinet
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {[...LOGOS, ...PROVIDERS].map((src) => (
            <div key={src} className="flex items-center justify-center rounded-2xl bg-white shadow border border-black/5" style={{ width: TILE, height: TILE }}>
              <Image src={src} alt="" width={40} height={40} style={{ width: 40, height: 40 }} className="object-contain" />
            </div>
          ))}
        </div>
        <Image src="/Cabinet.png" alt="Cabinet" width={120} height={120} className="mx-auto" />
      </div>
    </section>
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
  const [mounted, setMounted] = useState(false);
  // Randomised on the client after mount (tiles only render once mounted),
  // so the Math.random() inside buildLayout never causes a hydration
  // mismatch and the cloud is fresh on every visit.
  const [layout, setLayout] = useState<Slot[]>([]);

  useEffect(() => {
    setMounted(true);
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

  // Cabinet — the central hub. Grows as it absorbs, then shrinks and
  // drifts left to become the connector beside the video.
  const cabinetOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const cabinetScale = useTransform(scrollYProgress, [0, 0.42, 0.58, 0.85], [0.4, 1.05, 1.05, 0.72]);
  const cabinetX = useTransform(scrollYProgress, [0.56, 0.82], [0, -340]);

  // Absorption glow (stays centered while the suck-in happens).
  const glowScale = useTransform(scrollYProgress, [0, 0.45], [0.5, 1.5]);
  const glowOpacity = useTransform(scrollYProgress, [0.04, 0.24, 0.45, 0.54], [0, 0.9, 0.9, 0]);

  // Demo video — slides in from the right and settles beside the Cabinet.
  const videoX = useTransform(scrollYProgress, [0.54, 0.85], [820, 150]);
  const videoOpacity = useTransform(scrollYProgress, [0.56, 0.72], [0, 1]);
  const videoScale = useTransform(scrollYProgress, [0.54, 0.9], [0.62, 1]);

  // Connector line between Cabinet (left) and video (right).
  const linkOpacity = useTransform(scrollYProgress, [0.74, 0.86], [0, 1]);

  // Captions — beat 1 → beat 2 handoff.
  // The title doesn't just fade: as the Cabinet appears and swallows the cloud
  // it gets "whisked away" — drifting up and blurring into a soft poof (a
  // magic-wand dissolve) while keeping its own type intact. The capture line
  // then materialises right behind it with a focus-pull: it unblurs, scales up,
  // and rises into place.
  const capTitle = useTransform(scrollYProgress, [0, 0.18, 0.3], [1, 1, 0]);
  const titleScale = useTransform(scrollYProgress, [0.18, 0.3], [1, 1.06]);
  const titleY = useTransform(scrollYProgress, [0.18, 0.3], [0, -36]);
  const titleBlur = useTransform(scrollYProgress, [0.18, 0.3], [0, 16]);
  const titleFilter = useMotionTemplate`blur(${titleBlur}px)`;

  const capCapture = useTransform(scrollYProgress, [0.3, 0.42, 0.56, 0.66], [0, 1, 1, 0]);
  const captureScale = useTransform(scrollYProgress, [0.3, 0.44], [0.8, 1]);
  const captureY = useTransform(scrollYProgress, [0.3, 0.44], [28, 0]);
  const captureBlur = useTransform(scrollYProgress, [0.3, 0.44], [18, 0]);
  const captureFilter = useMotionTemplate`blur(${captureBlur}px)`;

  const capVideo = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  if (prefersReduced) return <StaticFallback />;

  return (
    <div ref={ref} className="relative h-[250vh] bg-bg">
      {mounted && (
      <div
        ref={stickyRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
        className="sticky top-0 h-screen overflow-hidden dot-grid"
      >
        {/* dashboards behind */}
        {DASH.map((c, i) => (
          <DashCard key={i} progress={scrollYProgress} card={c} />
        ))}

        {/* logos + AI providers + pages — shuffled & jittered per load */}
        {layout.map((slot) => (
          <FloatingTile
            key={slot.item.kind === "logo" ? slot.item.src : slot.item.name}
            progress={scrollYProgress}
            pointerX={pointerX}
            pointerY={pointerY}
            item={slot.item}
            posX={slot.x}
            posY={slot.y}
            rot={slot.rot}
            s={slot.s}
          />
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

        {/* connector line: Cabinet → video */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[2px]"
          style={{
            x: -180,
            width: 150,
            marginLeft: -75,
            marginTop: -1,
            opacity: linkOpacity,
            background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
          }}
        />

        {/* Cabinet hub */}
        <motion.div
          className="absolute left-1/2 top-1/2"
          style={{ x: cabinetX, scale: cabinetScale, opacity: cabinetOpacity, marginLeft: -90, marginTop: -90 }}
        >
          <Image
            src="/Cabinet.png"
            alt="Cabinet"
            width={180}
            height={180}
            priority
          />
        </motion.div>

        {/* demo video, sliding in from the right */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none"
          style={{ opacity: videoOpacity }}
        >
          <motion.div
            className="w-[min(84vw,520px)] rounded-2xl overflow-hidden border border-border shadow-2xl shadow-black/25"
            style={{ x: videoX, scale: videoScale }}
          >
            <video autoPlay loop muted playsInline className="w-full">
              <source src="/demo.webm" type="video/webm" />
            </video>
          </motion.div>
        </motion.div>

        {/* beat 1 — title beside the cloud (outer div positions; inner h2 is
            free to run its own magic-wand dissolve transform) */}
        <div className="absolute top-1/2 right-[10vw] md:right-[16vw] lg:right-[20vw] -translate-y-1/2 max-w-xs sm:max-w-sm md:max-w-md text-right pointer-events-none">
          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-text-primary"
            style={{
              opacity: capTitle,
              scale: titleScale,
              y: titleY,
              filter: titleFilter,
            }}
          >
            Your work
            <br />
            lives in <span className="text-text-tertiary">a hundred<br />places.</span>
          </motion.h2>
        </div>

        {/* captions */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-24 w-full max-w-4xl px-6 text-center pointer-events-none">
          <motion.p
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-text-primary"
            style={{
              opacity: capCapture,
              scale: captureScale,
              y: captureY,
              filter: captureFilter,
            }}
          >
            <span className="gradient-text">Cabinet</span> pulls it all into one place.
          </motion.p>
        </div>
        <motion.p
          className="absolute left-1/2 -translate-x-1/2 bottom-24 w-full max-w-4xl px-6 text-center font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-text-primary"
          style={{ opacity: capVideo }}
        >
          …and your AI team takes it from here, 24/7.
        </motion.p>

        {/* scroll hint */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-8 text-xs font-code text-text-muted uppercase tracking-widest"
          style={{ opacity: hintOpacity }}
        >
          scroll
        </motion.div>
      </div>
      )}
    </div>
  );
}
