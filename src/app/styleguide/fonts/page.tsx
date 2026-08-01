import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FontPicker } from "./picker";

export const metadata: Metadata = {
  title: "Font picker",
  description: "Internal tool: spin the reels to pick the display and body typefaces.",
  robots: { index: false, follow: false },
};

export default function FontPickerPage() {
  // Dev-only, same as the styleguide it hangs off.
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <FontPicker />;
}
