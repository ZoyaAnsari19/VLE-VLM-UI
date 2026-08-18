"use client";

import { Suspense } from "react";
import { useLang } from "@/components/LangProvider";
import { SiteShell } from "@/components/SiteShell";
import { PageHead } from "@/components/PageHead";
import { ApplySection } from "@/components/sections/ApplySection";

function ApplyBody() {
  const { t } = useLang();
  return (
    <>
      <PageHead
        icon="fileText"
        eyebrow={t.nav_apply}
        titlePre={t.apply_title_pre}
        titleAccent={t.apply_title_accent}
        titlePost={t.apply_title_post}
        sub={t.apply_sub}
      />
      {/* useSearchParams needs a Suspense boundary to keep the page static. */}
      <Suspense fallback={<div />}>
        <ApplySection heading={false} />
      </Suspense>
    </>
  );
}

export function ApplyPageShell() {
  return (
    <SiteShell>
      <ApplyBody />
    </SiteShell>
  );
}
