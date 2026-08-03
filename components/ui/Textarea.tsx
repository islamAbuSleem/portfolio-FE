"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, rows = 4, className = "", ...props }, ref) => {
    const errorClasses = error ? "border-error focus:ring-error/20" : "border-border focus:ring-primary/20";
    const helperClasses = helperText ? "block text-label-sm text-text-secondary mt-1.5" : "";

    return (
      <div className={`space-y-1.5 ${className}`}>
        {label && (
          <label htmlFor={props.id} className="block text-label-md text-text-secondary">
            {label}
            {(props.required || props["aria-required"] === "true") && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full bg-surface-container-lowest border rounded-lg px-3 py-2 text-text ${errorClasses} focus:outline-none focus:ring-2 transition-all ${
            props.disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          rows={rows}
          {...props}
        />
        {helperText && <p className={helperClasses}>{helperText}</p>}
        {error && <p className="text-error text-sm">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
