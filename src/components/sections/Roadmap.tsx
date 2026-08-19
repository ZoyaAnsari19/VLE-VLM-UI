"use client";

import { ROADMAP } from "@/lib/kisan-mitra/data";
import { useLang } from "@/components/LangProvider";
import { useCarousel } from "@/components/useCarousel";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { tr } from "@/lib/kisan-mitra/localized";

export function Roadmap() {
  const { t, lang } = useLang();
  const { viewportRef, trackRef, atStart, atEnd, scrollPrev, scrollNext } = useCarousel({
    cardSelector: ".step",
  });

  return (
    <section>
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">
            <Icon name="pin" /> Roadmap
          </span>
          <h2 className="h2">{t.roadmap_title}</h2>
          <p>{t.roadmap_sub}</p>
        </Reveal>

        <div className="roadmap-carousel">
          <button
            type="button"
            className="perks-nav roadmap-prev"
            aria-label={t.perks_prev}
            onClick={scrollPrev}
            disabled={atStart}
          >
            <Icon name="arrowLeft" />
          </button>
          <div className="roadmap-viewport" ref={viewportRef}>
            <div className="steps" ref={trackRef}>
              {ROADMAP.map((s) => (
                <Reveal className="step" key={s.n}>
                  <div className="step-top">
                    <div className="step-num">{s.n}</div>
                    <Icon name={s.icon || "badge"} as="div" className="step-ico" />
                  </div>
                  <div className="step-body">
                    <h4>{tr(s, "title", lang)}</h4>
                    <p>{tr(s, "desc", lang)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="perks-nav roadmap-next"
            aria-label={t.perks_next}
            onClick={scrollNext}
            disabled={atEnd}
          >
            <Icon name="arrowRight" />
          </button>
        </div>
      </div>
    </section>
  );
}
