#!/usr/bin/env node
/**
 * Populates .template-registry/ (gitignored) with Cabinet's public template
 * library so the /templates routes can be statically generated.
 *
 * The template data lives in the public cabinetai/cabinets repo; we shallow
 * clone it once, drop its .git, and read it via src/lib/registry.ts. Idempotent:
 * if the directory already holds templates we skip, so local dev and CI only
 * fetch on a cold checkout. Override the source with CABINET_TEMPLATES_REPO.
 */
import { existsSync, readdirSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dir = resolve(root, ".template-registry");
const source =
  process.env.CABINET_TEMPLATES_REPO || "https://github.com/cabinetai/cabinets.git";

const hasTemplates =
  existsSync(dir) && readdirSync(dir).some((name) => !name.startsWith("."));

if (hasTemplates) {
  console.log("Template registry already present; skipping fetch.");
  process.exit(0);
}

console.log(`Fetching template registry from ${source} ...`);
const clone = spawnSync(
  "git",
  ["clone", "--depth=1", "--single-branch", source, dir],
  { stdio: "inherit" },
);
if (clone.status !== 0) {
  console.error("Failed to fetch the template registry.");
  process.exit(1);
}

// Drop the clone's history; registry.ts only reads the working files.
rmSync(resolve(dir, ".git"), { recursive: true, force: true });
console.log("Template registry ready.");
