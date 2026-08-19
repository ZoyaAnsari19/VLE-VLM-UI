// ============================================================
// RECRUITMENT DATA MODEL — departments, positions, selectors.
// Single source of truth for the Positions Explorer, Org Hierarchy,
// Recruitment Matrix, Recruitment Stats and the Apply form's
// position picker. Add a new position by appending to POSITIONS —
// no UI component needs to change.
//
// Content for all 21 positions is sourced from the official
// "Job_Descriptions_for_RKF_Argus_positions.pdf" (Maharashtra JDs),
// condensed into summary/eligibility/responsibilities. Exam names/patterns
// and uniform fields for the 16 non-Field-Ops positions were not in the
// source PDF (it names duties, not selection process or dress code) — these
// are authored by mirroring the existing VLE/VLM/TEO/DLO exam + uniform
// conventions, approved by the client before implementation. Reporting
// chains for non-Field-Ops departments are inferred from seniorityRank
// (salary-tier order) within each department. Confirm with HR before
// publishing.
// ============================================================
import type { Department, Position, RecruitmentStats, Lang } from "./types";
import { tr } from "@/lib/kisan-mitra/localized";

export const DEPARTMENTS: Department[] = [
  {
    id: "field-operations", name_hi: "Field Operations", name_en: "Field Operations", name_mr: "क्षेत्रीय कामकाज",
    description_hi: "Village-level farmer connect — VLE se Divisional Director tak.",
    description_en: "Village-level farmer connect — from VLE to Divisional Director.",
    description_mr: "गाव पातळीवरील शेतकरी संपर्क — VLE पासून विभागीय संचालकांपर्यंत.",
    icon: "leaf", accent: "#1B4D3E",
  },
  {
    id: "sales-marketing", name_hi: "Sales & Marketing", name_en: "Sales & Marketing", name_mr: "विक्री व विपणन",
    description_hi: "Market expansion, sales strategy aur promotion.",
    description_en: "Market expansion, sales strategy and promotion.",
    description_mr: "बाजारपेठ विस्तार, विक्री धोरण आणि प्रसिद्धी.",
    icon: "market", accent: "#C99A3B",
  },
  {
    id: "business-development", name_hi: "Business Development", name_en: "Business Development", name_mr: "व्यवसाय विकास",
    description_hi: "Naye business opportunities, partnerships aur vertical growth.",
    description_en: "New business opportunities, partnerships and vertical growth.",
    description_mr: "नव्या व्यवसाय संधी, भागीदाऱ्या आणि शाखा वाढ.",
    icon: "briefcase", accent: "#8B5E34",
  },
  {
    id: "export-import", name_hi: "Export-Import", name_en: "Export-Import", name_mr: "आयात-निर्यात",
    description_hi: "Import sourcing, export shipments aur compliance.",
    description_en: "Import sourcing, export shipments and compliance.",
    description_mr: "आयात खरेदी, निर्यात पाठवणी आणि नियमपालन.",
    icon: "globe", accent: "#1A2A4A",
  },
  {
    id: "processing", name_hi: "Processing Division", name_en: "Processing Division", name_mr: "प्रक्रिया विभाग",
    description_hi: "Primary processing se storage tak ki operations.",
    description_en: "In charge of operations from primary processing to storage.",
    description_mr: "प्राथमिक प्रक्रियेपासून साठवणुकीपर्यंतचे कामकाज.",
    icon: "factory", accent: "#4A5D23",
  },
  {
    id: "corporate", name_hi: "Corporate", name_en: "Corporate", name_mr: "कॉर्पोरेट",
    description_hi: "CSR, estates, events aur corporate support functions.",
    description_en: "CSR, estates, events and corporate support functions.",
    description_mr: "सामाजिक दायित्व, मळे, कार्यक्रम आणि कॉर्पोरेट सहाय्य कार्ये.",
    icon: "building", accent: "#7A4869",
  },
];

const accentOf = (deptId: string) => DEPARTMENTS.find((d) => d.id === deptId)!.accent;

