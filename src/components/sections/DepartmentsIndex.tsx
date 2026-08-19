"use client";

import { DEPARTMENTS, getPositionsByDepartment } from "@/lib/kisan-mitra/recruitment/data";
import { routes } from "@/lib/kisan-mitra/routes";
import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { tr } from "@/lib/kisan-mitra/localized";

export function DepartmentsIndex() {
  const { t, lang } = useLang();

  return (
    <>
      <section className="page-head-section">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href={routes.home()}>{t.nav_home}</a>
            <Icon name="chevronRight" />
            <span aria-current="page">{t.nav_departments}</span>
          </nav>
          <Reveal className="section-head">
            <span className="eyebrow">
              <Icon name="building" /> {t.nav_departments}
            </span>
            <h1 className="h2">
              {t.depts_page_title_pre} <span className="accent">{t.depts_page_title_accent}</span>{" "}
              {t.depts_page_title_post}
            </h1>
            <p>{t.depts_page_sub}</p>
          </Reveal>
        </div>
      </section>

      <section className="depts-section bg-paper">
        <div className="container">
          <div className="depts-grid">
            {DEPARTMENTS.map((d) => {
              const positions = getPositionsByDepartment(d.id);
              const entry = positions[0];
              const top = positions[positions.length - 1];
              return (
                <Reveal
                  as="article"
                  className="card dept-card"
                  key={d.id}
                  style={{ ["--v-accent" as string]: d.accent }}
                >
                  <a href={routes.department(d.id)} className="dept-card-link">
                    <span className="dept-card-ico" style={{ background: d.accent }}>
                      <Icon name={d.icon} />
                    </span>
                    <h2 className="h3 dept-card-title">{tr(d, "name", lang)}</h2>
                    <p className="dept-card-desc">{tr(d, "description", lang)}</p>
                    <div className="dept-card-meta">
                      <div>
                        <span className="k">{t.dept_fact_positions}</span>
                        <span className="v" style={{ color: d.accent }}>
                          {positions.length}
                        </span>
                      </div>
                      <div>
                        <span className="k">{t.dept_fact_salary_range}</span>
                        <span className="v" style={{ color: d.accent }}>
                          {entry?.salaryDisplay} – {top?.salaryDisplay}
                        </span>
                      </div>
                    </div>
                    <span className="dept-card-cta" style={{ color: d.accent }}>
                      {t.dept_explore} <Icon name="arrowRight" />
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
