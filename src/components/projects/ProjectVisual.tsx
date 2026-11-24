import type { ProjectVisualKind } from "@/types/portfolio";
import { cn } from "@/lib/utils";

/**
 * Abstract, illustrative compositions for projects without screenshots.
 * They are deliberately schematic and labelled "Illustration" — not product UI.
 */
export function ProjectVisual({ kind, className }: { kind: ProjectVisualKind; className?: string }) {
  const theme = themes[kind];
  return (
    <div
      className={cn("relative size-full overflow-hidden", className)}
      style={{ background: theme.bg }}
    >
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
        <defs>
          <pattern id={`grid-${kind}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="rgb(255 255 255 / 0.05)" />
          </pattern>
        </defs>
        <rect width="800" height="600" fill={`url(#grid-${kind})`} />
        {visuals[kind]}
      </svg>
      <span className="absolute bottom-4 right-4 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/60 backdrop-blur-sm">
        Illustration
      </span>
    </div>
  );
}

const themes: Record<ProjectVisualKind, { bg: string }> = {
  agents: { bg: "radial-gradient(120% 90% at 70% 20%, #1d2350 0%, #0d0f1c 55%, #08080a 100%)" },
  pest: { bg: "radial-gradient(120% 90% at 30% 80%, #163a22 0%, #0b160f 55%, #07090a 100%)" },
  drowsy: { bg: "radial-gradient(120% 90% at 50% 30%, #3a2711 0%, #160f08 55%, #0a0908 100%)" },
  mern: { bg: "radial-gradient(120% 90% at 20% 20%, #0f2a3a 0%, #0a141b 55%, #08090a 100%)" },
  commerce: { bg: "radial-gradient(120% 90% at 80% 70%, #2d173f 0%, #130b1b 55%, #09080a 100%)" },
};

const A = "#c8f04a";
const W = "rgb(243 239 231 / 0.85)";
const W2 = "rgb(243 239 231 / 0.35)";
const W3 = "rgb(243 239 231 / 0.12)";

const mono = { fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.12em" } as const;

const visuals: Record<ProjectVisualKind, React.ReactNode> = {
  agents: (
    <g>
      {/* vector-space dot cloud */}
      {Array.from({ length: 70 }, (_, i) => {
        const a = i * 2.39996;
        const r = 18 * Math.sqrt(i);
        return (
          <circle
            key={i}
            cx={Math.round((590 + Math.cos(a) * r) * 10) / 10}
            cy={Math.round((330 + Math.sin(a) * r * 0.8) * 10) / 10}
            r={i % 9 === 0 ? 3 : 1.6}
            fill={i % 9 === 0 ? A : W2}
          />
        );
      })}
      {/* agents orbiting a core */}
      <circle cx="280" cy="300" r="150" fill="none" stroke={W3} strokeDasharray="3 7" />
      <circle cx="280" cy="300" r="90" fill="none" stroke={W3} />
      {[
        [280, 150, "PLAN"],
        [410, 375, "ACT"],
        [150, 375, "RETRIEVE"],
      ].map(([x, y, t]) => (
        <g key={t as string}>
          <line x1="280" y1="300" x2={x} y2={y} stroke={W2} />
          <circle cx={x} cy={y} r="22" fill="#0d0f1c" stroke={W} />
          <circle cx={x} cy={y} r="5" fill={A} />
          <text x={(x as number) + 30} y={(y as number) + 4} fill={W2} style={mono}>
            {t}
          </text>
        </g>
      ))}
      <circle cx="280" cy="300" r="40" fill={A} />
      <text x="280" y="305" textAnchor="middle" fill="#0a0a0b" style={{ ...mono, fontSize: 13, fontWeight: 700 }}>
        LLM
      </text>
      <path d="M432 300 C 480 300 500 330 560 330" fill="none" stroke={A} strokeDasharray="4 6">
        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.2s" repeatCount="indefinite" />
      </path>
      <text x="40" y="560" fill={W2} style={mono}>
        AGENTS · RAG · VECTOR + GRAPH
      </text>
    </g>
  ),

  pest: (
    <g>
      {/* tea terraces */}
      {Array.from({ length: 11 }, (_, i) => (
        <path
          key={i}
          d={`M-20 ${250 + i * 34} C 180 ${200 + i * 30}, 420 ${300 + i * 36}, 820 ${230 + i * 32}`}
          fill="none"
          stroke={i % 3 === 0 ? "rgb(120 200 120 / 0.55)" : "rgb(120 200 120 / 0.22)"}
          strokeWidth={i % 3 === 0 ? 2 : 1}
        />
      ))}
      {/* detection box */}
      <g transform="translate(430 250)">
        <rect width="170" height="130" fill="rgb(200 240 74 / 0.06)" />
        {[
          "M0 24V0H24",
          "M146 0H170V24",
          "M170 106V130H146",
          "M24 130H0V106",
        ].map((d) => (
          <path key={d} d={d} fill="none" stroke={A} strokeWidth="3" />
        ))}
        <rect x="0" y="-26" width="118" height="20" fill={A} />
        <text x="8" y="-12" fill="#0a0a0b" style={{ ...mono, fontSize: 11, fontWeight: 700 }}>
          PEST DETECTED
        </text>
        <circle cx="85" cy="65" r="7" fill={A}>
          <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>
      {/* scan line */}
      <rect x="0" y="0" width="800" height="2" fill={A} opacity="0.6">
        <animate attributeName="y" values="80;560;80" dur="5s" repeatCount="indefinite" />
      </rect>
      {/* IoT device */}
      <g transform="translate(90 90)">
        <rect width="110" height="72" rx="8" fill="#0b160f" stroke={W2} />
        <circle cx="30" cy="36" r="16" fill="none" stroke={W} />
        <circle cx="30" cy="36" r="6" fill={A} />
        <rect x="58" y="24" width="36" height="5" fill={W2} />
        <rect x="58" y="36" width="24" height="5" fill={W3} />
        <path d="M55 -10 a20 20 0 0 1 30 0 M62 -2 a10 10 0 0 1 16 0" fill="none" stroke={A} />
      </g>
      <text x="40" y="560" fill={W2} style={mono}>
        IOT · TENSORFLOW · REAL-TIME CLASSIFICATION
      </text>
    </g>
  ),

  drowsy: (
    <g>
      {/* eye contour with landmarks */}
      <path d="M200 260 Q400 120 600 260 Q400 360 200 260Z" fill="none" stroke={W} strokeWidth="1.5" />
      <circle cx="400" cy="250" r="56" fill="none" stroke={W2} />
      <circle cx="400" cy="250" r="22" fill={A} />
      {[
        [200, 260],
        [270, 200],
        [400, 172],
        [530, 200],
        [600, 260],
        [530, 300],
        [400, 318],
        [270, 300],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" fill="#160f08" stroke={A} strokeWidth="2" />
        </g>
      ))}
      <line x1="400" y1="172" x2="400" y2="318" stroke={A} strokeDasharray="3 5" />
      {/* eye-openness signal */}
      <path
        d="M40 470 H180 L200 470 L215 430 L230 470 H330 L350 470 L360 500 L372 470 H460 L470 470 L478 520 L500 520 L520 470 H760"
        fill="none"
        stroke={W2}
        strokeWidth="1.5"
      />
      <path d="M470 470 L478 520 L500 520 L520 470" fill="none" stroke={A} strokeWidth="2.5" />
      <rect x="560" y="80" width="170" height="44" rx="22" fill="none" stroke={A} />
      <circle cx="586" cy="102" r="6" fill={A}>
        <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
      </circle>
      <text x="604" y="107" fill={A} style={{ ...mono, fontWeight: 700 }}>
        ALERT
      </text>
      <text x="40" y="560" fill={W2} style={mono}>
        CNN · FACIAL LANDMARKS · REAL-TIME
      </text>
    </g>
  ),

  mern: (
    <g>
      {[
        { x: 70, y: 90, label: "RECORDS" },
        { x: 230, y: 170, label: "SEATS" },
        { x: 390, y: 250, label: "TASKS" },
      ].map((w, i) => (
        <g key={w.label} transform={`translate(${w.x} ${w.y})`}>
          <rect width="340" height="240" rx="10" fill="#0a141b" stroke={i === 2 ? W : W2} />
          <rect width="340" height="30" rx="10" fill="rgb(255 255 255 / 0.04)" />
          {[0, 1, 2].map((d) => (
            <circle key={d} cx={18 + d * 14} cy="15" r="4" fill={d === 0 && i === 2 ? A : W3} />
          ))}
          <text x="300" y="20" textAnchor="end" fill={W2} style={{ ...mono, fontSize: 10 }}>
            {w.label}
          </text>
          {i === 0 &&
            [0, 1, 2, 3, 4].map((r) => (
              <g key={r}>
                <rect x="20" y={50 + r * 34} width="120" height="8" fill={W3} />
                <rect x="160" y={50 + r * 34} width="70" height="8" fill={W3} />
              </g>
            ))}
          {i === 1 &&
            Array.from({ length: 40 }, (_, k) => (
              <rect
                key={k}
                x={34 + (k % 10) * 28}
                y={60 + Math.floor(k / 10) * 32}
                width="18"
                height="18"
                rx="4"
                fill={[3, 4, 14, 15, 16, 27].includes(k) ? A : "none"}
                stroke={W3}
              />
            ))}
          {i === 2 &&
            [0, 1, 2].map((c) => (
              <g key={c} transform={`translate(${20 + c * 106} 48)`}>
                <rect width="94" height="12" fill={c === 1 ? A : W2} opacity={c === 1 ? 1 : 0.5} />
                {[0, 1, 2].slice(0, 3 - c).map((r) => (
                  <rect key={r} y={24 + r * 52} width="94" height="42" rx="6" fill="none" stroke={W2} />
                ))}
              </g>
            ))}
        </g>
      ))}
      <text x="40" y="560" fill={W2} style={mono}>
        MONGODB · EXPRESS · REACT · NODE
      </text>
    </g>
  ),

  commerce: (
    <g>
      {Array.from({ length: 6 }, (_, k) => {
        const x = 70 + (k % 3) * 150;
        const y = 90 + Math.floor(k / 3) * 200;
        return (
          <g key={k} transform={`translate(${x} ${y})`}>
            <rect width="130" height="180" rx="8" fill="#130b1b" stroke={k === 4 ? A : W2} />
            <rect x="12" y="12" width="106" height="100" rx="4" fill="rgb(255 255 255 / 0.05)" />
            <circle cx="65" cy="62" r="24" fill="none" stroke={k === 4 ? A : W3} />
            <rect x="12" y="126" width="80" height="8" fill={W2} />
            <rect x="12" y="144" width="44" height="8" fill={k === 4 ? A : W3} />
          </g>
        );
      })}
      {/* cart */}
      <g transform="translate(560 150)">
        <rect width="190" height="250" rx="12" fill="#130b1b" stroke={W} />
        <path d="M30 40 h18 l14 52 h70 l14 -38 H58" fill="none" stroke={A} strokeWidth="3" strokeLinejoin="round" />
        <circle cx="72" cy="108" r="6" fill={A} />
        <circle cx="122" cy="108" r="6" fill={A} />
        {[0, 1].map((r) => (
          <g key={r}>
            <rect x="24" y={140 + r * 30} width="90" height="8" fill={W2} />
            <rect x="140" y={140 + r * 30} width="26" height="8" fill={W3} />
          </g>
        ))}
        <rect x="24" y="200" width="142" height="32" rx="16" fill={A} />
        <text x="95" y="221" textAnchor="middle" fill="#0a0a0b" style={{ ...mono, fontSize: 11, fontWeight: 700 }}>
          CHECKOUT
        </text>
      </g>
      <text x="40" y="560" fill={W2} style={mono}>
        ASP.NET · PRODUCTS · CART · CHECKOUT
      </text>
    </g>
  ),
};
