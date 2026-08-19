// ============================================================
// KISAN MITRA BHARTI PARIKSHA 2026 — DATA LAYER
// All content embedded. No external dependency.
// ============================================================

/** `id` is the stable value stored on an application; the names are display only. */
export const DIVISIONS = [
  { id: "Konkan", name_en: "Konkan", name_mr: "\u0915\u094b\u0915\u0923" },
  { id: "Pune", name_en: "Pune", name_mr: "\u092a\u0941\u0923\u0947" },
  { id: "Nashik", name_en: "Nashik", name_mr: "\u0928\u093e\u0936\u093f\u0915" },
  { id: "Aurangabad (Chhatrapati Sambhajinagar)", name_en: "Aurangabad (Chhatrapati Sambhajinagar)", name_mr: "\u091b\u0924\u094d\u0930\u092a\u0924\u0940 \u0938\u0902\u092d\u093e\u091c\u0940\u0928\u0917\u0930" },
  { id: "Amravati", name_en: "Amravati", name_mr: "\u0905\u092e\u0930\u093e\u0935\u0924\u0940" },
  { id: "Nagpur", name_en: "Nagpur", name_mr: "\u0928\u093e\u0917\u092a\u0942\u0930" },
];

export const STATS = [
  { value: 452, icon: "users", label_hi: "Officer Posts", label_en: "Officer Posts", label_mr: "अधिकारी पदे", sublabel_hi: "Phase 1 Officer Posts", sublabel_en: "Phase 1 Officer Posts", sublabel_mr: "टप्पा 1 मधील अधिकारी पदे", },
  { value: 6, icon: "building", label_hi: "Revenue Divisions", label_en: "Revenue Divisions", label_mr: "महसूल विभाग", sublabel_hi: "Maharashtra bhar mein", sublabel_en: "Across Maharashtra", sublabel_mr: "संपूर्ण महाराष्ट्रात", },
  { value: 600, icon: "home", label_hi: "Pilot Villages", label_en: "Pilot Villages", label_mr: "प्रायोगिक गावे", sublabel_hi: "Maharashtra bhar mein", sublabel_en: "Across Maharashtra", sublabel_mr: "संपूर्ण महाराष्ट्रात", },
  { value: 0, display: "₹10K–₹1.5L", icon: "rupee", label_hi: "Monthly Salary", label_en: "Monthly Salary", label_mr: "मासिक पगार", sublabel_hi: "Entry se leadership tak", sublabel_en: "Entry to leadership", sublabel_mr: "प्रवेशापासून नेतृत्वापर्यंत", }
];

// Thematic mini-cards shown alongside the hero copy — not tied to any
// specific role/position (the site now spans 21 positions across 6
// departments; role selection happens in the Positions Explorer/Apply
// flow, not the hero).
export const MISSION_HIGHLIGHTS = [
  { icon: "briefcase", color: "navy", label_hi: "Employment generation", label_en: "Employment generation", label_mr: "रोजगार निर्मिती", },
  { icon: "users", color: "green", label_hi: "Farmer service", label_en: "Farmer service", label_mr: "शेतकरी सेवा", },
  { icon: "seedling", color: "mint", label_hi: "Gaon ka vikas", label_en: "Village development", label_mr: "गावाचा विकास", },
  { icon: "compass", color: "blue", label_hi: "Palayan ka ant", label_en: "End of migration", label_mr: "स्थलांतराचा अंत", },
];

export const HERO_VIKAS = [
  { icon: "leaf", title_hi: "Kisaan ka Vikas", title_en: "Farmer's Growth", title_mr: "शेतकऱ्याचा विकास", sub_hi: "Kisano ko sashakt banana", sub_en: "Empowering Farmers", sub_mr: "शेतकऱ्यांना सक्षम करणे", },
  { icon: "users", title_hi: "Desh ka Vikas", title_en: "Nation's Growth", title_mr: "देशाचा विकास", sub_hi: "Ek majboot Bharat ka nirmaan", sub_en: "Building a Stronger India", sub_mr: "एका भक्कम भारताची उभारणी", },
  { icon: "trendingUp", title_hi: "Vikas ka Saathi", title_en: "Partner in Progress", title_mr: "विकासाचा साथी", sub_hi: "Gramin badlaav ke saath", sub_en: "Together for Rural Transformation", sub_mr: "ग्रामीण बदलासोबत", }
];

