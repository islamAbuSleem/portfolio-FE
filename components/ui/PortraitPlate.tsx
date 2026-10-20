/**
 * The portrait, drawn when there is no photograph: a monogram on the site's
 * own deepest surface, with the same hairline grid and pigment rule the
 * project plates use.
 */
export function PortraitPlate({ name = "IA" }: { name?: string }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden bg-surface-container-lowest [container-type:inline-size]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          opacity: 0.7,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(26rem 20rem at 30% 12%, var(--ambient-1), transparent 68%), radial-gradient(22rem 18rem at 80% 92%, var(--ambient-2), transparent 70%)",
        }}
      />

      <div className="relative flex h-full flex-col items-center justify-center gap-4 p-[8%] text-center">
        <span className="font-sans text-[clamp(3rem,14cqw,7rem)] font-bold leading-none tracking-[-0.04em] text-text">
          {name}
        </span>
        <span className="h-[3px] w-16 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary" />
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.24em] text-text-faint">
          Islam Abusleem
        </span>
      </div>
    </div>
  );
}
