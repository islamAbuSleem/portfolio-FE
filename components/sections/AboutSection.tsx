"use client";

import { ReactNode } from "react";

/**
 * The about statement. No portrait treatment, no ornament: the words and a
 * monogram do the work, separated by the same hairline rules used elsewhere.
 */
export function AboutSection({
  title,
  description,
  avatar,
}: {
  title: string;
  description: string;
  avatar?: ReactNode;
}) {
  return (
    <section id="about" data-accent="mint" className="relative scroll-mt-24 overflow-hidden">
      <div className="shell">
        <div className="rule section-rule pt-16 md:pt-24 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10 relative">
          {/* Oversized numeral: scale and depth, without competing for
              attention. */}
          <span
            className="giant-num absolute -top-10 right-0 lg:right-4 -z-10 pointer-events-none select-none"
            aria-hidden="true"
          >
            08
          </span>

          <div className="lg:col-span-3">
            <p className="text-label-xs section-index">02</p>
            <h2 className="mt-3 text-headline-lg text-text">{title}</h2>
            <p className="mt-3 text-label-md text-text-faint">
              8+ years shipping
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-5">
            <p className="text-body-lg text-text-secondary measure text-[1.0625rem] md:text-[1.1875rem]">
              {description}
            </p>
          </div>

          <div className="lg:col-span-2 lg:col-start-11 lg:justify-self-end">
            {avatar}
          </div>
        </div>
      </div>
    </section>
  );
}
