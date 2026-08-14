// @ts-nocheck
// ============================================================
// SECTION RENDERERS — return HTML strings for each section
// ============================================================
import { ICON } from './icons';
import { DIVISIONS, STATS, HERO_VIKAS, MISSION_HIGHLIGHTS, EXAMS, ROADMAP, TRAINING, SCHEMES, SCHEME_TRUST, MEMBER_BENEFITS, FARMER_GOVT_CHIPS, FARMER_IMPACT, INTERVIEW_MEDIA_BADGES, INTERVIEW_POINTS, INTERVIEW_Q_ICONS, INTERVIEW_PANELS, PREP_BENEFITS, MAHARASHTRA_DISTRICTS, FOOTER_ABOUT_STATS, FOOTER_QUICK_LINKS, FOOTER_SOCIAL, FAQ, SECURITY } from './data';
import { PHASE1_VACANCIES, getPosition, getDepartment } from './recruitment/data';

const VAC_ROLE_POSITION_ID = { VLE: 'vle', VLM: 'vlm', TEO: 'teo', DLO: 'division-level-officer' };

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Escapes text, then turns **word** markers into <b>word</b> — lets content
// data highlight a phrase without allowing arbitrary HTML through.
const boldMd = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');

const SALARY_PERK_ICONS = [ICON.badge, ICON.scan, ICON.home, ICON.rupee, ICON.briefcase, ICON.shield];

export function renderNav(t, basePath) {
  const b = basePath || '';
  return `
  <nav class="nav" id="nav">
    <div class="container nav-inner">
      <a href="${b}#top" class="brand">
        <span class="leaf">${ICON.leaf}</span> Kisan Mitra
      </a>
      <div class="nav-links">
        <a href="${b}#roles">${t.nav_roles}</a>
        <a href="${b}#exams">${t.nav_exams}</a>
        <a href="${b}#process">${t.nav_process}</a>
        <a href="${b}#schemes">${t.nav_schemes}</a>
        <a href="${b}#faq">${t.nav_faq}</a>
      </div>
      <div class="nav-actions">
        <div class="lang-toggle" id="langToggle">
          <button type="button" data-lang="hi">हिंदी</button>
          <button type="button" data-lang="en">EN</button>
        </div>
        <a href="${b}#apply" class="btn btn-primary nav-apply-btn" style="min-height:44px;padding:11px 20px;font-size:15px">${t.nav_apply}</a>
        <button class="hamburger" id="hamburger" aria-label="Menu">${ICON.menu}</button>
      </div>
    </div>
  </nav>
  <div class="drawer" id="drawer">
    <div class="drawer-head">
      <a href="${b}#top" class="brand"><span class="leaf">${ICON.leaf}</span> Kisan Mitra</a>
      <button class="hamburger" id="drawerClose" aria-label="Close">${ICON.x}</button>
    </div>
    <div class="drawer-links">
      <a href="${b}#roles">${t.nav_roles}</a>
      <a href="${b}#exams">${t.nav_exams}</a>
      <a href="${b}#process">${t.nav_process}</a>
      <a href="${b}#schemes">${t.nav_schemes}</a>
      <a href="${b}#faq">${t.nav_faq}</a>
      <div class="lang-toggle lang-toggle-drawer" id="langToggleDrawer">
        <button type="button" data-lang="hi">हिंदी</button>
        <button type="button" data-lang="en">EN</button>
      </div>
      <a href="${b}#apply" class="btn btn-primary drawer-apply-btn">${t.nav_apply}</a>
    </div>
  </div>`;
}

export function renderHero(t, lang) {
  const stats = STATS.map(s => `
    <div class="hero-stat">
      <span class="hero-stat-ico">${ICON[s.icon]}</span>
      <div class="hero-stat-body">
        <div class="num" ${s.display ? '' : `data-count="${s.value}"`}>${s.display || '0'}</div>
        <div class="lbl">${esc(lang === 'hi' ? s.label_hi : s.label_en)}</div>
        <div class="sublbl">${esc(lang === 'hi' ? s.sublabel_hi : s.sublabel_en)}</div>
      </div>
    </div>`).join('');
  const vikas = HERO_VIKAS.map(v => `
    <div class="hero-vikas-item">
      <span class="hero-vikas-ico">${ICON[v.icon]}</span>
      <div class="hero-vikas-title">${esc(lang === 'hi' ? v.title_hi : v.title_en)}</div>
      <div class="hero-vikas-sub">${esc(lang === 'hi' ? v.sub_hi : v.sub_en)}</div>
    </div>`).join('');
  return `
  <header class="hero" id="top">
    <div class="container">
      <div class="hero-grid">
        <div class="reveal">
          <span class="eyebrow"><span class="eyebrow-ico">${ICON.leaf}</span>${t.hero_eyebrow}</span>
          <h1 class="h1 hero-h1">${esc(t.hero_h1_line1)}<br><span class="accent">${esc(t.hero_h1_line2)}</span></h1>
          <p class="hero-sub">${esc(t.hero_sub)} <b>${esc(t.hero_sub_bold)}</b></p>
          <div class="hero-ctas">
            <a href="#apply" class="btn btn-primary">${t.hero_cta1} ${ICON.arrowRight}</a>
            <a href="#exams" class="btn btn-outline">${ICON.fileText}${t.hero_cta2}</a>
          </div>
        </div>
        <div class="hero-vikas-card reveal">${vikas}</div>
      </div>
      <div class="stats hero-stats">${stats}</div>
    </div>
  </header>`;
}

