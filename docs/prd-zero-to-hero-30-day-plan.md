# Cabinet Website: 30-Day Zero-to-Hero Plan

**Owner:** Founder, product, and growth  
**Team:** Two developers  
**Capacity:** 22 working days, 44 developer-days  
**Status:** Ready for kickoff  
**Target audience:** Chief AI Officers, CTOs, CIOs, VPs of AI, VPs of Operations, and technical buyers  
**Primary conversion:** Book an executive demo  
**Secondary conversion:** Watch the product tour, then download or evaluate Cabinet  

## 0. The decision

Cabinet does not need more sections. It needs a clearer point of view, stronger product proof, and less friction.

The new site will lead with one idea:

> Cabinet is the place where a company's knowledge, AI team, and operational work live together, in an environment the company controls.

The homepage will be rebuilt around real Cabinet product scenes from onboarding and Help. The signature experience will be a living Cabinet: three product drawers reveal knowledge and files, the AI team, and work in motion. The rest of the page will be restrained, direct, and evidence-led.

This is a focused redesign, not an exercise in adding decoration. The program removes weak material as aggressively as it adds stronger material.

## 1. Evidence from the current audit

The site has a stronger foundation than its current experience suggests. It already has a distinct brand, real product depth, named testimonials, approximately 2.4K GitHub stars, 25 routed pages, product footage, role and industry content, and a large asset library. The problem is that these assets compete instead of forming one sales story.

| Signal | Current evidence | Business impact | Decision |
|---|---|---|---|
| Homepage length | About 21,766 px on a 1440 px desktop and 35,091 px on a 390 px mobile viewport | Buyers cannot distinguish the essential story from supporting material | Reduce the homepage to 9 or 10 purposeful sections |
| Narrative density | 22 major sections on the homepage | Multiple competing theses and repeated explanations | One idea per section and one proof per claim |
| Opening frame | A long pinned scrollytelling sequence appears before the conventional hero | Product value is delayed and mobile starts with a mostly empty, blurred frame | Show the value proposition and real product UI immediately |
| Mobile navigation | Only Cabinet and Download are visible. There is no menu | Critical buyer pages disappear on mobile | Ship a complete accessible mobile menu in week 2 |
| Conversion interruption | A timed Cabinet Cloud modal can cover product footage mid-scroll | The site interrupts the moment it should be building conviction | Remove the timed homepage popup |
| Heading semantics | The visible homepage has no H1. The only H1 is inside commented code | Search, accessibility, and document structure are weakened | One clear H1 on every page |
| Technical structure | `src/app/page.tsx` is a 2,177-line client component | The flagship route carries too much client logic and is hard to tune | Rebuild server-first with small client islands |
| Product truth | Cabinet onboarding and Help already contain strong demos for knowledge, agents, tasks, cabinets, routines, approvals, providers, skills, and API keys | The strongest explanation is inside the product, not on the website | Reuse those presentational scenes through a capture mode |
| Video | The existing demo is 58 seconds, 1280 by 878, and about 3.8 MB | Useful source material, but too long and dated for a hero loop | Produce a new 20 to 25 second loop and a 75 to 90 second overview |
| Claims | The site mixes named testimonials, illustrative stories, broad integration language, and headings such as “10x work” | A senior buyer may question what is real | Create a claim and proof ledger before copy is approved |
| Build readiness | The local production build ran out of disk space. Only about 132 MB remained during the audit | Build, video export, and QA will be unreliable | Free at least 20 GB before implementation begins |

### What to keep

- The warm Cabinet identity and the drawer metaphor.
- The Fraunces, Geist, Instrument Serif, and Martian Mono roles.
- The product's existing onboarding tour and Help demo language.
- Named testimonials with verifiable identities.
- Open source, self-hosted, bring your own AI, git history, and owned data as trust proof.
- Real product screenshots and code-rendered product scenes.
- Role, industry, compare, pricing, and enterprise content that passes the proof audit.

### What to remove or demote

- The scroll-controlled opening scene in its current form.
- The timed Cabinet Cloud popup on the homepage.
- Repeated explanations of the same ownership point.
- Broad logo walls that imply unsupported integrations.
- Illustrative customer stories in positions where they can be mistaken for customer proof.
- Decorative cards that do not help a buyer understand, trust, or act.
- A separate-looking enterprise site. Enterprise confidence should be part of the main brand.
- Download as the dominant action for executive traffic.

## 2. The job of the site

The homepage has one job:

> Move a qualified executive from “What is this?” to “I need to see this with my company’s workflows” in under three minutes.

The visitor should be able to answer these questions without hunting:

1. What is Cabinet?
2. What work does it do that a chatbot or wiki does not?
3. What does the product actually look like?
4. How does it work with our files, models, and tools?
5. What remains under our control?
6. What will security and platform teams ask?
7. What is the next step for an evaluation?

