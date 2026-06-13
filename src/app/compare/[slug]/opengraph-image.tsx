import { ImageResponse } from "next/og";
import {
  COMPARISONS,
  ROUNDUPS,
  THREEWAYS,
  MIGRATIONS,
  compareLabel,
} from "@/lib/compare";

export const dynamic = "force-static";
export const alt = "Cabinet comparison";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return [...COMPARISONS, ...ROUNDUPS, ...THREEWAYS, ...MIGRATIONS].map((x) => ({
    slug: x.slug,
  }));
}

function oneLinerFor(slug: string): string {
  const rec = [...COMPARISONS, ...ROUNDUPS, ...THREEWAYS, ...MIGRATIONS].find(
    (x) => x.slug === slug,
  );
  return rec?.oneLiner ?? "Own your knowledge. Keep your AI.";
}

// Build-time branded OG card on the Cabinet parchment palette. One per compare
// slug, generated statically (no runtime), so it works under `output: export`.
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const headline = compareLabel(slug);
  const subtitle = oneLinerFor(slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF6F1",
          padding: "76px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#8B5E3C",
              letterSpacing: "-0.02em",
            }}
          >
            Cabinet
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "8px",
              color: "#A89888",
            }}
          >
            COMPARE
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              color: "#3B2F2F",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              maxWidth: 1010,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#6B5B4F",
              marginTop: 26,
              maxWidth: 980,
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#8B5E3C" }}>
          Open source · self-hosted · bring your own AI
        </div>
      </div>
    ),
    { ...size },
  );
}
