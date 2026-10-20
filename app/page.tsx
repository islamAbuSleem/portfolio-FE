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
import { yearsOfExperience } from "@/lib/utils";
import { resolveBio } from "@/lib/profile";

export default async function Home() {
  const [about, skills, experience, projects] = await Promise.all([
    getAbout().catch(() => null),
    getSkills().catch(() => []),
    getExperience().catch(() => []),
    getProjects().catch(() => []),
  ]);

  const allProjects = mergeProjects(projects);

  /**
   * Years of experience, measured from the earliest role on record. Computed
   * on the server so the number the visitor reads is the same one the
   * server rendered.
   */
  const years = yearsOfExperience(experience);

  const avatar = about?.avatarUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={about.avatarUrl}
      alt="Islam Abusleem, Senior Software Engineer"
      className="h-full w-full object-cover grayscale contrast-125 transition-all duration-700 ease-out hover:grayscale-0"
    />
  ) : undefined;

  return (
    <>
      <PortfolioNavbar />
      <main className="flex-1">
        <Hero
          projects={allProjects}
          skills={skills}
          experiences={experience}
          years={years}
          avatar={avatar}
        />
        <FeaturedProjects projects={allProjects} />
        <AboutSection
          title="About Me"
          description={resolveBio(about?.bio)}
        />
        <SkillsSection skills={skills} />
        <ExperienceSection experiences={experience} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
