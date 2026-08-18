"use client";

import { useLang } from "@/components/LangProvider";
import { SiteShell } from "@/components/SiteShell";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { routes } from "@/lib/kisan-mitra/routes";
import { RecruitmentExplorer } from "@/app/home/recruitment/RecruitmentExplorer";
import { RecruitmentStats } from "@/app/home/recruitment/RecruitmentStats";
import { RecruitmentMatrix } from "@/app/home/recruitment/RecruitmentMatrix";

function RolesBody() {
  const { t, lang } = useLang();
  return (
    <>
      <section className="page-head-section">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href={routes.home()}>{t.nav_home}</a>
            <Icon name="chevronRight" />
            <span aria-current="page">{t.nav_roles}</span>
          </nav>
          <Reveal className="section-head">
            <span className="eyebrow">
              <Icon name="briefcase" /> {t.rec_explorer_eyebrow}
            </span>
            <h1 className="h2">
              {t.roles_page_title_pre} <span className="accent">{t.roles_page_title_accent}</span>{" "}
              {t.roles_page_title_post}
            </h1>
            <p>{t.roles_page_sub}</p>
          </Reveal>
        </div>
      </section>
      <RecruitmentStats />
      <RecruitmentExplorer lang={lang} showAll heading={false} />
      <RecruitmentMatrix lang={lang} />
    </>
  );
}

export function RolesPageShell() {
  return (
    <SiteShell>
      <RolesBody />
    </SiteShell>
  );
}