export function renderMission(t, lang) {
  const highlights = MISSION_HIGHLIGHTS.map(h => `
    <div class="highlight-card highlight-${h.color} reveal">
      <span class="highlight-ico">${ICON[h.icon]}</span>
      <div class="highlight-label">${esc(lang === 'hi' ? h.label_hi : h.label_en)}</div>
      <span class="highlight-underline"></span>
    </div>`).join('');

  return `
  <section class="mission" id="mission">
    <div class="container">
      <div class="mission-grid">
        <div class="mission-copy reveal">
          <div class="mission-kicker"><span class="mission-kicker-ico">${ICON.leaf}</span>${esc(t.mission_kicker)}</div>
          <h2 class="h2">${esc(t.mission_title)}</h2>
          <p class="mission-sub">${esc(t.mission_sub)}</p>
          <div class="mission-steps">
            <div class="mission-step">
              <span class="mission-step-num">01</span>
              <div class="mission-step-body">
                <h4><span class="mission-step-ico">${ICON.cap}</span>${esc(t.mission_step1_label)}</h4>
                <p>${esc(t.mission_p1)}</p>
              </div>
            </div>
            <div class="mission-step">
              <span class="mission-step-num">02</span>
              <div class="mission-step-body">
                <h4><span class="mission-step-ico">${ICON.pin}</span>${esc(t.mission_step2_label)}</h4>
                <p>${esc(t.mission_p2)}</p>
              </div>
            </div>
          </div>
          <div class="mission-leader"><span class="mission-leader-ico">${ICON.badge}</span>${esc(t.mission_leader)}</div>
          <div class="mission-highlights">${highlights}</div>
        </div>
        <div class="mission-media reveal">
          <img src="/images/mission.webp" alt="${esc(t.mission_img_alt)}" loading="lazy" width="900" height="502" />
          <span class="mission-badge">${ICON.leaf} ${esc(t.mission_badge)}</span>
        </div>
      </div>
    </div>
  </section>`;
}

export function renderWhy(t) {
  const cards = [
    { ico: ICON.award, t: t.why_1_t, d: t.why_1_d },
    { ico: ICON.home, t: t.why_2_t, d: t.why_2_d },
    { ico: ICON.rupee, t: t.why_3_t, d: t.why_3_d },
  ].map((c, i) => `
    <div class="card why-card reveal">
      <span class="why-card-dots" aria-hidden="true"></span>
      <span class="why-card-num">0${i + 1}</span>
      <div class="ico-ring"><div class="ico">${c.ico}</div></div>
      <h3 class="h3">${esc(c.t)}</h3>
      <div class="why-card-divider"><span>${ICON.leaf}</span></div>
      <p>${esc(c.d)}</p>
      <span class="why-card-arrow">${ICON.arrowRight}</span>
    </div>`).join('');
  return `
  <section class="bg-paper">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.leaf} Why Join</span>
        <h2 class="h2">${esc(t.why_title)}</h2>
        <p>${esc(t.why_sub)}</p>
      </div>
      <div class="why-grid">${cards}</div>
    </div>
  </section>`;
}

export function renderSalary(t) {
  const perks = t.salary_perks.map((p, i) => `
    <article class="card perk-card reveal">
      <span class="perk-card-leaf" aria-hidden="true">${ICON.leaf}</span>
      <div class="perk-ico">${SALARY_PERK_ICONS[i]}</div>
      <h3 class="h3 perk-title">${esc(p.title)}</h3>
      <span class="perk-title-underline"></span>
      <p class="perk-desc">${boldMd(p.desc)}</p>
    </article>`).join('');
  const evBenefits = t.ev_benefits.map(b => `
    <span class="ev-benefit"><span class="ev-benefit-ico">${ICON[b.icon]}</span>${esc(b.label)}</span>`).join('');
  return `
  <section class="bg-paper salary-perks-section">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.rupee} Perks & Mobility</span>
        <h2 class="h2">${esc(t.salary_title_pre)} <span class="accent">${esc(t.salary_title_accent)}</span> ${esc(t.salary_title_post)}</h2>
        <p>${esc(t.salary_sub)}</p>
        <div class="section-divider"><span>${ICON.leaf}</span></div>
      </div>
      <div class="salary-perks bg-paper reveal">
        <div class="salary-perks-carousel">
          <button type="button" class="perks-nav perks-prev" id="perksPrev" aria-label="${esc(t.perks_prev)}">${ICON.arrowLeft}</button>
          <div class="salary-perks-viewport" id="perksViewport">
            <div class="salary-perks-track">${perks}</div>
          </div>
          <button type="button" class="perks-nav perks-next" id="perksNext" aria-label="${esc(t.perks_next)}">${ICON.arrowRight}</button>
        </div>
      </div>
      <div class="ev-vehicle card reveal">
        <div class="ev-vehicle-grid">
          <div class="ev-vehicle-media">
            <img src="/images/vehicles.png" alt="${esc(t.ev_img_alt)}" loading="lazy" width="900" height="520">
            <span class="ev-vehicle-badge">${ICON.ev} ${esc(t.ev_badge)}</span>
          </div>
          <div class="ev-vehicle-copy">
            <h3 class="h3 ev-vehicle-title"><span class="ev-vehicle-title-ico">${ICON.leaf}</span>${esc(t.ev_title)}</h3>
            <p class="ev-vehicle-sub">${esc(t.ev_sub)}</p>
            <div class="ev-vehicle-rows">
              <div class="ev-vehicle-row">
                <span class="ev-vehicle-row-ico">${ICON.ev}</span>
                <div>
                  <div class="ev-vehicle-row-label">${esc(t.ev_row1_label)}</div>
                  <div class="ev-vehicle-row-desc">${esc(t.ev_row1_desc)}</div>
                </div>
              </div>
              <div class="ev-vehicle-row">
                <span class="ev-vehicle-row-ico">${ICON.ev}</span>
                <div>
                  <div class="ev-vehicle-row-label">${esc(t.ev_row2_label)}</div>
                  <div class="ev-vehicle-row-desc">${esc(t.ev_row2_desc)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ev-benefits-strip">${evBenefits}</div>
      </div>
    </div>
  </section>`;
}