## 3. Positioning and message hierarchy

### Primary message

**One place where your company's knowledge and AI team work together.**

Supporting copy:

> Cabinet brings files, live apps, AI agents, tasks, and team conversations into an environment you control.

### Message hierarchy

1. **Capability:** The company can see its knowledge, files, live apps, agents, and work in one place.
2. **Execution:** Agents research, draft, update, and run scheduled work with shared context.
3. **Control:** The company chooses the infrastructure, models, keys, and data location.
4. **Proof:** The product is open source, self-hosted, git-backed, and already used by credible operators.
5. **Action:** Book a demo around a real company workflow.

Ownership remains a decisive advantage, but it should support the capability story instead of replacing it.

### Suggested hero copy for prototype testing

**H1:** One place where your knowledge and AI team work together.

**Lead:** Cabinet brings files, live apps, agents, tasks, and team conversations into an environment your company controls.

**Primary CTA:** Book an executive demo

**Secondary CTA:** Watch the 90-second tour

**Proof line:** Open source. Self-hosted. Bring your own AI.

This copy is a prototype, not a final claim set. It must pass five-second testing in week 1.

## 4. Creative direction: The Living Cabinet

### Subject

Cabinet is an operating environment for company knowledge and AI work. The primary audience is an executive who needs leverage and control. The page's single job is to earn an evaluation call.

### Signature element

The memorable element is a living product cabinet with three drawers:

1. **Knowledge:** files, pages, PDFs, spreadsheets, code, and live apps.
2. **AI team:** agents, personas, skills, providers, and conversations.
3. **Work:** tasks, routines, approvals, artifacts, and dashboards.

The drawers use the real Cabinet mark as the entry point, then resolve into real product UI. The interaction is not a literal furniture animation for its own sake. Each drawer proves a product capability.

### One justified aesthetic risk

Use the Cabinet mark as the spatial navigation system for the hero. Opening a drawer changes the product stage and the supporting copy. This is a risk because it is more custom than a standard screenshot hero. It is justified because no other product can use this interaction with the same meaning.

The rest of the site should be quiet enough that this one moment remains memorable.

### Palette

The existing brand stays, with a stronger contrast stage for product proof.

| Name | Hex | Role |
|---|---:|---|
| Archive paper | `#FAF6F1` | Main canvas |
| Clean sheet | `#FFFDFC` | Product cards and readable surfaces |
| Walnut ink | `#211B18` | Hero product stage and strong text |
| Rich brown | `#3B2F2F` | Main brand text |
| Cedar | `#8B5E3C` | Primary action and active state |
| Sage signal | `#5A7A4F` | Verified, secure, and complete states |

The deep walnut stage should appear only where it increases product contrast. It should not turn the site into another dark software landing page.

### Type

- **Display:** Fraunces, used for the H1 and major section theses only.
- **Body and UI:** Geist, used for explanation, navigation, buttons, and product annotations.
- **Brand word:** Instrument Serif italic, used for the Cabinet wordmark and the product name inside body copy.
- **Data and code:** Martian Mono, used for file names, commands, audit events, and short proof labels.

Headlines should be shorter and less editorial than the current page. Product UI should carry more of the explanation.

### Layout

Desktop opening frame:

```text
+------------------------------------------------------------------+
| Cabinet     Product  Solutions  Security  Pricing      Book demo |
+------------------------------------------------------------------+
|                                                                  |
|  One place where your knowledge       [ LIVING PRODUCT STAGE ]   |
|  and AI team work together.           [ Knowledge / AI / Work ]  |
|                                                                  |
|  Cabinet brings files, live apps,      [ Real Cabinet UI ]        |
|  agents, and work into one place.                                 |
|                                                                  |
|  [Book an executive demo] [Watch 90 seconds]                     |
|  Open source  Self-hosted  Bring your own AI                     |
+------------------------------------------------------------------+
```

Mobile opening frame:

```text
+----------------------------------+
| Cabinet              Menu  Demo  |
+----------------------------------+
| One place where your knowledge   |
| and AI team work together.       |
|                                  |
| Cabinet brings files, agents,    |
| apps, tasks, and conversations   |
| into one place.                  |
|                                  |
| [Book an executive demo]         |
| [Watch the tour]                 |
|                                  |
| [Static product proof frame]     |
| [Knowledge] [AI team] [Work]     |
+----------------------------------+
```

### Self-critique and revision

The existing site already uses a warm cream canvas, a characterful serif, and soft brown cards. Repeating that formula more intensely would make the redesign feel familiar rather than ownable. The revision is to make real product behavior the visual identity. The cabinet illustration becomes navigation and proof, not decoration. Warm cards become supporting surfaces, not the main concept.

## 5. New information architecture

### Global navigation

Keep the navigation to five buyer choices plus one action:

- Product
- Solutions
- Security
- Pricing
- Resources
- Book a demo

