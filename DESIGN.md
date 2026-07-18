# DESIGN.md: the Cabinet website redesign bible

**Owner:** Founder / Design
**Status:** v1, adopted. Every visual, copy, and motion decision on runcabinet.com conforms to this document or changes this document first, in the same commit.
**Last updated:** 2026-07-17
**Companion docs:** `docs/brand-guide.md` (tokens, type, voice: still law), `TOWN.md` (competitor workflow teardown), `docs/prd-world-class-website.md` (quality floors: still law), `docs/prd-frontend-redesign.md` (icons and cards: still law).
**Evidence:** competitor and self-audit screenshots in `docs/design-research/`.

How this document relates to the others: the brand guide defines the materials (palette, type, glass, wood motifs). The PRDs define the quality bar (Lighthouse, AA, SEO) and the component cleanups. **This document defines the message and the experience:** what the site says, in what order, and how it moves. Where an older doc conflicts with this one on narrative, hero, navigation, or motion, this one wins.

---

## 1. The problem, stated plainly

The site has a distinctive brand and does not look professional yet. The audit (screenshots: `cabinet-01-hero`, `cabinet-02-scroll`, `cabinet-03-mid`, `cabinet-04-workflows`) shows why:

1. **The value proposition is buried.** The hero opens with a problem statement ("Your work lives in a hundred places") and a logo cloud. There is no product statement, no CTA, and no proof above the fold. A buyer must scroll through a multi-screen story before learning what Cabinet is. Executives do not scroll on faith.
2. **A waitlist popup fires before the first read.** The first thing a new visitor sees is a modal asking for their email for a product they have not yet understood. This single behavior costs more credibility than any styling choice.
3. **The navigation is a maze.** Twelve interactive elements in the top bar (8 pill links + GitHub + Book a demo + Download). Town ships four. Every extra item dilutes the one action we want.
4. **The floating pills break on scroll.** Section text scrolls up and collides with the nav pills with no frosted layer behind them (visible in `cabinet-03-mid` and `cabinet-04-workflows`). It reads as a bug, and a CTO who sees one seam assumes ten.
5. **Sections float without rhythm.** Big type and a small illustration adrift in whitespace ("Cabinet pulls it all into one place" screen) reads unfinished rather than minimal, because nothing anchors the grid and nothing moves with intent.
6. **No motion system.** Individual elements animate, but there is no orchestrated moment that makes the product feel alive, and no scroll infrastructure to pace the story.

What is already good and must not be lost: the warm parchment-and-wood identity is genuinely distinctive (nobody in the category looks like this), the generated wooden motif imagery is excellent (see the registry covers on `cabinet-04-workflows`), and the copy voice rules are right.

## 2. What the competition taught us (evidence in `docs/design-research/`)

**Town** (`town-01..03`): the benchmark for making an AI assistant feel concrete.
- Nav: 4 items. Hero: giant editorial slab-serif headline with an inline photo, a named illustrated character, and a **live prompt input** ("Draft follow-ups from yesterday's demos"). The product is demonstrated before it is described.
- The Features menu is a three-panel use-case explorer (list → promise + three proof points → full feature list). Their whole catalogue is in `TOWN.md`.
- Every feature is a verb phrase with an object. No adjectives carry weight.
- Personality through characters and micro-copy, professionalism through typography and restraint.

**Gumloop** (`gumloop-01..03`): scale positioning done cleanly.
- One-line category claim with a typographic trick ("built ~~for~~ by your team"), floating integration icons with named cursors implying live collaboration, then full product mockups in-page. Proof band (SOC 2, GDPR, funding) rendered as designed objects, not badge soup.

**Linear** (`linear-01`): the craft ceiling.
- One sentence ("The product development system for teams and agents"), one sub-line, and the real product UI as the hero image. Total discipline in spacing and type. Nothing decorative exists.

**The shared pattern we adopt:** name the category in one line, demo the product immediately, put exactly one primary action in view, and let one signature moment carry the personality.

## 3. The value proposition (the words, locked)

Positioning source: AGENTS.md and the brand guide wedge. Cabinet is the AI-first knowledge base and operating layer: your whole knowledge base and files in one visible place, rendered as live views and apps, worked by a team of AI agents, shared with colleagues, all self-hosted on files you own.

### 3.1 Message hierarchy (every page, in this order)

1. **What it is:** an AI workspace / knowledge base you own.
2. **What it does for you:** a team of AI agents does the work: inbox, meetings, answers, reports, apps.
3. **Why it is safe to adopt:** files on your disk, your own AI accounts, self-hosted, open source, MIT.
4. **Proof:** the live product, real cabinets to clone, GitHub stars, real press.
5. **Action:** Download (primary). Book a demo (secondary). Nothing else competes.

### 3.2 Homepage hero copy (v1, ship this)

