"use client";

import { HTMLAttributes, forwardRef } from "react";
import { CloseIcon } from "@/components/icons/SocialIcons";

interface TagPillProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "filled";
  size?: "sm" | "md";
  removable?: boolean;
  onRemove?: () => void;
}

const variantClasses = {
  primary: "bg-primary/15 text-primary border-primary/30",
  secondary: "bg-secondary/15 text-secondary border-secondary/30",
  outline: "bg-transparent text-text-secondary border-border",
  filled: "bg-surface-elevated text-text border-transparent",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-[11px] gap-1",
  md: "px-3 py-1 text-label-sm gap-1.5",
};

export const TagPill = forwardRef<HTMLSpanElement, TagPillProps>(
  ({ children, variant = "outline", size = "md", removable = false, onRemove, className = "", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`inline-flex items-center font-mono rounded-full border transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
        {removable && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center justify-center w-5 h-5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Remove tag"
          >
            <CloseIcon width={12} height={12} />
          </button>
        )}
      </span>
    );
  }
);

TagPill.displayName = "TagPill";