function hexToHsl(hex: string): [number, number, number] {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = ((num >> 16) & 0xff) / 255;
  const g = ((num >> 8) & 0xff) / 255;
  const b = (num & 0xff) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r: h = ((g - b) / d) % 6; break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  const sf = s / 100, lf = l / 100;
  const c = (1 - Math.abs(2 * lf - 1)) * sf;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lf - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Each position within a department gets its own distinct-but-dark color —
// rotating hue and varying saturation/lightness in a fixed dark band per
// seniority rank (instead of just lightening/darkening the base color,
// which made senior ranks collapse toward near-black and look identical).
// This keeps cards visually distinguishable within the Positions Explorer
// while staying loosely tied to the department's base hue.
const RANK_HUE_SHIFT: Record<number, number> = { 1: -18, 2: 0, 3: 16, 4: 32, 5: 48 };
const RANK_SAT_DELTA: Record<number, number> = { 1: 5, 2: 0, 3: -5, 4: 8, 5: -8 };
const RANK_LIGHTNESS: Record<number, number> = { 1: 34, 2: 27, 3: 30, 4: 23, 5: 29 };
const accentFor = (deptId: string, rank: number) => {
  const [h, s] = hexToHsl(accentOf(deptId));
  const hue = (h + (RANK_HUE_SHIFT[rank] ?? 0) + 360) % 360;
  const sat = Math.min(90, Math.max(30, s + (RANK_SAT_DELTA[rank] ?? 0)));
  const light = RANK_LIGHTNESS[rank] ?? 28;
  return hslToHex(hue, sat, light);
};

export const POSITIONS: Position[] = [
  // ---------------- FIELD OPERATIONS ----------------
  {
    id: "vle", code: "VLE", departmentId: "field-operations",
    title_hi: "Village Level Executive (VLE)", title_en: "Village Level Executive (VLE)", title_mr: "ग्राम स्तर कार्यकारी (VLE)",
    summary_hi: "3-gaon ke cluster ka mukhya kisan-sampark. Daily gaon rounds, farmer enrollment, soil testing aur fasal collection.",
    summary_en: "Primary farmer contact for a 3-village cluster — daily village rounds, farmer enrollment, soil testing and crop collection.",
    summary_mr: "3 गावांच्या समूहाचा मुख्य शेतकरी-संपर्क. दैनंदिन गाव फेऱ्या, शेतकरी नोंदणी, माती परीक्षण आणि पीक संकलन.",
    salary: 10000, salaryDisplay: "₹10,000",
    eligibility_hi: "12th pass (Agriculture/Science tarjeeh), umar 18–35 saal, do-pahiya vahan chalane ka license, cluster mein rehne ya shift hone ke liye tayyar.",
    eligibility_en: "12th pass (Agriculture/Science preferred), age 18–35, two-wheeler license, willing to be based in the assigned cluster.",
    eligibility_mr: "12वी उत्तीर्ण (कृषी/विज्ञानाला प्राधान्य), वय 18–35 वर्षे, दुचाकी चालवण्याचा परवाना, समूहात राहण्यास किंवा स्थलांतर करण्यास तयार.",
    responsibilities_hi: [
      "Gaon mein daily rounds (branded EV)",
      "Kisan registration (Aadhaar-linked)",
      "Soil testing (7-in-1 sensor)",
      "Fasal Calendar banana",
      "Sarkari scheme enrollment",
      "Fasal collection aur 48-hr UPI payment",
    ],
    responsibilities_en: [
      "Daily village rounds (branded EV)",
      "Farmer registration (Aadhaar-linked)",
      "Soil testing (7-in-1 sensor)",
      "Build the Crop Calendar",
      "Govt scheme enrollment",
      "Crop collection with 48-hr UPI payment",
    ],
    responsibilities_mr: [
      "गावात दैनंदिन फेऱ्या (ब्रँडेड EV)",
      "शेतकरी नोंदणी (आधार-संलग्न)",
      "माती परीक्षण (7-इन-1 सेन्सर)",
      "पीक दिनदर्शिका तयार करणे",
      "सरकारी योजना नोंदणी",
      "पीक संकलन आणि 48 तासांत UPI देयक",
    ],
    reportingOfficer_hi: "Village Level Manager (same cluster)",
    reportingOfficer_en: "Village Level Manager (same cluster)",
    reportingOfficer_mr: "ग्राम स्तर व्यवस्थापक (त्याच समूहातील)",
    careerPath_hi: ["Village Level Executive (VLE)", "Village Level Manager (VLM)", "Taluka Executive Officer (TEO)", "Division Level Officer", "Divisional Director"],
    careerPath_en: ["Village Level Executive (VLE)", "Village Level Manager (VLM)", "Taluka Executive Officer (TEO)", "Division Level Officer", "Divisional Director"],
    careerPath_mr: [
      "ग्राम स्तर कार्यकारी (VLE)",
      "ग्राम स्तर व्यवस्थापक (VLM)",
      "तालुका कार्यकारी अधिकारी (TEO)",
      "विभाग स्तर अधिकारी",
      "विभागीय संचालक",
    ],
    uniform_hi: "White shirt · dark green trousers · sling bag · tablet · green lanyard + ID",
    uniform_en: "White shirt · dark green trousers · sling bag · tablet · green lanyard + ID",
    uniform_mr: "पांढरा शर्ट · गडद हिरवी पँट · खांद्याची बॅग · टॅबलेट · हिरवा लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["100+ kisan registration/mahina", "3-gaon cluster ka poora coverage"],
    monthlyTargets_en: ["100+ farmer registrations/month", "full coverage of the 3-village cluster"],
    monthlyTargets_mr: [
      "100+ शेतकरी नोंदणी/महिना",
      "3 गावांच्या समूहाचे संपूर्ण कव्हरेज",
    ],
    seniorityRank: 1, accent: accentFor("field-operations", 1), applicationTrack: "exam", examId: "gram-sevak",
  },
  {
    id: "vlm", code: "VLM", departmentId: "field-operations",
    title_hi: "Village Level Manager (VLM)", title_en: "Village Level Manager (VLM)", title_mr: "ग्राम स्तर व्यवस्थापक (VLM)",
    summary_hi: "Cluster ka senior lead, VLE ke saath jodi mein — data/admin, device aur payments, bank/panchayat taalmel.",
    summary_en: "Senior cluster lead paired with the VLE — data/admin, devices and payments, bank/panchayat coordination.",
    summary_mr: "समूहाचा वरिष्ठ प्रमुख, VLE सोबत जोडीने — डेटा/प्रशासन, उपकरणे आणि देयके, बँक/पंचायत समन्वय.",
    salary: 12000, salaryDisplay: "₹12,000",
    eligibility_hi: "Graduate tarjeeh (12th minimum), umar 21–40 saal, Gram Sevak Pariksha ke top scorers, basic smartphone/computer istemal.",
    eligibility_en: "Graduate preferred (12th minimum), age 21–40, top scorers of the Gram Sevak Pariksha, basic computer/smartphone literacy.",
    eligibility_mr: "पदवीधरांना प्राधान्य (किमान 12वी), वय 21–40 वर्षे, ग्राम सेवक परीक्षेत सर्वाधिक गुण, स्मार्टफोन/संगणकाचा प्राथमिक वापर.",
    responsibilities_hi: [
      "VLE data verify karna",
      "Cluster dashboard monitor karna",
      "Bank & Panchayat liaison",
      "Kisan shikayat handle karna",
      "Payment verification (UPI settlement)",
      "Weekly report to TEO",
    ],
    responsibilities_en: [
      "Verify VLE data",
      "Monitor the cluster dashboard",
      "Bank & Panchayat liaison",
      "Handle farmer grievances",
      "Payment verification (UPI settlement)",
      "Weekly report to TEO",
    ],
    responsibilities_mr: [
      "VLE चा डेटा पडताळणे",
      "समूह डॅशबोर्डवर लक्ष ठेवणे",
      "बँक आणि पंचायत समन्वय",
      "शेतकऱ्यांच्या तक्रारी हाताळणे",
      "देयक पडताळणी (UPI जमा)",
      "TEO ला साप्ताहिक अहवाल",
    ],
    reportingOfficer_hi: "Taluka Executive Officer (TEO)", reportingOfficer_en: "Taluka Executive Officer (TEO)", reportingOfficer_mr: "तालुका कार्यकारी अधिकारी (TEO)",
    careerPath_hi: ["Village Level Manager (VLM)", "Taluka Executive Officer (TEO)", "Division Level Officer", "Divisional Director"],
    careerPath_en: ["Village Level Manager (VLM)", "Taluka Executive Officer (TEO)", "Division Level Officer", "Divisional Director"],
    careerPath_mr: [
      "ग्राम स्तर व्यवस्थापक (VLM)",
      "तालुका कार्यकारी अधिकारी (TEO)",
      "विभाग स्तर अधिकारी",
      "विभागीय संचालक",
    ],
    uniform_hi: "White shirt · dark green trousers · green tie · sling bag · tablet · green lanyard + ID",
    uniform_en: "White shirt · dark green trousers · green tie · sling bag · tablet · green lanyard + ID",
    uniform_mr: "पांढरा शर्ट · गडद हिरवी पँट · हिरवा टाय · खांद्याची बॅग · टॅबलेट · हिरवा लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["Sabhi VLE data ki weekly verification", "Cluster dashboard 100% accuracy"],
    monthlyTargets_en: ["Weekly verification of all VLE data", "100% cluster-dashboard accuracy"],
    monthlyTargets_mr: [
      "सर्व VLE डेटाची साप्ताहिक पडताळणी",
      "समूह डॅशबोर्ड 100% अचूकता",
    ],
    seniorityRank: 2, accent: accentFor("field-operations", 2), applicationTrack: "exam", examId: "gram-sevak",
  },
  {
    id: "teo", code: "TEO", departmentId: "field-operations",
    title_hi: "Taluka Executive Officer (TEO)", title_en: "Taluka Executive Officer (TEO)", title_mr: "तालुका कार्यकारी अधिकारी (TEO)",
    summary_hi: "~5 clusters, ~15 gaon ke taluka ka supervisor — bank camps, quality control, credit approvals, machinery pool aur training.",
    summary_en: "Supervisor of ~5 clusters / ~15 villages within a taluka — bank camps, quality control, credit approvals, machinery pool and training.",
    summary_mr: "सुमारे 5 समूह, सुमारे 15 गावांच्या तालुक्याचा पर्यवेक्षक — बँक शिबिरे, गुणवत्ता नियंत्रण, कर्ज मंजुरी, यंत्रसामग्री संच आणि प्रशिक्षण.",
    salary: 25000, salaryDisplay: "₹25,000",
    eligibility_hi: "Graduate (agri/management tarjeeh), umar 24–45 saal, kam se kam 2 saal field ya team-lead anubhav.",
    eligibility_en: "Graduate (agri/management preferred), age 24–45, at least 2 years of field or team-lead experience.",
    eligibility_mr: "पदवीधर (कृषी/व्यवस्थापनाला प्राधान्य), वय 24–45 वर्षे, किमान 2 वर्षे क्षेत्रीय किंवा संघ-नेतृत्वाचा अनुभव.",
    responsibilities_hi: [
      "VLM reports review aur cluster performance track karna",
      "Bank camps organize karna (200+ KCC/din)",
      "Machinery pool aur input-credit approvals manage karna",
      "Field officers ka on-ground training",
      "Grievance escalation + anti-corruption oversight",
      "Monthly taluka P&L to Division Level Officer",
    ],
    responsibilities_en: [
      "Review VLM reports and track cluster performance",
      "Organize bank camps (200+ KCC/day)",
      "Manage the machinery pool and input-credit approvals",
      "On-ground training for field officers",
      "Grievance escalation + anti-corruption oversight",
      "Monthly taluka P&L to the Division Level Officer",
    ],
    responsibilities_mr: [
      "VLM अहवाल तपासणे आणि समूह कामगिरीवर लक्ष",
      "बँक शिबिरे आयोजित करणे (200+ KCC/दिवस)",
      "यंत्रसामग्री संच आणि सामग्री-कर्ज मंजुरी व्यवस्थापित करणे",
      "क्षेत्रीय अधिकाऱ्यांचे प्रत्यक्ष प्रशिक्षण",
      "तक्रार निवारण + भ्रष्टाचारविरोधी देखरेख",
      "विभाग स्तर अधिकाऱ्याला मासिक तालुका नफा-तोटा",
    ],
    reportingOfficer_hi: "Division Level Officer", reportingOfficer_en: "Division Level Officer", reportingOfficer_mr: "विभाग स्तर अधिकारी",
    careerPath_hi: ["Taluka Executive Officer (TEO)", "Division Level Officer", "Divisional Director"],
    careerPath_en: ["Taluka Executive Officer (TEO)", "Division Level Officer", "Divisional Director"],
    careerPath_mr: [
      "तालुका कार्यकारी अधिकारी (TEO)",
      "विभाग स्तर अधिकारी",
      "विभागीय संचालक",
    ],
    uniform_hi: "White shirt · dark green blazer · green tie · formal trousers · green lanyard + ID",
    uniform_en: "White shirt · dark green blazer · green tie · formal trousers · green lanyard + ID",
    uniform_mr: "पांढरा शर्ट · गडद हिरवा ब्लेझर · हिरवा टाय · औपचारिक पँट · हिरवा लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["200+ KCC facilitation/mahina bank camps se", "Taluka-level P&L review"],
    monthlyTargets_en: ["200+ KCC facilitations/month via bank camps", "monthly taluka-level P&L review"],
    monthlyTargets_mr: [
      "बँक शिबिरांतून 200+ KCC सुविधा/महिना",
      "तालुका पातळीवर नफा-तोटा आढावा",
    ],
    seniorityRank: 3, accent: accentFor("field-operations", 3), applicationTrack: "exam", examId: "krishi-adhikari",
  },
  {
    id: "division-level-officer", code: "DLO", departmentId: "field-operations",
    title_hi: "Division Level Officer", title_en: "Division Level Officer", title_mr: "विभाग स्तर अधिकारी",
    summary_hi: "Poore revenue division ka officer — partnerships, audits, bulk deals, P&L, HQ reporting.",
    summary_en: "Officer for the entire revenue division — partnerships, audits, bulk deals, P&L, HQ reporting.",
    summary_mr: "संपूर्ण महसूल विभागाचा अधिकारी — भागीदाऱ्या, लेखापरीक्षण, मोठे व्यवहार, नफा-तोटा, मुख्यालयाला अहवाल.",
    salary: 35000, salaryDisplay: "₹35,000",
    eligibility_hi: "Graduate/Post-Graduate (agri/management tarjeeh), umar 27–50 saal, kam se kam 4 saal supervisory anubhav.",
    eligibility_en: "Graduate/Post-Graduate (agri/management preferred), age 27–50, at least 4 years of supervisory experience.",
    eligibility_mr: "पदवीधर/पदव्युत्तर (कृषी/व्यवस्थापनाला प्राधान्य), वय 27–50 वर्षे, किमान 4 वर्षे पर्यवेक्षकीय अनुभव.",
    responsibilities_hi: [
      "TEO reports consolidate (division P&L, KPIs)",
      "State-level partnerships (Agri Dept, NABARD, banks)",
      "Inter-tehsil logistics + export linkage",
      "Regulatory navigation (APMC, NBFC, DPDP)",
      "TEO performance review",
      "Monthly division report to Divisional Director",
    ],
    responsibilities_en: [
      "Consolidate TEO reports (division P&L, KPIs)",
      "State-level partnerships (Agri Dept, NABARD, banks)",
      "Inter-tehsil logistics + export linkage",
      "Regulatory navigation (APMC, NBFC, DPDP)",
      "TEO performance review",
      "Monthly division report to Divisional Director",
    ],
    responsibilities_mr: [
      "TEO अहवाल एकत्रित करणे (विभाग नफा-तोटा, निर्देशांक)",
      "राज्य पातळीवरील भागीदाऱ्या (कृषी विभाग, NABARD, बँका)",
      "आंतर-तालुका मालवाहतूक + निर्यात जोडणी",
      "नियामक बाबी (APMC, NBFC, DPDP)",
      "TEO कामगिरी आढावा",
      "विभागीय संचालकांना मासिक विभाग अहवाल",
    ],
    reportingOfficer_hi: "Divisional Director", reportingOfficer_en: "Divisional Director", reportingOfficer_mr: "विभागीय संचालक",
    careerPath_hi: ["Division Level Officer", "Divisional Director"],
    careerPath_en: ["Division Level Officer", "Divisional Director"],
    careerPath_mr: [
      "विभाग स्तर अधिकारी",
      "विभागीय संचालक",
    ],
    uniform_hi: "White shirt · dark green blazer · green tie · pocket square · green lanyard + ID",
    uniform_en: "White shirt · dark green blazer · green tie · pocket square · green lanyard + ID",
    uniform_mr: "पांढरा शर्ट · गडद हिरवा ब्लेझर · हिरवा टाय · पॉकेट स्क्वेअर · हिरवा लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["Division P&L consolidation", "State-level partnership review (quarterly)"],
    monthlyTargets_en: ["Division P&L consolidation", "quarterly state-level partnership review"],
    monthlyTargets_mr: [
      "विभाग नफा-तोटा एकत्रीकरण",
      "राज्य पातळीवरील भागीदारी आढावा (तिमाही)",
    ],
    seniorityRank: 4, accent: accentFor("field-operations", 4), applicationTrack: "exam", examId: "krishi-adhikari",
  },
  {
    id: "divisional-director", code: "DD", departmentId: "field-operations",
    title_hi: "Divisional Director", title_en: "Divisional Director", title_mr: "विभागीय संचालक",
    summary_hi: "Field Operations vertical ka apex leader — multiple divisions ki strategy, HQ liaison aur escalation ownership.",
    summary_en: "Apex leader of the Field Operations vertical — strategy across multiple divisions, HQ liaison and escalation ownership.",
    summary_mr: "क्षेत्रीय कामकाज शाखेचे सर्वोच्च नेतृत्व — अनेक विभागांचे धोरण, मुख्यालयाशी समन्वय आणि तक्रार निवारणाची जबाबदारी.",
    salary: 50000, salaryDisplay: "₹50,000",
    eligibility_hi: "Post-Graduate (agri/management tarjeeh), umar 32–55 saal, kam se kam 7 saal multi-team leadership anubhav.",
    eligibility_en: "Post-Graduate (agri/management preferred), age 32–55, at least 7 years of multi-team leadership experience.",
    eligibility_mr: "पदव्युत्तर (कृषी/व्यवस्थापनाला प्राधान्य), वय 32–55 वर्षे, किमान 7 वर्षे बहु-संघ नेतृत्वाचा अनुभव.",
    responsibilities_hi: [
      "Multiple Division Level Officers ka oversight",
      "Zonal strategy aur budget ownership",
      "HQ (Argus/RKF) reporting aur liaison",
      "Cross-division escalation resolution",
      "Senior partnership negotiations",
    ],
    responsibilities_en: [
      "Oversight of multiple Division Level Officers",
      "Zonal strategy and budget ownership",
      "HQ (Argus/RKF) reporting and liaison",
      "Cross-division escalation resolution",
      "Senior partnership negotiations",
    ],
    responsibilities_mr: [
      "अनेक विभाग स्तर अधिकाऱ्यांवर देखरेख",
      "क्षेत्रीय धोरण आणि अर्थसंकल्पाची जबाबदारी",
      "मुख्यालयाला (Argus/RKF) अहवाल आणि समन्वय",
      "आंतर-विभागीय तक्रार निवारण",
      "वरिष्ठ भागीदारी वाटाघाटी",
    ],
    reportingOfficer_hi: "Argus / RKF HQ (Mumbai)", reportingOfficer_en: "Argus / RKF HQ (Mumbai)", reportingOfficer_mr: "Argus / RKF मुख्यालय (मुंबई)",
    careerPath_hi: ["Divisional Director", "Zonal / HQ Leadership (Argus / RKF)"],
    careerPath_en: ["Divisional Director", "Zonal / HQ Leadership (Argus / RKF)"],
    careerPath_mr: [
      "विभागीय संचालक",
      "क्षेत्रीय / मुख्यालय नेतृत्व (Argus / RKF)",
    ],
    uniform_hi: "White shirt · dark green blazer · green tie · pocket square · cufflinks · green lanyard + ID",
    uniform_en: "White shirt · dark green blazer · green tie · pocket square · cufflinks · green lanyard + ID",
    uniform_mr: "पांढरा शर्ट · गडद हिरवा ब्लेझर · हिरवा टाय · पॉकेट स्क्वेअर · कफलिंक · हिरवा लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["Multi-division zonal strategy review", "HQ ko monthly performance briefing"],
    monthlyTargets_en: ["Multi-division zonal strategy review", "monthly performance briefing to HQ"],
    monthlyTargets_mr: [
      "बहु-विभागीय क्षेत्रीय धोरण आढावा",
      "मुख्यालयाला मासिक कामगिरी सादरीकरण",
    ],
    seniorityRank: 5, accent: accentFor("field-operations", 5), applicationTrack: "exam", examId: "krishi-adhikari",
  },

  // ---------------- SALES & MARKETING ----------------
  {
    id: "sales-marketing-domestic", code: "SME-D", departmentId: "sales-marketing",
    title_hi: "Sales & Marketing Executive (Domestic)", title_en: "Sales & Marketing Executive (Domestic)", title_mr: "विक्री व विपणन अधिकारी (देशांतर्गत)",
    summary_hi: "Domestic bazaar mein Kisan Mitra produce aur services ki sales-growth drive karna — buyer network, mandi/retail targets aur local campaigns.",
    summary_en: "Drives domestic-market sales growth for Kisan Mitra produce and services — buyer network, mandi/retail targets and local campaigns.",
    summary_mr: "देशांतर्गत बाजारपेठेत किसान मित्र उत्पादने आणि सेवांची विक्री वाढवणे — खरेदीदार जाळे, बाजार समिती/किरकोळ उद्दिष्टे आणि स्थानिक मोहिमा.",
    salary: 25000, salaryDisplay: "₹25,000",
    eligibility_hi: "Graduate, umar 21–40 saal, kam se kam 1 saal sales/marketing anubhav tarjeeh, Vipnan Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate, age 21–40, at least 1 year of sales/marketing experience preferred, must qualify the Vipnan Pariksha.",
    eligibility_mr: "पदवीधर, वय 21–40 वर्षे, किमान 1 वर्ष विक्री/विपणन अनुभवाला प्राधान्य, विपणन परीक्षा उत्तीर्ण होणे आवश्यक.",
    responsibilities_hi: [
      "Domestic buyer aur distributor network banana aur maintain karna",
      "Mandi/retail sales targets meet karna",
      "Pricing aur demand ka market feedback dena",
      "Local marketing campaigns aur promotions execute karna",
      "Daily/weekly sales reports Head ko submit karna",
      "New product launches ke liye market readiness assess karna",
    ],
    responsibilities_en: [
      "Build and maintain domestic buyer and distributor network",
      "Meet mandi/retail sales targets",
      "Feed back pricing and demand insights",
      "Execute local marketing campaigns and promotions",
      "Submit daily/weekly sales reports to the Head",
      "Assess market readiness for new product launches",
    ],
    responsibilities_mr: [
      "देशांतर्गत खरेदीदार आणि वितरक जाळे उभारणे व टिकवणे",
      "बाजार समिती/किरकोळ विक्री उद्दिष्टे गाठणे",
      "दर आणि मागणीचा बाजार अभिप्राय देणे",
      "स्थानिक विपणन मोहिमा आणि प्रसिद्धी राबवणे",
      "प्रमुखांना दैनंदिन/साप्ताहिक विक्री अहवाल सादर करणे",
      "नव्या उत्पादनांसाठी बाजार सज्जता तपासणे",
    ],
    reportingOfficer_hi: "Sales & Marketing Head", reportingOfficer_en: "Sales & Marketing Head", reportingOfficer_mr: "विक्री व विपणन प्रमुख",
    careerPath_hi: ["Sales & Marketing Executive (Domestic)", "Sales & Marketing Executive (International)", "Sales & Marketing Head"],
    careerPath_en: ["Sales & Marketing Executive (Domestic)", "Sales & Marketing Executive (International)", "Sales & Marketing Head"],
    careerPath_mr: [
      "विक्री व विपणन अधिकारी (देशांतर्गत)",
      "विक्री व विपणन अधिकारी (आंतरराष्ट्रीय)",
      "विक्री व विपणन प्रमुख",
    ],
    uniform_hi: "White shirt · gold-trim tie · charcoal trousers · gold lanyard + ID",
    uniform_en: "White shirt · gold-trim tie · charcoal trousers · gold lanyard + ID",
    uniform_mr: "पांढरा शर्ट · सोनेरी किनार असलेला टाय · करड्या रंगाची पँट · सोनेरी लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["Mandi/retail sales target monthly meet karna", "5+ naye distributor onboard/quarter"],
    monthlyTargets_en: ["Meet monthly mandi/retail sales target", "5+ new distributors onboarded/quarter"],
    monthlyTargets_mr: [
      "बाजार समिती/किरकोळ विक्री उद्दिष्ट दरमहा गाठणे",
      "5+ नवे वितरक जोडणे/तिमाही",
    ],
    seniorityRank: 1, accent: accentFor("sales-marketing", 1), applicationTrack: "exam", examId: "vipnan",
  },
  {
    id: "sales-marketing-international", code: "SME-I", departmentId: "sales-marketing",
    title_hi: "Sales & Marketing Executive (International)", title_en: "Sales & Marketing Executive (International)", title_mr: "विक्री व विपणन अधिकारी (आंतरराष्ट्रीय)",
    summary_hi: "International buyers aur export-linked markets ke saath sales relationships build karna, trade fairs represent karna.",
    summary_en: "Builds sales relationships with international buyers and export-linked markets, represents the brand at trade fairs.",
    summary_mr: "आंतरराष्ट्रीय खरेदीदार आणि निर्यात-संलग्न बाजारपेठांशी विक्री संबंध उभारणे, व्यापार प्रदर्शनांत प्रतिनिधित्व करणे.",
    salary: 35000, salaryDisplay: "₹35,000",
    eligibility_hi: "Graduate (International Business/Marketing tarjeeh), umar 23–42 saal, English communication strong, 1–2 saal international sales anubhav, Vipnan Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate (International Business/Marketing preferred), age 23–42, strong English communication, 1–2 years of international sales experience, must qualify the Vipnan Pariksha.",
    eligibility_mr: "पदवीधर (आंतरराष्ट्रीय व्यवसाय/विपणनाला प्राधान्य), वय 23–42 वर्षे, इंग्रजी संवाद उत्तम, 1–2 वर्षे आंतरराष्ट्रीय विक्री अनुभव, विपणन परीक्षा उत्तीर्ण होणे आवश्यक.",
    responsibilities_hi: [
      "International buyer leads generate karna",
      "Export-Import team ke saath coordinate karna",
      "Market entry aur pricing strategy support",
      "Trade fairs aur buyer meetings represent karna",
      "International compliance/documentation ke liye Export-Import team se liaison",
      "Buyer feedback aur competitor pricing track karna",
    ],
    responsibilities_en: [
      "Generate international buyer leads",
      "Coordinate with the Export-Import team",
      "Support market-entry and pricing strategy",
      "Represent the brand at trade fairs and buyer meetings",
      "Liaise with the Export-Import team on international compliance/documentation",
      "Track buyer feedback and competitor pricing",
    ],
    responsibilities_mr: [
      "आंतरराष्ट्रीय खरेदीदार संपर्क तयार करणे",
      "आयात-निर्यात संघाशी समन्वय साधणे",
      "बाजार प्रवेश आणि दर धोरणास सहाय्य",
      "व्यापार प्रदर्शने आणि खरेदीदार बैठकांत प्रतिनिधित्व",
      "आंतरराष्ट्रीय नियमपालन/कागदपत्रांसाठी आयात-निर्यात संघाशी संपर्क",
      "खरेदीदार अभिप्राय आणि स्पर्धकांचे दर यावर लक्ष",
    ],
    reportingOfficer_hi: "Sales & Marketing Head", reportingOfficer_en: "Sales & Marketing Head", reportingOfficer_mr: "विक्री व विपणन प्रमुख",
    careerPath_hi: ["Sales & Marketing Executive (International)", "Sales & Marketing Head", "Business Head"],
    careerPath_en: ["Sales & Marketing Executive (International)", "Sales & Marketing Head", "Business Head"],
    careerPath_mr: [
      "विक्री व विपणन अधिकारी (आंतरराष्ट्रीय)",
      "विक्री व विपणन प्रमुख",
      "व्यवसाय प्रमुख",
    ],
    uniform_hi: "White shirt · gold-trim tie · navy blazer · charcoal trousers · gold lanyard + ID",
    uniform_en: "White shirt · gold-trim tie · navy blazer · charcoal trousers · gold lanyard + ID",
    uniform_mr: "पांढरा शर्ट · सोनेरी किनार असलेला टाय · गडद निळा ब्लेझर · करड्या रंगाची पँट · सोनेरी लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["International buyer leads pipeline maintain karna", "2+ trade fairs/quarter represent karna"],
    monthlyTargets_en: ["Maintain international buyer lead pipeline", "represent at 2+ trade fairs/quarter"],
    monthlyTargets_mr: [
      "आंतरराष्ट्रीय खरेदीदार संपर्क सूची टिकवणे",
      "2+ व्यापार प्रदर्शनांत प्रतिनिधित्व/तिमाही",
    ],
    seniorityRank: 2, accent: accentFor("sales-marketing", 2), applicationTrack: "exam", examId: "vipnan",
  },

  // ---------------- BUSINESS DEVELOPMENT ----------------
  {
    id: "bd-executive", code: "BDE", departmentId: "business-development",
    title_hi: "Business Development Executive (MLA CTB, RBSM & Music Festival)", title_en: "Business Development Executive (MLA CTB, RBSM & Music Festival)", title_mr: "व्यवसाय विकास अधिकारी (MLA CTB, RBSM व संगीत महोत्सव)",
    summary_hi: "MLA CTB, RBSM aur Music Festival verticals ke liye naye business opportunities identify aur develop karna.",
    summary_en: "Identifies and develops new business opportunities across the MLA CTB, RBSM and Music Festival verticals.",
    summary_mr: "MLA CTB, RBSM आणि संगीत महोत्सव शाखांसाठी नव्या व्यवसाय संधी ओळखणे आणि विकसित करणे.",
    salary: 30000, salaryDisplay: "₹30,000",
    eligibility_hi: "Graduate, umar 22–40 saal, kam se kam 1–2 saal business development/event-sales anubhav, Vyavsaya Vikas Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate, age 22–40, at least 1–2 years of business development/event-sales experience, must qualify the Vyavsaya Vikas Pariksha.",
    eligibility_mr: "पदवीधर, वय 22–40 वर्षे, किमान 1–2 वर्षे व्यवसाय विकास/कार्यक्रम विक्री अनुभव, व्यवसाय विकास परीक्षा उत्तीर्ण होणे आवश्यक.",
    responsibilities_hi: [
      "MLA CTB, RBSM aur Music Festival verticals ke liye naye leads/partnerships identify karna",
      "Client/sponsor relationships manage karna",
      "Proposals aur pitch decks taiyar karna",
      "Ground-level event/venue coordination support karna",
      "Vyavsaya Vikas Pariksha ke case-study skills field mein apply karna",
      "Manager ko weekly pipeline report karna",
    ],
    responsibilities_en: [
      "Identify new leads/partnerships across MLA CTB, RBSM and Music Festival verticals",
      "Manage client/sponsor relationships",
      "Prepare proposals and pitch decks",
      "Support ground-level event/venue coordination",
      "Apply Vyavsaya Vikas Pariksha case-study skills in the field",
      "Report weekly pipeline to the Manager",
    ],
    responsibilities_mr: [
      "MLA CTB, RBSM आणि संगीत महोत्सव शाखांसाठी नवे संपर्क/भागीदाऱ्या ओळखणे",
      "ग्राहक/प्रायोजक संबंध व्यवस्थापित करणे",
      "प्रस्ताव आणि सादरीकरणे तयार करणे",
      "प्रत्यक्ष कार्यक्रम/स्थळ समन्वयात सहाय्य",
      "व्यवसाय विकास परीक्षेतील केस स्टडी कौशल्ये प्रत्यक्षात वापरणे",
      "व्यवस्थापकाला साप्ताहिक प्रगती अहवाल",
    ],
    reportingOfficer_hi: "Business Development Manager", reportingOfficer_en: "Business Development Manager", reportingOfficer_mr: "व्यवसाय विकास व्यवस्थापक",
    careerPath_hi: ["Business Development Executive", "Business Development Manager", "Business Development Head"],
    careerPath_en: ["Business Development Executive", "Business Development Manager", "Business Development Head"],
    careerPath_mr: [
      "व्यवसाय विकास अधिकारी",
      "व्यवसाय विकास व्यवस्थापक",
      "व्यवसाय विकास प्रमुख",
    ],
    uniform_hi: "Beige shirt · brown tie · bronze lanyard + ID",
    uniform_en: "Beige shirt · brown tie · bronze lanyard + ID",
    uniform_mr: "बेज शर्ट · तपकिरी टाय · कांस्य लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["10+ naye leads/mahina", "Weekly pipeline report submission"],
    monthlyTargets_en: ["10+ new leads/month", "weekly pipeline report submission"],
    monthlyTargets_mr: [
      "10+ नवे संपर्क/महिना",
      "साप्ताहिक प्रगती अहवाल सादर करणे",
    ],
    seniorityRank: 1, accent: accentFor("business-development", 1), applicationTrack: "exam", examId: "vyavsaya-vikas",
  },
  {
    id: "bd-manager", code: "BDM", departmentId: "business-development",
    title_hi: "Business Development Manager (MLA CTB, RBSM & Music Festival)", title_en: "Business Development Manager (MLA CTB, RBSM & Music Festival)", title_mr: "व्यवसाय विकास व्यवस्थापक (MLA CTB, RBSM व संगीत महोत्सव)",
    summary_hi: "MLA CTB, RBSM aur Music Festival verticals ki business-development strategy aur team lead karna.",
    summary_en: "Leads business-development strategy and team across the MLA CTB, RBSM and Music Festival verticals.",
    summary_mr: "MLA CTB, RBSM आणि संगीत महोत्सव शाखांचे व्यवसाय-विकास धोरण आणि संघ सांभाळणे.",
    salary: 45000, salaryDisplay: "₹45,000",
    eligibility_hi: "Graduate/Post-Graduate, umar 26–48 saal, kam se kam 4 saal business development anubhav, team-lead history, Vyavsaya Vikas Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate/Post-Graduate, age 26–48, at least 4 years of business development experience with a team-lead track record, must qualify the Vyavsaya Vikas Pariksha.",
    eligibility_mr: "पदवीधर/पदव्युत्तर, वय 26–48 वर्षे, किमान 4 वर्षे व्यवसाय विकास अनुभव, संघ-नेतृत्वाचा अनुभव, व्यवसाय विकास परीक्षा उत्तीर्ण होणे आवश्यक.",
    responsibilities_hi: [
      "BD Executives ki team lead karna",
      "Key-account aur sponsor relationships own karna",
      "MLA CTB, RBSM aur Music Festival verticals ki revenue targets aur strategy set karna",
      "Senior sponsor negotiations lead karna",
      "Cross-functional event coordination oversee karna",
      "Divisional Director ko monthly report",
    ],
    responsibilities_en: [
      "Lead the team of Business Development Executives",
      "Own key-account and sponsor relationships",
      "Set revenue targets and strategy across the MLA CTB, RBSM and Music Festival verticals",
      "Lead senior sponsor negotiations",
      "Oversee cross-functional event coordination",
      "Monthly reporting to the Divisional Director",
    ],
    responsibilities_mr: [
      "व्यवसाय विकास अधिकाऱ्यांचा संघ सांभाळणे",
      "प्रमुख खाती आणि प्रायोजक संबंधांची जबाबदारी",
      "MLA CTB, RBSM आणि संगीत महोत्सव शाखांची उत्पन्न उद्दिष्टे व धोरण ठरवणे",
      "वरिष्ठ प्रायोजक वाटाघाटींचे नेतृत्व",
      "आंतर-विभागीय कार्यक्रम समन्वयावर देखरेख",
      "विभागीय संचालकांना मासिक अहवाल",
    ],
    reportingOfficer_hi: "Business Development Head", reportingOfficer_en: "Business Development Head", reportingOfficer_mr: "व्यवसाय विकास प्रमुख",
    careerPath_hi: ["Business Development Manager", "Business Development Head", "Business Head"],
    careerPath_en: ["Business Development Manager", "Business Development Head", "Business Head"],
    careerPath_mr: [
      "व्यवसाय विकास व्यवस्थापक",
      "व्यवसाय विकास प्रमुख",
      "व्यवसाय प्रमुख",
    ],
    uniform_hi: "Beige shirt · brown blazer · brown tie · bronze lanyard + ID",
    uniform_en: "Beige shirt · brown blazer · brown tie · bronze lanyard + ID",
    uniform_mr: "बेज शर्ट · तपकिरी ब्लेझर · तपकिरी टाय · कांस्य लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["Revenue target ownership (quarterly)", "Team ki 10+ leads/mahina pipeline review"],
    monthlyTargets_en: ["Quarterly revenue-target ownership", "review team's 10+ leads/month pipeline"],
    monthlyTargets_mr: [
      "उत्पन्न उद्दिष्टाची जबाबदारी (तिमाही)",
      "संघाच्या 10+ संपर्क/महिना प्रगतीचा आढावा",
    ],
    seniorityRank: 2, accent: accentFor("business-development", 2), applicationTrack: "exam", examId: "vyavsaya-vikas",
  },

  // ---------------- EXPORT-IMPORT ----------------
  {
    id: "import-manager", code: "IM", departmentId: "export-import",
    title_hi: "Import Manager", title_en: "Import Manager", title_mr: "आयात व्यवस्थापक",
    summary_hi: "Kisan Mitra ecosystem ke liye imported inputs/equipment ki sourcing aur compliance manage karna.",
    summary_en: "Manages sourcing and compliance for imported inputs/equipment for the Kisan Mitra ecosystem.",
    summary_mr: "किसान मित्र इकोसिस्टमसाठी आयात केलेली सामग्री/उपकरणे यांची खरेदी आणि नियमपालन व्यवस्थापित करणे.",
    salary: 35000, salaryDisplay: "₹35,000",
    eligibility_hi: "Graduate (International Trade/Supply Chain tarjeeh), umar 25–45 saal, kam se kam 2–3 saal import operations anubhav, Vyapar Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate (International Trade/Supply Chain preferred), age 25–45, at least 2–3 years of import-operations experience, must qualify the Vyapar Pariksha.",
    eligibility_mr: "पदवीधर (आंतरराष्ट्रीय व्यापार/पुरवठा साखळीला प्राधान्य), वय 25–45 वर्षे, किमान 2–3 वर्षे आयात कामकाजाचा अनुभव, व्यापार परीक्षा उत्तीर्ण होणे आवश्यक.",
    responsibilities_hi: [
      "Overseas suppliers ke saath sourcing negotiate karna",
      "Customs, duties (DGFT/Customs/FEMA) aur documentation manage karna",
      "Shipment timelines aur quality checks track karna",
      "Import cost aur landed-price analysis karna",
      "Vendor compliance audits karna",
      "Director ko report karna",
    ],
    responsibilities_en: [
      "Negotiate sourcing with overseas suppliers",
      "Manage customs, duties (DGFT/Customs/FEMA) and documentation",
      "Track shipment timelines and quality checks",
      "Import-cost and landed-price analysis",
      "Vendor compliance audits",
      "Report to the Director",
    ],
    responsibilities_mr: [
      "परदेशी पुरवठादारांशी खरेदी वाटाघाटी",
      "सीमाशुल्क, कर (DGFT/Customs/FEMA) आणि कागदपत्रे व्यवस्थापित करणे",
      "पाठवणीच्या मुदती आणि गुणवत्ता तपासणीवर लक्ष",
      "आयात खर्च आणि एकूण किंमत विश्लेषण",
      "पुरवठादार नियमपालन तपासणी",
      "संचालकांना अहवाल",
    ],
    reportingOfficer_hi: "Director (Export & Import / International Trade)", reportingOfficer_en: "Director (Export & Import / International Trade)", reportingOfficer_mr: "संचालक (आयात-निर्यात / आंतरराष्ट्रीय व्यापार)",
    careerPath_hi: ["Import Manager", "Director (Export & Import / International Trade)"],
    careerPath_en: ["Import Manager", "Director (Export & Import / International Trade)"],
    careerPath_mr: [
      "आयात व्यवस्थापक",
      "संचालक (आयात-निर्यात / आंतरराष्ट्रीय व्यापार)",
    ],
    uniform_hi: "White shirt · navy tie · navy trousers · navy lanyard + ID",
    uniform_en: "White shirt · navy tie · navy trousers · navy lanyard + ID",
    uniform_mr: "पांढरा शर्ट · गडद निळा टाय · गडद निळी पँट · गडद निळा लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["Import shipment timelines 95%+ on-time", "Vendor compliance audit monthly"],
    monthlyTargets_en: ["95%+ on-time import shipments", "monthly vendor compliance audit"],
    monthlyTargets_mr: [
      "आयात पाठवणी मुदतीत 95%+ वेळेवर",
      "पुरवठादार नियमपालन तपासणी दरमहा",
    ],
    seniorityRank: 1, accent: accentFor("export-import", 1), applicationTrack: "exam", examId: "vyapar",
  },
  {
    id: "export-manager", code: "EM", departmentId: "export-import",
    title_hi: "Export Manager", title_en: "Export Manager", title_mr: "निर्यात व्यवस्थापक",
    summary_hi: "Kisan Mitra produce ke liye international buyers ko export shipments manage karna.",
    summary_en: "Manages export shipments of Kisan Mitra produce to international buyers.",
    summary_mr: "किसान मित्र उत्पादनांसाठी आंतरराष्ट्रीय खरेदीदारांना होणारी निर्यात व्यवस्थापित करणे.",
    salary: 45000, salaryDisplay: "₹45,000",
    eligibility_hi: "Graduate (International Trade/Agribusiness tarjeeh), umar 26–46 saal, kam se kam 3 saal export operations anubhav, Vyapar Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate (International Trade/Agribusiness preferred), age 26–46, at least 3 years of export-operations experience, must qualify the Vyapar Pariksha.",
    eligibility_mr: "पदवीधर (आंतरराष्ट्रीय व्यापार/कृषी व्यवसायाला प्राधान्य), वय 26–46 वर्षे, किमान 3 वर्षे निर्यात कामकाजाचा अनुभव, व्यापार परीक्षा उत्तीर्ण होणे आवश्यक.",
    responsibilities_hi: [
      "International buyer contracts negotiate karna",
      "Export documentation aur compliance (Certificate of Origin, DGFT) handle karna",
      "Quality aur packaging standards ensure karna",
      "Freight forwarders aur logistics partners coordinate karna",
      "Export realization aur payment collection track karna",
      "Director ko report karna",
    ],
    responsibilities_en: [
      "Negotiate international buyer contracts",
      "Handle export documentation and compliance (Certificate of Origin, DGFT)",
      "Ensure quality and packaging standards",
      "Coordinate freight forwarders and logistics partners",
      "Track export realization and payment collection",
      "Report to the Director",
    ],
    responsibilities_mr: [
      "आंतरराष्ट्रीय खरेदीदार करार वाटाघाटी",
      "निर्यात कागदपत्रे आणि नियमपालन (मूळ प्रमाणपत्र, DGFT) हाताळणे",
      "गुणवत्ता आणि पॅकेजिंग मानके सुनिश्चित करणे",
      "मालवाहतूकदार आणि पुरवठा भागीदारांशी समन्वय",
      "निर्यात वसुली आणि देयक संकलनावर लक्ष",
      "संचालकांना अहवाल",
    ],
    reportingOfficer_hi: "Director (Export & Import / International Trade)", reportingOfficer_en: "Director (Export & Import / International Trade)", reportingOfficer_mr: "संचालक (आयात-निर्यात / आंतरराष्ट्रीय व्यापार)",
    careerPath_hi: ["Export Manager", "Director (Export & Import / International Trade)"],
    careerPath_en: ["Export Manager", "Director (Export & Import / International Trade)"],
    careerPath_mr: [
      "निर्यात व्यवस्थापक",
      "संचालक (आयात-निर्यात / आंतरराष्ट्रीय व्यापार)",
    ],
    uniform_hi: "White shirt · navy tie · navy trousers · navy lanyard + ID",
    uniform_en: "White shirt · navy tie · navy trousers · navy lanyard + ID",
    uniform_mr: "पांढरा शर्ट · गडद निळा टाय · गडद निळी पँट · गडद निळा लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["Export shipment quality-compliance 100%", "Payment collection cycle track karna"],
    monthlyTargets_en: ["100% export shipment quality compliance", "track payment-collection cycle"],
    monthlyTargets_mr: [
      "निर्यात पाठवणी गुणवत्ता-नियमपालन 100%",
      "देयक संकलन चक्रावर लक्ष",
    ],
    seniorityRank: 2, accent: accentFor("export-import", 2), applicationTrack: "exam", examId: "vyapar",
  },
  {
    id: "export-import-director", code: "EID", departmentId: "export-import",
    title_hi: "Director (Export & Import / International Trade)", title_en: "Director (Export & Import / International Trade)", title_mr: "संचालक (आयात-निर्यात / आंतरराष्ट्रीय व्यापार)",
    summary_hi: "Export-Import vertical ki poori strategy, compliance aur P&L ka ownership — Import/Export Managers ka oversight.",
    summary_en: "Owns the entire Export-Import vertical's strategy, compliance and P&L — oversight of Import/Export Managers.",
    summary_mr: "आयात-निर्यात शाखेचे संपूर्ण धोरण, नियमपालन आणि नफा-तोट्याची जबाबदारी — आयात/निर्यात व्यवस्थापकांवर देखरेख.",
    salary: 150000, salaryDisplay: "₹1,50,000",
    eligibility_hi: "Post-Graduate (International Trade/MBA tarjeeh), umar 35–58 saal, kam se kam 8–10 saal senior trade-leadership anubhav, Vyapar Nideshak Pariksha qualify karna zaroori.",
    eligibility_en: "Post-Graduate (International Trade/MBA preferred), age 35–58, at least 8–10 years of senior trade-leadership experience, must qualify the Vyapar Nideshak Pariksha.",
    eligibility_mr: "पदव्युत्तर (आंतरराष्ट्रीय व्यापार/MBA ला प्राधान्य), वय 35–58 वर्षे, किमान 8–10 वर्षे वरिष्ठ व्यापार-नेतृत्वाचा अनुभव, व्यापार निदेशक परीक्षा उत्तीर्ण होणे आवश्यक.",
    responsibilities_hi: [
      "Import aur Export Managers ka oversight",
      "International trade policy aur regulatory compliance ownership",
      "Strategic buyer/supplier partnerships negotiate karna",
      "Joint ventures aur market-entry strategy lead karna",
      "HQ ko vertical P&L report karna",
    ],
    responsibilities_en: [
      "Oversight of the Import and Export Managers",
      "Ownership of international trade policy and regulatory compliance",
      "Negotiate strategic buyer/supplier partnerships",
      "Lead joint ventures and market-entry strategy",
      "Report vertical P&L to HQ",
    ],
    responsibilities_mr: [
      "आयात आणि निर्यात व्यवस्थापकांवर देखरेख",
      "आंतरराष्ट्रीय व्यापार धोरण आणि नियमपालनाची जबाबदारी",
      "धोरणात्मक खरेदीदार/पुरवठादार भागीदाऱ्या वाटाघाटी",
      "संयुक्त उपक्रम आणि बाजार प्रवेश धोरणाचे नेतृत्व",
      "मुख्यालयाला शाखेचा नफा-तोटा अहवाल",
    ],
    reportingOfficer_hi: "Argus / RKF HQ (Mumbai)", reportingOfficer_en: "Argus / RKF HQ (Mumbai)", reportingOfficer_mr: "Argus / RKF मुख्यालय (मुंबई)",
    careerPath_hi: ["Director (Export & Import / International Trade)", "Zonal / HQ Leadership (Argus / RKF)"],
    careerPath_en: ["Director (Export & Import / International Trade)", "Zonal / HQ Leadership (Argus / RKF)"],
    careerPath_mr: [
      "संचालक (आयात-निर्यात / आंतरराष्ट्रीय व्यापार)",
      "क्षेत्रीय / मुख्यालय नेतृत्व (Argus / RKF)",
    ],
    uniform_hi: "White shirt · navy blazer · navy tie · pocket square · navy lanyard + ID",
    uniform_en: "White shirt · navy blazer · navy tie · pocket square · navy lanyard + ID",
    uniform_mr: "पांढरा शर्ट · गडद निळा ब्लेझर · गडद निळा टाय · पॉकेट स्क्वेअर · गडद निळा लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["Vertical P&L review (monthly)", "Strategic partnership pipeline (quarterly)"],
    monthlyTargets_en: ["Monthly vertical P&L review", "quarterly strategic-partnership pipeline"],
    monthlyTargets_mr: [
      "शाखेचा नफा-तोटा आढावा (मासिक)",
      "धोरणात्मक भागीदारी सूची (तिमाही)",
    ],
    seniorityRank: 3, accent: accentFor("export-import", 3), applicationTrack: "exam", examId: "vyapar-nideshak",
  },

  // ---------------- PROCESSING DIVISION ----------------
  {
    id: "primary-processing-centre", code: "PPC", departmentId: "processing",
    title_hi: "Primary Processing Centre (PPC) Executive", title_en: "Primary Processing Centre (PPC) Executive", title_mr: "प्राथमिक प्रक्रिया केंद्र (PPC) अधिकारी",
    summary_hi: "Village-cluster level primary processing centre ka daily operations executive — grading, sorting aur quality logging.",
    summary_en: "Day-to-day operations executive of a village-cluster-level primary processing centre — grading, sorting and quality logging.",
    summary_mr: "गाव-समूह पातळीवरील प्राथमिक प्रक्रिया केंद्राचा दैनंदिन कामकाज अधिकारी — प्रतवारी, वर्गीकरण आणि गुणवत्ता नोंदणी.",
    salary: 25000, salaryDisplay: "₹25,000",
    eligibility_hi: "12th/Graduate, umar 21–45 saal, basic food-handling/quality-check training, Prakriya Pariksha qualify karna zaroori.",
    eligibility_en: "12th/Graduate, age 21–45, basic food-handling/quality-check training, must qualify the Prakriya Pariksha.",
    eligibility_mr: "12वी/पदवीधर, वय 21–45 वर्षे, अन्न हाताळणी/गुणवत्ता तपासणीचे प्राथमिक प्रशिक्षण, प्रक्रिया परीक्षा उत्तीर्ण होणे आवश्यक.",
    responsibilities_hi: [
      "Incoming produce ki grading aur sorting",
      "Basic cleaning/processing equipment chalana",
      "Daily throughput aur wastage log karna",
      "FSSAI hygiene standards maintain karna",
      "District Processing Centre ko report karna",
    ],
    responsibilities_en: [
      "Grade and sort incoming produce",
      "Operate basic cleaning/processing equipment",
      "Log daily throughput and wastage",
      "Maintain FSSAI hygiene standards",
      "Report to the District Processing Centre",
    ],
    responsibilities_mr: [
      "येणाऱ्या मालाची प्रतवारी आणि वर्गीकरण",
      "प्राथमिक स्वच्छता/प्रक्रिया यंत्रे चालवणे",
      "दैनंदिन उत्पादन आणि नासाडीची नोंद",
      "FSSAI स्वच्छता मानके पाळणे",
      "जिल्हा प्रक्रिया केंद्राला अहवाल",
    ],
    reportingOfficer_hi: "District Processing Centre (DPC) Executive", reportingOfficer_en: "District Processing Centre (DPC) Executive", reportingOfficer_mr: "जिल्हा प्रक्रिया केंद्र (DPC) अधिकारी",
    careerPath_hi: ["Primary Processing Centre (PPC) Executive", "District Processing Centre (DPC) Executive", "Warehouse Manager", "Food Processing Unit Manager", "Storage Manager"],
    careerPath_en: ["Primary Processing Centre (PPC) Executive", "District Processing Centre (DPC) Executive", "Warehouse Manager", "Food Processing Unit Manager", "Storage Manager"],
    careerPath_mr: [
      "प्राथमिक प्रक्रिया केंद्र (PPC) अधिकारी",
      "जिल्हा प्रक्रिया केंद्र (DPC) अधिकारी",
      "गोदाम व्यवस्थापक",
      "अन्न प्रक्रिया केंद्र व्यवस्थापक",
      "साठवण व्यवस्थापक",
    ],
    uniform_hi: "Olive-green shirt · apron · hairnet/cap · olive lanyard + ID",
    uniform_en: "Olive-green shirt · apron · hairnet/cap · olive lanyard + ID",
    uniform_mr: "ऑलिव्ह-हिरवा शर्ट · एप्रन · केसांची जाळी/टोपी · ऑलिव्ह लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["Daily throughput log 100% completion", "Wastage under 5%"],
    monthlyTargets_en: ["100% daily throughput logging", "wastage kept under 5%"],
    monthlyTargets_mr: [
      "दैनंदिन उत्पादन नोंद 100% पूर्ण",
      "नासाडी 5% पेक्षा कमी",
    ],
    seniorityRank: 1, accent: accentFor("processing", 1), applicationTrack: "exam", examId: "prakriya",
  },
  {
    id: "district-processing-centre", code: "DPC", departmentId: "processing",
    title_hi: "District Processing Centre (DPC) Executive", title_en: "District Processing Centre (DPC) Executive", title_mr: "जिल्हा प्रक्रिया केंद्र (DPC) अधिकारी",
    summary_hi: "District-level processing centre ka operations aur quality-control executive.",
    summary_en: "Operations and quality-control executive of a district-level processing centre.",
    summary_mr: "जिल्हा पातळीवरील प्रक्रिया केंद्राचा कामकाज आणि गुणवत्ता-नियंत्रण अधिकारी.",
    salary: 30000, salaryDisplay: "₹30,000",
    eligibility_hi: "Graduate (Food Technology/Agriculture tarjeeh), umar 23–48 saal, kam se kam 1–2 saal processing-unit anubhav, Prakriya Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate (Food Technology/Agriculture preferred), age 23–48, at least 1–2 years of processing-unit experience, must qualify the Prakriya Pariksha.",
    eligibility_mr: "पदवीधर (अन्न तंत्रज्ञान/कृषीला प्राधान्य), वय 23–48 वर्षे, किमान 1–2 वर्षे प्रक्रिया केंद्राचा अनुभव, प्रक्रिया परीक्षा उत्तीर्ण होणे आवश्यक.",
    responsibilities_hi: [
      "Multiple PPC Executives ka oversight",
      "Quality-control standards enforce karna",
      "Inventory aur dispatch coordinate karna",
      "Processing-unit audits conduct karna",
      "Warehouse Manager ko report karna",
    ],
    responsibilities_en: [
      "Oversight of multiple PPC Executives",
      "Enforce quality-control standards",
      "Coordinate inventory and dispatch",
      "Conduct processing-unit audits",
      "Report to the Warehouse Manager",
    ],
    responsibilities_mr: [
      "अनेक प्राथमिक प्रक्रिया केंद्र अधिकाऱ्यांवर देखरेख",
      "गुणवत्ता-नियंत्रण मानकांची अंमलबजावणी",
      "साठा आणि रवानगीचा समन्वय",
      "प्रक्रिया केंद्रांची तपासणी",
      "गोदाम व्यवस्थापकाला अहवाल",
    ],
    reportingOfficer_hi: "Warehouse Manager", reportingOfficer_en: "Warehouse Manager", reportingOfficer_mr: "गोदाम व्यवस्थापक",
    careerPath_hi: ["District Processing Centre (DPC) Executive", "Warehouse Manager", "Food Processing Unit Manager", "Storage Manager"],
    careerPath_en: ["District Processing Centre (DPC) Executive", "Warehouse Manager", "Food Processing Unit Manager", "Storage Manager"],
    careerPath_mr: [
      "जिल्हा प्रक्रिया केंद्र (DPC) अधिकारी",
      "गोदाम व्यवस्थापक",
      "अन्न प्रक्रिया केंद्र व्यवस्थापक",
      "साठवण व्यवस्थापक",
    ],
    uniform_hi: "Olive-green shirt · olive tie · apron (audits ke alawa) · olive lanyard + ID",
    uniform_en: "Olive-green shirt · olive tie · apron (except audits) · olive lanyard + ID",
    uniform_mr: "ऑलिव्ह-हिरवा शर्ट · ऑलिव्ह टाय · एप्रन (लेखापरीक्षण वगळता) · ऑलिव्ह लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["PPC audit coverage 100%", "Dispatch SLA 95%+ on-time"],
    monthlyTargets_en: ["100% PPC audit coverage", "95%+ on-time dispatch SLA"],
    monthlyTargets_mr: [
      "प्राथमिक प्रक्रिया केंद्र तपासणी 100%",
      "रवानगी 95%+ वेळेवर",
    ],
    seniorityRank: 2, accent: accentFor("processing", 2), applicationTrack: "exam", examId: "prakriya",
  },
  {
    id: "warehouse-manager", code: "WM", departmentId: "processing",
    title_hi: "Warehouse Manager", title_en: "Warehouse Manager", title_mr: "गोदाम व्यवस्थापक",
    summary_hi: "Warehousing operations, inventory accuracy aur dispatch efficiency ka ownership.",
    summary_en: "Owns warehousing operations, inventory accuracy and dispatch efficiency.",
    summary_mr: "गोदाम कामकाज, साठा अचूकता आणि रवानगी कार्यक्षमतेची जबाबदारी.",
    salary: 45000, salaryDisplay: "₹45,000",
    eligibility_hi: "Graduate (Supply Chain/Logistics tarjeeh), umar 25–50 saal, kam se kam 3 saal warehouse/logistics anubhav, Prakriya Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate (Supply Chain/Logistics preferred), age 25–50, at least 3 years of warehouse/logistics experience, must qualify the Prakriya Pariksha.",
    eligibility_mr: "पदवीधर (पुरवठा साखळी/मालवाहतुकीला प्राधान्य), वय 25–50 वर्षे, किमान 3 वर्षे गोदाम/मालवाहतूक अनुभव, प्रक्रिया परीक्षा उत्तीर्ण होणे आवश्यक.",
    responsibilities_hi: [
      "Multiple District Processing Centres se coordinate karna",
      "Inventory accuracy aur stock audits",
      "Dispatch scheduling aur logistics",
      "FIFO/FEFO storage practices enforce karna",
      "Food Processing Unit Manager ko report karna",
    ],
    responsibilities_en: [
      "Coordinate with multiple District Processing Centres",
      "Inventory accuracy and stock audits",
      "Dispatch scheduling and logistics",
      "Enforce FIFO/FEFO storage practices",
      "Report to the Food Processing Unit Manager",
    ],
    responsibilities_mr: [
      "अनेक जिल्हा प्रक्रिया केंद्रांशी समन्वय",
      "साठा अचूकता आणि साठा तपासणी",
      "रवानगी नियोजन आणि मालवाहतूक",
      "FIFO/FEFO साठवण पद्धतींची अंमलबजावणी",
      "अन्न प्रक्रिया केंद्र व्यवस्थापकाला अहवाल",
    ],
    reportingOfficer_hi: "Food Processing Unit Manager", reportingOfficer_en: "Food Processing Unit Manager", reportingOfficer_mr: "अन्न प्रक्रिया केंद्र व्यवस्थापक",
    careerPath_hi: ["Warehouse Manager", "Food Processing Unit Manager", "Storage Manager"],
    careerPath_en: ["Warehouse Manager", "Food Processing Unit Manager", "Storage Manager"],
    careerPath_mr: [
      "गोदाम व्यवस्थापक",
      "अन्न प्रक्रिया केंद्र व्यवस्थापक",
      "साठवण व्यवस्थापक",
    ],
    uniform_hi: "Olive-green shirt · high-vis vest · safety shoes · olive lanyard + ID",
    uniform_en: "Olive-green shirt · high-vis vest · safety shoes · olive lanyard + ID",
    uniform_mr: "ऑलिव्ह-हिरवा शर्ट · चमकदार जाकीट · सुरक्षा बूट · ऑलिव्ह लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["Inventory accuracy 98%+", "Dispatch scheduling SLA compliance"],
    monthlyTargets_en: ["98%+ inventory accuracy", "dispatch-scheduling SLA compliance"],
    monthlyTargets_mr: [
      "साठा अचूकता 98%+",
      "रवानगी नियोजन वेळापत्रकाचे पालन",
    ],
    seniorityRank: 3, accent: accentFor("processing", 3), applicationTrack: "exam", examId: "prakriya",
  },
  {
    id: "food-processing-unit-manager", code: "FPUM", departmentId: "processing",
    title_hi: "Food Processing Unit Manager", title_en: "Food Processing Unit Manager", title_mr: "अन्न प्रक्रिया केंद्र व्यवस्थापक",
    summary_hi: "Food processing unit ki production, safety-compliance aur output-quality ka ownership.",
    summary_en: "Owns production, safety compliance and output quality at a food processing unit.",
    summary_mr: "अन्न प्रक्रिया केंद्राचे उत्पादन, सुरक्षा-नियमपालन आणि उत्पादन गुणवत्तेची जबाबदारी.",
    salary: 50000, salaryDisplay: "₹50,000",
    eligibility_hi: "Graduate/Post-Graduate (Food Technology tarjeeh), umar 27–52 saal, kam se kam 4–5 saal food-processing-plant anubhav, Prakriya Prabandhak Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate/Post-Graduate (Food Technology preferred), age 27–52, at least 4–5 years of food-processing-plant experience, must qualify the Prakriya Prabandhak Pariksha.",
    eligibility_mr: "पदवीधर/पदव्युत्तर (अन्न तंत्रज्ञानाला प्राधान्य), वय 27–52 वर्षे, किमान 4–5 वर्षे अन्न प्रक्रिया केंद्राचा अनुभव, प्रक्रिया प्रबंधक परीक्षा उत्तीर्ण होणे आवश्यक.",
    responsibilities_hi: [
      "Production planning aur unit output ownership",
      "Food-safety aur compliance standards (FSSAI, HACCP)",
      "Warehouse Managers ke saath coordination",
      "Team training aur equipment maintenance oversight",
      "Storage Manager ko report karna",
    ],
    responsibilities_en: [
      "Own production planning and unit output",
      "Food-safety and compliance standards (FSSAI, HACCP)",
      "Coordinate with Warehouse Managers",
      "Oversee team training and equipment maintenance",
      "Report to the Storage Manager",
    ],
    responsibilities_mr: [
      "उत्पादन नियोजन आणि केंद्राच्या उत्पादनाची जबाबदारी",
      "अन्न-सुरक्षा आणि नियमपालन मानके (FSSAI, HACCP)",
      "गोदाम व्यवस्थापकांशी समन्वय",
      "संघ प्रशिक्षण आणि यंत्र देखभालीवर देखरेख",
      "साठवण व्यवस्थापकाला अहवाल",
    ],
    reportingOfficer_hi: "Storage Manager", reportingOfficer_en: "Storage Manager", reportingOfficer_mr: "साठवण व्यवस्थापक",
    careerPath_hi: ["Food Processing Unit Manager", "Storage Manager"],
    careerPath_en: ["Food Processing Unit Manager", "Storage Manager"],
    careerPath_mr: [
      "अन्न प्रक्रिया केंद्र व्यवस्थापक",
      "साठवण व्यवस्थापक",
    ],
    uniform_hi: "Olive-green shirt · olive tie · lab coat (floor visits) · olive lanyard + ID",
    uniform_en: "Olive-green shirt · olive tie · lab coat (on floor visits) · olive lanyard + ID",
    uniform_mr: "ऑलिव्ह-हिरवा शर्ट · ऑलिव्ह टाय · लॅब कोट (केंद्र भेटीत) · ऑलिव्ह लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["Production output target meet karna", "HACCP compliance audit 100%"],
    monthlyTargets_en: ["Meet production-output target", "100% HACCP compliance audit"],
    monthlyTargets_mr: [
      "उत्पादन उद्दिष्ट गाठणे",
      "HACCP नियमपालन तपासणी 100%",
    ],
    seniorityRank: 4, accent: accentFor("processing", 4), applicationTrack: "exam", examId: "prakriya-prabandhak",
  },
  {
    id: "storage-manager", code: "SM", departmentId: "processing",
    title_hi: "Storage Manager", title_en: "Storage Manager", title_mr: "साठवण व्यवस्थापक",
    summary_hi: "Processing Division ki storage-network strategy, capacity planning aur loss-prevention ka apex ownership.",
    summary_en: "Apex ownership of the Processing Division's storage-network strategy, capacity planning and loss prevention.",
    summary_mr: "प्रक्रिया विभागाच्या साठवण जाळ्याचे धोरण, क्षमता नियोजन आणि नुकसान-प्रतिबंधाची सर्वोच्च जबाबदारी.",
    salary: 75000, salaryDisplay: "₹75,000",
    eligibility_hi: "Post-Graduate (Supply Chain/Agribusiness tarjeeh), umar 30–55 saal, kam se kam 6–8 saal storage/cold-chain-leadership anubhav, Prakriya Prabandhak Pariksha qualify karna zaroori.",
    eligibility_en: "Post-Graduate (Supply Chain/Agribusiness preferred), age 30–55, at least 6–8 years of storage/cold-chain leadership experience, must qualify the Prakriya Prabandhak Pariksha.",
    eligibility_mr: "पदव्युत्तर (पुरवठा साखळी/कृषी व्यवसायाला प्राधान्य), वय 30–55 वर्षे, किमान 6–8 वर्षे साठवण/शीतसाखळी नेतृत्वाचा अनुभव, प्रक्रिया प्रबंधक परीक्षा उत्तीर्ण होणे आवश्यक.",
    responsibilities_hi: [
      "Poore storage/warehousing network ka oversight",
      "Capacity planning aur loss-prevention strategy",
      "Food Processing Unit Managers ka performance review",
      "Storage-network budget aur capex planning",
      "Processing Division Head/HQ ko report karna",
    ],
    responsibilities_en: [
      "Oversight of the entire storage/warehousing network",
      "Capacity-planning and loss-prevention strategy",
      "Performance review of Food Processing Unit Managers",
      "Storage-network budget and capex planning",
      "Report to the Processing Division Head/HQ",
    ],
    responsibilities_mr: [
      "संपूर्ण साठवण/गोदाम जाळ्यावर देखरेख",
      "क्षमता नियोजन आणि नुकसान-प्रतिबंध धोरण",
      "अन्न प्रक्रिया केंद्र व्यवस्थापकांच्या कामगिरीचा आढावा",
      "साठवण जाळ्याचा अर्थसंकल्प आणि भांडवली नियोजन",
      "प्रक्रिया विभाग प्रमुख/मुख्यालयाला अहवाल",
    ],
    reportingOfficer_hi: "Processing Division Head", reportingOfficer_en: "Processing Division Head", reportingOfficer_mr: "प्रक्रिया विभाग प्रमुख",
    careerPath_hi: ["Storage Manager", "Processing Division Head"],
    careerPath_en: ["Storage Manager", "Processing Division Head"],
    careerPath_mr: [
      "साठवण व्यवस्थापक",
      "प्रक्रिया विभाग प्रमुख",
    ],
    uniform_hi: "Olive-green shirt · olive blazer · olive tie · olive lanyard + ID",
    uniform_en: "Olive-green shirt · olive blazer · olive tie · olive lanyard + ID",
    uniform_mr: "ऑलिव्ह-हिरवा शर्ट · ऑलिव्ह ब्लेझर · ऑलिव्ह टाय · ऑलिव्ह लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["Network-wide loss-prevention review", "Quarterly capex plan submission"],
    monthlyTargets_en: ["Network-wide loss-prevention review", "quarterly capex plan submission"],
    monthlyTargets_mr: [
      "संपूर्ण जाळ्यातील नुकसान-प्रतिबंध आढावा",
      "तिमाही भांडवली योजना सादर करणे",
    ],
    seniorityRank: 5, accent: accentFor("processing", 5), applicationTrack: "exam", examId: "prakriya-prabandhak",
  },

  // ---------------- CORPORATE ----------------
  {
    id: "csr-executive", code: "CSR", departmentId: "corporate",
    title_hi: "CSR Executive", title_en: "CSR Executive", title_mr: "सामाजिक दायित्व अधिकारी",
    summary_hi: "Kisan Mitra ke corporate social responsibility programs plan aur execute karna.",
    summary_en: "Plans and executes Kisan Mitra's corporate social responsibility programs.",
    summary_mr: "किसान मित्रच्या सामाजिक दायित्व कार्यक्रमांचे नियोजन आणि अंमलबजावणी.",
    salary: 25000, salaryDisplay: "₹25,000",
    eligibility_hi: "Graduate (Social Work/Rural Development tarjeeh), umar 22–42 saal, community-engagement anubhav tarjeeh, Samuday Vikas Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate (Social Work/Rural Development preferred), age 22–42, community-engagement experience preferred, must qualify the Samuday Vikas Pariksha.",
    eligibility_mr: "पदवीधर (समाजकार्य/ग्रामीण विकासाला प्राधान्य), वय 22–42 वर्षे, समुदाय सहभागाच्या अनुभवाला प्राधान्य, समुदाय विकास परीक्षा उत्तीर्ण होणे आवश्यक.",
    responsibilities_hi: [
      "CSR project execution aur ground-level coordination",
      "Companies Act, 2013 Schedule VII ke tehat eligible activities identify karna",
      "Community partner relationships manage karna",
      "Impact data collect aur report karna",
      "Corporate Affairs Head ko report karna",
    ],
    responsibilities_en: [
      "CSR project execution and ground-level coordination",
      "Identify Schedule VII (Companies Act, 2013) eligible CSR activities",
      "Manage community-partner relationships",
      "Collect and report impact data",
      "Report to the Corporate Affairs Head",
    ],
    responsibilities_mr: [
      "सामाजिक दायित्व प्रकल्पांची अंमलबजावणी आणि प्रत्यक्ष समन्वय",
      "कंपनी कायदा 2013, अनुसूची VII अंतर्गत पात्र उपक्रम ओळखणे",
      "समुदाय भागीदार संबंध व्यवस्थापित करणे",
      "परिणाम माहिती गोळा करणे आणि अहवाल देणे",
      "कॉर्पोरेट व्यवहार प्रमुखाला अहवाल",
    ],
    reportingOfficer_hi: "Corporate Affairs Head", reportingOfficer_en: "Corporate Affairs Head", reportingOfficer_mr: "कॉर्पोरेट व्यवहार प्रमुख",
    careerPath_hi: ["CSR Executive", "Corporate Affairs Head"],
    careerPath_en: ["CSR Executive", "Corporate Affairs Head"],
    careerPath_mr: [
      "सामाजिक दायित्व अधिकारी",
      "कॉर्पोरेट व्यवहार प्रमुख",
    ],
    uniform_hi: "Beige shirt · plum-accent scarf/stole · plum lanyard + ID",
    uniform_en: "Beige shirt · plum-accent scarf/stole · plum lanyard + ID",
    uniform_mr: "बेज शर्ट · जांभळ्या छटेची ओढणी/स्टोल · जांभळा लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["CSR impact data monthly reporting", "1+ naya community partner/quarter"],
    monthlyTargets_en: ["Monthly CSR impact-data reporting", "1+ new community partner/quarter"],
    monthlyTargets_mr: [
      "सामाजिक दायित्व परिणाम माहिती मासिक अहवाल",
      "1+ नवा समुदाय भागीदार/तिमाही",
    ],
    seniorityRank: 1, accent: accentFor("corporate", 1), applicationTrack: "exam", examId: "samuday-vikas",
  },
  {
    id: "agro-estate-manager", code: "AEM", departmentId: "corporate",
    title_hi: "Agro Estate Manager", title_en: "Agro Estate Manager", title_mr: "कृषी मळा व्यवस्थापक",
    summary_hi: "Company-owned agro estates ki day-to-day operations aur upkeep manage karna.",
    summary_en: "Manages the day-to-day operations and upkeep of company-owned agro estates.",
    summary_mr: "कंपनीच्या मालकीच्या कृषी मळ्यांचे दैनंदिन कामकाज आणि देखभाल व्यवस्थापित करणे.",
    salary: 30000, salaryDisplay: "₹30,000",
    eligibility_hi: "Graduate (Agriculture/Estate Management tarjeeh), umar 24–48 saal, kam se kam 2 saal estate/farm-operations anubhav, Samuday Vikas Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate (Agriculture/Estate Management preferred), age 24–48, at least 2 years of estate/farm-operations experience, must qualify the Samuday Vikas Pariksha.",
    eligibility_mr: "पदवीधर (कृषी/मळा व्यवस्थापनाला प्राधान्य), वय 24–48 वर्षे, किमान 2 वर्षे मळा/शेती कामकाजाचा अनुभव, समुदाय विकास परीक्षा उत्तीर्ण होणे आवश्यक.",
    responsibilities_hi: [
      "Estate operations aur maintenance ka ownership",
      "Labour aur vendor coordination",
      "Yield aur cost tracking",
      "Estate safety aur compliance standards maintain karna",
      "Corporate Affairs Head ko report karna",
    ],
    responsibilities_en: [
      "Own estate operations and maintenance",
      "Labour and vendor coordination",
      "Yield and cost tracking",
      "Maintain estate safety and compliance standards",
      "Report to the Corporate Affairs Head",
    ],
    responsibilities_mr: [
      "मळ्याचे कामकाज आणि देखभालीची जबाबदारी",
      "मजूर आणि पुरवठादार समन्वय",
      "उत्पादन आणि खर्चावर लक्ष",
      "मळ्याची सुरक्षा आणि नियमपालन मानके पाळणे",
      "कॉर्पोरेट व्यवहार प्रमुखाला अहवाल",
    ],
    reportingOfficer_hi: "Corporate Affairs Head", reportingOfficer_en: "Corporate Affairs Head", reportingOfficer_mr: "कॉर्पोरेट व्यवहार प्रमुख",
    careerPath_hi: ["Agro Estate Manager", "Corporate Affairs Head"],
    careerPath_en: ["Agro Estate Manager", "Corporate Affairs Head"],
    careerPath_mr: [
      "कृषी मळा व्यवस्थापक",
      "कॉर्पोरेट व्यवहार प्रमुख",
    ],
    uniform_hi: "Beige field shirt · sun hat · plum lanyard + ID",
    uniform_en: "Beige field shirt · sun hat · plum lanyard + ID",
    uniform_mr: "बेज क्षेत्रीय शर्ट · उन्हाची टोपी · जांभळा लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["Estate yield aur cost tracking monthly", "Vendor/labour coordination review"],
    monthlyTargets_en: ["Monthly estate yield/cost tracking", "vendor/labour coordination review"],
    monthlyTargets_mr: [
      "मळ्याचे उत्पादन आणि खर्चावर मासिक लक्ष",
      "पुरवठादार/मजूर समन्वय आढावा",
    ],
    seniorityRank: 2, accent: accentFor("corporate", 2), applicationTrack: "exam", examId: "samuday-vikas",
  },
  {
    id: "events-team-mid", code: "ETM", departmentId: "corporate",
    title_hi: "Events Team (Mid Level)", title_en: "Events Team (Mid Level)", title_mr: "कार्यक्रम संघ (मध्यम स्तर)",
    summary_hi: "Corporate aur brand events ki planning aur on-ground execution mein support karna.",
    summary_en: "Supports the planning and on-ground execution of corporate and brand events.",
    summary_mr: "कॉर्पोरेट आणि ब्रँड कार्यक्रमांचे नियोजन आणि प्रत्यक्ष अंमलबजावणीत सहाय्य करणे.",
    salary: 30000, salaryDisplay: "₹30,000",
    eligibility_hi: "Graduate, umar 21–38 saal, kam se kam 1 saal event-coordination anubhav, Samuday Vikas Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate, age 21–38, at least 1 year of event-coordination experience, must qualify the Samuday Vikas Pariksha.",
    eligibility_mr: "पदवीधर, वय 21–38 वर्षे, किमान 1 वर्ष कार्यक्रम समन्वयाचा अनुभव, समुदाय विकास परीक्षा उत्तीर्ण होणे आवश्यक.",
    responsibilities_hi: [
      "Event logistics aur vendor coordination",
      "On-ground execution support",
      "Budget aur timeline tracking",
      "Attendee/guest experience coordinate karna",
      "Events Team (Senior Level) ko report karna",
    ],
    responsibilities_en: [
      "Event logistics and vendor coordination",
      "On-ground execution support",
      "Budget and timeline tracking",
      "Coordinate attendee/guest experience",
      "Report to the Events Team (Senior Level)",
    ],
    responsibilities_mr: [
      "कार्यक्रम व्यवस्था आणि पुरवठादार समन्वय",
      "प्रत्यक्ष अंमलबजावणीत सहाय्य",
      "अर्थसंकल्प आणि वेळापत्रकावर लक्ष",
      "उपस्थित/पाहुण्यांच्या अनुभवाचा समन्वय",
      "कार्यक्रम संघ (वरिष्ठ स्तर) ला अहवाल",
    ],
    reportingOfficer_hi: "Events Team (Senior Level)", reportingOfficer_en: "Events Team (Senior Level)", reportingOfficer_mr: "कार्यक्रम संघ (वरिष्ठ स्तर)",
    careerPath_hi: ["Events Team (Mid Level)", "Events Team (Senior Level)", "Corporate Affairs Head"],
    careerPath_en: ["Events Team (Mid Level)", "Events Team (Senior Level)", "Corporate Affairs Head"],
    careerPath_mr: [
      "कार्यक्रम संघ (मध्यम स्तर)",
      "कार्यक्रम संघ (वरिष्ठ स्तर)",
      "कॉर्पोरेट व्यवहार प्रमुख",
    ],
    uniform_hi: "Beige shirt · plum tie · event ID badge · plum lanyard",
    uniform_en: "Beige shirt · plum tie · event ID badge · plum lanyard",
    uniform_mr: "बेज शर्ट · जांभळा टाय · कार्यक्रम ओळखपत्र · जांभळा लॅनयार्ड",
    monthlyTargets_hi: ["Events budget/timeline on-track", "Vendor coordination SLA meet karna"],
    monthlyTargets_en: ["Events budget/timeline on-track", "meet vendor coordination SLA"],
    monthlyTargets_mr: [
      "कार्यक्रम अर्थसंकल्प/वेळापत्रक नियोजनानुसार",
      "पुरवठादार समन्वय मुदतीचे पालन",
    ],
    seniorityRank: 3, accent: accentFor("corporate", 3), applicationTrack: "exam", examId: "samuday-vikas",
  },
  {
    id: "events-team-senior", code: "ETS", departmentId: "corporate",
    title_hi: "Events Team (Senior Level)", title_en: "Events Team (Senior Level)", title_mr: "कार्यक्रम संघ (वरिष्ठ स्तर)",
    summary_hi: "Corporate aur brand events ki poori strategy, budget aur team ka ownership.",
    summary_en: "Owns the full strategy, budget and team for corporate and brand events.",
    summary_mr: "कॉर्पोरेट आणि ब्रँड कार्यक्रमांचे संपूर्ण धोरण, अर्थसंकल्प आणि संघाची जबाबदारी.",
    salary: 60000, salaryDisplay: "₹60,000",
    eligibility_hi: "Graduate/Post-Graduate, umar 26–50 saal, kam se kam 5 saal event-management leadership anubhav, Netritva Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate/Post-Graduate, age 26–50, at least 5 years of event-management leadership experience, must qualify the Netritva Pariksha.",
    eligibility_mr: "पदवीधर/पदव्युत्तर, वय 26–50 वर्षे, किमान 5 वर्षे कार्यक्रम व्यवस्थापन नेतृत्वाचा अनुभव, नेतृत्व परीक्षा उत्तीर्ण होणे आवश्यक.",
    responsibilities_hi: [
      "Events strategy aur annual calendar ownership",
      "Mid-level events team lead karna",
      "Sponsor/vendor negotiations",
      "Crisis/on-ground escalation management",
      "Corporate Affairs Head ko report karna",
    ],
    responsibilities_en: [
      "Own events strategy and the annual calendar",
      "Lead the mid-level events team",
      "Sponsor/vendor negotiations",
      "Crisis and on-ground escalation management",
      "Report to the Corporate Affairs Head",
    ],
    responsibilities_mr: [
      "कार्यक्रम धोरण आणि वार्षिक दिनदर्शिकेची जबाबदारी",
      "मध्यम स्तरावरील कार्यक्रम संघाचे नेतृत्व",
      "प्रायोजक/पुरवठादार वाटाघाटी",
      "आणीबाणी/प्रत्यक्ष तक्रार व्यवस्थापन",
      "कॉर्पोरेट व्यवहार प्रमुखाला अहवाल",
    ],
    reportingOfficer_hi: "Corporate Affairs Head", reportingOfficer_en: "Corporate Affairs Head", reportingOfficer_mr: "कॉर्पोरेट व्यवहार प्रमुख",
    careerPath_hi: ["Events Team (Senior Level)", "Corporate Affairs Head"],
    careerPath_en: ["Events Team (Senior Level)", "Corporate Affairs Head"],
    careerPath_mr: [
      "कार्यक्रम संघ (वरिष्ठ स्तर)",
      "कॉर्पोरेट व्यवहार प्रमुख",
    ],
    uniform_hi: "Beige shirt · plum blazer · plum tie · plum lanyard + ID",
    uniform_en: "Beige shirt · plum blazer · plum tie · plum lanyard + ID",
    uniform_mr: "बेज शर्ट · जांभळा ब्लेझर · जांभळा टाय · जांभळा लॅनयार्ड + ओळखपत्र",
    monthlyTargets_hi: ["Annual events calendar on-track", "Sponsor renewal rate target"],
    monthlyTargets_en: ["Annual events calendar on-track", "sponsor-renewal-rate target"],
    monthlyTargets_mr: [
      "वार्षिक कार्यक्रम दिनदर्शिका नियोजनानुसार",
      "प्रायोजक नूतनीकरण दर उद्दिष्ट",
    ],
    seniorityRank: 4, accent: accentFor("corporate", 4), applicationTrack: "exam", examId: "netritva",
  },
];

// ---------------- Legacy section support ----------------
// Phase 1 vacancy counts, decoupled from POSITIONS (no per-position vacancy
// counts were given for the expanded 21-position model). Keeps the existing
// "Vacancies" scale-up section rendering unchanged.
export const PHASE1_VACANCIES = [
  { role: "VLE", exam_hi: "Gram Sevak Pariksha", exam_en: "Gram Sevak Pariksha", exam_mr: "ग्राम सेवक परीक्षा", count: 200 },
  { role: "VLM", exam_hi: "Gram Sevak Pariksha", exam_en: "Gram Sevak Pariksha", exam_mr: "ग्राम सेवक परीक्षा", count: 200 },
  { role: "TEO", exam_hi: "Krishi Adhikari Pariksha", exam_en: "Krishi Adhikari Pariksha", exam_mr: "कृषी अधिकारी परीक्षा", count: 40 },
  { role: "DLO", exam_hi: "Krishi Adhikari Pariksha", exam_en: "Krishi Adhikari Pariksha", exam_mr: "कृषी अधिकारी परीक्षा", count: 12 },
];

// ---------------- Selectors ----------------
export function getDepartment(id: string): Department | undefined {
  return DEPARTMENTS.find((d) => d.id === id);
}

export function getPosition(id: string): Position | undefined {
  return POSITIONS.find((p) => p.id === id);
}

export function getPositionsByDepartment(departmentId: string | null): Position[] {
  const list = departmentId ? POSITIONS.filter((p) => p.departmentId === departmentId) : POSITIONS;
  return [...list].sort((a, b) => a.seniorityRank - b.seniorityRank);
}

export function searchPositions(positions: Position[], query: string, lang: Lang): Position[] {
  const q = query.trim().toLowerCase();
  if (!q) return positions;
  return positions.filter((p) => {
    const dept = getDepartment(p.departmentId);
    const title = (tr(p, "title", lang)).toLowerCase();
    const deptName = dept ? (tr(dept, "name", lang)).toLowerCase() : "";
    return title.includes(q) || deptName.includes(q) || p.code.toLowerCase().includes(q);
  });
}

export const SALARY_BANDS = [
  { id: "all", label_hi: "Sabhi", label_en: "All", label_mr: "सर्व", min: 0, max: Infinity },
  { id: "under-25k", label_hi: "₹25,000 tak", label_en: "Under ₹25,000", label_mr: "₹25,000 पर्यंत", min: 0, max: 24999 },
  { id: "25k-50k", label_hi: "₹25,000 – ₹50,000", label_en: "₹25,000 – ₹50,000", label_mr: "₹25,000 – ₹50,000", min: 25000, max: 50000 },
  { id: "50k-1l", label_hi: "₹50,000 – ₹1,00,000", label_en: "₹50,000 – ₹1,00,000", label_mr: "₹50,000 – ₹1,00,000", min: 50001, max: 100000 },
  { id: "1l-plus", label_hi: "₹1,00,000 se zyada", label_en: "₹1,00,000+", label_mr: "₹1,00,000 पेक्षा जास्त", min: 100001, max: Infinity },
];

export function filterBySalaryBand(positions: Position[], bandId: string): Position[] {
  const band = SALARY_BANDS.find((b) => b.id === bandId) || SALARY_BANDS[0];
  return positions.filter((p) => p.salary >= band.min && p.salary <= band.max);
}

export function getSalaryRange(): { min: number; max: number } {
  const salaries = POSITIONS.map((p) => p.salary);
  return { min: Math.min(...salaries), max: Math.max(...salaries) };
}

export function getRecruitmentStats(): RecruitmentStats {
  const { min, max } = getSalaryRange();
  const careerPaths = new Set(
    POSITIONS.flatMap((p) => (p.careerPath_en.length > 1 ? [p.departmentId] : []))
  );
  return {
    totalPositions: POSITIONS.length,
    salaryMin: min,
    salaryMax: max,
    totalDepartments: DEPARTMENTS.length,
    careerPaths: careerPaths.size > 0 ? POSITIONS.filter((p) => p.careerPath_en.length > 1).length : 0,
  };
}

export function getFieldOpsHierarchy(): Position[] {
  return getPositionsByDepartment("field-operations").sort((a, b) => b.seniorityRank - a.seniorityRank);
}

export function getDepartmentVerticals(): { department: Department; positions: Position[] }[] {
  return DEPARTMENTS.filter((d) => d.id !== "field-operations").map((department) => ({
    department,
    positions: getPositionsByDepartment(department.id),
  }));
}

/** Other roles in the same department, for the "related roles" rail. */
export function getSiblingPositions(positionId: string): Position[] {
  const position = getPosition(positionId);
  if (!position) return [];
  return getPositionsByDepartment(position.departmentId).filter((p) => p.id !== positionId);
}

/** The role one rung up the same department ladder, if there is one. */
export function getNextPosition(positionId: string): Position | undefined {
  const position = getPosition(positionId);
  if (!position) return undefined;
  return getPositionsByDepartment(position.departmentId).find(
    (p) => p.seniorityRank === position.seniorityRank + 1
  );
}

/** Every role that is recruited through a given exam, junior rung first. */
export function getPositionsByExam(examId: string): Position[] {
  return POSITIONS.filter((p) => p.examId === examId).sort(
    (a, b) => a.seniorityRank - b.seniorityRank
  );
}

/** Every position id — feeds generateStaticParams for /roles/[slug]. */
export function getAllPositionIds(): string[] {
  return POSITIONS.map((p) => p.id);
}

/** Every department id — feeds generateStaticParams for /departments/[slug]. */
export function getAllDepartmentIds(): string[] {
  return DEPARTMENTS.map((d) => d.id);
}
