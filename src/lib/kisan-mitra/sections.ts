// @ts-nocheck
// ============================================================
// SECTION RENDERERS — return HTML strings for each section
// ============================================================
import { ICON } from './icons';
import { DIVISIONS, STATS, ROLES, SALARY_TABLE, EXAMS, ROADMAP, TRAINING, SCHEMES, MEMBER_BENEFITS, FAQ, SECURITY } from './data';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const SALARY_PERK_ICONS = [ICON.badge, ICON.scan, ICON.home, ICON.rupee, ICON.briefcase, ICON.shield];

export function renderNav(t) {
  return `
  <nav class="nav" id="nav">
    <div class="container nav-inner">
      <a href="#top" class="brand">
        <span class="leaf">${ICON.leaf}</span> Kisan Mitra
      </a>
      <div class="nav-links">
        <a href="#roles">${t.nav_roles}</a>
        <a href="#exams">${t.nav_exams}</a>
        <a href="#process">${t.nav_process}</a>
        <a href="#schemes">${t.nav_schemes}</a>
        <a href="#faq">${t.nav_faq}</a>
      </div>
      <div class="nav-actions">
        <div class="lang-toggle" id="langToggle">
          <button type="button" data-lang="hi">हिंदी</button>
          <button type="button" data-lang="en">EN</button>
        </div>
        <a href="#apply" class="btn btn-primary nav-apply-btn" style="min-height:44px;padding:11px 20px;font-size:15px">${t.nav_apply}</a>
        <button class="hamburger" id="hamburger" aria-label="Menu">${ICON.menu}</button>
      </div>
    </div>
  </nav>
  <div class="drawer" id="drawer">
    <div class="drawer-head">
      <a href="#top" class="brand"><span class="leaf">${ICON.leaf}</span> Kisan Mitra</a>
      <button class="hamburger" id="drawerClose" aria-label="Close">${ICON.x}</button>
    </div>
    <div class="drawer-links">
      <a href="#roles">${t.nav_roles}</a>
      <a href="#exams">${t.nav_exams}</a>
      <a href="#process">${t.nav_process}</a>
      <a href="#schemes">${t.nav_schemes}</a>
      <a href="#faq">${t.nav_faq}</a>
      <div class="lang-toggle lang-toggle-drawer" id="langToggleDrawer">
        <button type="button" data-lang="hi">हिंदी</button>
        <button type="button" data-lang="en">EN</button>
      </div>
      <a href="#apply" class="btn btn-primary drawer-apply-btn">${t.nav_apply}</a>
    </div>
  </div>`;
}

export function renderHero(t) {
  const stats = STATS.map(s => `
    <div class="stat">
      <div class="num" ${s.display ? '' : `data-count="${s.value}"`}>${s.display || '0'}</div>
      <div class="lbl">${esc(s.label_hi)}</div>
    </div>`).join('');
  return `
  <header class="hero" id="top">
    <div class="container">
      <div class="hero-grid">
        <div class="reveal">
          <span class="eyebrow">${t.hero_eyebrow}</span>
          <h1 class="h1">${esc(t.hero_h1)}</h1>
          <p class="hero-sub">${esc(t.hero_sub)}</p>
          <div class="hero-ctas">
            <a href="#apply" class="btn btn-primary">${t.hero_cta1} ${ICON.arrowRight}</a>
            <a href="#exams" class="btn btn-outline">${t.hero_cta2}</a>
          </div>
          <div class="hero-tagline devanagari-head">${t.hero_tagline}</div>
        </div>
        <div class="hero-img reveal">
          <img src="/images/teamPhoto.png" alt="Kisan Mitra Ecosystem team — VLE, VLM, DLO, TLO, CSE officers" loading="eager" width="640" height="512">
        </div>
      </div>
      <div class="stats">${stats}</div>
    </div>
  </header>`;
}

