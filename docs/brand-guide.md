# Cabinet Brand & Style Guide

**Owner:** Brand / Design
**Surface:** runcabinet.com (marketing site) and all outward-facing material
**Status:** v1, codifies the existing identity in code
**Last updated:** 2026-06-13

---

## 0. How to use this document

This is the single source of truth for how Cabinet looks, sounds, and feels. It describes the identity that already lives in the codebase (`src/app/globals.css`, `src/app/layout.tsx`, the component library) so design and copy decisions stay consistent as the site scales.

Two rules of engagement:

1. **The code is canonical.** Tokens here mirror the CSS variables in `globals.css`. If you change one, change both, in the same commit.
2. **No invention without intent.** New colors, fonts, shadows, or button styles are a brand decision, not a per-page convenience. Add them here first.

Note on this file: it deliberately contains zero em dashes and no dashes used as sentence breaks, because that is the house rule (see §3). Treat it as a worked example of the writing standard.

---

## 1. Brand foundation

### What Cabinet is

Cabinet is an AI-first knowledge base and operating system for a company's work. It surfaces your **entire** knowledge base and files in one place you can see and navigate, it **visualizes web apps** so your knowledge renders as interactive views and dashboards rather than static text, and it lets you **share and collaborate** with colleagues. Underneath, it stays local-first and own-your-data: your work lives as files on disk you can grep, git, and back up, with AI agents that read and write those files directly, self-hosted by default.

### What Cabinet is NOT (positioning guardrails)

- **Do not** reduce Cabinet to "a folder of Markdown files." That is one true property, not the product. The product is the place that shows your whole KB and files, visualizes apps, and lets a team work together.
- **Do not** position it as a note-taking app, a wiki, or a chatbot wrapper. It is an operating layer: knowledge, agents, and apps in one owned environment.
- **Do not** lean on lock-in fear alone. Lead with capability (a team of agents, live dashboards, collaboration), then reinforce ownership as the reason it is safe to adopt.

### The wedge (the four claims every page should reinforce)

1. **You own your data.** Files on disk, no vendor database, no export request, no lock-in.
2. **Bring your own AI.** Use the model accounts you already pay for. No second subscription, no per-seat AI tax.
3. **Self-hosted by default.** It runs in infrastructure you control. The only thing that leaves is a cloud-model call you explicitly invoke.
4. **One place for knowledge, agents, and apps.** Author and own, not just search; agents on a schedule; embedded apps and a terminal.

### Founder and company

Built by Hila Shmuel (ex-Apple, AI & Data Infrastructure). Legal entity: HOLY BIBLE APPS LTD. Open source, MIT licensed.

---

## 2. Audience

Primary readers are C-level executives, VPs, and decision-makers in organizations, plus the technical leaders who vet the tool. They are time-poor, skeptical of vendor hype, and credibility-driven. Two mindsets recur:

- **The operator** who wants leverage: "run like a company five times your size before you hire for it."
- **The custodian** who wants control: data ownership, security, compliance, auditability.

Every page should respect their time (one idea per section, verdict-first), and earn trust with specifics rather than adjectives.

---

## 3. Voice & tone

The standard: every word reads as if a credible human professional wrote it, not an AI. Tone is professional, direct, and confident, the way a respected operator or founder speaks to a buyer.

### Hard rules

1. **Never use em dashes (`—`).** They are an AI tell and cost credibility. Use a period, comma, colon, parentheses, or rewrite. This also covers en dashes used as sentence breaks. Reserve dashes only for genuine numeric ranges, and even there prefer "to" (for example, "5 to 10%").
2. **No AI-tell filler.** Ban "in today's fast-paced world," "unlock / unleash / elevate / supercharge," and "it's not just X, it's Y." No hedging throat-clearing.
3. **Be concrete.** "Markdown files in a folder you can `grep` and `git`" beats "powerful, flexible knowledge management." Specificity beats adjectives.
4. **Short, plain sentences** over clever ones.
5. **No invented numbers.** No "10,000+ teams," no fake review scores, no made-up time savings. Use only real proof: live GitHub stars, MIT / open source, self-hosted, and press we actually have. Tag anything illustrative as "Illustrative."
6. **Be fair to competitors.** Credit their strengths and include honest "when they are the better choice" framing. Fairness is what makes the rest believable.

