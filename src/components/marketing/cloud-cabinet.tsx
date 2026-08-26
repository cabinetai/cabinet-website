"use client";

import {
  AnimatePresence,
  animate,
  circIn,
  cubicBezier,
  motion,
  useInView,
  useMotionValue,
  usePresence,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { CloudHeroWaitlist } from "@/components/cloud-hero-waitlist";
import { WAITLIST_COPY } from "@/lib/site-config";
import { ScrollReveal } from "@/components/lightswind/scroll-reveal";

// Same wood/brass palette as the hero cabinet in integration-scene.tsx.
const WOOD = "linear-gradient(135deg, #EDDCBF 0%, #DCC098 45%, #C9A47A 100%)";
const WOOD_DARK = "linear-gradient(135deg, #C9A47A 0%, #B8905F 60%, #A87F4F 100%)";
const BRASS = "linear-gradient(180deg, #F0DCA8 0%, #D9BC7A 55%, #B89A54 100%)";
const PAPER = "linear-gradient(180deg, #FCF6E8 0%, #F0E4C8 100%)";

const DRAWERS: { title: string; body: string }[] = [
  {
    title: "Your own machine",
    body: "A dedicated container, not a shared slice of someone else's server.",
  },
  {
    title: "Locked down",
    body: "Encrypted, isolated, and walled off from every other Cabinet.",
  },
  {
    title: "Teams, ready to go",
    body: "Pick a pre-built AI team and start working on day one.",
  },
];

// Geometry, all in px. One wide cabinet, three drawers in a row; the page
// card rests centered on a fixed-height "desk" below and flies from the
// open drawer's exposed mouth strip.
const DRAWER_H = 196;
const DRAWER_GAP = 12;
const DRAWER_EXTEND = 46;
const PAD_X = 14;
const ROOM_PAD_X = 28; // breathing room either side of the cabinet
const HEADER_H = 26; // top padding above the drawers
const DESK_H = 200;
// The desk floats above the cabinet, so the drawer mouth sits DESK_H/2 +
// header + half the slide below the desk center.
const MOUTH_Y = DESK_H / 2 + HEADER_H + DRAWER_EXTEND / 2;
// The page is a note-card sized sheet resting on the desk at a slight tilt
// that alternates per drawer.
const PAGE_W = 300;
const PAGE_H = 190;
const TILTS = [-2.4, 1.6, -1.8];
// It leaves and re-enters the drawer with the Dock's Genie effect, after
// Bartosz Ciechanowski's BCGenieEffect (github.com/Ciechan/BCGenieEffect):
// two overlapping sub-animations. "Curves" bends the sheet's two side
// outlines, cubic Beziers from the sheet's top corners down to the drawer
// mouth, from straight into a funnel; "slide" then moves the sheet down the
// funnel, and whatever has crossed the mouth is squashed into the mouth's
// depth. Each SLICE_H band of the sheet is mapped onto its trapezoid between
// the two curves with a projective transform, so the sides stay smooth.
const SLICE_H = 10;
const SLICES = Math.ceil(PAGE_H / SLICE_H);
const MOUTH_W = 22; // the tiny base the sheet pinches down to at the drawer
const MOUTH_DEPTH = 48; // how far into the drawer's dark gap it sinks
const CURVES = [0, 0.4]; // progress window of the bending sub-animation
const SLIDE = [0.3, 1]; // progress window of the sliding sub-animation
const PAGE_ENTER_S = 0.85; // page pours out of the drawer onto the desk
const PAGE_EXIT_S = 0.7; // page is sucked back into the drawer
const PAGE_ENTER_REDUCED = 0.2;
const PAGE_EXIT_REDUCED = 0.15;
// The drawer front has to be moving before its contents can follow it out.
const PAGE_ENTER_DELAY = 0.12;
// Strong ease-out: the sheet pours out and settles on the desk.
const EASE_OUT = cubicBezier(0.23, 1, 0.32, 1);
// The drawer taking it back: barely moves, then it is gone. Same suction curve
// as the hero cabinet, so both scenes pull with the same hand.
const EASE_SUCK = circIn;
// Paper does not leave a drawer already square with the desk. It comes out
// counter-rotated by this multiple of its resting tilt and swings into place.
const ENTER_TILT_SPIN = -1.8;
const TILT_SPRING = { type: "spring" as const, duration: 0.6, bounce: 0.22 };

const smooth = (t: number) => t * t * (3 - 2 * t);
const within = (lo: number, hi: number, t: number) => Math.min(1, Math.max(0, (t - lo) / (hi - lo)));

// x of a cubic Bezier with vertical tangents at both ends (both control points
// at mid-height) at height y: three Newton-Raphson steps from the linear guess.
function curveX(ax: number, ay: number, bx: number, by: number, y: number) {
  const my = (ay + by) / 2;
  let t = (y - ay) / (by - ay);
  for (let k = 0; k < 3; k++) {
    const n = 1 - t;
    const f = n * n * n * ay + 3 * n * n * t * my + 3 * n * t * t * my + t * t * t * by - y;
    const df = -3 * (ay * n * n + my * (-3 * t * t + 4 * t - 1) + t * (3 * my * t - 2 * my - by * t));
    t -= f / df;
  }
  const n = 1 - t;
  return n * n * n * ax + 3 * n * n * t * ax + 3 * n * t * t * bx + t * t * t * bx;
}

// matrix3d mapping the rect (0,0,W,H) onto the quad TL, TR, BL, BR
// (stackoverflow.com/a/12820877; CATransform3D field order is matrix3d order).
function quadTransform(W: number, H: number, q: number[]) {
  const [x1, y1, x2, y2, x3, y3, x4, y4] = q;
  const y21 = y2 - y1, y32 = y3 - y2, y43 = y4 - y3, y14 = y1 - y4, y31 = y3 - y1, y42 = y4 - y2;
  const a = -H * (x2 * x3 * y14 + x2 * x4 * y31 - x1 * x4 * y32 + x1 * x3 * y42);
  const b = W * (x2 * x3 * y14 + x3 * x4 * y21 + x1 * x4 * y32 + x1 * x2 * y43);
  const c = -H * W * x1 * (x4 * y32 - x3 * y42 + x2 * y43);
  const d = H * (-x4 * y21 * y3 + x2 * y1 * y43 - x1 * y2 * y43 - x3 * y1 * y4 + x3 * y2 * y4);
  const e = W * (x4 * y2 * y31 - x3 * y1 * y42 - x2 * y31 * y4 + x1 * y3 * y42);
  const f = -(W * (x4 * (H * y1 * y32) - x3 * H * y1 * y42 + H * x2 * y1 * y43));
  const g = H * (x3 * y21 - x4 * y21 + (-x1 + x2) * y43);
  const h = W * (-x2 * y31 + x4 * y31 + (x1 - x3) * y42);
  let i = H * (W * (-(x3 * y2) + x4 * y2 + x2 * y3 - x4 * y3 - x2 * y4 + x3 * y4));
  if (Math.abs(i) < 1e-4) i = 1e-4 * (i > 0 ? 1 : -1);
  return `matrix3d(${a / i},${d / i},0,${g / i},${b / i},${e / i},0,${h / i},0,0,1,0,${c / i},${f / i},0,1)`;
}

// The quad of band k at genie time t (0 = resting on the desk, 1 = fully in
// the drawer), relative to the band's own top-left. mouth is the top-center
// of the drawer's dark gap in the sheet's coordinates.
function sliceQuad(k: number, t: number, mouth: { x: number; y: number }) {
  const bend = smooth(within(CURVES[0], CURVES[1], t));
  // Linear inside its own window: how fast the sheet runs down the funnel is
  // the master curve's job now. Easing it twice mushed the two together and is
  // what made the pull read as a mechanism rather than a hand.
  const slide = within(SLIDE[0], SLIDE[1], t);
  const left = (mouth.x - MOUTH_W / 2) * bend; // far end of the left curve: 0 -> mouth
  const right = PAGE_W + (mouth.x + MOUTH_W / 2 - PAGE_W) * bend;
  const start = mouth.y * slide; // the sheet's top edge: desk -> mouth
  const corner = (y: number, side: 0 | 1): [number, number] =>
    y <= mouth.y
      ? [side ? curveX(PAGE_W, 0, right, mouth.y, y) : curveX(0, 0, left, mouth.y, y), y]
      : [side ? right : left, mouth.y + ((y - mouth.y) * MOUTH_DEPTH) / PAGE_H];
  const top = start + k * SLICE_H;
  const [x1, y1] = corner(top, 0);
  const [x2, y2] = corner(top, 1);
  const [x3, y3] = corner(top + SLICE_H, 0);
  const [x4, y4] = corner(top + SLICE_H, 1);
  const o = k * SLICE_H;
  return quadTransform(PAGE_W, SLICE_H, [x1, y1 - o, x2, y2 - o, x3, y3 - o, x4, y4 - o]);
}

const SPRING = { type: "spring" as const, stiffness: 420, mass: 0.8 };
// Desk-lamp head aim: the beam points up-left at the window headline, then
// swings up-right to the chalkboard. 0deg = beam horizontal to the right.
const LAMP_WINDOW_DEG = -156;
const LAMP_BOARD_DEG = -23;
const LAMP_DRAWER_DEG = 142; // down-left onto the drawer row
// rattle timing, shared by the drawer keyframes and the haptic pulses
const BUZZ_MS = 800;
const BUZZ_GAP_MS = 900;
// phone vibration pattern for one burst (on/off ms), about BUZZ_MS long
const BUZZ_HAPTIC = [60, 40, 60, 40, 60, 40, 60, 40, 60, 40, 60, 40, 60];

// The window shows the visitor's own sky: dawn, day, dusk, or night by their
// local clock. Every palette stays muted so the warm wood cabinet leads the
// scene, and white text reads on all of them.
const SKIES = {
  dawn: {
    sky: "linear-gradient(0deg, #F6D7AC 0%, #E9B8A0 30%, #A995B5 65%, #6A7BA6 100%)",
    cloud: "#FBEBD6",
    shadow: "rgba(60, 50, 80, 0.28)",
  },
  day: {
    sky: "linear-gradient(0deg, #B6D9EE 0%, #8FC2E6 35%, #5D9FD4 75%, #4489C2 100%)",
    cloud: "#FFFFFF",
    shadow: "rgba(0, 40, 90, 0.28)",
  },
  dusk: {
    sky: "linear-gradient(0deg, #F0CDA4 0%, #D6A88F 22%, #9C87A8 52%, #566B96 82%, #3E5480 100%)",
    cloud: "#F7E3CE",
    shadow: "rgba(30, 30, 60, 0.3)",
  },
  night: {
    sky: "linear-gradient(0deg, #35415E 0%, #273150 45%, #182036 100%)",
    cloud: "#93A0BC",
    shadow: "rgba(0, 0, 20, 0.4)",
  },
};

function skyForHour(h: number): keyof typeof SKIES {
  if (h < 6) return "night";
  if (h < 9) return "dawn";
  if (h < 17) return "day";
  if (h < 21) return "dusk";
  return "night";
}

function Drawer({
  label,
  open,
  buzz,
  onClick,
}: {
  label: string;
  open: boolean;
  /** rattle the closed front like something inside is pushing to get out */
  buzz: boolean;
  onClick: () => void;
}) {
  const reduce = useReducedMotion();
  const extend = reduce ? 0 : DRAWER_EXTEND;
  // hold the front open long enough for a returning page to slide all the way
  // back in, then close; opening stays immediate so the page pours out with it
  const closeDelay = reduce ? PAGE_EXIT_REDUCED : PAGE_EXIT_S;
  return (
    <div className="relative flex-1" style={{ height: DRAWER_H, zIndex: open ? 2 : 1 }}>
      {/* dark opening revealed behind the front */}
      <div
        className="absolute inset-0 rounded-[10px]"
        style={{
          background: "linear-gradient(180deg, #211B16 0%, #2C2520 100%)",
          boxShadow: "inset 0 5px 12px rgba(0, 0, 0, 0.55)",
        }}
      />
      {/* angled side panels that grow with the front's slide (reads as depth) */}
      {(["left", "right"] as const).map((side) => (
        <motion.div
          key={side}
          aria-hidden
          className="absolute top-0"
          style={{
            [side]: 0,
            width: 17,
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
          animate={{ height: open ? extend + 10 : 0, opacity: open ? 1 : 0 }}
          transition={{ ...SPRING, damping: open ? 12 : 24, delay: open ? 0 : closeDelay }}
        />
      ))}
      {/* drawer front slides down + out on a springy open */}
      <motion.button
        type="button"
        onClick={onClick}
        aria-expanded={open}
        aria-controls="cloud-cabinet-page"
        whileTap={reduce ? undefined : { scale: 0.975 }}
        className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        animate={
          open
            ? { y: extend, x: 0, rotate: 0, scale: reduce ? 1 : 1.06 }
            : buzz && !reduce
              ? // shoves out (showing the dark gap above) and shudders hard
                {
                  y: [0, 8, 2, 9, 1, 8, 2, 9, 1, 6, 0],
                  x: [0, -2.5, 2.5, -2.5, 2.5, -2, 2, -1.5, 1.5, 0, 0],
                  rotate: [0, -0.8, 0.8, -0.8, 0.8, -0.5, 0.5, -0.3, 0.3, 0, 0],
                  scale: 1,
                }
              : { y: 0, x: 0, rotate: 0, scale: 1 }
        }
        transition={
          !open && buzz && !reduce
            ? {
                duration: BUZZ_MS / 1000,
                repeat: Infinity,
                repeatDelay: BUZZ_GAP_MS / 1000,
                ease: "easeInOut",
              }
            : { ...SPRING, damping: open ? 12 : 24, delay: open ? 0 : closeDelay }
        }
        style={{
          gap: 7,
          background: WOOD,
          boxShadow: open
            ? "0 14px 22px -10px rgba(60, 38, 20, 0.6)"
            : "inset 0 1px 2px rgba(255, 255, 255, 0.28), inset 0 -2px 3px rgba(0, 0, 0, 0.22)",
        }}
      >
        <span
          aria-hidden
          style={{
            width: 66,
            height: 9,
            borderRadius: 5,
            background: BRASS,
            boxShadow: "0 2px 3px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
          }}
        />
        {/* card-catalog label holder: brass frame, paper card */}
        <span
          className="rounded-[6px] p-[2px]"
          style={{
            background: BRASS,
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.55)",
          }}
        >
          <span
            className="font-display block rounded-[4px] px-2.5 py-0.5 text-center text-[clamp(11px,3vw,15px)] font-bold uppercase leading-tight tracking-[0.07em] sm:whitespace-nowrap"
            style={{
              color: "#6B4226",
              background: PAPER,
              boxShadow: "inset 0 1px 2px rgba(96, 64, 32, 0.28)",
            }}
          >
            {label}
          </span>
        </span>
      </motion.button>
    </div>
  );
}

// The paper itself: same fiber texture and dog-ear as the hero's task pages.
function Sheet({ page }: { page: (typeof DRAWERS)[number] }) {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center"
      style={{
        background:
          "repeating-linear-gradient(0deg, rgba(120, 96, 60, 0.03) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(120, 96, 60, 0.02) 0 2px, transparent 2px 5px), linear-gradient(170deg, #FFFFFF 0%, #F6F1E4 100%)",
        borderRadius: 7,
        clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)",
      }}
    >
      <p className="font-chalk text-2xl leading-snug" style={{ color: "#5A3A1E" }}>
        {page.body}
      </p>
      {/* folded-back corner */}
      <div
        aria-hidden
        className="absolute right-0 top-0"
        style={{
          width: 14,
          height: 14,
          background: "#E6DEC9",
          clipPath: "polygon(0 0, 100% 100%, 0 100%)",
          borderRadius: "0 0 0 5px",
        }}
      />
    </div>
  );
}

