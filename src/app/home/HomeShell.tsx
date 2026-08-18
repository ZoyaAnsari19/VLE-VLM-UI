"use client";

import { Suspense } from "react";
import { useLang } from "@/components/LangProvider";
import { SiteShell } from "@/components/SiteShell";
import { ApplySection } from "@/components/sections/ApplySection";
import { Hero } from "@/components/sections/Hero";
import { Mission } from "@/components/sections/Mission";
import { Schemes } from "@/components/sections/Schemes";
import { WhyJoin } from "@/components/sections/WhyJoin";
import { Perks } from "@/components/sections/Perks";
import { Vacancies } from "@/components/sections/Vacancies";
import { Exams } from "@/components/sections/Exams";
import { Security } from "@/components/sections/Security";
import { Roadmap } from "@/components/sections/Roadmap";
import { ForFarmers } from "@/components/sections/ForFarmers";
import { Partnerships } from "@/components/sections/Partnerships";
import { Training } from "@/components/sections/Training";
import { Interview } from "@/components/sections/Interview";
import { Prepare } from "@/components/sections/Prepare";
import { Eligibility } from "@/components/sections/Eligibility";
import { Faq } from "@/components/sections/Faq";
import { RecruitmentStats } from "./recruitment/RecruitmentStats";
import { RecruitmentExplorer } from "./recruitment/RecruitmentExplorer";
import { OrgHierarchy } from "./recruitment/OrgHierarchy";
import { RecruitmentMatrix } from "./recruitment/RecruitmentMatrix";

function HomeBody() {
  const { lang } = useLang();
  return (
    <>
      <Hero />
      <Mission />
      <Schemes />
      <WhyJoin />
      <RecruitmentStats />
      <RecruitmentExplorer lang={lang} />
      <OrgHierarchy lang={lang} />
      <RecruitmentMatrix lang={lang} />
      <Perks />
      <Vacancies />
      <Exams />
      <Security />
      <Roadmap />
      <ForFarmers />
      <Partnerships />
      <Training />
      <Interview />
      <Prepare />
      <Eligibility />
      {/* useSearchParams needs a Suspense boundary to keep the page static. */}
      <Suspense fallback={<div />}>
        <ApplySection />
      </Suspense>
      <Faq />
    </>
  );
}

export function HomeShell() {
  return (
    <SiteShell>
      <HomeBody />
    </SiteShell>
  );
}
