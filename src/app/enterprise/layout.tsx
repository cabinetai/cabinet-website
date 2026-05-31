import type { Metadata } from "next";
import { EnterpriseNav } from "@/components/enterprise/nav";
import { EnterpriseFooter } from "@/components/enterprise/footer";

export const metadata: Metadata = {
  title: "Cabinet for Enterprise: The substrate for strategy execution",
  description:
    "An open-source operating system for the office of the CEO. Every manager gets a Chief of Staff. Every leader gets a Coach. Your strategy lives as files you own, not a SaaS contract you renew.",
  openGraph: {
    title: "Cabinet for Enterprise: The substrate for strategy execution",
    description:
      "Open-source · file-based · self-hosted. Built for the office of the CEO.",
    type: "website",
    url: "https://runcabinet.com/enterprise",
  },
};

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EnterpriseNav />
      <main className="min-h-[50vh] bg-bg">{children}</main>
      <EnterpriseFooter />
    </>
  );
}
