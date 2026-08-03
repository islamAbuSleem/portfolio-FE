"use client";

import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";

export function Footer() {
  return (
    <footer className="relative border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-body-sm text-text-secondary">
            © {new Date().getFullYear()} Kinetic Syntax. Expertly crafted.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-text-secondary hover:text-primary transition-colors" aria-label="GitHub">
              <GithubIcon />
            </a>
            <a href="#" className="text-text-secondary hover:text-primary transition-colors" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}