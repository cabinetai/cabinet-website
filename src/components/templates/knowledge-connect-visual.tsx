const LEVELS = [
  {
    ids: ["google-drive", "notion", "sharepoint", "onedrive", "dropbox", "confluence"],
    radius: 26,
    duration: 90,
    reverse: false,
    size: 44,
  },
  {
    ids: [
      "slack",
      "gmail",
      "github",
      "figma",
      "linear",
      "jira",
      "box",
      "airtable",
      "asana",
      "clickup",
      "zoom",
      "microsoft-teams",
      "salesforce",
    ],
    radius: 43,
    duration: 130,
    reverse: true,
    size: 40,
  },
] as const;

const INTEGRATIONS: Record<string, { name: string; logo: string; brand: string }> = {
  "google-drive": { name: "Google Drive", logo: "/logos/google-drive.svg", brand: "#4285f4" },
  notion: { name: "Notion", logo: "/logos/notion.svg", brand: "#111111" },
  sharepoint: { name: "SharePoint", logo: "/logos/sharepoint.svg", brand: "#03787c" },
  onedrive: { name: "OneDrive", logo: "/logos/onedrive.svg", brand: "#0364b8" },
  dropbox: { name: "Dropbox", logo: "/logos/dropbox.svg", brand: "#0061ff" },
  confluence: { name: "Confluence", logo: "/logos/confluence.svg", brand: "#1868db" },
  slack: { name: "Slack", logo: "/logos/slack.svg", brand: "#611f69" },
  gmail: { name: "Gmail", logo: "/logos/gmail.svg", brand: "#ea4335" },
  github: { name: "GitHub", logo: "/logos/github.svg", brand: "#24292f" },
  figma: { name: "Figma", logo: "/logos/figma.svg", brand: "#f24e1e" },
  linear: { name: "Linear", logo: "/logos/linear.svg", brand: "#5e6ad2" },
  jira: { name: "Jira", logo: "/logos/jira.svg", brand: "#1868db" },
  box: { name: "Box", logo: "/logos/box.svg", brand: "#0061d5" },
  airtable: { name: "Airtable", logo: "/logos/airtable.svg", brand: "#18bfff" },
  asana: { name: "Asana", logo: "/logos/asana.svg", brand: "#f06a6a" },
  clickup: { name: "ClickUp", logo: "/logos/clickup.svg", brand: "#7b68ee" },
  zoom: { name: "Zoom", logo: "/logos/zoom.svg", brand: "#2d8cff" },
  "microsoft-teams": { name: "Microsoft Teams", logo: "/logos/microsoft-teams.svg", brand: "#6264a7" },
  salesforce: { name: "Salesforce", logo: "/logos/salesforce.svg", brand: "#00a1e0" },
};

const ACCENT = "#8B5E3C";
const PULSE_DURATION = 2.8;

type Node = {
  id: string;
  name: string;
  logo: string;
  brand: string;
  x: number;
  y: number;
  path: string;
};

function spiralPath(x: number, y: number): string {
  const phi = (55 * Math.PI) / 180;
  const vx = x - 50;
  const vy = y - 50;
  const rx = vx * Math.cos(phi) - vy * Math.sin(phi);
  const ry = vx * Math.sin(phi) + vy * Math.cos(phi);
  const cx = 50 + rx * 0.5;
  const cy = 50 + ry * 0.5;
  return `M ${x.toFixed(2)} ${y.toFixed(2)} Q ${cx.toFixed(2)} ${cy.toFixed(2)} 50 50`;
}

function buildNodes(ids: readonly string[], radius: number): Node[] {
  return ids
    .map((id) => INTEGRATIONS[id])
    .filter((item): item is (typeof INTEGRATIONS)[string] => Boolean(item))
    .map((item, index, items) => {
      const angle = (-90 + (index * 360) / items.length) * (Math.PI / 180);
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      return { id: item.logo, name: item.name, logo: item.logo, brand: item.brand, x, y, path: spiralPath(x, y) };
    });
}

const LEVEL_NODES = LEVELS.map((level) => buildNodes(level.ids, level.radius));