### Capitalization and naming (standardize)

- Product: **Cabinet**. Hosted tier: **Cabinet Cloud** (not "Cloud tier" or "hosted version").
- Feature concept: **Bring your own AI**. Short form **BYOAI** only after the long form has appeared, or in dense UI.
- Legal entity: write it one way everywhere. **Recommended:** "Holy Bible Apps Ltd" in prose, reserve all caps only if a legal notice demands it. (Today the homepage footer uses all caps and the enterprise footer uses title case. Pick one. See §13.)

### Micro-examples

- Yes: "Notion keeps your data in their cloud. Cabinet keeps it as files you own."
- No: "Cabinet unlocks a powerful, flexible, next-generation knowledge experience."

---

## 4. Logo & wordmark

Assets (existing, do not redraw):

- **Brand mark (illustration):** `public/brand/cabinet-logo.png` (master, transparent) and `public/brand/cabinet-logo-512.png` (web-optimized). The signature 3D cabinet in light tan wood: colorful file tabs in the top drawer stand for your files and knowledge, glowing tokens in the lower drawer stand for the AI agents. Use on a transparent background at larger sizes (hero, OG, feature lockups, app tile). Do not use below ~96px, the detail is lost; use the simple icon below for small nav/favicon contexts. Produced and background-cleaned with `scripts/cutout-checker.mjs`.
  - **Drawer-state variants** (same mark, for storytelling and animation): `cabinet-logo-closed`, `cabinet-logo-top-open` (files), `cabinet-logo-bottom-open` (agents), and the default `cabinet-logo` (both open), each with a `-512` web version. Regenerate with `scripts/brand-states.mjs`. Each state also has a horizontally flipped (`-flip`) version (made with `magick -flop`) for left/right layouts. There is also a closed 3-drawer alt (`cabinet-logo-closed-3drawers`) and a playful **smiley** set (`cabinet-logo-face-1/2/3`) where each drawer's two holes are eyes and the gold handle is a smile, in 1, 2, and 3 drawers. For UI, favicon and print, use the **vector logo** `cabinet-logo-smile.svg` (a flat, scalable version of the 2-drawer smiley with perfectly even drawers). Preview everything explored this session at `public/style-lab.html`.
- **App icon / mark:** `public/cabinet-icon.png` (also `src/app/icon.png`). Used in the navbar and favicons. Render with rounded corners (`rounded-lg` at small sizes).
- **Full logo:** `public/Cabinet.png`.
- **Wordmark in type:** the word "Cabinet" set in the brand serif (Instrument Serif), italic, tight tracking. This is the canonical lockup in the navbars:
  `font-brand italic tracking-tight`.

### Rules

- **Clear space:** keep at least the height of the "C" of clear space around the lockup.
- **Minimum size:** icon no smaller than 24px; wordmark legible at 16px.
- **Pairing:** in the main nav, the icon sits left of the italic wordmark with a small gap. In the enterprise nav, the wordmark may carry a small uppercase "Enterprise" badge.
- **Do not:** recolor the mark, add effects, stretch, rotate, place on low-contrast backgrounds, or substitute a different font for the wordmark.
- **On glass:** the logo sits inside a `glass-pill` in the main nav. Keep the icon and wordmark on the content layer (above the refraction), never tinted by it.

---

## 5. Color system

Cabinet's palette is a warm, parchment-and-brown identity with a sage-green secondary. It reads calm, premium, and human, which is the opposite of the cold blue SaaS default. The site is **light only** today (no dark mode).