export const EXAMS = [
  {
    id: "gram-sevak",
    name_hi: "Gram Sevak Pariksha",
    name_en: "Gram Sevak Pariksha",
    name_mr: "ग्राम सेवक परीक्षा",
    for_hi: "VLE / VLM",
    for_en: "VLE / VLM",
    for_mr: "VLE / VLM",
    fee: 500,
    duration_hi: "90 minutes",
    duration_en: "90 minutes",
    duration_mr: "90 मिनिटे",
    questions_hi: "100 MCQ (1 mark each)",
    questions_en: "100 MCQ (1 mark each)",
    questions_mr: "100 बहुपर्यायी प्रश्न (प्रत्येकी 1 गुण)",
    sections_en: [
      "General Knowledge — 25",
      "Agriculture & Rural Development — 50",
      "Hindi — 15",
      "Numerical — 10"
    ],
    sections_mr: [
      "सामान्य ज्ञान — 25",
      "कृषी आणि ग्रामीण विकास — 50",
      "हिंदी — 15",
      "अंकगणित — 10",
    ],
    negative_hi: "−0.25 per wrong answer",
    negative_en: "−0.25 per wrong answer",
    negative_mr: "प्रत्येक चुकीच्या उत्तराला −0.25",
    qualifying: "60 / 100",
    note_hi: "Top scorers → VLM, next tier → VLE",
    note_en: "Top scorers → VLM, next tier → VLE",
    note_mr: "सर्वाधिक गुण → VLM, त्यानंतरचे → VLE",
    samples_en: [
      { q: "Maharashtra mein zyadatar field crops ke liye ideal soil pH range hai:", opts: ["3.5–4.5", "6.0–7.5", "8.5–9.5", "10–11"], correct: 1 },
      { q: "PM-KISAN ke tehat eligible kisan parivaar ko saalana DBT milti hai:", opts: ["₹2,000", "₹4,000", "₹6,000", "₹10,000"], correct: 2 },
      { q: "Kisan Credit Card (KCC) par crop loan ka effective interest aam taur par hota hai:", opts: ["~4%", "9%", "12%", "18%"], correct: 0 },
      { q: "2-acre plot, 18 quintal/acre, mandi price ₹2,200/quintal — gross value:", opts: ["₹39,600", "₹79,200", "₹19,800", "₹1,58,400"], correct: 1 },
      { q: "\"खेत तालाब\" (khet-talab) ka matlab hai:", opts: ["farm pond", "tractor", "fertiliser", "crop disease"], correct: 0 },
      { q: "MGNREGA kitne din ka wage employment guarantee karta hai (per rural household/year):", opts: ["50", "100", "150", "365"], correct: 1 }
    ],
    samples_mr: [
      { q: "महाराष्ट्रातील बहुतांश शेतपिकांसाठी आदर्श मातीची pH श्रेणी आहे:", opts: ["3.5–4.5", "6.0–7.5", "8.5–9.5", "10–11"], correct: 1 },
      { q: "PM-KISAN अंतर्गत पात्र शेतकरी कुटुंबाला दरवर्षी थेट लाभ हस्तांतरण मिळते:", opts: ["₹2,000", "₹4,000", "₹6,000", "₹10,000"], correct: 2 },
      { q: "किसान क्रेडिट कार्ड (KCC) वरील पीक कर्जाचा प्रत्यक्ष व्याजदर सर्वसाधारणपणे असतो:", opts: ["सुमारे 4%", "9%", "12%", "18%"], correct: 0 },
      { q: "2 एकर जमीन, 18 क्विंटल/एकर, बाजारभाव ₹2,200/क्विंटल — एकूण मूल्य:", opts: ["₹39,600", "₹79,200", "₹19,800", "₹1,58,400"], correct: 1 },
      { q: "\"शेततळे\" म्हणजे काय:", opts: ["शेतातील पाणीसाठा तळे", "ट्रॅक्टर", "खत", "पिकावरील रोग"], correct: 0 },
      { q: "मनरेगा प्रति ग्रामीण कुटुंबाला दरवर्षी किती दिवसांच्या रोजगाराची हमी देते:", opts: ["50", "100", "150", "365"], correct: 1 },
    ]
  },
  {
    id: "krishi-adhikari",
    name_hi: "Krishi Adhikari Pariksha",
    name_en: "Krishi Adhikari Pariksha",
    name_mr: "कृषी अधिकारी परीक्षा",
    for_hi: "TEO / Division Level Officer / Divisional Director",
    for_en: "TEO / Division Level Officer / Divisional Director",
    for_mr: "TEO / विभाग स्तर अधिकारी / विभागीय संचालक",
    fee: 1000,
    duration_hi: "120 minutes",
    duration_en: "120 minutes",
    duration_mr: "120 मिनिटे",
    questions_hi: "150 MCQ (1 mark) + 10 short-answer (2 marks) = 170 marks",
    questions_en: "150 MCQ (1 mark) + 10 short-answer (2 marks) = 170 marks",
    questions_mr: "150 बहुपर्यायी (1 गुण) + 10 लघुत्तरी (2 गुण) = 170 गुण",
    sections_en: [
      "GK — 30",
      "Agri Policy — 40",
      "Leadership & Management — 40",
      "Hindi — 20",
      "Case studies — 20",
      "Essays — 10"
    ],
    sections_mr: [
      "सामान्य ज्ञान — 30",
      "कृषी धोरण — 40",
      "नेतृत्व आणि व्यवस्थापन — 40",
      "हिंदी — 20",
      "केस स्टडी — 20",
      "निबंध — 10",
    ],
    negative_hi: "−0.33 per wrong MCQ (none for essays)",
    negative_en: "−0.33 per wrong MCQ (none for essays)",
    negative_mr: "प्रत्येक चुकीच्या बहुपर्यायी प्रश्नाला −0.33 (निबंधांना नाही)",
    qualifying: "100 / 170",
    note_hi: "Graduate (agri/management preferred)",
    note_en: "Graduate (agri/management preferred)",
    note_mr: "पदवीधर (कृषी/व्यवस्थापनाला प्राधान्य)",
    samples_en: [
      { q: "PMFBY ke tehat Kharif food/oilseed crop ke liye farmer premium share capped hai:", opts: ["1.5%", "2%", "5%", "10%"], correct: 1 },
      { q: "Ek TEO 10 field officers supervise kar raha hai; ek cluster consistently enrollment target miss kar raha hai. Pehla management step:", opts: ["VLE terminate karo", "Cluster ka data review + field visit karke root cause diagnose karo", "Budget cut", "Ignore"], correct: 1 },
      { q: "Bank 0.4% referral deta hai KCC par; TEO ki taluka ₹5 Cr KCC facilitate karti hai — referral income:", opts: ["₹20,000", "₹2,00,000", "₹2,000", "₹20,00,000"], correct: 1 },
      { q: "(Short answer) ≤80 words mein bataao: ek single-day bank camp kaise chalaoge jisme 200 farmers KCC par convert ho?", opts: [], correct: -1, descriptive: true },
      { q: "(Case study) Ek gaon apna aaloo store karta hai better price ki ummeed mein, par price 20% gir jaata hai aur quality kharaab. Division Level Officer ke roop mein kaunsi storage-and-market policy lagaoge?", opts: [], correct: -1, descriptive: true }
    ],
    samples_mr: [
      { q: "PMFBY अंतर्गत खरीप अन्नधान्य/तेलबिया पिकासाठी शेतकऱ्याचा विमा हप्ता वाटा कमाल असतो:", opts: ["1.5%", "2%", "5%", "10%"], correct: 1 },
      { q: "एक TEO 10 क्षेत्रीय अधिकाऱ्यांवर देखरेख करत आहे; एक समूह सातत्याने नोंदणी उद्दिष्ट गाठत नाही. पहिले व्यवस्थापकीय पाऊल:", opts: ["VLE ला कामावरून काढणे", "समूहाची माहिती तपासून व प्रत्यक्ष भेट देऊन मूळ कारण शोधणे", "अर्थसंकल्पात कपात", "दुर्लक्ष करणे"], correct: 1 },
      { q: "बँक KCC वर 0.4% संदर्भ शुल्क देते; TEO च्या तालुक्यात ₹5 कोटी KCC मंजूर होते — संदर्भ उत्पन्न:", opts: ["₹20,000", "₹2,00,000", "₹2,000", "₹20,00,000"], correct: 1 },
      { q: "(लघुत्तरी) 80 शब्दांत सांगा: 200 शेतकऱ्यांचे KCC मध्ये रूपांतर होईल असे एक दिवसाचे बँक शिबिर तुम्ही कसे राबवाल?", opts: [], correct: -1, descriptive: true },
      { q: "(केस स्टडी) एक गाव चांगल्या भावाच्या आशेने बटाटा साठवून ठेवते, पण भाव 20% घसरतो आणि दर्जा खालावतो. विभाग स्तर अधिकारी म्हणून तुम्ही कोणते साठवण व बाजार धोरण राबवाल?", opts: [], correct: -1, descriptive: true },
    ]
  },
  {
    id: "vipnan",
    name_hi: "Vipnan Pariksha",
    name_en: "Vipnan Pariksha (Marketing Selection Exam)",
    name_mr: "विपणन परीक्षा",
    for_hi: "Sales & Marketing Executive (Domestic / International)",
    for_en: "Sales & Marketing Executive (Domestic / International)",
    for_mr: "विक्री व विपणन अधिकारी (देशांतर्गत / आंतरराष्ट्रीय)",
    fee: 600,
    duration_hi: "90 minutes",
    duration_en: "90 minutes",
    duration_mr: "90 मिनिटे",
    questions_hi: "100 MCQ (1 mark each)",
    questions_en: "100 MCQ (1 mark each)",
    questions_mr: "100 बहुपर्यायी प्रश्न (प्रत्येकी 1 गुण)",
    sections_en: ["General Knowledge — 20", "Sales & Marketing Concepts — 40", "Communication / English — 25", "Numerical — 15"],
    sections_mr: [
      "सामान्य ज्ञान — 20",
      "विक्री व विपणन संकल्पना — 40",
      "संवाद / इंग्रजी — 25",
      "अंकगणित — 15",
    ],
    negative_hi: "−0.25 per wrong answer",
    negative_en: "−0.25 per wrong answer",
    negative_mr: "प्रत्येक चुकीच्या उत्तराला −0.25",
    qualifying: "60 / 100",
    note_hi: "Strong English/global-trade score → International track, baaki → Domestic",
    note_en: "Strong English/global-trade score → International track, rest → Domestic",
    note_mr: "इंग्रजी/जागतिक व्यापारात चांगले गुण → आंतरराष्ट्रीय शाखा, इतर → देशांतर्गत",
    samples_en: [
      { q: "B2B aur B2C sales mein mool antar hai:", opts: ["B2B business-to-business hai, B2C business-to-consumer", "Dono same hain", "B2C sirf export ke liye hota hai", "B2B mein koi negotiation nahi hota"], correct: 0 },
      { q: "Ek sales pipeline mein \"lead qualification\" ka matlab hai:", opts: ["Random logon ko call karna", "Assess karna ki lead genuinely interested aur capable hai", "Sirf pricing bhejna", "Lead ko ignore karna"], correct: 1 }
    ],
    samples_mr: [
      { q: "B2B आणि B2C विक्रीतील मूलभूत फरक आहे:", opts: ["B2B म्हणजे व्यवसाय-ते-व्यवसाय, B2C म्हणजे व्यवसाय-ते-ग्राहक", "दोन्ही सारखेच आहेत", "B2C फक्त निर्यातीसाठी असते", "B2B मध्ये वाटाघाटी होत नाहीत"], correct: 0 },
      { q: "विक्री प्रक्रियेत \"लीड पात्रता तपासणे\" म्हणजे:", opts: ["कोणालाही फोन करणे", "संबंधित व्यक्ती खरोखर इच्छुक व सक्षम आहे का हे तपासणे", "फक्त दर पाठवणे", "संपर्काकडे दुर्लक्ष करणे"], correct: 1 },
    ]
  },
  {
    id: "vyavsaya-vikas",
    name_hi: "Vyavsaya Vikas Pariksha",
    name_en: "Vyavsaya Vikas Pariksha (Business Development Selection Exam)",
    name_mr: "व्यवसाय विकास परीक्षा",
    for_hi: "Business Development Executive / Manager (MLA CTB, RBSM & Music Festival)",
    for_en: "Business Development Executive / Manager (MLA CTB, RBSM & Music Festival)",
    for_mr: "व्यवसाय विकास अधिकारी / व्यवस्थापक (MLA CTB, RBSM व संगीत महोत्सव)",
    fee: 700,
    duration_hi: "100 minutes",
    duration_en: "100 minutes",
    duration_mr: "100 मिनिटे",
    questions_hi: "100 MCQ (1 mark) + 5 short-answer (2 marks) = 110 marks",
    questions_en: "100 MCQ (1 mark) + 5 short-answer (2 marks) = 110 marks",
    questions_mr: "100 बहुपर्यायी (1 गुण) + 5 लघुत्तरी (2 गुण) = 110 गुण",
    sections_en: ["General Knowledge — 15", "Business Development & Sponsorship Concepts — 40", "Event/Partnership Case Studies — 30", "Hindi — 15"],
    sections_mr: [
      "सामान्य ज्ञान — 15",
      "व्यवसाय विकास व प्रायोजकत्व संकल्पना — 40",
      "कार्यक्रम/भागीदारी केस स्टडी — 30",
      "हिंदी — 15",
    ],
    negative_hi: "−0.25 per wrong MCQ",
    negative_en: "−0.25 per wrong MCQ",
    negative_mr: "प्रत्येक चुकीच्या बहुपर्यायी प्रश्नाला −0.25",
    qualifying: "65 / 110",
    note_hi: "Top scorers → Manager, baaki → Executive",
    note_en: "Top scorers → Manager, rest → Executive",
    note_mr: "सर्वाधिक गुण → व्यवस्थापक, इतर → अधिकारी",
    samples_en: [
      { q: "Ek sponsorship proposal mein sabse zaroori cheez hai:", opts: ["Sirf logo placement", "Sponsor ko clear ROI/visibility deliverables dikhana", "Lambi company history", "Koi budget na dena"], correct: 1 },
      { q: "(Short answer) ≤80 words mein bataao: ek corporate sponsor ko Music Festival mein ₹10 lakh sponsorship ke liye kaise convince karoge?", opts: [], correct: -1, descriptive: true }
    ],
    samples_mr: [
      { q: "प्रायोजकत्व प्रस्तावात सर्वात महत्त्वाची गोष्ट आहे:", opts: ["फक्त बोधचिन्ह लावणे", "प्रायोजकाला स्पष्ट परतावा/प्रसिद्धी काय मिळेल ते दाखवणे", "कंपनीचा मोठा इतिहास", "अर्थसंकल्प न देणे"], correct: 1 },
      { q: "(लघुत्तरी) 80 शब्दांत सांगा: संगीत महोत्सवासाठी ₹10 लाखांचे प्रायोजकत्व देण्यास एका कंपनीला तुम्ही कसे पटवाल?", opts: [], correct: -1, descriptive: true },
    ]
  },
  {
    id: "vyapar",
    name_hi: "Vyapar Pariksha",
    name_en: "Vyapar Pariksha (Trade Selection Exam)",
    name_mr: "व्यापार परीक्षा",
    for_hi: "Import Manager / Export Manager",
    for_en: "Import Manager / Export Manager",
    for_mr: "आयात व्यवस्थापक / निर्यात व्यवस्थापक",
    fee: 800,
    duration_hi: "110 minutes",
    duration_en: "110 minutes",
    duration_mr: "110 मिनिटे",
    questions_hi: "100 MCQ (1 mark) + 8 short-answer (2 marks) = 116 marks",
    questions_en: "100 MCQ (1 mark) + 8 short-answer (2 marks) = 116 marks",
    questions_mr: "100 बहुपर्यायी (1 गुण) + 8 लघुत्तरी (2 गुण) = 116 गुण",
    sections_en: ["General Knowledge — 15", "International Trade & Compliance (DGFT/Customs/FEMA/GST) — 45", "Logistics & Documentation — 30", "Hindi — 10"],
    sections_mr: [
      "सामान्य ज्ञान — 15",
      "आंतरराष्ट्रीय व्यापार व नियमपालन (DGFT/Customs/FEMA/GST) — 45",
      "मालवाहतूक व कागदपत्रे — 30",
      "हिंदी — 10",
    ],
    negative_hi: "−0.25 per wrong MCQ",
    negative_en: "−0.25 per wrong MCQ",
    negative_mr: "प्रत्येक चुकीच्या बहुपर्यायी प्रश्नाला −0.25",
    qualifying: "70 / 116",
    note_hi: "Graduate (International Trade/Agribusiness preferred)",
    note_en: "Graduate (International Trade/Agribusiness preferred)",
    note_mr: "पदवीधर (आंतरराष्ट्रीय व्यापार/कृषी व्यवसायाला प्राधान्य)",
    samples_en: [
      { q: "Export shipment ke liye \"Certificate of Origin\" ka kaam hai:", opts: ["Product ka manufacturing country prove karna", "Sirf price declare karna", "Insurance cover dena", "Kuch nahi"], correct: 0 },
      { q: "DGFT (Directorate General of Foreign Trade) ka mool kaam hai:", opts: ["Income tax collect karna", "India ke import-export policy ko regulate karna", "Sirf visa issue karna", "Banking regulation"], correct: 1 }
    ],
    samples_mr: [
      { q: "निर्यात पाठवणीसाठी \"मूळ प्रमाणपत्र\" (Certificate of Origin) चे काम आहे:", opts: ["उत्पादन कोणत्या देशात बनले हे सिद्ध करणे", "फक्त किंमत जाहीर करणे", "विमा संरक्षण देणे", "काहीही नाही"], correct: 0 },
      { q: "DGFT (परराष्ट्र व्यापार महासंचालनालय) चे मूळ काम आहे:", opts: ["प्राप्तिकर गोळा करणे", "भारताच्या आयात-निर्यात धोरणाचे नियमन करणे", "फक्त व्हिसा देणे", "बँकिंग नियमन"], correct: 1 },
    ]
  },
  {
    id: "vyapar-nideshak",
    name_hi: "Vyapar Nideshak Pariksha",
    name_en: "Vyapar Nideshak Pariksha (Trade Director Selection Exam)",
    name_mr: "व्यापार निदेशक परीक्षा",
    for_hi: "Director (Export & Import / International Trade)",
    for_en: "Director (Export & Import / International Trade)",
    for_mr: "संचालक (आयात-निर्यात / आंतरराष्ट्रीय व्यापार)",
    fee: 1500,
    duration_hi: "150 minutes",
    duration_en: "150 minutes",
    duration_mr: "150 मिनिटे",
    questions_hi: "100 MCQ (1 mark) + 10 essay/case-study (5 marks) = 150 marks",
    questions_en: "100 MCQ (1 mark) + 10 essay/case-study (5 marks) = 150 marks",
    questions_mr: "100 बहुपर्यायी (1 गुण) + 10 निबंध/केस स्टडी (5 गुण) = 150 गुण",
    sections_en: ["Trade Policy & Strategy — 40", "Leadership & Negotiation — 30", "Case Studies — 30", "Regulatory Compliance — 30", "Essays — 20"],
    sections_mr: [
      "व्यापार धोरण व रणनीती — 40",
      "नेतृत्व व वाटाघाटी — 30",
      "केस स्टडी — 30",
      "नियामक अनुपालन — 30",
      "निबंध — 20",
    ],
    negative_hi: "−0.33 per wrong MCQ (essays mein nahi)",
    negative_en: "−0.33 per wrong MCQ (none for essays)",
    negative_mr: "प्रत्येक चुकीच्या बहुपर्यायी प्रश्नाला −0.33 (निबंधांना नाही)",
    qualifying: "90 / 150",
    note_hi: "Post-Graduate (International Trade/MBA preferred); exam ke baad senior management panel interview",
    note_en: "Post-Graduate (International Trade/MBA preferred); followed by a senior management panel interview",
    note_mr: "पदव्युत्तर (आंतरराष्ट्रीय व्यापार/MBA ला प्राधान्य); परीक्षेनंतर वरिष्ठ व्यवस्थापन पॅनेल मुलाखत",
    samples_en: [
      { q: "Ek international joint venture negotiate karte waqt sabse important consideration hai:", opts: ["Sirf price", "Long-term strategic fit, IP protection, aur exit terms", "Meeting ki location", "Kuch nahi"], correct: 1 },
      { q: "(Case study) Ek key export market mein sudden tariff badh jaata hai jisse margins 15% kam ho jaate hain. Director ke roop mein pehle 90 din ka response plan kya hoga?", opts: [], correct: -1, descriptive: true }
    ],
    samples_mr: [
      { q: "आंतरराष्ट्रीय संयुक्त उपक्रमाची वाटाघाटी करताना सर्वात महत्त्वाचा विचार आहे:", opts: ["फक्त किंमत", "दीर्घकालीन धोरणात्मक सुसंगती, बौद्धिक संपदा संरक्षण आणि बाहेर पडण्याच्या अटी", "बैठकीचे ठिकाण", "काहीही नाही"], correct: 1 },
      { q: "(केस स्टडी) एका प्रमुख निर्यात बाजारपेठेत अचानक आयातशुल्क वाढते आणि नफा 15% कमी होतो. संचालक म्हणून पहिल्या 90 दिवसांची तुमची कृती योजना काय असेल?", opts: [], correct: -1, descriptive: true },
    ]
  },
  {
    id: "prakriya",
    name_hi: "Prakriya Pariksha",
    name_en: "Prakriya Pariksha (Processing Selection Exam)",
    name_mr: "प्रक्रिया परीक्षा",
    for_hi: "Primary/District Processing Centre Executive, Warehouse Manager",
    for_en: "Primary/District Processing Centre Executive, Warehouse Manager",
    for_mr: "प्राथमिक/जिल्हा प्रक्रिया केंद्र अधिकारी, गोदाम व्यवस्थापक",
    fee: 600,
    duration_hi: "90 minutes",
    duration_en: "90 minutes",
    duration_mr: "90 मिनिटे",
    questions_hi: "100 MCQ (1 mark each)",
    questions_en: "100 MCQ (1 mark each)",
    questions_mr: "100 बहुपर्यायी प्रश्न (प्रत्येकी 1 गुण)",
    sections_en: ["General Knowledge — 20", "Food Processing & Quality Standards (FSSAI/HACCP/GMP) — 40", "Inventory & Warehouse Management — 25", "Hindi — 15"],
    sections_mr: [
      "सामान्य ज्ञान — 20",
      "अन्न प्रक्रिया व गुणवत्ता मानके (FSSAI/HACCP/GMP) — 40",
      "साठा व गोदाम व्यवस्थापन — 25",
      "हिंदी — 15",
    ],
    negative_hi: "−0.25 per wrong answer",
    negative_en: "−0.25 per wrong answer",
    negative_mr: "प्रत्येक चुकीच्या उत्तराला −0.25",
    qualifying: "60 / 100",
    note_hi: "12th/Graduate, basic food-handling/quality-check training",
    note_en: "12th/Graduate, basic food-handling/quality-check training",
    note_mr: "12वी/पदवीधर, अन्न हाताळणी/गुणवत्ता तपासणीचे प्राथमिक प्रशिक्षण",
    samples_en: [
      { q: "FSSAI ka poora naam hai:", opts: ["Food Safety and Standards Authority of India", "Federal State Storage Authority of India", "Farmers Support and Subsidy Authority of India", "Kuch nahi"], correct: 0 },
      { q: "FIFO inventory practice ka matlab hai:", opts: ["First In, First Out", "Fast Inventory, Fast Output", "Final Invoice For Order", "Kuch nahi"], correct: 0 }
    ],
    samples_mr: [
      { q: "FSSAI चे पूर्ण नाव आहे:", opts: ["Food Safety and Standards Authority of India", "Federal State Storage Authority of India", "Farmers Support and Subsidy Authority of India", "यापैकी काहीही नाही"], correct: 0 },
      { q: "FIFO साठा पद्धतीचा अर्थ आहे:", opts: ["First In, First Out — आधी आलेला माल आधी बाहेर", "Fast Inventory, Fast Output", "Final Invoice For Order", "यापैकी काहीही नाही"], correct: 0 },
    ]
  },
  {
    id: "prakriya-prabandhak",
    name_hi: "Prakriya Prabandhak Pariksha",
    name_en: "Prakriya Prabandhak Pariksha (Processing Manager Selection Exam)",
    name_mr: "प्रक्रिया प्रबंधक परीक्षा",
    for_hi: "Storage Manager, Food Processing Unit Manager",
    for_en: "Storage Manager, Food Processing Unit Manager",
    for_mr: "साठवण व्यवस्थापक, अन्न प्रक्रिया केंद्र व्यवस्थापक",
    fee: 1000,
    duration_hi: "120 minutes",
    duration_en: "120 minutes",
    duration_mr: "120 मिनिटे",
    questions_hi: "100 MCQ (1 mark) + 10 short-answer (2 marks) = 120 marks",
    questions_en: "100 MCQ (1 mark) + 10 short-answer (2 marks) = 120 marks",
    questions_mr: "100 बहुपर्यायी (1 गुण) + 10 लघुत्तरी (2 गुण) = 120 गुण",
    sections_en: ["General Knowledge — 15", "Advanced Food Safety & Compliance — 35", "Production/Storage Planning & Cost Control — 35", "Leadership & Team Management — 25", "Hindi — 10"],
    sections_mr: [
      "सामान्य ज्ञान — 15",
      "प्रगत अन्न सुरक्षा व नियमपालन — 35",
      "उत्पादन/साठवण नियोजन व खर्च नियंत्रण — 35",
      "नेतृत्व व संघ व्यवस्थापन — 25",
      "हिंदी — 10",
    ],
    negative_hi: "−0.33 per wrong MCQ",
    negative_en: "−0.33 per wrong MCQ",
    negative_mr: "प्रत्येक चुकीच्या बहुपर्यायी प्रश्नाला −0.33",
    qualifying: "75 / 120",
    note_hi: "Graduate/Post-Graduate (Food Technology preferred), kam se kam 3–5 saal anubhav",
    note_en: "Graduate/Post-Graduate (Food Technology preferred), at least 3–5 years of experience",
    note_mr: "पदवीधर/पदव्युत्तर (अन्न तंत्रज्ञानाला प्राधान्य), किमान 3–5 वर्षे अनुभव",
    samples_en: [
      { q: "HACCP framework mool roop se focus karta hai:", opts: ["Marketing strategy par", "Food safety hazards ko identify aur control karne par", "Employee salary par", "Kuch nahi"], correct: 1 },
      { q: "(Short answer) ≤80 words mein bataao: ek storage facility mein spoilage losses ko 30% kaise kam karoge?", opts: [], correct: -1, descriptive: true }
    ],
    samples_mr: [
      { q: "HACCP आराखडा मुळात कशावर भर देतो:", opts: ["विपणन रणनीतीवर", "अन्न सुरक्षेतील धोके ओळखणे व नियंत्रित करणे यावर", "कर्मचाऱ्यांच्या पगारावर", "यापैकी काहीही नाही"], correct: 1 },
      { q: "(लघुत्तरी) 80 शब्दांत सांगा: साठवण केंद्रातील नासाडी 30% ने कशी कमी कराल?", opts: [], correct: -1, descriptive: true },
    ]
  },
  {
    id: "samuday-vikas",
    name_hi: "Samuday Vikas Pariksha",
    name_en: "Samuday Vikas Pariksha (Community Development Selection Exam)",
    name_mr: "समुदाय विकास परीक्षा",
    for_hi: "CSR Executive, Agro Estate Manager, Events Team (Mid Level)",
    for_en: "CSR Executive, Agro Estate Manager, Events Team (Mid Level)",
    for_mr: "सामाजिक दायित्व अधिकारी, कृषी मळा व्यवस्थापक, कार्यक्रम संघ (मध्यम स्तर)",
    fee: 600,
    duration_hi: "90 minutes",
    duration_en: "90 minutes",
    duration_mr: "90 मिनिटे",
    questions_hi: "100 MCQ (1 mark each)",
    questions_en: "100 MCQ (1 mark each)",
    questions_mr: "100 बहुपर्यायी प्रश्न (प्रत्येकी 1 गुण)",
    sections_en: ["General Knowledge — 20", "CSR / Agriculture / Event Concepts — 40", "Community Engagement — 25", "Hindi — 15"],
    sections_mr: [
      "सामान्य ज्ञान — 20",
      "सामाजिक दायित्व / कृषी / कार्यक्रम संकल्पना — 40",
      "समुदाय सहभाग — 25",
      "हिंदी — 15",
    ],
    negative_hi: "−0.25 per wrong answer",
    negative_en: "−0.25 per wrong answer",
    negative_mr: "प्रत्येक चुकीच्या उत्तराला −0.25",
    qualifying: "60 / 100",
    note_hi: "Graduate (Social Work/Agriculture/Event Management preferred)",
    note_en: "Graduate (Social Work/Agriculture/Event Management preferred)",
    note_mr: "पदवीधर (समाजकार्य/कृषी/कार्यक्रम व्यवस्थापनाला प्राधान्य)",
    samples_en: [
      { q: "Companies Act, 2013 ke Schedule VII mein kya define hota hai:", opts: ["Tax slabs", "CSR activities jo eligible hain", "Company registration process", "Kuch nahi"], correct: 1 },
      { q: "FIFO/FEFO jaisi practices kis field mein use hoti hain:", opts: ["Sirf marketing", "Inventory/storage management", "Event planning", "Kuch nahi"], correct: 1 }
    ],
    samples_mr: [
      { q: "कंपनी कायदा 2013 च्या अनुसूची VII मध्ये काय ठरवले आहे:", opts: ["कर टप्पे", "सामाजिक दायित्वासाठी पात्र असलेले उपक्रम", "कंपनी नोंदणी प्रक्रिया", "यापैकी काहीही नाही"], correct: 1 },
      { q: "FIFO/FEFO सारख्या पद्धती कोणत्या क्षेत्रात वापरल्या जातात:", opts: ["फक्त विपणन", "साठा/साठवण व्यवस्थापन", "कार्यक्रम नियोजन", "यापैकी काहीही नाही"], correct: 1 },
    ]
  },
  {
    id: "netritva",
    name_hi: "Netritva Pariksha",
    name_en: "Netritva Pariksha (Leadership Selection Exam)",
    name_mr: "नेतृत्व परीक्षा",
    for_hi: "Events Team (Senior Level)",
    for_en: "Events Team (Senior Level)",
    for_mr: "कार्यक्रम संघ (वरिष्ठ स्तर)",
    fee: 1000,
    duration_hi: "120 minutes",
    duration_en: "120 minutes",
    duration_mr: "120 मिनिटे",
    questions_hi: "100 MCQ (1 mark) + 10 short-answer (2 marks) = 120 marks",
    questions_en: "100 MCQ (1 mark) + 10 short-answer (2 marks) = 120 marks",
    questions_mr: "100 बहुपर्यायी (1 गुण) + 10 लघुत्तरी (2 गुण) = 120 गुण",
    sections_en: ["General Knowledge — 15", "Event Strategy & Sponsor Management — 35", "Leadership & Crisis Management (Case Studies) — 35", "Hindi — 10", "Essays — 25"],
    sections_mr: [
      "सामान्य ज्ञान — 15",
      "कार्यक्रम रणनीती व प्रायोजक व्यवस्थापन — 35",
      "नेतृत्व व आणीबाणी व्यवस्थापन (केस स्टडी) — 35",
      "हिंदी — 10",
      "निबंध — 25",
    ],
    negative_hi: "−0.33 per wrong MCQ",
    negative_en: "−0.33 per wrong MCQ",
    negative_mr: "प्रत्येक चुकीच्या बहुपर्यायी प्रश्नाला −0.33",
    qualifying: "75 / 120",
    note_hi: "Graduate/Post-Graduate, kam se kam 5 saal event-management leadership anubhav",
    note_en: "Graduate/Post-Graduate, at least 5 years of event-management leadership experience",
    note_mr: "पदवीधर/पदव्युत्तर, किमान 5 वर्षे कार्यक्रम व्यवस्थापन नेतृत्वाचा अनुभव",
    samples_en: [
      { q: "Ek large-scale event mein last-minute VIP cancellation ho jaaye to sabse pehla step hona chahiye:", opts: ["Event cancel karna", "Protocol team ko turant inform karna aur seating/agenda adjust karna", "Kuch na karna", "Media ko turant batana"], correct: 1 },
      { q: "(Case study) Ek music festival mein sound system technical failure ho jaata hai 5,000 attendees ke saamne. Senior Events Lead ke roop mein aapka immediate action plan?", opts: [], correct: -1, descriptive: true }
    ],
    samples_mr: [
      { q: "मोठ्या कार्यक्रमात ऐनवेळी VIP ची उपस्थिती रद्द झाल्यास पहिले पाऊल काय असावे:", opts: ["कार्यक्रम रद्द करणे", "प्रोटोकॉल संघाला तात्काळ कळवून बैठक व्यवस्था/कार्यक्रमपत्रिका बदलणे", "काहीही न करणे", "माध्यमांना लगेच सांगणे"], correct: 1 },
      { q: "(केस स्टडी) संगीत महोत्सवात 5,000 प्रेक्षकांसमोर ध्वनी यंत्रणा बंद पडते. वरिष्ठ कार्यक्रम प्रमुख म्हणून तुमची तात्काळ कृती योजना काय?", opts: [], correct: -1, descriptive: true },
    ]
  }
];

