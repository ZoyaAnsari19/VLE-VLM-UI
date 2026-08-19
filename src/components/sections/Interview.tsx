"use client";

import {
  INTERVIEW_MEDIA_BADGES,
  INTERVIEW_PANELS,
  INTERVIEW_POINTS,
  INTERVIEW_Q_ICONS,
} from "@/lib/kisan-mitra/data";
import { getDepartment } from "@/lib/kisan-mitra/recruitment/data";
import { useLang } from "@/components/LangProvider";
import { useCarousel } from "@/components/useCarousel";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { tr } from "@/lib/kisan-mitra/localized";

function PanelStats({ composition, duration, examWeight, intWeight }: {
  composition: string; duration: string; examWeight: string; intWeight: string;
}) {
  const { t } = useLang();
  const rows = [
    { icon: "users", k: t.int_th_panel, v: composition },
    { icon: "clock", k: t.int_th_duration, v: duration },
    { icon: "pieChart", k: t.int_th_weightage, v: `${t.int_exam_weight} ${examWeight}` },
    { icon: "users", k: t.int_th_interview, v: intWeight },
  ];
  return (
    <div className="int-panel-stats">
      {rows.map((r) => (
        <div className="int-panel-stat" key={r.k}>
          <Icon name={r.icon} />
          <div>
            <span className="k">{r.k}</span>
            <span className="v">{r.v}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Interview() {
  const { t, lang } = useLang();
  const { viewportRef, trackRef, atStart, atEnd, scrollPrev, scrollNext } = useCarousel({
    cardSelector: ".int-panel",
  });

  return (
    <section id="interview">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">
            <Icon name="check" /> 11 · INTERVIEW
          </span>
          <h2 className="h2">
            {t.int_title_pre} <span className="accent">{t.int_title_accent}</span> {t.int_title_post}
          </h2>
          <div className="section-divider">
            <Icon name="leaf" />
          </div>
        </Reveal>

        <div className="int-grid">
          <div className="int-top-grid">
            <Reveal className="int-media card">
              {/* eslint-disable-next-line @next/next/no-img-element -- see Mission.tsx */}
              <img src="/images/interview-panel.webp" alt={t.int_img_alt} loading="lazy" width={1200} height={800} />
              <div className="int-media-badges">
                {INTERVIEW_MEDIA_BADGES.map((b) => (
                  <span className="int-media-badge" key={b.icon}>
                    <Icon name={b.icon} />
                    {tr(b, "label", lang)}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal className="int-copy">
              <h3 className="h3 int-copy-title">{t.int_copy_title}</h3>
              <p className="int-sub">{t.int_sub}</p>
              <div className="int-points">
                {INTERVIEW_POINTS.map((p) => (
                  <div className="int-point" key={p.icon}>
                    <Icon name={p.icon} className="int-point-ico" />
                    <div>
                      <div className="int-point-title">{tr(p, "title", lang)}</div>
                      <p className="int-point-desc">{tr(p, "desc", lang)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="int-panels-carousel">
            <button
              type="button"
              className="perks-nav int-panels-prev"
              aria-label={t.perks_prev}
              onClick={scrollPrev}
              disabled={atStart}
            >
              <Icon name="arrowLeft" />
            </button>
            <div className="int-panels-viewport" ref={viewportRef}>
              <div className="int-panels-track" ref={trackRef}>
                {INTERVIEW_PANELS.map((p) => {
                  const accent = getDepartment(p.deptId)?.accent ?? "var(--green-forest)";
                  return (
                    <Reveal
                      className="card int-panel"
                      key={p.examId}
                      style={{ ["--v-accent" as string]: accent }}
                    >
                      <div className="int-panel-head">
                        <Icon
                          name="users"
                          className="int-panel-ico"
                          style={{ background: `${accent}1F`, color: accent }}
                        />
                        <div>
                          <div className="int-tag">
                            <span className="int-pill" style={{ background: `${accent}1F`, color: accent }}>
                              {tr(p, "badge", lang)}
                            </span>
                          </div>
                          <h3 className="h3" style={{ color: accent }}>
                            {t.int_panel_card_title}
                          </h3>
                        </div>
                      </div>
                      <PanelStats
                        composition={tr(p, "composition", lang)}
                        duration={tr(p, "duration", lang)}
                        examWeight={p.examWeight}
                        intWeight={p.intWeight}
                      />
                    </Reveal>
                  );
                })}
              </div>
            </div>
            <button
              type="button"
              className="perks-nav int-panels-next"
              aria-label={t.perks_next}
              onClick={scrollNext}
              disabled={atEnd}
            >
              <Icon name="arrowRight" />
            </button>
          </div>

          <Reveal className="card int-samples">
            <div className="int-samples-head">
              <Icon name="fileText" className="int-samples-ico" />
              <h3 className="h3" style={{ margin: 0 }}>
                {t.int_samples_title}
              </h3>
            </div>
            <ul className="int-q">
              {t.int_qs.map((q, i) => (
                <li className="int-q-item" key={q}>
                  <span className="int-q-num">0{i + 1}</span>
                  <span className="int-q-text">{q}</span>
                  <Icon name={INTERVIEW_Q_ICONS[i] || "seedling"} className="int-q-ico" />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
