"use client";

import { useState } from "react";

/* ── Candidate fonts (all on Google Fonts) ────────────────────────────── */

type Candidate = {
  name: string;
  css: string; // font-family value for previewing
  note: string; // short character tag shown under the active slot
  gf: string; // Google Fonts css2 family param
};

const serif = (name: string, note: string, gf?: string): Candidate => ({
  name,
  css: `'${name}', Georgia, serif`,
  note,
  gf: gf ?? `${name.replace(/ /g, "+")}:wght@400;600;700`,
});
const sans = (name: string, note: string, gf?: string): Candidate => ({
  name,
  css: `'${name}', sans-serif`,
  note,
  gf: gf ?? `${name.replace(/ /g, "+")}:wght@400;500;600;700`,
});
const mono = (name: string, note: string, gf?: string): Candidate => ({
  name,
  css: `'${name}', monospace`,
  note,
  gf: gf ?? `${name.replace(/ /g, "+")}:wght@400;600`,
});

const DISPLAY_FONTS: Candidate[] = [
  serif("Fraunces", "warm editorial · current", "Fraunces:opsz,wght@9..144,400..700"),
  serif("Instrument Serif", "the wordmark, as display", "Instrument+Serif:ital@0;1"),
  serif("Young Serif", "chunky, friendly", "Young+Serif"),
  serif("Newsreader", "newspaper editorial", "Newsreader:opsz,wght@6..72,400..700"),
  serif("Lora", "calm, bookish"),
  serif("Playfair Display", "high-fashion contrast"),
  serif("Cormorant Garamond", "elegant, light"),
  serif("EB Garamond", "classic garamond"),
  serif("Spectral", "literary screen serif"),
  serif("Crimson Pro", "warm text serif"),
  serif("DM Serif Display", "sharp contrast", "DM+Serif+Display"),
  serif("Zilla Slab", "slab, Town-like"),
  serif("Bitter", "sturdy slab"),
  serif("Roboto Slab", "neutral slab"),
  sans("Bricolage Grotesque", "characterful warm sans", "Bricolage+Grotesque:opsz,wght@12..96,400..700"),
  sans("Gabarito", "rounded, friendly"),
  sans("Familjen Grotesk", "warm grotesque"),
  sans("Sora", "geometric modern"),
  sans("Space Grotesk", "techy grotesque"),
  sans("Syne", "arty, distinctive"),
  sans("Outfit", "clean geometric"),
  sans("Archivo", "grotesque workhorse"),
  sans("Inter Tight", "Inter, display-tuned"),
  sans("Geist", "shadcn standard"),
  sans("Poppins", "geometric, popular"),
  sans("Montserrat", "wide geometric"),
];

const BODY_FONTS: Candidate[] = [
  sans("Geist", "shadcn standard · current"),
  sans("Inter", "shadcn classic"),
  sans("Figtree", "friendly, very readable"),
  sans("Hanken Grotesk", "warm humanist"),
  sans("Plus Jakarta Sans", "geometric, polished"),
  sans("Schibsted Grotesk", "editorial grotesque"),
  sans("Onest", "neutral, modern"),
  sans("Albert Sans", "geometric humanist"),
  sans("Manrope", "rounded neo-grotesque"),
  sans("Public Sans", "plain, serious"),
  sans("Wix Madefor Text", "soft, legible"),
  sans("DM Sans", "friendly geometric", "DM+Sans:opsz,wght@9..40,400..700"),
  sans("Nunito Sans", "rounded, warm", "Nunito+Sans:opsz,wght@6..12,400..700"),
  sans("Source Sans 3", "workhorse humanist"),
  sans("IBM Plex Sans", "engineered humanist"),
  sans("Work Sans", "optical grotesque"),
  sans("Karla", "quirky grotesque"),
  sans("Mulish", "minimal humanist"),
  sans("Rubik", "soft corners"),
  sans("Urbanist", "elegant geometric"),
  sans("Open Sans", "safe classic"),
  sans("Roboto", "android classic"),
  sans("Lato", "friendly classic"),
  sans("Noto Sans", "global coverage"),
  sans("Instrument Sans", "previous"),
];

