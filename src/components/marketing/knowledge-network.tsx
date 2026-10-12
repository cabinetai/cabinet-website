import Image from "next/image";
import { Check, Folder, Link2 } from "lucide-react";
import { MotionReveal } from "./motion-primitives";
import { ScatteredIntegrationsFrame } from "./scattered-integrations";
import type { Locale } from "@/lib/i18n";

type Text = Record<Locale, string>;

const DIRECTORY_ITEMS: Array<{
  id: string;
  name: Text;
  note: Text;
  src: string;
  kind: "connected" | "local";
  status: Text;
}> = [
  {
    id: "google-drive",
    name: { en: "Google Drive", hi: "Google Drive" },
    note: { en: "Company docs and campaign folders", hi: "कंपनी के दस्तावेज़ और कैंपेन फ़ोल्डर" },
    src: "/logos/google-drive.svg",
    kind: "connected",
    status: { en: "Connected folder", hi: "कनेक्टेड फ़ोल्डर" },
  },
  {
    id: "sharepoint",
    name: { en: "SharePoint", hi: "SharePoint" },
    note: { en: "Policies, projects, and team sites", hi: "पॉलिसी, प्रोजेक्ट और टीम साइट्स" },
    src: "/logos/sharepoint.svg",
    kind: "connected",
    status: { en: "Connected folder", hi: "कनेक्टेड फ़ोल्डर" },
  },
  {
    id: "office",
    name: { en: "Office files", hi: "Office फ़ाइलें" },
    note: {
      en: "FY27 Plan.docx  ·  Forecast.xlsx  ·  Board.pptx",
      hi: "FY27 Plan.docx  ·  Forecast.xlsx  ·  Board.pptx",
    },
    src: "/logos/microsoft-365.svg",
    kind: "local",
    status: { en: "Local files", hi: "लोकल फ़ाइलें" },
  },
  {
    id: "notion",
    name: { en: "Notion", hi: "Notion" },
    note: { en: "Team wiki and operating documents", hi: "टीम विकी और ऑपरेटिंग दस्तावेज़" },
    src: "/logos/notion.svg",
    kind: "connected",
    status: { en: "Connected space", hi: "कनेक्टेड स्पेस" },
  },
  {
    id: "onedrive",
    name: { en: "OneDrive", hi: "OneDrive" },
    note: { en: "Finance, sales, and customer folders", hi: "फ़ाइनेंस, सेल्स और ग्राहकों के फ़ोल्डर" },
    src: "/logos/onedrive.svg",
    kind: "connected",
    status: { en: "Connected folder", hi: "कनेक्टेड फ़ोल्डर" },
  },
];

const BENEFITS: Array<{ image: string; title: Text; body: Text }> = [
  {
    image: "/brand/ui/brain.png",
    title: { en: "One search surface", hi: "खोज के लिए एक ही जगह" },
    body: {
      en: "Find context across the connected company structure.",
      hi: "कंपनी के हर जुड़े हुए सोर्स में ज़रूरी संदर्भ ढूंढें।",
    },
  },
  {
    image: "/brand/ui/team.png",
    title: { en: "One shared view", hi: "सबके लिए एक ही व्यू" },
    body: {
      en: "People and AI teams work from the same navigable source.",
      hi: "लोग और AI टीमें एक ही व्यवस्थित सोर्स से काम करती हैं।",
    },
  },
  {
    image: "/brand/ui/document.png",
    title: { en: "Results stay useful", hi: "नतीजे काम के बने रहते हैं" },
    body: {
      en: "New work returns beside its sources with history intact.",
      hi: "नया काम अपने सोर्स के पास ही लौटता है, पूरी हिस्ट्री के साथ।",
    },
  },
];

const COPY = {
  en: {
    label: "Integrations",
    heading: "Connect to everything that runs your company.",
    body: "Your company runs on dozens of tools. Cabinet brings the work scattered across them into one place you own, where your team and its agents can find it, act on it, and keep it moving.",
    cabinetName: "Company Cabinet",
    cabinetSubtitle: "one visible company directory",
    sourcesConnected: "Sources connected",
    breadcrumb: "Company Cabinet /",
    sideBySide: "Cloud and local sources, side by side",
    noteLead: "Cabinet keeps the structure.",
    noteBody: "AI results, decisions, and live views return to the directory your company owns.",
  },
  hi: {
    label: "इंटीग्रेशन",
    heading: "आपकी कंपनी जिन टूल्स पर चलती है, उन सबसे जुड़ें।",
    body: "आपकी कंपनी दर्जनों टूल्स पर चलती है। Cabinet उनमें बिखरे काम को एक ऐसी जगह ले आता है जो पूरी तरह आपकी है। वहां आपकी टीम और उसके एजेंट उसे ढूंढ सकते हैं, उस पर काम कर सकते हैं और उसे आगे बढ़ाते रह सकते हैं।",
    cabinetName: "कंपनी Cabinet",
    cabinetSubtitle: "पूरी कंपनी की एक डायरेक्टरी",
    sourcesConnected: "सोर्स कनेक्टेड",
    breadcrumb: "कंपनी Cabinet /",
    sideBySide: "क्लाउड और लोकल सोर्स, साथ-साथ",
    noteLead: "ढांचा Cabinet संभालता है।",
    noteBody: "AI के नतीजे, फ़ैसले और लाइव व्यू उसी डायरेक्टरी में लौटते हैं जो आपकी कंपनी की अपनी है।",
  },
} satisfies Record<Locale, Record<string, string>>;

