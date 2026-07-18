import Image from "next/image";
import { Check, Folder, Link2 } from "lucide-react";
import { MotionReveal } from "./motion-primitives";

const DIRECTORY_ITEMS = [
  {
    name: "Google Drive",
    note: "Company docs and campaign folders",
    src: "/logos/google-drive.svg",
    status: "Connected folder",
  },
  {
    name: "SharePoint",
    note: "Policies, projects, and team sites",
    src: "/logos/sharepoint.svg",
    status: "Connected folder",
  },
  {
    name: "Office files",
    note: "FY27 Plan.docx  ·  Forecast.xlsx  ·  Board.pptx",
    src: "/logos/microsoft-365.svg",
    status: "Local files",
  },
  {
    name: "Notion",
    note: "Team wiki and operating documents",
    src: "/logos/notion.svg",
    status: "Connected space",
  },
  {
    name: "OneDrive",
    note: "Finance, sales, and customer folders",
    src: "/logos/onedrive.svg",
    status: "Connected folder",
  },
] as const;

const BENEFITS = [
  {
    image: "/brand/ui/brain.png",
    title: "One search surface",
    body: "Find context across the connected company structure.",
  },
  {
    image: "/brand/ui/team.png",
    title: "One shared view",
    body: "People and AI teams work from the same navigable source.",
  },
  {
    image: "/brand/ui/document.png",
    title: "Results stay useful",
    body: "New work returns beside its sources with history intact.",
  },
] as const;

export function KnowledgeNetwork() {
  return (
    <section
      id="knowledge"
      className="home-snap-section home-viewport-section scroll-mt-24 px-5 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <MotionReveal variant="left">
          <p className="section-label">Integrations</p>
          <h2 className="mt-5 max-w-[13ch] font-section text-[clamp(2.25rem,3.6vw,3.6rem)] leading-[1.02] text-text-primary">
            Connect to everything that runs your company.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Your company runs on dozens of tools. Cabinet brings the work scattered across them
            into one place you own, where your team and its agents can find it, act on it, and
            keep it moving.
          </p>

          <div className="mt-8 space-y-3">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="flex items-center gap-4">
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
                  <strong className="block text-sm text-text-primary">{benefit.title}</strong>
                  <span className="mt-0.5 block text-xs leading-relaxed text-text-secondary">
                    {benefit.body}
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
                <strong className="block text-sm text-text-primary">Company Cabinet</strong>
                <span className="mt-1 block font-code text-[10px] text-text-tertiary">
                  one visible company directory
                </span>
              </span>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-green-bg px-3 py-1.5 text-[10px] font-semibold text-green-warm">
              <span className="h-1.5 w-1.5 rounded-full bg-green" /> Sources connected
            </span>
          </div>

          <div className="bg-bg-warm/55 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3 px-2 pb-3">
              <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.11em] text-text-tertiary">
                <Folder aria-hidden className="h-3.5 w-3.5" /> Company Cabinet /
              </span>
              <span className="hidden text-[10px] text-text-tertiary sm:block">
                Cloud and local sources, side by side
              </span>
            </div>

            <div className="space-y-2.5">
              {DIRECTORY_ITEMS.map((item, index) => (
                <div
                  key={item.name}
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
                    <strong className="block text-sm text-text-primary">{item.name}</strong>
                    <span className="mt-1 block truncate text-[10px] text-text-tertiary sm:text-[11px]">
                      {item.note}
                    </span>
                  </span>
                  <span className="hidden items-center gap-1.5 rounded-full bg-green-bg px-2.5 py-1.5 text-[9px] font-semibold text-green-warm sm:inline-flex">
                    {item.status === "Local files" ? (
                      <Check aria-hidden className="h-3 w-3" />
                    ) : (
                      <Link2 aria-hidden className="h-3 w-3" />
                    )}
                    {item.status}
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
                <strong className="text-text-primary">Cabinet keeps the structure.</strong> AI
                results, decisions, and live views return to the directory your company owns.
              </span>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
