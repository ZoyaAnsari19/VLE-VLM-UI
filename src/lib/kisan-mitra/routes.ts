// ============================================================
// ROUTES — the single place that knows what a URL looks like.
//
// Entity ids in the data layer are already URL-safe, so they double as slugs.
// Adding a position/department/exam to the data layer therefore gives it a
// working page and working links with no route or component change.
// ============================================================

export const routes = {
  home: () => "/",
  roles: () => "/roles",
  role: (positionId: string) => `/roles/${positionId}`,
  departments: () => "/departments",
  department: (departmentId: string) => `/departments/${departmentId}`,
  exams: () => "/exams",
  exam: (examId: string) => `/exams/${examId}`,
  benefits: () => "/benefits",
  process: () => "/process",
  eligibility: () => "/eligibility",
  prepare: () => "/prepare",
  faq: () => "/faq",
  apply: () => "/apply",
  /** Deep-links the apply form to a position so the picker starts pre-filled. */
  applyTo: (positionId: string) => `/apply?position=${encodeURIComponent(positionId)}`,
} as const;

/** Anchors that still live on the home page. */
export const homeAnchors = {
  top: "/#top",
  roles: "/#roles",
  exams: "/#exams",
  schemes: "/#schemes",
  apply: "/#apply",
  vacancies: "/#vacancies",
} as const;
