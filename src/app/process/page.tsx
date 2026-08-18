import type { Metadata } from "next";
import { ProcessPageShell } from "./ProcessPageShell";

export const metadata: Metadata = {
  title: "Selection Process — Exam, Interview & Training | Kisan Mitra Bharti Pariksha 2026",
  description:
    "The complete Kisan Mitra selection process: registration, the online proctored exam, the interview round and the residential training that follows selection.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return <ProcessPageShell />;
}
