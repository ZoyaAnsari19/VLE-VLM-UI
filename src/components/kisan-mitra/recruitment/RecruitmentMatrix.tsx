"use client";

import { useMemo, useState } from "react";
import { I18N } from "@/lib/kisan-mitra/i18n";
import { ICON } from "@/lib/kisan-mitra/icons";
import { POSITIONS, getDepartment } from "@/lib/kisan-mitra/recruitment/data";
import type { Lang } from "@/lib/kisan-mitra/recruitment/types";
import { useReveal } from "./useReveal";

type SortKey = "position" | "department" | "salary" | "reporting";
type SortDir = "asc" | "desc";

interface RecruitmentMatrixProps {
  lang: Lang;
}

export function RecruitmentMatrix({ lang }: RecruitmentMatrixProps) {
  const t = I18N[lang];
  const { ref, className } = useReveal<HTMLDivElement>();
  const [sortKey, setSortKey] = useState<SortKey>("salary");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const rows = useMemo(() => {
    const withDept = POSITIONS.map((p) => {
      const d = getDepartment(p.departmentId);
      return {
        position: p,
        title: lang === "hi" ? p.title_hi : p.title_en,
        deptName: d ? (lang === "hi" ? d.name_hi : d.name_en) : "",
        reportingOfficer: lang === "hi" ? p.reportingOfficer_hi : p.reportingOfficer_en,
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

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const headerButton = (key: SortKey, label: string) => (
    <button
      type="button"
      className="tbl-sort-btn"
      onClick={() => toggleSort(key)}
      aria-label={sortKey === key && sortDir === "asc" ? t.matrix_sort_desc : t.matrix_sort_asc}
    >
      {label}
      <span
        className={`tbl-sort-ico${sortKey === key ? " active" : ""}${sortKey === key && sortDir === "desc" ? " desc" : ""}`}
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
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>{headerButton("position", t.matrix_th_position)}</th>
                <th>{headerButton("department", t.matrix_th_department)}</th>
                <th>{headerButton("salary", t.matrix_th_salary)}</th>
                <th>{headerButton("reporting", t.matrix_th_reporting)}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.position.id}>
                  <td>
                    <b>{row.title}</b>
                  </td>
                  <td>{row.deptName}</td>
                  <td>
                    <b style={{ color: "var(--green-forest)" }}>{row.position.salaryDisplay}</b>
                  </td>
                  <td>{row.reportingOfficer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
