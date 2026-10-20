"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Experience } from "@/lib/api";
import { formatPeriod } from "@/lib/utils";

/**
 * A role's description is a list of contributions, one per line in the
 * database. A single-line description still renders as a paragraph, so the
 * admin panel can keep working either way.
 */
function Description({ text }: { text: string }) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) {
    return <p className="text-body-sm text-text-secondary measure">{text}</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {lines.map((line) => (
        <li key={line} className="flex gap-3">
          <span
            className="mt-[0.55em] h-px w-3 shrink-0 bg-primary/60"
            aria-hidden="true"
          />
          <span className="text-body-sm text-text-secondary">
            {line}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Roles on a rail. Each node is a position in time; each card is the work
 * that happened there. The period is monospaced and tabular so a reader
 * scanning for "what did they do, and when" gets it in one pass.
 */
export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="ambient relative scroll-mt-28 border-t border-border">
      <div className="shell flex flex-col gap-space-xl py-space-xl">
        <SectionHeading
          eyebrow="04 // career journey"
          title="Professional experience"
          description="Roles where I shipped work and grew as an engineer."
        />

        {experiences.length === 0 ? (
          <div className="glass rounded-2xl p-space-lg">
            <p className="text-body-md text-text-secondary">
              Work history is being updated — check back soon.
            </p>
          </div>
        ) : (
          <ol className="flex flex-col gap-space-lg">
            {experiences.map((experience, index) => (
              <ScrollReveal key={experience.id} delay={index * 60}>
                <li className="timeline-rail">
                  <span className="timeline-node" aria-hidden="true" />

                  <article className="glass rounded-2xl p-space-lg transition-all duration-300 hover:border-primary/30">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                      <div className="lg:col-span-3">
                        <p className="font-mono text-label-sm text-text-secondary tnum">
                          {formatPeriod(
                            experience.startDate,
                            experience.endDate,
                            experience.current,
                          )}
                        </p>
                        {experience.current && (
                          <p className="mt-2 inline-flex items-center gap-2 font-mono text-label-xs uppercase tracking-widest text-tertiary">
                            <span className="beacon beacon-primary" aria-hidden="true" />
                            Current
                          </p>
                        )}
                      </div>

                      <div className="lg:col-span-8">
                        <h3 className="text-headline-sm text-text">
                          {experience.role}
                        </h3>
                        <p className="mt-1 font-mono text-label-md text-secondary">
                          {experience.company}
                        </p>
                        <div className="mt-3">
                          <Description text={experience.description} />
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