export const ROADMAP = [
  { n: 1, icon: "badge", title_hi: "Registration & KYC", title_en: "Registration & KYC", title_mr: "नोंदणी आणि KYC", desc_hi: "Form bharo, Aadhaar KYC, fee pay (₹500 / ₹1,000) → Application ID milega.", desc_en: "Fill form, Aadhaar KYC, pay fee (₹500 / ₹1,000) → get Application ID.", desc_mr: "अर्ज भरा, आधार KYC, शुल्क भरा (₹500 / ₹1,000) → अर्ज क्रमांक मिळेल.", },
  { n: 2, icon: "scan", title_hi: "Admit Card", title_en: "Admit Card", title_mr: "प्रवेशपत्र", desc_hi: "QR-coded admit card (photo, venue, slot, terminal) ~1 week pehle; one-time face photo capture.", desc_en: "QR-coded admit card ~1 week before; one-time face photo capture.", desc_mr: "QR असलेले प्रवेशपत्र (फोटो, ठिकाण, वेळ, संगणक) सुमारे 1 आठवडा आधी; एकदाच चेहऱ्याचा फोटो घेतला जातो.", },
  { n: 3, icon: "shield", title_hi: "Pre-Entry Screening", title_en: "Pre-Entry Screening", title_mr: "प्रवेशपूर्व तपासणी", desc_hi: "Exam day: gate par admit-card QR scan, metal detector + bag scan.", desc_en: "Exam day: admit-card QR scan, metal detector + bag scan at gate.", desc_mr: "परीक्षेच्या दिवशी: प्रवेशद्वारावर प्रवेशपत्र QR तपासणी, मेटल डिटेक्टर + बॅग तपासणी.", },
  { n: 4, icon: "lock", title_hi: "Terminal Login & Exam", title_en: "Terminal Login & Exam", title_mr: "संगणकावर प्रवेश आणि परीक्षा", desc_hi: "Aadhaar QR + face verify → lockdown → 90/120-min paper.", desc_en: "Aadhaar QR + face verify → lockdown → 90/120-min paper.", desc_mr: "आधार QR + चेहरा पडताळणी → सुरक्षित मोड → 90/120 मिनिटांची प्रश्नपत्रिका.", },
  { n: 5, icon: "eye", title_hi: "Live Proctoring", title_en: "Live Proctoring", title_mr: "थेट देखरेख", desc_hi: "Control room + AI; flags review ke liye.", desc_en: "Control room + AI; flags for review.", desc_mr: "नियंत्रण कक्ष + AI; संशयास्पद नोंदी तपासणीसाठी.", },
  { n: 6, icon: "trendingUp", title_hi: "Result & Audit", title_en: "Result & Audit", title_mr: "निकाल आणि पडताळणी", desc_hi: "Auto-scored, merit list with full audit trail.", desc_en: "Auto-scored, merit list with full audit trail.", desc_mr: "स्वयंचलित गुणांकन, संपूर्ण नोंदीसह गुणवत्ता यादी.", },
  { n: 7, icon: "users", title_hi: "Interview", title_en: "Interview", title_mr: "मुलाखत", desc_hi: "Shortlisted candidates (VLE/VLM: 15 min; TLO/DLO: 30 min).", desc_en: "Shortlisted candidates (VLE/VLM: 15 min; TLO/DLO: 30 min).", desc_mr: "निवडलेले उमेदवार (VLE/VLM: 15 मिनिटे; TEO/विभाग स्तर अधिकारी: 30 मिनिटे).", },
  { n: 8, icon: "fileText", title_hi: "Selection & Offer", title_en: "Selection & Offer", title_mr: "निवड आणि नियुक्तीपत्र", desc_hi: "Local-first posting, document verification, offer letter, anti-corruption declaration.", desc_en: "Local-first posting, document verification, offer letter, anti-corruption declaration.", desc_mr: "स्थानिक-प्रथम नियुक्ती, कागदपत्र पडताळणी, नियुक्तीपत्र, भ्रष्टाचारविरोधी घोषणा.", },
  { n: 9, icon: "cap", title_hi: "Training", title_en: "Training", title_mr: "प्रशिक्षण", desc_hi: "2 months residential + 2 months supervised provisioning (reduced pay).", desc_en: "2 months residential + 2 months supervised provisioning (reduced pay).", desc_mr: "2 महिने निवासी + 2 महिने देखरेखीखाली प्रत्यक्ष काम (कमी वेतन).", },
  { n: 10, icon: "ev", title_hi: "Deployment", title_en: "Deployment", title_mr: "नियुक्ती", desc_hi: "Full pay from Month 5; uniform + EV + field device.", desc_en: "Full pay from Month 5; uniform + EV + field device.", desc_mr: "5व्या महिन्यापासून पूर्ण वेतन; गणवेश + EV + क्षेत्रीय उपकरण.", }
];

