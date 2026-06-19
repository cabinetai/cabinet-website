#!/usr/bin/env node
/**
 * Cabinet general-purpose wooden UI-icon generator.
 *
 * Produces the wooden-craft concept icons used to replace flat lucide-react
 * icons across the site, in the same house style as public/brand/feat/*.png:
 * one distilled object in light maple/birch wood with brushed-brass hardware
 * and a few muted colored bead accents, on a transparent background.
 *
 * Output: public/brand/ui/<id>.png
 *
 * Usage:
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-ui-icons.mjs            # all
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-ui-icons.mjs cloud zap  # by id
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
const OUT_DIR = resolve(ROOT, "public/brand/ui");

const KEY = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("Missing GOOGLE_AI_API_KEY (or GEMINI_API_KEY) in the environment.");
  process.exit(1);
}

// Lock the material to the existing feature-icon set by editing a clean one.
const REF = resolve(ROOT, "public/brand/feat/schedule.png");

const STYLE =
  "Render it in a warm hand-crafted wooden-toy style with a premium matte " +
  "product-render finish. Sculpt it from smooth light maple and birch wood " +
  "with soft visible grain in blonde and honey tones (around #E8D6B6 and " +
  "#C9A47A with cream highlights). Rings, hardware and small accents are " +
  "brushed soft brass/gold. Include a few small matte colored bead accents " +
  "(muted dusty blue, sage green, warm terracotta orange) as gentle glints. " +
  "Soft cinematic single-source light from the top-left with gentle ambient " +
  "occlusion. Rounded, friendly, tactile forms; matte, never glossy, never " +
  "cartoonish clay. One single centered subject with generous negative space " +
  "and consistent scale; the subject must not touch or be clipped by the " +
  "canvas edges. NO text, NO letters, NO numbers anywhere; NO UI screenshots; " +
  "NO drop shadow or contact shadow on the ground. Place the subject on a " +
  "COMPLETELY SOLID, FLAT, UNIFORM bright magenta background, pure #FF00FF, " +
  "filling the entire square canvas edge to edge, with no checkerboard, no " +
  "gradient, no vignette and no other color in the background. Square " +
  "composition, high detail.";

const lead = (subject) =>
  "Use the attached reference image ONLY for its material, finish, wood grain, " +
  "brass hardware, colored bead accents and lighting. Completely replace the " +
  `object with ${subject}. Keep the exact same wooden-toy material and render ` +
  "style as the reference. " +
  STYLE;

const SPECS = [
  { id: "cloud", subject: "a single plump rounded cloud shape" },
  { id: "database", subject: "a single database cylinder formed by a stack of three rounded disk drums" },
  { id: "network", subject: "a small node graph of four rounded ball nodes joined by slim connecting rods" },
  { id: "layers", subject: "three flat rounded square tiles stacked with a slight diagonal offset, like layers" },
  { id: "zap", subject: "a single bold lightning bolt" },
  { id: "cpu", subject: "a single square microchip with short pin legs along its sides and a small raised brass square in the center" },
  { id: "coins", subject: "a small neat stack of three round coins, slightly fanned" },
  { id: "chart", subject: "a small upright bar chart of three rising bars sitting on a base bar" },
  { id: "brain", subject: "a single stylized brain shape with gentle rounded lobes and soft grooves" },
  { id: "handshake", subject: "two simplified wooden hands clasped together in a friendly handshake" },
  { id: "trophy", subject: "a single classic trophy cup with two side handles on a round base" },
  { id: "calendar", subject: "a single calendar block: a rounded square card with two small mounting rings at the top and a faint grid of dots on its face" },
  { id: "shield", subject: "a single rounded plain shield with a smooth face and a slim raised border, no emblem" },
  { id: "lock", subject: "a single closed padlock with a rounded brass shackle" },
  { id: "sparkles", subject: "a cluster of three four-pointed sparkle stars of varying sizes" },
  { id: "fingerprint", subject: "a single fingerprint motif of concentric curved oval ridges, raised like carved grooves" },
  { id: "document", subject: "a single sheet of paper with a folded top-right corner and a few horizontal grooves suggesting lines of text" },
  { id: "building", subject: "a single modern office tower building with rows of small square window recesses" },
  { id: "folder", subject: "a single slightly open file folder" },
  { id: "team", subject: "three simple rounded pawn figures of slightly different heights grouped together, representing a team, with no faces" },
  { id: "video", subject: "a single rounded-square screen tile with a play triangle raised in the center" },
  { id: "book", subject: "a single open book with gently curved pages" },
  { id: "boxes", subject: "a small group of three rounded cubes stacked together" },
  { id: "scroll", subject: "a single rolled parchment scroll, partly unrolled" },
  { id: "coffee", subject: "a single rounded coffee mug with a small curl of steam above it" },
  { id: "dashboard", subject: "a single dashboard panel tile with two small widget rectangles and a round gauge dial" },
  { id: "rocket", subject: "a single sleek rocket ship pointed up to the upper-right" },
  { id: "key", subject: "a single key with an ornate brass bow and a simple wooden shaft" },
  { id: "globe", subject: "a single globe sphere with softly suggested carved continents" },
  { id: "target", subject: "a single archery target of concentric rings with a small dart in the bullseye" },
  { id: "feather", subject: "a single light feather quill, gently curved" },
  { id: "quote", subject: "a single large pair of rounded quotation marks (66-style opening quote marks) sculpted as one object" },
  { id: "migrate", subject: "two curved arrows forming a swap/migration loop, one pointing right and one pointing left, side by side" },
  { id: "scale", subject: "a single balanced scale of justice with two hanging pans on a central beam" },
  { id: "filecheck", subject: "a single sheet of paper with a raised brass checkmark on its face" },
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
  console.log(`\nDone: ${ok}/${todo.length} into public/brand/ui/`);
  if (ok < todo.length) process.exit(1);
}

main();