export function renderMission(t, lang) {
  const chips = (lang === 'hi' ? t.mission_chips_hi : t.mission_chips_en)
    .map(([ico, label]) => `<span class="chip"><span class="chip-ico">${ico}</span>${esc(label)}</span>`)
    .join('');

  return `
  <section class="mission" id="mission">
    <div class="container">
      <div class="mission-grid">
        <div class="mission-copy reveal">
          <div class="mission-kicker">${esc(t.mission_kicker)}</div>
          <h2 class="h2">${esc(t.mission_title)}</h2>
          <p class="mission-sub">${esc(t.mission_sub)}</p>
          <div class="mission-body">
            <p>${esc(t.mission_p1)}</p>
            <p>${esc(t.mission_p2)}</p>
          </div>
          <div class="mission-chips reveal">${chips}</div>
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
    { ico: ICON.badge, t: t.why_1_t, d: t.why_1_d },
    { ico: ICON.ev, t: t.why_2_t, d: t.why_2_d },
    { ico: ICON.rupee, t: t.why_3_t, d: t.why_3_d },
  ].map(c => `
    <div class="card why-card reveal">
      <div class="ico">${c.ico}</div>
      <h3 class="h3">${esc(c.t)}</h3>
      <p>${esc(c.d)}</p>
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

export function renderRoles(t, lang) {
  const cards = ROLES.map((r, i) => {
    const duties = (lang === 'hi' ? r.duties_hi : r.duties_en).map(d => `<li>${esc(d)}</li>`).join('');
    const title = lang === 'hi' ? r.title_hi : r.title_en;
    const cardSummary = lang === 'hi' ? r.card_hi : r.card_en;
    const who = lang === 'hi' ? r.who_hi : r.who_en;
    const reports = lang === 'hi' ? r.reports_hi : r.reports_en;
    const coverage = lang === 'hi' ? r.coverage_hi : r.coverage_en;
    const exam = lang === 'hi' ? r.exam_hi : r.exam_en;
    const uniform = lang === 'hi' ? r.uniform_hi : r.uniform_en;

    return `
    <article class="card role-card reveal">
      <div class="role-cover">
        <img src="${encodeURI(r.img)}" alt="${r.code} officer" loading="lazy" width="800" height="450">
      </div>
      <div class="role-body">
        <span class="role-pill" style="background:${r.accent}">${r.code}</span>
        <h3 class="role-title">${esc(title)}</h3>
        <p class="role-card-summary">${esc(cardSummary)}</p>

        <div class="role-expand" id="roleExp${i}">
          <p class="role-who">${esc(who)}</p>
          <div class="role-meta">
            <div><span class="k">${t.role_reports}</span><span class="v">${esc(reports)}</span></div>
            <div><span class="k">${t.role_coverage}</span><span class="v">${esc(coverage)}</span></div>
            <div><span class="k">${t.role_exam}</span><span class="v">${esc(exam)}</span></div>
            <div><span class="k">${t.role_uniform}</span><span class="v role-uniform">${esc(uniform)}</span></div>
          </div>
          <div class="role-salary">
            <div><span class="k">${t.role_training}</span><span class="v">${r.train}</span></div>
            <div><span class="k">${t.role_full}</span><span class="v">${r.full}</span></div>
          </div>
          <strong class="role-duties-title">${t.role_duties}</strong>
          <ul class="role-duties">${duties}</ul>
        </div>

        <div class="role-foot">
          <span class="role-posts">${t.role_posts}: <b>${r.count}</b></span>
          <button
            class="role-toggle"
            type="button"
            data-role-toggle="${i}"
            aria-controls="roleModal"
            aria-haspopup="dialog"
            aria-expanded="false"
          >
            <span class="rtxt">${t.role_details}</span>
            <span class="ricon">${ICON.chev}</span>
          </button>
        </div>
      </div>
    </article>`;
  }).join('');
  return `
  <section id="roles" class="bg-paper">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.briefcase} 04 · POSTS</span>
        <h2 class="h2">${esc(t.roles_title)}</h2>
        <p>${esc(t.roles_sub)}</p>
      </div>
      <div class="roles-grid">${cards}</div>
    </div>
    <div class="km-modal" id="roleModal" aria-hidden="true" role="dialog" aria-modal="true" aria-label="${esc(t.role_details)}">
      <div class="km-modal-panel" role="document">
        <button type="button" class="km-modal-close" data-modal-close aria-label="${esc(t.role_close)}">${ICON.x}</button>
        <div class="km-modal-head">
          <span class="role-pill" id="roleModalPill"></span>
          <div>
            <h3 class="km-modal-title" id="roleModalTitle"></h3>
            <div class="km-modal-sub" id="roleModalSub"></div>
          </div>
        </div>
        <div class="km-modal-body" id="roleModalBody"></div>
        <div class="km-modal-foot">
          <a href="#apply" class="btn btn-primary km-modal-apply" data-modal-apply>${t.nav_apply} ${ICON.arrowRight}</a>
        </div>
      </div>
    </div>
  </section>`;
}

export function renderHierarchy(t) {
  return `
  <section class="bg-paper">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.briefcase} Hierarchy</span>
        <h2 class="h2">${esc(t.hier_title)}</h2>
        <p>${esc(t.hier_sub)}</p>
      </div>
      <div class="hier reveal">
        <div class="hier-node hq">${esc(t.hier_hq)}</div>
        <div class="hier-arrow"></div>
        <div class="hier-node">DLO ×12<span class="sub">Division Level Officer</span></div>
        <div class="hier-arrow"></div>
        <div class="hier-node">TLO ×40<span class="sub">Tehsil Leader Officer</span></div>
        <div class="hier-arrow"></div>
        <div class="hier-row">
          <div class="hier-node">VLM ×200<span class="sub">Village Level Manager</span></div>
          <div class="hier-node">VLE ×200<span class="sub">Village Level Executive</span></div>
        </div>
        <div class="hier-arrow"></div>
        <div class="hier-node" style="background:var(--green-soft)">${esc(t.hier_villages)}</div>
      </div>
    </div>
  </section>`;
}

export function renderSalary(t) {
  const rows = SALARY_TABLE.map(r => `
    <tr><td><b>${r.role}</b></td><td>${r.reports}</td><td>${r.train}</td><td><b style="color:var(--green-forest)">${r.full}</b></td><td>${r.count}</td></tr>`).join('');
  const perks = t.salary_perks.map((p, i) => `
    <article class="card perk-card reveal">
      <div class="perk-ico">${SALARY_PERK_ICONS[i]}</div>
      <h3 class="h3 perk-title">${esc(p.title)}</h3>
      <p class="perk-desc">${esc(p.desc)}</p>
    </article>`).join('');
  return `
  <section id="salary">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.rupee} Salary & Career</span>
        <h2 class="h2">${esc(t.salary_title)}</h2>
        <p>${esc(t.salary_sub)}</p>
      </div>
      <div class="tbl-wrap reveal">
        <table class="tbl">
          <thead><tr><th>${t.salary_th_role}</th><th>${t.salary_th_reports}</th><th>${t.salary_th_train}</th><th>${t.salary_th_full}</th><th>${t.salary_th_count}</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
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
          </div>
          <div class="ev-vehicle-copy">
            <h3 class="h3 ev-vehicle-title">${esc(t.ev_title)}</h3>
            <p class="ev-vehicle-sub">${esc(t.ev_sub)}</p>
            <div class="ev-vehicle-chips">
              <span class="chip"><span class="chip-ico">${ICON.ev}</span>${esc(t.ev_chip_vle)}</span>
              <span class="chip"><span class="chip-ico">${ICON.ev}</span>${esc(t.ev_chip_tlo)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

export function renderVacancies(t, lang) {
  const rows = ROLES.map(r => `
    <tr>
      <td><b>${r.code}</b></td>
      <td>${esc(lang === 'hi' ? r.exam_hi : r.exam_en)}</td>
      <td class="vac-count"><b>${r.count}</b></td>
    </tr>`).join('');
  const total = ROLES.reduce((sum, r) => sum + r.count, 0);
  const divs = DIVISIONS.map(d => `<span class="vac-pill">${esc(d.replace(' (Faizabad)', ''))}</span>`).join('');
  return `
  <section id="vacancies" class="bg-paper">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.briefcase} 05 · VACANCIES</span>
        <h2 class="h2">${esc(t.vac_title)}</h2>
      </div>
      <div class="tbl-wrap reveal vac-tbl-wrap">
        <table class="tbl vac-tbl">
          <thead><tr><th>${t.vac_th_post}</th><th>${t.vac_th_exam}</th><th>${t.vac_th_count}</th></tr></thead>
          <tbody>${rows}
            <tr class="vac-total"><td><b>${t.vac_total}</b></td><td></td><td class="vac-count"><b>${total}</b></td></tr>
          </tbody>
        </table>
      </div>
      <p class="vac-note reveal"><span class="vac-note-ico">${ICON.pin}</span><span>${esc(t.vac_note)}</span></p>
      <div class="vac-divisions reveal">${divs}</div>
      <div class="vac-phases">
        <article class="card vac-phase-card reveal">
          <div class="vac-phase-dot"></div>
          <div class="vac-phase-kicker">${esc(t.vac_phase2_kicker)}</div>
          <h3 class="h3 vac-phase-title">${esc(t.vac_phase2_title)}</h3>
          <p class="vac-phase-line">
            <span class="vac-phase-pre">${esc(t.vac_phase2_pre)}</span>
            <span class="vac-phase-big">${esc(t.vac_phase2_big)}</span>
            <span class="vac-phase-post">${esc(t.vac_phase2_post)}</span>
          </p>
        </article>
        <article class="card vac-phase-card reveal">
          <div class="vac-phase-dot"></div>
          <div class="vac-phase-kicker">${esc(t.vac_phase3_kicker)}</div>
          <h3 class="h3 vac-phase-title">${esc(t.vac_phase3_title)}</h3>
          <p class="vac-phase-line">
            <span class="vac-phase-pre">${esc(t.vac_phase3_pre)}</span>
            <span class="vac-phase-big">${esc(t.vac_phase3_big)}</span>
            <span class="vac-phase-post">${esc(t.vac_phase3_post)}</span>
          </p>
        </article>
      </div>
    </div>
  </section>`;
}

export function renderExams(t, lang) {
  const cards = EXAMS.map(e => {
    const sections = e.sections.map(s => `<li>${esc(s)}</li>`).join('');
    const samples = e.samples.map((q, qi) => {
      if (q.descriptive) {
        return `<div class="sample-q"><div class="qt">Q${qi + 1}. ${esc(q.q)}</div><span class="desc-tag">${t.exam_descriptive}</span></div>`;
      }
      const opts = q.opts.map((o, oi) => `<li class="${oi === q.correct ? 'correct' : ''}">${esc(o)}</li>`).join('');
      return `<div class="sample-q"><div class="qt">Q${qi + 1}. ${esc(q.q)}</div><ul>${opts}</ul></div>`;
    }).join('');
    return `
    <article class="card exam-card reveal">
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
      <div class="exams-grid">${cards}</div>
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
  const items = SECURITY.map(s => `
    <div class="sec-item reveal">
      <div class="ico">${ICON[s.icon] || ICON.shield}</div>
      <h4>${esc(lang === 'hi' ? s.title_hi : s.title_en)}</h4>
      <p>${esc(lang === 'hi' ? s.desc_hi : s.desc_en)}</p>
    </div>`).join('');
  return `
  <section id="process" class="bg-green">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.lock} Security</span>
        <h2 class="h2" style="color:#fff">${esc(t.sec_title)}</h2>
        <p>${esc(t.sec_sub)}</p>
      </div>
      <div class="sec-grid">${items}</div>
    </div>
  </section>`;
}

