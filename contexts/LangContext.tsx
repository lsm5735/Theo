"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { DICT, Lang, DictKey } from "@/lib/translations";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: DictKey) => string;
}

const LangContext = createContext<LangCtx>({
  lang: "ko",
  setLang: () => {},
  t: (key) => DICT.ko[key],
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en") setLangState("en");
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
  }

  function t(key: DictKey): string {
    return (DICT[lang] as Record<string, string>)[key] ?? (DICT.ko as Record<string, string>)[key] ?? key;
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() { return useContext(LangContext); }
export function useT() { return useContext(LangContext).t; }
