"use client";

import { PREP_BENEFITS } from "@/lib/kisan-mitra/data";
import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

export function Prepare() {
  const { t, lang } = useLang();

  const cards = [
    { n: 1, icon: "cap", title: t.prep_card1_t, bullets: t.prep_card1_bullets, footerIcon: "globe", footer: t.prep_card1_footer },
    { n: 2, icon: "badge", title: t.prep_card2_t, bullets: t.prep_card2_bullets, footerIcon: "building", footer: t.prep_card2_footer },
    { n: 3, icon: "fileText", title: t.prep_card3_t, bullets: t.prep_card3_bullets, footerIcon: "fileText", footer: t.prep_card3_footer },
  ];

  return (
    <section id="prep" className="bg-paper">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">
            <Icon name="cap" /> 13 · TAIYARI
          </span>
          <h2 className="h2">
            {t.prep_title_pre} <span className="accent">{t.prep_title_accent}</span> {t.prep_title_post}
          </h2>
          <p>{t.prep_head_sub}</p>
        </Reveal>

        <div className="prep-cards">
          {cards.map((c) => (
            <Reveal className={`card prep-card prep-card-${c.n}`} key={c.n}>
              <Icon name={c.icon} as="div" className="prep-ico" />
              <h3 className="h3">{c.title}</h3>
              <span className="prep-title-underline" />
              <ul className="prep-bullets">
                {c.bullets.map((b) => (
                  <li key={b}>
                    <Icon name="check" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="prep-footer">
                <Icon name={c.footerIcon} />
                {c.footer}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="prep-grid">
          <Reveal className="card prep-img">
            {/* eslint-disable-next-line @next/next/no-img-element -- see Mission.tsx */}
            <img src="/images/taiyari-study.webp" alt={t.prep_img_alt} loading="lazy" width={1200} height={800} />
          </Reveal>
          <Reveal className="prep-copy card">
            <div className="prep-goal">
              <Icon name="target" className="prep-goal-ico" />
              <p className="prep-sub">{t.prep_sub}</p>
            </div>
            <a className="btn btn-saffron prep-cta" href="#apply">
              <Icon name="fileText" />
              {t.prep_cta} <Icon name="arrowRight" />
            </a>
            <div className="prep-benefits">
              {PREP_BENEFITS.map((b) => (
                <span className="prep-benefit" key={b.icon}>
                  <Icon name={b.icon} className="prep-benefit-ico" />
                  {lang === "hi" ? b.label_hi : b.label_en}
                </span>
              ))}
            </div>
            <div className="prep-note">
              <Icon name="info" />
              {t.prep_note}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
