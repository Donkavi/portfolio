import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** "(02) —— About" editorial section marker. */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("eyebrow flex items-center gap-3", className)}>
      <span className="text-accent">({index})</span>
      <span aria-hidden="true" className="h-px w-10 bg-line-strong" />
      <span>{children}</span>
    </div>
  );
}
