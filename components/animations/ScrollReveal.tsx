"use client";

import { ReactNode, useSyncExternalStore } from "react";
import { useInView } from "@/hooks/useInView";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const subscribe = () => () => {};
const getClient = () => true;
const getServer = () => false;

/**
 * The page's single authored motion: content eases up into place once, with
 * an exponential ease-out.
 *
 * The default state is *visible*. The attribute that hides it is only applied
 * once the client has taken over, so a server-rendered page (or one without
 * JavaScript) is never blank.
 */
export function ScrollReveal({ children, delay = 0, className = "" }: ScrollRevealProps) {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const armed = useSyncExternalStore(subscribe, getClient, getServer);

  return (
    <div
      ref={ref}
      data-reveal={armed && !inView ? "out" : "in"}
      style={{ transitionDelay: `${delay}ms` }}
      className={className}
    >
      {children}
    </div>
  );
}
