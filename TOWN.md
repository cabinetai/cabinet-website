# Town (town.com): full workflow catalogue and the Cabinet answer

**Purpose:** competitive teardown of Town's use-case menu, one entry per workflow they sell, mapped to what Cabinet already ships (registry cabinets at cabinets.sh) and what we still need to build.
**Sources:** town.com Features menu (8 use-case panels, captured 2026-07-17), homepage scroll capture in `docs/design-research/town-*.jpeg`.
**Companion docs:** `DESIGN.md` (how we present these on the site), `src/lib/cabinets.ts` (curated registry snapshot).

---

## 1. Who Town is

Town sells a personal AI assistant ("your Townie") for professionals and small teams. Out of beta as of mid-2026. Positioning: "Learns how you work, then gets to work." Every Townie has a name and an illustrated character (Flip, Claus, Cliff, Norm, Theo, Min, Bo). Apps: iOS, Slack, WhatsApp, Telegram. Platform page: Security and Approvals.

What their site does well (relevant to our redesign, see DESIGN.md):

- **Four nav items.** Features, Routines, Integrations, Pricing. One product story, no maze.
- **The use-case menu is the product tour.** Opening "Features" shows a three-panel explorer: use-case list, headline + three proof points, full feature list. A buyer reads their own job in 10 seconds.
- **Named characters** make an abstract agent concrete and likable.
- **A live "ask" input in the hero** ("Draft follow-ups from yesterday's demos") demos the product without a signup.
- **Every claim is a verb.** "Drafts replies in your voice for your review." No adjectives doing the work.

## 2. The workflow catalogue (verbatim structure)

Eight use cases, exactly as their menu presents them.

### 2.1 Email Management

> "Your Townie stays on top of your inbox so you don't have to."

It organizes what comes in, drafts the replies that matter in your voice, and keeps every follow-up on track.

- Surfaces what needs you, files the rest
- Drafts replies in your voice for your review
- Tracks every open thread and follow-up

Feature list: Organizes your inbox (watches new mail, labels by type, no filters to maintain) · Writes in your voice (learned from how you write across every thread) · Stays on top of follow-ups (tracks open threads and overdue replies, resurfaces them) · Drafts the replies that matter (decides what deserves a response) · Learns you over time (people, context, prior decisions) · You approve before anything sends · Works your way (shape inbox handling with routines).

### 2.2 Calendar & scheduling

> "Your Townie handles your scheduling end to end."

Tell it who you need to meet and it sorts the times, the invite, and any changes.

- Finds a time that works for everyone
- Proposes, negotiates, and sends the invite
- Reschedules and resolves conflicts as things shift

Feature list: Finds a time that works (availability, time zones, constraints) · Your scheduling rules (focus blocks, hard stops, kid time, buffers) · Propose, negotiate, book (invite with video link, location, agenda) · Handles the changes · Negotiates a time with the other side's assistant (no shared tool or signup) · One assistant that knows everything else (schedules with full context) · Every calendar at once.

### 2.3 Meeting lifecycle

> "Your Townie has your back before, during, and after every meeting."

It gets you ready, captures what was said, and drives what happens next.

- Briefs you before: who they are, your history, what to raise
- Captures it so you can stay present
- Turns the meeting into recaps, tasks, and next steps

Feature list: Writes a briefing for every meeting · Takes the notes (clean, searchable) · Pulls out action items and recaps (decisions and owners the moment it ends) · Drives the follow-through (tracked tasks, CRM updates, next-step drafts) · Answers questions about past meetings.

### 2.4 Find any answer

> "Your Townie makes sense of everything, so you don't have to."

Across your inbox, files, messages, and tools, they keep you in the loop and surface the answer the moment you need it.

- Pulls the answer from across everything you have
- Cuts through volume you could never read yourself
- Turns scattered detail into a clear picture

Feature list: Reads everything and tells you what matters (hundreds of emails and messages) · Answers questions in plain language (the specific answer, not ten links) · Searches every tool at once (Gmail, Drive, Slack, Notion, Dropbox, CRM, library) · Runs deep research on demand (structured report on a person, company, or topic) · Keeps what it finds (organized for next time).

### 2.5 Draft docs & decks

> "Your Townie drafts the work with you."

It gets a doc, deck, or sheet started in the right format, then shapes it with you from there.

- Gets a first draft going so you're never staring at a blank page
- Edits alongside you in real time
- Exports and keeps your other tools in sync

Feature list: Drafts documents with you (from email, notes, context) · Builds decks with you · Makes spreadsheets and exports (PDF, Google Sheets, Drive) · Edits side by side, live · Keeps your other tools in sync (a Slack bug becomes a prioritized Linear issue).

### 2.6 Automate repeat work

> "Your Townie handles the repeat work."

Set up a routine once, and the recurring work is just done, on schedule, before you ask.

- Set it once, it runs on its own
- Start from a template or describe your own
- It spots new things worth automating

Feature list: Builds routines in plain language · Runs recurring work on a schedule (status summaries, digests, briefings, logging) · Suggests what to automate (notices what you repeat) · Keeps you in control (draft-for-review or fully autonomous, per routine) · Works across your whole stack.

### 2.7 Team collaboration

> "Your Townie joins the team, too."

It runs the team's shared, repeatable work and keeps clients and partners moving without you in the middle.

- Runs shared routines any teammate can rely on
- Keeps clients and partners moving without waiting on you
- Work gets done while you stay heads down