All values mirror `:root` in `src/app/globals.css`. Use the Tailwind theme tokens (for example `bg-bg-warm`, `text-text-secondary`, `text-accent`) rather than raw hex.

### 5.1 Core palette

| Role | Token | Hex | Use |
|---|---|---|---|
| Page background | `--bg` / `bg-bg` | `#FAF6F1` | Default page canvas (warm parchment) |
| Warm background | `--bg-warm` / `bg-bg-warm` | `#F3EDE4` | Alternating sections, insets |
| Card surface | `--bg-card` | `#FFFFFF` | Cards, panels |
| Card hover | `--bg-card-hover` | `#FBF8F4` | Hover state on surfaces |
| Terminal | `--bg-terminal` | `#2C2520` | Dark terminal / code demos |
| Text primary | `--text-primary` | `#3B2F2F` | Headlines, key text (rich brown) |
| Text secondary | `--text-secondary` | `#6B5B4F` | Body copy |
| Text tertiary | `--text-tertiary` | `#A89888` | Captions, supporting info |
| Text muted | `--text-muted` | `#D4C8BB` | Very subtle text, "no" cells |

### 5.2 Accent (warm brown) and secondary (sage green)

| Role | Token | Hex | Use |
|---|---|---|---|
| Accent | `--accent` | `#8B5E3C` | Primary CTAs, links, emphasis |
| Accent light | `--accent-light` | `#A0714D` | Gradients, hovers |
| Accent warm | `--accent-warm` | `#7A4F30` | CTA hover |
| Accent bg | `--accent-bg` | `#F5E6D3` | Tinted backgrounds for accent elements |
| Accent bg subtle | `--accent-bg-subtle` | `#FAF2EA` | Faint accent wash |
| Green | `--green` | `#5A7A4F` | Success, "included," "Cabinet wins" |
| Green warm | `--green-warm` | `#4A6A41` | Green hover |
| Green light | `--green-light` | `#7A9A6F` | Subtle green |
| Green bg | `--green-bg` | `#E8F0E3` | Green tinted background |
| Green bg subtle | `--green-bg-subtle` | `#F1F6EC` | Faint green wash |

### 5.3 Borders

| Token | Hex | Use |
|---|---|---|
| `--border` | `#E8DDD0` | Default hairlines |
| `--border-light` | `#F0E8DD` | Faint dividers |
| `--border-dark` | `#D4C4B0` | Hover / emphasis borders |

### 5.4 Principle accent set (illustrative color coding)

Used to give each of the six brand principles its own identity (see `principles-showcase.tsx`). Use these only as a coded accent set, never as general UI colors:

amber, violet, blue, emerald, rose, slate (Tailwind `*-600` for text/icons, `*-100/200` for fills). Slate is reserved for "Self-hosted" so it does not collide with emerald ("KISS"). Keep these distinct: do not introduce two members of the same hue family.

### 5.5 Semantic usage

- **Primary action:** accent brown fill, white text. One per view.
- **Positive / included / "Cabinet wins":** sage green.
- **Neutral / competitor "no":** `text-muted` plus an icon, never color alone.
- **Gradient text:** the warm brand gradient (`.gradient-text`, brown to amber) for a single hero emphasis word, not whole paragraphs.

### 5.6 Do / Don't

- Do keep the page warm. White is for cards, not full pages.
- Do reserve green strictly for positive meaning.
- Don't introduce cold blues or generic SaaS gradients.
- Don't hardcode hex in components. The Discord blue (`#5865F2`) is the one allowed brand-external color and should live as a single token, not be retyped per page.

### 5.7 Contrast

Target WCAG AA (4.5:1 for body text, 3:1 for large text and UI). Two known watch points to verify per use:

- `--text-tertiary` (`#A89888`) on white can be borderline for small text. Use it for large or non-essential text only.
- White small text on `--accent` (`#8B5E3C`): verify at the exact size; bump weight or size if needed.

