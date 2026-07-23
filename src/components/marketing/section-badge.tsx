import type { ReactNode } from "react";

type SectionBadgeProps = {
  n: string;
  title: string;
  origin: string;
  children: ReactNode;
};

export function SectionBadge({ n, title, origin, children }: SectionBadgeProps) {
  return (
    <div className="relative">
      <div className="pointer-events-none sticky top-24 z-30 h-0 overflow-visible">
        <span
          className="pointer-events-auto ml-4 grid h-9 w-9 place-items-center rounded-full bg-text-primary font-code text-xs font-bold text-bg-card shadow-lg ring-2 ring-bg sm:h-10 sm:w-10"
          title={`${n} · ${title} · ${origin}`}
        >
          {n}
        </span>
      </div>
      {children}
    </div>
  );
}