Resources contains Docs, Compare, Media, GitHub, and Cabinets. Download remains available on pricing, docs, GitHub, and the final homepage CTA, but it is no longer the dominant executive action.

### Route strategy

The current public and enterprise tracks should use one visual and navigation system.

| Priority | Routes | Required outcome |
|---|---|---|
| P0 | `/`, `/demo`, `/pricing`, `/solutions`, `/enterprise/platform`, `/enterprise/security`, `/enterprise/about` | Ready for seed-round traffic and executive evaluation |
| P1 | `/solutions/[role]`, `/industries/[industry]`, `/compare`, `/compare/[slug]`, `/use-cases` | Consistent templates, proof, and conversion path |
| P2 | `/media`, `/cloud`, `/wishlist`, legal, confirmation pages | System conformance and credibility cleanup |

In week 1, decide whether `/enterprise/platform`, `/enterprise/security`, and `/enterprise/about` become the canonical `/platform`, `/security`, and `/about` routes. The recommended answer is yes, with redirects from the enterprise URLs. Enterprise readiness should not feel like a separate product.

## 6. The new homepage, section by section

Target: 9 or 10 sections, under 12,000 px on desktop and under 18,000 px on mobile.

### 1. Hero: the thesis

**Question answered:** What is Cabinet?

- Clear H1 and lead copy visible on first paint.
- Living Cabinet product stage visible without scrolling.
- Primary CTA is Book an executive demo.
- Secondary CTA opens the 75 to 90 second product tour in a high-quality player.
- GitHub stars, open source, self-hosted, and bring your own AI appear as a quiet proof line.
- No timed popup, no scroll hijacking, and no delayed headline.

### 2. Credibility rail

**Question answered:** Why should I keep reading?

- Live GitHub star count.
- Three named operator testimonials, shortened to their strongest sentence.
- Founder line: Hila Shmuel, formerly Engineering Manager at Apple, with exact verified title wording.
- No illustrative metrics in this rail.

### 3. One operating environment

**Question answered:** What comes together in Cabinet?

Use the product tour's three-part model:

- Knowledge and files
- AI team
- Tasks and routines

Each tab changes a real Cabinet scene. A sentence and one product annotation explain the outcome.

### 4. Knowledge becomes usable

**Question answered:** Is this only Markdown?

Show the `knowledge-demo` and `slide-data` scenes:

- Markdown, PDF, CSV, XLSX, code, notebooks, images, audio, and video.
- Embedded HTML apps and dashboards.
- Search and inline rendering.
- Collaboration and sharing.

The headline must explicitly describe the whole product, not a folder of Markdown files.

### 5. An AI team that does work

**Question answered:** What do the agents actually do?

Use `slide-agents`, `task-board-demo`, and `routines-demo`:

- Assign a task.
- Show the selected agent, provider, and context.
- Show the task running.
- Show created artifacts and a changed dashboard.
- Show a scheduled routine.

This should be the strongest product sequence after the hero.

### 6. Control and approvals

**Question answered:** Can we govern this?

Use `conversations-demo`, `byoai-demo`, and `api-keys-demo`:

- Human approval before an action runs.
- Audit event and git-backed history.
- Provider selection per task.
- Company-owned keys and quota.
- Self-hosted deployment and data residency language that security approves.

Link directly to the Security page.

### 7. Cabinet by role

**Question answered:** Where does my team use it first?

Use three outcome-led stories rather than six equal cards:

- VP of AI: standardize how agents access company knowledge and providers.
- VP of Operations: run recurring reports, reconciliations, and operating reviews.
- Product and engineering leadership: keep decisions, code, product specs, and live tools connected.

The remaining role pages stay available through Solutions.

### 8. Proof from customers

**Question answered:** Has anyone credible seen the value?

- Use only named, approved testimonials in the main proof section.
- Add one detailed case study if a customer approves it during week 1.
- If no detailed case study is approved, show the three named quotes and a transparent “early access” statement.
- Move illustrative scenarios to Use Cases and label them clearly.

### 9. The buying case

**Question answered:** Why now and why this architecture?

A compact comparison explains:

- Cabinet versus a chatbot session.
- Cabinet versus a hosted knowledge base.
- Cabinet versus building an internal agent platform.

Use five rows at most: shared memory, scheduled execution, embedded apps, provider choice, and data control. Link to detailed comparisons.

### 10. Final evaluation CTA

**Question answered:** What happens next?

- Book a 30-minute workflow briefing.
- State what the buyer will receive: a Cabinet workflow mapped to one real process, deployment options, and technical next steps.
- Secondary links: Download Cabinet and review GitHub.
- No newsletter or Cloud popup competes with the action.

## 7. Cabinet product assets to reuse

The Cabinet repo is the source of truth for product visuals. Reuse presentational logic where practical. Do not duplicate product screenshots by hand when a deterministic scene can be rendered from the app.

