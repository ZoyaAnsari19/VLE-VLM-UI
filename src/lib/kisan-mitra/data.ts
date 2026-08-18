// ============================================================
// KISAN MITRA BHARTI PARIKSHA 2026 — DATA LAYER
// All content embedded. No external dependency.
// ============================================================

export const DIVISIONS = [
  "Konkan", "Pune", "Nashik", "Aurangabad (Chhatrapati Sambhajinagar)", "Amravati", "Nagpur"
];

export const STATS = [
  { value: 452, icon: "users", label_hi: "Officer Posts", label_en: "Officer Posts", sublabel_hi: "Phase 1 Officer Posts", sublabel_en: "Phase 1 Officer Posts" },
  { value: 6, icon: "building", label_hi: "Revenue Divisions", label_en: "Revenue Divisions", sublabel_hi: "Maharashtra bhar mein", sublabel_en: "Across Maharashtra" },
  { value: 600, icon: "home", label_hi: "Pilot Villages", label_en: "Pilot Villages", sublabel_hi: "Maharashtra bhar mein", sublabel_en: "Across Maharashtra" },
  { value: 0, display: "₹35K–80K", icon: "rupee", label_hi: "Monthly Salary (Full Pay)", label_en: "Monthly Salary (Full Pay)", sublabel_hi: "Aakarshak salary package", sublabel_en: "Attractive Salary Package" }
];

// Thematic mini-cards shown alongside the hero copy — not tied to any
// specific role/position (the site now spans 21 positions across 6
// departments; role selection happens in the Positions Explorer/Apply
// flow, not the hero).
export const MISSION_HIGHLIGHTS = [
  { icon: "briefcase", color: "navy", label_hi: "Employment generation", label_en: "Employment generation" },
  { icon: "users", color: "green", label_hi: "Farmer service", label_en: "Farmer service" },
  { icon: "seedling", color: "mint", label_hi: "Gaon ka vikas", label_en: "Village development" },
  { icon: "compass", color: "blue", label_hi: "Palayan ka ant", label_en: "End of migration" },
];

export const HERO_VIKAS = [
  { icon: "leaf", title_hi: "Kisaan ka Vikas", title_en: "Farmer's Growth", sub_hi: "Kisano ko sashakt banana", sub_en: "Empowering Farmers" },
  { icon: "users", title_hi: "Desh ka Vikas", title_en: "Nation's Growth", sub_hi: "Ek majboot Bharat ka nirmaan", sub_en: "Building a Stronger India" },
  { icon: "trendingUp", title_hi: "Vikas ka Saathi", title_en: "Partner in Progress", sub_hi: "Gramin badlaav ke saath", sub_en: "Together for Rural Transformation" }
];

