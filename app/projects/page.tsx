import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { PortfolioNavbar } from "@/components/portfolio/PortfolioNavbar";
import { Footer } from "@/components/sections/Footer";
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
      <main className="flex-1 pt-28 md:pt-36">
        <div className="shell">
          <div className="rule pt-12 md:pt-16 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-x-10">
            <div className="lg:col-span-3">
              <p className="text-label-xs text-text-faint">04</p>
              <h1 className="mt-3 text-display-lg text-text">Projects</h1>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end text-right">
              <p className="text-body-md text-text-secondary measure-tight">
                {selectedSkill
                  ? `Tagged with ${selectedSkill}.`
                  : `A selection of ${projects.length} projects across systems, interfaces and infrastructure.`}
              </p>
            </div>
          </div>

          {/* Skill filter, set as a row of rules rather than pills */}
          <div className="rule py-4 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="text-label-xs text-text-faint">Filter</span>
            <Link
              href="/projects"
              className={`text-label-md transition-colors duration-200 ${
                !selectedSkill
                  ? "text-primary"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              All
            </Link>
            {uniqueSkills.map((s) => (
              <Link
                key={s}
                href={`/projects?skill=${encodeURIComponent(s)}`}
                className={`text-label-md transition-colors duration-200 ${
                  selectedSkill?.toLowerCase() === s.toLowerCase()
                    ? "text-primary"
                    : "text-text-secondary hover:text-text"
                }`}
              >
                {s}
              </Link>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="rule py-16">
              <p className="text-body-md text-text-secondary">
                {projects.length === 0
                  ? "No projects have been added yet — check back soon."
                  : `No projects tagged with ${selectedSkill}.`}
              </p>
              <Link
                href="/projects"
                className="mt-4 inline-block text-label-md text-primary hover:underline underline-offset-4"
              >
                View all projects
              </Link>
            </div>
          ) : (
            <ul>
              {filtered.map((project, index) => (
                <ScrollReveal key={project.id} delay={index * 40}>
                  <li className="rule">
                    <article className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-5 py-8">
                      <div className="lg:col-span-3">
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-elevated border border-border">
                          {project.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={project.imageUrl}
                              alt={`${project.title} — project screenshot`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full grid place-items-center text-label-xs text-text-faint">
                              No screenshot
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="lg:col-span-5">
                        <p className="text-label-xs text-text-faint tnum">
                          {(index + 1).toString().padStart(2, "0")}
                        </p>
                        <h2 className="mt-2 text-headline-md text-text">
                          {project.title}
                        </h2>
                        <p className="mt-3 text-body-md text-text-secondary measure">
                          {project.description}
                        </p>
                      </div>

                      <div className="lg:col-span-3 lg:col-start-10">
                        <p className="text-label-md text-text-faint leading-relaxed">
                          {project.techs.join("  ·  ")}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-5">
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
                      </div>
                    </article>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
