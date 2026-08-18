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

  const pick = <T,>(hi: T, en: T) => (lang === "hi" ? hi : en);
  const deptName = department ? pick(department.name_hi, department.name_en) : "";
  const targets = pick(position.monthlyTargets_hi, position.monthlyTargets_en);

  return (
    <>
      <section className="role-hero" style={{ ["--v-accent" as string]: accent }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href={routes.home()}>{t.nav_home}</a>
            <Icon name="chevronRight" />
            <a href={routes.roles()}>{t.nav_roles}</a>
            <Icon name="chevronRight" />
            <span aria-current="page">{pick(position.title_hi, position.title_en)}</span>
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

              <h1 className="h1 role-title">{pick(position.title_hi, position.title_en)}</h1>
              <p className="role-summary">{pick(position.summary_hi, position.summary_en)}</p>

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
                <b style={{ color: accent }}>{position.salaryDisplay}/mo</b>
              </Fact>
              <Fact icon="cap" label={t.role_fact_exam}>
                {exam ? (
                  <a href={routes.exam(exam.id)}>{pick(exam.name_hi, exam.name_en)}</a>
                ) : (
                  t.role_track_direct
                )}
              </Fact>
              <Fact icon="users" label={t.role_fact_reporting}>
                {pick(position.reportingOfficer_hi, position.reportingOfficer_en)}
              </Fact>
              <Fact icon="badge" label={t.label_uniform}>
                {pick(position.uniform_hi, position.uniform_en)}
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
            <p>{pick(position.eligibility_hi, position.eligibility_en)}</p>
          </Reveal>

          <Reveal as="article" className="card role-block">
            <h2 className="h3">
              <Icon name="briefcase" /> {t.label_responsibilities}
            </h2>
            <ul className="role-duties">
              {pick(position.responsibilities_hi, position.responsibilities_en).map((r) => (
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
              {pick(position.careerPath_hi, position.careerPath_en).map((step, i, arr) => (
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
                  {pick(next.title_hi, next.title_en)} · {next.salaryDisplay}/mo
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
                    <h3 className="role-title">{pick(s.title_hi, s.title_en)}</h3>
                    <p>{pick(s.summary_hi, s.summary_en)}</p>
                    <span className="role-related-salary" style={{ color: s.accent }}>
                      {s.salaryDisplay}/mo <Icon name="arrowRight" />
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
