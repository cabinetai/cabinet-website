#!/usr/bin/env node
/**
 * Cabinet logo-candidate generator: app-icon-grade marks.
 *
 * Round 2 (2026-07-18): the winning direction from round 1 was the wooden
 * tile. This batch develops it: a single-drawer wooden squircle whose handle
 * is a carved smile with two dot eyes (after the ref-trio / face-squircle
 * explorations), plus Notion-style ivory tiles carrying a serif C or the
 * face glyph instead of Notion's N. Results land in
 * public/brand/logo-candidates/ and appear automatically in the
 * "Logo candidates" section of /styleguide.
 *
 * Usage:
 *   node scripts/generate-logos.mjs                 # all (key from .env.local)
 *   node scripts/generate-logos.mjs face-one-glow   # by id
 *
 * The key is read from the environment (or .env.local) and never written to
 * any output.
 */
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { generateAndKey } from "./lib/imagegen.mjs";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "public/brand/logo-candidates");

// Allow the key to live in gitignored .env.local (GOOGLE_AI_API_KEY=...).
let KEY = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
const envLocal = resolve(ROOT, ".env.local");
if (!KEY && existsSync(envLocal)) {
  const m = readFileSync(envLocal, "utf8").match(/^(?:GOOGLE_AI_API_KEY|GEMINI_API_KEY)=(.+)$/m);
  if (m) KEY = m[1].trim();
}
if (!KEY) {
  console.error("Missing GOOGLE_AI_API_KEY (env or .env.local).");
  process.exit(1);
}

// Style references from the exploration set.
const REF_TRIO = resolve(ROOT, "public/brand/logo-variations/ref-trio-1.png");
const REF_SQUIRCLE = resolve(ROOT, "public/brand/logo-variations/face-squircle.png");

/**
 * Shared scaffold: every candidate is ONE squircle app-icon tile. The tile is
 * the subject; magenta is keyed out afterwards, leaving a clean tile with
 * transparent corners.
 */
const TILE =
  "Compose it as a single iOS app icon: ONE rounded-square tile (squircle with " +
  "smooth continuous-curvature corners, corner radius about 22% of the tile " +
  "width), perfectly centered, front view, occupying about 76% of the square " +
  "canvas. It must read instantly at 32 pixels: one bold central motif, strong " +
  "silhouette, generous margins, no fine detail smaller than 1/12 of the tile. " +
  "Absolutely NO text, NO letters (unless the prompt explicitly names one), NO " +
  "numbers, NO watermark. Nothing outside the tile. The area around the tile " +
  "is a COMPLETELY SOLID, FLAT, UNIFORM bright magenta background, pure " +
  "#FF00FF, edge to edge, with no gradient, no vignette, no shadow spilling " +
  "onto it. Square canvas, ultra-clean professional brand-identity quality, " +
  "high detail.";

/**
 * The Notion-language scaffold: the mark is a free-standing dimensional BLOCK
 * (not a tile), drawn like the Notion cube: thick uniform outlines, flat
 * fills, slight three-quarter perspective. It gets keyed to transparency and
 * can later sit on any app tile.
 */
const BLOCK =
  "Draw ONE small three-dimensional rectangular block in slight three-quarter " +
  "perspective: rotated about 12 degrees, tilted just enough that the TOP " +
  "plane is clearly visible above the front face, exactly like the Notion " +
  "app-icon cube. Graphic language: very thick, perfectly uniform bold " +
  "outlines in deep espresso brown (#2C2520), flat solid fills, sharp clean " +
  "vector edges, softly rounded corners on the block. NO gradients, NO " +
  "texture, NO photorealism, NO shading: a flat 2D vector rendering of a 3D " +
  "object. The visible top and side planes are SOLID espresso brown; the " +
  "front face is warm cream (#FAF6F1) framed by the thick espresso outline. " +
  "The block is the ONLY subject, centered, occupying about 72% of the square " +
  "canvas, floating free with nothing else. The background is a COMPLETELY " +
  "SOLID, FLAT, UNIFORM bright magenta, pure #FF00FF, edge to edge, no " +
  "gradient, no vignette, no shadow. Confident, iconic, timeless " +
  "brand-identity quality, the craft of a 20-year logo designer.";