export function renderVacancies(t, lang) {
  const rows = PHASE1_VACANCIES.map(r => {
    const pos = getPosition(VAC_ROLE_POSITION_ID[r.role]);
    const accent = pos ? pos.accent : 'var(--green-forest)';
    return `
    <tr>
      <td>
        <span class="vac-role">
          <span class="vac-role-ico" style="background:${accent}1F;color:${accent}">${ICON.users}</span>
          <b>${r.role}</b>
        </span>
      </td>
      <td>${esc(lang === 'hi' ? r.exam_hi : r.exam_en)}</td>
      <td class="vac-count"><b>${r.count}</b></td>
    </tr>`;
  }).join('');
  const total = PHASE1_VACANCIES.reduce((sum, r) => sum + r.count, 0);
  const divs = DIVISIONS.map(d => `<span class="vac-pill">${ICON.building}${esc(d)}</span>`).join('');
  const impact = t.vac_impact.map(x => `
    <div class="vac-impact-item">
      <span class="vac-impact-ico">${ICON[x.icon]}</span>
      <div>
        <div class="vac-impact-label">${esc(x.label)}</div>
        <div class="vac-impact-sub">${esc(x.sub)}</div>
      </div>
    </div>`).join('');
  return `
  <section id="vacancies" class="bg-paper">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.briefcase} Phase 1 Vacancies</span>
        <h2 class="h2">${esc(t.vac_title_pre)} <span class="accent">${esc(t.vac_title_accent)}</span> ${esc(t.vac_title_post)}</h2>
        <p>${esc(t.vac_sub)}</p>
        <div class="section-divider"><span>${ICON.leaf}</span></div>
      </div>
      <div class="tbl-wrap reveal vac-tbl-wrap">
        <table class="tbl vac-tbl">
          <thead>
            <tr>
              <th><span class="vac-th">${ICON.shield}${t.vac_th_post}</span></th>
              <th><span class="vac-th">${ICON.fileText}${t.vac_th_exam}</span></th>
              <th><span class="vac-th">${ICON.users}${t.vac_th_count}</span></th>
            </tr>
          </thead>
          <tbody>${rows}
            <tr class="vac-total"><td><b>${t.vac_total}</b></td><td></td><td class="vac-count"><b><span class="vac-total-pill">${total}</span></b></td></tr>
          </tbody>
        </table>
      </div>
      <div class="vac-note reveal"><span class="vac-note-ico">${ICON.pin}</span><span>${esc(t.vac_note)}</span></div>

      <h3 class="h3 vac-divisions-title"><span>${ICON.pin}</span>${esc(t.vac_divisions_title)}</h3>
      <div class="vac-divisions reveal">${divs}</div>

      <div class="vac-phases">
        <article class="card vac-phase-card reveal">
          <div class="vac-phase-dot"></div>
          <div class="vac-phase-kicker">${esc(t.vac_phase2_kicker)}</div>
          <h3 class="h3 vac-phase-title">${esc(t.vac_phase2_title)}</h3>
          <div class="vac-phase-body">
            <p class="vac-phase-line">
              <span class="vac-phase-pre">${esc(t.vac_phase2_pre)}</span>
              <span class="vac-phase-big">${esc(t.vac_phase2_big)}</span>
              <span class="vac-phase-post">${esc(t.vac_phase2_post)}</span>
            </p>
            <span class="vac-phase-ico">${ICON.seedling}</span>
          </div>
        </article>
        <article class="card vac-phase-card reveal">
          <div class="vac-phase-dot"></div>
          <div class="vac-phase-kicker">${esc(t.vac_phase3_kicker)}</div>
          <h3 class="h3 vac-phase-title">${esc(t.vac_phase3_title)}</h3>
          <div class="vac-phase-body">
            <p class="vac-phase-line">
              <span class="vac-phase-pre">${esc(t.vac_phase3_pre)}</span>
              <span class="vac-phase-big">${esc(t.vac_phase3_big)}</span>
              <span class="vac-phase-post">${esc(t.vac_phase3_post)}</span>
            </p>
            <span class="vac-phase-ico">${ICON.users}</span>
          </div>
        </article>
      </div>

      <div class="vac-impact-strip reveal">${impact}</div>
    </div>
  </section>`;
}

const EXAMS_VISIBLE_COUNT = 4;

