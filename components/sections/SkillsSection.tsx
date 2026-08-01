"use client";

import { useInView } from "@/hooks/useInView";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Link from "next/link";

interface SkillCategory {
  title: string;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "PostgreSQL", "GraphQL", "Redis", "Microservices"],
  },
  {
    title: "DevOps",
    skills: ["Docker", "AWS", "Kubernetes", "CI/CD", "Terraform"],
  },
  {
    title: "Tools & Practices",
    skills: ["Git", "Figma", "Testing", "System Design", "Agile"],
  },
];

export function SkillsSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-headline-md md:text-headline-lg font-semibold text-text mb-4 text-center">
            Skills &amp; Expertise
          </h2>
          <p className="text-body-md text-text-secondary text-center max-w-2xl mx-auto mb-12">
            Technologies and practices I use to build reliable, scalable systems.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <ScrollReveal key={category.title} delay={index * 100}>
              <div className="glass rounded-2xl p-6 h-full transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-headline-sm font-semibold text-text mb-5">
                  {category.title}
                </h3>
                <div className="flex flex-col gap-3">
                  {category.skills.map((skill) => (
                    <Link
                      key={skill}
                      href={`/projects?skill=${encodeURIComponent(skill)}`}
                      className="flex items-center gap-3 group/skill"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-body-sm text-text-secondary group-hover/skill:text-primary transition-colors">{skill}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}