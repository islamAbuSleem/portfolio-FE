import { ReactNode } from "react";

/**
 * A single number, given the space it needs to be read at a glance: a
 * monospaced label, the value, and one line of context under it.
 */
export function MetricCard({
  label,
  value,
  hint,
  icon,
  accent = "primary",
  className = "",
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
  accent?: "primary" | "secondary" | "tertiary";
  className?: string;
}) {
  const accentClass =
    accent === "secondary"
      ? "text-secondary"
      : accent === "tertiary"
        ? "text-tertiary"
        : "text-primary";

  return (
    <div
      className={`glass relative flex flex-col gap-2 overflow-hidden rounded-xl p-space-md ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-label-xs uppercase tracking-widest text-text-faint">
          {label}
        </span>
        {icon && <span className={accentClass}>{icon}</span>}
      </div>
      <span className="font-sans text-headline-md font-bold leading-none text-text tnum">
        {value}
      </span>
      {hint && (
        <span className={`font-mono text-label-sm ${accentClass}`}>{hint}</span>
      )}
    </div>
  );
}
