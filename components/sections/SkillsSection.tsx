"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Link from "next/link";
import { Skill, SkillCategory } from "@/lib/api";

const CATEGORY_ORDER: SkillCategory[] = ["Frontend", "Backend", "DevOps", "Tools", "Other"];

/**
 * Skills as an index, not a card grid: a category label, then each skill
 * with a hairline meter and a real number. The measurement is the design.
 */
export function SkillsSection({ skills }: { skills: Skill[] }) {
  const categories = CATEGORY_ORDER.map((category) => ({
    category,
    items: skills.filter((s) => s.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <section id="skills" data-accent="mint" className="relative scroll-mt-24">
      <div className="shell">
        <ScrollReveal>
          <div className="rule section-rule pt-16 md:pt-24 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-x-10">
            <div className="lg:col-span-3">
              <p className="text-label-xs section-index">03</p>
              <h2 className="mt-3 text-headline-lg text-text">Skills</h2>
              <p className="mt-4 text-body-sm text-text-secondary measure-tight">
                Technologies and practices used to build reliable, scalable
                systems.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {categories.length === 0 ? (
          <div className="rule py-10">
            <p className="text-body-md text-text-secondary">
              Skills are in the making â€” check back soon.
            </p>
          </div>
        ) : (
          categories.map((group, groupIndex) => (
            <ScrollReveal key={group.category} delay={groupIndex * 60}>
              <div className="rule grid grid-cols-1 lg:grid-cols-12 gap-x-10 py-7">
                <div className="lg:col-span-3">
                  <h3 className="text-label-md text-text">{group.category}</h3>
                </div>
                <ul className="lg:col-span-8 lg:col-start-5 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
                  {group.items.map((skill) => (
                    <li key={skill.id}>
                      <Link
                        href={`/projects?skill=${encodeURIComponent(skill.name)}`}
                        className="group grid grid-cols-[1fr_4.5rem_2.25rem] items-center gap-3"
                      >
                        <span className="text-body-sm text-text-secondary group-hover:text-primary transition-colors duration-200">
                          {skill.name}
                        </span>
                        <span
                          className="block h-px bg-rule-strong relative overflow-hidden"
                          aria-hidden="true"
                        >
                          <span
                            className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-500 ease-out-cubic"
                            style={{ width: `${Math.min(100, skill.proficiency)}%` }}
                          />
                        </span>
                        <span className="text-label-sm text-text-faint tnum text-right">
                          {skill.proficiency}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))
        )}
      </div>
    </section>
  );
}