- **Eyebrow:** Free and open source · Self-hosted · MIT
- **H1:** `Your company's brain. A team of AI agents inside.`
- **Sub:** Cabinet is the AI workspace you own: every file and doc in one place, live dashboards instead of static pages, and agents that answer, draft, and run your recurring work. It runs on your machines, with the AI accounts you already pay for.
- **Primary CTA:** Download for free. **Secondary:** See it work (scrolls to the demo). **Proof strip:** GitHub stars (live), MIT, "Works with Claude, GPT, Gemini" provider row.
- Rules: H1 stays under 60 characters. One gradient-text emphasis maximum. No em dashes, no "unlock", no invented numbers (brand guide §3 applies verbatim).

The current problem-first scroll story ("lives in a hundred places → pulls it into one place") is good material and **moves below the fold** as the first scroll sequence. It becomes the signature moment (§5) instead of the opening.

## 4. Visual direction

No rebrand. The brand guide's palette, type stack, glass, and wood motifs stand. The redesign is about **discipline and intent** in how they are used.

1. **Editorial grid, not floating islands.** Every section aligns to a 12-column grid at `max-w-7xl`. Headline column + media column. No more single small object centered in a void: the wooden motifs render large (40 to 55% of section width) or not at all.
2. **Type does the talking.** The locked stack (picked on `/styleguide/fonts`, 2026-07-18): Fraunces for display at -0.04em tracking (a warm editorial serif that matches the wooden-craft identity and carries Town-scale headlines), Geist for body and UI, Geist at 0.08em for uppercase labels, Martian Mono for code. Hero headlines at `clamp(2.75rem, 6vw, 5.5rem)` with a strict scale below; body at max 70ch. Spec in `docs/brand-guide.md` §6.
3. **The product is the imagery.** Above the fold and in every capability section, show Cabinet itself: real screenshots or live embedded views, framed in the terminal/card chrome. Wooden motifs support; they stop being the only visual.
4. **One signature moment per page** (§5). Everything else is quiet.
5. **Warm stays warm.** No cold blues, no dark-mode sections copied from Linear. Our dark surface is `--bg-terminal` (warm brown-black) and it is used only for product/terminal frames.
5b. **Surfaces are borderless.** Cards and panels get one warm diffuse shadow, never a hairline outline (`.card-skin` / `.ent-card`; brand guide §8). Borders exist only where they carry affordance: inputs, the secondary button, glass edges, table structure.
6. **The nav gets honest.** Reduce to: Product (dropdown: Solutions, Industries, Use cases, Cabinets), Compare, Pricing, Docs + GitHub icon + Download (solid). Seven interactive elements, one primary. The pill track gets a `.liquid-glass` frosted bar behind it on scroll so text never collides again (fixes finding §1.4). Mobile menu ships (already mandated by the world-class PRD).
7. **The waitlist popup dies on first load.** It appears only on exit intent on /cloud and /pricing, or after a genuine signal (second page view). Never over an unread hero.

## 5. Motion system

### 5.1 Libraries: evaluated against what we actually need

| Library | Verdict | Reasoning |
|---|---|---|
| **Framer Motion** (installed) | **Keep. Primary tool.** | Already powers the site; handles entrances, hovers, layout, and scroll-linked values (`useScroll` + `useTransform`) without new weight. |
| **Lenis** (~4 KB) | **Add.** | Smooth, inertial scrolling is the backbone of the hero scroll story; tiny, framework-agnostic, respects reduced motion. The single new dependency this redesign takes. |
| **GSAP + ScrollTrigger** | **Hold.** | Free now, but overlapping with Framer Motion for our needs. Adopt only if a sequence proves too complex for `useScroll` (pinned multi-stage timelines). Do not run two animation systems side by side without that proof. |
| **Vanta / shader-gradient** | **No.** | WebGL gradient backgrounds read as cold generic SaaS and fight the warm parchment identity. They are also the most common AI-site tell in 2026. |
| **react-three-fiber** | **Later, maybe.** | A real-time 3D cabinet hero is the one legitimate use (we already have drawer-state renders to prototype the same story cheaper). Revisit only after the 2D redesign ships and converts. |
| **react-bits** | **Selective reference only.** | Copy patterns (split-text reveal, count-up) into our own components when needed; do not add the dependency. |

### 5.2 The signature moment: the drawer story

The homepage scroll sequence, built from assets we already have (`cabinet-logo-closed`, `-top-open`, `-bottom-open`, both-open, and the flipped variants):

1. Hero settles: the closed cabinet sits right of the H1.
2. Scroll 1: chaos of file cards and tool logos (current hero art, reused) flies **into the top drawer**; the drawer opens as they arrive. Copy: "Your work lives in a hundred places. Cabinet pulls it into one you own."
3. Scroll 2: the bottom drawer opens; glowing agent tokens rise out and fan toward live product frames (inbox triage, a dashboard, a report). Copy: "Then a team of agents gets to work."
4. Scroll 3: both drawers open, the cabinet docks small beside the primary CTA, product UI takes the stage.

Implemented as a pinned section: Lenis + `useScroll` progress driving crossfades between the four drawer states and transforms on the cards. Under `prefers-reduced-motion` the sequence renders as three static stacked sections with the same copy: the story survives, the motion does not have to.

### 5.3 Motion rules (site-wide)

