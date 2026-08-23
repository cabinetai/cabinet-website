import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: "Brand & style guide",
  description: "Internal reference: brand illustrations, typefaces, and theme colors used across the Cabinet site.",
  robots: { index: false, follow: false },
};

/* ─── Brand illustration sets (auto-listed from public/brand at build) ─── */
function listAssets(dir: string): { src: string; label: string }[] {
  let files: string[] = [];
  try {
    files = readdirSync(join(process.cwd(), "public", dir))
      .filter((f) => f.endsWith(".png") || f.endsWith(".svg"))
      .sort();
  } catch {
    files = [];
  }
  return files.map((f) => ({
    src: `/${dir}/${f}`,
    label: f.replace(/\.(png|svg)$/, "").replace(/-/g, " "),
  }));
}

const LOGO_CORE: { src: string; label: string }[] = [
  { src: "/brand/cabinet-logo.png", label: "primary" },
  { src: "/brand/cabinet-logo-closed.png", label: "closed" },
  { src: "/brand/cabinet-logo-top-open.png", label: "top open" },
  { src: "/brand/cabinet-logo-bottom-open.png", label: "bottom open" },
  { src: "/brand/cabinet-logo-closed-3drawers.png", label: "three drawers" },
  { src: "/brand/cabinet-logo-face-1.png", label: "face 1" },
  { src: "/brand/cabinet-logo-face-2.png", label: "face 2" },
  { src: "/brand/cabinet-logo-face-3.png", label: "face 3" },
];

const ASSET_SECTIONS: { title: string; desc: string; items: { src: string; label: string }[] }[] = [
  { title: "Heroes", desc: "Hero illustrations for the solution and industry pages.", items: listAssets("brand/heroes") },
  { title: "Solutions", desc: "Card motifs for the “Cabinet for every team” solutions.", items: listAssets("brand/solutions") },
  { title: "Trust & security", desc: "Motifs for the “Designed to clear a security review” section.", items: listAssets("brand/trust") },
  { title: "Feature icons", desc: "The product feature grid on the homepage.", items: listAssets("brand/feat") },
  { title: "Role & industry icons", desc: "Small icons for the solutions menu and cards.", items: listAssets("brand/icons") },
  { title: "UI concept icons", desc: "General wooden icons that replace flat glyphs across the site.", items: listAssets("brand/ui") },
  {
    title: "Explorations archive",
    desc: "Every generated exploration. Each file name is its id; re-run one with its generator, for example: node scripts/generate-images.mjs <id>, node scripts/explore-styles.mjs <subject>, or node scripts/brand-states.mjs. These live in brand-explorations/ at the repo root and are symlinked into public/ for dev by scripts/link-explorations.mjs — they are deliberately not part of the production export.",
    items: listAssets("generated/_explore"),
  },
];

/* ─── Typefaces in the system ─── */
const FONTS: {
  name: string;
  className: string;
  token: string;
  use: string;
}[] = [
  {
    name: "Hero display",
    className: "font-display",
    token: "Fraunces · --font-heading / --font-display · -0.04em",
    use: "The homepage H1, quotations, and selected outcome headlines. Character used with restraint.",
  },
  {
    name: "Section heading",
    className: "font-section",
    token: "Geist 620 · --font-body · -0.045em",
    use: "H2 and H3 across marketing and product stories. Clear, compact, and fast to scan.",
  },
  {
    name: "Body",
    className: "font-body-serif",
    token: "Geist · --font-body / --font-sans · 0em",
    use: "Body copy, UI, and buttons. Uppercase eyebrows use it at 0.08em tracking.",
  },
  {
    name: "Brand",
    className: "font-brand italic",
    token: "Instrument Serif · --font-brand · weight 400 · brown gradient",
    use: "The Cabinet wordmark only. Always weight 400 and the warm brown gradient, in every context; never bold or recolored.",
  },
  {
    name: "Mono / Code",
    className: "font-code",
    token: "Geist (mono retired) · --font-mono aliases --font-body",
    use: "Terminal, code, and literal commands render in the body sans. No monospace anywhere on the site.",
  },
  {
    name: "Hand",
    className: "font-hand",
    token: "Ms Madi · --font-hand",
    use: "Signatures only (testimonial names). Decorative, low readability.",
  },
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
  {
    group: "Motif wood",
    swatches: [
      { cls: "bg-[#C9A47A]", label: "wood-tan", hex: "#C9A47A" },
      { cls: "bg-[#E8D6B6]", label: "light-wood", hex: "#E8D6B6" },
    ],
  },
  {
    // ponytail: doc-only palette, promote to CSS tokens if these ever ship in components
    group: "Color touches (file cards & agent tokens)",
    swatches: [
      { cls: "bg-[#E2725B]", label: "terracotta", hex: "#E2725B", light: true },
      { cls: "bg-[#E08A3C]", label: "amber", hex: "#E08A3C", light: true },
      { cls: "bg-[#E0B23C]", label: "gold", hex: "#E0B23C", light: true },
      { cls: "bg-[#6FA45A]", label: "leaf", hex: "#6FA45A", light: true },
      { cls: "bg-[#4FA39A]", label: "teal", hex: "#4FA39A", light: true },
      { cls: "bg-[#5B8FD6]", label: "sky", hex: "#5B8FD6", light: true },
    ],
  },
];