Feature list: Runs the team's shared routines (weekly client summaries on shared connections) · Builds the work together (whole team edits and runs shared work in real time) · Handles clients and partners for you (scheduling and briefing without you in the loop) · Plugs into the team's tools (shared Slack, CRM) · Keeps the team in control (nothing leaves without a check).

### 2.8 Everywhere you work

> "Your Townie works wherever you do."

It connects to the tools you already use and reaches you on whatever you have open, instead of locking you into one suite.

- Works across your whole stack, not one vendor's
- Reach it by email, chat, or app, whichever fits the moment
- The same Townie, with the same context, everywhere

Feature list: Works across all your tools (Google Workspace, Slack, Notion, GitHub, Linear, CRMs, 40+ integrations) · Email your assistant directly (its own @town.com address) · Lives in your chat apps (Slack, WhatsApp, Telegram, iMessage) · On your phone and desktop (native iPhone and Mac apps) · Takes input any way you give it (voice, text, email) · One Townie everywhere (same assistant, same memory).

Also in the homepage scroll story: Townies work through to-do lists ("Norm drafts Elle's Morning Briefing", "Theo works through Amy's todo list", "Min drafts Chris's client proposals"), noticing repeated work and offering to take it over, and a live task list with states (in progress, needs input, done and sent in your voice).

---

## 3. The Cabinet answer: workflow → cabinet mapping

Cabinet's structural advantage: Town gives you one assistant; Cabinet gives you a **team of agents in a workspace you own**, and every Town workflow is a cabinet you can clone from the registry (cabinets.sh, 100+ published). The mapping:

| Town workflow | Cabinet answer | Registry slug(s) | Status |
|---|---|---|---|
| Email Management | Gmail-integrated inbox workspace: triage, draft-for-review replies, label workflows | `email` | **Shipped** |
| Calendar & scheduling | End-to-end scheduling agent honoring your rules | none yet | **Gap: build `calendar-ops`** (spec in §4) |
| Meeting lifecycle | Briefings before, structured memory after, decisions and owners tracked | `meeting-memory`, `sales-call-prep`, `decision-log` | **Shipped** |
| Find any answer | AI-native knowledge base; every doc findable, every question answerable and sourced | `company-brain`, `internal-faq`, `team-wiki` | **Shipped** |
| Draft docs & decks | Purpose-built drafting cabinets per document type, QA passes included | `prd-builder`, `board-memo`, `proposal-rfp`, `investor-update`, `newsletter-factory` | **Shipped** (per-type; no generic "any deck" studio) |
| Automate repeat work | Jobs: scheduled agent runs are a core platform primitive (`.jobs` in every cabinet) | `weekly-business-review`, `okr-command`, `qbr-generator` | **Shipped** (platform-level) |
| Team collaboration | Shared cabinets: the whole org works in one tree; intake and routing built in | `universal-request`, `agency`, `saas-startup`, `team-wiki` | **Shipped** |
| Everywhere you work | Self-hosted plus Cabinet Cloud from any device; agents run 24/7 | platform (Cloud waitlist) | **Partial gap:** no chat-app surfaces (Slack/WhatsApp) or assistant email address today |

The honest read: on capability we match or beat 6 of 8 today, with receipts (real cabinets to clone). The two gaps are calendar/scheduling and reach-me-anywhere surfaces. Never claim the gaps; sell the six.

Where Cabinet structurally wins over Town, for site copy:

1. **Own it all.** Town runs in their cloud on their terms. Every Cabinet workflow above lives as files on your disk, self-hosted, MIT licensed.
2. **A team, not a sidekick.** Town is one assistant. A cabinet is an org chart of agents with jobs, knowledge, and memory you can inspect.
3. **Bring your own AI.** Town's model bill is baked into their pricing. Cabinet uses the model accounts you already pay for.
4. **Visualized, not chat-shaped.** Cabinet renders your knowledge as interactive views, dashboards, and shipped HTML apps, not a chat transcript.

## 4. Gap specs (new cabinets to build in the registry)

### 4.1 `calendar-ops` (priority: high, closes the visible gap)

- **Pitch:** your scheduling desk, end to end. Keep your calendar; replace the back-and-forth.
- **Knowledge:** `scheduling-rules.md` (focus blocks, buffers, hard stops, meeting-length defaults), `people/` (VIPs, time zones, preferences), `venues.md`.
- **Agents:** Scheduler (proposes, negotiates by email draft, books), Guardian (protects focus time, flags conflicts and overload weekly).
- **Jobs:** morning agenda briefing; weekly calendar-health report; conflict sweep on change.
- **Integration:** Google Calendar app; email drafts go through draft-for-review like the `email` cabinet.

### 4.2 `chief-of-staff` (priority: medium, the "whole Town in one cabinet" bundle)

- **Pitch:** the daily operating loop Town sells as eight features, in one cabinet: morning briefing, inbox triage handoff, meeting prep and memory, to-do tracking, end-of-day digest.
- **Composition:** nests or links `email`, `meeting-memory`, `calendar-ops`; adds a `today.md` working file and a Briefing agent.
- This is the natural hero template for the site's "run your day" story.

## 5. What we ship on the site now

- `src/lib/cabinets.ts` gains the workflow cabinets above (real registry slugs, real covers) grouped so pages can show "the assistant workflows" as a set.
- DESIGN.md specs a Town-style use-case explorer for the homepage and hub: pick a workflow, see the promise, the proof points, and the actual cabinet to clone. Our advantage over Town's version: the "Get started" action opens a real, inspectable cabinet, not a signup wall.
