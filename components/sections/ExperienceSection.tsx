"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Experience } from "@/lib/api";
import { formatPeriod } from "@/lib/utils";

/**
 * Roles as a ledger: the period in tabular figures on the left, the role
 * and what was shipped on the right. No timeline spine, no pulsing markers â€”
 * a reader scanning for "what did they do, and when" gets it in one pass.
 */
export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" data-accent="mint" className="relative scroll-mt-24">
      <div className="shell">
        <ScrollReveal>
          <div className="rule section-rule pt-16 md:pt-24 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-x-10">
            <div className="lg:col-span-3">
              <p className="text-label-xs section-index">04</p>
              <h2 className="mt-3 text-headline-lg text-text">Experience</h2>
              <p className="mt-4 text-body-sm text-text-secondary measure-tight">
                Roles where I shipped work and grew as an engineer.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {experiences.length === 0 ? (
          <div className="rule py-10">
            <p className="text-body-md text-text-secondary">
              Work history is being updated â€” check back soon.
            </p>
          </div>
        ) : (
          experiences.map((experience, index) => (
            <ScrollReveal key={experience.id} delay={index * 60}>
              <article className="rule grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-3 py-7">
                <div className="lg:col-span-3">
                  <p className="text-label-md text-text-secondary tnum">
                    {formatPeriod(
                      experience.startDate,
                      experience.endDate,
                      experience.current,
                    )}
                  </p>
                  {experience.current && (
                    <p className="mt-1.5 text-label-xs text-tertiary">
                      Current
                    </p>
                  )}
                </div>

                <div className="lg:col-span-4">
                  <h3 className="text-headline-sm text-text">
                    {experience.role}
                  </h3>
                  <p className="mt-1 text-body-sm text-primary">
                    {experience.company}
                  </p>
                </div>

                <p className="lg:col-span-5 text-body-sm text-text-secondary measure">
                  {experience.description}
                </p>
              </article>
            </ScrollReveal>
          ))
        )}
      </div>
    </section>
  );
}
