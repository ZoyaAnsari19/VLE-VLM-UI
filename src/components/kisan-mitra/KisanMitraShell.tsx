"use client";

import { useEffect } from "react";

export function KisanMitraShell() {
  useEffect(() => {
    void import("@/lib/kisan-mitra/app").then((mod) => mod.initKisanMitra());
  }, []);

  return (
    <>
      <a href="#apply" className="skip-link">
        Skip to application form
      </a>
      <main id="app"></main>
    </>
  );
}
