"use client";

import { ReactNode } from "react";
import { TagPill } from "@/components/ui/TagPill";
import Link from "next/link";
import { useScrollBlur } from "@/hooks/useScrollBlur";

export function AboutSection({
  title,
  description,
  avatar,
  tags,
}: {
  title: string;
  description: string;
  avatar?: ReactNode;
  tags?: string[];
}) {
  const isBlurred = useScrollBlur(80);

  return (
    <section
      className={`relative px-6 transition-all duration-500 -mt-20 z-10 ${
        isBlurred
          ? "backdrop-blur-xl bg-surface/70 border-y border-border/40"
          : ""
      }`}
      style={{ paddingTop: "8rem", paddingBottom: "6rem" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-75 blur-sm animate-[spin_8s_linear_infinite]" />
            <div className="relative w-48 h-48 rounded-2xl overflow-hidden bg-surface border-2 border-border">
              {avatar}
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-headline-md font-semibold text-text mb-4 relative inline-block">
              {title}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary" />
            </h2>
            <p className="text-body-md text-text-secondary leading-relaxed mb-6">
              {description}
            </p>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link key={tag} href={`/projects?skill=${encodeURIComponent(tag)}`}>
                    <TagPill variant="primary" size="md" className="cursor-pointer hover:bg-primary/25 transition-colors">
                      {tag}
                    </TagPill>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}