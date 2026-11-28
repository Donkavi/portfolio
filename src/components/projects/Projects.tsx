"use client";

import { AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { SplitReveal } from "@/components/animations/SplitReveal";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects } from "@/data/portfolio";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { pad2 } from "@/lib/utils";
import type { Project } from "@/types/portfolio";

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Desktop: pinned horizontal case-study reel.
      mm.add(MQ.desktop, () => {
        const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: "[data-pin]",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const bar = root.current?.querySelector<HTMLElement>("[data-reel-progress]");
              if (bar) bar.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        // Each card's visual parallaxes inside its frame while the reel moves.
        gsap.utils.toArray<HTMLElement>("[data-card-visual]").forEach((el) => {
          gsap.fromTo(
            el,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("[data-card]"),
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const openCase = (p: Project) => (e: React.MouseEvent<HTMLElement>) => {
    lastTrigger.current = e.currentTarget;
    setOpen(p);
  };

  return (
    <section ref={root} id="projects" aria-labelledby="projects-heading" className="relative border-t border-line">
      <div className="container-x pt-[clamp(6rem,14vw,12rem)]">
        <SectionLabel index="04">Projects</SectionLabel>
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <SplitReveal
            as="h2"
            id="projects-heading"
            className="display text-[clamp(2.6rem,6.6vw,6.4rem)] lg:col-span-8"
          >
            Selected <span className="serif-accent text-accent">work</span> &amp; case studies.
          </SplitReveal>
          <Reveal className="self-end lg:col-span-4" delay={0.1}>
            <p className="text-lg leading-relaxed text-fg-dim">
              From LLM agents at work and products I&apos;ve shipped to recognised final-year research — a
              few projects that shaped how I build.
            </p>
            <p className="mt-4 text-xs text-muted">
              Live products show real screenshots; other visuals are abstract illustrations.
            </p>
          </Reveal>
        </div>
      </div>

      <div data-pin className="relative lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:overflow-hidden">
        <div
          data-track
          className="container-x mt-16 flex flex-col gap-6 pb-[clamp(6rem,12vw,10rem)] lg:mt-0 lg:w-max lg:max-w-none lg:flex-row lg:gap-8 lg:pb-0 lg:pr-[10vw]"
        >
          {projects.map((p, i) => (
            <article
              key={p.slug}
              data-card
              className="group relative grid shrink-0 grid-cols-1 overflow-hidden rounded-[6px] border border-line bg-bg-elev lg:h-[72svh] lg:w-[min(82vw,1180px)] lg:grid-cols-[1.25fr_1fr]"
            >
              <button
                type="button"
                onClick={openCase(p)}
                data-cursor-label="View"
                aria-label={`Open case study: ${p.name}`}
                className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-full"
              >
                <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]">
                  {p.screenshots[0] ? (
                    // Parallax is horizontal only, so overscan the sides but keep the page's top edge visible.
                    <div data-card-visual className="absolute inset-x-[-10%] inset-y-0">
                      <Image
                        src={p.screenshots[0].src}
                        alt={p.screenshots[0].alt}
                        fill
                        className="object-cover object-top"
                        sizes="(min-width: 1024px) 60vw, 100vw"
                      />
                    </div>
                  ) : (
                    <div data-card-visual className="absolute inset-[-10%]">
                      {p.visual && <ProjectVisual kind={p.visual} />}
                    </div>
                  )}
                </div>
                <span className="absolute left-5 top-5 font-mono text-xs text-white/70">
                  {pad2(i + 1)} / {pad2(projects.length)}
                </span>
              </button>

              <div className="flex flex-col p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-ink">
                    {p.category}
                  </span>
                  {p.year && <span className="font-mono text-xs text-muted">{p.year}</span>}
                </div>
                <h3 className="display mt-6 text-[clamp(2rem,3.4vw,3.3rem)] leading-[0.98]">{p.name}</h3>
                <p className="mt-3 text-sm text-muted">{p.context}</p>
                <p className="mt-6 leading-relaxed text-fg-dim">{p.description}</p>
                {p.outcome && (
                  <p className="mt-4 border-l-2 border-accent pl-4 text-sm text-fg">{p.outcome}</p>
                )}

                <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line-strong px-3 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-fg-dim"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                  <button
                    type="button"
                    onClick={openCase(p)}
                    className="group/btn inline-flex items-center gap-3 text-sm font-medium"
                  >
                    <span className="grid size-10 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover/btn:rotate-90 group-hover/btn:border-accent group-hover/btn:bg-accent group-hover/btn:text-accent-ink">
                      <Plus className="size-4" />
                    </span>
                    Read case study
                  </button>
                  {[
                    { href: p.github, label: "Source" },
                    { href: p.live, label: "Live" },
                  ]
                    .filter((l): l is { href: string; label: string } => Boolean(l.href))
                    .map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-fg-dim hover:text-accent"
                      >
                        {l.label} <ArrowUpRight className="size-3.5" />
                      </a>
                    ))}
                </div>
              </div>
            </article>
          ))}

          {/* Placeholder slot to invite future work — not a project. */}
          <div className="hidden shrink-0 flex-col justify-end rounded-[6px] border border-dashed border-line-strong p-10 lg:flex lg:h-[72svh] lg:w-[min(36vw,480px)]">
            <p className="eyebrow">Next chapter</p>
            <p className="display mt-4 text-[clamp(2rem,3vw,3rem)] text-fg-dim">
              Your project <span className="serif-accent text-accent">could be next.</span>
            </p>
            <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm text-fg hover:text-accent">
              Start a conversation <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        <div className="container-x mt-10 hidden items-center gap-6 lg:flex">
          <span className="eyebrow">Scroll</span>
          <span className="relative h-px flex-1 bg-line-strong">
            <span data-reel-progress className="absolute inset-0 origin-left scale-x-0 bg-accent" />
          </span>
          <span className="eyebrow">{pad2(projects.length)} projects</span>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <CaseStudy
            key={open.slug}
            project={open}
            index={projects.indexOf(open)}
            onClose={() => {
              setOpen(null);
              lastTrigger.current?.focus({ preventScroll: true });
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

