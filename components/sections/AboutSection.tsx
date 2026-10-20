"use client";

import { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Terminal } from "@/components/ui/Terminal";
import { PROFILE } from "@/lib/profile";

/**
 * The about statement: the CV summary, what the work is actually like, and
 * the domains it has been in. The panel beside it carries the facts.
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
    { label: "role", value: `${PROFILE.title} — ${PROFILE.titleSecondary}` },
    { label: "focus", value: PROFILE.summary },
    { label: "based", value: `${PROFILE.location} (UTC ${PROFILE.timezone})` },
    { label: "phone", value: PROFILE.phone },
    { label: "email", value: PROFILE.email },
  ];

  const rows = facts && facts.length > 0 ? facts : defaultFacts;

  return (
    <section id="about" className="ambient relative scroll-mt-28 border-t border-border">
      <div className="shell flex flex-col gap-space-xl py-space-xl">
        <SectionHeading
          eyebrow="02 // profile"
          title={title}
          description="What I build, where I have built it, and how I work."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <p className="text-body-lg text-text-secondary measure text-[1.0625rem] md:text-[1.1875rem]">
              {description}
            </p>

            {/* What the work is like - the CV's own strengths, not a quote
                borrowed from someone else. */}
            <div className="glass rounded-2xl p-space-lg">
              <div className="font-mono text-label-xs uppercase tracking-widest text-text-faint">
                Core strengths
              </div>
              <ul className="mt-3 flex flex-col gap-3">
                {PROFILE.coreStrengths.map((strength) => (
                  <li key={strength} className="flex gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                    <span className="text-body-md text-text-secondary">
                      {strength}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <Terminal title="profile.config" status="loaded" bodyClassName="space-y-1">
              {rows.map((row) => (
                <div key={row.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <span className="w-20 shrink-0 text-text-faint">{row.label}</span>
                  <span className="text-text break-all">{row.value}</span>
                </div>
              ))}
            </Terminal>

            {/* Education and languages, from the CV. */}
            <div className="glass rounded-2xl p-space-lg">
              <div className="font-mono text-label-xs uppercase tracking-widest text-text-faint">
                Education
              </div>
              <p className="mt-2 text-body-sm text-text">
                {PROFILE.education.degree}
              </p>
              <p className="text-body-sm text-text-secondary">
                {PROFILE.education.school}
              </p>
              <p className="mt-1 font-mono text-label-sm text-text-faint tnum">
                {PROFILE.education.period}
              </p>

              <div className="mt-4 border-t border-border pt-4">
                <div className="font-mono text-label-xs uppercase tracking-widest text-text-faint">
                  Professional development
                </div>
                <p className="mt-2 text-body-sm text-text-secondary">
                  {PROFILE.training}
                </p>
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <div className="font-mono text-label-xs uppercase tracking-widest text-text-faint">
                  Languages
                </div>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {PROFILE.languages.map((language) => (
                    <li
                      key={language.label}
                      className="flex items-center justify-between gap-3 text-body-sm"
                    >
                      <span className="text-text">{language.label}</span>
                      <span className="font-mono text-label-sm text-text-faint">
                        {language.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Where the work has been. */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-container px-3 py-1.5 font-mono text-label-xs uppercase tracking-widest text-secondary">
              <span className="beacon beacon-secondary" aria-hidden="true" />
              Selected product domains
            </span>
          </div>

          <div className="mt-space-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {PROFILE.domains.map((domain) => (
              <article
                key={domain.label}
                className="glass flex flex-col gap-2 rounded-2xl p-space-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
              >
                <h3 className="text-headline-sm text-text">{domain.label}</h3>
                <p className="text-body-sm text-text-secondary">{domain.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
