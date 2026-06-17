# PRD: Frontend Redesign (icon library, components, asset workflow)

**Owner:** Design / Frontend
**Surface:** runcabinet.com (all routes)
**Status:** Draft for build
**Last updated:** 2026-06-15
**Companion docs:** `docs/brand-guide.md`, `docs/sitemap.md`, `docs/prd-world-class-website.md`
**Built with:** senior-frontend (component/perf/a11y patterns) + frontend-design (distinctive, non-generic aesthetics)

---

## 0. TL;DR

The brand system now exists (warm palette, Jost labels, Stack Sans Notch display, liquid glass, wood-with-color motifs, soft warm cards). Two things still look generic and "boring": the **icon + card** patterns (the Solutions dropdown, the homepage feature/wedge cards, the principle cards) all use stock Lucide glyphs in flat pastel squares. This PRD:

1. Ships a **custom Cabinet icon library** (`public/brand/icons.svg`) for the icons we actually use, replacing stock Lucide in those surfaces.
2. **Redesigns the icon + card components** into something distinctive (soft warm cards, refined icon chips, ambient glow, motion), previewed in `public/style-lab.html`.
3. Formalizes an **asset review + re-run workflow**: every generated asset (motif, logo, icon) appears on the style lab with its id and the exact command to regenerate it, so any single asset can be re-run on request.
4. Applies the brand system consistently across the site.

Everything visual is shown on the style lab first for review before it touches the live pages.

---

## 1. Goals & non-goals

### Goals
1. A small, owned, consistent **icon set** (not stock Lucide) for the curated list we need.
2. Icon + card surfaces that feel **designed**, not templated: the Solutions menu, homepage differentiator/wedge cards, and principle cards.
3. A repeatable **asset workflow**: review on the style lab, re-run any one asset by id.
4. Brand-system consistency (labels = Jost, cards = soft + warm shadow, chrome = liquid glass, motifs = wood + color touches).
5. No regressions in performance or accessibility (senior-frontend bar).

### Non-goals
- Not a re-architecture. Keep the data-driven `src/lib/*` model and the existing routes.
- Not a rebrand. Palette, logo, and type stack stay.
- Not replacing every Lucide icon globally. Only the curated set used in redesigned surfaces; Lucide can remain elsewhere until needed.

---

## 2. Custom icon library (wood-craft objects)

The icons are small **3D wood-craft objects** in the brand motif style (warm light wood + soft gold + small color touches, transparent), not flat line icons. Each is a single iconic object that represents the concept, so the icon set and the page motifs are one visual family.

**Assets:** working set in `public/generated/_explore/obj-*.png`; promote the locked ones to `public/brand/icons/` (transparent PNGs, optimized).

**Set (needed only):** `sales` (target + arrow, both kept while deciding), `marketing` (megaphone), `engineering` (code tile), `product` (compass), `operations` (gears), `founders` (chess king), `startups` (rocket), `financial` (bank), `healthcare` (heart + cross), `legal` (scales), `professional` (briefcase), `files` (folders), `byoai` (chip + orb), `agents` (robot). Extend only as new surfaces need them.

**Generation / re-run:** produced by the object generator (brand craft, magenta key, transparent). Re-run a single icon by id, for example `node scripts/<icon-gen>.mjs founders`. Review on the style lab; re-run any weak one.

**Delivery in the app (senior-frontend):**
- An `Icon` component renders the PNG via `next/image` at small sizes; data uses an `iconName` string instead of `icon: LucideIcon`, dropping those Lucide imports from the bundle.
- Icons are decorative beside a text label, so `alt=""` / `aria-hidden` and the label carries meaning.

**Conventions:** consistent scale and framing; `startups` uses a rocket and `founders` a chess king (the old data reused the rocket for both). Keep transparent so each floats on a chip or card.

---

## 3. Icon + card redesign (the "boring" surfaces)

Three surfaces use the flat icon-in-pastel-square pattern. Redesign all three with the same component language (previews on the style lab → "Components"):

### 3.1 Solutions dropdown (`SolutionsMenu`)
- Rows: a **refined icon chip** (soft cream tile, subtle inset highlight, custom icon in accent brown) + label in display type + a trailing arrow that slides on hover.
- The whole row gets a soft warm hover wash (not a hard background), and the active row a gentle glass highlight.
- The panel stays liquid glass; "Every team / Every industry" footers get the arrow-slide treatment.

### 3.2 Homepage differentiator / wedge cards ("Your work lives on disk", etc.)
- Move from bordered white cards to the **soft warm card** (borderless, warm diffuse shadow, 24px radius).
- Use the **wood-object icon** (not a flat glyph) at the top of the card.
- Some cards carry a large, faded **background-object watermark** behind the text (the BYOAI / principle pattern). See style lab "Card with background object".
- Tighten type rhythm (display title, Inter body, Jost eyebrow if used).

