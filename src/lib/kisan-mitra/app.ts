// ============================================================
// APPLY-SECTION HOST
//
// All page chrome and content sections are React components now. What remains
// here is the mount point for the multi-step apply form in apply.ts, which
// still renders itself as an HTML string into #applyRoot.
// ============================================================
import { I18N, type Dict } from './i18n';
import { ICON } from './icons';
import { initApply, applyToPosition } from './apply';
import type { Lang } from './recruitment/types';

let lang: Lang = 'hi';
let applyEl: HTMLElement | null = null;
let withHeading = true;

function applySectionHTML(t: Dict) {
  // The standalone /apply page renders its own <h1> above this, so the section
  // head is skipped there rather than emitting a second heading for the form.
  const head = withHeading
    ? `<div class="section-head reveal in">
        <span class="eyebrow">${ICON.fileText} Apply</span>
        <h2 class="h2">${t.apply_title_pre} <span class="accent">${t.apply_title_accent}</span> ${t.apply_title_post}</h2>
        <p>${t.apply_sub}</p>
        <div class="section-divider"><span>${ICON.leaf}</span></div>
      </div>`
    : "";
  return `
  <section id="apply" class="bg-paper">
    <div class="container">
      ${head}
      <div id="applyRoot"></div>
    </div>
  </section>`;
}

function render() {
  if (!applyEl) return;
  document.body.style.overflow = '';
  applyEl.innerHTML = applySectionHTML(I18N[lang]);
  initApply(lang);
}

export function initApplySection(
  container: HTMLElement | null,
  preselectPositionId?: string | null,
  showHeading = true
) {
  applyEl = container;
  withHeading = showHeading;
  const saved = localStorage.getItem('km_lang');
  lang = saved !== null && saved in I18N ? (saved as Lang) : 'hi';
  render();
  // Deep link from a role card / role page: start on step 1 with the role chosen.
  if (preselectPositionId) applyToPosition(preselectPositionId);
}

/** Re-renders the form in `next` — called by React when the language changes. */
export function renderApplySectionFor(next: Lang) {
  if (!applyEl || next === lang) return;
  lang = next;
  render();
}