export function renderRoadmap(t, lang) {
  const steps = ROADMAP.map(s => `
    <div class="step reveal">
      <div class="step-num">${s.n}</div>
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
      <div class="steps">${steps}</div>
    </div>
  </section>`;
}

export function renderFarmers(t, lang) {
  const govt = ['PM-KISAN', 'PMFBY', 'KCC', 'PM-KUSUM', 'Soil Health Card', 'MGNREGA', 'PMAY-G', 'e-NAM', 'ODOP'].map(s => `<span class="chip">${s}</span>`).join('');
  const member = MEMBER_BENEFITS.map(m => `<span class="chip">${esc(lang === 'hi' ? m.hi : m.en)}</span>`).join('');
  return `
  <section class="bg-paper">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.seedling} For Farmers</span>
        <h2 class="h2">${esc(t.farmers_title)}</h2>
      </div>
      <div class="farmers-grid">
        <div class="card farmer-col reveal">
          <h3 class="h3">${esc(t.farmers_govt)}</h3>
          <div class="chip-list">${govt}</div>
        </div>
        <div class="card farmer-col reveal">
          <h3 class="h3">${esc(t.farmers_member)}</h3>
          <div class="chip-list">${member}</div>
        </div>
      </div>
      <p class="farmer-line reveal">${esc(t.farmers_line)}</p>
    </div>
  </section>`;
}

export function renderSchemes(t, lang) {
  const cards = SCHEMES.map(s => `
    <article class="card scheme-card reveal">
      <div class="ico">${ICON[s.icon] || ICON.seedling}</div>
      <h4>${esc(s.name)}</h4>
      ${s.sub ? `<div class="ssub">${esc(s.sub)}</div>` : ''}
      <div class="sline"><span class="lbl">${t.scheme_benefit}</span>${esc(lang === 'hi' ? s.benefit_hi : s.benefit_en)}</div>
      <div class="sline"><span class="lbl">${t.scheme_role}</span>${esc(lang === 'hi' ? s.role_hi : s.role_en)}</div>
    </article>`).join('');
  return `
  <section id="schemes">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.shield} Government Schemes</span>
        <h2 class="h2">${esc(t.schemes_title)}</h2>
        <p>${esc(t.schemes_sub)}</p>
      </div>
      <div class="schemes-grid">${cards}</div>
      <div class="identity-box reveal">${esc(t.identity_text)}</div>
    </div>
  </section>`;
}

export function renderPartnerships(t) {
  return `
  <section class="bg-paper">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.badge} Partnerships</span>
        <h2 class="h2">${esc(t.partner_title)}</h2>
        <p>${esc(t.partner_sub)}</p>
      </div>
      <div class="partner-grid">
        <div class="partner-ph reveal">[ ${esc(t.partner_placeholder)} 1 ]</div>
        <div class="partner-ph reveal">[ ${esc(t.partner_placeholder)} 2 ]</div>
      </div>
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
  const qs = (lang === 'hi' ? t.int_qs_hi : t.int_qs_en)
    .map(q => `<li>${esc(q)}</li>`)
    .join('');
  return `
  <section id="interview">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.badge} 11 · INTERVIEW</span>
        <h2 class="h2">${esc(t.int_title)}</h2>
      </div>
      <div class="int-grid">
        <div class="int-media card reveal">
          <img src="/images/interview-panel.webp" alt="${esc(t.int_img_alt)}" loading="lazy" width="1200" height="800">
        </div>
        <div class="int-copy reveal">
          <p class="int-sub">${esc(t.int_sub)}</p>
        </div>
        <div class="card int-panel reveal">
          <div class="int-tag"><span class="int-pill">VLE / VLM</span></div>
          <h3 class="h3">${esc(t.int_panel1_title)}</h3>
          <p class="int-panel-line">${esc(t.int_panel1_line)}</p>
        </div>
        <div class="card int-panel reveal">
          <div class="int-tag"><span class="int-pill">TLO / DLO</span></div>
          <h3 class="h3">${esc(t.int_panel2_title)}</h3>
          <p class="int-panel-line">${esc(t.int_panel2_line)}</p>
        </div>
        <div class="card int-samples reveal">
          <div class="int-samples-head">
            <span class="int-samples-ico">${ICON.badge}</span>
            <div>
              <div class="int-samples-kicker">${esc(t.int_samples_kicker)}</div>
              <h3 class="h3" style="margin:6px 0 0">${esc(t.int_samples_title)}</h3>
            </div>
          </div>
          <ul class="int-q">${qs}</ul>
        </div>
      </div>
    </div>
  </section>`;
}

export function renderPrep(t) {
  return `
  <section id="prep" class="bg-paper">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.cap} 13 · TAIYARI</span>
        <h2 class="h2">${esc(t.prep_title)}</h2>
      </div>

      <div class="prep-cards">
        <div class="card prep-card reveal">
          <div class="prep-ico">${ICON.cap}</div>
          <h3 class="h3">${esc(t.prep_card1_t)}</h3>
          <p>${esc(t.prep_card1_d)}</p>
        </div>
        <div class="card prep-card reveal">
          <div class="prep-ico">${ICON.badge}</div>
          <h3 class="h3">${esc(t.prep_card2_t)}</h3>
          <p>${esc(t.prep_card2_d)}</p>
        </div>
        <div class="card prep-card reveal">
          <div class="prep-ico">${ICON.check}</div>
          <h3 class="h3">${esc(t.prep_card3_t)}</h3>
          <p>${esc(t.prep_card3_d)}</p>
        </div>
      </div>

      <div class="prep-grid">
        <div class="card prep-img reveal">
          <img src="/images/taiyari-study.webp" alt="${esc(t.prep_img_alt)}" loading="lazy" width="1200" height="800">
        </div>
        <div class="prep-copy card reveal">
          <p class="prep-sub">${esc(t.prep_sub)}</p>
          <a class="btn btn-saffron" href="#apply">${esc(t.prep_cta)} ${ICON.arrowRight}</a>
          <p class="prep-note">${esc(t.prep_note)}</p>
        </div>
      </div>
    </div>
  </section>`;
}

export function renderEligibility(t) {
  const cards = [
    { t: t.elig_gs_t, d: t.elig_gs_d },
    { t: t.elig_ka_t, d: t.elig_ka_d },
    { t: t.elig_res_t, d: t.elig_res_d },
    { t: t.elig_local_t, d: t.elig_local_d },
  ].map(c => `<div class="card elig-card reveal"><h4>${esc(c.t)}</h4><p>${esc(c.d)}</p></div>`).join('');
  const dates = t.dates.map(d => `<li><span>${esc(d[0])}</span><span class="d">${esc(d[1])}</span></li>`).join('');
  return `
  <section class="bg-paper">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">${ICON.check} Eligibility</span>
        <h2 class="h2">${esc(t.elig_title)}</h2>
        <p>${esc(t.elig_sub)}</p>
      </div>
      <div class="elig-grid">${cards}</div>
      <div class="card reveal" style="margin-top:18px">
        <h3 class="h3" style="margin-top:0;color:var(--green-forest)">${t.dates_title}</h3>
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

export function renderFooter(t) {
  const divs = DIVISIONS.map(d => `<span>${esc(d)}</span>`).join('');
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a href="#top" class="brand" style="color:#fff"><span class="leaf">${ICON.leaf}</span> Kisan Mitra</a>
          <p style="margin-top:14px">${esc(t.footer_legal)}</p>
          <div style="margin-top:8px" class="devanagari-head">किसान का विकास, देश का विकास</div>
        </div>
        <div>
          <h4>${t.footer_contact}</h4>
          <ul>
            <li><a href="https://wa.me/910000000000">${ICON.whatsapp} ${t.footer_helpline}</a></li>
            <li><a href="tel:+910000000000">${ICON.phone} 1800-000-0000</a></li>
            <li>Lucknow, Uttar Pradesh</li>
          </ul>
        </div>
        <div>
          <h4>${t.footer_divisions}</h4>
          <div class="divisions">${divs}</div>
        </div>
      </div>
      <div class="footer-legal">© 2026 Kisan Mitra Ecosystem · Argus / RKF Strategic Initiative · ${esc(t.footer_legal)}</div>
    </div>
  </footer>`;
}
