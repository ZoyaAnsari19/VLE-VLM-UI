"use client";

import { DIVISIONS } from "@/lib/kisan-mitra/data";
import { PHASE1_VACANCIES, getPosition } from "@/lib/kisan-mitra/recruitment/data";
import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

/** Maps the Phase-1 vacancy rows onto positions, so each row can borrow that role's accent colour. */
const ROLE_POSITION_ID: Record<string, string> = {
  VLE: "vle",
  VLM: "vlm",
  TEO: "teo",
  DLO: "division-level-officer",
};

export function Vacancies() {
  const { t, lang } = useLang();
  const total = PHASE1_VACANCIES.reduce((sum, r) => sum + r.count, 0);

  const phases = [
    {
      kicker: t.vac_phase2_kicker,
      title: t.vac_phase2_title,
      pre: t.vac_phase2_pre,
      big: t.vac_phase2_big,
      post: t.vac_phase2_post,
      icon: "seedling",
    },
    {
      kicker: t.vac_phase3_kicker,
      title: t.vac_phase3_title,
      pre: t.vac_phase3_pre,
      big: t.vac_phase3_big,
      post: t.vac_phase3_post,
      icon: "users",
    },
  ];

  return (
    <section id="vacancies" className="bg-paper">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">
            <Icon name="briefcase" /> Phase 1 Vacancies
          </span>
          <h2 className="h2">
            {t.vac_title_pre} <span className="accent">{t.vac_title_accent}</span> {t.vac_title_post}
          </h2>
          <p>{t.vac_sub}</p>
          <div className="section-divider">
            <Icon name="leaf" />
          </div>
        </Reveal>

        <Reveal className="tbl-wrap vac-tbl-wrap">
          <table className="tbl vac-tbl">
            <thead>
              <tr>
                <th>
                  <span className="vac-th">
                    <Icon name="shield" />
                    {t.vac_th_post}
                  </span>
                </th>
                <th>
                  <span className="vac-th">
                    <Icon name="fileText" />
                    {t.vac_th_exam}
                  </span>
                </th>
                <th>
                  <span className="vac-th">
                    <Icon name="users" />
                    {t.vac_th_count}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {PHASE1_VACANCIES.map((r) => {
                const accent = getPosition(ROLE_POSITION_ID[r.role])?.accent ?? "var(--green-forest)";
                return (
                  <tr key={r.role}>
                    <td>
                      <span className="vac-role">
                        <Icon
                          name="users"
                          className="vac-role-ico"
                          style={{ background: `${accent}1F`, color: accent }}
                        />
                        <b>{r.role}</b>
                      </span>
                    </td>
                    <td>{lang === "hi" ? r.exam_hi : r.exam_en}</td>
                    <td className="vac-count">
                      <b>{r.count}</b>
                    </td>
                  </tr>
                );
              })}
              <tr className="vac-total">
                <td>
                  <b>{t.vac_total}</b>
                </td>
                <td />
                <td className="vac-count">
                  <b>
                    <span className="vac-total-pill">{total}</span>
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
        </Reveal>

        <Reveal className="vac-note">
          <Icon name="pin" className="vac-note-ico" />
          <span>{t.vac_note}</span>
        </Reveal>

        <h3 className="h3 vac-divisions-title">
          <Icon name="pin" />
          {t.vac_divisions_title}
        </h3>
        <Reveal className="vac-divisions">
          {DIVISIONS.map((d) => (
            <span className="vac-pill" key={d}>
              <Icon name="building" />
              {d}
            </span>
          ))}
        </Reveal>

        <div className="vac-phases">
          {phases.map((p) => (
            <Reveal as="article" className="card vac-phase-card" key={p.kicker}>
              <div className="vac-phase-dot" />
              <div className="vac-phase-kicker">{p.kicker}</div>
              <h3 className="h3 vac-phase-title">{p.title}</h3>
              <div className="vac-phase-body">
                <p className="vac-phase-line">
                  <span className="vac-phase-pre">{p.pre}</span>
                  <span className="vac-phase-big">{p.big}</span>
                  <span className="vac-phase-post">{p.post}</span>
                </p>
                <Icon name={p.icon} className="vac-phase-ico" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="vac-impact-strip">
          {t.vac_impact.map((x) => (
            <div className="vac-impact-item" key={x.label}>
              <Icon name={x.icon} className="vac-impact-ico" />
              <div>
                <div className="vac-impact-label">{x.label}</div>
                <div className="vac-impact-sub">{x.sub}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
