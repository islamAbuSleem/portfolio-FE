import { ReactNode } from "react";

/**
 * The section header: a monospaced eyebrow that says what part of the system
 * you are in, the section's name, and one sentence on what it holds.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  aside,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-12 gap-x-gutter gap-y-6 ${className}`}
    >
      <div className="lg:col-span-7">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-container px-3 py-1.5 font-mono text-label-xs uppercase tracking-widest text-secondary">
          <span className="beacon beacon-secondary" aria-hidden="true" />
          {eyebrow}
        </span>
        <h2 className="mt-4 text-headline-lg text-text">{title}</h2>
        {description && (
          <p className="mt-3 text-body-lg text-text-secondary measure">
            {description}
          </p>
        )}
      </div>
      {aside && (
        <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end lg:text-right">
          {aside}
        </div>
      )}
    </div>
  );
}
