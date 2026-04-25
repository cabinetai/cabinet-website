import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Cabinet Cloud Waitlist",
  description: "Redirecting to the Cabinet Cloud waitlist.",
  robots: {
    index: false,
    follow: false,
  },
};

// Inbound /waitlist links (e.g. shared on Discord) drop the visitor on the
// /cloud page where the inline waitlist form lives.
export default function WaitlistPage() {
  redirect("/cloud?source=waitlist-link#join-waitlist");
}
