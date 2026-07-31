"use client";

import { projects } from "@/data/projects";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Link from "next/link";
import { TagPill } from "@/components/ui/TagPill";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-headline-lg font-semibold text-text mb-2">
                Featured Projects
              </h2>
              <p className="text-body-md text-text-secondary">
                Selected work across systems, interfaces, and infrastructure.
              </p>
            </div>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-2 text-primary hover:text-primary-dim transition-colors font-medium"
            >
              View all
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 100}>
              <Link href={`/projects?skill=${encodeURIComponent(project.tech[0])}`} className="block group">
                <div className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full flex flex-col">
                  <div className="relative h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <span className="text-4xl opacity-40 group-hover:opacity-60 transition-opacity">📦</span>
                    {project.featured && (
                      <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-primary text-on-primary text-label-sm font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-headline-sm font-semibold text-text mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-body-sm text-text-secondary mb-4 line-clamp-2 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((t) => (
                        <TagPill key={t} variant="outline" size="sm">
                          {t}
                        </TagPill>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 mt-auto">
                      {project.links?.github && (
                        <span className="text-text-secondary group-hover:text-primary transition-colors text-sm">
                          GitHub
                        </span>
                      )}
                      {project.links?.live && (
                        <span className="text-text-secondary group-hover:text-primary transition-colors text-sm">
                          Live Demo
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dim transition-colors font-medium"
          >
            View all projects
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}