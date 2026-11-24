"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * A trailing ring that follows the native cursor (which stays visible for usability).
 * Grows over interactive elements and shows a label over [data-cursor-label] elements.
 * Only active on fine pointers without reduced motion.
 */
export function Cursor() {
  const enabled = useMediaQuery(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  );
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!enabled || !ring.current) return;
    const el = ring.current;
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { opacity: 1, duration: 0.3 });
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      const labelled = t?.closest<HTMLElement>("[data-cursor-label]");
      const interactive = t?.closest("a, button, [data-cursor='hover'], input, textarea, select");
      setLabel(labelled?.dataset.cursorLabel ?? null);
      setActive(Boolean(interactive || labelled));
    };
    const leave = () => {
      gsap.to(el, { opacity: 0, duration: 0.3 });
      shown = false;
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] will-change-transform"
    >
      <div
        className={cn(
          "grid place-items-center rounded-full border transition-[width,height,background-color,border-color] duration-500 ease-[var(--ease-out-expo)]",
          label
            ? "size-24 border-transparent bg-accent text-accent-ink"
            : active
              ? "size-14 border-accent/70 bg-accent/10"
              : "size-8 border-fg/40",
        )}
      >
        <span
          className={cn(
            "font-mono text-[0.65rem] uppercase tracking-[0.16em] transition-opacity duration-300",
            label ? "opacity-100" : "opacity-0",
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
