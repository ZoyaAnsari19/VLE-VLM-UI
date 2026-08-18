"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/components/LangProvider";

/**
 * Host for the multi-step apply form. The form itself is still the vanilla
 * state machine in apply.ts — it owns OTP/KYC/payment calls and per-step
 * validation, so it is converted on its own rather than as part of the
 * section migration.
 *
 * `?position=<id>` pre-selects a role, which is what the "Apply" buttons on
 * role cards and role pages link to.
 */
export function ApplySection({ heading = true }: { heading?: boolean } = {}) {
  const { lang } = useLang();
  const searchParams = useSearchParams();
  const positionId = searchParams.get("position");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void import("@/lib/kisan-mitra/app").then((mod) => mod.initApplySection(ref.current, positionId, heading));
  }, [positionId, heading]);

  // Keep the form's own copy in step with the language toggle.
  useEffect(() => {
    void import("@/lib/kisan-mitra/app").then((mod) => mod.renderApplySectionFor(lang));
  }, [lang]);

  return <div ref={ref} />;
}
