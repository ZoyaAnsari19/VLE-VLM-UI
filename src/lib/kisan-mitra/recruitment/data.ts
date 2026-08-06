// ============================================================
// RECRUITMENT DATA MODEL — departments, positions, selectors.
// Single source of truth for the Positions Explorer, Org Hierarchy,
// Recruitment Matrix, Recruitment Stats and the Apply form's
// position picker. Add a new position by appending to POSITIONS —
// no UI component needs to change.
//
// Assumption: eligibility/responsibilities/reporting-officer/career-path
// copy for the 20 non-Field-Ops positions was not provided by the client
// (only names + salaries were) and is authored placeholder content;
// reporting chains for those departments are inferred from seniorityRank
// (salary-tier order) within each department. Confirm with HR before
// publishing.
// ============================================================
import type { Department, Position, RecruitmentStats, Lang } from "./types";

export const DEPARTMENTS: Department[] = [
  { id: "field-operations", name_hi: "Field Operations", name_en: "Field Operations", icon: "leaf", accent: "#1B4D3E" },
  { id: "sales-marketing", name_hi: "Sales & Marketing", name_en: "Sales & Marketing", icon: "market", accent: "#C99A3B" },
  { id: "business-development", name_hi: "Business Development", name_en: "Business Development", icon: "briefcase", accent: "#8B5E34" },
  { id: "export-import", name_hi: "Export-Import", name_en: "Export-Import", icon: "globe", accent: "#1A2A4A" },
  { id: "processing", name_hi: "Processing Division", name_en: "Processing Division", icon: "factory", accent: "#4A5D23" },
  { id: "corporate", name_hi: "Corporate", name_en: "Corporate", icon: "building", accent: "#7A4869" },
];

