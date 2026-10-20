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
    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label htmlFor={props.id} className="block font-mono text-label-xs uppercase tracking-widest text-text-faint">
            {label}
            {(props.required || props["aria-required"] === "true") && (
              <span className="text-error ml-1">*</span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full bg-surface-container-lowest border border-border rounded-lg px-3 py-2.5 text-body-md text-text placeholder:text-text-faint focus:border-primary focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition-all duration-200 resize-y ${
            error ? "border-error focus:border-error" : ""
          } ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          rows={rows}
          {...props}
        />
        {helperText && (
          <p className="text-label-md text-text-faint">{helperText}</p>
        )}
        {error && (
          <p className="text-label-md text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