const PANGRAM = "The quick brown fox jumps over the lazy dog";
const GLYPHS = "ABCDEFGHIJKLM abcdefghijklm 0123456789 & ? ! @ #";

/* ─── A single asset tile ─── */
function Tile({ src, label }: { src: string; label: string }) {
  return (
    <div className="group rounded-2xl bg-gradient-to-br from-[#FBF2E4] to-[#F2E5CF] p-4 shadow-[0_12px_28px_-20px_rgba(150,108,68,0.4)]">
      <div className="flex h-28 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label}
          className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <p className="mt-3 truncate text-center font-code text-[11px] text-text-tertiary">{label}</p>
    </div>
  );
}

/* ─── Logo candidate tile: the app-icon audition (large + favicon sizes) ─── */
function LogoCandidate({ src, label }: { src: string; label: string }) {
  return (
    <div className="rounded-2xl card-skin p-5">
      <div className="flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} className="h-40 w-40 rounded-[22%] object-contain" />
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">
        {/* light chip */}
        <span className="flex items-center gap-2 rounded-xl bg-bg-warm px-2.5 py-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" className="h-16 w-16 rounded-[22%]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" className="h-8 w-8 rounded-lg" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" className="h-4 w-4 rounded" />
        </span>
        {/* dark chip */}
        <span className="flex items-center gap-2 rounded-xl bg-bg-terminal px-2.5 py-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" className="h-8 w-8 rounded-lg" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" className="h-4 w-4 rounded" />
        </span>
      </div>
      <p className="mt-3 truncate text-center font-code text-[11px] text-text-tertiary">{label}</p>
    </div>
  );
}

function AssetGrid({ items }: { items: { src: string; label: string }[] }) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((it) => (
        <Tile key={it.src} src={it.src} label={it.label} />
      ))}
    </div>
  );
}