export const ROLES = [
  {
    code: "VLE",
    accent: "#2D5A1B",
    title_hi: "Village Level Executive",
    title_en: "Village Level Executive",
    who_hi: "3 gaanv ka direct kisan-interface. Field officer jo roz gaon mein rahega.",
    who_en: "Direct farmer interface for 3 villages. A field officer present daily on the ground.",
    card_hi: "3-gaon ke cluster ka mukhya kisan-sampark. Kaam: farmer enrollment, mitti ke sample lena, input/beej-khaad dena, fasal collection, rozana gaon ke daure. (Gram Sevak Pariksha se chune jaate hain.)",
    card_en: "Primary farmer contact for a 3-village cluster. Work: farmer enrollment, soil samples, inputs/seeds-fertilizer, crop collection, daily village rounds. (Selected via Gram Sevak Pariksha.)",
    reports_hi: "VLM (same cluster)",
    reports_en: "VLM (same cluster)",
    coverage_hi: "3 villages daily",
    coverage_en: "3 villages daily",
    train: "₹15,000",
    full: "₹35,000",
    extra_hi: "+ ₹500 bonus per 10 new paid members",
    extra_en: "+ ₹500 bonus per 10 new paid members",
    exam_hi: "Gram Sevak Pariksha",
    exam_en: "Gram Sevak Pariksha",
    uniform_hi: "Light beige shirt · dark green trousers · sling bag · tablet · green lanyard + ID",
    uniform_en: "Light beige shirt · dark green trousers · sling bag · tablet · green lanyard + ID",
    count: 200,
    img: "/images/vle-with-field.png",
    duties_hi: [
      "Gaon mein daily rounds (branded EV)",
      "Kisan registration (Aadhaar-linked)",
      "Soil testing (7-in-1 sensor)",
      "Fasal Calendar banana",
      "Certified seeds/fertilizer on credit",
      "Sarkari scheme enrollment (Eligibility Checker)",
      "Fasal collection (weighbridge, 48-hr UPI payment)",
      "Daily report to VLM"
    ],
    duties_en: [
      "Daily village rounds (branded EV)",
      "Farmer registration (Aadhaar-linked)",
      "Soil testing (7-in-1 sensor)",
      "Build Crop Calendar",
      "Certified seeds/fertilizer on credit",
      "Govt scheme enrollment (Eligibility Checker)",
      "Crop collection (weighbridge, 48-hr UPI payment)",
      "Daily report to VLM"
    ]
  },
  {
    code: "VLM",
    accent: "#1B4D3E",
    title_hi: "Village Level Manager",
    title_en: "Village Level Manager",
    who_hi: "Cluster captain — 3 gaanv ka data, accountability & coordination. VLE ka senior.",
    who_en: "Cluster captain — data, accountability & coordination across 3 villages. The VLE's senior.",
    card_hi: "Cluster ka senior lead, VLE ke saath jodi me. Kaam: data/admin, device aur payments, shikayat nivaran, bank/panchayat se taalmel, monthly reporting. (VLM, VLE se senior aur zyada salary wala — dono ek hi Gram Sevak Pariksha se: top scorers — VLM, agle — VLE.)",
    card_en: "Senior cluster lead, paired with the VLE. Work: data/admin, devices and payments, grievance resolution, bank/panchayat coordination, monthly reporting. (VLM is senior to VLE with higher salary — both from the same Gram Sevak Pariksha: top scorers → VLM, next → VLE.)",
    reports_hi: "TLO",
    reports_en: "TLO",
    coverage_hi: "VLEs (same cluster)",
    coverage_en: "VLEs (same cluster)",
    train: "₹18,000",
    full: "₹45,000",
    extra_hi: "Top scorers → VLM",
    extra_en: "Top scorers → VLM",
    exam_hi: "Gram Sevak Pariksha",
    exam_en: "Gram Sevak Pariksha",
    uniform_hi: "Beige shirt · dark green TIE · dark green trousers · laptop bag",
    uniform_en: "Beige shirt · dark green TIE · dark green trousers · laptop bag",
    count: 200,
    img: "/images/vlm-with-field.png",
    duties_hi: [
      "VLE data verify karna",
      "Cluster dashboard monitor (members, collection, schemes, payments)",
      "Bank & Panchayat liaison",
      "Kisan shikayat handle (grievance box)",
      "Payment verification (UPI settlement)",
      "Weekly report to TLO"
    ],
    duties_en: [
      "Verify VLE data",
      "Monitor cluster dashboard (members, collection, schemes, payments)",
      "Bank & Panchayat liaison",
      "Handle farmer grievances",
      "Payment verification (UPI settlement)",
      "Weekly report to TLO"
    ]
  },
  {
    code: "TLO",
    accent: "#4A5D23",
    title_hi: "Tehsil Leader Officer",
    title_en: "Tehsil Leader Officer",
    who_hi: "~5 clusters, ~15 gaanv ka commander — bank camps, quality, credit.",
    who_en: "Commander of ~5 clusters, ~15 villages — bank camps, quality, credit.",
    card_hi: "~5 cluster / ~15 gaon ka supervisor. Kaam: bank camps, quality control, credit approvals, shikayat escalation, training. (Krishi Adhikari Pariksha se.)",
    card_en: "Supervisor of ~5 clusters / ~15 villages. Work: bank camps, quality control, credit approvals, grievance escalation, training. (Via Krishi Adhikari Pariksha.)",
    reports_hi: "DLO",
    reports_en: "DLO",
    coverage_hi: "~5 clusters, ~15 villages, ~10 VLE/VLM",
    coverage_en: "~5 clusters, ~15 villages, ~10 VLE/VLM",
    train: "₹22,000",
    full: "₹60,000",
    extra_hi: "Krishi Adhikari Pariksha",
    extra_en: "Krishi Adhikari Pariksha",
    exam_hi: "Krishi Adhikari Pariksha",
    exam_en: "Krishi Adhikari Pariksha",
    uniform_hi: "White shirt · dark olive-green BLAZER · beige/khaki trousers · dark green tie",
    uniform_en: "White shirt · dark olive-green BLAZER · beige/khaki trousers · dark green tie",
    count: 40,
    img: "/images/tlo-with-vlm.png",
    duties_hi: [
      "VLM reports review",
      "Bank camps organize (200+ KCC/day)",
      "Machinery pool manage (70%+ utilization)",
      "Credit approvals (input credit, KCC, pledge finance)",
      "Grievance escalation + anti-corruption",
      "Crop aggregation supervise (FPO 10–50 tonne lots)",
      "Officer training workshops",
      "Monthly tehsil P&L to DLO"
    ],
    duties_en: [
      "Review VLM reports",
      "Organize bank camps (200+ KCC/day)",
      "Manage machinery pool (70%+ utilization)",
      "Credit approvals (input credit, KCC, pledge finance)",
      "Grievance escalation + anti-corruption",
      "Supervise crop aggregation (FPO 10–50 tonne lots)",
      "Officer training workshops",
      "Monthly tehsil P&L to DLO"
    ]
  },
  {
    code: "DLO",
    accent: "#1A2A4A",
    title_hi: "Division Level Officer",
    title_en: "Division Level Officer",
    who_hi: "1 revenue division ka architect — partnerships, P&L ownership, HQ reporting.",
    who_en: "Architect of 1 revenue division — partnerships, P&L ownership, HQ reporting.",
    card_hi: "Poore division ka officer (1 per division). Kaam: partnerships, audits, bulk deals, P&L, HQ reporting. (Krishi Adhikari Pariksha se.)",
    card_en: "Officer for the entire division (1 per division). Work: partnerships, audits, bulk deals, P&L, HQ reporting. (Via Krishi Adhikari Pariksha.)",
    reports_hi: "Argus / RKF HQ (Mumbai)",
    reports_en: "Argus / RKF HQ (Mumbai)",
    coverage_hi: "1 full division (TLOs under him)",
    coverage_en: "1 full division (TLOs under him)",
    train: "₹26,000",
    full: "₹80,000",
    extra_hi: "Krishi Adhikari Pariksha",
    extra_en: "Krishi Adhikari Pariksha",
    exam_hi: "Krishi Adhikari Pariksha",
    exam_en: "Krishi Adhikari Pariksha",
    uniform_hi: "Light shirt · Navy/Grey BLAZER · dark green tie · dark grey/black trousers · wristwatch",
    uniform_en: "Light shirt · Navy/Grey BLAZER · dark green tie · dark grey/black trousers · wristwatch",
    count: 12,
    img: "/images/dlo-with-tlo.png",
    duties_hi: [
      "TLO reports consolidate (division P&L, KPIs, data audit)",
      "State-level partnerships (Agri Dept, NABARD, banks, agri-business)",
      "Inter-tehsil logistics + export linkage",
      "Regulatory navigation (APMC, NBFC, DPDP compliance)",
      "Carbon credit integration",
      "TLO performance review",
      "Monthly division report to HQ"
    ],
    duties_en: [
      "Consolidate TLO reports (division P&L, KPIs, data audit)",
      "State-level partnerships (Agri Dept, NABARD, banks, agri-business)",
      "Inter-tehsil logistics + export linkage",
      "Regulatory navigation (APMC, NBFC, DPDP compliance)",
      "Carbon credit integration",
      "TLO performance review",
      "Monthly division report to HQ"
    ]
  }
];

export const SALARY_TABLE = [
  { role: "VLE", reports: "VLM", train: "₹15,000", full: "₹35,000", count: 200 },
  { role: "VLM", reports: "TLO", train: "₹18,000", full: "₹45,000", count: 200 },
  { role: "TLO", reports: "DLO", train: "₹22,000", full: "₹60,000", count: 40 },
  { role: "DLO", reports: "HQ (Mumbai)", train: "₹26,000", full: "₹80,000", count: 12 }
];

