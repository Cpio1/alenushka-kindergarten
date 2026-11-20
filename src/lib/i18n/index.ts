"use client";

import { createContext, createElement, useCallback, useContext, useEffect, useState } from "react";
import { kk } from "./kk";
import { ru, type Dict } from "./ru";
import { DEFAULT_LANG, LANG_COOKIE, LANG_COOKIE_MAX_AGE, type Lang } from "./config";

export type { Lang };

const STORAGE_KEY = "alenushka-lang";
export const dictionaries: Record<Lang, Dict> = { ru, kk };

type Ctx = { lang: Lang; setLang: (lang: Lang) => void };
const LangContext = createContext<Ctx>({ lang: DEFAULT_LANG, setLang: () => {} });

function persist(lang: Lang) {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; samesite=lax`;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* приватный режим — язык всё равно хранится в cookie */
  }
}

function hasLangCookie() {
  return document.cookie.split("; ").some((c) => c.startsWith(`${LANG_COOKIE}=`));
}

/**
 * Язык приходит с сервера (cookie), поэтому серверный HTML и первая отрисовка на клиенте совпадают:
 * нет мигания языка и ошибок гидратации. По умолчанию — русский.
 */
export function LangProvider({ initial, children }: { initial: Lang; children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initial);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    persist(next);
  }, []);

  useEffect(() => {
    // Посетители, выбравшие язык до перехода на cookie, — переносим выбор из localStorage.
    if (hasLangCookie()) return;
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (stored === "kk" || stored === "ru") {
      persist(stored);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- одноразовая миграция сохранённого выбора
      if (stored !== initial) setLangState(stored);
    }
  }, [initial]);

  useEffect(() => {
    // Синхронизация между вкладками.
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === "ru" || e.newValue === "kk")) setLangState(e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return createElement(LangContext.Provider, { value: { lang, setLang } }, children);
}

export function useLang(): [Lang, (lang: Lang) => void] {
  const { lang, setLang } = useContext(LangContext);
  return [lang, setLang];
}

export function useT(): Dict {
  return dictionaries[useLang()[0]];
}

/** Синхронизирует <html lang>, заголовок вкладки и description с выбранным языком. */
export function useDocumentLang() {
  const [lang] = useLang();
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.setAttribute("translate", "no");
    const { title, description } = dictionaries[lang].meta;
    const apply = () => {
      if (document.title !== title) document.title = title;
      const meta = document.querySelector('meta[name="description"]');
      if (meta && meta.getAttribute("content") !== description) meta.setAttribute("content", description);
    };
    apply();
    const mo = new MutationObserver(apply);
    mo.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => mo.disconnect();
  }, [lang]);
}

export type { Dict };
