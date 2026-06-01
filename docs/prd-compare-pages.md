# PRD: World-Class Comparison Pages

**Owner:** Growth / PMM
**Surface:** `runcabinet.com/compare/*`
**Status:** Draft v1 (for build)
**Last updated:** 2026-05-31

---

## 0. TL;DR (the bet)

Today `/compare` is a single page: one feature matrix plus five short "vs" blurbs. It is honest and on-brand, but it captures none of the high-intent search demand that exists *per competitor*, and it does not close. A buyer who Googles "Notion alternative" or "Glean vs Cabinet" never lands on a page built to win that exact moment.

We will turn `/compare` into a **hub-and-spoke system** of dedicated, SEO-targeted, conversion-built pages:

- **1 hub** (`/compare`) that ranks for category queries and routes to every spoke.
- **N head-to-head pages** (`/compare/cabinet-vs-notion`, etc.), one per competitor, each owning the "X vs Y" and "Y alternative" intent.
- **M alternatives round-ups** (`/compare/notion-alternatives`) that place Cabinet at #1 of a curated list. This is the **highest-converting** comparison keyword class.

Why this matters: comparison pages are bottom-of-funnel. Industry benchmark is **~5 to 10% conversion, roughly 10 to 15x a blog post**, because they meet the buyer at the decision, not the awareness, moment ([Powered by Search](https://www.poweredbysearch.com/blog/competitor-comparison-landing-pages-for-saas/), [Get Passionfruit](https://www.getpassionfruit.com/blog/b2b-comparison-pages-and-alternatives-seo-framework-examples)). One executive reading the Notion page should think: *"This is the only one of these I actually own, and it does three things Notion can't. I want this."*

**The answer to the question in the brief:** Yes, lead the SEO title with the literal "X vs Y" phrase (and a second variant targeting "X alternative"). "Don't get creative" in the title tag; be creative in the H1 and the page. Details in §4.

---

## 1. Goals & non-goals

### Goals
1. **Own the branded-competitor SERP.** Rank top-3 for `cabinet vs <competitor>`, `<competitor> vs cabinet`, `<competitor> alternative`, and `<competitor> alternatives` for our priority competitor set.
2. **Convert the decision moment.** Every spoke drives to one primary action (Get started free / Book a demo) with a clear, honest argument and zero dead ends.
3. **Be credible to a skeptical executive.** Fair to competitors, specific, no fake logos, no invented stats. Credibility is the product here.
4. **Scale without bespoke work.** New competitor = a data entry in `lib/compare.ts`, not a hand-built page. Mirror the proven `solutions.ts` pattern.
5. **Reinforce the wedge on every page:** you own your data (files on disk), bring your own AI, self-hosted, and knowledge + agents + apps in one place.

### Non-goals
- Not a pricing page. Link to `/pricing`; don't reproduce it.
- Not competitor bashing. No FUD, no unverifiable claims, no scraped-and-stale feature accusations.
- Not a generic "Top 20 tools" content farm. Round-ups are curated and defensible (3 to 6 real options), not SEO bait.
- No paid/SEM landing pages in this scope (the structure supports them later).

---

## 2. Success metrics

| Metric | Baseline | 90-day target | 180-day target |
|---|---|---|---|
| Indexed compare URLs | 1 | 12+ | 25+ |
| Top-10 rankings for target "vs"/"alternative" terms | ~0 | 8 | 20 |
| Organic sessions to `/compare/*` | low | 1.5k/mo | 5k/mo |
| Compare → primary CTA click rate | unknown (instrument first) | 6% | 9% |
| Compare-assisted demos booked / signups | unknown | track | grow MoM |
| Avg. scroll depth on spokes | unknown | >55% | >65% |

**Leading indicators to instrument from day one** (see §11): CTA clicks by page and position, comparison-table interactions, FAQ expands, "when to choose the competitor" reads, GitHub-star clicks.

> Note: per-page mid-volume comparison keywords typically yield ~50 to 150 visits/mo each; the program wins on **breadth × intent**, not one hero page.

---

## 3. Audience & search intent → keyword map

**Who:** C-level, VPs, and technical decision-makers evaluating a knowledge/AI tool. Two mindsets:

- **Comparison mindset** ("X vs Y"): already shortlisted two named tools, picking the winner. Bottom-funnel, highest convert-to-trial.
- **Alternative mindset** ("X alternative(s)"): already dislikes or is priced out of the incumbent, building a shortlist. "Alternatives" keywords convert highest of all buying-intent categories ([Grow & Convert](https://www.growandconvert.com/seo/competitor-comparison-landing-pages/)).

**Intent → page-type → URL:**

| Query example | Intent | Page type | URL |
|---|---|---|---|
| `cabinet vs notion`, `notion vs cabinet` | head-to-head | Spoke (vs) | `/compare/cabinet-vs-notion` |
| `notion alternative` (singular) | "is there one better tool" | folded into the vs spoke (H2 + meta + FAQ) | same URL, canonical |
| `notion alternatives` (plural, list) | "give me a shortlist" | Round-up | `/compare/notion-alternatives` |
| `self-hosted notion alternative`, `open source notion alternative` | qualified alternative | round-up H2 + dedicated FAQ entry | round-up URL |
| `best ai knowledge base`, `glean alternatives` | category | Hub + round-up | `/compare` + `/compare/glean-alternatives` |
| `obsidian vs notion vs cabinet` | three-way | optional 1v1v1 spoke (Phase 3) | `/compare/notion-vs-obsidian-vs-cabinet` |

**Decision:** A single, well-built `cabinet-vs-X` page can rank for both "vs" and singular "alternative." We do **not** make a thin `/x-alternative` page; instead the vs page targets both, and a **plural `/x-alternatives` round-up** captures the list-intent separately. This avoids cannibalization while covering the spectrum.

---

## 4. SEO specification (answers the brief directly)

### 4.1 Title tag — lead with the literal comparison phrase
Search behavior rewards the obvious phrasing. Put the matched keyword at the front, keep under ~60 chars, and add a value hook.

**Head-to-head (vs) title formula:**
> `<Competitor> vs Cabinet: <honest hook> (<year>)`

Filled examples:
- `Notion vs Cabinet: The Knowledge Base You Actually Own`
- `Obsidian vs Cabinet: Notes, or a Whole AI Workspace?`
- `Glean vs Cabinet: Search Your Tools, or Own Your Knowledge`
- `Dust vs Cabinet: Connected Assistants vs a Brain You Own`
- `Paperclip vs Cabinet: Agents, Plus the Knowledge They Run On`

> Why "Competitor vs Cabinet" order in the **title** (competitor first): we want to match how people type and read the SERP, and it signals "we'll talk about the tool you already know." The **URL** stays `cabinet-vs-<competitor>` (brand-led, consistent, our domain). Both orders rank; pick one convention and hold it. ([Get Passionfruit](https://www.getpassionfruit.com/blog/b2b-comparison-pages-and-alternatives-seo-framework-examples) recommends leading with the obvious phrase; [Powered by Search](https://www.poweredbysearch.com/blog/competitor-comparison-landing-pages-for-saas/) supports the `/compare/you-vs-them/` folder convention.)

**Alternatives round-up title formula:**
> `<n> Best <Competitor> Alternatives in <year> (Self-Hosted & Open Source)`

- `5 Best Notion Alternatives in 2026 (Own Your Data)`
- `Top Glean Alternatives for Teams That Self-Host`

**Hub title:**
- `Compare Cabinet: Honest Head-to-Heads vs Notion, Obsidian, Glean & More`

### 4.2 H1 — signal objectivity, not a sales scream
The H1 is where we earn trust. Pattern: name both tools + an honesty marker.

- vs: `Notion vs Cabinet: an honest comparison`
- vs (alt): `Cabinet vs Notion: which fits a team that wants to own its knowledge?`
- round-up: `The 5 best Notion alternatives, compared honestly`

### 4.3 URL slugs (house convention)
- Hub: `/compare`
- Head-to-head: `/compare/cabinet-vs-<competitor-slug>` (always Cabinet-first, lowercase, hyphenated)
- Round-up: `/compare/<competitor-slug>-alternatives`
- Optional three-way (Phase 3): `/compare/<a>-vs-<b>-vs-cabinet`

### 4.4 Meta description — comparison framing + real proof
Pattern: one honest sentence on the core difference + one proof point + soft CTA. Use **real** proof (open source, MIT, self-hosted, live GitHub stars), never invented customer counts.

> `Notion locks your data in their cloud. Cabinet keeps it as Markdown files you own, with AI agents and embedded apps built in. Open source, self-hosted. See the honest comparison.`

### 4.5 Structured data (JSON-LD, inline — works with static export)
Add to each page type. Because the site is `output: "export"`, embed `<script type="application/ld+json">` in the server component (no runtime needed).

- **All pages:** `BreadcrumbList` (Home → Compare → This page).
- **Spokes & round-ups:** `FAQPage` for the FAQ accordion (high SERP real-estate via PAA/rich results).
- **Spokes:** `SoftwareApplication` for Cabinet (name, applicationCategory, operatingSystem, offers, sameAs → GitHub). Do **not** mark up competitor review scores we don't own; only use `AggregateRating`/`Review` for Cabinet and only with real, sourced data.

### 4.6 Technical SEO tasks (currently missing in the repo)
- **Add `metadataBase`** in `src/app/layout.tsx` (`https://runcabinet.com`) so OG/canonical resolve to absolute URLs.
- **Per-page `alternates.canonical`** in each `generateMetadata`.
- **Add `src/app/sitemap.ts`** that enumerates static routes + all compare slugs from `lib/compare.ts`. (Next 16 emits `sitemap.xml` at build under `output: export`.)
- **Add `src/app/robots.ts`** pointing to the sitemap.
- **Per-competitor OG image** (see §7.4). Falls back to a branded default if absent.
- **Internal links:** hub ↔ every spoke ↔ related spokes ("Also compared: …"), plus links in from `/solutions/*`, `/industries/*`, and the homepage feature section. The navbar already links `/compare`.

---

## 5. Information architecture

```
/compare                         ← HUB (pillar)
│  • category H1, "how to read this" framing
│  • master matrix (Cabinet vs all)  ← evolved from today's table
│  • grid of head-to-head cards → spokes
│  • grid of alternatives round-ups → round-ups
│  • "the wedge" (3 ownership claims) + CTA
│
├─ /compare/cabinet-vs-notion     ← SPOKE (head-to-head)
├─ /compare/cabinet-vs-obsidian
├─ /compare/cabinet-vs-glean
├─ /compare/cabinet-vs-dust
├─ /compare/cabinet-vs-paperclip
│   └ (Phase 2+) cabinet-vs-{mem, guru, coda, copilot, sana, ...}
│
├─ /compare/notion-alternatives   ← ROUND-UP
├─ /compare/glean-alternatives
└─ /compare/obsidian-alternatives
    └ (Phase 3) /compare/notion-vs-obsidian-vs-cabinet  ← 1v1v1
```

**Routing (matches the `solutions/[role]` pattern):**
- `src/app/compare/page.tsx` → hub (rebuilt).
- `src/app/compare/[slug]/page.tsx` → resolves both spokes and round-ups via `generateStaticParams`, `dynamicParams = false`. Either one dynamic segment that branches on a `kind` field, or two segments (`[vs]` and `[alternatives]`). **Recommendation:** single `[slug]` segment, data record carries `kind: "head-to-head" | "round-up"`, template switches. Keeps URLs flat and routing simple.

---

## 6. Page anatomy (the world-class blueprint)

Synthesized from the highest-converting patterns (Powered by Search, Get Passionfruit, and the Webflow/Ahrefs/Notion exemplars) and adapted to Cabinet's wedge. Order matters: acknowledge → differentiate → prove → de-risk → convert.

### 6.1 Head-to-head spoke (`cabinet-vs-X`)

```
┌─────────────────────────────────────────────────────────────┐
│ NAV (existing SiteNavbar)                                    │
├─────────────────────────────────────────────────────────────┤
│ 1. HERO / VERDICT                                            │
│    eyebrow: "Compare · Cabinet vs Notion"                    │
│    H1: "Notion vs Cabinet: an honest comparison"             │
│    Lead: one-sentence core difference (the category claim)   │
│    ┌── At-a-glance verdict card ───────────────────────────┐ │
│    │  "Choose Cabinet if…"     |  "Stick with Notion if…"  │ │
│    │  3 bullets                |  2 honest bullets          │ │
│    └──────────────────────────────────────────────────────┘ │
│    [ Get started free ]  [ Book a demo ]   ·  Star on GitHub │
│    microcopy: open source · self-hosted · bring your own AI  │
├─────────────────────────────────────────────────────────────┤
│ 2. THE CORE DIFFERENCE (one big idea, not a list)            │
│    "Notion is a cloud wiki. Cabinet is a knowledge OS you    │
│     own." 2–3 short paras + a visual (file tree vs cloud).   │
├─────────────────────────────────────────────────────────────┤
│ 3. THREE DIFFERENTIATORS THAT WIN (cards w/ proof)           │
│    Each: claim → 1-2 sentences → concrete artifact           │
│    e.g. "Files on disk" (show .md tree), "Agents on a        │
│    schedule" (show .jobs yaml), "Embedded apps + terminal".  │
├─────────────────────────────────────────────────────────────┤
│ 4. FEATURE COMPARISON TABLE (focused, ~10–14 rows)           │
│    Two-column emphasis (Cabinet | Notion), check/partial/no  │
│    Reuse the existing renderIcon system. Footnote sources.   │
├─────────────────────────────────────────────────────────────┤
│ 5. WHEN NOTION IS THE BETTER CHOICE (credibility)            │
│    2–3 honest scenarios. THIS is what makes execs trust us.  │
├─────────────────────────────────────────────────────────────┤
│ 6. MIGRATION / "SWITCHING IS EASy"                           │
│    How you move from Notion → Cabinet (import, Markdown).    │
│    Removes the #1 switching objection.                       │
├─────────────────────────────────────────────────────────────┤
│ 7. SOCIAL PROOF (honest)                                     │
│    Switcher quote (illustrative-tagged until real),          │
│    real signals: GitHub stars (live), MIT, "Featured in".    │
│    NO fake customer logos.                                   │
├─────────────────────────────────────────────────────────────┤
│ 8. FAQ ACCORDION (5–7 Q, FAQPage schema)                     │
│    Incl. "Is Cabinet a good Notion alternative?",            │
│    "Is it really self-hosted?", "Can I bring my own AI?"     │
├─────────────────────────────────────────────────────────────┤
│ 9. PRIMARY CTA BLOCK (single, high-contrast)                 │
│    H2 restates the win. [Get started free] [Book a demo]     │
├─────────────────────────────────────────────────────────────┤
│ 10. RELATED COMPARISONS (internal links)                     │
│     "Also compared: vs Obsidian · vs Glean · Notion          │
│      alternatives". Links to siblings + hub.                 │
└─────────────────────────────────────────────────────────────┘
```

**Section rationale**
- **Verdict-first** (the "Choose X if…/Stick with Y if…" box) is the single highest-leverage element: it respects the executive's time and signals fairness in the first screen. Modeled on Webflow's clarity and Ahrefs's data-confidence.
- **"When the competitor is better"** is counter-intuitive but converts: it disarms the "this is just a biased vendor page" reflex. Mandatory.
- **One primary CTA per major break**, but a single *style* of primary action repeated (Get started free) so we never confuse the buyer. Secondary = Book a demo. Tertiary = Star on GitHub.

### 6.2 Alternatives round-up (`X-alternatives`)

```
1. HERO: "The 5 best Notion alternatives (2026)" + why people leave Notion
2. #1 PICK: Cabinet, expanded (the wedge, 3 reasons) + CTA
3. THE SHORTLIST: 3–5 real alternatives, each a fair card:
      name · one-line · best for · the catch · (link to vs page if we have one)
4. DECISION FRAMEWORK: "Pick X if you need…, pick Cabinet if…"
      a small matrix (pricing model, hosting, data ownership, AI, fit)
5. FAQ (FAQPage schema): "What's the best self-hosted Notion alternative?" etc.
6. CTA block + related round-ups/hub
```

Round-ups list **genuine** competitors (including ones we don't beat on every axis) and state each one's real strengths. Cabinet wins on the wedge, stated plainly, and is positioned #1 because the page is about teams who want ownership.

### 6.3 Hub (`/compare`)
- H1 + category framing ("How to read these comparisons / what makes Cabinet different").
- **Master matrix** (today's table, kept and polished) — the "see everything at once" view.
- **Card grid → spokes** ("Cabinet vs Notion", etc., each with the one-line angle).
- **Card grid → round-ups**.
- The wedge block (reuse the 3 ownership claims from `solution-template.tsx`) + CTA.

---

## 7. Design specification

Use the existing **enterprise design system** (`.ent-*` in `globals.css`) and the warm parchment palette. No new color tokens. This is a marketing surface for executives: calm, confident, lots of whitespace, one idea per section.

### 7.1 Tokens & type (already in repo)
- Background: `bg-bg` / section alternation with `bg-bg-warm` (as `solution-template` does).
- Headings: `.font-display` / `.ent-display-2` / `.ent-display-3`.
- Body: `.font-body-serif` for prose, `.ent-lead` for leads.
- Eyebrows: `.section-label` (mono) or `.ent-eyebrow`.
- Accent = brown (`--accent`); **sage green** (`--green`) reserved for "Cabinet wins / included" cells; `--text-muted` for competitor "no".
- Cards: `.ent-card` / `.ent-card-hover`. Buttons: `.ent-btn-primary` / `.ent-btn-secondary`.

### 7.2 Signature visual: the Verdict scale-bar
Differentiate from a plain table (Webflow's lesson). For the 3 headline differentiators, render a **horizontal "advantage" bar**: Cabinet (accent/sage) vs Competitor (neutral), with the row label centered. Subtle, on-brand, not gimmicky. Falls back to a clean two-column check row if motion is reduced (respect `prefers-reduced-motion`, already a site convention).

### 7.3 Comparison table component
- Reuse `renderIcon` logic (Check = sage/accent, Minus = "partial", X = muted) from the current page.
- **Cabinet column visually pinned/emphasized** (accent header, subtle tinted column) so the eye lands there.
- Sticky header on scroll for long tables (CSS only).
- Each ambiguous row gets a `title`/footnote with a **source or date** ("as of 2026-05"). Honesty = credibility.
- Mobile: horizontal scroll (already handled) OR a stacked "Cabinet vs X per feature" accordion for small screens (preferred for execs on phones).

### 7.4 OG images
- Template per competitor: "Cabinet vs `<Competitor>`" lockup on parchment, both wordmarks, the one-line angle. Static PNGs in `/public/compare/` referenced from metadata. Default branded fallback if a specific one is missing.

### 7.5 Accessibility
- Color is never the only signal in the table (icon + aria-label "Included / Partial / Not included").
- Contrast AA on parchment (existing palette passes; verify accent-on-white for small text).
- Accordion = real `<button>`/`<details>` semantics; FAQ keyboard-navigable.

---

## 8. Content & copy guidelines (non-negotiable)

These pages live or die on credibility. Follow `AGENTS.md` to the letter.

1. **No em dashes.** Anywhere. Period, comma, colon, parentheses, or rewrite. (House rule; it reads as AI and costs us credibility with this audience.)
2. **No invented numbers.** No "10,000+ teams", no fake G2 scores, no made-up time-savings on these pages. Use only: live GitHub stars, MIT/open-source, self-hosted, "Featured in" press we actually have. Anything illustrative gets the existing **"Illustrative"** tag (same convention as `solution-template`).
3. **Be fair.** Every spoke must credit the competitor in the hero acknowledgment and include a real "when they're the better choice" section. State competitor strengths in their own words where possible.
4. **Be specific, not adjectival.** "Markdown files in a folder you can `grep` and `git`" beats "powerful, flexible knowledge management."
5. **One core idea per page.** Notion = ownership/cloud-lock. Obsidian = single-player notes vs a team OS. Glean = search-over-your-tools vs author-and-own. Dust = connectors vs a file-based brain. Paperclip = agents vs agents + the knowledge they run on.
6. **No defamation, no scraped private claims.** Compare on publicly verifiable, current facts. Date the table. Add a quiet "Comparisons reflect publicly available information as of `<date>`; corrections welcome at hi@runcabinet.com" line. (Legal entity / contact per project memory: HOLY BIBLE APPS LTD, public contact hi@runcabinet.com, no physical address.)
7. **Tone:** a respected operator talking to a buyer. Confident, plain, short sentences.

---

## 9. Data model (mirror `solutions.ts`)

New file `src/lib/compare.ts`. One record powers a spoke's metadata, hero, table column, and copy. Round-ups are a second record type. Sketch:

```ts
export type Verdict = { chooseUs: string[]; chooseThem: string[] };
export type Diff = { title: string; body: string; artifact?: string }; // artifact = code/img hint
export type Faq = { q: string; a: string };
export type Row = { feature: string; cabinet: Cell; them: Cell; note?: string }; // Cell = true|false|"partial"

export type Comparison = {
  slug: string;                 // "cabinet-vs-notion"
  kind: "head-to-head";
  competitor: string;           // "Notion"
  competitorSlug: string;       // "notion"
  category: string;             // "Team wiki"
  // SEO
  title: string;                // "Notion vs Cabinet: ..."
  metaDescription: string;
  ogImage?: string;             // /compare/cabinet-vs-notion.png
  // Content
  h1: string;
  lead: string;                 // the core-difference sentence
  verdict: Verdict;
  coreDifference: string[];     // 2–3 short paras
  differentiators: Diff[];      // exactly 3
  rows: Row[];                  // 10–14 focused rows (can extend the shared master set)
  whenThemWins: string[];       // 2–3 honest scenarios  ← required
  migration?: string;           // how to switch in
  switcherQuote?: { quote: string; attribution: string; illustrative: boolean };
  faqs: Faq[];                  // 5–7
  related: string[];            // sibling slugs
};

export type Roundup = {
  slug: string;                 // "notion-alternatives"
  kind: "round-up";
  competitor: string;           // "Notion"
  title: string; metaDescription: string; ogImage?: string;
  h1: string; whyLeave: string[]; // reasons people seek alternatives
  alternatives: { name: string; line: string; bestFor: string; catch: string; vsSlug?: string }[];
  framework: Row[];             // decision matrix
  faqs: Faq[];
};

export const COMPARISONS: Comparison[] = [ /* ... */ ];
export const ROUNDUPS: Roundup[] = [ /* ... */ ];
export const getComparison = (slug: string) => COMPARISONS.find(c => c.slug === slug);
export const getRoundup = (slug: string) => ROUNDUPS.find(r => r.slug === slug);
export const allCompareSlugs = () => [...COMPARISONS, ...ROUNDUPS].map(x => x.slug);
```

A shared **master feature set** (the rows already in today's table) can live as a constant; each spoke selects/extends the rows most relevant to that competitor so tables stay focused (~10 to 14 rows), not exhaustive.

**Components:** `src/components/compare-head-to-head.tsx`, `src/components/compare-roundup.tsx`, shared `compare-table.tsx` and `compare-verdict.tsx`. Same structure as `solution-template.tsx`.

---

## 10. CTA & conversion spec

Cabinet's real funnel, mapped to each page:

| Action | Component | Where on page |
|---|---|---|
| **Primary: Get started free** | `.ent-btn-primary` → `/#get-started` (download / OSS) | Hero verdict, mid-page after differentiators, final CTA block |
| **Secondary: Book a demo** | `.ent-btn-secondary` → `/demo` | Beside primary in hero + final block |
| **Tertiary: Star on GitHub** | text link, live star count | Hero microcopy, social-proof block |
| **Cloud waitlist** | existing waitlist popup/capture | optional, footer of round-ups only (don't dilute spokes) |

Rules: one *primary* style repeated (never two competing primary CTAs in view); demo is the considered-buyer path; GitHub is the proof path. Final CTA restates the page's single win ("Own your knowledge. Keep your AI. Start free.").

---

## 11. Analytics & instrumentation

Use the existing `src/lib/analytics.ts`. Fire events with `{ page: slug, competitor }`:
- `compare_cta_click` (props: `action` = start|demo|github, `position` = hero|mid|final)
- `compare_table_view` (in-viewport) and `compare_row_hover` (optional)
- `compare_faq_expand` (`question`)
- `compare_related_click` (`target_slug`)
- `compare_verdict_view`

Dashboards: per-slug CTA rate, scroll depth, FAQ engagement, spoke→spoke flow. Wire Search Console to track ranking per target term. Define the conversion event (demo booked / download) and attribute compare-assisted.

---

## 12. Competitor prioritization & build order

Score = search demand × strategic fit × ease of an honest win.

| Competitor | Angle (core difference) | Demand | Priority | Phase |
|---|---|---|---|---|
| **Notion** | Cloud wiki vs knowledge you own (files on disk) | Very high | P0 | 1 |
| **Obsidian** | Single-player notes vs a team AI workspace | High | P0 | 1 |
| **Glean** | Search over your tools vs author-and-own + agents | High (enterprise) | P0 | 1 |
| **Dust** | Connector assistants vs a file-based brain agents own | Med-high | P1 | 1 |
| **Paperclip** | Agent orchestration vs agents + the knowledge layer | Med | P1 | 2 |
| Mem / Reflect | AI notes vs ownership + agents + apps | Med | P2 | 2 |
| Guru / Coda | Wiki/doc vs self-hosted OS | Med | P2 | 2 |
| Microsoft Copilot / ChatGPT Enterprise | Bundled cloud AI vs BYO-AI, self-hosted | High (hard win) | P2 | 3 |
| Sana / AnythingLLM / Open WebUI | Adjacent self-hosted AI | Niche | P3 | 3 |

**Round-ups (Phase 2):** `notion-alternatives`, `glean-alternatives`, `obsidian-alternatives` (highest-converting keyword class).

---

## 13. Implementation plan

**Phase 1 — Foundation + P0 spokes (this build)**
1. `lib/compare.ts` + types; author Notion, Obsidian, Glean, Dust records (real, fair copy).
2. `compare/[slug]/page.tsx` (`generateStaticParams`, `dynamicParams=false`, `generateMetadata` with canonical + OG + JSON-LD).
3. `compare-head-to-head.tsx` + shared `compare-table.tsx` + `compare-verdict.tsx`.
4. Rebuild `compare/page.tsx` as the hub (keep master matrix, add card grids).
5. Infra: `metadataBase` in layout, `sitemap.ts`, `robots.ts`, FAQ/Breadcrumb/SoftwareApplication JSON-LD.
6. Internal links from `/solutions/*`, homepage feature block, hub.

**Phase 2 — Round-ups + more spokes**
7. `compare-roundup.tsx` + `notion/glean/obsidian-alternatives` records.
8. Paperclip, Mem, Guru, Coda spokes. Per-competitor OG images.

**Phase 3 — Depth**
9. 1v1v1 pages, migration guides as standalone, Copilot/ChatGPT-Enterprise spokes, real switcher case studies replacing illustrative quotes.

---

## 14. Acceptance criteria (Phase 1)

- [ ] `/compare` hub: category framing, master matrix, card grids to all spokes, wedge + CTA. No em dashes anywhere.
- [ ] 4 spokes live and statically exported: `cabinet-vs-{notion,obsidian,glean,dust}`.
- [ ] Each spoke has: verdict box, core difference, exactly 3 differentiators, focused table (10 to 14 rows, dated/sourced), **"when the competitor wins"**, FAQ (5 to 7), single repeated primary CTA, related links.
- [ ] Titles follow `<Competitor> vs Cabinet: <hook>`; H1 signals honesty; canonical + meta + OG set per page.
- [ ] JSON-LD: BreadcrumbList + FAQPage + SoftwareApplication validate (Rich Results Test).
- [ ] `sitemap.xml` and `robots.txt` emit at build and include every compare URL.
- [ ] No fake logos, no invented stats; illustrative content tagged; corrections/contact line present.
- [ ] Mobile: table is legible (scroll or stacked); CTAs reachable; AA contrast; reduced-motion respected.
- [ ] Analytics events fire for CTA/table/FAQ/related.
- [ ] Lighthouse SEO ≥ 95; no layout shift from the table.

---

## 15. Risks & open questions

**Risks**
- *Bias perception.* Mitigation: mandatory "when they win" + dated/sourced tables + fair acknowledgments.
- *Stale claims about competitors.* Mitigation: date stamp, public-info disclaimer, quarterly review, corrections email.
- *Thin/duplicate pages hurting SEO.* Mitigation: each page has genuinely unique core-difference copy and FAQ; no boilerplate-only pages; round-ups distinct from spokes.
- *Legal (comparative advertising).* Keep to verifiable public facts; no trademarks misused; competitor names only nominatively. Route anything spicy past the owner.

**Open questions (need a decision)**
1. **Title order:** "Notion vs Cabinet" (competitor-first, matches search) vs "Cabinet vs Notion" (brand-first). PRD recommends competitor-first in title, Cabinet-first in URL. Confirm.
2. **Routing:** single `[slug]` with `kind` branch (recommended) vs separate segments for vs/alternatives. Confirm.
3. **Switcher quotes:** ship Phase 1 with illustrative-tagged quotes, or omit until real ones exist? PRD: illustrative-tagged, consistent with `solution-template`.
4. **Round-up timing:** Phase 1 or 2? PRD says Phase 2, but `notion-alternatives` is the single highest-intent keyword. Consider pulling it into Phase 1.
5. **OG images:** ship with branded fallback in Phase 1, per-competitor in Phase 2? PRD: yes.
6. **Competitor facts source of truth:** who owns keeping the matrices accurate and on what cadence (suggest quarterly)?

---

## Appendix A — Per-competitor angle cheat-sheet (seed copy)

Grounded in the current `/compare` blurbs + the wedge. Final copy authored in `lib/compare.ts`, em-dash-free.

- **Notion** — *Core difference:* a cloud wiki vs knowledge you own. Notion locks data in their cloud; Cabinet stores everything as Markdown on disk you can grep, git, and back up, with AI agents that read and write it directly. *When Notion wins:* you want a polished all-in-one SaaS with zero ops and don't care about hosting/ownership. *Differentiators:* files on disk, agents on a schedule, embedded apps + terminal.
- **Obsidian** — *Core difference:* a great single-player Markdown editor vs a team knowledge OS. Obsidian has no agents, no scheduled jobs, no embedded apps, no terminal, no team layer. *When Obsidian wins:* solo note-taker who wants the lightest local editor and plugin ecosystem. *Differentiators:* multi-agent team, scheduling/heartbeats, embedded apps, team chat/missions.
- **Glean** — *Core difference:* enterprise search over your existing tools vs where knowledge is authored and owned. Glean indexes other apps; it has no files you own, no editor, no apps, no terminal. *When Glean wins:* large enterprise that only needs federated search across many SaaS systems. *Differentiators:* author-and-own (not just search), self-hosted/BYO-AI, agents + apps in one place.
- **Dust** — *Core difference:* connector-based assistants vs a file-based brain agents own. Dust builds assistants over data that stays locked in other tools; no knowledge base you author in, no Markdown on disk. *When Dust wins:* you want hosted assistants wired to many SaaS connectors and don't need to own the substrate. *Differentiators:* you own the files, self-hosted, agents read/write the same disk.
- **Paperclip** — *Core difference:* agent orchestration vs agents plus the knowledge they run on. Paperclip is strong at org charts, budgets, audit logs, but has no knowledge base, editor, or content layer. *When Paperclip wins:* you only need agent orchestration and already have a knowledge system. *Differentiators:* a real wiki/brain for agents, embedded HTML apps, web terminal, file-based everything.

---

## Appendix B — Research sources

- Powered by Search — [Competitor Comparison Landing Pages for SaaS](https://www.poweredbysearch.com/blog/competitor-comparison-landing-pages-for-saas/) · [10 Best Comparison Page Examples](https://www.poweredbysearch.com/learn/best-saas-comparison-pages/)
- Get Passionfruit — [B2B Comparison Page SEO Framework (VS & Alternatives)](https://www.getpassionfruit.com/blog/b2b-comparison-pages-and-alternatives-seo-framework-examples)
- Grow & Convert — [Competitor Comparison Landing Pages: 3 Strategies](https://www.growandconvert.com/seo/competitor-comparison-landing-pages/)
- Triple Dart — [Effective Competitor Comparison Landing Page (SEO)](https://www.tripledart.com/saas-seo/competitor-comparison-landing-pages)
- Navattic — [Top SaaS Comparison Pages](https://www.navattic.com/blog/saas-comparison-pages) · SaaS Landing Page — [15 Best Comparison Page Examples](https://saaslandingpage.com/articles/15-best-comparison-page-examples-and-why-they-work/)
</content>
</invoke>
