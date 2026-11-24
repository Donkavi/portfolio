import { skillCategories, skillLinks, skills } from "@/data/portfolio";
import type { Skill, SkillCategoryId } from "@/types/portfolio";

/** Constellation coordinate space (SVG viewBox units). */
export const VIEW = { w: 1000, h: 700 } as const;

/** Hand-placed cluster centres — "Quality & Practice" sits at the core, touching everything. */
const centres: Record<SkillCategoryId, { x: number; y: number; r: number }> = {
  languages: { x: 170, y: 170, r: 122 },
  frontend: { x: 500, y: 118, r: 78 },
  backend: { x: 822, y: 178, r: 80 },
  quality: { x: 488, y: 345, r: 104 },
  data: { x: 172, y: 532, r: 106 },
  devops: { x: 505, y: 612, r: 100 },
  ai: { x: 850, y: 520, r: 120 },
};

/** Where the label sits relative to the icon — always pointing away from the cluster hub. */
export type LabelSide = "top" | "bottom" | "left" | "right";
export type PlacedSkill = Skill & { x: number; y: number; delay: number; side: LabelSide };
export type Cluster = { id: SkillCategoryId; label: string; x: number; y: number };
export type Edge = { a: PlacedSkill; b: PlacedSkill; kind: "spoke" | "link"; category?: SkillCategoryId };

/** Manual label placements where the automatic choice collides with a neighbour. */
const labelOverrides: Record<string, LabelSide> = {
  "CNN / Deep Learning": "bottom",
  "Graph Databases": "bottom",
  Kubernetes: "bottom",
  JMeter: "right",
};

export function buildConstellation() {
  const placed: PlacedSkill[] = [];
  for (const cat of skillCategories) {
    const members = skills.filter((s) => s.category === cat.id);
    const c = centres[cat.id];
    members.forEach((s, i) => {
      const angle = -Math.PI / 2 + (i / members.length) * Math.PI * 2 + (cat.id === "quality" ? 0.35 : 0);
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);
      const side: LabelSide =
        Math.abs(dy) >= 0.5 ? (dy < 0 ? "top" : "bottom") : dx < 0 ? "left" : "right";
      placed.push({
        ...s,
        x: Math.round(c.x + dx * c.r),
        y: Math.round(c.y + dy * c.r * 0.82),
        delay: (i * 0.7) % 5,
        side: labelOverrides[s.name] ?? side,
      });
    });
  }

  const byName = new Map(placed.map((p) => [p.name, p]));
  const clusters: Cluster[] = skillCategories.map((c) => ({
    id: c.id,
    label: c.label,
    x: centres[c.id].x,
    y: centres[c.id].y,
  }));

  const links: Edge[] = skillLinks
    .map(([a, b]) => ({ a: byName.get(a), b: byName.get(b) }))
    .filter((e): e is { a: PlacedSkill; b: PlacedSkill } => Boolean(e.a && e.b))
    .map((e) => ({ ...e, kind: "link" as const }));

  return { placed, clusters, links, centres };
}

/** Gentle curve between two points (quadratic, bowed away from the centre). */
export function curve(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const bow = Math.min(60, len * 0.18);
  const cx = mx - (dy / len) * bow;
  const cy = my + (dx / len) * bow;
  return `M${a.x} ${a.y} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x} ${b.y}`;
}
