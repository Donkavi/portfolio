"use client";

import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { staggerChild, staggerParent } from "@/components/animations/Reveal";
import { SplitReveal } from "@/components/animations/SplitReveal";
import { buildConstellation, curve, VIEW } from "@/components/skills/layout";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { skillCategories, skills } from "@/data/portfolio";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn, pad2 } from "@/lib/utils";
import type { SkillCategoryId } from "@/types/portfolio";

const graph = buildConstellation();

export function Skills() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<SkillCategoryId | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Which nodes / edges are emphasised right now.
  const focus = useMemo(() => {
    if (hovered) {
      const names = new Set([hovered]);
      graph.links.forEach((l) => {
        if (l.a.name === hovered) names.add(l.b.name);
        if (l.b.name === hovered) names.add(l.a.name);
      });
      return { names, mode: "hover" as const };
    }
    if (active) {
      return {
        names: new Set(graph.placed.filter((p) => p.category === active).map((p) => p.name)),
        mode: "category" as const,
      };
    }
    return null;
  }, [active, hovered]);

  const activeCategory = skillCategories.find((c) => c.id === active);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "[data-constellation]", start: "top 75%", once: true },
        });
        tl.from("[data-cluster-label]", { autoAlpha: 0, scale: 0.6, duration: 0.8, stagger: 0.06 })
          .fromTo(
            "[data-edge]",
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.4, stagger: 0.012, ease: "power2.inOut" },
            0.1,
          )
          .from(
            "[data-node]",
            {
              autoAlpha: 0,
              scale: 0.3,
              duration: 0.9,
              stagger: { each: 0.025, from: "center" },
              ease: "back.out(2)",
            },
            0.2,
          );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-[clamp(6rem,14vw,12rem)]"
    >
      <div className="container-x">
        <SectionLabel index="03">Skills</SectionLabel>
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <SplitReveal
            as="h2"
            id="skills-heading"
            className="display text-[clamp(2.6rem,6.6vw,6.4rem)] lg:col-span-8"
          >
            A connected <span className="serif-accent text-accent">ecosystem</span> of tools.
          </SplitReveal>
          <p className="self-end text-lg leading-relaxed text-fg-dim lg:col-span-4">
            No percentage bars — just the technologies I work with, grouped by where they sit in the
            stack and linked by how they&apos;re used together.
          </p>
        </div>

        {/* ── Desktop: interactive constellation ── */}
        <div className="mt-20 hidden grid-cols-12 gap-8 lg:grid">
          <div className="col-span-4 flex flex-col">
            <ul className="border-t border-line" aria-label="Skill categories">
              <li>
                <CategoryButton
                  label="Everything"
                  count={skills.length}
                  index="00"
                  selected={active === null}
                  onSelect={() => setActive(null)}
                />
              </li>
              {skillCategories.map((c, i) => (
                <li key={c.id}>
                  <CategoryButton
                    label={c.label}
                    count={skills.filter((s) => s.category === c.id).length}
                    index={pad2(i + 1)}
                    selected={active === c.id}
                    onSelect={() => setActive(c.id)}
                    onPreview={() => setActive(c.id)}
                  />
                </li>
              ))}
            </ul>
            <p aria-live="polite" className="mt-8 min-h-[3.5rem] max-w-xs text-sm leading-relaxed text-muted">
              {activeCategory
                ? activeCategory.blurb
                : "Hover a category or a technology to trace its connections."}
            </p>
          </div>

          <div
            data-constellation
            aria-hidden="true"
            className="relative col-span-8 aspect-[10/7] select-none"
            onMouseLeave={() => setHovered(null)}
          >
            <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="absolute inset-0 size-full overflow-visible">
              <defs>
                <radialGradient id="cluster-glow">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </radialGradient>
              </defs>

              {graph.clusters.map((c) => (
                <circle
                  key={c.id}
                  cx={c.x}
                  cy={c.y}
                  r={150}
                  fill="url(#cluster-glow)"
                  className="transition-opacity duration-700"
                  opacity={active === c.id ? 1 : 0}
                />
              ))}

              {/* spokes: cluster centre → member */}
              {graph.placed.map((p) => {
                const c = graph.centres[p.category];
                const on = focus?.names.has(p.name) && focus.mode === "category";
                return (
                  <path
                    key={`s-${p.name}`}
                    data-edge
                    d={`M${c.x} ${c.y} L${p.x} ${p.y}`}
                    pathLength={1}
                    strokeDasharray="1"
                    fill="none"
                    stroke={on ? "var(--accent)" : "var(--line-strong)"}
                    strokeOpacity={focus && !on ? 0.35 : 1}
                    strokeWidth={on ? 1.2 : 0.8}
                    className="transition-[stroke,stroke-opacity] duration-500"
                  />
                );
              })}

              {/* cross-links: technologies used together */}
              {graph.links.map((l) => {
                const on =
                  focus &&
                  (focus.mode === "hover"
                    ? l.a.name === hovered || l.b.name === hovered
                    : focus.names.has(l.a.name) || focus.names.has(l.b.name));
                return (
                  <path
                    key={`l-${l.a.name}-${l.b.name}`}
                    data-edge
                    d={curve(l.a, l.b)}
                    pathLength={1}
                    strokeDasharray="1"
                    fill="none"
                    stroke={on ? "var(--accent)" : "var(--fg)"}
                    strokeOpacity={on ? 0.9 : focus ? 0.04 : 0.12}
                    strokeWidth={on ? 1.4 : 0.8}
                    className="transition-[stroke,stroke-opacity] duration-500"
                  />
                );
              })}
            </svg>

            {graph.clusters.map((c) => (
              <span
                key={c.id}
                data-cluster-label
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] transition-colors duration-500",
                  active === c.id
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-line bg-bg text-muted",
                )}
                style={{ left: `${(c.x / VIEW.w) * 100}%`, top: `${(c.y / VIEW.h) * 100}%` }}
              >
                {c.label}
              </span>
            ))}

            {graph.placed.map((p) => {
              const on = focus?.names.has(p.name);
              const dim = focus && !on;
              return (
                <div
                  key={p.name}
                  data-node
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${(p.x / VIEW.w) * 100}%`, top: `${(p.y / VIEW.h) * 100}%` }}
                >
                  <div
                    className={cn(
                      "animate-float relative flex items-center gap-2",
                      p.side === "top" && "flex-col-reverse",
                      p.side === "bottom" && "flex-col",
                      p.side === "left" && "flex-row-reverse",
                      p.side === "right" && "flex-row",
                    )}
                    style={{ animationDelay: `-${p.delay}s`, animationDuration: `${6 + (p.delay % 3)}s` }}
                    onMouseEnter={() => setHovered(p.name)}
                  >
                    <span
                      className={cn(
                        "grid size-11 place-items-center rounded-full border bg-bg-elev transition-all duration-500 ease-[var(--ease-out-expo)]",
                        hovered === p.name
                          ? "scale-125 border-accent bg-accent text-accent-ink"
                          : on
                            ? "border-accent/70 text-accent"
                            : "border-line-strong text-fg-dim",
                        dim && "opacity-30",
                      )}
                    >
                      <BrandIcon icon={p.icon} name={p.name} className="size-[18px] text-[18px]" />
                    </span>
                    <span
                      className={cn(
                        "absolute whitespace-nowrap text-[0.7rem] font-medium transition-all duration-500",
                        p.side === "top" && "bottom-full left-1/2 mb-1.5 -translate-x-1/2",
                        p.side === "bottom" && "left-1/2 top-full mt-1.5 -translate-x-1/2",
                        p.side === "left" && "right-full top-1/2 mr-2 -translate-y-1/2",
                        p.side === "right" && "left-full top-1/2 ml-2 -translate-y-1/2",
                        on ? "text-fg" : "text-muted",
                        dim && "opacity-30",
                      )}
                    >
                      {p.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile / tablet (and screen readers on desktop): grouped grid ── */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-2 lg:sr-only">
          {skillCategories.map((c, i) => (
            <motion.div
              key={c.id}
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="bg-bg p-6"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-2xl font-medium tracking-tight">{c.label}</h3>
                <span className="font-mono text-xs text-accent">{pad2(i + 1)}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{c.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {skills
                  .filter((s) => s.category === c.id)
                  .map((s) => (
                    <motion.li
                      key={s.name}
                      variants={staggerChild}
                      className="flex items-center gap-2 rounded-full border border-line-strong py-1.5 pl-1.5 pr-3 text-sm"
                    >
                      <span className="grid size-6 place-items-center rounded-full bg-fg/[0.06] text-fg-dim">
                        <BrandIcon icon={s.icon} name={s.name} className="size-3.5 text-[13px]" />
                      </span>
                      {s.name}
                    </motion.li>
                  ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryButton({
  label,
  count,
  index,
  selected,
  onSelect,
  onPreview,
}: {
  label: string;
  count: number;
  index: string;
  selected: boolean;
  onSelect: () => void;
  onPreview?: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      onMouseEnter={onPreview}
      onFocus={onPreview}
      className="group flex w-full items-baseline gap-4 border-b border-line py-3.5 text-left"
    >
      <span className={cn("font-mono text-xs", selected ? "text-accent" : "text-muted")}>{index}</span>
      <span
        className={cn(
          "font-display text-[1.65rem] font-medium tracking-tight transition-all duration-500 ease-[var(--ease-out-expo)]",
          selected ? "translate-x-2 text-accent" : "text-fg-dim group-hover:translate-x-2 group-hover:text-fg",
        )}
      >
        {label}
      </span>
      <span className="ml-auto font-mono text-xs text-muted tabular-nums">{pad2(count)}</span>
    </button>
  );
}
