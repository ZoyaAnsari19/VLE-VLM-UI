"use client";

import { ICON } from "@/lib/kisan-mitra/icons";
import { getRecruitmentStats } from "@/lib/kisan-mitra/recruitment/data";
import { useLang } from "@/components/LangProvider";
import { useCountUp, useInView } from "@/components/useCountUp";

export function RecruitmentStats() {
  const { t } = useLang();
  const stats = getRecruitmentStats();
  const { ref: containerRef, inView: active } = useInView<HTMLDivElement>(0.5);

  const totalPositions = useCountUp(stats.totalPositions, active);
  const totalDepartments = useCountUp(stats.totalDepartments, active);
  const careerPaths = useCountUp(stats.careerPaths, active);

  return (
    <section className="rec-stats-section">
      <div className="container">
        <div className="hero-stats rec-stats" ref={containerRef}>
          <div className="hero-stat">
            <span className="hero-stat-ico" dangerouslySetInnerHTML={{ __html: ICON.briefcase }} />
            <div className="hero-stat-body">
              <div className="num">{totalPositions}+</div>
              <div className="lbl">{t.stat_total_positions}</div>
              <div className="sublbl">{t.stat_total_positions_sub}</div>
            </div>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-ico" dangerouslySetInnerHTML={{ __html: ICON.rupee }} />
            <div className="hero-stat-body">
              <div className="num">
                ₹{(stats.salaryMin / 1000).toFixed(0)}K–₹{(stats.salaryMax / 100000).toFixed(1)}L
              </div>
              <div className="lbl">{t.stat_salary_range}</div>
              <div className="sublbl">{t.stat_salary_range_sub}</div>
            </div>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-ico" dangerouslySetInnerHTML={{ __html: ICON.building }} />
            <div className="hero-stat-body">
              <div className="num">{totalDepartments}</div>
              <div className="lbl">{t.stat_departments}</div>
              <div className="sublbl">{t.stat_departments_sub}</div>
            </div>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-ico" dangerouslySetInnerHTML={{ __html: ICON.trendingUp }} />
            <div className="hero-stat-body">
              <div className="num">{careerPaths}+</div>
              <div className="lbl">{t.stat_career_opportunities}</div>
              <div className="sublbl">{t.stat_career_opportunities_sub}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
