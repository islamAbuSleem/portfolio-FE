"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view so the index spine can mark it.
 * Uses a band across the upper third of the viewport: the active section is
 * the last one whose top edge has passed that line.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const onScroll = () => {
      const line = window.innerHeight * 0.32;
      let current: string | null = elements[0].id;

      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) {
          current = el.id;
        } else {
          break;
        }
      }

      // Pin the last section once the page is scrolled to the bottom.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = elements[elements.length - 1].id;
      }

      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return active;
}