- Durations 150 to 320ms for UI, up to 800ms only inside the signature sequence. Springs for entrances, ease-out for exits.
- Reveal-on-scroll: single 12px rise + fade, once, staggered 60ms. Never re-trigger on scroll-up, never jitter.
- Hovers: lift + shadow (existing recipes). No bounce, no rotation.
- Every effect gated by `prefers-reduced-motion`, and heavy scenes mount only in-viewport (INP budget from the world-class PRD holds).
- Marquees pause on hover/focus.

## 6. The use-case explorer (Town's best idea, made honest)

Adopt Town's three-panel pattern (see `TOWN.md` §1) as a "What will your Cabinet handle?" section on the homepage and the `/use-cases` hub:

- **Left:** workflow list: Inbox · Meetings · Answers · Docs and reports · Recurring work · Team requests (data: `WORKFLOW_CABINET_SLUGS` in `src/lib/cabinets.ts`, already shipped).
- **Middle:** the promise in one sentence + three verb-first proof points.
- **Right:** the receipt Town cannot show: the actual cabinet card (real cover, agent and job counts, "Clone this cabinet" linking to cabinets.sh). Our differentiator is that every claim opens an inspectable folder, not a signup wall.
- Copy for each panel derives from the registry descriptions and `TOWN.md` §3. Never claim the two gaps (calendar negotiation, chat-app surfaces) until those cabinets ship.

The first version of this content is live as the "Run your day in Cabinet" grid on `/use-cases`; the explorer upgrades it during Phase 2.

## 7. Page-by-page plan

Priority order. "Conform" = this doc + brand guide + world-class PRD floors.

1. **Home** (the redesign): new hero (§3.2), drawer story (§5.2), use-case explorer (§6), capability sections with real product frames, cabinets/templates row, ownership wedge, proof, single get-started band. Kill the on-load popup.
2. **Global chrome:** reduced nav + frosted scroll state + mobile menu; one footer.
3. **/use-cases:** promote the grid to the explorer; each workflow eventually gets a spoke page with a walkthrough (the existing article system carries these).
4. **/pricing:** clarity pass (radio semantics per PRD), BYOAI story told as savings math, one CTA per tier.
5. **/compare:** conforms visually; content system already strong.
6. **Solutions/Industries:** template conforms (larger motifs, explorer cross-links).
7. **Enterprise track:** inherits chrome and type scale; frosted-bar nav stays (its own formality is fine).

## 8. Rules of engagement (the religion part)

1. **This doc or no.** A change that contradicts DESIGN.md updates DESIGN.md in the same PR, or it does not merge.
2. **The brand guide is law for materials, this doc for message and motion.** Both, always.
3. **No em dashes anywhere.** Copy, code comments in copy strings, alt text. CI grep (world-class PRD Phase 0) enforces.
4. **One primary action per view.** If two things glow, neither leads.
5. **Every claim has a receipt.** A feature statement links to a doc, a cabinet, or a demo. No orphan adjectives.
6. **Screenshot before and after.** Every visual PR includes both, taken at 1440 and 390 wide.
7. **Nothing ships that fails the floors:** Lighthouse ≥ 90 / SEO ≥ 95 / a11y ≥ 95, AA contrast, reduced-motion parity, CLS < 0.1.
8. **New dependencies need a line in §5.1.** The current allowance: Lenis. Everything else argues its case here first.

## 9. Acceptance criteria for the redesign

- [ ] A first-time visitor can answer "what is it, what does it do for me, why is it safe, what do I do next" from the first viewport, without scrolling or dismissing anything.
- [ ] No modal interrupts a first visit.
- [ ] Nav has ≤ 7 interactive elements with exactly one solid primary; frosted state on scroll; works below 1100px.
- [ ] The drawer story ships, pinned and smooth at 60fps on an M-series laptop and a mid-range Android, with a static reduced-motion fallback.
- [ ] The use-case explorer ships with all six workflows linking to real cabinets.
- [ ] Every section sits on the 12-column grid; no orphaned floating objects.
- [ ] All §8 floors pass on home, pricing, use-cases, and one compare spoke.

## 10. Open items

0. **The mark.** Round-1 audition (12 directions, `scripts/generate-logos.mjs`) narrowed to the wooden tile. Round 2 develops two families on `/styleguide` "Logo candidates": (a) a single-drawer wooden squircle whose handle is a carved smile with dot eyes (after the ref-trio and face-squircle explorations), in walnut, glowing, and brass finishes; (b) Notion-composition ivory tiles carrying a serif C or the face glyph. Winner gets wired into favicon, nav, and app-icon assets and recorded in brand guide §4.
1. Hero H1 A/B candidates ("Your company's brain, with hands." / "The AI workspace you own.") : pick after the v1 ships and Search Console + CTA instrumentation report.
2. The two capability gaps (calendar-ops, chief-of-staff cabinets) are specced in `TOWN.md` §4; building them unlocks two more explorer rows.
3. r3f cabinet hero: revisit post-launch (§5.1).
4. A live "ask" input in the hero (Town's trick) requires a hosted inference path we do not have on a static marketing site; consider a scripted typewriter demo instead, clearly labeled as illustrative.
