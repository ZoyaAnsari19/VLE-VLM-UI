"use client";

import { useLang } from "@/components/LangProvider";
import { SiteShell } from "@/components/SiteShell";
import { PageHead } from "@/components/PageHead";
import { Exams } from "@/components/sections/Exams";

function ExamsBody() {
  const { t } = useLang();
  return (
    <>
      <PageHead icon="cap" eyebrow={t.nav_exams} titlePre={t.exams_title} sub={t.exams_sub} />
      <Exams showAll heading={false} />
    </>
  );
}

/** Standalone "all exams" page — same chrome as the home page, one section. */
export function ExamsPageShell() {
  return (
    <SiteShell skipHref="#exams" skipLabel="Skip to exams">
      <ExamsBody />
    </SiteShell>
  );
}