---

## 6. Typography

Five typefaces, each with one job. Loaded in `src/app/layout.tsx` via `next/font`.

| Role | Family | Token / class | Use |
|---|---|---|---|
| Display | Stack Sans Notch | `--font-display`, `.font-display`, `.ent-display-1/2/3` | Headlines, hero type. Optical sizing, weight ~600, tight tracking |
| Body / UI sans | Inter | `--font-inter` (theme `--font-sans`) | Body copy, nav, buttons, most UI |
| Brand wordmark | Instrument Serif (italic) | `--font-brand`, `.font-brand` | The "Cabinet" wordmark only |
| Labels / eyebrows | Jost (500) | `.section-label` (to migrate) | Uppercase, letter-spaced eyebrows |
| Code / mono | Source Code Pro | `--font-mono`, `.font-code` | Code, terminal, literal commands |
| Handwriting | Ms Madi | `--font-hand`, `.font-hand` | Testimonial signatures only |

### Type roles in practice

- **Eyebrow / section label:** set in **Jost, weight 500**, uppercase, letter-spaced (~0.16em), accent color. Labels are kept **separate from code**: Source Code Pro is reserved for code, terminal, and literal commands only, never for eyebrows. (Migrate the old `.section-label` mono eyebrows and the `.ent-eyebrow` sans eyebrows to this Jost label.)
- **Headlines:** `.font-display` or the `.ent-display-*` scale (`clamp()`-based, responsive).
- **Lead paragraph:** `.ent-lead`.
- **Body prose:** Inter at comfortable measure (max ~70 characters).
- **Gradient emphasis:** `.gradient-text` on one word, sparingly.

### Known caveat to fix (do not propagate)

`.font-body-serif` and the theme `--font-serif` currently both resolve to **Inter**, so "serif body" is not actually serif anywhere. Decide one of: (a) rename to `.font-body` and drop the "serif" implication, or (b) load a real serif and apply it intentionally. Until resolved, treat body copy as Inter and do not describe it as serif in design specs. Tracked in the PRD.

---

## 7. Design language: Liquid Glass

Liquid glass is Cabinet's signature chrome. It is how the navigation and floating surfaces feel: frosted, light, and alive, with real refraction of the content moving beneath. It evokes a premium, Apple-grade surface that matches the warm palette rather than a flat SaaS bar.

### The system (in `globals.css` + `liquid-glass-filter.tsx`)

| Class | What it is | Where to use |
|---|---|---|
| `.glass-pill` | A single floating glass button (rounded-full, blur + saturate, specular rim, soft shadow, hover lift) | Nav buttons, logo, secondary actions |
| `.liquid-glass` | A glass bar surface (frost + specular edges + scroll transition) | Frosted bars (enterprise nav today) |
| `.liquid-glass--top` | Lighter resting state at the top of the page | Paired with `.liquid-glass` over a hero |
| `.liquid-glass__refract` | Absolute child that bends the backdrop via the shared SVG filter | Inside any glass surface that should refract |
| `.liquid-glass-panel` | Higher-opacity glass for panels carrying small text | Dropdowns, mobile drawers |
| `#liquid-glass-filter` | Shared SVG `feTurbulence` + `feDisplacementMap`, rendered once in the root layout | Referenced by `.liquid-glass__refract` |

### Principles

- **The main menu is buttons, not a bar.** Each nav section is its own floating `glass-pill` on a transparent track. The primary action (Download) stays a solid accent pill so it leads.
- **Content rides above the glass.** Put labels and icons on a `relative z-10` layer; the refraction layer sits behind them and never tints text.
- **Legibility first.** Use `.liquid-glass-panel` (more opaque) anywhere small text sits on glass.
- **Graceful fallback.** Where `backdrop-filter: url()` is unsupported, the refraction layer simply disappears and the frosted base remains. Never let the base depend on the filter.
- **Reduced motion.** Refraction is dropped and lifts are disabled under `prefers-reduced-motion`.

