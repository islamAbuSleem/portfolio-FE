/**
 * A project's visual, drawn in HTML with the same language as the generated
 * plates: the page's own ground, a hairline grid, a pigment rule and the name
 * in the display face. Used whenever a project has no screenshot, so a
 * project card is never an empty box.
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
      className={`relative w-full h-full overflow-hidden bg-bg [container-type:inline-size] ${className}`}
      aria-hidden="true"
    >
      {/* Hairline grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--rule) 1px, transparent 1px), linear-gradient(to bottom, var(--rule) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.5,
        }}
      />
      <div className="absolute inset-0 border border-border" />

      <div className="relative flex h-full flex-col justify-between p-[6%]">
        <div>
          {tag && (
            <p className="font-mono text-[0.625rem] tracking-[0.2em] text-secondary">
              {tag.toUpperCase()}
            </p>
          )}
          <span className="mt-3 block h-[3px] w-[4.5rem] bg-primary" />
        </div>

        <p className="font-sans text-[clamp(1.5rem,4.2cqw,3.2rem)] font-bold leading-[1.02] tracking-[-0.03em] text-text">
          {title}
        </p>

        <p className="font-mono text-[0.625rem] tracking-[0.2em] text-text-faint">
          PROJECT SCREENSHOT
        </p>
      </div>
    </div>
  );
}
