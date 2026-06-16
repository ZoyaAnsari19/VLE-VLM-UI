// ============================================================
// MULTI-STEP KYC-FIRST APPLICATION FORM
// Steps 0..9. KYC before fee. Validation, scholarship, confirmation.
// ============================================================
import { ICON } from './icons.js';
import { DIVISIONS, EXAMS } from './data.js';

const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Form state (persisted to localStorage)
const STORE_KEY = 'km_apply_state';
export const formState = {
  step: 0,
  exam: null,        // 'gram-sevak' | 'krishi-adhikari'
  mobile: '', otpVerified: false,
  aadhaar: '', kycConsent: false, fullName: '', dob: '', gender: '', kycVerified: false,
  parentName: '', category: '', pwd: '', email: '', division: '', district: '', tehsil: '', village: '', pincode: '', address: '',
  qualification: '', stream: '', passYear: '', percent: '', agriBg: '', experience: '',
  prefDivision: '', willingLocal: '',
  docs: { photo: '', signature: '', aadhaarCard: '', education: '', category_cert: '', domicile: '' },
  declTruth: false, declAntiCorr: false, declTnc: false,
  payMethod: '', appId: ''
};

export function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY));
    if (s) Object.assign(formState, s);
  } catch (e) {}
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(formState)); } catch (e) {}
}

const TOTAL_STEPS = 10; // 0..9
let lang = 'hi';

export function initApply(currentLang) {
  lang = currentLang;
  loadState();
  renderForm();
}
export function setApplyLang(l) { lang = l; renderForm(); }