export default function StyleGuidePage() {
  // Dev-only. This is an internal brand reference — it was `noindex` but still
  // publicly reachable, and the explorations archive it lists is 16 MB of
  // rejected studies we don't want on the CDN. Excluding the route from the
  // production export is what lets the archive stay in the page at all.
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const LOGO_NEW = listAssets("brand/logo-variations");
  const LOGO_CANDIDATES = listAssets("brand/logo-candidates");
  return (
    <main className="min-h-screen bg-bg">
      <SiteNavbar />

      {/* ─── Header ─── */}
      <section className="border-b border-border dot-grid">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="section-label mb-3">Internal reference</p>
          <h1 className="font-display text-4xl tracking-tight text-text-primary sm:text-5xl">
            Brand &amp; style guide
          </h1>
          <p className="mt-4 max-w-2xl font-body-serif text-lg leading-relaxed text-text-secondary">
            The single design page: illustrations, typefaces, color tokens, components, and
            the liquid-glass chrome. The written spec lives in docs/brand-guide.md; this page
            is the living proof. Not indexed, not linked in the nav.
          </p>
          <p className="mt-4 max-w-2xl font-body-serif text-lg leading-relaxed text-text-secondary">
            Theme: warm, owned, human. A parchment-and-brown world that feels like a calm,
            well-made workspace, not a cold SaaS dashboard. Confident and plain-spoken,
            specificity over adjectives, one primary action per view. Sage green means
            good or included. Audience: C-level and the technical leaders who vet the tool.
          </p>
        </div>
      </section>

      {/* ─── Brand illustrations ─── */}
      <section className="border-b border-border py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-section text-3xl text-text-primary">
            Brand illustrations
          </h2>
          <p className="mt-4 max-w-2xl font-body-serif text-lg leading-relaxed text-text-secondary">
            One distilled object per concept, sculpted in light maple with brushed brass and
            muted bead accents, on transparent backgrounds. Every set used across the site.
          </p>

          {/* Logo candidates: the app-icon audition */}
          <div className="mt-12">
            <div className="flex items-center gap-3">
              <p className="section-label">Logo candidates</p>
              <span className="rounded-full bg-green-bg px-2 py-0.5 font-code text-[10px] uppercase tracking-wider text-green-warm ring-1 ring-green-light/40">
                pick one
              </span>
            </div>
            <p className="mt-2 max-w-2xl font-body-serif text-sm text-text-secondary">
              Round 3: the one-drawer face (the smile is the handle, after the ref-trio and
              face-squircle explorations) in three finishes, plus Notion-language blocks
              (thick-outline dimensional cube) carrying a serif C, the drawer face, or a pure
              two-drawer front. Each shown at home-screen, favicon, and tab size on light and
              dark. Generated by{" "}
              <span className="font-code text-xs">scripts/generate-logos.mjs</span>; re-run any
              one by id.
            </p>
            {LOGO_CANDIDATES.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {LOGO_CANDIDATES.map((it) => (
                  <LogoCandidate key={it.src} src={it.src} label={it.label} />
                ))}
              </div>
            ) : (
              <p className="mt-6 font-code text-xs text-text-tertiary">
                (none yet: run GOOGLE_AI_API_KEY=... node scripts/generate-logos.mjs)
              </p>
            )}
          </div>

          {/* New logo variations */}
          <div className="mt-12">
            <div className="flex items-center gap-3">
              <p className="section-label">Logo variations</p>
              <span className="rounded-full bg-green-bg px-2 py-0.5 font-code text-[10px] uppercase tracking-wider text-green-warm ring-1 ring-green-light/40">
                new
              </span>
            </div>
            <p className="mt-2 max-w-2xl font-body-serif text-sm text-text-secondary">
              Fresh takes on the Cabinet mark in the house wooden style. Drafts for review.
            </p>
            {LOGO_NEW.length > 0 ? (
              <AssetGrid items={LOGO_NEW} />
            ) : (
              <p className="mt-6 font-code text-xs text-text-tertiary">
                (none yet. Drop PNGs in public/brand/logo-variations/)
              </p>
            )}
          </div>

          {/* Core logo set */}
          <div className="mt-12">
            <p className="section-label">Logo set</p>
            <p className="mt-2 max-w-2xl font-body-serif text-sm text-text-secondary">
              The established Cabinet mark and its open / closed / face variants.
            </p>
            <AssetGrid items={LOGO_CORE} />
          </div>

          {/* Every other asset set */}
          {ASSET_SECTIONS.map((sec) => (
            <div key={sec.title} className="mt-12">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <p className="section-label">{sec.title}</p>
                <span className="font-code text-[11px] text-text-tertiary">
                  {sec.items.length} assets
                </span>
              </div>
              <p className="mt-2 max-w-2xl font-body-serif text-sm text-text-secondary">
                {sec.desc}
              </p>
              <AssetGrid items={sec.items} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Typefaces ─── */}
      <section className="border-b border-border py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-section text-3xl text-text-primary">Typefaces</h2>
          <p className="mt-3 font-body-serif text-sm text-text-secondary">
            Auditioning a change?{" "}
            <a href="/styleguide/fonts" className="font-medium text-accent underline underline-offset-2">
              Spin the font picker
            </a>
            .
          </p>
          <div className="mt-10 space-y-5">
            {FONTS.map((f) => (
              <div key={f.name} className="rounded-2xl card-skin p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-section text-xl text-text-primary">{f.name}</h3>
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

      {/* ─── Components ─── */}
      <section className="border-b border-border bg-bg-warm py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-section text-3xl text-text-primary">Components</h2>
          <p className="mt-4 max-w-2xl font-body-serif leading-relaxed text-text-secondary">
            The canonical button, pill, and card styles. One primary action per view;
            rounded-full is the house button shape.
          </p>

          <p className="section-label mt-10 mb-4">Buttons</p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="ent-btn-primary">Download</button>
            <button className="ent-btn-secondary">Book a demo</button>
            <button className="ent-btn-ghost">Learn more</button>
          </div>

          <p className="section-label mt-10 mb-4">Pills</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="ent-pill">Accent</span>
            <span className="ent-pill-sage">Included</span>
            <span className="ent-pill-neutral">Soon</span>
          </div>

          <p className="section-label mt-10 mb-4">Cards (borderless, warm shadow)</p>
          <p className="mb-4 max-w-2xl font-body-serif text-sm text-text-secondary">
            No strong borders on content surfaces or buttons. Depth comes from warm diffuse
            shadows and background contrast. Borders remain only where they carry necessary
            structure, such as inputs and data tables.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="ent-card ent-card-hover p-6">
              <h4 className="font-section text-lg text-text-primary">Card</h4>
              <p className="mt-2 font-body-serif text-sm text-text-secondary">
                White surface, warm diffuse shadow, lifts on hover. The default.
              </p>
            </div>
            <div className="ent-card-warm p-6">
              <h4 className="font-section text-lg text-text-primary">Warm card</h4>
              <p className="mt-2 font-body-serif text-sm text-text-secondary">
                Soft cream fill on parchment. For insets and asides.
              </p>
            </div>
            <div className="ent-card-flat p-6">
              <h4 className="font-section text-lg text-text-primary">Flat card</h4>
              <p className="mt-2 font-body-serif text-sm text-text-secondary">
                Quiet warm tint, no shadow. For dense grids and secondary info.
              </p>
            </div>
          </div>

          <p className="section-label mt-10 mb-4">Eyebrows</p>
          <div className="space-y-2">
            <p className="section-label">Section label (marketing)</p>
            <p className="ent-eyebrow">Enterprise eyebrow</p>
            <p className="ent-eyebrow-muted">Muted eyebrow</p>
          </div>
        </div>
      </section>

      {/* ─── Liquid glass ─── */}
      <section className="border-b border-border py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-section text-3xl text-text-primary">Liquid glass</h2>
          <p className="mt-4 max-w-2xl font-body-serif leading-relaxed text-text-secondary">
            The site chrome: frosted floating pills with a bright specular edge, one solid
            accent pill as the single primary action. Shown here over a warm gradient so the
            frost and refraction are visible.
          </p>
          <div
            className="mt-8 flex flex-wrap items-center gap-4 rounded-3xl p-8 shadow-[0_16px_38px_-26px_rgba(150,108,68,0.3)]"
            style={{
              background:
                "linear-gradient(120deg, #f6ddba, #ecc79a 45%, #ddb78c)",
            }}
          >
            <span className="glass-pill px-5 py-2.5 text-sm font-medium text-text-primary">
              Product
            </span>
            <span className="glass-pill px-5 py-2.5 text-sm font-medium text-text-primary">
              Compare
            </span>
            <span className="glass-pill px-5 py-2.5 text-sm font-medium text-text-primary">
              Pricing
            </span>
            <button className="ent-btn-primary">Download</button>
          </div>
        </div>
      </section>

      {/* ─── Type scale ─── */}
      <section className="border-b border-border py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-section text-3xl text-text-primary">Type scale</h2>
          <p className="mt-4 max-w-2xl font-body-serif leading-relaxed text-text-secondary">
            Fraunces sets the hero and selected outcomes. Geist carries the section and card hierarchy.
          </p>
          <div className="mt-8 space-y-3">
            {[
              { cls: "text-6xl", label: "Hero 6xl", family: "font-display" },
              { cls: "text-5xl", label: "Outcome 5xl", family: "font-display" },
              { cls: "text-4xl", label: "H2 4xl", family: "font-section" },
              { cls: "text-3xl", label: "H2 3xl", family: "font-section" },
              { cls: "text-2xl", label: "H3 2xl", family: "font-section" },
              { cls: "text-xl", label: "H3 xl", family: "font-section" },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-5">
                <code className="w-24 shrink-0 font-code text-xs text-text-tertiary">{s.label}</code>
                <span className={`${s.family} ${s.cls} text-text-primary`}>
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
          <h2 className="font-section text-3xl text-text-primary">Theme colors</h2>
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