export const TRAINING = [
  { wk: "1", title_hi: "Orientation & culture", title_en: "Orientation & culture", title_mr: "ओळख आणि कार्यसंस्कृती", desc_en: "Mission, structure, code of conduct, anti-corruption", desc_mr: "ध्येय, रचना, आचारसंहिता, भ्रष्टाचारविरोध" },
  { wk: "2", title_hi: "Agronomy basics", title_en: "Agronomy basics", title_mr: "कृषिशास्त्राची मूलतत्त्वे", desc_en: "Soil science, crop cycles, NPK, pest management, organics", desc_mr: "मृदाशास्त्र, पीक चक्र, NPK, कीड व्यवस्थापन, सेंद्रिय शेती" },
  { wk: "3", title_hi: "Government schemes", title_en: "Government schemes", title_mr: "सरकारी योजना", desc_en: "PM-KISAN, PMFBY, KCC, PM-KUSUM, Soil Health Card, e-NAM, ODOP, MGNREGA", desc_mr: "PM-KISAN, PMFBY, KCC, PM-KUSUM, मृदा आरोग्य पत्रिका, e-NAM, ODOP, मनरेगा" },
  { wk: "4", title_hi: "Finance & banking", title_en: "Finance & banking", title_mr: "अर्थ आणि बँकिंग", desc_en: "Credit scoring, loan applications, insurance claims, UPI/AePS", desc_mr: "पतमानांकन, कर्ज अर्ज, विमा दावे, UPI/AePS" },
  { wk: "5", title_hi: "Technology", title_en: "Technology", title_mr: "तंत्रज्ञान", desc_en: "Field app, GPS check-in, data entry, offline sync, IoT sensors", desc_mr: "क्षेत्रीय अ‍ॅप, GPS हजेरी, माहिती नोंद, ऑफलाइन समक्रमण, IoT सेन्सर" },
  { wk: "6", title_hi: "Soft skills", title_en: "Soft skills", title_mr: "संवाद कौशल्ये", desc_en: "Counselling, listening, conflict resolution, public speaking", desc_mr: "समुपदेशन, ऐकणे, वाद निवारण, जाहीर भाषण" },
  { wk: "7", title_hi: "Field practicum", title_en: "Field practicum", title_mr: "प्रत्यक्ष क्षेत्रीय सराव", desc_en: "Mock enrollments, soil sampling, shadow senior VLEs", desc_mr: "सराव नोंदणी, माती नमुने, वरिष्ठ VLE सोबत प्रत्यक्ष अनुभव" },
  { wk: "8", title_hi: "Assessment & deployment", title_en: "Assessment & deployment", title_mr: "मूल्यमापन आणि नियुक्ती", desc_en: "Written + practical, certification, village assignment", desc_mr: "लेखी + प्रात्यक्षिक, प्रमाणपत्र, गाव नियुक्ती" }
];

