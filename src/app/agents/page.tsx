import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: "Agent figures",
  description: "Internal exploration: wooden-toy agent mascots that aren't the classic bot-head look.",
  robots: { index: false, follow: false },
};

type Figure = { id: string; name: string; role: string };

/* ─── Round one: animals & objects, same wooden-toy material as public/brand/ui/*. ─── */
const ROUND_ONE: Figure[] = [
  { id: "owl", name: "Scout", role: "Research: reads across the whole knowledge base and comes back with the answer." },
  { id: "fox", name: "Fetch", role: "Search: the fast one, finds the file before you finish typing the query." },
  { id: "turtle", name: "Keeper", role: "Memory: carries the cabinet's own drawers on its back, never forgets where anything lives." },
  { id: "beehive", name: "Swarm", role: "Multi-agent teams: many small agents on one task, one shared home." },
  { id: "acorn", name: "Sprout", role: "Onboarding: new to the workspace, sharper with everything it reads." },
  { id: "lantern", name: "Glow", role: "Insights: lights up the pattern buried in the files you already have." },
  { id: "kite-bird", name: "Relay", role: "Automation: carries an update across the team and keeps moving." },
  { id: "buoy", name: "Anchor", role: "Self-hosted ops: steady, always on, keeps everything afloat." },
];

/* ─── Round two: office & desk, pushed toward Cabinet's "AI workspace" story.
   Six sub-styles so it isn't one template reskinned twenty times — plainer
   wood throughout, brass/beads mostly dropped. ─── */
const ROUND_TWO: { family: string; note: string; figures: Figure[] }[] = [
  {
    family: "Desk-supply mascots",
    note: "Same small-character format as round one, but plain wood — no brass, no bead eyes.",
    figures: [
      { id: "clip", name: "Clip", role: "Tags & labels: keeps every file pinned to the right topic." },
      { id: "snap", name: "Snap", role: "Merge & organize: closes loose ends into one clean set." },
      { id: "draft", name: "Draft", role: "Writing: drafts the first version so you edit instead of stare at blank." },
      { id: "punch", name: "Punch", role: "Extraction: pulls the exact fact out of a long document." },
    ],
  },
  {
    family: "Artist's mannequin",
    note: "The wooden ball-jointed art-class figure. No face, no color — the pose carries it.",
    figures: [
      { id: "present", name: "Present", role: "Reporting: turns the week's work into a briefing." },
      { id: "ponder", name: "Ponder", role: "Strategy: sits with the hard question before answering." },
      { id: "sprint", name: "Sprint", role: "Automation: runs the repetitive task at full speed." },
      { id: "study", name: "Study", role: "Research: reads the source before anyone else does." },
    ],
  },
  {
    family: "Desk instruments",
    note: "Vintage office tools carved in wood, with only the aged brass a real one would need.",
    figures: [
      { id: "type", name: "Type", role: "Content: writes in your voice, one key at a time." },
      { id: "ring", name: "Ring", role: "Support & notifications: the one who picks up." },
      { id: "beam", name: "Beam", role: "Insights: shines a light on the pattern in the data." },
      { id: "ink", name: "Ink", role: "Documentation: puts the decision in writing so it sticks." },
    ],
  },
  {
    family: "Matryoshka office folk",
    note: "Painted-flat nesting dolls, no limbs, no metal — folk art instead of toy hardware.",
    figures: [
      { id: "ledger", name: "Ledger", role: "Bookkeeping & ops: keeps the numbers straight, one layer at a time." },
      { id: "prof", name: "Prof", role: "Training & onboarding: teaches the workspace to whoever's new." },
      { id: "post", name: "Post", role: "Delivery & integrations: gets the update to the right inbox." },
    ],
  },
  {
    family: "Pull-toys",
    note: "Wood, wheels, a cord loop. Nothing else.",
    figures: [
      { id: "haul", name: "Haul", role: "Migration & import: brings the old system's files into the new cabinet." },
      { id: "cart", name: "Cart", role: "Workflow routing: moves work from desk to desk, in order." },
    ],
  },
  {
    family: "Desk knickknacks",
    note: "Solid carved objects, little to no face — the ones that just sit on your desk.",
    figures: [
      { id: "brew", name: "Brew", role: "Always-on: the background agent that never clocks out." },
      { id: "stack", name: "Stack", role: "Citations & library: knows exactly which source backs which claim." },
      { id: "rook", name: "Rook", role: "Governance & permissions: guards the back rank, decides who gets in." },
    ],
  },
];