const STR = {
  hi: {
    step: 'Step', of: 'of', back: 'Peeche', next: 'Aage', required: '(zaroori)',
    s0_title: 'Pariksha / Post chuno', s0_sub: 'Apni target post ke hisaab se pariksha select karein.',
    s1_title: 'Mobile Verification', s1_sub: 'Apna mobile number verify karein.',
    s1_mobile: 'Mobile Number', s1_send: 'OTP Bhejein', s1_otp: 'OTP (6-digit)', s1_verify: 'Verify Karein', s1_resend: 'Dobara bhejein', s1_verified: 'Mobile Verified',
    s2_title: 'KYC (Aadhaar-based)', s2_sub: 'Identity verification — fee se pehle.',
    s2_aadhaar: 'Aadhaar Number', s2_consent: 'Main apni Aadhaar details verification ke liye consent deta/deti hoon.',
    s2_name: 'Poora Naam (Aadhaar ke anusaar)', s2_dob: 'Janm Tithi (DOB)', s2_gender: 'Gender', s2_verify: 'Aadhaar Verify Karein', s2_verified: 'KYC Verified',
    s3_title: 'Personal & Address Details', s3_sub: 'Apni jaankari bharein.',
    s3_parent: 'Pita / Mata ka Naam', s3_cat: 'Category', s3_pwd: 'Person with Disability?', s3_email: 'Email (optional)',
    s3_state: 'State', s3_div: 'Division', s3_dist: 'District', s3_teh: 'Tehsil', s3_vil: 'Village', s3_pin: 'Pincode', s3_addr: 'Poora Pata',
    s4_title: 'Educational Qualification', s4_sub: 'Apni shiksha ki jaankari.',
    s4_qual: 'Highest Qualification', s4_stream: 'Stream / Subject', s4_year: 'Year of Passing', s4_pct: 'Percentage / CGPA', s4_agri: 'Agriculture background?', s4_exp: 'Management / work experience (years, optional)',
    s5_title: 'Post & Posting Preference', s5_sub: 'Apni posting preference batayein.',
    s5_pref: 'Preferred Division', s5_willing: 'Home/nearby cluster mein serve karne ke liye willing?', s5_note: 'Top scorers ko VLM, baaki ko VLE assign kiya jaata hai — dono ek hi pariksha se.',
    s6_title: 'Document Upload', s6_sub: 'Apne documents upload karein (image/PDF).',
    s7_title: 'Declaration & Review', s7_sub: 'Apni jaankari check karein aur declare karein.',
    s7_edit: 'Edit', s7_d1: 'Sabhi jaankari sahi hai. Galat jaankari par mera application reject ho sakta hai.', s7_d2: 'Main bhrashtachar na karne aur sach bataane ki ghoshna karta/karti hoon (anti-corruption).', s7_d3: 'Terms & Conditions + Privacy (DPDP) consent — data encrypted, 6 mahine baad delete agar select nahi hue.',
    s8_title: 'Fee Payment', s8_sub: 'KYC ho gaya — ab fee bharein.', s8_fee: 'Exam Fee', s8_discount: 'Scholarship / Waiver', s8_total: 'Dena hai', s8_pay: 'Bhugtaan Karein', s8_trust: 'Aapki fee ek escrow account mein securely jaati hai.',
    s9_title: 'Application Submitted!', s9_sub: 'Aapka application safal raha.', s9_id: 'Aapki Application ID', s9_dl: 'Application PDF Download Karein', s9_info: 'Admit card exam se ~1 hafta pehle issue hoga. Updates aapke mobile/WhatsApp par.', s9_again: 'Naya Application',
    err_required: 'Ye field zaroori hai', err_mobile: '10-digit mobile number daalein', err_otp: 'Sahi 6-digit OTP daalein', err_aadhaar: '12-digit Aadhaar number daalein', err_consent: 'Consent dena zaroori hai', err_pin: '6-digit pincode daalein', err_decl: 'Sabhi declarations accept karein', err_otp_first: 'Pehle OTP verify karein', err_kyc_first: 'Pehle Aadhaar verify karein', err_pay: 'Payment method chunein',
    sending: 'Bhej rahe hain...', verifying: 'Verify ho raha hai...', paying: 'Process ho raha hai...',
    cat_options: ['General', 'OBC', 'SC', 'ST', 'EWS'], yesno: ['Haan', 'Nahi'],
    gender_opts: ['Male', 'Female', 'Other'], qual_opts: ['10th', '12th', 'Graduate', 'Post-Graduate'],
    select: 'Select karein', upload_hint: 'Click karke upload karein',
    docs: { photo: 'Passport Photo', signature: 'Signature', aadhaarCard: 'Aadhaar Card', education: 'Education Certificate', category_cert: 'Category Certificate (if applicable)', domicile: 'Domicile Certificate (if available)' },
    review_groups: { exam: 'Pariksha', contact: 'Contact & KYC', personal: 'Personal & Address', edu: 'Education', pref: 'Posting Preference' }
  },
  en: {
    step: 'Step', of: 'of', back: 'Back', next: 'Next', required: '(required)',
    s0_title: 'Choose Exam / Post', s0_sub: 'Select the exam for your target post.',
    s1_title: 'Mobile Verification', s1_sub: 'Verify your mobile number.',
    s1_mobile: 'Mobile Number', s1_send: 'Send OTP', s1_otp: 'OTP (6-digit)', s1_verify: 'Verify', s1_resend: 'Resend', s1_verified: 'Mobile Verified',
    s2_title: 'KYC (Aadhaar-based)', s2_sub: 'Identity verification — before fee.',
    s2_aadhaar: 'Aadhaar Number', s2_consent: 'I consent to verification of my Aadhaar details.',
    s2_name: 'Full Name (as per Aadhaar)', s2_dob: 'Date of Birth', s2_gender: 'Gender', s2_verify: 'Verify Aadhaar', s2_verified: 'KYC Verified',
    s3_title: 'Personal & Address Details', s3_sub: 'Fill in your details.',
    s3_parent: "Father's / Mother's Name", s3_cat: 'Category', s3_pwd: 'Person with Disability?', s3_email: 'Email (optional)',
    s3_state: 'State', s3_div: 'Division', s3_dist: 'District', s3_teh: 'Tehsil', s3_vil: 'Village', s3_pin: 'Pincode', s3_addr: 'Full Address',
    s4_title: 'Educational Qualification', s4_sub: 'Your education details.',
    s4_qual: 'Highest Qualification', s4_stream: 'Stream / Subject', s4_year: 'Year of Passing', s4_pct: 'Percentage / CGPA', s4_agri: 'Agriculture background?', s4_exp: 'Management / work experience (years, optional)',
    s5_title: 'Post & Posting Preference', s5_sub: 'Tell us your posting preference.',
    s5_pref: 'Preferred Division', s5_willing: 'Willing to serve in home/nearby cluster?', s5_note: 'Top scorers are assigned VLM, the rest VLE — both from the same exam.',
    s6_title: 'Document Upload', s6_sub: 'Upload your documents (image/PDF).',
    s7_title: 'Declaration & Review', s7_sub: 'Check your details and declare.',
    s7_edit: 'Edit', s7_d1: 'All information is correct. False information may lead to rejection.', s7_d2: 'I declare truthfulness and commit to anti-corruption.', s7_d3: 'Terms & Conditions + Privacy (DPDP) consent — data encrypted, deleted after 6 months if not selected.',
    s8_title: 'Fee Payment', s8_sub: 'KYC done — now pay the fee.', s8_fee: 'Exam Fee', s8_discount: 'Scholarship / Waiver', s8_total: 'Payable', s8_pay: 'Pay Now', s8_trust: 'Your fee goes securely into an escrow account.',
    s9_title: 'Application Submitted!', s9_sub: 'Your application was successful.', s9_id: 'Your Application ID', s9_dl: 'Download Application PDF', s9_info: 'Admit card will be issued ~1 week before exam. Updates on your mobile/WhatsApp.', s9_again: 'New Application',
    err_required: 'This field is required', err_mobile: 'Enter a 10-digit mobile number', err_otp: 'Enter a valid 6-digit OTP', err_aadhaar: 'Enter a 12-digit Aadhaar number', err_consent: 'Consent is required', err_pin: 'Enter a 6-digit pincode', err_decl: 'Accept all declarations', err_otp_first: 'Verify OTP first', err_kyc_first: 'Verify Aadhaar first', err_pay: 'Choose a payment method',
    sending: 'Sending...', verifying: 'Verifying...', paying: 'Processing...',
    cat_options: ['General', 'OBC', 'SC', 'ST', 'EWS'], yesno: ['Yes', 'No'],
    gender_opts: ['Male', 'Female', 'Other'], qual_opts: ['10th', '12th', 'Graduate', 'Post-Graduate'],
    select: 'Select', upload_hint: 'Click to upload',
    docs: { photo: 'Passport Photo', signature: 'Signature', aadhaarCard: 'Aadhaar Card', education: 'Education Certificate', category_cert: 'Category Certificate (if applicable)', domicile: 'Domicile Certificate (if available)' },
    review_groups: { exam: 'Exam', contact: 'Contact & KYC', personal: 'Personal & Address', edu: 'Education', pref: 'Posting Preference' }
  }
};

