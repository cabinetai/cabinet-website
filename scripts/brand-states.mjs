#!/usr/bin/env node
/**
 * Generate drawer-state variants of the Cabinet brand mark, matched to the
 * existing public/brand/cabinet-logo.png (both drawers open). Outputs trimmed,
 * transparent PNGs plus 512px web versions to public/brand/.
 *
 *   GOOGLE_AI_API_KEY=xxx node scripts/brand-states.mjs
 */
import { generateAndKey } from "./lib/imagegen.mjs";
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const KEY = process.env.GOOGLE_AI_API_KEY;
if (!KEY) {
  console.error("Missing GOOGLE_AI_API_KEY in the environment.");
  process.exit(1);
}

const REF = "public/brand/cabinet-logo.png";

const STYLE =
  "Match the reference cabinet EXACTLY: the same light natural wood material " +
  "and warm tan color, the same rounded shape and proportions, the same " +
  "three-quarter camera angle, the same soft gold handles, the same soft " +
  "lighting and clean 3D product-render look.";

const SUFFIX =
  " NO shadow, NO floor, NO pink or magenta anywhere on the subject. Place the " +
  "whole subject on a COMPLETELY SOLID, FULL-BLEED bright magenta #FF00FF " +
  "background covering every pixel. Square, high detail, no readable text or letters.";

const VARIANTS = {
  closed:
    "Show BOTH drawers fully CLOSED and flush with the cabinet front: no " +
    "contents visible, just the two clean closed drawer fronts with soft gold " +
    "handles.",
  "top-open":
    "Show ONLY the TOP drawer open and pulled forward, revealing a neat row of " +
    "colorful file-type folder tabs; the BOTTOM drawer is fully CLOSED and " +
    "flush with the cabinet front.",
  "bottom-open":
    "Show ONLY the BOTTOM drawer open and pulled forward, revealing the glowing " +
    "pastel geometric agent tokens; the TOP drawer is fully CLOSED and flush " +
    "with the cabinet front.",
};

async function trimPad(png, pad = 14) {
  const { data, info } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: ch } = info;
  let minX = W, minY = H, maxX = 0, maxY = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (data[(y * W + x) * ch + 3] > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(W - 1, maxX + pad);
  maxY = Math.min(H - 1, maxY + pad);
  return sharp(png).extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 }).png().toBuffer();
}

for (const [name, desc] of Object.entries(VARIANTS)) {
  process.stdout.write(`${name} ... `);
  try {
    const { png } = await generateAndKey(`${STYLE} ${desc}${SUFFIX}`, KEY, { imagePath: REF });
    const trimmed = await trimPad(png);
    writeFileSync(`public/brand/cabinet-logo-${name}.png`, trimmed);
    const web = await sharp(trimmed).resize(512, 512, { fit: "inside" }).png({ compressionLevel: 9, quality: 90, effort: 10 }).toBuffer();
    writeFileSync(`public/brand/cabinet-logo-${name}-512.png`, web);
    console.log(`OK (master ${(trimmed.length / 1024).toFixed(0)} KB / web ${(web.length / 1024).toFixed(0)} KB)`);
  } catch (e) {
    console.log(`FAILED: ${e.message}`);
  }
}