| Cabinet source | Website use | Output |
|---|---|---|
| `onboarding/tour/slide-intro.tsx` | Hero model and the three-part product explanation | Cabinet shell, Knowledge, AI team, Work |
| `onboarding/tour/slide-data.tsx` | Whole knowledge base and file rendering | Product tab and micro-demo |
| `onboarding/tour/slide-agents.tsx` | Agent persona and team structure | AI team section and 15-second clip |
| `onboarding/tour/slide-tasks.tsx` | Task command and generated output | Hero loop finale |
| `help/demos/knowledge-demo.tsx` | File types, inline rendering, editor, search | Knowledge section and video chapter |
| `help/demos/task-board-demo.tsx` | Kanban, list, schedule, runtime, artifacts | Work section and video chapter |
| `help/demos/routines-demo.tsx` | Always-on scheduled work | Operations story |
| `help/demos/conversations-demo.tsx` | Approvals and audit trail | Governance section |
| `help/demos/cabinets-demo.tsx` | Departments and nested AI teams | Platform page |
| `help/demos/byoai-demo.tsx` | Provider choice | Security and architecture proof |
| `help/demos/api-keys-demo.tsx` | Company-owned keys and quota | Procurement proof |
| `help/demos/skills-demo.tsx` | Agent playbooks | Platform detail, not the homepage |
| Existing `demo.webm` | Story reference and comparison baseline | Retired after the new exports ship |

### Reuse rule

Extract only pure visual components and demo data. Do not import Cabinet's Zustand stores, daemon dependencies, filesystem logic, or authenticated state into the marketing site.

The recommended implementation is a capture studio inside the Cabinet repo, not a shared runtime dependency between the two applications.

## 8. Motion and interaction specification

Motion has four jobs: explain hierarchy, show cause and effect, direct attention, and confirm state.

### Hero sequence

- Total ambient sequence: 8 to 10 seconds.
- The complete message and a stable product frame appear on first paint.
- The three drawers advance only after the visitor can understand the initial state.
- Hover or click pauses auto-advance and gives control to the visitor.
- A visible progress control shows Knowledge, AI team, and Work.
- The final state shows a task artifact appearing in the knowledge base and a dashboard updating.
- The sequence never controls page scroll.

### Page motion

- Section entrances: 180 to 280 ms, opacity plus 8 to 16 px movement.
- Product tab change: 240 to 360 ms with shared element transitions where useful.
- Buttons: 120 to 180 ms. Small lift and shadow change only.
- Product annotations: one at a time, placed beside the exact UI element they explain.
- Testimonial and logo areas: static by default. No endless marquees unless the motion proves a relationship.

### Mobile motion

- Use a stable poster frame on initial load.
- Replace parallax and long horizontal travel with cross-fades or short vertical transitions.
- No blurred copy, cropped primary message, or content that depends on 1,000 px of scroll before it becomes legible.

### Reduced motion

- Disable auto-advance.
- Render the current tab as a static product frame.
- Remove transforms, blur animation, refraction, and continuous loops.
- Preserve every piece of information and every control.

## 9. Demo production system

The site should not rely on ad hoc screen recordings. Build a repeatable capture studio in `/Users/mybiblepath/Development/cabinet`.

### Capture studio requirements

- Internal route: `/demo-studio/[story]` or an equivalent non-production route.
- Fixed 16:9 and website hero canvases.
- Deterministic fixture data, clock, cursor path, animation timing, and viewport.
- No daemon, account, local storage, or live network dependency.
- Capture flag that removes controls, debug chrome, and development badges.
- Scene manifest with title, duration, caption, and product version.
- One command to render frames and export video.
- MP4 and WebM output, plus poster JPG or AVIF.
- Captions baked into social exports and provided as a separate VTT file for the 90-second tour.

### Video deliverables

| Asset | Length | Use | Target |
|---|---:|---|---|
| Hero loop | 20 to 25 seconds | Homepage hero, silent autoplay | Under 2.5 MB WebM, clear without audio |
| Executive overview | 75 to 90 seconds | Homepage modal, demo follow-up, investor outreach | 1080p, captions, optional voiceover |
| Knowledge clip | 12 to 18 seconds | Product and Platform pages | Files to live app |
| AI team clip | 12 to 18 seconds | Homepage and Solutions | Agent receives context and acts |
| Work clip | 12 to 18 seconds | Homepage and Operations | Task, routine, artifact, dashboard |
| Governance clip | 12 to 18 seconds | Security page | Approval, provider, history |
| Investor cut | 30 to 40 seconds | Seed deck and meeting opener | Fast narrative, no site chrome |
| Still pack | 12 images | Open Graph, deck, press, social | 16:9, 4:3, and square crops |

### Executive overview storyboard

