import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { PortfolioNavbar } from "@/components/portfolio/PortfolioNavbar";
import { getAbout, getExperience, getProjects, getSkills } from "@/lib/api";
import { mergeProjects } from "@/lib/projects";

export default async function Home() {
  const [about, skills, experience, projects] = await Promise.all([
    getAbout().catch(() => null),
    getSkills().catch(() => []),
    getExperience().catch(() => []),
    getProjects().catch(() => []),
  ]);

  const allProjects = mergeProjects(projects);

  return (
    <>
      <PortfolioNavbar />
      <main className="flex-1">
        <Hero projects={allProjects} />
        <FeaturedProjects projects={allProjects} />
        <AboutSection
          title="About Me"
          description={
            about?.bio ??
            "Full-stack developer passionate about building beautiful, performant web applications. Experienced with React, Next.js, Vue, Nuxt, Node.js, NestJS, Java, Spring Boot, and modern cloud infrastructure."
          }
          avatar={
            about?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={about.avatarUrl}
                alt="Islam Abusleem"
                className="w-full aspect-square object-cover border border-border"
              />
            ) : (
              <div className="w-full aspect-square grid place-items-center border border-border bg-surface-elevated">
                <span className="text-display-lg-mobile text-text-faint">IA</span>
              </div>
            )
          }
        />
        <SkillsSection skills={skills} />
        <ExperienceSection experiences={experience} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
