export type Lang = "ru" | "kk";

export const DEFAULT_LANG: Lang = "ru";
export const LANG_COOKIE = "alenushka-lang";
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function parseLang(value: string | undefined): Lang {
  return value === "kk" ? "kk" : DEFAULT_LANG;
}
