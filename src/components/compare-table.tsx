import { Check, X, Minus } from "lucide-react";
import type { Cell, Row } from "@/lib/compare";

function CellIcon({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <>
        <Check className="mx-auto h-4 w-4 text-green" aria-hidden />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === "partial") {
    return (
      <>
        <Minus className="mx-auto h-4 w-4 text-accent-light" aria-hidden />
        <span className="sr-only">Partial</span>
      </>
    );
  }
  return (
    <>
      <X className="mx-auto h-4 w-4 text-text-muted" aria-hidden />
      <span className="sr-only">Not included</span>
    </>
  );
}

/**
 * Focused feature matrix for a head-to-head page. The Cabinet column is pinned
 * and tinted so the eye lands on it; rows where the competitor wins are kept on
 * purpose (see compare.ts), because a fair table is what makes the page credible.
 */
export function CompareTable({
  competitor,
  rows,
}: {
  competitor: string;
  rows: Row[];
}) {
  const hasNotes = rows.some((r) => r.note);
  return (
    <div className="overflow-hidden rounded-2xl bg-bg-card shadow-[0_8px_30px_-14px_rgba(150,108,68,0.32)] ring-1 ring-[rgba(59,47,47,0.05)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] text-sm">
          <thead>
            <tr className="border-b border-border-dark">
              <th
                scope="col"
                className="sticky left-0 bg-bg-card px-5 py-4 text-left font-medium text-text-secondary"
              >
                Feature
              </th>
              <th
                scope="col"
                className="w-28 bg-accent-bg-subtle px-4 py-4 text-center font-semibold text-accent"
              >
                Cabinet
              </th>
              <th
                scope="col"
                className="w-28 px-4 py-4 text-center font-medium text-text-tertiary"
              >
                {competitor}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.feature} className="border-b border-border-light last:border-0">
                <td className="sticky left-0 bg-bg-card px-5 py-3.5 text-text-primary">
                  <span className="font-body-serif">{r.feature}</span>
                  {r.note && (
                    <span className="mt-0.5 block font-code text-[11px] leading-snug text-text-tertiary">
                      {r.note}
                    </span>
                  )}
                </td>
                <td className="bg-accent-bg-subtle/60 px-4 py-3.5">
                  <CellIcon value={r.cabinet} />
                </td>
                <td className="px-4 py-3.5">
                  <CellIcon value={r.them} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-border-light px-5 py-3 font-code text-[11px] text-text-tertiary">
        <span className="inline-flex items-center gap-1.5">
          <Check className="h-3.5 w-3.5 text-green" aria-hidden /> Included
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Minus className="h-3.5 w-3.5 text-accent-light" aria-hidden /> Partial
        </span>
        <span className="inline-flex items-center gap-1.5">
          <X className="h-3.5 w-3.5 text-text-muted" aria-hidden /> Not included
        </span>
        {hasNotes && (
          <span className="ml-auto">Reflects public information as of May 2026.</span>
        )}
      </div>
    </div>
  );
}
