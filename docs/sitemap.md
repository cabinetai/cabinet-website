# Cabinet Website Sitemap

**Owner:** Design / Growth
**Surface:** runcabinet.com
**Last updated:** 2026-06-15
**Companion docs:** `docs/brand-guide.md`, `docs/prd-frontend-redesign.md`

Two tracks share the same brand but use different chrome: the **public** track (floating liquid-glass nav, `SiteNavbar`) and the **enterprise** track (frosted-glass header, `EnterpriseNav`). Dynamic routes are data-driven from `src/lib/*`.

---

## 1. Public track (`SiteNavbar`)

```
/                                   Home (hero, features, agents, integrations, principles, get-started)
├─ /pricing                         Self-hosted free + Cabinet Cloud (Pro/Max/Enterprise), BYOAI vs managed
├─ /compare                         Comparison hub (matrix + card grids to spokes)
│   └─ /compare/[slug]              Data-driven from src/lib/compare.ts
│       ├─ cabinet-vs-notion        head-to-head
│       ├─ cabinet-vs-obsidian      head-to-head
│       ├─ cabinet-vs-glean         head-to-head
│       ├─ cabinet-vs-dust          head-to-head
│       ├─ cabinet-vs-paperclip     head-to-head
│       ├─ cabinet-vs-mem           head-to-head
│       ├─ cabinet-vs-guru          head-to-head
│       ├─ cabinet-vs-coda          head-to-head
│       ├─ cabinet-vs-microsoft-copilot     head-to-head
│       ├─ cabinet-vs-chatgpt-enterprise    head-to-head
│       ├─ notion-alternatives      round-up
│       ├─ glean-alternatives       round-up
│       ├─ obsidian-alternatives    round-up
│       ├─ notion-vs-obsidian-vs-cabinet    three-way
│       ├─ migrate-from-notion      migration guide
│       └─ migrate-from-obsidian    migration guide
├─ /solutions                       "Cabinet for [role]" hub (6 roles)
│   └─ /solutions/[role]            Data-driven from src/lib/solutions.ts
│       ├─ sales                    icon: sales (trend)
│       ├─ marketing                icon: marketing (megaphone)
│       ├─ engineering              icon: engineering (</>)
│       ├─ product                  icon: product (compass)
│       ├─ operations              icon: operations (nodes)
│       └─ founders                 icon: founders (rocket)
├─ /industries                      "Cabinet for [industry]" hub (5 verticals)
│   └─ /industries/[industry]       Data-driven from src/lib/industries.ts
│       ├─ financial-services       icon: financial (bank)
│       ├─ healthcare               icon: healthcare (heart-pulse)
│       ├─ legal                    icon: legal (scales)
│       ├─ professional-services    icon: professional (briefcase)
│       └─ startups                 icon: startups (spark)
├─ /demo                            Book a demo (form)
├─ /cloud                           Cabinet Cloud waitlist (coming soon)
├─ /waitlist                        Cloud waitlist capture (Tally)
├─ /waitlist-confirmed              Post-signup confirmation
├─ /wishlist                        Feature requests
├─ /media                           Press / mentions
├─ /styleguide                      Internal design-system reference (in-app)
├─ /terms                           Terms of Service
└─ /privacy                         Privacy Policy
```

## 2. Enterprise track (`EnterpriseNav`, `src/app/enterprise/layout.tsx`)

```
/enterprise                         Executive positioning home
├─ /enterprise/platform             Files, agents, workspace deep-dive
├─ /enterprise/security             Security, compliance, audit trail
├─ /enterprise/solutions            Enterprise use cases
├─ /enterprise/about                Founder story (Hila Shmuel, ex-Apple)
└─ /enterprise/briefing             Executive briefing request (form)
```

## 3. Non-route assets / tooling

- **Brand assets:** `public/brand/` (logo states + flips, smiley/face variants). Icon library = wood-object icons in `public/generated/_explore/obj-*.png` (promote locked ones to `public/brand/icons/`).
- **Generated motifs:** `public/generated/` (home hero + per-page motifs); explorations in `public/generated/_explore/`.
- **Style lab (asset + system review):** `public/style-lab.html`. Brand foundations plus every generated asset, each labeled with its id and re-run command (see PRD §"Asset review workflow").
- **Generators:** `scripts/generate-images.mjs` (production motifs), `scripts/explore-styles.mjs` (explorations), `scripts/brand-states.mjs` (logo states), `scripts/cutout-checker.mjs` (background removal), `scripts/lib/imagegen.mjs` (shared).

## 4. Global elements

- **Nav:** `SiteNavbar` (public, floating glass pills) · `EnterpriseNav` (enterprise, frosted bar) · `SolutionsMenu` (the "Cabinet for…" dropdown).
- **Footers:** homepage footer + `enterprise/footer.tsx`.
- **SEO:** `metadataBase`, per-page metadata/canonical/OG, sitemap.xml + robots (verify coverage, see PRD).

## 5. Crawl priority (for sitemap.xml + internal linking)

1. `/`, `/pricing`, `/compare` and top spokes (notion/obsidian/glean), `/solutions/*`, `/industries/*`.
2. `/enterprise`, `/enterprise/security`, `/enterprise/platform`.
3. Remaining compare spokes, `/media`, `/demo`, `/cloud`.
4. Utility/legal (`/terms`, `/privacy`, `/waitlist*`, `/wishlist`); exclude `/styleguide` from indexing.
