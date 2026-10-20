"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ProjectPlate } from "@/components/ui/ProjectPlate";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Terminal } from "@/components/ui/Terminal";
import { MetricCard } from "@/components/ui/MetricCard";
import { ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
import Link from "next/link";
import { Project } from "@/lib/api";

/**
 * The stack, arranged by the layer it actually sits in. It is the project's
 * own technology list, sorted - not an architecture diagram drawn for effect.
 */
const LAYERS: { label: string; match: RegExp }[] = [
  { label: "Interface", match: /next|react|vue|nuxt|angular|svelte|tailwind|css/i },
  { label: "Service", match: /nest|express|fastify|node|spring|java|django|flask|graphql|api/i },
  { label: "Data", match: /postgres|mysql|mongo|redis|prisma|sql|database|supabase|firebase/i },
  { label: "Infra", match: /docker|kubernetes|k8s|aws|gcp|azure|terraform|cloudflare|vercel|nginx|ci/i },
  { label: "Tooling", match: /git|github|jest|vitest|playwright|eslint|prettier|figma|webpack|vite/i },
];

function stackLayers(techs: string[]) {
  return LAYERS.map((layer) => ({
    label: layer.label,
    techs: techs.filter((t) => layer.match.test(t)).slice(0, 3),
  })).filter((layer) => layer.techs.length > 0);
}

/**
 * The work leads. One project is given the scale it deserves - treated as a
 * case study, with its manifest and its stack laid out - and the rest become
 * a dense index a reader can scan in a single pass.
 */
export function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  const [lead, ...rest] = projects;
  const leadLayers = stackLayers(lead.techs);
  const allTechs = Array.from(
    new Set(projects.flatMap((p) => p.techs).map((t) => t.trim())),
  ).filter(Boolean);

  return (
    <section id="projects" className="ambient relative scroll-mt-28 border-t border-border">
      <div className="shell flex flex-col gap-space-xl py-space-xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Sys index // production artifacts"
            title={
              <>
                Featured <span className="text-gradient">architectural work</span>
              </>
            }
            description="Systems I have designed, built and shipped — each one examined as a case study rather than a screenshot."
            aside={
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-lg border border-border bg-surface-container px-4 py-2.5 font-mono text-label-sm uppercase tracking-widest text-text-secondary transition-colors duration-200 hover:border-secondary/50 hover:text-secondary"
              >
                all {projects.length} projects
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            }
          />
        </ScrollReveal>

        {/* Benchmark ticker */}
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
            <MetricCard
              label="Projects published"
              value={projects.length}
              hint="on this site"
              accent="secondary"
            />
            <MetricCard
              label="Technologies used"
              value={allTechs.length}
              hint="across the stack"
              accent="primary"
            />
            <MetricCard
              label="Featured"
              value={projects.filter((p) => p.featured).length}
              hint="case studies"
              accent="tertiary"
            />
            <MetricCard
              label="Live deployments"
              value={projects.filter((p) => p.liveUrl).length}
              hint="reachable now"
              accent="secondary"
            />
          </div>
        </ScrollReveal>

        {/* Flagship */}
        <ScrollReveal>
          <article className="glass overflow-hidden rounded-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface-container px-space-lg py-3">
              <span className="inline-flex items-center gap-2 font-mono text-label-xs uppercase tracking-widest text-secondary">
                <span className="beacon beacon-secondary" aria-hidden="true" />
                Flagship case study // {lead.featured ? "featured" : "lead project"}
              </span>
              <span className="font-mono text-label-xs uppercase tracking-widest text-text-faint">
                {lead.liveUrl ? "deployed" : "source only"}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter p-space-lg">
              <div className="lg:col-span-7 flex flex-col gap-space-md">
                <h3 className="text-headline-lg text-text">{lead.title}</h3>
                <p className="text-body-md text-text-secondary measure">
                  {lead.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {lead.techs.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-surface-container px-2.5 py-1 font-mono text-label-sm text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-5 pt-space-xs">
                  {lead.githubUrl && (
                    <a
                      href={lead.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 font-mono text-label-sm uppercase tracking-widest text-text-secondary transition-colors duration-200 hover:text-secondary"
                    >
                      <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
                      source
                      <ArrowUpRight
                        className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                  {lead.liveUrl && (
                    <a
                      href={lead.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 font-mono text-label-sm uppercase tracking-widest text-text transition-colors duration-200 hover:text-secondary"
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      live
                      <ArrowUpRight
                        className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
              </div>

              <div className="lg:col-span-5">
                <Terminal title="project.manifest" status="ready">
                  <div className="space-y-1">
                    <ManifestRow label="title" value={lead.title} />
                    <ManifestRow label="stack" value={`${lead.techs.length} technologies`} />
                    <ManifestRow
                      label="source"
                      value={lead.githubUrl ? "linked" : "not published"}
                      accent={lead.githubUrl ? "secondary" : undefined}
                    />
                    <ManifestRow
                      label="deploy"
                      value={lead.liveUrl ? "live" : "not deployed"}
                      accent={lead.liveUrl ? "tertiary" : undefined}
                    />
                    <ManifestRow
                      label="featured"
                      value={lead.featured ? "yes" : "no"}
                    />
                  </div>
                </Terminal>
              </div>
            </div>

            {/* The stack, layer by layer */}
            {leadLayers.length > 0 && (
              <div className="border-t border-border bg-surface-container-lowest px-space-lg py-space-lg">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 font-mono text-label-xs uppercase tracking-widest text-text-faint">
                    <span className="beacon beacon-primary" aria-hidden="true" />
                    Stack topology // {lead.title}
                  </span>
                  <span className="font-mono text-label-xs uppercase tracking-widest text-text-faint">
                    {leadLayers.length} layers
                  </span>
                </div>

                <ol className="mt-space-md flex flex-col gap-3 md:flex-row md:items-stretch">
                  {leadLayers.map((layer, index) => (
                    <li key={layer.label} className="flex flex-1 items-center gap-3">
                      <div className="w-full rounded-xl border border-border bg-surface-container px-4 py-3">
                        <div className="font-mono text-label-xs uppercase tracking-widest text-primary">
                          {layer.label}
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {layer.techs.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md bg-surface-container-highest px-2 py-0.5 font-mono text-label-sm text-text-secondary"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      {index < leadLayers.length - 1 && (
                        <span
                          className="hidden shrink-0 font-mono text-label-md text-text-faint md:block"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </article>
        </ScrollReveal>

        {/* The rest */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
            {rest.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 60}>
                <article className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30">
                  <Link
                    href={project.liveUrl ?? project.githubUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block aspect-[16/9] overflow-hidden border-b border-border bg-surface-container-lowest"
                  >
                    {project.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.imageUrl}
                        alt={`${project.title} — project screenshot`}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out-cubic group-hover:scale-[1.02]"
                      />
                    ) : (
                      <ProjectPlate title={project.title} tag="Case study" />
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col gap-3 p-space-lg">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-headline-sm text-text">
                        {project.title}
                      </h3>
                      <span className="font-mono text-label-xs text-text-faint tnum">
                        {(index + 2).toString().padStart(2, "0")}
                      </span>
                    </div>

                    <p className="text-body-sm text-text-secondary line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-1.5 pt-space-sm">
                      {project.techs.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-surface-container px-2 py-0.5 font-mono text-label-sm text-text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-5 border-t border-border pt-space-sm">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-label-sm uppercase tracking-widest text-text-secondary transition-colors duration-200 hover:text-secondary"
                        >
                          source
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 font-mono text-label-sm uppercase tracking-widest text-text transition-colors duration-200 hover:text-secondary"
                        >
                          live
                          <ArrowUpRight
                            className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Ask for the rest */}
        <ScrollReveal>
          <div className="glass flex flex-col gap-5 rounded-2xl p-space-lg md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-headline-md text-text">
                Want the architecture behind one of these?
              </h3>
              <p className="mt-2 text-body-md text-text-secondary measure">
                Diagrams, trade-off notes and the decisions behind the code are
                available on request.
              </p>
            </div>
            <Link
              href="#contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/20 bg-primary-container px-space-lg py-2.5 text-body-md font-semibold text-white transition-all duration-200 hover:bg-primary hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            >
              Request a deep dive
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ManifestRow({
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
    <div className="flex gap-3">
      <span className="w-16 shrink-0 text-text-faint">{label}</span>
      <span className={`${valueClass} break-all`}>{value}</span>
    </div>
  );
}
