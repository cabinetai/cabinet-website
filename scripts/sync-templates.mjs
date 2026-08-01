#!/usr/bin/env node

import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const registry = resolve(root, ".template-registry");

if (existsSync(registry)) {
  console.log("Template registry already available.");
  process.exit(0);
}

console.log("Fetching the public Cabinet template registry.");
const result = spawnSync(
  "git",
  ["clone", "--depth=1", "https://github.com/cabinetai/cabinets.git", registry],
  { cwd: root, stdio: "inherit" },
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
