"use client";

import { useState } from "react";

/* ── Candidate fonts (all on Google Fonts) ────────────────────────────── */

type Candidate = { name: string; css: string; note: string };

const DISPLAY_FONTS: Candidate[] = [
  { name: "Fraunces", css: "'Fraunces', Georgia, serif", note: "warm editorial serif · current" },
  { name: "Bricolage Grotesque", css: "'Bricolage Grotesque', sans-serif", note: "characterful warm sans" },
  { name: "Gabarito", css: "'Gabarito', sans-serif", note: "rounded friendly sans" },
  { name: "Familjen Grotesk", css: "'Familjen Grotesk', sans-serif", note: "warm grotesque" },
  { name: "Sora", css: "'Sora', sans-serif", note: "geometric modern" },
  { name: "Space Grotesk", css: "'Space Grotesk', sans-serif", note: "techy grotesque" },
  { name: "Newsreader", css: "'Newsreader', Georgia, serif", note: "editorial serif" },
  { name: "Lora", css: "'Lora', Georgia, serif", note: "calm bookish serif" },
  { name: "Zilla Slab", css: "'Zilla Slab', Georgia, serif", note: "slab, Town-like" },
  { name: "DM Serif Display", css: "'DM Serif Display', Georgia, serif", note: "high-contrast serif" },
];

const BODY_FONTS: Candidate[] = [
  { name: "Figtree", css: "'Figtree', sans-serif", note: "friendly, very readable" },
  { name: "Hanken Grotesk", css: "'Hanken Grotesk', sans-serif", note: "warm humanist" },
  { name: "Plus Jakarta Sans", css: "'Plus Jakarta Sans', sans-serif", note: "geometric, polished" },
  { name: "Schibsted Grotesk", css: "'Schibsted Grotesk', sans-serif", note: "editorial grotesque" },
  { name: "Onest", css: "'Onest', sans-serif", note: "neutral, modern" },
  { name: "Albert Sans", css: "'Albert Sans', sans-serif", note: "geometric humanist" },
  { name: "Manrope", css: "'Manrope', sans-serif", note: "rounded neo-grotesque" },
  { name: "Public Sans", css: "'Public Sans', sans-serif", note: "plain, serious" },
  { name: "Wix Madefor Text", css: "'Wix Madefor Text', sans-serif", note: "soft, legible" },
  { name: "Instrument Sans", css: "'Instrument Sans', sans-serif", note: "current" },
];

const GOOGLE_CSS =
  "https://fonts.googleapis.com/css2?" +
  [
    "family=Fraunces:opsz,wght@9..144,400..700",
    "family=Bricolage+Grotesque:opsz,wght@12..96,400..700",
    "family=Gabarito:wght@400..700",
    "family=Familjen+Grotesk:wght@400..700",
    "family=Sora:wght@400..700",
    "family=Space+Grotesk:wght@400..700",
    "family=Newsreader:opsz,wght@6..72,400..700",
    "family=Lora:wght@400..700",
    "family=Zilla+Slab:wght@400;500;600;700",
    "family=DM+Serif+Display",
    "family=Figtree:wght@400..700",
    "family=Hanken+Grotesk:wght@400..700",
    "family=Plus+Jakarta+Sans:wght@400..700",
    "family=Schibsted+Grotesk:wght@400..700",
    "family=Onest:wght@400..700",
    "family=Albert+Sans:wght@400..700",
    "family=Manrope:wght@400..700",
    "family=Public+Sans:wght@400..700",
    "family=Wix+Madefor+Text:wght@400..700",
    "family=Instrument+Sans:wght@400..700",
  ].join("&") +
  "&display=swap";

/* ── Casino reel ──────────────────────────────────────────────────────── */

const ITEM_H = 56;

