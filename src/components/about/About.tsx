"use client";

import Image from "next/image";
import { useRef } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { StatCounter } from "@/components/about/StatCounter";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { about, profile, stats } from "@/data/portfolio";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn, pad2 } from "@/lib/utils";

export function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // Heading words "light up" as the reader scrolls through them.
        gsap.fromTo(
          "[data-about-word]",
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-about-heading]",
              start: "top 80%",
              end: "bottom 45%",
              scrub: true,
            },
          },
        );

        // Photo: mask reveal + inner parallax.
        gsap.fromTo(
          "[data-about-photo]",
          { clipPath: "inset(18% 12% 18% 12% round 4px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 4px)",
            ease: "none",
            scrollTrigger: { trigger: "[data-about-photo]", start: "top 90%", end: "center 55%", scrub: true },
          },
        );
        gsap.fromTo(
          "[data-about-photo] img",
          { yPercent: -8, scale: 1.18 },
          {
            yPercent: 8,
            scale: 1.05,
            ease: "none",
            scrollTrigger: { trigger: "[data-about-photo]", start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="about"
      aria-labelledby="about-heading"
      className="relative py-[clamp(6rem,14vw,12rem)]"
    >
      <div className="container-x">
        <SectionLabel index="01">About</SectionLabel>

        <h2
          id="about-heading"
          data-about-heading
          className="display mt-10 max-w-[15ch] text-[clamp(2.6rem,7.4vw,7.2rem)] leading-[0.98]"
        >
          {about.heading.map((w, i) => (
            <span key={i} data-about-word className={cn("inline-block", w.accent && "serif-accent text-accent")}>
              {w.text}
              {i < about.heading.length - 1 && " "}
            </span>
          ))}
        </h2>

        <div className="mt-[clamp(4rem,9vw,8rem)] grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Photo */}
          <figure className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <div
              data-about-photo
              className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-bg-soft"
            >
              <Image
                src="/images/profile/portrait-street.jpg"
                alt={`${profile.displayName.first} standing under string lights on a quiet street at night`}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover object-[50%_35%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between text-sm">
                <span>
                  <span className="block font-medium">{profile.fullName}</span>
                  <span className="block text-xs text-fg-dim">
                    {profile.title} · {profile.location.country}
                  </span>
                </span>
                <span className="eyebrow text-fg-dim">Off the clock</span>
              </figcaption>
            </div>
          </figure>

          {/* Narrative */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="space-y-6 text-lg leading-relaxed text-fg-dim sm:text-xl">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08} as="p">
                  {p}
                </Reveal>
              ))}
            </div>

            <dl className="mt-14 grid grid-cols-1 border-t border-line sm:grid-cols-3">
              {stats.map((s, i) => (
                <Reveal
                  key={s.label}
                  delay={i * 0.1}
                  className={cn(
                    "border-b border-line py-6 sm:border-b-0 sm:pr-6",
                    i > 0 && "sm:border-l sm:pl-6",
                  )}
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <StatCounter stat={s} className="display block text-[clamp(2.8rem,5vw,4.2rem)] text-fg" />
                    <span className="mt-2 block text-sm font-medium">{s.label}</span>
                    <span className="mt-1 block text-xs text-muted">{s.note}</span>
                  </dd>
                </Reveal>
              ))}
            </dl>

            <div className="mt-16">
              <p className="eyebrow mb-6">How I work</p>
              <ol className="border-t border-line">
                {about.approach.map((a, i) => (
                  <Reveal key={a.title} as="li" delay={i * 0.06} className="group relative border-b border-line">
                    <span
                      aria-hidden="true"
                      className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                    />
                    <div className="grid grid-cols-[3rem_1fr] gap-x-4 py-6 sm:grid-cols-[3rem_14rem_1fr]">
                      <span className="font-mono text-xs text-accent">{pad2(i + 1)}</span>
                      <h3 className="font-display text-xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-1">
                        {a.title}
                      </h3>
                      <p className="col-start-2 mt-2 text-sm leading-relaxed text-muted sm:col-start-3 sm:mt-0">
                        {a.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
