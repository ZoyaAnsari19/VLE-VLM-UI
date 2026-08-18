"use client";

import { getExam, type Exam } from "@/lib/kisan-mitra/data";
import { getDepartment, getPositionsByExam } from "@/lib/kisan-mitra/recruitment/data";
import { routes } from "@/lib/kisan-mitra/routes";
import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

/**
 * Section strings are authored as "Label — marks" (see EXAMS in data.ts), which
 * is all the marks split we need for the weightage bars. If a section is ever
 * written without the trailing number it simply renders with no bar.
 */
function splitSection(section: string): { label: string; marks: number | null } {
  const match = section.match(/^(.*?)\s*—\s*(\d+)$/);
  if (!match) return { label: section, marks: null };
  return { label: match[1], marks: Number(match[2]) };
}

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

export function ExamDetail({ examId }: { examId: string }) {
  const { t, lang } = useLang();
  const exam: Exam | undefined = getExam(examId);

  if (!exam) {
    return (
      <section className="role-detail">
        <div className="container rec-empty">
          <h1 className="h2">{t.exam_not_found}</h1>
          <p>
            <a href={routes.exams()}>{t.exam_back_to_exams}</a>
          </p>
        </div>
      </section>
    );
  }

  const pick = <T,>(hi: T, en: T) => (lang === "hi" ? hi : en);
  const positions = getPositionsByExam(exam.id);
  // The exam takes its colour from the department it recruits for, so an exam
  // page reads as part of the same ladder as the role pages it links to.
  const accent = positions[0]?.accent ?? "var(--green-forest)";
  const department = positions[0] ? getDepartment(positions[0].departmentId) : undefined;

  const sections = exam.sections.map(splitSection);
  const maxMarks = Math.max(...sections.map((s) => s.marks ?? 0), 1);
  // The section numbers are question counts for some papers and marks for
  // others, so they don't reliably sum to the paper total. The denominator of
  // `qualifying` ("100 / 170") is the authoritative total.
  const totalMarks = exam.qualifying.split("/")[1]?.trim() ?? null;

  return (
    <>
      <section className="role-hero" style={{ ["--v-accent" as string]: accent }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href={routes.home()}>{t.nav_home}</a>
            <Icon name="chevronRight" />
            <a href={routes.exams()}>{t.nav_exams}</a>
            <Icon name="chevronRight" />
            <span aria-current="page">{pick(exam.name_hi, exam.name_en)}</span>
          </nav>

          <div className="role-hero-grid">
            <div>
              <div className="role-hero-tags">
                <span className="role-pill" style={{ background: accent }}>
                  {t.exam_page_eyebrow}
                </span>
                {department && (
                  <a
                    className="role-dept-chip"
                    href={routes.department(department.id)}
                    style={{ background: `${accent}1F`, color: accent }}
                  >
                    <Icon name={department.icon} />
                    {pick(department.name_hi, department.name_en)}
                  </a>
                )}
                <span className="role-track-chip">
                  <Icon name="rupee" />₹{exam.fee} {t.exam_fee}
                </span>
              </div>

              <h1 className="h1 role-title">{pick(exam.name_hi, exam.name_en)}</h1>
              <p className="role-summary">
                {t.exam_for}: {pick(exam.for_hi, exam.for_en)}
              </p>

              <div className="role-hero-ctas">
                <a
                  href={positions[0] ? routes.applyTo(positions[0].id) : routes.apply()}
                  className="btn btn-primary"
                  style={{ background: accent }}
                >
                  {t.exam_apply_cta} <Icon name="arrowRight" />
                </a>
                <a href="#exam-samples" className="btn btn-outline">
                  <Icon name="fileText" />
                  {t.exam_samples}
                </a>
              </div>
            </div>

            <aside className="role-facts card">
              <h2 className="h3 role-facts-title">{t.role_quick_facts}</h2>
              <Fact icon="clock" label={t.exam_duration}>
                {pick(exam.duration_hi, exam.duration_en)}
              </Fact>
              {totalMarks && (
                <Fact icon="fileText" label={t.exam_fact_total_marks}>
                  <b style={{ color: accent }}>{totalMarks}</b>
                </Fact>
              )}
              <Fact icon="check" label={t.exam_qualifying}>
                {exam.qualifying}
              </Fact>
              <Fact icon="users" label={t.exam_fact_roles}>
                {positions.length}
              </Fact>
            </aside>
          </div>
        </div>
      </section>

      <section className="role-body bg-paper">
        <div className="container role-body-grid">
          <Reveal as="article" className="card role-block">
            <h2 className="h3">
              <Icon name="fileText" /> {t.exam_pattern_title}
            </h2>
            <div className="exam-rows">
              <div className="exam-row">
                <span className="k">{t.exam_duration}</span>
                <span className="v">{pick(exam.duration_hi, exam.duration_en)}</span>
              </div>
              <div className="exam-row">
                <span className="k">{t.exam_questions}</span>
                <span className="v">{pick(exam.questions_hi, exam.questions_en)}</span>
              </div>
              <div className="exam-row">
                <span className="k">{t.exam_negative}</span>
                <span className="v">{pick(exam.negative_hi, exam.negative_en)}</span>
              </div>
              <div className="exam-row">
                <span className="k">{t.exam_qualifying}</span>
                <span className="v">{exam.qualifying}</span>
              </div>
              <div className="exam-row">
                <span className="k">{t.exam_fee}</span>
                <span className="v">₹{exam.fee}</span>
              </div>
            </div>
            <p className="exam-note">
              <Icon name="info" /> {pick(exam.note_hi, exam.note_en)}
            </p>
          </Reveal>

          <Reveal as="article" className="card role-block">
            <h2 className="h3">
              <Icon name="trendingUp" /> {t.exam_marks_title}
            </h2>
            <ul className="exam-weightage">
              {sections.map((s) => (
                <li key={s.label}>
                  <span className="exam-weight-label">{s.label}</span>
                  <span className="exam-weight-bar" aria-hidden="true">
                    <span
                      style={{
                        width: `${((s.marks ?? 0) / maxMarks) * 100}%`,
                        background: accent,
                      }}
                    />
                  </span>
                  <span className="exam-weight-marks" style={{ color: accent }}>
                    {s.marks ?? "—"}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {positions.length > 0 && (
        <section className="role-related">
          <div className="container">
            <Reveal className="section-head">
              <h2 className="h2">{t.exam_roles_title}</h2>
              <p>{t.exam_roles_sub}</p>
            </Reveal>
            <div className="role-related-grid">
              {positions.map((p) => (
                <Reveal as="article" className="card role-related-card" key={p.id}>
                  <a href={routes.role(p.id)}>
                    <span className="role-pill" style={{ background: p.accent }}>
                      {p.code}
                    </span>
                    <h3 className="role-title">{pick(p.title_hi, p.title_en)}</h3>
                    <p>{pick(p.summary_hi, p.summary_en)}</p>
                    <span className="role-related-salary" style={{ color: p.accent }}>
                      {p.salaryDisplay}/mo <Icon name="arrowRight" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="exam-samples" className="exam-samples-section bg-paper">
        <div className="container">
          <Reveal className="section-head">
            <h2 className="h2">{t.exam_samples_title}</h2>
            <p>{t.exam_samples_sub}</p>
          </Reveal>
          <div className="exam-samples-grid">
            {exam.samples.map((q, i) => (
              <Reveal as="article" className="card sample-q-card" key={q.q}>
                <div className="qt">
                  <span className="sample-q-num" style={{ background: accent }}>
                    {i + 1}
                  </span>
                  {q.q}
                </div>
                {q.descriptive ? (
                  <span className="desc-tag">{t.exam_descriptive}</span>
                ) : (
                  <ul>
                    {q.opts.map((o, oi) => (
                      <li className={oi === q.correct ? "correct" : ""} key={o}>
                        {o}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>

          <div className="rec-view-all">
            <a
              href={positions[0] ? routes.applyTo(positions[0].id) : routes.apply()}
              className="btn btn-primary"
              style={{ background: accent }}
            >
              {t.exam_apply_cta} <Icon name="arrowRight" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
