import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildTallyShareUrl } from "@/lib/waitlist";

export const metadata: Metadata = {
  title: "Cabinet Cloud Waitlist",
  description: "Redirecting to the Cabinet Cloud waitlist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WaitlistPage() {
  redirect(buildTallyShareUrl("waitlist-link", "/waitlist"));
}
