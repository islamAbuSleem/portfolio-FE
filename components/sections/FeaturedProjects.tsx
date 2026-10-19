"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ProjectPlate } from "@/components/ui/ProjectPlate";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Project } from "@/lib/api";

/**
 * The work leads. One project is given the scale it deserves; the rest
 * become a dense index a reader can scan in a single pass.
 */
export function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  const [lead, ...rest] = projects;

  return (
    <section id="projects" data-accent="mint" className="relative scroll-mt-24">
      <div className="shell">
        <ScrollReveal>
          <div className="rule section-rule pt-16 md:pt-24 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-x-10">
            <div className="lg:col-span-3">
              <p className="text-label-xs section-index">01</p>
              <h2 className="mt-3 text-headline-lg text-text">Selected work</h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end text-right">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-1.5 text-label-md text-text-secondary hover:text-primary transition-colors duration-200"
              >
                all projects
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Lead project */}
        <ScrollReveal>
          <article className="rule pb-10">
            <Link
              href={lead.liveUrl ?? lead.githubUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-elevated border border-border">
                {lead.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={lead.imageUrl}
                    alt={`${lead.title} â€” project screenshot`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out-cubic group-hover:scale-[1.015]"
                  />
                ) : (
                  <ProjectPlate title={lead.title} tag="Featured" />
                )}
              </div>
            </Link>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-3">
              <div className="lg:col-span-7">
                <h3 className="text-headline-lg text-text">{lead.title}</h3>
                <p className="mt-3 text-body-md text-text-secondary measure">
                  {lead.description}
                </p>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="text-label-md text-text-faint mb-3">
                  {lead.techs.join("  Â·  ")}
                </p>
                <div className="flex flex-wrap items-center gap-5">
                  {lead.githubUrl && (
                    <a
                      href={lead.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-label-md text-text-secondary hover:text-primary transition-colors duration-200"
                    >
                      Source
                    </a>
                  )}
                  {lead.liveUrl && (
                    <a
                      href={lead.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-label-md text-text hover:text-primary transition-colors duration-200"
                    >
                      Live
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        </ScrollReveal>

        {/* The rest, as an index */}
        {rest.length > 0 && (
          <ul>
            {rest.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 50}>
                <li className="rule">
                  <article className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[3rem_1fr_14rem_8rem] items-center gap-x-4 gap-y-3 py-6">
                    <span className="text-label-xs text-text-faint tnum">
                      {(index + 2).toString().padStart(2, "0")}
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-headline-sm text-text truncate">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-body-sm text-text-secondary line-clamp-2 max-w-2xl">
                        {project.description}
                      </p>
                    </div>

                    <p className="hidden md:block text-label-md text-text-faint truncate">
                      {project.techs.slice(0, 3).join(" Â· ")}
                    </p>

                    <div className="col-start-2 md:col-start-auto flex items-center gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-label-md text-text-secondary hover:text-primary transition-colors duration-200"
                        >
                          Source
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 text-label-md text-text hover:text-primary transition-colors duration-200"
                        >
                          Live
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      )}
                    </div>
                  </article>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
