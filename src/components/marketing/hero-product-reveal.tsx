import type { Locale } from "@/lib/i18n";
import { LivingCabinet } from "./living-cabinet";

export function HeroProductReveal({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className="relative">
      <LivingCabinet locale={locale} />
    </div>
  );
}
