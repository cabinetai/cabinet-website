import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Cabinet Cloud Wishlist",
  description: "Redirecting to the Cabinet Cloud waitlist.",
  robots: {
    index: false,
    follow: false,
  },
};

// Inbound /wishlist links go to the same self-hosted waitlist form on /cloud.
export default function WishlistPage() {
  redirect("/cloud?source=wishlist-link#join-waitlist");
}