1. **0 to 7 seconds:** Cabinet opens. Knowledge, AI team, and Work are visible as one system.
2. **7 to 22 seconds:** Files of several types render inline. A live app opens from the knowledge tree.
3. **22 to 38 seconds:** A user assigns a task to an agent with selected context and provider.
4. **38 to 54 seconds:** The task runs, asks for approval, then creates artifacts.
5. **54 to 67 seconds:** A routine schedules the work and a dashboard updates.
6. **67 to 80 seconds:** Provider choice, owned keys, audit history, and self-hosting appear.
7. **80 to 90 seconds:** Book a workflow briefing or run Cabinet yourself.

### Production rules

- Use real product UI and truthful fixture data.
- Show cause and effect. Do not montage unrelated screens.
- Keep the cursor deliberate and slow enough to follow.
- Every clip must make sense muted.
- Use captions in Geist, not a decorative display face.
- Record at device pixel ratio 2 where practical, then downsample cleanly.
- Keep text large enough to read at 1280 px wide.
- Version and date every export so old UI footage can be identified.

## 10. Technical architecture for the website

Before implementation, read the relevant Next.js 16 guides in `node_modules/next/dist/docs/` as required by the repository instructions.

### Server-first composition

Rebuild the homepage as a server component that composes focused sections. Keep client code only where interaction requires it.

Recommended structure:

```text
src/app/page.tsx                         Server composition
src/components/marketing/home-hero.tsx  Server shell
src/components/marketing/living-cabinet.tsx  Client island
src/components/marketing/product-story.tsx  Client island
src/components/marketing/proof-rail.tsx      Server
src/components/marketing/control-section.tsx Server
src/components/marketing/role-stories.tsx    Server or small client island
src/components/marketing/final-cta.tsx       Server
src/lib/marketing/claims.ts              Approved proof and copy data
src/lib/marketing/demo-manifest.ts        Video and poster metadata
```

### Component system

Create and document these primitives in `/styleguide`:

- `MarketingShell`
- `SectionThesis`
- `ExecutiveButton`
- `ProductFrame`
- `ProductAnnotation`
- `EvidenceRail`
- `ProofQuote`
- `SecurityFact`
- `DemoPlayer`
- `MobileMenu`

No new primitive ships before it appears in the styleguide with mobile, focus, hover, loading, and reduced-motion states.

### Performance strategy

- Do not load the hero video until a poster is painted.
- Use a static first frame and lazy-load non-critical video chapters.
- Dynamically import the living product interaction.
- Keep the first viewport free of large logo grids and non-essential scripts.
- Split analytics from the initial interaction path.
- Use `next/image` with fixed dimensions and modern formats.
- Remove GIF from the primary site experience.
- Use CSS transforms and opacity for motion. Avoid layout-driven animation.
- Budget every client island and remove unused Lucide imports.

### Accessibility strategy

- One H1 per page and logical heading order.
- Full keyboard control for drawer tabs, video, nav, and product scenes.
- Visible focus, not color-only selection.
- Captions, transcripts, and pause controls for video.
- No autoplay with sound.
- Reduced-motion behavior tested, not assumed.
- Test at 200% zoom and down to 320 px width.

### Analytics

Instrument:

- Hero primary and secondary CTA.
- Hero product tab selection.
- Video start, 25%, 50%, 75%, and complete.
- Demo form start, validation failure, and complete.
- Security and pricing page visits after homepage engagement.
- Download by operating system.
- Role story selection.
- Source page and campaign on every conversion.

Set the baseline in week 1. Improvement targets should be relative to real baseline data, not invented.

## 11. Team model

### Developer A: Experience systems and motion

- Design tokens and styleguide.
- Global navigation and responsive shell.
- Living Cabinet hero.
- Homepage component architecture.
- Motion, responsive behavior, and performance.

### Developer B: Product story and conversion

- Cabinet capture studio.
- Product scene adapters and video pipeline.
- Copy data, proof ledger, and buyer pages.
- Demo form, analytics, metadata, and structured data.
- Accessibility automation and content QA.

### Shared work

- Pair on the hero for at least two hours each day during week 2.
- Review product accuracy together before any demo export.
- Run cross-browser and device QA together in week 4.
- Do not let one developer become the sole owner of the flagship route.

### Founder time required

- 60 minutes on day 2 for positioning and proof.
- 45 minutes on day 5 to choose the hero direction.
- 30 minutes on days 10 and 15 for build reviews.
- 60 minutes on day 20 for release approval.

Unscheduled design changes after day 10 replace an existing item. They do not expand the sprint.

## 12. The 22-day build plan

### Week 1: Strategy, evidence, and direction

#### Day 1: Baseline and protect the work

**Developer A**

- Free at least 20 GB of disk space with the founder's approval.
- Capture desktop and mobile baselines for all P0 routes.
- Record Lighthouse, Core Web Vitals lab data, bundle data, and current scroll depth.
- Map the current homepage into keep, rewrite, move, or delete.