export function renderExams(t, lang, showAll) {
  const visibleExams = showAll ? EXAMS : EXAMS.slice(0, EXAMS_VISIBLE_COUNT);
  const cards = visibleExams.map((e) => {
    const sections = e.sections.map(s => `<li>${esc(s)}</li>`).join('');
    const samples = e.samples.map((q, qi) => {
      if (q.descriptive) {
        return `<div class="sample-q"><div class="qt">Q${qi + 1}. ${esc(q.q)}</div><span class="desc-tag">${t.exam_descriptive}</span></div>`;
      }
      const opts = q.opts.map((o, oi) => `<li class="${oi === q.correct ? 'correct' : ''}">${esc(o)}</li>`).join('');
      return `<div class="sample-q"><div class="qt">Q${qi + 1}. ${esc(q.q)}</div><ul>${opts}</ul></div>`;
    }).join('');
    return `
    <article class="card exam-card reveal" id="exam-${e.id}">
      <div class="exam-head">
        <div><span class="eyebrow">${esc(lang === 'hi' ? e.for_hi : e.for_en)}</span></div>
        <span class="exam-fee">₹${e.fee}</span>
      </div>
      <h3 class="h3">${esc(lang === 'hi' ? e.name_hi : e.name_en)}</h3>
      <p class="exam-for">${t.exam_for}: ${esc(lang === 'hi' ? e.for_hi : e.for_en)}</p>
      <div class="exam-rows">
        <div class="exam-row"><span class="k">${t.exam_duration}</span><span class="v">${esc(lang === 'hi' ? e.duration_hi : e.duration_en)}</span></div>
        <div class="exam-row"><span class="k">${t.exam_questions}</span><span class="v">${esc(lang === 'hi' ? e.questions_hi : e.questions_en)}</span></div>
        <div class="exam-row"><span class="k">${t.exam_sections}</span><span class="v"><ul class="exam-sections">${sections}</ul></span></div>
        <div class="exam-row"><span class="k">${t.exam_negative}</span><span class="v">${esc(lang === 'hi' ? e.negative_hi : e.negative_en)}</span></div>
        <div class="exam-row"><span class="k">${t.exam_qualifying}</span><span class="v">${e.qualifying}</span></div>
      </div>
      <div class="samples">
        <button
          class="btn btn-ghost sample-toggle"
          type="button"
          data-sample-toggle="${e.id}"
          aria-controls="examSamplesModal"
          aria-haspopup="dialog"
        >${t.exam_samples} ${ICON.chev}</button>
        <div class="samples-source" id="samples-${e.id}" hidden>${samples}</div>
      </div>
    </article>`;
  }).join('');
  return `
  <section id="exams" class="bg-paper">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.cap} Exams</span>
        <h2 class="h2">${esc(t.exams_title)}</h2>
        <p>${esc(t.exams_sub)}</p>
      </div>
      <div class="exams-grid" id="examsGrid">${cards}</div>
      ${!showAll && EXAMS.length > EXAMS_VISIBLE_COUNT ? `
      <div class="rec-view-all">
        <a href="/exams" class="btn btn-outline">${t.exams_view_all} (${EXAMS.length})</a>
      </div>` : ''}
      <div class="card reveal" style="margin-top:22px">
        <h3 class="h3" style="margin-top:0;color:var(--green-forest)">${t.reschedule_title}</h3>
        <p style="margin:8px 0 0">• ${esc(t.reschedule_1)}</p>
        <p style="margin:6px 0 0">• ${esc(t.reschedule_2)}</p>
      </div>
    </div>
    <div class="km-modal" id="examSamplesModal" aria-hidden="true" role="dialog" aria-modal="true" aria-label="${esc(t.exam_samples)}">
      <div class="km-modal-panel" role="document">
        <button type="button" class="km-modal-close" data-modal-close aria-label="${esc(t.role_close)}">${ICON.x}</button>
        <div class="km-modal-head">
          <span class="eyebrow" id="examSamplesPill"></span>
          <div>
            <h3 class="km-modal-title" id="examSamplesTitle"></h3>
            <div class="km-modal-sub" id="examSamplesSub"></div>
          </div>
        </div>
        <div class="km-modal-body km-exam-samples-body" id="examSamplesBody"></div>
        <div class="km-modal-foot">
          <a href="#apply" class="btn btn-primary km-modal-apply" data-modal-apply>${t.nav_apply} ${ICON.arrowRight}</a>
        </div>
      </div>
    </div>
  </section>`;
}

export function renderSecurity(t, lang) {
  const items = SECURITY.map((s, i) => `
    <div class="sec-item reveal">
      <span class="sec-item-num">0${i + 1}</span>
      <div class="sec-ico-ring"><div class="ico">${ICON[s.icon] || ICON.shield}</div></div>
      <h4>${esc(lang === 'hi' ? s.title_hi : s.title_en)}</h4>
      <span class="sec-item-underline"></span>
      <p>${esc(lang === 'hi' ? s.desc_hi : s.desc_en)}</p>
    </div>`).join('');
  return `
  <section id="process" class="bg-green sec-section">
    <span class="sec-bg-dots" aria-hidden="true"></span>
    <span class="sec-bg-watermark" aria-hidden="true">${ICON.shield}</span>
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.shield} Security</span>
        <h2 class="h2" style="color:#fff">${esc(t.sec_title_pre)} <span class="accent sec-title-accent">${esc(t.sec_title_accent)}</span></h2>
        <p>${esc(t.sec_sub)}</p>
        <div class="section-divider sec-divider"><span>${ICON.shield}</span></div>
      </div>
      <div class="sec-grid">${items}</div>
      <div class="sec-trust-strip reveal">
        <span class="sec-trust-item">${ICON.check}${esc(t.sec_trust_1)}</span>
        <span class="sec-trust-item">${ICON.check}${esc(t.sec_trust_2)}</span>
      </div>
    </div>
  </section>`;
}

