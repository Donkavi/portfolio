"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span";

/**
 * Masked line-by-line text reveal on scroll (GSAP SplitText + ScrollTrigger).
 * Re-splits automatically on resize; renders plain text for reduced motion.
 */
export function SplitReveal({
  id,
  as = "div",
  children,
  className,
  delay = 0,
  stagger = 0.09,
  start = "top 85%",
  type = "lines",
}: {
  id?: string;
  as?: Tag;
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  start?: string;
  type?: "lines" | "words";
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const split = SplitText.create(el, {
          type: type === "lines" ? "lines" : "words,lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(type === "lines" ? self.lines : self.words, {
              yPercent: 115,
              duration: 1.2,
              stagger,
              delay,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start, once: true },
            });
          },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const Comp = as as ElementType;
  return (
    <Comp ref={ref} id={id} className={className}>
      {children}
    </Comp>
  );
}