export const SCHEMES = [
  { name_en: "PM-KISAN", icon: "rupee", benefit_hi: "₹6,000/year direct bank transfer", benefit_en: "₹6,000/year direct bank transfer", benefit_mr: "₹6,000 दरवर्षी थेट बँक खात्यात", role_hi: "Land records verify, portal registration, installment tracking", role_en: "Verify land records, portal registration, installment tracking", role_mr: "जमीन नोंदी पडताळणे, पोर्टल नोंदणी, हप्त्यांवर लक्ष", },
  { name_en: "PMFBY", sub_en: "Crop Insurance", sub_mr: "पीक विमा", icon: "shield", benefit_hi: "Drought/flood/pest se crop loss compensation", benefit_en: "Compensation for crop loss from drought/flood/pest", benefit_mr: "दुष्काळ/पूर/कीड यामुळे झालेल्या पीक नुकसानीची भरपाई", role_hi: "Cutoff se pehle enrollment, GPS crop photo, claim filing", role_en: "Enrollment before cutoff, GPS crop photo, claim filing", role_mr: "अंतिम मुदतीपूर्वी नोंदणी, GPS पीक फोटो, दावा दाखल करणे", },
  { name_en: "KCC", sub_en: "Kisan Credit Card", sub_mr: "किसान क्रेडिट कार्ड", icon: "credit", benefit_hi: "₹3 lakh tak loan @ ~4%", benefit_en: "Loan up to ₹3 lakh @ ~4%", benefit_mr: "₹3 लाखांपर्यंत कर्ज सुमारे 4% दराने", role_hi: "Documents, bank application, follow-up", role_en: "Documents, bank application, follow-up", role_mr: "कागदपत्रे, बँक अर्ज, पाठपुरावा", },
  { name_en: "PM-KUSUM", icon: "sun", benefit_hi: "Solar pump par 90% subsidy", benefit_en: "90% subsidy on solar pump", benefit_mr: "सौर पंपावर 90% अनुदान", role_hi: "Online application, DISCOM coordination", role_en: "Online application, DISCOM coordination", role_mr: "ऑनलाइन अर्ज, वीज वितरण कंपनीशी समन्वय", },
  { name_en: "Soil Health Card", name_mr: "मृदा आरोग्य पत्रिका", icon: "seedling", benefit_hi: "Free soil test + fertilizer advice", benefit_en: "Free soil test + fertilizer advice", benefit_mr: "मोफत माती परीक्षण + खत सल्ला", role_hi: "Sample collect, report explain", role_en: "Collect sample, explain report", role_mr: "नमुना गोळा करणे, अहवाल समजावून सांगणे", },
  { name_en: "MGNREGA", icon: "hammer", benefit_hi: "100 din rozgaar guarantee", benefit_en: "100 days employment guarantee", benefit_mr: "100 दिवस रोजगाराची हमी", role_hi: "Household registration, farm-work application", role_en: "Household registration, farm-work application", role_mr: "कुटुंब नोंदणी, शेतकाम अर्ज", },
  { name_en: "PMAY-G", icon: "home", benefit_hi: "Pucca ghar ke liye ₹1.2–1.3 lakh", benefit_en: "₹1.2–1.3 lakh for a pucca house", benefit_mr: "पक्क्या घरासाठी ₹1.2–1.3 लाख", role_hi: "Survey verification, application, follow-up", role_en: "Survey verification, application, follow-up", role_mr: "सर्वेक्षण पडताळणी, अर्ज, पाठपुरावा", },
  { name_en: "e-NAM / ODOP", icon: "market", benefit_hi: "Better market access & district products", benefit_en: "Better market access & district products", benefit_mr: "उत्तम बाजारपेठ उपलब्धता आणि जिल्हा उत्पादने", role_hi: "Mandi linkage, FPO support", role_en: "Mandi linkage, FPO support", role_mr: "बाजार समिती जोडणी, शेतकरी उत्पादक कंपनीला सहाय्य", }
];

