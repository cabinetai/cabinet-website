#!/usr/bin/env node
/**
 * Site icon generator — derives every icon the site serves from one master:
 * assets/brand/cabinet-mark.png (brand Family A, the 3D wooden cabinet,
 * two-drawer face).
 *
 * The master is the artwork that has been the site's favicon all along. It is
 * already composed as a square icon with its own padding, so this only
 * resizes — deliberately no trim-and-recentre, which would reframe a mark
 * that is already framed correctly.
 *
 * What this fixes: public/cabinet-icon.png was Family C (the flat brown
 * smiley) while the favicon above it was Family A, and there was no
 * apple-icon at all. Family A is the org-wide mark; see
 * cabinetai/cabinet-docs-internal:brand/AUDIT-2026-07-31.md.
 *
 * Usage:
 *   node scripts/generate-icons.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MASTER = resolve(root, "assets/brand/cabinet-mark.png");

// Palette-quantised: these are served on every page load, and a photoreal wood
// render is ~3.5x larger as truecolour PNG with no visible difference at icon
// sizes.
function icon(size) {
  return sharp(MASTER)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: "lanczos3" })
    .png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 })
    .toBuffer();
}

function emit(relPath, buffer) {
  const target = resolve(root, relPath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, buffer);
  console.log(`  ${relPath}  ${(buffer.length / 1024).toFixed(1)} KB`);
}

console.log("Generating site icons from Family A master\n");

// Next.js App Router serves these two by file convention — src/app/icon.png
// becomes the favicon, src/app/apple-icon.png the iOS home-screen icon.
emit("src/app/icon.png", await icon(512));
emit("src/app/apple-icon.png", await icon(180));

// Referenced directly by the enterprise footer and the marketing sections,
// which render it at 48-64px inside a rounded container — 256 covers 4x DPR.
emit("public/cabinet-icon.png", await icon(256));

console.log("\nDone.");
