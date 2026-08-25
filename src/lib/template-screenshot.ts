import fs from "fs";
import path from "path";

type ScreenshotCandidate = {
  relativePath: string;
  filePath: string;
};

/**
 * The single screenshot lookup used by template cards and detail pages.
 * Fresh app captures take precedence; the registry's original JPG captures
 * remain a supported fallback without requiring duplicate assets.
 */
export function getTemplateScreenshot(slug: string): string | undefined {
  const candidates: ScreenshotCandidate[] = [
    {
      relativePath: `/screenshots/apps/${slug}.webp`,
      filePath: path.join(process.cwd(), "public", "screenshots", "apps", `${slug}.webp`),
    },
    {
      relativePath: `/screenshots/${slug}.jpg`,
      filePath: path.join(process.cwd(), "public", "screenshots", `${slug}.jpg`),
    },
    {
      relativePath: `/screenshots/${slug}.jpeg`,
      filePath: path.join(process.cwd(), "public", "screenshots", `${slug}.jpeg`),
    },
  ];

  return candidates.find((candidate) => fs.existsSync(candidate.filePath))?.relativePath;
}
