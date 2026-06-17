#!/usr/bin/env node
/**
 * Remove a baked-in checkerboard / flat neutral background from a PNG and
 * write real transparency, trimmed to the subject.
 *
 *   node scripts/cutout-checker.mjs <input.png> <output.png>
 *
 * Strategy: flood-fill from the borders over near-neutral, light pixels (the
 * white/grey checker), so the subject's interior light/neutral areas (white
 * icons, cream gems) are preserved because they are not connected to the edge.
 * A 1px dilation eats the anti-aliased halo, then we trim to the subject.
 */
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const [inPath, outPath] = process.argv.slice(2);
if (!inPath || !outPath) {
  console.error("usage: node scripts/cutout-checker.mjs <input.png> <output.png>");
  process.exit(1);
}

const { data, info } = await sharp(inPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width;
const H = info.height;
const ch = info.channels;
const idx = (x, y) => (y * W + x) * ch;

// near-neutral (low chroma) and light => checker background
const isBg = (o, chroma, valMin) => {
  const r = data[o];
  const g = data[o + 1];
  const b = data[o + 2];
  const mx = Math.max(r, g, b);
  const mn = Math.min(r, g, b);
  return mx - mn <= chroma && mx >= valMin;
};

const remove = new Uint8Array(W * H);
const stack = [];
const seed = (x, y) => {
  if (isBg(idx(x, y), 16, 185)) {
    const p = y * W + x;
    if (!remove[p]) {
      remove[p] = 1;
      stack.push(p);
    }
  }
};
for (let x = 0; x < W; x++) {
  seed(x, 0);
  seed(x, H - 1);
}
for (let y = 0; y < H; y++) {
  seed(0, y);
  seed(W - 1, y);
}
while (stack.length) {
  const p = stack.pop();
  const x = p % W;
  const y = (p / W) | 0;
  const nbrs = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];
  for (const [nx, ny] of nbrs) {
    if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
    const np = ny * W + nx;
    if (remove[np]) continue;
    if (isBg(idx(nx, ny), 16, 185)) {
      remove[np] = 1;
      stack.push(np);
    }
  }
}

// dilate 1px into the anti-aliased halo (neutral-ish light pixels touching bg)
const dil = remove.slice();
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x;
    if (remove[p]) continue;
    let adj = false;
    for (const [nx, ny] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      if (remove[ny * W + nx]) {
        adj = true;
        break;
      }
    }
    if (adj && isBg(idx(x, y), 28, 165)) dil[p] = 1;
  }
}

// apply alpha + compute opaque bounding box
let minX = W, minY = H, maxX = 0, maxY = 0;
for (let p = 0; p < W * H; p++) {
  if (dil[p]) {
    data[p * ch + 3] = 0;
  } else {
    const x = p % W;
    const y = (p / W) | 0;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
}

const pad = 12;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(W - 1, maxX + pad);
maxY = Math.min(H - 1, maxY + pad);
const cw = maxX - minX + 1;
const cH = maxY - minY + 1;

const full = await sharp(data, { raw: { width: W, height: H, channels: ch } }).png().toBuffer();
const out = await sharp(full).extract({ left: minX, top: minY, width: cw, height: cH }).png().toBuffer();
writeFileSync(outPath, out);
console.log(`wrote ${outPath} (${cw}x${cH}, ${(out.length / 1024).toFixed(0)} KB)`);
