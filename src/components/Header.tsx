"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BookHeart, FileText, Images, Menu, MessageCircle, Phone, Soup, Users, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { site, telHref, waHref } from "@/lib/site";
import { WhatsAppIcon } from "./ui/BrandIcons";
import { LangSwitch } from "./ui/LangSwitch";
import { Logo } from "./ui/Logo";

export const NAV = [
  { id: "about", icon: BookHeart, dot: "bg-pink" },
  { id: "groups", icon: Users, dot: "bg-lavender" },
  { id: "food", icon: Soup, dot: "bg-sun" },
  { id: "gallery", icon: Images, dot: "bg-mint" },
  { id: "documents", icon: FileText, dot: "bg-sky" },
  { id: "contacts", icon: Phone, dot: "bg-coral" },
] as const;

export type NavId = (typeof NAV)[number]["id"];

/** Прокрутка к секции с учётом scroll-margin-top и prefers-reduced-motion. */
export function scrollToSection(id: string) {
  const el = id === "top" ? null : document.getElementById(id);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
  if (el) el.scrollIntoView({ behavior, block: "start" });
  else window.scrollTo({ top: 0, behavior });
  history.replaceState(null, "", id === "top" ? window.location.pathname : `#${id}`);
}

export function Header() {
  const t = useT();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Тень шапки после начала прокрутки
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Подсветка текущего раздела
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (window.scrollY < 200) setActive(null);
        else if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    const onTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) menuBtn.current?.focus();
  }, []);

  // Мобильное меню: Escape, блокировка прокрутки, закрытие при переходе на десктоп
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    panel.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  const go = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    // Дождаться снятия блокировки прокрутки, затем перейти
    if (wasOpen) requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)));
    else scrollToSection(id);
  };

  const wa = waHref(site.phones[0].wa, t.wa.message);

  return (
    <>
      <a
        href="#main"
        className="fixed left-3 top-3 z-[70] -translate-y-24 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition-transform focus:translate-y-0"
      >
        {t.skip}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled || open
            ? "border-line bg-white/92 shadow-[0_6px_24px_-16px_rgb(48_51_75/0.35)] backdrop-blur-md"
            : "border-transparent bg-white/70 backdrop-blur-sm"
        }`}
      >
        <div className="container-x flex h-full items-center justify-between gap-3">
          <a href="#top" onClick={go("top")} aria-label={t.header.home} className="shrink-0 rounded-2xl">
            <Logo />
          </a>

          <nav aria-label={t.header.menuTitle} className="hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {NAV.map((n) => {
                const isActive = active === n.id;
                return (
                  <li key={n.id}>
                    <a
                      href={`#${n.id}`}
                      onClick={go(n.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative block rounded-full px-2.5 py-2 text-[15px] font-bold transition-colors xl:px-3.5 ${
                        isActive ? "bg-lavender-soft text-ink" : "text-ink-soft hover:bg-cream hover:text-ink"
                      }`}
                    >
                      {t.nav[n.id]}
                      <span
                        className={`absolute bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full transition-opacity ${n.dot} ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitch className="hidden sm:flex" />
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-coral-deep px-3 py-2.5 xl:px-4 text-[15px] font-extrabold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift lg:inline-flex"
            >
              <MessageCircle className="size-[18px]" aria-hidden />
              <span className="sr-only xl:not-sr-only">{t.header.cta}</span>
            </a>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.header.menuClose : t.header.menuOpen}
              className="grid size-11 place-items-center rounded-full bg-sun text-ink shadow-soft transition active:scale-95 lg:hidden"
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <>
              <motion.div
                key="backdrop"
                className="absolute inset-x-0 top-full h-[calc(100dvh-var(--header-h))] bg-ink/25 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.2 }}
                onClick={() => close(false)}
              />
              <motion.div
                key="panel"
                id="mobile-menu"
                ref={panel}
                className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--header-h))] overflow-y-auto overscroll-contain rounded-b-[28px] border-b border-line bg-white px-[var(--gutter)] pb-6 pt-3 shadow-lift lg:hidden"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: reduce ? 0 : 0.22, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <nav aria-label={t.header.menuTitle} className="mx-auto max-w-xl">
                  <ul className="grid grid-cols-2 gap-2">
                    {NAV.map((n, i) => {
                      const Icon = n.icon;
                      return (
                        <motion.li
                          key={n.id}
                          initial={reduce ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: reduce ? 0 : 0.03 * i, duration: 0.2 }}
                        >
                          <a
                            href={`#${n.id}`}
                            onClick={go(n.id)}
                            className="flex min-h-13 items-center gap-2.5 rounded-2xl bg-cream px-3 py-2.5 text-[15.5px] font-bold text-ink transition-colors active:bg-lavender-soft"
                          >
                            <span className={`grid size-8 shrink-0 place-items-center rounded-xl ${n.dot}`}>
                              <Icon className="size-4" aria-hidden />
                            </span>
                            <span className="min-w-0 leading-tight">{t.nav[n.id]}</span>
                          </a>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>
                <div className="mx-auto mt-4 flex max-w-xl flex-col gap-3">
                  <LangSwitch className="self-start sm:hidden" />
                  <div className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-2">
                    {site.phones.map((p) => (
                      <a
                        key={p.e164}
                        href={telHref(p.e164)}
                        className="flex items-center justify-center gap-2 rounded-full border-2 border-line px-4 py-2.5 text-[15px] font-bold text-ink"
                      >
                        <Phone className="size-4 text-coral-deep" aria-hidden />
                        {p.display}
                      </a>
                    ))}
                  </div>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-wa px-4 py-3 text-[15.5px] font-extrabold text-white"
                  >
                    <WhatsAppIcon className="size-5" />
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