**Developer B**

- Create the claim and proof ledger.
- Inventory every onboarding and Help demo scene.
- Verify testimonials, founder title, GitHub link, integration claims, security claims, and pricing language.
- Record the current conversion events and form behavior.

**Exit gate:** Baseline report, proof ledger, and protected branch are approved.

#### Day 2: Positioning and information architecture

**Developer A**

- Produce two homepage wireframes, one restrained and one product-led.
- Define the desktop and mobile first viewport.
- Map the new global navigation and footer.

**Developer B**

- Run the positioning session with the founder.
- Draft H1, lead, CTA, proof line, and the 10-section narrative.
- Decide canonical Platform, Security, and About routes.

**Exit gate:** One positioning hierarchy and one route map are frozen.

#### Day 3: Visual system and demo architecture

**Developer A**

- Add the proposed palette and type treatments to the styleguide.
- Prototype the walnut product stage, buttons, product frame, annotations, and evidence rail.
- Test the direction at 1440, 1024, 390, and 320 px.

**Developer B**

- Specify the capture studio route, fixtures, manifest, and export format.
- Identify which Cabinet demo components are pure and which need adapters.
- Write the executive overview storyboard.

**Exit gate:** Tokens, components, and capture architecture are reviewable in code.

#### Day 4: Hero prototypes

**Developer A**

- Build three hero prototypes using the same approved copy:
  - Static product proof.
  - Tabbed Knowledge, AI team, and Work.
  - Living Cabinet drawer interaction.
- Include real mobile behavior and reduced-motion state.

**Developer B**

- Build the capture studio skeleton in the Cabinet repo.
- Render one existing Help demo without daemon or app state.
- Export the first deterministic product frame.

**Exit gate:** The founder can compare three working hero directions and one product capture.

#### Day 5: Direction lock

**Both developers**

- Run five-second comprehension tests with at least five people who were not involved in the build.
- Review the hero at real mobile speed.
- Choose one direction and document the rejected alternatives.
- Freeze the message hierarchy, homepage IA, tokens, and interaction model.
- Cut scope if the chosen hero cannot be completed within eight developer-days.

**Exit gate:** Written approval of the hero, copy direction, and acceptance tests.

### Week 2: Build the signature experience

#### Day 6: Global shell

**Developer A**

- Build the simplified desktop navigation and accessible mobile menu.
- Consolidate main and enterprise chrome.
- Implement the server-first homepage shell and section boundaries.

**Developer B**

- Build fixture data for Knowledge, AI team, and Work.
- Adapt `slide-intro` and `slide-data` into capture scenes.
- Add deterministic timing and capture flags.

**Exit gate:** New shell works on every P0 route. Capture studio exports two stable scenes.

#### Day 7: Living Cabinet foundation

**Developer A**

- Build drawer navigation, product stage, active states, and keyboard model.
- Implement the static first frame before animation loads.
- Add product annotations.

**Developer B**

- Adapt `slide-agents`, `slide-tasks`, and `task-board-demo`.
- Produce posters for all three hero states.
- Draft precise captions for the three states.

**Exit gate:** All three states are understandable without motion.

#### Day 8: Cause and effect

**Developer A**

- Animate transitions between Knowledge, AI team, and Work.
- Show a task producing an artifact and changing the product state.
- Add pause on interaction and progress control.

**Developer B**

- Adapt routines and approvals.
- Capture the first 20 to 25 second hero sequence.
- Test WebM and MP4 quality at target sizes.

**Exit gate:** A complete hero story runs without scroll control and remains clear when muted.

#### Day 9: Mobile and reduced motion

**Developer A**

- Complete the 390 and 320 px hero.
- Build reduced-motion, slow-device, and no-video fallbacks.
- Test keyboard, touch, zoom, and orientation changes.

**Developer B**

- Build the accessible demo player with captions and transcript.
- Create responsive video sources and poster metadata.
- Add analytics events for hero state and video milestones.

**Exit gate:** Mobile first paint contains complete copy, CTA, and a legible product frame.

#### Day 10: Hero release candidate

**Both developers**

- Tune the sequence together.
- Remove any animation that does not explain a product relationship.
- Run performance and accessibility checks on the opening viewport.
- Conduct founder review.
- Freeze hero scope.

**Exit gate:** Hero meets comprehension, responsive, accessibility, and initial performance budgets.

### Week 3: Complete the sales story and video package

#### Day 11: Knowledge section

**Developer A**

- Build the knowledge and live-app section with one interactive product frame.
- Add static and reduced-motion variants.

**Developer B**

- Finish knowledge demo scenes and the 12 to 18 second clip.
- Write whole-product copy that includes files, apps, navigation, and collaboration.

**Exit gate:** No copy reduces Cabinet to Markdown files.

#### Day 12: AI team and work section

