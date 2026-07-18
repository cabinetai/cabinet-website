import type { Metadata } from "next";
import { FontPicker } from "./picker";

export const metadata: Metadata = {
  title: "Font picker",
  description: "Internal tool: spin the reels to pick the display and body typefaces.",
  robots: { index: false, follow: false },
};

export default function FontPickerPage() {
  return <FontPicker />;
}