// One SLICE_H band of the sheet, mapped onto its trapezoid each frame.
function Slice({
  i,
  p,
  mouth,
  warp,
  children,
}: {
  i: number;
  p: ReturnType<typeof useMotionValue<number>>;
  mouth: { x: number; y: number };
  warp: boolean;
  children: ReactNode;
}) {
  const top = i * SLICE_H;
  const transform = useTransform(p, (v) => (warp ? sliceQuad(i, 1 - v, mouth) : "none"));
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0"
      style={{
        transform,
        transformOrigin: `0 ${top}px`,
        // bands overlap by under a pixel so no hairline seams show mid-stretch
        clipPath: `inset(${top}px 0 ${Math.max(0, PAGE_H - top - SLICE_H - 0.75)}px 0)`,
      }}
    >
      {children}
    </motion.div>
  );
}

// Drives one page's Genie in and out. Presence keeps the element mounted
// until the suck-back-in has finished, so switching drawers shows the old
// page returning to its drawer while the new one pours out of its own.
function GeniePage({
  page,
  mouth,
  tilt,
}: {
  page: (typeof DRAWERS)[number];
  mouth: { x: number; y: number };
  tilt: number;
}) {
  const reduce = useReducedMotion();
  const [isPresent, safeToRemove] = usePresence();
  // Framer hands back a fresh safeToRemove on some re-renders. Read through a
  // ref so it stays out of the flight effect's deps: one direction change has
  // to start exactly one flight. Restarting it mid-air cancelled the animation
  // that owned the removal, and the sheet was left hanging over its own drawer.
  const remove = useRef(safeToRemove);
  useEffect(() => {
    remove.current = safeToRemove;
  }, [safeToRemove]);
  const p = useMotionValue(0);
  useEffect(() => {
    const done = () => remove.current?.();
    const ctrl = animate(
      p,
      isPresent ? 1 : 0,
      // The two directions are not one motion played backwards. Coming out, the
      // drawer has let go and the sheet decelerates onto the desk. Going back,
      // the drawer is pulling, so it resists and then accelerates away.
      isPresent
        ? {
            duration: reduce ? PAGE_ENTER_REDUCED : PAGE_ENTER_S,
            delay: reduce ? 0 : PAGE_ENTER_DELAY,
            ease: reduce ? "linear" : EASE_OUT,
          }
        : {
            duration: reduce ? PAGE_EXIT_REDUCED : PAGE_EXIT_S,
            ease: reduce ? "linear" : EASE_SUCK,
            onComplete: done,
          },
    );
    if (isPresent) return () => ctrl.stop();
    // Backstop. Past the exit duration the sheet is inside the drawer whatever
    // happened to the animation, so the element goes even if onComplete never
    // fires. Nothing may outlive its drawer being open.
    const gone = setTimeout(done, (reduce ? PAGE_EXIT_REDUCED : PAGE_EXIT_S) * 1000 + 90);
    return () => {
      ctrl.stop();
      clearTimeout(gone);
    };
  }, [isPresent, p, reduce]);

  // The tilt is animated rather than fixed: the sheet swings into its resting
  // angle with a little overshoot, and straightens up on the way back because
  // it has to go into the mouth square.
  const rot = useMotionValue(reduce ? tilt : tilt * ENTER_TILT_SPIN);
  useEffect(() => {
    if (reduce) {
      rot.set(tilt);
      return;
    }
    const ctrl = isPresent
      ? animate(rot, tilt, { ...TILT_SPRING, delay: PAGE_ENTER_DELAY })
      : animate(rot, 0, { duration: PAGE_EXIT_S * 0.75, ease: EASE_SUCK });
    return () => ctrl.stop();
  }, [isPresent, reduce, rot, tilt]);
  const transform = useTransform(rot, (r) => `rotate(${r}deg)`);
  // Fade tied to the tail, not the body: the sheet stays visible all the way
  // down the funnel and only fades in the final stretch, as its base actually
  // sinks into the drawer's mouth (exit) or lifts back out of it (enter).
  // p: 0 = fully in the drawer, 1 = resting on the desk.
  // Ease-out so it is solid almost as soon as it clears the mouth, instead of
  // spending the first third of its trip translucent.
  const opacity = useTransform(p, (v) => EASE_OUT(within(0.04, 0.34, v)));
  // top-center of the open drawer's dark gap in the sheet's own box (the sheet
  // is centered on the desk; mouth.y is the gap's center, DRAWER_EXTEND tall)
  const m = { x: PAGE_W / 2 + mouth.x, y: PAGE_H / 2 + mouth.y - DRAWER_EXTEND / 2 + 6 };
  return (
    <motion.div
      className="relative"
      style={{
        width: PAGE_W,
        maxWidth: "100%",
        height: PAGE_H,
        transform,
        opacity,
        filter: "drop-shadow(0 14px 16px rgba(84, 52, 26, 0.28))",
      }}
    >
      <p className="sr-only">{page.body}</p>
      {Array.from({ length: SLICES }, (_, i) => (
        <Slice key={i} i={i} p={p} mouth={m} warp={!reduce}>
          <Sheet page={page} />
        </Slice>
      ))}
    </motion.div>
  );
}

