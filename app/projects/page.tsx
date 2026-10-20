import Link from "next/link";
import { ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { PortfolioNavbar } from "@/components/portfolio/PortfolioNavbar";
import { Footer } from "@/components/sections/Footer";
import { ProjectPlate } from "@/components/ui/ProjectPlate";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/lib/api";
import { mergeProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ skill?: string }>;
}) {
  const { skill } = await searchParams;
  const projects = mergeProjects(await getProjects().catch(() => []));

  const selectedSkill = skill;
  const filtered = selectedSkill
    ? projects.filter((p) =>
        p.techs.some((t) => t.toLowerCase() === selectedSkill.toLowerCase()),
      )
    : projects;

  const uniqueSkills = Array.from(new Set(projects.flatMap((p) => p.techs))).sort();

  return (
    <>
      <PortfolioNavbar />
      <main className="ambient relative flex-1 pt-32 md:pt-28">
        <div className="shell flex flex-col gap-space-xl py-space-xl">
          <SectionHeading
            eyebrow="Sys index // all artifacts"
            title={
              <>
                The complete <span className="text-gradient">project index</span>
              </>
            }
            description={
              selectedSkill
                ? `Tagged with ${selectedSkill}.`
                : `A selection of ${projects.length} projects across systems, interfaces and infrastructure.`
            }
            aside={
              <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-container px-4 py-2.5 font-mono text-label-sm uppercase tracking-widest text-text-secondary">
                <span className="beacon beacon-secondary" aria-hidden="true" />
                {filtered.length} shown
              </span>
            }
          />

          {/* Filter */}
          <div className="glass flex flex-wrap items-center gap-2 rounded-2xl px-space-md py-space-sm">
            <span className="mr-2 font-mono text-label-xs uppercase tracking-widest text-text-faint">
              Filter
            </span>
            <Link
              href="/projects"
              className={`rounded-md border px-3 py-1.5 font-mono text-label-sm uppercase tracking-widest transition-colors duration-200 ${
                !selectedSkill
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border bg-surface-container text-text-secondary hover:text-text"
              }`}
            >
              All
            </Link>
            {uniqueSkills.map((s) => {
              const active = selectedSkill?.toLowerCase() === s.toLowerCase();
              return (
                <Link
                  key={s}
                  href={`/projects?skill=${encodeURIComponent(s)}`}
                  className={`rounded-md border px-3 py-1.5 font-mono text-label-sm uppercase tracking-widest transition-colors duration-200 ${
                    active
                      ? "border-secondary/40 bg-secondary/10 text-secondary"
                      : "border-border bg-surface-container text-text-secondary hover:text-text"
                  }`}
                >
                  {s}
                </Link>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <div className="glass rounded-2xl p-space-lg">
              <p className="text-body-md text-text-secondary">
                {projects.length === 0
                  ? "No projects have been added yet — check back soon."
                  : `No projects tagged with ${selectedSkill}.`}
              </p>
              <Link
                href="/projects"
                className="mt-4 inline-block font-mono text-label-sm uppercase tracking-widest text-secondary hover:underline underline-offset-4"
              >
                View all projects
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-md">
              {filtered.map((project, index) => (
                <ScrollReveal key={project.id} delay={index * 40}>
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
                        <h2 className="text-headline-sm text-text">
                          {project.title}
                        </h2>
                        <span className="font-mono text-label-xs text-text-faint tnum">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                      </div>

                      <p className="text-body-sm text-text-secondary line-clamp-3">
                        {project.description}
                      </p>

                      <div className="mt-auto flex flex-wrap gap-1.5 pt-space-sm">
                        {project.techs.map((tech) => (
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
                            className="inline-flex items-center gap-1.5 font-mono text-label-sm uppercase tracking-widest text-text-secondary transition-colors duration-200 hover:text-secondary"
                          >
                            <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
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
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
