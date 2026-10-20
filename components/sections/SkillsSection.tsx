"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { Skill, SkillCategory } from "@/lib/api";
import { ArrowUpRight } from "lucide-react";

const CATEGORY_ORDER: SkillCategory[] = ["Frontend", "Backend", "DevOps", "Tools", "Other"];

const CATEGORY_NOTE: Record<SkillCategory, string> = {
  Frontend: "Interfaces that stay fast, accessible and legible under load.",
  Backend: "Services with clear contracts, predictable failure and real observability.",
  DevOps: "Pipelines and infrastructure that make shipping boring.",
  Tools: "The day-to-day instrument set — testing, review, automation.",
  Other: "Everything else that earns its place in the toolbox.",
};

/**
 * Skills as a matrix of domains. Each card names a discipline, shows what it
 * contains, and carries the real proficiency average rather than a decorative
 * meter.
 */
export function SkillsSection({ skills }: { skills: Skill[] }) {
  const categories = CATEGORY_ORDER.map((category) => {
    const items = skills.filter((s) => s.category === category);
    return {
      category,
      items,
      average:
        items.length > 0
          ? Math.round(
              items.reduce((sum, s) => sum + s.proficiency, 0) / items.length,
            )
          : 0,
    };
  }).filter((group) => group.items.length > 0);

  const total = skills.length;
  const average =
    total > 0
      ? Math.round(skills.reduce((sum, s) => sum + s.proficiency, 0) / total)
      : 0;

  return (
    <section id="skills" className="ambient relative scroll-mt-28 border-t border-border">
      <div className="shell flex flex-col gap-space-xl py-space-xl">
        <SectionHeading
          eyebrow="03 // competency matrix"
          title="Technical mastery"
          description="Technologies and practices used to build reliable, scalable systems."
        />

        {categories.length === 0 ? (
          <div className="glass rounded-2xl p-space-lg">
            <p className="text-body-md text-text-secondary">
              Skills are in the making — check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {categories.map((group, groupIndex) => (
              <ScrollReveal key={group.category} delay={groupIndex * 60}>
                <article className="glass flex h-full flex-col gap-space-md rounded-2xl p-space-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-headline-sm text-text">
                      {group.category}
                    </h3>
                    <span className="font-mono text-label-xs uppercase tracking-widest text-text-faint tnum">
                      {group.average} avg
                    </span>
                  </div>

                  <p className="text-body-sm text-text-secondary">
                    {CATEGORY_NOTE[group.category]}
                  </p>

                  <ul className="mt-auto flex flex-wrap gap-1.5 border-t border-border pt-space-md">
                    {group.items.map((skill) => (
                      <li key={skill.id}>
                        <Link
                          href={`/projects?skill=${encodeURIComponent(skill.name)}`}
                          className="group inline-flex items-center gap-2 rounded-md border border-border bg-surface-container px-2.5 py-1 font-mono text-label-sm text-text-secondary transition-colors duration-200 hover:border-secondary/40 hover:text-secondary"
                        >
                          {skill.name}
                          <span className="text-text-faint tnum">
                            {skill.proficiency}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Summary strip */}
        <ScrollReveal>
          <div className="glass flex flex-wrap items-center justify-between gap-x-8 gap-y-3 rounded-2xl px-space-lg py-space-md">
            <span className="inline-flex items-center gap-2 font-mono text-label-xs uppercase tracking-widest text-secondary">
              <span className="beacon beacon-primary" aria-hidden="true" />
              Measured across the matrix
            </span>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-label-sm">
              <Stat label="skills" value={total} />
              <Stat label="avg proficiency" value={`${average}%`} />
              <Stat label="domains" value={categories.length} />
              <Link
                href="/projects"
                className="group inline-flex items-center gap-1.5 uppercase tracking-widest text-text-secondary transition-colors duration-200 hover:text-secondary"
              >
                see them applied
                <ArrowUpRight
                  className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <span className="flex items-center gap-2">
      <span className="text-text-faint">{label}</span>
      <span className="text-text tnum">{value}</span>
    </span>
  );
}