// Writes the board's lines letter by letter, a chalk stick gliding along the
// text. The full text is laid out from the start (letters only turn opaque),
// so nothing reflows while it writes.
function ChalkLines({
  lines,
  start,
  onDone,
}: {
  lines: { text: string; className: string }[];
  start: boolean;
  onDone?: () => void;
}) {
  const reduce = useReducedMotion();
  const flat = lines.map((l) => l.text).join("");
  const [n, setN] = useState(0);
  const chars = useRef<(HTMLSpanElement | null)[]>([]);
  const chalk = useRef<HTMLSpanElement>(null);
  const writing = start && !reduce && n < flat.length;

  // tell the parent once every letter is on the board (instantly if reduced)
  useEffect(() => {
    if (start && (reduce || n >= flat.length)) onDone?.();
  }, [start, reduce, n, flat.length, onDone]);

  useEffect(() => {
    if (!writing) return;
    const prev = flat[n - 1];
    // ponytail: fixed cadence, a breath after a space, a pause after a sentence
    const t = setTimeout(() => setN(n + 1), prev === "." ? 420 : prev === " " ? 80 : 42);
    return () => clearTimeout(t);
  }, [writing, n, flat]);

  // glide the chalk tip to the right edge of the letter just written
  useLayoutEffect(() => {
    const el = chars.current[Math.max(0, n - 1)];
    const c = chalk.current;
    if (!el || !c) return;
    const x = n === 0 ? el.offsetLeft : el.offsetLeft + el.offsetWidth;
    const y = el.offsetTop + el.offsetHeight * 0.78;
    c.style.transform = `translate(${x}px, ${y}px) rotate(-52deg)`;
  }, [n, writing]);

  let k = 0;
  return (
    <div className="relative" style={{ textShadow: "0 0 2px rgba(255, 255, 255, 0.25)" }}>
      {lines.map((l) => (
        <p key={l.text} className={l.className}>
          {[...l.text].map((ch) => {
            const i = k++;
            return (
              <span
                key={i}
                ref={(el) => {
                  chars.current[i] = el;
                }}
                style={{ opacity: reduce || i < n ? 1 : 0, transition: "opacity 120ms" }}
              >
                {ch}
              </span>
            );
          })}
        </p>
      ))}
      {writing && (
        <span
          ref={chalk}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0"
          style={{
            width: 26,
            height: 7,
            borderRadius: "2px 4px 4px 2px",
            background: "linear-gradient(180deg, #FFFDF7 0%, #E6E1D2 100%)",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.45)",
            transformOrigin: "0 50%",
            transition: "transform 60ms linear",
          }}
        />
      )}
    </div>
  );
}