const LABEL_FONTS: Candidate[] = [
  sans("Geist", "shadcn standard · current"),
  sans("Instrument Sans", "previous"),
  sans("Inter", "shadcn classic"),
  sans("Jost", "geometric, spaced caps"),
  sans("Space Grotesk", "techy caps"),
  sans("Archivo", "sturdy caps"),
  sans("Barlow", "slightly condensed"),
  sans("Oswald", "condensed classic"),
  sans("Sora", "geometric modern"),
  sans("Manrope", "rounded caps"),
  sans("IBM Plex Sans", "engineered"),
  sans("DM Sans", "friendly geometric", "DM+Sans:opsz,wght@9..40,400..700"),
  sans("Outfit", "clean geometric"),
  sans("Karla", "quirky caps"),
];

const MONO_FONTS: Candidate[] = [
  mono("Martian Mono", "wide, sturdy · current", "Martian+Mono:wght@400;600"),
  mono("Source Code Pro", "previous"),
  mono("Geist Mono", "shadcn standard"),
  mono("JetBrains Mono", "IDE favorite"),
  mono("Fira Code", "ligature classic"),
  mono("IBM Plex Mono", "engineered"),
  mono("Roboto Mono", "neutral"),
  mono("DM Mono", "compact, stylish", "DM+Mono:wght@400;500"),
  mono("Space Mono", "retro character"),
  mono("Inconsolata", "humanist mono"),
  mono("Spline Sans Mono", "soft modern"),
  mono("Red Hat Mono", "open, round"),
];

const ALL_FONTS = [...DISPLAY_FONTS, ...BODY_FONTS, ...LABEL_FONTS, ...MONO_FONTS];
const GOOGLE_CSS =
  "https://fonts.googleapis.com/css2?" +
  Array.from(new Set(ALL_FONTS.map((f) => `family=${f.gf}`))).join("&") +
  "&display=swap";

/* ── Casino reel ──────────────────────────────────────────────────────── */

const ITEM_H = 52;