const accentOf = (deptId: string) => DEPARTMENTS.find((d) => d.id === deptId)!.accent;

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
    careerPath_hi: ["Village Level Executive (VLE)", "Village Level Manager (VLM)", "TEO", "Division Level Officer", "Divisional Director"],
    careerPath_en: ["Village Level Executive (VLE)", "Village Level Manager (VLM)", "TEO", "Division Level Officer", "Divisional Director"],
    seniorityRank: 1, accent: accentOf("field-operations"), applicationTrack: "exam", examId: "gram-sevak",
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
    reportingOfficer_hi: "TEO", reportingOfficer_en: "TEO",
    careerPath_hi: ["Village Level Manager (VLM)", "TEO", "Division Level Officer", "Divisional Director"],
    careerPath_en: ["Village Level Manager (VLM)", "TEO", "Division Level Officer", "Divisional Director"],
    seniorityRank: 2, accent: accentOf("field-operations"), applicationTrack: "exam", examId: "gram-sevak",
  },
  {
    id: "teo", code: "TEO", departmentId: "field-operations",
    title_hi: "TEO (Tehsil Extension Officer)", title_en: "TEO (Tehsil Extension Officer)",
    summary_hi: "~5 clusters, ~15 gaon ka supervisor — bank camps, quality control, credit approvals, training.",
    summary_en: "Supervisor of ~5 clusters / ~15 villages — bank camps, quality control, credit approvals, training.",
    salary: 25000, salaryDisplay: "₹25,000",
    eligibility_hi: "Graduate (agri/management tarjeeh), umar 24–45 saal, kam se kam 2 saal field ya team-lead anubhav.",
    eligibility_en: "Graduate (agri/management preferred), age 24–45, at least 2 years of field or team-lead experience.",
    responsibilities_hi: [
      "VLM reports review",
      "Bank camps organize (200+ KCC/din)",
      "Machinery pool manage",
      "Credit approvals (input credit, KCC)",
      "Grievance escalation + anti-corruption",
      "Monthly tehsil P&L to Division Level Officer",
    ],
    responsibilities_en: [
      "Review VLM reports",
      "Organize bank camps (200+ KCC/day)",
      "Manage the machinery pool",
      "Credit approvals (input credit, KCC)",
      "Grievance escalation + anti-corruption",
      "Monthly tehsil P&L to Division Level Officer",
    ],
    reportingOfficer_hi: "Division Level Officer", reportingOfficer_en: "Division Level Officer",
    careerPath_hi: ["TEO", "Division Level Officer", "Divisional Director"],
    careerPath_en: ["TEO", "Division Level Officer", "Divisional Director"],
    seniorityRank: 3, accent: accentOf("field-operations"), applicationTrack: "exam", examId: "krishi-adhikari",
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
    seniorityRank: 4, accent: accentOf("field-operations"), applicationTrack: "exam", examId: "krishi-adhikari",
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
    reportingOfficer_hi: "Argus / RKF HQ (Lucknow)", reportingOfficer_en: "Argus / RKF HQ (Lucknow)",
    careerPath_hi: ["Divisional Director", "Zonal / HQ Leadership (Argus / RKF)"],
    careerPath_en: ["Divisional Director", "Zonal / HQ Leadership (Argus / RKF)"],
    seniorityRank: 5, accent: accentOf("field-operations"), applicationTrack: "exam", examId: "krishi-adhikari",
  },

  // ---------------- SALES & MARKETING ----------------
  {
    id: "sales-marketing-domestic", code: "SMD", departmentId: "sales-marketing",
    title_hi: "Sales & Marketing (Domestic)", title_en: "Sales & Marketing (Domestic)",
    summary_hi: "Domestic bazaar mein Kisan Mitra produce aur services ki sales-growth drive karna.",
    summary_en: "Drives domestic-market sales growth for Kisan Mitra produce and services.",
    salary: 25000, salaryDisplay: "₹25,000",
    eligibility_hi: "Graduate, umar 21–40 saal, kam se kam 1 saal sales/marketing anubhav tarjeeh.",
    eligibility_en: "Graduate, age 21–40, at least 1 year of sales/marketing experience preferred.",
    responsibilities_hi: [
      "Domestic buyer aur distributor network banana",
      "Mandi/retail sales targets meet karna",
      "Pricing aur demand ka market feedback dena",
      "Local marketing campaigns execute karna",
    ],
    responsibilities_en: [
      "Build domestic buyer and distributor network",
      "Meet mandi/retail sales targets",
      "Feed back pricing and demand insights",
      "Execute local marketing campaigns",
    ],
    reportingOfficer_hi: "Sales & Marketing Head", reportingOfficer_en: "Sales & Marketing Head",
    careerPath_hi: ["Sales & Marketing (Domestic)", "Sales & Marketing (International)", "Sales & Marketing Head"],
    careerPath_en: ["Sales & Marketing (Domestic)", "Sales & Marketing (International)", "Sales & Marketing Head"],
    seniorityRank: 1, accent: accentOf("sales-marketing"), applicationTrack: "direct",
  },
  {
    id: "sales-marketing-international", code: "SMI", departmentId: "sales-marketing",
    title_hi: "Sales & Marketing (International)", title_en: "Sales & Marketing (International)",
    summary_hi: "International buyers aur export-linked markets ke saath sales relationships build karna.",
    summary_en: "Builds sales relationships with international buyers and export-linked markets.",
    salary: 35000, salaryDisplay: "₹35,000",
    eligibility_hi: "Graduate (International Business/Marketing tarjeeh), umar 23–42 saal, English communication strong, 1–2 saal international sales anubhav.",
    eligibility_en: "Graduate (International Business/Marketing preferred), age 23–42, strong English communication, 1–2 years of international sales experience.",
    responsibilities_hi: [
      "International buyer leads generate karna",
      "Export-Import team ke saath coordinate karna",
      "Market entry aur pricing strategy support",
      "Trade fairs aur buyer meetings represent karna",
    ],
    responsibilities_en: [
      "Generate international buyer leads",
      "Coordinate with the Export-Import team",
      "Support market-entry and pricing strategy",
      "Represent the brand at trade fairs and buyer meetings",
    ],
    reportingOfficer_hi: "Sales & Marketing Head", reportingOfficer_en: "Sales & Marketing Head",
    careerPath_hi: ["Sales & Marketing (International)", "Sales & Marketing Head", "Business Head"],
    careerPath_en: ["Sales & Marketing (International)", "Sales & Marketing Head", "Business Head"],
    seniorityRank: 2, accent: accentOf("sales-marketing"), applicationTrack: "direct",
  },

  // ---------------- BUSINESS DEVELOPMENT ----------------
  {
    id: "bd-executive", code: "BDE", departmentId: "business-development",
    title_hi: "Business Development Executive (MLA CTB, RBSM & Music Festival)", title_en: "Business Development Executive (MLA CTB, RBSM & Music Festival)",
    summary_hi: "MLA CTB, RBSM aur Music Festival verticals ke liye naye business opportunities identify aur develop karna.",
    summary_en: "Identifies and develops new business opportunities across the MLA CTB, RBSM and Music Festival verticals.",
    salary: 30000, salaryDisplay: "₹30,000",
    eligibility_hi: "Graduate, umar 22–40 saal, kam se kam 1–2 saal business development/event-sales anubhav.",
    eligibility_en: "Graduate, age 22–40, at least 1–2 years of business development/event-sales experience.",
    responsibilities_hi: [
      "Naye leads aur partnerships identify karna",
      "Client/sponsor relationships manage karna",
      "Proposals aur pitch decks taiyar karna",
      "Manager ko pipeline report karna",
    ],
    responsibilities_en: [
      "Identify new leads and partnerships",
      "Manage client/sponsor relationships",
      "Prepare proposals and pitch decks",
      "Report pipeline to the Manager",
    ],
    reportingOfficer_hi: "Business Development Manager", reportingOfficer_en: "Business Development Manager",
    careerPath_hi: ["Business Development Executive", "Business Development Manager", "Business Development Head"],
    careerPath_en: ["Business Development Executive", "Business Development Manager", "Business Development Head"],
    seniorityRank: 1, accent: accentOf("business-development"), applicationTrack: "direct",
  },
  {
    id: "bd-manager", code: "BDM", departmentId: "business-development",
    title_hi: "Business Development Manager (MLA CTB, RBSM & Music Festival)", title_en: "Business Development Manager (MLA CTB, RBSM & Music Festival)",
    summary_hi: "MLA CTB, RBSM aur Music Festival verticals ki business-development strategy aur team lead karna.",
    summary_en: "Leads business-development strategy and team across the MLA CTB, RBSM and Music Festival verticals.",
    salary: 45000, salaryDisplay: "₹45,000",
    eligibility_hi: "Graduate/Post-Graduate, umar 26–48 saal, kam se kam 4 saal business development anubhav, team-lead history.",
    eligibility_en: "Graduate/Post-Graduate, age 26–48, at least 4 years of business development experience with a team-lead track record.",
    responsibilities_hi: [
      "BD Executives ki team lead karna",
      "Key-account aur sponsor relationships own karna",
      "Revenue targets aur strategy set karna",
      "Divisional Director ko monthly report",
    ],
    responsibilities_en: [
      "Lead the team of Business Development Executives",
      "Own key-account and sponsor relationships",
      "Set revenue targets and strategy",
      "Monthly reporting to the Divisional Director",
    ],
    reportingOfficer_hi: "Business Development Head", reportingOfficer_en: "Business Development Head",
    careerPath_hi: ["Business Development Manager", "Business Development Head", "Business Head"],
    careerPath_en: ["Business Development Manager", "Business Development Head", "Business Head"],
    seniorityRank: 2, accent: accentOf("business-development"), applicationTrack: "direct",
  },

  // ---------------- EXPORT-IMPORT ----------------
  {
    id: "import-manager", code: "IM", departmentId: "export-import",
    title_hi: "Import Manager", title_en: "Import Manager",
    summary_hi: "Kisan Mitra ecosystem ke liye imported inputs/equipment ki sourcing aur compliance manage karna.",
    summary_en: "Manages sourcing and compliance for imported inputs/equipment for the Kisan Mitra ecosystem.",
    salary: 35000, salaryDisplay: "₹35,000",
    eligibility_hi: "Graduate (International Trade/Supply Chain tarjeeh), umar 25–45 saal, kam se kam 2–3 saal import operations anubhav.",
    eligibility_en: "Graduate (International Trade/Supply Chain preferred), age 25–45, at least 2–3 years of import-operations experience.",
    responsibilities_hi: [
      "Overseas suppliers ke saath sourcing negotiate karna",
      "Customs, duties aur documentation manage karna",
      "Shipment timelines aur quality checks track karna",
      "Export Import Director ko report karna",
    ],
    responsibilities_en: [
      "Negotiate sourcing with overseas suppliers",
      "Manage customs, duties and documentation",
      "Track shipment timelines and quality checks",
      "Report to the Export Import Director",
    ],
    reportingOfficer_hi: "Export Import Director", reportingOfficer_en: "Export Import Director",
    careerPath_hi: ["Import Manager", "Export Import Director"],
    careerPath_en: ["Import Manager", "Export Import Director"],
    seniorityRank: 1, accent: accentOf("export-import"), applicationTrack: "direct",
  },
  {
    id: "export-manager", code: "EM", departmentId: "export-import",
    title_hi: "Export Manager", title_en: "Export Manager",
    summary_hi: "Kisan Mitra produce ke liye international buyers ko export shipments manage karna.",
    summary_en: "Manages export shipments of Kisan Mitra produce to international buyers.",
    salary: 45000, salaryDisplay: "₹45,000",
    eligibility_hi: "Graduate (International Trade/Agribusiness tarjeeh), umar 26–46 saal, kam se kam 3 saal export operations anubhav.",
    eligibility_en: "Graduate (International Trade/Agribusiness preferred), age 26–46, at least 3 years of export-operations experience.",
    responsibilities_hi: [
      "International buyer contracts negotiate karna",
      "Export documentation aur compliance handle karna",
      "Quality aur packaging standards ensure karna",
      "Export Import Director ko report karna",
    ],
    responsibilities_en: [
      "Negotiate international buyer contracts",
      "Handle export documentation and compliance",
      "Ensure quality and packaging standards",
      "Report to the Export Import Director",
    ],
    reportingOfficer_hi: "Export Import Director", reportingOfficer_en: "Export Import Director",
    careerPath_hi: ["Export Manager", "Export Import Director"],
    careerPath_en: ["Export Manager", "Export Import Director"],
    seniorityRank: 2, accent: accentOf("export-import"), applicationTrack: "direct",
  },
  {
    id: "export-import-director", code: "EID", departmentId: "export-import",
    title_hi: "Export Import Director", title_en: "Export Import Director",
    summary_hi: "Export-Import vertical ki poori strategy, compliance aur P&L ka ownership.",
    summary_en: "Owns the entire Export-Import vertical's strategy, compliance and P&L.",
    salary: 150000, salaryDisplay: "₹1,50,000",
    eligibility_hi: "Post-Graduate (International Trade/MBA tarjeeh), umar 35–58 saal, kam se kam 8–10 saal senior trade-leadership anubhav.",
    eligibility_en: "Post-Graduate (International Trade/MBA preferred), age 35–58, at least 8–10 years of senior trade-leadership experience.",
    responsibilities_hi: [
      "Import aur Export Managers ka oversight",
      "International trade policy aur compliance ownership",
      "Strategic buyer/supplier partnerships",
      "HQ ko vertical P&L report karna",
    ],
    responsibilities_en: [
      "Oversight of the Import and Export Managers",
      "Ownership of international trade policy and compliance",
      "Strategic buyer/supplier partnerships",
      "Report vertical P&L to HQ",
    ],
    reportingOfficer_hi: "Argus / RKF HQ (Lucknow)", reportingOfficer_en: "Argus / RKF HQ (Lucknow)",
    careerPath_hi: ["Export Import Director", "Zonal / HQ Leadership (Argus / RKF)"],
    careerPath_en: ["Export Import Director", "Zonal / HQ Leadership (Argus / RKF)"],
    seniorityRank: 3, accent: accentOf("export-import"), applicationTrack: "direct",
  },

  // ---------------- PROCESSING DIVISION ----------------
  {
    id: "primary-processing-centre", code: "PPC", departmentId: "processing",
    title_hi: "Primary Processing Centre (In-Charge)", title_en: "Primary Processing Centre (In-Charge)",
    summary_hi: "Village-cluster level primary processing centre ka daily operations in-charge.",
    summary_en: "Day-to-day operations in-charge of a village-cluster-level primary processing centre.",
    salary: 25000, salaryDisplay: "₹25,000",
    eligibility_hi: "12th/Graduate, umar 21–45 saal, basic food-handling/quality-check training.",
    eligibility_en: "12th/Graduate, age 21–45, basic food-handling/quality-check training.",
    responsibilities_hi: [
      "Incoming produce ki grading aur sorting",
      "Basic cleaning/processing equipment chalana",
      "Daily throughput aur wastage log karna",
      "District Processing Centre ko report karna",
    ],
    responsibilities_en: [
      "Grade and sort incoming produce",
      "Operate basic cleaning/processing equipment",
      "Log daily throughput and wastage",
      "Report to the District Processing Centre",
    ],
    reportingOfficer_hi: "District Processing Centre (In-Charge)", reportingOfficer_en: "District Processing Centre (In-Charge)",
    careerPath_hi: ["Primary Processing Centre", "District Processing Centre", "Warehouse Manager", "Food Processing Unit Manager", "Storage Manager"],
    careerPath_en: ["Primary Processing Centre", "District Processing Centre", "Warehouse Manager", "Food Processing Unit Manager", "Storage Manager"],
    seniorityRank: 1, accent: accentOf("processing"), applicationTrack: "direct",
  },
  {
    id: "district-processing-centre", code: "DPC", departmentId: "processing",
    title_hi: "District Processing Centre (In-Charge)", title_en: "District Processing Centre (In-Charge)",
    summary_hi: "District-level processing centre ka operations aur quality-control in-charge.",
    summary_en: "Operations and quality-control in-charge of a district-level processing centre.",
    salary: 30000, salaryDisplay: "₹30,000",
    eligibility_hi: "Graduate (Food Technology/Agriculture tarjeeh), umar 23–48 saal, kam se kam 1–2 saal processing-unit anubhav.",
    eligibility_en: "Graduate (Food Technology/Agriculture preferred), age 23–48, at least 1–2 years of processing-unit experience.",
    responsibilities_hi: [
      "Multiple Primary Processing Centres ka oversight",
      "Quality-control standards enforce karna",
      "Inventory aur dispatch coordinate karna",
      "Warehouse Manager ko report karna",
    ],
    responsibilities_en: [
      "Oversight of multiple Primary Processing Centres",
      "Enforce quality-control standards",
      "Coordinate inventory and dispatch",
      "Report to the Warehouse Manager",
    ],
    reportingOfficer_hi: "Warehouse Manager", reportingOfficer_en: "Warehouse Manager",
    careerPath_hi: ["District Processing Centre", "Warehouse Manager", "Food Processing Unit Manager", "Storage Manager"],
    careerPath_en: ["District Processing Centre", "Warehouse Manager", "Food Processing Unit Manager", "Storage Manager"],
    seniorityRank: 2, accent: accentOf("processing"), applicationTrack: "direct",
  },
  {
    id: "warehouse-manager", code: "WM", departmentId: "processing",
    title_hi: "Warehouse Manager", title_en: "Warehouse Manager",
    summary_hi: "Warehousing operations, inventory accuracy aur dispatch efficiency ka ownership.",
    summary_en: "Owns warehousing operations, inventory accuracy and dispatch efficiency.",
    salary: 45000, salaryDisplay: "₹45,000",
    eligibility_hi: "Graduate (Supply Chain/Logistics tarjeeh), umar 25–50 saal, kam se kam 3 saal warehouse/logistics anubhav.",
    eligibility_en: "Graduate (Supply Chain/Logistics preferred), age 25–50, at least 3 years of warehouse/logistics experience.",
    responsibilities_hi: [
      "Multiple District Processing Centres se coordinate karna",
      "Inventory accuracy aur stock audits",
      "Dispatch scheduling aur logistics",
      "Food Processing Unit Manager ko report karna",
    ],
    responsibilities_en: [
      "Coordinate with multiple District Processing Centres",
      "Inventory accuracy and stock audits",
      "Dispatch scheduling and logistics",
      "Report to the Food Processing Unit Manager",
    ],
    reportingOfficer_hi: "Food Processing Unit Manager", reportingOfficer_en: "Food Processing Unit Manager",
    careerPath_hi: ["Warehouse Manager", "Food Processing Unit Manager", "Storage Manager"],
    careerPath_en: ["Warehouse Manager", "Food Processing Unit Manager", "Storage Manager"],
    seniorityRank: 3, accent: accentOf("processing"), applicationTrack: "direct",
  },
  {
    id: "food-processing-unit-manager", code: "FPUM", departmentId: "processing",
    title_hi: "Food Processing Unit Manager", title_en: "Food Processing Unit Manager",
    summary_hi: "Food processing unit ki production, safety-compliance aur output-quality ka ownership.",
    summary_en: "Owns production, safety compliance and output quality at a food processing unit.",
    salary: 50000, salaryDisplay: "₹50,000",
    eligibility_hi: "Graduate/Post-Graduate (Food Technology tarjeeh), umar 27–52 saal, kam se kam 4–5 saal food-processing-plant anubhav.",
    eligibility_en: "Graduate/Post-Graduate (Food Technology preferred), age 27–52, at least 4–5 years of food-processing-plant experience.",
    responsibilities_hi: [
      "Production planning aur unit output ownership",
      "Food-safety aur compliance standards (FSSAI)",
      "Warehouse Managers ke saath coordination",
      "Storage Manager ko report karna",
    ],
    responsibilities_en: [
      "Own production planning and unit output",
      "Food-safety and compliance standards (FSSAI)",
      "Coordinate with Warehouse Managers",
      "Report to the Storage Manager",
    ],
    reportingOfficer_hi: "Storage Manager", reportingOfficer_en: "Storage Manager",
    careerPath_hi: ["Food Processing Unit Manager", "Storage Manager"],
    careerPath_en: ["Food Processing Unit Manager", "Storage Manager"],
    seniorityRank: 4, accent: accentOf("processing"), applicationTrack: "direct",
  },
  {
    id: "storage-manager", code: "SM", departmentId: "processing",
    title_hi: "Storage Manager", title_en: "Storage Manager",
    summary_hi: "Processing Division ki storage-network strategy, capacity planning aur loss-prevention ka apex ownership.",
    summary_en: "Apex ownership of the Processing Division's storage-network strategy, capacity planning and loss prevention.",
    salary: 75000, salaryDisplay: "₹75,000",
    eligibility_hi: "Post-Graduate (Supply Chain/Agribusiness tarjeeh), umar 30–55 saal, kam se kam 6–8 saal storage/cold-chain-leadership anubhav.",
    eligibility_en: "Post-Graduate (Supply Chain/Agribusiness preferred), age 30–55, at least 6–8 years of storage/cold-chain leadership experience.",
    responsibilities_hi: [
      "Poore storage/warehousing network ka oversight",
      "Capacity planning aur loss-prevention strategy",
      "Food Processing Unit Managers ka performance review",
      "Processing Division Head/HQ ko report karna",
    ],
    responsibilities_en: [
      "Oversight of the entire storage/warehousing network",
      "Capacity-planning and loss-prevention strategy",
      "Performance review of Food Processing Unit Managers",
      "Report to the Processing Division Head/HQ",
    ],
    reportingOfficer_hi: "Processing Division Head", reportingOfficer_en: "Processing Division Head",
    careerPath_hi: ["Storage Manager", "Processing Division Head"],
    careerPath_en: ["Storage Manager", "Processing Division Head"],
    seniorityRank: 5, accent: accentOf("processing"), applicationTrack: "direct",
  },

  // ---------------- CORPORATE ----------------
  {
    id: "csr-executive", code: "CSR", departmentId: "corporate",
    title_hi: "CSR Executive", title_en: "CSR Executive",
    summary_hi: "Kisan Mitra ke corporate social responsibility programs plan aur execute karna.",
    summary_en: "Plans and executes Kisan Mitra's corporate social responsibility programs.",
    salary: 25000, salaryDisplay: "₹25,000",
    eligibility_hi: "Graduate (Social Work/Rural Development tarjeeh), umar 22–42 saal, community-engagement anubhav tarjeeh.",
    eligibility_en: "Graduate (Social Work/Rural Development preferred), age 22–42, community-engagement experience preferred.",
    responsibilities_hi: [
      "CSR project execution aur ground-level coordination",
      "Community partner relationships manage karna",
      "Impact data collect aur report karna",
      "Corporate Affairs Head ko report karna",
    ],
    responsibilities_en: [
      "CSR project execution and ground-level coordination",
      "Manage community-partner relationships",
      "Collect and report impact data",
      "Report to the Corporate Affairs Head",
    ],
    reportingOfficer_hi: "Corporate Affairs Head", reportingOfficer_en: "Corporate Affairs Head",
    careerPath_hi: ["CSR Executive", "Corporate Affairs Head"],
    careerPath_en: ["CSR Executive", "Corporate Affairs Head"],
    seniorityRank: 1, accent: accentOf("corporate"), applicationTrack: "direct",
  },
  {
    id: "agro-estate-manager", code: "AEM", departmentId: "corporate",
    title_hi: "Agro Estate Manager", title_en: "Agro Estate Manager",
    summary_hi: "Company-owned agro estates ki day-to-day operations aur upkeep manage karna.",
    summary_en: "Manages the day-to-day operations and upkeep of company-owned agro estates.",
    salary: 30000, salaryDisplay: "₹30,000",
    eligibility_hi: "Graduate (Agriculture/Estate Management tarjeeh), umar 24–48 saal, kam se kam 2 saal estate/farm-operations anubhav.",
    eligibility_en: "Graduate (Agriculture/Estate Management preferred), age 24–48, at least 2 years of estate/farm-operations experience.",
    responsibilities_hi: [
      "Estate operations aur maintenance ka ownership",
      "Labour aur vendor coordination",
      "Yield aur cost tracking",
      "Corporate Affairs Head ko report karna",
    ],
    responsibilities_en: [
      "Own estate operations and maintenance",
      "Labour and vendor coordination",
      "Yield and cost tracking",
      "Report to the Corporate Affairs Head",
    ],
    reportingOfficer_hi: "Corporate Affairs Head", reportingOfficer_en: "Corporate Affairs Head",
    careerPath_hi: ["Agro Estate Manager", "Corporate Affairs Head"],
    careerPath_en: ["Agro Estate Manager", "Corporate Affairs Head"],
    seniorityRank: 2, accent: accentOf("corporate"), applicationTrack: "direct",
  },
  {
    id: "events-team-mid", code: "ETM", departmentId: "corporate",
    title_hi: "Events Team (Mid Level)", title_en: "Events Team (Mid Level)",
    summary_hi: "Corporate aur brand events ki planning aur on-ground execution mein support karna.",
    summary_en: "Supports the planning and on-ground execution of corporate and brand events.",
    salary: 30000, salaryDisplay: "₹30,000",
    eligibility_hi: "Graduate, umar 21–38 saal, kam se kam 1 saal event-coordination anubhav.",
    eligibility_en: "Graduate, age 21–38, at least 1 year of event-coordination experience.",
    responsibilities_hi: [
      "Event logistics aur vendor coordination",
      "On-ground execution support",
      "Budget aur timeline tracking",
      "Events Team (Senior Level) ko report karna",
    ],
    responsibilities_en: [
      "Event logistics and vendor coordination",
      "On-ground execution support",
      "Budget and timeline tracking",
      "Report to the Events Team (Senior Level)",
    ],
    reportingOfficer_hi: "Events Team (Senior Level)", reportingOfficer_en: "Events Team (Senior Level)",
    careerPath_hi: ["Events Team (Mid Level)", "Events Team (Senior Level)", "Corporate Affairs Head"],
    careerPath_en: ["Events Team (Mid Level)", "Events Team (Senior Level)", "Corporate Affairs Head"],
    seniorityRank: 3, accent: accentOf("corporate"), applicationTrack: "direct",
  },
  {
    id: "events-team-senior", code: "ETS", departmentId: "corporate",
    title_hi: "Events Team (Senior Level)", title_en: "Events Team (Senior Level)",
    summary_hi: "Corporate aur brand events ki poori strategy, budget aur team ka ownership.",
    summary_en: "Owns the full strategy, budget and team for corporate and brand events.",
    salary: 60000, salaryDisplay: "₹60,000",
    eligibility_hi: "Graduate/Post-Graduate, umar 26–50 saal, kam se kam 5 saal event-management leadership anubhav.",
    eligibility_en: "Graduate/Post-Graduate, age 26–50, at least 5 years of event-management leadership experience.",
    responsibilities_hi: [
      "Events strategy aur annual calendar ownership",
      "Mid-level events team lead karna",
      "Sponsor/vendor negotiations",
      "Corporate Affairs Head ko report karna",
    ],
    responsibilities_en: [
      "Own events strategy and the annual calendar",
      "Lead the mid-level events team",
      "Sponsor/vendor negotiations",
      "Report to the Corporate Affairs Head",
    ],
    reportingOfficer_hi: "Corporate Affairs Head", reportingOfficer_en: "Corporate Affairs Head",
    careerPath_hi: ["Events Team (Senior Level)", "Corporate Affairs Head"],
    careerPath_en: ["Events Team (Senior Level)", "Corporate Affairs Head"],
    seniorityRank: 4, accent: accentOf("corporate"), applicationTrack: "direct",
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