export const SCHEME_TRUST = [
  { icon: "users", title_hi: "Har Yojana, Har Kisan", sub_hi: "Sahi jaankari, sahi haq", title_en: "Every Scheme, Every Farmer", title_mr: "प्रत्येक योजना, प्रत्येक शेतकरी", sub_en: "Right information, right entitlement", sub_mr: "योग्य माहिती, योग्य हक्क", },
  { icon: "shield", title_hi: "Pardarshita & Vishwas", sub_hi: "Transparent process, trusted support", title_en: "Transparency & Trust", title_mr: "पारदर्शकता आणि विश्वास", sub_en: "Transparent process, trusted support", sub_mr: "पारदर्शक प्रक्रिया, विश्वासार्ह पाठिंबा", },
  { icon: "headset", title_hi: "Officer Saath Hamesha", sub_hi: "Har kadam par madad", title_en: "Officer By Your Side", title_mr: "अधिकारी नेहमी सोबत", sub_en: "Support at every step", sub_mr: "प्रत्येक पावलावर मदत", },
  { icon: "leaf", title_hi: "Kisan Ka Vikas", sub_hi: "Samriddh kisan, samriddh desh", title_en: "Farmer's Growth", title_mr: "शेतकऱ्याचा विकास", sub_en: "Prosperous farmer, prosperous nation", sub_mr: "समृद्ध शेतकरी, समृद्ध देश", },
];

export const MEMBER_BENEFITS = [
  { icon: "credit", label_hi: "Harvest-linked credit", label_en: "Harvest-linked credit", label_mr: "पीक-संलग्न कर्ज", },
  { icon: "phone", label_hi: "Instant UPI crop payment", label_en: "Instant UPI crop payment", label_mr: "तात्काळ UPI पीक देयक", },
  { icon: "badge", label_hi: "Certified inputs at discount", label_en: "Certified inputs at discount", label_mr: "प्रमाणित सामग्री सवलतीत", },
  { icon: "hammer", label_hi: "Machinery / drone on rent", label_en: "Machinery / drone on rent", label_mr: "यंत्रसामग्री / ड्रोन भाड्याने", },
  { icon: "seedling", label_hi: "Soil testing + Fasal Calendar", label_en: "Soil testing + Crop Calendar", label_mr: "माती परीक्षण + पीक दिनदर्शिका", },
  { icon: "building", label_hi: "Storage & market access", label_en: "Storage & market access", label_mr: "साठवण आणि बाजारपेठ उपलब्धता", }
];

// Icons for the "For Farmers" section's government-scheme chip row — kept
// separate from SCHEMES since e-NAM/ODOP are shown as two chips here but one
// combined card there.
export const FARMER_GOVT_CHIPS = [
  { name_en: "PM-KISAN", icon: "rupee" },
  { name_en: "PMFBY", icon: "shield" },
  { name_en: "KCC", icon: "credit" },
  { name_en: "PM-KUSUM", icon: "sun" },
  { name_en: "Soil Health Card", name_mr: "मृदा आरोग्य पत्रिका", icon: "seedling" },
  { name_en: "MGNREGA", icon: "users" },
  { name_en: "PMAY-G", icon: "home" },
  { name_en: "e-NAM", icon: "market" },
  { name_en: "ODOP", icon: "briefcase" },
];

export const FARMER_IMPACT = [
  { icon: "users", title_hi: "Trusted Link", title_en: "Trusted Link", title_mr: "विश्वासाचा दुवा", sub_hi: "Kisano ko sahi support se jodna.", sub_en: "Connecting farmers to the right support.", sub_mr: "शेतकऱ्यांना योग्य पाठिंब्याशी जोडणे.", },
  { icon: "shield", title_hi: "Stronger Impact", title_en: "Stronger Impact", title_mr: "अधिक परिणाम", sub_hi: "Yojanaon ko real benefits mein badalna.", sub_en: "Turning schemes into real benefits.", sub_mr: "योजनांचे खऱ्या फायद्यांत रूपांतर करणे.", },
  { icon: "seedling", title_hi: "Rural Growth", title_en: "Rural Growth", title_mr: "ग्रामीण प्रगती", sub_hi: "Self-reliant kisan communities banana.", sub_en: "Building self-reliant farmer communities.", sub_mr: "स्वयंपूर्ण शेतकरी समुदाय घडवणे.", },
  { icon: "award", title_hi: "Better Future", title_en: "Better Future", title_mr: "उज्ज्वल भविष्य", sub_hi: "Aaj sashakt banaana, kal samriddh banana.", sub_en: "Empowering today for a prosperous tomorrow.", sub_mr: "आज सक्षम करणे, उद्या समृद्ध करणे.", },
];

export const INTERVIEW_MEDIA_BADGES = [
  { icon: "users", label_hi: "Dostana Panel", label_en: "Friendly Panel", label_mr: "मैत्रीपूर्ण पॅनेल", },
  { icon: "compass", label_hi: "Saarthak Charcha", label_en: "Meaningful Discussion", label_mr: "अर्थपूर्ण चर्चा", },
  { icon: "award", label_hi: "Merit Based Selection", label_en: "Merit Based Selection", label_mr: "गुणवत्तेवर आधारित निवड", },
];

export const INTERVIEW_POINTS = [
  { icon: "users", title_hi: "Aapki soch samajhna", title_en: "Understand your perspective", title_mr: "तुमची विचारसरणी समजून घेणे", desc_hi: "Hum aapke experiences, values aur rural development ke vision ke baare mein jaante hain.", desc_en: "We learn about your experiences, values, and vision for rural development.", desc_mr: "आम्ही तुमचे अनुभव, मूल्ये आणि ग्रामीण विकासाविषयीची दृष्टी जाणून घेतो.", },
  { icon: "award", title_hi: "Suitability assess karna", title_en: "Assess your suitability", title_mr: "योग्यता तपासणे", desc_hi: "Hum aapki clarity, problem-solving ability aur commitment evaluate karte hain.", desc_en: "We evaluate your clarity, problem-solving ability, and commitment.", desc_mr: "आम्ही तुमची स्पष्टता, समस्या सोडवण्याची क्षमता आणि निष्ठा तपासतो.", },
  { icon: "shield", title_hi: "Ghabrane ki zaroorat nahi", title_en: "No need to worry", title_mr: "घाबरण्याची गरज नाही", desc_hi: "Natural aur honest rahiye. Hum aapko samajhne ke liye yahan hain.", desc_en: "Be natural and honest. We are here to understand you better.", desc_mr: "सहज आणि प्रामाणिक रहा. आम्ही तुम्हाला समजून घेण्यासाठी इथे आहोत.", },
];

export const INTERVIEW_Q_ICONS = ["seedling", "flask", "calendar", "users", "megaphone"];

