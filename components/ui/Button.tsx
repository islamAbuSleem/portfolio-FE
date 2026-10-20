"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

/**
 * Three voices: a solid indigo action, a glass secondary, and a monospaced
 * ghost that shifts to cyan on hover.
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-container text-white border border-white/20 hover:bg-primary hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]",
  secondary:
    "glass text-text border border-border hover:bg-surface-container-high hover:border-secondary/40",
  ghost:
    "bg-transparent text-text-secondary border border-transparent font-mono hover:text-secondary",
  danger:
    "bg-error text-[#690005] border border-transparent hover:brightness-95",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-label-sm gap-1.5 rounded-md",
  md: "px-4 py-2 text-label-md gap-2 rounded-lg",
  lg: "px-5 py-2.5 text-body-md gap-2.5 rounded-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", isLoading = false, children, className = "", disabled, ...props },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        className={`inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-3.5 w-3.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
            <circle className="opacity-75" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="30 60" strokeLinecap="round" />
          </svg>
        )}
        <span className={isLoading ? "opacity-0" : ""}>{children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";
