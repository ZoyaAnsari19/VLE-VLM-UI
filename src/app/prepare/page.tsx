import type { Metadata } from "next";
import { PreparePageShell } from "./PreparePageShell";

export const metadata: Metadata = {
  title: "How To Prepare — Syllabus, Mock Tests & Exam Patterns | Kisan Mitra Bharti Pariksha 2026",
  description:
    "Free study material, syllabus and mock tests for the Kisan Mitra Bharti Pariksha, plus the full paper pattern for every one of the selection exams.",
  alternates: { canonical: "/prepare" },
};

export default function PreparePage() {
  return <PreparePageShell />;
}
