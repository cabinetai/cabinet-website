#!/usr/bin/env node
/**
 * Cabinet card-image generator.
 *
 * Generates the per-card wood-craft motifs used by two home-page sections:
 *   - "Cabinet for every team"  -> public/brand/solutions/<slug>.png
 *   - "Designed to clear a security review" -> public/brand/trust/<key>.png
 *
 * These match the existing feature-grid icons in public/brand/feat/*.png: one
 * distilled object sculpted in light maple/birch wood with brushed-brass
 * hardware and a few muted colored bead accents, on a transparent background.
 *
 * To lock the material to that exact look, each spec is generated image-to-image
 * against a clean reference from public/brand/feat (the alarm clock), so only
 * the subject changes, not the wood/brass/bead finish or lighting.
 *
 * Usage:
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-card-images.mjs                 # all
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-card-images.mjs marketing soc2  # by id
 *
 * The GEMINI_API_KEY env var is accepted as a fallback. The key is read from the
 * environment and never written to disk.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { generateAndKey } from "./lib/imagegen.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const KEY = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("Missing GOOGLE_AI_API_KEY (or GEMINI_API_KEY) in the environment.");
  process.exit(1);
}

// Style reference: a clean, neutral feature icon. Material/finish/lighting come
// from this image; the subject comes from each spec's prompt.
const REF = resolve(ROOT, "public/brand/feat/schedule.png");

// Shared house style, matched to public/brand/feat/*.png. Edit here to re-tune
// the whole set at once.
const STYLE =
  "Render it in a warm, hand-crafted wooden-toy style with a premium matte " +
  "product-render finish. The subject is sculpted from smooth light maple and " +
  "birch wood with soft visible wood grain in blonde and honey tones (around " +
  "#E8D6B6 and #C9A47A with cream highlights). Rings, hardware and small " +
  "accents are brushed soft brass/gold. Include a few small matte colored bead " +
  "accents (muted dusty blue, sage green, warm terracotta orange) as gentle " +
  "glints. Soft cinematic single-source light from the top-left with gentle " +
  "ambient occlusion. Rounded, friendly, tactile forms; matte, never glossy, " +
  "never cartoonish clay. One single centered subject with generous negative " +
  "space and consistent scale. NO text or letters anywhere, NO UI screenshots, " +
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

// One distilled, iconic object per card.
const SPECS = [
  // ── Solutions: "Cabinet for every team" ──
  { id: "sales", out: "brand/solutions/sales.png",
    subject: "a single clean bold arrow with a straight shaft and one clear triangular arrowhead, pointing diagonally up toward the top-right, unmistakably an upward growth arrow" },
  { id: "marketing", out: "brand/solutions/marketing.png",
    subject: "a single classic megaphone / bullhorn tilted slightly upward" },
  { id: "engineering", out: "brand/solutions/engineering.png",
    subject: "a single code glyph made of two angle brackets facing each other with a slash between them, like </>, sculpted as one solid object" },
  { id: "product", out: "brand/solutions/product.png",
    subject: "a single elegant compass with a brass needle, the classic discovery/navigation instrument" },
  { id: "operations", out: "brand/solutions/operations.png",
    subject: "a compact cluster of exactly two interlocking cog gears meshing together (one larger, one smaller), suggesting smooth automated operations. Show both gears complete and in full, centered in the frame with generous empty negative space all around them; no gear may touch, overlap or be clipped by the canvas edges" },
  { id: "founders", out: "brand/solutions/founders.png",
    subject: "a single sleek rocket ship pointed upward, ready to launch" },

  // ── Trust: "Designed to clear a security review" ──
  { id: "soc2", out: "brand/trust/soc2.png",
    subject: "a single rounded shield with a clean embossed checkmark carved into its face" },
  { id: "open-source", out: "brand/trust/open-source.png",
    subject: "a single open wooden box with its lid raised, revealing a few neatly stacked softly glowing cards inside, suggesting openness and transparency" },
  { id: "self-hosted", out: "brand/trust/self-hosted.png",
    subject: "a single small server tower made of two or three stacked server units with a few tiny indicator bead lights on the front" },
  { id: "not-training", out: "brand/trust/not-training.png",
    subject: "a single closed padlock resting on top of a small neat stack of document cards, suggesting private data kept locked away. The whole background must be pure flat magenta #FF00FF only, with no studio surface, no floor, no table, no gray or white backdrop and no shadow of any kind" },
  { id: "byo-keys", out: "brand/trust/byo-keys.png",
    subject: "a single chunky key shown nearly upright and filling most of the frame, its thick shaft and teeth carved from light blonde maple wood with a rounded brushed-brass bow (the looped head). The key itself must be warm maple wood and brass ONLY; never pink, magenta, rose or red. Critically: render ONLY the one key floating on the flat magenta, with absolutely no shadow, no glow, no halo, no outline and no second offset copy of the key anywhere" },
  { id: "audit-log", out: "brand/trust/audit-log.png",
    subject: "a single vertical timeline ribbon with three evenly spaced rounded commit nodes along it, like a git history branch" },
  { id: "sso-scim", out: "brand/trust/sso-scim.png",
    subject: "a single ID access badge card with a small lanyard clip hole at the top and a simple rounded portrait silhouette area, suggesting single sign-on identity" },
  { id: "data-residency", out: "brand/trust/data-residency.png",
    subject: "a single globe / sphere with softly suggested continents, resting in a small cupped base, with one small location pin on its surface" },
];

async function main() {
  const filter = process.argv.slice(2);
  const todo = filter.length ? SPECS.filter((s) => filter.includes(s.id)) : SPECS;
  if (!todo.length) {
    console.error(`No matching specs. Known ids: ${SPECS.map((s) => s.id).join(", ")}`);
    process.exit(1);
  }
  let ok = 0;
  for (const spec of todo) {
    const outPath = resolve(ROOT, "public", spec.out);
    mkdirSync(dirname(outPath), { recursive: true });
    process.stdout.write(`Generating ${spec.id} ... `);
    try {
      const { png, model } = await generateAndKey(lead(spec.subject), KEY, { imagePath: REF });
      writeFileSync(outPath, png);
      console.log(`OK (${model}, ${(png.length / 1024).toFixed(0)} KB) -> ${spec.out}`);
      ok++;
    } catch (e) {
      console.log(`FAILED: ${e.message}`);
    }
  }
  console.log(`\nDone: ${ok}/${todo.length} generated.`);
  if (ok < todo.length) process.exit(1);
}

main();
