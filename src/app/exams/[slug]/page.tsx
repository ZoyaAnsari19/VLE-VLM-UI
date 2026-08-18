import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllExamIds, getExam } from "@/lib/kisan-mitra/data";
import { getPositionsByExam } from "@/lib/kisan-mitra/recruitment/data";
import { SiteShell } from "@/components/SiteShell";
import { ExamDetail } from "@/components/sections/ExamDetail";

interface Params {
  params: Promise<{ slug: string }>;
}

/** One static page per exam — add an exam to EXAMS and its page appears. */
export function generateStaticParams() {
  return getAllExamIds().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExam(slug);
  if (!exam) return { title: "Exam not found — Kisan Mitra" };

  const roles = getPositionsByExam(slug)
    .map((p) => p.title_en)
    .join(", ");
  const title = `${exam.name_en} — Pattern, Syllabus & Fee | Kisan Mitra Bharti Pariksha 2026`;
  const description = `${exam.name_en}: ${exam.duration_en}, ${exam.questions_en}. Qualifying ${exam.qualifying}, fee ₹${exam.fee}. Recruits for ${roles}.`;

  return {
    title,
    description,
    alternates: { canonical: `/exams/${slug}` },
    openGraph: { title, description, url: `/exams/${slug}`, type: "article" },
  };
}

export default async function ExamPage({ params }: Params) {
  const { slug } = await params;
  if (!getExam(slug)) notFound();

  return (
    <SiteShell>
      <ExamDetail examId={slug} />
    </SiteShell>
  );
}
