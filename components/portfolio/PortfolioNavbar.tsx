"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import Link from "next/link";

export function PortfolioNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-bg/80 border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-on-primary font-bold text-sm">KS</span>
          </div>
          <span className="font-semibold text-text group-hover:text-primary transition-colors">
            Kinetic Syntax
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#about" className="text-sm text-text-secondary hover:text-text transition-colors">About</Link>
          <Link href="/#skills" className="text-sm text-text-secondary hover:text-text transition-colors">Skills</Link>
          <Link href="/#experience" className="text-sm text-text-secondary hover:text-text transition-colors">Experience</Link>
          <Link href="/projects" className="text-sm text-text-secondary hover:text-text transition-colors">Projects</Link>
          <Link href="/#contact" className="text-sm text-text-secondary hover:text-text transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}