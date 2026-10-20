"use client";

import { ReactNode, forwardRef, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  strong?: boolean;
  interactive?: boolean;
  className?: string;
}

/**
 * The page's one surface: a translucent plane with a hairline edge. When it is
 * interactive it lifts by two pixels and its border warms to indigo.
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, strong = false, interactive = false, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative overflow-hidden rounded-2xl ${strong ? "glass-strong" : "glass"} ${
          interactive
            ? "transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
            : ""
        } ${className}`}
        {...props}
      >
        <div className="noise absolute inset-0 z-0" aria-hidden="true" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
