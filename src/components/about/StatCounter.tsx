"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { Stat } from "@/types/portfolio";

/** Counts up to the stat's value when scrolled into view. Server-renders the final value. */
export function StatCounter({ stat, className }: { stat: Stat; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce || stat.numeric === undefined || !ref.current) return;
    const el = ref.current;
    const decimals = stat.decimals ?? 0;
    const controls = animate(0, stat.numeric, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${v.toFixed(decimals)}${stat.suffix ?? ""}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, stat]);

  return (
    <span ref={ref} className={className}>
      {stat.value}
    </span>
  );
}
