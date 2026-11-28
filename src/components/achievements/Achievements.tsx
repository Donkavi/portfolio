"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Award, BookOpenText } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { StatCounter } from "@/components/about/StatCounter";
import { Reveal, staggerChild, staggerParent } from "@/components/animations/Reveal";
import { SplitReveal } from "@/components/animations/SplitReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { honours, publication, researchShowcase } from "@/data/portfolio";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { pad2 } from "@/lib/utils";

/** Deterministic bar heights (0.18–1) so server and client render the same waveform. */
const BARS = Array.from({ length: 56 }, (_, i) => {
  const burst = i >= 22 && i <= 35; // the "termite activity" window
  const base = Math.abs(Math.sin(i * 0.83) * Math.cos(i * 0.31));
  // Rounded so server and client serialise the same inline style.
  const h = Math.round((burst ? 0.55 + 0.45 * base : 0.18 + 0.4 * base) * 1000) / 10;
  return { h, burst };
});

export function Achievements() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // Waveform: bars rise from the centre line, then keep "listening".
        const wave = root.current!.querySelector<HTMLElement>("[data-wave]");
        if (wave) {
          const bars = gsap.utils.toArray<HTMLElement>(wave.querySelectorAll("[data-bar]"));
          let introDone = false;
          let inView = false;

          // Idle loop: every bar breathes on its own cycle, and a scan line sweeps across.
          const idle = gsap.timeline({ paused: true });
          bars.forEach((bar, i) => {
            idle.to(
              bar,
              {
                scaleY: "random(0.45, 1.05)",
                duration: "random(0.45, 0.8)",
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                repeatRefresh: true,
              },
              (i % 8) * 0.06,
            );
          });
          idle.fromTo(
            wave.querySelector("[data-scan]"),
            { xPercent: -100, opacity: 1 },
            { xPercent: 100, duration: 2.8, ease: "power1.inOut", repeat: -1, repeatDelay: 1.6 },
            0,
          );

          gsap.from(bars, {
            scaleY: 0,
            duration: 1.2,
            stagger: { each: 0.018, from: "center" },
            scrollTrigger: { trigger: wave, start: "top 85%", once: true },
            onComplete: () => {
              introDone = true;
              if (inView) idle.play();
            },
          });
          gsap.timeline({
            scrollTrigger: {
              trigger: wave,
              start: "top bottom",
              end: "bottom top",
              onToggle: (self) => {
                inView = self.isActive;
                if (!introDone) return;
                if (inView) idle.play();
                else idle.pause();
              },
            },
          });
        }

        // Showcase photos: unmask upward, then drift with scroll.
        gsap.utils.toArray<HTMLElement>("[data-photo]").forEach((frame, i) => {
          const img = frame.querySelector("img");
          gsap.fromTo(
            frame,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.5,
              delay: i * 0.15,
              ease: "expo.inOut",
              scrollTrigger: { trigger: frame, start: "top 85%", once: true },
            },
          );
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -6, scale: 1.18 },
              {
                yPercent: 6,
                scale: 1.08,
                ease: "none",
                scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          }
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const [firstClass, deansList] = honours;

  return (
    <section
      ref={root}
      id="achievements"
      aria-labelledby="achievements-heading"
      className="relative overflow-hidden border-t border-line py-[clamp(6rem,14vw,12rem)]"
    >
      <div className="container-x">
        <SectionLabel index="05">Achievements</SectionLabel>
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <SplitReveal
            as="h2"
            id="achievements-heading"
            className="display text-[clamp(2.6rem,6.6vw,6.4rem)] lg:col-span-8"
          >
            Research, recognition &amp; <span className="serif-accent text-accent">honours.</span>
          </SplitReveal>
          <Reveal className="self-end lg:col-span-4" delay={0.1}>
            <p className="text-lg leading-relaxed text-fg-dim">
              A first-author journal paper, a research project recognised for innovation, and a
              degree finished with First Class Honours.
            </p>
          </Reveal>
        </div>

        {/* ── Publication ─────────────────────────────────────────── */}
        <Reveal className="mt-16" amount={0.15}>
          <article className="relative grid overflow-hidden rounded-[6px] border border-line bg-bg-elev lg:grid-cols-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-[radial-gradient(circle,rgb(200_240_74/0.12),transparent_65%)]"
            />
            <div className="relative flex flex-col p-8 sm:p-12 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-ink">
                  <BookOpenText className="size-3.5" /> Journal publication
                </span>
                <span className="rounded-full border border-line-strong px-3 py-1 text-xs text-fg-dim">
                  First author
                </span>
                <span className="font-mono text-xs text-muted">{publication.year}</span>
              </div>

              <h3 className="mt-8 font-display text-[clamp(1.6rem,2.6vw,2.5rem)] font-medium leading-[1.08] tracking-tight">
                {publication.title}
              </h3>
              <p className="mt-4">
                <span className="serif-accent text-xl text-accent">{publication.venue}</span>
                <span className="text-sm text-muted"> · {publication.status}</span>
              </p>

              <p className="mt-8 text-lg leading-relaxed text-fg">{publication.summary}</p>
              <p className="mt-4 leading-relaxed text-fg-dim">{publication.method}</p>

              <ul aria-label="Authors" className="mt-8 flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted">
                {publication.authors.map((a, i) => (
                  <li key={a}>
                    <span className={a === publication.me ? "font-medium text-fg underline decoration-accent decoration-2 underline-offset-4" : undefined}>
                      {a}
                    </span>
                    {i < publication.authors.length - 1 && ","}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-center gap-6 pt-10">
                {publication.links.map((l, i) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      i === 0
                        ? "group/btn inline-flex items-center gap-3 text-sm font-medium"
                        : "inline-flex items-center gap-1 text-sm text-fg-dim hover:text-accent"
                    }
                  >
                    {i === 0 ? (
                      <>
                        <span className="grid size-10 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover/btn:-rotate-45 group-hover/btn:border-accent group-hover/btn:bg-accent group-hover/btn:text-accent-ink">
                          <ArrowUpRight className="size-4" />
                        </span>
                        {l.label}
                      </>
                    ) : (
                      <>
                        {l.label} <ArrowUpRight className="size-3.5" />
                      </>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Acoustic signal + results */}
            <div className="relative flex flex-col border-t border-line lg:col-span-5 lg:border-l lg:border-t-0">
              <div data-wave className="relative flex-1 overflow-hidden p-8 sm:p-10">
                <div className="flex items-center justify-between">
                  <p className="eyebrow">Trunk acoustics</p>
                  <span className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-wider text-accent">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full rounded-full bg-accent opacity-70 motion-safe:animate-ping" />
                      <span className="relative inline-flex size-2 rounded-full bg-accent" />
                    </span>
                    Listening
                  </span>
                </div>
                <div aria-hidden="true" className="relative mt-14 flex h-40 items-center gap-[3px]">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-line" />
                  {BARS.map((b, i) => (
                    <span
                      key={i}
                      data-bar
                      className={`relative w-full flex-1 rounded-full ${b.burst ? "bg-accent" : "bg-fg/25"}`}
                      style={{ height: `${b.h}%` }}
                    />
                  ))}
                  <span className="pointer-events-none absolute inset-0 overflow-hidden">
                    <span
                      data-scan
                      className="absolute inset-y-0 left-0 w-full opacity-0 bg-[linear-gradient(90deg,transparent_85%,rgb(200_240_74/0.14)_99.4%,var(--accent)_100%)]"
                    />
                  </span>
                  <span className="absolute -top-7 left-[39%] flex w-[25%] justify-center whitespace-nowrap border-b border-dashed border-accent/60 pb-1 font-mono text-[0.6rem] uppercase tracking-wider text-accent">
                    Termite activity
                  </span>
                </div>
                <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-wider text-muted">
                  Spectrogram → CNN → severity score
                </p>
              </div>

              <dl className="grid grid-cols-2 border-t border-line">
                {publication.metrics.map((m, i) => (
                  <div
                    key={m.label}
                    className={`p-6 sm:p-8 ${i % 2 === 0 ? "border-r border-line" : ""} ${i < 2 ? "border-b border-line" : ""}`}
                  >
                    <dt className="eyebrow">{m.label}</dt>
                    <dd className="mt-2">
                      <StatCounter stat={m} className="display text-[clamp(2rem,3.2vw,3rem)] tabular-nums" />
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="border-t border-line px-6 py-4 text-xs text-muted sm:px-8">
                Held-out test set · 2,000 ten-second field recordings from Pundaluoya
              </p>
            </div>
          </article>
        </Reveal>

        {/* ── Research showcase ───────────────────────────────────── */}
        <div className="mt-[clamp(5rem,10vw,8rem)] grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow flex items-center gap-2">
                <Award className="size-3.5 text-accent" /> Final-year research showcase
              </p>
              <h3 className="display mt-6 text-[clamp(2rem,3.4vw,3.3rem)] leading-[0.98]">
                {researchShowcase.title}
              </h3>
              <p className="mt-6 leading-relaxed text-fg-dim">{researchShowcase.summary}</p>
              <p className="mt-4 leading-relaxed text-fg-dim">{researchShowcase.detail}</p>
              <p className="mt-6 border-l-2 border-accent pl-4 text-sm text-fg">{researchShowcase.outcome}</p>
            </Reveal>
            <motion.ul
              aria-label="Research focus"
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {researchShowcase.tags.map((t) => (
                <motion.li
                  key={t}
                  variants={staggerChild}
                  className="rounded-full border border-line-strong px-3 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-fg-dim"
                >
                  {t}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            {researchShowcase.photos.map((p, i) => (
              <figure key={p.src} className={i === 1 ? "sm:mt-16" : undefined}>
                <div
                  data-photo
                  className="group relative aspect-[4/3] overflow-hidden rounded-[6px] border border-line bg-bg-soft"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-[filter] duration-700 group-hover:brightness-110"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[0.68rem] text-white/80 backdrop-blur-sm">
                    {pad2(i + 1)} / {pad2(researchShowcase.photos.length)}
                  </span>
                </div>
                <figcaption className="mt-3 flex items-center gap-3 text-sm text-muted">
                  <span aria-hidden="true" className="h-px w-6 bg-accent" />
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* ── Academic honours ────────────────────────────────────── */}
        <div className="mt-[clamp(5rem,10vw,8rem)] grid gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-[6px] border border-line bg-bg-elev p-8 sm:p-12">
              <p className="eyebrow">SLIIT · Class of 2024</p>
              <h3 className="display mt-10 max-w-[8ch] text-[clamp(2.8rem,5vw,4.6rem)]">{firstClass.title}</h3>
              <p className="mt-6 max-w-[34ch] text-fg-dim">{firstClass.detail}</p>
              <div className="mt-auto flex items-end justify-between gap-6 pt-10">
                <p>
                  <StatCounter
                    stat={firstClass.stat}
                    className="display block text-[clamp(4rem,7vw,6rem)] leading-[0.85] text-accent tabular-nums"
                  />
                  <span className="mt-3 block font-mono text-sm text-muted">
                    {firstClass.stat.note} {firstClass.stat.label}
                  </span>
                </p>
                <Seal />
              </div>
            </article>
          </Reveal>

          <Reveal className="h-full" delay={0.1}>
            <article className="relative flex h-full flex-col overflow-hidden rounded-[6px] border border-line bg-bg-elev p-8 sm:p-12">
              <p className="eyebrow">Academic excellence</p>
              <h3 className="display mt-10 text-[clamp(2.8rem,5vw,4.6rem)]">{deansList.title}</h3>
              <p className="mt-6 max-w-[34ch] text-fg-dim">{deansList.detail}</p>

              <div className="mt-auto flex items-end justify-between gap-8 pt-10">
                <p className="flex items-baseline gap-3">
                  <StatCounter
                    stat={deansList.stat}
                    className="display text-[clamp(4rem,7vw,6rem)] leading-[0.85] text-accent tabular-nums"
                  />
                  <span className="font-mono text-sm text-muted">{deansList.stat.note}</span>
                </p>
                <motion.ol
                  aria-hidden="true"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } } }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.6 }}
                  className="flex h-24 items-end gap-2"
                >
                  {Array.from({ length: deansList.stat.numeric ?? 0 }, (_, i) => (
                    <li key={i} className="relative h-full w-3 overflow-hidden rounded-full bg-line">
                      <motion.span
                        variants={{
                          hidden: { scaleY: 0 },
                          show: { scaleY: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
                        }}
                        className="absolute inset-0 origin-bottom rounded-full bg-accent"
                        style={{ opacity: 0.45 + i * 0.11 }}
                      />
                    </li>
                  ))}
                </motion.ol>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Slowly rotating "First Class Honours" seal. */
function Seal() {
  const text = "FIRST CLASS HONOURS · SLIIT · SOFTWARE ENGINEERING · ";
  return (
    <div aria-hidden="true" className="pointer-events-none relative size-28 shrink-0 sm:size-32">
      <svg viewBox="0 0 200 200" className="size-full motion-safe:animate-[spin_28s_linear_infinite]">
        <defs>
          <path id="seal-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="var(--line-strong)" />
        <circle cx="100" cy="100" r="62" fill="none" stroke="var(--line)" />
        <text className="fill-fg-dim font-mono" fontSize="11.5" letterSpacing="2.2">
          <textPath href="#seal-circle">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto grid size-12 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110">
        <Award className="size-5" />
      </span>
    </div>
  );
}