export const EXAMS = [
  {
    id: "gram-sevak",
    name_hi: "Gram Sevak Pariksha",
    name_en: "Gram Sevak Pariksha",
    for_hi: "VLE / VLM",
    for_en: "VLE / VLM",
    fee: 500,
    duration_hi: "90 minutes",
    duration_en: "90 minutes",
    questions_hi: "100 MCQ (1 mark each)",
    questions_en: "100 MCQ (1 mark each)",
    sections: [
      "General Knowledge — 25",
      "Agriculture & Rural Development — 50",
      "Hindi — 15",
      "Numerical — 10"
    ],
    negative_hi: "−0.25 per wrong answer",
    negative_en: "−0.25 per wrong answer",
    qualifying: "60 / 100",
    note_hi: "Top scorers → VLM, next tier → VLE",
    note_en: "Top scorers → VLM, next tier → VLE",
    samples: [
      { q: "Maharashtra mein zyadatar field crops ke liye ideal soil pH range hai:", opts: ["3.5–4.5", "6.0–7.5", "8.5–9.5", "10–11"], correct: 1 },
      { q: "PM-KISAN ke tehat eligible kisan parivaar ko saalana DBT milti hai:", opts: ["₹2,000", "₹4,000", "₹6,000", "₹10,000"], correct: 2 },
      { q: "Kisan Credit Card (KCC) par crop loan ka effective interest aam taur par hota hai:", opts: ["~4%", "9%", "12%", "18%"], correct: 0 },
      { q: "2-acre plot, 18 quintal/acre, mandi price ₹2,200/quintal — gross value:", opts: ["₹39,600", "₹79,200", "₹19,800", "₹1,58,400"], correct: 1 },
      { q: "\"खेत तालाब\" (khet-talab) ka matlab hai:", opts: ["farm pond", "tractor", "fertiliser", "crop disease"], correct: 0 },
      { q: "MGNREGA kitne din ka wage employment guarantee karta hai (per rural household/year):", opts: ["50", "100", "150", "365"], correct: 1 }
    ]
  },
  {
    id: "krishi-adhikari",
    name_hi: "Krishi Adhikari Pariksha",
    name_en: "Krishi Adhikari Pariksha",
    for_hi: "TEO / Division Level Officer / Divisional Director",
    for_en: "TEO / Division Level Officer / Divisional Director",
    fee: 1000,
    duration_hi: "120 minutes",
    duration_en: "120 minutes",
    questions_hi: "150 MCQ (1 mark) + 10 short-answer (2 marks) = 170 marks",
    questions_en: "150 MCQ (1 mark) + 10 short-answer (2 marks) = 170 marks",
    sections: [
      "GK — 30",
      "Agri Policy — 40",
      "Leadership & Management — 40",
      "Hindi — 20",
      "Case studies — 20",
      "Essays — 10"
    ],
    negative_hi: "−0.33 per wrong MCQ (none for essays)",
    negative_en: "−0.33 per wrong MCQ (none for essays)",
    qualifying: "100 / 170",
    note_hi: "Graduate (agri/management preferred)",
    note_en: "Graduate (agri/management preferred)",
    samples: [
      { q: "PMFBY ke tehat Kharif food/oilseed crop ke liye farmer premium share capped hai:", opts: ["1.5%", "2%", "5%", "10%"], correct: 1 },
      { q: "Ek TEO 10 field officers supervise kar raha hai; ek cluster consistently enrollment target miss kar raha hai. Pehla management step:", opts: ["VLE terminate karo", "Cluster ka data review + field visit karke root cause diagnose karo", "Budget cut", "Ignore"], correct: 1 },
      { q: "Bank 0.4% referral deta hai KCC par; TEO ki taluka ₹5 Cr KCC facilitate karti hai — referral income:", opts: ["₹20,000", "₹2,00,000", "₹2,000", "₹20,00,000"], correct: 1 },
      { q: "(Short answer) ≤80 words mein bataao: ek single-day bank camp kaise chalaoge jisme 200 farmers KCC par convert ho?", opts: [], correct: -1, descriptive: true },
      { q: "(Case study) Ek gaon apna aaloo store karta hai better price ki ummeed mein, par price 20% gir jaata hai aur quality kharaab. Division Level Officer ke roop mein kaunsi storage-and-market policy lagaoge?", opts: [], correct: -1, descriptive: true }
    ]
  },
  {
    id: "vipnan",
    name_hi: "Vipnan Pariksha",
    name_en: "Vipnan Pariksha (Marketing Selection Exam)",
    for_hi: "Sales & Marketing Executive (Domestic / International)",
    for_en: "Sales & Marketing Executive (Domestic / International)",
    fee: 600,
    duration_hi: "90 minutes",
    duration_en: "90 minutes",
    questions_hi: "100 MCQ (1 mark each)",
    questions_en: "100 MCQ (1 mark each)",
    sections: ["General Knowledge — 20", "Sales & Marketing Concepts — 40", "Communication / English — 25", "Numerical — 15"],
    negative_hi: "−0.25 per wrong answer",
    negative_en: "−0.25 per wrong answer",
    qualifying: "60 / 100",
    note_hi: "Strong English/global-trade score → International track, baaki → Domestic",
    note_en: "Strong English/global-trade score → International track, rest → Domestic",
    samples: [
      { q: "B2B aur B2C sales mein mool antar hai:", opts: ["B2B business-to-business hai, B2C business-to-consumer", "Dono same hain", "B2C sirf export ke liye hota hai", "B2B mein koi negotiation nahi hota"], correct: 0 },
      { q: "Ek sales pipeline mein \"lead qualification\" ka matlab hai:", opts: ["Random logon ko call karna", "Assess karna ki lead genuinely interested aur capable hai", "Sirf pricing bhejna", "Lead ko ignore karna"], correct: 1 }
    ]
  },
  {
    id: "vyavsaya-vikas",
    name_hi: "Vyavsaya Vikas Pariksha",
    name_en: "Vyavsaya Vikas Pariksha (Business Development Selection Exam)",
    for_hi: "Business Development Executive / Manager (MLA CTB, RBSM & Music Festival)",
    for_en: "Business Development Executive / Manager (MLA CTB, RBSM & Music Festival)",
    fee: 700,
    duration_hi: "100 minutes",
    duration_en: "100 minutes",
    questions_hi: "100 MCQ (1 mark) + 5 short-answer (2 marks) = 110 marks",
    questions_en: "100 MCQ (1 mark) + 5 short-answer (2 marks) = 110 marks",
    sections: ["General Knowledge — 15", "Business Development & Sponsorship Concepts — 40", "Event/Partnership Case Studies — 30", "Hindi — 15"],
    negative_hi: "−0.25 per wrong MCQ",
    negative_en: "−0.25 per wrong MCQ",
    qualifying: "65 / 110",
    note_hi: "Top scorers → Manager, baaki → Executive",
    note_en: "Top scorers → Manager, rest → Executive",
    samples: [
      { q: "Ek sponsorship proposal mein sabse zaroori cheez hai:", opts: ["Sirf logo placement", "Sponsor ko clear ROI/visibility deliverables dikhana", "Lambi company history", "Koi budget na dena"], correct: 1 },
      { q: "(Short answer) ≤80 words mein bataao: ek corporate sponsor ko Music Festival mein ₹10 lakh sponsorship ke liye kaise convince karoge?", opts: [], correct: -1, descriptive: true }
    ]
  },
  {
    id: "vyapar",
    name_hi: "Vyapar Pariksha",
    name_en: "Vyapar Pariksha (Trade Selection Exam)",
    for_hi: "Import Manager / Export Manager",
    for_en: "Import Manager / Export Manager",
    fee: 800,
    duration_hi: "110 minutes",
    duration_en: "110 minutes",
    questions_hi: "100 MCQ (1 mark) + 8 short-answer (2 marks) = 116 marks",
    questions_en: "100 MCQ (1 mark) + 8 short-answer (2 marks) = 116 marks",
    sections: ["General Knowledge — 15", "International Trade & Compliance (DGFT/Customs/FEMA/GST) — 45", "Logistics & Documentation — 30", "Hindi — 10"],
    negative_hi: "−0.25 per wrong MCQ",
    negative_en: "−0.25 per wrong MCQ",
    qualifying: "70 / 116",
    note_hi: "Graduate (International Trade/Agribusiness preferred)",
    note_en: "Graduate (International Trade/Agribusiness preferred)",
    samples: [
      { q: "Export shipment ke liye \"Certificate of Origin\" ka kaam hai:", opts: ["Product ka manufacturing country prove karna", "Sirf price declare karna", "Insurance cover dena", "Kuch nahi"], correct: 0 },
      { q: "DGFT (Directorate General of Foreign Trade) ka mool kaam hai:", opts: ["Income tax collect karna", "India ke import-export policy ko regulate karna", "Sirf visa issue karna", "Banking regulation"], correct: 1 }
    ]
  },
  {
    id: "vyapar-nideshak",
    name_hi: "Vyapar Nideshak Pariksha",
    name_en: "Vyapar Nideshak Pariksha (Trade Director Selection Exam)",
    for_hi: "Director (Export & Import / International Trade)",
    for_en: "Director (Export & Import / International Trade)",
    fee: 1500,
    duration_hi: "150 minutes",
    duration_en: "150 minutes",
    questions_hi: "100 MCQ (1 mark) + 10 essay/case-study (5 marks) = 150 marks",
    questions_en: "100 MCQ (1 mark) + 10 essay/case-study (5 marks) = 150 marks",
    sections: ["Trade Policy & Strategy — 40", "Leadership & Negotiation — 30", "Case Studies — 30", "Regulatory Compliance — 30", "Essays — 20"],
    negative_hi: "−0.33 per wrong MCQ (essays mein nahi)",
    negative_en: "−0.33 per wrong MCQ (none for essays)",
    qualifying: "90 / 150",
    note_hi: "Post-Graduate (International Trade/MBA preferred); exam ke baad senior management panel interview",
    note_en: "Post-Graduate (International Trade/MBA preferred); followed by a senior management panel interview",
    samples: [
      { q: "Ek international joint venture negotiate karte waqt sabse important consideration hai:", opts: ["Sirf price", "Long-term strategic fit, IP protection, aur exit terms", "Meeting ki location", "Kuch nahi"], correct: 1 },
      { q: "(Case study) Ek key export market mein sudden tariff badh jaata hai jisse margins 15% kam ho jaate hain. Director ke roop mein pehle 90 din ka response plan kya hoga?", opts: [], correct: -1, descriptive: true }
    ]
  },
  {
    id: "prakriya",
    name_hi: "Prakriya Pariksha",
    name_en: "Prakriya Pariksha (Processing Selection Exam)",
    for_hi: "Primary/District Processing Centre Executive, Warehouse Manager",
    for_en: "Primary/District Processing Centre Executive, Warehouse Manager",
    fee: 600,
    duration_hi: "90 minutes",
    duration_en: "90 minutes",
    questions_hi: "100 MCQ (1 mark each)",
    questions_en: "100 MCQ (1 mark each)",
    sections: ["General Knowledge — 20", "Food Processing & Quality Standards (FSSAI/HACCP/GMP) — 40", "Inventory & Warehouse Management — 25", "Hindi — 15"],
    negative_hi: "−0.25 per wrong answer",
    negative_en: "−0.25 per wrong answer",
    qualifying: "60 / 100",
    note_hi: "12th/Graduate, basic food-handling/quality-check training",
    note_en: "12th/Graduate, basic food-handling/quality-check training",
    samples: [
      { q: "FSSAI ka poora naam hai:", opts: ["Food Safety and Standards Authority of India", "Federal State Storage Authority of India", "Farmers Support and Subsidy Authority of India", "Kuch nahi"], correct: 0 },
      { q: "FIFO inventory practice ka matlab hai:", opts: ["First In, First Out", "Fast Inventory, Fast Output", "Final Invoice For Order", "Kuch nahi"], correct: 0 }
    ]
  },
  {
    id: "prakriya-prabandhak",
    name_hi: "Prakriya Prabandhak Pariksha",
    name_en: "Prakriya Prabandhak Pariksha (Processing Manager Selection Exam)",
    for_hi: "Storage Manager, Food Processing Unit Manager",
    for_en: "Storage Manager, Food Processing Unit Manager",
    fee: 1000,
    duration_hi: "120 minutes",
    duration_en: "120 minutes",
    questions_hi: "100 MCQ (1 mark) + 10 short-answer (2 marks) = 120 marks",
    questions_en: "100 MCQ (1 mark) + 10 short-answer (2 marks) = 120 marks",
    sections: ["General Knowledge — 15", "Advanced Food Safety & Compliance — 35", "Production/Storage Planning & Cost Control — 35", "Leadership & Team Management — 25", "Hindi — 10"],
    negative_hi: "−0.33 per wrong MCQ",
    negative_en: "−0.33 per wrong MCQ",
    qualifying: "75 / 120",
    note_hi: "Graduate/Post-Graduate (Food Technology preferred), kam se kam 3–5 saal anubhav",
    note_en: "Graduate/Post-Graduate (Food Technology preferred), at least 3–5 years of experience",
    samples: [
      { q: "HACCP framework mool roop se focus karta hai:", opts: ["Marketing strategy par", "Food safety hazards ko identify aur control karne par", "Employee salary par", "Kuch nahi"], correct: 1 },
      { q: "(Short answer) ≤80 words mein bataao: ek storage facility mein spoilage losses ko 30% kaise kam karoge?", opts: [], correct: -1, descriptive: true }
    ]
  },
  {
    id: "samuday-vikas",
    name_hi: "Samuday Vikas Pariksha",
    name_en: "Samuday Vikas Pariksha (Community Development Selection Exam)",
    for_hi: "CSR Executive, Agro Estate Manager, Events Team (Mid Level)",
    for_en: "CSR Executive, Agro Estate Manager, Events Team (Mid Level)",
    fee: 600,
    duration_hi: "90 minutes",
    duration_en: "90 minutes",
    questions_hi: "100 MCQ (1 mark each)",
    questions_en: "100 MCQ (1 mark each)",
    sections: ["General Knowledge — 20", "CSR / Agriculture / Event Concepts — 40", "Community Engagement — 25", "Hindi — 15"],
    negative_hi: "−0.25 per wrong answer",
    negative_en: "−0.25 per wrong answer",
    qualifying: "60 / 100",
    note_hi: "Graduate (Social Work/Agriculture/Event Management preferred)",
    note_en: "Graduate (Social Work/Agriculture/Event Management preferred)",
    samples: [
      { q: "Companies Act, 2013 ke Schedule VII mein kya define hota hai:", opts: ["Tax slabs", "CSR activities jo eligible hain", "Company registration process", "Kuch nahi"], correct: 1 },
      { q: "FIFO/FEFO jaisi practices kis field mein use hoti hain:", opts: ["Sirf marketing", "Inventory/storage management", "Event planning", "Kuch nahi"], correct: 1 }
    ]
  },
  {
    id: "netritva",
    name_hi: "Netritva Pariksha",
    name_en: "Netritva Pariksha (Leadership Selection Exam)",
    for_hi: "Events Team (Senior Level)",
    for_en: "Events Team (Senior Level)",
    fee: 1000,
    duration_hi: "120 minutes",
    duration_en: "120 minutes",
    questions_hi: "100 MCQ (1 mark) + 10 short-answer (2 marks) = 120 marks",
    questions_en: "100 MCQ (1 mark) + 10 short-answer (2 marks) = 120 marks",
    sections: ["General Knowledge — 15", "Event Strategy & Sponsor Management — 35", "Leadership & Crisis Management (Case Studies) — 35", "Hindi — 10", "Essays — 25"],
    negative_hi: "−0.33 per wrong MCQ",
    negative_en: "−0.33 per wrong MCQ",
    qualifying: "75 / 120",
    note_hi: "Graduate/Post-Graduate, kam se kam 5 saal event-management leadership anubhav",
    note_en: "Graduate/Post-Graduate, at least 5 years of event-management leadership experience",
    samples: [
      { q: "Ek large-scale event mein last-minute VIP cancellation ho jaaye to sabse pehla step hona chahiye:", opts: ["Event cancel karna", "Protocol team ko turant inform karna aur seating/agenda adjust karna", "Kuch na karna", "Media ko turant batana"], correct: 1 },
      { q: "(Case study) Ek music festival mein sound system technical failure ho jaata hai 5,000 attendees ke saamne. Senior Events Lead ke roop mein aapka immediate action plan?", opts: [], correct: -1, descriptive: true }
    ]
  }
];

