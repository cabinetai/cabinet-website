# Brand mark

`cabinet-mark.png` is the source for every icon this site serves. Run
`node scripts/generate-icons.mjs` after changing it — don't hand-place icon
files. It writes `src/app/icon.png` (favicon), `src/app/apple-icon.png` and
`public/cabinet-icon.png`.

## Provenance

Brand "Family A" — the 3D wooden cabinet, two-drawer face. This is the artwork
that had been serving as `src/app/icon.png` all along; it is promoted to master
here rather than replaced.

Note that the 2026-07-31 brand audit lists this file under "Family C — flat
brown smiley" (by hash, `2842d8c4`). That is a misclassification: the favicon
was already Family A. `public/cabinet-icon.png` (`25c44d97`) *is* Family C, and
that one was genuinely replaced.

The master is already composed as a square icon with its own padding, so the
generator only resizes — no trim-and-recentre, which would reframe a mark that
is already framed correctly.

## Known limitation: small sizes

There is **no vector master** — this is a raster render at 512×512, so that is
the ceiling and there is no source to recolour or print from.

The two-drawer face carries two smileys, which split the available pixels at
small sizes: at 16px the mark reads as a wooden blob and at 32px the smileys
are faint. This is the artwork that has always shipped, so it is not a
regression, but the small slots are weak. An icon-grade redraw — a single
larger smiley, flattened toward orthographic, thicker stroke — would fix both
this and the missing vector master. That is item 1 of the alignment plan.
