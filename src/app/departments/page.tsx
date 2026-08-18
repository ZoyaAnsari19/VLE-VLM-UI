import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { DepartmentsIndex } from "@/components/sections/DepartmentsIndex";

export const metadata: Metadata = {
  title: "Departments — Kisan Mitra Bharti Pariksha 2026",
  description:
    "Six departments across the Kisan Mitra ecosystem — Field Operations, Sales & Marketing, Business Development, Export-Import, Processing Division and Corporate. See each department's roles, salary range and career ladder.",
  alternates: { canonical: "/departments" },
};

export default function DepartmentsPage() {
  return (
    <SiteShell>
      <DepartmentsIndex />
    </SiteShell>
  );
}
