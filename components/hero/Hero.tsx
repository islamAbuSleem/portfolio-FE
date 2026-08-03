"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";

const PHRASES = ["diverse systems", "innovative interfaces", "meaningful experiences"];

export function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const bgRef = useParallax(0.1);
  const contentRef = useParallax(0.25);
  const fgRef = useParallax(0.4);

  useEffect(() => {
    let innerTimeout: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setVisible(false);
      innerTimeout = setTimeout(() => {
        setPhraseIndex((i) => (i + 1) % PHRASES.length);
        setVisible(true);
      }, 500);
    }, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(innerTimeout);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-bg via-surface to-bg will-change-transform"
        aria-hidden="true"
      />
      <div
        className="noise absolute inset-0 z-0"
        aria-hidden="true"
      />

      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto will-change-transform"
      >
        <div className="relative inline-block mb-8">
          <h1 className="text-display-lg-mobile md:text-display-xl font-extrabold text-text leading-tight tracking-tight">
            I build{" "}
            <span className="text-gradient-primary">diverse</span>{" "}
            <span className="text-gradient-secondary">systems</span>
            <br />
            and{" "}
            <span className="text-gradient-secondary">innovative</span>{" "}
            <span className="text-gradient-primary">interfaces</span>
          </h1>
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-primary/20 blur-3xl rounded-full"
            style={{ animation: "headline-glow 3s ease-in-out infinite" }}
            aria-hidden="true"
          />
        </div>

        <p className="text-body-lg text-text-secondary mb-10">
          Specializing in{" "}
          <span
            className={`inline-block transition-opacity duration-500 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            {PHRASES[phraseIndex]}
          </span>
        </p>

        <div className="flex items-center justify-center gap-4">
          <Button variant="primary" size="lg" className="animate-glow">
            View Projects
          </Button>
          <Button variant="ghost" size="lg">
            Contact Me
          </Button>
        </div>
      </div>

      <div
        ref={fgRef}
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2 will-change-transform"
        style={{ transform: "translateX(-50%)" }}
      >
        <span className="text-label-md text-text-secondary tracking-widest">SCROLL</span>
        <ChevronDown className="w-5 h-5 text-text-secondary animate-bounce" />
      </div>
    </section>
  );
}