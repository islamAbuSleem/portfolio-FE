import { projects } from "@/data/projects";
import Link from "next/link";
import { TagPill } from "@/components/ui/TagPill";

export const dynamic = "force-dynamic";

export default function ProjectsPage({ searchParams }: { searchParams: { skill?: string } }) {
  const selectedSkill = searchParams.skill;
  const filtered = selectedSkill
    ? projects.filter((p) => p.tech.some((t) => t.toLowerCase() === selectedSkill.toLowerCase()))
    : projects;

  const uniqueSkills = Array.from(new Set(projects.flatMap((p) => p.tech))).sort();

  return (
    <main className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-headline-lg font-semibold text-text mb-2">
            {selectedSkill ? `Projects using ${selectedSkill}` : "Projects"}
          </h1>
          <p className="text-body-md text-text-secondary">
            {selectedSkill
              ? `Showing ${filtered.length} project${filtered.length !== 1 ? "s" : ""} tagged with "${selectedSkill}".`
              : `A selection of ${projects.length} projects across systems, interfaces, and infrastructure.`}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/projects"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !selectedSkill
                ? "bg-primary text-on-primary"
                : "bg-surface-elevated text-text-secondary hover:text-text border border-border"
            }`}
          >
            All
          </Link>
          {uniqueSkills.map((skill) => (
            <Link
              key={skill}
              href={`/projects?skill=${encodeURIComponent(skill)}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedSkill?.toLowerCase() === skill.toLowerCase()
                  ? "bg-primary text-on-primary"
                  : "bg-surface-elevated text-text-secondary hover:text-text border border-border"
              }`}
            >
              {skill}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-body-lg text-text-secondary mb-4">No projects found for this skill.</p>
            <Link href="/projects" className="text-primary hover:underline font-medium">
              View all projects
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
              >
                <div className="relative h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <span className="text-4xl opacity-40 group-hover:opacity-60 transition-opacity">📦</span>
                  {project.featured && (
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-primary text-on-primary text-label-sm font-medium">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-headline-sm font-semibold text-text mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-body-sm text-text-secondary mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <TagPill key={t} variant="outline" size="sm">
                        {t}
                      </TagPill>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        className="text-text-secondary hover:text-primary transition-colors text-sm"
                      >
                        GitHub
                      </a>
                    )}
                    {project.links?.live && (
                      <a
                        href={project.links.live}
                        className="text-text-secondary hover:text-primary transition-colors text-sm"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}