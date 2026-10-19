"use client";

import { ReactNode, forwardRef, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  strong?: boolean;
  className?: string;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, strong = false, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative overflow-hidden ${strong ? "glass-strong" : "glass"} ${className}`}
        {...props}
      >
        <div className="noise absolute inset-0 z-0" aria-hidden="true" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";