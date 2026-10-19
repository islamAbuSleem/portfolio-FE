"use client";

import { InputHTMLAttributes, forwardRef, useId, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className = "", id: providedId, ...props }, ref) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;

    return (
      <div className="w-full">
        <label htmlFor={id} className="block text-label-md text-text-secondary mb-1.5">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-text-secondary/60 pointer-events-none" aria-hidden="true">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={`${error ? errorId : ""} ${hint ? hintId : ""}`.trim() || undefined}
            className={`w-full bg-surface-container-lowest border-0 border-b border-border text-text placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-0 transition-colors py-3 px-0 rounded-t-lg ${error ? "border-error" : ""} ${icon ? "pl-10" : ""} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-error" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1.5 text-sm text-text-secondary">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";