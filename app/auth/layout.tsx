"use client";

import { ReactNode } from "react";
import { Terminal } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-bg">
      <div className="noise absolute inset-0 z-0" aria-hidden="true" />
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-strong rounded-2xl p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Terminal className="w-8 h-8 text-primary" />
            <span className="text-headline-md font-bold text-text">Admin Console</span>
          </div>
          {children}
        </div>
        <p className="text-center text-text-secondary text-sm mt-6">
          <Link href="/" className="hover:text-primary transition-colors">
            ← Back to Portfolio
          </Link>
        </p>
      </div>
    </div>
  );
}