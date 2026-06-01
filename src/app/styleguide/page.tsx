import type { Metadata } from "next";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: "Style guide — fonts & theme",
  description: "Internal reference: every typeface and theme color used across the Cabinet site.",
  robots: { index: false, follow: false },
};

/* ─── Typefaces in the system ─── */
const FONTS: {
  name: string;
  className: string;
  token: string;
  use: string;
}[] = [
  {
    name: "Display",
    className: "font-display",
    token: "Stack Sans Notch · --font-display",
    use: "Headlines and section headings. The loud voice.",
  },
  {
    name: "Body",
    className: "font-body-serif",
    token: "Inter · --font-serif / --font-sans",
    use: "Body copy and most prose. The default reading voice (currently Inter).",
  },
  {
    name: "Brand",
    className: "font-brand italic",
    token: "Instrument Serif · --font-brand",
    use: "The Cabinet wordmark and the occasional italic flourish only.",
  },
  {
    name: "Mono / Code",
    className: "font-code",
    token: "Source Code Pro · --font-mono",
    use: "Section labels, terminal, code, and small uppercase tags.",
  },
  {
    name: "Hand",
    className: "font-hand",
    token: "Ms Madi · --font-hand",
    use: "Signatures only (testimonial names). Decorative, low readability.",
  },
];

/* ─── Candidates for the hero helper line ─── */
const HELPER_LINE = "Evaluating Cabinet for your team? Book a demo";
const HELPER_CANDIDATES: { label: string; className: string; tag?: string }[] = [
  { label: "Body (Inter)", className: "font-body-serif", tag: "current" },
  { label: "Mono (Source Code Pro)", className: "font-code" },
  { label: "Display (Stack Sans)", className: "font-display" },
  { label: "Brand (Instrument Serif), italic", className: "font-brand italic" },
  { label: "Hand (Ms Madi)", className: "font-hand" },
];

/* ─── Theme color tokens ─── */
const COLOR_GROUPS: {
  group: string;
  swatches: { cls: string; label: string; hex: string; light?: boolean }[];
}[] = [
  {
    group: "Backgrounds",
    swatches: [
      { cls: "bg-bg", label: "bg", hex: "#FAF6F1" },
      { cls: "bg-bg-warm", label: "bg-warm", hex: "#F3EDE4" },
      { cls: "bg-bg-card", label: "bg-card", hex: "#FFFFFF" },
      { cls: "bg-bg-card-hover", label: "bg-card-hover", hex: "#FBF8F4" },
      { cls: "bg-bg-terminal", label: "bg-terminal", hex: "#2C2520", light: true },
    ],
  },
  {
    group: "Text",
    swatches: [
      { cls: "bg-text-primary", label: "text-primary", hex: "#3B2F2F", light: true },
      { cls: "bg-text-secondary", label: "text-secondary", hex: "#6B5B4F", light: true },
      { cls: "bg-text-tertiary", label: "text-tertiary", hex: "#A89888", light: true },
      { cls: "bg-text-muted", label: "text-muted", hex: "#D4C8BB" },
    ],
  },
  {
    group: "Accent (warm brown)",
    swatches: [
      { cls: "bg-accent", label: "accent", hex: "#8B5E3C", light: true },
      { cls: "bg-accent-light", label: "accent-light", hex: "#A0714D", light: true },
      { cls: "bg-accent-warm", label: "accent-warm", hex: "#7A4F30", light: true },
      { cls: "bg-accent-bg", label: "accent-bg", hex: "#F5E6D3" },
      { cls: "bg-accent-bg-subtle", label: "accent-bg-subtle", hex: "#FAF2EA" },
    ],
  },
  {
    group: "Green (secondary accent)",
    swatches: [
      { cls: "bg-green", label: "green", hex: "#5A7A4F", light: true },
      { cls: "bg-green-warm", label: "green-warm", hex: "#4A6A41", light: true },
      { cls: "bg-green-light", label: "green-light", hex: "#7A9A6F", light: true },
      { cls: "bg-green-bg", label: "green-bg", hex: "#E8F0E3" },
      { cls: "bg-green-bg-subtle", label: "green-bg-subtle", hex: "#F1F6EC" },
    ],
  },
  {
    group: "Borders",
    swatches: [
      { cls: "bg-border", label: "border", hex: "#E8DDD0" },
      { cls: "bg-border-light", label: "border-light", hex: "#F0E8DD" },
      { cls: "bg-border-dark", label: "border-dark", hex: "#D4C4B0" },
    ],
  },
];

const PANGRAM = "The quick brown fox jumps over the lazy dog";
const GLYPHS = "ABCDEFGHIJKLM abcdefghijklm 0123456789 & ? ! @ #";