function s() { return STR[lang]; }
function feeFor() { const e = EXAMS.find(x => x.id === formState.exam); return e ? e.fee : 0; }
function discountFor() {
  // SC/ST/rural-girls/BPL → 100% waiver; EWS/OBC → 50%
  const cat = formState.category;
  if (['SC', 'ST'].includes(cat)) return 1;
  if (formState.gender === 'Female') return 1; // rural-girls
  if (cat === 'EWS') return 0.5;
  return 0;
}

function field(id, labelKey, value, opts = {}) {
  const L = s();
  const req = opts.required ? ` <span class="req">*</span>` : '';
  let input;
  if (opts.type === 'select') {
    const options = (opts.options || []).map(o => `<option value="${esc(o)}" ${value === o ? 'selected' : ''}>${esc(o)}</option>`).join('');
    input = `<select id="f_${id}" data-field="${id}"><option value="">${L.select}</option>${options}</select>`;
  } else if (opts.type === 'textarea') {
    input = `<textarea id="f_${id}" data-field="${id}" placeholder="${esc(opts.placeholder || '')}">${esc(value)}</textarea>`;
  } else {
    input = `<input id="f_${id}" data-field="${id}" type="${opts.type || 'text'}" inputmode="${opts.inputmode || 'text'}" value="${esc(value)}" placeholder="${esc(opts.placeholder || '')}" ${opts.maxlength ? `maxlength="${opts.maxlength}"` : ''} ${opts.disabled ? 'disabled' : ''}>`;
  }
  return `<div class="field" id="field_${id}">
    <label for="f_${id}">${esc(L[labelKey] || labelKey)}${req}</label>
    ${input}
    <div class="err">${esc(opts.errMsg || L.err_required)}</div>
  </div>`;
}

function radioField(id, labelKey, value, options) {
  const L = s();
  const chips = options.map(o => `
    <label class="radio-chip ${value === o ? 'checked' : ''}" data-radio="${id}" data-value="${esc(o)}">
      <input type="radio" name="r_${id}" ${value === o ? 'checked' : ''}> ${esc(o)}
    </label>`).join('');
  return `<div class="field" id="field_${id}">
    <label>${esc(L[labelKey] || labelKey)} <span class="req">*</span></label>
    <div class="radio-group">${chips}</div>
    <div class="err">${L.err_required}</div>
  </div>`;
}

