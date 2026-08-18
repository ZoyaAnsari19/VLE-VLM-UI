"use client";

import { useState } from "react";
import {
  DEPARTMENTS,
  getPositionsByDepartment,
  getRecruitmentStats,
} from "@/lib/kisan-mitra/recruitment/data";
import { routes } from "@/lib/kisan-mitra/routes";
import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { BoldMarks } from "@/components/BoldMarks";

/**
 * The conversion page: what a candidate actually gets if they clear the exam.
 *
 * Every figure here is read from the recruitment data or the approved perk
 * copy — nothing is invented for persuasion. In particular the ladder shows
 * salary steps, not timelines, because the data has no promotion schedule.
 */
export function Benefits() {
  const { t, lang } = useLang();
  const [deptId, setDeptId] = useState(DEPARTMENTS[0].id);

  const pick = <T,>(hi: T, en: T) => (lang === "hi" ? hi : en);
  const stats = getRecruitmentStats();
  const salaryRange = `₹${(stats.salaryMin / 1000).toFixed(0)}K – ₹${(stats.salaryMax / 100000).toFixed(1)}L`;
  const ladder = getPositionsByDepartment(deptId);
  const entry = ladder[0];
  const top = ladder[ladder.length - 1];
  const dept = DEPARTMENTS.find((d) => d.id === deptId)!;
  const multiplier = entry && top ? (top.salary / entry.salary).toFixed(1).replace(/\.0$/, "") : "—";

  const pillars = [
    { icon: "rupee", title: t.ben_p1_t, desc: t.ben_p1_d, tag: salaryRange },
    { icon: "badge", title: t.ben_p2_t, desc: t.ben_p2_d },
    { icon: "home", title: t.ben_p3_t, desc: t.ben_p3_d },
    { icon: "cap", title: t.ben_p4_t, desc: t.ben_p4_d },
    { icon: "award", title: t.ben_p5_t, desc: t.ben_p5_d },
    { icon: "trendingUp", title: t.ben_p6_t, desc: t.ben_p6_d, tag: `${stats.totalPositions} positions` },
  ];

  const who = [t.ben_who_1, t.ben_who_2, t.ben_who_3, t.ben_who_4];

  return (
    <>
      <section className="ben-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href={routes.home()}>{t.nav_home}</a>
            <Icon name="chevronRight" />
            <span aria-current="page">{t.nav_benefits}</span>
          </nav>

          <Reveal className="ben-hero-copy">
            <span className="eyebrow">
              <Icon name="award" /> {t.ben_eyebrow}
            </span>
            <h1 className="h1 ben-title">
              {t.ben_title_pre} <span className="accent">{t.ben_title_accent}</span> {t.ben_title_post}
            </h1>
            <p className="ben-lead">{t.ben_sub}</p>
            <div className="ben-hero-ctas">
              <a href={routes.apply()} className="btn btn-primary btn-lg">
                {t.ben_cta} <Icon name="arrowRight" />
              </a>
              <a href={routes.roles()} className="btn btn-outline btn-lg">
                <Icon name="briefcase" /> {t.rec_view_all}
              </a>
            </div>
            <p className="ben-cta-note">{t.ben_cta_sub}</p>
          </Reveal>

          <div className="ben-stat-strip">
            <div>
              <b>{stats.totalPositions}+</b>
              <span>{t.stat_total_positions}</span>
            </div>
            <div>
              <b>{salaryRange}</b>
              <span>{t.stat_salary_range}</span>
            </div>
            <div>
              <b>{stats.totalDepartments}</b>
              <span>{t.stat_departments}</span>
            </div>
            <div>
              <b>{stats.careerPaths}+</b>
              <span>{t.stat_career_opportunities}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ben-pillars-section bg-paper">
        <div className="container">
          <Reveal className="section-head">
            <h2 className="h2">{t.ben_pillars_title}</h2>
            <p>{t.ben_pillars_sub}</p>
            <div className="section-divider">
              <span>
                <Icon name="leaf" />
              </span>
            </div>
          </Reveal>

          <div className="ben-pillars-grid">
            {pillars.map((p) => (
              <Reveal as="article" className="card ben-pillar" key={p.title}>
                <span className="ben-pillar-ico">
                  <Icon name={p.icon} />
                </span>
                <h3 className="h3">{p.title}</h3>
                <p>{p.desc}</p>
                {p.tag && <span className="ben-pillar-tag">{p.tag}</span>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ben-growth-section">
        <div className="container">
          <Reveal className="section-head">
            <h2 className="h2">{t.ben_growth_title}</h2>
            <p>{t.ben_growth_sub}</p>
          </Reveal>

          <div className="ben-dept-chips" role="tablist" aria-label={t.nav_departments}>
            {DEPARTMENTS.map((d) => (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={d.id === deptId}
                className={`ben-dept-chip${d.id === deptId ? " active" : ""}`}
                style={d.id === deptId ? { background: d.accent, borderColor: d.accent } : undefined}
                onClick={() => setDeptId(d.id)}
              >
                <Icon name={d.icon} />
                {pick(d.name_hi, d.name_en)}
              </button>
            ))}
          </div>

          <div className="ben-growth-panel" style={{ ["--v-accent" as string]: dept.accent }}>
            <div className="ben-growth-summary">
              <div className="ben-growth-endpoint">
                <span className="k">{t.ben_growth_entry}</span>
                <b>{entry?.salaryDisplay}</b>
                <a href={routes.role(entry.id)}>{pick(entry.title_hi, entry.title_en)}</a>
              </div>
              <div className="ben-growth-arrow" aria-hidden="true">
                <span className="ben-growth-mult" style={{ color: dept.accent }}>
                  {multiplier}× <em>{t.ben_growth_multiplier}</em>
                </span>
                <Icon name="arrowRight" />
                <span className="ben-growth-rungs">
                  {ladder.length} {t.ben_growth_rungs}
                </span>
              </div>
              <div className="ben-growth-endpoint ben-growth-endpoint-top">
                <span className="k">{t.ben_growth_top}</span>
                <b style={{ color: dept.accent }}>{top?.salaryDisplay}</b>
                <a href={routes.role(top.id)}>{pick(top.title_hi, top.title_en)}</a>
              </div>
            </div>

            <ol className="ben-growth-steps">
              {ladder.map((p) => (
                <li key={p.id}>
                  <a href={routes.role(p.id)} style={{ ["--v-accent" as string]: p.accent }}>
                    {/* Sized in px, not %: the column is content-height, so a
                        percentage would have nothing to resolve against. */}
                    <span
                      className="ben-growth-bar"
                      style={{
                        height: `${Math.round(30 + (p.salary / top.salary) * 150)}px`,
                        background: p.accent,
                      }}
                    />
                    <span className="ben-growth-step-salary">{p.salaryDisplay}</span>
                    <span className="ben-growth-step-title">{pick(p.title_hi, p.title_en)}</span>
                  </a>
                </li>
              ))}
            </ol>

            <a href={routes.department(dept.id)} className="ben-growth-more" style={{ color: dept.accent }}>
              {t.dept_explore} <Icon name="arrowRight" />
            </a>
          </div>
        </div>
      </section>

      <section className="ben-perks-section bg-paper">
        <div className="container">
          <Reveal className="section-head">
            <h2 className="h2">{t.ben_perks_title}</h2>
            <p>{t.ben_perks_sub}</p>
          </Reveal>
          <div className="ben-perks-grid">
            {t.salary_perks.map((perk) => (
              <Reveal as="article" className="card ben-perk" key={perk.title}>
                <Icon name="check" className="ben-perk-ico" />
                <div>
                  <h3>{perk.title}</h3>
                  <p>
                    <BoldMarks text={perk.desc} />
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ben-who-section">
        <div className="container ben-who-grid">
          <Reveal>
            <h2 className="h2">{t.ben_who_title}</h2>
            <p className="ben-who-sub">{t.ben_who_sub}</p>
          </Reveal>
          <Reveal as="ul" className="ben-who-list">
            {who.map((w) => (
              <li key={w}>
                <Icon name="check" />
                {w}
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="ben-final">
        <div className="container">
          <Reveal className="ben-final-inner">
            <h2 className="h2">{t.ben_final_title}</h2>
            <p>{t.ben_final_sub}</p>
            <a href={routes.apply()} className="btn btn-saffron btn-lg">
              {t.ben_cta} <Icon name="arrowRight" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
