"use client";

import Image from "next/image";
import { useRef } from "react";
import { SriLankaMap } from "@/components/sri-lanka/SriLankaMap";
import { profile, sriLankaHero } from "@/data/portfolio";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

export function SriLanka() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

        // Cinematic: framed image opens to full-bleed while the headline arrives.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-lk-stage]",
            start: "top top",
            end: isDesktop ? "+=140%" : "+=80%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });
        tl.fromTo(
          "[data-lk-frame]",
          { clipPath: "inset(14% 10% 14% 10% round 8px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", duration: 1 },
          0,
        )
          .fromTo("[data-lk-frame] img", { scale: 1.3 }, { scale: 1.02, ease: "none", duration: 1.4 }, 0)
          .from("[data-lk-line]", { yPercent: 120, stagger: 0.15, duration: 0.5, ease: "power3.out" }, 0.35)
          .fromTo("[data-lk-outline]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: "none" }, 0.4)
          .from("[data-lk-fill]", { autoAlpha: 0, duration: 0.4 }, 0.9)
          .from("[data-lk-marker]", { autoAlpha: 0, scale: 0, transformOrigin: "50% 50%", duration: 0.2 }, 1.0)
          .from("[data-lk-meta]", { autoAlpha: 0, y: 20, stagger: 0.08, duration: 0.3 }, 1.0);

      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="lk-heading" className="relative overflow-hidden bg-bg">
      <div data-lk-stage className="relative h-[100svh] w-full overflow-hidden">
        <div data-lk-frame className="absolute inset-0 overflow-hidden">
          <Image
            src={sriLankaHero.src}
            alt={sriLankaHero.alt}
            fill
            sizes="100vw"
            quality={75}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_10_11/0.55)_0%,rgb(10_10_11/0.15)_40%,rgb(10_10_11/0.85)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgb(10_10_11/0.65),transparent_60%)]" />
        </div>

        <div className="container-x relative flex h-full flex-col justify-end pb-[clamp(2.5rem,7vh,5rem)]">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <h2 id="lk-heading" className="display text-[clamp(2.8rem,8vw,8.4rem)] lg:col-span-8">
              <span className="split-line block">
                <span data-lk-line className="block">
                  Rooted in
                </span>
              </span>
              <span className="split-line block">
                <span data-lk-line className="block">
                  <span className="serif-accent text-accent">Sri Lanka.</span>
                </span>
              </span>
              <span className="split-line block">
                <span data-lk-line className="block text-fg/80">
                  Building for the world.
                </span>
              </span>
            </h2>

            <div className="flex items-end justify-between gap-6 lg:col-span-4 lg:flex-col lg:items-end">
              <SriLankaMap className="h-[clamp(9rem,26vh,16rem)] w-auto" />
              <div className="space-y-1 text-right">
                <p data-lk-meta className="eyebrow whitespace-nowrap text-fg-dim">
                  {profile.location.coords}
                </p>
                <p data-lk-meta className="text-sm text-fg-dim">
                  {sriLankaHero.place} · {sriLankaHero.region}
                </p>
                <p data-lk-meta className="text-xs text-muted">
                  Photo by{" "}
                  <a href={sriLankaHero.credit.profile} target="_blank" rel="noopener noreferrer" className="underline decoration-line-strong underline-offset-2 hover:text-fg">
                    {sriLankaHero.credit.name}
                  </a>{" "}
                  on{" "}
                  <a href={sriLankaHero.credit.photo} target="_blank" rel="noopener noreferrer" className="underline decoration-line-strong underline-offset-2 hover:text-fg">
                    Unsplash
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