function Reel({
  label,
  options,
  index,
  onChange,
}: {
  label: string;
  options: Candidate[];
  index: number;
  onChange: (i: number) => void;
}) {
  const n = options.length;
  const spin = (dir: 1 | -1) => onChange((index + dir + n) % n);

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{label}</p>
      <button
        type="button"
        onClick={() => spin(-1)}
        aria-label={`Previous ${label} font`}
        className="rounded-full card-skin px-4 py-1 text-text-secondary transition-colors hover:border-accent hover:text-accent"
      >
        ▲
      </button>

      <div
        className="relative w-64 overflow-hidden rounded-2xl card-skin"
        style={{ height: ITEM_H * 5 }}
      >
        {/* center highlight */}
        <div
          className="pointer-events-none absolute inset-x-2 rounded-xl bg-accent-bg-subtle ring-1 ring-accent/25"
          style={{ top: ITEM_H * 2, height: ITEM_H }}
        />
        {/* fade masks */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-14 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 bg-gradient-to-t from-white to-transparent" />

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
                transform: `translateY(${d * ITEM_H}px) scale(${d === 0 ? 1 : 0.86})`,
                opacity: visible ? (d === 0 ? 1 : 0.45) : 0,
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
                <span className="text-[10px] uppercase tracking-wider text-text-tertiary">{f.note}</span>
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => spin(1)}
        aria-label={`Next ${label} font`}
        className="rounded-full card-skin px-4 py-1 text-text-secondary transition-colors hover:border-accent hover:text-accent"
      >
        ▼
      </button>
    </div>
  );
}

/* ── Live preview (mirrors the real site surfaces) ────────────────────── */

function Preview({ display, body }: { display: Candidate; body: Candidate }) {
  const team = [
    { slug: "sales", label: "Sales" },
    { slug: "marketing", label: "Marketing" },
    { slug: "engineering", label: "Engineering" },
  ];
  return (
    <div className="min-w-0 flex-1 space-y-6" style={{ fontFamily: body.css }}>
      {/* Hero */}
      <div className="rounded-3xl card-skin p-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
          Free and open source · Self-hosted · MIT
        </p>
        <h1
          className="mt-3 text-4xl leading-[1.08] text-text-primary md:text-5xl"
          style={{ fontFamily: display.css, fontWeight: 600, letterSpacing: "-0.01em" }}
        >
          Your company&apos;s brain. A team of AI agents inside.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
          Every file and doc in one place, live dashboards instead of static pages, and agents
          that answer, draft, and run your recurring work. On your machines, with the AI
          accounts you already pay for.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="ent-btn-primary">Download for free</span>
          <span className="ent-btn-secondary">Book a demo</span>
        </div>
      </div>

      {/* Dropdown mock (the surface from the screenshot) */}
      <div className="rounded-3xl card-skin p-5">
        <p className="px-2 pb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-text-tertiary">
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

      {/* Section sample */}
      <div className="rounded-3xl card-skin-warm p-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent">Why Cabinet</p>
        <h2
          className="mt-2 text-2xl text-text-primary"
          style={{ fontFamily: display.css, fontWeight: 600 }}
        >
          The only AI workspace you actually own
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">
          Search tools find. Chatbots answer. Cabinet does the work: on your files, your models,
          your infrastructure. Notion keeps your data in their cloud. Cabinet keeps it as files
          you own, in Markdown you can grep and git. 0123456789 · AA aa · $1,250.00
        </p>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export function FontPicker() {
  const [di, setDi] = useState(0);
  const [bi, setBi] = useState(0);

  return (
    <main className="min-h-screen bg-bg">
      <link rel="stylesheet" href={GOOGLE_CSS} precedence="default" />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
          Internal tool
        </p>
        <h1 className="font-display mt-2 text-3xl tracking-tight text-text-primary">
          Font picker
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">
          Spin each reel (or click a name) and watch the preview re-render. When a combination
          wins, tell Claude the two names and it wires them into the site.
        </p>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row">
          <div className="flex shrink-0 items-start justify-center gap-6">
            <Reel label="Display" options={DISPLAY_FONTS} index={di} onChange={setDi} />
            <Reel label="Body" options={BODY_FONTS} index={bi} onChange={setBi} />
          </div>
          <Preview display={DISPLAY_FONTS[di]} body={BODY_FONTS[bi]} />
        </div>

        <div className="mt-10 rounded-2xl card-skin px-6 py-4 font-code text-sm text-text-secondary">
          display = {DISPLAY_FONTS[di].name} · body = {BODY_FONTS[bi].name}
        </div>
      </div>
    </main>
  );
}
