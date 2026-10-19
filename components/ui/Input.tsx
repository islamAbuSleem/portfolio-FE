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
        <label htmlFor={id} className="block text-label-xs text-text-faint mb-2">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint pointer-events-none" aria-hidden="true">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={`${error ? errorId : ""} ${hint ? hintId : ""}`.trim() || undefined}
            className={`w-full bg-surface border border-border text-text placeholder:text-text-faint focus:border-primary transition-colors duration-200 py-3 px-3 rounded-sm ${error ? "border-error focus:border-error" : ""} ${icon ? "pl-10" : ""} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p id={errorId} className="mt-2 text-label-md text-error" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-2 text-label-md text-text-faint">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";