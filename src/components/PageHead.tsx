"use client";

import type { ReactNode } from "react";
import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { routes } from "@/lib/kisan-mitra/routes";

interface PageHeadProps {
  /** Icon key for the eyebrow chip. */
  icon: string;
  /** Eyebrow chip text, also used as the breadcrumb leaf. */
  eyebrow: string;
  /** Split so the middle part can take the gold accent, as elsewhere on the site. */
  titlePre: string;
  titleAccent?: string;
  titlePost?: string;
  sub?: string;
  children?: ReactNode;
}

/**
 * Breadcrumb + section-head block shared by the standalone content pages
 * (/process, /eligibility, /prepare, /faq), so they all open the same way.
 */
export function PageHead({ icon, eyebrow, titlePre, titleAccent, titlePost, sub, children }: PageHeadProps) {
  const { t } = useLang();
  return (
    <section className="page-head-section">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href={routes.home()}>{t.nav_home}</a>
          <Icon name="chevronRight" />
          <span aria-current="page">{eyebrow}</span>
        </nav>
        <Reveal className="section-head">
          <span className="eyebrow">
            <Icon name={icon} /> {eyebrow}
          </span>
          <h1 className="h2">
            {titlePre}
            {titleAccent && (
              <>
                {" "}
                <span className="accent">{titleAccent}</span>
              </>
            )}
            {titlePost && ` ${titlePost}`}
          </h1>
          {sub && <p>{sub}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
