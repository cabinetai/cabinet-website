#!/usr/bin/env node
/**
 * Makes brand-explorations/ browsable in the local /styleguide.
 *
 * The archive is 69 rejected logo and illustration studies (16 MB). It used to
 * live in public/generated/_explore/, which meant it shipped to the production
 * CDN. It now lives at the repo root, and this symlinks it back into public/
 * for local dev only — the link is gitignored, so a fresh CI clone never has
 * it and the export stays clean.
 *
 * Runs automatically via `predev`. The `--unlink` form runs via `prebuild`:
 * `next build` follows the symlink and would copy all 69 files into out/,
 * which is the exact leak this is meant to prevent. CI never has the link, but
 * a local build right after `npm run dev` would otherwise republish them.
 *
 * Safe to re-run in either direction.
 */
import { existsSync, lstatSync, mkdirSync, symlinkSync, unlinkSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const target = resolve(root, "brand-explorations");
const link = resolve(root, "public/generated/_explore");
const unlinkOnly = process.argv.includes("--unlink");

if (!unlinkOnly && !existsSync(target)) {
  console.error(`No ${target} — nothing to link.`);
  process.exit(0);
}

if (existsSync(link) || lstatSync(link, { throwIfNoEntry: false })) {
  // Only ever replace a symlink. If someone has a real directory here it holds
  // files that aren't in the archive, and silently deleting them would lose
  // work — the generators still write to this path by default.
  if (!lstatSync(link).isSymbolicLink()) {
    console.error(
      `${link} is a real directory, not a symlink. Move its contents into ` +
        `brand-explorations/ and delete it, then re-run.`,
    );
    process.exit(1);
  }
  unlinkSync(link);
  if (unlinkOnly) {
    console.log("Unlinked public/generated/_explore (keeping it out of the export)");
  }
}

if (unlinkOnly) {
  process.exit(0);
}

mkdirSync(dirname(link), { recursive: true });
symlinkSync(target, link, "dir");
console.log("Linked public/generated/_explore -> brand-explorations (dev only)");
