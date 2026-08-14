"use client";

import { useState, type ReactNode } from "react";
import { ICON } from "@/lib/kisan-mitra/icons";
import { I18N } from "@/lib/kisan-mitra/i18n";
import { getDepartmentVerticals } from "@/lib/kisan-mitra/recruitment/data";
import type { Lang } from "@/lib/kisan-mitra/recruitment/types";
import { useReveal } from "@/components/useReveal";

interface DepartmentVerticalsProps {
  lang: Lang;
}

type Tier = "head" | "mid" | "junior";

function tierOf(index: number, total: number): Tier {
  if (index === 0) return "head";
  if (index === total - 1) return "junior";
  return "mid";
}

/** Wraps the first match of `query` inside `text` in a <mark>. */
function highlight(text: string, query: string): ReactNode {
  const q = query.trim();
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="dv-mark">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export function DepartmentVerticals({ lang }: DepartmentVerticalsProps) {
  const t = I18N[lang];
  const { ref: headRef, className: headClass } = useReveal<HTMLDivElement>();
  const { ref: bodyRef, className: bodyClass } = useReveal<HTMLDivElement>();
  const verticals = getDepartmentVerticals();

  const [activeDept, setActiveDept] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const q = query.trim().toLowerCase();

  const cards = verticals
    .filter(({ department }) => !activeDept || department.id === activeDept)
    .map(({ department, positions }) => {
      // getDepartmentVerticals() returns positions ascending by seniorityRank (junior first);
      // reverse so index 0 is the most senior role — index 0 drives the "head" tier and peek.
      const titled = [...positions].reverse().map((position) => ({ position, title: lang === "hi" ? position.title_hi : position.title_en }));
      const matches = q ? titled.filter((x) => x.title.toLowerCase().includes(q)) : titled;
      return { department, all: titled, matches };
    })
    .filter((card) => !q || card.matches.length > 0);

  return (
    <div className="dv-wrap">
      <div className={`section-head ${headClass}`} ref={headRef}>
        <h3 className="h3">{t.hier_verticals_title}</h3>
        <p>{t.hier_verticals_sub}</p>
      </div>

      <div className={`dv-controls ${bodyClass}`} ref={bodyRef}>
        <div className="dv-tabs" role="tablist" aria-label={t.dv_all}>
          <button
            type="button"
            role="tab"
            aria-selected={activeDept === null}
            className={`dv-tab${activeDept === null ? " active" : ""}`}
            onClick={() => setActiveDept(null)}
          >
            {t.dv_all}
          </button>
          {verticals.map(({ department }) => (
            <button
              key={department.id}
              type="button"
              role="tab"
              aria-selected={activeDept === department.id}
              className={`dv-tab${activeDept === department.id ? " active" : ""}`}
              style={activeDept === department.id ? { background: department.accent, borderColor: department.accent } : undefined}
              onClick={() => setActiveDept(department.id)}
            >
              {lang === "hi" ? department.name_hi : department.name_en}
            </button>
          ))}
        </div>

        <label className="dv-search">
          <span className="dv-search-ico" dangerouslySetInnerHTML={{ __html: ICON.search }} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.dv_search_placeholder}
            aria-label={t.dv_search_placeholder}
          />
        </label>
      </div>

      {cards.length === 0 ? (
        <div className="rec-empty">
          <h3 className="h3">{t.dv_empty_title}</h3>
          <p>{t.dv_empty_sub}</p>
        </div>
      ) : (
        <div className="dv-grid">
          {cards.map(({ department, all, matches }) => {
            const list = q ? matches : all;
            const isOpen = expanded.has(department.id) || !!q || activeDept === department.id;
            const description = lang === "hi" ? department.description_hi : department.description_en;

            return (
              <div
                key={department.id}
                className="dv-card"
                style={{ ["--v-accent" as string]: department.accent, ["--v-tint" as string]: `${department.accent}1A` }}
              >
                <button type="button" className="dv-card-head" onClick={() => toggle(department.id)} aria-expanded={isOpen}>
                  <span className="dv-badge" style={{ background: `${department.accent}1F`, color: department.accent }}>
                    <span dangerouslySetInnerHTML={{ __html: ICON[department.icon as keyof typeof ICON] }} />
                  </span>
                  <span className="dv-count">
                    {all.length} {t.dv_roles}
                  </span>
                </button>
                <span className="dv-card-title" style={{ color: department.accent }}>
                  {lang === "hi" ? department.name_hi : department.name_en}
                </span>
                {!isOpen && description && <p className="dv-card-desc">{description}</p>}

                {isOpen && (
                  <div className="dv-timeline">
                    {list.map(({ position, title }) => {
                      const tier = tierOf(
                        all.findIndex((x) => x.position.id === position.id),
                        all.length
                      );
                      return (
                        <div key={position.id} className="dv-timeline-item">
                          <span className="dv-dot" style={{ background: department.accent }} />
                          <div
                            className={`dv-node tier-${tier}`}
                            style={tier === "head" ? { background: department.accent } : { borderLeftColor: department.accent }}
                          >
                            {highlight(title, query)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <button
                  type="button"
                  className="dv-view-roles"
                  style={{ color: department.accent }}
                  onClick={() => toggle(department.id)}
                  aria-expanded={isOpen}
                >
                  {t.dv_view_roles}
                  <span className={`dv-chevron${isOpen ? " open" : ""}`} dangerouslySetInnerHTML={{ __html: ICON.arrowRight }} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