export default function StyleGuidePage() {
  return (
    <main className="min-h-screen bg-bg">
      <SiteNavbar />

      {/* ─── Header ─── */}
      <section className="border-b border-border dot-grid">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="section-label mb-3">Internal reference</p>
          <h1 className="font-display text-4xl tracking-tight text-text-primary sm:text-5xl">
            Style guide: fonts &amp; theme
          </h1>
          <p className="mt-4 max-w-2xl font-body-serif text-lg leading-relaxed text-text-secondary">
            Every typeface and color token in the site, in one place. Use this to decide
            type and palette choices. This page is not indexed and is not linked in the nav.
          </p>
        </div>
      </section>

      {/* ─── Typefaces ─── */}
      <section className="border-b border-border py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-3xl tracking-tight text-text-primary">Typefaces</h2>
          <div className="mt-10 space-y-5">
            {FONTS.map((f) => (
              <div key={f.name} className="rounded-2xl border border-border bg-bg-card p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl text-text-primary">{f.name}</h3>
                  <code className="font-code text-xs text-text-tertiary">{f.token}</code>
                </div>
                <p className="mt-1 font-body-serif text-sm text-text-secondary">{f.use}</p>
                <p className={`${f.className} mt-5 text-4xl leading-tight text-text-primary`}>
                  {PANGRAM}
                </p>
                <p className={`${f.className} mt-3 text-lg text-text-secondary`}>{GLYPHS}</p>
                <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <span className={`${f.className} text-2xl text-text-primary`}>Aa 24</span>
                  <span className={`${f.className} text-base text-text-primary`}>Aa 16</span>
                  <span className={`${f.className} text-sm text-text-secondary`}>Aa 14</span>
                  <span className={`${f.className} text-xs text-text-tertiary`}>Aa 12</span>
                  <code className="ml-auto font-code text-xs text-text-tertiary">
                    .{f.className.split(" ")[0]}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Decide: the hero helper line ─── */}
      <section className="border-b border-border bg-bg-warm py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="section-label mb-3">Decide</p>
          <h2 className="font-display text-3xl tracking-tight text-text-primary">
            The hero helper line, in each font
          </h2>
          <p className="mt-4 max-w-2xl font-body-serif leading-relaxed text-text-secondary">
            This is the line under the install options on the homepage. It was set in Mono.
            I changed it to Body (Inter) for readability. Compare the options and tell me
            which you want, and I will set it.
          </p>
          <div className="mt-8 divide-y divide-border-light overflow-hidden rounded-2xl border border-border bg-bg-card">
            {HELPER_CANDIDATES.map((c) => (
              <div key={c.label} className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex shrink-0 items-center gap-2 sm:w-56">
                  <span className="font-code text-xs text-text-tertiary">{c.label}</span>
                  {c.tag && (
                    <span
                      className={`rounded-full px-2 py-0.5 font-code text-[10px] uppercase tracking-wider ${
                        c.tag === "new pick"
                          ? "bg-green-bg text-green-warm ring-1 ring-green-light/40"
                          : "bg-accent-bg text-accent-warm ring-1 ring-border-light"
                      }`}
                    >
                      {c.tag}
                    </span>
                  )}
                </div>
                <p className={`${c.className} text-base text-text-secondary`}>{HELPER_LINE}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Type scale ─── */}
      <section className="border-b border-border py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-3xl tracking-tight text-text-primary">Display type scale</h2>
          <p className="mt-4 max-w-2xl font-body-serif leading-relaxed text-text-secondary">
            How headings step down. All in Display unless noted.
          </p>
          <div className="mt-8 space-y-3">
            {[
              { cls: "text-6xl", label: "text-6xl" },
              { cls: "text-5xl", label: "text-5xl" },
              { cls: "text-4xl", label: "text-4xl" },
              { cls: "text-3xl", label: "text-3xl" },
              { cls: "text-2xl", label: "text-2xl" },
              { cls: "text-xl", label: "text-xl" },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-5">
                <code className="w-24 shrink-0 font-code text-xs text-text-tertiary">{s.label}</code>
                <span className={`font-display ${s.cls} tracking-tight text-text-primary`}>
                  Own your knowledge
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Theme colors ─── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-3xl tracking-tight text-text-primary">Theme colors</h2>
          <p className="mt-4 max-w-2xl font-body-serif leading-relaxed text-text-secondary">
            The warm parchment palette. Tailwind class on top, hex below.
          </p>
          <div className="mt-10 space-y-10">
            {COLOR_GROUPS.map((g) => (
              <div key={g.group}>
                <p className="section-label mb-4">{g.group}</p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {g.swatches.map((s) => (
                    <div key={s.label}>
                      <div
                        className={`flex h-20 items-end rounded-xl border border-border ${s.cls} p-2.5`}
                      >
                        <span
                          className={`font-code text-[11px] ${
                            s.light ? "text-white/85" : "text-text-secondary"
                          }`}
                        >
                          {s.hex}
                        </span>
                      </div>
                      <p className="mt-2 font-code text-xs text-text-tertiary">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
