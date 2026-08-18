"use client";

import { MISSION_HIGHLIGHTS } from "@/lib/kisan-mitra/data";
import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

export function Mission() {
  const { t, lang } = useLang();

  const steps = [
    { num: "01", icon: "cap", label: t.mission_step1_label, body: t.mission_p1 },
    { num: "02", icon: "pin", label: t.mission_step2_label, body: t.mission_p2 },
  ];

  return (
    <section className="mission" id="mission">
      <div className="container">
        <div className="mission-grid">
          <Reveal className="mission-copy">
            <div className="mission-kicker">
              <Icon name="leaf" className="mission-kicker-ico" />
              {t.mission_kicker}
            </div>
            <h2 className="h2">{t.mission_title}</h2>
            <p className="mission-sub">{t.mission_sub}</p>
            <div className="mission-steps">
              {steps.map((s) => (
                <div className="mission-step" key={s.num}>
                  <span className="mission-step-num">{s.num}</span>
                  <div className="mission-step-body">
                    <h4>
                      <Icon name={s.icon} className="mission-step-ico" />
                      {s.label}
                    </h4>
                    <p>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mission-leader">
              <Icon name="badge" className="mission-leader-ico" />
              {t.mission_leader}
            </div>
            <div className="mission-highlights">
              {MISSION_HIGHLIGHTS.map((h) => (
                <Reveal className={`highlight-card highlight-${h.color}`} key={h.icon}>
                  <Icon name={h.icon} className="highlight-ico" />
                  <div className="highlight-label">{lang === "hi" ? h.label_hi : h.label_en}</div>
                  <span className="highlight-underline" />
                </Reveal>
              ))}
            </div>
          </Reveal>
          <Reveal className="mission-media">
            {/* eslint-disable-next-line @next/next/no-img-element -- kept as a plain <img> so this
                migration doesn't alter rendering; swapping to next/image is a later optimisation pass. */}
            <img src="/images/mission.webp" alt={t.mission_img_alt} loading="lazy" width={900} height={502} />
            <span className="mission-badge">
              <Icon name="leaf" /> {t.mission_badge}
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
