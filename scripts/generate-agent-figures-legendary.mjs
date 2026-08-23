#!/usr/bin/env node
/**
 * Cabinet agent figures, round three: detailed animals + classic archetypes
 * (wizard, knight, pirate...) — never a real copyrighted character, always a
 * generic archetype. More carving detail and more dynamic poses than rounds
 * one and two; brass is welcome again but only on a character's own weapon
 * or armor, never as loose decorative jewelry.
 *
 * Output: public/brand/agents-legendary/<id>.png
 *
 * Usage:
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-agent-figures-legendary.mjs            # all
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-agent-figures-legendary.mjs bear wizard # by id
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
const OUT_DIR = resolve(ROOT, "public/brand/agents-legendary");

const KEY = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("Missing GOOGLE_AI_API_KEY (or GEMINI_API_KEY) in the environment.");
  process.exit(1);
}

// Reference only for wood tone/grain/lighting.
const REF = resolve(ROOT, "public/brand/agents/owl.png");

const COMMON =
  "Soft cinematic single-source light from the top-left with gentle ambient " +
  "occlusion. One single centered subject, dynamic pose, generous negative " +
  "space, not touching or clipped by the canvas edges. NO text, NO letters " +
  "or numbers anywhere, NO UI screenshots, NO drop shadow or contact " +
  "shadow on the ground. Place it on a COMPLETELY SOLID, FLAT, UNIFORM " +
  "bright magenta background, pure #FF00FF, filling the entire square " +
  "canvas edge to edge, no checkerboard, no gradient, no vignette, no " +
  "other color in the background. Square composition, high detail.";

const FAMILY_STYLE = {
  animal:
    "A highly detailed carved wooden animal figure, more intricate than a " +
    "simple toy: individually carved fur, feather or scale texture, natural " +
    "anatomical detail, a genuinely dynamic pose full of character. Two-tone " +
    "wood — warm honey maple for the body, darker carved walnut for " +
    "markings, tips and accents. Small carved dark-wood eyes with a tiny " +
    "glint highlight, never a flat bead. Matte varnish throughout, no " +
    "colored bead jewelry anywhere. " + COMMON,
  archetype:
    "A small wooden action-figure character embodying a classic, generic " +
    "archetype — an original design, never a real copyrighted character or " +
    "franchise. Carved in two-tone wood: light honey maple for the body, " +
    "darker walnut for boots, belt, hair or cloth folds, deep confident " +
    "carved detail in the clothing and pose. Give it exactly one signature " +
    "carved wooden prop matching its role, with a little aged brass only on " +
    "that prop's own metal parts (a blade edge, a buckle, a ferrule) — " +
    "never loose decorative jewelry on the body. Simple carved facial " +
    "features, dark-wood eyes. Matte varnish, confident heroic silhouette. " +
    COMMON,
};

const lead = (family, subject) =>
  "Use the attached reference image ONLY for its wood tone, grain and " +
  `lighting direction; ignore its shape entirely. New subject: ${subject}. ` +
  FAMILY_STYLE[family];

const SPECS = [
  // animal — detailed wildlife, more carving, more drama
  { id: "bear", family: "animal", subject: "a broad-shouldered lumberjack bear standing tall on its hind legs, a small wooden axe resting on one shoulder, sturdy planted stance" },
  { id: "wolf", family: "animal", subject: "a lean wolf sitting up mid-howl with its head tilted back, a thick carved fur ruff around its neck, tail curled around its paws" },
  { id: "raven", family: "animal", subject: "a raven perched with elaborately layered carved wing and tail feathers, head cocked to one side, a small wooden scroll held in its beak" },
  { id: "elephant", family: "animal", subject: "a small elephant standing with its trunk curled upward, deep carved wrinkle texture across its hide, a small stack of wooden books strapped to its back" },
  { id: "octopus", family: "animal", subject: "an octopus balanced up on three curled tentacles, its other tentacles each holding a different tiny wooden tool: a pen, a magnifying glass, a gear, and an hourglass" },
  { id: "chameleon", family: "animal", subject: "a chameleon gripping a curved wooden branch with its curled tail and feet, one eye swiveled forward, richly textured carved scale pattern" },
  { id: "dragon", family: "animal", subject: "a small chibi baby dragon sitting upright with its wings half-spread, carved wing-membrane ribs, small spikes down its tail, a curl of carved wood flame in its open mouth" },
  { id: "stag", family: "animal", subject: "a stag sitting regally upright on its haunches, tall many-pointed antlers branching above its head, alert noble posture" },

  // archetype — generic roles, original design, one signature prop
  { id: "wizard", family: "archetype", subject: "a wizard in a long folded robe and tall pointed hat, gripping a tall gnarled wooden staff topped with a round pale wood orb" },
  { id: "ninja", family: "archetype", subject: "a ninja crouched low in a ready stance, a wrapped cloth mask across the lower face, two small wooden throwing stars fanned in one hand" },
  { id: "astronaut", family: "archetype", subject: "an astronaut caught mid-leap with one arm raised, a rounded helmet with a raised visor ridge, a chunky backpack with two small tanks" },
  { id: "knight", family: "archetype", subject: "a knight in layered plate armor braced behind a tall rounded shield with a brass rivet border, a short sword raised in the other hand" },
  { id: "pirate", family: "archetype", subject: "a pirate captain standing with one boot up on a small barrel, a long coat with carved lapels, a tricorn hat, a brass-ringed spyglass held up to one eye" },
  { id: "chef", family: "archetype", subject: "a chef in a tall pleated hat and a double-breasted jacket, one hand holding a whisk and the other a mixing bowl against its hip" },
  { id: "detective", family: "archetype", subject: "a detective in a long trench coat with a wide-brimmed hat tilted low, holding a round magnifying glass up in front of one eye" },
  { id: "hero", family: "archetype", subject: "a caped hero in a mid-flight pose leaning forward with one fist out front, a long cape flowing dramatically behind, a simple carved emblem on its chest" },
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
  console.log(`\nDone: ${ok}/${todo.length} into public/brand/agents-legendary/`);
  if (ok < todo.length) process.exit(1);
}

main();
