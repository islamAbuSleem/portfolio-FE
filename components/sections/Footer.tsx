"use client";

import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border bg-surface-container-lowest">
      <div className="shell">
        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-2 font-mono text-label-xs uppercase tracking-widest text-secondary">
              <span className="beacon" aria-hidden="true" />
              Portfolio live on Cloudflare Workers
            </span>
            <p className="font-mono text-label-xs uppercase tracking-widest text-text-faint">
              © {new Date().getFullYear()} Islam Abusleem · Built with Next.js,
              NestJS and PostgreSQL
            </p>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/islamAbuSleem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-secondary transition-colors duration-200"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/islamabusleem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-secondary transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
