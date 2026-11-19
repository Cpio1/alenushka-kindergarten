"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { site, waHref } from "@/lib/site";
import { WhatsAppIcon } from "./ui/BrandIcons";

/**
 * Плавающая кнопка WhatsApp. Появляется после первого экрана и прячется,
 * когда на экране раздел «Контакты» или подвал — там уже есть свои кнопки.
 * На экранах уже 1280px (где у контента нет свободных полей) кнопка показывается
 * только при прокрутке вверх, чтобы не закрывать текст и карточки во время чтения.
 */
export function WhatsAppFloat() {
  const t = useT();
  const reduce = useReducedMotion();
  const [pastHero, setPastHero] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [roomy, setRoomy] = useState(false);
  const [covered, setCovered] = useState(false);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setPastHero(y > window.innerHeight * 0.6);
      if (Math.abs(y - lastY) > 6) setScrollingUp(y < lastY);
      lastY = y;
    };
    onScroll();
    const mq = window.matchMedia("(min-width: 1280px)");
    const onMq = () => setRoomy(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    window.addEventListener("scroll", onScroll, { passive: true });
    const targets = ["contacts", "site-footer"].map((id) => document.getElementById(id)).filter(Boolean) as Element[];
    const state = new Map<Element, boolean>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => state.set(e.target, e.isIntersecting));
      setCovered([...state.values()].some(Boolean));
    }, { rootMargin: "0px 0px -10% 0px" });
    targets.forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onMq);
      io.disconnect();
    };
  }, []);

  const visible = pastHero && !covered && (roomy || scrollingUp || open);
  // Список номеров закрывается вместе с кнопкой
  const showList = open && visible;

  useEffect(() => {
    if (!showList) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [showList]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={box}
          key="wa"
          className="fixed z-40 flex flex-col items-end gap-2"
          style={{
            right: "max(14px, env(safe-area-inset-right))",
            bottom: "max(14px, env(safe-area-inset-bottom))",
          }}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: reduce ? 0 : 0.22 }}
        >
          <AnimatePresence>
            {showList && (
              <motion.div
                id="wa-numbers"
                className="w-[min(260px,calc(100vw-28px))] rounded-[22px] bg-white p-2 shadow-lift ring-1 ring-line"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: reduce ? 0 : 0.18 }}
              >
                <p className="px-3 pb-1 pt-1.5 text-[12.5px] font-bold text-ink-soft">{t.wa.choose}</p>
                {site.phones.map((p) => (
                  <a
                    key={p.wa}
                    href={waHref(p.wa, t.wa.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center gap-2.5 rounded-2xl px-3 text-[15.5px] font-extrabold tabular-nums text-ink hover:bg-mint-soft"
                  >
                    <WhatsAppIcon className="size-5 text-wa" />
                    {p.display}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={() => setOpen(!showList)}
            aria-expanded={showList}
            aria-controls="wa-numbers"
            aria-label={showList ? t.wa.close : t.wa.float}
            className="grid size-14 place-items-center rounded-full bg-wa text-white shadow-lift ring-4 ring-white transition active:scale-95"
          >
            {showList ? <X className="size-6" aria-hidden /> : <WhatsAppIcon className="size-7" />}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
