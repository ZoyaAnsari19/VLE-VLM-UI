"use client";

import { useEffect, useRef, useState } from "react";
import { I18N } from "@/lib/kisan-mitra/i18n";
import { getRecruitmentStats } from "@/lib/kisan-mitra/recruitment/data";
import type { Lang } from "@/lib/kisan-mitra/recruitment/types";

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    if (reduce) {
      raf = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(raf);
    }
    const dur = 1400;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return value;
}

interface RecruitmentStatsProps {
  lang: Lang;
}

export function RecruitmentStats({ lang }: RecruitmentStatsProps) {
  const t = I18N[lang];
  const stats = getRecruitmentStats();
  const containerRef = useRef<HTMLDivElement>(null);
  // Always starts false to match server-rendered output; corrected post-hydration below.
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      const raf = requestAnimationFrame(() => setActive(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const totalPositions = useCountUp(stats.totalPositions, active);
  const totalDepartments = useCountUp(stats.totalDepartments, active);
  const careerPaths = useCountUp(stats.careerPaths, active);

  return (
    <section className="rec-stats-section">
      <div className="container">
        <div className="rec-stats" ref={containerRef}>
          <div className="stat glass-panel">
            <div className="num">{totalPositions}+</div>
            <div className="lbl">{t.stat_total_positions}</div>
          </div>
          <div className="stat glass-panel">
            <div className="num">
              ₹{(stats.salaryMin / 1000).toFixed(0)}K–₹{(stats.salaryMax / 100000).toFixed(1)}L
            </div>
            <div className="lbl">{t.stat_salary_range}</div>
          </div>
          <div className="stat glass-panel">
            <div className="num">{totalDepartments}</div>
            <div className="lbl">{t.stat_departments}</div>
          </div>
          <div className="stat glass-panel">
            <div className="num">{careerPaths}+</div>
            <div className="lbl">{t.stat_career_opportunities}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
