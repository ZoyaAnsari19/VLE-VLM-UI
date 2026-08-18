"use client";

import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

export function Eligibility({ heading = true }: { heading?: boolean } = {}) {
  const { t } = useLang();

  const cards = [
    { title: t.elig_gs_t, desc: t.elig_gs_d, icon: "cap", accent: "green" },
    { title: t.elig_ka_t, desc: t.elig_ka_d, icon: "award", accent: "gold" },
    { title: t.elig_res_t, desc: t.elig_res_d, icon: "credit", accent: "gold" },
    { title: t.elig_local_t, desc: t.elig_local_d, icon: "pin", accent: "green" },
  ];

  return (
    <section className="bg-paper eligibility-section">
      <div className="container">
        {heading && (
          <Reveal className="section-head">
            <span className="eyebrow">
              <Icon name="check" /> Eligibility
            </span>
            <h2 className="h2">
              {t.elig_title_pre} <span className="accent">{t.elig_title_accent}</span>
            </h2>
            <p>{t.elig_sub}</p>
            <div className="section-divider">
              <Icon name="leaf" />
            </div>
          </Reveal>
        )}

        <div className="elig-grid">
          {cards.map((c) => (
            <Reveal className={`card elig-card elig-card-${c.accent}`} key={c.title}>
              <Icon name={c.icon} className="elig-card-ico" />
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="card dates-card" style={{ marginTop: 18 }}>
          <h3 className="h3 dates-title">
            <Icon name="calendar" />
            {t.dates_title}
          </h3>
          <ul className="dates-list">
            {t.dates.map(([label, value]) => (
              <li key={label}>
                <span className="dates-label">
                  <Icon name="calendar" className="dates-ico" />
                  {label}
                </span>
                <span className="d">{value}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