const FACE =
  "The face is made ONLY of drawer hardware: two small round dot eyes in the " +
  "upper half, and below them ONE wide upward-curving smile that is clearly a " +
  "real carved drawer HANDLE (a solid 3D pull you could grab, arc-shaped, " +
  "with rounded ends), centered. Friendly, calm, perfectly symmetrical.";

const SPECS = [
  {
    id: "face-one-carved",
    name: "One-drawer face, walnut hardware",
    ref: REF_TRIO,
    prompt:
      "Use the attached reference ONLY for its wood material, warm honey-maple " +
      "grain, matte finish, and the exact style of its smile-shaped dark-walnut " +
      "drawer handles and round dot eyes. Recompose completely: a single " +
      "front-facing wooden squircle tile that IS one drawer front. " +
      FACE +
      " Eyes and smile-handle in dark walnut wood, standing slightly proud of " +
      "the surface. Soft top-left light, gentle ambient occlusion, matte never " +
      "glossy. " +
      TILE,
  },
  {
    id: "face-one-glow",
    name: "One-drawer face, warm glow",
    ref: REF_SQUIRCLE,
    prompt:
      "Use the attached reference ONLY for its wood material, its glowing warm " +
      "light effect, and its single-drawer squircle composition. Recreate it as " +
      "a cleaner, perfectly centered app icon: a wooden squircle tile that IS " +
      "one drawer front. " +
      FACE +
      " Here the two dot eyes and the smile-handle GLOW from within in warm " +
      "amber light, like soft lamplight through the wood, with a gentle halo on " +
      "the surrounding grain. Cozy, magical, premium. " +
      TILE,
  },
  {
    id: "face-one-gold",
    name: "One-drawer face, brass hardware",
    ref: REF_TRIO,
    prompt:
      "Use the attached reference ONLY for its wood material, warm honey-maple " +
      "grain, matte finish, and the exact style of its smile-shaped drawer " +
      "handles and round dot eyes. Recompose completely: a single front-facing " +
      "wooden squircle tile that IS one drawer front. " +
      FACE +
      " Eyes and smile-handle in brushed soft brass/gold, softly catching the " +
      "light. Soft top-left light, matte wood, premium jewel-box feel. " +
      TILE,
  },
  {
    id: "notion-block-c",
    name: "Notion-language block, serif C",
    prompt:
      BLOCK +
      " CRITICAL geometry: the front face must NOT be dead-frontal. Draw the " +
      "cube viewed from slightly above and to the left, so the front face is a " +
      "subtle parallelogram leaning right, the TOP plane shows as a wide " +
      "parallelogram ABOVE the front face, and a narrow side plane shows on " +
      "one side: exactly the Notion cube's stance. On the cream front face, " +
      "ONE huge capital letter C in a bookish high-contrast Times-like serif " +
      "(bracketed serifs, strong thick-thin contrast, exactly the typographic " +
      "voice of the Notion N), in the same espresso brown, drawn in the same " +
      "subtle perspective as the face it sits on, optically centered and " +
      "filling most of the face. The letter C is explicitly allowed and is " +
      "the only glyph.",
  },
  {
    id: "notion-block-face",
    name: "Notion-language block, drawer face",
    prompt:
      BLOCK +
      " On the cream front face, in place of a letter, ONE bold drawer-face " +
      "mark in the same espresso brown: two round dots (drawer-hole eyes) side " +
      "by side in the upper half, and below them one wide upward-curving thick " +
      "arc with rounded ends (a smile-shaped drawer handle). Exactly three " +
      "flat shapes on the face, chunky and perfectly balanced, the same visual " +
      "weight the Notion N carries.",
  },
  {
    id: "wood-block-face",
    name: "Wooden block, Notion stance, drawer face",
    refs: [
      resolve(ROOT, "public/brand/logo-candidates/notion-block-face.png"),
      resolve(ROOT, "public/brand/logo-candidates/wood-tile.png"),
    ],
    prompt:
      "Two references are attached. Use the FIRST image ONLY for its exact " +
      "composition, geometry, and stance: a dimensional block in slight " +
      "three-quarter Notion-cube perspective with the top plane visible, whose " +
      "front face carries a friendly drawer face (two round dot eyes above one " +
      "wide upward-curving smile-shaped drawer handle), with the same rounded " +
      "corners and the same bold silhouette line work. Use the SECOND image " +
      "ONLY for its material and finish: smooth light maple wood with subtle " +
      "warm grain, matte hand-crafted wooden-toy quality, soft top-left light, " +
      "gentle ambient occlusion, never glossy. Now recreate the first image's " +
      "block as a REAL carved wooden object in that material: the block's " +
      "visible top and side planes in slightly deeper honey wood, the front " +
      "face in lighter maple, and the two dot eyes and the smile-shaped " +
      "handle as raised carved dark-walnut wooden hardware standing proud of " +
      "the face, exactly where the first image places them. Keep the chunky, " +
      "bold, iconic proportions of the first image; render with the realism " +
      "of the second. The block is the ONLY subject, centered, occupying " +
      "about 72% of the square canvas, floating free, NO text anywhere. The " +
      "background is a COMPLETELY SOLID, FLAT, UNIFORM bright magenta, pure " +
      "#FF00FF, edge to edge, no gradient, no shadow spilling onto it. " +
      "Premium Apple-grade product render, brand-identity quality.",
  },
  {
    id: "notion-block-trio",
    name: "Notion-language trio chest, solid fill",
    ref: resolve(ROOT, "public/brand/logo-candidates/notion-block-cabinet.png"),
    prompt:
      "Use the attached reference ONLY for its exact graphic style: thick " +
      "uniform espresso outlines, flat fills, cream seams, slight " +
      "three-quarter Notion-cube perspective with the top plane visible. In " +
      "that exact style, draw a TALLER portrait-format block: a chest of THREE " +
      "stacked drawers (like a small dresser). This version is SOLID-FILLED: " +
      "every drawer front is filled solid espresso brown (#2C2520), the same " +
      "as the outlines, separated by thin cream (#FAF6F1) seam lines. On each " +
      "of the three drawer fronts, the face is knocked out in NEGATIVE SPACE " +
      "in the same cream: two small round cream dots (eyes) above one wide " +
      "upward-curving thick cream arc with rounded ends (the smile-shaped " +
      "drawer handle). Three identical smiling drawer faces, evenly spaced. " +
      "Flat 2D vector rendering of a 3D object, NO gradients, NO texture, NO " +
      "shading. The chest is the ONLY subject, centered, occupying about 72% " +
      "of the square canvas, floating free. The background is a COMPLETELY " +
      "SOLID, FLAT, UNIFORM bright magenta, pure #FF00FF, edge to edge. " +
      "Confident, iconic, timeless brand-identity quality.",
  },
  {
    id: "notion-block-cabinet",
    name: "Notion-language block, pure cabinet",
    prompt:
      BLOCK +
      " The front face reads as a tiny two-drawer cabinet front: one thick " +
      "horizontal espresso line divides the cream face into two equal drawer " +
      "fronts, and each drawer carries one small solid espresso horizontal " +
      "pill handle, centered. No letters, no face: the block IS a miniature " +
      "cabinet, as iconic and reduced as a road sign.",
  },
  {
    id: "wood-tile",
    name: "Carved wooden tile (round-1 keeper)",
    prompt:
      "A premium 3D logo mark: the tile itself is sculpted from smooth light " +
      "maple wood (#E8D6B6 with #C9A47A grain), matte hand-crafted wooden-toy " +
      "finish with subtle grain. Carved into its face is a two-drawer cabinet " +
      "front: two wide recessed drawer panels, each with one small brushed " +
      "soft brass/gold bar handle. Soft single top-left light, gentle ambient " +
      "occlusion, matte never glossy. Tactile, warm, Apple-grade product " +
      "render. " +
      TILE,
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
      const { png, model } = await generateAndKey(
        spec.prompt,
        KEY,
        spec.refs ? { imagePaths: spec.refs } : spec.ref ? { imagePath: spec.ref } : {},
      );
      const out = await sharp(png)
        .trim()
        .resize(512, 512, { fit: "inside", withoutEnlargement: true })
        .png({ quality: 92, compressionLevel: 9 })
        .toBuffer();
      writeFileSync(resolve(OUT_DIR, `${spec.id}.png`), out);
      console.log(`OK (${model}, ${(out.length / 1024).toFixed(0)} KB)`);
      ok++;
    } catch (e) {
      console.log(`FAILED: ${e.message}`);
    }
  }
  console.log(`\nDone: ${ok}/${todo.length} into public/brand/logo-candidates/`);
  if (ok < todo.length) process.exit(1);
}

main();