function stepHTML() {
  const L = s();
  const st = formState.step;

  if (st === 0) {
    const cards = EXAMS.map(e => `
      <div class="choice ${formState.exam === e.id ? 'selected' : ''}" data-exam="${e.id}">
        <h4>${esc(lang === 'hi' ? e.name_hi : e.name_en)}</h4>
        <div style="color:var(--ink-soft);font-size:14px">→ ${esc(lang === 'hi' ? e.for_hi : e.for_en)}</div>
        <div class="cfee">Fee ₹${e.fee}</div>
      </div>`).join('');
    return `<h3 class="h3">${L.s0_title}</h3><p class="step-sub">${L.s0_sub}</p>
      <div class="choice-cards">${cards}</div>`;
  }

  if (st === 1) {
    return `<h3 class="h3">${L.s1_title}</h3><p class="step-sub">${L.s1_sub}</p>
      ${field('mobile', 's1_mobile', formState.mobile, { type: 'tel', inputmode: 'numeric', maxlength: 10, required: true, errMsg: L.err_mobile, placeholder: '10-digit' })}
      <button class="btn btn-ghost" id="sendOtp" ${formState.otpVerified ? 'disabled' : ''}>${L.s1_send}</button>
      <div id="otpArea" style="margin-top:18px;${formState.mobile && !formState.otpVerified ? '' : 'display:none'}">
        ${field('otp', 's1_otp', '', { type: 'tel', inputmode: 'numeric', maxlength: 6, required: true, errMsg: L.err_otp, placeholder: '••••••' })}
        <button class="btn btn-primary" id="verifyOtp">${L.s1_verify}</button>
        <span id="resendTimer" style="margin-left:12px;color:var(--ink-soft);font-size:14px"></span>
      </div>
      <div id="otpVerified" style="margin-top:14px;${formState.otpVerified ? '' : 'display:none'}">
        <span class="verified-badge">${ICON.check} ${L.s1_verified}</span>
      </div>`;
  }

  if (st === 2) {
    return `<h3 class="h3">${L.s2_title}</h3><p class="step-sub">${L.s2_sub}</p>
      ${field('aadhaar', 's2_aadhaar', formState.aadhaar, { type: 'tel', inputmode: 'numeric', maxlength: 12, required: true, errMsg: L.err_aadhaar, placeholder: '12-digit' })}
      <div class="checkbox-row">
        <input type="checkbox" id="f_kycConsent" data-check="kycConsent" ${formState.kycConsent ? 'checked' : ''}>
        <label for="f_kycConsent">${L.s2_consent}</label>
      </div>
      <div class="field" id="field_kycConsent" style="margin-top:-10px"><div class="err">${L.err_consent}</div></div>
      ${field('fullName', 's2_name', formState.fullName, { required: true })}
      <div class="field-row">
        ${field('dob', 's2_dob', formState.dob, { type: 'date', required: true })}
        ${field('gender', 's2_gender', formState.gender, { type: 'select', options: L.gender_opts, required: true })}
      </div>
      <button class="btn btn-primary" id="verifyKyc" ${formState.kycVerified ? 'disabled' : ''}>${L.s2_verify}</button>
      <div id="kycVerified" style="margin-top:14px;${formState.kycVerified ? '' : 'display:none'}">
        <span class="verified-badge">${ICON.check} ${L.s2_verified}</span>
      </div>`;
  }

  if (st === 3) {
    const divs = DIVISIONS;
    return `<h3 class="h3">${L.s3_title}</h3><p class="step-sub">${L.s3_sub}</p>
      ${field('parentName', 's3_parent', formState.parentName, { required: true })}
      <div class="field-row">
        ${field('category', 's3_cat', formState.category, { type: 'select', options: L.cat_options, required: true })}
        ${radioField('pwd', 's3_pwd', formState.pwd, L.yesno)}
      </div>
      ${field('email', 's3_email', formState.email, { type: 'email' })}
      ${field('state', 's3_state', 'Uttar Pradesh', { disabled: true })}
      <div class="field-row">
        ${field('division', 's3_div', formState.division, { type: 'select', options: divs, required: true })}
        ${field('district', 's3_dist', formState.district, { required: true })}
      </div>
      <div class="field-row">
        ${field('tehsil', 's3_teh', formState.tehsil, { required: true })}
        ${field('village', 's3_vil', formState.village, { required: true })}
      </div>
      ${field('pincode', 's3_pin', formState.pincode, { type: 'tel', inputmode: 'numeric', maxlength: 6, required: true, errMsg: L.err_pin })}
      ${field('address', 's3_addr', formState.address, { type: 'textarea', required: true })}`;
  }

  if (st === 4) {
    const isKrishi = formState.exam === 'krishi-adhikari';
    return `<h3 class="h3">${L.s4_title}</h3><p class="step-sub">${L.s4_sub}</p>
      <div class="field-row">
        ${field('qualification', 's4_qual', formState.qualification, { type: 'select', options: L.qual_opts, required: true })}
        ${field('stream', 's4_stream', formState.stream, { required: true })}
      </div>
      <div class="field-row">
        ${field('passYear', 's4_year', formState.passYear, { type: 'tel', inputmode: 'numeric', maxlength: 4, required: true })}
        ${field('percent', 's4_pct', formState.percent, { required: true })}
      </div>
      ${radioField('agriBg', 's4_agri', formState.agriBg, L.yesno)}
      ${isKrishi ? field('experience', 's4_exp', formState.experience, { type: 'tel', inputmode: 'numeric' }) : ''}`;
  }

  if (st === 5) {
    const isGram = formState.exam === 'gram-sevak';
    return `<h3 class="h3">${L.s5_title}</h3><p class="step-sub">${L.s5_sub}</p>
      ${field('prefDivision', 's5_pref', formState.prefDivision || formState.division, { type: 'select', options: DIVISIONS, required: true })}
      ${radioField('willingLocal', 's5_willing', formState.willingLocal, L.yesno)}
      ${isGram ? `<div class="identity-box" style="margin-top:6px">${L.s5_note}</div>` : ''}`;
  }

  if (st === 6) {
    const reqDocs = ['photo', 'signature', 'aadhaarCard', 'education'];
    const optDocs = ['category_cert', 'domicile'];
    const cell = (key, req) => {
      const val = formState.docs[key];
      const isImg = val && val.startsWith('data:image');
      return `<div class="upload ${val ? 'has-file' : ''}" data-doc="${key}">
        <div style="color:var(--green-forest)">${ICON.upload}</div>
        <div style="font-weight:700;font-size:14px;margin-top:8px">${esc(L.docs[key])}${req ? ' <span class="req">*</span>' : ''}</div>
        <div style="font-size:12px;color:var(--ink-soft)">${L.upload_hint}</div>
        ${val ? (isImg ? `<img class="thumb" src="${val}">` : `<div class="uname">${ICON.check} File uploaded</div>`) : ''}
        <input type="file" accept="image/*,.pdf" data-doc-input="${key}" style="display:none">
        <div class="err" style="${formState._docErr && req && !val ? 'display:block' : ''}">${L.err_required}</div>
      </div>`;
    };
    return `<h3 class="h3">${L.s6_title}</h3><p class="step-sub">${L.s6_sub}</p>
      <div class="upload-grid">
        ${reqDocs.map(k => cell(k, true)).join('')}
        ${optDocs.map(k => cell(k, false)).join('')}
      </div>`;
  }

  if (st === 7) {
    const exam = EXAMS.find(e => e.id === formState.exam);
    const g = (rows) => rows.map(r => `<div class="rg-row"><span class="k">${esc(r[0])}</span><span class="v">${esc(r[1] || '—')}</span></div>`).join('');
    const group = (titleKey, editStep, rows) => `
      <div class="review-group">
        <div class="rg-head"><span>${esc(L.review_groups[titleKey])}</span><button data-goto="${editStep}">${L.s7_edit}</button></div>
        <div class="rg-body">${g(rows)}</div>
      </div>`;
    return `<h3 class="h3">${L.s7_title}</h3><p class="step-sub">${L.s7_sub}</p>
      ${group('exam', 0, [[L.s0_title, exam ? (lang === 'hi' ? exam.name_hi : exam.name_en) : '']])}
      ${group('contact', 1, [[L.s1_mobile, formState.mobile], [L.s2_aadhaar, formState.aadhaar ? '••••••••' + formState.aadhaar.slice(-4) : ''], [L.s2_name, formState.fullName], [L.s2_dob, formState.dob], [L.s2_gender, formState.gender]])}
      ${group('personal', 3, [[L.s3_parent, formState.parentName], [L.s3_cat, formState.category], [L.s3_div, formState.division], [L.s3_dist, formState.district], [L.s3_teh, formState.tehsil], [L.s3_vil, formState.village], [L.s3_pin, formState.pincode]])}
      ${group('edu', 4, [[L.s4_qual, formState.qualification], [L.s4_stream, formState.stream], [L.s4_year, formState.passYear], [L.s4_pct, formState.percent], [L.s4_agri, formState.agriBg]])}
      ${group('pref', 5, [[L.s5_pref, formState.prefDivision || formState.division], [L.s5_willing, formState.willingLocal]])}
      <div class="checkbox-row"><input type="checkbox" id="d1" data-check="declTruth" ${formState.declTruth ? 'checked' : ''}><label for="d1">${L.s7_d1}</label></div>
      <div class="checkbox-row"><input type="checkbox" id="d2" data-check="declAntiCorr" ${formState.declAntiCorr ? 'checked' : ''}><label for="d2">${L.s7_d2}</label></div>
      <div class="checkbox-row"><input type="checkbox" id="d3" data-check="declTnc" ${formState.declTnc ? 'checked' : ''}><label for="d3">${L.s7_d3}</label></div>
      <div class="field" id="field_decl"><div class="err">${L.err_decl}</div></div>`;
  }

  if (st === 8) {
    const fee = feeFor();
    const disc = discountFor();
    const discAmt = Math.round(fee * disc);
    const total = fee - discAmt;
    const methods = ['UPI', 'Card', 'Netbanking'];
    return `<h3 class="h3">${L.s8_title}</h3><p class="step-sub">${L.s8_sub}</p>
      <div class="fee-summary">
        <div class="fee-row"><span>${L.s8_fee}</span><span class="${disc ? 'strike' : ''}">₹${fee}</span></div>
        ${disc ? `<div class="fee-row" style="color:var(--green-leaf)"><span>${L.s8_discount} (${Math.round(disc * 100)}%)</span><span>− ₹${discAmt}</span></div>` : ''}
        <div class="fee-row fee-total"><span>${L.s8_total}</span><span>₹${total}</span></div>
      </div>
      <div class="pay-options">
        ${methods.map(m => `<div class="pay-opt ${formState.payMethod === m ? 'selected' : ''}" data-pay="${m}">${m}</div>`).join('')}
      </div>
      <div class="field" id="field_pay"><div class="err">${L.err_pay}</div></div>
      <button class="btn btn-saffron btn-block" id="payNow">${L.s8_pay} ₹${total}</button>
      <div class="trust-line">${ICON.lock} ${L.s8_trust}</div>`;
  }

  if (st === 9) {
    return `<div class="confirm-box">
      <div class="check">${ICON.check}</div>
      <h3 class="h3">${L.s9_title}</h3>
      <p class="step-sub">${L.s9_sub}</p>
      <div style="color:var(--ink-soft);font-size:14px">${L.s9_id}</div>
      <div class="app-id">${esc(formState.appId)}</div>
      <div><button class="btn btn-primary" id="dlPdf">${ICON.upload} ${L.s9_dl}</button></div>
      <p style="margin-top:20px;color:var(--ink-soft)">${L.s9_info}</p>
      <p class="trust-line"><a href="https://wa.me/910000000000" style="color:var(--green-forest);font-weight:700">${ICON.whatsapp} WhatsApp Helpline</a></p>
      <button class="btn btn-ghost" id="newApp" style="margin-top:12px">${L.s9_again}</button>
    </div>`;
  }
  return '';
}

