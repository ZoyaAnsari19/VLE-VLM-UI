"use client";

import { useEffect, useRef } from "react";

export function ExamsPageShell() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void import("@/lib/kisan-mitra/app").then((mod) => mod.initExamsPage(rootRef.current));
  }, []);

  return (
    <>
      <a href="#exams" className="skip-link">
        Skip to exams
      </a>
      <main id="app" ref={rootRef} />
    </>
  );
}
