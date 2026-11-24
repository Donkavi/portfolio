"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useExperience } from "@/components/providers/Providers";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { Magnetic } from "@/components/ui/Magnetic";
import { navItems, profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type SectionId = (typeof navItems)[number]["id"];

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const ids = navItems.map((n) => n.id);

export function Navbar() {
  const { introDone, scrollTo, setScrollLocked } = useExperience();
  const active = useActiveSection(ids) as SectionId;
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 400) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = useCallback(
    (id: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      setMenuOpen(false);
      // The menu keeps scroll locked until its exit animation ends — release it now.
      setScrollLocked(false);
      scrollTo(`#${id}`);
      history.replaceState(null, "", id === "home" ? " " : `#${id}`);
    },
    [scrollTo, setScrollLocked],
  );

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={introDone ? { y: hidden && !menuOpen ? -110 : 0, opacity: 1 } : undefined}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[80]"
      >
        <div
          className={cn(
            "transition-[background-color,border-color,backdrop-filter] duration-700",
            scrolled && !menuOpen
              ? "border-b border-line bg-bg/70 backdrop-blur-xl"
              : "border-b border-transparent",
          )}
        >
          <nav
            aria-label="Primary"
            className="container-x flex h-[4.5rem] items-center justify-between gap-6"
          >
            <a
              href="#home"
              onClick={go("home")}
              className="group flex items-center gap-3"
              aria-label={`${profile.displayName.first} ${profile.displayName.last} — back to top`}
            >
              <span className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-line-strong font-display text-sm font-semibold tracking-tight transition-colors duration-500 group-hover:border-accent group-hover:text-accent">
                {profile.initials}
              </span>
              <span className="hidden text-sm leading-tight sm:block">
                <span className="block font-medium">
                  {profile.displayName.first} {profile.displayName.last}
                </span>
                <span className="block text-xs text-muted">{profile.title}</span>
              </span>
            </a>

            <ul className="hidden items-center gap-1 rounded-full border border-line bg-bg/40 p-1 backdrop-blur-md lg:flex">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    aria-current={active === item.id ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-sm transition-colors duration-300",
                      active === item.id ? "text-accent-ink" : "text-fg-dim hover:text-fg",
                    )}
                  >
                    {active === item.id && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <Magnetic className="hidden sm:inline-block">
                <a
                  href="#contact"
                  onClick={go("contact")}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-5 text-sm transition-colors duration-500 hover:border-accent hover:text-accent"
                >
                  <span className="relative flex size-2">
                    <span className="absolute inset-0 rounded-full bg-accent animate-pulse-ring" />
                    <span className="relative size-2 rounded-full bg-accent" />
                  </span>
                  Let&apos;s talk
                </a>
              </Magnetic>

              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="relative z-[95] grid size-11 place-items-center rounded-full border border-line-strong bg-bg/40 backdrop-blur-md lg:hidden"
              >
                <span className="relative block h-3 w-5">
                  <span
                    className={cn(
                      "absolute left-0 h-px w-5 bg-fg transition-all duration-500 ease-[var(--ease-out-expo)]",
                      menuOpen ? "top-1.5 rotate-45" : "top-0",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 h-px bg-fg transition-all duration-500 ease-[var(--ease-out-expo)]",
                      menuOpen ? "top-1.5 w-5 -rotate-45" : "top-3 w-3",
                    )}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu active={active} onNavigate={go} onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
