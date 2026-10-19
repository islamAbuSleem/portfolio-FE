"use client";

import { useEffect, useState } from "react";

export function useScrollBlur(threshold: number = 0) {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    let raf: number | null = null;
    const handleScroll = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setIsBlurred(window.scrollY > threshold);
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [threshold]);

  return isBlurred;
}
