"use client";

import { useMemo, useState } from "react";
import { I18N } from "@/lib/kisan-mitra/i18n";
import { ICON } from "@/lib/kisan-mitra/icons";
import { POSITIONS, getDepartment } from "@/lib/kisan-mitra/recruitment/data";
import type { Lang } from "@/lib/kisan-mitra/recruitment/types";
import { useReveal } from "@/components/useReveal";
import { tr } from "@/lib/kisan-mitra/localized";

type SortKey = "position" | "department" | "salary" | "reporting";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 5;

interface RecruitmentMatrixProps {
  lang: Lang;
}

export function RecruitmentMatrix({ lang }: RecruitmentMatrixProps) {
  const t = I18N[lang];
  const { ref, className } = useReveal<HTMLDivElement>();
  const [sortKey, setSortKey] = useState<SortKey>("salary");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [showAll, setShowAll] = useState(false);

  const rows = useMemo(() => {
    const withDept = POSITIONS.map((p) => {
      const d = getDepartment(p.departmentId);
      return {
        position: p,
        title: tr(p, "title", lang),
        deptName: d ? (tr(d, "name", lang)) : "",
        reportingOfficer: tr(p, "reportingOfficer", lang),
      };
    });
    const sorted = [...withDept].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "position") cmp = a.title.localeCompare(b.title);
      else if (sortKey === "department") cmp = a.deptName.localeCompare(b.deptName);
      else if (sortKey === "salary") cmp = a.position.salary - b.position.salary;
      else cmp = a.reportingOfficer.localeCompare(b.reportingOfficer);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return sorted;
  }, [lang, sortKey, sortDir]);

  const maxSalary = useMemo(() => Math.max(...POSITIONS.map((p) => p.salary)), []);
  const visibleRows = showAll ? rows : rows.slice(0, PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "salary" ? "desc" : "asc");
    }
  };

  const sortPill = (key: SortKey, label: string) => (
    <button
      type="button"
      className={`matrix-sort-pill${sortKey === key ? " active" : ""}`}
      onClick={() => toggleSort(key)}
      aria-label={sortKey === key && sortDir === "asc" ? t.matrix_sort_desc : t.matrix_sort_asc}
    >
      {label}
      <span
        className={`matrix-sort-ico${sortKey === key && sortDir === "desc" ? " desc" : ""}`}
        dangerouslySetInnerHTML={{ __html: ICON.sort }}
      />
    </button>
  );

  return (
    <section id="salary">
      <div className="container">
        <div className={`section-head ${className}`} ref={ref}>
          <span className="eyebrow">
            <span dangerouslySetInnerHTML={{ __html: ICON.rupee }} />
            {t.matrix_eyebrow}
          </span>
          <h2 className="h2">{t.matrix_title}</h2>
          <p>{t.matrix_sub}</p>
        </div>

        <div className="matrix-sort-row">
          {sortPill("position", t.matrix_th_position)}
          {sortPill("department", t.matrix_th_department)}
          {sortPill("salary", t.matrix_th_salary)}
          {sortPill("reporting", t.matrix_th_reporting)}
        </div>

        <div className="matrix-list">
          {visibleRows.map((row) => {
            const pct = Math.max(10, Math.round((row.position.salary / maxSalary) * 100));
            return (
              <div key={row.position.id} className="matrix-row">
                <div className="matrix-row-top">
                  <span className="matrix-row-title">{row.title}</span>
                  <span
                    className="matrix-row-dept"
                    style={{ background: `${row.position.accent}1F`, color: row.position.accent }}
                  >
                    {row.deptName}
                  </span>
                </div>
                <div className="matrix-bar-track">
                  <div className="matrix-bar-fill" style={{ width: `${pct}%`, background: row.position.accent }} />
                </div>
                <div className="matrix-row-bottom">
                  <span className="matrix-row-salary">{row.position.salaryDisplay}{t.unit_per_month}</span>
                  <span className="matrix-row-reporting">
                    <span dangerouslySetInnerHTML={{ __html: ICON.arrowRight }} />
                    {row.reportingOfficer}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {!showAll && rows.length > PAGE_SIZE && (
          <div className="rec-view-all">
            <button type="button" className="btn btn-outline" onClick={() => setShowAll(true)}>
              {t.rec_view_all} ({rows.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