function renderForm() {
  const root = document.getElementById('applyRoot');
  if (!root) return;
  const L = s();
  const st = formState.step;
  const pct = Math.round((st / (TOTAL_STEPS - 1)) * 100);
  const showNav = st > 0 && st < 8;
  root.innerHTML = `
    <div class="apply-wrap">
      ${st < 9 ? `<div class="progress">
        <div class="progress-top"><span>${L.step} ${st} ${L.of} 9</span><span>${pct}%</span></div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>` : ''}
      <div class="form-card">
        ${stepHTML()}
        ${(st > 0 && st < 9) ? `<div class="form-nav">
          <button class="btn btn-ghost" id="prevBtn">${ICON.chev} ${L.back}</button>
          ${st < 8 ? `<button class="btn btn-primary" id="nextBtn">${L.next} ${ICON.arrowRight}</button>` : '<span></span>'}
        </div>` : (st === 0 ? `<div class="form-nav"><span></span><button class="btn btn-primary" id="nextBtn">${L.next} ${ICON.arrowRight}</button></div>` : '')}
      </div>
    </div>`;
  bindStep();
}

// ----- validation per step -----
function setErr(id, on) { const el = document.getElementById('field_' + id); if (el) el.classList.toggle('invalid', !!on); }

function validateStep() {
  const st = formState.step, L = s();
  let ok = true;
  const need = (id, cond) => { const bad = !cond; setErr(id, bad); if (bad) ok = false; };
  if (st === 0) { if (!formState.exam) { alert(lang === 'hi' ? 'Pehle pariksha chunein' : 'Choose an exam first'); ok = false; } }
  else if (st === 1) { if (!formState.otpVerified) { alert(L.err_otp_first); ok = false; } }
  else if (st === 2) { if (!formState.kycVerified) { alert(L.err_kyc_first); ok = false; } }
  else if (st === 3) {
    need('parentName', formState.parentName.trim());
    need('category', formState.category);
    need('pwd', formState.pwd);
    need('division', formState.division);
    need('district', formState.district.trim());
    need('tehsil', formState.tehsil.trim());
    need('village', formState.village.trim());
    need('pincode', /^\d{6}$/.test(formState.pincode));
    need('address', formState.address.trim());
  }
  else if (st === 4) {
    need('qualification', formState.qualification);
    need('stream', formState.stream.trim());
    need('passYear', /^\d{4}$/.test(formState.passYear));
    need('percent', formState.percent.trim());
    need('agriBg', formState.agriBg);
  }
  else if (st === 5) {
    need('prefDivision', formState.prefDivision || formState.division);
    need('willingLocal', formState.willingLocal);
  }
  else if (st === 6) {
    formState._docErr = true;
    const reqDocs = ['photo', 'signature', 'aadhaarCard', 'education'];
    ok = reqDocs.every(k => formState.docs[k]);
    if (!ok) renderForm();
  }
  else if (st === 7) {
    const allDecl = formState.declTruth && formState.declAntiCorr && formState.declTnc;
    setErr('decl', !allDecl);
    if (!allDecl) ok = false;
  }
  return ok;
}

