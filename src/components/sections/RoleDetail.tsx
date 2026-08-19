"use client";

import { getExam } from "@/lib/kisan-mitra/data";
import {
  getDepartment,
  getNextPosition,
  getPosition,
  getSiblingPositions,
} from "@/lib/kisan-mitra/recruitment/data";
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

export function RoleDetail({ positionId }: { positionId: string }) {
  const { t, lang } = useLang();
  const position = getPosition(positionId);

  if (!position) {
    return (
      <section className="role-detail">
        <div className="container rec-empty">
          <h1 className="h2">{t.role_not_found}</h1>
          <p>
            <a href={routes.roles()}>{t.role_back_to_roles}</a>
          </p>
        </div>
      </section>
    );
  }

  const department = getDepartment(position.departmentId);
  const exam = position.examId ? getExam(position.examId) : undefined;
  const next = getNextPosition(positionId);
  const siblings = getSiblingPositions(positionId);
  const accent = position.accent;

  const deptName = department ? tr(department, "name", lang) : "";
  const targets = tr(position, "monthlyTargets", lang);

  return (
    <>
      <section className="role-hero" style={{ ["--v-accent" as string]: accent }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href={routes.home()}>{t.nav_home}</a>
            <Icon name="chevronRight" />
            <a href={routes.roles()}>{t.nav_roles}</a>
            <Icon name="chevronRight" />
            <span aria-current="page">{tr(position, "title", lang)}</span>
          </nav>

          <div className="role-hero-grid">
            <div>
              <div className="role-hero-tags">
                <span className="role-pill" style={{ background: accent }}>
                  {position.code}
                </span>
                <a
                  className="role-dept-chip"
                  href={routes.department(position.departmentId)}
                  style={{ background: `${accent}1F`, color: accent }}
                >
                  {department && <Icon name={department.icon} />}
                  {deptName}
                </a>
                <span className="role-track-chip">
                  <Icon name={position.applicationTrack === "exam" ? "cap" : "fileText"} />
                  {position.applicationTrack === "exam" ? t.role_track_exam : t.role_track_direct}
                </span>
              </div>

              <h1 className="h1 role-title">{tr(position, "title", lang)}</h1>
              <p className="role-summary">{tr(position, "summary", lang)}</p>

              <div className="role-hero-ctas">
                <a href={routes.applyTo(position.id)} className="btn btn-primary" style={{ background: accent }}>
                  {t.role_apply_cta} <Icon name="arrowRight" />
                </a>
                {exam && (
                  <a href={routes.exam(exam.id)} className="btn btn-outline">
                    <Icon name="fileText" />
                    {t.role_view_exam}
                  </a>
                )}
              </div>
            </div>

            <aside className="role-facts card">
              <h2 className="h3 role-facts-title">{t.role_quick_facts}</h2>
              <Fact icon="rupee" label={t.role_fact_salary}>
                <b style={{ color: accent }}>{position.salaryDisplay}{t.unit_per_month}</b>
              </Fact>
              <Fact icon="cap" label={t.role_fact_exam}>
                {exam ? (
                  <a href={routes.exam(exam.id)}>{tr(exam, "name", lang)}</a>
                ) : (
                  t.role_track_direct
                )}
              </Fact>
              <Fact icon="users" label={t.role_fact_reporting}>
                {tr(position, "reportingOfficer", lang)}
              </Fact>
              <Fact icon="badge" label={t.label_uniform}>
                {tr(position, "uniform", lang)}
              </Fact>
            </aside>
          </div>
        </div>
      </section>

      <section className="role-body bg-paper">
        <div className="container role-body-grid">
          <Reveal as="article" className="card role-block">
            <h2 className="h3">
              <Icon name="check" /> {t.label_eligibility}
            </h2>
            <p>{tr(position, "eligibility", lang)}</p>
          </Reveal>

          <Reveal as="article" className="card role-block">
            <h2 className="h3">
              <Icon name="briefcase" /> {t.label_responsibilities}
            </h2>
            <ul className="role-duties">
              {tr(position, "responsibilities", lang).map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Reveal>

          {targets && targets.length > 0 && (
            <Reveal as="article" className="card role-block">
              <h2 className="h3">
                <Icon name="trendingUp" /> {t.label_monthly_targets}
              </h2>
              <ul className="role-duties">
                {targets.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal as="article" className="card role-block">
            <h2 className="h3">
              <Icon name="compass" /> {t.label_career_path}
            </h2>
            <div className="career-path">
              {tr(position, "careerPath", lang).map((step, i, arr) => (
                <span className="career-path-step" key={step}>
                  {step}
                  {i < arr.length - 1 && <Icon name="arrowRight" className="career-path-arrow" />}
                </span>
              ))}
            </div>
            {next && (
              <a className="role-next" href={routes.role(next.id)}>
                <span className="role-next-k">{t.role_next_step}</span>
                <span className="role-next-v">
                  {tr(next, "title", lang)} · {next.salaryDisplay}{t.unit_per_month}
                </span>
                <Icon name="arrowRight" />
              </a>
            )}
          </Reveal>
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="role-related">
          <div className="container">
            <Reveal className="section-head">
              <h2 className="h2">{t.role_related_title}</h2>
            </Reveal>
            <div className="role-related-grid">
              {siblings.map((s) => (
                <Reveal as="article" className="card role-related-card" key={s.id}>
                  <a href={routes.role(s.id)}>
                    <span className="role-pill" style={{ background: s.accent }}>
                      {s.code}
                    </span>
                    <h3 className="role-title">{tr(s, "title", lang)}</h3>
                    <p>{tr(s, "summary", lang)}</p>
                    <span className="role-related-salary" style={{ color: s.accent }}>
                      {s.salaryDisplay}{t.unit_per_month} <Icon name="arrowRight" />
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
