"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Reveal, staggerChild, staggerParent } from "@/components/animations/Reveal";
import { SplitReveal } from "@/components/animations/SplitReveal";
import { StatCounter } from "@/components/about/StatCounter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { certifications, education, profile } from "@/data/portfolio";
import { pad2 } from "@/lib/utils";

export function Education() {
  const [degree, ...school] = education;

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative border-t border-line py-[clamp(6rem,14vw,12rem)]"
    >
      <div className="container-x">
        <SectionLabel index="06">Education</SectionLabel>
        <SplitReveal
          as="h2"
          id="education-heading"
          className="display mt-10 max-w-[14ch] text-[clamp(2.6rem,6.6vw,6.4rem)]"
        >
          Foundations &amp; <span className="serif-accent text-accent">milestones.</span>
        </SplitReveal>

        {/* Degree feature */}
        <Reveal className="mt-16">
          <article className="relative grid overflow-hidden rounded-[6px] border border-line bg-bg-elev lg:grid-cols-12">
            <div className="relative flex flex-col justify-between gap-10 border-b border-line p-8 sm:p-12 lg:col-span-5 lg:border-b-0 lg:border-r">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-20 -top-20 size-80 rounded-full bg-[radial-gradient(circle,rgb(200_240_74/0.18),transparent_65%)]"
              />
              <p className="eyebrow relative">Cumulative GPA</p>
              <p className="relative">
                <StatCounter
                  stat={{ value: "3.71", numeric: 3.71, decimals: 2, label: "CGPA", note: "" }}
                  className="display block text-[clamp(5rem,12vw,10rem)] leading-[0.85] text-accent"
                />
                <span className="mt-3 block font-mono text-sm text-muted">/ 4.00</span>
              </p>
              <p className="relative font-display text-2xl font-medium tracking-tight">First Class Honours</p>
            </div>
            <div className="p-8 sm:p-12 lg:col-span-7">
              <div className="flex items-start justify-between gap-6">
                <span className="grid size-12 place-items-center rounded-full border border-line-strong text-accent">
                  <GraduationCap className="size-5" />
                </span>
                <span className="font-mono text-sm text-fg-dim tabular-nums">{degree.period}</span>
              </div>
              <h3 className="display mt-10 text-[clamp(2rem,3.6vw,3.2rem)] leading-[1]">
                {degree.qualification}
              </h3>
              <p className="serif-accent mt-3 text-2xl text-fg/90">{degree.specialisation}</p>
              <p className="mt-6 text-fg-dim">{degree.institution}</p>
              <ul className="mt-8 space-y-3 border-t border-line pt-6">
                {degree.highlights.map((h) => (
                  <li key={h} className="grid grid-cols-[1.25rem_1fr] text-fg-dim">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-2.5 bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>

        {/* School */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {school.map((e, i) => (
            <Reveal key={e.qualification} delay={i * 0.08}>
              <article className="h-full rounded-[6px] border border-line p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-medium tracking-tight">{e.qualification}</h3>
                  <span className="shrink-0 font-mono text-xs text-muted tabular-nums">{e.period}</span>
                </div>
                <p className="mt-2 text-fg-dim">{e.institution}</p>
                {e.specialisation && <p className="mt-1 text-sm text-muted">{e.specialisation}</p>}
                {e.highlights.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {e.highlights.map((h) => (
                      <li key={h} className="rounded-full border border-line-strong px-3 py-1 text-xs text-fg-dim">
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {/* Certifications + languages */}
        <div className="mt-[clamp(5rem,10vw,8rem)] grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h3 className="font-display text-3xl font-medium tracking-tight">
              Certifications &amp; professional development
            </h3>
            <p className="mt-4 text-fg-dim">
              Continuous learning across software processes, programming foundations, systems and
              networking.
            </p>
            <div className="mt-10 border-t border-line pt-6">
              <p className="eyebrow">Languages</p>
              <ul className="mt-4 space-y-2">
                {profile.languages.map((l) => (
                  <li key={l.name} className="flex items-baseline justify-between">
                    <span className="font-display text-xl">{l.name}</span>
                    <span className="text-sm text-muted">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <motion.ol
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="border-t border-line lg:col-span-7 lg:col-start-6"
          >
            {certifications.map((c, i) => (
              <motion.li key={c.name} variants={staggerChild} className="group relative border-b border-line">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-left scale-x-0 bg-accent-soft transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
                <div className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 py-5 sm:grid-cols-[2.5rem_1fr_auto] sm:items-baseline">
                  <span className="font-mono text-xs text-accent">{pad2(i + 1)}</span>
                  <span className="text-lg leading-snug transition-transform duration-500 group-hover:translate-x-1">
                    {c.name}
                  </span>
                  <span className="col-start-2 mt-1 text-sm text-muted sm:col-start-3 sm:mt-0 sm:text-right">
                    {c.issuer}
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