export const ROADMAP = [
  { n: 1, icon: "badge", title_hi: "Registration & KYC", title_en: "Registration & KYC", desc_hi: "Form bharo, Aadhaar KYC, fee pay (₹500 / ₹1,000) → Application ID milega.", desc_en: "Fill form, Aadhaar KYC, pay fee (₹500 / ₹1,000) → get Application ID." },
  { n: 2, icon: "scan", title_hi: "Admit Card", title_en: "Admit Card", desc_hi: "QR-coded admit card (photo, venue, slot, terminal) ~1 week pehle; one-time face photo capture.", desc_en: "QR-coded admit card ~1 week before; one-time face photo capture." },
  { n: 3, icon: "shield", title_hi: "Pre-Entry Screening", title_en: "Pre-Entry Screening", desc_hi: "Exam day: gate par admit-card QR scan, metal detector + bag scan.", desc_en: "Exam day: admit-card QR scan, metal detector + bag scan at gate." },
  { n: 4, icon: "lock", title_hi: "Terminal Login & Exam", title_en: "Terminal Login & Exam", desc_hi: "Aadhaar QR + face verify → lockdown → 90/120-min paper.", desc_en: "Aadhaar QR + face verify → lockdown → 90/120-min paper." },
  { n: 5, icon: "eye", title_hi: "Live Proctoring", title_en: "Live Proctoring", desc_hi: "Control room + AI; flags review ke liye.", desc_en: "Control room + AI; flags for review." },
  { n: 6, icon: "trendingUp", title_hi: "Result & Audit", title_en: "Result & Audit", desc_hi: "Auto-scored, merit list with full audit trail.", desc_en: "Auto-scored, merit list with full audit trail." },
  { n: 7, icon: "users", title_hi: "Interview", title_en: "Interview", desc_hi: "Shortlisted candidates (VLE/VLM: 15 min; TLO/DLO: 30 min).", desc_en: "Shortlisted candidates (VLE/VLM: 15 min; TLO/DLO: 30 min)." },
  { n: 8, icon: "fileText", title_hi: "Selection & Offer", title_en: "Selection & Offer", desc_hi: "Local-first posting, document verification, offer letter, anti-corruption declaration.", desc_en: "Local-first posting, document verification, offer letter, anti-corruption declaration." },
  { n: 9, icon: "cap", title_hi: "Training", title_en: "Training", desc_hi: "2 months residential + 2 months supervised provisioning (reduced pay).", desc_en: "2 months residential + 2 months supervised provisioning (reduced pay)." },
  { n: 10, icon: "ev", title_hi: "Deployment", title_en: "Deployment", desc_hi: "Full pay from Month 5; uniform + EV + field device.", desc_en: "Full pay from Month 5; uniform + EV + field device." }
];

