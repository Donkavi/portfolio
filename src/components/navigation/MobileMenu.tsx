"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useExperience } from "@/components/providers/Providers";
import { LinkedInIcon } from "@/components/ui/BrandIcon";
import { navItems, profile } from "@/data/portfolio";
import { cn, pad2 } from "@/lib/utils";

export function MobileMenu({
  active,
  onNavigate,
  onClose,
}: {
  active: string;
  onNavigate: (id: string) => (e: React.MouseEvent) => void;
  onClose: () => void;
}) {
  const { setScrollLocked } = useExperience();
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setScrollLocked(true);
    firstLink.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      setScrollLocked(false);
    };
  }, [onClose, setScrollLocked]);

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={{ clipPath: "circle(0% at calc(100% - 2.6rem) 2.25rem)" }}
      animate={{ clipPath: "circle(150% at calc(100% - 2.6rem) 2.25rem)" }}
      exit={{ clipPath: "circle(0% at calc(100% - 2.6rem) 2.25rem)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[75] flex flex-col justify-between bg-bg-elev px-[var(--gutter)] pb-10 pt-28 lg:hidden"
    >
      <nav aria-label="Mobile">
        <ul className="space-y-1">
          {navItems.map((item, i) => (
            <li key={item.id} className="overflow-hidden">
              <motion.a
                ref={i === 0 ? firstLink : undefined}
                href={`#${item.id}`}
                onClick={onNavigate(item.id)}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                exit={{ y: "110%" }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "display flex items-baseline gap-4 py-1 text-[clamp(2.6rem,12vw,4.5rem)]",
                  active === item.id ? "text-accent" : "text-fg",
                )}
              >
                <span className="font-mono text-xs tracking-normal text-muted">{pad2(i + 1)}</span>
                {item.label}
              </motion.a>
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.45, duration: 0.7 }}
        className="space-y-4 border-t border-line pt-6"
      >
        <a href={`mailto:${profile.email}`} className="block break-all text-lg">
          {profile.email}
        </a>
        <div className="flex items-center justify-between text-sm text-muted">
          <span>
            {profile.location.city}, {profile.location.country}
          </span>
          {profile.links.linkedin.href && (
            <a
              href={profile.links.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-fg"
            >
              <LinkedInIcon className="size-4" /> LinkedIn
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