### Consistency target

The main nav, the enterprise nav, dropdowns, and drawers should read as one glass family. Today the main nav uses floating pills and the enterprise nav uses a frosted bar; unify the language (see PRD).

---

## 8. Components & surfaces

Reuse these. Do not hand-roll new variants without adding them here.

### Buttons

| Style | Class / pattern | Use |
|---|---|---|
| Primary | `.ent-btn-primary` (rounded-full, accent fill, inset highlight) | The one main action per view |
| Secondary | `.ent-btn-secondary` (white, dark border) | Considered path (Book a demo) |
| Ghost | `.ent-btn-ghost` | Low-emphasis inline action |
| Glass pill | `.glass-pill` + refract child | Nav and floating actions |

Convention to standardize: **rounded-full** is the house button shape (enterprise system). Marketing pages that still use `rounded-xl` buttons should migrate. One primary style, repeated, never two competing primaries in view.

### Surfaces

- **Card:** `.ent-card` (white, hairline, soft shadow) with `.ent-card-hover` for interactive lift. Marketing alias: `.dict-card`.
- **Warm card:** `.ent-card-warm`.
- **Terminal:** `.terminal-chrome` + optional `.scanline`.

### Pills & badges

`.ent-pill` (accent), `.ent-pill-sage` (green), `.ent-pill-neutral`. Use sage for "included / coming soon," accent for emphasis, neutral for metadata.

### Tables

Comparison tables pin and tint the Cabinet column, use icon + label (not color alone) for yes / partial / no, and date or source ambiguous rows. See `compare-table.tsx`.

### Navigation & footer

- Main nav: `SiteNavbar` (liquid-glass pills). Enterprise nav: `EnterpriseNav` (frosted bar + mobile drawer).
- Footers: the homepage footer and `enterprise/footer.tsx`. Keep contact, links, copyright, and the agent-capability disclaimer consistent.

### Dividers & ornaments

`.ent-divider` (hairline gradient), `.dot-grid` / `.ent-dots` (texture), `.ent-wash` / `.ent-glow` (soft radial washes). Use sparingly to add depth, never to decorate for its own sake.

---

## 9. Motion & interaction

- **Library:** Framer Motion. Springs for entrances and pops (for example the principles cards), eased transitions for state.
- **Defaults:** keep durations short (150 to 320ms). Reveal-on-scroll should pop in and out tastefully, never jitter.
- **Reduced motion:** honor `prefers-reduced-motion` everywhere. The site already disables marquees, refraction, and lifts; new motion must do the same.
- **Hover:** subtle lift plus a brightness or shadow change. No bounce on every element.
- **Tickers / marquees:** pause on hover and focus; become scrollable when motion is reduced.

---

## 10. Imagery & iconography

