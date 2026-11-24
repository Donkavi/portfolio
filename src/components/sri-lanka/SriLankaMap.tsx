import { sriLankaMap } from "@/lib/sri-lanka-map";
import { cn } from "@/lib/utils";

/** Outline of Sri Lanka (Natural Earth data) with a Colombo marker. */
export function SriLankaMap({ className }: { className?: string }) {
  const { width, height, path, colombo } = sriLankaMap;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Outline map of Sri Lanka with Colombo marked"
      className={cn("overflow-visible", className)}
    >
      <path data-lk-fill d={path} fill="rgb(243 239 231 / 0.06)" />
      <path
        data-lk-outline
        d={path}
        pathLength={1}
        strokeDasharray="1"
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1.6}
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
      />
      <g data-lk-marker>
        <circle cx={colombo.x} cy={colombo.y} r={14} fill="var(--accent)" opacity={0.25}>
          <animate attributeName="r" values="6;20;6" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.45;0;0.45" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle cx={colombo.x} cy={colombo.y} r={5.5} fill="var(--accent)" />
        <line x1={colombo.x} y1={colombo.y} x2={colombo.x + 34} y2={colombo.y + 44} stroke="var(--fg)" strokeOpacity={0.5} />
        <text
          x={colombo.x + 38}
          y={colombo.y + 60}
          textAnchor="start"
          fill="var(--fg)"
          style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.12em" }}
        >
          COLOMBO
        </text>
      </g>
    </svg>
  );
}
