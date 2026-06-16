// ============================================================
// KISAN MITRA BHARTI PARIKSHA 2026 — DATA LAYER
// All content embedded. No external dependency.
// ============================================================

export const DIVISIONS = [
  "Lucknow", "Kanpur", "Agra", "Meerut", "Bareilly", "Moradabad",
  "Varanasi", "Prayagraj", "Gorakhpur", "Ayodhya (Faizabad)", "Aligarh", "Jhansi"
];

export const STATS = [
  { value: 452, label_hi: "Phase 1 Officer Posts", label_en: "Phase 1 Officer Posts", suffix: "" },
  { value: 12, label_hi: "UP Revenue Divisions", label_en: "UP Revenue Divisions", suffix: "" },
  { value: 600, label_hi: "Pilot Villages", label_en: "Pilot Villages", suffix: "" },
  { value: 0, display: "₹35K–80K", label_hi: "Monthly Salary (full pay)", label_en: "Monthly Salary (full pay)", suffix: "" }
];

export const ROLES = [
  {
    code: "VLE",
    accent: "#2D5A1B",
    title_hi: "Village Level Executive",
    title_en: "Village Level Executive",
    who_hi: "3 gaanv ka direct kisan-interface. Field officer jo roz gaon mein rahega.",
    who_en: "Direct farmer interface for 3 villages. A field officer present daily on the ground.",
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
    img: "/static/img/role-vle.jpg",
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
    img: "/static/img/role-vlm.jpg",
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
    img: "/static/img/role-tlo.jpg",
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
    reports_hi: "Argus / RKF HQ (Lucknow)",
    reports_en: "Argus / RKF HQ (Lucknow)",
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
    img: "/static/img/role-dlo.jpg",
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
  { role: "DLO", reports: "HQ (Lucknow)", train: "₹26,000", full: "₹80,000", count: 12 }
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
      { q: "UP mein zyadatar field crops ke liye ideal soil pH range hai:", opts: ["3.5–4.5", "6.0–7.5", "8.5–9.5", "10–11"], correct: 1 },
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
    for_hi: "TLO / DLO",
    for_en: "TLO / DLO",
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
      { q: "Ek TLO 10 field officers supervise kar raha hai; ek cluster consistently enrollment target miss kar raha hai. Pehla management step:", opts: ["VLE terminate karo", "Cluster ka data review + field visit karke root cause diagnose karo", "Budget cut", "Ignore"], correct: 1 },
      { q: "Bank 0.4% referral deta hai KCC par; TLO ki tehsil ₹5 Cr KCC facilitate karti hai — referral income:", opts: ["₹20,000", "₹2,00,000", "₹2,000", "₹20,00,000"], correct: 1 },
      { q: "(Short answer) ≤80 words mein bataao: ek single-day bank camp kaise chalaoge jisme 200 farmers KCC par convert ho?", opts: [], correct: -1, descriptive: true },
      { q: "(Case study) Ek gaon apna aaloo store karta hai better price ki ummeed mein, par price 20% gir jaata hai aur quality kharaab. DLO ke roop mein kaunsi storage-and-market policy lagaoge?", opts: [], correct: -1, descriptive: true }
    ]
  }
];

export const ROADMAP = [
  { n: 1, title_hi: "Registration & KYC", title_en: "Registration & KYC", desc_hi: "Form bharo, Aadhaar KYC, fee pay (₹500 / ₹1,000) → Application ID milega.", desc_en: "Fill form, Aadhaar KYC, pay fee (₹500 / ₹1,000) → get Application ID." },
  { n: 2, title_hi: "Admit Card", title_en: "Admit Card", desc_hi: "QR-coded admit card (photo, venue, slot, terminal) ~1 week pehle; one-time face photo capture.", desc_en: "QR-coded admit card ~1 week before; one-time face photo capture." },
  { n: 3, title_hi: "Pre-Entry Screening", title_en: "Pre-Entry Screening", desc_hi: "Exam day: gate par admit-card QR scan, metal detector + bag scan.", desc_en: "Exam day: admit-card QR scan, metal detector + bag scan at gate." },
  { n: 4, title_hi: "Terminal Login & Exam", title_en: "Terminal Login & Exam", desc_hi: "Aadhaar QR + face verify → lockdown → 90/120-min paper.", desc_en: "Aadhaar QR + face verify → lockdown → 90/120-min paper." },
  { n: 5, title_hi: "Live Proctoring", title_en: "Live Proctoring", desc_hi: "Control room + AI; flags review ke liye.", desc_en: "Control room + AI; flags for review." },
  { n: 6, title_hi: "Result & Audit", title_en: "Result & Audit", desc_hi: "Auto-scored, merit list with full audit trail.", desc_en: "Auto-scored, merit list with full audit trail." },
  { n: 7, title_hi: "Interview", title_en: "Interview", desc_hi: "Shortlisted candidates (VLE/VLM: 15 min; TLO/DLO: 30 min).", desc_en: "Shortlisted candidates (VLE/VLM: 15 min; TLO/DLO: 30 min)." },
  { n: 8, title_hi: "Selection & Offer", title_en: "Selection & Offer", desc_hi: "Local-first posting, document verification, offer letter, anti-corruption declaration.", desc_en: "Local-first posting, document verification, offer letter, anti-corruption declaration." },
  { n: 9, title_hi: "Training", title_en: "Training", desc_hi: "2 months residential + 2 months supervised provisioning (reduced pay).", desc_en: "2 months residential + 2 months supervised provisioning (reduced pay)." },
  { n: 10, title_hi: "Deployment", title_en: "Deployment", desc_hi: "Full pay from Month 5; uniform + EV + field device.", desc_en: "Full pay from Month 5; uniform + EV + field device." }
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

export const MEMBER_BENEFITS = [
  { hi: "Harvest-linked credit", en: "Harvest-linked credit" },
  { hi: "Instant UPI crop payment", en: "Instant UPI crop payment" },
  { hi: "Certified inputs at discount", en: "Certified inputs at discount" },
  { hi: "Machinery / drone on rent", en: "Machinery / drone on rent" },
  { hi: "Soil testing + Fasal Calendar", en: "Soil testing + Crop Calendar" },
  { hi: "Storage & market access", en: "Storage & market access" }
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
