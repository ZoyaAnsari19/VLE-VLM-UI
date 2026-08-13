"use client";

import { useMemo, useState } from "react";
import { I18N } from "@/lib/kisan-mitra/i18n";
import { ICON } from "@/lib/kisan-mitra/icons";
import { getPositionsByDepartment, searchPositions, filterBySalaryBand } from "@/lib/kisan-mitra/recruitment/data";
import type { Lang, Position } from "@/lib/kisan-mitra/recruitment/types";
import { applyToPosition } from "@/lib/kisan-mitra/apply";
import { DepartmentTabs } from "./DepartmentTabs";
import { SearchBar } from "./SearchBar";
import { SalaryRangeFilter } from "./SalaryRangeFilter";
import { PositionCard } from "./PositionCard";
import { PositionDetailModal } from "./PositionDetailModal";
import { useReveal } from "@/components/useReveal";

const PAGE_SIZE = 6;

interface RecruitmentExplorerProps {
  lang: Lang;
}

export function RecruitmentExplorer({ lang }: RecruitmentExplorerProps) {
  const t = I18N[lang];
  const { ref: headRef, className: headClass } = useReveal<HTMLDivElement>();
  const { ref: toolsRef, className: toolsClass } = useReveal<HTMLDivElement>();
  const [activeDept, setActiveDept] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [bandId, setBandId] = useState("all");
  const [selected, setSelected] = useState<Position | null>(null);
  const [showAll, setShowAll] = useState(false);

  const positions = useMemo(() => {
    const byDept = getPositionsByDepartment(activeDept);
    const bySearch = searchPositions(byDept, query, lang);
    return filterBySalaryBand(bySearch, bandId);
  }, [activeDept, query, bandId, lang]);

  // Collapse back to the first page whenever the filter criteria change, instead of
  // carrying "showAll" over to a completely different result set. This adjusts state
  // during render (React's documented pattern for this), not in an effect.
  const filterKey = `${activeDept}|${query}|${bandId}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setShowAll(false);
  }

  const visiblePositions = showAll ? positions : positions.slice(0, PAGE_SIZE);

  const goToApplyForm = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleApply = (position: Position) => {
    applyToPosition(position.id);
    goToApplyForm();
  };

  return (
    <section id="roles" className="bg-paper">
      <div className="container">
        <div className={`section-head ${headClass}`} ref={headRef}>
          <span className="eyebrow">
            <span dangerouslySetInnerHTML={{ __html: ICON.briefcase }} />
            {t.rec_explorer_eyebrow}
          </span>
          <h2 className="h2">{t.rec_explorer_title}</h2>
          <p>{t.rec_explorer_sub}</p>
        </div>

        <div className={`rec-tools ${toolsClass}`} ref={toolsRef}>
          <DepartmentTabs lang={lang} activeId={activeDept} onChange={setActiveDept} />
          <div className="rec-tools-row">
            <SearchBar lang={lang} value={query} onChange={setQuery} />
            <SalaryRangeFilter lang={lang} activeBandId={bandId} onChange={setBandId} />
          </div>
        </div>

        {positions.length > 0 ? (
          <>
            <div className="positions-grid">
              {visiblePositions.map((position) => (
                <PositionCard
                  key={position.id}
                  position={position}
                  lang={lang}
                  onViewDetails={setSelected}
                  onApply={handleApply}
                />
              ))}
            </div>
            {!showAll && positions.length > PAGE_SIZE && (
              <div className="rec-view-all">
                <button type="button" className="btn btn-outline" onClick={() => setShowAll(true)}>
                  {t.rec_view_all} ({positions.length})
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rec-empty">
            <h3 className="h3">{t.rec_empty_title}</h3>
            <p>{t.rec_empty_sub}</p>
          </div>
        )}
      </div>

      <PositionDetailModal position={selected} lang={lang} onClose={() => setSelected(null)} onApply={handleApply} />
    </section>
  );
}
