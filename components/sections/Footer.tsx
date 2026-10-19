"use client";

import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";

export function Footer() {
  return (
    <footer className="relative mt-auto">
      <div className="shell">
        <div className="rule-b">
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-label-md text-text-faint tnum">
              © {new Date().getFullYear()} Islam Abusleem
            </p>
            <p className="text-label-md text-text-faint">
              Built with Next.js, NestJS and PostgreSQL
            </p>
            <div className="flex items-center gap-5">
              <a
                href="https://github.com/islamAbuSleem"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors duration-200"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/islamabusleem"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
