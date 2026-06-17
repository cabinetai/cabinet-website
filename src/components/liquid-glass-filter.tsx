/**
 * Site-wide SVG filter that powers the liquid-glass refraction.
 *
 * Referenced from CSS via `backdrop-filter: url(#liquid-glass-filter)` on the
 * `.liquid-glass__refract` layer. feTurbulence builds a smooth noise field and
 * feDisplacementMap uses it to bend the backdrop (the page content scrolling
 * beneath the glass), giving real glass distortion rather than a flat blur.
 *
 * Rendered once in the root layout so every navbar can reference the same id.
 */
export function LiquidGlassFilter() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <filter
          id="liquid-glass-filter"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.013"
            numOctaves={2}
            seed={9}
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation={0.8} result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale={18}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
