#!/usr/bin/env node
/**
 * Style exploration: render one or more subjects across many candidate art
 * directions so we can compare and pick a house style. Outputs transparent PNGs
 * to public/generated/_explore/<subject>-<style>.png.
 *
 *   GOOGLE_AI_API_KEY=xxx node scripts/explore-styles.mjs            # all subjects
 *   GOOGLE_AI_API_KEY=xxx node scripts/explore-styles.mjs cabinet    # one subject
 *
 * Style descriptions are color-neutral (material / technique only); each
 * subject carries its own warm palette. Throwaway comparison surface, see
 * public/generated/_explore/index.html.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { generateAndKey } from "./lib/imagegen.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "..", "public/generated/_explore");

const KEY = process.env.GOOGLE_AI_API_KEY;
if (!KEY) {
  console.error("Missing GOOGLE_AI_API_KEY in the environment.");
  process.exit(1);
}

// Each subject carries its own palette + content; only the STYLE (material /
// technique) varies between renders.
const SUBJECTS = {
  cabinet:
    "An iconic, distilled symbol for an AI-first knowledge base you own: one " +
    "refined, elegant multi-drawer cabinet reimagined as a knowledge vault, in " +
    "rich warm BROWN tones (walnut, chestnut, caramel and cream) with subtle " +
    "brass or gold accents. The TOP drawer is open and neatly filled with a " +
    "variety of clearly DIFFERENT FILE TYPES shown as small tabbed cards and " +
    "sheets (a document page, a PDF, a spreadsheet/table, an image/photo card, " +
    "a code sheet), softly glowing and distinguished only by their shapes and " +
    "tiny simple iconographic symbols (absolutely no readable words or " +
    "letters). A SECOND, lower drawer is also open and holds the AI AGENTS, " +
    "shown only as a tidy row of small glowing abstract orbs / geometric " +
    "tokens (no faces, no characters). Show the whole cabinet within the frame " +
    "with a small margin, not cropped. One big centered subject, minimal and " +
    "prestigious.",
  "cabinet-light":
    "An iconic, distilled symbol for an AI-first knowledge base you own: one " +
    "refined, elegant multi-drawer cabinet reimagined as a knowledge vault, " +
    "made of LIGHT pale blonde WOOD (birch / maple / pale oak, light natural " +
    "tan and cream) with subtle brass accents. The TOP drawer is open and " +
    "neatly filled with a variety of clearly DIFFERENT FILE TYPES shown as " +
    "small tabbed cards and sheets (a document, a PDF, a spreadsheet/table, an " +
    "image/photo card, a code sheet), each one a DIFFERENT CHEERFUL COLOR " +
    "(coral red, orange, amber yellow, green, teal, blue), softly glowing and " +
    "distinguished by shapes and tiny simple iconographic symbols (absolutely " +
    "no readable words or letters). A SECOND, lower drawer is also open and " +
    "holds the AI AGENTS, shown only as a tidy row of small glowing abstract " +
    "orbs / geometric tokens (no faces, no characters). Show the whole cabinet " +
    "within the frame with a small margin, not cropped. One big centered " +
    "subject, minimal and prestigious.",
  sales:
    "An iconic, distilled symbol for an AI-augmented sales function, in warm " +
    "amber, terracotta, coral and gold tones: one elegant upward-sweeping form " +
    "(a refined sales pipeline or rising arrow) that suggests deals advancing " +
    "on their own, with a single subtle glint of light to imply a quiet AI " +
    "agent (no faces, no characters). Show the whole subject within the frame " +
    "with a small margin, not cropped. One big centered subject, minimal and " +
    "prestigious.",
};

// Transparency contract shared by every render.
const SUFFIX =
  " Color: keep the overall mood warm; small colorful accents are allowed " +
  "where the subject calls for them. Do NOT use pink, purple or magenta " +
  "anywhere in the SUBJECT (those hues are reserved for the background key). " +
  "NO readable text or letters, NO UI screenshots, NO contact shadow, NO " +
  "floor, NO studio backdrop, NO frame, NO border, NO plate or card behind " +
  "the subject. The single subject is placed directly on a COMPLETELY SOLID, " +
  "FLAT, UNIFORM, FULL-BLEED bright magenta background, pure #FF00FF, covering " +
  "every pixel edge to edge, with no checkerboard, no gradient, no vignette, " +
  "and no other color anywhere in the background. Square composition, high detail.";

// Rendered / material art directions (color-neutral). Kept favorites (01, 02,
// 03, 05) plus new material-led options.
const STYLES = {
  "01-matte-3d":
    "Style: refined matte 3D, premium product-render finish, soft tactile " +
    "matte materials (not glossy, not cartoonish), soft cinematic top-left " +
    "light with gentle ambient occlusion.",
  "02-frosted-glass":
    "Style: frosted translucent glass 3D object (liquid-glass aesthetic), soft " +
    "internal refraction, crisp specular highlights, premium and modern.",
  "03-gradient-3d":
    "Style: smooth soft-gradient 3D form, gently glossy, clean, minimal and " +
    "modern, elegant.",
  "05-paper-craft":
    "Style: layered cut-paper craft, built from layers of warm matte paper " +
    "with clean edges and soft layered shadows, tactile and sophisticated.",
  "11-wood-brass":
    "Style: photoreal premium 3D of fine walnut WOOD with visible grain and " +
    "polished BRASS fittings, warm studio light, luxury furniture render.",
  "12-leather-brass":
    "Style: premium 3D in stitched cognac LEATHER with brass hardware, " +
    "executive and tactile, soft studio light.",
  "13-ceramic-matte":
    "Style: matte CERAMIC / porcelain 3D, smooth soft-touch surface, gentle " +
    "soft light, refined and calm.",
  "14-soft-clay":
    "Style: refined soft clay 3D (claymorphism), smooth rounded matte clay, " +
    "gentle soft shadows, tidy and premium (not childish).",
  "15-glass-gold":
    "Style: frosted glass 3D with polished GOLD trim and edges, soft " +
    "refraction, luxe and modern.",
  "16-puffy-3d":
    "Style: soft puffy inflated 3D (puffy 3D-sticker look), rounded cushioned " +
    "forms, soft highlights, playful-premium.",
  "17-isometric-3d":
    "Style: clean isometric soft 3D illustration, precise geometry, soft " +
    "studio light, tidy and modern.",
  "18-bronze-marble":
    "Style: luxe 3D combining warm BRONZE metal and cream MARBLE, soft " +
    "reflective sheen, prestigious.",
};

async function main() {
  mkdirSync(OUT, { recursive: true });
  const want = process.argv.slice(2);
  const subjects = want.length
    ? Object.entries(SUBJECTS).filter(([k]) => want.includes(k))
    : Object.entries(SUBJECTS);
  if (!subjects.length) {
    console.error(`Unknown subject. Known: ${Object.keys(SUBJECTS).join(", ")}`);
    process.exit(1);
  }
  // Optional STYLES=02,03 env var limits which style keys (by prefix) to render.
  const styleFilter = (process.env.STYLES || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const styles = styleFilter.length
    ? Object.entries(STYLES).filter(([k]) => styleFilter.some((f) => k.startsWith(f)))
    : Object.entries(STYLES);
  for (const [subject, subjectText] of subjects) {
    for (const [name, style] of styles) {
      process.stdout.write(`${subject} / ${name} ... `);
      try {
        const { png, model } = await generateAndKey(`${subjectText} ${style}${SUFFIX}`, KEY);
        writeFileSync(resolve(OUT, `${subject}-${name}.png`), png);
        console.log(`OK (${model}, ${(png.length / 1024).toFixed(0)} KB)`);
      } catch (e) {
        console.log(`FAILED: ${e.message}`);
      }
    }
  }
  console.log("\nWrote variations to public/generated/_explore/");
}

main();
