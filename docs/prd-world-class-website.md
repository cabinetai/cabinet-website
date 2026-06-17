# PRD: World-Class Cabinet Website

**Owner:** Founder / Design / Growth
**Surface:** runcabinet.com (all routes, both the public and enterprise tracks)
**Status:** Draft for build
**Last updated:** 2026-06-13
**Companion doc:** `docs/brand-guide.md` (the visual and verbal system this PRD executes)

---

## 0. TL;DR (the bet)

The site already has the hard parts: a distinctive warm brand, a real product story, a deep comparison system, role and industry pages, an enterprise track, and a new liquid-glass design language. What it lacks is **consistency, polish, and proof of quality**. Today the experience varies page to page: two button shapes, two eyebrow styles, two footers with the company name cased differently, em dashes that violate our own copy rule, a main navigation with **no mobile menu**, and no measured performance, accessibility, or SEO floor.

World-class is not a redesign. It is **systematizing what exists** to one bar, then removing the rough edges that make a sharp executive hesitate. We will:

1. Adopt the brand guide as law and make every page conform (type, color, buttons, glass, voice).
2. Fix the credibility bugs (mobile menu, em dashes, name casing, accessibility, alt text).
3. Set and hold quantitative floors (Lighthouse, Core Web Vitals, WCAG AA, SEO).
4. Raise the signature surfaces (home hero, nav, pricing, compare, enterprise) to a level that reads "this team ships craft."

The test of done: a CTO lands on any page, on any device, and never sees a seam. The site feels like one confident product, not a collection of pages.

---

## 1. Goals & non-goals

### Goals

1. **One coherent system.** Every page uses the brand guide tokens, type, buttons, glass, and voice. Zero one-off styles.
2. **No credibility bugs.** Mobile navigation works; copy follows the house rules (no em dashes, no AI filler, no fake numbers); names and legal text are consistent; images have real alt text.
3. **Measurable quality floor.** Lighthouse, Core Web Vitals, and accessibility targets met and monitored, not assumed.
4. **Conversion clarity.** One primary action per view, a clean path to download / start free, book a demo, and (where relevant) the Cloud waitlist.
5. **Craft on the signature surfaces.** Home hero, navigation, pricing, compare, and enterprise feel premium and intentional.
6. **Scales without bespoke work.** New roles, industries, and comparisons remain pure data adds in `src/lib/*`.

### Non-goals

- Not a rebrand. The palette, logo, and type stack stay (see brand guide). We refine, not replace.
- Not dark mode in this scope (track as a future bet).
- Not new product surfaces (no blog/CMS build) unless explicitly pulled in. We may stub a resources/blog IA slot, not build the engine.
- Not net-new marketing claims. Copy work is consistency and clarity, not new promises.

---

## 2. Success metrics

| Metric | Baseline | Target | How |
|---|---|---|---|
| Lighthouse Performance (mobile, key pages) | unmeasured | >= 90 | CI / manual on home, pricing, a compare spoke, an enterprise page |
| Lighthouse SEO | unmeasured | >= 95 | same set |
| Lighthouse Accessibility | unmeasured | >= 95 | same set |
| Largest Contentful Paint (mobile) | unmeasured | < 2.5s | field + lab |
| Cumulative Layout Shift | unmeasured | < 0.1 | lab; pin image/table dimensions |
| Interaction to Next Paint | unmeasured | < 200ms | field |
| WCAG conformance | partial | AA, 0 critical axe issues | axe / manual keyboard pass |
| House-rule violations (em dashes in copy) | several | 0 | grep gate in CI |
| Mobile nav usable (all sections reachable < 1100px) | no | yes | manual |
| Primary CTA click rate (home, pricing, compare) | unknown | instrument, then improve | analytics |
| Brand-consistency audit (buttons, eyebrows, footers, naming) | mixed | single style each | design QA checklist |

Instrument first where unknown. We cannot improve conversion we do not measure.

---

## 3. Audience & jobs-to-be-done

C-level, VPs, and the technical leaders who vet tools (see brand guide §2). Jobs the site must serve:

- **Understand fast:** "What is Cabinet and why does it matter to me?" (home, platform).
- **See myself:** "What does this do for my role / industry?" (solutions, industries).
- **Trust it:** "Is it secure, owned, and credible?" (enterprise/security, ownership wedge, open source proof).
- **Decide:** "How does it beat what I use now, and what does it cost?" (compare, pricing).
- **Act:** download / start free, book a demo, join the Cloud waitlist.

---

## 4. Current state & gap analysis

From a full codebase inventory. Each gap is an actionable item later in the roadmap.

