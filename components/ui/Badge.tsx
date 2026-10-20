import { HTMLAttributes, ReactNode } from "react";

type BeaconTone = "success" | "primary" | "secondary";

/**
 * An engineering badge: a monospaced tag on an inset surface, optionally
 * led by a beacon that marks the item as live.
 */
export function Badge({
  children,
  beacon,
  tone = "success",
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  beacon?: boolean;
  tone?: BeaconTone;
}) {
  const beaconClass =
    tone === "primary"
      ? "beacon beacon-primary"
      : tone === "secondary"
        ? "beacon beacon-secondary"
        : "beacon";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-container px-2.5 py-1 text-label-sm text-text-secondary ${className}`}
      {...props}
    >
      {beacon && <span className={beaconClass} aria-hidden="true" />}
      {children}
    </span>
  );
}