**Developer A**

- Build agent, task, routine, and artifact presentation.
- Keep one primary interaction and remove feature-grid clutter.

**Developer B**

- Finish AI team and Work clips.
- Verify every shown provider, skill, status, and action against the current product.

**Exit gate:** A buyer can explain what an agent does and what output it creates.

#### Day 13: Governance and security

**Developer A**

- Build the approvals, history, provider, and self-hosting section.
- Reuse the same visual language on the Security page.

**Developer B**

- Finish governance demo scenes.
- Rewrite security and integration claims against the proof ledger.
- Add links to technical documentation and source code where useful.

**Exit gate:** Every control claim has a product screen, document, or source link behind it.

#### Day 14: Proof and the 90-second tour

**Developer A**

- Build the credibility rail, testimonial section, and buying comparison.
- Remove decorative logo motion and weak illustrative stats.

**Developer B**

- Capture and edit the 75 to 90 second executive overview.
- Produce captions, transcript, poster, and first investor cut.
- Request final testimonial and title approvals.

**Exit gate:** Full video works muted and no proof is ambiguous.

#### Day 15: Homepage integration

**Both developers**

- Integrate all homepage sections.
- Remove duplicate copy and competing CTAs.
- Test the complete page at four viewports.
- Conduct founder review and freeze homepage content.

**Exit gate:** Homepage contains no more than 10 sections and meets the scroll-length target.

### Week 4: Buyer pages, quality, and launch

#### Day 16: Demo and pricing

**Developer A**

- Redesign `/demo` around the workflow briefing offer.
- Bring `/pricing` into the new system and clarify evaluation paths.

**Developer B**

- Implement form validation, confirmation, routing, and event tracking.
- Verify every price, plan, Cloud statement, and download link.

**Exit gate:** A buyer can complete the primary conversion on desktop and mobile without confusion.

#### Day 17: Platform, security, and solutions

**Developer A**

- Apply the new shell and product frames to Platform, Security, Solutions, and About.
- Remove the visual seam between public and enterprise routes.

**Developer B**

- Move approved product scenes and copy into those pages.
- Add technical proof, deployment paths, and role-specific CTAs.

**Exit gate:** Every P0 page looks like one product and has one primary action.

#### Day 18: Templates, SEO, and analytics

**Developer A**

- Apply the system to P1 templates without bespoke layout work.
- Fix responsive tables, breadcrumbs, and media behavior.

**Developer B**

- Complete metadata, canonicals, Open Graph, schema, sitemap, robots, and internal linking.
- Verify the analytics funnel and source attribution.

**Exit gate:** P1 routes inherit the system and all P0 routes have complete search and sharing metadata.

#### Day 19: Performance and accessibility hardening

**Developer A**

- Profile JavaScript, video, images, fonts, and animation.
- Fix LCP, CLS, INP, overflow, and device-specific issues.

**Developer B**

- Run axe, keyboard, screen-reader spot checks, captions, transcript, form errors, and focus management.
- Run the copy lint and proof ledger audit.

**Exit gate:** Quantitative quality targets pass on the P0 route set.

#### Day 20: Release candidate and rehearsal

**Both developers**

- Deploy a release candidate.
- Run a cross-browser bug bash on Safari, Chrome, Firefox, iOS Safari, and Android Chrome.
- Rehearse the seed-round browsing path and the investor video.
- Freeze non-critical changes.
- Obtain founder release approval.

**Exit gate:** No P0 or P1 defects remain. Rollback is tested.

### Launch buffer

#### Day 21: Production launch

- Release during a staffed window.
- Verify analytics, video delivery, forms, downloads, metadata, and redirects in production.
- Watch errors, Core Web Vitals, and conversion events.
- Fix only release-blocking issues.

#### Day 22: Stabilize and prepare the seed room

- Resolve launch regressions.
- Produce the final investor clip and still pack from production-approved scenes.
- Document how to update demo scenes when Cabinet UI changes.
- Record the 30-day follow-up backlog from real user data.

## 13. Workload budget

| Workstream | Developer-days | Owner split |
|---|---:|---|
| Audit, positioning, IA, and proof | 5 | A: 2, B: 3 |
| Design system, nav, and shared shell | 5 | A: 4, B: 1 |
| Living Cabinet hero | 8 | A: 6, B: 2 |
| Capture studio and video exports | 7 | A: 1, B: 6 |
| Homepage sections | 8 | A: 5, B: 3 |
| P0 buyer pages | 5 | A: 3, B: 2 |
| P1 template conformance | 2 | A: 1, B: 1 |
| Performance, accessibility, SEO, and analytics | 3 | A: 1, B: 2 |
| Launch and buffer | 1 | Shared |
| **Total** | **44** | **22 days per developer** |

## 14. Acceptance criteria

### Comprehension and conversion