export function renderRoadmap(t, lang) {
  const steps = ROADMAP.map(s => `
    <div class="step reveal">
      <div class="step-top">
        <div class="step-num">${s.n}</div>
        <div class="step-ico">${ICON[s.icon] || ICON.badge}</div>
      </div>
      <div class="step-body">
        <h4>${esc(lang === 'hi' ? s.title_hi : s.title_en)}</h4>
        <p>${esc(lang === 'hi' ? s.desc_hi : s.desc_en)}</p>
      </div>
    </div>`).join('');
  return `
  <section>
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.pin} Roadmap</span>
        <h2 class="h2">${esc(t.roadmap_title)}</h2>
        <p>${esc(t.roadmap_sub)}</p>
      </div>
      <div class="roadmap-carousel">
        <button type="button" class="perks-nav roadmap-prev" id="roadmapPrev" aria-label="${esc(t.perks_prev)}">${ICON.arrowLeft}</button>
        <div class="roadmap-viewport" id="roadmapViewport">
          <div class="steps" id="roadmapTrack">${steps}</div>
        </div>
        <button type="button" class="perks-nav roadmap-next" id="roadmapNext" aria-label="${esc(t.perks_next)}">${ICON.arrowRight}</button>
      </div>
    </div>
  </section>`;
}

export function renderFarmers(t, lang) {
  const govt = FARMER_GOVT_CHIPS.map(s => `<span class="chip farmer-chip"><span class="chip-ico">${ICON[s.icon]}</span>${esc(s.name)}</span>`).join('');
  const member = MEMBER_BENEFITS.map(m => `<span class="chip farmer-chip"><span class="chip-ico">${ICON[m.icon]}</span>${esc(lang === 'hi' ? m.hi : m.en)}</span>`).join('');
  const impact = FARMER_IMPACT.map(x => `
    <div class="farmer-impact-item">
      <span class="farmer-impact-ico">${ICON[x.icon]}</span>
      <div class="farmer-impact-title">${esc(lang === 'hi' ? x.title_hi : x.title_en)}</div>
      <div class="farmer-impact-sub">${esc(lang === 'hi' ? x.sub_hi : x.sub_en)}</div>
    </div>`).join('');
  return `
  <section class="bg-paper farmers-section">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.seedling} For Farmers</span>
        <h2 class="h2">${esc(t.farmers_title_pre)} <span class="accent">${esc(t.farmers_title_accent)}</span> ${esc(t.farmers_title_post)}</h2>
        <div class="section-divider"><span>${ICON.leaf}</span></div>
      </div>
      <div class="farmers-grid">
        <div class="card farmer-col farmer-col-govt reveal">
          <div class="farmer-col-head">
            <span class="farmer-col-ico">${ICON.building}</span>
            <div>
              <h3 class="h3">${esc(t.farmers_govt)}</h3>
              <p class="farmer-col-sub">${esc(t.farmers_govt_sub)}</p>
            </div>
          </div>
          <div class="chip-list farmer-chip-list">${govt}</div>
        </div>
        <div class="card farmer-col farmer-col-member reveal">
          <div class="farmer-col-head">
            <span class="farmer-col-ico">${ICON.shield}</span>
            <div>
              <h3 class="h3">${esc(t.farmers_member)}</h3>
              <p class="farmer-col-sub">${esc(t.farmers_member_sub)}</p>
            </div>
          </div>
          <div class="chip-list farmer-chip-list">${member}</div>
        </div>
      </div>
      <div class="farmer-bridge reveal">
        <div class="farmer-bridge-main">
          <span class="farmer-bridge-ico">${ICON.users}</span>
          <p class="farmer-line">${esc(t.farmers_line_pre)} <span class="accent">${esc(t.farmers_line_accent)}</span>${t.farmers_line_post ? ' ' + esc(t.farmers_line_post) : ''}</p>
        </div>
        <div class="farmer-impact-strip">${impact}</div>
      </div>
    </div>
  </section>`;
}

export function renderSchemes(t, lang) {
  const cards = SCHEMES.map(s => `
    <article class="card scheme-card reveal">
      <span class="scheme-card-chevron">${ICON.chevronRight}</span>
      <div class="ico">${ICON[s.icon] || ICON.seedling}</div>
      <h4>${esc(s.name)}</h4>
      ${s.sub ? `<div class="ssub">${esc(s.sub)}</div>` : ''}
      <div class="scheme-card-divider"><span>${ICON.leaf}</span></div>
      <div class="sline"><span class="lbl">${ICON.users}${t.scheme_benefit}</span><div class="sval">${esc(lang === 'hi' ? s.benefit_hi : s.benefit_en)}</div></div>
      <div class="sline"><span class="lbl">${ICON.shield}${t.scheme_role}</span><div class="sval">${esc(lang === 'hi' ? s.role_hi : s.role_en)}</div></div>
    </article>`).join('');
  const trust = SCHEME_TRUST.map(x => `
    <div class="scheme-trust-item reveal">
      <span class="scheme-trust-ico">${ICON[x.icon]}</span>
      <div>
        <div class="scheme-trust-title">${esc(lang === 'hi' ? x.title_hi : x.title_en)}</div>
        <div class="scheme-trust-sub">${esc(lang === 'hi' ? x.sub_hi : x.sub_en)}</div>
      </div>
    </div>`).join('');
  return `
  <section id="schemes">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.shield} Government Schemes</span>
        <div class="schemes-title-wrap">
          <span class="schemes-title-leaf schemes-title-leaf-l" aria-hidden="true">${ICON.leaf}</span>
          <h2 class="h2">${esc(t.schemes_title_pre)} <span class="accent">${esc(t.schemes_title_accent)}</span> ${esc(t.schemes_title_post)}</h2>
          <span class="schemes-title-leaf schemes-title-leaf-r" aria-hidden="true">${ICON.leaf}</span>
        </div>
        <p>${esc(t.schemes_sub)}</p>
      </div>
      <div class="schemes-grid">${cards}</div>
      <div class="scheme-trust-row">${trust}</div>
      <div class="identity-box reveal">${esc(t.identity_text)}</div>
    </div>
  </section>`;
}

