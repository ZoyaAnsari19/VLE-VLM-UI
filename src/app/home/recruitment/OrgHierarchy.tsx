"use client";

import { I18N } from "@/lib/kisan-mitra/i18n";
import { ICON } from "@/lib/kisan-mitra/icons";
import { getPosition } from "@/lib/kisan-mitra/recruitment/data";
import type { Lang, Position } from "@/lib/kisan-mitra/recruitment/types";
import { useReveal } from "@/components/useReveal";
import { DepartmentVerticals } from "./DepartmentVerticals";

interface OrgHierarchyProps {
  lang: Lang;
}

function titleFor(position: Position | undefined, lang: Lang) {
  if (!position) return "";
  return lang === "hi" ? position.title_hi : position.title_en;
}

export function OrgHierarchy({ lang }: OrgHierarchyProps) {
  const t = I18N[lang];
  const { ref: headRef, className: headClass } = useReveal<HTMLDivElement>();
  const { ref: mainRef, className: mainClass } = useReveal<HTMLDivElement>();

  const dd = getPosition("divisional-director");
  const dlo = getPosition("division-level-officer");
  const teo = getPosition("teo");
  const vlm = getPosition("vlm");
  const vle = getPosition("vle");

  return (
    <section className="bg-paper hier-section">
      <div className="container">
        <div className={`section-head ${headClass}`} ref={headRef}>
          <span className="eyebrow">
            <span dangerouslySetInnerHTML={{ __html: ICON.briefcase }} />
            Hierarchy
          </span>
          <h2 className="h2">{t.hier_title}</h2>
          <p>{t.hier_sub}</p>
        </div>

        <div className={`hier ${mainClass}`} ref={mainRef}>
          <div className="hier-node hq">{t.hier_hq}</div>
          <div className="hier-arrow" />
          <div className="hier-node">
            {dd?.code}
            <span className="sub">{titleFor(dd, lang)}</span>
          </div>
          <div className="hier-arrow" />
          <div className="hier-node">
            {dlo?.code}
            <span className="sub">{titleFor(dlo, lang)}</span>
          </div>
          <div className="hier-arrow" />
          <div className="hier-node">
            {teo?.code}
            <span className="sub">{titleFor(teo, lang)}</span>
          </div>
          <div className="hier-arrow" />
          <div className="hier-row">
            <div className="hier-node">
              {vlm?.code}
              <span className="sub">{titleFor(vlm, lang)}</span>
            </div>
            <div className="hier-node">
              {vle?.code}
              <span className="sub">{titleFor(vle, lang)}</span>
            </div>
          </div>
          <div className="hier-arrow" />
          <div className="hier-node" style={{ background: "var(--green-soft)" }}>
            {t.hier_villages}
          </div>
        </div>

        <DepartmentVerticals lang={lang} />
      </div>
    </section>
  );
}
