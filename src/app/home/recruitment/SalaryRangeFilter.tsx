"use client";

import { SALARY_BANDS } from "@/lib/kisan-mitra/recruitment/data";
import { I18N } from "@/lib/kisan-mitra/i18n";
import type { Lang } from "@/lib/kisan-mitra/recruitment/types";

interface SalaryRangeFilterProps {
  lang: Lang;
  activeBandId: string;
  onChange: (bandId: string) => void;
}

export function SalaryRangeFilter({ lang, activeBandId, onChange }: SalaryRangeFilterProps) {
  const t = I18N[lang];
  return (
    <div className="salary-filter-chips" role="group" aria-label={t.filter_salary_label}>
      {SALARY_BANDS.map((band) => (
        <button
          key={band.id}
          type="button"
          className={`salary-chip${activeBandId === band.id ? " active" : ""}`}
          aria-pressed={activeBandId === band.id}
          onClick={() => onChange(band.id)}
        >
          {lang === "hi" ? band.label_hi : band.label_en}
        </button>
      ))}
    </div>
  );
}