export function renderPartnerships(t) {
  const slot = (n) => `
    <div class="partner-ph reveal">
      <span class="partner-ph-ico">${ICON.badge}</span>
      <span class="partner-ph-num">${t.partner_slot} 0${n}</span>
      <p class="partner-ph-text">${esc(t.partner_placeholder)}</p>
    </div>`;
  return `
  <section class="bg-paper partnerships-section">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.badge} Partnerships</span>
        <h2 class="h2">${esc(t.partner_title)}</h2>
        <p>${esc(t.partner_sub)}</p>
      </div>
      <div class="partner-grid">${slot(1)}${slot(2)}</div>
    </div>
  </section>`;
}

export function renderTraining(t, lang) {
  const ICO = [ICON.badge, ICON.seedling, ICON.shield, ICON.credit, ICON.scan, ICON.check, ICON.pin, ICON.cap];
  const cards = TRAINING.map((w, i) => `
    <div class="train-card reveal">
      <div class="train-ico">${ICO[i] || ICON.badge}</div>
      <div class="wk">${w.wk}</div>
      <h4>${esc(lang === 'hi' ? w.title_hi : w.title_en)}</h4>
      <p>${esc(w.desc)}</p>
    </div>`).join('');
  return `
  <section class="train-section">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.cap} Training</span>
        <h2 class="h2">${esc(t.training_title)}</h2>
        <p>${esc(t.training_sub)}</p>
      </div>
      <div class="train-photos">
        <figure class="train-photo card reveal">
          <img src="/images/training-class.webp" alt="${esc(t.training_img_alt)}" loading="lazy" width="1400" height="800">
          <figcaption class="train-cap">${ICON.home} Residential · hostel + khana</figcaption>
        </figure>
        <figure class="train-photo card reveal">
          <img src="/images/training-field.webp" alt="${esc(t.training_img_alt)}" loading="lazy" width="1400" height="800">
          <figcaption class="train-cap">${ICON.seedling} Field practicum</figcaption>
        </figure>
      </div>
      <div class="train-grid">${cards}</div>
      <p class="train-foot reveal"><span class="train-foot-ico">${ICON.pin}</span>${esc(t.training_partners)}</p>
    </div>
  </section>`;
}

