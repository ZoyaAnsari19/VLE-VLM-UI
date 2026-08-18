"use client";

import type { ReactNode } from "react";
import { LangProvider } from "@/components/LangProvider";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

interface SiteShellProps {
  children: ReactNode;
  skipHref?: string;
  skipLabel?: string;
}

/**
 * Page chrome shared by every route: language context, nav + drawer, footer.
 * A new page only has to supply its own sections.
 */
export function SiteShell({
  children,
  skipHref = "#apply",
  skipLabel = "Skip to application form",
}: SiteShellProps) {
  return (
    <LangProvider>
      <a href={skipHref} className="skip-link">
        {skipLabel}
      </a>
      <main id="app">
        <Nav />
        {children}
        <Footer />
      </main>
    </LangProvider>
  );
}
