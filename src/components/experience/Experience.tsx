"use client";

import { useRef } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { SplitReveal } from "@/components/animations/SplitReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { experience, profile } from "@/data/portfolio";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // Timeline line draws itself as you scroll.
        gsap.fromTo(
          "[data-timeline-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-timeline]",
              start: "top 60%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          },
        );

        // Giant company name drifts horizontally.
        gsap.fromTo(
          "[data-exp-marquee]",
          { xPercent: 6 },
          {
            xPercent: -32,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // Activate milestone nodes (also without motion — it's a state change, not an animation).
      const roles = gsap.utils.toArray<HTMLElement>("[data-role]");
      const triggers = roles.map((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top 62%",
          end: "bottom 62%",
          toggleClass: { targets: el, className: "is-active" },
        }),
      );

      return () => {
        mm.revert();
        triggers.forEach((t) => t.kill());
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="experience"
      aria-labelledby="experience-heading"
      className="relative overflow-hidden border-t border-line bg-bg-elev py-[clamp(6rem,14vw,12rem)]"
    >
      <div
        aria-hidden="true"
        data-exp-marquee
        className="display text-outline pointer-events-none absolute left-0 top-[clamp(3rem,6vw,5rem)] select-none whitespace-nowrap text-[clamp(6rem,18vw,18rem)] opacity-60"
      >
        {profile.company} — {profile.company}
      </div>

      <div className="container-x relative">
        <SectionLabel index="02">Experience</SectionLabel>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <SplitReveal
            as="h2"
            id="experience-heading"
            className="display text-[clamp(2.6rem,6.6vw,6.4rem)] lg:col-span-8"
          >
            Four roles. One <span className="serif-accent text-accent">trajectory.</span>
          </SplitReveal>
          <Reveal className="self-end text-lg leading-relaxed text-fg-dim lg:col-span-4" delay={0.15}>
            Every chapter of my career so far has been written at {profile.company} — from intern to
            senior engineer leading AI initiatives.
          </Reveal>
        </div>

        <ol data-timeline className="relative mt-[clamp(4rem,8vw,7rem)]">
          {/* line */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[7px] top-0 w-px bg-line-strong lg:left-[calc(25%+7px)]"
          >
            <span data-timeline-fill className="absolute inset-0 origin-top bg-accent" />
          </span>

          {experience.map((role) => (
            <li
              key={role.title}
              data-role
              className="group/role relative grid grid-cols-1 gap-y-4 pb-[clamp(4rem,8vw,7rem)] pl-10 last:pb-0 lg:grid-cols-12 lg:pl-0"
            >
              {/* node */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-2 grid size-[15px] place-items-center rounded-full border border-line-strong bg-bg-elev transition-colors duration-500 group-[.is-active]/role:border-accent lg:left-[25%]"
              >
                <span className="size-[5px] scale-0 rounded-full bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-[.is-active]/role:scale-100" />
                {role.current && (
                  <span className="animate-pulse-ring absolute inset-0 rounded-full border border-accent" />
                )}
              </span>

              {/* period */}
              <div className="lg:col-span-3 lg:pr-12">
                <div className="lg:sticky lg:top-28">
                  <p className="font-mono text-sm text-fg-dim tabular-nums">
                    {role.start} — {role.end}
                  </p>
                  <p
                    aria-hidden="true"
                    className="display mt-2 hidden text-[clamp(3rem,5vw,5rem)] text-fg/15 transition-colors duration-700 group-[.is-active]/role:text-fg/80 lg:block"
                  >
                    {role.start.slice(-4)}
                  </p>
                  {role.current && (
                    <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                      <span className="size-1.5 rounded-full bg-accent animate-blink" />
                      Current role
                    </span>
                  )}
                </div>
              </div>

              {/* body */}
              <div
                className={cn(
                  "lg:col-span-8 lg:col-start-5",
                  role.current &&
                    "rounded-[6px] border border-accent/20 bg-gradient-to-br from-accent/[0.07] via-transparent to-transparent p-6 sm:p-10",
                )}
              >
                <SplitReveal
                  as="h3"
                  className={cn(
                    "display",
                    role.current ? "text-[clamp(2.2rem,4.6vw,4.4rem)]" : "text-[clamp(1.9rem,3.6vw,3.3rem)]",
                  )}
                >
                  {role.title}
                </SplitReveal>
                <Reveal delay={0.1}>
                  <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-fg-dim">
                    <span className="font-medium text-fg">{role.company}</span>
                    <span aria-hidden="true" className="h-px w-5 bg-line-strong" />
                    <span>{role.location}</span>
                  </p>
                  <p className="serif-accent mt-6 text-2xl leading-snug text-fg/90 sm:text-[1.75rem]">
                    {role.summary}
                  </p>
                </Reveal>

                <ul className="mt-8 space-y-4">
                  {role.highlights.map((h, i) => (
                    <Reveal
                      key={i}
                      as="li"
                      delay={0.15 + i * 0.06}
                      className="grid grid-cols-[1.25rem_1fr] text-[0.98rem] leading-relaxed text-fg-dim"
                    >
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-2.5 bg-accent" />
                      <span>{h}</span>
                    </Reveal>
                  ))}
                </ul>

                <Reveal delay={0.25}>
                  <ul aria-label="Technologies" className="mt-8 flex flex-wrap gap-2">
                    {role.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-line-strong px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-fg-dim"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
