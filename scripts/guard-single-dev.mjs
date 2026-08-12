#!/usr/bin/env node
/**
 * Refuses to start a second dev server.
 *
 * Two `next dev` instances share .next/dev, and Turbopack's persistent cache
 * is single-writer. The second one corrupts it:
 *
 *   Persisting failed: Unable to open static sorted file 00000006.sst
 *   ⨯ ENOENT: .next/dev/server/app/page/build-manifest.json
 *
 * after which every route 500s until you `rm -rf .next`. Two copies of this
 * site's module graph is also ~2.4 GB resident, which OOMs an 8 GB machine.
 */
import { createServer } from "node:net";

// ponytail: port probe, not a process scan. Catches `npm run dev` twice (both
// default to 3000), which is the way this actually happens. A deliberate
// second instance on another port still shares .next/dev and still corrupts
// it — switch to a pid lockfile if that ever stops being a theoretical case.
const port = Number(process.env.PORT) || 3000;

const probe = createServer();
probe.once("error", (err) => {
  if (err.code !== "EADDRINUSE") throw err;
  console.error(`\nPort ${port} is already serving. A dev server is running.`);
  console.error(`Use that one, or stop it first:  pkill -f "next dev"\n`);
  process.exit(1);
});
probe.once("listening", () => probe.close());
probe.listen(port);
