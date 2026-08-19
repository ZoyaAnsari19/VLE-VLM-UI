"use client";

import { getExam } from "@/lib/kisan-mitra/data";
import { getDepartment, getPositionsByDepartment } from "@/lib/kisan-mitra/recruitment/data";
import { routes } from "@/lib/kisan-mitra/routes";
import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { tr } from "@/lib/kisan-mitra/localized";

function Fact({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  return (
    <div className="role-fact">
      <Icon name={icon} className="role-fact-ico" />
      <div>
        <span className="role-fact-k">{label}</span>
        <span className="role-fact-v">{children}</span>
      </div>
    </div>
  );
}

export function DepartmentDetail({ departmentId }: { departmentId: string }) {
  const { t, lang } = useLang();
  const department = getDepartment(departmentId);

  if (!department) {
    return (
      <section className="role-detail">
        <div className="container rec-empty">
          <h1 className="h2">{t.dept_not_found}</h1>
          <p>
            <a href={routes.departments()}>{t.dept_back_to_depts}</a>
          </p>
        </div>
      </section>
    );
  }

  const positions = getPositionsByDepartment(department.id);
  const entry = positions[0];
  const top = positions[positions.length - 1];
  const accent = department.accent;
  const maxSalary = Math.max(...positions.map((p) => p.salary), 1);

  // One entry per distinct exam this department recruits through.
  const examIds = [...new Set(positions.map((p) => p.examId).filter(Boolean))] as string[];
  const exams = examIds.map((id) => getExam(id)).filter(Boolean);

  return (
    <>
      <section className="role-hero" style={{ ["--v-accent" as string]: accent }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href={routes.home()}>{t.nav_home}</a>
            <Icon name="chevronRight" />
            <a href={routes.departments()}>{t.nav_departments}</a>
            <Icon name="chevronRight" />
            <span aria-current="page">{tr(department, "name", lang)}</span>
          </nav>

          <div className="role-hero-grid">
            <div>
              <div className="role-hero-tags">
                <span className="role-pill" style={{ background: accent }}>
                  <Icon name={department.icon} />
                  {t.nav_departments}
                </span>
                <span className="role-track-chip">
                  <Icon name="users" />
                  {positions.length} {t.dept_fact_positions}
                </span>
              </div>

              <h1 className="h1 role-title">{tr(department, "name", lang)}</h1>
              <p className="role-summary">{tr(department, "description", lang)}</p>

              <div className="role-hero-ctas">
                {entry && (
                  <a href={routes.applyTo(entry.id)} className="btn btn-primary" style={{ background: accent }}>
                    {t.dept_apply_entry} <Icon name="arrowRight" />
                  </a>
                )}
                <a href={routes.roles()} className="btn btn-outline">
                  <Icon name="briefcase" />
                  {t.rec_view_all}
                </a>
              </div>
            </div>

            <aside className="role-facts card">
              <h2 className="h3 role-facts-title">{t.role_quick_facts}</h2>
              <Fact icon="users" label={t.dept_fact_positions}>
                <b style={{ color: accent }}>{positions.length}</b>
              </Fact>
              <Fact icon="rupee" label={t.dept_fact_salary_range}>
                <b style={{ color: accent }}>
                  {entry?.salaryDisplay} – {top?.salaryDisplay}
                </b>
              </Fact>
              <Fact icon="seedling" label={t.dept_fact_entry}>
                {entry && <a href={routes.role(entry.id)}>{tr(entry, "title", lang)}</a>}
              </Fact>
              <Fact icon="award" label={t.dept_fact_top}>
                {top && <a href={routes.role(top.id)}>{tr(top, "title", lang)}</a>}
              </Fact>
            </aside>
          </div>
        </div>
      </section>

      <section className="dept-ladder-section bg-paper">
        <div className="container">
          <Reveal className="section-head">
            <h2 className="h2">{t.dept_ladder_title}</h2>
            <p>{t.dept_ladder_sub}</p>
          </Reveal>

          <ol className="dept-ladder" style={{ ["--v-accent" as string]: accent }}>
            {positions.map((p, i) => (
              <Reveal as="li" className="dept-rung" key={p.id}>
                <span className="dept-rung-num" style={{ background: p.accent }}>
                  {i + 1}
                </span>
                <a className="card dept-rung-card" href={routes.role(p.id)}>
                  <div className="dept-rung-head">
                    <span className="role-pill" style={{ background: p.accent }}>
                      {p.code}
                    </span>
                    <h3 className="h3 dept-rung-title">{tr(p, "title", lang)}</h3>
                    <span className="dept-rung-salary" style={{ color: p.accent }}>
                      {p.salaryDisplay}{t.unit_per_month}
                    </span>
                  </div>
                  <p className="dept-rung-desc">{tr(p, "summary", lang)}</p>
                  <span className="dept-rung-bar" aria-hidden="true">
                    <span style={{ width: `${(p.salary / maxSalary) * 100}%`, background: p.accent }} />
                  </span>
                  <span className="dept-rung-more" style={{ color: p.accent }}>
                    {t.card_view_details} <Icon name="arrowRight" />
                  </span>
                </a>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {exams.length > 0 && (
        <section className="dept-exams-section">
          <div className="container">
            <Reveal className="section-head">
              <h2 className="h2">{t.dept_exams_title}</h2>
            </Reveal>
            <div className="role-related-grid">
              {exams.map((e) => (
                <Reveal as="article" className="card role-related-card" key={e!.id}>
                  <a href={routes.exam(e!.id)}>
                    <span className="role-pill" style={{ background: accent }}>
                      ₹{e!.fee}
                    </span>
                    <h3 className="role-title">{tr(e!, "name", lang)}</h3>
                    <p>
                      {tr(e!, "duration", lang)} · {tr(e!, "questions", lang)}
                    </p>
                    <span className="role-related-salary" style={{ color: accent }}>
                      {t.role_view_exam} <Icon name="arrowRight" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