export const TRAINING = [
  { wk: "Week 1", title_hi: "Orientation & culture", title_en: "Orientation & culture", desc: "Mission, structure, code of conduct, anti-corruption" },
  { wk: "Week 2", title_hi: "Agronomy basics", title_en: "Agronomy basics", desc: "Soil science, crop cycles, NPK, pest management, organics" },
  { wk: "Week 3", title_hi: "Government schemes", title_en: "Government schemes", desc: "PM-KISAN, PMFBY, KCC, PM-KUSUM, Soil Health Card, e-NAM, ODOP, MGNREGA" },
  { wk: "Week 4", title_hi: "Finance & banking", title_en: "Finance & banking", desc: "Credit scoring, loan applications, insurance claims, UPI/AePS" },
  { wk: "Week 5", title_hi: "Technology", title_en: "Technology", desc: "Field app, GPS check-in, data entry, offline sync, IoT sensors" },
  { wk: "Week 6", title_hi: "Soft skills", title_en: "Soft skills", desc: "Counselling, listening, conflict resolution, public speaking" },
  { wk: "Week 7", title_hi: "Field practicum", title_en: "Field practicum", desc: "Mock enrollments, soil sampling, shadow senior VLEs" },
  { wk: "Week 8", title_hi: "Assessment & deployment", title_en: "Assessment & deployment", desc: "Written + practical, certification, village assignment" }
];

