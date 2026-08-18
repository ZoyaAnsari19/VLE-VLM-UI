import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { Benefits } from "@/components/sections/Benefits";

export const metadata: Metadata = {
  title: "What You Get — Salary, Perks & Career Growth | Kisan Mitra Bharti Pariksha 2026",
  description:
    "Clear the Kisan Mitra Bharti Pariksha and get a fixed monthly salary from ₹10,000 to ₹1,50,000, an officer's uniform and ID, a posting in your own village, free residential training, performance bonuses and a defined promotion ladder in all 6 departments.",
  alternates: { canonical: "/benefits" },
  openGraph: {
    title: "One exam, and your life is set — Kisan Mitra Bharti Pariksha 2026",
    description:
      "Fixed salary, officer identity, posting in your own village, free training, bonuses and a clear promotion ladder. See exactly what you get after selection.",
    url: "/benefits",
    type: "website",
  },
};

export default function BenefitsPage() {
  return (
    <SiteShell>
      <Benefits />
    </SiteShell>
  );
}