async function mockApi(path, body) {
  try {
    const r = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}) });
    return await r.json();
  } catch (e) { return { success: true }; }
}

function bindStep() {
  const st = formState.step, L = s();

  // generic field inputs
  document.querySelectorAll('[data-field]').forEach(el => {
    el.addEventListener('input', () => {
      let v = el.value;
      const f = el.dataset.field;
      if (['mobile', 'aadhaar', 'pincode', 'passYear', 'otp', 'experience'].includes(f)) v = v.replace(/\D/g, '');
      el.value = v;
      formState[f] = v;
      setErr(f, false);
      saveState();
    });
    el.addEventListener('change', () => { formState[el.dataset.field] = el.value; saveState(); });
  });

  // checkboxes
  document.querySelectorAll('[data-check]').forEach(el => {
    el.addEventListener('change', () => { formState[el.dataset.check] = el.checked; setErr(el.dataset.check, false); setErr('decl', false); saveState(); });
  });

  // radio chips
  document.querySelectorAll('[data-radio]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.radio;
      formState[id] = el.dataset.value;
      document.querySelectorAll(`[data-radio="${id}"]`).forEach(c => c.classList.remove('checked'));
      el.classList.add('checked');
      setErr(id, false); saveState();
    });
  });

  // exam choice
  document.querySelectorAll('[data-exam]').forEach(el => {
    el.addEventListener('click', () => {
      formState.exam = el.dataset.exam;
      document.querySelectorAll('[data-exam]').forEach(c => c.classList.remove('selected'));
      el.classList.add('selected'); saveState();
    });
  });

  // nav buttons
  const prev = document.getElementById('prevBtn');
  if (prev) prev.addEventListener('click', () => { formState.step = Math.max(0, st - 1); saveState(); renderForm(); document.getElementById('apply').scrollIntoView({ behavior: 'smooth' }); });
  const next = document.getElementById('nextBtn');
  if (next) next.addEventListener('click', () => { if (validateStep()) { formState.step = st + 1; saveState(); renderForm(); document.getElementById('apply').scrollIntoView({ behavior: 'smooth' }); } });

  // Step 1: OTP
  const sendOtp = document.getElementById('sendOtp');
  if (sendOtp) sendOtp.addEventListener('click', async () => {
    if (!/^\d{10}$/.test(formState.mobile)) { setErr('mobile', true); return; }
    sendOtp.textContent = L.sending; sendOtp.disabled = true;
    await mockApi('/api/otp', { mobile: formState.mobile });
    document.getElementById('otpArea').style.display = '';
    sendOtp.textContent = L.s1_send; sendOtp.disabled = false;
    startResendTimer();
  });
  const verifyOtp = document.getElementById('verifyOtp');
  if (verifyOtp) verifyOtp.addEventListener('click', async () => {
    const otp = document.getElementById('f_otp').value;
    if (!/^\d{6}$/.test(otp)) { setErr('otp', true); return; }
    verifyOtp.textContent = L.verifying;
    const r = await mockApi('/api/otp', { mobile: formState.mobile, otp });
    if (r.success !== false) { formState.otpVerified = true; saveState(); renderForm(); }
  });

  // Step 2: KYC
  const verifyKyc = document.getElementById('verifyKyc');
  if (verifyKyc) verifyKyc.addEventListener('click', async () => {
    let bad = false;
    if (!/^\d{12}$/.test(formState.aadhaar)) { setErr('aadhaar', true); bad = true; }
    if (!formState.kycConsent) { setErr('kycConsent', true); bad = true; }
    if (!formState.fullName.trim()) { setErr('fullName', true); bad = true; }
    if (!formState.dob) { setErr('dob', true); bad = true; }
    if (!formState.gender) { setErr('gender', true); bad = true; }
    if (bad) return;
    verifyKyc.textContent = L.verifying;
    const r = await mockApi('/api/kyc', { aadhaar: formState.aadhaar, name: formState.fullName });
    if (r.success !== false) { formState.kycVerified = true; saveState(); renderForm(); }
  });

  // Step 6: file uploads
  document.querySelectorAll('[data-doc]').forEach(box => {
    const key = box.dataset.doc;
    const inp = box.querySelector('[data-doc-input]');
    box.addEventListener('click', (e) => { if (e.target.tagName !== 'INPUT') inp.click(); });
    inp.addEventListener('change', () => {
      const file = inp.files[0]; if (!file) return;
      if (file.size > 5 * 1024 * 1024) { alert(lang === 'hi' ? 'File 5MB se chhoti honi chahiye' : 'File must be under 5MB'); return; }
      const reader = new FileReader();
      reader.onload = () => { formState.docs[key] = reader.result; saveState(); renderForm(); };
      reader.readAsDataURL(file);
    });
  });

  // Step 7: edit links
  document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', () => { formState.step = parseInt(el.dataset.goto); saveState(); renderForm(); document.getElementById('apply').scrollIntoView({ behavior: 'smooth' }); });
  });

  // Step 8: payment
  document.querySelectorAll('[data-pay]').forEach(el => {
    el.addEventListener('click', () => { formState.payMethod = el.dataset.pay; document.querySelectorAll('[data-pay]').forEach(p => p.classList.remove('selected')); el.classList.add('selected'); setErr('pay', false); saveState(); });
  });
  const payNow = document.getElementById('payNow');
  if (payNow) payNow.addEventListener('click', async () => {
    if (!formState.payMethod) { setErr('pay', true); return; }
    payNow.textContent = L.paying; payNow.disabled = true;
    const fee = feeFor(); const total = fee - Math.round(fee * discountFor());
    const r = await mockApi('/api/payment', { exam: formState.exam, method: formState.payMethod, amount: total });
    formState.appId = (r && r.appId) ? r.appId : 'KM-2026-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    formState.step = 9; saveState(); renderForm(); document.getElementById('apply').scrollIntoView({ behavior: 'smooth' });
  });

  // Step 9
  const dlPdf = document.getElementById('dlPdf');
  if (dlPdf) dlPdf.addEventListener('click', () => downloadPdf());
  const newApp = document.getElementById('newApp');
  if (newApp) newApp.addEventListener('click', () => { localStorage.removeItem(STORE_KEY); Object.assign(formState, { step: 0, exam: null, mobile: '', otpVerified: false, aadhaar: '', kycConsent: false, fullName: '', dob: '', gender: '', kycVerified: false, parentName: '', category: '', pwd: '', email: '', division: '', district: '', tehsil: '', village: '', pincode: '', address: '', qualification: '', stream: '', passYear: '', percent: '', agriBg: '', experience: '', prefDivision: '', willingLocal: '', docs: {}, declTruth: false, declAntiCorr: false, declTnc: false, payMethod: '', appId: '' }); renderForm(); });
}

