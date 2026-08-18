"use client";

import { useLang } from "@/components/LangProvider";
import { SiteShell } from "@/components/SiteShell";
import { PageHead } from "@/components/PageHead";
import { Roadmap } from "@/components/sections/Roadmap";
import { Security } from "@/components/sections/Security";
import { Interview } from "@/components/sections/Interview";
import { Training } from "@/components/sections/Training";

function ProcessBody() {
  const { t } = useLang();
  return (
    <>
      <PageHead
        icon="pin"
        eyebrow={t.nav_process}
        titlePre={t.page_process_title_pre}
        titleAccent={t.page_process_title_accent}
        titlePost={t.page_process_title_post}
        sub={t.page_process_sub}
      />
      <Roadmap />
      <Security />
      <Interview />
      <Training />
    </>
  );
}

export function ProcessPageShell() {
  return (
    <SiteShell>
      <ProcessBody />
    </SiteShell>
  );
}
