"use client";

import { DEPARTMENTS } from "@/lib/kisan-mitra/recruitment/data";
import type { Lang } from "@/lib/kisan-mitra/recruitment/types";
import { ICON } from "@/lib/kisan-mitra/icons";
import { I18N } from "@/lib/kisan-mitra/i18n";
import { tr } from "@/lib/kisan-mitra/localized";

interface DepartmentTabsProps {
  lang: Lang;
  activeId: string | null;
  onChange: (id: string | null) => void;
}

export function DepartmentTabs({ lang, activeId, onChange }: DepartmentTabsProps) {
  const t = I18N[lang];

  return (
    <div className="dept-tabs" role="tablist" aria-label={t.dept_all}>
      <button
        type="button"
        role="tab"
        aria-selected={activeId === null}
        className={`dept-tab${activeId === null ? " active" : ""}`}
        onClick={() => onChange(null)}
      >
        {t.dept_all}
      </button>
      {DEPARTMENTS.map((dept) => (
        <button
          key={dept.id}
          type="button"
          role="tab"
          aria-selected={activeId === dept.id}
          className={`dept-tab${activeId === dept.id ? " active" : ""}`}
          style={activeId === dept.id ? { background: dept.accent, borderColor: dept.accent } : undefined}
          onClick={() => onChange(dept.id)}
        >
          <span className="dept-tab-ico" dangerouslySetInnerHTML={{ __html: ICON[dept.icon as keyof typeof ICON] }} />
          {tr(dept, "name", lang)}
        </button>
      ))}
    </div>
  );
}