/** The onboarding visual from Cabinet: every account orbiting one knowledge hub. */
export function KnowledgeConnectVisual() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[420px]"
      role="img"
      aria-label="Cabinet connects your knowledge from the accounts you already use"
    >
      <style>{`
        @keyframes template-kb-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes template-kb-spin-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes template-kb-breathe { 0%, 100% { opacity: 0.05; } 50% { opacity: 0.16; } }
        @keyframes template-kb-beat {
          0%, 100% { transform: translate(-50%, -50%) scale(0.94); }
          50% { transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes template-kb-pop {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes template-kb-hub {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .template-kb-spin-el { animation: none !important; }
          .template-kb-line { animation: none !important; opacity: 0.1 !important; }
          .template-kb-hub-el { animation: none !important; transform: translate(-50%, -50%) scale(1) !important; }
          .template-kb-chip { animation: none !important; opacity: 1 !important; transform: translate(-50%, -50%) scale(1) !important; }
        }
      `}</style>

      {LEVELS.map((level, levelIndex) => (
        <OrbitWeb
          key={`web-${levelIndex}`}
          nodes={LEVEL_NODES[levelIndex]}
          spin={`${level.reverse ? "template-kb-spin-rev" : "template-kb-spin"} ${level.duration}s linear infinite`}
          baseDelay={0.3 + levelIndex * 0.25}
        />
      ))}

      {LEVELS.map((level, levelIndex) => (
        <OrbitChips
          key={`chips-${levelIndex}`}
          nodes={LEVEL_NODES[levelIndex]}
          level={level}
          baseDelay={0.3 + levelIndex * 0.25}
        />
      ))}

      {/* eslint-disable-next-line @next/next/no-img-element -- the transparent Cabinet mark is the hub artwork */}
      <img
        src="/Cabinet.png"
        alt="Cabinet"
        width={104}
        height={104}
        className="template-kb-hub-el absolute left-1/2 top-1/2 z-20 object-contain drop-shadow-lg"
        style={{ animation: "template-kb-hub 0.6s ease-out 0.15s both, template-kb-beat 4.5s ease-in-out 0.9s infinite" }}
      />
    </div>
  );
}

function OrbitWeb({ nodes, spin, baseDelay }: { nodes: Node[]; spin: string; baseDelay: number }) {
  const nodeCount = nodes.length;
  return (
    <div className="template-kb-spin-el absolute inset-0" style={{ animation: spin }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {nodes.map((node, index) => (
          <path
            key={node.id}
            d={node.path}
            fill="none"
            stroke={ACCENT}
            strokeWidth={0.3}
            strokeLinecap="round"
            className="template-kb-line"
            style={{ opacity: 0.1, animation: "template-kb-breathe 4s ease-in-out infinite", animationDelay: `${baseDelay + index * 0.22}s` }}
          />
        ))}
        {nodes.map((node, index) => (
          <circle key={`pulse-${node.id}`} r={0.85} fill={ACCENT}>
            <animateMotion dur={`${PULSE_DURATION}s`} begin={`${(index / nodeCount) * PULSE_DURATION}s`} repeatCount="indefinite" path={node.path} />
            <animate
              attributeName="opacity"
              dur={`${PULSE_DURATION}s`}
              begin={`${(index / nodeCount) * PULSE_DURATION}s`}
              repeatCount="indefinite"
              values="0;0.8;0.8;0"
              keyTimes="0;0.15;0.9;1"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}

function OrbitChips({
  nodes,
  level,
  baseDelay,
}: {
  nodes: Node[];
  level: (typeof LEVELS)[number];
  baseDelay: number;
}) {
  const counterSpin = `${level.reverse ? "template-kb-spin" : "template-kb-spin-rev"} ${level.duration}s linear infinite`;
  return (
    <div className="template-kb-spin-el absolute inset-0 z-10" style={{ animation: `${level.reverse ? "template-kb-spin-rev" : "template-kb-spin"} ${level.duration}s linear infinite` }}>
      {nodes.map((node, index) => (
        <div
          key={node.id}
          className="template-kb-chip absolute flex items-center justify-center rounded-xl border border-black/5 bg-white shadow-sm"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: level.size,
            height: level.size,
            animation: "template-kb-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
            animationDelay: `${baseDelay + index * 0.06}s`,
          }}
        >
          <div className="template-kb-spin-el flex h-full w-full items-center justify-center" style={{ animation: counterSpin }} title={node.name}>
            {/* eslint-disable-next-line @next/next/no-img-element -- provider marks are tiny static SVGs */}
            <img src={node.logo} alt="" width={level.size * 0.58} height={level.size * 0.58} className="object-contain" />
          </div>
        </div>
      ))}
    </div>
  );
}
