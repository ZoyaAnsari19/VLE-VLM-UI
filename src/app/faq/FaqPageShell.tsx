"use client";

import { useLang } from "@/components/LangProvider";
import { SiteShell } from "@/components/SiteShell";
import { PageHead } from "@/components/PageHead";
import { Faq } from "@/components/sections/Faq";

function FaqBody() {
  const { t } = useLang();
  return (
    <>
      <PageHead
        icon="info"
        eyebrow={t.nav_faq}
        titlePre={t.page_faq_title_pre}
        titleAccent={t.page_faq_title_accent}
        titlePost={t.page_faq_title_post}
        sub={t.page_faq_sub}
      />
      <Faq />
    </>
  );
}

export function FaqPageShell() {
  return (
    <SiteShell>
      <FaqBody />
    </SiteShell>
  );
}
