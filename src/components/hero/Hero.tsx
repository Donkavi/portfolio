"use client";

import Image from "next/image";
import { useRef } from "react";
import { useExperience } from "@/components/providers/Providers";
import { TechMarquee } from "@/components/hero/TechMarquee";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Button } from "@/components/ui/Button";
import { marqueeTech, profile } from "@/data/portfolio";
import { useLocalTime } from "@/hooks/useLocalTime";
import { gsap, MQ, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const chips = [
  { label: "LLM Agents", icon: "siLangchain", pos: "left-[2%] top-[14%]", depth: 38, delay: "0s" },
  { label: "Spring Boot", icon: "siSpringboot", pos: "right-[-2%] top-[30%]", depth: 52, delay: "-2s" },
  { label: "Angular", icon: "siAngular", pos: "left-[-4%] top-[50%]", depth: 46, delay: "-4s" },
  { label: "RAG · Weaviate", icon: undefined, pos: "right-[-6%] top-[64%]", depth: 30, delay: "-1s" },
];

export function Hero() {
  const { introDone, scrollTo } = useExperience();
  const root = useRef<HTMLElement>(null);
  const time = useLocalTime(profile.location.timezone);

  // ── Entrance choreography (runs once the intro curtain lifts) ──
  useGSAP(
    () => {
      if (!introDone) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const q = (sel: string) => root.current!.querySelectorAll<HTMLElement>(sel);
        const name = SplitText.create(q("[data-hero-name]"), { type: "words,chars", mask: "lines" });
        const title = SplitText.create(q("[data-hero-title]"), { type: "lines", mask: "lines" });

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.set("[data-reveal]", { visibility: "visible" })
          .from("[data-hero-glow]", { autoAlpha: 0, scale: 0.6, duration: 2.2 }, 0)
          .from("[data-hero-rings]", { autoAlpha: 0, scale: 0.7, rotate: -60, duration: 2.2 }, 0)
          .from(
            "[data-hero-portrait]",
            { clipPath: "inset(100% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut" },
            0.05,
          )
          .from("[data-hero-portrait] img", { scale: 1.3, yPercent: 8, duration: 2.2 }, 0.05)
          .from("[data-hero-eyebrow]", { autoAlpha: 0, x: -24, duration: 1 }, 0.35)
          .from(name.chars, { yPercent: 115, rotate: 4, duration: 1.3, stagger: 0.028 }, 0.4)
          .from(title.lines, { yPercent: 110, duration: 1.1, stagger: 0.08 }, 0.85)
          .from("[data-hero-copy]", { autoAlpha: 0, y: 24, duration: 1.1, stagger: 0.1 }, 1.0)
          .from(
            "[data-hero-chip]",
            { autoAlpha: 0, scale: 0.6, y: 20, duration: 1, stagger: 0.12, ease: "back.out(1.8)" },
            1.2,
          )
          .from("[data-hero-bottom]", { autoAlpha: 0, y: 20, duration: 1, stagger: 0.08 }, 1.3);

        return () => {
          name.revert();
          title.revert();
        };
      });

      // Scroll-out: layers drift at different speeds as the hero leaves.
      mm.add(MQ.motion, () => {
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-portrait-wrap]", { yPercent: 18, scale: 1.06, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-text]", { yPercent: -14, autoAlpha: 0.15, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-rings-scroll]", { rotate: 50, scale: 1.15, ease: "none", scrollTrigger: st });
        ScrollTrigger.refresh();
      });

      // Mouse-follow parallax (desktop, fine pointer only).
      mm.add(`${MQ.desktop} and ${MQ.finePointer}`, () => {
        const layers = gsap.utils.toArray<HTMLElement>("[data-depth]").map((el) => ({
          depth: Number(el.dataset.depth),
          x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => {
            l.x(nx * l.depth);
            l.y(ny * l.depth);
          });
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [introDone] },
  );

  return (
    <section
      ref={root}
      id="home"
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[4.5rem]"
    >
      {/* ── Background ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] [background-size:clamp(64px,8vw,120px)_clamp(64px,8vw,120px)] [mask-image:radial-gradient(ellipse_70%_60%_at_65%_40%,black,transparent)] opacity-60" />
        <div className="absolute -left-[10%] top-[-20%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgb(80_110_255/0.10),transparent_60%)]" />
      </div>

      <div className="container-x relative grid flex-1 grid-cols-1 items-center gap-y-6 pb-6 pt-8 lg:grid-cols-12 lg:pt-0">
        {/* ── Text column ── */}
        <div data-hero-text data-depth="-10" className="relative z-20 order-2 -mt-[9svh] lg:order-1 lg:col-span-7 lg:mt-0 lg:pb-24">
          <p data-reveal data-hero-eyebrow className="eyebrow mb-6 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            Hello, I&apos;m
          </p>

          <h1 data-reveal className="display text-[clamp(3rem,min(7.4vw,14svh),8.6rem)]">
            <span data-hero-name className="block">
              {profile.displayName.first}
            </span>
            <span data-hero-name className="block text-fg/90">
              {profile.displayName.last}
              <span className="text-accent">.</span>
            </span>
            <span className="sr-only">
              {" "}
              — {profile.title} ({profile.fullName})
            </span>
          </h1>

          <p
            data-reveal
            data-hero-title
            aria-hidden="true"
            className="mt-6 font-display text-[clamp(1.5rem,3.2vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.03em]"
          >
            Senior <span className="serif-accent text-accent">Software</span> Engineer
          </p>

          <p
            data-reveal
            data-hero-copy
            className="mt-6 max-w-[34rem] text-base leading-relaxed text-fg-dim sm:text-lg"
          >
            {profile.heroIntro}
          </p>

          <div data-reveal data-hero-copy className="mt-9 flex flex-wrap items-center gap-3">
            <Button
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#projects");
              }}
            >
              Explore My Work
            </Button>
            <Button
              href="#contact"
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
            >
              Let&apos;s Connect
            </Button>
          </div>
        </div>

        {/* ── Portrait column ── */}
        <div className="relative order-1 mx-auto h-[min(50svh,480px)] w-full max-w-[520px] self-end lg:absolute lg:self-stretch lg:bottom-0 lg:top-2 lg:right-[max(var(--gutter),calc((100vw-1480px)/2+var(--gutter)))] lg:mx-0 lg:h-auto lg:w-[min(42vw,640px)] lg:max-w-none">
          {/* glow */}
          <div
            data-reveal
            data-hero-glow
            data-depth="14"
            aria-hidden="true"
            className="absolute left-1/2 top-[34%] aspect-square w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgb(200_240_74/0.30),rgb(200_240_74/0.06)_45%,transparent_70%)] blur-2xl"
          />
          {/* rings */}
          <div
            data-depth="22"
            aria-hidden="true"
            className="absolute left-1/2 top-[34%] aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2"
          >
            <div data-hero-rings-scroll className="size-full">
            <div data-reveal data-hero-rings className="size-full">
            <svg viewBox="0 0 400 400" className="animate-spin-slow size-full">
              <circle cx="200" cy="200" r="198" fill="none" stroke="var(--line-strong)" />
              <circle cx="200" cy="200" r="150" fill="none" stroke="var(--line)" strokeDasharray="2 6" />
              <circle cx="200" cy="200" r="100" fill="none" stroke="var(--line)" />
              <path d="M200 2 A198 198 0 0 1 398 200" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
              <circle cx="398" cy="200" r="4" fill="var(--accent)" />
              <circle cx="58" cy="94" r="2.5" fill="var(--fg)" opacity="0.5" />
            </svg>
            </div>
            </div>
          </div>

          {/* portrait */}
          <div data-hero-portrait-wrap className="absolute inset-0 origin-bottom">
            <div data-depth="10" className="absolute inset-0">
              <div
                data-reveal
                data-hero-portrait
                className="absolute inset-0 [clip-path:inset(0%_0%_0%_0%)] [mask-image:linear-gradient(to_bottom,black_78%,transparent)]"
              >
                <Image
                  src="/images/profile/portrait-cutout.png"
                  alt={`Portrait of ${profile.displayName.first} ${profile.displayName.last}`}
                  fill
                  preload
                  sizes="(min-width: 1024px) 42vw, 90vw"
                  quality={90}
                  className="object-contain object-bottom drop-shadow-[0_30px_60px_rgb(0_0_0/0.55)]"
                />
              </div>
            </div>
          </div>

          {/* floating tech chips */}
          <div aria-hidden="true" className="absolute inset-0 hidden sm:block">
            {chips.map((c) => (
              <div key={c.label} data-depth={c.depth} className={cn("absolute", c.pos)}>
                <div data-reveal data-hero-chip>
                  <div
                    className="animate-float flex items-center gap-2 rounded-full border border-line-strong bg-bg/50 py-2 pl-2 pr-4 text-xs font-medium backdrop-blur-md"
                    style={{ animationDelay: c.delay }}
                  >
                    <span className="grid size-6 place-items-center rounded-full bg-fg/10 text-accent">
                      <BrandIcon icon={c.icon} name={c.label} className="size-3.5" />
                    </span>
                    {c.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* coordinates */}
          <p
            data-reveal
            data-hero-chip
            aria-hidden="true"
            className="eyebrow absolute -right-2 top-[8%] hidden origin-top-right translate-x-full rotate-90 whitespace-nowrap xl:block"
          >
            {profile.location.coords}
          </p>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-20 border-t border-line bg-bg/60 backdrop-blur-sm">
        <div className="container-x grid grid-cols-2 items-center gap-4 py-4 text-sm md:grid-cols-3">
          <div data-reveal data-hero-bottom className="flex items-center gap-3">
            <span className="relative flex size-2.5">
              <span className="animate-pulse-ring absolute inset-0 rounded-full bg-accent" />
              <span className="relative size-2.5 rounded-full bg-accent" />
            </span>
            <span>
              <span className="block leading-tight">Based in {profile.location.country}</span>
              <span className="block font-mono text-xs text-muted tabular-nums">
                {time ? `${time} · GMT+5:30` : "GMT+5:30"}
              </span>
            </span>
          </div>

          <button
            type="button"
            data-reveal
            data-hero-bottom
            onClick={() => scrollTo("#about")}
            className="group hidden items-center justify-center gap-3 justify-self-center text-muted transition-colors hover:text-fg md:flex"
          >
            <span className="relative h-9 w-[1.35rem] overflow-hidden rounded-full border border-line-strong">
              <span className="animate-scroll-cue absolute left-1/2 top-1.5 h-2 w-px -translate-x-1/2 bg-accent" />
            </span>
            <span className="eyebrow group-hover:text-fg">Scroll to explore</span>
          </button>

          <p data-reveal data-hero-bottom className="justify-self-end text-right">
            <span className="block leading-tight">Currently</span>
            <span className="block text-xs text-muted">
              {profile.title} · {profile.company}
            </span>
          </p>
        </div>
        <div data-reveal data-hero-bottom className="border-t border-line py-4">
          <TechMarquee items={marqueeTech} />
        </div>
      </div>
    </section>
  );
}
