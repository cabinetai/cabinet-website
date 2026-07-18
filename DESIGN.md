# DESIGN.md: the Cabinet website redesign bible

**Owner:** Founder / Design
**Status:** v1, adopted. Every visual, copy, and motion decision on runcabinet.com conforms to this document or changes this document first, in the same commit.
**Last updated:** 2026-07-18
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

1. **What it does for the business:** turns a recognizable business workflow into an AI team.
2. **Why it can start now:** working cabinets already include specialist agents, recurring jobs, knowledge structure, and live views.
3. **How the team gets company context:** connected cloud folders, imported knowledge, local files, code, data, and apps live in one visible Cabinet.
4. **How the company keeps control:** use company-managed AI accounts, choose a provider per agent, self-host, and require human approval.
5. **Proof and action:** show the working product, real cabinets to inspect, and credible operator testimony. Lead to the cabinet library, download, or executive demo.

### 3.2 Homepage hero copy (v2, shipped on `kimi/world-class-redesign`)

- **Eyebrow:** The AI workspace your company owns
- **H1:** `Your knowledge, your AI team, your apps. One workspace.`
- **Sub:** Cabinet shows your entire knowledge base and files, puts a team of AI specialists to work on it, and renders results as live apps and dashboards. Open source, self-hosted, and connected to the AI providers you already trust.
- **Primary CTA:** Book an executive demo. **Secondary:** Explore AI teams. **Proof strip:** Open source, self-hosted, and supported provider names.
- Rules: H1 stays under 60 characters, Fraunces at -0.04em. One gradient-text emphasis maximum. No em dashes, no "unlock", no invented numbers (brand guide §3 applies verbatim).
- v1 (superseded): "Run company workflows with AI teams you control." said what Cabinet does but never what it is. v2 names the category (AI workspace) and enumerates the three pillars from AGENTS.md (knowledge, AI teams, apps).

The homepage sequence is locked (v3): hero, what-is-a-Cabinet drawers (Data / AI team / Tasks), why-Cabinet ownership statement, outcome explorer, workspace features, live-apps wedge, durable-work receipt ("How Cabinet works"), integrations directory ("Connect to everything that runs your company"), bring-your-own-AI network ("Works with the AI you already pay for"), security trust band, operator proof, and conversion. v2 (superseded): three-card what-is-Cabinet and no why-Cabinet band; v3 restores the drawer metaphor and the ownership/integrations/BYOAI copy from the pre-redesign site.

## 4. Visual direction

No rebrand. The brand guide's palette, type stack, glass, and wood motifs stand. The redesign is about **discipline and intent** in how they are used.

1. **Editorial grid, not floating islands.** Every section aligns to a 12-column grid at `max-w-7xl`. Headline column + media column. No more single small object centered in a void: the wooden motifs render large (40 to 55% of section width) or not at all.
2. **Type does the talking.** Fraunces at -0.04em is reserved for the homepage H1, quotations, and the selected outcome headline. Geist at weight 620 and -0.045em carries H2 and H3 for faster scanning. Geist also handles body, UI, and uppercase labels. Martian Mono remains code-only. Body copy stays below 70ch. Spec in `docs/brand-guide.md` §6.
3. **The product is the imagery.** The live Cabinet mockup is the dominant visual above the fold and the signature product object on the page. Capability sections use focused product views, not repeated furniture renders. Wooden UI assets support actions, providers, and outcomes without competing with the mockup.
3b. **Use the Cabinet asset system.** Generated wooden provider medallions and UI objects from `/public/brand` take priority over generic glyphs when they communicate the same idea. Connector logos remain recognizable product marks.
4. **One signature moment per page** (§5). Everything else is quiet.
5. **Light is the default.** Cabinet should read as a professional operating environment, not a developer console. Product screens, capability sections, workflow explorers, and conversion bands use parchment, ivory, oak, and restrained sage surfaces. `--bg-terminal` is reserved for a real terminal or code example that is clearer in dark syntax presentation. It is never used as a full marketing section or a decorative product frame.
5b. **Surfaces are borderless.** Cards, panels, and buttons get one warm diffuse shadow, never a hairline outline (`.card-skin` / `.ent-card`; brand guide §8). Borders exist only where they carry necessary structure: inputs, data tables, and dividers inside product UI.
6. **The nav gets honest.** Lead with AI teams, then Solutions, Security, Pricing, and Resources. The cabinet library sits inside Resources and the AI teams item returns to the primary homepage story. GitHub and Book a demo remain the two right-side actions. The pill track gets a `.liquid-glass` frosted treatment so text never collides with page content. Mobile navigation must carry the same priorities.
7. **The waitlist popup dies on first load.** It appears only on exit intent on /cloud and /pricing, or after a genuine signal (second page view). Never over an unread hero.

