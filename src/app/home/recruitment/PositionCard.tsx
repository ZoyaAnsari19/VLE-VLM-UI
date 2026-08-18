"use client";

import { ICON } from "@/lib/kisan-mitra/icons";
import { I18N } from "@/lib/kisan-mitra/i18n";
import { getDepartment } from "@/lib/kisan-mitra/recruitment/data";
import { routes } from "@/lib/kisan-mitra/routes";
import type { Lang, Position } from "@/lib/kisan-mitra/recruitment/types";
import { useReveal } from "@/components/useReveal";

interface PositionCardProps {
  position: Position;
  lang: Lang;
}

export function PositionCard({ position, lang }: PositionCardProps) {
  const t = I18N[lang];
  const { ref, className } = useReveal<HTMLElement>();
  const dept = getDepartment(position.departmentId);
  const title = lang === "hi" ? position.title_hi : position.title_en;
  const summary = lang === "hi" ? position.summary_hi : position.summary_en;
  const deptName = dept ? (lang === "hi" ? dept.name_hi : dept.name_en) : "";

  return (
    <article ref={ref} className={`card position-card ${className}`}>
      <div className="position-card-head" style={{ background: position.accent }}>
        <span
          className="position-card-ico"
          dangerouslySetInnerHTML={{ __html: dept ? ICON[dept.icon as keyof typeof ICON] : ICON.briefcase }}
        />
        <span className="position-card-code">{position.code}</span>
      </div>
      <div className="position-card-body">
        <span className="position-card-dept">{deptName}</span>
        <h3 className="role-title position-card-title">{title}</h3>
        <p className="role-card-summary">{summary}</p>
        <div className="position-card-salary">
          <span className="k">{t.label_salary}</span>
          <span className="v">{position.salaryDisplay}/mo</span>
        </div>
        <div className="position-card-actions">
          {/* A real link, not a modal: each role has its own indexable, shareable URL. */}
          <a href={routes.role(position.id)} className="btn btn-outline position-card-details">
            {t.card_view_details}
            <span dangerouslySetInnerHTML={{ __html: ICON.arrowRight }} />
          </a>
          <a
            href={routes.applyTo(position.id)}
            className="btn btn-primary position-card-apply"
            style={{ background: position.accent }}
          >
            {t.card_apply}
            <span dangerouslySetInnerHTML={{ __html: ICON.check }} />
          </a>
        </div>
      </div>
    </article>
  );
}
