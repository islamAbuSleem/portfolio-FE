"use client";

import { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Terminal } from "@/components/ui/Terminal";

/**
 * The about statement. The words carry it; the panel beside them carries the
 * facts, and the quote carries the point of view.
 */
export function AboutSection({
  title,
  description,
  facts,
}: {
  title: string;
  description: string;
  facts?: { label: string; value: ReactNode }[];
}) {
  const defaultFacts: { label: string; value: ReactNode }[] = [
    { label: "focus", value: "Backend services, distributed systems, interface architecture" },
    { label: "stack", value: "Next.js, NestJS, PostgreSQL, TypeScript" },
    { label: "based", value: "Saudi Arabia (GMT+3) — open to remote, worldwide" },
  ];

  const rows = facts && facts.length > 0 ? facts : defaultFacts;

  return (
    <section id="about" className="ambient relative scroll-mt-28 border-t border-border">
      <div className="shell flex flex-col gap-space-xl py-space-xl">
        <SectionHeading
          eyebrow="02 // operating principles"
          title={title}
          description="What I optimise for, and the standards I hold the work to."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <p className="text-body-lg text-text-secondary measure text-[1.0625rem] md:text-[1.1875rem]">
              {description}
            </p>

            <figure className="glass rounded-2xl p-space-lg">
              <div className="font-mono text-label-xs uppercase tracking-widest text-text-faint">
                Engineering core tenet
              </div>
              <blockquote className="mt-3 text-body-lg italic text-text">
                “Software architecture is the art of postponing decisions while
                maintaining execution velocity, deterministic type contracts and
                zero-compromise developer empathy.”
              </blockquote>
              <figcaption className="mt-4 font-mono text-label-sm text-text-faint">
                — Islam Abusleem
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-5">
            <Terminal title="about.profile" status="loaded" bodyClassName="space-y-1">
              {rows.map((row) => (
                <div key={row.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <span className="w-20 shrink-0 text-text-faint">{row.label}</span>
                  <span className="text-text">{row.value}</span>
                </div>
              ))}
            </Terminal>
          </div>
        </div>
      </div>
    </section>
  );
}
