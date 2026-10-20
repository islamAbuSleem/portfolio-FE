import { ReactNode } from "react";

/**
 * A console window: an obsidian bar carrying the window's identity, and a
 * monospaced surface below it. Used to show a process, a log or a payload.
 */
export function Terminal({
  title,
  status,
  children,
  className = "",
  bodyClassName = "",
}: {
  title?: ReactNode;
  status?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={`terminal overflow-hidden ${className}`}>
      {(title || status) && (
        <div className="terminal-bar">
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-error/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-secondary/80" />
          </span>
          {title && (
            <span className="ml-1 font-mono text-label-sm text-text-secondary">
              {title}
            </span>
          )}
          {status && (
            <span className="ml-auto font-mono text-label-xs uppercase tracking-widest text-secondary">
              {status}
            </span>
          )}
        </div>
      )}
      <div className={`terminal-body ${bodyClassName}`}>{children}</div>
    </div>
  );
}