export const SCHEMES = [
  { name: "PM-KISAN", icon: "rupee", benefit_hi: "₹6,000/year direct bank transfer", benefit_en: "₹6,000/year direct bank transfer", role_hi: "Land records verify, portal registration, installment tracking", role_en: "Verify land records, portal registration, installment tracking" },
  { name: "PMFBY", sub: "Crop Insurance", icon: "shield", benefit_hi: "Drought/flood/pest se crop loss compensation", benefit_en: "Compensation for crop loss from drought/flood/pest", role_hi: "Cutoff se pehle enrollment, GPS crop photo, claim filing", role_en: "Enrollment before cutoff, GPS crop photo, claim filing" },
  { name: "KCC", sub: "Kisan Credit Card", icon: "credit", benefit_hi: "₹3 lakh tak loan @ ~4%", benefit_en: "Loan up to ₹3 lakh @ ~4%", role_hi: "Documents, bank application, follow-up", role_en: "Documents, bank application, follow-up" },
  { name: "PM-KUSUM", icon: "sun", benefit_hi: "Solar pump par 90% subsidy", benefit_en: "90% subsidy on solar pump", role_hi: "Online application, DISCOM coordination", role_en: "Online application, DISCOM coordination" },
  { name: "Soil Health Card", icon: "seedling", benefit_hi: "Free soil test + fertilizer advice", benefit_en: "Free soil test + fertilizer advice", role_hi: "Sample collect, report explain", role_en: "Collect sample, explain report" },
  { name: "MGNREGA", icon: "hammer", benefit_hi: "100 din rozgaar guarantee", benefit_en: "100 days employment guarantee", role_hi: "Household registration, farm-work application", role_en: "Household registration, farm-work application" },
  { name: "PMAY-G", icon: "home", benefit_hi: "Pucca ghar ke liye ₹1.2–1.3 lakh", benefit_en: "₹1.2–1.3 lakh for a pucca house", role_hi: "Survey verification, application, follow-up", role_en: "Survey verification, application, follow-up" },
  { name: "e-NAM / ODOP", icon: "market", benefit_hi: "Better market access & district products", benefit_en: "Better market access & district products", role_hi: "Mandi linkage, FPO support", role_en: "Mandi linkage, FPO support" }
];

export const SCHEME_TRUST = [
  { icon: "users", title_hi: "Har Yojana, Har Kisan", sub_hi: "Sahi jaankari, sahi haq", title_en: "Every Scheme, Every Farmer", sub_en: "Right information, right entitlement" },
  { icon: "shield", title_hi: "Pardarshita & Vishwas", sub_hi: "Transparent process, trusted support", title_en: "Transparency & Trust", sub_en: "Transparent process, trusted support" },
  { icon: "headset", title_hi: "Officer Saath Hamesha", sub_hi: "Har kadam par madad", title_en: "Officer By Your Side", sub_en: "Support at every step" },
  { icon: "leaf", title_hi: "Kisan Ka Vikas", sub_hi: "Samriddh kisan, samriddh desh", title_en: "Farmer's Growth", sub_en: "Prosperous farmer, prosperous nation" },
];

export const MEMBER_BENEFITS = [
  { icon: "credit", hi: "Harvest-linked credit", en: "Harvest-linked credit" },
  { icon: "phone", hi: "Instant UPI crop payment", en: "Instant UPI crop payment" },
  { icon: "badge", hi: "Certified inputs at discount", en: "Certified inputs at discount" },
  { icon: "hammer", hi: "Machinery / drone on rent", en: "Machinery / drone on rent" },
  { icon: "seedling", hi: "Soil testing + Fasal Calendar", en: "Soil testing + Crop Calendar" },
  { icon: "building", hi: "Storage & market access", en: "Storage & market access" }
];

// Icons for the "For Farmers" section's government-scheme chip row — kept
// separate from SCHEMES since e-NAM/ODOP are shown as two chips here but one
// combined card there.
export const FARMER_GOVT_CHIPS = [
  { name: "PM-KISAN", icon: "rupee" },
  { name: "PMFBY", icon: "shield" },
  { name: "KCC", icon: "credit" },
  { name: "PM-KUSUM", icon: "sun" },
  { name: "Soil Health Card", icon: "seedling" },
  { name: "MGNREGA", icon: "users" },
  { name: "PMAY-G", icon: "home" },
  { name: "e-NAM", icon: "market" },
  { name: "ODOP", icon: "briefcase" },
];

export const FARMER_IMPACT = [
  { icon: "users", title_hi: "Trusted Link", title_en: "Trusted Link", sub_hi: "Kisano ko sahi support se jodna.", sub_en: "Connecting farmers to the right support." },
  { icon: "shield", title_hi: "Stronger Impact", title_en: "Stronger Impact", sub_hi: "Yojanaon ko real benefits mein badalna.", sub_en: "Turning schemes into real benefits." },
  { icon: "seedling", title_hi: "Rural Growth", title_en: "Rural Growth", sub_hi: "Self-reliant kisan communities banana.", sub_en: "Building self-reliant farmer communities." },
  { icon: "award", title_hi: "Better Future", title_en: "Better Future", sub_hi: "Aaj sashakt banaana, kal samriddh banana.", sub_en: "Empowering today for a prosperous tomorrow." },
];