export function KnowledgeNetwork({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale];
  return (
    <section
      id="knowledge"
      className="home-snap-section home-viewport-section scroll-mt-24 px-5 sm:px-6 lg:px-8"
    >
      <ScatteredIntegrationsFrame>
      <div className="mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <MotionReveal variant="left">
          <p className="section-label">{t.label}</p>
          <h2 className="mt-5 max-w-[13ch] font-section text-[clamp(2.25rem,3.6vw,3.6rem)] leading-[1.02] text-text-primary">
            {t.heading}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            {t.body}
          </p>

          <div className="mt-8 space-y-3">
            {BENEFITS.map((benefit) => (
              <div key={benefit.image} className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-bg-subtle">
                  <Image
                    src={benefit.image}
                    alt=""
                    width={48}
                    height={48}
                    className="h-11 w-11 object-contain"
                  />
                </span>
                <span>
                  <strong className="block text-sm text-text-primary">{benefit.title[locale]}</strong>
                  <span className="mt-0.5 block text-xs leading-relaxed text-text-secondary">
                    {benefit.body[locale]}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </MotionReveal>

        <MotionReveal
          variant="right"
          delay={0.08}
          className="home-product-surface overflow-hidden rounded-[30px] bg-bg-card"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-bg">
                <Image
                  src="/brand/ui/folder.png"
                  alt=""
                  width={48}
                  height={48}
                  className="h-11 w-11 object-contain"
                />
              </span>
              <span>
                <strong className="block text-sm text-text-primary">{t.cabinetName}</strong>
                <span className="mt-1 block font-code text-[10px] text-text-tertiary">
                  {t.cabinetSubtitle}
                </span>
              </span>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-green-bg px-3 py-1.5 text-[10px] font-semibold text-green-warm">
              <span className="h-1.5 w-1.5 rounded-full bg-green" /> {t.sourcesConnected}
            </span>
          </div>

          <div className="bg-bg-warm/55 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3 px-2 pb-3">
              <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.11em] text-text-tertiary">
                <Folder aria-hidden className="h-3.5 w-3.5" /> {t.breadcrumb}
              </span>
              <span className="hidden text-[10px] text-text-tertiary sm:block">
                {t.sideBySide}
              </span>
            </div>

            <div className="space-y-2.5">
              {DIRECTORY_ITEMS.map((item, index) => (
                <div
                  key={item.id}
                  className="knowledge-directory-row flex items-center gap-3 rounded-2xl bg-bg-card p-3.5 shadow-sm sm:p-4"
                  style={{ animationDelay: `${180 + index * 90}ms` }}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-bg-warm">
                    <Image
                      src={item.src}
                      alt=""
                      width={25}
                      height={25}
                      className="h-6 w-6 object-contain"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <strong className="block text-sm text-text-primary">{item.name[locale]}</strong>
                    <span className="mt-1 block truncate text-[10px] text-text-tertiary sm:text-[11px]">
                      {item.note[locale]}
                    </span>
                  </span>
                  <span className="hidden items-center gap-1.5 rounded-full bg-green-bg px-2.5 py-1.5 text-[9px] font-semibold text-green-warm sm:inline-flex">
                    {item.kind === "local" ? (
                      <Check aria-hidden className="h-3 w-3" />
                    ) : (
                      <Link2 aria-hidden className="h-3 w-3" />
                    )}
                    {item.status[locale]}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-accent-bg-subtle px-4 py-3 text-xs leading-relaxed text-text-secondary">
              <Image
                src="/brand/ui/sparkles.png"
                alt=""
                width={38}
                height={38}
                className="h-9 w-9 shrink-0 object-contain"
              />
              <span>
                <strong className="text-text-primary">{t.noteLead}</strong>
                {` ${t.noteBody}`}
              </span>
            </div>
          </div>
        </MotionReveal>
      </div>
      </ScatteredIntegrationsFrame>
    </section>
  );
}
