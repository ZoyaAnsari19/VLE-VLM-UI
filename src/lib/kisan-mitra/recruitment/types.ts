// ============================================================
// RECRUITMENT DATA MODEL — types
// ============================================================

export type Lang = "hi" | "en" | "mr";

export type ApplicationTrack = "exam" | "direct";

/**
 * A field that exists once per language, e.g. `Loc<"title">` gives
 * `title_hi` / `title_en` (required) plus `title_mr` (optional).
 *
 * Only Hindi and English are required because `tr()` falls back to English, so
 * a language may be rolled out field by field. Adding a language to `Lang`
 * therefore needs no change here — the new key is simply allowed everywhere.
 */
export type Loc<B extends string, V = string> = Record<`${B}_hi` | `${B}_en`, V> &
  Partial<Record<`${B}_${Lang}`, V>>;

/** Same, for fields that may be absent on an entity entirely. */
export type LocOpt<B extends string, V = string> = Partial<Record<`${B}_${Lang}`, V>>;

export type Department = {
  id: string;
  icon: string; // key into ICON map
  accent: string;
} & Loc<"name"> &
  Loc<"description">;

export type Position = {
  id: string;
  code: string;
  departmentId: string;

  salary: number;
  salaryDisplay: string;

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
} & Loc<"title"> &
  Loc<"summary"> &
  Loc<"eligibility"> &
  Loc<"responsibilities", string[]> &
  Loc<"reportingOfficer"> &
  Loc<"careerPath", string[]> &
  Loc<"uniform"> &
  /** Concrete monthly/recurring targets from the official JD, e.g. "100 farmers/month". Not every role has one. */
  LocOpt<"monthlyTargets", string[]>;

export interface RecruitmentStats {
  totalPositions: number;
  salaryMin: number;
  salaryMax: number;
  totalDepartments: number;
  careerPaths: number;
}