## 5. Motion system

### 5.1 Libraries: evaluated against what we actually need

| Library | Verdict | Reasoning |
|---|---|---|
| **Framer Motion** (installed) | **Keep. Primary tool.** | Already powers the site; handles entrances, hovers, layout, and scroll-linked values (`useScroll` + `useTransform`) without new weight. |
| **Lenis** (~4 KB) | **Hold.** | Full-viewport chapters and native smooth scrolling provide the required pacing without another runtime. Revisit only if a tested scroll sequence requires it. |
| **GSAP + ScrollTrigger** | **Hold.** | Free now, but overlapping with Framer Motion for our needs. Adopt only if a sequence proves too complex for `useScroll` (pinned multi-stage timelines). Do not run two animation systems side by side without that proof. |
| **Vanta / shader-gradient** | **No.** | WebGL gradient backgrounds read as cold generic SaaS and fight the warm parchment identity. They are also the most common AI-site tell in 2026. |
| **react-three-fiber** | **Later, maybe.** | A real-time 3D cabinet hero is the one legitimate use (we already have drawer-state renders to prototype the same story cheaper). Revisit only after the 2D redesign ships and converts. |
| **react-bits** | **Selective reference only.** | Copy patterns (split-text reveal, count-up) into our own components when needed; do not add the dependency. |

### 5.2 The signature moment: the live product, already organized

The hero presents Cabinet as a calm working product, not an assembly sequence:

1. The headline and live Cabinet mockup render immediately.
2. Company systems, files, and live views sit inside an expanded Sources directory in the product sidebar.
3. The drawer-state image and supporting caption change with the active Knowledge, AI team, or Work view.
4. The live product remains interactive, but the tabs change only when a visitor chooses Knowledge, AI team, or Work. The hero does not tour itself.

Do not animate source chips into the product. The organized sidebar must communicate that Cabinet connects the company without covering the interface or delaying comprehension.

### 5.3 Motion rules (site-wide)

- Durations 150 to 340ms for UI and up to 600ms for section reveals.
- Reveal-on-scroll: rise, focus, settle. Use a 24px rise, a short blur-to-focus transition, and 50 to 100ms stagger. Run once and never jitter on scroll-up.
- Hovers: lift + shadow (existing recipes). No bounce, no rotation.
- Every effect gated by `prefers-reduced-motion`, and heavy scenes mount only in-viewport (INP budget from the world-class PRD holds).
- Marquees pause on hover/focus.
- Homepage sections use proximity snapping with a fixed-navigation offset. Reduced-motion users keep standard scrolling.

## 6. The Cabinet outcome explorer (the product unlock)

The first section after the hero is an interactive outcome explorer. It must feel like selecting a business result and seeing the team, cadence, and connected systems required to deliver it. It is not a cover-art marketplace.

