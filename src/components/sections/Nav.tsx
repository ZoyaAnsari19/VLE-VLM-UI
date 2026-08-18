"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { homeAnchors, routes } from "@/lib/kisan-mitra/routes";
import type { Lang } from "@/lib/kisan-mitra/recruitment/types";

export function Nav() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Everything except Schemes is a real page now; Schemes is still a home section.
  const links = [
    { href: routes.roles(), label: t.nav_roles },
    { href: routes.departments(), label: t.nav_departments },
    { href: routes.exams(), label: t.nav_exams },
    { href: routes.benefits(), label: t.nav_benefits },
    { href: routes.process(), label: t.nav_process },
    { href: homeAnchors.schemes, label: t.nav_schemes },
    { href: routes.faq(), label: t.nav_faq },
  ];

  const langToggle = (extraClass = "", id?: string) => (
    <div className={`lang-toggle${extraClass}`} id={id}>
      {(["hi", "en"] as Lang[]).map((code) => (
        <button
          key={code}
          type="button"
          data-lang={code}
          className={lang === code ? "active" : undefined}
          onClick={() => setLang(code)}
        >
          {code === "hi" ? "हिंदी" : "EN"}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
        <div className="container nav-inner">
          <a href={homeAnchors.top} className="brand">
            <Icon name="leaf" className="leaf" /> Kisan Mitra
          </a>
          <div className="nav-links">
            {links.map((l) => (
              <a href={l.href} key={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            {langToggle("", "langToggle")}
            <a
              href={routes.apply()}
              className="btn btn-primary nav-apply-btn"
              style={{ minHeight: 44, padding: "11px 20px", fontSize: 15 }}
            >
              {t.nav_apply}
            </a>
            <button className="hamburger" aria-label="Menu" onClick={() => setDrawerOpen(true)}>
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </nav>

      <div className={`drawer${drawerOpen ? " open" : ""}`} id="drawer">
        <div className="drawer-head">
          <a href={homeAnchors.top} className="brand" onClick={() => setDrawerOpen(false)}>
            <Icon name="leaf" className="leaf" /> Kisan Mitra
          </a>
          <button className="hamburger" aria-label="Close" onClick={() => setDrawerOpen(false)}>
            <Icon name="x" />
          </button>
        </div>
        <div className="drawer-links">
          {links.map((l) => (
            <a href={l.href} key={l.href} onClick={() => setDrawerOpen(false)}>
              {l.label}
            </a>
          ))}
          {langToggle(" lang-toggle-drawer", "langToggleDrawer")}
          <a
            href={routes.apply()}
            className="btn btn-primary drawer-apply-btn"
            onClick={() => setDrawerOpen(false)}
          >
            {t.nav_apply}
          </a>
        </div>
      </div>
    </>
  );
}
