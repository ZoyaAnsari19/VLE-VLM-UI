"use client";

import { useState } from "react";
import {
  FOOTER_ABOUT_STATS,
  FOOTER_QUICK_LINKS,
  FOOTER_SOCIAL,
  MAHARASHTRA_DISTRICTS,
} from "@/lib/kisan-mitra/data";
import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { homeAnchors } from "@/lib/kisan-mitra/routes";
import { tr } from "@/lib/kisan-mitra/localized";

export function Footer() {
  const { t, lang } = useLang();
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-col-head">
              <Icon name="leaf" className="footer-col-ico" />
              <h4>{t.footer_about_title}</h4>
            </div>
            <span className="footer-underline" />
            <p>{t.footer_legal}</p>
            <p className="footer-tagline">{t.footer_about_tagline}</p>
            <div className="footer-stats">
              {FOOTER_ABOUT_STATS.map((s) => (
                <div className="footer-stat" key={s.icon}>
                  <Icon name={s.icon} />
                  {tr(s, "label", lang)}
                </div>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-col-head">
              <Icon name="compass" className="footer-col-ico" />
              <h4>{t.footer_links_title}</h4>
            </div>
            <span className="footer-underline" />
            <ul className="footer-links">
              {FOOTER_QUICK_LINKS.map((l) => (
                <li key={l.href + l.label_en}>
                  <a href={l.href.startsWith("#") ? `/${l.href}` : l.href}>
                    <Icon name="chevronRight" />
                    {tr(l, "label", lang)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-head">
              <Icon name="pin" className="footer-col-ico" />
              <h4>{t.footer_districts_title}</h4>
            </div>
            <span className="footer-underline" />
            <div className="footer-districts">
              {MAHARASHTRA_DISTRICTS.map((d) => (
                <span className="district-pill" key={d.name_en}>
                  {tr(d, "name", lang)}
                </span>
              ))}
            </div>
            <a href={homeAnchors.vacancies} className="footer-all-districts">
              {t.footer_all_districts} <Icon name="chevronRight" />
            </a>
          </div>
        </div>

        <div className="footer-newsletter">
          <div className="footer-newsletter-copy">
            <Icon name="fileText" className="footer-newsletter-ico" />
            <div>
              <h4>{t.footer_newsletter_title}</h4>
              <p>{t.footer_newsletter_desc}</p>
            </div>
          </div>
          <form
            className="footer-newsletter-form"
            onSubmit={(e) => {
              // No subscription backend exists yet, so this only acknowledges
              // locally rather than implying the address was stored somewhere.
              e.preventDefault();
              e.currentTarget.reset();
              setSubscribed(true);
            }}
          >
            <input
              type="email"
              required
              placeholder={t.footer_newsletter_placeholder}
              aria-label={t.footer_newsletter_placeholder}
            />
            <button type="submit" className="btn btn-saffron">
              {t.footer_newsletter_btn} <Icon name="chevronRight" />
            </button>
          </form>
          <div className="footer-social">
            <span className="footer-social-title">{t.footer_social_title}</span>
            <div className="footer-social-icons">
              {FOOTER_SOCIAL.map((s) => (
                <a className="social-ico" href="#" aria-label={s.label} key={s.label}>
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
          </div>
          <p className="footer-newsletter-thanks" hidden={!subscribed}>
            {t.footer_newsletter_thanks}
          </p>
        </div>

        <div className="footer-legal">
          © 2026 Kisan Mitra Ecosystem · Argus / RKF Strategic Initiative · {t.footer_legal}
        </div>
      </div>
    </footer>
  );
}
