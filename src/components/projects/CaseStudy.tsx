"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useExperience } from "@/components/providers/Providers";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { pad2 } from "@/lib/utils";
import type { Project } from "@/types/portfolio";

const ease = [0.76, 0, 0.24, 1] as const;

export function CaseStudy({
  project: p,
  index,
  onClose,
}: {
  project: Project;
  index: number;
  onClose: () => void;
}) {
  const { setScrollLocked } = useExperience();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScrollLocked(true);
    closeBtn.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Minimal focus trap.
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a[href], button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      setScrollLocked(false);
    };
  }, [onClose, setScrollLocked]);

  const sections = [
    { label: "The problem", body: p.problem },
    { label: "My contribution", body: p.contribution },
    ...(p.outcome ? [{ label: "Outcome", body: p.outcome }] : []),
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[85] flex items-end justify-center"
      initial="closed"
      animate="open"
      exit="closed"
    >
      <motion.button
        type="button"
        aria-label="Close case study"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
        transition={{ duration: 0.6 }}
      />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`case-${p.slug}`}
        data-lenis-prevent
        variants={{
          open: { clipPath: "inset(0% 0% 0% 0% round 10px 10px 0 0)" },
          closed: { clipPath: "inset(100% 0% 0% 0% round 10px 10px 0 0)" },
        }}
        transition={{ duration: 0.9, ease }}
        className="relative h-[92svh] w-full max-w-[1400px] overflow-y-auto overscroll-contain bg-bg-elev"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg-elev/90 px-[var(--gutter)] py-4 backdrop-blur-md">
          <span className="eyebrow">
            Case study {pad2(index + 1)} — {p.category}
          </span>
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            className="group grid size-11 place-items-center rounded-full border border-line-strong transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
          >
            <X className="size-4 transition-transform duration-500 group-hover:rotate-90" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <motion.div
          variants={{ open: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } }, closed: {} }}
          className="px-[var(--gutter)] pb-20 pt-10"
        >
          <motion.h2
            id={`case-${p.slug}`}
            variants={fade}
            className="display max-w-[18ch] text-[clamp(2.4rem,6vw,5.6rem)]"
          >
            {p.name}
          </motion.h2>
          <motion.p variants={fade} className="mt-4 text-fg-dim">
            {p.context}
            {p.year ? ` · ${p.year}` : ""}
          </motion.p>

          <motion.div variants={fade} className="mt-10 aspect-[16/8] overflow-hidden rounded-[6px] border border-line">
            {p.screenshots[0] ? (
              <div className="relative size-full">
                <Image src={p.screenshots[0].src} alt={p.screenshots[0].alt} fill className="object-cover" sizes="90vw" />
              </div>
            ) : (
              <ProjectVisual kind={p.visual} />
            )}
          </motion.div>

          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <motion.p variants={fade} className="text-xl leading-relaxed text-fg lg:col-span-5">
              {p.description}
            </motion.p>
            <div className="space-y-10 lg:col-span-6 lg:col-start-7">
              {sections.map((s) => (
                <motion.div key={s.label} variants={fade} className="border-t border-line pt-5">
                  <h3 className="eyebrow text-accent">{s.label}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-fg-dim">{s.body}</p>
                </motion.div>
              ))}
              <motion.div variants={fade} className="border-t border-line pt-5">
                <h3 className="eyebrow text-accent">Technologies</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <li key={t} className="rounded-full border border-line-strong px-3 py-1 text-sm text-fg-dim">
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
              {(p.github || p.live) && (
                <motion.div variants={fade} className="flex flex-wrap gap-4 border-t border-line pt-5">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-accent">
                      View source <ArrowUpRight className="size-4" />
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-accent">
                      Visit live site <ArrowUpRight className="size-4" />
                    </a>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const fade = {
  open: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  closed: { opacity: 0, y: 24, transition: { duration: 0.3 } },
};
