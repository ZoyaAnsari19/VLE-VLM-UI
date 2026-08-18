import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPositionIds, getDepartment, getPosition } from "@/lib/kisan-mitra/recruitment/data";
import { SiteShell } from "@/components/SiteShell";
import { RoleDetail } from "@/components/sections/RoleDetail";

interface Params {
  params: Promise<{ slug: string }>;
}

/** One static page per position — add a position to POSITIONS and its page appears. */
export function generateStaticParams() {
  return getAllPositionIds().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const position = getPosition(slug);
  if (!position) return { title: "Position not found — Kisan Mitra" };

  const department = getDepartment(position.departmentId);
  const title = `${position.title_en} — ${position.salaryDisplay}/month | Kisan Mitra Bharti Pariksha 2026`;
  const description = `${position.summary_en} Department: ${department?.name_en}. Eligibility: ${position.eligibility_en}`;

  return {
    title,
    description,
    alternates: { canonical: `/roles/${slug}` },
    openGraph: { title, description, url: `/roles/${slug}`, type: "article" },
  };
}

export default async function RolePage({ params }: Params) {
  const { slug } = await params;
  if (!getPosition(slug)) notFound();

  return (
    <SiteShell>
      <RoleDetail positionId={slug} />
    </SiteShell>
  );
}
