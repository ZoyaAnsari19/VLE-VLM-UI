"use client";

import { FARMER_GOVT_CHIPS, FARMER_IMPACT, MEMBER_BENEFITS } from "@/lib/kisan-mitra/data";
import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

export function ForFarmers() {
  const { t, lang } = useLang();

  const columns = [
    {
      modifier: "farmer-col-govt",
      icon: "building",
      title: t.farmers_govt,
      sub: t.farmers_govt_sub,
      chips: FARMER_GOVT_CHIPS.map((s) => ({ key: s.name, icon: s.icon, label: s.name })),
    },
    {
      modifier: "farmer-col-member",
      icon: "shield",
      title: t.farmers_member,
      sub: t.farmers_member_sub,
      chips: MEMBER_BENEFITS.map((m) => ({ key: m.en, icon: m.icon, label: lang === "hi" ? m.hi : m.en })),
    },
  ];

  return (
    <section className="bg-paper farmers-section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">
            <Icon name="seedling" /> For Farmers
          </span>
          <h2 className="h2">
            {t.farmers_title_pre} <span className="accent">{t.farmers_title_accent}</span> {t.farmers_title_post}
          </h2>
          <div className="section-divider">
            <Icon name="leaf" />
          </div>
        </Reveal>

        <div className="farmers-grid">
          {columns.map((col) => (
            <Reveal className={`card farmer-col ${col.modifier}`} key={col.modifier}>
              <div className="farmer-col-head">
                <Icon name={col.icon} className="farmer-col-ico" />
                <div>
                  <h3 className="h3">{col.title}</h3>
                  <p className="farmer-col-sub">{col.sub}</p>
                </div>
              </div>
              <div className="chip-list farmer-chip-list">
                {col.chips.map((chip) => (
                  <span className="chip farmer-chip" key={chip.key}>
                    <Icon name={chip.icon} className="chip-ico" />
                    {chip.label}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="farmer-bridge">
          <div className="farmer-bridge-main">
            <Icon name="users" className="farmer-bridge-ico" />
            <p className="farmer-line">
              {t.farmers_line_pre} <span className="accent">{t.farmers_line_accent}</span>
              {t.farmers_line_post ? ` ${t.farmers_line_post}` : ""}
            </p>
          </div>
          <div className="farmer-impact-strip">
            {FARMER_IMPACT.map((x) => (
              <div className="farmer-impact-item" key={x.icon}>
                <Icon name={x.icon} className="farmer-impact-ico" />
                <div className="farmer-impact-title">{lang === "hi" ? x.title_hi : x.title_en}</div>
                <div className="farmer-impact-sub">{lang === "hi" ? x.sub_hi : x.sub_en}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
