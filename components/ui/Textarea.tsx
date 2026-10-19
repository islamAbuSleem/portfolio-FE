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
          <label htmlFor={props.id} className="block text-label-xs text-text-faint">
            {label}
            {(props.required || props["aria-required"] === "true") && (
              <span className="text-error ml-1">*</span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full bg-surface border border-border rounded-sm px-3 py-3 text-text placeholder:text-text-faint focus:border-primary transition-colors duration-200 resize-y ${
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
