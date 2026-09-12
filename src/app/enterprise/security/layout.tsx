import type { Metadata } from "next";

const title = "Cabinet Security: Hosting, Data and Access Controls";
const description =
  "Review Cabinet's hosting options, data flows and access controls. Use the security overview to evaluate deployment requirements for your team.";
const url = "https://runcabinet.com/enterprise/security";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    type: "website",
    url,
    images: [
      {
        url: "https://runcabinet.com/og.png",
        width: 1200,
        height: 630,
        alt: "Cabinet AI workspace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://runcabinet.com/og.png"],
  },
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
