"use client";

import { useInView } from "@/hooks/useInView";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { experiences } from "@/data/experiences";

function TimelineDot({ inView }: { inView: boolean }) {
  return (
    <div className="relative flex-shrink-0 w-4 h-4">
      {inView && (
        <>
          <span className="absolute inset-0 rounded-full bg-primary/40 animate-[ring-expand_1s_ease-out_infinite]" />
          <span className="absolute inset-0 rounded-full bg-primary/30 animate-[ring-expand_1s_ease-out_0.3s_infinite]" />
        </>
      )}
      <span
        className={`absolute inset-0 rounded-full bg-primary border-2 border-bg ${
          inView ? "animate-pulse" : ""
        }`}
      />
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-headline-lg font-semibold text-text mb-4 text-center">
            Experience
          </h2>
          <p className="text-body-md text-text-secondary text-center max-w-2xl mx-auto mb-16">
            A timeline of roles where I shipped work and grew as an engineer.
          </p>
        </ScrollReveal>

        <div className="relative">
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-secondary"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <ExperienceItem key={exp.id} experience={exp} isEven={isEven} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({
  experience,
  isEven,
}: {
  experience: typeof experiences[0];
  isEven: boolean;
}) {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 md:gap-0 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateX(0)"
          : isEven
            ? "translateX(-20px)"
            : "translateX(20px)",
        transition: "opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
        <TimelineDot inView={inView} />
      </div>

      <div className={`flex-1 ml-14 md:ml-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
        <div className="glass rounded-2xl p-6 transition-all duration-300 hover:border-primary/30">
          <div className="flex flex-col gap-1">
            <h3 className="text-headline-sm font-semibold text-text">
              {experience.role}
              {experience.current && (
                <span
                  className="inline-block ml-2 px-2 py-0.5 rounded-full bg-primary text-on-primary text-label-sm font-medium"
                  style={{ animation: "now-badge-pulse 2s ease-in-out infinite" }}
                >
                  NOW
                </span>
              )}
            </h3>
            <p className="text-primary font-medium">{experience.company}</p>
            <p className="text-label-md text-text-secondary mb-3">{experience.period}</p>
            <p className="text-body-sm text-text-secondary">{experience.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}