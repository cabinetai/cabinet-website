"use client";

import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

// Client components read the page locale with useLocale(). Server components
// can't read context, so they take a `locale` prop instead.
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
