# Brand explorations archive

Rejected and superseded logo / illustration studies. Kept for reference —
nothing here is a shipping asset.

These lived in `public/generated/_explore/` until 2026-08-01, which meant 16 MB
of exploration artefacts were served from the production CDN. They moved here
so they stay in version control without being publicly reachable.

## Browsing them

`npm run dev` symlinks this directory back into `public/generated/_explore`
(via the `predev` script, `scripts/link-explorations.mjs`) and the
**Explorations archive** section of `/styleguide` lists them as before. The
symlink is gitignored, so a fresh CI clone never has it and the production
export stays clean.

`/styleguide` itself is dev-only — it returns 404 in a production build.

## Regenerating

Each file name is its generator id:

```sh
node scripts/generate-images.mjs <id>
node scripts/explore-styles.mjs <subject>
node scripts/brand-states.mjs
```

Those generators write to `public/generated/_explore/`. With the dev symlink in
place that resolves here, so new output lands in the archive automatically.