function Reel({
  label,
  options,
  index,
  onChange,
  tracking,
  onTracking,
  trackMin = -0.06,
  trackMax = 0.1,
  trackStep = 0.005,
}: {
  label: string;
  options: Candidate[];
  index: number;
  onChange: (i: number) => void;
  tracking: number;
  onTracking: (v: number) => void;
  trackMin?: number;
  trackMax?: number;
  trackStep?: number;
}) {
  const n = options.length;
  const spin = (dir: 1 | -1) => onChange((index + dir + n) % n);

  return (
    <div className="flex w-64 flex-col items-center gap-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">{label}</p>
      <button
        type="button"
        onClick={() => spin(-1)}
        aria-label={`Previous ${label} font`}
        className="w-full rounded-full card-skin py-1 text-text-secondary transition-all hover:-translate-y-px hover:text-accent"
      >
        ▲
      </button>

      <div
        className="relative w-full overflow-hidden rounded-2xl card-skin"
        style={{ height: ITEM_H * 5 }}
      >
        <div
          className="pointer-events-none absolute inset-x-2 rounded-xl bg-accent-bg-subtle ring-1 ring-accent/25"
          style={{ top: ITEM_H * 2, height: ITEM_H }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-white to-transparent" />

        {options.map((f, i) => {
          // circular distance from the active item, in [-n/2, n/2)
          let d = (i - index + n) % n;
          if (d > n / 2) d -= n;
          const visible = Math.abs(d) <= 2;
          return (
            <button
              key={f.name}
              type="button"
              onClick={() => onChange(i)}
              className="absolute inset-x-0 flex flex-col items-center justify-center transition-all duration-300 ease-out"
              style={{
                height: ITEM_H,
                top: ITEM_H * 2,
                transform: `translateY(${d * ITEM_H}px) scale(${d === 0 ? 1 : 0.85})`,
                opacity: visible ? (d === 0 ? 1 : 0.4) : 0,
                pointerEvents: visible ? "auto" : "none",
              }}
            >
              <span
                className={d === 0 ? "text-lg text-text-primary" : "text-sm text-text-secondary"}
                style={{ fontFamily: f.css, fontWeight: 600 }}
              >
                {f.name}
              </span>
              {d === 0 && (
                <span className="text-[10px] uppercase tracking-wider text-text-tertiary">
                  {f.note}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => spin(1)}
        aria-label={`Next ${label} font`}
        className="w-full rounded-full card-skin py-1 text-text-secondary transition-all hover:translate-y-px hover:text-accent"
      >
        ▼
      </button>

      <label className="mt-2 w-full">
        <span className="flex items-center justify-between text-[10px] uppercase tracking-wider text-text-tertiary">
          <span>Letter spacing</span>
          <span className="font-code">{tracking.toFixed(3)}em</span>
        </span>
        <input
          type="range"
          min={trackMin}
          max={trackMax}
          step={trackStep}
          value={tracking}
          onChange={(e) => onTracking(Number(e.target.value))}
          className="mt-1 w-full accent-[#8B5E3C]"
          aria-label={`${label} letter spacing`}
        />
      </label>
      <span className="text-[10px] text-text-tertiary">{index + 1} / {n}</span>
    </div>
  );
}

/* ── Live preview (mirrors the real site surfaces) ────────────────────── */

type Pick_ = { font: Candidate; tracking: number };

function Preview({
  display,
  body,
  label,
  code,
}: {
  display: Pick_;
  body: Pick_;
  label: Pick_;
  code: Pick_;
}) {
  const team = [
    { slug: "sales", label: "Sales" },
    { slug: "marketing", label: "Marketing" },
    { slug: "engineering", label: "Engineering" },
  ];
  const bodyStyle = { fontFamily: body.font.css, letterSpacing: `${body.tracking}em` };
  const displayStyle = {
    fontFamily: display.font.css,
    fontWeight: 600,
    letterSpacing: `${display.tracking}em`,
  };
  const codeStyle = { fontFamily: code.font.css, letterSpacing: `${code.tracking}em` };
  const labelStyle = { fontFamily: label.font.css, letterSpacing: `${label.tracking}em` };

  return (
    <div className="min-w-0 flex-1 space-y-6" style={bodyStyle}>
      {/* Hero */}
      <div className="rounded-3xl card-skin p-8">
        <p className="text-[11px] font-medium uppercase text-accent" style={labelStyle}>
          Free and open source · Self-hosted
        </p>
        <h1 className="mt-3 text-4xl leading-[1.08] text-text-primary md:text-5xl" style={displayStyle}>
          Your company&apos;s brain. A team of AI agents inside.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
          Every file and doc in one place, live dashboards instead of static pages, and agents
          that answer, draft, and run your recurring work. On your machines, with the AI
          accounts you already pay for.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="ent-btn-primary" style={bodyStyle}>Download for free</span>
          <span className="ent-btn-secondary" style={bodyStyle}>Book a demo</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Dropdown mock */}
        <div className="rounded-3xl card-skin p-5">
          <p className="px-2 pb-1 text-[11px] font-medium uppercase text-text-tertiary" style={labelStyle}>
            By team
          </p>
          {team.map((s) => (
            <div key={s.slug} className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-bg-warm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/brand/icons/${s.slug}.png`} alt="" className="h-9 w-9 object-contain" />
              <span className="text-sm font-semibold text-text-primary">{s.label}</span>
              <span className="ml-auto text-xs font-medium text-accent">→</span>
            </div>
          ))}
          <div className="mt-1 border-t border-border-light px-2 pt-2 text-xs font-medium text-accent">
            Every team →
          </div>
        </div>

        {/* Terminal / code mock (Mono) */}
        <div className="terminal-chrome flex flex-col p-5 text-[13px] leading-relaxed" style={codeStyle}>
          <p className="text-[#A89888]"># clone a cabinet and start the agents</p>
          <p className="mt-1 text-[#E8D6B6]">$ npx cabinetai clone meeting-memory</p>
          <p className="text-[#7A9A6F]">✓ 2 agents · 1 job · knowledge tree ready</p>
          <p className="mt-1 text-[#E8D6B6]">$ npx cabinetai run</p>
          <p className="text-[#A89888]">agents online: notetaker, archivist_01</p>
          <p className="mt-3 text-[#A89888]">{"{ \"model\": \"claude-fable-5\", \"jobs\": 4 }"}</p>
        </div>
      </div>

      {/* Section sample */}
      <div className="rounded-3xl card-skin-warm p-8">
        <p className="text-[11px] font-medium uppercase text-accent" style={labelStyle}>Why Cabinet</p>
        <h2 className="mt-2 text-2xl text-text-primary" style={displayStyle}>
          The only AI workspace you actually own
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">
          Search tools find. Chatbots answer. Cabinet does the work: on your files, your models,
          your infrastructure. Notion keeps your data in their cloud. Cabinet keeps it as files
          you own, in Markdown you can <span className="rounded bg-bg px-1" style={codeStyle}>grep</span>{" "}
          and <span className="rounded bg-bg px-1" style={codeStyle}>git</span>. 0123456789 · $1,250.00
        </p>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export function FontPicker() {
  const [di, setDi] = useState(0);
  const [bi, setBi] = useState(0);
  const [li, setLi] = useState(0);
  const [mi, setMi] = useState(0);
  const [dTrack, setDTrack] = useState(-0.04);
  const [bTrack, setBTrack] = useState(0);
  const [lTrack, setLTrack] = useState(0.08);
  const [mTrack, setMTrack] = useState(0);

  return (
    <main className="min-h-screen bg-bg">
      <link rel="stylesheet" href={GOOGLE_CSS} precedence="default" />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-accent">
          Internal tool
        </p>
        <h1 className="font-display mt-2 text-3xl tracking-tight text-text-primary">Font picker</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">
          Four reels: Display, Body, Label (the uppercase tags and eyebrows), and Mono. Spin,
          click a name to jump, and tune letter spacing per role. When a combination wins,
          send the readout line to Claude and it wires everything into the site.
        </p>

        <div className="mt-8 flex flex-wrap items-start justify-center gap-6">
          <Reel label="Display" options={DISPLAY_FONTS} index={di} onChange={setDi} tracking={dTrack} onTracking={setDTrack} />
          <Reel label="Body" options={BODY_FONTS} index={bi} onChange={setBi} tracking={bTrack} onTracking={setBTrack} />
          <Reel label="Label / Tags" options={LABEL_FONTS} index={li} onChange={setLi} tracking={lTrack} onTracking={setLTrack} trackMin={0} trackMax={0.35} trackStep={0.01} />
          <Reel label="Mono / Code" options={MONO_FONTS} index={mi} onChange={setMi} tracking={mTrack} onTracking={setMTrack} />
        </div>

        <div className="mt-10">
          <Preview
            display={{ font: DISPLAY_FONTS[di], tracking: dTrack }}
            body={{ font: BODY_FONTS[bi], tracking: bTrack }}
            label={{ font: LABEL_FONTS[li], tracking: lTrack }}
            code={{ font: MONO_FONTS[mi], tracking: mTrack }}
          />
        </div>

        <div className="mt-10 rounded-2xl card-skin px-6 py-4 font-code text-sm text-text-secondary">
          display = {DISPLAY_FONTS[di].name} ({dTrack.toFixed(3)}em) · body = {BODY_FONTS[bi].name} (
          {bTrack.toFixed(3)}em) · label = {LABEL_FONTS[li].name} ({lTrack.toFixed(2)}em) · mono ={" "}
          {MONO_FONTS[mi].name} ({mTrack.toFixed(3)}em)
        </div>
      </div>
    </main>
  );
}
