"use client";

import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

export function Partnerships() {
  const { t } = useLang();

  return (
    <section className="bg-paper partnerships-section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">
            <Icon name="badge" /> Partnerships
          </span>
          <h2 className="h2">{t.partner_title}</h2>
          <p>{t.partner_sub}</p>
        </Reveal>
        <div className="partner-grid">
          {[1, 2].map((n) => (
            <Reveal className="partner-ph" key={n}>
              <Icon name="badge" className="partner-ph-ico" />
              <span className="partner-ph-num">
                {t.partner_slot} 0{n}
              </span>
              <p className="partner-ph-text">{t.partner_placeholder}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