// Panel & Weightage per exam track — covers all 10 exams/21 positions.
// Panel composition, duration and interview-weight scale with seniority
// (mirrors the fee/duration scaling already used in EXAMS): junior/mid
// roles get a short, exam-heavy panel; senior/director roles get a longer,
// more interview-weighted one with an external/HQ panelist.
export const INTERVIEW_PANELS = [
  {
    examId: "gram-sevak", deptId: "field-operations", badge_hi: "VLE / VLM", badge_en: "VLE / VLM", badge_mr: "VLE / VLM",
    composition_hi: "1 TEO + 1 DLO + 1 HR", composition_en: "1 TEO + 1 DLO + 1 HR", composition_mr: "1 TEO + 1 विभाग स्तर अधिकारी + 1 मनुष्यबळ",
    duration_hi: "15 minute", duration_en: "15 minutes", duration_mr: "15 मिनिटे", examWeight: "70%", intWeight: "30%",
  },
  {
    examId: "krishi-adhikari", deptId: "field-operations", badge_hi: "TEO / DLO / DD", badge_en: "TEO / DLO / DD", badge_mr: "TEO / विभाग स्तर अधिकारी / विभागीय संचालक",
    composition_hi: "1 DLO + 1 senior officer + 1 bahari expert", composition_en: "1 DLO + 1 senior officer + 1 external expert", composition_mr: "1 विभाग स्तर अधिकारी + 1 वरिष्ठ अधिकारी + 1 बाहेरील तज्ज्ञ",
    duration_hi: "30 minute", duration_en: "30 minutes", duration_mr: "30 मिनिटे", examWeight: "60%", intWeight: "40%",
  },
  {
    examId: "vipnan", deptId: "sales-marketing", badge_hi: "Sales & Marketing", badge_en: "Sales & Marketing", badge_mr: "विक्री व विपणन",
    composition_hi: "1 Sales & Marketing Head + 1 HR", composition_en: "1 Sales & Marketing Head + 1 HR", composition_mr: "1 विक्री व विपणन प्रमुख + 1 मनुष्यबळ",
    duration_hi: "15 minute", duration_en: "15 minutes", duration_mr: "15 मिनिटे", examWeight: "70%", intWeight: "30%",
  },
  {
    examId: "vyavsaya-vikas", deptId: "business-development", badge_hi: "Business Development", badge_en: "Business Development", badge_mr: "व्यवसाय विकास",
    composition_hi: "1 BD Manager/Head + 1 HR", composition_en: "1 BD Manager/Head + 1 HR", composition_mr: "1 व्यवसाय विकास व्यवस्थापक/प्रमुख + 1 मनुष्यबळ",
    duration_hi: "20 minute", duration_en: "20 minutes", duration_mr: "20 मिनिटे", examWeight: "65%", intWeight: "35%",
  },
  {
    examId: "vyapar", deptId: "export-import", badge_hi: "Import / Export Manager", badge_en: "Import / Export Manager", badge_mr: "आयात / निर्यात व्यवस्थापक",
    composition_hi: "1 Director (Export-Import) + 1 HR + 1 bahari trade expert", composition_en: "1 Director (Export-Import) + 1 HR + 1 external trade expert", composition_mr: "1 संचालक (आयात-निर्यात) + 1 मनुष्यबळ + 1 बाहेरील व्यापार तज्ज्ञ",
    duration_hi: "25 minute", duration_en: "25 minutes", duration_mr: "25 मिनिटे", examWeight: "60%", intWeight: "40%",
  },
  {
    examId: "vyapar-nideshak", deptId: "export-import", badge_hi: "Director (Export-Import)", badge_en: "Director (Export-Import)", badge_mr: "संचालक (आयात-निर्यात)",
    composition_hi: "1 HQ Leadership + 1 Senior Director + 1 bahari trade expert", composition_en: "1 HQ Leadership + 1 Senior Director + 1 external trade expert", composition_mr: "1 मुख्यालय नेतृत्व + 1 वरिष्ठ संचालक + 1 बाहेरील व्यापार तज्ज्ञ",
    duration_hi: "40 minute", duration_en: "40 minutes", duration_mr: "40 मिनिटे", examWeight: "55%", intWeight: "45%",
  },
  {
    examId: "prakriya", deptId: "processing", badge_hi: "PPC / DPC / Warehouse", badge_en: "PPC / DPC / Warehouse", badge_mr: "PPC / DPC / गोदाम",
    composition_hi: "1 Processing Division Head + 1 HR", composition_en: "1 Processing Division Head + 1 HR", composition_mr: "1 प्रक्रिया विभाग प्रमुख + 1 मनुष्यबळ",
    duration_hi: "15 minute", duration_en: "15 minutes", duration_mr: "15 मिनिटे", examWeight: "70%", intWeight: "30%",
  },
  {
    examId: "prakriya-prabandhak", deptId: "processing", badge_hi: "FPUM / Storage Manager", badge_en: "FPUM / Storage Manager", badge_mr: "अन्न प्रक्रिया केंद्र / साठवण व्यवस्थापक",
    composition_hi: "1 Processing Division Head + 1 senior officer + 1 HR", composition_en: "1 Processing Division Head + 1 senior officer + 1 HR", composition_mr: "1 प्रक्रिया विभाग प्रमुख + 1 वरिष्ठ अधिकारी + 1 मनुष्यबळ",
    duration_hi: "25 minute", duration_en: "25 minutes", duration_mr: "25 मिनिटे", examWeight: "60%", intWeight: "40%",
  },
  {
    examId: "samuday-vikas", deptId: "corporate", badge_hi: "CSR / Estate / Events", badge_en: "CSR / Estate / Events", badge_mr: "सामाजिक दायित्व / मळे / कार्यक्रम",
    composition_hi: "1 Corporate Affairs Head + 1 HR", composition_en: "1 Corporate Affairs Head + 1 HR", composition_mr: "1 कॉर्पोरेट व्यवहार प्रमुख + 1 मनुष्यबळ",
    duration_hi: "15 minute", duration_en: "15 minutes", duration_mr: "15 मिनिटे", examWeight: "70%", intWeight: "30%",
  },
  {
    examId: "netritva", deptId: "corporate", badge_hi: "Events (Senior)", badge_en: "Events (Senior)", badge_mr: "कार्यक्रम (वरिष्ठ)",
    composition_hi: "1 Corporate Affairs Head + 1 senior event lead + 1 HR", composition_en: "1 Corporate Affairs Head + 1 senior event lead + 1 HR", composition_mr: "1 कॉर्पोरेट व्यवहार प्रमुख + 1 वरिष्ठ कार्यक्रम प्रमुख + 1 मनुष्यबळ",
    duration_hi: "25 minute", duration_en: "25 minutes", duration_mr: "25 मिनिटे", examWeight: "60%", intWeight: "40%",
  },
];

export const PREP_BENEFITS = [
  { icon: "shield", label_hi: "Trusted Resources", label_en: "Trusted Resources", label_mr: "विश्वासार्ह साधने", },
  { icon: "award", label_hi: "Quality Preparation", label_en: "Quality Preparation", label_mr: "दर्जेदार तयारी", },
  { icon: "clock", label_hi: "Save Time & Stay Focused", label_en: "Save Time & Stay Focused", label_mr: "वेळ वाचवा आणि लक्ष केंद्रित ठेवा", },
  { icon: "badge", label_hi: "Better Results", label_en: "Better Results", label_mr: "उत्तम निकाल", },
];

// Real Maharashtra district names (public geography, not a claim about the
// company) — a finer-grained list than DIVISIONS (the 6 official revenue
// divisions), used only for the footer's "Maharashtra Districts" showcase.
export const MAHARASHTRA_DISTRICTS = [
  { name_en: "Nashik", name_mr: "\u0928\u093e\u0936\u093f\u0915" },
  { name_en: "Pune", name_mr: "\u092a\u0941\u0923\u0947" },
  { name_en: "Nagpur", name_mr: "\u0928\u093e\u0917\u092a\u0942\u0930" },
  { name_en: "Amravati", name_mr: "\u0905\u092e\u0930\u093e\u0935\u0924\u0940" },
  { name_en: "Aurangabad", name_mr: "\u091b\u0924\u094d\u0930\u092a\u0924\u0940 \u0938\u0902\u092d\u093e\u091c\u0940\u0928\u0917\u0930" },
  { name_en: "Kolhapur", name_mr: "\u0915\u094b\u0932\u094d\u0939\u093e\u092a\u0942\u0930" },
  { name_en: "Solapur", name_mr: "\u0938\u094b\u0932\u093e\u092a\u0942\u0930" },
  { name_en: "Latur", name_mr: "\u0932\u093e\u0924\u0942\u0930" },
  { name_en: "Satara", name_mr: "\u0938\u093e\u0924\u093e\u0930\u093e" },
  { name_en: "Nanded", name_mr: "\u0928\u093e\u0902\u0926\u0947\u0921" },
  { name_en: "Wardha", name_mr: "\u0935\u0930\u094d\u0927\u093e" },
  { name_en: "Chandrapur", name_mr: "\u091a\u0902\u0926\u094d\u0930\u092a\u0942\u0930" },
];

export const FOOTER_ABOUT_STATS = [
  { icon: "shield", label_hi: "Trusted Platform", label_en: "Trusted Platform", label_mr: "विश्वासार्ह व्यासपीठ", },
  { icon: "users", label_hi: "Expert Guidance", label_en: "Expert Guidance", label_mr: "तज्ज्ञ मार्गदर्शन", },
  { icon: "fileText", label_hi: "Quality Content", label_en: "Quality Content", label_mr: "दर्जेदार अभ्यास साहित्य", },
  { icon: "award", label_hi: "Better Future", label_en: "Better Future", label_mr: "उज्ज्वल भविष्य", },
];

