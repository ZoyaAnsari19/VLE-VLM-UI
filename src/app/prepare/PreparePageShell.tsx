"use client";

import { useLang } from "@/components/LangProvider";
import { SiteShell } from "@/components/SiteShell";
import { PageHead } from "@/components/PageHead";
import { Prepare } from "@/components/sections/Prepare";
import { Exams } from "@/components/sections/Exams";

function PrepareBody() {
  const { t } = useLang();
  return (
    <>
      <PageHead
        icon="cap"
        eyebrow={t.prep_title_accent}
        titlePre={t.page_prep_title_pre}
        titleAccent={t.page_prep_title_accent}
        titlePost={t.page_prep_title_post}
        sub={t.page_prep_sub}
      />
      <Prepare />
      <Exams showAll />
    </>
  );
}

export function PreparePageShell() {
  return (
    <SiteShell>
      <PrepareBody />
    </SiteShell>
  );
}
