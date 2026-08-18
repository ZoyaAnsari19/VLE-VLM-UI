import type { Metadata } from "next";
import { RolesPageShell } from "./RolesPageShell";

export const metadata: Metadata = {
  title: "All 21 Positions — Kisan Mitra Bharti Pariksha 2026",
  description:
    "Browse all 21 officer positions across 6 departments — Field Operations, Sales & Marketing, Business Development, Export-Import, Processing and Corporate. Salary, eligibility and exam for each role.",
  alternates: { canonical: "/roles" },
};

export default function RolesPage() {
  return <RolesPageShell />;
}
