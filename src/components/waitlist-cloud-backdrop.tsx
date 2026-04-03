const WAITLIST_CLOUDS = [
  {
    top: "-10%",
    left: "-2%",
    duration: "34s",
    delay: "-8s",
    opacity: 0.5,
    reverse: false,
  },
  {
    top: "-2%",
    left: "69%",
    duration: "42s",
    delay: "-17s",
    opacity: 0.46,
    reverse: true,
  },
  {
    top: "44%",
    left: "6%",
    duration: "38s",
    delay: "-12s",
    opacity: 0.42,
    reverse: true,
  },
  {
    top: "58%",
    left: "74%",
    duration: "46s",
    delay: "-22s",
    opacity: 0.44,
    reverse: false,
  },
] as const;

export function WaitlistCloudBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="mx-auto h-full max-w-6xl px-6">
        <div className="relative mx-auto h-full max-w-5xl">
          {WAITLIST_CLOUDS.map((cloud, index) => (
            <div
              key={index}
              className={`waitlist-cloud-row absolute ${cloud.reverse ? "waitlist-cloud-row-reverse" : ""}`}
              style={{
                top: cloud.top,
                left: cloud.left,
                opacity: cloud.opacity,
                ["--cloud-row-duration" as string]: cloud.duration,
                animationDelay: cloud.delay,
              }}
            >
              <span
                className="select-none text-[220px] leading-none md:text-[400px]"
                style={{
                  filter: "drop-shadow(0 18px 26px rgba(214,194,160,0.22))",
                }}
              >
                ☁️
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
