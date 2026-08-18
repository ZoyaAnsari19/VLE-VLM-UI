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

export const DEPARTMENTS: Department[] = [
  {
    id: "field-operations", name_hi: "Field Operations", name_en: "Field Operations",
    description_hi: "Village-level farmer connect — VLE se Divisional Director tak.",
    description_en: "Village-level farmer connect — from VLE to Divisional Director.",
    icon: "leaf", accent: "#1B4D3E",
  },
  {
    id: "sales-marketing", name_hi: "Sales & Marketing", name_en: "Sales & Marketing",
    description_hi: "Market expansion, sales strategy aur promotion.",
    description_en: "Market expansion, sales strategy and promotion.",
    icon: "market", accent: "#C99A3B",
  },
  {
    id: "business-development", name_hi: "Business Development", name_en: "Business Development",
    description_hi: "Naye business opportunities, partnerships aur vertical growth.",
    description_en: "New business opportunities, partnerships and vertical growth.",
    icon: "briefcase", accent: "#8B5E34",
  },
  {
    id: "export-import", name_hi: "Export-Import", name_en: "Export-Import",
    description_hi: "Import sourcing, export shipments aur compliance.",
    description_en: "Import sourcing, export shipments and compliance.",
    icon: "globe", accent: "#1A2A4A",
  },
  {
    id: "processing", name_hi: "Processing Division", name_en: "Processing Division",
    description_hi: "Primary processing se storage tak ki operations.",
    description_en: "In charge of operations from primary processing to storage.",
    icon: "factory", accent: "#4A5D23",
  },
  {
    id: "corporate", name_hi: "Corporate", name_en: "Corporate",
    description_hi: "CSR, estates, events aur corporate support functions.",
    description_en: "CSR, estates, events and corporate support functions.",
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
    title_hi: "Village Level Executive (VLE)", title_en: "Village Level Executive (VLE)",
    summary_hi: "3-gaon ke cluster ka mukhya kisan-sampark. Daily gaon rounds, farmer enrollment, soil testing aur fasal collection.",
    summary_en: "Primary farmer contact for a 3-village cluster — daily village rounds, farmer enrollment, soil testing and crop collection.",
    salary: 10000, salaryDisplay: "₹10,000",
    eligibility_hi: "12th pass (Agriculture/Science tarjeeh), umar 18–35 saal, do-pahiya vahan chalane ka license, cluster mein rehne ya shift hone ke liye tayyar.",
    eligibility_en: "12th pass (Agriculture/Science preferred), age 18–35, two-wheeler license, willing to be based in the assigned cluster.",
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
    reportingOfficer_hi: "Village Level Manager (same cluster)",
    reportingOfficer_en: "Village Level Manager (same cluster)",
    careerPath_hi: ["Village Level Executive (VLE)", "Village Level Manager (VLM)", "Taluka Executive Officer (TEO)", "Division Level Officer", "Divisional Director"],
    careerPath_en: ["Village Level Executive (VLE)", "Village Level Manager (VLM)", "Taluka Executive Officer (TEO)", "Division Level Officer", "Divisional Director"],
    uniform_hi: "White shirt · dark green trousers · sling bag · tablet · green lanyard + ID",
    uniform_en: "White shirt · dark green trousers · sling bag · tablet · green lanyard + ID",
    monthlyTargets_hi: ["100+ kisan registration/mahina", "3-gaon cluster ka poora coverage"],
    monthlyTargets_en: ["100+ farmer registrations/month", "full coverage of the 3-village cluster"],
    seniorityRank: 1, accent: accentFor("field-operations", 1), applicationTrack: "exam", examId: "gram-sevak",
  },
  {
    id: "vlm", code: "VLM", departmentId: "field-operations",
    title_hi: "Village Level Manager (VLM)", title_en: "Village Level Manager (VLM)",
    summary_hi: "Cluster ka senior lead, VLE ke saath jodi mein — data/admin, device aur payments, bank/panchayat taalmel.",
    summary_en: "Senior cluster lead paired with the VLE — data/admin, devices and payments, bank/panchayat coordination.",
    salary: 12000, salaryDisplay: "₹12,000",
    eligibility_hi: "Graduate tarjeeh (12th minimum), umar 21–40 saal, Gram Sevak Pariksha ke top scorers, basic smartphone/computer istemal.",
    eligibility_en: "Graduate preferred (12th minimum), age 21–40, top scorers of the Gram Sevak Pariksha, basic computer/smartphone literacy.",
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
    reportingOfficer_hi: "Taluka Executive Officer (TEO)", reportingOfficer_en: "Taluka Executive Officer (TEO)",
    careerPath_hi: ["Village Level Manager (VLM)", "Taluka Executive Officer (TEO)", "Division Level Officer", "Divisional Director"],
    careerPath_en: ["Village Level Manager (VLM)", "Taluka Executive Officer (TEO)", "Division Level Officer", "Divisional Director"],
    uniform_hi: "White shirt · dark green trousers · green tie · sling bag · tablet · green lanyard + ID",
    uniform_en: "White shirt · dark green trousers · green tie · sling bag · tablet · green lanyard + ID",
    monthlyTargets_hi: ["Sabhi VLE data ki weekly verification", "Cluster dashboard 100% accuracy"],
    monthlyTargets_en: ["Weekly verification of all VLE data", "100% cluster-dashboard accuracy"],
    seniorityRank: 2, accent: accentFor("field-operations", 2), applicationTrack: "exam", examId: "gram-sevak",
  },
  {
    id: "teo", code: "TEO", departmentId: "field-operations",
    title_hi: "Taluka Executive Officer (TEO)", title_en: "Taluka Executive Officer (TEO)",
    summary_hi: "~5 clusters, ~15 gaon ke taluka ka supervisor — bank camps, quality control, credit approvals, machinery pool aur training.",
    summary_en: "Supervisor of ~5 clusters / ~15 villages within a taluka — bank camps, quality control, credit approvals, machinery pool and training.",
    salary: 25000, salaryDisplay: "₹25,000",
    eligibility_hi: "Graduate (agri/management tarjeeh), umar 24–45 saal, kam se kam 2 saal field ya team-lead anubhav.",
    eligibility_en: "Graduate (agri/management preferred), age 24–45, at least 2 years of field or team-lead experience.",
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
    reportingOfficer_hi: "Division Level Officer", reportingOfficer_en: "Division Level Officer",
    careerPath_hi: ["Taluka Executive Officer (TEO)", "Division Level Officer", "Divisional Director"],
    careerPath_en: ["Taluka Executive Officer (TEO)", "Division Level Officer", "Divisional Director"],
    uniform_hi: "White shirt · dark green blazer · green tie · formal trousers · green lanyard + ID",
    uniform_en: "White shirt · dark green blazer · green tie · formal trousers · green lanyard + ID",
    monthlyTargets_hi: ["200+ KCC facilitation/mahina bank camps se", "Taluka-level P&L review"],
    monthlyTargets_en: ["200+ KCC facilitations/month via bank camps", "monthly taluka-level P&L review"],
    seniorityRank: 3, accent: accentFor("field-operations", 3), applicationTrack: "exam", examId: "krishi-adhikari",
  },
  {
    id: "division-level-officer", code: "DLO", departmentId: "field-operations",
    title_hi: "Division Level Officer", title_en: "Division Level Officer",
    summary_hi: "Poore revenue division ka officer — partnerships, audits, bulk deals, P&L, HQ reporting.",
    summary_en: "Officer for the entire revenue division — partnerships, audits, bulk deals, P&L, HQ reporting.",
    salary: 35000, salaryDisplay: "₹35,000",
    eligibility_hi: "Graduate/Post-Graduate (agri/management tarjeeh), umar 27–50 saal, kam se kam 4 saal supervisory anubhav.",
    eligibility_en: "Graduate/Post-Graduate (agri/management preferred), age 27–50, at least 4 years of supervisory experience.",
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
    reportingOfficer_hi: "Divisional Director", reportingOfficer_en: "Divisional Director",
    careerPath_hi: ["Division Level Officer", "Divisional Director"],
    careerPath_en: ["Division Level Officer", "Divisional Director"],
    uniform_hi: "White shirt · dark green blazer · green tie · pocket square · green lanyard + ID",
    uniform_en: "White shirt · dark green blazer · green tie · pocket square · green lanyard + ID",
    monthlyTargets_hi: ["Division P&L consolidation", "State-level partnership review (quarterly)"],
    monthlyTargets_en: ["Division P&L consolidation", "quarterly state-level partnership review"],
    seniorityRank: 4, accent: accentFor("field-operations", 4), applicationTrack: "exam", examId: "krishi-adhikari",
  },
  {
    id: "divisional-director", code: "DD", departmentId: "field-operations",
    title_hi: "Divisional Director", title_en: "Divisional Director",
    summary_hi: "Field Operations vertical ka apex leader — multiple divisions ki strategy, HQ liaison aur escalation ownership.",
    summary_en: "Apex leader of the Field Operations vertical — strategy across multiple divisions, HQ liaison and escalation ownership.",
    salary: 50000, salaryDisplay: "₹50,000",
    eligibility_hi: "Post-Graduate (agri/management tarjeeh), umar 32–55 saal, kam se kam 7 saal multi-team leadership anubhav.",
    eligibility_en: "Post-Graduate (agri/management preferred), age 32–55, at least 7 years of multi-team leadership experience.",
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
    reportingOfficer_hi: "Argus / RKF HQ (Mumbai)", reportingOfficer_en: "Argus / RKF HQ (Mumbai)",
    careerPath_hi: ["Divisional Director", "Zonal / HQ Leadership (Argus / RKF)"],
    careerPath_en: ["Divisional Director", "Zonal / HQ Leadership (Argus / RKF)"],
    uniform_hi: "White shirt · dark green blazer · green tie · pocket square · cufflinks · green lanyard + ID",
    uniform_en: "White shirt · dark green blazer · green tie · pocket square · cufflinks · green lanyard + ID",
    monthlyTargets_hi: ["Multi-division zonal strategy review", "HQ ko monthly performance briefing"],
    monthlyTargets_en: ["Multi-division zonal strategy review", "monthly performance briefing to HQ"],
    seniorityRank: 5, accent: accentFor("field-operations", 5), applicationTrack: "exam", examId: "krishi-adhikari",
  },

  // ---------------- SALES & MARKETING ----------------
  {
    id: "sales-marketing-domestic", code: "SME-D", departmentId: "sales-marketing",
    title_hi: "Sales & Marketing Executive (Domestic)", title_en: "Sales & Marketing Executive (Domestic)",
    summary_hi: "Domestic bazaar mein Kisan Mitra produce aur services ki sales-growth drive karna — buyer network, mandi/retail targets aur local campaigns.",
    summary_en: "Drives domestic-market sales growth for Kisan Mitra produce and services — buyer network, mandi/retail targets and local campaigns.",
    salary: 25000, salaryDisplay: "₹25,000",
    eligibility_hi: "Graduate, umar 21–40 saal, kam se kam 1 saal sales/marketing anubhav tarjeeh, Vipnan Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate, age 21–40, at least 1 year of sales/marketing experience preferred, must qualify the Vipnan Pariksha.",
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
    reportingOfficer_hi: "Sales & Marketing Head", reportingOfficer_en: "Sales & Marketing Head",
    careerPath_hi: ["Sales & Marketing Executive (Domestic)", "Sales & Marketing Executive (International)", "Sales & Marketing Head"],
    careerPath_en: ["Sales & Marketing Executive (Domestic)", "Sales & Marketing Executive (International)", "Sales & Marketing Head"],
    uniform_hi: "White shirt · gold-trim tie · charcoal trousers · gold lanyard + ID",
    uniform_en: "White shirt · gold-trim tie · charcoal trousers · gold lanyard + ID",
    monthlyTargets_hi: ["Mandi/retail sales target monthly meet karna", "5+ naye distributor onboard/quarter"],
    monthlyTargets_en: ["Meet monthly mandi/retail sales target", "5+ new distributors onboarded/quarter"],
    seniorityRank: 1, accent: accentFor("sales-marketing", 1), applicationTrack: "exam", examId: "vipnan",
  },
  {
    id: "sales-marketing-international", code: "SME-I", departmentId: "sales-marketing",
    title_hi: "Sales & Marketing Executive (International)", title_en: "Sales & Marketing Executive (International)",
    summary_hi: "International buyers aur export-linked markets ke saath sales relationships build karna, trade fairs represent karna.",
    summary_en: "Builds sales relationships with international buyers and export-linked markets, represents the brand at trade fairs.",
    salary: 35000, salaryDisplay: "₹35,000",
    eligibility_hi: "Graduate (International Business/Marketing tarjeeh), umar 23–42 saal, English communication strong, 1–2 saal international sales anubhav, Vipnan Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate (International Business/Marketing preferred), age 23–42, strong English communication, 1–2 years of international sales experience, must qualify the Vipnan Pariksha.",
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
    reportingOfficer_hi: "Sales & Marketing Head", reportingOfficer_en: "Sales & Marketing Head",
    careerPath_hi: ["Sales & Marketing Executive (International)", "Sales & Marketing Head", "Business Head"],
    careerPath_en: ["Sales & Marketing Executive (International)", "Sales & Marketing Head", "Business Head"],
    uniform_hi: "White shirt · gold-trim tie · navy blazer · charcoal trousers · gold lanyard + ID",
    uniform_en: "White shirt · gold-trim tie · navy blazer · charcoal trousers · gold lanyard + ID",
    monthlyTargets_hi: ["International buyer leads pipeline maintain karna", "2+ trade fairs/quarter represent karna"],
    monthlyTargets_en: ["Maintain international buyer lead pipeline", "represent at 2+ trade fairs/quarter"],
    seniorityRank: 2, accent: accentFor("sales-marketing", 2), applicationTrack: "exam", examId: "vipnan",
  },

  // ---------------- BUSINESS DEVELOPMENT ----------------
  {
    id: "bd-executive", code: "BDE", departmentId: "business-development",
    title_hi: "Business Development Executive (MLA CTB, RBSM & Music Festival)", title_en: "Business Development Executive (MLA CTB, RBSM & Music Festival)",
    summary_hi: "MLA CTB, RBSM aur Music Festival verticals ke liye naye business opportunities identify aur develop karna.",
    summary_en: "Identifies and develops new business opportunities across the MLA CTB, RBSM and Music Festival verticals.",
    salary: 30000, salaryDisplay: "₹30,000",
    eligibility_hi: "Graduate, umar 22–40 saal, kam se kam 1–2 saal business development/event-sales anubhav, Vyavsaya Vikas Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate, age 22–40, at least 1–2 years of business development/event-sales experience, must qualify the Vyavsaya Vikas Pariksha.",
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
    reportingOfficer_hi: "Business Development Manager", reportingOfficer_en: "Business Development Manager",
    careerPath_hi: ["Business Development Executive", "Business Development Manager", "Business Development Head"],
    careerPath_en: ["Business Development Executive", "Business Development Manager", "Business Development Head"],
    uniform_hi: "Beige shirt · brown tie · bronze lanyard + ID",
    uniform_en: "Beige shirt · brown tie · bronze lanyard + ID",
    monthlyTargets_hi: ["10+ naye leads/mahina", "Weekly pipeline report submission"],
    monthlyTargets_en: ["10+ new leads/month", "weekly pipeline report submission"],
    seniorityRank: 1, accent: accentFor("business-development", 1), applicationTrack: "exam", examId: "vyavsaya-vikas",
  },
  {
    id: "bd-manager", code: "BDM", departmentId: "business-development",
    title_hi: "Business Development Manager (MLA CTB, RBSM & Music Festival)", title_en: "Business Development Manager (MLA CTB, RBSM & Music Festival)",
    summary_hi: "MLA CTB, RBSM aur Music Festival verticals ki business-development strategy aur team lead karna.",
    summary_en: "Leads business-development strategy and team across the MLA CTB, RBSM and Music Festival verticals.",
    salary: 45000, salaryDisplay: "₹45,000",
    eligibility_hi: "Graduate/Post-Graduate, umar 26–48 saal, kam se kam 4 saal business development anubhav, team-lead history, Vyavsaya Vikas Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate/Post-Graduate, age 26–48, at least 4 years of business development experience with a team-lead track record, must qualify the Vyavsaya Vikas Pariksha.",
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
    reportingOfficer_hi: "Business Development Head", reportingOfficer_en: "Business Development Head",
    careerPath_hi: ["Business Development Manager", "Business Development Head", "Business Head"],
    careerPath_en: ["Business Development Manager", "Business Development Head", "Business Head"],
    uniform_hi: "Beige shirt · brown blazer · brown tie · bronze lanyard + ID",
    uniform_en: "Beige shirt · brown blazer · brown tie · bronze lanyard + ID",
    monthlyTargets_hi: ["Revenue target ownership (quarterly)", "Team ki 10+ leads/mahina pipeline review"],
    monthlyTargets_en: ["Quarterly revenue-target ownership", "review team's 10+ leads/month pipeline"],
    seniorityRank: 2, accent: accentFor("business-development", 2), applicationTrack: "exam", examId: "vyavsaya-vikas",
  },

  // ---------------- EXPORT-IMPORT ----------------
  {
    id: "import-manager", code: "IM", departmentId: "export-import",
    title_hi: "Import Manager", title_en: "Import Manager",
    summary_hi: "Kisan Mitra ecosystem ke liye imported inputs/equipment ki sourcing aur compliance manage karna.",
    summary_en: "Manages sourcing and compliance for imported inputs/equipment for the Kisan Mitra ecosystem.",
    salary: 35000, salaryDisplay: "₹35,000",
    eligibility_hi: "Graduate (International Trade/Supply Chain tarjeeh), umar 25–45 saal, kam se kam 2–3 saal import operations anubhav, Vyapar Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate (International Trade/Supply Chain preferred), age 25–45, at least 2–3 years of import-operations experience, must qualify the Vyapar Pariksha.",
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
    reportingOfficer_hi: "Director (Export & Import / International Trade)", reportingOfficer_en: "Director (Export & Import / International Trade)",
    careerPath_hi: ["Import Manager", "Director (Export & Import / International Trade)"],
    careerPath_en: ["Import Manager", "Director (Export & Import / International Trade)"],
    uniform_hi: "White shirt · navy tie · navy trousers · navy lanyard + ID",
    uniform_en: "White shirt · navy tie · navy trousers · navy lanyard + ID",
    monthlyTargets_hi: ["Import shipment timelines 95%+ on-time", "Vendor compliance audit monthly"],
    monthlyTargets_en: ["95%+ on-time import shipments", "monthly vendor compliance audit"],
    seniorityRank: 1, accent: accentFor("export-import", 1), applicationTrack: "exam", examId: "vyapar",
  },
  {
    id: "export-manager", code: "EM", departmentId: "export-import",
    title_hi: "Export Manager", title_en: "Export Manager",
    summary_hi: "Kisan Mitra produce ke liye international buyers ko export shipments manage karna.",
    summary_en: "Manages export shipments of Kisan Mitra produce to international buyers.",
    salary: 45000, salaryDisplay: "₹45,000",
    eligibility_hi: "Graduate (International Trade/Agribusiness tarjeeh), umar 26–46 saal, kam se kam 3 saal export operations anubhav, Vyapar Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate (International Trade/Agribusiness preferred), age 26–46, at least 3 years of export-operations experience, must qualify the Vyapar Pariksha.",
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
    reportingOfficer_hi: "Director (Export & Import / International Trade)", reportingOfficer_en: "Director (Export & Import / International Trade)",
    careerPath_hi: ["Export Manager", "Director (Export & Import / International Trade)"],
    careerPath_en: ["Export Manager", "Director (Export & Import / International Trade)"],
    uniform_hi: "White shirt · navy tie · navy trousers · navy lanyard + ID",
    uniform_en: "White shirt · navy tie · navy trousers · navy lanyard + ID",
    monthlyTargets_hi: ["Export shipment quality-compliance 100%", "Payment collection cycle track karna"],
    monthlyTargets_en: ["100% export shipment quality compliance", "track payment-collection cycle"],
    seniorityRank: 2, accent: accentFor("export-import", 2), applicationTrack: "exam", examId: "vyapar",
  },
  {
    id: "export-import-director", code: "EID", departmentId: "export-import",
    title_hi: "Director (Export & Import / International Trade)", title_en: "Director (Export & Import / International Trade)",
    summary_hi: "Export-Import vertical ki poori strategy, compliance aur P&L ka ownership — Import/Export Managers ka oversight.",
    summary_en: "Owns the entire Export-Import vertical's strategy, compliance and P&L — oversight of Import/Export Managers.",
    salary: 150000, salaryDisplay: "₹1,50,000",
    eligibility_hi: "Post-Graduate (International Trade/MBA tarjeeh), umar 35–58 saal, kam se kam 8–10 saal senior trade-leadership anubhav, Vyapar Nideshak Pariksha qualify karna zaroori.",
    eligibility_en: "Post-Graduate (International Trade/MBA preferred), age 35–58, at least 8–10 years of senior trade-leadership experience, must qualify the Vyapar Nideshak Pariksha.",
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
    reportingOfficer_hi: "Argus / RKF HQ (Mumbai)", reportingOfficer_en: "Argus / RKF HQ (Mumbai)",
    careerPath_hi: ["Director (Export & Import / International Trade)", "Zonal / HQ Leadership (Argus / RKF)"],
    careerPath_en: ["Director (Export & Import / International Trade)", "Zonal / HQ Leadership (Argus / RKF)"],
    uniform_hi: "White shirt · navy blazer · navy tie · pocket square · navy lanyard + ID",
    uniform_en: "White shirt · navy blazer · navy tie · pocket square · navy lanyard + ID",
    monthlyTargets_hi: ["Vertical P&L review (monthly)", "Strategic partnership pipeline (quarterly)"],
    monthlyTargets_en: ["Monthly vertical P&L review", "quarterly strategic-partnership pipeline"],
    seniorityRank: 3, accent: accentFor("export-import", 3), applicationTrack: "exam", examId: "vyapar-nideshak",
  },

  // ---------------- PROCESSING DIVISION ----------------
  {
    id: "primary-processing-centre", code: "PPC", departmentId: "processing",
    title_hi: "Primary Processing Centre (PPC) Executive", title_en: "Primary Processing Centre (PPC) Executive",
    summary_hi: "Village-cluster level primary processing centre ka daily operations executive — grading, sorting aur quality logging.",
    summary_en: "Day-to-day operations executive of a village-cluster-level primary processing centre — grading, sorting and quality logging.",
    salary: 25000, salaryDisplay: "₹25,000",
    eligibility_hi: "12th/Graduate, umar 21–45 saal, basic food-handling/quality-check training, Prakriya Pariksha qualify karna zaroori.",
    eligibility_en: "12th/Graduate, age 21–45, basic food-handling/quality-check training, must qualify the Prakriya Pariksha.",
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
    reportingOfficer_hi: "District Processing Centre (DPC) Executive", reportingOfficer_en: "District Processing Centre (DPC) Executive",
    careerPath_hi: ["Primary Processing Centre (PPC) Executive", "District Processing Centre (DPC) Executive", "Warehouse Manager", "Food Processing Unit Manager", "Storage Manager"],
    careerPath_en: ["Primary Processing Centre (PPC) Executive", "District Processing Centre (DPC) Executive", "Warehouse Manager", "Food Processing Unit Manager", "Storage Manager"],
    uniform_hi: "Olive-green shirt · apron · hairnet/cap · olive lanyard + ID",
    uniform_en: "Olive-green shirt · apron · hairnet/cap · olive lanyard + ID",
    monthlyTargets_hi: ["Daily throughput log 100% completion", "Wastage under 5%"],
    monthlyTargets_en: ["100% daily throughput logging", "wastage kept under 5%"],
    seniorityRank: 1, accent: accentFor("processing", 1), applicationTrack: "exam", examId: "prakriya",
  },
  {
    id: "district-processing-centre", code: "DPC", departmentId: "processing",
    title_hi: "District Processing Centre (DPC) Executive", title_en: "District Processing Centre (DPC) Executive",
    summary_hi: "District-level processing centre ka operations aur quality-control executive.",
    summary_en: "Operations and quality-control executive of a district-level processing centre.",
    salary: 30000, salaryDisplay: "₹30,000",
    eligibility_hi: "Graduate (Food Technology/Agriculture tarjeeh), umar 23–48 saal, kam se kam 1–2 saal processing-unit anubhav, Prakriya Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate (Food Technology/Agriculture preferred), age 23–48, at least 1–2 years of processing-unit experience, must qualify the Prakriya Pariksha.",
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
    reportingOfficer_hi: "Warehouse Manager", reportingOfficer_en: "Warehouse Manager",
    careerPath_hi: ["District Processing Centre (DPC) Executive", "Warehouse Manager", "Food Processing Unit Manager", "Storage Manager"],
    careerPath_en: ["District Processing Centre (DPC) Executive", "Warehouse Manager", "Food Processing Unit Manager", "Storage Manager"],
    uniform_hi: "Olive-green shirt · olive tie · apron (audits ke alawa) · olive lanyard + ID",
    uniform_en: "Olive-green shirt · olive tie · apron (except audits) · olive lanyard + ID",
    monthlyTargets_hi: ["PPC audit coverage 100%", "Dispatch SLA 95%+ on-time"],
    monthlyTargets_en: ["100% PPC audit coverage", "95%+ on-time dispatch SLA"],
    seniorityRank: 2, accent: accentFor("processing", 2), applicationTrack: "exam", examId: "prakriya",
  },
  {
    id: "warehouse-manager", code: "WM", departmentId: "processing",
    title_hi: "Warehouse Manager", title_en: "Warehouse Manager",
    summary_hi: "Warehousing operations, inventory accuracy aur dispatch efficiency ka ownership.",
    summary_en: "Owns warehousing operations, inventory accuracy and dispatch efficiency.",
    salary: 45000, salaryDisplay: "₹45,000",
    eligibility_hi: "Graduate (Supply Chain/Logistics tarjeeh), umar 25–50 saal, kam se kam 3 saal warehouse/logistics anubhav, Prakriya Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate (Supply Chain/Logistics preferred), age 25–50, at least 3 years of warehouse/logistics experience, must qualify the Prakriya Pariksha.",
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
    reportingOfficer_hi: "Food Processing Unit Manager", reportingOfficer_en: "Food Processing Unit Manager",
    careerPath_hi: ["Warehouse Manager", "Food Processing Unit Manager", "Storage Manager"],
    careerPath_en: ["Warehouse Manager", "Food Processing Unit Manager", "Storage Manager"],
    uniform_hi: "Olive-green shirt · high-vis vest · safety shoes · olive lanyard + ID",
    uniform_en: "Olive-green shirt · high-vis vest · safety shoes · olive lanyard + ID",
    monthlyTargets_hi: ["Inventory accuracy 98%+", "Dispatch scheduling SLA compliance"],
    monthlyTargets_en: ["98%+ inventory accuracy", "dispatch-scheduling SLA compliance"],
    seniorityRank: 3, accent: accentFor("processing", 3), applicationTrack: "exam", examId: "prakriya",
  },
  {
    id: "food-processing-unit-manager", code: "FPUM", departmentId: "processing",
    title_hi: "Food Processing Unit Manager", title_en: "Food Processing Unit Manager",
    summary_hi: "Food processing unit ki production, safety-compliance aur output-quality ka ownership.",
    summary_en: "Owns production, safety compliance and output quality at a food processing unit.",
    salary: 50000, salaryDisplay: "₹50,000",
    eligibility_hi: "Graduate/Post-Graduate (Food Technology tarjeeh), umar 27–52 saal, kam se kam 4–5 saal food-processing-plant anubhav, Prakriya Prabandhak Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate/Post-Graduate (Food Technology preferred), age 27–52, at least 4–5 years of food-processing-plant experience, must qualify the Prakriya Prabandhak Pariksha.",
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
    reportingOfficer_hi: "Storage Manager", reportingOfficer_en: "Storage Manager",
    careerPath_hi: ["Food Processing Unit Manager", "Storage Manager"],
    careerPath_en: ["Food Processing Unit Manager", "Storage Manager"],
    uniform_hi: "Olive-green shirt · olive tie · lab coat (floor visits) · olive lanyard + ID",
    uniform_en: "Olive-green shirt · olive tie · lab coat (on floor visits) · olive lanyard + ID",
    monthlyTargets_hi: ["Production output target meet karna", "HACCP compliance audit 100%"],
    monthlyTargets_en: ["Meet production-output target", "100% HACCP compliance audit"],
    seniorityRank: 4, accent: accentFor("processing", 4), applicationTrack: "exam", examId: "prakriya-prabandhak",
  },
  {
    id: "storage-manager", code: "SM", departmentId: "processing",
    title_hi: "Storage Manager", title_en: "Storage Manager",
    summary_hi: "Processing Division ki storage-network strategy, capacity planning aur loss-prevention ka apex ownership.",
    summary_en: "Apex ownership of the Processing Division's storage-network strategy, capacity planning and loss prevention.",
    salary: 75000, salaryDisplay: "₹75,000",
    eligibility_hi: "Post-Graduate (Supply Chain/Agribusiness tarjeeh), umar 30–55 saal, kam se kam 6–8 saal storage/cold-chain-leadership anubhav, Prakriya Prabandhak Pariksha qualify karna zaroori.",
    eligibility_en: "Post-Graduate (Supply Chain/Agribusiness preferred), age 30–55, at least 6–8 years of storage/cold-chain leadership experience, must qualify the Prakriya Prabandhak Pariksha.",
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
    reportingOfficer_hi: "Processing Division Head", reportingOfficer_en: "Processing Division Head",
    careerPath_hi: ["Storage Manager", "Processing Division Head"],
    careerPath_en: ["Storage Manager", "Processing Division Head"],
    uniform_hi: "Olive-green shirt · olive blazer · olive tie · olive lanyard + ID",
    uniform_en: "Olive-green shirt · olive blazer · olive tie · olive lanyard + ID",
    monthlyTargets_hi: ["Network-wide loss-prevention review", "Quarterly capex plan submission"],
    monthlyTargets_en: ["Network-wide loss-prevention review", "quarterly capex plan submission"],
    seniorityRank: 5, accent: accentFor("processing", 5), applicationTrack: "exam", examId: "prakriya-prabandhak",
  },

  // ---------------- CORPORATE ----------------
  {
    id: "csr-executive", code: "CSR", departmentId: "corporate",
    title_hi: "CSR Executive", title_en: "CSR Executive",
    summary_hi: "Kisan Mitra ke corporate social responsibility programs plan aur execute karna.",
    summary_en: "Plans and executes Kisan Mitra's corporate social responsibility programs.",
    salary: 25000, salaryDisplay: "₹25,000",
    eligibility_hi: "Graduate (Social Work/Rural Development tarjeeh), umar 22–42 saal, community-engagement anubhav tarjeeh, Samuday Vikas Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate (Social Work/Rural Development preferred), age 22–42, community-engagement experience preferred, must qualify the Samuday Vikas Pariksha.",
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
    reportingOfficer_hi: "Corporate Affairs Head", reportingOfficer_en: "Corporate Affairs Head",
    careerPath_hi: ["CSR Executive", "Corporate Affairs Head"],
    careerPath_en: ["CSR Executive", "Corporate Affairs Head"],
    uniform_hi: "Beige shirt · plum-accent scarf/stole · plum lanyard + ID",
    uniform_en: "Beige shirt · plum-accent scarf/stole · plum lanyard + ID",
    monthlyTargets_hi: ["CSR impact data monthly reporting", "1+ naya community partner/quarter"],
    monthlyTargets_en: ["Monthly CSR impact-data reporting", "1+ new community partner/quarter"],
    seniorityRank: 1, accent: accentFor("corporate", 1), applicationTrack: "exam", examId: "samuday-vikas",
  },
  {
    id: "agro-estate-manager", code: "AEM", departmentId: "corporate",
    title_hi: "Agro Estate Manager", title_en: "Agro Estate Manager",
    summary_hi: "Company-owned agro estates ki day-to-day operations aur upkeep manage karna.",
    summary_en: "Manages the day-to-day operations and upkeep of company-owned agro estates.",
    salary: 30000, salaryDisplay: "₹30,000",
    eligibility_hi: "Graduate (Agriculture/Estate Management tarjeeh), umar 24–48 saal, kam se kam 2 saal estate/farm-operations anubhav, Samuday Vikas Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate (Agriculture/Estate Management preferred), age 24–48, at least 2 years of estate/farm-operations experience, must qualify the Samuday Vikas Pariksha.",
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
    reportingOfficer_hi: "Corporate Affairs Head", reportingOfficer_en: "Corporate Affairs Head",
    careerPath_hi: ["Agro Estate Manager", "Corporate Affairs Head"],
    careerPath_en: ["Agro Estate Manager", "Corporate Affairs Head"],
    uniform_hi: "Beige field shirt · sun hat · plum lanyard + ID",
    uniform_en: "Beige field shirt · sun hat · plum lanyard + ID",
    monthlyTargets_hi: ["Estate yield aur cost tracking monthly", "Vendor/labour coordination review"],
    monthlyTargets_en: ["Monthly estate yield/cost tracking", "vendor/labour coordination review"],
    seniorityRank: 2, accent: accentFor("corporate", 2), applicationTrack: "exam", examId: "samuday-vikas",
  },
  {
    id: "events-team-mid", code: "ETM", departmentId: "corporate",
    title_hi: "Events Team (Mid Level)", title_en: "Events Team (Mid Level)",
    summary_hi: "Corporate aur brand events ki planning aur on-ground execution mein support karna.",
    summary_en: "Supports the planning and on-ground execution of corporate and brand events.",
    salary: 30000, salaryDisplay: "₹30,000",
    eligibility_hi: "Graduate, umar 21–38 saal, kam se kam 1 saal event-coordination anubhav, Samuday Vikas Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate, age 21–38, at least 1 year of event-coordination experience, must qualify the Samuday Vikas Pariksha.",
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
    reportingOfficer_hi: "Events Team (Senior Level)", reportingOfficer_en: "Events Team (Senior Level)",
    careerPath_hi: ["Events Team (Mid Level)", "Events Team (Senior Level)", "Corporate Affairs Head"],
    careerPath_en: ["Events Team (Mid Level)", "Events Team (Senior Level)", "Corporate Affairs Head"],
    uniform_hi: "Beige shirt · plum tie · event ID badge · plum lanyard",
    uniform_en: "Beige shirt · plum tie · event ID badge · plum lanyard",
    monthlyTargets_hi: ["Events budget/timeline on-track", "Vendor coordination SLA meet karna"],
    monthlyTargets_en: ["Events budget/timeline on-track", "meet vendor coordination SLA"],
    seniorityRank: 3, accent: accentFor("corporate", 3), applicationTrack: "exam", examId: "samuday-vikas",
  },
  {
    id: "events-team-senior", code: "ETS", departmentId: "corporate",
    title_hi: "Events Team (Senior Level)", title_en: "Events Team (Senior Level)",
    summary_hi: "Corporate aur brand events ki poori strategy, budget aur team ka ownership.",
    summary_en: "Owns the full strategy, budget and team for corporate and brand events.",
    salary: 60000, salaryDisplay: "₹60,000",
    eligibility_hi: "Graduate/Post-Graduate, umar 26–50 saal, kam se kam 5 saal event-management leadership anubhav, Netritva Pariksha qualify karna zaroori.",
    eligibility_en: "Graduate/Post-Graduate, age 26–50, at least 5 years of event-management leadership experience, must qualify the Netritva Pariksha.",
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
    reportingOfficer_hi: "Corporate Affairs Head", reportingOfficer_en: "Corporate Affairs Head",
    careerPath_hi: ["Events Team (Senior Level)", "Corporate Affairs Head"],
    careerPath_en: ["Events Team (Senior Level)", "Corporate Affairs Head"],
    uniform_hi: "Beige shirt · plum blazer · plum tie · plum lanyard + ID",
    uniform_en: "Beige shirt · plum blazer · plum tie · plum lanyard + ID",
    monthlyTargets_hi: ["Annual events calendar on-track", "Sponsor renewal rate target"],
    monthlyTargets_en: ["Annual events calendar on-track", "sponsor-renewal-rate target"],
    seniorityRank: 4, accent: accentFor("corporate", 4), applicationTrack: "exam", examId: "netritva",
  },
];