export const INTERVIEW_MEDIA_BADGES = [
  { icon: "users", label_hi: "Dostana Panel", label_en: "Friendly Panel" },
  { icon: "compass", label_hi: "Saarthak Charcha", label_en: "Meaningful Discussion" },
  { icon: "award", label_hi: "Merit Based Selection", label_en: "Merit Based Selection" },
];

export const INTERVIEW_POINTS = [
  { icon: "users", title_hi: "Aapki soch samajhna", title_en: "Understand your perspective", desc_hi: "Hum aapke experiences, values aur rural development ke vision ke baare mein jaante hain.", desc_en: "We learn about your experiences, values, and vision for rural development." },
  { icon: "award", title_hi: "Suitability assess karna", title_en: "Assess your suitability", desc_hi: "Hum aapki clarity, problem-solving ability aur commitment evaluate karte hain.", desc_en: "We evaluate your clarity, problem-solving ability, and commitment." },
  { icon: "shield", title_hi: "Ghabrane ki zaroorat nahi", title_en: "No need to worry", desc_hi: "Natural aur honest rahiye. Hum aapko samajhne ke liye yahan hain.", desc_en: "Be natural and honest. We are here to understand you better." },
];

export const INTERVIEW_Q_ICONS = ["seedling", "flask", "calendar", "users", "megaphone"];

// Panel & Weightage per exam track — covers all 10 exams/21 positions.
// Panel composition, duration and interview-weight scale with seniority
// (mirrors the fee/duration scaling already used in EXAMS): junior/mid
// roles get a short, exam-heavy panel; senior/director roles get a longer,
// more interview-weighted one with an external/HQ panelist.
export const INTERVIEW_PANELS = [
  {
    examId: "gram-sevak", deptId: "field-operations", badge_hi: "VLE / VLM", badge_en: "VLE / VLM",
    composition_hi: "1 TEO + 1 DLO + 1 HR", composition_en: "1 TEO + 1 DLO + 1 HR",
    duration_hi: "15 minute", duration_en: "15 minutes", examWeight: "70%", intWeight: "30%",
  },
  {
    examId: "krishi-adhikari", deptId: "field-operations", badge_hi: "TEO / DLO / DD", badge_en: "TEO / DLO / DD",
    composition_hi: "1 DLO + 1 senior officer + 1 bahari expert", composition_en: "1 DLO + 1 senior officer + 1 external expert",
    duration_hi: "30 minute", duration_en: "30 minutes", examWeight: "60%", intWeight: "40%",
  },
  {
    examId: "vipnan", deptId: "sales-marketing", badge_hi: "Sales & Marketing", badge_en: "Sales & Marketing",
    composition_hi: "1 Sales & Marketing Head + 1 HR", composition_en: "1 Sales & Marketing Head + 1 HR",
    duration_hi: "15 minute", duration_en: "15 minutes", examWeight: "70%", intWeight: "30%",
  },
  {
    examId: "vyavsaya-vikas", deptId: "business-development", badge_hi: "Business Development", badge_en: "Business Development",
    composition_hi: "1 BD Manager/Head + 1 HR", composition_en: "1 BD Manager/Head + 1 HR",
    duration_hi: "20 minute", duration_en: "20 minutes", examWeight: "65%", intWeight: "35%",
  },
  {
    examId: "vyapar", deptId: "export-import", badge_hi: "Import / Export Manager", badge_en: "Import / Export Manager",
    composition_hi: "1 Director (Export-Import) + 1 HR + 1 bahari trade expert", composition_en: "1 Director (Export-Import) + 1 HR + 1 external trade expert",
    duration_hi: "25 minute", duration_en: "25 minutes", examWeight: "60%", intWeight: "40%",
  },
  {
    examId: "vyapar-nideshak", deptId: "export-import", badge_hi: "Director (Export-Import)", badge_en: "Director (Export-Import)",
    composition_hi: "1 HQ Leadership + 1 Senior Director + 1 bahari trade expert", composition_en: "1 HQ Leadership + 1 Senior Director + 1 external trade expert",
    duration_hi: "40 minute", duration_en: "40 minutes", examWeight: "55%", intWeight: "45%",
  },
  {
    examId: "prakriya", deptId: "processing", badge_hi: "PPC / DPC / Warehouse", badge_en: "PPC / DPC / Warehouse",
    composition_hi: "1 Processing Division Head + 1 HR", composition_en: "1 Processing Division Head + 1 HR",
    duration_hi: "15 minute", duration_en: "15 minutes", examWeight: "70%", intWeight: "30%",
  },
  {
    examId: "prakriya-prabandhak", deptId: "processing", badge_hi: "FPUM / Storage Manager", badge_en: "FPUM / Storage Manager",
    composition_hi: "1 Processing Division Head + 1 senior officer + 1 HR", composition_en: "1 Processing Division Head + 1 senior officer + 1 HR",
    duration_hi: "25 minute", duration_en: "25 minutes", examWeight: "60%", intWeight: "40%",
  },
  {
    examId: "samuday-vikas", deptId: "corporate", badge_hi: "CSR / Estate / Events", badge_en: "CSR / Estate / Events",
    composition_hi: "1 Corporate Affairs Head + 1 HR", composition_en: "1 Corporate Affairs Head + 1 HR",
    duration_hi: "15 minute", duration_en: "15 minutes", examWeight: "70%", intWeight: "30%",
  },
  {
    examId: "netritva", deptId: "corporate", badge_hi: "Events (Senior)", badge_en: "Events (Senior)",
    composition_hi: "1 Corporate Affairs Head + 1 senior event lead + 1 HR", composition_en: "1 Corporate Affairs Head + 1 senior event lead + 1 HR",
    duration_hi: "25 minute", duration_en: "25 minutes", examWeight: "60%", intWeight: "40%",
  },
];

export const PREP_BENEFITS = [
  { icon: "shield", label_hi: "Trusted Resources", label_en: "Trusted Resources" },
  { icon: "award", label_hi: "Quality Preparation", label_en: "Quality Preparation" },
  { icon: "clock", label_hi: "Save Time & Stay Focused", label_en: "Save Time & Stay Focused" },
  { icon: "badge", label_hi: "Better Results", label_en: "Better Results" },
];

// Real Maharashtra district names (public geography, not a claim about the
// company) — a finer-grained list than DIVISIONS (the 6 official revenue
// divisions), used only for the footer's "Maharashtra Districts" showcase.
export const MAHARASHTRA_DISTRICTS = [
  "Nashik", "Pune", "Nagpur", "Amravati", "Aurangabad", "Kolhapur",
  "Solapur", "Latur", "Satara", "Nanded", "Wardha", "Chandrapur",
];

