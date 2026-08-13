// ============================================================
// RECRUITMENT DATA MODEL — types
// ============================================================

export type Lang = "hi" | "en";

export type ApplicationTrack = "exam" | "direct";

export interface Department {
  id: string;
  name_hi: string;
  name_en: string;
  icon: string; // key into ICON map
  accent: string;
}

export interface Position {
  id: string;
  code: string;
  departmentId: string;

  title_hi: string;
  title_en: string;

  summary_hi: string;
  summary_en: string;

  salary: number;
  salaryDisplay: string;

  eligibility_hi: string;
  eligibility_en: string;

  responsibilities_hi: string[];
  responsibilities_en: string[];

  reportingOfficer_hi: string;
  reportingOfficer_en: string;

  careerPath_hi: string[];
  careerPath_en: string[];

  uniform_hi: string;
  uniform_en: string;

  /** Concrete monthly/recurring targets called out in the official JD, e.g. "100 farmers/month". Optional — not every role has one. */
  monthlyTargets_hi?: string[];
  monthlyTargets_en?: string[];

  /** Orders each department's vertical ladder — lower is more junior. */
  seniorityRank: number;

  accent: string;

  applicationTrack: ApplicationTrack;
  /** Only set when applicationTrack === 'exam'. Maps to EXAMS in ../data. */
  examId?:
    | "gram-sevak"
    | "krishi-adhikari"
    | "vipnan"
    | "vyavsaya-vikas"
    | "vyapar"
    | "vyapar-nideshak"
    | "prakriya"
    | "prakriya-prabandhak"
    | "samuday-vikas"
    | "netritva";
}

export interface RecruitmentStats {
  totalPositions: number;
  salaryMin: number;
  salaryMax: number;
  totalDepartments: number;
  careerPaths: number;
}
