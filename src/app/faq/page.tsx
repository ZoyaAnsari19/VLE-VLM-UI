import type { Metadata } from "next";
import { FaqPageShell } from "./FaqPageShell";

export const metadata: Metadata = {
  title: "FAQs — Kisan Mitra Bharti Pariksha 2026",
  description:
    "Answers to the most common questions about the Kisan Mitra Bharti Pariksha 2026 — eligibility, exam fee, exam centres, posting location, salary and the selection timeline.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return <FaqPageShell />;
}
