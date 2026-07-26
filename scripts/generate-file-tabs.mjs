#!/usr/bin/env node
/**
 * Cabinet file-type tab generator.
 *
 * Generates the colorful 3D file-folder tabs that appear in the brand mark
 * (public/Cabinet.png) as standalone, transparent-background webp marks, one
 * per file type, and writes them to public/generated/filetabs/. The hero
 * integration scene uses them on the "pages" pills.
 *
 * Usage:
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-file-tabs.mjs          # all
 *   GOOGLE_AI_API_KEY=xxx node scripts/generate-file-tabs.mjs pdf doc  # some by id
 *
 * The key is read from the environment and never written to disk.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { generateAndKey } from "./lib/imagegen.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "public/generated/filetabs");

const KEY = process.env.GOOGLE_AI_API_KEY;
if (!KEY) {
  console.error("Missing GOOGLE_AI_API_KEY in the environment.");
  process.exit(1);
}

// Style reference: a crop of the painted folder-tab cards from the brand mark
// (scripts/refs/painted-cards.png). Passed to the model so the generated cards
// match that exact soft matte look, folder-tab shape, and cream flat icon.
const REF = resolve(__dirname, "refs/painted-cards.png");

// Shared style: ONE soft matte folder-tab card with a cream flat icon, exactly
// like the reference cards. Magenta background is keyed to transparency by
// imagegen.mjs.
const STYLE =
  "Reproduce ONE single file-folder card in the EXACT style of the colorful " +
  "file cards in the reference image: a folder card with a small rounded tab " +
  "on its top edge (a filing-cabinet folder tab), soft matte finish, gently " +
  "rounded, with a subtle rounded thickness and soft cinematic light from the " +
  "top-left, calm and tactile like a painted wooden-toy filing card (never " +
  "glossy, never a flat sticker, never cartoonish, never a square app icon). " +
  "The card is a soft, muted pastel fill in the stated color. Centered on its " +
  "face sits ONE simple, bold, flat CREAM-WHITE icon with thick rounded " +
  "strokes, clearly readable at tiny size. The single card stands upright, " +
  "seen straight-on and slightly from above, filling most of the frame with " +
  "margin. Only ONE card, not a stack. NO text or letters, NO UI screenshots, " +
  "NO contact shadow, NO extra cards. The single card is placed on a " +
  "COMPLETELY SOLID, FLAT, UNIFORM bright magenta background, pure #FF00FF, " +
  "filling the entire square canvas edge to edge, with absolutely no " +
  "checkerboard, no gradient, no vignette, and no other color anywhere in the " +
  "background. Square composition, high detail.";

// One folder card per file family. Soft muted pastel colors like the reference
// cards; each carries a single cream-white flat icon.
const SPECS = [
  {
    id: "md",
    prompt:
      "A soft muted terracotta / warm clay card. Icon: a document sheet with " +
      "a few horizontal lines and a small downward chevron (markdown). ",
  },
  {
    id: "pdf",
    prompt:
      "A soft muted coral-red card. Icon: a document sheet with a folded " +
      "top-right corner. ",
  },
  {
    id: "sheet",
    prompt:
      "A soft muted sage-green card. Icon: a spreadsheet grid of cells with a " +
      "small pie-chart wedge beside it. ",
  },
  {
    id: "doc",
    prompt:
      "A soft muted sky-blue card. Icon: a document sheet with three clean " +
      "horizontal text lines. ",
  },
  {
    id: "code",
    prompt:
      "A soft muted steel-blue card. Icon: an angle-bracket code mark, two " +
      "chevrons like < >. ",
  },
  {
    id: "deck",
    prompt:
      "A soft muted lavender-purple card. Icon: a presentation slide with a " +
      "small play triangle. ",
  },
  {
    id: "design",
    prompt:
      "A soft muted teal card. Icon: a picture mark, a rounded frame with a " +
      "small circle (sun) and a triangle (mountain) inside. ",
  },
];

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const filter = process.argv.slice(2);
  const todo = filter.length ? SPECS.filter((s) => filter.includes(s.id)) : SPECS;
  if (!todo.length) {
    console.error(`No matching ids. Known: ${SPECS.map((s) => s.id).join(", ")}`);
    process.exit(1);
  }
  let ok = 0;
  for (const spec of todo) {
    process.stdout.write(`Generating filetab ${spec.id} ... `);
    try {
      const { png, model } = await generateAndKey(spec.prompt + STYLE, KEY, { imagePaths: [REF] });
      // These are tiny UI marks (~22px). Store a small webp, not the 1MB
      // full-res PNG the model returns.
      const webp = await sharp(png).resize(256, 256, { fit: "inside" }).webp({ quality: 90 }).toBuffer();
      writeFileSync(resolve(OUT_DIR, `${spec.id}.webp`), webp);
      console.log(`OK (${model}, ${(webp.length / 1024).toFixed(0)} KB)`);
      ok++;
    } catch (e) {
      console.log(`FAILED: ${e.message}`);
    }
  }
  console.log(`\nDone: ${ok}/${todo.length} into public/generated/filetabs/`);
  if (ok < todo.length) process.exit(1);
}

main();
