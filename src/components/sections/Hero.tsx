"use client";

import { STATS, HERO_VIKAS } from "@/lib/kisan-mitra/data";
import { useLang } from "@/components/LangProvider";
import { useCountUp, useInView } from "@/components/useCountUp";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

/**
 * One hero stat. Stats with a `display` string (e.g. a salary range) are shown
 * as-is; the rest count up from zero once scrolled into view. The count-up lives
 * here rather than via a `data-count` attribute so the retiring vanilla engine's
 * global `[data-count]` sweep can't animate the same number a second time.
 */
function HeroStat({ stat }: { stat: (typeof STATS)[number] }) {
  const { lang } = useLang();
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
  const counted = useCountUp(stat.value, inView && !stat.display);

  return (
    <div className="hero-stat" ref={ref}>
      <Icon name={stat.icon} className="hero-stat-ico" />
      <div className="hero-stat-body">
        <div className="num">{stat.display || counted.toLocaleString("en-IN")}</div>
        <div className="lbl">{lang === "hi" ? stat.label_hi : stat.label_en}</div>
        <div className="sublbl">{lang === "hi" ? stat.sublabel_hi : stat.sublabel_en}</div>
      </div>
    </div>
  );
}

export function Hero() {
  const { t, lang } = useLang();

  return (
    <header className="hero" id="top">
      <div className="container">
        <div className="hero-grid">
          <Reveal>
            <span className="eyebrow">
              <Icon name="leaf" className="eyebrow-ico" />
              {t.hero_eyebrow}
            </span>
            <h1 className="h1 hero-h1">
              {t.hero_h1_line1}
              <br />
              <span className="accent">{t.hero_h1_line2}</span>
            </h1>
            <p className="hero-sub">
              {t.hero_sub} <b>{t.hero_sub_bold}</b>
            </p>
            <div className="hero-ctas">
              <a href="#apply" className="btn btn-primary">
                {t.hero_cta1} <Icon name="arrowRight" />
              </a>
              <a href="#exams" className="btn btn-outline">
                <Icon name="fileText" />
                {t.hero_cta2}
              </a>
            </div>
          </Reveal>
          <Reveal className="hero-vikas-card">
            {HERO_VIKAS.map((v) => (
              <div className="hero-vikas-item" key={v.icon}>
                <Icon name={v.icon} className="hero-vikas-ico" />
                <div className="hero-vikas-title">{lang === "hi" ? v.title_hi : v.title_en}</div>
                <div className="hero-vikas-sub">{lang === "hi" ? v.sub_hi : v.sub_en}</div>
              </div>
            ))}
          </Reveal>
        </div>
        <div className="stats hero-stats">
          {STATS.map((s) => (
            <HeroStat stat={s} key={s.icon} />
          ))}
        </div>
      </div>
    </header>
  );
}
