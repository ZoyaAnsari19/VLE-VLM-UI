import type { Metadata } from "next";
import { ApplyPageShell } from "./ApplyPageShell";

export const metadata: Metadata = {
  title: "Apply Now — Kisan Mitra Bharti Pariksha 2026",
  description:
    "Apply for a Kisan Mitra officer position in a few guided steps — pick your role, verify your mobile, fill in your details and submit.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  return <ApplyPageShell />;
}
