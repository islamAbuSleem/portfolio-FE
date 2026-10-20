/**
 * A project's visual, drawn in HTML: the deepest surface, a hairline grid,
 * a gradient rule and the name in the display face. Used whenever a project
 * has no screenshot, so a project card is never an empty box.
 */
export function ProjectPlate({
  title,
  tag,
  className = "",
}: {
  title: string;
  tag?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-surface-container-lowest [container-type:inline-size] ${className}`}
      aria-hidden="true"
    >
      {/* Hairline grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.6,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(30rem 18rem at 18% 0%, var(--ambient-1), transparent 70%), radial-gradient(24rem 16rem at 92% 100%, var(--ambient-2), transparent 72%)",
        }}
      />

      <div className="relative flex h-full flex-col justify-between p-[6%]">
        <div>
          {tag && (
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-secondary">
              {tag}
            </p>
          )}
          <span className="mt-3 block h-[3px] w-[4.5rem] rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary" />
        </div>

        <p className="font-sans text-[clamp(1.5rem,4.2cqw,3.2rem)] font-bold leading-[1.02] tracking-[-0.03em] text-text">
          {title}
        </p>

        <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-text-faint">
          Project Screenshot
        </p>
      </div>
    </div>
  );
}