- At least 80% of five-second test participants can say that Cabinet combines company knowledge and AI agents in one controlled place.
- At least 70% can name one concrete action agents perform.
- Book a demo is the clear primary action on executive pages.
- The demo form works end to end with visible validation and confirmation.
- The timed homepage popup is removed.

### Content and proof

- Zero unlabelled illustrative stories or metrics.
- Every security, integration, customer, and founder claim has an owner and evidence entry.
- The homepage describes the whole product: knowledge, files, apps, agents, work, and collaboration.
- No em dashes or AI-tell filler in user-facing copy.
- One H1 and logical headings on every route.

### Experience

- Homepage has no more than 10 sections.
- Homepage stays under 12,000 px at 1440 by 1000 and under 18,000 px at 390 by 844, subject to final content.
- All critical navigation is reachable at 320 px.
- The first mobile frame contains the H1, lead, primary CTA, and legible product proof.
- No interaction controls scroll position.
- Reduced-motion mode preserves the complete story.

### Performance

- Lighthouse mobile Performance at least 90 on `/`, `/demo`, `/pricing`, and `/enterprise/security`.
- Lighthouse Accessibility and SEO at least 95 on the same routes.
- LCP under 2.5 seconds on the homepage mobile test profile.
- CLS under 0.1.
- INP under 200 ms in field data once sufficient traffic exists.
- Hero loop under 2.5 MB in its primary WebM form.
- A stable poster paints before video playback.

### Accessibility

- WCAG 2.1 AA on P0 routes.
- Zero critical axe issues.
- Complete keyboard path through nav, hero tabs, video, forms, and modal controls.
- Captions and transcript for the executive overview.
- Pause controls for non-essential continuous motion.
- Clean behavior at 200% zoom.

### Engineering

- Production build succeeds with sufficient disk headroom.
- The homepage is server-first and no longer a 2,000-line client component.
- Product scenes use deterministic fixtures.
- Video exports can be regenerated with one documented command.
- P1 routes share templates and tokens instead of one-off styling.
- CI includes build, type, copy, accessibility, and performance checks.

## 15. Metrics after launch

Week 1 establishes the baseline. The 30-day post-launch review should track:

- Homepage to demo-page click rate.
- Demo form completion rate.
- Product tour start and completion rate.
- Hero interaction rate by Knowledge, AI team, and Work.
- Security and pricing visits after product tour completion.
- Download rate by source and operating system.
- Qualified demo rate, not just total submissions.
- Bounce rate and engaged time for executive traffic.
- Mobile versus desktop conversion gap.

Set a relative improvement target after the baseline is known. A reasonable planning target is a 25% relative improvement in qualified demo conversion, but it is a goal, not a claim.

## 16. Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Hero interaction consumes the month | Medium | High | Choose by day 5, cap at eight developer-days, keep a strong static fallback |
| Product demos drift from Cabinet | High | High | Capture from deterministic scenes inside the Cabinet repo and version exports |
| Video damages performance | Medium | High | Poster-first loading, strict size budget, responsive sources, no GIF |
| Claims outrun product reality | Medium | High | Proof ledger and product-owner signoff before copy freeze |
| Public and enterprise pages remain inconsistent | Medium | Medium | One global shell and token system in week 2 |
| Two developers are split across too many pages | High | High | P0, P1, P2 route tiers and a hard content freeze on day 15 |
| Existing user changes are overwritten | Low | High | Work on a dedicated branch and preserve the current dirty worktree |
| Disk exhaustion blocks builds and video | High | High | Free at least 20 GB before day 1 and keep export files outside `.next` |
| Accessibility is deferred until the end | Medium | High | Static and reduced-motion states are acceptance criteria from day 4 |
| Founder feedback arrives too late | Medium | Medium | Fixed reviews on days 2, 5, 10, 15, and 20 |

## 17. Decisions to make on day 2

1. Is the primary buyer CTA Book an executive demo? Recommended: yes.
2. Should Platform, Security, and About become top-level canonical routes? Recommended: yes.
3. Which named customer can approve one detailed case study in the month?
4. Which three workflows should the role stories show?
5. Is the living Cabinet hero approved as the single signature risk?
6. Which integration claims have a working product path today?
7. Is Cabinet Cloud important enough for the primary navigation? Recommended: no until it is available.

## 18. Definition of “world class” for Cabinet

The redesign is successful when a VP of AI can open the site and immediately see a serious product, not a collection of feature cards. The product appears early, the value is concrete, the controls are credible, and the next step is obvious.

The standard is not visual novelty by itself. It is the combination of:

- A memorable idea that only Cabinet can own.
- Real product proof in the first viewport.
- Clear language that respects an executive's time.
- Motion that explains cause and effect.
- Security and ownership claims backed by evidence.
- Fast, accessible, mobile-complete execution.
- A repeatable demo system that stays current as the product evolves.

That is the site Cabinet should take into a seed round.
