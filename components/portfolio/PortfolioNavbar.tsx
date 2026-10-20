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
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-5">
        {/* Identity */}
        <Link href="/" className="group flex items-center gap-3 shrink-0">
          <span className="w-8 h-8 grid place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary font-mono text-label-sm font-semibold transition-colors duration-200 group-hover:bg-primary/20">
            IA
          </span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="text-label-md uppercase tracking-widest text-text">
              Islam Abusleem
            </span>
            <span className="mt-1 text-label-xs uppercase tracking-widest text-text-faint">
              Sr. Full-Stack Engineer
            </span>
          </span>
        </Link>

        {/* Availability */}
        <span className="hidden lg:inline-flex items-center gap-2 rounded-lg border border-border bg-surface-container px-3 py-2 font-mono text-label-xs uppercase tracking-widest text-text-secondary">
          <span className="beacon" aria-hidden="true" />
          Available for contract / staff roles
        </span>

        <nav className="hidden md:flex items-center gap-6" aria-label="Sections">
          {SECTIONS.map((section) => {
            const isActive = active === section.id;
            return (
              <Link
                key={section.id}
                href={section.href}
                aria-current={isActive ? "true" : undefined}
                className={`font-mono text-label-sm uppercase tracking-widest transition-colors duration-200 ${
                  isActive ? "text-primary" : "text-text-secondary hover:text-text"
                }`}
              >
                {section.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden xl:block">
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
            className="w-8 h-8 grid place-items-center rounded-lg border border-border text-text-secondary hover:text-primary hover:border-primary/50 transition-colors duration-200 cursor-pointer"
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

      {/* The same index, on one scrollable line, for narrow screens. */}
      <nav
        className="md:hidden flex items-center gap-5 overflow-x-auto border-t border-border px-6 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Sections"
      >
        {SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <Link
              key={section.id}
              href={section.href}
              aria-current={isActive ? "true" : undefined}
              className={`shrink-0 font-mono text-label-sm uppercase tracking-widest transition-colors duration-200 ${
                isActive
                  ? "text-primary"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              {section.label}
            </Link>
          );
        })}
      </nav>
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
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}
