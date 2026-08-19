"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { I18N, type Dict } from "@/lib/kisan-mitra/i18n";
import type { Lang } from "@/lib/kisan-mitra/recruitment/types";

const STORAGE_KEY = "km_lang";
/** Derived from the dictionaries, so a new language needs no change here. */
const LANGS = Object.keys(I18N) as Lang[];
const isLang = (v: unknown): v is Lang => typeof v === "string" && (LANGS as string[]).includes(v);
/**
 * Single sync channel for the language. Both this provider and the (being
 * retired) vanilla engine emit and listen on it, so whichever one the user
 * clicked, the other follows. Each side no-ops when it is already on the
 * requested language, which is what stops the echo from looping.
 */
export const LANG_EVENT = "km:lang-change";

interface LangContextValue {
  lang: Lang;
  t: Dict;
  setLang: (next: Lang) => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  // Always starts "hi" to match the server-rendered HTML (layout.tsx sets
  // <html lang="hi">); the saved preference is applied post-mount below, so a
  // returning "en" visitor can't cause a hydration mismatch.
  const [lang, setLangState] = useState<Lang>("hi");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) {
      document.documentElement.lang = saved;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- post-hydration correction, see comment above
      setLangState(saved);
    }

    const onExternalChange = (e: Event) => {
      const next = (e as CustomEvent<Lang>).detail;
      if (isLang(next)) setLangState(next);
    };
    window.addEventListener(LANG_EVENT, onExternalChange);
    return () => window.removeEventListener(LANG_EVENT, onExternalChange);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState((prev) => {
      if (prev === next) return prev;
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
      window.dispatchEvent(new CustomEvent<Lang>(LANG_EVENT, { detail: next }));
      return next;
    });
  }, []);

  const value = useMemo(() => ({ lang, t: I18N[lang], setLang }), [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang() must be used inside <LangProvider>");
  return ctx;
}
