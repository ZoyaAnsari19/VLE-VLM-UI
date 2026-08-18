import type { Metadata } from "next";
import { ExamsPageShell } from "./ExamsPageShell";

export const metadata: Metadata = {
  title: "All Exams — Kisan Mitra Bharti Pariksha 2026",
  description: "Sabhi 10 selection exams — apni position ke hisaab se pattern, fee aur sample questions dekhein.",
};

export default function ExamsPage() {
  return <ExamsPageShell />;
}
