#!/usr/bin/env node
/**
 * Cabinet agent figures, round four: "the Cabinet" — the double meaning.
 * Posh wooden minister/advisor figures in suits: top hats, monocles,
 * mustaches, powdered wigs. Funny and caricatured, but every design is
 * explicitly an original invented character, never a real or identifiable
 * politician or public figure — the wink is in the "cabinet" pun and the
 * costuming, not in anyone's actual likeness.
 *
 * Output: public/brand/agents-cabinet/<id>.png
 *
 * Usage:
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-agent-figures-cabinet.mjs             # all
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-agent-figures-cabinet.mjs chair envoy # by id
 *
 * GEMINI_API_KEY is accepted as a fallback. The key is never written to disk.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { generateAndKey } from "./lib/imagegen.mjs";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "public/brand/agents-cabinet");

const KEY = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("Missing GOOGLE_AI_API_KEY (or GEMINI_API_KEY) in the environment.");
  process.exit(1);
}

// Reference only for wood tone/grain/lighting and rough humanoid proportions
// (a suited, hatted figure is closer to this than to the owl in round one/two).
const REF = resolve(ROOT, "public/brand/agents-legendary/detective.png");

const COMMON =
  "Soft cinematic single-source light from the top-left with gentle ambient " +
  "occlusion. One single centered subject, confident pose, generous negative " +
  "space, not touching or clipped by the canvas edges. NO text, NO letters " +
  "or numbers anywhere, NO UI screenshots, NO drop shadow or contact " +
  "shadow on the ground. Place it on a COMPLETELY SOLID, FLAT, UNIFORM " +
  "bright magenta background, pure #FF00FF, filling the entire square " +
  "canvas edge to edge, no checkerboard, no gradient, no vignette, no " +
  "other color in the background. Square composition, high detail.";

const STYLE =
  "A small wooden cabinet-minister figure, carved in a sharp suit or " +
  "formal tailcoat: an original satirical caricature character, funny and " +
  "posh, but under no circumstances a real or identifiable person, public " +
  "figure or politician, living or dead — an invented generic type only, " +
  "like a character from a stage play. Two-tone wood: light honey maple " +
  "for the suit, darker carved walnut for waistcoat, hat, hair and shoes. " +
  "Exaggerated but tasteful proportions and an expressive carved face with " +
  "real personality, whether that means a bold mustache, arched eyebrows, " +
  "a wry smile or a stern brow, always an invented generic face. Small " +
  "carved dark-wood eyes with a tiny glint highlight. A little aged brass " +
  "only on the character's own accessories, such as a monocle rim, a " +
  "pocket-watch chain, spectacle frames or a coat button, never loose " +
  "decorative jewelry elsewhere on the body. Matte varnish, confident " +
  "silhouette. " + COMMON;

const lead = (subject) =>
  "Use the attached reference image ONLY for its wood tone, grain, " +
  "lighting direction and rough humanoid proportions; ignore its coat, " +
  `hat and pose entirely. New character: ${subject}. ` + STYLE;

const SPECS = [
  { id: "chair", name: "The Chair", role: "Dashboards: the one seat with a view of everything at once.", subject: "a portly cabinet chairman in a formal three-piece suit and tailcoat, a tall black top hat, a monocle on a thin chain, one hand resting on a small wooden gavel, the other tucked into a waistcoat pocket, a proud confident stance" },
  { id: "whip", name: "The Whip", role: "Automation & workflows: keeps the whole room moving on schedule.", subject: "a sharp-suited cabinet whip with a waxed handlebar mustache and stern arched eyebrows, arms crossed, a rolled schedule tucked under one arm, a sturdy no-nonsense stance" },
  { id: "chancellor", name: "The Chancellor", role: "Billing & usage: keeps count of exactly what everything costs.", subject: "a cabinet chancellor in a suit and bowler hat, round wire spectacles, a neat mustache, holding a small open ledger book in one hand and a drawstring coin purse in the other" },
  { id: "speaker", name: "The Speaker", role: "Ask Cabinet: recognizes the question and calls the answer.", subject: "a cabinet speaker in ceremonial robes over a suit, an oversized curled powdered wig, holding a small brass hand bell raised as if about to ring it" },
  { id: "clerk", name: "The Clerk", role: "Audit log: the official record of who did what, and when.", subject: "a small tidy cabinet clerk in a plain suit, tiny round spectacles low on the nose, a quill pen tucked behind one ear, hugging a thick ledger book against its chest with both arms" },
  { id: "attache", name: "The Attaché", role: "Onboarding: walks the new hire through everything on day one.", subject: "a young cabinet attaché in a trim suit, neat slicked side-parted hair, no facial hair, a stack of papers under one arm and a small briefcase in the other hand, an eager forward-leaning stance" },
  { id: "dame", name: "The Dame", role: "Guest access: decides exactly who from outside gets let into the room.", subject: "a poised WOMAN, a society dame, in an elegant long fitted coat-dress with a nipped waist (never a man's suit jacket or trousers), an extravagant wide-brimmed hat with a single carved feather (no top hat, no mustache, no facial hair of any kind), a small strand of carved wooden pearls at her neck, soft carved hair visible under the hat brim, holding a folded fan up near one shoulder" },
  { id: "marshal", name: "The Field Marshal", role: "Compliance: sets the rules the whole estate runs by.", subject: "a decorated cabinet field marshal in a formal military-cut suit jacket with carved epaulettes and a row of small medals, a full bushy mustache, standing at attention with a small rolled map tucked under one arm" },
  { id: "statesman", name: "The Statesman", role: "Search: has read every file in the building and can find any of them on request.", subject: "an elder statesman in a dark three-piece suit and bow tie, a rounded homburg hat, a firm resolute jaw, one hand resting atop a wooden walking cane, a calm unshakeable stance" },
  { id: "envoy", name: "The Envoy", role: "Integrations: delivers the message to exactly the right department, sealed and signed.", subject: "a formal cabinet envoy in a tailcoat and white gloves, a single round monocle over one eye on a thin chain, holding up a sealed wax-stamped letter between two fingers" },
];

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const filter = process.argv.slice(2);
  const todo = filter.length ? SPECS.filter((s) => filter.includes(s.id)) : SPECS;
  if (!todo.length) {
    console.error(`No matching specs. Known ids: ${SPECS.map((s) => s.id).join(", ")}`);
    process.exit(1);
  }
  let ok = 0;
  for (const spec of todo) {
    process.stdout.write(`Generating ${spec.id} ... `);
    try {
      const { png, model } = await generateAndKey(lead(spec.subject), KEY, { imagePath: REF });
      const out = await sharp(png)
        .resize(512, 512, { fit: "inside", withoutEnlargement: true })
        .png({ quality: 90, compressionLevel: 9, palette: true })
        .toBuffer();
      writeFileSync(resolve(OUT_DIR, `${spec.id}.png`), out);
      console.log(`OK (${model}, ${(out.length / 1024).toFixed(0)} KB)`);
      ok++;
    } catch (e) {
      console.log(`FAILED: ${e.message}`);
    }
  }
  console.log(`\nDone: ${ok}/${todo.length} into public/brand/agents-cabinet/`);
  if (ok < todo.length) process.exit(1);
}

main();
