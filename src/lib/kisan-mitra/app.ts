// @ts-nocheck
// ============================================================
// MAIN ORCHESTRATOR — assembles all sections, handles nav,
// language toggle, accordions, scroll reveal, count-up.
// ============================================================
import { I18N } from './i18n';
import {
  renderNav, renderHero, renderMission, renderWhy, renderRoles, renderHierarchy, renderSalary, renderVacancies,
  renderExams, renderSecurity, renderRoadmap, renderFarmers, renderSchemes,
    renderPartnerships, renderTraining, renderInterview, renderPrep, renderEligibility, renderFAQ, renderFooter
} from './sections';
import { initApply, setApplyLang } from './apply';

let lang = 'hi';

function renderApplySection(t) {
  return `
  <section id="apply" class="bg-paper">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Apply</span>
        <h2 class="h2">${t.apply_title}</h2>
        <p>${t.apply_sub}</p>
      </div>
      <div id="applyRoot"></div>
    </div>
  </section>`;
}

function renderAll() {
  const t = I18N[lang];
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML =
    renderNav(t) +
    renderHero(t) +
    renderMission(t, lang) +
    renderSchemes(t, lang) +
    renderWhy(t) +
    renderRoles(t, lang) +
    renderHierarchy(t) +
    renderSalary(t) +
    renderVacancies(t, lang) +
    renderExams(t, lang) +
    renderSecurity(t, lang) +
    renderRoadmap(t, lang) +
    renderFarmers(t, lang) +
    renderPartnerships(t) +
    renderTraining(t, lang) +
    renderInterview(t, lang) +
    renderPrep(t) +
    renderEligibility(t) +
    renderApplySection(t) +
    renderFAQ(t, lang) +
    renderFooter(t);
  bindGlobal();
  initApply(lang);
  setupReveal();
  setActiveLangButtons();
}

function setActiveLangButtons() {
  document.querySelectorAll('.lang-toggle button').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
}

function switchLang(l) {
  if (l === lang) return;
  lang = l;
  localStorage.setItem('km_lang', l);
  document.documentElement.lang = l;
  const scrollPos = window.scrollY;
  renderAll();
  window.scrollTo(0, 0); // re-render resets; go to top for clarity
}

function bindGlobal() {
  // nav scroll state
  const nav = document.getElementById('nav');
  const onScroll = () => { nav.classList.toggle('scrolled', window.scrollY > 30); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // language toggles
  document.querySelectorAll('.lang-toggle button').forEach(b => {
    b.addEventListener('click', () => switchLang(b.dataset.lang));
  });

  // mobile drawer
  const drawer = document.getElementById('drawer');
  const openD = () => { drawer.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeD = () => { drawer.classList.remove('open'); document.body.style.overflow = ''; };
  document.getElementById('hamburger').addEventListener('click', openD);
  document.getElementById('drawerClose').addEventListener('click', closeD);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeD));

  // role detail toggles
  document.querySelectorAll('[data-role-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.dataset.roleToggle;
      openRoleModal(i, btn);
    });
  });

  // exam sample modal
  document.querySelectorAll('[data-sample-toggle]').forEach(btn => {
    btn.addEventListener('click', () => openExamSamplesModal(btn.dataset.sampleToggle, btn));
  });

  // FAQ accordions
  document.querySelectorAll('[data-faq-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.dataset.faqToggle;
      const item = document.querySelector(`.faq-item[data-faq="${i}"]`);
      const ans = document.getElementById('faq-a-' + i);
      const open = item.classList.toggle('open');
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : '0';
    });
  });

  bindPerksCarousel();
  bindRoleModal();
  bindExamSamplesModal();
}

function bindExamSamplesModal() {
  const modal = document.getElementById('examSamplesModal');
  if (!modal) return;

  const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (modal._kmReturnFocus) {
      try { modal._kmReturnFocus.focus(); } catch {}
      modal._kmReturnFocus = null;
    }
  };

  const closeBtn = modal.querySelector('[data-modal-close]');
  if (closeBtn) closeBtn.addEventListener('click', close);

  const applyBtn = modal.querySelector('[data-modal-apply]');
  if (applyBtn) {
    applyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      close();
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

  modal._kmClose = close;
}

function openExamSamplesModal(id, triggerBtn) {
  const modal = document.getElementById('examSamplesModal');
  const source = document.getElementById('samples-' + id);
  const card = triggerBtn.closest('.exam-card');
  if (!modal || !source || !card) return;

  const titleEl = card.querySelector('h3');
  const forEl = card.querySelector('.exam-for');
  const pillEl = card.querySelector('.exam-head .eyebrow');

  const modalTitle = document.getElementById('examSamplesTitle');
  const modalPill = document.getElementById('examSamplesPill');
  const modalSub = document.getElementById('examSamplesSub');
  const modalBody = document.getElementById('examSamplesBody');

  if (modalTitle) modalTitle.textContent = titleEl ? titleEl.textContent : '';
  if (modalPill) modalPill.textContent = pillEl ? pillEl.textContent : '';
  if (modalSub) modalSub.textContent = forEl ? forEl.textContent : '';
  if (modalBody) modalBody.innerHTML = source.innerHTML;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  modal._kmReturnFocus = triggerBtn;
  document.body.style.overflow = 'hidden';

  const closeBtn = modal.querySelector('[data-modal-close]');
  if (closeBtn) closeBtn.focus();
}