- **Icons:** Lucide, consistent stroke (~2 to 2.25). Custom brand icons (GitHub, Discord) live in `site-icons.tsx`.
- **Hero / section imagery:** the warm, editorial photography in `public/heroes/` for solutions and industries. Keep the warm grade; avoid cold stock.
- **Illustration motifs (house style):** single-subject, transparent-background 3D illustrations in `public/generated/`, produced by `scripts/generate-images.mjs` (see the PRD's image-generation system section for the pipeline and how to add new ones). The motif material is **warm light wood**: a soft, matte, hand-crafted wooden-toy look in blonde/maple tones (light tan around `#C9A47A`, lighter wood around `#E8D6B6`, cream highlights) with **soft brushed gold** on the hardware. Lighting is soft and cinematic from the top-left, forms are rounded and friendly, the finish is matte (never glossy). Each page gets one big iconic subject, floating on the warm canvas with no baked background: the brand-mark cabinet on the home page, and a single role-appropriate object for each solution and industry (for example a sales funnel, a megaphone for marketing), rendered in the same wood craft.
  - **Touches of color:** the wood is the base; add small, cheerful **color accents** only on the meaningful elements, exactly as on the main images. The file-type cards use a friendly mix (coral, orange, amber, green, teal, blue), and the AI **agents** are small glowing orbs or geometric tokens. Color is always an accent on wood, never the whole object. Do not use pink, purple, or magenta on the subject (those hues are reserved for the background key during generation).
- **Provider / integration logos:** `public/providers/`. Show real logos only, at consistent size, on neutral surfaces. Never fabricate customer logos.
- **Alt text:** every meaningful image needs descriptive alt text. Replace generic "illustration" alt with what the image shows.

---

## 11. Layout & spacing

- **Container:** `max-w-7xl` for full marketing width, `max-w-6xl` for reading-dense sections, centered with `px-6` (responsive `px-4`).
- **Rhythm:** generous vertical spacing (sections around `py-24`), one idea per section, lots of whitespace. Executives skim; let the page breathe.
- **Radii:** `rounded-2xl`/`rounded-3xl` for cards and panels, `rounded-full` for buttons and pills.
- **Shadows:** prefer the existing recipes (card, card-hover, terminal). Avoid inventing new shadow depths per component; a shadow scale is a PRD item.

---

## 12. Accessibility standards

- Target **WCAG 2.1 AA**.
- **Semantics:** interactive elements are real `<button>` / `<a>` / form controls, not clickable `<div>`s. (Pricing tier selection should move to radio semantics.)
- **Keyboard:** everything reachable and operable; visible focus rings; dropdowns and accordions keyboard-navigable.
- **Color independence:** never use color as the only signal (tables use icon + aria-label).
- **Labels:** icon-only controls get `aria-label`. Images get alt text.
- **Motion:** full `prefers-reduced-motion` support.

---

## 13. Legal, naming, and footer

- **Entity:** Holy Bible Apps Ltd (Israeli company). Standardize casing across both footers.
- **Public contact:** `hi@runcabinet.com`. This is the only contact to publish.
- **No physical address.** Do not publish a street address. Review the enterprise footer "Made with care in Tel Aviv" line against this policy and confirm whether a city reference is acceptable; if in doubt, remove it.
- **License:** open source, MIT. Keep the MIT note and the agent-capability disclaimer (autonomous agents can access the file system, shell, and network) in the footer.
- **Comparisons:** when comparing competitors, add the quiet line "Comparisons reflect publicly available information as of `<date>`; corrections welcome at hi@runcabinet.com."

---

## 14. Governance: where things live in code

| Concern | File |
|---|---|
| Color tokens, type classes, component classes, glass, motion | `src/app/globals.css` |
| Fonts, metadata, global SVG filter mount | `src/app/layout.tsx` |
| Liquid-glass SVG filter | `src/components/liquid-glass-filter.tsx` |
| Main nav / enterprise nav / dropdown | `src/components/site-navbar.tsx`, `src/components/enterprise/nav.tsx`, `src/components/solutions-menu.tsx` |
| IA data (roles, industries, comparisons) | `src/lib/solutions.ts`, `src/lib/industries.ts`, `src/lib/compare.ts` |
| Site config (URLs, waitlist copy) | `src/lib/site-config.ts` |

Process: any change to a token, font, button style, or the glass system updates `globals.css` and this guide together. New colors or fonts require a brand decision recorded here before use.

---

## Appendix A. Quick reference

- **Palette mood:** warm parchment, rich brown, sage green. Light only.
- **Type:** Stack Sans Notch (display), Inter (body), Jost 500 (labels/eyebrows), Instrument Serif italic (wordmark), Source Code Pro (code), Ms Madi (signatures).
- **Signature:** liquid-glass floating pills; warm light-wood illustration motifs with small touches of color.
- **Voice:** confident operator, concrete, no em dashes, no AI filler, no fake numbers.
- **One action per view.** Accent brown primary. Sage means good.
