"use client";

import { SECURITY } from "@/lib/kisan-mitra/data";
import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { tr } from "@/lib/kisan-mitra/localized";

export function Security() {
  const { t, lang } = useLang();

  return (
    <section id="process" className="bg-green sec-section">
      <span className="sec-bg-dots" aria-hidden="true" />
      <Icon name="shield" className="sec-bg-watermark" aria-hidden />
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">
            <Icon name="shield" /> Security
          </span>
          <h2 className="h2" style={{ color: "#fff" }}>
            {t.sec_title_pre} <span className="accent sec-title-accent">{t.sec_title_accent}</span>
          </h2>
          <p>{t.sec_sub}</p>
          <div className="section-divider sec-divider">
            <Icon name="shield" />
          </div>
        </Reveal>

        <div className="sec-grid">
          {SECURITY.map((s, i) => (
            <Reveal className="sec-item" key={s.icon}>
              <span className="sec-item-num">0{i + 1}</span>
              <div className="sec-ico-ring">
                <Icon name={s.icon || "shield"} as="div" className="ico" />
              </div>
              <h4>{tr(s, "title", lang)}</h4>
              <span className="sec-item-underline" />
              <p>{tr(s, "desc", lang)}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="sec-trust-strip">
          {[t.sec_trust_1, t.sec_trust_2].map((line) => (
            <span className="sec-trust-item" key={line}>
              <Icon name="check" />
              {line}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
