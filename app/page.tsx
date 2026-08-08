import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { PortfolioNavbar } from "@/components/portfolio/PortfolioNavbar";
import { getAbout, getExperience, getProjects, getSkills } from "@/lib/api";

export default async function Home() {
  const [about, skills, experience, projects] = await Promise.all([
    getAbout().catch(() => null),
    getSkills().catch(() => []),
    getExperience().catch(() => []),
    getProjects().catch(() => []),
  ]);

  return (
    <>
      <PortfolioNavbar />
      <main className="flex-1">
        <Hero />
        <AboutSection
          title="About Me"
          description={about?.bio ?? "Add your story from the admin panel."}
          avatar={
            about?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={about.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            )
          }
        />
        <SkillsSection skills={skills} />
        <ExperienceSection experiences={experience} />
        <FeaturedProjects projects={projects} />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}