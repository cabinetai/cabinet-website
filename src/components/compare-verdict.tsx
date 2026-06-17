import { Check } from "lucide-react";
import type { Verdict } from "@/lib/compare";

/**
 * The single highest-leverage element on a comparison page: a fair, side-by-side
 * "choose us if / choose them if" so a busy executive gets the answer in the
 * first screen, and reads the page as honest rather than a sales pitch.
 */
export function CompareVerdict({
  competitor,
  verdict,
}: {
  competitor: string;
  verdict: Verdict;
}) {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl bg-border shadow-[0_10px_34px_-16px_rgba(150,108,68,0.34)] ring-1 ring-[rgba(59,47,47,0.06)] md:grid-cols-2">
      <div className="bg-bg-card p-6 sm:p-7">
        <p className="ent-eyebrow mb-4">Choose Cabinet if</p>
        <ul className="space-y-3">
          {verdict.chooseUs.map((point) => (
            <li key={point} className="flex gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden />
              <span className="font-body-serif text-sm leading-relaxed text-text-secondary">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-bg-warm p-6 sm:p-7">
        <p className="ent-eyebrow-muted mb-4">Stick with {competitor} if</p>
        <ul className="space-y-3">
          {verdict.chooseThem.map((point) => (
            <li key={point} className="flex gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-text-tertiary" aria-hidden />
              <span className="font-body-serif text-sm leading-relaxed text-text-secondary">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
