"use client";

import { SCHEMES, SCHEME_TRUST } from "@/lib/kisan-mitra/data";
import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

export function Schemes() {
  const { t, lang } = useLang();

  return (
    <section id="schemes">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">
            <Icon name="shield" /> Government Schemes
          </span>
          <div className="schemes-title-wrap">
            <Icon name="leaf" className="schemes-title-leaf schemes-title-leaf-l" aria-hidden />
            <h2 className="h2">
              {t.schemes_title_pre} <span className="accent">{t.schemes_title_accent}</span> {t.schemes_title_post}
            </h2>
            <Icon name="leaf" className="schemes-title-leaf schemes-title-leaf-r" aria-hidden />
          </div>
          <p>{t.schemes_sub}</p>
        </Reveal>

        <div className="schemes-grid">
          {SCHEMES.map((s) => (
            <Reveal as="article" className="card scheme-card" key={s.name}>
              <Icon name="chevronRight" className="scheme-card-chevron" />
              <Icon name={s.icon || "seedling"} as="div" className="ico" />
              <h4>{s.name}</h4>
              {s.sub ? <div className="ssub">{s.sub}</div> : null}
              <div className="scheme-card-divider">
                <Icon name="leaf" />
              </div>
              <div className="sline">
                <span className="lbl">
                  <Icon name="users" />
                  {t.scheme_benefit}
                </span>
                <div className="sval">{lang === "hi" ? s.benefit_hi : s.benefit_en}</div>
              </div>
              <div className="sline">
                <span className="lbl">
                  <Icon name="shield" />
                  {t.scheme_role}
                </span>
                <div className="sval">{lang === "hi" ? s.role_hi : s.role_en}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="scheme-trust-row">
          {SCHEME_TRUST.map((x) => (
            <Reveal className="scheme-trust-item" key={x.icon}>
              <Icon name={x.icon} className="scheme-trust-ico" />
              <div>
                <div className="scheme-trust-title">{lang === "hi" ? x.title_hi : x.title_en}</div>
                <div className="scheme-trust-sub">{lang === "hi" ? x.sub_hi : x.sub_en}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="identity-box">{t.identity_text}</Reveal>
      </div>
    </section>
  );
}
