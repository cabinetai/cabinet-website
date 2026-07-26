import type { ReactNode } from "react";

type SectionBadgeProps = {
  n: string;
  title: string;
  origin: string;
  children: ReactNode;
};

// ponytail: numbered dev badges removed from display; n/title/origin stay in
// page.tsx as section annotations.
export function SectionBadge({ children }: SectionBadgeProps) {
  return children;
}