let resendInt;
function startResendTimer() {
  const el = document.getElementById('resendTimer'); if (!el) return;
  let n = 30; clearInterval(resendInt);
  const tick = () => { if (!document.getElementById('resendTimer')) { clearInterval(resendInt); return; } if (n <= 0) { el.innerHTML = `<a href="#" id="resendLink" style="color:var(--green-forest)">${s().s1_resend}</a>`; clearInterval(resendInt); const rl = document.getElementById('resendLink'); if (rl) rl.addEventListener('click', (e) => { e.preventDefault(); n = 30; startResendTimer(); }); } else { el.textContent = `${s().s1_resend} (${n}s)`; n--; } };
  tick(); resendInt = setInterval(tick, 1000);
}

function downloadPdf() {
  // Generate a simple printable HTML and trigger print-to-PDF
  const exam = EXAMS.find(e => e.id === formState.exam);
  const w = window.open('', '_blank');
  const rows = [
    ['Application ID', formState.appId], ['Exam', exam ? exam.name_en : ''], ['Name', formState.fullName],
    ['Mobile', formState.mobile], ['DOB', formState.dob], ['Gender', formState.gender], ['Category', formState.category],
    ['Division', formState.division], ['District', formState.district], ['Tehsil', formState.tehsil], ['Village', formState.village],
    ['Pincode', formState.pincode], ['Qualification', formState.qualification], ['Stream', formState.stream], ['Year', formState.passYear]
  ].map(r => `<tr><td style="padding:8px;border:1px solid #ddd;color:#555">${r[0]}</td><td style="padding:8px;border:1px solid #ddd;font-weight:700">${esc(r[1] || '')}</td></tr>`).join('');
  w.document.write(`<html><head><title>${formState.appId}</title></head><body style="font-family:sans-serif;max-width:700px;margin:30px auto;padding:20px">
    <h1 style="color:#1B4D3E">Kisan Mitra Bharti Pariksha 2026</h1>
    <p style="color:#777">Application Acknowledgement</p>
    <table style="width:100%;border-collapse:collapse">${rows}</table>
    <p style="margin-top:20px;color:#777;font-size:13px">Kisan Mitra is an Argus / RKF Strategic Initiative — a private rural-development program.</p>
    <script>window.onload=function(){window.print();}<\/script></body></html>`);
  w.document.close();
}