// The Cloud pillars as the Cabinet itself: three drawers, each sliding a
// page out onto the desk when clicked, the hero's files-into-drawer animation
// played in reverse. Nothing opens on its own; the first drawer rattles
// until the visitor clicks one.
export function CloudCabinet() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const cabRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cabRef, { amount: 0.5 });
  const [active, setActive] = useState<number | null>(null);
  // the rattle is a "click me" cue; it stops for good once a drawer is clicked
  const [touched, setTouched] = useState(false);
  // the drawer only starts rattling once the chalkboard has written its lines
  const [boardWritten, setBoardWritten] = useState(false);
  const buzz = inView && active === null && !touched && !reduce && boardWritten;

  // The chalk starts writing once the window headline's word reveal (about
  // 2s from entering view) has finished, and only with the board on screen.
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { amount: 0.5, once: true });
  const boardRef = useRef<HTMLDivElement>(null);
  const boardInView = useInView(boardRef, { amount: 0.6, once: true });
  const [headDone, setHeadDone] = useState(false);
  useEffect(() => {
    if (!headInView) return;
    const t = setTimeout(() => setHeadDone(true), reduce ? 0 : 2200);
    return () => clearTimeout(t);
  }, [headInView, reduce]);

  // Haptics: phones with navigator.vibrate feel each rattle burst. Browsers
  // only honor vibrate after the visitor has tapped the page once, so the
  // pulse checks for that instead of logging a blocked call every cycle.
  useEffect(() => {
    if (!buzz || !("vibrate" in navigator)) return;
    const pulse = () => {
      if (navigator.userActivation?.hasBeenActive) navigator.vibrate(BUZZ_HAPTIC);
    };
    pulse();
    const t = setInterval(pulse, BUZZ_MS + BUZZ_GAP_MS);
    return () => {
      clearInterval(t);
      navigator.vibrate(0);
    };
  }, [buzz]);
  const [width, setWidth] = useState(640);
  // Dusk is the SSR default; the visitor's clock takes over after hydration.
  const [skyName, setSkyName] = useState<keyof typeof SKIES>("dusk");
  useEffect(() => {
    setSkyName(skyForHour(new Date().getHours()));
  }, []);
  const sky = SKIES[skyName];

  // Drawer positions depend on the real rendered cabinet-column width, and
  // the sky/floor split tracks the cabinet's feet (the column can share its
  // row with the chalkboard, or stack above it on phones).
  const [floorTop, setFloorTop] = useState(430);
  // Below xl the heading sits in normal flow above the desk, so the window has
  // to be measured to it instead of to a fixed slice of the viewport. On xl the
  // heading is absolutely positioned onto the glass and this goes unused.
  const [headTop, setHeadTop] = useState(56);
  useEffect(() => {
    const el = cabRef.current;
    const root = ref.current;
    if (!el || !root) return;
    const measure = () => {
      setWidth(el.offsetWidth);
      setFloorTop(el.offsetTop + el.offsetHeight);
      const head = headRef.current;
      // Same offsetParent as the cabinet column (the positioned room wrapper),
      // so this shares a coordinate space with floorTop.
      if (head) setHeadTop(head.offsetTop);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(root);
    if (headRef.current) ro.observe(headRef.current);
    return () => ro.disconnect();
  }, []);

  const drawerW = (width - 2 * PAD_X - 2 * DRAWER_GAP) / 3;
  const mouthX = (i: number) => (i - 1) * (drawerW + DRAWER_GAP);

  const page = active === null ? null : DRAWERS[active];
  // A band of wall above the frame, then glass all the way down to the feet.
  const winTop = Math.max(16, headTop - 30);

  return (
    <div ref={ref} className="mx-auto w-full">
      {/* Full-bleed scene: vivid sky for a wall and a plank floor under the
          cabinet, both spanning the whole section width. */}
      <div className="relative">
        {/* the wall, from the top down to the floor line */}
        <div
          aria-hidden
          className="absolute left-1/2 w-screen -translate-x-1/2"
          style={{
            top: "-60vh",
            height: `calc(60vh + ${floorTop}px)`,
            background: "linear-gradient(180deg, #F6EAD6 0%, #EEDEC4 100%)",
          }}
        />
        {/* the window: rounded wooden frame inset in the wall (~50px of wall
            around it), muted dusk sky behind the glass */}
        <div
          aria-hidden
          className="absolute left-[calc((100%-100vw)/2+20px)] top-[var(--win-top)] h-[var(--win-h)] w-[calc(100vw-40px)] xl:left-[calc((100%-100vw)/2+50px)] xl:top-[var(--win-xl-top)] xl:h-[var(--win-xl-h)] xl:w-[calc(75vw-100px)]"
          style={{
            "--win-top": `${winTop}px`,
            "--win-h": `${Math.max(240, floorTop - 28 - winTop)}px`,
            "--win-xl-top": `calc(${floorTop - 28}px - (100svh - 170px))`,
            "--win-xl-h": "calc(100svh - 170px)",
            padding: 14,
            borderRadius: 30,
            background: WOOD_DARK,
            boxShadow:
              "0 24px 48px -20px rgba(60, 38, 20, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.35)",
          } as CSSProperties}
        >
          <div
            className="relative h-full w-full overflow-hidden"
            style={{
              borderRadius: 18,
              background: sky.sky,
              boxShadow: `inset 0 2px 10px ${sky.shadow}`,
              transition: "background 1.2s ease",
            }}
          >
            {/* clouds hug the window edges: the heading always leaves at
                least ~150px of clear sky each side on xl, and the float
                animation only bobs vertically, so they can't reach the text */}
            <div
              className="float-slow absolute"
              style={{
                left: 10,
                top: "14%",
                width: 74,
                height: 24,
                borderRadius: 999,
                background: sky.cloud,
                opacity: 0.8,
                boxShadow: `20px -11px 0 4px ${sky.cloud}, 42px -3px 0 1px ${sky.cloud}`,
              }}
            />
            <div
              className="float-slow absolute"
              style={{
                right: 44,
                top: "38%",
                width: 56,
                height: 19,
                borderRadius: 999,
                background: sky.cloud,
                opacity: 0.65,
                boxShadow: `16px -9px 0 3px ${sky.cloud}, 33px -2px 0 1px ${sky.cloud}`,
                animationDelay: "-2.5s",
              }}
            />
          </div>
        </div>
        {/* floor, from the cabinet's feet down past the section bottom:
            a plank plane tilted away, so seams converge at the horizon */}
        <div
          aria-hidden
          className="absolute left-1/2 w-screen -translate-x-1/2 overflow-hidden"
          style={{ top: floorTop, height: "120vh" }}
        >
          <div
            className="absolute"
            style={{
              left: "-60%",
              right: "-60%",
              top: 0,
              height: "300%",
              transformOrigin: "50% 0",
              transform: "perspective(700px) rotateX(38deg)",
              background:
                "repeating-linear-gradient(90deg, rgba(90, 58, 30, 0.11) 0 3px, transparent 3px 130px), repeating-linear-gradient(0deg, rgba(90, 58, 30, 0.07) 0 2px, transparent 2px 120px), linear-gradient(180deg, #C9A97C 0%, #D3B384 30%, #E3C9A0 100%)",
            }}
          />
          {/* distance haze along the horizon */}
          <div
            className="absolute inset-x-0 top-0"
            style={{
              height: 90,
              background: "linear-gradient(180deg, rgba(120, 86, 50, 0.3), transparent)",
            }}
          />
        </div>
        {/* baseboard where the wall meets the floor. It ends exactly at
            floorTop, the legs' bottom edge, so the feet stand on the floor
            instead of on the trim. */}
        <div
          aria-hidden
          className="absolute left-1/2 w-screen -translate-x-1/2"
          style={{
            top: floorTop - 18,
            height: 18,
            background: "linear-gradient(180deg, #C9A47A 0%, #A87F4F 60%, #8A6236 100%)",
            boxShadow: "0 6px 12px rgba(74, 48, 24, 0.35), inset 0 1.5px 1px rgba(255, 250, 238, 0.5)",
          }}
        />
        <div
          className="relative pt-14 xl:pt-[10px]"
          style={{ paddingLeft: ROOM_PAD_X, paddingRight: ROOM_PAD_X, paddingBottom: 16 }}
        >
          <div className="flex flex-col gap-10">
            <div
              ref={cabRef}
              className="flex min-w-0 flex-col xl:w-[calc(75vw-((100vw-100%)/2)-40px)]"
            >
              {/* the section heading, white on the window's sky. On xl it leaves
              the column and takes the window's own left/width formula plus
              the sky band's exact top/height, so flex-centering centers it
              on the glass both ways. With the heading out of the flow the
              xl column is fixed: desk 200 + cabinet 232 + legs 12 + 10
              column offset = floorTop 454, hence top 454 - 28 - (100svh
              - 170) = 596px - 100svh and height 100svh - 586px. Re-derive
              both if the cabinet geometry constants change. */}
              <div ref={headRef} className="order-1 flex flex-col items-center justify-center px-4 pb-8 pt-2 text-center xl:absolute xl:left-[calc((100%-100vw)/2+50px)] xl:top-[calc(596px-100svh)] xl:h-[max(250px,calc(100svh-586px))] xl:w-[calc(75vw-100px)] xl:p-0">
                {/* same word-by-word reveal as the "pulls it all into one place"
                caption in integration-scene; the three blocks stage in order */}
                <ScrollReveal
                  baseRotation={0}
                  staggerDelay={0.08}
                  containerClassName="mb-4"
                  textClassName="text-[11px] font-code uppercase tracking-[0.28em] text-white/90"
                >
                  {/* font-brand paints a brown gradient; force white on the sky */}
                  <span
                    className="font-brand italic normal-case text-sm tracking-normal"
                    style={{ WebkitTextFillColor: "#FFFFFF" }}
                  >
                    Cabinet
                  </span>{" "}
                  Cloud
                </ScrollReveal>
                <ScrollReveal
                  as="h2"
                  baseRotation={0}
                  staggerDelay={0.08}
                  delay={0.15}
                  textClassName="font-display text-4xl leading-tight text-white md:text-5xl"
                >
                  Afraid to close your laptop?
                </ScrollReveal>
                <ScrollReveal
                  baseRotation={0}
                  staggerDelay={0.04}
                  delay={0.5}
                  containerClassName="mt-5 max-w-xl"
                  textClassName="font-body-serif text-lg leading-relaxed text-white"
                >
                  <span className="font-brand italic" style={{ WebkitTextFillColor: "#FFFFFF" }}>
                    Cabinet
                  </span>{" "}
                  Cloud is your AI team, running on your own machine in the cloud, 24/7.
                </ScrollReveal>
              </div>
              <div
                className="order-3 relative rounded-[20px]"
                style={{
                  background: WOOD_DARK,
                  padding: `${HEADER_H}px ${PAD_X}px 10px`,
                  boxShadow:
                    "0 24px 44px -18px rgba(60, 38, 20, 0.55), inset 0 2px 3px rgba(255, 255, 255, 0.18)",
                }}
              >
                {/* an articulated desk lamp on the cabinet's top-right edge. Its
                    head swivels to throw a wide beam: first at the window
                    headline, then across to the chalkboard as it starts to
                    write. Box is 96 tall; the base rests on the cabinet top. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute hidden lg:block"
                  style={{ right: 24, bottom: "calc(100% - 4px)", width: 70, height: 96, zIndex: 25 }}
                >
                  {/* weighted base */}
                  <div
                    className="absolute"
                    style={{
                      left: "50%",
                      bottom: 0,
                      transform: "translateX(-50%)",
                      width: 48,
                      height: 11,
                      borderRadius: "46% 46% 40% 40% / 72% 72% 55% 55%",
                      background: BRASS,
                      boxShadow: "0 3px 5px rgba(60,38,20,0.4), inset 0 1px 1px rgba(255,255,255,0.6)",
                    }}
                  />
                  {/* upright post */}
                  <div
                    className="absolute"
                    style={{ left: 32, bottom: 8, width: 6, height: 60, borderRadius: 3, background: BRASS }}
                  />
                  {/* pivot knuckle at the top of the post */}
                  <div
                    className="absolute"
                    style={{
                      left: 29,
                      top: 22,
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: BRASS,
                      boxShadow: "inset 0 1px 1px rgba(255,255,255,0.6)",
                    }}
                  />
                  {/* head + beam group, pivoting at the knuckle (left:35 top:28) */}
                  <motion.div
                    className="absolute"
                    style={{ left: 35, top: 28, transformOrigin: "0px 0px" }}
                    initial={{ rotate: LAMP_WINDOW_DEG }}
                    animate={{
                      rotate: boardWritten
                        ? LAMP_DRAWER_DEG
                        : headDone && boardInView
                          ? LAMP_BOARD_DEG
                          : LAMP_WINDOW_DEG,
                    }}
                    transition={{ duration: reduce ? 0 : 1.2, ease: [0.45, 0.05, 0.2, 1] }}
                  >
                    {/* the light itself, which switches off once the visitor
                        opens a drawer */}
                    <motion.div
                      className="absolute"
                      style={{ left: 0, top: 0 }}
                      animate={{ opacity: touched ? 0 : 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                    {/* one single ray of light: narrow at the shade mouth,
                        fanning out wide toward the target */}
                    <div
                      className="absolute"
                      style={{
                        left: 22,
                        top: -150,
                        width: 420,
                        height: 300,
                        clipPath: "polygon(0 46%, 100% 4%, 100% 96%, 0 54%)",
                        background:
                          "linear-gradient(90deg, rgba(255,250,232,0.9) 0%, rgba(255,242,205,0.5) 34%, rgba(255,236,190,0.2) 66%, rgba(255,236,180,0) 100%)",
                        filter: "blur(12px)",
                        mixBlendMode: "screen",
                      }}
                    />
                    {/* the soft blurred circle of light where the ray lands,
                        sized and placed to sit on the centre of the target */}
                    <div
                      className="absolute"
                      style={{
                        left: 154,
                        top: -160,
                        width: 320,
                        height: 320,
                        borderRadius: "50%",
                        background:
                          "radial-gradient(circle, rgba(255,253,244,0.8) 0%, rgba(255,247,222,0.5) 34%, rgba(255,240,205,0.18) 60%, transparent 80%)",
                        filter: "blur(24px)",
                        mixBlendMode: "screen",
                      }}
                    />
                    {/* hot spot at the bulb */}
                    <div
                      className="absolute"
                      style={{
                        left: 2,
                        top: -24,
                        width: 52,
                        height: 48,
                        borderRadius: "50%",
                        background:
                          "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,247,214,0.8) 34%, rgba(255,224,150,0.36) 62%, transparent 78%)",
                        mixBlendMode: "screen",
                      }}
                    />
                    </motion.div>
                    {/* conical shade: narrow at the pivot, open mouth at the bulb */}
                    <div
                      className="absolute"
                      style={{
                        left: -2,
                        top: -17,
                        width: 30,
                        height: 34,
                        clipPath: "polygon(0 30%, 0 70%, 100% 100%, 100% 0)",
                        borderRadius: "6px 3px 3px 6px",
                        background: "linear-gradient(180deg, #FBEBC0 0%, #E9C77E 55%, #C79E56 100%)",
                        boxShadow: "inset 0 2px 3px rgba(255,255,255,0.6), inset 0 -4px 6px rgba(150,110,50,0.4)",
                      }}
                    />
                  </motion.div>
                </div>
                <div className="flex" style={{ gap: DRAWER_GAP }}>
                  {DRAWERS.map((d, i) => (
                    <Drawer
                      key={d.title}
                      label={d.title}
                      open={i === active}
                      buzz={buzz && i === 0}
                      onClick={() => {
                setTouched(true);
                // clicking the open drawer closes it and sends its page back in
                setActive((a) => (a === i ? null : i));
              }}
                    />
                  ))}
                </div>
              </div>
              {/* legs */}
              <div className="order-4 flex justify-between px-10">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 22,
                      height: 12,
                      borderRadius: "0 0 6px 6px",
                      background: WOOD_DARK,
                      // contact shadow on the floor, so the feet read as grounded
                      boxShadow: "0 3px 4px -1px rgba(60, 38, 20, 0.5)",
                    }}
                  />
                ))}
              </div>

      {/* the desk: where the pulled-out page floats, above the cabinet. z-10
          lifts it over the drawer slots (z 1-2) so the page sinks into the
          open drawer's gap instead of disappearing behind the front. */}
      <div
        id="cloud-cabinet-page"
        aria-live="polite"
        className="order-2 relative z-10 flex items-center justify-center"
        style={{ height: DESK_H }}
      >
        <AnimatePresence mode="popLayout">
          {page && active !== null && (
            <motion.div key={active}>
              <GeniePage
                page={page}
                mouth={{ x: mouthX(active), y: MOUTH_Y }}
                tilt={TILTS[active % TILTS.length]}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
            </div>
            {/* the waitlist as a chalkboard hung high on the wall: on xl its
                top sits 14px below the window frame's top (the window top is
                596px - 100svh, see the heading's derivation above).
                The descendant overrides restack the shared form for the
                narrow board and turn its small print chalk-white. */}
            <div ref={boardRef} className="chalk-board relative w-full shrink-0 xl:absolute xl:right-[calc(((100%-100vw)/2)+((25vw-min(23vw,380px))/2))] xl:top-[calc(610px-100svh)] xl:w-[min(23vw,380px)] xl:-rotate-1 [&_.text-text-tertiary]:text-white/70 [&_.sm\:flex-row]:flex-col [&_.sm\:p-1\.5]:p-2 [&_.rounded-full]:rounded-2xl [&_input]:border-2 [&_input]:border-dashed [&_input]:border-white/50 [&_input]:bg-white/10 [&_input]:text-center [&_input]:text-white [&_input:focus]:border-white/85 [&_input::placeholder]:text-white/60">
              <div
                className="rounded-[14px] p-[10px]"
                style={{
                  background: WOOD_DARK,
                  boxShadow:
                    "0 18px 32px rgba(60, 38, 20, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
                }}
              >
                <div
                  className="rounded-[8px] px-5 py-4 text-center"
                  style={{
                    background:
                      "radial-gradient(120% 90% at 30% 20%, #3A4A40 0%, #2C3A32 55%, #24302A 100%)",
                    boxShadow: "inset 0 2px 12px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {/* chalk handwriting: upright print lettering with only a
                      whisper of glow, written out by the chalk stick */}
                  <ChalkLines
                    start={headDone && boardInView}
                    onDone={() => setBoardWritten(true)}
                    lines={[
                      {
                        text: "We are building it now.",
                        className: "font-chalk text-3xl leading-tight text-white",
                      },
                      {
                        text: WAITLIST_COPY.scarcity,
                        className: "font-chalk mt-1 text-xl leading-snug text-white/95",
                      },
                    ]}
                  />
                  <div className="mx-auto mt-3 w-24 border-t-2 border-dashed border-white/30" />
                  <Suspense fallback={<div className="mt-3 h-24 rounded-2xl bg-white/10" />}>
                    <CloudHeroWaitlist source="homepage-section" originPage="/" className="mt-3" />
                  </Suspense>
                </div>
              </div>
              {/* chalk tray */}
              <div
                className="mx-auto"
                style={{
                  width: "60%",
                  height: 9,
                  borderRadius: "0 0 6px 6px",
                  background: BRASS,
                  boxShadow: "0 3px 5px rgba(0, 0, 0, 0.25)",
                }}
              />
            </div>
          </div>
        </div>
        {/* a potted plant on the floor to the left of the cabinet, drawn in
            the same flat-CSS style as the cabinet itself */}
        <div
          aria-hidden
          className="absolute hidden lg:block"
          style={{ top: floorTop + 14, transform: "translateY(-100%)", left: -132, width: 110 }}
        >
          <div className="relative" style={{ height: 110 }}>
            {[-48, -24, 0, 24, 48].map((deg, i) => (
              <div
                key={deg}
                className="absolute left-1/2 -ml-2"
                style={{
                  bottom: 0,
                  width: 16,
                  height: 86 - Math.abs(deg) / 2,
                  background: "linear-gradient(180deg, #7FA86B 0%, #5F8B54 100%)",
                  borderRadius: "50% 50% 8% 8% / 100% 100% 4% 4%",
                  transformOrigin: "50% 100%",
                  transform: `rotate(${deg}deg)`,
                  boxShadow: i % 2 ? "inset -2px 0 3px rgba(40, 70, 35, 0.35)" : "inset 2px 0 3px rgba(40, 70, 35, 0.35)",
                }}
              />
            ))}
          </div>
          <div
            className="relative mx-auto"
            style={{
              width: 68,
              height: 48,
              marginTop: -6,
              background: "linear-gradient(135deg, #C97B4A 0%, #B0653A 60%, #96522C 100%)",
              clipPath: "polygon(4% 0, 96% 0, 82% 100%, 18% 100%)",
              borderRadius: 6,
              boxShadow: "inset 0 3px 3px rgba(255, 235, 215, 0.35)",
            }}
          />
          <div
            className="mx-auto -mt-1"
            style={{ width: 84, height: 10, borderRadius: "50%", background: "rgba(74, 48, 24, 0.28)", filter: "blur(3px)" }}
          />
        </div>
      </div>
    </div>
  );
}
