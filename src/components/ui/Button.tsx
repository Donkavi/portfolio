"use client";

import { ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";

type Variant = "solid" | "ghost";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
};

type AnchorProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"a">, "className" | "children"> & { as?: "a" };
type NativeButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & { as: "button" };

/**
 * Pill button with a rolling-label hover and magnetic pull.
 * The label is duplicated (one copy hidden from assistive tech) so it can roll on hover.
 */
export function Button(props: AnchorProps | NativeButtonProps) {
  const { children, variant = "solid", icon, className } = props;
  const classes = cn(
    "group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full pl-7 pr-2 text-[0.95rem] font-medium transition-colors duration-500",
    variant === "solid"
      ? "bg-accent text-accent-ink"
      : "border border-line-strong text-fg hover:border-fg/60",
    className,
  );

  const inner = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 origin-bottom scale-y-0 rounded-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-y-100",
          variant === "solid" ? "bg-fg" : "bg-fg/[0.06]",
        )}
      />
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      <span
        className={cn(
          "relative grid size-10 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45",
          variant === "solid" ? "bg-accent-ink text-accent" : "bg-fg text-bg",
        )}
      >
        {icon ?? <ArrowUpRight className="size-4" strokeWidth={2} />}
      </span>
    </>
  );

  if (props.as === "button") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as, children: _c, variant: _v, icon: _i, className: _cl, ...btn } = props;
    return (
      <Magnetic strength={0.25}>
        <button type="button" className={classes} {...btn}>
          {inner}
        </button>
      </Magnetic>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as, children: _c, variant: _v, icon: _i, className: _cl, ...anchor } = props;
  return (
    <Magnetic strength={0.25}>
      <a className={classes} {...anchor}>
        {inner}
      </a>
    </Magnetic>
  );
}
