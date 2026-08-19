"use client";

import { SCHEMES, SCHEME_TRUST } from "@/lib/kisan-mitra/data";
import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { tr } from "@/lib/kisan-mitra/localized";

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
            <Reveal as="article" className="card scheme-card" key={s.name_en}>
              <Icon name="chevronRight" className="scheme-card-chevron" />
              <Icon name={s.icon || "seedling"} as="div" className="ico" />
              <h4>{tr(s, "name", lang)}</h4>
              {s.sub_en ? <div className="ssub">{tr(s, "sub", lang)}</div> : null}
              <div className="scheme-card-divider">
                <Icon name="leaf" />
              </div>
              <div className="sline">
                <span className="lbl">
                  <Icon name="users" />
                  {t.scheme_benefit}
                </span>
                <div className="sval">{tr(s, "benefit", lang)}</div>
              </div>
              <div className="sline">
                <span className="lbl">
                  <Icon name="shield" />
                  {t.scheme_role}
                </span>
                <div className="sval">{tr(s, "role", lang)}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="scheme-trust-row">
          {SCHEME_TRUST.map((x) => (
            <Reveal className="scheme-trust-item" key={x.icon}>
              <Icon name={x.icon} className="scheme-trust-ico" />
              <div>
                <div className="scheme-trust-title">{tr(x, "title", lang)}</div>
                <div className="scheme-trust-sub">{tr(x, "sub", lang)}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="identity-box">{t.identity_text}</Reveal>
      </div>
    </section>
  );
}