- **Lead with results:** launch TikTok ads, clear the inbox, plan the content calendar, run the customer CRM, answer customers through WhatsApp and Telegram, prepare 1:1s, build company meeting memory, create ad dashboards, onboard clients and employees, move sales forward, protect customer health and cash flow, audit products, and prepare QBRs.
- **Show the receipt:** the selected result names the specialist roles, operating cadence, business impact, and every connected system. Available workflows link to inspectable cabinets on cabinets.sh.
- **Cover the competitive use cases:** every workflow described in `TOWN.md` appears in the explorer. This makes the assistant category legible while positioning Cabinet as the operating system behind a broader AI team.
- **Use one active panel:** all outcomes remain available in a compact scrollable rail, but only one vivid result panel owns the visual field. The rail keeps a visible scroll affordance so additional templates never look clipped. Decorative cabinet cover images do not appear here.
- **Never invent readiness:** planned or partially supported workflows are labeled honestly and do not link to a working cabinet until one exists.

### 6.1 Homepage viewport rhythm

- Hero: 100svh, with the Cabinet mockup occupying the larger column.
- Every primary story, proof moment, and conversion chapter: at least 100svh on desktop, with up to 8svh vertical breathing room.
- The outcome explorer uses a tighter rhythm and scales its product frame from 450px on short desktop viewports to 620px on tall ones.
- Tablet and mobile: natural content height with consistent responsive padding. Content is never clipped to satisfy a viewport target.

## 7. Page-by-page plan

Priority order. "Conform" = this doc + brand guide + world-class PRD floors.

1. **Home** (the redesign, v2 shipped on `kimi/world-class-redesign`): new hero (§3.2), what-is-Cabinet pillars, Cabinet library (§6), workspace features, live-apps wedge, durable-work receipt, connected knowledge directory, bring-your-own-AI network, security trust band, combined operator proof, and one get-started band. Kill the on-load popup.
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
8. **New dependencies need a line in §5.1.** No new motion dependency is currently approved.

## 9. Acceptance criteria for the redesign

- [ ] A first-time visitor can answer "what is it, what does it do for me, why is it safe, what do I do next" from the first viewport, without scrolling or dismissing anything.
- [ ] No modal interrupts a first visit.
- [ ] Nav has ≤ 7 interactive elements with exactly one solid primary; frosted state on scroll; works below 1100px.
- [x] The hero product opens on the organized Knowledge view, changes only through manual tabs, and keeps all source systems inside the Sources directory.
- [x] The durable-work chapter shows one request becoming an AI team run and owned Company Cabinet artifacts.
- [ ] The first homepage section after the hero is the Cabinet outcome explorer. Every available workflow links to a real registry cabinet, and planned capabilities are clearly labeled.
- [ ] The connected knowledge section visibly combines cloud folders, imported knowledge, and local Office files in one Company Cabinet.
- [ ] The provider section visibly connects supported AI accounts to Cabinet and has reduced-motion parity.
- [ ] Every section sits on the 12-column grid; no orphaned floating objects.
- [ ] All §8 floors pass on home, pricing, use-cases, and one compare spoke.

## 10. Open items

0. **The mark.** Round-1 audition (12 directions, `scripts/generate-logos.mjs`) narrowed to the wooden tile. Round 2 develops two families on `/styleguide` "Logo candidates": (a) a single-drawer wooden squircle whose handle is a carved smile with dot eyes (after the ref-trio and face-squircle explorations), in walnut, glowing, and brass finishes; (b) Notion-composition ivory tiles carrying a serif C or the face glyph. Winner gets wired into favicon, nav, and app-icon assets and recorded in brand guide §4.
1. The current hero message is locked for launch. Compare its explorer and demo click-through rates with the prior workflow-to-team headline after instrumentation is live.
2. The two capability gaps (calendar-ops, chief-of-staff cabinets) are specced in `TOWN.md` §4; building them unlocks two more explorer rows.
3. r3f cabinet hero: revisit post-launch (§5.1).
4. A live "ask" input in the hero (Town's trick) requires a hosted inference path we do not have on a static marketing site; consider a scripted typewriter demo instead, clearly labeled as illustrative.