export const FOOTER_ABOUT_STATS = [
  { icon: "shield", label_hi: "Trusted Platform", label_en: "Trusted Platform" },
  { icon: "users", label_hi: "Expert Guidance", label_en: "Expert Guidance" },
  { icon: "fileText", label_hi: "Quality Content", label_en: "Quality Content" },
  { icon: "award", label_hi: "Better Future", label_en: "Better Future" },
];

export const FOOTER_QUICK_LINKS = [
  { label_hi: "Kisan Mitra ke baare mein", label_en: "About Kisan Mitra", href: "#mission" },
  { label_hi: "Kaise kaam karta hai", label_en: "How It Works", href: "/process" },
  { label_hi: "Saare Roles", label_en: "All Roles", href: "/roles" },
  { label_hi: "Departments", label_en: "Departments", href: "/departments" },
  { label_hi: "Kya Milega (Fayde)", label_en: "What You Get", href: "/benefits" },
  { label_hi: "Exams", label_en: "Exams", href: "/exams" },
  { label_hi: "Study Material", label_en: "Study Material", href: "/prepare" },
  { label_hi: "Coaching Centers", label_en: "Coaching Centers", href: "/prepare" },
  { label_hi: "Eligibility", label_en: "Eligibility", href: "/eligibility" },
  { label_hi: "FAQs", label_en: "FAQs", href: "/faq" },
  { label_hi: "Sampark Karein", label_en: "Contact Us", href: "https://wa.me/910000000000" },
];

export const FOOTER_SOCIAL = [
  { icon: "facebook", label: "Facebook" },
  { icon: "youtube", label: "YouTube" },
  { icon: "telegram", label: "Telegram" },
  { icon: "whatsapp", label: "WhatsApp" },
  { icon: "xLogo", label: "X" },
];

export const FAQ = [
  { q_hi: "Ye exam sarkari hai kya?", q_en: "Is this a government exam?", a_hi: "Nahi. Kisan Mitra, Argus/RKF ka ek private rural-development program hai jo kisanon ko sarkari yojanaon se jodta hai. Selection poori tarah merit + AI-proctored hai.", a_en: "No. Kisan Mitra is a private rural-development program by Argus/RKF that connects farmers to government schemes. Selection is fully merit-based + AI-proctored." },
  { q_hi: "Fee kitni hai?", q_en: "How much is the fee?", a_hi: "Gram Sevak ₹500, Krishi Adhikari ₹1,000. SC/ST/rural-girls/BPL ke liye waiver/concession.", a_en: "Gram Sevak ₹500, Krishi Adhikari ₹1,000. Waiver/concession for SC/ST/rural-girls/BPL." },
  { q_hi: "Salary kitni milegi?", q_en: "What is the salary?", a_hi: "VLE ₹35K, VLM ₹45K, TLO ₹60K, DLO ₹80K/month (full pay, Mo 5 se). Training period mein reduced pay.", a_en: "VLE ₹35K, VLM ₹45K, TLO ₹60K, DLO ₹80K/month (full pay, from Month 5). Reduced pay during training." },
  { q_hi: "Posting kahan hogi?", q_en: "Where will posting be?", a_hi: "Local-first — wherever possible apne ya paas ke gaon/cluster mein.", a_en: "Local-first — wherever possible in your own or nearby village/cluster." },
  { q_hi: "VLE aur VLM mein farak?", q_en: "Difference between VLE and VLM?", a_hi: "Dono ek hi Gram Sevak Pariksha se; top scorers VLM (cluster lead, senior), baaki VLE (field lead).", a_en: "Both from the same Gram Sevak Pariksha; top scorers become VLM (cluster lead, senior), the rest VLE (field lead)." },
  { q_hi: "Exam kaise hoga?", q_en: "How will the exam be conducted?", a_hi: "Secure terminal, QR + face verify, AI proctoring, aapke paas ke school/college/panchayat hall mein, multi-shift.", a_en: "Secure terminal, QR + face verify, AI proctoring, at nearby school/college/panchayat halls, multi-shift." },
  { q_hi: "Reschedule ho sakta hai?", q_en: "Can I reschedule?", a_hi: "Haan, ₹3,000 mein ek baar (≥48 hr notice). Non-selected ko next attempt par 10% waiver.", a_en: "Yes, once for ₹3,000 (≥48 hr notice). Non-selected get 10% waiver on next attempt." },
  { q_hi: "Mera data safe hai?", q_en: "Is my data safe?", a_hi: "Aadhaar AES-256 encrypted; DPDP Act ke according; non-selected ka data 6 mahine baad delete.", a_en: "Aadhaar AES-256 encrypted; per DPDP Act; data of non-selected deleted after 6 months." }
];

export const SECURITY = [
  { icon: "lock", title_hi: "Secure Exam Terminal", title_en: "Secure Exam Terminal", desc_hi: "Purpose-built lockdown device, no internet/apps.", desc_en: "Purpose-built lockdown device, no internet/apps." },
  { icon: "scan", title_hi: "QR + Face Verify", title_en: "QR + Face Verify", desc_hi: "Aadhaar QR + webcam face match at login.", desc_en: "Aadhaar QR + webcam face match at login." },
  { icon: "eye", title_hi: "AI Proctoring", title_en: "AI Proctoring", desc_hi: "Gaze/voice/multi-face detection, screen recording.", desc_en: "Gaze/voice/multi-face detection, screen recording." },
  { icon: "shield", title_hi: "Encrypted & Audited", title_en: "Encrypted & Audited", desc_hi: "AES-256 answers, 12-month audit trail.", desc_en: "AES-256 answers, 12-month audit trail." },
  { icon: "pin", title_hi: "Aapke paas hi", title_en: "Near You", desc_hi: "Existing schools/colleges/panchayat halls mein, multi-shift (5/day), 10 rounds.", desc_en: "At existing schools/colleges/panchayat halls, multi-shift (5/day), 10 rounds." }
];

export type Exam = (typeof EXAMS)[number];
/** Every exam id, as a union — an unknown id is a compile error, not a 404. */
export type ExamId = Exam["id"];

/** Looks up an exam by id — used by role pages and /exams/[slug]. */
export function getExam(id: string): Exam | undefined {
  return EXAMS.find((e) => e.id === id);
}

/** Every exam id — feeds generateStaticParams for /exams/[slug]. */
export function getAllExamIds(): ExamId[] {
  return EXAMS.map((e) => e.id);
}
