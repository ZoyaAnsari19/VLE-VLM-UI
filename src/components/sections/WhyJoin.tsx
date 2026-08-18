"use client";

import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

export function WhyJoin() {
  const { t } = useLang();

  const cards = [
    { icon: "award", title: t.why_1_t, desc: t.why_1_d },
    { icon: "home", title: t.why_2_t, desc: t.why_2_d },
    { icon: "rupee", title: t.why_3_t, desc: t.why_3_d },
  ];

  return (
    <section className="bg-paper">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">
            <Icon name="leaf" /> Why Join
          </span>
          <h2 className="h2">{t.why_title}</h2>
          <p>{t.why_sub}</p>
        </Reveal>
        <div className="why-grid">
          {cards.map((c, i) => (
            <Reveal className="card why-card" key={c.icon}>
              <span className="why-card-dots" aria-hidden="true" />
              <span className="why-card-num">0{i + 1}</span>
              <div className="ico-ring">
                <Icon name={c.icon} as="div" className="ico" />
              </div>
              <h3 className="h3">{c.title}</h3>
              <div className="why-card-divider">
                <Icon name="leaf" />
              </div>
              <p>{c.desc}</p>
              <Icon name="arrowRight" className="why-card-arrow" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
