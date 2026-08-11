#!/usr/bin/env node
/**
 * Cabinet agent-figure generator.
 *
 * A line of fun little wooden-toy mascots for AI agents/teammates, in the
 * exact material of public/brand/ui/*.png, but each a distinct character
 * (animal or object) instead of the classic robot-head bot look.
 *
 * Output: public/brand/agents/<id>.png
 *
 * Usage:
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-agent-figures.mjs            # all
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-agent-figures.mjs owl fox    # by id
 *
 * GEMINI_API_KEY is accepted as a fallback. The key is never written to disk.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { generateAndKey } from "./lib/imagegen.mjs";
import sharp from "sharp";

// Tried a hue-based second pass to catch dark contact-shadow magenta blobs
// keyMagenta's distance-to-#FF00FF metric misses, but it was just as likely
// to punch holes in pale rim-light highlights on the figure itself. Plain
// keyMagenta (same as every other icon in public/brand/) is the safe default;
// regenerate a spec (prompts are non-deterministic) if one comes back with a
// visible fringe instead of trying to fix it in post.

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "public/brand/agents");

const KEY = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("Missing GOOGLE_AI_API_KEY (or GEMINI_API_KEY) in the environment.");
  process.exit(1);
}

// Lock the material to the existing wooden-toy set by editing the bot icon,
// but the whole point is to leave the robot behind.
const REF = resolve(ROOT, "public/brand/feat/agents.png");

const STYLE =
  "Render it in the exact same warm hand-crafted wooden-toy style as the " +
  "reference: smooth light maple and birch wood with soft visible grain in " +
  "blonde and honey tones (around #E8D6B6 and #C9A47A with cream " +
  "highlights), brushed soft brass/gold rings and hardware, a couple of " +
  "small matte colored bead accents (muted dusty blue, sage green, warm " +
  "terracotta orange) as gentle glints. Give it a small friendly face made " +
  "the same way the reference's face is made: two round bead eyes and " +
  "nothing more, no other facial features, no mouth. Soft cinematic " +
  "single-source light from the top-left with gentle ambient occlusion. " +
  "Rounded, chunky, tactile toy proportions; matte, never glossy, never " +
  "cartoonish clay. One single centered character, standing or perched, " +
  "with generous negative space and consistent scale; must not touch or be " +
  "clipped by the canvas edges. NO text, NO letters or numbers anywhere; NO " +
  "UI screenshots; NO drop shadow or contact shadow on the ground. Place it " +
  "on a COMPLETELY SOLID, FLAT, UNIFORM bright magenta background, pure " +
  "#FF00FF, filling the entire square canvas edge to edge, with no " +
  "checkerboard, no gradient, no vignette and no other color in the " +
  "background. Square composition, high detail.";

const lead = (subject) =>
  "Use the attached reference image ONLY for its wooden-toy material, wood " +
  "grain, brass hardware, bead-eye face and lighting style. This is a brand " +
  `new character, not the robot in the reference: ${subject}. It must read ` +
  "as a small toy creature or object with a face, NEVER as a robot, and must " +
  "have no antenna, no visor, no metal body plates, no robotic joints. " +
  STYLE;

const SPECS = [
  { id: "owl", subject: "a small round wooden owl, perched, with soft tufted ear-feathers carved from wood and folded wooden wings" },
  { id: "fox", subject: "a small alert wooden fox sitting up, with pointed carved ears and a fluffy curled tail" },
  { id: "turtle", subject: "a small wooden turtle whose shell is carved as three tiny stacked drawers, each with a tiny brass pull handle" },
  { id: "beehive", subject: "a small stack of three rounded wooden hexagon comb segments forming a beehive shape, with one tiny bead-eyed bee resting on top" },
  { id: "acorn", subject: "a small wooden acorn character with a brass acorn-cap helmet and one small carved leaf sprouting from its top" },
  { id: "lantern", subject: "a small wooden lantern character standing on two short peg legs, with a glowing warm bead visible through a little window in its body" },
  { id: "kite-bird", subject: "a small wooden bird shaped like a folded paper kite, with angular origami-like wooden wing panels swept back as if in flight" },
  { id: "buoy", subject: "a small round wooden harbor buoy character standing on two short peg legs, with horizontal brass bands and a tiny brass ring handle on top" },
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
  console.log(`\nDone: ${ok}/${todo.length} into public/brand/agents/`);
  if (ok < todo.length) process.exit(1);
}

main();
