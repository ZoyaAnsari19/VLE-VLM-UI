"use client";

import { useState } from "react";
import { DEPARTMENTS, POSITIONS, getDepartment } from "@/lib/kisan-mitra/recruitment/data";
import { routes } from "@/lib/kisan-mitra/routes";
import { useLang } from "@/components/LangProvider";
import { SiteShell } from "@/components/SiteShell";
import { PageHead } from "@/components/PageHead";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Eligibility } from "@/components/sections/Eligibility";

/**
 * Per-position eligibility, read straight from POSITIONS — a position added to
 * the data layer shows up here with no change to this file.
 */
function PerRoleEligibility() {
  const { t, lang } = useLang();
  const [deptId, setDeptId] = useState<string | null>(null);
  const pick = <T,>(hi: T, en: T) => (lang === "hi" ? hi : en);

  const rows = deptId ? POSITIONS.filter((p) => p.departmentId === deptId) : POSITIONS;

  return (
    <section className="elig-roles-section">
      <div className="container">
        <Reveal className="section-head">
          <h2 className="h2">{t.page_elig_roles_title}</h2>
          <p>{t.page_elig_roles_sub}</p>
        </Reveal>

        <div className="ben-dept-chips">
          <button
            type="button"
            className={`ben-dept-chip${deptId === null ? " active" : ""}`}
            style={deptId === null ? { background: "var(--green-forest)", borderColor: "var(--green-forest)" } : undefined}
            onClick={() => setDeptId(null)}
          >
            {t.dept_all}
          </button>
          {DEPARTMENTS.map((d) => (
            <button
              key={d.id}
              type="button"
              className={`ben-dept-chip${d.id === deptId ? " active" : ""}`}
              style={d.id === deptId ? { background: d.accent, borderColor: d.accent } : undefined}
              onClick={() => setDeptId(d.id)}
            >
              <Icon name={d.icon} />
              {pick(d.name_hi, d.name_en)}
            </button>
          ))}
        </div>

        <div className="elig-roles-list">
          {rows.map((p) => {
            const dept = getDepartment(p.departmentId);
            return (
              <Reveal as="article" className="card elig-role" key={p.id}>
                <div className="elig-role-head">
                  <span className="role-pill" style={{ background: p.accent }}>
                    {p.code}
                  </span>
                  <a className="elig-role-title" href={routes.role(p.id)}>
                    {pick(p.title_hi, p.title_en)}
                  </a>
                  <span className="elig-role-dept" style={{ color: p.accent }}>
                    {dept && pick(dept.name_hi, dept.name_en)}
                  </span>
                  <span className="elig-role-salary">{p.salaryDisplay}/mo</span>
                </div>
                <p className="elig-role-req">
                  <Icon name="check" />
                  {pick(p.eligibility_hi, p.eligibility_en)}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EligibilityBody() {
  const { t } = useLang();
  return (
    <>
      <PageHead
        icon="check"
        eyebrow={t.label_eligibility}
        titlePre={t.page_elig_title_pre}
        titleAccent={t.page_elig_title_accent}
        titlePost={t.page_elig_title_post}
        sub={t.page_elig_sub}
      />
      <Eligibility heading={false} />
      <PerRoleEligibility />
    </>
  );
}

export function EligibilityPageShell() {
  return (
    <SiteShell>
      <EligibilityBody />
    </SiteShell>
  );
}