/* ─── Round three: detailed animals + classic archetypes (wizard, knight,
   pirate...). Original designs, never a real copyrighted character. More
   carving detail and more dynamic poses than rounds one and two; brass is
   back, but only on a character's own weapon or armor. ─── */
const ROUND_THREE: { family: string; note: string; figures: Figure[] }[] = [
  {
    family: "Animals",
    note: "More carved texture, more drama than round one — two-tone wood and a pose with real motion in it.",
    figures: [
      { id: "bear", name: "Bear", role: "Bulk import: does the heavy lifting when a whole system moves in at once." },
      { id: "wolf", name: "Wolf", role: "Monitoring & alerts: hears the change before anyone else does." },
      { id: "raven", name: "Raven", role: "Integrations: carries a message straight to the right channel." },
      { id: "elephant", name: "Elephant", role: "Archive: never forgets where anything was filed." },
      { id: "octopus", name: "Octopus", role: "Orchestration: runs four tools at once without dropping one." },
      { id: "chameleon", name: "Chameleon", role: "Adapters: matches whatever stack you already run." },
      { id: "dragon", name: "Dragon", role: "Heavy compute: the one you call when the job actually needs power." },
      { id: "stag", name: "Stag", role: "Admin & governance: sets the standard the rest of the team follows." },
    ],
  },
  {
    family: "Archetypes",
    note: "Classic roles, not classic characters — an original design per part, one signature prop each.",
    figures: [
      { id: "wizard", name: "Wizard", role: "Ask Cabinet: the straight answer, pulled from everything you own." },
      { id: "ninja", name: "Ninja", role: "Background automation: does the work, leaves no trace of the effort." },
      { id: "astronaut", name: "Astronaut", role: "Discovery: goes looking in the parts of the knowledge base no one's opened in months." },
      { id: "knight", name: "Knight", role: "Security: stands between your data and everything that isn't supposed to see it." },
      { id: "pirate", name: "Pirate", role: "Deep search: finds the file everyone assumed was gone." },
      { id: "chef", name: "Chef", role: "Workflow builder: assembles the pieces into something that ships." },
      { id: "detective", name: "Detective", role: "Audit: works out what actually happened, and when." },
      { id: "hero", name: "Hero", role: "Incident response: shows up the moment something breaks." },
    ],
  },
];

/* ─── Round four: "the Cabinet" — the other meaning of the word. Posh
   minister/advisor figures in suits: top hats, monocles, mustaches, a
   powdered wig. Every design is an original invented caricature, never a
   real or identifiable politician or public figure — the wink is in the
   pun and the costuming, not anyone's actual likeness. ─── */
const ROUND_FOUR: Figure[] = [
  { id: "chair", name: "The Chair", role: "Dashboards: the one seat with a view of everything at once." },
  { id: "whip", name: "The Whip", role: "Automation & workflows: keeps the whole room moving on schedule." },
  { id: "chancellor", name: "The Chancellor", role: "Billing & usage: keeps count of exactly what everything costs." },
  { id: "speaker", name: "The Speaker", role: "Ask Cabinet: recognizes the question and calls the answer." },
  { id: "clerk", name: "The Clerk", role: "Audit log: the official record of who did what, and when." },
  { id: "attache", name: "The Attaché", role: "Onboarding: walks the new hire through everything on day one." },
  { id: "dame", name: "The Dame", role: "Guest access: decides exactly who from outside gets let into the room." },
  { id: "marshal", name: "The Field Marshal", role: "Compliance: sets the rules the whole estate runs by." },
  { id: "statesman", name: "The Statesman", role: "Search: has read every file in the building and can find any of them on request." },
  { id: "envoy", name: "The Envoy", role: "Integrations: delivers the message to exactly the right department, sealed and signed." },
];

