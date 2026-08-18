"use client";

import { TRAINING } from "@/lib/kisan-mitra/data";
import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

/** Icon per training week, positionally matched to TRAINING. */
const WEEK_ICONS = ["badge", "seedling", "shield", "credit", "scan", "check", "pin", "cap"];

export function Training() {
  const { t, lang } = useLang();

  const photos = [
    { src: "/images/training-class.webp", icon: "home", caption: "Residential · hostel + khana" },
    { src: "/images/training-field.webp", icon: "seedling", caption: "Field practicum" },
  ];

  return (
    <section className="train-section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">
            <Icon name="cap" /> Training
          </span>
          <h2 className="h2">{t.training_title}</h2>
          <p>{t.training_sub}</p>
        </Reveal>

        <div className="train-photos">
          {photos.map((p) => (
            <Reveal as="figure" className="train-photo card" key={p.src}>
              {/* eslint-disable-next-line @next/next/no-img-element -- see Mission.tsx */}
              <img src={p.src} alt={t.training_img_alt} loading="lazy" width={1400} height={800} />
              <figcaption className="train-cap">
                <Icon name={p.icon} /> {p.caption}
              </figcaption>
            </Reveal>
          ))}
        </div>

        <div className="train-grid">
          {TRAINING.map((w, i) => (
            <Reveal className="train-card" key={w.wk}>
              <Icon name={WEEK_ICONS[i] || "badge"} as="div" className="train-ico" />
              <div className="wk">{w.wk}</div>
              <h4>{lang === "hi" ? w.title_hi : w.title_en}</h4>
              <p>{w.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="train-foot">
          <Icon name="pin" className="train-foot-ico" />
          {t.training_partners}
        </Reveal>
      </div>
    </section>
  );
}