// ---------------- Legacy section support ----------------
// Phase 1 vacancy counts, decoupled from POSITIONS (no per-position vacancy
// counts were given for the expanded 21-position model). Keeps the existing
// "Vacancies" scale-up section rendering unchanged.
export const PHASE1_VACANCIES = [
  { role: "VLE", exam_hi: "Gram Sevak Pariksha", exam_en: "Gram Sevak Pariksha", count: 200 },
  { role: "VLM", exam_hi: "Gram Sevak Pariksha", exam_en: "Gram Sevak Pariksha", count: 200 },
  { role: "TEO", exam_hi: "Krishi Adhikari Pariksha", exam_en: "Krishi Adhikari Pariksha", count: 40 },
  { role: "DLO", exam_hi: "Krishi Adhikari Pariksha", exam_en: "Krishi Adhikari Pariksha", count: 12 },
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
    const title = (lang === "hi" ? p.title_hi : p.title_en).toLowerCase();
    const deptName = dept ? (lang === "hi" ? dept.name_hi : dept.name_en).toLowerCase() : "";
    return title.includes(q) || deptName.includes(q) || p.code.toLowerCase().includes(q);
  });
}

export const SALARY_BANDS = [
  { id: "all", label_hi: "Sabhi", label_en: "All", min: 0, max: Infinity },
  { id: "under-25k", label_hi: "₹25,000 tak", label_en: "Under ₹25,000", min: 0, max: 24999 },
  { id: "25k-50k", label_hi: "₹25,000 – ₹50,000", label_en: "₹25,000 – ₹50,000", min: 25000, max: 50000 },
  { id: "50k-1l", label_hi: "₹50,000 – ₹1,00,000", label_en: "₹50,000 – ₹1,00,000", min: 50001, max: 100000 },
  { id: "1l-plus", label_hi: "₹1,00,000 se zyada", label_en: "₹1,00,000+", min: 100001, max: Infinity },
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
