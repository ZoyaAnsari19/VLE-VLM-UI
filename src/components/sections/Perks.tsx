"use client";

import { useLang } from "@/components/LangProvider";
import { useCarousel } from "@/components/useCarousel";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { BoldMarks } from "@/components/BoldMarks";

/** Icon per perk card, positionally matched to `t.salary_perks`. */
const PERK_ICONS = ["badge", "scan", "home", "rupee", "briefcase", "shield"];

export function Perks() {
  const { t } = useLang();
  const { viewportRef, trackRef, atStart, atEnd, scrollPrev, scrollNext } = useCarousel({
    cardSelector: ".perk-card",
    fullWidthCardsOnMobile: true,
  });

  return (
    <section className="bg-paper salary-perks-section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">
            <Icon name="rupee" /> Perks &amp; Mobility
          </span>
          <h2 className="h2">
            {t.salary_title_pre} <span className="accent">{t.salary_title_accent}</span> {t.salary_title_post}
          </h2>
          <p>{t.salary_sub}</p>
          <div className="section-divider">
            <Icon name="leaf" />
          </div>
        </Reveal>

        <Reveal className="salary-perks bg-paper">
          <div className="salary-perks-carousel">
            <button
              type="button"
              className="perks-nav perks-prev"
              aria-label={t.perks_prev}
              onClick={scrollPrev}
              disabled={atStart}
            >
              <Icon name="arrowLeft" />
            </button>
            <div className="salary-perks-viewport" ref={viewportRef}>
              <div className="salary-perks-track" ref={trackRef}>
                {t.salary_perks.map((p, i) => (
                  <Reveal as="article" className="card perk-card" key={p.title}>
                    <Icon name="leaf" className="perk-card-leaf" aria-hidden />
                    <Icon name={PERK_ICONS[i]} as="div" className="perk-ico" />
                    <h3 className="h3 perk-title">{p.title}</h3>
                    <span className="perk-title-underline" />
                    <p className="perk-desc">
                      <BoldMarks text={p.desc} />
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="perks-nav perks-next"
              aria-label={t.perks_next}
              onClick={scrollNext}
              disabled={atEnd}
            >
              <Icon name="arrowRight" />
            </button>
          </div>
        </Reveal>

        <Reveal className="ev-vehicle card">
          <div className="ev-vehicle-grid">
            <div className="ev-vehicle-media">
              {/* eslint-disable-next-line @next/next/no-img-element -- see Mission.tsx */}
              <img src="/images/vehicles.png" alt={t.ev_img_alt} loading="lazy" width={900} height={520} />
              <span className="ev-vehicle-badge">
                <Icon name="ev" /> {t.ev_badge}
              </span>
            </div>
            <div className="ev-vehicle-copy">
              <h3 className="h3 ev-vehicle-title">
                <Icon name="leaf" className="ev-vehicle-title-ico" />
                {t.ev_title}
              </h3>
              <p className="ev-vehicle-sub">{t.ev_sub}</p>
              <div className="ev-vehicle-rows">
                {[
                  { label: t.ev_row1_label, desc: t.ev_row1_desc },
                  { label: t.ev_row2_label, desc: t.ev_row2_desc },
                ].map((row) => (
                  <div className="ev-vehicle-row" key={row.label}>
                    <Icon name="ev" className="ev-vehicle-row-ico" />
                    <div>
                      <div className="ev-vehicle-row-label">{row.label}</div>
                      <div className="ev-vehicle-row-desc">{row.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="ev-benefits-strip">
            {t.ev_benefits.map((b) => (
              <span className="ev-benefit" key={b.label}>
                <Icon name={b.icon} className="ev-benefit-ico" />
                {b.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
