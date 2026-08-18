import type { Metadata } from "next";
import { EligibilityPageShell } from "./EligibilityPageShell";

export const metadata: Metadata = {
  title: "Eligibility — Who Can Apply | Kisan Mitra Bharti Pariksha 2026",
  description:
    "Eligibility for the Kisan Mitra Bharti Pariksha 2026: general age, education and residency rules, plus the specific requirement for each of the 21 officer positions.",
  alternates: { canonical: "/eligibility" },
};

export default function EligibilityPage() {
  return <EligibilityPageShell />;
}
