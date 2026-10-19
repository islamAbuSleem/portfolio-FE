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
 * Squared, quiet, and honest about state. A hairline border is the only
 * elevation used; there is no glow.
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary border border-transparent hover:bg-primary-dim",
  secondary:
    "bg-transparent text-text border border-border hover:border-primary hover:text-primary",
  ghost:
    "bg-transparent text-text-secondary border border-transparent hover:text-primary",
  danger: "bg-error text-white border border-transparent hover:brightness-95",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-label-md gap-1.5",
  md: "px-5 py-2.5 text-body-sm gap-2",
  lg: "px-6 py-3 text-body-md gap-2.5",
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
        className={`inline-flex items-center justify-center font-medium rounded-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
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
