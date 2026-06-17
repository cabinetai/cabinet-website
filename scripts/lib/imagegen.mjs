/**
 * Shared Gemini image generation + magenta keying for Cabinet's brand images.
 *
 * Image models cannot reliably emit a real alpha channel (they paint a
 * checkerboard instead), so every image is generated on a solid magenta
 * background and keyed to true transparency here. Magenta never appears in the
 * warm palette, so the subject and its soft edges are preserved.
 */
import sharp from "sharp";
import { readFileSync } from "node:fs";

const MODELS = ["gemini-3-pro-image", "gemini-2.5-flash-image"];
const MODALITY_CONFIGS = [
  { responseModalities: ["IMAGE"] },
  { responseModalities: ["TEXT", "IMAGE"] },
  null,
];

function extractImage(json) {
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  for (const p of parts) {
    const inline = p.inlineData ?? p.inline_data;
    if (inline?.data) return inline;
  }
  return null;
}

/** Convert a magenta-background image buffer into a transparent RGBA PNG. */
export async function keyMagenta(buf) {
  const { data, info } = await sharp(buf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.from(data);
  const T0 = 90; // distance-to-magenta <= T0 => background (alpha 0)
  const T1 = 165; // distance-to-magenta >= T1 => fully opaque subject
  for (let i = 0; i < width * height; i++) {
    const o = i * channels;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    const d = Math.sqrt((r - 255) ** 2 + g * g + (b - 255) ** 2);
    let a;
    if (d <= T0) a = 0;
    else if (d >= T1) a = 255;
    else a = Math.round(((d - T0) / (T1 - T0)) * 255);
    out[o + 3] = a;
    if (a < 255) {
      // despill: remove the pink/magenta fringe (high r & b, low g) at edges
      const spill = Math.min(r, b);
      if (spill > g) {
        out[o] = Math.max(g, r - (spill - g));
        out[o + 2] = Math.max(g, b - (spill - g));
      }
    }
  }
  return sharp(out, { raw: { width, height, channels } })
    .png()
    .toBuffer();
}

/**
 * Generate an image for `prompt` and key out the magenta background.
 * Returns { png, model }. Throws with the last API error if nothing came back.
 *
 * opts.imagePath: optional reference image (image-to-image edit). The model
 * keeps what the prompt says to keep and changes the rest.
 */
export async function generateAndKey(prompt, key, opts = {}) {
  let last = "no response";
  const imagePaths = opts.imagePaths || (opts.imagePath ? [opts.imagePath] : []);
  const parts = [
    ...imagePaths.map((p) => ({
      inlineData: { mimeType: "image/png", data: readFileSync(p).toString("base64") },
    })),
    { text: prompt },
  ];
  for (const model of MODELS) {
    for (const genCfg of MODALITY_CONFIGS) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
      const body = {
        contents: [{ role: "user", parts }],
        ...(genCfg ? { generationConfig: genCfg } : {}),
      };
      let res;
      try {
        res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch (e) {
        last = `${model}: ${e.message}`;
        continue;
      }
      const text = await res.text();
      if (!res.ok) {
        last = `${model} HTTP ${res.status}: ${text.replace(/\s+/g, " ").slice(0, 160)}`;
        continue;
      }
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        last = `${model}: non-JSON response`;
        continue;
      }
      const img = extractImage(json);
      if (img) {
        return { png: await keyMagenta(Buffer.from(img.data, "base64")), model };
      }
      last = `${model}: no image part returned`;
    }
  }
  throw new Error(last);
}
