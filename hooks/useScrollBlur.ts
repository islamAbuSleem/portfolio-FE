"use client";

import { useEffect, useState } from "react";

export function useScrollBlur(threshold: number = 0) {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    let raf: number;
    const handleScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setIsBlurred(window.scrollY > threshold);
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [threshold]);

  return isBlurred;
}