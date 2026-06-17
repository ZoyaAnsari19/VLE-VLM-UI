// ============================================================
// MAIN ORCHESTRATOR — assembles all sections, handles nav,
// language toggle, accordions, scroll reveal, count-up.
// ============================================================
import { I18N } from './i18n.js';
import {
  renderNav, renderHero, renderMission, renderWhy, renderRoles, renderHierarchy, renderSalary,
  renderExams, renderSecurity, renderRoadmap, renderFarmers, renderSchemes,
  renderPartnerships, renderTraining, renderEligibility, renderFAQ, renderFooter
} from './sections.js';
import { initApply, setApplyLang } from './apply.js';

let lang = localStorage.getItem('km_lang') || 'hi';
document.documentElement.lang = lang;

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
  app.innerHTML =
    renderNav(t) +
    renderHero(t) +
    renderMission(t, lang) +
    renderSchemes(t, lang) +
    renderWhy(t) +
    renderRoles(t, lang) +
    renderHierarchy(t) +
    renderSalary(t) +
    renderExams(t, lang) +
    renderSecurity(t, lang) +
    renderRoadmap(t, lang) +
    renderFarmers(t, lang) +
    renderPartnerships(t) +
    renderTraining(t, lang) +
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
      const card = btn.closest('.role-card');
      const exp = document.getElementById('roleExp' + i);
      const open = exp.classList.toggle('open');
      if (card) card.classList.toggle('is-open', open);
      const txt = btn.querySelector('.rtxt');
      if (txt) txt.textContent = open ? I18N[lang].role_less : I18N[lang].role_details;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // exam sample toggles
  document.querySelectorAll('[data-sample-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.sampleToggle;
      const body = document.getElementById('samples-' + id);
      const open = body.classList.toggle('open');
      btn.firstChild.textContent = (open ? I18N[lang].exam_samples_hide : I18N[lang].exam_samples) + ' ';
    });
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

// boot
renderAll();