function bindRoleModal() {
  const modal = document.getElementById('roleModal');
  if (!modal) return;

  const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (modal._kmReturnFocus) {
      try { modal._kmReturnFocus.focus(); } catch {}
      modal._kmReturnFocus = null;
    }
  };

  const closeBtn = modal.querySelector('[data-modal-close]');
  if (closeBtn) closeBtn.addEventListener('click', close);

  const applyBtn = modal.querySelector('[data-modal-apply]');
  if (applyBtn) {
    applyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      close();
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

  modal._kmClose = close;
}

function openRoleModal(i, triggerBtn) {
  const modal = document.getElementById('roleModal');
  if (!modal) return;
  const card = triggerBtn.closest('.role-card');
  const exp = document.getElementById('roleExp' + i);
  if (!card || !exp) return;

  const titleEl = card.querySelector('.role-title');
  const pillEl = card.querySelector('.role-pill');
  const coverImg = card.querySelector('.role-cover img');
  const whoEl = exp.querySelector('.role-who');

  const modalTitle = document.getElementById('roleModalTitle');
  const modalPill = document.getElementById('roleModalPill');
  const modalSub = document.getElementById('roleModalSub');
  const modalBody = document.getElementById('roleModalBody');

  if (modalTitle) modalTitle.textContent = titleEl ? titleEl.textContent : '';
  if (modalPill) {
    modalPill.textContent = pillEl ? pillEl.textContent : '';
    modalPill.style.background = pillEl ? (pillEl.style.background || '') : '';
  }
  if (modalSub) modalSub.textContent = whoEl ? whoEl.textContent : '';

  const meta = exp.querySelector('.role-meta');
  const salary = exp.querySelector('.role-salary');
  const dutiesTitle = exp.querySelector('.role-duties-title');
  const duties = exp.querySelector('.role-duties');

  const imgHTML = coverImg
    ? `<div class="km-modal-cover"><img src="${coverImg.getAttribute('src')}" alt="${coverImg.getAttribute('alt') || ''}" loading="lazy"></div>`
    : '';

  const metaHTML = meta ? `<div class="km-modal-meta">${meta.outerHTML}</div>` : '';
  const restHTML = `
    <div class="km-modal-details">
      ${salary ? salary.outerHTML : ''}
      ${dutiesTitle ? dutiesTitle.outerHTML : ''}
      ${duties ? duties.outerHTML : ''}
    </div>`;

  if (modalBody) {
    modalBody.innerHTML = `
      <div class="km-modal-top">
        ${imgHTML}
        ${metaHTML}
      </div>
      ${restHTML}
    `;
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  modal._kmReturnFocus = triggerBtn;
  document.body.style.overflow = 'hidden';

  const closeBtn = modal.querySelector('[data-modal-close]');
  if (closeBtn) closeBtn.focus();
}

function bindPerksCarousel() {
  const viewport = document.getElementById('perksViewport');
  const prev = document.getElementById('perksPrev');
  const next = document.getElementById('perksNext');
  if (!viewport || !prev || !next) return;

  const syncCardWidths = () => {
    const mobile = window.matchMedia('(max-width: 640px)').matches;
    viewport.querySelectorAll('.perk-card').forEach(card => {
      if (mobile) {
        const w = viewport.clientWidth;
        card.style.flexBasis = `${w}px`;
        card.style.width = `${w}px`;
        card.style.maxWidth = `${w}px`;
      } else {
        card.style.flexBasis = '';
        card.style.width = '';
        card.style.maxWidth = '';
      }
    });
  };

  const scrollStep = () => {
    const card = viewport.querySelector('.perk-card');
    if (!card) return viewport.clientWidth * 0.85;
    const track = viewport.querySelector('.salary-perks-track');
    const gap = track ? parseFloat(getComputedStyle(track).gap) || 18 : 18;
    return card.offsetWidth + gap;
  };

  const updateButtons = () => {
    const max = viewport.scrollWidth - viewport.clientWidth;
    prev.disabled = viewport.scrollLeft <= 4;
    next.disabled = viewport.scrollLeft >= max - 4;
  };

  prev.addEventListener('click', () => {
    viewport.scrollBy({ left: -scrollStep(), behavior: 'smooth' });
  });
  next.addEventListener('click', () => {
    viewport.scrollBy({ left: scrollStep(), behavior: 'smooth' });
  });
  viewport.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', () => {
    syncCardWidths();
    updateButtons();
  });
  syncCardWidths();
  updateButtons();
}

// scroll reveal + count-up
function setupReveal() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(r => r.classList.add('in'));
    runCountUp();
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  reveals.forEach(r => io.observe(r));

  // count-up when stats visible
  const stats = document.querySelectorAll('[data-count]');
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); } });
  }, { threshold: 0.5 });
  stats.forEach(s => cio.observe(s));
}

function runCountUp() { document.querySelectorAll('[data-count]').forEach(animateCount); }

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  if (!target) { el.textContent = el.dataset.count; return; }
  const dur = 1400; const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString('en-IN');
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function initKisanMitra() {
  lang = localStorage.getItem('km_lang') || 'hi';
  document.documentElement.lang = lang;
  renderAll();
}
