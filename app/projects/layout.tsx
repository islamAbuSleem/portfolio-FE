"use client";

import { ReactNode } from "react";
import { PortfolioNavbar } from "@/components/portfolio/PortfolioNavbar";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PortfolioNavbar />
      <main className="min-h-screen">
        {children}
      </main>
    </>
  );
}