### 4.1 Consistency gaps

- **Two button shapes.** Marketing pages use `rounded-xl`; the enterprise system uses `rounded-full`. Standardize on the brand-guide button set.
- **Two eyebrow styles.** Mono `.section-label` vs sans `.ent-eyebrow`. Choose one direction per surface (prefer sans for the executive audience).
- **Two footers, inconsistent legal.** Homepage footer "HOLY BIBLE APPS LTD" (all caps) vs enterprise "Holy Bible Apps Ltd" (title case). Standardize casing and the contact/disclaimer block.
- **Glass language split.** Main nav uses floating pills; enterprise nav is a frosted bar. Unify into one glass family.
- **Inline one-off styles.** Discord blue `#5865F2` hardcoded; ad hoc shadows. Tokenize.

### 4.2 Copy / brand-rule violations

- **Em dashes in enterprise copy** (for example section labels on `/enterprise`, `/enterprise/platform`, `/enterprise/about`). This violates the house rule. Remove all.
- **Naming drift:** "Cabinet Cloud" vs "Cloud tier" vs "hosted version"; "Bring your own AI" vs "BYOAI". Standardize per brand guide.
- **Generic alt text** on hero images.

### 4.3 Functional gaps

- **No mobile menu on `SiteNavbar`.** Below 1100px the section links simply disappear; there is no hamburger or drawer. This is the single most visible defect. The enterprise nav already has a drawer pattern to mirror.
- **Form validation:** demo and waitlist forms lack visible error/validation states.
- **No breadcrumbs** on solution/industry/compare spokes (also a structured-data opportunity).
- **No image lazy-loading discipline / dimension pinning** in places, risking CLS.

### 4.4 Accessibility gaps

- Pricing tier cards are clickable `div`s rather than radios/buttons.
- Some icon-only controls lack labels.
- Contrast watch points: `--text-tertiary` on white for small text; white-on-accent small text.

### 4.5 Technical / SEO

- Confirm `metadataBase`, per-page canonicals, `sitemap.ts`, `robots.ts` exist and cover every route (the compare program added some; verify site-wide).
- The "body serif" font resolves to Inter (not serif). Decide and fix (rename or load a real serif).

---

## 5. Design-system & brand-consistency requirements

The brand guide (`docs/brand-guide.md`) is the spec. This PRD requires that the site conform to it. Concretely:

1. **Tokens only.** No raw hex in components. Move Discord blue and any stray colors into tokens.
2. **One button system.** Primary (accent, rounded-full), secondary (white, border), ghost, and glass-pill. Migrate `rounded-xl` marketing buttons.
3. **One eyebrow, one display scale, one lead style** per surface, from the brand guide.
4. **One glass family.** Apply the liquid-glass language consistently across main nav, enterprise nav, dropdowns, and drawers.
5. **A shadow scale.** Replace ad hoc shadows with a small, named set (card, card-hover, panel, terminal).
6. **Resolve the serif caveat.** Either rename `.font-body-serif` to `.font-body` (Inter) or load a real serif and apply intentionally.
7. **Styleguide page is the proof.** `/styleguide` must render the canonical tokens, type, buttons, pills, cards, and glass so any drift is visible.

---

## 6. Page-by-page IA & requirements

Routing and components already exist; this section sets the bar per surface. "Conform" means: brand-guide tokens/type/buttons/voice, one primary CTA, AA accessibility, responsive including a working mobile nav, no em dashes.

### 6.1 Global chrome (all pages)

- **Main nav (`SiteNavbar`):** liquid-glass pills. **Add a glass mobile menu** (drawer or sheet) so all sections are reachable below 1100px. Keep one solid primary (Download).
- **Enterprise nav (`EnterpriseNav`):** unify with the glass language; keep active states and the mobile drawer.
- **Footers:** one consistent legal block, contact (`hi@runcabinet.com`), MIT note, agent-capability disclaimer. No physical address (confirm the "Tel Aviv" line against policy).

### 6.2 Home (`/`)

The flagship. Requirements:

- Hero: one sharp value proposition (Cabinet shows your whole KB and files, visualizes apps, lets a team collaborate, all owned and self-hosted). One primary action, one secondary, GitHub proof. Pin media dimensions to protect CLS.
- Sections: features, use cases, AI agents, integrations scene, principles showcase, testimonials, trust/proof, the wedge, get-started.
- Polish: consistent section rhythm, one eyebrow style, reduced-motion safe animations, real alt text, lazy-loaded below-fold media.
- The fixed glass nav must read cleanly over the hero (light glass at top, frosts on scroll).

### 6.3 Pricing (`/pricing`)

