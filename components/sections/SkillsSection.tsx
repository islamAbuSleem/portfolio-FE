"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Link from "next/link";
import { Skill, SkillCategory } from "@/lib/api";

const CATEGORY_ORDER: SkillCategory[] = ["Frontend", "Backend", "DevOps", "Tools", "Other"];

export function SkillsSection({ skills }: { skills: Skill[] }) {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-headline-md md:text-headline-lg font-semibold text-text mb-4 text-center">
            Skills &amp; Expertise
          </h2>
          <p className="text-body-md text-text-secondary mb-12">
            Technologies and practices I use to build reliable, scalable systems.
          </p>
        </ScrollReveal>

        {skills.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center">
            <p className="text-body-md text-text-secondary">
              Skills are in the making — check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORY_ORDER.map((category, index) => {
              const categorySkills = skills.filter((s) => s.category === category);
              if (categorySkills.length === 0) return null;
              return (
                <ScrollReveal key={category} delay={index * 100}>
                  <div className="glass rounded-2xl p-6 h-full transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg">
                    <h3 className="text-headline-sm font-semibold text-text mb-5">
                      {category}
                    </h3>
                    <div className="flex flex-col gap-3">
                      {categorySkills.map((skill) => (
                        <Link
                          key={skill.id}
                          href={`/projects?skill=${encodeURIComponent(skill.name)}`}
                          className="flex items-center gap-3 group/skill"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className="text-body-sm text-text-secondary group-hover/skill:text-primary transition-colors">{skill.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}