"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/kisan-mitra/recruitment/types";
import { RecruitmentStats } from "./recruitment/RecruitmentStats";
import { RecruitmentExplorer } from "./recruitment/RecruitmentExplorer";
import { OrgHierarchy } from "./recruitment/OrgHierarchy";
import { RecruitmentMatrix } from "./recruitment/RecruitmentMatrix";

export function HomeShell() {
  // Always starts "hi" to match the server-rendered HTML (layout.tsx sets <html lang="hi">).
  // The saved preference is read from localStorage post-mount, below — reading it in a lazy
  // initializer instead would make the client's pre-hydration render diverge from the server's
  // and trigger a hydration mismatch whenever a returning visitor had chosen "en".
  const [lang, setLang] = useState<Lang>("hi");
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = (localStorage.getItem("km_lang") as Lang) || "hi";
    document.documentElement.lang = saved;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- post-hydration correction from localStorage, see comment above
    setLang(saved);
    void import("@/lib/kisan-mitra/app").then((mod) => mod.initKisanMitra(topRef.current, bottomRef.current));

    const onLangChange = (e: Event) => {
      const next = (e as CustomEvent<Lang>).detail;
      document.documentElement.lang = next;
      setLang(next);
    };
    window.addEventListener("km:lang-change", onLangChange);
    return () => window.removeEventListener("km:lang-change", onLangChange);
  }, []);

  return (
    <>
      <a href="#apply" className="skip-link">
        Skip to application form
      </a>
      <main id="app">
        <div ref={topRef} />
        <RecruitmentStats lang={lang} />
        <RecruitmentExplorer lang={lang} />
        <OrgHierarchy lang={lang} />
        <RecruitmentMatrix lang={lang} />
        <div ref={bottomRef} />
      </main>
    </>
  );
}
