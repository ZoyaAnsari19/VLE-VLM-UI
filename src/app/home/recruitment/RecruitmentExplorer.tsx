"use client";

import { useMemo, useState } from "react";
import { I18N } from "@/lib/kisan-mitra/i18n";
import { ICON } from "@/lib/kisan-mitra/icons";
import { getPositionsByDepartment, searchPositions, filterBySalaryBand } from "@/lib/kisan-mitra/recruitment/data";
import { routes } from "@/lib/kisan-mitra/routes";
import type { Lang } from "@/lib/kisan-mitra/recruitment/types";
import { DepartmentTabs } from "./DepartmentTabs";
import { SearchBar } from "./SearchBar";
import { SalaryRangeFilter } from "./SalaryRangeFilter";
import { PositionCard } from "./PositionCard";
import { useReveal } from "@/components/useReveal";

const PAGE_SIZE = 6;

interface RecruitmentExplorerProps {
  lang: Lang;
  /** /roles lists everything; the home page teases a few and links out. */
  showAll?: boolean;
  /** Home uses the section heading; /roles supplies its own page heading. */
  heading?: boolean;
}

export function RecruitmentExplorer({ lang, showAll = false, heading = true }: RecruitmentExplorerProps) {
  const t = I18N[lang];
  const { ref: headRef, className: headClass } = useReveal<HTMLDivElement>();
  const { ref: toolsRef, className: toolsClass } = useReveal<HTMLDivElement>();
  const [activeDept, setActiveDept] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [bandId, setBandId] = useState("all");

  const positions = useMemo(() => {
    const byDept = getPositionsByDepartment(activeDept);
    const bySearch = searchPositions(byDept, query, lang);
    return filterBySalaryBand(bySearch, bandId);
  }, [activeDept, query, bandId, lang]);

  const visiblePositions = showAll ? positions : positions.slice(0, PAGE_SIZE);

  return (
    <section id="roles" className="bg-paper">
      <div className="container">
        {heading && (
          <div className={`section-head ${headClass}`} ref={headRef}>
            <span className="eyebrow">
              <span dangerouslySetInnerHTML={{ __html: ICON.briefcase }} />
              {t.rec_explorer_eyebrow}
            </span>
            <h2 className="h2">
              {t.rec_explorer_title_pre} <span className="accent">{t.rec_explorer_title_accent}</span>{" "}
              {t.rec_explorer_title_post}
            </h2>
            <p>{t.rec_explorer_sub}</p>
          </div>
        )}

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
                <PositionCard key={position.id} position={position} lang={lang} />
              ))}
            </div>
            {!showAll && positions.length > PAGE_SIZE && (
              <div className="rec-view-all">
                <a href={routes.roles()} className="btn btn-outline">
                  {t.rec_view_all} ({positions.length})
                </a>
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
    </section>
  );
}
