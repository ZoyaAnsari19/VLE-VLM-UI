import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllDepartmentIds,
  getDepartment,
  getPositionsByDepartment,
} from "@/lib/kisan-mitra/recruitment/data";
import { SiteShell } from "@/components/SiteShell";
import { DepartmentDetail } from "@/components/sections/DepartmentDetail";

interface Params {
  params: Promise<{ slug: string }>;
}

/** One static page per department — add one to DEPARTMENTS and its page appears. */
export function generateStaticParams() {
  return getAllDepartmentIds().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const department = getDepartment(slug);
  if (!department) return { title: "Department not found — Kisan Mitra" };

  const positions = getPositionsByDepartment(slug);
  const entry = positions[0];
  const top = positions[positions.length - 1];
  const title = `${department.name_en} — ${positions.length} Positions | Kisan Mitra Bharti Pariksha 2026`;
  const description = `${department.description_en} ${positions.length} roles from ${entry?.title_en} (${entry?.salaryDisplay}/month) up to ${top?.title_en} (${top?.salaryDisplay}/month).`;

  return {
    title,
    description,
    alternates: { canonical: `/departments/${slug}` },
    openGraph: { title, description, url: `/departments/${slug}`, type: "article" },
  };
}

export default async function DepartmentPage({ params }: Params) {
  const { slug } = await params;
  if (!getDepartment(slug)) notFound();

  return (
    <SiteShell>
      <DepartmentDetail departmentId={slug} />
    </SiteShell>
  );
}
