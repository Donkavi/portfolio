import {
  BrainCircuit,
  Cpu,
  Database,
  DatabaseZap,
  Gauge,
  Network,
  RefreshCcw,
  ScanSearch,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { brandIcons } from "@/lib/icons";
import { cn } from "@/lib/utils";

/** Generic glyphs for concepts / tools that have no brand mark in Simple Icons. */
const conceptIcons: Record<string, LucideIcon> = {
  RAG: ScanSearch,
  "RAG · Weaviate": ScanSearch,
  "CNN / Deep Learning": BrainCircuit,
  "IoT Integration": Cpu,
  SQL: Database,
  Weaviate: DatabaseZap,
  "Graph Databases": Network,
  YourKit: Gauge,
  "Agile / Scrum": RefreshCcw,
  "NFR Analysis": ShieldCheck,
};

/** Renders a Simple Icons brand mark in currentColor. Falls back to a monogram. */
export function BrandIcon({
  icon,
  name,
  className,
}: {
  icon?: string;
  name: string;
  className?: string;
}) {
  const data = icon ? brandIcons[icon] : undefined;
  const Concept = !data ? conceptIcons[name] : undefined;
  if (Concept) {
    return <Concept aria-hidden="true" strokeWidth={1.75} className={className} />;
  }
  if (!data) {
    const mono = name
      .replace(/[^A-Za-z0-9#+ ]/g, " ")
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return (
      <span
        aria-hidden="true"
        className={cn(
          "grid place-items-center font-mono text-[0.62em] font-semibold leading-none tracking-tight",
          className,
        )}
      >
        {name === "C#" ? "C#" : mono}
      </span>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={cn("fill-current", className)}>
      <path d={data.path} />
    </svg>
  );
}

/** Geometric "in" mark — LinkedIn's logo is not distributed in Simple Icons. */
export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("fill-current", className)}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.06c.53-.95 1.84-1.95 3.79-1.95 4.05 0 4.8 2.5 4.8 5.76v5.69h-4v-5.04c0-1.2-.02-2.75-1.75-2.75-1.75 0-2.02 1.3-2.02 2.66v5.13h-4v-11Z" />
    </svg>
  );
}
