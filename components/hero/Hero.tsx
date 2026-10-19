"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/api";

/**
 * The first viewport is a thesis, not a header: who this is, what they do,
 * and - immediately - the index of the work.
 *
 * One accent does all the talking. The name is set in it, the index of the
 * work sits on a solid field of it, and everything between is quiet.
 */
export function Hero({ projects }: { projects: Project[] }) {
  const listed = projects.slice(0, 5);

  return (
    <section className="relative pt-28 md:pt-36 pb-0">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12">
          {/* Name and statement */}
          <div className="lg:col-span-7">
            <h1 className="text-display-xl display-expanded text-text">
              Islam
              <br />
              <span className="text-primary">Abusleem</span>
            </h1>

            <p className="mt-8 text-body-lg text-text-secondary measure">
              Senior full-stack engineer. I build distributed systems, backend
              services and interfaces that hold up in production - and I ship
              them, not just design them.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2.5 bg-primary text-on-primary px-6 py-3 text-body-md font-medium transition-colors duration-200 hover:bg-primary-dim"
              >
                View the work
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2.5 border border-border px-6 py-3 text-body-md text-text transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                Get in touch
              </Link>
            </div>
          </div>

          {/* Facts, kept quiet so the accent stays loud */}
          <dl className="lg:col-span-4 lg:col-start-9 self-end border-t border-border">
            <div className="py-4 grid grid-cols-3 gap-4 border-b border-border">
              <dt className="text-label-xs text-text-faint">Focus</dt>
              <dd className="col-span-2 text-body-sm text-text-secondary">
                Backend services, distributed systems, interface architecture
              </dd>
            </div>
            <div className="py-4 grid grid-cols-3 gap-4 border-b border-border">
              <dt className="text-label-xs text-text-faint">Stack</dt>
              <dd className="col-span-2 text-body-sm text-text-secondary">
                Next.js, NestJS, PostgreSQL, TypeScript
              </dd>
            </div>
            <div className="py-4 grid grid-cols-3 gap-4">
              <dt className="text-label-xs text-text-faint">Based</dt>
              <dd className="col-span-2 text-body-sm text-text-secondary">
                Saudi Arabia (GMT+3) - open to remote, worldwide
              </dd>
            </div>
          </dl>
        </div>

        {/* The index of the work, on the one solid field of the accent. */}
        {listed.length > 0 && (
          <div className="mt-16 md:mt-24 field-primary">
            <div className="flex items-baseline justify-between px-6 md:px-8 py-4">
              <p className="text-label-xs opacity-75">Index</p>
              <p className="text-label-xs opacity-75 tnum">
                {projects.length.toString().padStart(2, "0")} projects
              </p>
            </div>
            <ul>
              {listed.map((project, index) => {
                const href = project.liveUrl ?? project.githubUrl ?? "#";
                const isLive = Boolean(project.liveUrl);
                return (
                  <li key={project.id}>
                    <a
                      href={href}
                      target={isLive ? "_blank" : undefined}
                      rel={isLive ? "noopener noreferrer" : undefined}
                      className="group grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[3rem_1fr_14rem_6rem] items-baseline gap-x-4 px-6 md:px-8 py-5 border-t border-current/20 transition-colors duration-200 hover:bg-black/10"
                    >
                      <span className="text-label-xs opacity-60 tnum">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <span className="text-headline-md">
                        {project.title}
                      </span>
                      <span className="hidden md:block text-label-md opacity-70 truncate">
                        {project.techs.slice(0, 3).join(" · ")}
                      </span>
                      <span className="flex items-center gap-1.5 text-label-md">
                        {isLive ? "live" : "source"}
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
