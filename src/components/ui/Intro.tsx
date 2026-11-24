"use client";

import { useRef, useState } from "react";
import { useExperience } from "@/components/providers/Providers";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/portfolio";

/**
 * Short cinematic curtain (~1.6s): a counter and name, then the panel wipes
 * upward to reveal the hero. Skipped entirely for reduced-motion users.
 */
export function Intro() {
  const { markIntroDone, setScrollLocked } = useExperience();
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        markIntroDone();
        setGone(true);
        return;
      }

      setScrollLocked(true);
      window.scrollTo(0, 0);
      const count = { v: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onComplete: () => setGone(true),
      });

      tl.from("[data-intro-line]", { yPercent: 110, duration: 0.9, stagger: 0.08, ease: "expo.out" })
        .to(
          count,
          {
            v: 100,
            duration: 1.1,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current) counter.current.textContent = String(Math.round(count.v)).padStart(3, "0");
            },
          },
          0.1,
        )
        .to("[data-intro-bar]", { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0.1)
        .to("[data-intro-line]", { yPercent: -110, duration: 0.6, stagger: 0.04, ease: "expo.in" }, 1.25)
        .add(() => {
          setScrollLocked(false);
          markIntroDone();
        }, 1.55)
        .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.0 }, 1.5);
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      data-intro
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg-elev p-[var(--gutter)] [clip-path:inset(0%_0%_0%_0%)]"
    >
      <div className="flex items-start justify-between">
        <span className="split-line eyebrow">
          <span data-intro-line className="inline-block">
            Portfolio — {profile.location.country}
          </span>
        </span>
        <span className="split-line eyebrow">
          <span data-intro-line className="inline-block">
            {profile.title}
          </span>
        </span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="display text-[clamp(2.4rem,8vw,7rem)]">
          <span className="split-line block">
            <span data-intro-line className="inline-block">
              {profile.displayName.first}
            </span>
          </span>
          <span className="split-line block">
            <span data-intro-line className="inline-block text-muted">
              {profile.displayName.last}
            </span>
          </span>
        </div>
        <span className="split-line font-mono text-[clamp(2rem,6vw,5rem)] leading-none text-accent tabular-nums">
          <span data-intro-line className="inline-block">
            <span ref={counter}>000</span>
          </span>
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-line">
        <div data-intro-bar className="h-full origin-left scale-x-0 bg-accent" />
      </div>
    </div>
  );
}
