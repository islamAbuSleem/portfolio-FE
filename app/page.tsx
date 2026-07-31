import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection
        title="About Me"
        description="I'm a senior full-stack engineer with a passion for building high-performance distributed systems and immersive frontend experiences. I thrive on turning complex problems into elegant, scalable solutions."
        avatar={
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <span className="text-6xl">👨‍💻</span>
          </div>
        }
        tags={["Expertly Crafted", "Solution Driven", "Performance First"]}
      />
      <SkillsSection />
      <ExperienceSection />
      <FeaturedProjects />
    </main>
  );
}