- Clear tiers: self-hosted free, Cabinet Cloud Pro / Max / Enterprise, with BYOAI vs managed AI explained.
- **Accessibility fix:** tier selection uses radio semantics, not clickable divs.
- One primary action per tier; consistent card and toggle styling; annual savings legible.
- Pricing FAQ present and schema-marked.

### 6.4 Compare (`/compare`, `/compare/[slug]`)

- Already a mature hub-and-spoke system (see `docs/prd-compare-pages.md`). Requirements here: conform to the brand guide, ensure breadcrumbs + JSON-LD, keep tables AA-accessible and CLS-safe, and add inbound links from home, solutions, and industries.
- Maintain the credibility rules: dated/sourced tables, "when the competitor wins," no fake stats, no em dashes.

### 6.5 Solutions (`/solutions`, `/solutions/[role]`)

- Six roles (sales, marketing, engineering, product, operations, founders), data-driven by `solutions.ts`.
- Requirements: consistent template, real hero imagery with descriptive alt, one primary CTA, add cross-links to relevant industries and compare spokes, breadcrumbs.

### 6.6 Industries (`/industries`, `/industries/[industry]`)

- Five verticals (financial-services, healthcare, legal, professional-services, startups), data-driven by `industries.ts`.
- Requirements: same as solutions; keep compliance/ownership framing accurate (no claims we cannot stand behind), breadcrumbs, cross-links.

### 6.7 Enterprise track (`/enterprise/*`)

- Pages: enterprise home, platform, security, solutions, about (founder), briefing.
- Requirements: **remove all em dashes**, unify nav glass, standardize footer legal, keep the executive tone, ensure the briefing form has validation and a clear single action. Security page should make ownership/self-hosting/audit story concrete and verifiable.

### 6.8 Conversion & utility pages

- **Demo (`/demo`):** form validation, clear confirmation, reassurance (self-hosted, no training on your data, open source).
- **Cloud (`/cloud`), Waitlist (`/waitlist`), Waitlist-confirmed:** consistent waitlist copy from `site-config.ts`, working validation, honest "coming soon" framing.
- **Media (`/media`):** real press/mentions only.
- **Wishlist (`/wishlist`):** consistent styling and a clear submission path.
- **Legal (`/terms`, `/privacy`):** readable, current, linked from every footer.
- **Styleguide (`/styleguide`):** the living token/component reference (see §5.7).

---

## 7. Performance requirements

- Hit the §2 Core Web Vitals targets on mobile for the key page set.
- **Images:** use `next/image`, set explicit dimensions, lazy-load below the fold, serve modern formats, keep the warm grade. Reduce oversized PNGs (the logo/icon optimization already started; finish the pass).
- **Fonts:** keep `next/font` with sensible subsets and `font-display` behavior; avoid layout shift from late font swaps.
- **Motion / canvas:** the integration scene and animated backdrops must not block interaction or tank INP; gate heavy effects behind reduced-motion and viewport.
- **No CLS from tables or media:** reserve space.

---

## 8. Accessibility requirements

- **WCAG 2.1 AA**, 0 critical axe issues on the key page set.
- Real semantic controls (buttons, links, radios for pricing).
- Full keyboard operability with visible focus.
- Color never the only signal.
- `aria-label`s on icon-only controls; descriptive alt on all meaningful images.
- `prefers-reduced-motion` honored everywhere (already a site convention; enforce on new work).

---

## 9. SEO & content requirements

- `metadataBase`, per-page title/description, canonical, and OG image on every route. Verify `sitemap.ts` and `robots.ts` enumerate all static routes plus dynamic slugs.
- Breadcrumb JSON-LD on spokes (solutions, industries, compare). FAQ JSON-LD where FAQs exist. SoftwareApplication for Cabinet (real data only).
- One H1 per page; logical heading order.
- Copy follows the brand guide voice rules. Add a CI grep that fails the build on em dashes in `src/**` user-facing copy.
- Internal linking: home and hubs link into spokes; spokes link to siblings and back to hubs.

---

## 10. Analytics & instrumentation

- Use the existing analytics module. Track, with page context: primary/secondary/tertiary CTA clicks (action + position), nav interactions (incl. mobile menu open), pricing toggle and tier selection, compare table/FAQ engagement, waitlist and demo submissions.
- Define the north-star conversion events (download/start free, demo booked, waitlist joined) and attribute by source page.
- Wire Search Console; review rankings for target terms (compare program).

---

## 11. Technical requirements

