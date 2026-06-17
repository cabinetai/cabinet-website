#!/usr/bin/env node
/**
 * Cabinet brand image generator.
 *
 * Generates transparent-background, single-motif hero illustrations in a
 * consistent house style via Google's Gemini image models, and writes them to
 * public/generated/.
 *
 * Usage:
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-images.mjs            # all specs
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-images.mjs home-hero  # one/some by id
 *
 * The key is read from the environment and never written to disk. Rotate the
 * key if it has been shared. See docs/prd-world-class-website.md
 * §"Image generation system" for the full pipeline and how to add new motifs.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { generateAndKey } from "./lib/imagegen.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "public/generated");

const KEY = process.env.GOOGLE_AI_API_KEY;
if (!KEY) {
  console.error("Missing GOOGLE_AI_API_KEY in the environment.");
  process.exit(1);
}

// One shared style string keeps every image visually consistent. Edit here to
// re-tune the whole set at once. House direction: refined matte 3D, full warm
// palette, one distilled iconic symbol, AI agents shown only as abstract
// glints (never characters/faces).
const STYLE =
  "Refined matte 3D illustration with a premium product-render finish: soft " +
  "tactile MATTE materials (never glossy plastic, never cartoonish clay), one " +
  "distilled iconic subject, soft cinematic single-source light from the " +
  "top-left with a gentle ambient occlusion, calm, restrained and elegant " +
  "with generous negative space. Warm palette: rich browns near #8B5E3C, warm " +
  "cream, with subtle sage-green #5A7A4F accents. Where AI 'agents' are " +
  "implied, show them ONLY as small abstract glints of light or simple " +
  "geometric tokens, never as characters and never with faces or eyes. NO " +
  "text or letters anywhere, NO UI screenshots, NO contact shadow. The single " +
  "centered subject is placed on a COMPLETELY SOLID, FLAT, UNIFORM bright " +
  "magenta background, pure #FF00FF, filling the entire square canvas edge to " +
  "edge, with absolutely no checkerboard, no gradient, no vignette, and no " +
  "other color anywhere in the background. Square composition, high detail.";

// One big iconic symbol per page. Add entries here to extend coverage.
const SPECS = [
  {
    id: "home-hero",
    out: "home-hero.png",
    prompt:
      "A single, distilled, iconic object that symbolizes an AI-first " +
      "knowledge base you own: one refined, elegant cabinet rendered as a " +
      "premium matte 3D sculpture, with a single open drawer revealing softly " +
      "glowing, neatly filed document cards, and one or two faint glints of " +
      "light nearby to imply quiet AI agents. Minimal and prestigious, one " +
      "big centered symbol. " +
      STYLE,
  },
  {
    id: "solution-sales",
    out: "solution-sales.png",
    prompt:
      "A single, distilled, iconic symbol for an AI-augmented sales function: " +
      "one elegant upward-sweeping form, a refined sales pipeline or rising " +
      "arrow, rendered as a premium matte 3D sculpture, suggesting deals " +
      "advancing on their own, with a single soft glint of light to imply a " +
      "quiet AI agent at work. Minimal and prestigious, one big centered " +
      "symbol. " +
      STYLE,
  },
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
      const { png, model } = await generateAndKey(spec.prompt, KEY);
      writeFileSync(resolve(OUT_DIR, spec.out), png);
      console.log(`OK (${model}, ${(png.length / 1024).toFixed(0)} KB)`);
      ok++;
    } catch (e) {
      console.log(`FAILED: ${e.message}`);
    }
  }
  console.log(`\nDone: ${ok}/${todo.length} generated into public/generated/`);
  if (ok < todo.length) process.exit(1);
}

main();