export function renderInterview(t, lang) {
  const questions = lang === 'hi' ? t.int_qs_hi : t.int_qs_en;
  const qs = questions.map((q, i) => `
    <li class="int-q-item">
      <span class="int-q-num">0${i + 1}</span>
      <span class="int-q-text">${esc(q)}</span>
      <span class="int-q-ico">${ICON[INTERVIEW_Q_ICONS[i]] || ICON.seedling}</span>
    </li>`).join('');
  const mediaBadges = INTERVIEW_MEDIA_BADGES.map(b => `
    <span class="int-media-badge"><span>${ICON[b.icon]}</span>${esc(lang === 'hi' ? b.label_hi : b.label_en)}</span>`).join('');
  const points = INTERVIEW_POINTS.map(p => `
    <div class="int-point">
      <span class="int-point-ico">${ICON[p.icon]}</span>
      <div>
        <div class="int-point-title">${esc(lang === 'hi' ? p.title_hi : p.title_en)}</div>
        <p class="int-point-desc">${esc(lang === 'hi' ? p.desc_hi : p.desc_en)}</p>
      </div>
    </div>`).join('');
  const panelStats = (composition, duration, examWeight, intWeight) => `
    <div class="int-panel-stats">
      <div class="int-panel-stat"><span>${ICON.users}</span><div><span class="k">${t.int_th_panel}</span><span class="v">${esc(composition)}</span></div></div>
      <div class="int-panel-stat"><span>${ICON.clock}</span><div><span class="k">${t.int_th_duration}</span><span class="v">${esc(duration)}</span></div></div>
      <div class="int-panel-stat"><span>${ICON.pieChart}</span><div><span class="k">${t.int_th_weightage}</span><span class="v">Exam ${esc(examWeight)}</span></div></div>
      <div class="int-panel-stat"><span>${ICON.users}</span><div><span class="k">${t.int_th_interview}</span><span class="v">${esc(intWeight)}</span></div></div>
    </div>`;
  const panelCards = INTERVIEW_PANELS.map(p => {
    const dept = getDepartment(p.deptId);
    const accent = dept ? dept.accent : 'var(--green-forest)';
    return `
    <div class="card int-panel reveal" style="--v-accent:${accent}">
      <div class="int-panel-head">
        <span class="int-panel-ico" style="background:${accent}1F;color:${accent}">${ICON.users}</span>
        <div>
          <div class="int-tag"><span class="int-pill" style="background:${accent}1F;color:${accent}">${esc(lang === 'hi' ? p.badge_hi : p.badge_en)}</span></div>
          <h3 class="h3" style="color:${accent}">${esc(t.int_panel_card_title)}</h3>
        </div>
      </div>
      ${panelStats(
        lang === 'hi' ? p.composition_hi : p.composition_en,
        lang === 'hi' ? p.duration_hi : p.duration_en,
        p.examWeight, p.intWeight
      )}
    </div>`;
  }).join('');
  return `
  <section id="interview">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.check} 11 · INTERVIEW</span>
        <h2 class="h2">${esc(t.int_title_pre)} <span class="accent">${esc(t.int_title_accent)}</span> ${esc(t.int_title_post)}</h2>
        <div class="section-divider"><span>${ICON.leaf}</span></div>
      </div>
      <div class="int-grid">
        <div class="int-top-grid">
          <div class="int-media card reveal">
            <img src="/images/interview-panel.webp" alt="${esc(t.int_img_alt)}" loading="lazy" width="1200" height="800">
            <div class="int-media-badges">${mediaBadges}</div>
          </div>
          <div class="int-copy reveal">
            <h3 class="h3 int-copy-title">${esc(t.int_copy_title)}</h3>
            <p class="int-sub">${esc(t.int_sub)}</p>
            <div class="int-points">${points}</div>
          </div>
        </div>
        <div class="int-panels-carousel">
          <button type="button" class="perks-nav int-panels-prev" id="intPanelsPrev" aria-label="${esc(t.perks_prev)}">${ICON.arrowLeft}</button>
          <div class="int-panels-viewport" id="intPanelsViewport">
            <div class="int-panels-track" id="intPanelsTrack">${panelCards}</div>
          </div>
          <button type="button" class="perks-nav int-panels-next" id="intPanelsNext" aria-label="${esc(t.perks_next)}">${ICON.arrowRight}</button>
        </div>
        <div class="card int-samples reveal">
          <div class="int-samples-head">
            <span class="int-samples-ico">${ICON.fileText}</span>
            <h3 class="h3" style="margin:0">${esc(t.int_samples_title)}</h3>
          </div>
          <ul class="int-q">${qs}</ul>
        </div>
      </div>
    </div>
  </section>`;
}

export function renderPrep(t, lang) {
  const prepCard = (n, icon, title, bullets, footerIco, footer) => `
    <div class="card prep-card prep-card-${n} reveal">
      <div class="prep-ico">${ICON[icon]}</div>
      <h3 class="h3">${esc(title)}</h3>
      <span class="prep-title-underline"></span>
      <ul class="prep-bullets">${bullets.map(b => `<li><span>${ICON.check}</span>${esc(b)}</li>`).join('')}</ul>
      <div class="prep-footer"><span>${ICON[footerIco]}</span>${esc(footer)}</div>
    </div>`;
  const benefits = PREP_BENEFITS.map(b => `
    <span class="prep-benefit"><span class="prep-benefit-ico">${ICON[b.icon]}</span>${esc(lang === 'hi' ? b.label_hi : b.label_en)}</span>`).join('');
  return `
  <section id="prep" class="bg-paper">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.cap} 13 · TAIYARI</span>
        <h2 class="h2">${esc(t.prep_title_pre)} <span class="accent">${esc(t.prep_title_accent)}</span> ${esc(t.prep_title_post)}</h2>
        <p>${esc(t.prep_head_sub)}</p>
      </div>

      <div class="prep-cards">
        ${prepCard(1, 'cap', t.prep_card1_t, t.prep_card1_bullets, 'globe', t.prep_card1_footer)}
        ${prepCard(2, 'badge', t.prep_card2_t, t.prep_card2_bullets, 'building', t.prep_card2_footer)}
        ${prepCard(3, 'fileText', t.prep_card3_t, t.prep_card3_bullets, 'fileText', t.prep_card3_footer)}
      </div>

      <div class="prep-grid">
        <div class="card prep-img reveal">
          <img src="/images/taiyari-study.webp" alt="${esc(t.prep_img_alt)}" loading="lazy" width="1200" height="800">
        </div>
        <div class="prep-copy card reveal">
          <div class="prep-goal">
            <span class="prep-goal-ico">${ICON.target}</span>
            <p class="prep-sub">${esc(t.prep_sub)}</p>
          </div>
          <a class="btn btn-saffron prep-cta" href="#apply">${ICON.fileText}${esc(t.prep_cta)} ${ICON.arrowRight}</a>
          <div class="prep-benefits">${benefits}</div>
          <div class="prep-note"><span>${ICON.info}</span>${esc(t.prep_note)}</div>
        </div>
      </div>
    </div>
  </section>`;
}