- Next.js 16 (App Router). Respect the in-repo guidance: this is not stock Next; read `node_modules/next/dist/docs/` before using unfamiliar APIs, and heed deprecations (per `AGENTS.md`).
- Keep IA data-driven in `src/lib/*`; new roles/industries/comparisons are data adds.
- Tokens and component classes centralized in `globals.css`; this PRD's consistency items are mostly CSS/class migrations plus a few component refactors (mobile nav, pricing semantics).
- Add the CI gates: Lighthouse budget on the key pages, axe check, and the em-dash grep.

---

## 12. Phased roadmap

**Phase 0: Foundation & guardrails (this unlocks everything)**
1. Adopt `docs/brand-guide.md`. Tokenize stray colors (Discord blue), define the shadow scale, resolve the serif caveat.
2. Add CI gates: em-dash grep, Lighthouse budget, axe.
3. Make `/styleguide` render the canonical system.

**Phase 1: Credibility bugs (highest trust per effort)**
4. Build the glass **mobile menu** for `SiteNavbar`.
5. Remove every em dash from `src/**`; standardize naming and legal/footer casing; confirm the "Tel Aviv" line against the no-address policy.
6. Real alt text pass; fix pricing tier semantics (radios) and icon-only labels.

**Phase 2: System conformance**
7. Migrate all buttons to the one button system; unify eyebrows; unify the enterprise nav glass; consolidate footers.
8. Performance pass: image dimensions/lazy-load, font behavior, CLS-proof tables, gate heavy motion.
9. SEO completeness: metadata/canonical/sitemap/robots/JSON-LD across all routes; internal linking; breadcrumbs.

**Phase 3: Signature craft**
10. Elevate the home hero and the integration scene; tighten section rhythm site-wide.
11. Polish pricing, compare, and the enterprise security story to "premium" finish.
12. Instrument conversion fully; establish the analytics dashboard and Search Console review.

**Phase 4: Future bets (out of scope unless pulled in)**
- Dark mode; resources/blog engine; localized variants; richer customer proof as real case studies arrive (never fabricated).

---

## 13. Acceptance criteria

- [ ] Every route conforms to the brand guide: one button system, one eyebrow style per surface, one display scale, one footer legal block, consistent naming.
- [ ] `SiteNavbar` has a working glass mobile menu; all sections reachable below 1100px.
- [ ] Zero em dashes in `src/**` user-facing copy (CI-enforced).
- [ ] Lighthouse on home, pricing, a compare spoke, and an enterprise page: Performance >= 90, SEO >= 95, Accessibility >= 95.
- [ ] Core Web Vitals: LCP < 2.5s mobile, CLS < 0.1, INP < 200ms on the key set.
- [ ] 0 critical axe issues; keyboard pass clean; pricing selection uses radio semantics; all meaningful images have descriptive alt.
- [ ] metadataBase, canonical, OG, sitemap, robots, and relevant JSON-LD present on all routes; one H1 per page.
- [ ] Legal/contact consistent (one casing, `hi@runcabinet.com`, no physical address, MIT note, agent disclaimer).
- [ ] `/styleguide` reflects the live system with no drift.
- [ ] Conversion events instrumented for nav, CTAs, pricing, compare, demo, waitlist.

---

## 14. Risks & open questions

**Risks**
- *Scope creep into a redesign.* Mitigation: this is conformance + bug-fix + polish, not a new design. Hold the line on "no rebrand."
- *Regression while migrating buttons/eyebrows site-wide.* Mitigation: do it token/class-first, verify on `/styleguide`, screenshot key pages before/after.
- *Performance regressions from the integration scene / glass refraction.* Mitigation: gate behind viewport and reduced-motion; measure INP.
- *Accessibility refactors (pricing radios) changing behavior.* Mitigation: test keyboard + screen reader before/after.

**Open questions (need a decision)**
1. **Serif:** rename `.font-body-serif` to `.font-body` (Inter), or load a real serif for body prose? Recommendation: rename now, revisit a real serif as a deliberate type upgrade.
2. **Eyebrows:** standardize on sans `.ent-eyebrow` everywhere, or keep mono `.section-label` on marketing pages? Recommendation: sans for the executive audience.
3. **Enterprise nav:** convert to floating glass pills like the main nav, or keep a frosted bar (more formal)? Recommendation: keep a frosted bar but in the same glass family, so the two tracks feel related, not identical.
4. **Mobile menu pattern:** full-screen glass sheet vs top drawer? Recommendation: glass sheet for the main nav (more room, more premium).
5. **"Tel Aviv" line:** acceptable city reference, or remove to honor the no-address policy strictly? Needs owner call.
6. **Company-name casing:** "Holy Bible Apps Ltd" everywhere (recommended) vs all caps?
7. **Resources/blog:** stub the IA slot now, or defer entirely?

