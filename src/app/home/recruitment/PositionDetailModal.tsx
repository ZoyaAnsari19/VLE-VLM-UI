"use client";

import { ICON } from "@/lib/kisan-mitra/icons";
import { I18N } from "@/lib/kisan-mitra/i18n";
import { getDepartment } from "@/lib/kisan-mitra/recruitment/data";
import type { Lang, Position } from "@/lib/kisan-mitra/recruitment/types";
import { Modal } from "@/components/Modal";

interface PositionDetailModalProps {
  position: Position | null;
  lang: Lang;
  onClose: () => void;
  onApply: (position: Position) => void;
}

export function PositionDetailModal({ position, lang, onClose, onApply }: PositionDetailModalProps) {
  const t = I18N[lang];
  if (!position) return null;

  const dept = getDepartment(position.departmentId);
  const title = lang === "hi" ? position.title_hi : position.title_en;
  const summary = lang === "hi" ? position.summary_hi : position.summary_en;
  const eligibility = lang === "hi" ? position.eligibility_hi : position.eligibility_en;
  const responsibilities = lang === "hi" ? position.responsibilities_hi : position.responsibilities_en;
  const reportingOfficer = lang === "hi" ? position.reportingOfficer_hi : position.reportingOfficer_en;
  const careerPath = lang === "hi" ? position.careerPath_hi : position.careerPath_en;
  const uniform = lang === "hi" ? position.uniform_hi : position.uniform_en;
  const monthlyTargets = lang === "hi" ? position.monthlyTargets_hi : position.monthlyTargets_en;
  const deptName = dept ? (lang === "hi" ? dept.name_hi : dept.name_en) : "";

  return (
    <Modal open onClose={onClose} ariaLabel={title} closeLabel={t.card_close}>
      <div className="km-modal-head">
        <span className="role-pill" style={{ background: position.accent }}>
          {position.code}
        </span>
        <div>
          <h3 className="km-modal-title">{title}</h3>
          <div className="km-modal-sub">
            {deptName} · {position.salaryDisplay}/mo
          </div>
        </div>
      </div>
      <div className="km-modal-body">
        <p className="role-card-summary">{summary}</p>

        <div className="rec-modal-section">
          <span className="k">{t.label_eligibility}</span>
          <p className="rec-modal-text">{eligibility}</p>
        </div>

        <div className="rec-modal-section">
          <span className="k">{t.label_responsibilities}</span>
          <ul className="role-duties">
            {responsibilities.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>

        <div className="rec-modal-grid">
          <div className="rec-modal-section">
            <span className="k">{t.label_reporting_officer}</span>
            <p className="rec-modal-text">{reportingOfficer}</p>
          </div>
          <div className="rec-modal-section">
            <span className="k">{t.label_salary}</span>
            <p className="rec-modal-text rec-modal-salary">{position.salaryDisplay}/mo</p>
          </div>
        </div>

        <div className="rec-modal-section">
          <span className="k">{t.label_career_path}</span>
          <div className="career-path">
            {careerPath.map((step, i) => (
              <span key={i} className="career-path-step">
                {step}
                {i < careerPath.length - 1 && (
                  <span className="career-path-arrow" dangerouslySetInnerHTML={{ __html: ICON.arrowRight }} />
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="rec-modal-grid">
          <div className="rec-modal-section">
            <span className="k">{t.label_uniform}</span>
            <p className="rec-modal-text">{uniform}</p>
          </div>
          {monthlyTargets && monthlyTargets.length > 0 && (
            <div className="rec-modal-section">
              <span className="k">{t.label_monthly_targets}</span>
              <ul className="role-duties">
                {monthlyTargets.map((mt, i) => (
                  <li key={i}>{mt}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="km-modal-foot">
        <button
          type="button"
          className="btn btn-primary km-modal-apply"
          onClick={() => {
            onApply(position);
            onClose();
          }}
        >
          {t.card_apply} <span dangerouslySetInnerHTML={{ __html: ICON.arrowRight }} />
        </button>
      </div>
    </Modal>
  );
}
