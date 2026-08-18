"use client";

import { ICON } from "@/lib/kisan-mitra/icons";
import { I18N } from "@/lib/kisan-mitra/i18n";
import type { Lang } from "@/lib/kisan-mitra/recruitment/types";

interface SearchBarProps {
  lang: Lang;
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ lang, value, onChange }: SearchBarProps) {
  const t = I18N[lang];
  return (
    <label className="rec-search">
      <span className="rec-search-ico" dangerouslySetInnerHTML={{ __html: ICON.search }} aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.search_placeholder}
        aria-label={t.search_aria_label}
      />
    </label>
  );
}