---

## 15. Image generation system

World-class pages need distinctive, on-brand artwork, not stock. We generate it ourselves, in one consistent house style, with a script.

### 15.1 What and why

- **One big motif per page.** Each key page gets a single, large, iconic illustration (a hero "element"), not a busy collage. It carries the page's idea at a glance.
- **Transparent background.** Motifs are cut out (real alpha) so they float on the warm canvas and sit over any section color, dot grid, or glass without a visible box.
- **One house style, everywhere.** Every image shares the same look: a soft, matte, hand-crafted **warm light-wood** 3D craft (blonde/maple) with soft brushed gold on hardware, soft top-left light, calm and rounded. The wood is the base; small **touches of color** (the file-type cards, the agent orbs/tokens) accent the meaningful elements. The result reads as a single set, not random AI images. Full spec in `docs/brand-guide.md` §10.

### 15.2 How it works

- **Script:** `scripts/generate-images.mjs` (Node, ESM). Run with `GOOGLE_AI_API_KEY=<key> node scripts/generate-images.mjs` for all motifs, or pass ids (for example `home-hero solution-sales`) for a subset.
- **Model:** Google `gemini-3-pro-image` via the Generative Language API, with `gemini-2.5-flash-image` as an automatic fallback.
- **Consistency:** a single `STYLE` string is appended to every prompt. Edit it in one place to re-tune the entire set. Each motif is one `SPECS` entry: `{ id, out, prompt }`.
- **Transparency technique:** image models do not reliably emit a real alpha channel (they paint a checkerboard instead). So we prompt for the subject on a **solid magenta** background (a color absent from our palette) and key it to true alpha in the script with `sharp`: per-pixel distance-to-magenta with a soft edge ramp, plus a despill pass to remove the pink fringe. Output is an RGBA PNG.
- **Output:** `public/generated/<id>.png`.

### 15.3 Conventions for wiring motifs in

- **Home:** `public/generated/home-hero.png`, used as the hero illustration.
- **Solution / industry pages:** `public/generated/solution-<slug>.png` (and `industry-<slug>.png`). The template uses an optional `heroMotif` field on the data record and falls back to the existing `public/heroes/*.jpg` when a motif is not present yet. This means motifs can roll out page by page with no broken images.

### 15.4 Adding a new motif

1. Add a `SPECS` entry in `scripts/generate-images.mjs` (id, output filename, prompt). Keep the prompt to one centered subject; the shared `STYLE` handles the look.
2. Run the script with the key for that id.
3. **Review the PNG** (open it): clean cutout, no magenta fringe, subject centered with margin, on-brand.
4. Wire it in via the `heroMotif` field (solutions/industries) or directly on the page.

### 15.5 Quality bar and housekeeping

- Inspect every generated image before shipping. Reject baked-in backgrounds, fringes, text/letters, or off-palette results, then adjust the prompt or thresholds and regenerate.
- Generated PNGs are large (around 1 MB). Run them through the image optimization pass (compression / resize to the displayed size) before committing, the same discipline applied to the logo and icon.
- **Key handling:** `GOOGLE_AI_API_KEY` is read from the environment only and is never written to a file or committed. If a key has been shared in a chat or terminal, rotate it.

### 15.6 Status

- Generated and wired: `home-hero`, `solution-sales`.
- Next: the remaining solution roles and industries, then home secondary sections and the enterprise track, one motif per page, all from the same script and style.

---

## Appendix A. Inventory snapshot (current routes)

Public: `/`, `/pricing`, `/compare` (+ `/compare/[slug]`), `/solutions` (+ `/solutions/[role]`), `/industries` (+ `/industries/[industry]`), `/demo`, `/cloud`, `/media`, `/waitlist`, `/waitlist-confirmed`, `/wishlist`, `/terms`, `/privacy`, `/styleguide`.

Enterprise: `/enterprise`, `/enterprise/platform`, `/enterprise/security`, `/enterprise/solutions`, `/enterprise/about`, `/enterprise/briefing`.

IA data: `src/lib/solutions.ts` (6 roles), `src/lib/industries.ts` (5 verticals), `src/lib/compare.ts` (comparison program), `src/lib/site-config.ts`.

## Appendix B. Related docs

- `docs/brand-guide.md`: the visual and verbal system this PRD enforces.
- `docs/prd-compare-pages.md`: the compare hub-and-spoke program (already largely shipped).
- `AGENTS.md` / `CLAUDE.md`: product definition and copy rules (source of the voice constraints).
