import { cn } from "@/lib/utils";

/** Infinite CSS marquee. Content is duplicated once (aria-hidden) for a seamless loop. */
export function TechMarquee({
  items,
  className,
  duration = 45,
  reverse = false,
}: {
  items: string[];
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 font-display text-lg tracking-tight text-fg-dim sm:text-xl">{item}</span>
          <span aria-hidden="true" className="text-accent">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
    >
      <div
        className="animate-marquee flex w-max group-hover:[animation-play-state:paused]"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : undefined,
          } as React.CSSProperties
        }
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
