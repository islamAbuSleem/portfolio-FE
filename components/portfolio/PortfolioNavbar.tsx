"use client";

import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";
import { useActiveSection } from "@/hooks/useActiveSection";
import { LocalClock } from "@/components/ui/LocalClock";

/**
 * The work comes first: a reader deciding whether to keep scrolling should
 * meet projects, not a biography.
 */
const SECTIONS = [
  { id: "projects", index: "01", label: "Work", href: "/#projects" },
  { id: "about", index: "02", label: "About", href: "/#about" },
  { id: "skills", index: "03", label: "Skills", href: "/#skills" },
  { id: "experience", index: "04", label: "Experience", href: "/#experience" },
  { id: "contact", index: "05", label: "Contact", href: "/#contact" },
];

const SECTION_IDS = SECTIONS.map((s) => s.id);

export function PortfolioNavbar() {
  const { theme, toggleTheme, mounted } = useTheme();
  const active = useActiveSection(SECTION_IDS);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-bg/90 backdrop-blur-md rule-b">
      <div className="shell h-14 flex items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3 shrink-0">
          <span className="w-7 h-7 grid place-items-center bg-primary text-on-primary text-label-xs font-semibold">
            IA
          </span>
          <span className="text-label-lg text-text group-hover:text-primary transition-colors duration-200">
            Islam Abusleem
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label="Sections">
          {SECTIONS.map((section) => {
            const isActive = active === section.id;
            return (
              <Link
                key={section.id}
                href={section.href}
                aria-current={isActive ? "true" : undefined}
                className={`text-label-md transition-colors duration-200 ${
                  isActive ? "text-primary" : "text-text-secondary hover:text-text"
                }`}
              >
                <span className="tnum mr-2 text-text-faint">{section.index}</span>
                {section.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden sm:block">
            <LocalClock />
          </span>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              mounted
                ? `Switch to ${theme === "dark" ? "light" : "dark"} theme`
                : "Toggle theme"
            }
            className="w-8 h-8 grid place-items-center border border-border text-text-secondary hover:text-primary hover:border-primary transition-colors duration-200 cursor-pointer"
          >
            {mounted ? (
              theme === "dark" ? (
                <SunIcon />
              ) : (
                <MoonIcon />
              )
            ) : (
              <span className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}
