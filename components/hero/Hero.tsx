"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowDown, Mail, Terminal as TerminalIcon } from "lucide-react";
import { Experience, Project, Skill } from "@/lib/api";
import { Badge } from "@/components/ui/Badge";
import { Terminal } from "@/components/ui/Terminal";
import { MetricCard } from "@/components/ui/MetricCard";
import { PortraitPlate } from "@/components/ui/PortraitPlate";

const EMAIL = "islam.abusleem@gmail.com";

/**
 * The first viewport is a thesis, not a header: who this is, what they do,
 * and - immediately - the evidence for it.
 *
 * Every number on this screen is computed from the site's own data. Nothing
 * here is decoration pretending to be telemetry.
 */
export function Hero({
  projects,
  skills,
  experiences,
  years,
  avatar,
}: {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  years: number | null;
  avatar?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const stack = useMemo(() => {
    const fromProjects = projects.flatMap((p) => p.techs);
    const fromSkills = skills.map((s) => s.name);
    const all = [...fromProjects, ...fromSkills];

    /**
     * Fold versioned labels into their base name, so "Next.js 16" and
     * "Next.js" are one entry rather than two badges saying the same thing.
     */
    const base = (label: string) =>
      label
        .trim()
        .replace(/\s+\d+(\.\d+)*$/, "")
        .toLowerCase();

    const seen = new Set<string>();
    return all.filter((t) => {
      const key = base(t);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [projects, skills]);

  /**
   * The sparkline is the real skill profile: average proficiency for each
   * domain, drawn as a line. It is data, not a texture.
   */
  const profile = useMemo(() => {
    const domains = ["Frontend", "Backend", "DevOps", "Tools", "Other"];
    return domains
      .map((domain) => {
        const items = skills.filter((s) => s.category === domain);
        if (items.length === 0) return null;
        const average =
          items.reduce((sum, s) => sum + s.proficiency, 0) / items.length;
        return { domain, average };
      })
      .filter((v): v is { domain: string; average: number } => v !== null);
  }, [skills]);

  const sparkPath = useMemo(() => {
    if (profile.length === 0) return null;
    const width = 500;
    const height = 40;
    const step = width / (profile.length - 1 || 1);

    // Scale the axis to the data, not to zero, so the shape is legible -
    // and say so in the caption, because a truncated axis has to be declared.
    const values = profile.map((p) => p.average);
    const lo = Math.min(...values);
    const hi = Math.max(...values);
    const pad = Math.max(4, (hi - lo) * 0.35);
    const min = Math.max(0, Math.floor((lo - pad) / 5) * 5);
    const max = Math.min(100, Math.ceil((hi + pad) / 5) * 5);
    const span = Math.max(1, max - min);

    const points = profile.map((p, i) => {
      const x = profile.length === 1 ? width / 2 : i * step;
      const y = height - ((p.average - min) / span) * (height - 8) - 4;
      return [x, y] as const;
    });
    const line = points
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
      .join(" ");
    const area = `${line} L${width},${height} L0,${height} Z`;
    return { line, area, min, max };
  }, [profile]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable - the address is on screen anyway */
    }
  };

  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <section className="ambient relative w-full pb-space-xl pt-32 md:pt-28">
      <div className="shell flex flex-col gap-space-xl">
        {/* System status line */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm rounded-lg border border-border bg-surface-container px-space-sm py-space-xs font-mono text-label-sm text-text-secondary">
            <span className="beacon" aria-hidden="true" />
            <span className="text-secondary">NODE: SA-RIYADH</span>
            <span className="hidden text-text-faint sm:inline">/</span>
            <span className="hidden sm:inline">LATENCY: LOCAL</span>
            <span className="hidden text-text-faint sm:inline">/</span>
            <span className="text-text">ENV: PROD</span>
          </div>
          <div className="flex items-center gap-space-sm font-mono text-label-xs uppercase tracking-widest text-text-faint">
            <span>PROJECTS: {projects.length}</span>
            <span>SKILLS: {skills.length}</span>
            <span>ROLES: {experiences.length}</span>
          </div>
        </div>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-8 flex flex-col gap-space-md">
            <div className="inline-flex items-center gap-space-xs font-mono text-label-xs uppercase tracking-widest text-secondary">
              <TerminalIcon className="h-4 w-4" aria-hidden="true" />
              <span>Systems Reliability · Product Engineering</span>
            </div>

            <h1 className="text-display-xl text-text">
              Senior Full-Stack Engineer
              <br className="hidden sm:block" />{" "}
              <span className="text-gradient">&amp; Systems Architect</span>
            </h1>

            <p className="text-body-lg text-text-secondary measure">
              I build distributed systems, backend services and interfaces that
              hold up in production — and I ship them, not just design them.
            </p>

            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-lg border border-white/20 bg-primary-container px-space-lg py-2.5 text-body-md font-semibold text-white transition-all duration-200 hover:bg-primary hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
              >
                <span>Explore selected work</span>
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-container px-space-lg py-2.5 text-body-md font-semibold text-text transition-colors duration-200 hover:border-secondary/50 hover:bg-surface-container-high"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>Get in touch</span>
              </Link>

              {/* Copy the address straight from the page */}
              <div className="flex items-center gap-space-sm rounded-lg border border-border bg-surface-container-lowest px-space-md py-2">
                <span className="font-mono text-label-sm text-secondary" aria-hidden="true">
                  $
                </span>
                <code className="select-all font-mono text-label-sm text-text">
                  mailto {EMAIL}
                </code>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="ml-1 rounded-md bg-surface-container px-2 py-1 font-mono text-label-xs uppercase tracking-widest text-text-secondary transition-colors duration-200 hover:text-secondary"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          {/* The stack, in one panel */}
          <div className="lg:col-span-4 flex flex-col gap-space-sm rounded-xl border border-border bg-surface-container p-space-lg">
            <span className="font-mono text-label-xs uppercase tracking-widest text-text-faint">
              Active engineering stack
            </span>
            <div className="flex flex-wrap gap-space-xs">
              {stack.slice(0, 14).map((tech) => (
                <Badge key={tech} tone="secondary">
                  {tech}
                </Badge>
              ))}
              {stack.length === 0 && (
                <span className="text-body-sm text-text-faint">Stack syncing…</span>
              )}
            </div>
            <div className="mt-space-sm flex items-center justify-between border-t border-border pt-space-sm font-mono text-label-sm">
              <span className="text-text-secondary">Deployment:</span>
              <span className="text-primary">Cloudflare Workers (edge)</span>
            </div>
          </div>
        </div>

        {/* Portrait and the terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          <div className="lg:col-span-5 flex flex-col overflow-hidden rounded-xl border border-border bg-surface-container">
            <div className="relative w-full aspect-square overflow-hidden bg-surface-container-lowest">
              {avatar ?? <PortraitPlate />}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface-container to-transparent" />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg border border-border bg-surface-container-lowest/80 px-3 py-1.5 backdrop-blur-md font-mono text-label-sm text-text">
                <span className="beacon" aria-hidden="true" />
                Islam Abusleem · Staff tier
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between gap-3 p-space-lg">
              <div>
                <div className="text-headline-sm text-text">
                  Systems pragmatist &amp; builder
                </div>
                <p className="mt-2 text-body-md text-text-secondary">
                  Focused on domain-driven design, real-time architectures,
                  ergonomic internal tooling and software lifecycle reliability.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 border-t border-border pt-space-md font-mono text-label-sm text-primary">
                {years !== null && <span>{years}+ yrs experience</span>}
                <span>Remote — worldwide</span>
                <span>Staff architect</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-border bg-surface-container-lowest p-space-lg">
            <Terminal
              title="portfolio.config"
              status="loaded"
              className="border-0"
            >
              <div className="space-y-1">
                <ConfigRow label="role" value="Senior Full-Stack Engineer" accent="primary" />
                <ConfigRow label="focus" value="Distributed systems · backend · interface architecture" />
                <ConfigRow label="projects" value={`${projects.length} published · ${featuredCount} featured`} accent="secondary" />
                <ConfigRow label="stack" value={stack.slice(0, 6).join(" · ") || "loading"} />
                <ConfigRow label="contact" value={EMAIL} accent="tertiary" />
              </div>
            </Terminal>

            <div className="grid grid-cols-2 gap-space-md py-space-md">
              <MetricCard
                label="Projects published"
                value={projects.length}
                hint={`${featuredCount} featured`}
                accent="primary"
              />
              <MetricCard
                label="Technologies"
                value={stack.length}
                hint="across the stack"
                accent="secondary"
              />
              <MetricCard
                label="Years experience"
                value={years !== null ? `${years}+` : "—"}
                hint="on record"
                accent="tertiary"
              />
              <MetricCard
                label="Roles held"
                value={experiences.length}
                hint="in the ledger"
                accent="primary"
              />
            </div>

            {sparkPath && (
              <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface-container p-space-md">
                <div className="flex items-center justify-between font-mono text-label-sm">
                  <span className="text-text-secondary">
                    Skill profile by domain (avg proficiency)
                  </span>
                  <span className="text-secondary tnum">
                    {profile.length} domains
                  </span>
                </div>
                <div className="h-12 w-full">
                  <svg
                    className="h-full w-full text-secondary"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 500 40"
                    aria-hidden="true"
                  >
                    <path
                      d={sparkPath.area}
                      fill="currentColor"
                      fillOpacity="0.12"
                    />
                    <path
                      d={sparkPath.line}
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-label-xs uppercase tracking-widest text-text-faint">
                  {profile.map((p) => (
                    <span key={p.domain}>
                      {p.domain} {Math.round(p.average)}
                    </span>
                  ))}
                  <span className="text-text-faint/70">
                    axis {sparkPath.min}–{sparkPath.max}
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 pt-space-md">
              <div className="font-mono text-label-xs uppercase tracking-widest text-text-faint">
                Engineering core tenet
              </div>
              <p className="text-body-md italic text-text">
                “Software architecture is the art of postponing decisions while
                maintaining execution velocity, deterministic contracts and
                uncompromising developer empathy.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConfigRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "primary" | "secondary" | "tertiary";
}) {
  const valueClass =
    accent === "primary"
      ? "text-primary"
      : accent === "secondary"
        ? "text-secondary"
        : accent === "tertiary"
          ? "text-tertiary"
          : "text-text";

  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
      <span className="w-20 shrink-0 text-text-faint">{label}</span>
      <span className={`${valueClass} break-all`}>{value}</span>
    </div>
  );
}
