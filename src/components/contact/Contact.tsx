"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy, Mail, MapPin } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useExperience } from "@/components/providers/Providers";
import { SplitReveal } from "@/components/animations/SplitReveal";
import { Reveal } from "@/components/animations/Reveal";
import { BrandIcon, LinkedInIcon } from "@/components/ui/BrandIcon";
import { Magnetic } from "@/components/ui/Magnetic";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { profile } from "@/data/portfolio";
import { useLocalTime } from "@/hooks/useLocalTime";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // Fallback for browsers without async clipboard permissions.
      const ta = document.createElement("textarea");
      ta.value = profile.email;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2400);
  };

  const links = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: <Mail className="size-5" />,
      external: false,
    },
    profile.links.linkedin.href && {
      label: "LinkedIn",
      value: profile.links.linkedin.handle ?? "LinkedIn",
      href: profile.links.linkedin.href,
      icon: <LinkedInIcon className="size-5" />,
      external: true,
    },
    profile.links.github.href && {
      label: "GitHub",
      value: profile.links.github.handle ?? "GitHub",
      href: profile.links.github.href,
      icon: <BrandIcon icon="siGithub" name="GitHub" className="size-5" />,
      external: true,
    },
  ].filter(Boolean) as {
    label: string;
    value: string;
    href: string;
    icon: React.ReactNode;
    external: boolean;
  }[];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-line bg-bg-elev pt-[clamp(6rem,14vw,12rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[30%] size-[80vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(200_240_74/0.08),transparent_60%)]"
      />
      <div className="container-x relative">
        <SectionLabel index="06">Contact</SectionLabel>

        <SplitReveal
          as="h2"
          id="contact-heading"
          className="display mt-10 max-w-[16ch] text-[clamp(2.8rem,7.6vw,7.6rem)]"
        >
          Have an interesting idea? <span className="serif-accent text-accent">Let&apos;s build</span>{" "}
          something meaningful.
        </SplitReveal>

        <Reveal delay={0.1} className="mt-14 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="group relative font-display text-[clamp(1.4rem,4.2vw,3.4rem)] font-medium tracking-[-0.03em] break-all sm:break-normal"
          >
            {profile.email}
            <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-right scale-x-0 bg-accent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100" />
          </a>
          <Magnetic>
            <button
              type="button"
              onClick={copy}
              aria-label="Copy email address"
              className="grid size-14 place-items-center rounded-full border border-line-strong transition-colors duration-500 hover:border-accent hover:bg-accent hover:text-accent-ink"
            >
              {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
            </button>
          </Magnetic>
        </Reveal>

        <ul className="mt-20 grid border-t border-line md:grid-cols-3">
          {links.map((l, i) => (
            <Reveal as="li" key={l.label} delay={i * 0.08} className="border-b border-line md:border-b-0 md:[&:not(:first-child)]:border-l">
              <a
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full items-center justify-between gap-4 py-8 md:px-8 md:first:pl-0"
              >
                <span className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center rounded-full border border-line-strong text-fg-dim transition-colors duration-500 group-hover:border-accent group-hover:text-accent">
                    {l.icon}
                  </span>
                  <span>
                    <span className="block font-display text-xl tracking-tight">{l.label}</span>
                    <span className="block text-sm text-muted break-all">{l.value}</span>
                  </span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
              </a>
            </Reveal>
          ))}
          <Reveal as="li" delay={0.2} className="border-b border-line md:border-b-0 md:border-l">
            <div className="flex h-full items-center gap-4 py-8 md:px-8">
              <span className="grid size-12 place-items-center rounded-full border border-line-strong text-fg-dim">
                <MapPin className="size-5" />
              </span>
              <span>
                <span className="block font-display text-xl tracking-tight">
                  {profile.location.city}, {profile.location.country}
                </span>
                <span className="block text-sm text-muted">GMT+5:30 · Asia/Colombo</span>
              </span>
            </div>
          </Reveal>
        </ul>
      </div>

      <Footer />

      <AnimatePresence>
        {copied && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-1/2 z-[95] flex -translate-x-1/2 items-center gap-3 rounded-full bg-accent py-3 pl-3 pr-5 text-sm font-medium text-accent-ink shadow-[0_20px_60px_rgb(0_0_0/0.5)]"
          >
            <span className="grid size-7 place-items-center rounded-full bg-accent-ink text-accent">
              <Check className="size-4" />
            </span>
            Email copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const noopSubscribe = () => () => {};

function Footer() {
  const { scrollTo } = useExperience();
  const time = useLocalTime(profile.location.timezone);
  const year = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => null,
  );

  return (
    <footer className="relative mt-[clamp(6rem,12vw,10rem)] border-t border-line">
      <div
        aria-hidden="true"
        className="display text-outline pointer-events-none select-none overflow-hidden whitespace-nowrap px-[var(--gutter)] pt-8 text-[clamp(1.6rem,8.4vw,12rem)] leading-[0.9]"
      >
        {profile.displayName.first} {profile.displayName.last}
      </div>
      <div className="container-x flex flex-col gap-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year ?? ""} {profile.fullName}
        </p>
        <p className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent" />
          {profile.location.country}
          {time ? ` · ${time}` : ""}
        </p>
        <button
          type="button"
          onClick={() => scrollTo(0)}
          className="group inline-flex items-center gap-3 text-fg"
        >
          Back to top
          <span className="grid size-10 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
            <ArrowUp className="size-4" />
          </span>
        </button>
      </div>
    </footer>
  );
}