export const FOOTER_QUICK_LINKS = [
  { label_hi: "Kisan Mitra ke baare mein", label_en: "About Kisan Mitra", label_mr: "किसान मित्र विषयी", href: "#mission" },
  { label_hi: "Kaise kaam karta hai", label_en: "How It Works", label_mr: "हे कसे चालते", href: "/process" },
  { label_hi: "Saare Roles", label_en: "All Roles", label_mr: "सर्व पदे", href: "/roles" },
  { label_hi: "Departments", label_en: "Departments", label_mr: "विभाग", href: "/departments" },
  { label_hi: "Kya Milega (Fayde)", label_en: "What You Get", label_mr: "काय मिळेल (फायदे)", href: "/benefits" },
  { label_hi: "Exams", label_en: "Exams", label_mr: "परीक्षा", href: "/exams" },
  { label_hi: "Study Material", label_en: "Study Material", label_mr: "अभ्यास साहित्य", href: "/prepare" },
  { label_hi: "Coaching Centers", label_en: "Coaching Centers", label_mr: "प्रशिक्षण केंद्रे", href: "/prepare" },
  { label_hi: "Eligibility", label_en: "Eligibility", label_mr: "पात्रता", href: "/eligibility" },
  { label_hi: "FAQs", label_en: "FAQs", label_mr: "प्रश्नोत्तरे", href: "/faq" },
  { label_hi: "Sampark Karein", label_en: "Contact Us", label_mr: "संपर्क करा", href: "https://wa.me/910000000000" },
];

export const FOOTER_SOCIAL = [
  { icon: "facebook", label: "Facebook" },
  { icon: "youtube", label: "YouTube" },
  { icon: "telegram", label: "Telegram" },
  { icon: "whatsapp", label: "WhatsApp" },
  { icon: "xLogo", label: "X" },
];

export const FAQ = [
  { q_hi: "Ye exam sarkari hai kya?", q_en: "Is this a government exam?", q_mr: "ही परीक्षा सरकारी आहे का?", a_hi: "Nahi. Kisan Mitra, Argus/RKF ka ek private rural-development program hai jo kisanon ko sarkari yojanaon se jodta hai. Selection poori tarah merit + AI-proctored hai.", a_en: "No. Kisan Mitra is a private rural-development program by Argus/RKF that connects farmers to government schemes. Selection is fully merit-based + AI-proctored.", a_mr: "नाही. किसान मित्र हा Argus/RKF चा एक खाजगी ग्रामीण-विकास कार्यक्रम आहे जो शेतकऱ्यांना सरकारी योजनांशी जोडतो. निवड पूर्णपणे गुणवत्तेवर आणि AI-देखरेखीखाली होते.", },
  { q_hi: "Fee kitni hai?", q_en: "How much is the fee?", q_mr: "शुल्क किती आहे?", a_hi: "Gram Sevak ₹500, Krishi Adhikari ₹1,000. SC/ST/rural-girls/BPL ke liye waiver/concession.", a_en: "Gram Sevak ₹500, Krishi Adhikari ₹1,000. Waiver/concession for SC/ST/rural-girls/BPL.", a_mr: "ग्राम सेवक ₹500, कृषी अधिकारी ₹1,000. अनुसूचित जाती/जमाती, ग्रामीण मुली आणि दारिद्र्यरेषेखालील उमेदवारांना माफी/सवलत.", },
  { q_hi: "Salary kitni milegi?", q_en: "What is the salary?", q_mr: "पगार किती मिळेल?", a_hi: "Field Operations mein VLE ₹10,000, VLM ₹12,000, TEO ₹25,000, Division Level Officer ₹35,000, Divisional Director ₹50,000/month. Baaki departments mein ₹25,000 se ₹1,50,000/month tak — poori list Roles page par.", a_en: "In Field Operations: VLE ₹10,000, VLM ₹12,000, TEO ₹25,000, Division Level Officer ₹35,000, Divisional Director ₹50,000/month. Other departments range from ₹25,000 to ₹1,50,000/month — see the Roles page for the full list.", a_mr: "क्षेत्रीय कामकाजात VLE ₹10,000, VLM ₹12,000, TEO ₹25,000, विभाग स्तर अधिकारी ₹35,000, विभागीय संचालक ₹50,000 दरमहा. इतर विभागांत ₹25,000 ते ₹1,50,000 दरमहा — संपूर्ण यादी पदे पानावर.", },
  { q_hi: "Posting kahan hogi?", q_en: "Where will posting be?", q_mr: "नियुक्ती कुठे होईल?", a_hi: "Local-first — wherever possible apne ya paas ke gaon/cluster mein.", a_en: "Local-first — wherever possible in your own or nearby village/cluster.", a_mr: "स्थानिक-प्रथम — शक्य तिथे स्वतःच्या किंवा जवळच्या गावात/समूहात.", },
  { q_hi: "VLE aur VLM mein farak?", q_en: "Difference between VLE and VLM?", q_mr: "VLE आणि VLM मध्ये काय फरक?", a_hi: "Dono ek hi Gram Sevak Pariksha se; top scorers VLM (cluster lead, senior), baaki VLE (field lead).", a_en: "Both from the same Gram Sevak Pariksha; top scorers become VLM (cluster lead, senior), the rest VLE (field lead).", a_mr: "दोन्ही एकाच ग्राम सेवक परीक्षेतून; सर्वाधिक गुण मिळवणारे VLM (समूह प्रमुख, वरिष्ठ), इतर VLE (क्षेत्रीय प्रमुख).", },
  { q_hi: "Exam kaise hoga?", q_en: "How will the exam be conducted?", q_mr: "परीक्षा कशी होईल?", a_hi: "Secure terminal, QR + face verify, AI proctoring, aapke paas ke school/college/panchayat hall mein, multi-shift.", a_en: "Secure terminal, QR + face verify, AI proctoring, at nearby school/college/panchayat halls, multi-shift.", a_mr: "सुरक्षित संगणक, QR + चेहरा पडताळणी, AI देखरेख, तुमच्या जवळच्या शाळा/महाविद्यालय/पंचायत सभागृहात, अनेक सत्रांत.", },
  { q_hi: "Reschedule ho sakta hai?", q_en: "Can I reschedule?", q_mr: "परीक्षेची तारीख बदलता येते का?", a_hi: "Haan, ₹3,000 mein ek baar (≥48 hr notice). Non-selected ko next attempt par 10% waiver.", a_en: "Yes, once for ₹3,000 (≥48 hr notice). Non-selected get 10% waiver on next attempt.", a_mr: "होय, ₹3,000 मध्ये एकदा (किमान 48 तास आधी कळवून). निवड न झालेल्यांना पुढील प्रयत्नात 10% सवलत.", },
  { q_hi: "Mera data safe hai?", q_en: "Is my data safe?", q_mr: "माझा डेटा सुरक्षित आहे का?", a_hi: "Aadhaar AES-256 encrypted; DPDP Act ke according; non-selected ka data 6 mahine baad delete.", a_en: "Aadhaar AES-256 encrypted; per DPDP Act; data of non-selected deleted after 6 months.", a_mr: "आधार AES-256 एन्क्रिप्टेड; DPDP कायद्यानुसार; निवड न झालेल्यांचा डेटा 6 महिन्यांनंतर हटवला जातो.", }
];

export const SECURITY = [
  { icon: "lock", title_hi: "Secure Exam Terminal", title_en: "Secure Exam Terminal", title_mr: "सुरक्षित परीक्षा संगणक", desc_hi: "Purpose-built lockdown device, no internet/apps.", desc_en: "Purpose-built lockdown device, no internet/apps.", desc_mr: "खास बनवलेले सुरक्षित उपकरण, इंटरनेट/अ‍ॅप नाहीत.", },
  { icon: "scan", title_hi: "QR + Face Verify", title_en: "QR + Face Verify", title_mr: "QR + चेहरा पडताळणी", desc_hi: "Aadhaar QR + webcam face match at login.", desc_en: "Aadhaar QR + webcam face match at login.", desc_mr: "प्रवेशाच्या वेळी आधार QR + वेबकॅम चेहरा जुळवणी.", },
  { icon: "eye", title_hi: "AI Proctoring", title_en: "AI Proctoring", title_mr: "AI देखरेख", desc_hi: "Gaze/voice/multi-face detection, screen recording.", desc_en: "Gaze/voice/multi-face detection, screen recording.", desc_mr: "नजर/आवाज/अनेक चेहरे ओळख, स्क्रीन रेकॉर्डिंग.", },
  { icon: "shield", title_hi: "Encrypted & Audited", title_en: "Encrypted & Audited", title_mr: "एन्क्रिप्टेड आणि पडताळलेले", desc_hi: "AES-256 answers, 12-month audit trail.", desc_en: "AES-256 answers, 12-month audit trail.", desc_mr: "AES-256 एन्क्रिप्टेड उत्तरे, 12 महिन्यांची नोंद.", },
  { icon: "pin", title_hi: "Aapke paas hi", title_en: "Near You", title_mr: "तुमच्या जवळच", desc_hi: "Existing schools/colleges/panchayat halls mein, multi-shift (5/day), 10 rounds.", desc_en: "At existing schools/colleges/panchayat halls, multi-shift (5/day), 10 rounds.", desc_mr: "अस्तित्वात असलेल्या शाळा/महाविद्यालये/पंचायत सभागृहांत, अनेक सत्रांत (5 प्रतिदिन), 10 फेऱ्या.", }
];

/**
 * A sample question. `descriptive` marks short-answer / case-study items, which
 * carry no options — declared explicitly because the inferred union across the
 * EXAMS literal drops the property whenever the exam objects differ in shape.
 */
export interface ExamSample {
  q: string;
  opts: readonly string[];
  correct: number;
  descriptive?: boolean;
}

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
