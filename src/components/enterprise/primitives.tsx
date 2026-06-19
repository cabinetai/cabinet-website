import { ArrowRight, Check } from "lucide-react";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { WoodIcon } from "@/components/wood-icon";

/* ──────────────────────────────────────────────────────────────
   Enterprise primitives — shared across all /enterprise/* pages
   Light, professional, restrained. Inter for UI, Instrument
   Serif for display, JetBrains Mono ONLY for code/data.
   ────────────────────────────────────────────────────────────── */

export function Eyebrow({
  children,
  muted = false,
  className = "",
}: {
  children: ReactNode;
  muted?: boolean;
  className?: string;
}) {
  return (
    <span className={`${muted ? "ent-eyebrow-muted" : "ent-eyebrow"} ${className}`}>
      {children}
    </span>
  );
}

export function Pill({
  children,
  tone = "accent",
  className = "",
  icon: Icon,
}: {
  children: ReactNode;
  tone?: "accent" | "sage" | "neutral";
  className?: string;
  icon?: ElementType;
}) {
  const klass =
    tone === "sage"
      ? "ent-pill ent-pill-sage"
      : tone === "neutral"
      ? "ent-pill ent-pill-neutral"
      : "ent-pill";
  return (
    <span className={`${klass} ${className}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
}

export function Section({
  id,
  tone = "default",
  className = "",
  children,
}: {
  id?: string;
  tone?: "default" | "warm" | "wash";
  className?: string;
  children: ReactNode;
}) {
  const bg =
    tone === "warm" ? "bg-bg-warm" : tone === "wash" ? "ent-wash" : "bg-bg";
  return (
    <section id={id} className={`relative ${bg} py-20 md:py-28 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  kicker,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  kicker?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${
        align === "center" ? "text-center mx-auto" : ""
      } max-w-3xl mb-12 md:mb-14 ${className}`}
    >
      {eyebrow && (
        <p className="mb-4">
          <Eyebrow>{eyebrow}</Eyebrow>
        </p>
      )}
      <h2 className="ent-display-2">{title}</h2>
      {kicker && <p className="ent-lead mt-5">{kicker}</p>}
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
  className = "",
  ...rest
}: {
  href?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children">) {
  if (href) {
    return (
      <a href={href} className={`ent-btn-primary group ${className}`} {...rest}>
        {children}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </a>
    );
  }
  return (
    <button type="submit" className={`ent-btn-primary group ${className}`}>
      {children}
      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
    </button>
  );
}

export function SecondaryButton({
  href,
  children,
  icon: Icon,
  className = "",
}: {
  href: string;
  children: ReactNode;
  icon?: ElementType;
  className?: string;
}) {
  return (
    <a href={href} className={`ent-btn-secondary ${className}`}>
      {Icon && <Icon className="w-4 h-4 text-accent" />}
      {children}
    </a>
  );
}

export function StatCard({
  stat,
  label,
  detail,
  icon: Icon,
}: {
  stat: string;
  label: string;
  detail?: string;
  icon?: ElementType;
}) {
  return (
    <div className="ent-card ent-card-hover p-6 md:p-7">
      <div className="flex items-start justify-between gap-4 mb-4">
        <p className="font-display text-5xl md:text-[3.5rem] leading-none text-accent">
          {stat}
        </p>
        {Icon && (
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0">
            <WoodIcon icon={Icon} className="h-8 w-8" />
          </div>
        )}
      </div>
      <p className="text-[15px] font-semibold text-text-primary leading-snug">
        {label}
      </p>
      {detail && (
        <p className="text-sm text-text-secondary mt-2 leading-relaxed font-body-serif">
          {detail}
        </p>
      )}
    </div>
  );
}

export function FeatureCard({
  icon: Icon,
  title,
  body,
  className = "",
}: {
  icon: ElementType;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <div className={`ent-card ent-card-hover p-6 ${className}`}>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4">
        <WoodIcon icon={Icon} className="h-9 w-9" />
      </div>
      <h3 className="ent-display-3 mb-2">{title}</h3>
      <p className="text-[15px] text-text-secondary leading-relaxed font-body-serif">
        {body}
      </p>
    </div>
  );
}

export function CheckList({
  items,
  tight = false,
}: {
  items: string[];
  tight?: boolean;
}) {
  return (
    <ul className={`${tight ? "space-y-2" : "space-y-3"}`}>
      {items.map((it) => (
        <li
          key={it}
          className="flex items-start gap-2.5 text-[15px] text-text-secondary leading-relaxed font-body-serif"
        >
          <span className="mt-1 shrink-0 w-4 h-4 rounded-full bg-green-bg-subtle border border-green-bg flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-green-warm" strokeWidth={3} />
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function CalloutCard({
  eyebrow,
  title,
  body,
  cta,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  cta?: { label: string; href: string };
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent-bg-subtle via-bg-card to-bg-card p-8 md:p-10">
      <div
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 94, 60, 0.5), transparent 70%)",
        }}
      />
      <div className="relative">
        {eyebrow && (
          <p className="mb-3">
            <Eyebrow>{eyebrow}</Eyebrow>
          </p>
        )}
        <h3 className="ent-display-3 mb-3 max-w-2xl">{title}</h3>
        <p className="ent-lead max-w-2xl">{body}</p>
        {cta && (
          <a
            href={cta.href}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-warm transition-colors"
          >
            {cta.label}
            <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