### 3.3 Principle cards (`principles-showcase`)
- Keep the scroll-spy idea; restyle the cards to the soft warm surface and the custom icons, and make the accent color per-principle read as a subtle wash rather than a hard chip.

**Shared component:** a `FeatureCard` and an `IconChip` in `src/components/ui/` so the three surfaces share one implementation. Respect `prefers-reduced-motion` for the hover/scroll motion.

---

## 4. Asset review & re-run workflow

The style lab (`public/style-lab.html`) is the single review surface for generated assets.

- **Every generated asset** (motif, logo state, icon set, solution/industry object) appears there, grouped, each tile labeled with its **id** and the **exact command** to regenerate just that asset.
- **Re-run a single asset:** the user names the id; we run the matching generator with that id, for example:
  - motif: `GOOGLE_AI_API_KEY=… node scripts/generate-images.mjs home-hero`
  - exploration: `… node scripts/explore-styles.mjs <subject>` (with `STYLES=02,03` to limit)
  - logo states: `… node scripts/brand-states.mjs`
  - icons: re-render the icon sprite script
- **Provenance:** each generator already writes deterministic filenames = ids; the style lab maps tile → id → command. No asset is anonymous.
- **Key handling:** `GOOGLE_AI_API_KEY` from env only, never committed; rotate if shared.

This makes iteration cheap: look at the lab, point at the weak asset, ask for a re-run of that one id.

---

## 5. Brand system application (site-wide)

Apply the now-settled system to the live site:
- **Labels / eyebrows:** Jost 500, uppercase, letter-spaced; load via `next/font`, add `--font-label`, migrate `.section-label` and `.ent-eyebrow`. Reserve Source Code Pro for code only.
- **Cards:** borderless soft surface with the warm shadow recipe (`rgba(150,108,68,…)`, low opacity); a glass variant where it sits over imagery.
- **Chrome:** liquid-glass nav (already shipped) consistent across both tracks.
- **Motifs:** warm light wood + touches of color; one iconic subject per page (home cabinet, role/industry objects).

---

## 6. Page-by-page (what changes)

- **Home:** wedge/differentiator cards → soft warm `FeatureCard` + custom icons + glow; eyebrows → Jost; integration scene central node already uses the brand mark.
- **Solutions hub + dropdown:** `SolutionsMenu` redesign (§3.1); role pages keep `heroMotif` objects (wire the chosen Sales/Marketing objects, continue the rest).
- **Industries hub + dropdown:** same row redesign; industry hero motifs to follow.
- **Principles section:** card restyle (§3.3).
- **Pricing, compare, enterprise:** adopt Jost labels + soft cards; no structural change in this PRD.

---

## 7. Technical approach (senior-frontend)

- **Server-first:** icons and cards are presentational, keep them server components; only the dropdown and scroll-spy stay client.
- **Bundle:** moving solutions/industries off `LucideIcon` to the sprite drops those imports; keep `optimizePackageImports` for any remaining Lucide usage.
- **Images:** `next/image` with dimensions; motifs are transparent PNGs already optimized (~80-110 KB).
- **Accessibility:** icons `aria-hidden`; rows/cards use semantic `<a>`/`<button>`; visible focus rings; AA contrast (accent brown on cream passes; verify small text).
- **Motion:** CSS-first; `prefers-reduced-motion` disables hover lifts and the scroll-spy transitions.

---

## 8. Acceptance criteria

- [ ] `public/brand/icons.svg` covers the needed set; each icon rendered and reviewed on the style lab.
- [ ] `Icon` component + `iconName` data field replace `LucideIcon` in `solutions.ts` / `industries.ts`.
- [ ] Solutions dropdown, homepage wedge cards, and principle cards use the new `IconChip` + soft warm `FeatureCard`; no flat pastel-square icons remain on those surfaces.
- [ ] Style lab shows every generated asset with its id + re-run command; a single asset can be re-run by id.
- [ ] Jost labels live site-wide; Source Code Pro is code-only.
- [ ] 0 critical axe issues on the changed surfaces; reduced-motion respected; Lighthouse not regressed.

---

## 9. Risks & open questions

**Risks**
- Cross-file `<use href="…icons.svg#id">` has edge cases in older Safari; if it bites, inline the sprite once in the layout or ship the `Icon` component with inlined paths.
- Over-glow / over-motion can cheapen the cards; keep restraint (frontend-design: intentional, not intense).

**Open questions**
1. Lock the Sales/Marketing hero objects (Growth chart / Megaphone were the picks?) before wiring into role pages.
2. Founders vs startups icon: keep rocket for founders, spark for startups (current library), or swap?
3. Should industries get hero objects too (parallel to solutions), or keep the photographic heroes there?
4. Card default: soft (A), glass (B), or warm (C) from the style lab?
