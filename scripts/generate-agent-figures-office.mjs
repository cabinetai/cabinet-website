#!/usr/bin/env node
/**
 * Cabinet office-themed agent figures, round two.
 *
 * Same wooden-toy world as generate-agent-figures.mjs, but pushed toward
 * Cabinet's actual "AI workspace" positioning (desk objects, not animals)
 * and toward plainer wood with far less brass/bead jewelry. Six distinct
 * sub-styles ("families") so the set doesn't read as one template reskinned
 * twenty times: mascot, mannequin, instrument, matryoshka, pulltoy, knickknack.
 *
 * Output: public/brand/agents-office/<id>.png
 *
 * Usage:
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-agent-figures-office.mjs            # all
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-agent-figures-office.mjs clip snap   # by id
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
const OUT_DIR = resolve(ROOT, "public/brand/agents-office");

const KEY = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("Missing GOOGLE_AI_API_KEY (or GEMINI_API_KEY) in the environment.");
  process.exit(1);
}

// Reference only for wood tone/grain/lighting — every family instruction below
// tells the model to ignore the reference's brass rings and bead accents.
const REF = resolve(ROOT, "public/brand/agents/owl.png");

const COMMON =
  "Soft cinematic single-source light from the top-left with gentle ambient " +
  "occlusion. One single centered subject with generous negative space, not " +
  "touching or clipped by the canvas edges. NO text, NO letters or numbers " +
  "anywhere, NO UI screenshots, NO drop shadow or contact shadow on the " +
  "ground. Place it on a COMPLETELY SOLID, FLAT, UNIFORM bright magenta " +
  "background, pure #FF00FF, filling the entire square canvas edge to edge, " +
  "no checkerboard, no gradient, no vignette, no other color in the " +
  "background. Square composition, high detail.";

const FAMILY_STYLE = {
  mascot:
    "Warm hand-crafted wooden-toy style: smooth light maple wood with soft " +
    "visible grain (around #E8D6B6 and #C9A47A, cream highlights), matte " +
    "varnish, chunky rounded tactile proportions. Almost no metal hardware " +
    "anywhere and NO colored bead accents at all — plain wood only, its " +
    "personality carved into the shape itself, not added with jewelry. If " +
    "it has a face, it is two small carved or inset dark-wood dot eyes and " +
    "nothing else. " + COMMON,
  mannequin:
    "A classic wooden artist's lay figure / posable draughtsman's mannequin: " +
    "pale unfinished birch or maple wood with fine visible grain, built from " +
    "distinct turned ball-and-socket joints at the shoulders, elbows, hips " +
    "and knees like a real wooden art-class doll. Completely blank smooth " +
    "oval wooden head with NO face, NO hair, NO clothing. No metal " +
    "anywhere, no color, no beads, no brass — plain jointed wood only, " +
    "posed mid-gesture so the pose alone carries the personality. " + COMMON,
  instrument:
    "A vintage desk instrument reimagined carved entirely from warm honey " +
    "maple wood in place of its usual metal housing, matte varnish, soft " +
    "visible grain. Only a few small, distinctly AGED/DULL brass details " +
    "where the real object mechanically requires metal (a hinge, a dial, a " +
    "nib, a key), never bright or jewel-like, and NO colored bead accents " +
    "anywhere. " + COMMON,
  matryoshka:
    "A traditional Russian nesting-doll (matryoshka) silhouette: one solid " +
    "rounded form with sloped shoulders tapering to a flat flared base, no " +
    "arms, no legs, no visible limbs at all. Flat matte folk-art painted " +
    "finish over light wood grain, with simple thin dark hand-painted " +
    "outlines for a small face and one simple costume motif. No metal, no " +
    "brass, no beads, no gloss anywhere. " + COMMON,
  pulltoy:
    "A simple wooden pull-along toy: a plain light-maple wood body sitting " +
    "on two round wooden wheels joined by a visible wooden dowel axle, with " +
    "a small braided cord loop at the front for pulling. Soft visible wood " +
    "grain, matte finish. At most one thin painted stripe on the wheel rims " +
    "as the only color accent — no brass, no beads, no other decoration. " +
    COMMON,
  knickknack:
    "A single solid chunky object carved from warm honey maple wood, matte " +
    "varnish, soft visible grain, sitting flat with no legs and no arms. " +
    "Minimal to no facial features — it reads as a carved desk object, not " +
    "a creature. No metal, no brass, no bead accents, no color beyond the " +
    "wood itself. " + COMMON,
};

const lead = (family, subject) =>
  "Use the attached reference image ONLY for its wood tone, grain and " +
  "lighting direction. Ignore its shape, its brass rings and its colored " +
  `bead accents entirely — this is a completely different object: ${subject}. ` +
  FAMILY_STYLE[family];

const SPECS = [
  // mascot — small desk-supply character, plain wood, tiny dot-eye face
  { id: "clip", family: "mascot", subject: "a small friendly paperclip character bent from a single loop of wood, standing on two short stub feet" },
  { id: "snap", family: "mascot", subject: "a small chunky stapler character with a hinged wooden top jaw like an open mouth, standing on two short stub feet" },
  { id: "draft", family: "mascot", subject: "a small tall wooden pencil character with a rounded pink-toned eraser cap on top like hair and a tapered graphite tip for feet" },
  { id: "punch", family: "mascot", subject: "a small round wooden hole-punch character, chunky and squat, with two small circular punched holes on its face as eyes" },

  // mannequin — jointed wooden artist's lay figure, blank head, no face
  { id: "present", family: "mannequin", subject: "standing with one arm raised and open as if presenting a report on a wall" },
  { id: "ponder", family: "mannequin", subject: "seated with one elbow on its knee and its wooden fist resting under its blank head, a thinking pose" },
  { id: "sprint", family: "mannequin", subject: "captured mid-stride running, one knee driven high and both arms swung back for speed" },
  { id: "study", family: "mannequin", subject: "sitting cross-legged on the ground, head tilted down, both hands holding up a small plain flat wooden tablet as if reading" },

  // instrument — antique desk tool, wood body, tiny aged-brass mechanism
  { id: "type", family: "instrument", subject: "a compact vintage typewriter with a full round bank of small wooden keys and one wooden carriage-return lever on the right" },
  { id: "ring", family: "instrument", subject: "a classic rotary desk telephone with a round wooden dial face and a curled wooden cord looping from its handset" },
  { id: "beam", family: "instrument", subject: "a classic banker's desk lamp with a rounded dome shade, a slender curved neck, and a single round wooden base foot" },
  { id: "ink", family: "instrument", subject: "a round squat inkwell with a single long quill feather resting angled in its open top like a hat" },

  // matryoshka — nesting-doll office folk, painted-flat wood, no limbs
  { id: "ledger", family: "matryoshka", subject: "a matryoshka doll painted as a bookkeeper, with a simple painted necktie line down its front and small round painted glasses" },
  { id: "prof", family: "matryoshka", subject: "a matryoshka doll painted as a professor, with a small mortarboard cap shape on top and a painted bowtie" },
  { id: "post", family: "matryoshka", subject: "a matryoshka doll painted as a postal courier, with a painted diagonal satchel strap and a small painted envelope tucked against its front" },

  // pulltoy — wood on wheels, cord loop, near zero ornamentation
  { id: "haul", family: "pulltoy", subject: "a tiny wooden filing cabinet with two drawer grooves, mounted on a wheeled pull-toy base" },
  { id: "cart", family: "pulltoy", subject: "a small flatbed wooden cart stacked with three simple rectangular wooden envelope blocks, mounted on a wheeled pull-toy base" },

  // knickknack — solid carved desk object, minimal to no face
  { id: "brew", family: "knickknack", subject: "a rounded wooden coffee mug with a simple carved curl of steam rising from the top, sitting flat" },
  { id: "stack", family: "knickknack", subject: "three wooden books stacked slightly askew with visible carved page edges and one thin ribbon bookmark hanging from the top book" },
  { id: "rook", family: "knickknack", subject: "a tall classic lathe-turned wooden chess rook, with the clean turned rings and crenellated top of a real chess piece, no face" },
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
    process.stdout.write(`Generating ${spec.id} (${spec.family}) ... `);
    try {
      const { png, model } = await generateAndKey(lead(spec.family, spec.subject), KEY, { imagePath: REF });
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
  console.log(`\nDone: ${ok}/${todo.length} into public/brand/agents-office/`);
  if (ok < todo.length) process.exit(1);
}

main();
