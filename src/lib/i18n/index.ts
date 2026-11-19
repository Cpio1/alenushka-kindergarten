"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { kk } from "./kk";
import { ru, type Dict } from "./ru";

export type Lang = "ru" | "kk";

const STORAGE_KEY = "alenushka-lang";
const EVENT = "alenushka-lang-change";
export const dictionaries: Record<Lang, Dict> = { ru, kk };

let memoryLang: Lang | null = null;

function snapshot(): Lang {
  if (memoryLang) return memoryLang;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "ru" ? "ru" : "kk";
  } catch {
    return "kk";
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/** Текущий язык (по умолчанию казахский). Выбор сохраняется в localStorage и переключается без перезагрузки. */
export function useLang(): [Lang, (lang: Lang) => void] {
  const lang = useSyncExternalStore(subscribe, snapshot, () => "kk" as Lang);
  const setLang = useCallback((next: Lang) => {
    memoryLang = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* приватный режим — язык держится до перезагрузки */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return [lang, setLang];
}

export function useT(): Dict {
  const [lang] = useLang();
  return dictionaries[lang];
}

/** Синхронизирует <html lang>, заголовок вкладки и description с выбранным языком. */
export function useDocumentLang() {
  const [lang] = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
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