function FigureCard({ id, name, role, dir }: Figure & { dir: string }) {
  return (
    <div className="card-skin card-hover rounded-2xl p-6">
      <div className="relative flex h-40 items-end justify-center">
        {/* wood shelf the figure stands on */}
        <div className="absolute bottom-2 h-3 w-24 rounded-full bg-gradient-to-b from-[#e3c692] to-[#d3ac72] opacity-70" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/brand/${dir}/${id}.png`}
          alt={`${name} figure`}
          className="relative h-36 w-36 object-contain"
        />
      </div>
      <h3 className="mt-4 text-center font-section text-lg text-text-primary">{name}</h3>
      <p className="mt-1.5 text-center font-body-serif text-sm leading-relaxed text-text-secondary">{role}</p>
    </div>
  );
}

export default function AgentFiguresPage() {
  // Internal exploration, not a shipped page — same dev-only gate as /styleguide.
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg">
      <SiteNavbar />

      <section className="border-b border-border dot-grid">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="section-label mb-3">Internal exploration</p>
          <h1 className="font-display text-4xl tracking-tight text-text-primary sm:text-5xl">
            Agent figures
          </h1>
          <p className="mt-4 max-w-2xl font-body-serif text-lg leading-relaxed text-text-secondary">
            The same wooden-toy material as the site&apos;s icon set, but each agent is its own
            character instead of the classic robot-head bot.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="section-label mb-2">Round one · animals &amp; objects</p>
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {ROUND_ONE.map((f) => (
            <FigureCard key={f.id} dir="agents" {...f} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <p className="section-label mb-2">Round two · office &amp; desk</p>
        <h2 className="font-display text-2xl tracking-tight text-text-primary">
          Cabinet is an AI workspace, not a zoo
        </h2>
        <p className="mt-3 max-w-2xl font-body-serif text-base leading-relaxed text-text-secondary">
          Twenty figures across six different builds, so the set reads as a range of ideas
          rather than one template repeated. Plainer wood throughout, brass and bead accents
          mostly dropped.
        </p>

        <div className="mt-12 space-y-14">
          {ROUND_TWO.map((group) => (
            <div key={group.family}>
              <h3 className="font-section text-xl text-text-primary">{group.family}</h3>
              <p className="mt-1 max-w-2xl font-body-serif text-sm text-text-secondary">{group.note}</p>
              <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                {group.figures.map((f) => (
                  <FigureCard key={f.id} dir="agents-office" {...f} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <p className="section-label mb-2">Round three · animals &amp; archetypes</p>
        <h2 className="font-display text-2xl tracking-tight text-text-primary">
          More detail, more character
        </h2>
        <p className="mt-3 max-w-2xl font-body-serif text-base leading-relaxed text-text-secondary">
          Wildlife carved with real texture and motion, plus classic roles (a wizard, a
          knight, a detective) built as original designs, never a real character. Two-tone
          wood, and brass is back where it belongs: on a blade, a buckle, a spyglass.
        </p>

        <div className="mt-12 space-y-14">
          {ROUND_THREE.map((group) => (
            <div key={group.family}>
              <h3 className="font-section text-xl text-text-primary">{group.family}</h3>
              <p className="mt-1 max-w-2xl font-body-serif text-sm text-text-secondary">{group.note}</p>
              <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                {group.figures.map((f) => (
                  <FigureCard key={f.id} dir="agents-legendary" {...f} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <p className="section-label mb-2">Round four · the Cabinet</p>
        <h2 className="font-display text-2xl tracking-tight text-text-primary">
          The other meaning of the word
        </h2>
        <p className="mt-3 max-w-2xl font-body-serif text-base leading-relaxed text-text-secondary">
          A cabinet is also a room full of advisors. Ten posh figures in suits, each with
          their own portfolio: a top hat, a monocle, a powdered wig, a bowler and a bell.
          Invented characters throughout, never a real politician or public figure.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {ROUND_FOUR.map((f) => (
            <FigureCard key={f.id} dir="agents-cabinet" {...f} />
          ))}
        </div>
      </section>
    </main>
  );
}