export function renderEligibility(t) {
  const cards = [
    { t: t.elig_gs_t, d: t.elig_gs_d, icon: 'cap', accent: 'green' },
    { t: t.elig_ka_t, d: t.elig_ka_d, icon: 'award', accent: 'gold' },
    { t: t.elig_res_t, d: t.elig_res_d, icon: 'credit', accent: 'gold' },
    { t: t.elig_local_t, d: t.elig_local_d, icon: 'pin', accent: 'green' },
  ].map(c => `
    <div class="card elig-card elig-card-${c.accent} reveal">
      <span class="elig-card-ico">${ICON[c.icon]}</span>
      <h4>${esc(c.t)}</h4>
      <p>${esc(c.d)}</p>
    </div>`).join('');
  const dates = t.dates.map(d => `
    <li>
      <span class="dates-label"><span class="dates-ico">${ICON.calendar}</span>${esc(d[0])}</span>
      <span class="d">${esc(d[1])}</span>
    </li>`).join('');
  return `
  <section class="bg-paper eligibility-section">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.check} Eligibility</span>
        <h2 class="h2">${esc(t.elig_title_pre)} <span class="accent">${esc(t.elig_title_accent)}</span></h2>
        <p>${esc(t.elig_sub)}</p>
        <div class="section-divider"><span>${ICON.leaf}</span></div>
      </div>
      <div class="elig-grid">${cards}</div>
      <div class="card reveal dates-card" style="margin-top:18px">
        <h3 class="h3 dates-title"><span>${ICON.calendar}</span>${t.dates_title}</h3>
        <ul class="dates-list">${dates}</ul>
      </div>
    </div>
  </section>`;
}

export function renderFAQ(t, lang) {
  const items = FAQ.map((f, i) => `
    <div class="faq-item reveal" data-faq="${i}">
      <button class="faq-q" data-faq-toggle="${i}">
        <span>${esc(lang === 'hi' ? f.q_hi : f.q_en)}</span>
        <span class="chev">${ICON.chev}</span>
      </button>
      <div class="faq-a" id="faq-a-${i}"><div class="faq-a-inner">${esc(lang === 'hi' ? f.a_hi : f.a_en)}</div></div>
    </div>`).join('');
  return `
  <section id="faq">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.badge} FAQ</span>
        <h2 class="h2">${esc(t.faq_title)}</h2>
        <p>${esc(t.faq_sub)}</p>
      </div>
      <div class="faq-list">${items}</div>
    </div>
  </section>`;
}

export function renderFooter(t, lang, basePath) {
  const b = basePath || '';
  const aboutStats = FOOTER_ABOUT_STATS.map(s => `
    <div class="footer-stat"><span>${ICON[s.icon]}</span>${esc(lang === 'hi' ? s.label_hi : s.label_en)}</div>`).join('');
  const links = FOOTER_QUICK_LINKS.map(l => `
    <li><a href="${l.href.startsWith('#') ? b + l.href : l.href}"><span>${ICON.chevronRight}</span>${esc(lang === 'hi' ? l.label_hi : l.label_en)}</a></li>`).join('');
  const districts = MAHARASHTRA_DISTRICTS.map(d => `<span class="district-pill">${esc(d)}</span>`).join('');
  const social = FOOTER_SOCIAL.map(s => `
    <a class="social-ico" href="#" aria-label="${esc(s.label)}">${ICON[s.icon]}</a>`).join('');
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="footer-col-head">
            <span class="footer-col-ico">${ICON.leaf}</span>
            <h4>${esc(t.footer_about_title)}</h4>
          </div>
          <span class="footer-underline"></span>
          <p>${esc(t.footer_legal)}</p>
          <p class="footer-tagline">${esc(t.footer_about_tagline)}</p>
          <div class="footer-stats">${aboutStats}</div>
        </div>
        <div class="footer-col">
          <div class="footer-col-head">
            <span class="footer-col-ico">${ICON.compass}</span>
            <h4>${esc(t.footer_links_title)}</h4>
          </div>
          <span class="footer-underline"></span>
          <ul class="footer-links">${links}</ul>
        </div>
        <div class="footer-col">
          <div class="footer-col-head">
            <span class="footer-col-ico">${ICON.pin}</span>
            <h4>${esc(t.footer_districts_title)}</h4>
          </div>
          <span class="footer-underline"></span>
          <div class="footer-districts">${districts}</div>
          <a href="${b}#vacancies" class="footer-all-districts">${esc(t.footer_all_districts)} <span>${ICON.chevronRight}</span></a>
        </div>
      </div>

      <div class="footer-newsletter" id="footerNewsletter">
        <div class="footer-newsletter-copy">
          <span class="footer-newsletter-ico">${ICON.fileText}</span>
          <div>
            <h4>${esc(t.footer_newsletter_title)}</h4>
            <p>${esc(t.footer_newsletter_desc)}</p>
          </div>
        </div>
        <form class="footer-newsletter-form" id="newsletterForm">
          <input type="email" required placeholder="${esc(t.footer_newsletter_placeholder)}" aria-label="${esc(t.footer_newsletter_placeholder)}">
          <button type="submit" class="btn btn-saffron">${esc(t.footer_newsletter_btn)} ${ICON.chevronRight}</button>
        </form>
        <div class="footer-social">
          <span class="footer-social-title">${esc(t.footer_social_title)}</span>
          <div class="footer-social-icons">${social}</div>
        </div>
        <p class="footer-newsletter-thanks" id="newsletterThanks" hidden>${esc(t.footer_newsletter_thanks)}</p>
      </div>

      <div class="footer-legal">© 2026 Kisan Mitra Ecosystem · Argus / RKF Strategic Initiative · ${esc(t.footer_legal)}</div>
    </div>
  </footer>`;
}
