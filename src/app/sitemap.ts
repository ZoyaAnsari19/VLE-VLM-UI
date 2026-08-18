import type { MetadataRoute } from "next";
import { getAllExamIds } from "@/lib/kisan-mitra/data";
import { getAllDepartmentIds, getAllPositionIds } from "@/lib/kisan-mitra/recruitment/data";
import { routes } from "@/lib/kisan-mitra/routes";
import { SITE_URL } from "@/lib/kisan-mitra/site";

/**
 * Built from the same selectors the pages themselves use, so a position,
 * department or exam added to the data layer is in the sitemap automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly") => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  });

  return [
    entry(routes.home(), 1, "weekly"),
    entry(routes.roles(), 0.9, "weekly"),
    entry(routes.benefits(), 0.9, "monthly"),
    entry(routes.exams(), 0.8, "monthly"),
    entry(routes.departments(), 0.8, "monthly"),
    entry(routes.apply(), 0.8, "monthly"),
    entry(routes.process(), 0.7, "monthly"),
    entry(routes.eligibility(), 0.7, "monthly"),
    entry(routes.prepare(), 0.7, "monthly"),
    entry(routes.faq(), 0.6, "monthly"),
    ...getAllPositionIds().map((id) => entry(routes.role(id), 0.8, "monthly")),
    ...getAllDepartmentIds().map((id) => entry(routes.department(id), 0.7, "monthly")),
    ...getAllExamIds().map((id) => entry(routes.exam(id), 0.7, "monthly")),
  ];
}
